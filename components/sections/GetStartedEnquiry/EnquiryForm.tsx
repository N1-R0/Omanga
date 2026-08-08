"use client";

import { useRef, useState } from "react";

import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import {
  ENQUIRY_CHROME,
  type GetStartedEnquiryContent,
  type LinkedMessage,
} from "@/content/get-started-enquiry.content";
import { ENQUIRY_HONEYPOT_FIELD, validateEnquiry } from "@/lib/enquiry";
import type { RequiredEnquiryField } from "@/lib/enquiry";

/**
 * The enquiry form — the UI half of the submission rail.
 *
 * The only Client Component in this section, and the smallest part of it that
 * needs to be one: validation messages, submission status and focus management
 * live here, and the heading block above stays on the server.
 *
 * ---------------------------------------------------------------------------
 * The split, which is the point of this phase
 *
 *   this file          fields, messages, pending / success / error states
 *   lib/enquiry.ts     the wire field names, sanitisation, validation rules
 *   lib/rate-limit.ts  the per-address submission counter, server-side only
 *   app/api/enquiry    the server handler, the spam guards and Zoho delivery
 *
 * Validation is not duplicated: `validateEnquiry` is the same function the Route
 * Handler runs, so the client genuinely mirrors the server rather than
 * approximating it, and the server stays authoritative. What lives here is only
 * the mapping from a failed field name to its approved message — copy, which the
 * server has no business holding.
 *
 * That is the whole abstraction. No form library, no schema package, no state
 * machine: four fields and one endpoint do not need any of it, and the delivery
 * mechanism can be swapped without touching this file.
 *
 * ---------------------------------------------------------------------------
 * Progressive enhancement, honestly stated. The markup is a real `form` with a
 * real submit button and native `required` and `type="email"` attributes, so the
 * fields are usable and programmatically described before this component
 * hydrates. Submission still needs JavaScript.
 *
 * That is now a deliberate stopping point rather than a pending task. Giving the
 * `form` an `action` would make it post natively — the handler accepts
 * `FormData`, which is exactly what a native submission sends — but the browser
 * would then navigate to the endpoint and render its JSON, and the brief is
 * explicit that submission must not take the visitor off the page. Closing the
 * gap properly means a Server Action returning state to a `useActionState` form,
 * which is a different component from this one and a decision worth making on
 * its own.
 */

type Status = "idle" | "pending" | "success" | "failure";

/** Where submissions go. One string, one caller. */
const ENQUIRY_ENDPOINT = "/api/enquiry";

export type EnquiryFormProps = {
  content: GetStartedEnquiryContent;
};

export function EnquiryForm({ content }: EnquiryFormProps) {
  const [invalidFields, setInvalidFields] = useState<
    readonly RequiredEnquiryField[]
  >([]);
  const [status, setStatus] = useState<Status>("idle");

  const summaryRef = useRef<HTMLDivElement>(null);

  const { fields } = content;

  /**
   * The approved message for a field the shared validator rejected.
   *
   * This mapping is the only validation logic in the client: the rules live in
   * `lib/enquiry.ts` and the words live in the content module.
   */
  const messageFor = (field: RequiredEnquiryField): string | undefined =>
    fields[field].errorWhenEmpty;

  /**
   * Re-validates one field on blur and clears its message once corrected, which
   * is what "errors clear as they are corrected" requires. It runs the whole
   * validator and keeps only this field's result, so there is one validation
   * function rather than two that can disagree.
   *
   * The form is reached through the control that fired the event rather than
   * through a ref. Both work, but a ref read inside a closure created during
   * render is indistinguishable to the compiler from a ref read *at* render, and
   * the event already carries everything needed.
   */
  const handleBlur =
    (field: RequiredEnquiryField) =>
    (event: React.FocusEvent<HTMLInputElement>): void => {
      const form = event.currentTarget.form;

      if (form === null) {
        return;
      }

      const result = validateEnquiry(new FormData(form));
      const isNowInvalid =
        !result.isValid && result.invalidFields.includes(field);

      setInvalidFields((current) =>
        isNowInvalid
          ? current.includes(field)
            ? current
            : [...current, field]
          : current.filter((entry) => entry !== field),
      );
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Blocks double submission. The button is also disabled while pending.
    if (status === "pending") {
      return;
    }

    const values = new FormData(event.currentTarget);
    const result = validateEnquiry(values);

    if (!result.isValid) {
      setInvalidFields(result.invalidFields);
      setStatus("idle");
      /*
        The summary takes focus rather than the first invalid control. It carries
        every message, so a screen-reader user hears the whole problem before
        being placed in a field — and the summary's own links move focus to the
        fields themselves.
      */
      summaryRef.current?.focus();
      return;
    }

    setInvalidFields([]);
    setStatus("pending");

    /*
      The server validates the same values again with the same function and is
      authoritative. A 422 means the client and the server disagreed, which is a
      state the user cannot act on differently from any other failure — so it
      reports the same failure message rather than a second kind of error the
      approved copy does not have.
    */
    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        body: values,
      });

      setStatus(response.ok ? "success" : "failure");
    } catch {
      // Offline, aborted, or DNS — indistinguishable to the user from a refusal.
      setStatus("failure");
    }
  };

  return (
    /*
      `noValidate` hands validation to this component rather than to the browser.
      Not a downgrade: the native bubbles cannot be styled, appear one at a time,
      vanish on the next interaction, and would pre-empt the error summary that
      form rules require ("errors appear per field and as a summary that moves
      focus"). The `required` and `type="email"` attributes stay on the controls
      regardless — they are what make the fields' state programmatic, which is
      what assistive technology reads, and they are the server's contract too.
    */
    <form noValidate onSubmit={handleSubmit}>
      {/*
        The honeypot. Rendered first so a filler that stops at the first input
        meets it before anything real, and rendered outside the `Stack` so it
        cannot open a gap in the layout — a `visually-hidden` element inside a
        flex column still counts as a child and still gets a gap on either side.

        Nothing about the section's appearance changes: the wrapper is clipped to
        one pixel by the project's `visually-hidden` utility.

        Three attributes carry the accessibility of this, and all three are
        required together. `aria-hidden` takes the control out of the
        accessibility tree, so no screen reader announces a field that is not
        real. `tabIndex={-1}` takes it out of the tab order, which is what makes
        the `aria-hidden` legitimate — an `aria-hidden` subtree containing a
        tabbable control is itself a violation, since a keyboard user would land
        somewhere their screen reader cannot describe. `autoComplete="off"` stops
        a browser's own form fill from putting a value in it and getting a real
        visitor's enquiry silently discarded.

        There is no `label`, deliberately. The control has no presence in the
        accessibility tree to name, and a label would be user-facing copy — which
        would belong in a content module, be sent for approval, and be read by
        nobody.
      */}
      <div className="visually-hidden" aria-hidden="true">
        <input
          id={ENQUIRY_HONEYPOT_FIELD}
          name={ENQUIRY_HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Stack gap="2xl">
        {invalidFields.length > 0 && (
          /*
            The error summary. `tabIndex={-1}` makes it a focus target;
            `role="alert"` announces it when it appears. Rendered above the fields
            so it is also the first thing a sighted user sees.
          */
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="focus-ring rounded-sm border border-on-dark p-fluid-3"
          >
            <Text role="small">{content.errorSummaryLabel}</Text>

            <ul role="list" className="mt-fluid-1 flex flex-col gap-fluid-1">
              {invalidFields.map((field) => (
                <li key={field}>
                  <TextLink href={`#${fields[field].id}`} tone="dark">
                    {messageFor(field) ?? ""}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/*
          The two-column field grid. `Grid` is not used: its gap applies on both
          axes and the screenshot's row gap is wider than its column gap, so the
          two are declared separately here — which is the section owning its own
          layout change rather than a primitive being given a second gap axis for
          one caller.
        */}
        <div className="grid grid-cols-1 gap-x-fluid-6 gap-y-fluid-5 tablet:grid-cols-2">
          <Input
            id={fields.name.id}
            tone="dark"
            type="text"
            label={fields.name.label}
            requirementNote={ENQUIRY_CHROME.requiredNote}
            isRequired
            autoComplete="name"
            error={
              invalidFields.includes("name") ? messageFor("name") : undefined
            }
            onBlur={handleBlur("name")}
          />

          <Input
            id={fields.email.id}
            tone="dark"
            type="email"
            label={fields.email.label}
            requirementNote={ENQUIRY_CHROME.requiredNote}
            isRequired
            autoComplete="email"
            error={
              invalidFields.includes("email") ? messageFor("email") : undefined
            }
            onBlur={handleBlur("email")}
          />

          <Input
            id={fields.destination.id}
            tone="dark"
            type="text"
            label={fields.destination.label}
            requirementNote={ENQUIRY_CHROME.optionalNote}
          />

          <Select
            id={fields.needs.id}
            tone="dark"
            label={fields.needs.label}
            requirementNote={ENQUIRY_CHROME.optionalNote}
            options={content.needsOptions}
          />
        </div>

        {/*
          The submit button and the two lines that can follow it, centred beneath
          the grid as the screenshot draws them.
        */}
        <Stack gap="lg" align="center">
          {/*
            [MEASURED] `tone="brand"` on a dark surface, deliberately. It is the
            only primary treatment whose fill clears 3:1 against `--color-ink` —
            white at 18.06:1, against the brand fill's 2.74:1 — and it is what the
            screenshot draws. See `GetStartedEnquiry` for the full measurement and
            for the hover gap this exposes in the variant map.

            `loading` present means loading: it disables the control, sets
            `aria-busy`, holds the width, and announces the pending label through a
            live region. That, plus the early return in `handleSubmit`, is what
            blocks a double submission.
          */}
          <Button
            as="button"
            type="submit"
            variant="primary"
            tone="brand"
            loading={
              status === "pending"
                ? { label: content.submitPendingLabel }
                : undefined
            }
          >
            {content.submitLabel}
          </Button>

          {/*
            The risk-reducing line sits beneath the button, not above it: it
            exists to lower the cost of pressing the control directly above, so it
            has to be read after it.
          */}
          <Text role="small">{content.helperText}</Text>

          {/*
            Submission outcome. A live region that exists in the DOM from first
            render, so a status arriving into it is announced — a region added at
            the same moment as its content often is not.
          */}
          <div aria-live="polite" className="text-center">
            {status === "success" && (
              <Outcome message={content.successMessage} />
            )}
            {status === "failure" && (
              <Outcome message={content.failureMessage} />
            )}
          </div>
        </Stack>
      </Stack>
    </form>
  );
}

/**
 * One outcome message with its link. Not exported — both branches above render
 * it and a duplicated paragraph is a place for the two to drift apart.
 */
function Outcome({ message }: { message: LinkedMessage }) {
  return (
    <Text role="body">
      {message.lead}
      <TextLink href={message.link.href} tone="dark">
        {message.link.label}
      </TextLink>
      {message.trail}
    </Text>
  );
}

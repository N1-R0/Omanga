"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Select } from "@/components/ui/Select";
import { Text } from "@/components/ui/Text";
import { TextLink } from "@/components/ui/TextLink";
import { Textarea } from "@/components/ui/Textarea";
import { contactFormContent } from "@/content/contact-form.content";
import type { LinkedMessage } from "@/content/contact-form.content";
import {
  CONTACT_FORM_KIND,
  FORM_KIND_FIELD,
  requiresCompany,
  validateContactEnquiry,
} from "@/lib/contact-enquiry";
import type { RequiredContactField } from "@/lib/contact-enquiry";
import { ENQUIRY_HONEYPOT_FIELD } from "@/lib/enquiry";

/**
 * `Talk to us` — spec § 4, Form A.
 *
 * The only Client Component in this band, and the smallest part of it that needs
 * to be one: validation messages, the conditional company fields, submission
 * status and focus management live here. The panel around it, the option cards and
 * the whole hero stay on the server.
 *
 * The split mirrors `GetStartedEnquiry`'s exactly:
 *
 *   this file                    fields, messages, conditional logic, states
 *   lib/contact-enquiry.ts       wire names, sanitisation, validation rules
 *   lib/contact-enquiry-email.ts the notification template
 *   app/api/enquiry              the shared handler, guards and Zoho delivery
 *
 * Validation is not duplicated: `validateContactEnquiry` is the same function the
 * Route Handler runs, so the client genuinely mirrors the server rather than
 * approximating it, and the server stays authoritative. What lives here is only
 * the mapping from a failed field name to its approved message — copy, which the
 * server has no business holding.
 *
 * ---------------------------------------------------------------------------
 * Which form is open is NOT state in this component.
 *
 * It is `?enquiry=talk` on the URL, resolved on the server by `OptionsPanel`.
 * That is § 4 note 8's requirement ("reflect the selection in the URL so the
 * state is shareable and the browser back button behaves") and it is why `Go
 * back` is a link rather than a handler. This component owns only what happens
 * once the form is on screen.
 *
 * ---------------------------------------------------------------------------
 * Progressive enhancement, honestly stated. The markup is a real `form` with a
 * real submit button and native `required`, `type` and `autocomplete` attributes,
 * so the fields are usable and programmatically described before this hydrates.
 * Submission still needs JavaScript — the same deliberate stopping point
 * `EnquiryForm` records, and for the same reason: giving the `form` an `action`
 * would make the browser navigate to the endpoint and render its JSON, which § 4
 * note 6 forbids ("do not redirect to a thank-you page").
 */

type Status = "idle" | "pending" | "success" | "failure";

/** Where submissions go. The same endpoint the Get Started form posts to. */
const ENQUIRY_ENDPOINT = "/api/enquiry";

/**
 * The order the error summary lists failures in.
 *
 * [FIXED] The summary rendered `invalidFields` in array order, which is the
 * validator's push order on a failed submit and *interaction* order on the blur
 * path — so blurring the message before the name produced a summary that listed
 * the message first. A summary whose order does not match the form is a summary
 * a keyboard user cannot use to work down the page.
 *
 * This is DOM order, including the conditional company pair where it actually
 * renders — between the topic and the country, not at the end.
 */
const FIELD_ORDER: readonly RequiredContactField[] = [
  "name",
  "email",
  "topic",
  "company",
  "customer",
  "message",
  "consent",
] as const;

function inFieldOrder(
  fields: readonly RequiredContactField[],
): readonly RequiredContactField[] {
  return FIELD_ORDER.filter((field) => fields.includes(field));
}

export type TalkFormProps = {
  /** Where `Go back` returns to — the panel's own path, with no query. */
  backHref: string;
  /**
   * The id of the `h2`, from the content module.
   *
   * The heading is rendered here rather than by the panel, and that is a
   * requirement rather than a convenience: § 4 note 4 moves focus to it on
   * reveal, and a ref cannot reach across the Server/Client boundary. The panel
   * renders the cards or this component, and this component owns everything
   * inside itself.
   */
  headingId: string;
};

export function TalkForm({ backHref, headingId }: TalkFormProps) {
  const content = contactFormContent;
  const { fields } = content;

  const [invalidFields, setInvalidFields] = useState<
    readonly RequiredContactField[]
  >([]);
  const [status, setStatus] = useState<Status>("idle");
  /**
   * The selected topic, held only because two fields appear and disappear with
   * it. § 4: "Never pre-render hidden — insert on selection so the form always
   * looks as short as it actually is."
   */
  const [topic, setTopic] = useState("");

  const headingRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  /**
   * Bumped on every rejected submit, and the only reason a counter is used rather
   * than a boolean: two consecutive failed submits must both move focus, and a
   * boolean that is already `true` would not re-run the effect.
   */
  const [rejectedAt, setRejectedAt] = useState(0);

  const showsCompany = requiresCompany(topic);

  /**
   * [FIXED] The summary's entries, in DOM order, with a stale `company` error
   * dropped.
   *
   * The company field unmounts when the topic changes away from partnership or
   * business, and nothing removed its error — so the summary kept an entry
   * pointing at `#contact-company`, a fragment with no element, for a field that
   * was neither on screen nor required.
   *
   * Derived rather than pruned in an effect. An effect would set state in response
   * to state, which is the cascading render the React compiler rejects; a filter
   * at render cannot go stale because there is nothing to keep in sync. `topic` is
   * the single source of whether that field exists, and this reads it directly.
   */
  const summaryFields = inFieldOrder(
    invalidFields.filter((field) => field !== "company" || showsCompany),
  );

  /**
   * § 4 note 4: "On reveal, move focus to the form's H2 and announce it via
   * `aria-live="polite"`. Clarity does not do this; without it a screen-reader
   * user clicks a card and hears nothing."
   *
   * The heading takes `tabIndex={-1}` to be focusable. This runs once on mount,
   * which is the reveal: the component is mounted by the URL changing, so there is
   * no second moment to guard against.
   *
   * [KNOWN] It also fires on a cold load of `?enquiry=talk`, which § 4 note 8
   * supports for campaign links. Focus therefore lands mid-page on arrival rather
   * than at the top of the document. Accepted rather than worked around: a fresh
   * mount and a click-driven reveal are indistinguishable here, and someone who
   * followed a link to this form asked to be at it. Distinguishing the two would
   * mean tracking navigation history for a worse outcome in the common case.
   */
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  /**
   * [FIXED] The error summary takes focus in an effect, not inside the submit
   * handler.
   *
   * It used to call `summaryRef.current?.focus()` immediately after
   * `setInvalidFields`. The summary is conditionally rendered, so on the *first*
   * failed submit the node did not exist yet, the ref was `null`, and focus stayed
   * on the submit button — it only worked from the second failure onward. The
   * `role="alert"` announcement always fired, which is why this reads as working
   * until a keyboard user tries to reach the fields.
   *
   * Running after the commit is what makes the node exist. `rejectedAt` rather
   * than `invalidFields` as the dependency: the blur path also changes
   * `invalidFields`, and stealing focus while someone is tabbing between fields
   * would be worse than the bug.
   */
  useEffect(() => {
    if (rejectedAt > 0) {
      summaryRef.current?.focus();
    }
  }, [rejectedAt]);

  /**
   * Moves focus to the heading once the form is replaced by its success message.
   *
   * Without it focus falls to `<body>`: the submit button is unmounted at the same
   * commit, and a keyboard user is returned to the top of the document with no
   * indication of what happened. The heading is the nearest thing that is still
   * on screen and still describes where they are.
   */
  useEffect(() => {
    if (status === "success") {
      headingRef.current?.focus();
    }
  }, [status]);

  /*
    Returns `string`, not `string | undefined`. The seven fields the validator can
    reject are typed `RequiredFormField`, which makes `errorWhenEmpty` mandatory —
    so the summary can never render an anchor with no accessible name.
  */
  const messageFor = (field: RequiredContactField): string =>
    fields[field].errorWhenEmpty;

  /**
   * Re-validates one field on blur and clears its message once corrected, which
   * is what § 4 note 7 requires — "validation on blur, not on keystroke". It runs
   * the whole validator and keeps only this field's result, so there is one
   * validation function rather than two that can disagree.
   *
   * The form is reached through the control that fired the event rather than
   * through a ref: a ref read inside a closure created during render is
   * indistinguishable to the compiler from a ref read *at* render, and the event
   * already carries everything needed.
   */
  const handleBlur =
    (field: RequiredContactField) =>
    (event: React.FocusEvent<HTMLElement>): void => {
      const form = (event.currentTarget as HTMLElement).closest("form");

      if (form === null) {
        return;
      }

      const result = validateContactEnquiry(new FormData(form));
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
    const result = validateContactEnquiry(values);

    if (!result.isValid) {
      setInvalidFields(result.invalidFields);
      setStatus("idle");
      /*
        The summary takes focus rather than the first invalid control. It carries
        every message, so a screen-reader user hears the whole problem before
        being placed in a field — and the summary's own links move focus to the
        fields themselves. The move itself happens in the effect above, once the
        summary exists.
      */
      setRejectedAt((count) => count + 1);
      return;
    }

    setInvalidFields([]);
    setStatus("pending");

    /*
      The server validates the same values again with the same function and is
      authoritative. A 422 means the client and the server disagreed, which is a
      state the user cannot act on differently from any other failure — so it
      reports the same message rather than a second kind of error the approved
      copy does not have.
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

  /*
    § 4 note 6: success and error render "in place of the fields, inside the same
    container". So a successful submission replaces the whole field stack rather
    than sitting under it — there is nothing left to fill in, and leaving the
    fields on screen invites a second identical enquiry.
  */
  /*
    The heading block, shown by every state. `tabIndex={-1}` is what makes the
    `h2` a focus target for § 4 note 4 — without it the effect above moves the
    scroll but leaves focus at the card the visitor just left, so the next Tab
    returns them to the options rather than into the form. The same failure mode
    the layout's skip link documents.

    `Heading` takes no `ref` or `tabIndex`, and it should not: a primitive that
    could take focus could take it in the wrong place. So the wrapper is the
    focus target and carries the ref, which keeps the `h2` itself a plain
    heading.
  */
  const headingBlock = (
    <Stack gap="lg" align="start">
      <BackLink href={backHref} label={content.backLabel} />

      <div ref={headingRef} tabIndex={-1} className="focus-ring">
        <Heading id={headingId} level="h2" role="feature" measure="none">
          {content.heading}
        </Heading>
      </div>
    </Stack>
  );

  const isSuccess = status === "success";

  return (
    <Stack gap="xl" align="stretch">
      {headingBlock}

      {/*
        [FIXED] One live region, mounted from first render, holding whichever
        outcome applies.

        The success message used to live in a region inserted at the same commit as
        its content, which is exactly the failure mode the failure path already
        documented — a region added together with its text is often not announced
        at all. There is now one region for both outcomes and it is always in the
        DOM, so a status arriving into it is a change to an existing region.

        It sits directly under the heading rather than below the button, because on
        success the button is gone and a message anchored to it would move.
      */}
      <div aria-live="polite">
        {isSuccess && <Outcome message={content.successMessage} />}
        {status === "failure" && <Outcome message={content.failureMessage} />}
      </div>

      {/*
        § 4A's intro. It sits between the heading and the fields, which is where
        § 4 draws it, and it carries the response-time promise the content module
        flags as `[VERIFY]`.

        Hidden on success along with the fields: § 4 note 6 renders the outcome
        "in place of the fields", and an intro telling someone to describe what
        they need, above a message saying it has been received, contradicts itself.
      */}
      {!isSuccess && (
        <Text role="small" measure="none">
          {content.intro}
        </Text>
      )}

      {/*
        `noValidate` hands validation to this component rather than to the
        browser. Not a downgrade: the native bubbles cannot be styled, appear one
        at a time, vanish on the next interaction, and would pre-empt the error
        summary § 4 note 4 requires. The `required`, `type` and `autocomplete`
        attributes stay on the controls regardless — they are what make the
        fields' state programmatic, and they are the server's contract too.
      */}
      {/*
        § 4 note 6: the outcome renders "in place of the fields, inside the same
        container. Do not redirect to a thank-you page." So a successful submission
        unmounts the whole field stack — there is nothing left to fill in, and
        leaving the fields on screen invites a second identical enquiry.
      */}
      {!isSuccess && (
        <form noValidate onSubmit={handleSubmit}>
          {/*
          The form kind, and the honeypot.

          The kind is what tells the shared Route Handler which validator and
          which email template to use — see `FORM_KIND_FIELD`. The honeypot is the
          same decoy the Get Started form uses, and the handler checks it before
          it looks at anything else.

          Both are outside the `Stack` so neither can open a gap in the layout: a
          `visually-hidden` element inside a flex column still counts as a child
          and still gets a gap on either side.

          Three attributes carry the honeypot's accessibility and all three are
          required together. `aria-hidden` takes it out of the accessibility tree;
          `tabIndex={-1}` takes it out of the tab order, which is what makes the
          `aria-hidden` legitimate; `autoComplete="off"` stops a browser's own form
          fill putting a value in it and getting a real enquiry silently discarded.
        */}
          <input
            type="hidden"
            name={FORM_KIND_FIELD}
            value={CONTACT_FORM_KIND}
          />

          <div className="visually-hidden" aria-hidden="true">
            <input
              id={`${ENQUIRY_HONEYPOT_FIELD}-contact`}
              name={ENQUIRY_HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Stack gap="xl" align="stretch">
            {summaryFields.length > 0 && (
              /*
              The error summary. `tabIndex={-1}` makes it a focus target;
              `role="alert"` announces it when it appears. Rendered above the
              fields so it is also the first thing a sighted user sees. Each entry
              links to its field, which is why the radio group carries an id on its
              `fieldset`.
            */
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="focus-ring rounded-sm border border-border-hairline p-fluid-3"
              >
                <Text role="small">{content.errorSummaryLabel}</Text>

                <ul
                  role="list"
                  className="mt-fluid-1 flex flex-col gap-fluid-1"
                >
                  {summaryFields.map((field) => (
                    <li key={field}>
                      <TextLink href={`#${fields[field].id}`} tone="light">
                        {messageFor(field)}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/*
            Single column throughout, per § 4 note 9. Not a two-up grid like the
            Get Started form's: this stack sits in half a band rather than across
            the content column, and § 4 specifies "single-column field stack".
          */}
            <Stack gap="lg" align="stretch">
              <Input
                id={fields.name.id}
                tone="light"
                type="text"
                label={fields.name.label}
                requirementNote={fields.name.requirementNote}
                isRequired
                autoComplete="name"
                error={
                  invalidFields.includes("name")
                    ? messageFor("name")
                    : undefined
                }
                onBlur={handleBlur("name")}
              />

              <Input
                id={fields.email.id}
                tone="light"
                type="email"
                label={fields.email.label}
                requirementNote={fields.email.requirementNote}
                isRequired
                autoComplete="email"
                error={
                  invalidFields.includes("email")
                    ? messageFor("email")
                    : undefined
                }
                onBlur={handleBlur("email")}
              />

              <Input
                id={fields.whatsapp.id}
                tone="light"
                type="tel"
                label={fields.whatsapp.label}
                requirementNote={fields.whatsapp.requirementNote}
                description={fields.whatsapp.description}
                autoComplete="tel"
              />

              {/*
              The routing field. Its `onChange` is the only place this component
              tracks a value, and only because two fields appear with it.
            */}
              <Select
                id={fields.topic.id}
                tone="light"
                label={fields.topic.label}
                requirementNote={fields.topic.requirementNote}
                options={fields.topic.options}
                isRequired
                error={
                  invalidFields.includes("topic")
                    ? messageFor("topic")
                    : undefined
                }
                onBlur={handleBlur("topic")}
                onChange={(event) => setTopic(event.currentTarget.value)}
              />

              {/*
              § 4's only conditional logic, inserted rather than hidden: "never
              pre-render hidden — insert on selection so the form always looks as
              short as it actually is. This is the only conditional logic on the
              page; resist adding more."

              The server re-derives the same condition from the submitted topic,
              so a partnership enquiry cannot arrive without a company name even
              if the client rendered something else.
            */}
              {showsCompany && (
                <>
                  <Input
                    id={fields.company.id}
                    tone="light"
                    type="text"
                    label={fields.company.label}
                    requirementNote={fields.company.requirementNote}
                    isRequired
                    autoComplete="organization"
                    error={
                      invalidFields.includes("company")
                        ? messageFor("company")
                        : undefined
                    }
                    onBlur={handleBlur("company")}
                  />

                  <Input
                    id={fields.role.id}
                    tone="light"
                    type="text"
                    label={fields.role.label}
                    requirementNote={fields.role.requirementNote}
                    autoComplete="organization-title"
                  />
                </>
              )}

              {/*
              [CHANGED] Free text, where § 4 asks for a searchable select of the
              43 covered countries. No list of the 43 exists in the repository and
              a coverage list on an insurance product is a factual claim — see the
              content module. The routing signal survives; the validation and the
              coverage-claim reinforcement do not.
            */}
              <Input
                id={fields.country.id}
                tone="light"
                type="text"
                label={fields.country.label}
                requirementNote={fields.country.requirementNote}
                autoComplete="country-name"
              />

              <RadioGroup
                id={fields.customer.id}
                tone="light"
                label={fields.customer.label}
                requirementNote={fields.customer.requirementNote}
                options={fields.customer.options}
                isRequired
                error={
                  invalidFields.includes("customer")
                    ? messageFor("customer")
                    : undefined
                }
                onBlur={handleBlur("customer")}
              />

              <Textarea
                id={fields.message.id}
                tone="light"
                label={fields.message.label}
                requirementNote={fields.message.requirementNote}
                placeholder={fields.message.placeholder}
                isRequired
                rows={4}
                error={
                  invalidFields.includes("message")
                    ? messageFor("message")
                    : undefined
                }
                onBlur={handleBlur("message")}
              />

              <Checkbox
                id={fields.consent.id}
                tone="light"
                label={fields.consent.label}
                requirementNote={fields.consent.requirementNote}
                isRequired
                error={
                  invalidFields.includes("consent")
                    ? messageFor("consent")
                    : undefined
                }
                onBlur={handleBlur("consent")}
              />
            </Stack>

            <Stack gap="md" align="start">
              {/*
              `loading` present means loading: it disables the control, sets
              `aria-busy`, holds the width, and announces the pending label
              through a live region. That, plus the early return in
              `handleSubmit`, is what blocks a double submission — § 4 note 5.
            */}
              <Button
                as="button"
                type="submit"
                variant="primary"
                tone="light"
                loading={
                  status === "pending"
                    ? { label: content.submitPendingLabel }
                    : undefined
                }
              >
                {content.submitLabel}
              </Button>

              {/*
              The WhatsApp fallback beneath Submit. § Conversion notes: "catches
              the visitor who reaches the button and hesitates. Costs nothing,
              recovers otherwise-lost intent." It sits beneath the button, not
              above, because it exists to be read after the control it offers an
              alternative to.
            */}
              <Text role="small">
                {content.helper.lead}
                <TextLink
                  href={content.helper.link.href}
                  tone="light"
                  isExternal={content.helper.link.isExternal}
                >
                  {content.helper.link.label}
                </TextLink>
                {content.helper.trail}
              </Text>
            </Stack>
          </Stack>
        </form>
      )}
    </Stack>
  );
}

/**
 * The form's heading and `Go back`, which every state shows.
 *
 * `Go back` is a link to the panel's own path with no query — so it returns to the
 * two cards by unsetting the selection rather than by clearing state, the browser
 * back button does the same thing, and it works with JavaScript disabled.
 *
 * `scroll={false}` holds the scroll position, which § 4 note 2 requires: "`Go
 * back` returns to the grid and clears nothing". Values are not preserved across
 * the round trip, and that is the one place this falls short of § 4's "if a
 * visitor bounces back to check the other option, their typed input survives" —
 * § 4 itself notes the benchmark discards it too and calls retention "a small,
 * free improvement". It is not free here: the form is unmounted by the URL
 * changing, so retaining values means lifting them into storage that outlives it.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      scroll={false}
      className="inline-flex items-center gap-fluid-1 font-sans text-small text-brand focus-ring transition-standard hover:text-ink"
    >
      {/*
        The arrow is rotated rather than a second glyph. design.md § 9: "Arrows
        point right for forward navigation. No other directional glyphs on this
        page" — so the set holds one arrow by design, and a back control turns it
        instead of adding a left one. A static transform, not motion.
      */}
      <ArrowRight size="sm" />
      <span>{label}</span>
    </Link>
  );
}

/**
 * One outcome message with its link. Not exported — both branches render it and a
 * duplicated paragraph is a place for the two to drift apart.
 */
function Outcome({ message }: { message: LinkedMessage }) {
  return (
    <Text role="body">
      {message.lead}
      <TextLink
        href={message.link.href}
        tone="light"
        isExternal={message.link.isExternal}
      >
        {message.link.label}
      </TextLink>
      {message.trail}
    </Text>
  );
}

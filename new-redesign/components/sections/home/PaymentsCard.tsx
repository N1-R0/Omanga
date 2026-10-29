import { crossMatrix, getNgnRates } from "@/lib/rates";
import { RateConvertScreen } from "@/new-redesign/components/sections/home/RateConvertScreen";
import { Card } from "@/new-redesign/components/ui/Card";
import { PhoneFrame } from "@/new-redesign/components/ui/PhoneFrame";
import { homeRates } from "@/new-redesign/content/home.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

export async function PaymentsCard() {
  const { eyebrow, title, sub, photo } = homeRates;
  const { rates } = await getNgnRates();

  return (
    <article id="rates" aria-labelledby="rates-title">
        <Card className="grid items-center gap-8 p-3 md:p-4 lg:grid-cols-2 lg:gap-0">
          <div className="flex max-w-[440px] flex-col gap-[var(--head-gap)] px-3 pt-5 md:px-6 lg:mx-auto lg:px-0 lg:pt-0">
            <p className="type-p2 inline-flex items-center gap-2">
              <span aria-hidden className="h-2 w-3.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
            <div className="flex flex-col gap-[var(--head-sub-gap)]">
              <h3 id="rates-title" className="type-h2 text-balance">
                {title}
              </h3>
              <p className="type-p1 text-text-secondary">{sub}</p>
            </div>
          </div>

          <div className="relative isolate flex h-[486px] justify-center overflow-hidden rounded-sm pt-12 md:h-[540px] md:pt-[60px] lg:h-[566px] lg:pt-16">
            <Photo src={photo.src} alt="" fill sizes="(min-width: 1024px) 540px, 100vw" className="-z-10 object-cover" style={{ objectPosition: photo.position }} />
            <div className="h-fit">
              <PhoneFrame decorative={false} className="[--phone-scale:0.85] md:[--phone-scale:0.95] lg:[--phone-scale:1]">
                <RateConvertScreen matrix={crossMatrix(rates)} />
              </PhoneFrame>
            </div>
          </div>
        </Card>
    </article>
  );
}

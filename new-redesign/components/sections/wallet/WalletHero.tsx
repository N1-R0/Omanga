import { WALLET_URL } from "@/config/site";
import { crossMatrix, formatRateDate, getNgnRates } from "@/lib/rates";
import { Button } from "@/new-redesign/components/ui/Button";
import { Converter } from "@/new-redesign/components/ui/Converter";
import { walletHero } from "@/new-redesign/content/wallet.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

export async function WalletHero() {
  const { title, sub, primary, photo } = walletHero;
  const { rates, date } = await getNgnRates();

  return (
    <section aria-labelledby="wallet-hero-title" className="bg-bg">
      <div className="container-page flex flex-col items-center pt-[calc(76px+clamp(48px,9vh,112px))] text-center">
        <h1 id="wallet-hero-title" className="type-h1">
          {title.map((line) => (
            <span key={line} className="block text-balance">
              {line}
            </span>
          ))}
        </h1>
        <p className="type-p1 mt-5 max-w-[480px] text-text-secondary">{sub}</p>

        <div className="mt-8">
          <Button href={WALLET_URL} external>
            {primary.label} <span aria-hidden className="ml-2">→</span>
          </Button>
        </div>

        <div className="relative isolate -mx-4 mt-14 flex w-[calc(100%+2rem)] justify-center px-4 py-10 md:mx-0 md:mt-16 md:w-full md:py-20">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden md:rounded-sm">
            <Photo src={photo.src} alt="" fill preload sizes="(min-width: 1112px) 1080px, 100vw" className="object-cover" style={{ objectPosition: photo.position }} />
          </div>
          <div className="w-full max-w-[400px] rounded-[24px] border border-neutral-0/60 bg-neutral-0/30 p-2 text-left shadow-float backdrop-blur-[10px]">
            <Converter matrix={crossMatrix(rates)} updated={formatRateDate(date) ?? "latest available"} />
          </div>
        </div>
      </div>
    </section>
  );
}

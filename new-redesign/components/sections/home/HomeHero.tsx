import { WALLET_URL } from "@/config/site";
import { Button } from "@/new-redesign/components/ui/Button";
import { href } from "@/new-redesign/config/routes";
import { homeHero } from "@/new-redesign/content/home.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

export function HomeHero() {
  const { title, sub, primary, secondary, photo } = homeHero;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex h-svh min-h-fit w-full bg-[#3f5c98] text-text-inverse"
    >
      <Photo
        src={photo.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover"
        style={{ objectPosition: photo.position }}
      />

      <div className="container-page flex flex-col items-center pt-[calc(76px+clamp(24px,6vh,72px))] text-center">
        <div className="flex max-w-[640px] flex-col items-center gap-4">
          <h1 id="hero-title" className="type-h1">
            {title.map((line) => (
              <span key={line} className="block text-balance">
                {line}
              </span>
            ))}
          </h1>
          <p className="type-p1 max-w-[520px] text-text-inverse/90">{sub}</p>
        </div>
        <div className="mt-[clamp(20px,3.5vh,32px)] flex flex-wrap items-center justify-center gap-3">
          <Button href={WALLET_URL} external variant="inverse">
            {primary.label}
          </Button>
          <Button href={href(secondary.path)} variant="onPhoto">
            {secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

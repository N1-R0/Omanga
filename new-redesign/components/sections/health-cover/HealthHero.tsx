import { href } from "@/new-redesign/config/routes";

import { FeatureLottie } from "@/new-redesign/components/sections/home/FeatureLottie";
import { Button } from "@/new-redesign/components/ui/Button";
import { healthHero } from "@/new-redesign/content/health-cover.content";
import { Photo } from "@/new-redesign/components/ui/Photo";

export function HealthHero() {
  const { title, sub, primary, scene, photo } = healthHero;

  return (
    <section aria-labelledby="health-hero-title" className="bg-bg">
      <div className="container-page flex flex-col items-center pt-[calc(76px+clamp(48px,9vh,112px))] text-center">
        <h1 id="health-hero-title" className="type-h1">
          {title.map((line) => (
            <span key={line} className="block text-balance">
              {line}
            </span>
          ))}
        </h1>
        <p className="type-p1 mt-5 max-w-[520px] text-text-secondary">{sub}</p>

        <div className="mt-8">
          <Button href={href(primary.path)}>
            {primary.label} <span aria-hidden className="ml-2">→</span>
          </Button>
        </div>

        <div className="relative isolate -mx-4 mt-14 h-[440px] w-[calc(100%+2rem)] overflow-hidden md:mx-0 md:mt-16 md:h-[600px] md:w-full md:rounded-sm">
          <Photo src={photo.src} alt="" fill preload sizes="(min-width: 1112px) 1080px, 100vw" className="-z-10 object-cover" style={{ objectPosition: photo.position }} />
          <FeatureLottie
            scene={scene}
            active
            className="absolute inset-y-0 left-1/2 aspect-[1080/600] h-full -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}

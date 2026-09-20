"use client";

import { Img as Image } from "@/components/ui/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { IconChevronLeft, IconChevronRight, IconClose } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { PropertyImage } from "@/lib/types/property";

/**
 * Property gallery with an accessible lightbox.
 *
 * Accessibility:
 *   - thumbnails are buttons, labelled with the image's alt text;
 *   - the lightbox is a modal dialog: focus moves in, is kept inside while
 *     open, and returns to the trigger on close;
 *   - Escape closes, arrow keys move between images, and the current position
 *     is announced;
 *   - the reduced-motion preference is respected via the global CSS rule.
 *
 * Performance: the first image is eager (it is usually the LCP element on a
 * property page) and the rest are lazy. Full-size images mount only while the
 * lightbox is open.
 */
export function PropertyGallery({ images, propertyName }: { images: PropertyImage[]; propertyName: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback((index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenAt(index);
  }, []);

  const close = useCallback(() => {
    setOpenAt(null);
    triggerRef.current?.focus();
  }, []);

  if (!images.length) return null;

  const [cover, ...rest] = images;
  const secondary = rest.slice(0, 4);

  return (
    <>
      {/* Desktop: a cover image with a supporting grid. Mobile: a snap row. */}
      <div className="hidden gap-2 sm:grid sm:grid-cols-4 sm:grid-rows-2">
        {cover ? (
          <GalleryTile
            image={cover}
            index={0}
            onOpen={open}
            priority
            sizes="(min-width: 1280px) 620px, 50vw"
            className="col-span-2 row-span-2 aspect-[4/3] rounded-l-[var(--radius-panel)]"
          />
        ) : null}
        {secondary.map((image, index) => (
          <GalleryTile
            key={image.src}
            image={image}
            index={index + 1}
            onOpen={open}
            sizes="(min-width: 1280px) 310px, 25vw"
            className={cn(
              "aspect-[4/3]",
              index === 1 && "rounded-tr-[var(--radius-panel)]",
              index === 3 && "rounded-br-[var(--radius-panel)]",
            )}
            more={index === 3 && images.length > 5 ? images.length - 5 : undefined}
          />
        ))}
      </div>

      <div className="snap-row -mx-4 flex gap-2 px-4 sm:hidden">
        {images.map((image, index) => (
          <GalleryTile
            key={image.src}
            image={image}
            index={index}
            onOpen={open}
            priority={index === 0}
            sizes="88vw"
            className="aspect-[4/3] w-[88vw] shrink-0 rounded-[var(--radius-card)]"
          />
        ))}
      </div>

      <p className="mt-3 text-center text-sm text-ink-subtle sm:text-left">
        {images.length} {images.length === 1 ? "photo" : "photos"} &middot; select an image to view it
        full size
      </p>

      {openAt !== null ? (
        <Lightbox images={images} startIndex={openAt} propertyName={propertyName} onClose={close} />
      ) : null}
    </>
  );
}

function GalleryTile({
  image,
  index,
  onOpen,
  className,
  sizes,
  priority,
  more,
}: {
  image: PropertyImage;
  index: number;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
  className?: string;
  sizes: string;
  priority?: boolean;
  more?: number;
}) {
  return (
    <button
      type="button"
      onClick={(event) => onOpen(index, event.currentTarget)}
      className={cn(
        "group relative overflow-hidden bg-linen-300",
        "transition-[filter] duration-300 hover:brightness-[0.94]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="object-cover"
      />
      {more ? (
        <span className="absolute inset-0 flex items-center justify-center bg-linen-950/55 text-base font-medium text-linen-50">
          +{more} more
        </span>
      ) : null}
      <span className="sr-only">View image: {image.alt}</span>
    </button>
  );
}

function Lightbox({
  images,
  startIndex,
  propertyName,
  onClose,
}: {
  images: PropertyImage[];
  startIndex: number;
  propertyName: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const next = useCallback(() => setIndex((value) => (value + 1) % images.length), [images.length]);
  const previous = useCallback(
    () => setIndex((value) => (value - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        next();
        return;
      }
      if (event.key === "ArrowLeft") {
        previous();
        return;
      }
      // Keep focus inside the dialog while it is open.
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [next, previous, onClose]);

  const current = images[index];
  if (!current) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${propertyName} photo gallery`}
      className="fixed inset-0 z-[60] flex flex-col bg-linen-950/96"
    >
      <div className="flex items-center justify-between gap-4 p-4 text-linen-200">
        <p aria-live="polite" className="text-sm">
          {index + 1} of {images.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-linen-100 transition-colors hover:bg-white/10"
        >
          <IconClose className="h-5 w-5" />
          <span className="sr-only">Close gallery</span>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-2 pb-4 sm:px-16">
        <div className="relative h-full w-full max-w-5xl">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-contain"
            priority
          />
        </div>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={previous}
              className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-linen-950/60 text-linen-100 transition-colors hover:bg-white/15 sm:left-3"
            >
              <IconChevronLeft />
              <span className="sr-only">Previous image</span>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-linen-950/60 text-linen-100 transition-colors hover:bg-white/15 sm:right-3"
            >
              <IconChevronRight />
              <span className="sr-only">Next image</span>
            </button>
          </>
        ) : null}
      </div>

      {current.caption ? (
        <p className="px-4 pb-6 text-center text-sm text-linen-300">{current.caption}</p>
      ) : null}
    </div>
  );
}

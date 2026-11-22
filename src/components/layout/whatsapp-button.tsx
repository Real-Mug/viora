import { IconWhatsApp } from "@/components/ui/icon-whatsapp";
import { whatsappHref } from "@/lib/config/site";

/**
 * The floating "Chat with us" button, bottom right on every page. It opens a
 * WhatsApp chat with the number in site config (the app on a phone, WhatsApp
 * Web on a computer).
 *
 * Plain link, no JavaScript. On a property page the phone-only action bar also
 * sits at the bottom of the screen; while it shows it sets
 * data-action-bar on <html>, and the .whatsapp-float rule in globals.css lifts
 * the button above it.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float fixed z-30 inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3.5 pr-4 text-[0.9375rem] font-semibold text-[#0b3d20] shadow-lifted transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-evergreen-900"
    >
      <IconWhatsApp className="h-6 w-6" />
      Chat with us
      <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
    </a>
  );
}

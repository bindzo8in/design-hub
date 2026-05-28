"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ContactPopup from "./contact-popup";

const POPUP_KEY = "contact-popup-last-shown";

const POPUP_DELAY_DAYS = 7;

const ContactPopupTrigger = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // homepage only
    if (pathname !== "/") return;

    const lastShown = localStorage.getItem(POPUP_KEY);

    // check if already shown recently
    if (lastShown) {
      const daysPassed =
        (Date.now() - Number(lastShown)) /
        (1000 * 60 * 60 * 24);

      // don't show again before 7 days
      if (daysPassed < POPUP_DELAY_DAYS) {
        return;
      }
    }

    let timer: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const scrollPercent =
        (scrollPosition / pageHeight) * 100;

      // trigger after 25% scroll
      if (scrollPercent > 25) {
        window.removeEventListener("scroll", handleScroll);

        timer = setTimeout(() => {
          setOpen(true);

          // store timestamp
          localStorage.setItem(
            POPUP_KEY,
            Date.now().toString(),
          );
        }, 2500);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [pathname]);

  return (
    <ContactPopup
      open={open}
      onClose={() => setOpen(false)}
    />
  );
};

export default ContactPopupTrigger;
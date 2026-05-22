import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import {
  FaPinterest,
  FaInstagram,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaMapMarker,
} from "react-icons/fa";
import { IoIosPhonePortrait, IoMdMailOpen } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { footer_items } from "./utils";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-secondary pb-28 pt-12 text-secondary-foreground lg:py-16 flex justify-center items-center">
      <div className="container @container relative">
        {/* responsive round shape */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute rounded-full border-secondary-foreground/10

            h-[clamp(14rem,32cqw,34rem)]
            w-[clamp(14rem,32cqw,34rem)]
            border-[clamp(2.5rem,5cqw,5.5rem)]
            -top-[clamp(6rem,10cqw,12rem)]
            right-[clamp(-16rem,-12cqw,-5rem)]

            lg:h-[clamp(20rem,26cqw,38rem)]
            lg:w-[clamp(20rem,26cqw,38rem)]
            lg:border-[clamp(3.5rem,4cqw,6rem)]
            lg:-top-[clamp(8rem,9cqw,14rem)]
            lg:right-[clamp(-18rem,-10cqw,-7rem)]

            2xl:h-[clamp(24rem,24cqw,42rem)]
            2xl:w-[clamp(24rem,24cqw,42rem)]
            2xl:border-[clamp(4rem,3.5cqw,6rem)]
            2xl:-top-[clamp(10rem,8cqw,16rem)]
            2xl:right-[clamp(-20rem,-9cqw,-8rem)]
          "
        />

        <div className="relative z-10 flex min-h-[50vh] flex-col gap-10">
          {/* top section */}
          <section className="w-full">
            <figure className="flex justify-start">
              <Image
                src="/logo/light.png"
                alt="Design Hub Logo"
                width={180}
                height={64}
                className="h-11 w-auto object-contain dark:hidden lg:h-16"
              />
              <Image
                src="/logo/dark.png"
                alt="Design Hub Logo"
                width={180}
                height={64}
                className="hidden h-11 w-auto object-contain dark:block lg:h-16"
              />
            </figure>
          </section>

          {/* main content */}
          <section className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16 p-4">
            {/* quick links */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-secondary-foreground">
                Quick Links
              </h2>

              <nav className="space-y-2">
                {footer_items.quick_links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-secondary-foreground"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* our features */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-secondary-foreground">
                Our Features
              </h2>

              <nav className="space-y-2">
                {footer_items.our_features.map((feature, index) => (
                  <Link
                    key={index}
                    href={feature.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-secondary-foreground"
                  >
                    {feature.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* contact us */}
            <div className="space-y-3 sm:col-span-2 lg:col-span-1">
              <h2 className="text-base font-semibold text-secondary-foreground">
                Contact Us
              </h2>

              <div className="space-y-3 text-sm text-muted-foreground">
                <a
                  href="http://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-secondary-foreground"
                >
                  <FaMapMarker className="mt-1 h-4 w-4 shrink-0" />
                  <address className="not-italic">Coimbatore</address>
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 transition-colors hover:text-secondary-foreground"
                >
                  <IoIosPhonePortrait className="h-4 w-4 shrink-0" />
                  <span>+91 98765 43210</span>
                </a>

                <a
                  href="mailto:testmail@gmail.com"
                  className="flex items-center gap-3 break-all transition-colors hover:text-secondary-foreground"
                >
                  <IoMdMailOpen className="h-4 w-4 shrink-0" />
                  <span>testmail@gmail.com</span>
                </a>
              </div>
            </div>
          </section>

          <Separator className="w-full bg-secondary-foreground/10" />

          {/* bottom section */}
          <section className="w-full space-y-4">
            {/* social links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <FaInstagram className="h-5 w-5 cursor-pointer text-muted-foreground transition-colors hover:text-secondary-foreground sm:h-6 sm:w-6" />
              <FaLinkedin className="h-5 w-5 cursor-pointer text-muted-foreground transition-colors hover:text-secondary-foreground sm:h-6 sm:w-6" />
              <FaFacebook className="h-5 w-5 cursor-pointer text-muted-foreground transition-colors hover:text-secondary-foreground sm:h-6 sm:w-6" />
              <FaXTwitter className="h-5 w-5 cursor-pointer text-muted-foreground transition-colors hover:text-secondary-foreground sm:h-6 sm:w-6" />
              <FaGoogle className="h-5 w-5 cursor-pointer text-muted-foreground transition-colors hover:text-secondary-foreground sm:h-6 sm:w-6" />
              <FaPinterest className="h-5 w-5 cursor-pointer text-muted-foreground transition-colors hover:text-secondary-foreground sm:h-6 sm:w-6" />
            </div>

            {/* copyright */}
            <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Copyright © {new Date().getFullYear()}, Bindzo 8 IT Solutions All
              Rights Reserved.
            </p>

            {/* outro */}
            <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {footer_items.outro}
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
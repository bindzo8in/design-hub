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
    <footer className="relative overflow-hidden bg-secondary text-secondary-foreground">
      {/* background circle */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-80 w-80 rounded-full
          border-[40px] border-secondary-foreground/10

          sm:-right-48 sm:-top-48
          sm:h-[26rem] sm:w-[26rem]

          lg:-right-56 lg:-top-56
          lg:h-[34rem] lg:w-[34rem]
          lg:border-[70px]
        "
      />

      <div className="container relative z-10 mx-auto px-6 py-12 sm:px-8 lg:px-12 xl:px-16 lg:py-16">
        <div className="flex flex-col gap-12">
          {/* top logo */}
          <div className="flex justify-center sm:justify-start">
            <Image
              src="/logo/light.png"
              alt="Design Hub Logo"
              width={180}
              height={64}
              className="h-10 w-auto object-contain dark:hidden sm:h-12 lg:h-14"
            />

            <Image
              src="/logo/dark.png"
              alt="Design Hub Logo"
              width={180}
              height={64}
              className="hidden h-10 w-auto object-contain dark:block sm:h-12 lg:h-14"
            />
          </div>

          {/* content */}
          <div
            className="
              grid grid-cols-1 gap-10

              sm:grid-cols-2
              lg:grid-cols-3
              lg:gap-16
            "
          >
            {/* quick links */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Quick Links</h2>

              <nav className="flex flex-col gap-2">
                {footer_items.quick_links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="
                      text-sm text-muted-foreground
                      transition-colors duration-300
                      hover:text-secondary-foreground
                    "
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* features */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Our Features</h2>

              <nav className="flex flex-col gap-2">
                {footer_items.our_features.map((feature, index) => (
                  <Link
                    key={index}
                    href={feature.href}
                    className="
                      text-sm text-muted-foreground
                      transition-colors duration-300
                      hover:text-secondary-foreground
                    "
                  >
                    {feature.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* contact */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <h2 className="text-lg font-semibold">Contact Us</h2>

              <div className="space-y-4 text-sm text-muted-foreground">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-start gap-3
                    transition-colors duration-300
                    hover:text-secondary-foreground
                  "
                >
                  <FaMapMarker className="mt-1 h-4 w-4 shrink-0" />
                  <address className="not-italic leading-relaxed">
                    Coimbatore, Tamil Nadu
                  </address>
                </a>

                <a
                  href="tel:+919876543210"
                  className="
                    flex items-center gap-3
                    transition-colors duration-300
                    hover:text-secondary-foreground
                  "
                >
                  <IoIosPhonePortrait className="h-4 w-4 shrink-0" />
                  <span>+91 98765 43210</span>
                </a>

                <a
                  href="mailto:testmail@gmail.com"
                  className="
                    flex items-center gap-3 break-all
                    transition-colors duration-300
                    hover:text-secondary-foreground
                  "
                >
                  <IoMdMailOpen className="h-4 w-4 shrink-0" />
                  <span>testmail@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <Separator className="bg-secondary-foreground/10" />

          {/* bottom */}
          <div className="space-y-6">
            {/* socials */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              {[
                FaInstagram,
                FaLinkedin,
                FaFacebook,
                FaXTwitter,
                FaGoogle,
                FaPinterest,
              ].map((Icon, index) => (
                <div
                  key={index}
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full border border-secondary-foreground/10
                    text-muted-foreground
                    transition-all duration-300
                    hover:scale-110
                    hover:border-secondary-foreground/30
                    hover:text-secondary-foreground
                  "
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              ))}
            </div>

            {/* copyright */}
            <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Copyright © {new Date().getFullYear()}, Bindzo 8 IT Solutions. All
              Rights Reserved.
            </p>

            {/* outro */}
            <p
              className="
                mx-auto max-w-3xl
                text-center text-xs leading-relaxed
                text-muted-foreground
                sm:text-sm
              "
            >
              {footer_items.outro}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

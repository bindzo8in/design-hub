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

const socials = [
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaXTwitter,
  FaGoogle,
  FaPinterest,
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-secondary text-secondary-foreground">
      {/* ====================================== */}
      {/* BACKGROUND */}
      {/* ====================================== */}

      {/* circle */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          -right-32
          -top-32

          h-64
          w-64

          rounded-full
          border-[28px]
          border-secondary-foreground/5

          sm:-right-40
          sm:-top-40
          sm:h-80
          sm:w-80

          lg:-right-52
          lg:-top-52
          lg:h-[34rem]
          lg:w-[34rem]
          lg:border-[70px]
        "
      />

      {/* glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          -translate-x-1/2

          h-[240px]
          w-[240px]

          rounded-full
          bg-white/5
          blur-[120px]

          sm:h-[340px]
          sm:w-[340px]
        "
      />

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <div
        className="
          relative z-10
          mx-auto
          max-w-7xl

          px-4
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
      >
        {/* top */}
        <div
          className="
            flex flex-col
            gap-12

            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* brand */}
          <div className="max-w-sm">
            {/* logo */}
            <div className="mb-6">
              <Image
                src="/logo/light.png"
                alt="Design Hub Logo"
                width={180}
                height={64}
                className="h-10 w-auto object-contain dark:hidden sm:h-12"
              />

              <Image
                src="/logo/dark.png"
                alt="Design Hub Logo"
                width={180}
                height={64}
                className="hidden h-10 w-auto object-contain dark:block sm:h-12"
              />
            </div>

            {/* outro */}
            <p
              className="
                text-sm
                leading-7
                text-muted-foreground

                sm:text-base
              "
            >
              {footer_items.outro}
            </p>

            {/* socials */}
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((Icon, index) => (
                <button
                  key={index}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-full
                    border border-secondary-foreground/10
                    bg-white/[0.03]

                    text-muted-foreground

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-secondary-foreground/30
                    hover:text-secondary-foreground
                  "
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* links */}
          <div
            className="
              grid
              gap-10

              sm:grid-cols-2

              lg:grid-cols-3
              lg:gap-16
            "
          >
            {/* quick links */}
            <div>
              <h2 className="mb-5 text-lg font-semibold">
                Quick Links
              </h2>

              <nav className="flex flex-col gap-3">
                {footer_items.quick_links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="
                      text-sm
                      text-muted-foreground

                      transition-colors
                      duration-300

                      hover:text-secondary-foreground
                    "
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* features */}
            <div>
              <h2 className="mb-5 text-lg font-semibold">
                Our Features
              </h2>

              <nav className="flex flex-col gap-3">
                {footer_items.our_features.map(
                  (feature, index) => (
                    <Link
                      key={index}
                      href={feature.href}
                      className="
                        text-sm
                        text-muted-foreground

                        transition-colors
                        duration-300

                        hover:text-secondary-foreground
                      "
                    >
                      {feature.title}
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* contact */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h2 className="mb-5 text-lg font-semibold">
                Contact Us
              </h2>

              <div className="space-y-5 text-sm text-muted-foreground">
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
                    flex items-center gap-3
                    break-all
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
        </div>

        {/* divider */}
        <Separator className="my-10 bg-secondary-foreground/10 lg:my-14" />

        {/* bottom */}
        <div
          className="
            flex flex-col
            gap-4

            text-center

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:text-left
          "
        >
          <p className="text-xs text-muted-foreground sm:text-sm">
            Copyright © {new Date().getFullYear()},
            Bindzo 8 IT Solutions. All Rights Reserved.
          </p>

          <p className="text-xs text-muted-foreground sm:text-sm">
            Designed & Developed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
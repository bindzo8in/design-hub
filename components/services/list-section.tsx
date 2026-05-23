import React from 'react'
import { servicesList } from './utils'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const ServicesListSection = () => {
  return (
    /* Services List Section */
<section className="container mx-auto max-w-7xl bg-background px-4 pb-16 sm:px-6 lg:px-8">
  <header className="mb-12 max-w-3xl lg:mb-16">
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      Our Core Services
    </h2>
    <p className="mt-4 text-base text-muted-foreground sm:text-lg">
      We blend creativity, design, and advanced technology to build outstanding
      products, establish powerful brands, and accelerate growth for our clients.
    </p>
  </header>

  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {servicesList.map((service, idx) => (
      <article
        key={idx}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
      >
        <div>
          {/* Illustration Visual */}
          <div className="relative m-4 mb-0 overflow-hidden rounded-2xl bg-secondary/60">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10" />

            <figure className="relative aspect-4/3 w-full">
              <Image
                src={service.illustration}
                alt={`${service.title} illustration`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>
          </div>

          {/* Content */}
          <div className="p-6 pt-5 lg:p-8 lg:pt-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {service.title}
              </h3>

              <Link
                href={service.href}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
                aria-label={`Explore ${service.title}`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>

            {/* Features Checklist */}
            <ul className="mt-6 space-y-2 border-t border-border/40 pt-6">
              {service.features.map((feature, fIdx) => (
                <li
                  key={fIdx}
                  className="flex items-center text-xs font-semibold text-foreground/80"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Card Effect */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
      </article>
    ))}
  </div>
</section>
  )
}

export default ServicesListSection
interface ClientMarqueeItem {
  name: string;
  logoUrl?: string | null;
}

interface HomeClientsMarqueeProps {
  clients: ClientMarqueeItem[];
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function HomeClientsMarquee({ clients }: HomeClientsMarqueeProps) {
  if (!clients.length) {
    return null;
  }

  return (
    <section className="relative border-t border-b border-border/50 bg-card/60 py-4 sm:py-6 overflow-hidden select-none">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-client-marquee {
              animation: marquee 28s linear infinite;
            }
          `,
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Trusted by ambitious brands
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl tracking-wider uppercase text-foreground">
              Client Marquee
            </h2>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground">
            A rotating showcase of the teams and founders we’ve helped shape through design, strategy, and digital execution.
          </p>
        </div>
      </div>

      <div className="mt-2 flex w-[200%] animate-client-marquee whitespace-nowrap gap-4 sm:gap-6">
        {[...clients, ...clients, ...clients].map((client, idx) => (
          <div
            key={`${client.name}-${idx}`}
            className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-4 py-2 shadow-sm"
          >
            {client.logoUrl ? (
              <img
                src={client.logoUrl}
                alt={`${client.name} logo`}
                className="h-8 w-8 rounded-full object-contain bg-white/5 p-1"
              />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                {getInitials(client.name)}
              </span>
            )}

            <span className="font-[family-name:var(--font-bebas-neue)] text-lg sm:text-xl uppercase tracking-[0.2em] text-foreground">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image"

const CreativeSection = () => {
    return (
        <section className="relative overflow-hidden bg-black py-20  min-h-fit">
            {/* Red Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.45),transparent_60%)] flex justify-center items-center" />
            {/* top left pattern */}
            <div className="w-[198px] h-[100px] absolute top-8 left-8" style={{
                backgroundImage: "url('/service/grid-pattern.png')",
            }} />
            {/* bottom right pattern */}
            <div className="w-[198px] h-[100px] absolute bottom-8 right-8" style={{
                backgroundImage: "url('/service/grid-pattern.png')",
            }} />

            {/* content container */}
            <div className="relative z-10 flex justify-center">
                <div className="relative mx-auto flex w-fit items-center justify-center -rotate-12">
                    {/* left title */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl tracking-wide text-center uppercase font-stick-no-bills"
                        style={{
                            writingMode: "sideways-lr"
                        }}
                    >creative</h2>
                    {/* images section */}
                    <div className="grid grid-cols-3 gap-3">

                        {/* column 1 */}
                        <div className="h-[620px] overflow-hidden">
                            <div className="animate-marquee flex flex-col gap-3">
                                {[...Array(6)].map((_, idx) => (
                                    <img
                                        key={idx}
                                        src="/tmp/project_placeholder.webp"
                                        alt=""
                                        className="
            block
            w-[220px]
            aspect-[265/288]
            rounded-sm
            object-cover
          "
                                    />
                                ))}
                            </div>
                        </div>

                        {/* column 2 */}
<div className="flex h-[620px] flex-col">

  {/* heading */}
  <div className="flex h-14 items-center justify-center">
    <p
      className="
        text-xs
        uppercase
        tracking-[0.35em]
        text-white
      "
    >
      Product Overview
    </p>
  </div>

  {/* scrolling area */}
  <div className="flex-1 overflow-hidden">
    <div className="animate-marquee-reverse flex flex-col gap-3">
      {[...Array(6)].map((_, idx) => (
        <img
          key={idx}
          src="/tmp/project_placeholder.webp"
          alt=""
          className="
            block
            w-[220px]
            aspect-[265/288]
            rounded-sm
            object-cover
          "
        />
      ))}
    </div>
  </div>
</div>
                        {/* column 3 */}
                        <div className="h-[620px] overflow-hidden pt-8">
                            <div className="animate-marquee flex flex-col gap-3">
                                {[...Array(6)].map((_, idx) => (
                                    <img
                                        key={idx}
                                        src="/tmp/project_placeholder.webp"
                                        alt=""
                                        className="
            block
            w-[220px]
            aspect-[265/288]
            rounded-sm
            object-cover
          "
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
\
                    {/* right title */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl tracking-wide text-center uppercase font-stick-no-bills" style={{
                        writingMode: "vertical-rl"
                    }}>designs</h2>
                </div>
            </div>
        </section>
    )
}

export default CreativeSection
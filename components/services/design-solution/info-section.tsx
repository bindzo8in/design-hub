const InfoSection = () => {
    return (
        <section className="@container py-12 px-16"
            style={{
                backgroundImage: "linear-gradient(41deg, #1E2383 27%, #000000 100%)"
            }}
        >
            <div className="px-16 space-y-6">
                <p className="">At Design Hub, our design solutions are built to support digital marketing success by combining creativity, strategy, and performance-driven thinking. We believe design is not just about aesthetics, it is a powerful communication tool that influences perception, engagement, and conversion. Every design we create is aligned with your business objectives and marketing goals.
                </p>
                <div>
                    <h6 className="font-semibold">What Our Design Solutions Include:</h6>
                    <ul className="font-light list-disc pl-8">
                        {["Business-Oriented Design: Designs created with clear marketing and growth objectives",

                            "Strategic Creativity: Creative ideas supported by data, insights, and brand strategy",

                            "Brand Identity Development: Logos, color systems, typography, and visual guidelines",

                            "Cross-Platform Consistency: Unified design across websites, social media, ads, and print",

                            "Engagement-Focused Visuals: Designs that capture attention and improve recall",

                            "Market-Specific Customization: Tailored solutions based on your industry and audience"].map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default InfoSection
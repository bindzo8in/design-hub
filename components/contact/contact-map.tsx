const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2580579866376!2d76.96615057536269!3d11.01925488914461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859b3d51d070d%3A0x9facd5c3639bffc2!2sDesign%20Hub!5e0!3m2!1sen!2sin!4v1779875535902!5m2!1sen!2sin";

const ContactMap = () => {
  return (
    <section
      aria-label="Our location on the map"
      className="w-full px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Section header */}
      <div className="max-w-2xl mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Find Us
        </h2>
        <p className="text-muted-foreground text-base">
          We&apos;re based in Coimbatore, Tamil Nadu. Come visit us or reach out
          online — we&apos;re happy to connect.
        </p>
      </div>

      {/* Map wrapper */}
      <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm aspect-[16/6] min-h-[300px]">
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          title="Design Hub location in Coimbatore"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default ContactMap;
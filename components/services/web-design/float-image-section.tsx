import React from "react";

const FloatImageSection = () => {
  return (
    <section
      className="min-h-128 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/service/float-bg.png')",
      }}
    >
      {/* images container */}
      <div className="relative mx-auto max-w-7xl py-20">
        <div className="relative h-96 w-full flex justify-center items-center">
          <img
            src="/designs/1.webp"
            className="w-32 h-24 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <img
            src="/designs/2.webp"
            className="w-32 h-24 animate-float-reverse"
            style={{ animationDelay: "1s" }}
          />
          <img
            src="/designs/3.webp"
            className="w-32 h-24 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <img
            src="/designs/4.jpeg"
            className="w-32 h-24 animate-float-reverse"
            style={{ animationDelay: "1s" }}
          />
          <img
            src="/designs/5.jpeg"
            className="w-32 h-24 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <img
            src="/designs/6.jpeg"
            className="w-32 h-24 animate-float-reverse"
            style={{ animationDelay: "1s" }}
          />
          <img
            src="/designs/7.jpeg"
            className="w-32 h-24 animate-float"
            style={{ animationDelay: "0s" }}
          />
        </div>
      </div>
    </section>
  );
};

export default FloatImageSection;

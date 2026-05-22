import * as React from "react";

const ProductImages: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
<svg
  {...props}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1671 1671"
  fill="none"
  preserveAspectRatio="xMidYMid meet"
  className={className}
  style={{ width: "100%", height: "100%", display: "block" }} // ← add this
>
      {/* glow */}
      <defs>
        <filter
          id="blur"
          x="0"
          y="0"
          width="1671"
          height="1671"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="250"
            result="effect1_foregroundBlur"
          />
        </filter>
      </defs>

      {/* background glow */}
      <g filter="url(#blur)">
        <circle cx="835.5" cy="835.5" r="335.5" fill="#6D3300" />
      </g>

      {/* layer 1 */}
      <image
        href="/service/product_layers/1.png"
        x="155"
        y="159"
        width="1352"
        height="1447"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* layer 2 */}
      <image
        href="/service/product_layers/2.png"
        x="149"
        y="387"
        width="1384"
        height="923"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* layer 3 */}
      <image
        href="/service/product_layers/3.png"
        x="1081"
        y="327"
        width="325"
        height="267"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
};

export default ProductImages;
"use client";

export function LoadingPage() {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background with slide animation */}
      <div className="absolute inset-0 bg-black animate-slideOut" />
      
      {/* Logo container */}
      <div className="relative z-10">
        <svg
          id="loading-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64.06 32"
          width={128}
          height={64}
          className="animate-logo text-white"
        >
          <rect
            id="line1"
            x="12.31"
            width="6.78"
            height="32"
            className="animate-line"
          />
          <polygon
            id="angle1"
            points="0 32 6.78 32 12.31 0 5.53 0 0 32"
            className="animate-angle"
          />
          <rect
            id="line2"
            x="25.88"
            width="6.78"
            height="32"
            className="animate-line delay-150"
          />
          <polygon
            id="angle2"
            points="32.66 32 39.44 32 44.97 0 38.19 0 32.66 32"
            className="animate-angle delay-150"
            transform="matrix(1,0,0,1,-0.25744,0)"
          />
          <rect
            id="line3"
            x="44.97"
            width="6.78"
            height="32"
            className="animate-line delay-300"
          />
          <polygon
            id="angle3"
            points="57.28 0 51.75 32 58.53 32 64.06 0 57.28 0"
            className="animate-angle delay-300"
            transform="matrix(1,0,0,1,-0.25744,0)"
          />
        </svg>
      </div>
    </div>
  );
} 
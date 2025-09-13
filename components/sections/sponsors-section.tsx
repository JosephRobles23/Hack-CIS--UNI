import Image from "next/image"
import GradientText from "../gradient-text"

export default function SponsorsSection() {
  const allSponsors = [
    { name: "FUTURA", 
      logo: "/images/sponsors/Logo-Futura.png",
      website: "https://futuradata.pe/" },
    { name: "GDG Open Lima", 
      logo: "/images/sponsors/Logo-GDG.webp", 
      website: "https://gdg.community.dev/gdg-open/" },
    {
      name: "CTIC UNI",
      logo: "/images/sponsors/Logo-ctic.png",
      website: "https://www.ctic.uni.edu.pe/",
    },
    /* {
      name: "Ya Vendió",
      logo: "/images/sponsors/Logo-Yavendio.png",
      website: "https://www.yavendio.com/",
    }, */
  ];

  return (
    <section className="pb-16 md:pb-28  relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main heading */}
          <div className="space-y-4 sm:space-y-6 mb-8 ">
            <h2
              className="text-3xl font-light tracking-tight leading-tight px-2"
              style={{
                color: "#D9D9D9",
                fontFamily:
                  "NeuePower, -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              con el{" "}
              <span
                className="font-bold relative inline-block"
                style={{
                  fontFamily:
                    "NeuePower, -apple-system, BlinkMacSystemFont, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                <GradientText gradient="from-yellow-400 to-red-400 font-neue-power">apoyo</GradientText>
                <div
                  className="absolute -bottom-1 left-0 w-full h-0.5 animate-pulse"
                  style={{ backgroundColor: "#FAC120", opacity: 0.3 }}
                />
              </span>{" "}
              de
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            {allSponsors.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[160px] sm:w-[200px] lg:w-[220px] h-28 sm:h-36 lg:h-40 flex items-center justify-center rounded-md border border-white/40 transition-all duration-300 hover:bg-white/5 cursor-pointer"
                style={{ backgroundColor: "transparent" }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={800}
                  height={480}
                  className="max-h-full max-w-[85%] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
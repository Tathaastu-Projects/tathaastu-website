"use client";

// import React, { useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const services = [
//   {
//     title: "NUMEROLOGY",
//     subtitle: "BIRTH CHARTS, PREDICTIONS",
//     image: "/images/numerology.jpg",
//   },
//   {
//     title: "TAROT READING",
//     subtitle: "BIRTH CHARTS, PREDICTIONS",
//     image: "/images/tarot.jpg",
//   },
//   {
//     title: "PALMISTRY",
//     subtitle: "BIRTH CHARTS, PREDICTIONS",
//     image: "/images/palm.jpg",
//   },
//   {
//     title: "ASTROLOGY",
//     subtitle: "BIRTH CHARTS, PREDICTIONS",
//     image: "/images/astro.jpg",
//   },
// ];

// const ServicesCarousel = () => {
//   const scrollRef = useRef(null);
//   const CARD_WIDTH = 300 + 24; // width + gap

//   const scroll = (dir) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: dir === "left" ? -CARD_WIDTH : CARD_WIDTH,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="max-w-[1300px] mx-auto px-4 py-16 font-sans relative">
//       {/* Title + Button */}
//       <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
//         <h2 className="text-3xl font-bold tracking-wide text-[#2D7351]">
//           WHAT ARE THE{" "}
//           <span className="text-[#C5445D]">SERVICES</span> THAT WE ARE OFFERING
//           TO YOU.
//         </h2>
//         <button className="bg-[#C5445D] text-white px-6 py-2 rounded-full shadow-md font-semibold hover:bg-[#a6344f] transition-all">
//           KNOW MORE
//         </button>
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={() => scroll("left")}
//         className="absolute left-0 top-[55%] -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center"
//       >
//         <ChevronLeft className="text-[#C5445D]" />
//       </button>
//       <button
//         onClick={() => scroll("right")}
//         className="absolute right-0 top-[55%] -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center"
//       >
//         <ChevronRight className="text-[#C5445D]" />
//       </button>

//       {/* Scrollable Cards */}
//       <div className="overflow-hidden">
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-2 px-2"
//         >
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="min-w-[300px] bg-white rounded-2xl shadow-md overflow-hidden"
//             >
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-full h-[200px] object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h4 className="text-xl font-bold text-[#2D7351]">
//                   {service.title}
//                 </h4>
//                 <p className="text-sm text-[#2D7351] mt-1">
//                   {service.subtitle}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesCarousel;






// import React, { useRef, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Tarot from "../../assets/TarotReading.svg";
// import Numerology from "../../assets/Numerology.svg";

// // Example services (replace images with yours)
// const services = [
//   {
//     title: "NUMEROLOGY",
//     subtitle: "BIRTH CHARTS, PREDICTIONS",
//     image: Numerology,
//   },
//   {
//     title: "TAROT READING",
//     subtitle: "BIRTH CHARTS, PREDICTIONS",
//     image: Tarot,
//   },
//   {
//     title: "PALMISTRY",
//     subtitle: "BIRTH CHARTS, PREDICTIONS",
//     image: Numerology,
//   },
//   {
//     title: "ASTROLOGY",
//     subtitle: "BIRTH CHARTS, PREDICTIONS",
//     image: Tarot,
//   },
// ];

// // Settings
// const CARD_WIDTH = 600;
// const GAP = 44;
// const SCROLL_AMOUNT = CARD_WIDTH + GAP;

// const ServicesCarousel = () => {
//   const scrollRef = useRef(null);
//   const cloned = [...services, ...services, ...services];

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       container.scrollLeft = services.length * SCROLL_AMOUNT;
//     }
//   }, []);

//   const handleScroll = () => {
//     const container = scrollRef.current;
//     const scrollLeft = container.scrollLeft;
//     const visible = services.length;
//     const middle = visible * SCROLL_AMOUNT;
//     const maxScroll = (cloned.length - visible) * SCROLL_AMOUNT;

//     if (scrollLeft <= 0) {
//       container.scrollLeft = middle;
//     } else if (scrollLeft >= maxScroll) {
//       container.scrollLeft = middle;
//     }
//   };

//   const scroll = (dir) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="relative font-sans py-16">
//       {/* Title and Button */}
//       <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-center flex-wrap gap-4 mb-10">
//         <h2 className="text-3xl font-bold tracking-wide text-[#2D7351]">
//           WHAT ARE THE <span className="text-[#C5445D]">SERVICES</span> THAT WE ARE OFFERING TO YOU.
//         </h2>
//         <button className="bg-[#C5445D] text-white px-6 py-2 rounded-full shadow-md font-semibold hover:bg-[#a6344f] transition-all">
//           KNOW MORE
//         </button>
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={() => scroll("left")}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center"
//       >
//         <ChevronLeft className="text-[#C5445D]" />
//       </button>
//       <button
//         onClick={() => scroll("right")}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center"
//       >
//         <ChevronRight className="text-[#C5445D]" />
//       </button>

//       {/* Carousel */}
//       <div className="overflow-hidden px-[84px]">
//         {/* 84px = (50% of CARD_WIDTH + GAP/2) to allow 50% partial view */}
//         <div
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex gap-6 scroll-smooth overflow-x-auto scrollbar-hide"
//           style={{ scrollSnapType: "x mandatory" }}
//         >
//           {cloned.map((item, index) => (
//             <div
//               key={index}
//               className="min-w-[600px]  snap-start shrink-0 bg-white rounded-2xl overflow-hidden shadow-md"
//             >
//               <img src={item.image} alt={item.title} className="w-full h-[300px] object-cover" />
//               {/* <div className="p-4 text-center">
//                 <h4 className="text-xl font-bold text-[#2D7351]">{item.title}</h4>
//                 <p className="text-sm text-[#2D7351] mt-1">{item.subtitle}</p>
//               </div> */}
//             </div>
//           ))}
//         </div>
        
//       </div>
      
//     </div>
//   );
// };

// export default ServicesCarousel;



import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/lib/router";
import servicesData from "../../data/servicesData";

const services = servicesData;

const ServicesCarousel = () => {
  const scrollRef = useRef(null);
  const cloned = [...services, ...services, ...services];
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const interactionTORef = useRef(0);
  const cardStepRef = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const measure = () => {
      const card = container.querySelector(".carousel-card");
      if (!card) return;
      const width = card.getBoundingClientRect().width || card.offsetWidth || 0;
      const step = Math.max(1, Math.round(width + 24)); // card width + gap-6 (24px)
      cardStepRef.current = step;
      container.scrollLeft = step * services.length; // jump to middle copy
    };

    // wait for layout
    const raf = window.requestAnimationFrame(measure);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Continuous infinite auto-scroll. px/sec
    const SPEED_PX_PER_SEC = 180;

    const frame = (ts) => {
      rafRef.current = window.requestAnimationFrame(frame);
      if (!scrollRef.current) return;
      if (isHoveringRef.current) return;
      if (isUserInteractingRef.current) {
        lastTsRef.current = ts;
        return;
      }

      const last = lastTsRef.current || ts;
      const dt = Math.min(48, ts - last);
      lastTsRef.current = ts;

      container.scrollLeft += (SPEED_PX_PER_SEC * dt) / 1000;
    };

    rafRef.current = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      lastTsRef.current = 0;
    };
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const step = cardStepRef.current;
    if (!step) return;

    const visible = services.length;
    const middle = visible * step;
    const maxScroll = (cloned.length - visible) * step;

    if (container.scrollLeft <= 0) {
      container.scrollLeft = middle;
    } else if (container.scrollLeft >= maxScroll) {
      container.scrollLeft = middle;
    }
  };

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector(".carousel-card");
    if (!card) return;

    const scrollAmount = card.offsetWidth + 24; // Include gap
    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    // <div className="relative font-sans py-16 w-full">
    //   {/* Title and Button */}
    //   <div className="max-w-[1300px] mx-auto px-6 flex flex-wrap gap-4 justify-between items-center mb-10">
    //     <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#2D7351]">
    //       WHAT ARE THE <span className="text-[#C5445D]">SERVICES</span> THAT WE ARE OFFERING TO YOU.
    //     </h2>
    //     <button className="bg-[#C5445D] text-white px-6 py-2 rounded-full shadow-md font-semibold hover:bg-[#a6344f] transition-all">
    //       KNOW MORE
    //     </button>
    //   </div>

    //   {/* Arrows */}
    //   <button
    //     onClick={() => scroll("left")}
    //     className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md items-center justify-center"
    //   >
    //     <ChevronLeft className="text-[#C5445D]" />
    //   </button>
    //   <button
    //     onClick={() => scroll("right")}
    //     className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md items-center justify-center"
    //   >
    //     <ChevronRight className="text-[#C5445D]" />
    //   </button>

    //   {/* Carousel */}
    //   <div className="overflow-hidden px-4 sm:px-10">
    //     <div
    //       ref={scrollRef}
    //       onScroll={handleScroll}
    //       className="flex gap-6 scroll-smooth overflow-x-auto scrollbar-hide"
    //       style={{ scrollSnapType: "x mandatory" }}
    //     >
    //       {cloned.map((item, index) => (
    //         <div
    //           key={index}
    //           className="carousel-card snap-start shrink-0 bg-white rounded-2xl overflow-hidden shadow-md w-[85%] sm:w-[65%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]"
    //         >
    //           <img
    //             src={item.image}
    //             alt={item.title}
    //             className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] object-cover"
    //           />
    //           {/* <div className="p-4 text-center">
    //             <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#2D7351]">
    //               {item.title}
    //             </h4>
    //             <p className="text-sm text-[#2D7351] mt-1">{item.subtitle}</p>
    //           </div> */}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <div className="relative font-sans py-16 w-full">
  {/* Title and Button */}
  <div className=" mx-auto px-6 flex flex-wrap gap-4 justify-between items-center mb-10">
    <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#2D7351] ml-4 sm:ml-6">
      Our Services
    </h2>
    <Link
      to="/services"
      className="bg-[#C5445D] text-white px-6 py-2 rounded-full shadow-md font-semibold hover:bg-[#a6344f] transition-all"
    >
      KNOW MORE
    </Link>
  </div>

  {/* Carousel + Arrows wrapper */}
  <div className="relative  mx-auto px-8 sm:px-12 lg:px-20">
    {/* Left Arrow */}
    <button
      onClick={() => scroll("left")}
      className="hidden sm:flex absolute left-0 lg:-left-0 top-1/2 -translate-y-1/2 z-20 bg-white w-10 h-10 rounded-full shadow-md items-center justify-center"
    >
      <ChevronLeft className="text-[#C5445D]" />
    </button>

    {/* Right Arrow */}
    <button
      onClick={() => scroll("right")}
      className="hidden sm:flex absolute right-0 lg:-right-0 top-1/2 -translate-y-1/2 z-20 bg-white w-10 h-10 rounded-full shadow-md items-center justify-center"
    >
      <ChevronRight className="text-[#C5445D]" />
    </button>

    {/* Carousel */}
    <div className="overflow-hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onWheel={() => {
          isUserInteractingRef.current = true;
          window.clearTimeout(interactionTORef.current);
          interactionTORef.current = window.setTimeout(() => {
            isUserInteractingRef.current = false;
          }, 900);
        }}
        onPointerDown={() => {
          isUserInteractingRef.current = true;
          window.clearTimeout(interactionTORef.current);
        }}
        onPointerUp={() => {
          window.clearTimeout(interactionTORef.current);
          interactionTORef.current = window.setTimeout(() => {
            isUserInteractingRef.current = false;
          }, 900);
        }}
        onTouchStart={() => {
          isUserInteractingRef.current = true;
          window.clearTimeout(interactionTORef.current);
        }}
        onTouchEnd={() => {
          window.clearTimeout(interactionTORef.current);
          interactionTORef.current = window.setTimeout(() => {
            isUserInteractingRef.current = false;
          }, 900);
        }}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; }}
        className="flex gap-6 scroll-smooth overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cloned.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            to={`/services/${item.slug || item.id}`}
            className="carousel-card snap-start shrink-0 bg-white rounded-2xl overflow-hidden shadow-md w-[85%] sm:w-[65%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] transition-transform hover:-translate-y-2"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] object-cover"
            />
            <div className="p-5 text-center space-y-3">
              <h4 className="text-lg sm:text-xl font-bold text-[#073349] leading-snug">
                {item.title}
              </h4>
              <p className="text-sm sm:text-base text-[#325d72] leading-relaxed">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default ServicesCarousel;

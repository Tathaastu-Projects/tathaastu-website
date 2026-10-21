"use client";

// import React, { useRef, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import AIBirthChart from "../../assets/ai_birth_chart.svg"
// import ChatbotMystic from "../../assets/chatbot_mystic_ai.svg";
// import DailyHoroscope from "../../assets/daily_horoscope_ai.svg";
// import VastuFloor from "../../assets/vasstu_floorplane_ai.svg";

// // Dummy data - replace with real image paths
// const features = [
//   {
//     title: "AI BIRTH CHART &\nREPORT GENERATOR",
//     image: AIBirthChart,
//   },
//   {
//     title: "CHATBOT MYSTIC\nADVISOR (24/7)",
//     image: ChatbotMystic,
//   },
//   {
//     title: "DAILY HOROSCOPE\nENGINE",
//     image: DailyHoroscope,
//   },
//   {
//     title: "VAASTU AUTO-\nFLOORPLAN ANALYSER",
//     image: VastuFloor,
//   },
// ];

// const CARD_WIDTH = 240;
// const GAP = 32;
// const SCROLL_AMOUNT = CARD_WIDTH + GAP;

// const AIContentSection = () => {
//   const scrollRef = useRef(null);
//   const cloned = [...features, ...features, ...features];

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       container.scrollLeft = features.length * SCROLL_AMOUNT;
//     }
//   }, []);

//   const handleScroll = () => {
//     const container = scrollRef.current;
//     const scrollLeft = container.scrollLeft;
//     const visible = features.length;
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
//     <section className="relative font-sans py-16">
//       {/* Header */}
//       <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-start flex-wrap mb-10">
//         <h2 className="text-3xl font-bold text-[#2D7351] leading-snug">
//           <span className="text-[#C5445D]">AI</span> THAT READS THE STARS <br /> — AND <span className="text-[#2D7351]">YOUR ENERGY</span>
//         </h2>
//         <p className="text-sm text-right text-gray-500 max-w-[300px] mt-2">
//           FASTER, DEEPER, AND MORE PERSONAL THAN EVER BEFORE.
//         </p>
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
//       <div className="overflow-hidden px-[140px]">
//         <div
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex gap-[32px] scroll-smooth overflow-x-auto scrollbar-hide"
//           style={{ scrollSnapType: "x mandatory" }}
//         >
//           {cloned.map((item, index) => (
//             <div
//               key={index}
//               className="min-w-[240px] flex flex-col items-center text-center shrink-0 snap-start"
//             >
//               <div className="w-[180px] h-[180px] rounded-full overflow-hidden   flex items-center justify-center mb-4">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-[200px] h-[200px] object-cover"
//                 />
//               </div>
//               <h4 className="text-sm font-bold text-[#2D7351] whitespace-pre-line">
//                 {item.title}
//               </h4>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AIContentSection;




// import React, { useRef, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import AIBirthChart from "../../assets/ai_birth_chart.svg";
// import ChatbotMystic from "../../assets/chatbot_mystic_ai.svg";
// import DailyHoroscope from "../../assets/daily_horoscope_ai.svg";
// import VastuFloor from "../../assets/vasstu_floorplane_ai.svg";

// const features = [
//   {
//     title: "AI BIRTH CHART &\nREPORT GENERATOR",
//     image: AIBirthChart,
//   },
//   {
//     title: "CHATBOT MYSTIC\nADVISOR (24/7)",
//     image: ChatbotMystic,
//   },
//   {
//     title: "DAILY HOROSCOPE\nENGINE",
//     image: DailyHoroscope,
//   },
//   {
//     title: "VAASTU AUTO-\nFLOORPLAN ANALYSER",
//     image: VastuFloor,
//   },
// ];

// const CARD_WIDTH = 240;
// const GAP = 32;
// const SCROLL_AMOUNT = CARD_WIDTH + GAP;

// const AIContentSection = () => {
//   const scrollRef = useRef(null);
//   const cloned = [...features, ...features, ...features];

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       container.scrollLeft = features.length * SCROLL_AMOUNT;
//     }
//   }, []);

//   const scroll = (dir) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleScroll = () => {
//     const container = scrollRef.current;
//     const scrollLeft = container.scrollLeft;
//     const visible = features.length;
//     const middle = visible * SCROLL_AMOUNT;
//     const maxScroll = (cloned.length - visible) * SCROLL_AMOUNT;

//     if (scrollLeft <= 0) {
//       container.scrollLeft = middle;
//     } else if (scrollLeft >= maxScroll) {
//       container.scrollLeft = middle;
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollBy({
//           left: SCROLL_AMOUNT,
//           behavior: "smooth",
//         });
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative font-sans py-16">
//       {/* Header */}
//       <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-start flex-wrap mb-10">
//         <h2 className="text-3xl font-bold text-[#2D7351] leading-snug">
//           <span className="text-[#C5445D]">AI</span> THAT READS THE STARS <br /> — AND <span className="text-[#2D7351]">YOUR ENERGY</span>
//         </h2>
//         <p className="text-sm text-right text-gray-500 max-w-[300px] mt-2">
//           FASTER, DEEPER, AND MORE PERSONAL THAN EVER BEFORE.
//         </p>
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
//       <div className="overflow-hidden px-[140px]">
//         <div
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex gap-[32px] scroll-smooth overflow-x-auto scrollbar-hide"
//           style={{ scrollSnapType: "x mandatory" }}
//         >
//           {cloned.map((item, index) => (
//             <div
//               key={index}
//               className="min-w-[240px] flex flex-col items-center text-center shrink-0 snap-start"
//             >
//               <div className="w-[180px] h-[180px] rounded-full overflow-hidden flex items-center justify-center mb-4">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-[200px] h-[200px] object-cover"
//                 />
//               </div>
//               <h4 className="text-sm font-bold text-[#2D7351] whitespace-pre-line">
//                 {item.title}
//               </h4>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AIContentSection;




// import React, { useRef, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import AIBirthChart from "../../assets/ai_birth_chart.svg";
// import ChatbotMystic from "../../assets/chatbot_mystic_ai.svg";
// import DailyHoroscope from "../../assets/daily_horoscope_ai.svg";
// import VastuFloor from "../../assets/vasstu_floorplane_ai.svg";

// const features = [
//   {
//     title: "AI BIRTH CHART &\nREPORT GENERATOR",
//     image: AIBirthChart,
//   },
//   {
//     title: "CHATBOT MYSTIC\nADVISOR (24/7)",
//     image: ChatbotMystic,
//   },
//   {
//     title: "DAILY HOROSCOPE\nENGINE",
//     image: DailyHoroscope,
//   },
//   {
//     title: "VAASTU AUTO-\nFLOORPLAN ANALYSER",
//     image: VastuFloor,
//   },
// ];

// const CARD_WIDTH = 240;
// const GAP = 32;
// const SCROLL_AMOUNT = CARD_WIDTH + GAP;

// const AIContentSection = () => {
//   const scrollRef = useRef(null);
//   const intervalRef = useRef(null);
//   const totalItems = [...features, ...features, ...features];

//   const scroll = (dir) => {
//     const container = scrollRef.current;
//     if (!container) return;
//     const scrollBy = dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
//     container.scrollBy({ left: scrollBy, behavior: "smooth" });
//   };

//   const handleScroll = () => {
//     const container = scrollRef.current;
//     if (!container) return;
//     const visible = features.length;
//     const middle = visible * SCROLL_AMOUNT;
//     const maxScroll = (totalItems.length - visible) * SCROLL_AMOUNT;

//     if (container.scrollLeft <= 0) {
//       container.scrollLeft = middle;
//     } else if (container.scrollLeft >= maxScroll) {
//       container.scrollLeft = middle;
//     }
//   };

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       container.scrollLeft = features.length * SCROLL_AMOUNT;
//     }
//     startAutoScroll();
//     return () => stopAutoScroll();
//   }, []);

//   const startAutoScroll = () => {
//     stopAutoScroll();
//     intervalRef.current = setInterval(() => {
//       scroll("right");
//     }, 1000);
//   };

//   const stopAutoScroll = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   return (
//     <section className="relative font-sans py-16">
//       {/* Header */}
//       <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-start flex-wrap mb-10">
//         <h2 className="text-3xl font-bold text-[#2D7351] leading-snug">
//           <span className="text-[#C5445D]">AI</span> THAT READS THE STARS <br /> — AND <span className="text-[#2D7351]">YOUR ENERGY</span>
//         </h2>
//         <p className="text-sm text-right text-gray-500 max-w-[300px] mt-2">
//           FASTER, DEEPER, AND MORE PERSONAL THAN EVER BEFORE.
//         </p>
//       </div>

//       {/* Arrows */}
//       <div className="absolute inset-y-0 left-0 flex items-center z-10">
//         <button
//           onClick={() => scroll("left")}
//           className="ml-4 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center"
//         >
//           <ChevronLeft className="text-[#C5445D]" />
//         </button>
//       </div>
//       <div className="absolute inset-y-0 right-0 flex items-center z-10">
//         <button
//           onClick={() => scroll("right")}
//           className="mr-4 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center"
//         >
//           <ChevronRight className="text-[#C5445D]" />
//         </button>
//       </div>

//       {/* Carousel */}
//       <div className="overflow-hidden px-[140px]">
//         <div
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex gap-[32px] scroll-smooth overflow-x-auto scrollbar-hide"
//           style={{ scrollSnapType: "x mandatory" }}
//         >
//           {totalItems.map((item, index) => (
//             <div
//               key={index}
//               className="min-w-[240px] flex flex-col items-center text-center shrink-0 snap-start"
//             >
//               <div className="w-[180px] h-[180px] rounded-full overflow-hidden flex items-center justify-center mb-4">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-[200px] h-[200px] object-cover"
//                 />
//               </div>
//               <h4 className="text-sm font-bold text-[#2D7351] whitespace-pre-line">
//                 {item.title}
//               </h4>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AIContentSection;










// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import AIBirthChart from "../../assets/ai_birth_chart.svg";
// import ChatbotMystic from "../../assets/chatbot_mystic_ai.svg";
// import DailyHoroscope from "../../assets/daily_horoscope_ai.svg";
// import VastuFloor from "../../assets/vasstu_floorplane_ai.svg";

// const features = [
//   {
//     title: "AI BIRTH CHART &\nREPORT GENERATOR",
//     image: AIBirthChart,
//   },
//   {
//     title: "CHATBOT MYSTIC\nADVISOR (24/7)",
//     image: ChatbotMystic,
//   },
//   {
//     title: "DAILY HOROSCOPE\nENGINE",
//     image: DailyHoroscope,
//   },
//   {
//     title: "VAASTU AUTO-\nFLOORPLAN ANALYSER",
//     image: VastuFloor,
//   },
// ];

// const CARD_WIDTH = 240;
// const GAP = 32;
// const SCROLL_AMOUNT = CARD_WIDTH + GAP;
// const BUFFER_ITEMS = 2; // Number of items to use as buffer

// const AIContentSection = () => {
//   const scrollRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const cloned = [...features, ...features, ...features]; // Triple the items for infinite effect

//   // Initialize scroll position to the middle segment
//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       container.scrollLeft = features.length * SCROLL_AMOUNT;
//     }
//   }, []);

//   // Auto-scroll logic
//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container || isHovered || isScrolling) return;

//     const interval = setInterval(() => {
//       if (!container) return;
      
//       const scrollLeft = container.scrollLeft;
//       const maxScroll = container.scrollWidth - container.clientWidth;
      
//       // If we're near the end, jump to the middle
//       if (scrollLeft >= maxScroll - (BUFFER_ITEMS * SCROLL_AMOUNT)) {
//         container.scrollTo({
//           left: features.length * SCROLL_AMOUNT,
//           behavior: 'instant'
//         });
//       }
      
//       container.scrollBy({
//         left: SCROLL_AMOUNT,
//         behavior: 'smooth'
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isHovered, isScrolling]);

//   const scroll = (dir) => {
//     if (!scrollRef.current) return;
    
//     const container = scrollRef.current;
//     const scrollLeft = container.scrollLeft;
//     const maxScroll = container.scrollWidth - container.clientWidth;
    
//     if (dir === "left") {
//       if (scrollLeft <= BUFFER_ITEMS * SCROLL_AMOUNT) {
//         // If at start, jump to middle before scrolling
//         container.scrollTo({
//           left: features.length * SCROLL_AMOUNT,
//           behavior: 'instant'
//         });
//       }
//       container.scrollBy({
//         left: -SCROLL_AMOUNT,
//         behavior: 'smooth'
//       });
//     } else {
//       if (scrollLeft >= maxScroll - (BUFFER_ITEMS * SCROLL_AMOUNT)) {
//         // If at end, jump to middle before scrolling
//         container.scrollTo({
//           left: features.length * SCROLL_AMOUNT,
//           behavior: 'instant'
//         });
//       }
//       container.scrollBy({
//         left: SCROLL_AMOUNT,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Debounce the scroll handler to prevent multiple rapid triggers
//   const handleScroll = useCallback(() => {
//     setIsScrolling(true);
    
//     const container = scrollRef.current;
//     if (!container) return;

//     const scrollLeft = container.scrollLeft;
//     const scrollWidth = container.scrollWidth;
//     const clientWidth = container.clientWidth;
//     const maxScroll = scrollWidth - clientWidth;

//     // Calculate the middle point (original items start)
//     const middlePoint = features.length * SCROLL_AMOUNT;

//     // If we're approaching the beginning (first buffer items)
//     if (scrollLeft <= BUFFER_ITEMS * SCROLL_AMOUNT) {
//       container.scrollTo({
//         left: middlePoint,
//         behavior: 'instant'
//       });
//     }
//     // If we're approaching the end (last buffer items)
//     else if (scrollLeft >= maxScroll - (BUFFER_ITEMS * SCROLL_AMOUNT)) {
//       container.scrollTo({
//         left: middlePoint - (BUFFER_ITEMS * SCROLL_AMOUNT),
//         behavior: 'instant'
//       });
//     }

//     // Reset scrolling state after a delay
//     const timer = setTimeout(() => {
//       setIsScrolling(false);
//     }, 100);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <section className="relative font-sans py-16">
//       {/* Header */}
//       <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-start flex-wrap mb-10">
//         <h2 className="text-3xl font-bold text-[#2D7351] leading-snug">
//           <span className="text-[#C5445D]">AI</span> THAT READS THE STARS <br /> — AND <span className="text-[#2D7351]">YOUR ENERGY</span>
//         </h2>
//         <p className="text-xl text-right text-gray-500 max-w-[300px] mt-2">
//           FASTER, DEEPER, AND MORE PERSONAL THAN EVER BEFORE.
//         </p>
//       </div>

//       {/* Carousel Container */}
//       {/* <div 
//         className="relative"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
        
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
//         >
//           <ChevronLeft className="text-[#C5445D]" />
//         </button>
//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
//         >
//           <ChevronRight className="text-[#C5445D]" />
//         </button>

       
//         <div className="overflow-hidden px-[140px]">
//           <div
//             ref={scrollRef}
//             onScroll={handleScroll}
//             className="flex gap-[32px] scroll-smooth overflow-x-auto scrollbar-hide py-4"
//             style={{ scrollSnapType: "x mandatory" }}
//           >
//             {cloned.map((item, index) => (
//               <div
//                 key={index}
//                 className="min-w-[240px] flex flex-col items-center text-center shrink-0 snap-start"
//               >
//                 <div className="w-[180px] h-[180px] rounded-full overflow-hidden flex items-center justify-center mb-4">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-[200px] h-[200px] object-cover"
//                   />
//                 </div>
//                 <h4 className="text-sm font-bold text-[#2D7351] whitespace-pre-line">
//                   {item.title}
//                 </h4>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div> */}

//       <div 
//   className="relative"
//   onMouseEnter={() => setIsHovered(true)}
//   onMouseLeave={() => setIsHovered(false)}
// >
//   {/* Arrows */}
//   <button
//     onClick={() => scroll("left")}
//     className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
//   >
//     <ChevronLeft className="text-[#C5445D] w-4 h-4 sm:w-5 sm:h-5" />
//   </button>
//   <button
//     onClick={() => scroll("right")}
//     className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
//   >
//     <ChevronRight className="text-[#C5445D] w-4 h-4 sm:w-5 sm:h-5" />
//   </button>

//   {/* Carousel */}
//   <div className="overflow-hidden px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40">
//     <div
//       ref={scrollRef}
//       onScroll={handleScroll}
//       className="flex gap-4 sm:gap-6 md:gap-8 scroll-smooth overflow-x-auto scrollbar-hide py-4"
//       style={{ scrollSnapType: "x mandatory" }}
//     >
//       {cloned.map((item, index) => (
//         <div
//           key={index}
//           className="carousel-card snap-start shrink-0 text-center flex flex-col items-center 
//             min-w-[70%] sm:min-w-[260px] md:min-w-[240px] lg:min-w-[240px] xl:min-w-[260px]"
//         >
//           <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden flex items-center justify-center mb-4">
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-full object-contain"
//             />
//           </div>
//           <h4 className="text-xs sm:text-sm md:text-base font-bold text-[#2D7351] whitespace-pre-line leading-snug">
//             {item.title}
//           </h4>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//     </section>
//   );
// };

// export default AIContentSection;



import React from "react";

// COMMENTED OUT: "AI THAT READS THE STARS" header, tagline, and feature carousel
// (Daily Horoscope Engine, Vaastu Auto-Floorplan, AI Birth Chart, Chatbot Mystic)
// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import AIBirthChart from "../../assets/ai_birth_chart.svg";
// import ChatbotMystic from "../../assets/chatbot_mystic_ai.svg";
// import DailyHoroscope from "../../assets/daily_horoscope_ai.svg";
// import VastuFloor from "../../assets/vasstu_floorplane_ai.svg";
// 
// const features = [
//   {
//     title: "AI BIRTH CHART &\nREPORT GENERATOR",
//     image: AIBirthChart,
//   },
//   {
//     title: "CHATBOT MYSTIC\nADVISOR (24/7)",
//     image: ChatbotMystic,
//   },
//   {
//     title: "DAILY HOROSCOPE\nENGINE",
//     image: DailyHoroscope,
//   },
//   {
//     title: "VAASTU AUTO-\nFLOORPLAN ANALYSER",
//     image: VastuFloor,
//   },
// ];
// 
// const CARD_WIDTH = 240;
// const GAP = 32;
// const SCROLL_AMOUNT = CARD_WIDTH + GAP;
// const BUFFER_ITEMS = 2;
// 
// const AIContentSection = () => {
//   const scrollRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const cloned = [...features, ...features, ...features];
// 
//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       container.scrollLeft = features.length * SCROLL_AMOUNT;
//     }
//   }, []);
// 
//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container || isHovered || isScrolling) return;
// 
//     const interval = setInterval(() => {
//       if (!container) return;
//       const scrollLeft = container.scrollLeft;
//       const maxScroll = container.scrollWidth - container.clientWidth;
// 
//       if (scrollLeft >= maxScroll - (BUFFER_ITEMS * SCROLL_AMOUNT)) {
//         container.scrollTo({
//           left: features.length * SCROLL_AMOUNT,
//           behavior: "instant",
//         });
//       }
// 
//       container.scrollBy({
//         left: SCROLL_AMOUNT,
//         behavior: "smooth",
//       });
//     }, 3000);
// 
//     return () => clearInterval(interval);
//   }, [isHovered, isScrolling]);
// 
//   const scroll = (dir) => {
//     const container = scrollRef.current;
//     if (!container) return;
//     const scrollLeft = container.scrollLeft;
//     const maxScroll = container.scrollWidth - container.clientWidth;
// 
//     if (dir === "left") {
//       if (scrollLeft <= BUFFER_ITEMS * SCROLL_AMOUNT) {
//         container.scrollTo({
//           left: features.length * SCROLL_AMOUNT,
//           behavior: "instant",
//         });
//       }
//       container.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
//     } else {
//       if (scrollLeft >= maxScroll - (BUFFER_ITEMS * SCROLL_AMOUNT)) {
//         container.scrollTo({
//           left: features.length * SCROLL_AMOUNT,
//           behavior: "instant",
//         });
//       }
//       container.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
//     }
//   };
// 
//   const handleScroll = useCallback(() => {
//     setIsScrolling(true);
//     const container = scrollRef.current;
//     if (!container) return;
// 
//     const scrollLeft = container.scrollLeft;
//     const middlePoint = features.length * SCROLL_AMOUNT;
//     const maxScroll = container.scrollWidth - container.clientWidth;
// 
//     if (scrollLeft <= BUFFER_ITEMS * SCROLL_AMOUNT) {
//       container.scrollTo({ left: middlePoint, behavior: "instant" });
//     } else if (scrollLeft >= maxScroll - (BUFFER_ITEMS * SCROLL_AMOUNT)) {
//       container.scrollTo({
//         left: middlePoint - BUFFER_ITEMS * SCROLL_AMOUNT,
//         behavior: "instant",
//       });
//     }
// 
//     const timer = setTimeout(() => {
//       setIsScrolling(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);
// 
//   return (
//     <section className="relative font-sans py-12 sm:py-16 lg:py-20">
//       {/* Header */}
//       <div className="max-w-[1300px] mx-auto px-4 sm:px-6 flex justify-between items-start flex-wrap gap-y-4 mb-10">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D7351] leading-snug ">
//           <span className="text-[#C5445D]">AI</span> THAT READS THE STARS <br />
//           — AND <span className="text-[#2D7351]">YOUR ENERGY</span>
//         </h2>
//         <p className="text-sm sm:text-base md:text-lg  text-center text-gray-500 max-w-[300px]">
//           FASTER, DEEPER, AND MORE PERSONAL THAN EVER BEFORE.
//         </p>
//       </div>
// 
//       {/* Carousel Container */}
//       <div
//         className="relative"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Scrollable Carousel */}
//         <div className="overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative">
//           {/* Arrows - positioned inside carousel container */}
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#C5445D] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
//           >
//             <ChevronLeft className="text-white" size={20} />
//           </button>
//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#C5445D] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
//           >
//             <ChevronRight className="text-white" size={20} />
//           </button>
//           {/* <div
//             ref={scrollRef}
//             onScroll={handleScroll}
//             className="flex gap-4 sm:gap-6 md:gap-8 scroll-smooth overflow-x-auto scrollbar-hide py-6"
//             style={{ scrollSnapType: "x mandatory" }}
//           >
//             {cloned.map((item, index) => (
//               <div
//                 key={index}
//                 className="carousel-card snap-start shrink-0 text-center flex flex-col items-center 
//                 min-w-[75%] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[240px] xl:min-w-[260px]"
//               >
//                 <div className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden flex items-center justify-center mb-3">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//                 <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#2D7351] whitespace-pre-line leading-snug">
//                   {item.title}
//                 </h4>
//               </div>
//             ))}
//           </div> */}
// 
//           <div
//             ref={scrollRef}
//             onScroll={handleScroll}
//             className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-7 scroll-smooth overflow-x-auto scrollbar-hide py-6 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16"
//             style={{ scrollSnapType: "x mandatory" }}
//           >
//             {cloned.map((item, index) => (
//               <div
//                 key={index}
//                 className="carousel-card snap-start shrink-0 text-center flex flex-col items-center 
//                 w-[85%] sm:w-[250px] md:w-[280px] lg:w-[300px] xl:w-[320px]"
//               >
//                 <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden flex items-center justify-center mb-4">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//                 <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#2D7351] whitespace-pre-line leading-snug">
//                   {item.title}
//                 </h4>
//               </div>
//             ))}
//           </div>
// 
//         </div>
//       </div>
//     </section>
//   );
// };
// 
// export default AIContentSection;

const AIContentSection = () => null;

export default AIContentSection;


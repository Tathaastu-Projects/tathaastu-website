"use client";

// import React from "react";
// import ChakraImage from "../../assets/Chakra_image.svg";



// const ChakraSection = () => {
//   return (
//     <section className="w-full relative bg-white py-16 px-6 md:px-24 overflow-hidden">
//       {/* Mandala Decorative Background */}
//       <img
//         src="/mandala_bg.svg"
//         alt="Mandala Background"
//         className="absolute left-0 top-0 w-[300px] md:w-[400px] h-full opacity-20 z-0 object-contain pointer-events-none"
//       />

//       <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        
//         {/* LEFT - Chakra Image */}
//         <div className="w-[300px] h-[300px] rounded-full overflow-hidden shadow-xl border border-gray-200">
//           <img
//             src={ChakraImage}
//             alt="Chakra Wheel"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* RIGHT - Text Content */}
//         <div className="flex-1">
//           {/* Heading */}
//           <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
//             <span className="text-green-900">FROM </span>
//             <span className="text-pink-600">CHARTS TO CHAKRAS</span>
//             <span className="text-green-900"> – EVERYTHING YOU NEED</span>
//           </h2>

//           {/* Paragraph */}
//           <p className="text-gray-800 mb-6 text-sm md:text-base leading-relaxed">
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
//             when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
//             It has survived not only five centuries, but also the leap into electronic typesetting.
//           </p>

//           {/* Feature Box */}
//           <div className="bg-[#fff2e5] rounded-xl p-6 grid grid-cols-2 gap-4 mb-6 shadow-md">
//             <div className="flex items-center gap-2">
//               <img src="/icons/insight.svg" alt="AI Insight" className="w-5 h-5" />
//               <span className="font-semibold text-green-800 text-sm">AI-POWERED INSIGHTS</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <img src="/icons/remedy.svg" alt="Remedies" className="w-5 h-5" />
//               <span className="font-semibold text-pink-600 text-sm">AUTHENTIC REMEDIES</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <img src="/icons/expert.svg" alt="Experts" className="w-5 h-5" />
//               <span className="font-semibold text-red-600 text-sm">EXPERT-BACKED CONSULTATIONS</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <img src="/icons/spiritual.svg" alt="Spiritual Growth" className="w-5 h-5" />
//               <span className="font-semibold text-green-700 text-sm">PERSONALIZED SPIRITUAL GROWTH</span>
//             </div>
//           </div>

//           {/* Learn More Button */}
//           <button className="bg-[#c85e72] hover:bg-[#b04f63] text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300">
//             LEARN MORE
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ChakraSection;



import React from "react";

const ChakraSection = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Heading with decorative arrows */}
        <div className="relative">
          <div className="absolute -left-8 top-0 text-gray-300 text-2xl font-bold"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gray-800">FROM </span>
            <span className="text-pink-600">CHARTS TO CHAKRAS</span>
            <span className="text-gray-800"> – EVERYTHING YOU NEED</span>
          </h2>
        </div>

        {/* Paragraph with decorative arrows */}
        <div className="relative">
          <div className="absolute -left-8 top-0 text-gray-300 text-2xl font-bold"></div>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed uppercase">
            LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY. LOREM IPSUM HAS BEEN THE INDUSTRY'S STANDARD DUMMY TEXT EVER SINCE THE 1500S, WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK. IT HAS SURVIVED NOT ONLY FIVE CENTURIES, BUT ALSO THE LEAP INTO ELECTRONIC TYPESETTING.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChakraSection;
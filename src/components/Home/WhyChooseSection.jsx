"use client";

// import React from "react";
// import { Clock, Lightbulb, Globe, Lock, ThumbsUp } from "lucide-react";
// import ReviewImage from "../../assets/review.svg"; // Replace with your actual image path
// import Trust from "../../assets/trust.svg"; 
// import Solution from "../../assets/solution.svg";
// import Privacy from "../../assets/privacy.svg";
// import World from "../../assets/world.svg";
// import Availibilty from "../../assets/availablity.svg";


// const WhyChooseSection = () => {
//   return (
//     <section className=" py-16 px-6 font-sans">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12">
//         <h2 className="text-3xl font-bold text-[#2D7351]">
//           WHY CHOOSE <span className="text-[#C5445D]">TATHAASTU</span>
//         </h2>
//         <p className="text-center md:text-right text-sm text-gray-700 max-w-md mt-4 md:mt-0">
//           CONTACT US TO EXPERIENCE EXPERT GUIDED ASTROLOGER’S ADVICE.
//         </p>
//       </div>

//       {/* Feature Section */}
//       {/* <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"> */}
//         {/* Left Two Cards */}
//         <div className="flex flex-row gap-6 mx-auto px-6 max-w-[1300px]">
//       {/* Box 1 - 1 part */}
//       <div className="basis-1/4 flex-grow bg-[#fff7ed] rounded-2xl p-6 shadow-md text-center flex flex-col justify-around space-y-4">
//         <div className="flex flex-row items-center">
//            <img
//           src={Availibilty}
//           alt="Availibilty"
//           className="rounded-2xl object-cover w-50px h-50px"
//         />
//           <p className="font-semibold text-[#2D7351] text-sm pl-5">24x7, 365 DAYS <br/> AVAILABILITY</p>
//         </div>
//         <div className="flex flex-row items-center">
//            <img
//           src={Solution}
//           alt="Solution"
//           className="rounded-2xl object-cover w-50px h-50px"
//         />
//           <p className="font-semibold text-[#C5445D] text-sm pl-4">100% ACCURATE <br/> SOLUTIONS</p>
//         </div>
//       </div>

//       {/* Box 2 - 1 part */}
//       <div className="basis-1/4 flex-grow bg-[#fff7ed] rounded-2xl p-6 shadow-md text-center flex flex-col justify-around space-y-4">
//         <div className="flex flex-row items-center gap-2">
//            <img
//           src={World}
//           alt="Privacy"
//           className="rounded-2xl object-cover w-50px h-50px"
//         />
//           <p className="font-semibold text-[#C5445D] text-sm pl-4">INSTANT ACCESS <br/> WORLDWIDE</p>
//         </div>
//         <div className="flex flex-row items-center gap-7">
//           <img
//           src={Privacy}
//           alt="Privacy"
//           className="rounded-2xl object-cover w-50px h-50px"
//         />
//           <p className="font-semibold text-[#2D7351] text-sm pl-4">PRIVACY <br/> GUARANTEED</p>
//         </div>
//       </div>

//       {/* Box 3 - 2 parts (Review Section) */}
//       <div className="basis-2/4 flex-grow rounded-xl px-6 relative overflow-hidden flex items-center justify-center">
//         <img
//           src={ReviewImage}
//           alt="Trusted Clients"
//           className="rounded-2xl object-cover w-full h-full"
//         />
//         <div className="absolute bottom-6 left-6  px-4 py-2 rounded-xl shadow flex flex-row justify-center items-center gap-2">
//            <img
//           src={Trust}
//           alt="Trusted Clients"
//           className="rounded-2xl object-cover w-50px h-50px"
//         />
//           <p className="text-[#2D7351] font-semibold text-lg font-bold pl-4">TRUSTED BY <br/> MILLION+ CLIENTS</p>
//         </div>
//       </div>
//     </div>
//         {/* Right Image Box */}
//         {/* <div className="md:col-span-2  rounded-2xl p-6  relative overflow-hidden flex items-center justify-center">
//           <img
//             src={ReviewImage}
//             alt="Trusted Clients"
//             className="rounded-2xl object-cover w-full h-full"
//           />
//           <div className="absolute bottom-6 left-6 bg-white/90 px-4 py-2 rounded-xl shadow flex items-center gap-2">
//             <ThumbsUp className="text-[#2D7351]" size={20} />
//             <p className="text-[#2D7351] font-semibold text-sm">TRUSTED BY MILLION+ CLIENTS</p>
//           </div>
//         </div> */}
//       {/* </div> */}
//     </section>
//   );
// };

// export default WhyChooseSection;



import React from "react";
import ReviewImage from "../../assets/review.svg";
import Trust from "../../assets/trust.svg";
import Solution from "../../assets/solution.svg";
import Privacy from "../../assets/privacy.svg";
import World from "../../assets/world.svg";
import Availibilty from "../../assets/availablity.svg";

const WhyChooseSection = () => {
  return (
    <section className="py-8 md:py-16 px-4 md:px-6 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D7351] text-center md:text-left">
          WHY CHOOSE <span className="text-[#C5445D]">TATHAASTU</span>
        </h2>
        <p className="text-center md:text-right text-xs md:text-sm text-gray-700 max-w-xs md:max-w-md mt-2 md:mt-0">
          CONTACT US TO EXPERIENCE EXPERT GUIDED ASTROLOGER'S ADVICE.
        </p>
      </div>

      {/* Feature Boxes */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Two Cards - Stack vertically on mobile */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full lg:w-1/2">
          {/* Box 1 */}
          <div className="bg-[#fff7ed] rounded-2xl p-4 md:p-6 shadow-md flex flex-col space-y-4 w-full">
            <div className="flex items-center">
              <img
                src={Availibilty}
                alt="Availibilty"
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <p className="font-semibold text-[#2D7351] text-xs md:text-sm ml-3 md:ml-5">
                24x7, 365 DAYS <br className="hidden sm:inline" /> AVAILABILITY
              </p>
            </div>
            <div className="flex items-center">
              <img
                src={Solution}
                alt="Solution"
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <p className="font-semibold text-[#C5445D] text-xs md:text-sm ml-3 md:ml-4">
                100% ACCURATE <br className="hidden sm:inline" /> SOLUTIONS
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-[#fff7ed] rounded-2xl p-4 md:p-6 shadow-md flex flex-col space-y-4 w-full">
            <div className="flex items-center">
              <img
                src={World}
                alt="Privacy"
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <p className="font-semibold text-[#C5445D] text-xs md:text-sm ml-3 md:ml-4">
                INSTANT ACCESS <br className="hidden sm:inline" /> WORLDWIDE
              </p>
            </div>
            <div className="flex items-center">
              <img
                src={Privacy}
                alt="Privacy"
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <p className="font-semibold text-[#2D7351] text-xs md:text-sm ml-3 md:ml-4">
                PRIVACY <br className="hidden sm:inline" /> GUARANTEED
              </p>
            </div>
          </div>
        </div>

        {/* Review Box */}
        <div className="w-full lg:w-1/2 rounded-xl relative overflow-hidden min-h-[200px] md:min-h-[300px]">
          <img
            src={ReviewImage}
            alt="Trusted Clients"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute bottom-4 left-4 px-3 py-2 md:px-4 md:py-2 rounded-xl bg-white/90 shadow flex items-center">
            <img
              src={Trust}
              alt="Trusted Clients"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <p className="text-[#2D7351] font-semibold text-sm md:text-base ml-2 md:ml-4">
              TRUSTED BY <br className="hidden sm:inline" /> MILLION+ CLIENTS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
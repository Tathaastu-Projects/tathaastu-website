"use client";

// import React from 'react';
// import Aries from '../../assets/aries.svg'; // Placeholder for Aries
// import Cancer from '../../assets/cancer.svg'; // Placeholder for Gemini
// import Gemini from '../../assets/gemini.svg'; // Placeholder for Cancer
// import Leo from '../../assets/leo.svg'; // Placeholder for Leo
// import Libra from '../../assets/libra.svg'; // Placeholder for Virgo
// import Scorpio from '../../assets/scorpio.svg'; // Placeholder for Sun Image
// import Taurus from '../../assets/taurus.svg'; // Placeholder for Sun Image
// import Virgo from '../../assets/virgo.svg'; // Placeholder for Sun Image
// import CenterSunImage from '../../assets/sunwithflowerbg.svg'; // Placeholder for Background

// const horoscopeData = [
//   { name: 'ARIES', date: 'MARCH 21 – APR 19', icon: Aries },
//   { name: 'TAURUS', date: 'APR 20 – MAY 20', icon: Taurus },
//   { name: 'GEMINI', date: 'MAY 21 – JUNE 20', icon: Gemini },
//   { name: 'CANCER', date: 'JUNE 21 – JULY 22', icon: Cancer },
//   { name: 'LEO', date: 'JULY 23 – AUG 22', icon: Leo },
//   { name: 'VIRGO', date: 'AUG 23 – SEP 22', icon: Virgo },
//   { name: 'LIBRA', date: 'SEP 23 – OCT 23', icon:  Libra},
//   { name: 'SCORPIO', date: 'OCT 24 – NOV 22', icon: Scorpio },
// ];

// const KnowYourHoroscope = () => {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md max-w-5xl mx-auto relative">
//       <div className="text-center mb-6">
//         <h2 className="text-lg font-semibold">
//           <span className="text-green-800">KNOW YOUR </span>
//           <span className="text-pink-500">HOROSCOPE</span>
//         </h2>
//       </div>

//       <div className="flex justify-between items-center">
//         <div className="space-y-6">
//           {horoscopeData.slice(0, 4).map((item, index) => (
//             <div key={index} className="flex items-center space-x-3">
//               <img src={item.icon} alt={item.name} className="w-12 h-12" />
//               <div>
//                 <h3 className="text-sm font-bold">{item.name}</h3>
//                 <p className="text-xs text-gray-500">{item.date}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="relative">
//           <img
//             src={BackgroundFlower}
//             alt="Background Flower"
//             className="absolute inset-0 w-64 h-64 object-contain opacity-40"
//           />

//           <div className="bg-yellow-400 rounded-b-full rounded-t-full w-64 h-96 flex items-center justify-center relative z-10">
//             <img src={CenterSunImage} alt="Sun" className="w-24 h-24" />
//           </div>
//         </div>

//         <div className="space-y-6">
//           {horoscopeData.slice(4).map((item, index) => (
//             <div key={index} className="flex items-center space-x-3">
//               <img src={item.icon} alt={item.name} className="w-12 h-12" />
//               <div>
//                 <h3 className="text-sm font-bold">{item.name}</h3>
//                 <p className="text-xs text-gray-500">{item.date}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="text-center mt-6">
//         <button className="bg-pink-500 text-white px-4 py-2 rounded-full shadow">VIEW MORE</button>
//       </div>
//     </div>
//   );
// };

// export default KnowYourHoroscope;









import React from "react";

// COMMENTED OUT: "Know Your Horoscope" — zodiac grid, VIEW MORE, center sun image
// import React from 'react';
// import Aries from '../../assets/aries.svg';
// import Cancer from '../../assets/cancer.svg';
// import Gemini from '../../assets/gemini.svg';
// import Leo from '../../assets/leo.svg';
// import Libra from '../../assets/libra.svg';
// import Scorpio from '../../assets/scorpio.svg';
// import Taurus from '../../assets/taurus.svg';
// import Virgo from '../../assets/virgo.svg';
// import CenterSunImage from '../../assets/sunwithflowerbg.svg';
//
// const horoscopeData = [
//   { name: 'ARIES', date: 'MARCH 21 – APR 19', icon: Aries },
//   { name: 'TAURUS', date: 'APR 20 – MAY 20', icon: Taurus },
//   { name: 'GEMINI', date: 'MAY 21 – JUNE 20', icon: Gemini },
//   { name: 'CANCER', date: 'JUNE 21 – JULY 22', icon: Cancer },
//   { name: 'LEO', date: 'JULY 23 – AUG 22', icon: Leo },
//   { name: 'VIRGO', date: 'AUG 23 – SEP 22', icon: Virgo },
//   { name: 'LIBRA', date: 'SEP 23 – OCT 23', icon: Libra },
//   { name: 'SCORPIO', date: 'OCT 24 – NOV 22', icon: Scorpio },
// ];
//
// const KnowYourHoroscope = () => {
//   return (
//     <div className=" p-8 rounded-lg max-w-5xl mx-auto relative">
//       <div className="flex flex-row justify-between text-center mb-6">
//         <h2 className="text-3xl font-bold">
//           <span className="text-green-800">KNOW YOUR </span>
//           <span className="text-[#D05A69]">HOROSCOPE</span>
//         </h2>
//         <div className="text-center">
//         <button className="bg-[#D05A69] text-white px-20 py-2 rounded-full shadow">
//             <p>VIEW MORE</p>
//         </button>
//       </div>
//       </div>
//
//       <div className="flex justify-between items-center">
//         <div className="space-y-2">
//           {horoscopeData.slice(0, 4).map((item, index) => (
//             <div key={index} className="flex flex-col items-center space-x-2 space-y-2">
//               <img src={item.icon} alt={item.name} loading="lazy" decoding="async" className="w-48 h-48" />
//
//               <div >
//                  <h3 className="text-lg font-bold text-[#0B513C]">{item.name}</h3>
//                 <p className="text-sm font-bold text-[#0B513C]">{item.date}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//
//         <div className="relative  ml-10 mr-20">
//           <img
//             src={CenterSunImage}
//             alt="Sun with Background"
//             loading="lazy"
//             decoding="async"
//             className="w-300 h-300 object-contain"
//           />
//         </div>
//
//         <div className="space-y-6">
//           {horoscopeData.slice(4).map((item, index) => (
//             <div key={index} className="flex flex-col items-center space-x-2 space-y-2">
//               <img src={item.icon} alt={item.name} loading="lazy" decoding="async" className="w-48 h-48" />
//               <div>
//                 <h3 className="text-lg font-bold text-[#0B513C]">{item.name}</h3>
//                 <p className="text-sm font-bold text-[#0B513C]">{item.date}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//
//
//     </div>
//   );
// };
//
// export default KnowYourHoroscope;

const KnowYourHoroscope = () => null;

export default KnowYourHoroscope;

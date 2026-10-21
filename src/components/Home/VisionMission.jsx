"use client";

import React from "react";
import lotusBackground from "../../assets/lotus.svg"; // Replace with your actual image path
import { ArrowRight } from "lucide-react";
import { useConnectModal } from "../../contexts/ConnectModalContext";

const VisionMissionSection = () => {
  const { openModal } = useConnectModal();
  return (
    <section className="w-full py-16 bg-white font-sans">
      <div className="max-w-full  flex flex-col md:flex-row  justify-between px-6">
        
        {/* Left: Show only right half of the image */}
        {/* <div className="w-full md:w-1/2 h-[800px] overflow-hidden relative ">
          <div className="relative w-[200%] h-full transform -translate-x-1/2 flex items-center justify-center">
          
            <img
              src={lotusBackground}
              alt="Lotus"
              className="h-full object-contain"
            />
            <div className="absolute top-6 left-6 z-10 bg-black">
    <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#2D7351]">
      WHAT WE DO – <span className="text-[#C5445D]">VISION & MISSION</span>
    </h2>
  </div>
          </div>
        </div> */}

        {/* <div className="w-full md:w-1/2 h-[800px] overflow-hidden relative justify-center">
  
  <div className="w-[200%] h-full transform -translate-x-1/2">
    <img
      src={lotusBackground}
      alt="Lotus"
      className="h-full object-contain"
    />
  </div>


  <div className="absolute top-6 left-6 z-10">
    <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#2D7351]">
      WHAT WE DO – <span className="text-[#C5445D]">VISION & MISSION</span>
    </h2>
  </div>
</div> */}


<div className="w-full md:w-1/2 h-[800px] overflow-hidden relative">
      {/* Lotus Image - shift left to show right half only */}



      <div className="w-[200%] h-full transform -translate-x-1/2">
        <img
          src={lotusBackground}
          alt="Lotus"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text block positioned over visible image */}
      <div className="absolute top-10 left-[25%] z-10">
        <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#2D7351] leading-snug">
          WHAT WE DO – <span className="text-[#C5445D]">VISION & MISSION</span>
        </h2>
      </div>
    </div>


        {/* Right: Text Content */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-12 pt-12 text-center md:text-left flex flex-col items-center justify-between">
          
          <div className="text-gray-700 leading-relaxed text-sm md:text-base mb-8 max-w-[500px] space-y-4">
            <p>
              At Tathasstu, we believe that every soul comes with a divine blueprint (a cosmic map that guides your life's journey).
            </p>
            <p>
              We are more than just an astrology platform. We are a spiritual companion on your path to clarity, healing, and self-awareness.
            </p>
            <p>
              Our mission is simple: Help you connect with India's best professional astrologers who can provide real, accurate, and personalized guidance so you can navigate life's challenges with clarity and confidence.
            </p>
            <p>
              If you have any questions about marriage, love life, career, health, or personal growth, our expert astrologers are available to you 24/7 via call, chat, reports, or query-based consultations.
            </p>
            <p>
              At Tathasstu, every reading is rooted in authenticity. We bring together a community of trusted astrologers, energy healers, and spiritual guides who have spent years mastering their craft. Each consultation is handled with empathy and confidentiality, ensuring you receive not just predictions but direction and peace of mind.
            </p>
            <p>
              Our services extend beyond astrology. From Vaastu guidance to crystal and chakra healing, tarot insights, and personalized remedies, we offer a holistic approach to well-being. Whether you are seeking balance in your home, harmony in your relationships, or clarity in your life path, Tathasstu is your sacred space to realign your energies.
            </p>
          </div>
          {/* <button className="bg-[#C5445D] max-w-1/2 text-white px-24 py-2  rounded-full shadow-md font-semibold hover:bg-[#a6344f] transition-all">
            CONTACT US  
          </button> */}
          <button 
            onClick={openModal}
            className="bg-[#C5445D] max-w-1/2 text-white px-24 py-2 flex items-center gap-2 rounded-full shadow-md font-semibold hover:bg-[#a6344f] transition-all"
          >
            Book A Call
            <ArrowRight size={20} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;

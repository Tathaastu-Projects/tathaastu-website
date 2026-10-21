"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from "@/lib/router";
import Footer from '../layout/Footer';
import SiteNavbar from '../layout/SiteNavbar';
import Seperator from '../components/Home/SeperatorComponent';
import coursesData from '../data/coursesData';
import { motion } from "framer-motion";

// Course Images
import VastuCourse1 from "../assets/vaastu_course1.svg";
import VastuCourse2 from "../assets/vaastu_course2.svg";
import VastuCourse3 from "../assets/vaastu_course3.svg";
import VastuCourse4 from "../assets/vaastu_course4.svg";
import VastuCourse5 from "../assets/vaastu_course5.svg";
import VastuCourse6 from "../assets/vaastu_course6.svg";
import VastuCourse7 from "../assets/vaastu_course7.svg";
import VastuCourse8 from "../assets/vaastu_course8.svg";
import VastuCourse9 from "../assets/vaastu_course9.svg";

// Navigation Arrows
import LeftArrow from "../assets/left_arrow.svg";
import RightArrow from "../assets/right_side_arrow.svg";

export default function Courses() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const categoryBtnRefs = useRef([]);
  const courseSectionRefs = useRef({});
  const navigate = useNavigate();
  
  const courseCategories = [
    "VASTU COURSE",
    "ASTROLOGY COURSE", 
    "CRYSTAL SCANNING",
    "TAROT CARD COURSE",
    "NUMEROLOGY COURSE",
    "YOGA COURSE",
    "PET HEALING",
    "AURA SCANNING",
    "DOWSING"
  ];

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200; // Adjust based on button width + gap
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200; // Adjust based on button width + gap
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (index) => {
    setCurrentCategoryIndex(index);
    // Keep the clicked category visible in the strip
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const buttonWidth = 150; // Approximate button width
      const gap = 12; // Gap between buttons
      const scrollPosition = index * (buttonWidth + gap);
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }

    // Scroll to the matching course card
    const category = courseCategories[index];
    const targetEl = courseSectionRefs.current?.[category];
    if (targetEl) {
      const topOffset = 140; // sticky navbar + top bar
      const y = targetEl.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Map courses from coursesData with additional properties for display
  const courses = coursesData.map((course, index) => {
    // Map titles to match the display format
    const titleMap = {
      "Vaastu Course": "VASTU COURSE",
      "Astrology Course": "ASTROLOGY COURSE",
      "Tarot Card Reading Course": "TAROT CARD COURSE",
      "Numerology Course": "NUMEROLOGY COURSE",
      "Yoga Instructor Course": "YOGA COURSE",
      "Pet Healing Course": "PET HEALING",
      "Aura Scanning Course": "AURA SCANNING",
      "Crystal Scanning Course": "CRYSTAL SCANNING",
      "Dowsing Course": "DOWSING",
    };
    
    // Original descriptions for the listing page
    const originalDescriptions = {
      "Vaastu Course": "Knowledge is the first step to transformation — and our Vaastu Courses are designed to help you harness the ancient science of space and energy. Whether you're a beginner exploring the principles of Vaastu or a professional looking to deepen your expertise, our courses combine spiritual insight with practical application. Learn how to balance the five elements, harmonize your home or workspace, and create environments that radiate peace, prosperity, and purpose — all under the guidance of seasoned Vaastu experts.",
      "Astrology Course": "Our Astrology Courses invite you to explore the divine language of the cosmos — the art of reading stars, planets, and destinies. Designed for both beginners and advanced learners, these courses blend ancient Vedic wisdom with a modern, easy-to-understand approach. You'll learn how to interpret birth charts, study planetary movements, and uncover the deeper karmic patterns that shape human life. Each session is guided by experienced astrologers who share real-life insights and time-tested techniques.",
      "Tarot Card Reading Course": "At Tathasstu, our Tarot Card Courses open the gateway to intuitive wisdom and self-discovery. These courses are designed to help you connect with the energy of the cards, interpret their meanings, and develop your intuitive abilities with confidence. Whether you're new to tarot or looking to refine your skills, our expert readers guide you through symbolism, spreads, and real-world practice. You'll learn how to offer insightful readings — not just by memorizing cards, but by truly feeling their messages.",
      "Numerology Course": "Our Numerology Courses reveal the hidden power of numbers — the sacred codes that shape your destiny. This course teaches you how to decode life's patterns through names, dates, and birth numbers, offering a deeper understanding of personality, purpose, and potential. Guided by experienced numerologists, you'll learn the ancient principles behind number vibrations and how they influence relationships, career paths, and life cycles. Whether you wish to master numerology for personal growth or as a professional skill, this course helps you ace the numeric blueprint.",
      "Yoga Instructor Course": "At Tathasstu, our Become a Yoga Instructor Course is more than a certification — it's a journey of self-mastery and spiritual awakening. Rooted in ancient yogic traditions, this course blends philosophy, posture training, breathwork, and meditation to help you embody the true essence of yoga. You'll learn how to guide others with mindfulness, balance, and compassion while deepening your own physical and spiritual practice. Whether you dream of teaching professionally or simply wish to elevate your personal journey, our experienced mentors support you every step of the way.",
      "Pet Healing Course": "At Tathasstu, our Pet Healing Courses are crafted for those who believe that animals, too, have souls that feel, love, and heal. This course helps you understand the energetic and emotional world of pets, teaching techniques like chakra healing, crystal therapy, and intuitive communication. Guided by compassionate healers, you'll learn how to identify imbalances in your pet's energy field and restore harmony through mindful healing practices. Whether you're a pet parent seeking to support your furry friend or an animal lover exploring holistic care, this course empowers you to bring peace, comfort, and vitality to the beautiful souls that share your home.",
      "Aura Scanning Course": "At Tathasstu, our Aura Scanning Courses help you see beyond the physical and tune into the subtle energies that surround every living being. These courses are designed to help you understand, interpret, and balance the aura — the energetic field that reflects our emotions, thoughts, and spiritual state. Under the guidance of expert healers, you'll learn how to detect energy imbalances, cleanse negative vibrations, and strengthen your own aura through meditation, visualization, and crystal tools. Perfect for healers, energy practitioners, or anyone on a path of spiritual growth, this course empowers you to perceive energy with clarity and bring harmony to the mind, body, and spirit.",
      "Crystal Scanning Course": "At Tathasstu, our Crystal Scanning Courses introduce you to the mystical world of crystals — nature's own energy amplifiers. This course teaches you how to connect with the unique vibrations of crystals, use them for scanning energetic imbalances, and channel their healing power effectively. Guided by experienced crystal healers, you'll learn how to sense energy shifts, choose the right crystals for specific needs, and use them to cleanse, balance, and restore harmony within the body and environment. Whether you're new to crystal healing or looking to advance your practice, this course deepens your intuition and helps you work with crystals as sacred tools of transformation.",
      "Dowsing Course": "At Tathasstu, our Dowsing Courses open the door to one of the most ancient and intuitive forms of energy detection. This course teaches you how to use pendulums and rods to tap into subtle vibrations and access the body's innate wisdom. You'll learn how to locate energy blockages, identify answers hidden in your subconscious, and use dowsing for guidance, healing, and spiritual clarity. Under the mentorship of skilled practitioners, you'll discover the right techniques, calibration methods, and ethical practices that make dowsing a trusted spiritual art. Each session deepens your connection with your higher intuition, empowering you to seek answers with confidence, balance, and divine alignment.",
    };
    
    return {
      id: course.id,
      slug: course.slug,
      title: titleMap[course.title] || course.title,
      description: originalDescriptions[course.title] || course.h1Description.substring(0, 300) + "...",
      image: course.image,
      imagePosition: index % 2 === 0 ? "left" : "right",
    };
  });

  // Map each visible category label to its course section element
  const categoriesByCourseTitle = useMemo(() => {
    const titleMap = {
      "VASTU COURSE": "VASTU COURSE",
      "ASTROLOGY COURSE": "ASTROLOGY COURSE",
      "TAROT CARD COURSE": "TAROT CARD COURSE",
      "NUMEROLOGY COURSE": "NUMEROLOGY COURSE",
      "YOGA COURSE": "YOGA COURSE",
      "PET HEALING": "PET HEALING",
      "AURA SCANNING": "AURA SCANNING",
      "CRYSTAL SCANNING": "CRYSTAL SCANNING",
      "DOWSING": "DOWSING",
    };
    return titleMap;
  }, []);

  useEffect(() => {
    // Auto-highlight strip based on scroll position
    const elements = courseCategories
      .map((cat) => ({ cat, el: courseSectionRefs.current?.[cat] }))
      .filter((x) => Boolean(x.el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to top (and intersecting)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
        if (!visible?.target) return;

        const found = elements.find((x) => x.el === visible.target);
        if (!found) return;

        const idx = courseCategories.indexOf(found.cat);
        if (idx < 0) return;
        setCurrentCategoryIndex(idx);

        // IMPORTANT: Don't use scrollIntoView() here — it can scroll the PAGE back to the top strip.
        // Only scroll the horizontal strip container.
        const container = scrollContainerRef.current;
        const btn = categoryBtnRefs.current?.[idx];
        if (container && btn) {
          const targetLeft =
            btn.offsetLeft - (container.clientWidth / 2 - btn.clientWidth / 2);
          container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
        }
      },
      {
        root: null,
        threshold: 0.35,
        rootMargin: "-160px 0px -55% 0px", // account for sticky header
      }
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseCategories.join("|")]);

  return (
    <div className="bg-white text-[#073349]">
      
      {/* TOP BAR */}
      <div className="bg-[#D44459] text-white text-center py-2 px-4">
        <p className="text-sm font-medium">AI-POWERED PLATFORM REVOLUTIONIZING ASTROLOGY</p>
      </div>
      
      <SiteNavbar />

                           {/* HERO SECTION */}
        <section className="bg-white py-8 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-0" style={{ fontFamily: 'DM Serif Display, serif' }}>
              <span className="text-[#073349]">BECOME AN </span>
              <span className="text-[#D44459]">ASTROLOGER</span>
            </h1>
          </div>
        </section>
        
        <Seperator />

        {/* COURSES TITLE */}
        <section className="bg-white py-0 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#073349]">
              COURSES
            </h2>
          </div>
        </section>

      {/* COURSE CATEGORY NAVIGATION */}
      <section className="bg-white py-6 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
                         {/* Left Arrow */}
             <button 
               onClick={handlePrevious}
               className="flex-shrink-0 w-10 h-10 bg-[#D44459] rounded-full flex items-center justify-center hover:bg-[#B83A4A] transition-colors shadow-md"
             >
               <img src={LeftArrow} alt="Previous" className="w-5 h-5" />
             </button>
            
                         {/* Scrollable Categories */}
             <div 
               ref={scrollContainerRef}
               className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 scroll-smooth"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
             >
               {courseCategories.map((category, index) => (
                 <button
                   key={index}
                   className={`px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap flex-shrink-0 text-sm ${
                     index === currentCategoryIndex 
                       ? 'bg-[#D44459] text-white' 
                       : 'bg-[#F5D6B4] text-[#073349] hover:bg-[#E8C8A0]'
                   }`}
                   onClick={() => handleCategoryClick(index)}
                    ref={(el) => { categoryBtnRefs.current[index] = el; }}
                 >
                   {category}
                 </button>
               ))}
             </div>
            
                         {/* Right Arrow */}
             <button 
               onClick={handleNext}
               className="flex-shrink-0 w-10 h-10 bg-[#D44459] rounded-full flex items-center justify-center hover:bg-[#B83A4A] transition-colors shadow-md"
             >
               <img src={RightArrow} alt="Next" className="w-5 h-5" />
             </button>
          </div>
        </div>
      </section>

             {/* COURSE LISTINGS */}
       <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
         <div className="max-w-7xl mx-auto">
           <div className="space-y-20">
             {courses.map((course) => (
              <motion.div
                key={course.id}
                ref={(el) => {
                  const category = categoriesByCourseTitle[course.title] || course.title;
                  if (el && courseCategories.includes(category)) {
                    courseSectionRefs.current[category] = el;
                  }
                }}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col ${course.imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
              >
                 
                 {/* Course Image */}
                 <motion.div
                   className="w-full lg:w-1/2"
                   initial={{ opacity: 0, y: 18, scale: 0.98 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   viewport={{ once: true, margin: "-140px" }}
                   transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                 >
                   <div className="relative group">
                     <img 
                       src={course.image} 
                       alt={course.title}
                      loading="lazy"
                      decoding="async"
                       className="w-full h-72 lg:h-96 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                   </div>
                 </motion.div>
                 
                 {/* Course Content */}
                 <motion.div
                   className="w-full lg:w-1/2 space-y-6"
                   initial={{ opacity: 0, y: 18 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-140px" }}
                   transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                 >
                   <div className="space-y-4">
                     <h3 className="text-3xl md:text-4xl font-bold text-[#073349] leading-tight">
                       {course.title}
                     </h3>
                     <div className="w-16 h-1 bg-[#D44459] rounded-full"></div>
                   </div>
                   <p className="text-lg text-gray-700 leading-relaxed">
                     {course.description}
                   </p>
                   <div className="pt-4">
                     <button 
                       onClick={() => navigate(`/courses/${course.slug}`)}
                       className="bg-gradient-to-r from-[#D44459] to-[#B83A4A] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#B83A4A] hover:to-[#D44459] transition-all duration-300 transform hover:scale-105 shadow-lg"
                     >
                       LEARN MORE
                     </button>
                   </div>
                 </motion.div>
              </motion.div>
             ))}
           </div>
         </div>
       </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Authentic 22 Major Arcana Tarot Cards Database & 6-Card Spread Definitions

export const SPREAD_POSITIONS = [
  {
    id: 1,
    key: "past",
    title: "Past Influence",
    subtitle: "The Root Energy",
    desc: "Foundational events and subconscious conditioning that shaped where you stand today.",
    color: "#9C7A4A",
  },
  {
    id: 2,
    key: "present",
    title: "Present Energy",
    subtitle: "Current Reality",
    desc: "The cosmic vibration, mindset, and immediate atmosphere active in your life right now.",
    color: "#2E7D32",
  },
  {
    id: 3,
    key: "obstacle",
    title: "Hidden Obstacle",
    subtitle: "The Core Challenge",
    desc: "The unseen friction, mental block, or external resistance testing your resolve.",
    color: "#C62828",
  },
  {
    id: 4,
    key: "advice",
    title: "Divine Guidance",
    subtitle: "Spiritual Counsel",
    desc: "What the universe counsels you to embrace, cultivate, or release to move forward.",
    color: "#D4A853",
  },
  {
    id: "5",
    key: "future",
    title: "Near Future",
    subtitle: "Approaching Shift",
    desc: "Energies, opportunities, or turning points arriving in your path over coming weeks.",
    color: "#1565C0",
  },
  {
    id: 6,
    key: "outcome",
    title: "Ultimate Outcome",
    subtitle: "Destiny & Blessing",
    desc: "The highest resolution, spiritual growth, and cosmic outcome if you follow guidance.",
    color: "#6A1B9A",
  },
];

export const QUICK_QUESTIONS = [
  { label: "Love & Relationships", question: "What is the true direction of my love life and connection?" },
  { label: "Career & Growth", question: "What career breakthrough or new path is opening for me?" },
  { label: "Wealth & Abundance", question: "How can I unblock my financial flow and attract stability?" },
  { label: "Inner Healing", question: "What emotional baggage or fear must I release to heal?" },
  { label: "Big Decision", question: "What should I be mindful of before making my next major choice?" },
  { label: "Today's Guidance", question: "What sacred message does the universe have for me right now?" },
];

export const TAROT_DECK = [
  {
    id: "fool",
    number: "0",
    name: "The Fool",
    archetype: "New Beginnings & Infinite Potential",
    element: "Air",
    zodiac: "Uranus",
    keywords: ["Fresh Start", "Spontaneity", "Pure Faith", "Freedom"],
    icon: "feather",
    bgGradient: "from-amber-100 to-yellow-50",
    meanings: {
      past: "You took a bold leap of faith in your past that freed you from an old cycle, creating the fertile soil for where you are now.",
      present: "A brand new chapter is begging to open. Shed overthinking and approach this situation with curiosity, wonder, and innocent trust.",
      obstacle: "Recklessness or fear of committing to the journey. Avoid leaping without preparing your foundation.",
      advice: "Take the leap you have been contemplating. Trust your inner compass and embrace this clean slate without fear.",
      future: "An unexpected adventure or unconventional opportunity will present itself, requiring an open heart.",
      outcome: "A joyful liberation. You will step into a timeline filled with authentic self-expression and unburdened enthusiasm."
    }
  },
  {
    id: "magician",
    number: "I",
    name: "The Magician",
    archetype: "Conscious Manifestation & Willpower",
    element: "Air",
    zodiac: "Mercury",
    keywords: ["Manifestation", "Resourcefulness", "Power", "Skill"],
    icon: "infinity",
    bgGradient: "from-rose-100 to-amber-50",
    meanings: {
      past: "You discovered your innate gifts or learned a crucial skill that now gives you the power to shape your reality.",
      present: "As above, so below. You possess every single tool, talent, and resource necessary to achieve your desire. Align your thoughts with action.",
      obstacle: "Scattered intentions or self-doubt. You may be misusing your creative energy or feeling disconnected from your confidence.",
      advice: "Take purposeful, deliberate action. Channel your intent into clear daily steps and declare what you desire into existence.",
      future: "A powerful moment of creative mastery. Ideas will crystalize into tangible real-world success.",
      outcome: "Total manifestation. What was once only a vision in your mind will become an established reality in your world."
    }
  },
  {
    id: "priestess",
    number: "II",
    name: "The High Priestess",
    archetype: "Sacred Intuition & Inner Wisdom",
    element: "Water",
    zodiac: "Moon",
    keywords: ["Intuition", "Divine Feminine", "Subconscious", "Mystery"],
    icon: "moon",
    bgGradient: "from-indigo-100 to-sky-50",
    meanings: {
      past: "A time of quiet observation or spiritual awakening in your past helped you tap into your deeper instincts.",
      present: "The answers you seek cannot be found in external noise. Turn inward, listen to your dreams, and trust your gut feelings.",
      obstacle: "Ignoring your intuition in favor of others' opinions, or secret motives hidden beneath the surface.",
      advice: "Be still and listen to the silent whisper within. Do not rush to speak or act until your intuition gives clear clearance.",
      future: "Hidden truths and synchronicities will unveil themselves, guiding you precisely where you need to be.",
      outcome: "Profound spiritual clarity. You will develop an unshakable trust in your own intuitive mastery and divine timing."
    }
  },
  {
    id: "empress",
    number: "III",
    name: "The Empress",
    archetype: "Divine Abundance & Radiant Creation",
    element: "Earth",
    zodiac: "Venus",
    keywords: ["Abundance", "Nurturing", "Fertility", "Sensuality"],
    icon: "flower",
    bgGradient: "from-emerald-100 to-lime-50",
    meanings: {
      past: "A period of nurturing or planting fertile seeds that are now preparing to blossom into rich harvest.",
      present: "You are surrounded by boundless creative and loving energy. Nourish your projects, body, and loved ones with softness.",
      obstacle: "Overextending your energy to care for others while neglecting your own emotional and physical well-being.",
      advice: "Embrace receptivity. Allow good things to flow to you effortlessly rather than forcing outcomes with harsh strain.",
      future: "A season of flourishing abundance, whether in love, creative endeavors, family harmony, or material wealth.",
      outcome: "Golden prosperity and peace. Your life will experience lush comfort, mutual love, and thriving expansion."
    }
  },
  {
    id: "emperor",
    number: "IV",
    name: "The Emperor",
    archetype: "Divine Order & Unshakable Foundation",
    element: "Fire",
    zodiac: "Aries",
    keywords: ["Stability", "Structure", "Leadership", "Protection"],
    icon: "shield",
    bgGradient: "from-red-100 to-orange-50",
    meanings: {
      past: "Discipline, boundaries, or mentorship laid a strong, dependable groundwork that sustains your current stability.",
      present: "Time to take charge of your domain. Establish clear boundaries, bring structure to chaos, and lead with quiet dignity.",
      obstacle: "Rigid thinking, excessive control, or struggle against stubborn authority figures.",
      advice: "Ground yourself in logic, strategy, and self-discipline. Set firm boundaries and protect your peace ruthlessly.",
      future: "You will step into a position of respected authority or achieve institutional backing and long-term security.",
      outcome: "An unshakeable sanctuary. You will construct a stable life structure that withstands any future storm."
    }
  },
  {
    id: "hierophant",
    number: "V",
    name: "The Hierophant",
    archetype: "Sacred Wisdom & Spiritual Lineage",
    element: "Earth",
    zodiac: "Taurus",
    keywords: ["Tradition", "Spiritual Guide", "Belief Systems", "Mentorship"],
    icon: "temple",
    bgGradient: "from-amber-100 to-stone-50",
    meanings: {
      past: "Traditional values, familial heritage, or formal spiritual studies provided you with ethical guidance.",
      present: "Seek guidance from a trusted mentor, elder, or sacred wisdom tradition. Stay rooted in proven spiritual principles.",
      obstacle: "Outdated dogmas or conforming to expectations that no longer align with your soul's authentic path.",
      advice: "Look to time-tested wisdom and ethical clarity. Align yourself with communities that elevate your consciousness.",
      future: "A significant teacher, mentor, or sacred ceremony will initiate you into a deeper understanding of life.",
      outcome: "Spiritual alignment and community belonging. You will embody profound wisdom and share light with others."
    }
  },
  {
    id: "lovers",
    number: "VI",
    name: "The Lovers",
    archetype: "Sacred Union & Heart's True Choice",
    element: "Air",
    zodiac: "Gemini",
    keywords: ["Soul Connection", "Harmony", "Values", "Crucial Choice"],
    icon: "heart",
    bgGradient: "from-pink-100 to-rose-50",
    meanings: {
      past: "A profound soul partnership or pivotal moral decision formed the bedrock of your emotional worldview.",
      present: "A powerful moment of heart alignment. Whether choosing between two paths or deepening a sacred bond, let love lead.",
      obstacle: "Inner conflict between what your heart desires and what convenience dictates; fear of vulnerability.",
      advice: "Choose what aligns with your deepest moral values and highest self. Do not compromise your soul for temporary safety.",
      future: "A beautiful deepening of partnership, mutual devotion, or a harmonious resolution that unites opposites.",
      outcome: "Sacred union and peace of heart. You will walk in complete authenticity and attract reciprocal, unconditional love."
    }
  },
  {
    id: "chariot",
    number: "VII",
    name: "The Chariot",
    archetype: "Focused Will & Victorious Momentum",
    element: "Water",
    zodiac: "Cancer",
    keywords: ["Determination", "Victory", "Momentum", "Overcoming"],
    icon: "chariot",
    bgGradient: "from-teal-100 to-cyan-50",
    meanings: {
      past: "You conquered opposing forces or emotional turmoil through sheer perseverance and grit.",
      present: "Keep your hands firmly on the reins. Harness your contradictory emotions and channel them into one focused direction.",
      obstacle: "Loss of control, aggressiveness, or feeling pulled in opposite directions by conflicting duties.",
      advice: "Stay relentlessly focused on your goal. Discipline your thoughts and charge forward without wavering.",
      future: "Rapid acceleration. Stagnant situations will break open and move at exhilarating speed toward victory.",
      outcome: "Decisive triumph. You will overcome all competition or challenges, reaching your highest aspiration."
    }
  },
  {
    id: "strength",
    number: "VIII",
    name: "Strength",
    archetype: "Gentle Courage & Inner Mastery",
    element: "Fire",
    zodiac: "Leo",
    keywords: ["Compassion", "Quiet Power", "Patience", "Grace"],
    icon: "sunburst",
    bgGradient: "from-orange-100 to-amber-50",
    meanings: {
      past: "You weathered painful emotional trials not with harsh force, but with quiet endurance and resilience.",
      present: "True power lies in gentleness, patience, and compassion. Tame your anxieties with loving kindness rather than brute force.",
      obstacle: "Self-doubt, imposter syndrome, or letting anger and primal reactions dictate your decisions.",
      advice: "Lead with empathy and calm dignity. You are far stronger than you believe; love will disarm every adversary.",
      future: "A test of fortitude where your grace under pressure will earn you profound admiration and inner peace.",
      outcome: "Unshakeable confidence. You will master your emotional storms and walk with regal serenity."
    }
  },
  {
    id: "hermit",
    number: "IX",
    name: "The Hermit",
    archetype: "Sacred Solitude & The Inner Lantern",
    element: "Earth",
    zodiac: "Virgo",
    keywords: ["Soul Searching", "Inner Light", "Introspection", "Guidance"],
    icon: "lantern",
    bgGradient: "from-slate-100 to-blue-50",
    meanings: {
      past: "A necessary period of withdrawal and contemplation that cleared away worldly illusions.",
      present: "Step back from external chatter. The answers cannot be found in social circles right now, but in sacred quietude.",
      obstacle: "Isolating yourself out of bitterness, or conversely, refusing to spend even five minutes in self-reflection.",
      advice: "Take solitary walks, meditate, and read inspiring wisdom. Illuminate your own path one step at a time.",
      future: "A profound epiphany will dawn upon you in silence, giving you complete clarity on your destiny.",
      outcome: "Enlightenment and self-sufficiency. You will become your own wise guide and a beacon of light for others."
    }
  },
  {
    id: "wheel",
    number: "X",
    name: "Wheel of Fortune",
    archetype: "Cosmic Cycles & Divine Synchronicity",
    element: "Fire",
    zodiac: "Jupiter",
    keywords: ["Karmic Shift", "Good Fortune", "Destiny", "Turning Point"],
    icon: "wheel",
    bgGradient: "from-purple-100 to-indigo-50",
    meanings: {
      past: "A sudden turn of events or serendipitous meeting redirected the trajectory of your entire life.",
      present: "The wheel is spinning in your favor! Old difficulties are receding as a cycle of auspicious karma begins.",
      obstacle: "Resisting change or trying to hold onto a cycle that has naturally come to completion.",
      advice: "Flow with the cosmic current. Adapt gracefully, notice repeating synchronicities, and seize lucky breaks.",
      future: "A sudden, miraculous change of circumstances that elevates you beyond what you thought possible.",
      outcome: "Divine elevation. The universe restores balance, delivering well-deserved karma, blessings, and abundance."
    }
  },
  {
    id: "justice",
    number: "XI",
    name: "Justice",
    archetype: "Cosmic Truth & Karmic Equilibrium",
    element: "Air",
    zodiac: "Libra",
    keywords: ["Truth", "Fairness", "Law of Karma", "Integrity"],
    icon: "scales",
    bgGradient: "from-sky-100 to-indigo-50",
    meanings: {
      past: "A crucial moment where fair dealing, legal closure, or honest accountability brought closure.",
      present: "Every action carries a reaction. Weigh all factors objectively, speak only the truth, and act with unblemished integrity.",
      obstacle: "Unfair treatment, dishonesty, or evading responsibility for past oversights.",
      advice: "Stand firm in the truth. Be completely transparent in your dealings and trust that cosmic justice is never late.",
      future: "Legal, contractual, or relational disputes will resolve in a just, balanced, and rightful manner.",
      outcome: "Karmic vindication. Balance is restored, truth prevails, and you walk forward with a clean conscience."
    }
  },
  {
    id: "hanged",
    number: "XII",
    name: "The Hanged Man",
    archetype: "Sacred Pause & Enlightened Surrender",
    element: "Water",
    zodiac: "Neptune",
    keywords: ["Surrender", "New Perspective", "Patience", "Letting Go"],
    icon: "tree",
    bgGradient: "from-blue-100 to-teal-50",
    meanings: {
      past: "A pause or voluntary sacrifice that forced you to view life through a completely different lens.",
      present: "Do not struggle against delays. This apparent pause is a sacred gestation period allowing you to gain higher perception.",
      obstacle: "Stubborn resistance to waiting; feeling victimized by circumstances beyond your immediate control.",
      advice: "Surrender your ego's rigid timeline. Look at the situation upside down — what blessing is this delay hiding?",
      future: "A sudden breakthrough in perspective that turns a perceived disadvantage into your greatest superpower.",
      outcome: "Spiritual liberation. You will release the need to control everything and experience serene enlightenment."
    }
  },
  {
    id: "death",
    number: "XIII",
    name: "Death & Rebirth",
    archetype: "Profound Metamorphosis & Sacred Renewal",
    element: "Water",
    zodiac: "Scorpio",
    keywords: ["Transformation", "Ending Old Cycles", "Rebirth", "New Dawn"],
    icon: "phoenix",
    bgGradient: "from-violet-100 to-purple-50",
    meanings: {
      past: "A major chapter closed permanently, stripping away what was outgrown so new life could sprout.",
      present: "You are shedding an old identity like a chrysalis. Release attachments gracefully; the old must depart for the new to rise.",
      obstacle: "Clinging desperately to dead relationships, obsolete habits, or nostalgic memories that have served their purpose.",
      advice: "Allow the ending to happen without grief. Welcome the fertile soil of renewal and trust the dawn ahead.",
      future: "A rebirth of your passions and lifestyle. Fresh vitality will surge into areas that felt withered.",
      outcome: "Total metamorphosis. Like the phoenix, you will rise from the ashes with greater wisdom, power, and beauty."
    }
  },
  {
    id: "temperance",
    number: "XIV",
    name: "Temperance",
    archetype: "Divine Alchemy & Sacred Balance",
    element: "Fire",
    zodiac: "Sagittarius",
    keywords: ["Harmony", "Patience", "Moderation", "Healing"],
    icon: "chalice",
    bgGradient: "from-emerald-100 to-cyan-50",
    meanings: {
      past: "You successfully brought peace to discordant energies through moderation, diplomacy, and patience.",
      present: "You are blending disparate elements of your life into pure gold. Practice moderation in all things and seek the middle path.",
      obstacle: "Extremism, impatience, or volatile swings between overworking and burning out.",
      advice: "Find emotional equilibrium. Blend patience with quiet optimism; the alchemical mixture is brewing perfectly.",
      future: "Deep healing of old wounds, restorative peace, and harmonious cooperation with those around you.",
      outcome: "Divine synthesis. You will achieve inner serenity, emotional maturity, and blissful equilibrium."
    }
  },
  {
    id: "devil",
    number: "XV",
    name: "The Shadow (Breaking Chains)",
    archetype: "Liberation from Illusion & Shadow Mastery",
    element: "Earth",
    zodiac: "Capricorn",
    keywords: ["Breaking Chains", "Shadow Work", "Empowerment", "Awakening"],
    icon: "chains",
    bgGradient: "from-neutral-200 to-stone-100",
    meanings: {
      past: "You felt trapped by material concerns, addictive patterns, or toxic relationships that dimmed your sovereignty.",
      present: "Look closely at what feels like a prison — the chains around your neck are loose enough to slip off whenever you choose.",
      obstacle: "Self-imposed limitations, fear of poverty, or toxic codependency that convinces you you have no choice.",
      advice: "Face your shadow directly without shame. Reclaim your power, declare your autonomy, and walk away from bondage.",
      future: "A moment of reckoning where you break a generational cycle or unhealthy habit once and for all.",
      outcome: "True sovereignty and empowerment. You will never again surrender your autonomy to external illusions."
    }
  },
  {
    id: "tower",
    number: "XVI",
    name: "The Tower",
    archetype: "Divine Breakthrough & Sudden Awakening",
    element: "Fire",
    zodiac: "Mars",
    keywords: ["Breakthrough", "Revelation", "Clearing Illusions", "Freedom"],
    icon: "lightning",
    bgGradient: "from-red-100 to-rose-50",
    meanings: {
      past: "A sudden shock or disruption shattered false pretenses and forced you onto a more authentic trajectory.",
      present: "Structures built on shaky foundations or illusions are crumbling. Do not panic; lightning clears the sky for truth.",
      obstacle: "Resistance to inevitable reality, or desperate attempts to prop up walls that the universe is dismantling.",
      advice: "Let what is crumbling fall away without guilt. When the dust settles, you will realize you were freed, not ruined.",
      future: "An eye-opening revelation will instantly dissolve months of confusion and reveal the real path ahead.",
      outcome: "Groundbreaking liberation. You will rebuild your life upon bedrock truth and authentic spiritual alignment."
    }
  },
  {
    id: "star",
    number: "XVII",
    name: "The Star",
    archetype: "Celestial Hope & Divine Blessing",
    element: "Air",
    zodiac: "Aquarius",
    keywords: ["Hope", "Inspiration", "Renewal", "Cosmic Grace"],
    icon: "star",
    bgGradient: "from-sky-100 to-indigo-50",
    meanings: {
      past: "A ray of unexpected hope or spiritual inspiration that sustained you through a season of darkness.",
      present: "The storm has passed. Look up: the stars are shining directly upon your path with healing, optimism, and grace.",
      obstacle: "Lingering pessimism or cynicism blinding you to the genuine blessings already arriving in your life.",
      advice: "Open your heart to hope. Share your authentic light freely, for your dreams are directly supported by cosmic grace.",
      future: "A period of inspired creative renewal, wishes granted, and restored faith in yourself and humanity.",
      outcome: "Pure serenity and destiny fulfilled. You will stand in radiant alignment with your highest spiritual purpose."
    }
  },
  {
    id: "moon",
    number: "XVIII",
    name: "The Moon",
    archetype: "Subconscious Depths & Illusions Dissolved",
    element: "Water",
    zodiac: "Pisces",
    keywords: ["Subconscious", "Dreams", "Illusion", "Spiritual Evolution"],
    icon: "crescent",
    bgGradient: "from-indigo-100 to-purple-50",
    meanings: {
      past: "Walking through fog, uncertainty, or emotional ambiguity where nothing was quite as it seemed.",
      present: "Things may feel cloudy or emotionally heightened. Do not make hasty decisions based on projection or fear.",
      obstacle: "Paranoia, overactive anxieties, or self-deception clouding logical discernment.",
      advice: "Pay attention to your nightly dreams and symbols. Trust your heart, but wait for the morning sun before deciding.",
      future: "The mist will lift, exposing what was hidden in the shadows and giving you profound psychic awareness.",
      outcome: "Deep emotional healing. You will emerge from the twilight with profound empathy and spiritual vision."
    }
  },
  {
    id: "sun",
    number: "XIX",
    name: "The Sun",
    archetype: "Radiant Joy & Triumphant Vitality",
    element: "Fire",
    zodiac: "Sun",
    keywords: ["Joy", "Vitality", "Success", "Warmth & Clarity"],
    icon: "sun",
    bgGradient: "from-yellow-100 to-amber-50",
    meanings: {
      past: "A time of celebration, warmth, childlike joy, or a proud personal achievement that filled you with optimism.",
      present: "Golden sunshine shines on your world. Clarity replaces confusion, health improves, and joy radiates from within.",
      obstacle: "Overconfidence or taking blessings for granted without expressing gratitude to the universe.",
      advice: "Radiate your light unapologetically! Be warm, generous, and confident in your truth — success is yours.",
      future: "Exuberant celebrations, public recognition, thriving vitality, and mutual warmth in all connections.",
      outcome: "Supreme fulfillment and radiance. Your life will overflow with vitality, abundance, and authentic celebration."
    }
  },
  {
    id: "judgement",
    number: "XX",
    name: "Judgement",
    archetype: "Higher Calling & Spiritual Awakening",
    element: "Fire",
    zodiac: "Pluto",
    keywords: ["Awakening", "Higher Calling", "Forgiveness", "Reckoning"],
    icon: "trumpet",
    bgGradient: "from-violet-100 to-rose-50",
    meanings: {
      past: "A moment of deep self-forgiveness or answering an inner call that elevated you above past regrets.",
      present: "The celestial trumpet sounds for you. You are being called to step into your higher mission — forgive the past and rise.",
      obstacle: "Harsh self-criticism, guilt over old mistakes, or reluctance to accept that you are worthy of redemption.",
      advice: "Forgive yourself and others completely. Release old judgments and step boldly into your higher purpose.",
      future: "A definitive life upgrade where past karma is cleared and you are recognized for your true worth.",
      outcome: "Resurrection of purpose. You will awaken to your highest spiritual destiny, cleansed and free."
    }
  },
  {
    id: "world",
    number: "XXI",
    name: "The World",
    archetype: "Wholeness, Completion & Cosmic Triumph",
    element: "Earth",
    zodiac: "Saturn",
    keywords: ["Completion", "Wholeness", "Cosmic Harmony", "New Horizon"],
    icon: "wreath",
    bgGradient: "from-teal-100 to-emerald-50",
    meanings: {
      past: "A massive multi-year cycle was successfully completed, giving you wisdom, resilience, and maturity.",
      present: "You stand at the pinnacle of a cycle. Everything is coming together in divine harmony and complete wholeness.",
      obstacle: "Leaving the final step undone or hesitating at the threshold of full completion.",
      advice: "Celebrate how far you have journeyed. Tie up the loose ends and prepare to step into a grander, global horizon.",
      future: "International opportunities, widespread recognition, and harmonious mastery across multiple spheres.",
      outcome: "Total integration and cosmic blessing. The entire universe conspires in your favor as you enter a golden age."
    }
  }
];

// Helper to draw random unique cards from the deck
export function drawRandomCards(count = 6) {
  const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

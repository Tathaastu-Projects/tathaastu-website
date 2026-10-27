// Authentic 22 Major Arcana Tarot Cards Database & 6-Card Spread Definitions

export const SPREAD_POSITIONS = [
  {
    id: 1,
    key: "past",
    title: "Past Influence",
    subtitle: "Past Lessons",
    desc: "Events and habits from your past that shaped where you are today.",
    color: "#9C7A4A",
  },
  {
    id: 2,
    key: "present",
    title: "Present Energy",
    subtitle: "Current Situation",
    desc: "Your thoughts, feelings, and the situation around you right now.",
    color: "#2E7D32",
  },
  {
    id: 3,
    key: "obstacle",
    title: "Hidden Challenge",
    subtitle: "What to Watch Out For",
    desc: "The doubts, fears, or difficulties testing your patience.",
    color: "#C62828",
  },
  {
    id: 4,
    key: "advice",
    title: "Helpful Advice",
    subtitle: "Best Step Forward",
    desc: "The best advice on what to focus on and what to let go.",
    color: "#D4A853",
  },
  {
    id: "5",
    key: "future",
    title: "Near Future",
    subtitle: "What's Coming Soon",
    desc: "Opportunities and positive changes coming into your life soon.",
    color: "#1565C0",
  },
  {
    id: 6,
    key: "outcome",
    title: "Final Outcome",
    subtitle: "Expected Result",
    desc: "The positive result, peace, and success waiting for you ahead.",
    color: "#6A1B9A",
  },
];

export const QUICK_QUESTIONS = [
  { label: "Love & Relationships", question: "Where is my love life heading?" },
  { label: "Career & Growth", question: "What new career opportunities are coming for me?" },
  { label: "Wealth & Money", question: "How can I improve my financial stability and attract wealth?" },
  { label: "Peace & Healing", question: "What worry or emotional hurt should I let go of?" },
  { label: "Important Decision", question: "What should I keep in mind before making my next big choice?" },
  { label: "Today's Guidance", question: "What is an important message for me today?" },
];

export const TAROT_DECK = [
  {
    id: "fool",
    number: "0",
    name: "The Fool",
    archetype: "New Beginnings & Fresh Start",
    element: "Air",
    zodiac: "Uranus",
    keywords: ["Fresh Start", "New Journey", "Faith", "Freedom"],
    icon: "feather",
    bgGradient: "from-amber-100 to-yellow-50",
    meanings: {
      past: "You took a bold step in the past that helped you start fresh and brought you to where you are today.",
      present: "A brand new chapter is starting. Stop overthinking and move forward with curiosity and an open heart.",
      obstacle: "Rushing ahead without thinking, or being too afraid of taking that first step.",
      advice: "Take the chance you have been thinking about. Trust yourself and enjoy this new beginning.",
      future: "An exciting new adventure or unexpected opportunity will soon come your way.",
      outcome: "A sense of relief and joy. You will feel free, happy, and excited about your path."
    }
  },
  {
    id: "magician",
    number: "I",
    name: "The Magician",
    archetype: "Taking Action & Inner Power",
    element: "Air",
    zodiac: "Mercury",
    keywords: ["Inner Power", "Skills", "Confidence", "Action"],
    icon: "infinity",
    bgGradient: "from-rose-100 to-amber-50",
    meanings: {
      past: "You learned an important skill or discovered your talents, which now give you the power to shape your life.",
      present: "You already have all the skills, ideas, and tools you need. Turn your thoughts into real action.",
      obstacle: "Doubting your own abilities or wasting your energy in too many directions at once.",
      advice: "Focus on one clear goal. Take practical, daily steps and believe in what you can achieve.",
      future: "Your ideas will turn into real success as your hard work starts showing clear results.",
      outcome: "Total success. What started as just a dream or idea will become a real part of your life."
    }
  },
  {
    id: "priestess",
    number: "II",
    name: "The High Priestess",
    archetype: "Inner Wisdom & Gut Feelings",
    element: "Water",
    zodiac: "Moon",
    keywords: ["Intuition", "Inner Voice", "Calm", "Patience"],
    icon: "moon",
    bgGradient: "from-indigo-100 to-sky-50",
    meanings: {
      past: "A quiet period in your past helped you listen to your inner voice and understand yourself better.",
      present: "Don't look for all the answers outside. Sit quietly, listen to your gut feelings, and trust your instincts.",
      obstacle: "Ignoring your own feelings to please others, or letting confusion get the better of you.",
      advice: "Slow down and listen to your inner voice. Don't rush into decisions until you feel truly peaceful.",
      future: "Things that feel confusing now will soon become clear, showing you the right path forward.",
      outcome: "Clear peace of mind. You will learn to trust yourself deeply and make wise choices."
    }
  },
  {
    id: "empress",
    number: "III",
    name: "The Empress",
    archetype: "Love, Care & Abundance",
    element: "Earth",
    zodiac: "Venus",
    keywords: ["Abundance", "Caring", "Growth", "Warmth"],
    icon: "flower",
    bgGradient: "from-emerald-100 to-lime-50",
    meanings: {
      past: "Efforts you put in earlier to care for people, work, or ideas are now ready to bear good fruit.",
      present: "You are in a warm and creative phase. Take care of yourself, your loved ones, and your projects with love.",
      obstacle: "Giving too much to others while forgetting to take care of your own health and rest.",
      advice: "Be kind to yourself and let good things come to you naturally without stressing or forcing.",
      future: "A wonderful time of growth and happiness in your relationships, family life, or finances.",
      outcome: "Comfort, happiness, and peace. You will enjoy a loving environment and steady growth."
    }
  },
  {
    id: "emperor",
    number: "IV",
    name: "The Emperor",
    archetype: "Discipline, Order & Strength",
    element: "Fire",
    zodiac: "Aries",
    keywords: ["Stability", "Discipline", "Leadership", "Clear Rules"],
    icon: "shield",
    bgGradient: "from-red-100 to-orange-50",
    meanings: {
      past: "Hard work, self-discipline, and good guidance built a strong foundation for your life.",
      present: "Take charge of your situation. Set clear rules, organize your routine, and lead with calm confidence.",
      obstacle: "Being too stubborn, trying to control everything, or clashing with strict people.",
      advice: "Use logic and careful planning. Set healthy boundaries and protect your time and peace of mind.",
      future: "You will earn respect from others and gain long-term stability in your work or home life.",
      outcome: "Solid security and peace. You will build a stable, well-organized life that can handle any challenge."
    }
  },
  {
    id: "hierophant",
    number: "V",
    name: "The Hierophant",
    archetype: "Guiding Wisdom & Values",
    element: "Earth",
    zodiac: "Taurus",
    keywords: ["Tradition", "Good Advice", "Core Values", "Mentors"],
    icon: "temple",
    bgGradient: "from-amber-100 to-stone-50",
    meanings: {
      past: "Good values and lessons from your family, elders, or teachers gave you a strong foundation and moral guidance.",
      present: "Seek advice from a trusted elder, mentor, or expert. Sticking to honest values will guide you best.",
      obstacle: "Following old rules that no longer make sense, or feeling pressured to please society.",
      advice: "Rely on proven principles and honest ways. Spend time with people who encourage your personal growth.",
      future: "A wise teacher, mentor, or helpful guide will come into your life to offer valuable advice.",
      outcome: "Clear direction and peace. You will gain deep life wisdom and feel supported by people around you."
    }
  },
  {
    id: "lovers",
    number: "VI",
    name: "The Lovers",
    archetype: "Love, Harmony & Important Choices",
    element: "Air",
    zodiac: "Gemini",
    keywords: ["True Connection", "Harmony", "Values", "Big Choice"],
    icon: "heart",
    bgGradient: "from-pink-100 to-rose-50",
    meanings: {
      past: "A meaningful relationship or an important personal choice played a big role in shaping who you are.",
      present: "Your heart is asking you to choose what truly matters. Whether in love or life, let honest feelings guide you.",
      obstacle: "Feeling torn between what you truly want and what is easy, or being afraid of opening up.",
      advice: "Choose what aligns with your true values. Do not settle for things that make your heart unhappy.",
      future: "A close bond will grow deeper, bringing mutual care, trust, and sweet understanding.",
      outcome: "Real happiness and peace in love. You will find true harmony and feel valued for who you are."
    }
  },
  {
    id: "chariot",
    number: "VII",
    name: "The Chariot",
    archetype: "Focus, Willpower & Victory",
    element: "Water",
    zodiac: "Cancer",
    keywords: ["Determination", "Focus", "Success", "Moving Forward"],
    icon: "chariot",
    bgGradient: "from-teal-100 to-cyan-50",
    meanings: {
      past: "You overcame past struggles through pure determination and refusing to give up.",
      present: "Stay focused on your target. Keep your emotions balanced and direct all your energy into moving forward.",
      obstacle: "Feeling pulled in two directions, losing patience, or letting anger get in the way.",
      advice: "Stay disciplined and keep your eyes on the prize. Do not let small distractions slow you down.",
      future: "Things that felt stuck will suddenly start moving forward very quickly toward success.",
      outcome: "A clear win. Your dedication and hard work will help you overcome all hurdles and reach your goal."
    }
  },
  {
    id: "strength",
    number: "VIII",
    name: "Strength",
    archetype: "Patience, Kindness & Inner Courage",
    element: "Fire",
    zodiac: "Leo",
    keywords: ["Kindness", "Patience", "Quiet Courage", "Inner Peace"],
    icon: "sunburst",
    bgGradient: "from-orange-100 to-amber-50",
    meanings: {
      past: "You handled difficult times with quiet patience and resilience, rather than anger or fighting.",
      present: "Real strength comes from kindness and calm. Handle your worries and fears with patience, not force.",
      obstacle: "Self-doubt, losing your temper, or letting fear take over your choices.",
      advice: "Stay gentle and understanding. You are much stronger than you realize, and kindness will win every time.",
      future: "A situation where keeping your calm will earn you deep respect and bring a peaceful outcome.",
      outcome: "True self-confidence. You will feel peaceful inside and confident in your ability to handle anything."
    }
  },
  {
    id: "hermit",
    number: "IX",
    name: "The Hermit",
    archetype: "Quiet Time & Self-Reflection",
    element: "Earth",
    zodiac: "Virgo",
    keywords: ["Quiet Reflection", "Wisdom", "Finding Answers", "Simplicity"],
    icon: "lantern",
    bgGradient: "from-slate-100 to-blue-50",
    meanings: {
      past: "Spending time alone or thinking deeply in the past helped you understand what truly matters to you.",
      present: "Take a step back from busy crowds and social chatter. The best answers come when you give yourself quiet time.",
      obstacle: "Shutting yourself off from everyone in sadness, or being too scared to sit quietly with your thoughts.",
      advice: "Take quiet walks, rest your mind, and reflect. Take things one simple step at a time.",
      future: "A moment of clear insight will hit you, giving you simple and clear answers about your next steps.",
      outcome: "Calm wisdom and self-reliance. You will understand yourself clearly and feel content from within."
    }
  },
  {
    id: "wheel",
    number: "X",
    name: "Wheel of Fortune",
    archetype: "Good Luck & Turning Points",
    element: "Fire",
    zodiac: "Jupiter",
    keywords: ["Good Luck", "Positive Shift", "Change", "New Opportunity"],
    icon: "wheel",
    bgGradient: "from-purple-100 to-indigo-50",
    meanings: {
      past: "An unexpected event or lucky coincidence changed your life's path for the better.",
      present: "Life is turning in your favor! Old difficulties are clearing away, making space for fresh luck.",
      obstacle: "Trying to resist natural changes, or holding onto things that are ready to end.",
      advice: "Go with the flow. Welcome positive changes with an open mind and grab good opportunities when they appear.",
      future: "A sudden, welcome change will improve your situation faster than you expected.",
      outcome: "Positive turnaround. Balance will return to your life with well-deserved blessings and progress."
    }
  },
  {
    id: "justice",
    number: "XI",
    name: "Justice",
    archetype: "Fairness, Truth & Balance",
    element: "Air",
    zodiac: "Libra",
    keywords: ["Fairness", "Honesty", "Truth", "Right Choices"],
    icon: "scales",
    bgGradient: "from-sky-100 to-indigo-50",
    meanings: {
      past: "An honest choice, fair decision, or clearing up of misunderstandings brought you peace in the past.",
      present: "Honesty is your greatest strength right now. Weigh the facts calmly, tell the truth, and do what is right.",
      obstacle: "Unfair treatment from others, or trying to avoid taking responsibility for a mistake.",
      advice: "Stand by what is honest and fair. Be transparent, and trust that doing the right thing brings the best outcome.",
      future: "Disagreements or pending issues will settle in a fair, balanced, and satisfactory way.",
      outcome: "Fairness and relief. Truth will win, balance will be restored, and you will move forward with a clear conscience."
    }
  },
  {
    id: "hanged",
    number: "XII",
    name: "The Hanged Man",
    archetype: "Patience & A Fresh Look",
    element: "Water",
    zodiac: "Neptune",
    keywords: ["Patience", "New Angle", "Letting Go", "Pause"],
    icon: "tree",
    bgGradient: "from-blue-100 to-teal-50",
    meanings: {
      past: "A time when you had to wait or let go of something taught you to see life from a different angle.",
      present: "Don't fight against delays right now. This pause gives you time to rest, think, and see things clearly.",
      obstacle: "Getting frustrated over waiting, or feeling helpless when things don't happen right away.",
      advice: "Let go of trying to control every detail. Ask yourself: what good lesson or opportunity is this delay offering?",
      future: "A fresh perspective will make a tricky problem suddenly seem easy to solve.",
      outcome: "Peace and relief. Letting go of unnecessary control will bring you real calm and clarity."
    }
  },
  {
    id: "death",
    number: "XIII",
    name: "Death & Rebirth",
    archetype: "Ending the Old & Fresh Beginnings",
    element: "Water",
    zodiac: "Scorpio",
    keywords: ["New Chapter", "Letting Go", "Fresh Start", "Growth"],
    icon: "phoenix",
    bgGradient: "from-violet-100 to-purple-50",
    meanings: {
      past: "An old chapter ended in your life, clearing away what was no longer working to make room for something new.",
      present: "You are outgrowing an old phase. Let go of past habits or situations easily so new blessings can enter.",
      obstacle: "Holding on tightly to old memories, bad habits, or situations that have already ended.",
      advice: "Welcome this fresh start without fear. Trust that every ending clears the way for a brighter beginning.",
      future: "Fresh energy and exciting new routines will bring excitement back into your daily life.",
      outcome: "A complete refresh. You will feel renewed, wiser, and ready to enjoy your new chapter."
    }
  },
  {
    id: "temperance",
    number: "XIV",
    name: "Temperance",
    archetype: "Balance, Peace & Healing",
    element: "Fire",
    zodiac: "Sagittarius",
    keywords: ["Balance", "Patience", "Calm", "Healing"],
    icon: "chalice",
    bgGradient: "from-emerald-100 to-cyan-50",
    meanings: {
      past: "You solved past conflicts by staying calm, patient, and fair with everyone involved.",
      present: "Find the middle ground. Balance work with rest, and keep your thoughts peaceful and steady.",
      obstacle: "Going to extremes, acting in a hurry, or tiring yourself out by taking on too much.",
      advice: "Take things step by step with patience. Good things take time to brew, and you are on the right track.",
      future: "Old emotional hurts will heal, and you will enjoy calm, friendly cooperation with people around you.",
      outcome: "Deep peace and balance. You will enjoy a calm mind, healthy emotions, and harmonious living."
    }
  },
  {
    id: "devil",
    number: "XV",
    name: "The Shadow (Breaking Chains)",
    archetype: "Letting Go of Fears & Gaining Freedom",
    element: "Earth",
    zodiac: "Capricorn",
    keywords: ["Breaking Free", "No Fear", "Confidence", "Letting Go"],
    icon: "chains",
    bgGradient: "from-neutral-200 to-stone-100",
    meanings: {
      past: "In the past, you may have felt trapped by worries, unhealthy habits, or toxic situations.",
      present: "Look closely at what worries you — you have more freedom and control than you think. You can step away anytime.",
      obstacle: "Letting fear of failure, money worries, or self-doubt make you feel like you have no options.",
      advice: "Face your worries bravely. Believe in your self-worth, make positive changes, and leave bad habits behind.",
      future: "A breakthrough moment where you finally break free from an old fear or unhealthy habit for good.",
      outcome: "Freedom and real confidence. You will take back control of your life and never feel held back again."
    }
  },
  {
    id: "tower",
    number: "XVI",
    name: "The Tower",
    archetype: "Sudden Truth & Breakthrough",
    element: "Fire",
    zodiac: "Mars",
    keywords: ["Breakthrough", "Clear Truth", "Starting Fresh", "Freedom"],
    icon: "lightning",
    bgGradient: "from-red-100 to-rose-50",
    meanings: {
      past: "A sudden unexpected change in your past broke down false hopes and pushed you onto a better path.",
      present: "Things that were not built on honest or strong foundations may be shaking. Don't worry; this clears the path for the real truth.",
      obstacle: "Fighting against obvious facts, or trying to hold onto things that are already falling apart.",
      advice: "Let what is broken fall away peacefully. When things settle, you will see that you were protected and freed.",
      future: "A sudden eye-opening moment will clear away confusion and show you the exact right path forward.",
      outcome: "A strong, clean start. You will rebuild your life on genuine truth, real trust, and lasting stability."
    }
  },
  {
    id: "star",
    number: "XVII",
    name: "The Star",
    archetype: "Hope, Healing & Bright Future",
    element: "Air",
    zodiac: "Aquarius",
    keywords: ["Hope", "Peace", "Inspiration", "Bright Days"],
    icon: "star",
    bgGradient: "from-sky-100 to-indigo-50",
    meanings: {
      past: "A ray of unexpected hope or kindness helped carry you through a challenging time.",
      present: "The difficult time is behind you. Look ahead with optimism — healing, good energy, and blessings are with you.",
      obstacle: "Holding onto negative thinking or doubting that good things can happen to you.",
      advice: "Open your heart to hope and keep your spirits high. Good things are supporting you every step of the way.",
      future: "A happy period where wishes start coming true and your confidence in yourself returns fully.",
      outcome: "Peace and happiness. You will feel deeply content, hopeful, and excited about the future."
    }
  },
  {
    id: "moon",
    number: "XVIII",
    name: "The Moon",
    archetype: "Clearing Confusion & Trusting Instincts",
    element: "Water",
    zodiac: "Pisces",
    keywords: ["Patience", "Clear Mind", "Feelings", "Clarity Soon"],
    icon: "crescent",
    bgGradient: "from-indigo-100 to-purple-50",
    meanings: {
      past: "You went through a confusing time where you were not sure whom to trust or what was true.",
      present: "Things might feel a bit unclear or emotional right now. Avoid rushing into big decisions until you see everything clearly.",
      obstacle: "Letting your imagination run wild with worry, or making up worst-case stories in your head.",
      advice: "Trust your gut feeling, but give things a little time to settle. Never make big choices when feeling anxious.",
      future: "The fog will lift soon, showing you the real picture and giving you total peace of mind.",
      outcome: "Emotional relief and clarity. You will see things as they really are and feel much lighter and happier."
    }
  },
  {
    id: "sun",
    number: "XIX",
    name: "The Sun",
    archetype: "Joy, Success & Good Health",
    element: "Fire",
    zodiac: "Sun",
    keywords: ["Joy", "Success", "Good Health", "Happiness"],
    icon: "sun",
    bgGradient: "from-yellow-100 to-amber-50",
    meanings: {
      past: "A time of celebration, warmth, or a proud personal achievement that gave you lasting happiness.",
      present: "Bright days are here for you! Confusion is clearing, your energy is high, and good news is on the way.",
      obstacle: "Being overly proud, or forgetting to be thankful for the good things in your life.",
      advice: "Share your smile and warmth with everyone. Be confident, stay positive, and celebrate your progress.",
      future: "Fun times, celebrations, praise from others, and warm, loving moments with family and friends.",
      outcome: "Complete joy and fulfillment. Your life will be filled with positive energy, success, and smiling days."
    }
  },
  {
    id: "judgement",
    number: "XX",
    name: "Judgement",
    archetype: "Waking Up to Your True Calling",
    element: "Fire",
    zodiac: "Pluto",
    keywords: ["New Awakening", "Forgiveness", "Fresh Start", "Clarity"],
    icon: "trumpet",
    bgGradient: "from-violet-100 to-rose-50",
    meanings: {
      past: "A moment where you forgave yourself or answered an inner urge to make your life better.",
      present: "It is time to step up into the best version of yourself. Forgive past mistakes, let go of regrets, and move forward.",
      obstacle: "Being too hard on yourself, feeling guilty about the past, or believing you don't deserve good things.",
      advice: "Forgive yourself and others completely. Leave past regrets behind and step into your bright future.",
      future: "A big, positive life upgrade where your true efforts are recognized and appreciated.",
      outcome: "A fresh beginning filled with clear purpose. You will feel light, free, and proud of who you are becoming."
    }
  },
  {
    id: "world",
    number: "XXI",
    name: "The World",
    archetype: "Success, Wholeness & Completion",
    element: "Earth",
    zodiac: "Saturn",
    keywords: ["Success", "Goals Achieved", "Peace", "New Milestones"],
    icon: "wreath",
    bgGradient: "from-teal-100 to-emerald-50",
    meanings: {
      past: "You completed an important life phase or long effort, gaining experience and maturity.",
      present: "You are reaching the finish line of a major goal. Everything is coming together nicely.",
      obstacle: "Stopping just before the finish line, or hesitating to complete the final step.",
      advice: "Celebrate how far you have come! Finish the remaining tasks and get ready for exciting new goals.",
      future: "New doors will open, bringing great opportunities, travel, or recognition for your work.",
      outcome: "Total satisfaction and success. You will feel proud of what you built and ready for a wonderful new journey."
    }
  }
];

// Helper to draw random unique cards from the deck
export function drawRandomCards(count = 6) {
  const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

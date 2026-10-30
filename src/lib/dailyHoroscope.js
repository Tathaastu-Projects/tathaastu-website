const SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const SIGN_LABEL = {
  aries: "Aries",
  taurus: "Taurus",
  gemini: "Gemini",
  cancer: "Cancer",
  leo: "Leo",
  virgo: "Virgo",
  libra: "Libra",
  scorpio: "Scorpio",
  sagittarius: "Sagittarius",
  capricorn: "Capricorn",
  aquarius: "Aquarius",
  pisces: "Pisces",
};

const PERIOD_TO_API = {
  Today: "daily",
  Tomorrow: "tomorrow",
  Week: "weekly",
  Month: "monthly",
};

function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function scoreFromSeed(seed, salt, min = 48, max = 96) {
  const n = hashSeed(`${seed}:${salt}`);
  return min + (n % (max - min + 1));
}

/** Deterministic pillars that change with date + sign + period. */
export function scoresForSign(sign, dateKey, period = "Today") {
  const seed = `${dateKey}|${period}|${sign}`.toLowerCase();
  return {
    love: scoreFromSeed(seed, "love"),
    career: scoreFromSeed(seed, "career"),
    marriage: scoreFromSeed(seed, "health"),
    finance: scoreFromSeed(seed, "money"),
  };
}

export function luckyExtrasForSign(sign, dateKey, period = "Today") {
  const seed = `${dateKey}|${period}|${sign}|extras`.toLowerCase();
  const moods = [
    ["Driven", "🔥"],
    ["Grounded", "🌿"],
    ["Curious", "✨"],
    ["Intuitive", "🌙"],
    ["Radiant", "☀️"],
    ["Focused", "🎯"],
    ["Harmonious", "⚖️"],
    ["Optimistic", "🌟"],
  ];
  const colors = [
    ["Crimson", "#C62828"],
    ["Forest Green", "#2E7D32"],
    ["Solar Gold", "#C9A227"],
    ["Amber", "#D4A853"],
    ["Emerald", "#1B8A5A"],
    ["Rose", "#E8A0B0"],
    ["Ocean Blue", "#0288D1"],
    ["Charcoal", "#455A64"],
  ];
  const mood = moods[hashSeed(seed + ":mood") % moods.length];
  const color = colors[hashSeed(seed + ":color") % colors.length];
  const luckyNum = String(1 + (hashSeed(seed + ":num") % 9));
  return {
    mood: mood[0],
    moodEmoji: mood[1],
    luckyColor: color[0],
    colorHex: color[1],
    luckyNum,
  };
}

function todayKey(offsetDays = 0) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function cleanBlurb(text, max = 240) {
  const raw = String(text || "")
    .replace(/\u2728/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!raw) return "";
  if (raw.length <= max) return raw;
  const cut = raw.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

async function fetchJson(url, signal) {
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchSignBlurb(sign, period, signal) {
  const apiPeriod = PERIOD_TO_API[period] || "daily";

  if (apiPeriod === "daily") {
    try {
      const data = await fetchJson(
        `https://spiritclick.com/api/horoscopes/${sign}`,
        signal
      );
      const blurb = cleanBlurb(data?.summary);
      if (blurb) {
        return { blurb, date: data?.date || todayKey(0), source: "spiritclick" };
      }
    } catch {
      /* fall through */
    }
  }

  if (apiPeriod === "tomorrow") {
    try {
      const data = await fetchJson(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TOMORROW`,
        signal
      );
      const blurb = cleanBlurb(data?.data?.horoscope);
      if (blurb) {
        return {
          blurb,
          date: data?.data?.date || todayKey(1),
          source: "horoscope-app-api",
        };
      }
    } catch {
      /* fall through */
    }
  }

  if (apiPeriod === "weekly" || apiPeriod === "monthly") {
    try {
      const path = apiPeriod === "weekly" ? "weekly" : "monthly";
      const data = await fetchJson(
        `https://api.cosmyday.com/content/${path}/${sign}`,
        signal
      );
      const blurb = cleanBlurb(data?.content || data?.closing);
      if (blurb) {
        return {
          blurb,
          date: data?.date || todayKey(0),
          source: "cosmyday",
        };
      }
    } catch {
      /* fall through */
    }

    try {
      const data = await fetchJson(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${apiPeriod}?sign=${sign}`,
        signal
      );
      const blurb = cleanBlurb(data?.data?.horoscope);
      if (blurb) {
        return {
          blurb,
          date: data?.data?.date || todayKey(0),
          source: "horoscope-app-api",
        };
      }
    } catch {
      /* fall through */
    }
  }

  // Default / daily fallback chain
  const data = await fetchJson(
    `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`,
    signal
  );
  const blurb = cleanBlurb(data?.data?.horoscope);
  if (!blurb) throw new Error("Empty horoscope");
  return {
    blurb,
    date: data?.data?.date || todayKey(0),
    source: "horoscope-app-api",
  };
}

/**
 * Fetch all 12 signs for a period. Returns [{ name, blurb, scores, extras, date, source }].
 */
export async function fetchDailyHoroscopes(period = "Today", signal) {
  const dateKey =
    period === "Tomorrow"
      ? todayKey(1)
      : period === "Week"
        ? `week-${todayKey(0)}`
        : period === "Month"
          ? todayKey(0).slice(0, 7)
          : todayKey(0);

  const results = await Promise.all(
    SIGNS.map(async (sign) => {
      const label = SIGN_LABEL[sign];
      try {
        const hit = await fetchSignBlurb(sign, period, signal);
        return {
          name: label,
          blurb: hit.blurb,
          scores: scoresForSign(label, dateKey, period),
          extras: luckyExtrasForSign(label, dateKey, period),
          date: hit.date,
          source: hit.source,
        };
      } catch {
        return {
          name: label,
          blurb: null,
          scores: scoresForSign(label, dateKey, period),
          extras: luckyExtrasForSign(label, dateKey, period),
          date: dateKey,
          source: "scores-only",
        };
      }
    })
  );

  const withText = results.filter((r) => r.blurb);
  if (withText.length < 6) {
    throw new Error("Free horoscope APIs returned too few signs");
  }

  return {
    date: withText[0]?.date || dateKey,
    period,
    data: results,
  };
}

export { SIGNS, SIGN_LABEL, PERIOD_TO_API };

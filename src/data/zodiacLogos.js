import AriesLogo from "../assets/logo/aries_logo.svg";
import TaurusLogo from "../assets/logo/taurus_logo.svg";
import GeminiLogo from "../assets/logo/gemini_logo.svg";
import CancerLogo from "../assets/logo/cancer_logo.svg";
import LeoLogo from "../assets/logo/leo_logo.svg";
import VirgoLogo from "../assets/logo/virgo_logo.svg";
import LibraLogo from "../assets/logo/libra_logo.svg";
import ScorpioLogo from "../assets/logo/scorpio_logo.svg";
import SagittariusLogo from "../assets/logo/sagittarius_logo.svg";
import CapricornLogo from "../assets/logo/capricorn_logo.svg";
import AquariusLogo from "../assets/logo/aquarius_logo.svg";
import PiscesLogo from "../assets/logo/pisces_logo.svg";

/** Logos live in a dedicated module so the home hero chunk stays lighter. */
export const ZODIAC_LOGOS = {
  Aries: AriesLogo,
  Taurus: TaurusLogo,
  Gemini: GeminiLogo,
  Cancer: CancerLogo,
  Leo: LeoLogo,
  Virgo: VirgoLogo,
  Libra: LibraLogo,
  Scorpio: ScorpioLogo,
  Sagittarius: SagittariusLogo,
  Capricorn: CapricornLogo,
  Aquarius: AquariusLogo,
  Pisces: PiscesLogo,
};

export function zodiacLogo(name) {
  if (!name) return null;
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const raw = ZODIAC_LOGOS[capitalized] || ZODIAC_LOGOS[name];
  if (!raw) return null;
  return typeof raw === "object" && raw?.src ? raw.src : raw;
}

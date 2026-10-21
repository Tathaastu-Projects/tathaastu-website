import "./solar-system.css";
import "./home7-overrides.css";

export default function Home7SolarScreen() {
  return (
    <main className="home7 bg-white text-slate-900">
      <header className="shadow-sm">
        <div className="bg-orange-500">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-sm text-white">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-orange-500">
                H
              </span>
              <span className="font-semibold">Horoscope</span>
            </div>
            <span className="opacity-80">Astrology &amp; Numerology HTML Template</span>
          </div>
        </div>
        <div className="bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-orange-500">HoroScope</span>
            </div>
            <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.25em] md:flex">
              <a href="#hero">Home</a>
              <a href="#about">About Us</a>
              <a href="#pages">Pages</a>
              <a href="#shop">Shop</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </nav>
            <button
              aria-label="Cart"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white"
            >
              <span className="h-4 w-4 rounded-sm border-2 border-white border-b-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      <section id="hero" className="hs_slider_main_wrapper">
        <div className="hs_slider_img_overlay" />
        <div className="hs_slider_heading_wrapper">
          <div className="hs_slider_logo_cont_wraper">
            <h2>
              THE BEST <span>HOR</span>OSCOPE
            </h2>
          </div>
        </div>

        <div className="hs_slider_cont_wrapper" aria-hidden="true">
          <div className="hs_sun">
            <div className="star" />
            <div className="hs_waves2">
              <div className="hs_wave" />
              <div className="hs_wave" />
              <div className="hs_wave" />
              <div className="hs_wave" />
            </div>
          </div>

          <div className="mercury">
            <div className="planet">
              <div className="shadow" />
            </div>
          </div>
          <div className="venus">
            <div className="planet">
              <div className="shadow" />
            </div>
          </div>
          <div className="earth">
            <div className="planet">
              <div className="shadow" />
            </div>
          </div>
          <div className="mars">
            <div className="planet">
              <div className="shadow" />
            </div>
          </div>
          <div className="jupiter">
            <div className="planet">
              <div className="shadow" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


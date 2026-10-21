import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8FFF6] px-6 text-center text-[#073349]">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44459]">404</p>
      <h1 className="mt-3 font-playfair text-4xl text-[#064233]">This page is not on the chart</h1>
      <p className="mt-4 max-w-md text-[#073349]/80">
        The address does not match a service, expert, article, or product.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#E74660] px-6 py-3 font-semibold text-white"
      >
        Back home
      </Link>
    </main>
  );
}

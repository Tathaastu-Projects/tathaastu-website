"use client";

import React from 'react';
import Footer from '../layout/Footer';
import SiteNavbar from '../layout/SiteNavbar';
import Seperator from '../components/Home/SeperatorComponent';
import { Link } from "@/lib/router";
import blogsData from "../data/blogsData";

export default function Blog() {
  const blogPosts = blogsData;

  return (
    <div className="bg-white text-[#073349]">
      <SiteNavbar />

      {/* HERO SECTION WITH BANNER IMAGE */}
      <section className="bg-[#F8FFF6] px-4 py-14 text-center text-[#073349]">
        <h1 className="text-4xl font-bold">Journal</h1>
        <p className="mx-auto mt-3 max-w-xl text-[#325d72]">Notes on Kundli, Vastu, numerology, and daily practice.</p>
      </section>
      <Seperator />

      {/* LATEST BLOGS */}
      <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-[#D44459]">BLOGS</h2>
              <div className="w-20 h-1 bg-[#D44459] rounded-full" />
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Explore our latest blogs on Vastu, Vedic Astrology, and Numerology — practical guidance and insights you can apply.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#f2d8c2] hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500 text-xs">{post.date}</span>
                    <span className="bg-[#D44459] text-white px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#073349] leading-snug line-clamp-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {post.excerpt}
                  </p>
                  <p className="text-[#073349] text-xs font-semibold">
                    {post.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

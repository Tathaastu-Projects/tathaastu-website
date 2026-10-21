"use client";

import React, { useMemo } from "react";
import { useNavigate, useParams } from "@/lib/router";
import { motion } from "framer-motion";
import Footer from "../layout/Footer";
import SiteNavbar from "../layout/SiteNavbar";
import blogsData from "../data/blogsData";
import { fadeInVariant, fadeUpVariant, staggerContainer } from "../utils/motionVariants";

function splitParagraphs(text) {
  return String(text || "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

function renderTextWithBullets(text) {
  const parts = String(text || "").split("\n");
  const paragraphs = [];
  let bullets = [];

  const flushBullets = (keyBase) => {
    if (bullets.length === 0) return null;
    const node = (
      <ul key={`${keyBase}-ul`} className="list-disc pl-6 space-y-2 text-gray-700">
        {bullets.map((b, i) => (
          <li key={`${keyBase}-li-${i}`}>{b}</li>
        ))}
      </ul>
    );
    bullets = [];
    return node;
  };

  const nodes = [];
  parts.forEach((line, idx) => {
    const trimmed = line.trim();
    const bulletMatch = trimmed.match(/^-\s+(.*)$/);
    if (bulletMatch) {
      bullets.push(bulletMatch[1].trim());
      return;
    }

    const flushed = flushBullets(`b-${idx}`);
    if (flushed) nodes.push(flushed);

    if (trimmed) {
      paragraphs.push(trimmed);
    } else if (paragraphs.length) {
      nodes.push(
        <p key={`p-${idx}`} className="text-gray-700 leading-relaxed">
          {paragraphs.join(" ")}
        </p>
      );
      paragraphs.length = 0;
    }
  });

  const flushedEnd = flushBullets("end");
  if (flushedEnd) nodes.push(flushedEnd);
  if (paragraphs.length) {
    nodes.push(
      <p key="p-end" className="text-gray-700 leading-relaxed">
        {paragraphs.join(" ")}
      </p>
    );
  }
  return nodes;
}

function ContentBlock({ block }) {
  if (!block) return null;

  if (block.type === "h2") {
    return (
      <h2 className="text-2xl md:text-3xl font-semibold text-[#073349] mt-10 mb-4">
        {block.text}
      </h2>
    );
  }

  if (block.type === "h3") {
    return (
      <h3 className="text-xl md:text-2xl font-semibold text-[#073349] mt-8 mb-3">
        {block.text}
      </h3>
    );
  }

  if (block.type === "p") {
    const paragraphs = splitParagraphs(block.text);
    return (
      <div className="space-y-4">
        {paragraphs.flatMap((p, idx) => (
          <React.Fragment key={idx}>{renderTextWithBullets(p)}</React.Fragment>
        ))}
      </div>
    );
  }

  if (block.type === "ol") {
    return (
      <ol className="list-decimal pl-6 space-y-6 text-gray-700">
        {(block.items || []).map((item, idx) => (
          <li key={idx}>
            <div className="space-y-3">
              {item.title && <p className="font-semibold text-[#073349]">{item.title}</p>}
              {(splitParagraphs(item.body) || []).map((p, i) => (
                <div key={i}>{renderTextWithBullets(p)}</div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === "table") {
    return (
      <div className="overflow-x-auto rounded-2xl border border-[#f2d8c2]">
        <table className="min-w-full bg-white">
          <thead className="bg-[#FFF6EF]">
            <tr>
              {(block.headers || []).map((h, idx) => (
                <th
                  key={idx}
                  className="text-left px-4 py-3 text-sm font-semibold text-[#073349] border-b border-[#f2d8c2]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(block.rows || []).map((row, rIdx) => (
              <tr key={rIdx} className="odd:bg-white even:bg-[#FFFBF7]">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-sm text-gray-700 border-b border-[#f2d8c2]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.type === "qa") {
    return (
      <div className="space-y-4">
        {(block.items || []).map((item, idx) => (
          <div key={idx} className="bg-[#FFF6EF] rounded-2xl p-5 border border-[#f2d8c2]">
            <p className="font-semibold text-[#073349] mb-2">{item.q}</p>
            <p className="text-gray-700 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blog = useMemo(() => blogsData.find((item) => item.slug === slug || String(item.id) === slug), [slug]);

  if (!blog) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <SiteNavbar
          endSlot={
            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="rounded-lg border border-[#073349] px-3 py-2 text-xs font-medium text-[#073349] transition-colors hover:bg-[#073349]/10 hover:text-[#D44459] hover:border-[#D44459] sm:px-4 sm:text-sm"
            >
              Back to Blog
            </button>
          }
        />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" className="max-w-lg space-y-4">
            <h1 className="text-3xl font-bold text-[#073349]">Blog not found</h1>
            <p className="text-gray-600">
              The blog you are looking for is not available right now. Please explore our latest posts.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/blog")}
                className="px-5 py-2 rounded-full bg-[#D44459] text-white font-semibold hover:bg-[#b83a4a] transition"
              >
                Explore Blog
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2 rounded-full border border-[#D44459] text-[#D44459] font-semibold hover:bg-[#fbe6ea] transition"
              >
                Back Home
              </button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-[#073349] min-h-screen">
      <div className="bg-[#D44459] text-white text-center py-2 px-4">
        <p className="text-sm font-medium">AI-POWERED PLATFORM REVOLUTIONIZING ASTROLOGY</p>
      </div>

      <SiteNavbar
        endSlot={
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="rounded-lg border border-[#073349] px-3 py-2 text-xs font-medium text-[#073349] transition-colors hover:bg-[#073349]/10 hover:text-[#D44459] hover:border-[#D44459] sm:px-4 sm:text-sm"
          >
            Back to Blog
          </button>
        }
      />

      <section className="relative w-full">
        <div className="relative h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden">
          <img src={blog.image} alt={`${blog.title} banner`} className="w-full h-full object-cover" />
        </div>
      </section>

      <main className="px-4 md:px-8 lg:px-16 py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.section variants={fadeInVariant} className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">{blog.excerpt}</p>
          </motion.section>

          <motion.section variants={fadeUpVariant} className="space-y-6">
            {(blog.contentBlocks || []).map((block, idx) => (
              <ContentBlock key={idx} block={block} />
            ))}
          </motion.section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}


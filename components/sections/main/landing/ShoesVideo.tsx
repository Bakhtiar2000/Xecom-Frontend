"use client";

import React from "react";
import SectionTitle from "@/components/sections/shared/SectionTitle";

const ShoesVideo: React.FC = () => {
  return (
    <div className="container">
      <div className="bg-linear-to-b from-blue-50 to-gray-50 px-4 py-12 lg:-my-12 dark:from-gray-800 dark:to-gray-900">
        <div className="lg:min-h-screen">
          <div className="mx-auto max-w-6xl">
            {/* Subtle Header */}
            <div className="mb-16 text-center">
              <SectionTitle subtitle="Video Showcase" title="Sneakers in Motion" className="mb-8" />
            </div>

            {/* Interactive Video Section */}
            <div className="relative mb-20">
              {/* Floating Labels */}
              <div className="absolute -top-6 left-1/4 z-10">
                <div className="bg-secondary rounded-full border px-4 py-2 shadow-lg">
                  <span className="text-sm font-semibold">Click to Play</span>
                </div>
              </div>

              <div className="absolute top-1/2 -right-4 z-10 -translate-y-1/2 transform">
                <div className="bg-secondary rotate-90 rounded-full px-4 py-2 shadow-lg">
                  <span className="text-sm font-semibold">HD</span>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative transform overflow-hidden rounded-3xl border-8 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                <video
                  src="/video/sneakers.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="aspect-video h-auto w-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* Description */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="Discription-text-primary text-muted-foreground mb-8 leading-relaxed">
                Our sneakers aren&apos;t just footwear—they&apos;re a statement. This video captures
                the essence of design, comfort, and style that goes into every pair we create.
              </p>

              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-light">01</div>
                  <div className="text-xs tracking-wider uppercase">Design</div>
                </div>

                <div className="h-px w-4" />

                <div className="text-center">
                  <div className="text-2xl font-light">02</div>
                  <div className="text-xs tracking-wider uppercase">Craft</div>
                </div>

                <div className="h-px w-4" />

                <div className="text-center">
                  <div className="text-2xl font-light">03</div>
                  <div className="text-xs tracking-wider uppercase">Innovate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoesVideo;

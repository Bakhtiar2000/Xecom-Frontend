"use client";

import React from "react";

const ShoesVideo: React.FC = () => {
  return (
    <div className="container">
      <div className="bg-linear-to-b from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 lg:-my-12 px-4 py-12">
        <div className="lg:min-h-screen ">
          <div className="max-w-6xl mx-auto">
            {/* Subtle Header */}
            <div className="text-center mb-16">
              <p className="description-text text-muted-foreground merriweather-font">
                Video Showcase
              </p>
              <h1 className="title-text  merriweather-font">
                Sneakers in <span className="font-medium">Motion</span>
              </h1>
            </div>

            {/* Interactive Video Section */}
            <div className="relative mb-20">
              {/* Floating Labels */}
              <div className="absolute -top-6 left-1/4 z-10">
                <div className="px-4 py-2 bg-secondary  rounded-full shadow-lg border ">
                  <span className="text-sm font-semibold ">Click to Play</span>
                </div>
              </div>

              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <div className="px-4 py-2 bg-secondary rounded-full shadow-lg rotate-90">
                  <span className="text-sm font-semibold">HD</span>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative rounded-3xl overflow-hidden border-8  shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <video
                  src="/Video/sneakers.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-auto aspect-video object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto text-center">
              <p className="Discription-text-primary text-muted-foreground leading-relaxed mb-8">
                Our sneakers aren&apos;t just footwear—they&apos;re a statement.
                This video captures the essence of design, comfort, and style
                that goes into every pair we create.
              </p>

              <div className="flex items-center justify-center space-x-8 ">
                <div className="text-center">
                  <div className="text-2xl font-light">01</div>
                  <div className="text-xs uppercase tracking-wider">Design</div>
                </div>

                <div className="w-4 h-px " />

                <div className="text-center">
                  <div className="text-2xl font-light">02</div>
                  <div className="text-xs uppercase tracking-wider">Craft</div>
                </div>

                <div className="w-4 h-px " />

                <div className="text-center">
                  <div className="text-2xl font-light">03</div>
                  <div className="text-xs uppercase tracking-wider">
                    Innovate
                  </div>
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

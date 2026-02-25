"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { sneakersGallery } from "@/data/shoes-data";
import { SneakerGalleryItem } from "@/types/shoes.types";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import { Button } from "@/components/ui/button";

const SneakerMosaicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<SneakerGalleryItem | null>(null);
  const [likedImages, setLikedImages] = useState<number[]>([]);

  const openImage = (image: SneakerGalleryItem) => {
    setSelectedImage(image);
  };

  const toggleLike = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLikedImages((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section className="container">
        <SectionTitle subtitle="Sneakers" title=" Featured Footwear" />

        <div className="grid auto-rows-[300px] grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          {sneakersGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`group relative cursor-pointer overflow-hidden rounded-xl ${item.className}`}
              onClick={() => openImage(item)}
            >
              {/* BACKGROUND IMAGE */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                priority
              />
              {/* CONTENT */}
              <div className="relative z-10 flex h-full w-full items-end justify-between p-2 text-white md:p-4 lg:p-8">
                {/* LEFT TEXT */}
                <div className="max-w-[80%] space-y-1 lg:max-w-[70%] lg:space-y-3">
                  <p className="text-shadow-rating text-xs tracking-[10px] uppercase opacity-90">
                    {item.category}
                  </p>

                  <h2 className="text-lg leading-tight font-bold md:text-2xl">{item.alt}</h2>

                  <p className="line-clamp-3 text-xs opacity-90 md:text-sm">{item.description}</p>

                  <Button variant={"secondary"}>Shop Now</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-secondary relative mt-20 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImage}
                className="bg-muted absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors md:h-10 md:w-10"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex h-full flex-col md:flex-row">
                <div className="relative min-h-57.5 flex-1 md:min-h-[80vh]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="h-full w-full object-cover"
                  />

                  <button
                    onClick={(e) => toggleLike(selectedImage.id, e)}
                    className="bg-muted absolute top-4 left-4 rounded-full p-1 backdrop-blur-sm transition-transform hover:scale-110"
                  >
                    <Heart
                      className={`h-8 w-8 ${
                        likedImages.includes(selectedImage.id)
                          ? "fill-danger text-danger-foreground"
                          : "text-foreground"
                      }`}
                    />
                  </button>
                </div>

                <div className="overflow-y-auto p-4 md:w-96 md:p-8">
                  <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="0 text-sm font-medium">{selectedImage.brand}</span>
                      {selectedImage.featured && (
                        <span className="bg-batch rounded-full px-2 py-1 text-xs">Featured</span>
                      )}
                    </div>

                    <h2 className="mb-1 text-xl font-bold md:mb-2 md:text-2xl">
                      {selectedImage.alt}
                    </h2>

                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                      <span>{selectedImage.category}</span>
                      <span>•</span>
                      <span>Color: {selectedImage.colorway}</span>
                      <span>•</span>
                      <span>
                        {selectedImage.likes + (likedImages.includes(selectedImage.id) ? 1 : 0)}{" "}
                        likes
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 hidden md:mb-8 md:block">
                    <p className="">{selectedImage.description}</p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full rounded-xl font-medium transition-opacity hover:opacity-90 md:py-3">
                      View Product Details
                    </button>
                    <button className="bg-button-primary flex w-full items-center justify-center gap-2 rounded-xl border-2 py-3 font-medium text-white transition-colors">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>

                  {/* Gallery Navigation */}
                  <div className="mt-2 pt-2 md:mt-8 md:pt-8">
                    <h4 className="mb-4 text-sm font-semibold">Gallery Navigation</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {sneakersGallery.slice(0, 6).map((img) => (
                        <button
                          key={img.id}
                          onClick={() => {
                            const index = sneakersGallery.findIndex((i) => i.id === img.id);
                            setSelectedImage(img);
                          }}
                          className={`aspect-square overflow-hidden border-2 ${
                            selectedImage.id === img.id
                              ? "border-success-foreground"
                              : "border-transparent"
                          }`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SneakerMosaicGallery;

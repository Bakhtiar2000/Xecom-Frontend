"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { sneakersGallery } from "@/data/shoes_data";
import { SneakerGalleryItem } from "@/types/shoes.types";
import SectionTitle from "../../shared/SectionTitle";
import { Button } from "@/components/ui/button";

const SneakerMosaicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<SneakerGalleryItem | null>(
    null,
  );
  const [likedImages, setLikedImages] = useState<number[]>([]);

  const openImage = (image: SneakerGalleryItem) => {
    setSelectedImage(image);
  };

  const toggleLike = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLikedImages((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id],
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

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[300px]  gap-2 md:gap-4">
          {sneakersGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden  rounded-xl  cursor-pointer ${item.className}`}
              onClick={() => openImage(item)}
            >
              {/* BACKGROUND IMAGE */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out
        group-hover:scale-105"
                priority
              />
              {/* CONTENT */}
              <div className="relative z-10 items-end flex h-full w-full  justify-between p-2 md:p-4 lg:p-8 text-white">
                {/* LEFT TEXT */}
                <div className="max-w-[80%] lg:max-w-[70%] space-y-1 lg:space-y-3">
                  <p className="text-xs text-shadow-rating uppercase tracking-[10px] opacity-90">
                    {item.category}
                  </p>

                  <h2 className="text-lg md:text-2xl font-bold leading-tight">
                    {item.alt}
                  </h2>

                  <p className="text-xs md:text-sm opacity-90 line-clamp-3">
                    {item.description}
                  </p>

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
            className="fixed inset-0  z-50 flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0  backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full mt-20 max-h-[90vh] bg-secondary shadow-lg  rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 w-10 md:w-10 md:h-10 h-10  bg-muted rounded-full  backdrop-blur-sm flex items-center justify-center  transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="flex-1 relative min-h-57.5  md:min-h-[80vh] ">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-cover w-full h-full"
                  />

                  <button
                    onClick={(e) => toggleLike(selectedImage.id, e)}
                    className="absolute top-4  left-4 p-1  bg-muted rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-8  h-8 ${
                        likedImages.includes(selectedImage.id)
                          ? "fill-red-500 text-red-500"
                          : " text-foreground"
                      }`}
                    />
                  </button>
                </div>

                <div className="md:w-96 md:p-8 p-4 overflow-y-auto">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium 0">
                        {selectedImage.brand}
                      </span>
                      {selectedImage.featured && (
                        <span className="px-2 py-1 bg-batch rounded-full  text-xs">
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="md:text-2xl text-xl font-bold mb-1  md:mb-2">
                      {selectedImage.alt}
                    </h2>

                    <div className="flex text-muted-foreground  items-center  gap-4 text-sm ">
                      <span>{selectedImage.category}</span>
                      <span>•</span>
                      <span>Color: {selectedImage.colorway}</span>
                      <span>•</span>
                      <span>
                        {selectedImage.likes +
                          (likedImages.includes(selectedImage.id) ? 1 : 0)}{" "}
                        likes
                      </span>
                    </div>
                  </div>

                  <div className="md:mb-8 hidden md:block mb-2">
                    <p className="">{selectedImage.description}</p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full md:py-3 rounded-xl  font-medium hover:opacity-90 transition-opacity">
                      View Product Details
                    </button>
                    <button className="w-full py-3 bg-button-primary text-white rounded-xl border-2  font-medium  transition-colors flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>

                  {/* Gallery Navigation */}
                  <div className="md:mt-8 mt-2 md:pt-8 pt-2 ">
                    <h4 className="text-sm font-semibold  mb-4">
                      Gallery Navigation
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {sneakersGallery.slice(0, 6).map((img) => (
                        <button
                          key={img.id}
                          onClick={() => {
                            const index = sneakersGallery.findIndex(
                              (i) => i.id === img.id,
                            );
                            setSelectedImage(img);
                          }}
                          className={`aspect-square  overflow-hidden border-2 ${
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
                            className="w-full h-full object-cover"
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

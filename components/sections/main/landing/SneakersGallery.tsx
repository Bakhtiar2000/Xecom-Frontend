"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { sneakersGallery } from "@/data/shoes_data";
import { SneakerGalleryItem } from "@/types/shoes.types";
import SectionTitle from "../../shared/SectionTitle";

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
      <section className="relative container">
        <div className="absolute inset-0 -z-10 overflow-hidden ">
          <div className="absolute top-0 left-0 w-96 h-96  rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96  rounded-full blur-3xl" />
        </div>

        <div className="text-center mb-12 lg:-mt-30">
          <SectionTitle
            subtitle="  Explore our collection"
            title=" SneakerGallery"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[300px] gap-2 md:gap-4">
          {sneakersGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-lg text-black cursor-pointer group ${item.className}`}
              onClick={() => openImage(item)}
            >
              <div className="relative w-full h-full ">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={600}
                  className="w-full h-full  object-cover"
                />

                <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {item.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-white  text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}

                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className="absolute top-4 right-4 bg-card-primary p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    className={`w-5  h-5 ${
                      likedImages.includes(item.id)
                        ? "fill-red-500 text-red-500"
                        : "dark:text-white"
                    }`}
                  />
                </button>

                <div className="absolute bottom-0 left-0 right-0  text-white bg-tertiary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className=" backdrop-blur-sm  px-4 py-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium ">{item.brand}</span>
                      <span className="text-xs ">
                        {item.likes + (likedImages.includes(item.id) ? 1 : 0)}{" "}
                        likes
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold  line-clamp-1">
                      {item.alt}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full ">
                        {item.category}
                      </span>
                      <span className="text-xs ">{item.colorway}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full   backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 " />
                  </div>
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
                <div className="flex-1 relative min-h-[230px]  md:min-h-[80vh] ">
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

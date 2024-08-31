"use client"

import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import { Card, CardContent } from "./ui/card";

const LatestSection = () => {

  return (
<Carousel
      opts={{
        align: "start",
      }}
      className="w-full"

    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/10">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default LatestSection;

"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Header = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <div
      className={cn(
        "relative h-[513px] flex flex-col justify-center items-center space-y-6 w-full"
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="circlePosition w-[300px] h-[300px] bg-[#ce1c43]/40 rounded-full absolute top-[30%] left-[35%] -translate-x-1/4 -translate-y-1/2 blur-[120px]"></div>
      <div className="circlePosition w-[300px] h-[300px] bg-[#ffe139]/40 rounded-full absolute  top-[60%] right-[35%] -translate-x-1/4 -translate-y-1/2 blur-[120px]"></div>
      <span className="bg-accent px-5 py-2 rounded-full text-sm border border-foreground/20 text-nowrap">
        Get ready for a new writing experience 🎉
      </span>
      <h1 className="md:text-5xl text-3xl font-bold leading-snug text-center">
        AI-Powered <br />
        Insights and Expert Tips
      </h1>
      <h2 className="text-md md:text-lg font-light text-muted-foreground">
        Welcome to Pulse, where AI-driven insights connect minds and inspire
        innovation.
      </h2>
      <div className="flex items-center justify-between gap-6 z-20">
        <Button variant={"secondary"}>
          Create an account
        </Button>
        <Button variant={"default"}>
          Explore
        </Button>
      </div>
    </div>
  );
};

export default Header;

"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"

const Header = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  return (
    <div className="h-[500px] flex flex-col items-center justify-center space-y-10 bg-gradient-to-r from-slate-100 to-slate-300 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative group "
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
            <CarouselItem className="md:basis-1/1 lg:basis-1/1 flex flex-col items-center justify-center space-y-10">
              <h1 className="text-5xl font-bold leading-snug text-center">
                Latest News <br />
                Updates and Tips
              </h1>
              <h2 className="text-xl font-light">
                Welcome to the Pulse, writen by professionals; It's connect
                people.
              </h2>
            </CarouselItem>
            <CarouselItem className="md:basis-1/1 lg:basis-1/1 flex flex-col items-center justify-center space-y-10">
              <h1 className="text-5xl font-bold leading-snug text-center">
                Latest News <br />
                Updates and Tips
              </h1>
              <h2 className="text-xl font-light">
                Welcome to the Pulse, writen by professionals; It's connect
                people.
              </h2>
            </CarouselItem>
            <CarouselItem className="md:basis-1/1 lg:basis-1/1 flex flex-col items-center justify-center space-y-10">
              <h1 className="text-5xl font-bold leading-snug text-center">
                Latest News <br />
                Updates and Tips
              </h1>
              <h2 className="text-xl font-light">
                Welcome to the Pulse, writen by professionals; It's connect
                people.
              </h2>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-10 transform -translate-y-1/2 hidden group-hover:flex transition-all duration-300"/>
        <CarouselNext className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden group-hover:flex transition-all duration-300"/>
      </Carousel>
    </div>
  );
};

export default Header;

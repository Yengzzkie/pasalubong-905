"use client";
import { Button } from "@material-tailwind/react";
import Pasalogo from "@/public/images/pasalogo.png";

const SubHero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-16 lg:px-40">
      <div className="flex flex-col flex-1 gap-2 font-lato text-zinc-600 leading-[24px]">
        <h1 className="great-vibes-regular text-3xl">About Pasalubong 905</h1>
        <p className="font-semibold">
          Vestibulum quis elit eget neque porttitor no amet dolor. Proin
          pretiumss.
        </p>
        <p className="text-[14px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet
          dolor libero, eget loved dost venenatis mauris finibus dictum.
          Vestibulum quis elit eget neque porttitor no amet dolor. Proin pretium
          purus a lorem ornare
        </p>
        <p className="text-[14px]">
          sed lobortis pulvinar. Integer laoreet mi id eros porta euismod.
          Suspendisse potenti. Nulla eros dost mauris, convallis et sem tempus,
          viverra hendrerit sapien Lorem amet, consectetur adipiscing elit.
          Donec aliquet dolor libero,
        </p>
        <Button className="bg-[#e54c2a] my-2 w-fit">Read More</Button>
      </div>
      <div className="flex-1">
        <img src={Pasalogo.src} className="w-[75%] mx-auto" />
      </div>
    </div>
  );
};

export default SubHero;

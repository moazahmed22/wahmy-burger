import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  const whiteLogo = "/identity/white-logo.png";
  const blackLogo = "/identity/black-logo.png";
  return (
    <>
      <footer className="text-background bg-foreground px-20 pt-14 pb-4">
        <div className="container mx-auto">
          <div className="capitalize relative w-full mb-5 md:w-30 h-20">
            <Image
              src={whiteLogo}
              alt="logo"
              fill
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="inline-block object-contain object-center"
            />
          </div>
          <div className="grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-4">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-lg ">Company</h3>
              <p className="text-sm font-medium">About</p>
              <p className="text-sm font-medium">Blog</p>
              <p className="text-sm font-medium">Jobs</p>
              <p className="text-sm font-medium">Contact</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-lg ">Support</h3>
              <p className="text-sm font-medium">
                18 El-Hegaz Street, Heliopolis, Cairo, Egypt
              </p>
              <p className="text-sm font-medium">wahmy@example</p>
              <p className="text-sm font-medium">16984</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-lg ">Social</h3>
              <p className="text-sm font-medium">Facebook</p>
              <p className="text-sm font-medium">Twitter</p>
              <p className="text-sm font-medium">Instagram</p>
            </div>
            <div className="flex relative h-[164px]">
              <Image
                src={`/identity/creature.png`}
                alt="wahmy"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain object center"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-10 flex justify-center items-center">
          {/* copyright */}
          <p className="text-sm text-secondary">
            © Copyright Moaz ahmed {year}. All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

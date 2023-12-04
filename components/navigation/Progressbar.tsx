"use client";
import { useEffect, useState } from "react";

const useProgressBar = () => {
  const [comp, setComp] = useState<number>(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        setComp(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener("scroll", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return comp;
};

const Progressbar = () => {
  const progress = useProgressBar();
  return (
    <span
      className="h-1 bg-blue-400 w-full block transition-transform duration-100 ease-in-out"
      style={{ transform: `translateX(${progress - 106}%)` }}
    ></span>
  );
};

export default Progressbar;

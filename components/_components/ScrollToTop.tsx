"use client";
import { ArrowUp } from "lucide-react";
import useFcmToken from "./useFcmToken";
import { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "@/lib/firebase";

const ScrollToTop = () => {
  const token = useFcmToken();
  const [isNavigate, setIsNavigate] = useState(false);

  console.log(token);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", {
          scope: "/",
        })
        .then((res) => {
          if (res.active === null) return null;
          if (res.active.state === "activated") {
            setIsNavigate(true);
          }
        });
    }
  }, [setIsNavigate]);

  useEffect(() => {
    if (isNavigate) {
      const messaging = getMessaging(app);
      const unsubscribe = onMessage(messaging, (payload) => {
        if (payload.data === undefined) return null;
        new (Notification as any)(payload.data.title, {
          body: payload.data.body,
          icon: "/asset/logo.webp",
        });
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, [isNavigate]);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed w-10 h-10 bg-transparent border-2 border-black rounded-sm bottom-[10px] right-[10px] flex items-center justify-center hover:bottom-[12px] transition-all cursor-pointer"
      onClick={handleScroll}
    >
      <ArrowUp className="w-8 h-8" />
    </div>
  );
};

export default ScrollToTop;

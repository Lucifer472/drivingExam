"use client";

import { useEffect, useState } from "react";
import firebaseCloudMessaging from "@/lib/firebase";

const useFcmToken = () => {
  const [token, setTokens] = useState("");

  useEffect(() => {
    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          return token;
        }
        return "";
      } catch (error) {
        console.log(error);
        return "";
      }
    }

    setToken().then((res) => {
      if (res !== "") {
        setTokens(res);
      }
    });
  }, []);

  return token;
};

export default useFcmToken;

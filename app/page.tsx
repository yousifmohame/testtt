"use client";

import { useState, useEffect } from "react";
import { requestPermissionAndGetToken } from "@/lib/firebaseUtils";

export default function Home() {
  const [deviceToken, setDeviceToken] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => console.error("Service Worker registration failed:", error));
    }
  }, []);

  return (
    <div>
      <h1>FCM Token Generator</h1>
      <button onClick={() => requestPermissionAndGetToken(setDeviceToken, setMessage)}>
        Get Token
      </button>
      {deviceToken && <p>Token: {deviceToken}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

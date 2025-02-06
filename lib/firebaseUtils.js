// lib/firebaseUtils.js

import { messaging, getToken } from "@/lib/firebase";

export const requestPermissionAndGetToken = async (setDeviceToken, setMessage) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BHVjbcSzFCOBM09yA4Rh70z_s41-HCrNDzaC1NfkF9bLGvvdPAHd4tGFOAff_dpKI2H93GriDodpW_9g1xxPaM8",
      });
      console.log("Device Token:", token);
      setDeviceToken(token);
      sendTokenToServer(token, setMessage);
    } else {
      setMessage("Notification permission denied");
    }
  } catch (error) {
    setMessage("Error getting token");
    console.error(error);
  }
};

const sendTokenToServer = async (token, setMessage) => {
  const res = await fetch("/api/saveToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();
  setMessage(data.message || data.error);
};

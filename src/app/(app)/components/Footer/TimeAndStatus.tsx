"use client";

import Text from "@/components/Text";
import { useEffect, useState } from "react";

export default function TimeAndStatus() {
  const timeZone = "Asia/Manila";
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timerID: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timerID !== null) return;
      timerID = setInterval(() => setTime(new Date()), 1000);
    };
    const stop = () => {
      if (timerID === null) return;
      clearInterval(timerID);
      timerID = null;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: timeZone,
    }).format(date);
  };

  return (
    <div className="flex flex-col items-start md:items-end gap-4px">
      <Text className="font-medium">Manila, Philippines</Text>
      <Text>{formatTime(time)}</Text>
    </div>
  );
}

"use client";

import Text from "@/components/Text";
import { useEffect, useState } from "react";

export default function TimeAndStatus() {
  const timeZone = "America/New_York";
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerID);
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
      <Text className="font-medium">Montreal, Canada</Text>
      <Text>{formatTime(time)}</Text>
    </div>
  );
}

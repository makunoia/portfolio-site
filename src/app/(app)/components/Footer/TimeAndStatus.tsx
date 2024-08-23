"use client";
import Text from "@/components/Text";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

const TimeAndStatus = () => {
  const timeZone = "America/New_York";
  const [time, setTime] = useState(moment.tz(timeZone));

  useEffect(() => {
    const timerID = setInterval(() => setTime(moment.tz(timeZone)), 1000);

    return () => clearInterval(timerID);
  }, [timeZone]);

  return (
    <div className="flex flex-col items-start md:items-end gap-4px">
      <Text weight="medium">Montreal, Canada</Text>
      <Text>{time.format("h:mm A")}</Text>
    </div>
  );
};

export default TimeAndStatus;

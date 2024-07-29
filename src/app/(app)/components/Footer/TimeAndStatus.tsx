"use client";
import Text from "@/components/Text";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

const IndicatorCVA = cva("rounded-full w-8px h-8px animate-pulse", {
  variants: {
    status: {
      dnd: "bg-danger",
      available: "bg-success",
    },
  },
});

const TimeAndStatus = () => {
  const IndicatorStyle = IndicatorCVA({ status: "available" });

  const timeZone = "America/New_York";
  const [time, setTime] = useState(moment.tz(timeZone));

  useEffect(() => {
    const timerID = setInterval(() => setTime(moment.tz(timeZone)), 1000);

    return () => clearInterval(timerID);
  }, [timeZone]);

  return (
    <div className="flex flex-col items-start md:items-end gap-4px">
      <div className="flex flex-row gap-4px">
        <Text weight="medium">Montreal, Canada</Text>
        <Text>{time.format("h:mm A")}</Text>
      </div>
      <div className="flex flex-row items-center gap-8px">
        <div className={IndicatorStyle}></div>
        <Text>Sleeping</Text>
      </div>
    </div>
  );
};

export default TimeAndStatus;

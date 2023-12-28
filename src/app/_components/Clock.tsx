"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

const Clock = () => {
  const [datetime, setDatetime] = useState<Date | undefined>();
  useEffect(() => {
    const interval = setInterval(() => {
      setDatetime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex w-full max-w-[210px] justify-center rounded-md border bg-blue-600 px-4 py-2 text-white shadow-md">
      {datetime && format(datetime, "dd/mm/yy hh:mm:ss")}
    </div>
  );
};

export default Clock;

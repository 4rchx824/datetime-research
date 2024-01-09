"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { DateTime, Interval } from "luxon";
import timezone from "dayjs/plugin/timezone"; 

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const [tzid, setTzid] = useState("");
  const {
    data: deadlineData,
    isError,
    isLoading,
  } = api.date.getAllDates.useQuery();

  console.log("DEADLINE:", deadlineData);
  const now = new Date();
  //getting the timezone from user's browser
  //This will log client browser's timezone
  console.log(tzid);

  type date = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deadline: Date;
  };

  // timezone is set to my desired one (which is the client's timezone) only when it loads
  useEffect(() => {
    setTzid(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);
  return (
    <div>
      <h1>Days left for each deadline</h1>
      This line here caused the hydration error:
      <h1>Time Zone through system: {tzid}</h1>
      <div>Time Zone through ip geolocation:</div>
      <div>
        <h1 className="text-5xl">This is with Luxon</h1>
        {!deadlineData && <div>No</div>}
        {deadlineData?.map((date: date) => {
          // so that I can use Luxon's date functions
          let deadline = DateTime.fromISO(date.deadline.toISOString());
          //We need a comparison with the time now and the time in the database, both in local time
          const now = DateTime.local();
          const i = Interval.fromDateTimes(now, deadline);

          return (
            <div className="p-2" key={date.id}>
              =============================
              <h1 className="p-3 text-4xl">{date.name}</h1>
              <h1> DEADLINE TIMEZONE: {deadline.zoneName}</h1>
              <h1>Days from now: {Math.round(i.length("days"))} days</h1>
              <h1>TODAY === {now.toString()} in local time</h1>
              <h1>
                Deadline: {deadline.toLocaleString(DateTime.DATETIME_FULL)} in
                local timezone in the respective locales:
              </h1>
              Converted from javascript datetime obj to luxon:
              {deadline.toString()}
              <h1>
                Original Deadline in database {date.deadline.toISOString()} in
                UTC
              </h1>
            </div>
          );
        })}
      </div>
      <div>
        <h1 className="text-5xl">This is with Dayjs</h1>
        {!deadlineData && <div>No Dayjs</div>}
        {deadlineData?.map((date: date) => {
          // so that I can use Luxon's date functions
          let deadline = dayjs(date.deadline.toISOString());
          //We need a comparison with the time now and the time in the database, both in local time
          let now = dayjs();

          return (
            <div className="p-2" key={date.id}>
              =============================
              <h1 className="p-3 text-4xl">{date.name}</h1>
              <h1> DEADLINE TIMEZONE: {dayjs.tz.guess()}</h1>
              <h1>Days from now: {now.diff(deadline)} days</h1>
              <h1>TODAY === {now.toString()} in local time</h1>
              <h1>
                Deadline: {deadline.toLocaleString(DateTime.DATETIME_FULL)} in
                local timezone in the respective locales:
              </h1>
              Converted from javascript datetime obj to luxon:
              {deadline.toString()}
              <h1>
                Original Deadline in database {date.deadline.toISOString()} in
                UTC
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

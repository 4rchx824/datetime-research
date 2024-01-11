"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { DateTime, Interval } from "luxon";
import timezone from "dayjs/plugin/timezone";
import relative from "dayjs/plugin/relativeTime";
import locale from "dayjs/plugin/localeData";

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  //this is for user's timezone
  const [tzid, setTzid] = useState("");
  const { data: deadlineData, isError, isLoading } = api.task.all.useQuery();

  const now = new Date();


  type date = {
    id: string;
    name: string;
    completed: boolean;
    createdAt: Date;
    completeBy: Date;
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
          let deadline = DateTime.fromISO(date.completeBy.toISOString());
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
                LOCALE {deadline.toLocaleString(DateTime.DATETIME_FULL)} in
                local timezone in the respective locales:
              </h1>
              Converted from javascript datetime obj to luxon:
              {deadline.toString()}
              <h1>
                Original Deadline in database {date.completeBy.toISOString()} in
                UTC
              </h1>
            </div>
          );
        })}
      </div>
      <div>
        <h1 className="text-5xl">
          This is with Dayjs ___________________________
        </h1>
        {!deadlineData && <div>No Dayjs</div>}
        {deadlineData?.map((date: date) => {
          // so that I can use Luxon's date functions
          let deadline = dayjs(date.completeBy.toISOString());
          //We need a comparison with the time now and the time in the database, both in local time
          // for dayjs, this is in UTC
          let now = dayjs();
          dayjs.extend(timezone);
          dayjs.extend(relative);
          dayjs.extend(locale)

          return (
            <div className="p-2" key={date.id}>
              =============================
              <h1 className="p-3 text-4xl">{date.name}</h1>
              <h1>
                {" "}
                DEADLINE TIMEZONE: {dayjs.tz.guess() || "This is undefined"}
              </h1>
              <h1>Days from now: {dayjs(now).to(deadline)}</h1>
              <h1>TODAY === {now.toString()} in local time</h1>
              <h1>
                LOCALE {} in
                local timezone in the respective locales:
              </h1>
              Converted from javascript datetime obj to dayjs:
              {deadline.toString()}
              <h1>
                Original Deadline in database {date.completeBy.toISOString()} in
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

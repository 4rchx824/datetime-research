"use client";
import React from "react";
import { api } from "@/trpc/react";
import { DateTime, Interval } from "luxon";

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const {
    data: deadlineData,
    isError,
    isLoading,
  } = api.date.getAllDates.useQuery();

  console.log("DEADLINE:", deadlineData);
  const now = new Date();
  //getting the timezone
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(tzid);

  return (
    <div>
      <h1>Days left for each deadline</h1>
      <h1>Time Zone through system: {tzid}</h1>
      <h1>Time Zone through ip geolocation: NTO YET DONE</h1>
      <div>
        {!deadlineData && <div>No</div>}
        {deadlineData?.map((date: any) => {
          const deadline = DateTime.fromISO(date.deadline.toISOString());
          const now = DateTime.local();
          const i = Interval.fromDateTimes(now, deadline);
          // const test = Interval.fromDateTimes(now, );

          return (
            <div key={date.id}>
              <h1>{date.name}</h1>
              <h1>Days from now: {i.length("days")}</h1>
              <h1>TODAY === {now.toString()}</h1>
              <h1>Deadline: {deadline.toString()}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

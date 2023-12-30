"use client";
import React from "react";
import { api } from "@/trpc/react";
import { DateTime } from "luxon";

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
        {deadlineData?.map((date) => {
          const deadline = DateTime.fromISO(date.deadline.toDateString());

          return (
            <div key={date.id}>
              <h1>{date.name}</h1>
              <h1>Days from now: {deadline.toString()}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

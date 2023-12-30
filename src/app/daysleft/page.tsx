"use client";
import React from "react";
import { api } from "@/trpc/react";

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const { data: deadlineData, isError, isLoading } = api.date.getAllDates.useQuery();

  console.log("DEADLINE:", deadlineData);
  const now = new Date();
  //getting the timezone
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(tzid);
  

  return (
    <div>
      <h1>Days left for each deadline</h1>
      <h1>Time Zone through system: {tzid}</h1>
      <h1>Time Zone through ip geolocation: ???</h1>
      <div>
        {deadlineData ? (
          <div>
            <p>Your most recent post: </p>
            <p>Time diff: {deadlineData[0]?.deadline?.toLocaleTimeString()}</p>
            <p>WYA {tzid}</p>

          </div>
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Page;

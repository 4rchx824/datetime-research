"use client";
import React, {useEffect, useState} from "react";
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

  type date = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deadline: Date;
  };

  const YourComponent = () => {

    const [position, setPosition] = useState(null);
    
    useEffect(() => {
      const fetchDates = async () => {
        try {
          var position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          
          console.log("THIS IS THE POSITION", position);
          
          // Now you can use position in your logic
          // ...
  
        } catch (error) {
          console.error("Error getting geolocation:", error);
        }
      };
  
      fetchDates();
    }, []); // Run this effect only once when the component mounts
  
    return (
      <h1>{position}</h1>
    );
  };

  return (
    <div>
      <h1>Days left for each deadline</h1>
      <h1>Time Zone through system: {tzid}</h1>
      <h1>Time Zone through ip geolocation: <YourComponent/></h1>
      <div>
        {!deadlineData && <div>No</div>}
        {deadlineData?.map((date: date) => {
          // so that I can use Luxon's date functions
          let deadline = DateTime.fromISO(date.deadline.toISOString());
          
          const now = DateTime.local();
          const i = Interval.fromDateTimes(now, deadline);
          const test = Interval.fromDateTimes(now, date.deadline);

          return (
            <div key={date.id}>
              =============================
              <h1>{date.name}</h1>
              <h1>Days from now: {Math.round(i.length("days"))} days</h1>
              <h1>Days from now: {Math.round(test.length("days"))} days</h1>
              <h1>TODAY === {now.toString()} in local time</h1>
              <h1></h1>
              <h1>Deadline: {deadline.toLocaleString(DateTime.DATETIME_FULL)} in local time</h1>
              <h1>
                Original Deadline in database {date.deadline.toISOString()} in UTC
                
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

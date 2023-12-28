"use client";
import React from "react";
import { api } from "@/trpc/react";
import { format, parseISO } from "date-fns";

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const { data: deadlineData, error } = api.date.getAllDates.useQuery();

  console.log("DEADLINE:", deadlineData);

  return (
    <div>
      <h1>Days left for each deadline</h1>
      <div>
        {deadlineData ? (
          <div>
            <p>
              Your most recent post:{" "}
              {format(
                parseISO(deadlineData[0]?.deadline?.toISOString()!),
                "MM/dd/yyyy",
              )}
            </p>
            <p>
              Time diff: {deadlineData[0]?.deadline?.toLocaleTimeString()}
            </p>
            <p>
              Today date: {new Date().toString()}
            </p>
          </div>
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Page;

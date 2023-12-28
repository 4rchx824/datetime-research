import React from "react";
import { api } from "@/trpc/server";

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    
  //   const deadlineData = api.date.getAllDates.query();

  //   console.log(deadlineData); // Corrected from 'data' to 'deadlineData'

  return (
    <div>
      <h1>Days left for each deadline</h1>
      <p>Here you can see how many days are left for each deadline</p>
      {/* <div>
        {deadlineData ? (
          <p>Your most recent post: {deadlineData[0].name}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div> */}
    </div>
  );
};

export default Page;

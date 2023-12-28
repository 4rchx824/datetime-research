import Link from "next/link";
import { useEffect } from "react";
import Clock from "./_components/Clock";
import CreateNewTask from "./_components/CreateNewTask";

export default async function Home() {
  return (
    <div className="flex flex-col p-4">
      <Clock />
      <div className="pt-8">
        <h1 className="text-lg font-bold">Create a new Task</h1>
        <CreateNewTask />
      </div>
    </div>
  );
}

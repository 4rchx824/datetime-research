"use client"
import { api } from "@/trpc/react";
import type { Task } from "@prisma/client";

import dayjs from "dayjs";

type Props = {
  tasks: Task[];
};
const AllTasks = ({ tasks }: Props) => {
  return (
    <div className="flex flex-col space-y-8 py-8">
      {(tasks ?? []).map((task) => (
        <div className="max-w-md rounded-md shadow-md" key={task.id}>
          <h1 className="rounded-t-md bg-sky-600 px-4 py-1 text-white">
            {task.name}
          </h1>
          <div className="p-4">
            <h1>
              <span className="mr-1 font-bold">Created at:</span>
              {dayjs(task.createdAt).toString()}
            </h1>
            <h1>
              <span className="mr-1 font-bold">Complete by:</span>
              {dayjs(task.completeBy).toString()}
            </h1>

            <h1 className="pt-8 text-xs italic">{task.id}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTasks;

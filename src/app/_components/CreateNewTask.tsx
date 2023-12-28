"use client";

import type { Task } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";

type TaskProperties = {
  name: string;
  date: Date | undefined;
  time: string | undefined;
};

const CreateNewTask = () => {
  const [task, setTask] = useState<TaskProperties>({
    name: "",
    date: undefined,
    time: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(task);
  }, [task]);

  const { mutate } = api.task.create.useMutation({});

  return (
    <form className="flex items-center space-x-4">
      <input
        type="text"
        name="name"
        className="rounded-md border border-black p-2"
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        className="rounded-md border border-black p-2"
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        className="rounded-md border border-black p-2"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-white shadow-md hover:border-blue-700 hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
};

export default CreateNewTask;

"use client";

import type { Task } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";

type TaskProperties = {
  name: string;
  date: string;
  time: string;
};

const CreateNewTask = () => {
  const [task, setTask] = useState<TaskProperties>({
    name: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(task);
  }, [task]);


  const ctx = api.useUtils();

  const { mutateAsync } = api.task.create.useMutation({
    onSuccess: () => {
      setTask({
        name: "",
        date: "",
        time: "",
      });

      void ctx.task.invalidate();
    },
  });

  const createTask = async () => {
    try {
      const data = await mutateAsync({
        name: task.name,
        date: task.date,
        time: task.time,
      });

      console.log(data);
      
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form className="flex items-center space-x-4" action={createTask}>
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

import Clock from "./_components/DayJS/Clock";
import CreateNewTask from "./_components/DayJS/CreateNewTask";
import { api } from "@/trpc/server";
import AllTasks from "./_components/DayJS/AllTasks";
export default async function Home() {
  const tasks = await api.task.all.query();

  return (
    <div className="flex flex-col p-4">
      <Clock />
      <div className="pt-8">
        <h1 className="text-lg font-bold">Create a new Task</h1>
        <CreateNewTask />
        <AllTasks tasks={tasks} />
      </div>
    </div>
  );
}

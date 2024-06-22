"use client";
import { redirect } from "next/navigation";
import { useCurrentRole } from "~/hooks/use-current-role";

const Dashboard = () => {
  const role = useCurrentRole();
  console.log(role);
  if (role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="">
      <p className="border-b font-heading font-bold  text-2xl py-3 px-2">
        Weird Title
      </p>
    </div>
  );
};
export default Dashboard;

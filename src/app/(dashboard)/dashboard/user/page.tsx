import BreadCrumb from "@/components/dashboard/breadcrumb";
import { UserClient } from "@/components/dashboard/tables/user-tables/client";
import { users } from "@/constants/data";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}

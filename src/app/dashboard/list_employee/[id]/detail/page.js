"use client";
import EmployeeInformation from "@/components/employee/form/employee-detail";

export default function Page({ params }) {
  const id = params.id;
  return (
    <main>
      <EmployeeInformation id={id} />
    </main>
  );
}

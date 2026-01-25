import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { registrationSync } from "../ApiServices/serverActions";
import AuthSwitcher from "./authSwitcher";


export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  unstable_noStore();

 
  const session = await getServerSession(authOptions);


  const params = await searchParams;
  const initialMode = params?.mode || "login";

  if (session?.user) {
   
    const result = await registrationSync(
      session.user.email,
      session.user.name,
    );
   
    redirect("/dashboard");
  }

  return (
    <div className="w-screen h-screen bg-no-repeat bg-left bg-cover lg:bg-[url('https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/background--002-substitute/x40ZhYiIvD0cnog8z2R6--0--uzjux%20(1)%20(1).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS0wMDItc3Vic3RpdHV0ZS94NDBaaFlpSXZEMGNub2c4ejJSNi0tMC0tdXpqdXggKDEpICgxKS5qcGciLCJpYXQiOjE3NjkyNzIzNzIsImV4cCI6MTgwMDgwODM3Mn0.TYZy_bWFU8VKkCOhWAdqZgg7w3szaswXf8xEuIWcweU')] bg-[url(https://edgmylxnlegbdhhbpcvm.supabase.co/storage/v1/object/sign/background--002/x40ZhYiIvD0cnog8z2R6--0--uzjux.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMDRhZjUwMi04NTkxLTQwNWYtOWQ3OC0yYWM0NWY1ZDllNDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS0wMDIveDQwWmhZaUl2RDBjbm9nOHoyUjYtLTAtLXV6anV4LmpwZyIsImlhdCI6MTc2NjIyMDUxMywiZXhwIjoxNzk3NzU2NTEzfQ.AMI3epyCURJMFxbekiKzCgiJtnuSYk4yY48_EB1jt4c)] flex justify-center items-center">
      <AuthSwitcher initialMode={initialMode} />
    </div>
  );
}

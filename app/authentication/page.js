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
    <div className="w-screen h-screen bg-no-repeat bg-left bg-cover lg:bg-[url('https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/background--002-big/x40ZhYiIvD0cnog8z2R6--0--uzjux%20(1)%20(1).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS0wMDItYmlnL3g0MFpoWWlJdkQwY25vZzh6MlI2LS0wLS11emp1eCAoMSkgKDEpLmpwZyIsImlhdCI6MTc3MDg5MjEzMSwiZXhwIjoxODAyNDI4MTMxfQ.eYjKrgJHBLn0pwViMvoQvhsch16AzvR855rGY_xpf1Q')] bg-[url(https://blwoiwbplzhoyviciovw.supabase.co/storage/v1/object/sign/background--002/x40ZhYiIvD0cnog8z2R6--0--uzjux.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZGQ5MjJkNC0wYzRlLTRiMTAtYTUyYy1kMzRhNTBiNWU2ZTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kLS0wMDIveDQwWmhZaUl2RDBjbm9nOHoyUjYtLTAtLXV6anV4LmpwZyIsImlhdCI6MTc3MDg4MDI1NCwiZXhwIjoxODAyNDE2MjU0fQ.ptXbJdCvqmty1YOo40YiPMRWPxwVT7USs7opqTy7TFw)] flex justify-center items-center">
      <AuthSwitcher initialMode={initialMode} />
    </div>
  );
}

import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex h-16 items-center px-4 border-b">
      <StoreSwitcher stores={stores} />
      <MainNav />
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;

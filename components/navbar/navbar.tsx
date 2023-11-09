import { UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";

const Navbar = () => {
  return (
    <div className="flex h-16 items-center px-4 border-b">
      <StoreSwitcher />
      <MainNav />
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `${params.storeId}/settings`,
    },
  ];

  return (
    <nav className="mx-6">
      <ul>
        {routes.map((route) => (
          <li
            key={route.href}
            className={`${
              route.active ? "text-black" : "text-gray-600"
            } hover:text-black`}
          >
            <Link href={`/${route.href}`}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;

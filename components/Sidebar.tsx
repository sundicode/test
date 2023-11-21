// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { BiChevronRight } from "react-icons/bi";
// const sidebarLinks = [
//   {
//     name: "Schedule",
//     sublinks: [
//       { name: "Today", href: "/dashboard/schedules/all-schedule" },
//       { name: "Create", href: "/dashboard/schedules/create-schedule" },
//     ],
//     gap: 8,
//     sub: true,
//   },
//   {
//     name: "Options",
//     sublinks: [
//       { name: "Settings", href: "/dashboard/options/settings" },
//       { name: "Profile", href: "/dashboard/options/profile" },
//       { name: "Logout", href: "/dashboard/options/logout" },
//     ],
//     gap: 8,
//     sub: true,
//   },
//   {
//     name: "Healty Tips",
//     sublinks: [
//       { name: "Add Tip", href: "/dashboard/health/add-tip" },
//       { name: "Edit Tip", href: "/dashboard/health/edit-tip" },
//       { name: "All Tip", href: "/dashboard/health/all-tip" },
//     ],
//     gap: 8,
//     sub: true,
//   },
// ];
// const Sidebar = () => {
//   const [submenu, setSubmenu] = useState(false);
//   return (
//     <div className="min-h-[85vh] w-full rounded bg-light">
//       <nav>
//         <div className="h-[100px]"></div>
//         <ul>
//           {sidebarLinks.map((option) => (
//             <ul key={option.name}>
//               <li className="w-full pr-4 py-3 text-md pl-4 flex justify-between items-center">
//                 <span> {option.name}</span>
//                 <BiChevronRight
//                   onClick={() => setSubmenu(option.sub && !submenu)}
//                 />
//               </li>
//               {option.sublinks && submenu && (
//                 <ul role="list" className={`pl-5`}>
//                   {option.sublinks.map((sublink) => (
//                     <li key={sublink.name} className="text-[13px] p-2">
//                       <Link href={sublink.href}>{sublink.name}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </ul>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

"use client";
import cn from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

const sidebarLinks = [
  {
    name: "Schedule",
    sublinks: [
      { name: "Today", href: "/dashboard/schedules/all-schedule" },
      { name: "Create", href: "/dashboard/schedules/create-schedule" },
    ],
    gap: 8,
    sub: true,
  },
  {
    name: "Options",
    sublinks: [
      { name: "Settings", href: "/dashboard/options/settings" },
      { name: "Profile", href: "/dashboard/options/profile" },
      { name: "Logout", href: "/dashboard/options/logout" },
    ],
    gap: 8,
    sub: true,
  },
  {
    name: "Health Tips",
    sublinks: [
      { name: "Add Tip", href: "/dashboard/health/add-tip" },
      { name: "Edit Tip", href: "/dashboard/health/edit-tip" },
      { name: "All Tip", href: "/dashboard/health/all-tip" },
    ],
    gap: 8,
    sub: true,
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const router = usePathname();
  const handleSubmenuToggle = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-[85vh] w-full rounded bg-light">
      <nav>
        <div className="h-[100px]"></div>
        <ul>
          {sidebarLinks.map((option, index) => (
            <ul key={option.name}>
              <li
                key={option.name}
                className="w-full pr-5 py-3 text-md pl-4 flex justify-between items-center hover:bg-primary hover:text-white cursor-pointer"
                onClick={() => handleSubmenuToggle(index)}
              >
                <span>{option.name}</span>
                <BiChevronRight
                  className={activeIndex === index ? "active rotate-90" : ""}
                />
              </li>
              {option.sublinks && activeIndex === index && (
                <ul role="list" className="">
                  {option.sublinks.map((sublink) => (
                    <li
                      key={sublink.name}
                      className={cn(
                        "text-[12px] p-2 hover:bg-slate-50 pl-7 duration-300",
                        router === sublink.href ? "bg-white" : ""
                      )}
                    >
                      <Link href={sublink.href}>{sublink.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

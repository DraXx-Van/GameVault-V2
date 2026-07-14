import { NavLink } from "react-router-dom";

const SidebarButton = ({ logo, navitem, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center space-x-3 px-3 py-2 rounded-lg transition-all hover:translate-x-1
        ${
          isActive
            ? "bg-[#18181b] text-[#fbfbfb] font-bold"
            : "hover:bg-[#18181b]/40 font-normal text-[#94a3b8]"
        }
      `
      }
    >
      <i className={logo}></i>

      <span className="text-[13px]">
        {navitem}
      </span>
    </NavLink>
  );
};

export default SidebarButton;
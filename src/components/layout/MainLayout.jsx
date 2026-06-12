import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen gap-4 p-4 text-white bg-[#050505] text-sm overflow-hidden">

      <Sidebar />

      <main className="flex-1 h-full flex flex-col rounded-3xl  overflow-y-auto scroll-smooth overflow-x-hidden scrollbar-hide">
        {children}
      </main>

      <RightSidebar />

    </div>
  );
}
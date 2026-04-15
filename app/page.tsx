import MafsScreen from "./components/MafsScreen";
import MobileSidebar from "./components/MobileSidebar";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-between min-h-0 overflow-x-hidden">
      <Sidebar />
      <MobileSidebar />
      <MafsScreen />
    </div>
  );
}

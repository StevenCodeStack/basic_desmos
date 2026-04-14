import MafsScreen from "./components/MafsScreen";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-between min-h-0">
      <Sidebar />
      <MafsScreen />
    </div>
  );
}

import { NavBar } from "./components/SME/NavBar";
import { Dashboard } from "./pages/SME/Dashboard"

function App() {
  return (
    <div className="flex flex-row h-screen w-[100%] bg-[#f7f7f7]" style={{ fontFamily: '"Inter", serif' }}>
      <div className="w-[300px] bg-[#F0F5F7] opacity-[100%] h-full">
        <NavBar />
      </div>

      <div className="w-[100%] m-[15px]">
        <Dashboard />
      </div>
  </div>
  );
}

export default App;

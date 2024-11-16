import { NavBar } from "./components/SME/NavBar";
import { Dashboard } from "./pages/SME/Dashboard"

function App() {
  return (
    <div className="flex flex-row h-screen w-[100%] bg-[#E2E2E2]" style={{ fontFamily: '"Inter", serif' }}>
      <div className="w-[240px] bg-[#F0F5F7] opacity-[100%] h-full">
        <NavBar />
      </div>

      <div className="w-[100%] m-[15px] bg-white ">
        <Dashboard />
      </div>
  </div>
  );
}

export default App;

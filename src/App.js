import React from "react";
import TaxStrategyCard from "./TaxStrategyCard";
import MultiYearRothCard from "./components/MultiYearRothCard";
import CapitalGainsCard from "./components/CapitalGainsCard";
import ScheduleCCard from "./components/ScheduleCCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Tax Planner ROI Demo</h1>
      
      <TaxStrategyCard />

      <div className="mt-6">
        <MultiYearRothCard />
      </div>

      <div className="mt-6">
        <CapitalGainsCard />
      </div>

      <div className="mt-6">
        <ScheduleCCard /> {/* ✅ Clean and separate */}
      </div>
    </div>
  );
}

export default App;

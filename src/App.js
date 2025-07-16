import React from "react";
import TaxStrategyCard from "./TaxStrategyCard";
import MultiYearRothCard from "./components/MultiYearRothCard";
import CapitalGainsCard from "./components/CapitalGainsCard";
import ScheduleCCard from "./components/ScheduleCCard";
import RentalCard from "./components/RentalAnalysisCard";
import YearEndPlanningCard from "./components/YearEndPlanningCard"; // You also missed this one

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Tax Planner ROI Demo</h1>
      <TaxStrategyCard />
      <div className="mt-6"><MultiYearRothCard /></div>
      <div className="mt-6"><CapitalGainsCard /></div>
      <div className="mt-6"><ScheduleCCard /></div>
      <div className="mt-6"><RentalCard /></div>
      <div className="mt-6"><YearEndPlanningCard /></div>
    </div>
  );
}

export default App;




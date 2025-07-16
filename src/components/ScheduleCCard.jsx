import React, { useState } from "react";

function ScheduleCCard() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [retirement, setRetirement] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://chatgpt-tax-planner.onrender.com/schedule_c_analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gross_income: parseFloat(income) || 0,
          expenses: parseFloat(expenses) || 0,
          retirement_contribution: parseFloat(retirement) || 0,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="strategy-card p-4 rounded shadow-md bg-white mt-6">
      <h3 className="text-lg font-semibold mb-2">Schedule C Tax Exposure</h3>
      <div className="space-y-2">
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Gross Income"
          className="w-full border p-2"
        />
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          placeholder="Expenses"
          className="w-full border p-2"
        />
        <input
          type="number"
          value={retirement}
          onChange={(e) => setRetirement(e.target.value)}
          placeholder="Retirement Contribution (optional)"
          className="w-full border p-2"
        />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Analyze Schedule C
        </button>
      </div>

      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100 space-y-1">
          <p><strong>Net Profit:</strong> ${response.net_profit.toLocaleString()}</p>
          <p><strong>Self-Employment Tax:</strong> ${response.self_employment_tax.toLocaleString()}</p>
          <p><strong>Profit After Retirement:</strong> ${response.optimized_profit_after_retirement.toLocaleString()}</p>
          <ul className="list-disc list-inside">
            {response.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScheduleCCard;

import React, { useState } from "react";

function CapitalGainsCard() {
  const [income, setIncome] = useState("");
  const [gains, setGains] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://chatgpt-tax-planner.onrender.com/capital_gains_projection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ordinary_income: parseFloat(income) || 0,
          capital_gains: parseFloat(gains) || 0,
          filing_status: filingStatus,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="strategy-card p-4 rounded shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-2">Capital Gains Review</h3>
      <div className="space-y-2">
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Ordinary Income"
          className="w-full border p-2"
          required
        />
        <input
          type="number"
          value={gains}
          onChange={(e) => setGains(e.target.value)}
          placeholder="Capital Gains"
          className="w-full border p-2"
          required
        />
        <select
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value)}
          className="w-full border p-2"
        >
          <option value="single">Single</option>
          <option value="married_filing_jointly">Married Filing Jointly</option>
        </select>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Estimate Capital Gains Tax
        </button>
      </div>

      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <p><strong>Estimated Tax:</strong> ${response.estimated_tax.toLocaleString()}</p>
          <p><strong>Capital Gains Rate:</strong> {response.capital_gains_rate}</p>
        </div>
      )}
    </div>
  );
}

export default CapitalGainsCard;

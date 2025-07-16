import React, { useState } from "react";

function RetirementCard() {
  const [agi, setAgi] = useState("");
  const [contribution, setContribution] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [response, setResponse] = useState(null);

  const handleEstimate = async () => {
    try {
      const res = await fetch("https://chatgpt-tax-planner.onrender.com/retirement_contribution_projection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_agi: parseFloat(agi) || 0,
          contribution_amount: parseFloat(contribution) || 0,
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
      <h3 className="text-lg font-semibold mb-2">Retirement Contribution Planner</h3>
      <div className="space-y-2">
        <input
          type="number"
          value={agi}
          onChange={(e) => setAgi(e.target.value)}
          placeholder="Current AGI"
          className="w-full border p-2"
        />
        <input
          type="number"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          placeholder="Contribution Amount"
          className="w-full border p-2"
        />
        <select
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value)}
          className="w-full border p-2"
        >
          <option value="single">Single</option>
          <option value="married_filing_jointly">Married Filing Jointly</option>
        </select>
        <button onClick={handleEstimate} className="bg-blue-600 text-white px-4 py-2 rounded">
          Estimate Savings
        </button>
      </div>

      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <p><strong>Original AGI:</strong> ${response.original_agi.toLocaleString()}</p>
          <p><strong>New AGI:</strong> ${response.new_agi.toLocaleString()}</p>
          <p><strong>Contribution:</strong> ${response.contribution.toLocaleString()}</p>
          <p><strong>Estimated Tax Savings:</strong> ${response.tax_savings.toLocaleString()}</p>
          <p><strong>Marginal Rate:</strong> {response.marginal_rate}</p>
          <p><strong>Original Bracket:</strong> {response.original_bracket}</p>
          <p><strong>New Bracket:</strong> {response.new_bracket}</p>
        </div>
      )}
    </div>
  );
}

export default RetirementCard;

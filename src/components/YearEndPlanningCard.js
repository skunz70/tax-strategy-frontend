import React, { useState } from "react";

function YearEndPlanningCard() {
  const [formData, setFormData] = useState({
    filing_status: "single",
    w2_income: "",
    business_income: "",
    capital_gains: "",
    itemized_deductions: "",
    retirement_contributions: "",
    hsa_contributions: "",
    estimated_payments: ""
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://chatgpt-tax-planner.onrender.com/year_end_plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          w2_income: parseFloat(formData.w2_income) || 0,
          business_income: parseFloat(formData.business_income) || 0,
          capital_gains: parseFloat(formData.capital_gains) || 0,
          itemized_deductions: parseFloat(formData.itemized_deductions) || 0,
          retirement_contributions: parseFloat(formData.retirement_contributions) || 0,
          hsa_contributions: parseFloat(formData.hsa_contributions) || 0,
          estimated_payments: parseFloat(formData.estimated_payments) || 0
        })
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="strategy-card p-4 rounded shadow-md bg-white mt-6">
      <h3 className="text-lg font-semibold mb-2">Year-End Tax Planning</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <select
          name="filing_status"
          value={formData.filing_status}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="single">Single</option>
          <option value="married_filing_jointly">Married Filing Jointly</option>
        </select>
        {["w2_income", "business_income", "capital_gains", "itemized_deductions", "retirement_contributions", "hsa_contributions", "estimated_payments"].map((field) => (
          <input
            key={field}
            name={field}
            type="number"
            placeholder={field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2"
          />
        ))}
      </div>
      <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Generate Plan
      </button>

      {response && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p><strong>AGI:</strong> ${response.agi.toLocaleString()}</p>
          <p><strong>Taxable Income:</strong> ${response.taxable_income.toLocaleString()}</p>
          <p><strong>Estimated Tax:</strong> ${response.estimated_tax.toLocaleString()}</p>
          <p><strong>Deadline:</strong> {response.year_end_deadline}</p>
          <ul className="mt-2 list-disc list-inside">
            {response.strategies.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default YearEndPlanningCard;

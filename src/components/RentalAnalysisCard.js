import React, { useState } from "react";

function RentalAnalysisCard() {
  const [formData, setFormData] = useState({
    rental_income: "",
    expenses: "",
    mortgage_interest: "",
    property_tax: "",
    insurance: "",
    repairs: "",
    purchase_price: "",
    land_value: "",
    filing_status: "single",
    active_participation: true,
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://chatgpt-tax-planner.onrender.com/rental_analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rental_income: parseFloat(formData.rental_income) || 0,
          expenses: parseFloat(formData.expenses) || 0,
          mortgage_interest: parseFloat(formData.mortgage_interest) || 0,
          property_tax: parseFloat(formData.property_tax) || 0,
          insurance: parseFloat(formData.insurance) || 0,
          repairs: parseFloat(formData.repairs) || 0,
          purchase_price: parseFloat(formData.purchase_price) || 0,
          land_value: parseFloat(formData.land_value) || 0,
        }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="strategy-card p-4 rounded shadow-md bg-white mt-6">
      <h3 className="text-lg font-semibold mb-4">Rental Property Analysis</h3>
      <div className="space-y-2">
        {[
          "rental_income", "expenses", "mortgage_interest", "property_tax",
          "insurance", "repairs", "purchase_price", "land_value"
        ].map((field) => (
          <input
            key={field}
            name={field}
            type="number"
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            className="w-full border p-2"
          />
        ))}
        <select
          name="filing_status"
          value={formData.filing_status}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="single">Single</option>
          <option value="married_filing_jointly">Married Filing Jointly</option>
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="active_participation"
            checked={formData.active_participation}
            onChange={handleChange}
          />
          <span>Active Participation</span>
        </label>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Run Rental Analysis
        </button>
      </div>

      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <p><strong>Cash Flow:</strong> ${response.cash_flow.toLocaleString()}</p>
          <p><strong>Taxable Income:</strong> ${response.taxable_income.toLocaleString()}</p>
          <p><strong>Depreciation:</strong> ${response.annual_depreciation.toLocaleString()}</p>
          {response.passive_loss_warning && <p className="text-red-500">{response.passive_loss_warning}</p>}
        </div>
      )}
    </div>
  );
}

export default RentalAnalysisCard;

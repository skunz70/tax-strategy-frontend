import { useState } from "react";

export default function TaxStrategyCard() {
  const [result, setResult] = useState(null);

  const handleRunRoth = async () => {
   const response = await fetch("https://chatgpt-tax-planner.onrender.com/roth", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    current_agi: 100000,
    conversion_amount: 20000,
    filing_status: "single",
  }),
});


    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
        Roth Conversion Analysis
      </h2>
      <p>Click below to run the Roth tax strategy.</p>
      <button
        onClick={handleRunRoth}
        style={{
          marginTop: "12px",
          padding: "10px 16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Run Roth Estimate
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Estimated Tax:</strong> ${result.estimated_tax_due}
          </p>
          <p>
            <strong>Marginal Rate:</strong> {result.marginal_rate_used}
          </p>
        </div>
      )}
    </div>
  );
}

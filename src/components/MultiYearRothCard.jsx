import React, { useState } from "react";

function MultiYearRothCard() {
  const [response, setResponse] = useState(null);
  const [agi, setAgi] = useState(120000);
  const [filingStatus, setFilingStatus] = useState("married_filing_jointly");
  const [contributions, setContributions] = useState("10000,15000,20000,25000,30000");
  const [visible, setVisible] = useState(false); // ✅ toggle state

  const handleClick = async () => {
    try {
      const parsedContributions = contributions.split(",").map(val => parseFloat(val.trim()));
      const res = await fetch("https://chatgpt-tax-planner.onrender.com/multi_year_roth_projection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_agi: parseFloat(agi),
          roth_contributions: parsedContributions,
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
    <div className="strategy-card" style={{ marginBottom: "2rem" }}>
      <button onClick={() => setVisible(!visible)} style={{ marginBottom: "1rem" }}>
        {visible ? "Hide Multi-Year Roth Strategy" : "Show Multi-Year Roth Strategy"}
      </button>

      {visible && (
        <div>
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Multi-Year Roth Strategy</h3>

          {/* Input Form */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Current AGI: </label>
            <input
              type="number"
              value={agi}
              onChange={(e) => setAgi(e.target.value)}
              style={{ marginRight: "1rem" }}
            />

            <label>Filing Status: </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              style={{ marginRight: "1rem" }}
            >
              <option value="single">Single</option>
              <option value="married_filing_jointly">Married Filing Jointly</option>
            </select>

            <label>Roth Conversions (comma-separated): </label>
            <input
              type="text"
              value={contributions}
              onChange={(e) => setContributions(e.target.value)}
            />
          </div>

          <button onClick={handleClick}>Run Projection</button>

          {/* Output Table */}
          {response && response.projection && (
            <table style={{ marginTop: "1rem", borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Year</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Original AGI</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Conversion</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>New AGI</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Rate</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Bracket</th>
                </tr>
              </thead>
              <tbody>
                {response.projection.map((row, i) => (
                  <tr key={i}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.year}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>${row.original_agi.toLocaleString()}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>${row.conversion_amount.toLocaleString()}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>${row.new_agi.toLocaleString()}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.marginal_rate}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.bracket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default MultiYearRothCard;

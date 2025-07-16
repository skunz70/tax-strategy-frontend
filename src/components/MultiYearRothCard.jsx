import React, { useState } from "react";

function MultiYearRothCard() {
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    try {
      const res = await fetch("https://chatgpt-tax-planner.onrender.com/multi_year_roth_projection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_agi: 120000,
          roth_contributions: [10000, 15000, 20000, 25000, 30000],
          filing_status: "married_filing_jointly",
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="strategy-card">
      <h3>Multi-Year Roth Strategy</h3>
      <button onClick={handleClick}>Run Projection</button>

      {response?.projection && (
        <table style={{ marginTop: "1rem", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={cellStyle}>Year</th>
              <th style={cellStyle}>Original AGI</th>
              <th style={cellStyle}>Conversion</th>
              <th style={cellStyle}>New AGI</th>
              <th style={cellStyle}>Rate</th>
              <th style={cellStyle}>Bracket</th>
            </tr>
          </thead>
          <tbody>
            {response.projection.map((row, i) => (
              <tr key={i}>
                <td style={cellStyle}>{row.year}</td>
                <td style={cellStyle}>${row.original_agi.toLocaleString()}</td>
                <td style={cellStyle}>${row.conversion_amount.toLocaleString()}</td>
                <td style={cellStyle}>${row.new_agi.toLocaleString()}</td>
                <td style={cellStyle}>{row.marginal_rate}</td>
                <td style={cellStyle}>{row.bracket}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default MultiYearRothCard;

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
          current_agi: 120000,         // Replace with dynamic values as needed
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

      <button onClick={handleClick}>Run Projection</button>
      {response && (
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}

export default MultiYearRothCard;

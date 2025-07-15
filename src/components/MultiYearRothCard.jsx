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

  return (
    <div className="strategy-card">
      <h3>Multi-Year Roth Strategy</h3>
      <button onClick={handleClick}>Run Projection</button>
      {response && (
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}

export default MultiYearRothCard;

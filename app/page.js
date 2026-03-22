"use client";
import { useState } from "react";

export default function Home() {
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!skinType || !concern) {
      alert("Please select both options");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://ai-skincare-backend-1.onrender.com/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skin_type: skinType,
          concern: concern,
          sensitivity: "low",
        }),
      });

      const data = await res.json();
      setResult(data.recommendation);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff9a9e, #a18cd1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          ✨ AI Skincare
        </h2>

        <select
          value={skinType}
          onChange={(e) => setSkinType(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Skin Type</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
        </select>

        <select
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Concern</option>
          <option value="acne">Acne</option>
          <option value="pigmentation">Pigmentation</option>
        </select>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ff7e5f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Getting Recommendation..." : "Get Recommendation"}
        </button>

        {loading && (
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            ⏳ Loading...
          </p>
        )}

        {result && (
          <div style={{ marginTop: "25px" }}>
            <h3>🧴 Your Routine</h3>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>

              {/* Cleanser */}
              <div style={{
                background: "white",
                padding: "10px",
                borderRadius: "12px",
                width: "110px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}>
                <img
                  src={result?.Cleanser?.image}
                  style={{ width: "100%", height: "90px", borderRadius: "8px" }}
                />
                <p style={{ fontSize: "12px" }}>
                  🧼 {result?.Cleanser?.name}
                </p>
                <a href={result?.Cleanser?.link} target="_blank">
                  <button style={{ fontSize: "10px" }}>Buy</button>
                </a>
              </div>

              {/* Moisturizer */}
              <div style={{
                background: "white",
                padding: "10px",
                borderRadius: "12px",
                width: "110px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}>
                <img
                  src={result?.Moisturizer?.image}
                  style={{ width: "100%", height: "90px", borderRadius: "8px" }}
                />
                <p style={{ fontSize: "12px" }}>
                  💧 {result?.Moisturizer?.name}
                </p>
                <a href={result?.Moisturizer?.link} target="_blank">
                  <button style={{ fontSize: "10px" }}>Buy</button>
                </a>
              </div>

              {/* Sunscreen */}
              <div style={{
                background: "white",
                padding: "10px",
                borderRadius: "12px",
                width: "110px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}>
                <img
                  src={result?.Sunscreen?.image}
                  style={{ width: "100%", height: "90px", borderRadius: "8px" }}
                />
                <p style={{ fontSize: "12px" }}>
                  🌞 {result?.Sunscreen?.name}
                </p>
                <a href={result?.Sunscreen?.link} target="_blank">
                  <button style={{ fontSize: "10px" }}>Buy</button>
                </a>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
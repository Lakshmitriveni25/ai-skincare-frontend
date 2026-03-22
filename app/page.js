"use client";
import { useState } from "react";

export default function Home() {
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://ai-skincare-backend-1.onrender.com/recommend";

  const handleSubmit = async () => {
    if (!skinType || !concern) {
      alert("Please select options");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skin_type: skinType,
          concern: concern,
          sensitivity: "low",
        }),
      });

      const data = await res.json();

      if (data?.recommendation) {
        setResult(data.recommendation);
      } else {
        setResult(null);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    }

    setLoading(false);
  };

  const getProductLink = (type) => {
    const links = {
      cleanser:
        "https://www.amazon.com/s?k=salicylic+acid+cleanser",
      moisturizer:
        "https://www.amazon.com/s?k=ceramide+moisturizer",
      sunscreen:
        "https://www.amazon.com/s?k=spf+50+sunscreen",
    };

    return links[type] || "https://www.amazon.com";
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: 20 }}>✨ AI Skincare</h2>

        <select
          value={skinType}
          onChange={(e) => setSkinType(e.target.value)}
          style={input}
        >
          <option value="">Select Skin Type</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
        </select>

        <select
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          style={input}
        >
          <option value="">Select Concern</option>
          <option value="acne">Acne</option>
          <option value="pigmentation">Pigmentation</option>
        </select>

        <button onClick={handleSubmit} style={button}>
          {loading ? "Loading..." : "Get Recommendation"}
        </button>

        {/* RESULT */}
        {result && typeof result === "object" && (
          <div style={{ marginTop: 30 }}>
            <h3>🧴 Your Routine</h3>

            <div style={grid}>
              {["Cleanser", "Moisturizer", "Sunscreen"].map((item) => {
                let value = result[item];

                if (!value) value = "N/A";
                if (typeof value !== "string") {
                  value = JSON.stringify(value);
                }

                return (
                  <div key={item} style={productCard}>
                    <img
                      src={`https://source.unsplash.com/300x300/?skincare,${item}`}
                      style={image}
                    />

                    <h4>{item}</h4>
                    <p>{value}</p>

                    <a
                      href={getProductLink(item.toLowerCase())}
                      target="_blank"
                      style={buyButton}
                    >
                      Buy Now
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//
// 🎨 STYLES
//

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#ff9a9e,#a18cd1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "20px",
  width: "420px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: "14px",
  background: "#ff7e5f",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const grid = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const productCard = {
  background: "#fff",
  padding: "15px",
  borderRadius: "15px",
  width: "140px",
  textAlign: "center",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  transition: "0.3s",
};

const image = {
  width: "100%",
  height: "120px",
  objectFit: "cover",
  borderRadius: "10px",
};

const buyButton = {
  display: "inline-block",
  marginTop: "10px",
  padding: "8px 12px",
  background: "#6c63ff",
  color: "white",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "12px",
};
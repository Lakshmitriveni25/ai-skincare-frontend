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
      console.error(error);
      alert("Error fetching data");
    }

    setLoading(false);
  };

  // ✅ FIXED PRODUCT LINKS (REAL PRODUCTS)
  const getProductLink = (type, name) => {
    const products = {
      cleanser: {
        oily_acne: "https://www.amazon.com/dp/B00U1YCRD8",
        dry_acne: "https://www.amazon.com/dp/B01MSSDEPK",
        dry_pigmentation: "https://www.amazon.com/dp/B01N1LL62W",
        oily_pigmentation: "https://www.amazon.com/dp/B00U1YCRD8",
      },
      moisturizer: {
        oily_acne: "https://www.amazon.com/dp/B00365DABC",
        dry_acne: "https://www.amazon.com/dp/B07RK4HST7",
        dry_pigmentation: "https://www.amazon.com/dp/B07RTTP3W5",
        oily_pigmentation: "https://www.amazon.com/dp/B00365DABC",
      },
      sunscreen: {
        oily_acne: "https://www.amazon.com/dp/B00HNSSV3U",
        dry_acne: "https://www.amazon.com/dp/B01M4MCUAF",
        dry_pigmentation: "https://www.amazon.com/dp/B07YZQTKDJ",
        oily_pigmentation: "https://www.amazon.com/dp/B00HNSSV3U",
      },
    };

    const key = `${skinType}_${concern}`;
    return products[type][key] || "https://www.amazon.com";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff9a9e, #a18cd1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          width: "420px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>✨ AI Skincare</h1>

        <select
          value={skinType}
          onChange={(e) => setSkinType(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Skin Type</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
        </select>

        <select
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Concern</option>
          <option value="acne">Acne</option>
          <option value="pigmentation">Pigmentation</option>
        </select>

        <button
          onClick={handleSubmit}
          style={buttonStyle}
        >
          {loading ? "Loading..." : "Get Recommendation"}
        </button>

        {result && (
          <div style={{ marginTop: "30px" }}>
            <h3>🧴 Your Routine</h3>

            <div style={cardContainer}>
              {["Cleanser", "Moisturizer", "Sunscreen"].map((item) => (
                <div key={item} style={cardStyle}>
                  <img
                    src={`https://source.unsplash.com/200x200/?${item}`}
                    style={imageStyle}
                  />

                  <h4>{item}</h4>
                  <p style={{ fontSize: "13px" }}>{result[item]}</p>

                  <a
                    href={getProductLink(item.toLowerCase(), result[item])}
                    target="_blank"
                    style={buyButton}
                  >
                    Buy Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ STYLES
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(to right, #ff7e5f, #ff3f8e)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};

const cardContainer = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  marginTop: "15px",
};

const cardStyle = {
  background: "#fff",
  padding: "12px",
  borderRadius: "15px",
  width: "120px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  transition: "0.3s",
};

const imageStyle = {
  width: "100%",
  height: "100px",
  objectFit: "cover",
  borderRadius: "10px",
};

const buyButton = {
  display: "inline-block",
  marginTop: "8px",
  padding: "6px 10px",
  background: "#ff7e5f",
  color: "white",
  borderRadius: "8px",
  fontSize: "12px",
  textDecoration: "none",
  transition: "0.3s",
};
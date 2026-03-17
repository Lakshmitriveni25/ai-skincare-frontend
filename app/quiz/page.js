"use client";
import { useState } from "react";

export default function Quiz() {
  const [form, setForm] = useState({
    skin_type: "",
    concern: "",
    sensitivity: ""
  });

  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          AI Skincare ✨
        </h1>

        {/* Skin Type */}
        <label className="block mb-2 font-medium text-gray-700">
          Skin Type
        </label>
        <select
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
          onChange={(e) => setForm({ ...form, skin_type: e.target.value })}
        >
          <option value="">Select</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
          <option value="combination">Combination</option>
        </select>

        {/* Concern */}
        <label className="block mb-2 font-medium text-gray-700">
          Concern
        </label>
        <select
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
          onChange={(e) => setForm({ ...form, concern: e.target.value })}
        >
          <option value="">Select</option>
          <option value="acne">Acne</option>
          <option value="pigmentation">Pigmentation</option>
        </select>

        {/* Sensitivity */}
        <label className="block mb-2 font-medium text-gray-700">
          Sensitivity
        </label>
        <select
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onChange={(e) => setForm({ ...form, sensitivity: e.target.value })}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Get Recommendation
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow-md border">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Your Routine 🧴
            </h2>

            <div className="space-y-2">
              <p className="text-gray-700">
                <b>Cleanser:</b> {result.cleanser}
              </p>
              <p className="text-gray-700">
                <b>Serum:</b> {result.serum}
              </p>
              <p className="text-gray-700">
                <b>Moisturizer:</b> {result.moisturizer}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
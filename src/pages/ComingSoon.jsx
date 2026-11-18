import React from "react";
import { useNavigate } from "react-router-dom";
import "./ComingSoon.css";
import { publicAsset } from "../utils/publicAsset";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <main className="coming-soon-page">
      <div className="coming-soon-shade" />
      <button
        type="button"
        className="coming-soon-logo"
        onClick={() => navigate("/")}
        aria-label="Return to SAGA Hospitality home"
      >
        <img
          src={publicAsset("/assets/logo/saga-hospitality-logo.png")}
          alt="SAGA Hospitality"
        />
      </button>

      <section
        className="coming-soon-content"
        aria-labelledby="coming-soon-title"
      >
        <span className="coming-soon-eyebrow">RAJASTHAN</span>
        <h1 id="coming-soon-title">Coming Soon</h1>
        <p>
          Our booking experience is being prepared. Soon, you’ll be able to plan
          your stay in the wild beauty of Rajasthan.
        </p>
        <button
          type="button"
          className="coming-soon-home"
          onClick={() => navigate("/")}
        >
          RETURN TO HOME
        </button>
      </section>

      <span className="coming-soon-footer">
        WILD BY NATURE · ROOTED IN PURPOSE
      </span>
    </main>
  );
}

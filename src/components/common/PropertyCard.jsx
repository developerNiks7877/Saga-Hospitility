import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  Waves,
  Sparkles,
  Utensils,
  Wifi,
  ArrowRight,
} from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useToast } from "../../context/ToastContext";

export default function PropertyCard({ stay, viewMode = "list" }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    showToast(
      "gold",
      !isSaved
        ? `Added ${stay.name} to your Wishlist`
        : `Removed from Wishlist`,
    );
  };

  const handleCardClick = () => {
    navigate(`/details/${stay.id}`);
  };

  const isGrid = viewMode === "grid";

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      style={{
        display: "flex",
        flexDirection: isGrid ? "column" : "row",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid var(--border-light)",
        marginBottom: "20px",
      }}
    >
      {/* Image Container */}
      <div
        style={{
          position: "relative",
          width: isGrid ? "100%" : "300px",
          height: isGrid ? "220px" : "auto",
          minHeight: "210px",
          flexShrink: 0,
          overflow: "hidden",
          backgroundColor: "#E8E2D7",
        }}
      >
        <img
          src={stay.images[0]}
          alt={stay.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          className="stay-card-img"
        />

        {/* Badge */}
        {stay.badge && (
          <div style={{ position: "absolute", top: "12px", left: "12px" }}>
            <Badge variant="olive">{stay.badge}</Badge>
          </div>
        )}

        {/* Save Wishlist Button */}
        <button
          onClick={toggleSave}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: isSaved ? "var(--rabari-red)" : "var(--aravalli-stone)",
            transition: "all 0.15s ease",
          }}
          aria-label="Save to wishlist"
        >
          <Heart size={18} fill={isSaved ? "var(--rabari-red)" : "none"} />
        </button>
      </div>

      {/* Details Container */}
      <div
        style={{
          flex: 1,
          padding: "22px 26px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Header Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  color: "var(--aravalli-stone)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {stay.type}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isGrid ? "var(--text-lg)" : "var(--text-xl)",
                  fontWeight: 600,
                  color: "var(--deep-olive)",
                  marginTop: "2px",
                  lineHeight: 1.2,
                }}
              >
                {stay.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                  marginTop: "6px",
                }}
              >
                <MapPin
                  size={13}
                  style={{ color: "var(--warm-gold)", flexShrink: 0 }}
                />
                <span>{stay.location}</span>
                {stay.distance && <span>• {stay.distance}</span>}
              </div>
            </div>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: "rgba(216, 193, 51, 0.15)",
                border: "1px solid rgba(216, 193, 51, 0.4)",
                color: "#524500",
                padding: "4px 8px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
              }}
            >
              <Star
                size={13}
                fill="var(--leopard-ochre)"
                stroke="var(--leopard-ochre)"
              />
              <span>{stay.rating}</span>
            </div>
          </div>

          {/* Amenities preview */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            {stay.tags?.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  background: "var(--dusky-ivory)",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border-light)",
                }}
              >
                ✦ {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Pricing & Action */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-light)",
          }}
        >
          <div>
            {stay.originalPrice && (
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--aravalli-stone)",
                  textDecoration: "line-through",
                  marginRight: "6px",
                }}
              >
                ₹{stay.originalPrice.toLocaleString()}
              </span>
            )}
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "4px" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-2xl)",
                  fontWeight: 700,
                  color: "var(--deep-olive)",
                }}
              >
                ₹{stay.pricePerNight.toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                }}
              >
                / night
              </span>
            </div>
            <span style={{ fontSize: "11px", color: "var(--aravalli-stone)" }}>
              Excl. taxes & fees
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            iconRight={<ArrowRight size={14} />}
            onClick={handleCardClick}
          >
            View Deal
          </Button>
        </div>
      </div>
    </Card>
  );
}

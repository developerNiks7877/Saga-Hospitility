import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ExpandableJournalCards({ cards }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelect = (slug) => {
    const next = selectedCard === slug ? null : slug;
    setSelectedCard(next);

    if (next) {
      window.requestAnimationFrame(() => {
        document
          .querySelector(`[data-journal-card="${next}"]`)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
      });
    }
  };

  return (
    <div className="expandable-journal-viewport" data-scroll-reveal>
      <div className="expandable-journal-track" aria-label="Featured stories">
        {cards.map((card, index) => {
          const isSelected = selectedCard === card.slug;

          return (
            <article
              className={`expandable-journal-card${isSelected ? " is-selected" : ""}`}
              data-journal-card={card.slug}
              key={card.slug}
            >
              <button
                className="expandable-journal-face"
                type="button"
                aria-expanded={isSelected}
                aria-controls={`journal-copy-${card.slug}`}
                onClick={() => handleSelect(card.slug)}
              >
                {card.image && (
                  <img
                    src={card.image}
                    alt=""
                    loading="eager"
                    fetchPriority={index < 3 ? "high" : "auto"}
                    decoding="async"
                    draggable="false"
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (image.dataset.driveFallbackTried) return;
                      image.dataset.driveFallbackTried = "true";
                      const fileId = card.image.match(/\/d\/([^=]+)/)?.[1];
                      if (fileId) image.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
                    }}
                  />
                )}
                <span className="expandable-journal-number">0{index + 1}</span>
                <span className="expandable-journal-category">
                  {card.category}
                </span>
                <span className="expandable-journal-title">{card.title}</span>
                <span className="expandable-journal-hint">
                  {isSelected ? "CLOSE STORY" : "SELECT TO EXPLORE"}
                </span>
              </button>

              <div
                className="expandable-journal-copy"
                id={`journal-copy-${card.slug}`}
                aria-hidden={!isSelected}
              >
                <span className="expandable-journal-copy-kicker">
                  A SAGA JOURNAL
                </span>
                <h3>{card.title}</h3>
                <p>{card.excerpt}</p>
                <Link to={`/blog/${card.slug}`} tabIndex={isSelected ? 0 : -1}>
                  READ FULL STORY <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

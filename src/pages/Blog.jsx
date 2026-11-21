import React, { useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { publicAsset } from '../utils/publicAsset';
import PublicFooter from '../components/PublicFooter';
import './Blog.css';

export default function Blog() {
  useEffect(() => {
    document.title = 'The Saga Journal | SAGA Hospitality';
    return () => {
      document.title = 'Luxury Heritage Hospitality in Rajasthan | SAGA Hospitality';
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const journalList = document.querySelector('.journal-list');
    const roadPath = document.querySelector('.journal-road-progress');
    const roadMarker = document.querySelector('.journal-road-marker');
    const cards = document.querySelectorAll('.journal-card');
    let revealLine = null;
    let animationFrame = 0;
    let initializationFrame = 0;
    let finalInitializationFrame = 0;
    let currentPath = '';
    let roadInitialized = false;
    let userHasScrolled = false;
    const cardRevealLead = 140;

    const updateRoadProgress = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        if (journalList) {
          const bounds = journalList.getBoundingClientRect();
          if (userHasScrolled) revealLine = window.innerHeight * 0.5;
          else if (revealLine === null) revealLine = bounds.top;
          const mobileLayout = window.matchMedia('(max-width: 760px)').matches;
          const points = Array.from(cards, (card, index) => {
            const cardBounds = card.getBoundingClientRect();
            return {
              x: mobileLayout ? -1 : index % 2 === 0 ? 32 : 68,
              y: Math.max(0, Math.min(1000, ((cardBounds.top + cardBounds.height / 2 - bounds.top) / bounds.height) * 1000)),
            };
          });
          const anchors = [{ x: 50, y: 0 }, ...points, { x: 50, y: 1000 }];
          const route = anchors.flatMap((point, index) => {
            if (!mobileLayout || index === anchors.length - 1) return [point];
            const next = anchors[index + 1];
            const bulge = index % 2 === 0 ? 30 : -30;
            return [point, { x: points.length ? Math.max(-32, Math.min(132, (point.x + next.x) / 2 + bulge)) : 50, y: (point.y + next.y) / 2 }];
          });
          const pathData = route.slice(1).reduce((path, point, index) => {
            const previous = route[index];
            const before = route[Math.max(0, index - 1)];
            const after = route[Math.min(route.length - 1, index + 2)];
            const controlOne = { x: previous.x + (point.x - before.x) / 6, y: previous.y + (point.y - before.y) / 6 };
            const controlTwo = { x: point.x - (after.x - previous.x) / 6, y: point.y - (after.y - previous.y) / 6 };
            return `${path} C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, ${point.x} ${point.y}`;
          }, `M ${route[0].x} ${route[0].y}`);
          if (pathData !== currentPath) {
            document.querySelectorAll('.journal-road-base, .journal-road-progress').forEach((path) => path.setAttribute('d', pathData));
            currentPath = pathData;
          }
          if (userHasScrolled) {
            cards.forEach((card, index) => {
              const cardBounds = card.getBoundingClientRect();
              card.classList.toggle(
                'is-visible',
                index === 0 || cardBounds.top + cardBounds.height / 2 <= revealLine + cardRevealLead,
              );
            });
          }
          if (roadPath && roadMarker) {
            const length = roadPath.getTotalLength();
            const targetY = userHasScrolled
              ? Math.max(0, Math.min(1000, ((revealLine - bounds.top) / bounds.height) * 1000))
              : 0;
            let low = 0;
            let high = length;
            for (let step = 0; step < 18; step += 1) {
              const middle = (low + high) / 2;
              if (roadPath.getPointAtLength(middle).y < targetY) low = middle;
              else high = middle;
            }
            const position = (low + high) / 2;
            const point = roadPath.getPointAtLength(position);
            if (!roadInitialized) roadPath.style.transition = 'none';
            roadPath.style.strokeDasharray = `${length}`;
            roadPath.style.strokeDashoffset = `${length - position}`;
            if (!roadInitialized) {
              window.requestAnimationFrame(() => roadPath.style.removeProperty('transition'));
              roadInitialized = true;
            }
            roadMarker.setAttribute('cx', `${point.x}`);
            roadMarker.setAttribute('cy', `${point.y}`);
          }
        }
        animationFrame = 0;
      });
    };

    const beginScrollReveal = () => {
      if (userHasScrolled) return;
      userHasScrolled = true;
      revealLine = window.innerHeight * 0.5;
    };

    const beginWithScrollKey = (event) => {
      if (['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) beginScrollReveal();
    };

    initializationFrame = window.requestAnimationFrame(() => {
      finalInitializationFrame = window.requestAnimationFrame(() => {
        revealLine = journalList?.getBoundingClientRect().top ?? 0;
        updateRoadProgress();
        window.addEventListener('scroll', updateRoadProgress, { passive: true });
        window.addEventListener('wheel', beginScrollReveal, { passive: true });
        window.addEventListener('touchmove', beginScrollReveal, { passive: true });
        window.addEventListener('keydown', beginWithScrollKey);
        window.addEventListener('resize', updateRoadProgress);
      });
    });

    return () => {
      window.removeEventListener('scroll', updateRoadProgress);
      window.removeEventListener('wheel', beginScrollReveal);
      window.removeEventListener('touchmove', beginScrollReveal);
      window.removeEventListener('keydown', beginWithScrollKey);
      window.removeEventListener('resize', updateRoadProgress);
      if (initializationFrame) window.cancelAnimationFrame(initializationFrame);
      if (finalInitializationFrame) window.cancelAnimationFrame(finalInitializationFrame);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="journal-page">
      <header className="journal-header">
        <Link className="journal-logo" to="/" aria-label="SAGA Hospitality home">
          <img src={publicAsset('/assets/logo/saga-hospitality-logo.png')} alt="SAGA Hospitality" />
        </Link>
        <Link className="journal-home-link" to="/">BACK TO HOME</Link>
      </header>

      <section className="journal-page-heading">
        <span>THE SAGA JOURNAL</span>
        <h1>Blogs</h1>
        <p>Stories of place, people and time well spent across Jawai and Rajasthan.</p>
        <nav className="journal-toc" aria-label="Explore stories">
          <span>EXPLORE STORIES</span>
          {blogPosts.map((post, index) => (
            <a
              key={post.slug}
              href={`#${post.slug}`}
              onClick={() => document.getElementById(post.slug)?.classList.add('is-visible')}
            >
              <small>{String(index + 1).padStart(2, '0')}</small>{post.title}
            </a>
          ))}
        </nav>
      </section>

      <section className="journal-list" aria-label="All blog stories">
        <div className="journal-road" aria-hidden="true">
          <svg viewBox="0 0 100 1000" preserveAspectRatio="none" role="presentation">
            <path className="journal-road-base" d="M50 0 C50 35 8 50 10 105 S92 155 90 215 S8 265 10 325 S92 380 90 440 S8 495 10 555 S92 610 90 670 S8 725 10 785 S92 840 90 900 S28 955 50 1000" />
            <path className="journal-road-progress" strokeDasharray="0 99999" d="M50 0 C50 35 8 50 10 105 S92 155 90 215 S8 265 10 325 S92 380 90 440 S8 495 10 555 S92 610 90 670 S8 725 10 785 S92 840 90 900 S28 955 50 1000" />
            <circle className="journal-road-marker" cx="50" cy="0" r="4" />
          </svg>
        </div>
        {blogPosts.map((post, index) => (
          <article
            id={post.slug}
            className={`journal-card journal-reveal${index === 0 ? ' is-visible' : ''}`}
            key={post.slug}
          >
            <Link className="journal-card-link" to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
              <div className="journal-card-image-wrap">
                {post.image && (
                  <img
                    className="journal-card-image"
                    src={post.image}
                    alt=""
                    loading={[0, 1, 3, 4].includes(index) ? 'eager' : 'lazy'}
                    fetchPriority={index < 4 ? 'high' : 'auto'}
                    decoding="async"
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (image.dataset.driveFallbackTried) return;
                      image.dataset.driveFallbackTried = 'true';
                      const fileId = post.image.match(/\/d\/([^=]+)/)?.[1];
                      if (fileId) image.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
                    }}
                  />
                )}
                <span className="journal-card-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="journal-card-copy">
                <span className="journal-category">{post.category}</span>
                <h2>{post.title}</h2>
                <p className="journal-excerpt">{post.excerpt}</p>
                <span className="journal-read-link">READ THE STORY <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          </article>
        ))}
      </section>

      <PublicFooter />
    </main>
  );
}

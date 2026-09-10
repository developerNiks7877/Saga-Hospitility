import { useNavigate } from 'react-router-dom';
import './saga-home.css';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';



gsap.registerPlugin(ScrollTrigger, useGSAP);

const MEDIA = {
  intro:
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=90',
  leopard:
    'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=2200&q=90',

  float1:
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=90',
  float2:
    'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1400&q=90',
  float3:
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=90',
  float4:
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=90',
  float5:
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=90',
  float6:
    'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1400&q=90',

  gallery1:
    'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1800&q=90',
  gallery2:
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=90',
  gallery3:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90',
  gallery4:
    'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1800&q=90',
  gallery5:
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1800&q=90',
  gallery6:
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=90',
  gallery7:
    'https://images.unsplash.com/photo-1519955045385-7cdb8e07c7f7?auto=format&fit=crop&w=1800&q=90',
  gallery8:
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=90',
};

const gallerySlides = [
  [MEDIA.gallery1, MEDIA.gallery2],
  [MEDIA.gallery3, MEDIA.gallery4],
  [MEDIA.gallery5, MEDIA.gallery6],
  [MEDIA.gallery7, MEDIA.gallery8],
];

const experiences = [
  {
    title: 'Wilderness Drives',
    image: MEDIA.leopard,
    text:
      'Explore Jawai’s granite hills and grasslands in search of its resident wildlife, guided through an immersive journey into the landscape.',
  },
  {
    title: 'Temple Trail',
    image: MEDIA.float4,
    text:
      'Discover ancient shrines and temples woven into Jawai’s granite hills where spirituality, landscape and local tradition continue to meet.',
  },
  {
    title: 'Horse Riding',
    image: MEDIA.float5,
    text:
      'Ride through open trails, rocky outcrops and the raw wilderness of Jawai from an entirely different perspective.',
  },
  {
    title: 'Village Wander',
    image: MEDIA.float2,
    text:
      'Meet the communities of Jawai and discover everyday life, traditions and stories shaped by generations of belonging.',
  },
  {
    title: 'Walks & Hikes',
    image: MEDIA.float3,
    text:
      'Move slowly through granite formations and open terrain on guided walks that reveal the quieter details of Jawai.',
  },
];

function MenuIcon() {
  return (
    <span className="menu-lines">
      <i />
      <i />
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 42 18" aria-hidden="true">
      <path d="M1 9h37M31 2l7 7-7 7" />
    </svg>
  );
}

export default function SagaHome() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.defaults({
        invalidateOnRefresh: true,
      });

      /* HERO */
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=130%',
          scrub: 1.2,
          pin: true,
        },
      });

      heroTl
        .to(
          '.hero-media',
          {
            scale: 1.18,
            yPercent: 6,
            ease: 'none',
          },
          0
        )
        .to(
          '.hero-word',
          {
            yPercent: -35,
            opacity: 0,
            scale: 0.92,
            ease: 'none',
          },
          0
        )
        .to(
          '.hero-meta',
          {
            y: -80,
            opacity: 0,
            ease: 'none',
          },
          0
        )
        .to(
          '.hero-shade',
          {
            opacity: 0.62,
          },
          0
        );

      /* TEXT REVEALS */
      gsap.utils.toArray('.reveal-line').forEach((line) => {
        gsap.fromTo(
          line,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.35,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      /* INTRO IMAGE */
      gsap.fromTo(
        '.intro-image',
        {
          clipPath: 'inset(15% 15% 15% 15%)',
          scale: 1.15,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.intro-visual',
            start: 'top 85%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      /* WILDERNESS SPLIT */
      gsap.fromTo(
        '.wildlife-split-image img',
        {
          scale: 1.18,
          xPercent: -6,
        },
        {
          scale: 1,
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.wildlife-split',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        }
      );

      gsap.fromTo(
        '.wildlife-split-copy',
        { xPercent: 18 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.wildlife-split',
            start: 'top 95%',
            end: 'top 25%',
            scrub: 1.1,
          },
        }
      );

      gsap.fromTo(
        '.wildlife-split-copy > *',
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.wildlife-split',
            start: 'top 65%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      /* 6 FLOATING IMAGES */
      const experience = document.querySelector('.jawai-experience');
      const floatingPhotos = gsap.utils.toArray('.floating-photo');

      if (experience) {
        floatingPhotos.forEach((photo, index) => {
          const side = photo.dataset.side;
          const image = photo.querySelector('img');

          gsap.fromTo(
            photo,
            {
              xPercent: side === 'left' ? -42 : 42,
yPercent: 12,
opacity: 0,
rotate: side === 'left' ? -2 : 2,
            },
            {
              xPercent: 0,
              yPercent: 0,
              opacity: 1,
              rotate: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: experience,
                start: () => `top+=${index * 260} 75%`,
                end: () => `top+=${index * 260 + 550} 35%`,
                scrub: 1.2,
              },
            }
          );

          gsap.to(photo, {
            yPercent: index % 2 === 0 ? -18 : -12,
            ease: 'none',
            scrollTrigger: {
              trigger: experience,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5 + index * 0.08,
            },
          });

          if (image) {
            gsap.fromTo(
              image,
              {
                scale: 1.12,
                yPercent: -5,
              },
              {
                scale: 1,
                yPercent: 6,
                ease: 'none',
                scrollTrigger: {
                  trigger: experience,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.4,
                },
              }
            );
          }
        });

        ScrollTrigger.create({
          trigger: experience,
          start: 'top top',
          end: 'bottom bottom',
          pin: '.jawai-center-copy',
          pinSpacing: false,
        });

        gsap.fromTo(
          '.jawai-center-copy',
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: experience,
              start: 'top 70%',
              end: 'top 35%',
              scrub: 1,
            },
          }
        );
      }

      
      /* WALKING SAFARI PARALLAX */
      gsap.fromTo(
        '.walking-feature-image img',
        {
          scale: 1.15,
          yPercent: -5,
        },
        {
          scale: 1,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.walking-feature',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        '.walking-feature-copy > *',
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.walking-feature',
            start: 'top 70%',
            end: 'top 28%',
            scrub: 1,
          },
        }
      );

      /* 8 IMAGE GALLERY */
      const galleryPanels = gsap.utils.toArray('.saga-gallery-panel');

      if (galleryPanels.length > 1) {
        const galleryTween = gsap.to(galleryPanels, {
          xPercent: -100 * (galleryPanels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.saga-gallery',
            start: 'top top',
            end: () =>
              `+=${window.innerWidth * (galleryPanels.length - 1)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (galleryPanels.length - 1),
              duration: {
                min: 0.18,
                max: 0.45,
              },
              delay: 0.03,
              ease: 'power1.inOut',
            },
            onUpdate: (self) => {
              const index = Math.min(
                galleryPanels.length - 1,
                Math.round(
                  self.progress * (galleryPanels.length - 1)
                )
              );

              setGalleryIndex(index);
            },
          },
        });

        galleryPanels.forEach((panel) => {
          const images = panel.querySelectorAll('img');

          gsap.fromTo(
            images,
            { scale: 1.08 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: galleryTween,
                start: 'left 90%',
                end: 'right 10%',
                scrub: 1,
              },
            }
          );
        });
      }

      /* QUOTE */
      gsap.fromTo(
        '.founder-quote-inner > *',
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founder-quote',
            start: 'top 72%',
            once: true,
          },
        }
      );

      /* NAV */
      ScrollTrigger.create({
        trigger: '.intro-section',
        start: 'top 80',
        end: 'bottom 80',
        toggleClass: {
          targets: '.site-nav',
          className: 'nav-dark',
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);

      return () => {
        window.removeEventListener('load', refresh);
      };
    },
    {
      scope: root,
    }
  );

  const goTo = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div ref={root} className="saga-page">
      {/* Only styles not already kept in saga-home.css */}
      <style>{`
        .saga-gallery {
          position: relative;
          z-index: 1;
          height: 100vh;
          overflow: hidden;
          background: #f5f2eb;
          color: #2b2925;
        }

        .saga-gallery-top {
          position: absolute;
          z-index: 8;
          top: 8vh;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
        }

        .saga-gallery-top span {
          display: block;
          margin-bottom: 10px;
          font-family: "Garet", Arial, sans-serif;
          font-size: 8px;
          letter-spacing: .28em;
        }

        .saga-gallery-top h2 {
          margin: 0;
          font-family: "Bigila", "Times New Roman", serif;
          font-size: clamp(50px, 5vw, 84px);
          font-weight: 400;
          line-height: 1;
        }

        .saga-gallery-track {
          height: 100%;
          display: flex;
          width: max-content;
          will-change: transform;
        }

        .saga-gallery-panel {
          position: relative;
          flex: 0 0 100vw;
          width: 100vw;
          height: 100%;
          padding: 23vh 4.5vw 10vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.6vw;
          align-items: center;
        }

        .saga-gallery-frame {
          height: min(62vh, 650px);
          margin: 0;
          overflow: hidden;
          background: #ddd6c9;
        }

        .saga-gallery-frame:nth-child(2) {
          transform: translateY(4vh);
        }

        .saga-gallery-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
        }

        .saga-gallery-dots {
          position: absolute;
          z-index: 9;
          left: 50%;
          bottom: 5vh;
          transform: translateX(-50%);
          display: flex;
          gap: 11px;
        }

        .saga-gallery-dot {
          width: 7px;
          height: 7px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(43, 41, 37, .35);
          transition: transform .35s ease, background .35s ease;
        }

        .saga-gallery-dot.is-active {
          background: #2b2925;
          transform: scale(1.3);
        }

        .founder-quote {
          position: relative;
          z-index: 2;
          min-height: 92vh;
          padding: 12vh 8vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf9f6;
          color: #8f241b;
          text-align: center;
        }

        .founder-quote-inner {
          width: min(1250px, 86vw);
          margin: auto;
        }

        .founder-quote blockquote {
          margin: 0;
          font-family: "Garet", Arial, sans-serif;
          font-size: clamp(35px, 4vw, 68px);
          line-height: 1.17;
          font-weight: 400;
        }

        .founder-credit {
          margin-top: 52px;
          color: #302e2a;
        }

        .founder-credit strong,
        .founder-credit span {
          display: block;
          font-family: "Garet", Arial, sans-serif;
        }

        .founder-credit strong {
          font-size: 14px;
          font-weight: 600;
        }

        .founder-credit span {
          margin-top: 8px;
          font-size: 11px;
          opacity: .72;
        }

        .founder-signature {
          margin-top: 20px;
          color: #c49a48;
          font-family: "Bigila", "Times New Roman", serif;
          font-size: clamp(36px, 4vw, 70px);
          font-style: italic;
        }

        .saga-final-footer {
          position: relative;
          padding: 95px 5vw 44px;
          background: #3d362f;
          color: #f4efe8;
        }

        .saga-footer-brand {
          width: 150px;
          margin-bottom: 58px;
        }

        .saga-footer-rule {
          height: 1px;
          margin-bottom: 65px;
          background: rgba(255, 255, 255, .24);
        }

        .saga-footer-grid {
          display: grid;
          grid-template-columns: 1fr .75fr 1.45fr;
          gap: 8vw;
        }

        .saga-footer-grid h3 {
          margin: 0 0 30px;
          font-family: "Garet", Arial, sans-serif;
          font-size: 18px;
          font-weight: 400;
        }

        .saga-footer-grid p,
        .saga-footer-grid button,
        .saga-footer-grid label {
          font-family: "Garet", Arial, sans-serif;
          font-size: 11px;
          line-height: 1.75;
          color: inherit;
        }

        .saga-footer-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .saga-footer-newsletter input[type="email"] {
          width: 100%;
          height: 48px;
          padding: 0 22px;
          border: 1px solid rgba(255, 255, 255, .18);
          border-radius: 28px;
          outline: none;
          background: rgba(255, 255, 255, .16);
          color: white;
          font-family: "Garet", Arial, sans-serif;
        }

        .saga-footer-newsletter input::placeholder {
          color: rgba(255, 255, 255, .75);
        }

        .footer-accept {
          margin: 22px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-accept input {
          width: auto;
          height: auto;
        }

        .footer-signup {
          padding: 13px 26px;
          border: 1px solid rgba(255, 255, 255, .55);
        }

        .saga-footer-bottom {
          margin-top: 70px;
          display: flex;
          justify-content: space-between;
          font-family: "Garet", Arial, sans-serif;
          font-size: 8px;
          letter-spacing: .18em;
          opacity: .65;
        }

        @media (max-width: 700px) {
          .saga-gallery-panel {
            padding: 20vh 18px 12vh;
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .saga-gallery-frame {
            height: 32vh;
          }

          .saga-gallery-frame:nth-child(2) {
            transform: none;
          }

          .saga-gallery-top {
            top: 7vh;
          }

          .founder-quote {
            min-height: 80vh;
            padding: 90px 24px;
          }

          .founder-quote-inner {
            width: 100%;
          }

          .saga-footer-grid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .saga-footer-bottom {
            gap: 20px;
            flex-direction: column;
          }
        }
      `}</style>

      {/* NAV */}
      <header className="site-nav">
        <button
          className="menu-trigger"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
          <span>MENU</span>
        </button>

        <button
          className="site-logo"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <img
            src="/assets/logo/saga-jawai-logo.png"
            alt="SAGA JAWAI"
          />
        </button>

       
         <button
  type="button"
  className="nav-book"
  onClick={() => navigate('/rooms')}
>
  BOOK NOW
</button>
</header>
      {/* MENU */}
      <aside
        className={`menu-panel ${menuOpen ? 'is-open' : ''}`}
      >
        <div className="menu-panel-head">
          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            <span>×</span>
            CLOSE
          </button>

          <img
            src="/assets/logo/saga-jawai-logo.png"
            alt=""
          />
        </div>

        <nav className="overlay-navigation">
          <button onClick={() => goTo('story')}>
            <small>01</small>
            The Story
          </button>

          <button onClick={() => goTo('experience')}>
            <small>02</small>
            Experience
          </button>

          <button onClick={() => goTo('experiences')}>
            <small>03</small>
            Experiences
          </button>

          <button onClick={() => goTo('gallery')}>
            <small>04</small>
            Gallery
          </button>

          <button onClick={() => goTo('quote')}>
            <small>05</small>
            Our Philosophy
          </button>
        </nav>

        <div className="menu-panel-bottom">
          <span>JAWAI · RAJASTHAN · INDIA</span>
          <span>WILD BY NATURE</span>
        </div>
      </aside>

      <main>
        {/* HERO */}
        <section className="hero">
          <video
            className="hero-media hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source
              src="/assets/video/saga-jawai-hero.mp4"
              type="video/mp4"
            />
          </video>

          <div className="hero-shade" />

          <div className="hero-word">
            <img
              className="hero-main-logo"
              src="/assets/logo/saga-jawai-logo.png"
              alt="SAGA JAWAI"
            />
          </div>

          <div className="hero-meta">
            <span>25.1160° N</span>

            <p>
              A wilderness retreat
              <br />
              in Rajasthan
            </p>

            <span>73.1437° E</span>
          </div>

          <button
            className="hero-scroll"
            onClick={() => goTo('story')}
          >
            SCROLL TO DISCOVER
            <i />
          </button>
        </section>

        {/* INTRO */}
        <section
          id="story"
          className="intro-section editorial-section"
        >
          <div className="intro-number">01</div>

          <div className="intro-copy">
            <span className="eyebrow">SAGA JAWAI</span>

            <h2 className="editorial-title">
              <span className="mask">
                <span className="reveal-line">
                  RAJASTHAN'S
                </span>
              </span>

              <span className="mask">
                <span className="reveal-line">
                  WILDER SIDE,
                </span>
              </span>

              <span className="mask italic-line">
                <span className="reveal-line">
                  seen differently.
                </span>
              </span>
            </h2>

            <div className="intro-description">
              <p>
                In Jawai, wilderness and everyday life exist
                unusually close to one another.
              </p>

              <p>
                SAGA is conceived as a way of entering that
                landscape slowly — through its granite,
                wildlife, people and silence.
              </p>
            </div>
          </div>

          <div className="intro-visual">
            <img
              className="intro-image"
              src={MEDIA.intro}
              alt="Jawai landscape"
            />

            <span className="vertical-label">
              JAWAI · RAJASTHAN
            </span>
          </div>
        </section>

        {/* WILDERNESS SAFARI */}
        <section className="wildlife-split">
          <div className="wildlife-split-image">
            <img
              src={MEDIA.leopard}
              alt="Leopard in the Jawai wilderness"
            />
          </div>

          <div className="wildlife-split-copy">
            <span className="wildlife-kicker">
              WILDERNESS SAFARIS
            </span>

            <h2>
              Up close encounters
              <br />
              with Indian wildlife.
            </h2>

            <p>
              Venture into Jawai's granite wilderness where
              leopard trails, open grasslands and local life
              exist within the same remarkable landscape.
              Guided safari drives reveal the character of
              Jawai slowly, naturally and at close range.
            </p>

            <button className="wildlife-link">
              EXPLORE THE WILDERNESS
              <Arrow />
            </button>
          </div>
        </section>

        {/* 6 FLOATING IMAGES */}
        <section
          id="experience"
          className="jawai-experience"
        >
          <div className="jawai-center-copy">
            <span className="eyebrow">
              EXPERIENCE JAWAI
            </span>

            <h2>
              Rajasthan's most unique
              <br />
              <em>safari experience.</em>
            </h2>

            <p>
              Framed by granite hills and the ancient Aravalli
              landscape, Jawai brings wildlife and rural life
              unusually close together. Encounters with the
              wild are complemented by meaningful connections
              with the land, its people and its enduring
              culture.
            </p>
          </div>

          {[
            [MEDIA.float1, 'left'],
            [MEDIA.float2, 'right'],
            [MEDIA.float3, 'left'],
            [MEDIA.float4, 'right'],
            [MEDIA.float5, 'left'],
            [MEDIA.float6, 'right'],
          ].map(([image, side], index) => (
            <figure
              className={`floating-photo float-${index + 1}`}
              data-side={side}
              key={image}
            >
              <img src={image} alt="" />
            </figure>
          ))}
        </section>

        {/* EXPERIENCES HORIZONTAL */}
        <section
          id="experiences"
          className="experiences-showcase"
        >
          <div className="experiences-head">
            <span>EXPERIENCES</span>

            <p>
              At SAGA Jawai, every experience is an invitation
              to explore the untamed beauty of this
              unforgettable wilderness. Each moment connects
              you with the land, its wildlife and the people
              who shape this extraordinary place.
            </p>
          </div>

          <div className="experiences-track">
            {experiences.map((item) => (
              <article
                className="experience-slide-card"
                key={item.title}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="experience-slide-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* WALKING WITH THE RABARI */}
        <section className="walking-feature">
          <div className="walking-feature-copy">
            <span>WALKING SAFARIS</span>

            <h2>
              Walking with the
              <br />
              Rabari tribe
            </h2>

            <div className="walking-mark">✦</div>

            <p>
              Step into the timeless world of the Rabari
              community. Walk through Jawai’s rugged landscape
              alongside local herdsmen and discover traditions,
              stories and an enduring relationship with the
              land.
            </p>
          </div>

          <div className="walking-feature-image">
            <img
              src={MEDIA.float4}
              alt="Walking with the Rabari community"
            />
          </div>
        </section>

        {/* 8 IMAGE GALLERY */}
        <section
          id="gallery"
          className="saga-gallery"
        >
          <div className="saga-gallery-top">
            <span>SAGA JAWAI</span>
            <h2>Gallery</h2>
          </div>

          <div className="saga-gallery-track">
            {gallerySlides.map((slide, slideIndex) => (
              <div
                className="saga-gallery-panel"
                key={slideIndex}
              >
                {slide.map((image, imageIndex) => (
                  <figure
                    className="saga-gallery-frame"
                    key={image}
                  >
                    <img
                      src={image}
                      alt={`SAGA Jawai gallery ${
                        slideIndex * 2 + imageIndex + 1
                      }`}
                    />
                  </figure>
                ))}
              </div>
            ))}
          </div>

          <div className="saga-gallery-dots">
            {gallerySlides.map((_, i) => (
              <button
                key={i}
                className={`saga-gallery-dot ${
                  galleryIndex === i ? 'is-active' : ''
                }`}
                aria-label={`Gallery slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* SAGA STATEMENT */}
        <section
          id="quote"
          className="founder-quote"
        >
          <div className="founder-quote-inner">
            <blockquote>
              “SAGA JAWAI is inspired by the granite hills of
              the region, the leopards and the communities that
              call this remarkable landscape home. Every
              journey here is shaped by a deep respect for the
              land, its wildlife and the people who have lived
              alongside it for generations.”
            </blockquote>

            <div className="founder-credit">
              <strong>SAGA JAWAI</strong>
              <span>
                Wild by Nature · Rooted in Purpose
              </span>
            </div>

            <div className="founder-signature">
              Saga Jawai
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="saga-final-footer">
        <img
          className="saga-footer-brand"
          src="/assets/logo/saga-jawai-logo.png"
          alt="SAGA JAWAI"
        />

        <div className="saga-footer-rule" />

        <div className="saga-footer-grid">
          <div>
            <h3>Contact Us</h3>

            <p>
              Reservations
              <br />
              Jawai, Rajasthan
              <br />
              India
            </p>

            <button className="footer-signup">
              CONTACT US
            </button>
          </div>

          <div>
            <h3>Explore</h3>

            <div className="saga-footer-links">
              <button onClick={() => goTo('story')}>
                OUR STORY
              </button>

              <button onClick={() => goTo('experience')}>
                EXPERIENCE
              </button>

              <button onClick={() => goTo('experiences')}>
                EXPERIENCES
              </button>

              <button onClick={() => goTo('gallery')}>
                GALLERY
              </button>

              <button onClick={() => goTo('quote')}>
                OUR PHILOSOPHY
              </button>
            </div>
          </div>

          <div className="saga-footer-newsletter">
            <h3>Stay Connected with SAGA</h3>

            <p>
              Share your email with us to receive stories,
              travel inspiration and updates from the world of
              SAGA JAWAI.
            </p>

            <input
              type="email"
              placeholder="EMAIL ADDRESS"
            />

            <label className="footer-accept">
              <input type="checkbox" />
              <span>
                I accept the Terms & Conditions
              </span>
            </label>

            <button className="footer-signup">
              SIGN UP
            </button>
          </div>
        </div>

        <div className="saga-footer-bottom">
          <span>© 2026 SAGA JAWAI</span>
          <span>JAWAI · RAJASTHAN · INDIA</span>
        </div>
      </footer>
    </div>
  );
}

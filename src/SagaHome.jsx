import { useNavigate } from 'react-router-dom';
import { publicAsset } from './utils/publicAsset';
import './saga-home.css';
import { hotelData } from './data/hotelData';
import React, { useEffect, useRef, useState } from 'react';
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
  [publicAsset('/assets/gallery/gallery-01.jpg'), publicAsset('/assets/gallery/gallery-02.jpg')],
  [publicAsset('/assets/gallery/gallery-03.jpg'), publicAsset('/assets/gallery/gallery-04.jpg')],
  [publicAsset('/assets/gallery/gallery-05.jpg'), publicAsset('/assets/gallery/gallery-06.jpg')],
  [publicAsset('/assets/gallery/gallery-07.jpg'), publicAsset('/assets/gallery/gallery-08.jpg')],
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

  /* Lock the page completely while fullscreen menu is open */
  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);

  useGSAP(
    () => {
      const isMobile = window.matchMedia(
        '(max-width: 760px), (pointer: coarse)'
      ).matches;
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      ScrollTrigger.defaults({
        invalidateOnRefresh: true,
      });

      /* HERO */
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: isMobile ? '+=65%' : '+=130%',
          scrub: isMobile ? 0.35 : 1.2,
          pin: !isMobile && !prefersReducedMotion,
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
          '.floating-saga-logo',
          {
            top: () =>
              window.innerWidth <= 700
                ? '38px'
                : '36px',
            width: () =>
              window.innerWidth <= 700
                ? '85px'
                : '110px',
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
          scrub: isMobile ? 0.25 : 1,
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
          scrub: isMobile ? 0.25 : 1.4,
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
          scrub: isMobile ? 0.25 : 1.1,
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
          scrub: isMobile ? 0.25 : 1,
          },
        }
      );


      /* =========================================
         SAGA — CINEMATIC CENTER CAROUSEL
         Smooth glide + progressive depth blur
      ========================================= */

      const orbitSection =
        document.querySelector('.jawai-orbit-experience');

      const orbitCards =
        gsap.utils.toArray('.jawai-orbit-photo');

      if (orbitSection && orbitCards.length) {

        const total = orbitCards.length;

        let position = 0;
        let selectedIndex = 0;
        let motionTween = null;
        let autoTimer = null;
        let sectionVisible = false;
        let interactionActive = false;
        const canAutoPlay = !isMobile && !prefersReducedMotion;

        const wrap = (value) =>
          ((value % total) + total) % total;

        const distanceToPosition = (index, pos) => {
          let distance = index - pos;

          while (distance > total / 2) {
            distance -= total;
          }

          while (distance < -total / 2) {
            distance += total;
          }

          return distance;
        };

        const renderCarousel = () => {

          const mobile =
            window.innerWidth <= 760;

          orbitCards.forEach((card, index) => {

            const distance =
              distanceToPosition(index, position);

            const abs =
              Math.abs(distance);

            const direction =
              distance < 0 ? -1 : 1;

            /*
             * Horizontal cinematic layout
             *
             * 0 = hero
             * 1 = clear side card
             * 2 = softer background
             * 3 = blurred distant card
             */

            let x;
            let y;
            let z;
            let scale;
            let opacity;
            let blur;
            let rotateY;

            if (abs <= 1) {

              /*
               * Most important interpolation.
               *
               * Image doesn't POP into center.
               * Scale continuously grows while
               * travelling toward x = 0.
               */

              const t =
                1 - abs;

              const smoothT =
                t * t * (3 - 2 * t);

              x =
                distance *
                (mobile ? 145 : 355);

              y =
                (1 - smoothT) *
                (mobile ? 20 : 30);

              z =
                -80 +
                smoothT * 260;

              scale =
                (mobile ? 0.78 : 0.80) +
                smoothT *
                (mobile ? 0.62 : 0.76);

              opacity =
                0.86 +
                smoothT * 0.14;

              blur =
                (1 - smoothT) * 0.15;

              rotateY =
                -distance *
                (mobile ? 4 : 6);

            } else {

              const depth =
                abs - 1;

              const spacing =
                mobile ? 92 : 185;

              x =
                direction *
                (
                  (mobile ? 145 : 355) +
                  depth * spacing
                );

              y =
                (mobile ? 20 : 30) +
                depth *
                (mobile ? 10 : 14);

              z =
                -80 -
                depth * 145;

              scale =
                Math.max(
                  mobile ? 0.42 : 0.43,
                  (mobile ? 0.78 : 0.80) -
                  depth * 0.15
                );

              opacity =
                Math.max(
                  0,
                  0.86 -
                  depth * 0.23
                );

              /*
               * First left/right images stay sharp.
               * Blur begins BEHIND those cards.
               */

              blur =
                Math.max(
                  0,
                  (depth - 0.15) * 2.1
                );

              rotateY =
                direction *
                -(mobile ? 9 : 13);
            }

            const visible =
              abs < (mobile ? 3.1 : 4.1);

            gsap.set(card, {
              x,
              y,
              z,
              scale,
              opacity:
                visible
                  ? opacity
                  : 0,

              rotateY,
              rotateZ: 0,

              filter:
                `blur(${blur}px)`,

              visibility:
                visible
                  ? 'visible'
                  : 'hidden',

              pointerEvents:
                abs <= 2.2
                  ? 'auto'
                  : 'none',

              zIndex:
                Math.round(
                  200 - abs * 25
                ),

              transformPerspective: 1400,
              transformOrigin: '50% 50%',
              force3D: true,
            });

            const isCenter =
              abs < 0.08;

            card.classList.toggle(
              'is-selected',
              isCenter
            );

            if (isCenter) {
              selectedIndex = index;
            }
          });
        };


        let autoIndex = selectedIndex;

        const scheduleAuto = () => {
          clearTimeout(autoTimer);

          if (interactionActive || !canAutoPlay || !sectionVisible) {
            return;
          }

          autoTimer = setTimeout(() => {
            if (interactionActive) {
              scheduleAuto();
              return;
            }

            autoIndex = wrap(autoIndex + 1);

            moveTo(autoIndex, false);
          }, 2600);
        };


        const moveTo = (
          index,
          fromClick = false
        ) => {

          clearTimeout(autoTimer);

          if (motionTween) {
            motionTween.kill();
          }

          const distance =
            distanceToPosition(
              index,
              position
            );

          if (
            Math.abs(distance) < 0.015
          ) {
            selectedIndex = index;
            scheduleAuto();
            return;
          }

          interactionActive = true;

          if (fromClick) {
            orbitSection.classList.add(
              'has-selected-photo'
            );
          }

          const state = {
            value: position
          };

          const target =
            position + distance;

          motionTween =
            gsap.to(state, {

              value: target,

              /*
               * Slower luxury movement.
               * No spring / no popup.
               */
              duration:
                fromClick ? 1.35 : 1.55,

              ease:
                'power2.inOut',

              onUpdate: () => {

                position =
                  state.value;

                renderCarousel();
              },

              onComplete: () => {

                position = target;

                selectedIndex =
                  wrap(index);

                position =
                  selectedIndex;

                autoIndex =
                  selectedIndex;

                interactionActive = false;

                renderCarousel();

                scheduleAuto();
              },
            });
        };


        orbitCards.forEach(
          (card, index) => {

            card.setAttribute(
              'role',
              'button'
            );

            card.setAttribute(
              'tabindex',
              '0'
            );

            card.addEventListener(
              'click',
              () => {

                if (interactionActive) {
                  return;
                }

                moveTo(index, true);
              }
            );

            card.addEventListener(
              'keydown',
              (event) => {

                if (
                  event.key === 'Enter' ||
                  event.key === ' '
                ) {

                  event.preventDefault();

                  if (!interactionActive) {
                    moveTo(index, true);
                  }
                }
              }
            );
          }
        );


        /*
         * Render immediately.
         * No blank frame / no entrance pop.
         */
        renderCarousel();

        /*
         * Start continuous autoplay.
         */
        autoIndex = selectedIndex;
        scheduleAuto();


        /*
         * Visibility watcher.
         */
        ScrollTrigger.create({

          trigger: orbitSection,

          start: 'top 85%',
          end: 'bottom 15%',

          onEnter: () => {
            sectionVisible = true;
            scheduleAuto();
          },

          onEnterBack: () => {
            sectionVisible = true;
            scheduleAuto();
          },

          onLeave: () => {
            sectionVisible = false;
            clearTimeout(autoTimer);
          },

          onLeaveBack: () => {
            sectionVisible = false;
            clearTimeout(autoTimer);
          },
        });


        /*
         * Keep your existing short pin behaviour.
         */
        if (!isMobile && !prefersReducedMotion) ScrollTrigger.create({

          trigger: orbitSection,

          start: 'top top',

          end: '+=10%',

          pin: true,

          pinSpacing: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onRefresh: renderCarousel,
        });


        window.addEventListener(
          'resize',
          renderCarousel
        );
      }



      /* =========================================
         NAV LOGO VISIBILITY — ORBIT BOUNDARY
      ========================================= */

      const orbitLogoBoundary =
        document.querySelector('.jawai-orbit-experience');

      const siteNavigation =
        document.querySelector('.site-nav');

      if (orbitLogoBoundary && siteNavigation) {

        ScrollTrigger.create({
          trigger: orbitLogoBoundary,

          start: 'bottom top',

          onEnter: () => {
            siteNavigation.classList.add(
              'nav-after-orbit'
            );
          },

          onLeaveBack: () => {
            siteNavigation.classList.remove(
              'nav-after-orbit'
            );
          },

          onRefresh: (self) => {
            siteNavigation.classList.toggle(
              'nav-after-orbit',
              self.progress === 1 &&
              self.direction >= 0
            );
          },
        });
      }



      /* =============================================
         FINAL NAV LOGO VISIBILITY
         Logo visible through 3D Orbit.
         Hidden everywhere AFTER orbit.
         Shows again when scrolling back to orbit.
      ============================================= */

      const updateNavLogoAfterOrbit = () => {
        const orbit =
          document.querySelector(
            '.jawai-orbit-experience'
          );

        if (!orbit) return;

        const orbitBottom =
          orbit.getBoundingClientRect().bottom;

        /*
         * Once bottom edge of orbit has passed
         * the top of viewport, we're below orbit.
         */
        const pastOrbit = orbitBottom <= 1;

        document.body.classList.toggle(
          'saga-past-orbit',
          pastOrbit
        );
      };

      updateNavLogoAfterOrbit();

      window.addEventListener(
        'scroll',
        updateNavLogoAfterOrbit,
        { passive: true }
      );

      window.addEventListener(
        'resize',
        updateNavLogoAfterOrbit
      );


      /* 8 IMAGE GALLERY */
      const galleryPanels = gsap.utils.toArray('.saga-gallery-panel');

      if (galleryPanels.length > 1 && !isMobile && !prefersReducedMotion) {
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

        window.removeEventListener(
          'scroll',
          updateNavLogoAfterOrbit
        );

        window.removeEventListener(
          'resize',
          updateNavLogoAfterOrbit
        );

        document.body.classList.remove(
          'saga-past-orbit'
        );
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


        /* ==========================================
           JAWAI WILDLIFE FOOTER TRANSITION
           ========================================== */

        .footer-wildlife {
          position: relative;
          width: calc(100% + 10vw);
          height: 255px;
          margin: -5vw -5vw 52px;
          overflow: hidden;
          isolation: isolate;
          pointer-events: none;
        }

        .footer-wildlife::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 95px;
          background:
            linear-gradient(
              to bottom,
              rgba(57, 50, 42, 0),
              rgba(57, 50, 42, 0.5) 40%,
              #39322a 100%
            );
          z-index: 4;
        }

        /* MAIN LEOPARD */

        .footer-main-leopard {
          position: absolute;
          z-index: 3;
          right: 8%;
          bottom: 15px;

          width: clamp(290px, 29vw, 470px);
          height: auto;

          object-fit: contain;
          object-position: bottom;

          filter:
            saturate(0.78)
            contrast(0.96)
            brightness(0.82);

          transform: translateZ(0);
        }

        /* subtle shadow so leopard sits in landscape */

        .footer-main-leopard::after {
          content: "";
        }

        /* GRANITE FORMS */

        .footer-granite {
          position: absolute;
          bottom: 29px;
          z-index: 1;

          background: #51483e;
          opacity: 0.88;

          border-radius:
            54% 46% 18% 20% /
            70% 65% 20% 20%;
        }

        .footer-granite-left {
          left: -4%;
          width: 260px;
          height: 77px;
          transform: rotate(-3deg);
        }

        .footer-granite-mid {
          left: 35%;
          width: 170px;
          height: 52px;
          opacity: 0.58;
          transform: rotate(4deg);
        }

        .footer-granite-right {
          right: -2%;
          width: 225px;
          height: 68px;
          opacity: 0.72;
          transform: rotate(2deg);
        }

        /* GROUND */

        .footer-wildlife-ground {
          position: absolute;
          z-index: 5;
          left: 0;
          right: 0;
          bottom: 0;

          height: 34px;

          background: #39322a;

          border-radius:
            52% 48% 0 0 /
            45% 42% 0 0;
        }

        /* GRASS */

        .footer-grass {
          position: absolute;
          z-index: 2;
          bottom: 25px;

          width: 95px;
          height: 55px;

          opacity: 0.72;

          background:
            linear-gradient(
              76deg,
              transparent 45%,
              #51483e 46%,
              #51483e 51%,
              transparent 52%
            ),
            linear-gradient(
              98deg,
              transparent 46%,
              #51483e 47%,
              #51483e 51%,
              transparent 52%
            ),
            linear-gradient(
              112deg,
              transparent 46%,
              #51483e 47%,
              #51483e 51%,
              transparent 52%
            );
        }

        .footer-grass-one {
          left: 13%;
          transform: scale(1.2);
        }

        .footer-grass-two {
          left: 27%;
          transform: scale(.72);
        }

        .footer-grass-three {
          left: 52%;
          transform: scale(.9);
        }

        .footer-grass-four {
          right: 4%;
          transform: scale(1.05);
        }

        /* MINIMAL FLYING BIRDS */

        .footer-bird {
          position: absolute;
          z-index: 2;

          width: 27px;
          height: 10px;

          opacity: 0.5;
        }

        .footer-bird::before,
        .footer-bird::after {
          content: "";
          position: absolute;
          top: 2px;

          width: 15px;
          height: 7px;

          border-top: 2px solid #8e7c67;
          border-radius: 50%;
        }

        .footer-bird::before {
          left: 0;
          transform: rotate(13deg);
        }

        .footer-bird::after {
          right: 0;
          transform: rotate(-13deg);
        }

        .bird-1 {
          left: 20%;
          top: 55px;
          transform: scale(.85);
        }

        .bird-2 {
          left: 27%;
          top: 90px;
          transform: scale(.55);
        }

        .bird-3 {
          left: 43%;
          top: 42px;
          transform: scale(.7);
        }

        /* DESKTOP HOVER DETAIL */

        @media (hover: hover) {
          .footer-main-leopard {
            transition:
              transform 1.2s cubic-bezier(.2,.7,.2,1),
              filter 1.2s ease;
          }

          .saga-final-footer:hover .footer-main-leopard {
            transform: translateX(-10px);
            filter:
              saturate(.9)
              contrast(1)
              brightness(.88);
          }
        }

        /* TABLET */

        @media (max-width: 900px) {
          .footer-wildlife {
            height: 215px;
            margin-bottom: 38px;
          }

          .footer-main-leopard {
            width: clamp(260px, 42vw, 380px);
            right: 2%;
          }

          .footer-granite-mid {
            display: none;
          }

          .bird-3 {
            display: none;
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .footer-wildlife {
            height: 175px;
            margin-bottom: 28px;
          }

          .footer-main-leopard {
            width: 245px;
            max-width: 67vw;
            right: -5%;
            bottom: 10px;
          }

          .footer-granite-left {
            width: 180px;
            height: 55px;
          }

          .footer-granite-right {
            width: 130px;
            height: 45px;
          }

          .footer-grass-two,
          .footer-grass-three {
            display: none;
          }

          .bird-1 {
            left: 22%;
            top: 42px;
          }

          .bird-2 {
            left: 38%;
            top: 70px;
          }
        }


        /* =====================================================
           SAGA FOOTER — RUNNING LEOPARD DIVIDER
           ===================================================== */

        .footer-wildlife {
          display: none !important;
        }

        /* NEW FOOTER BRAND */

        .saga-footer-brand {
          display: block !important;
          width: clamp(110px, 9vw, 150px) !important;
          height: auto !important;
          object-fit: contain;
        }

        /* LEOPARD TRACK */

        

        /* actual divider line */

        

        /* MOVING LEOPARD */

        

        

        /*
         * Leopard starts completely outside left edge,
         * crosses the full divider and exits right.
         */

        @keyframes sagaLeopardWalk {
          0% {
            transform: translateX(-140px);
          }

          100% {
            transform: translateX(calc(100vw - 20px));
          }
        }

        /* subtle interaction */

        @media (hover: hover) {
          .saga-leopard-track:hover 
        }

        /* TABLET */

        @media (max-width: 900px) {

          

          

          @keyframes sagaLeopardWalk {
            0% {
              transform: translateX(-125px);
            }

            100% {
              transform: translateX(calc(100vw - 10px));
            }
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {

          .saga-footer-brand {
            width: 105px !important;
          }

          

          

          @keyframes sagaLeopardWalk {
            0% {
              transform: translateX(-105px);
            }

            100% {
              transform: translateX(calc(100vw + 5px));
            }
          }
        }

        /* Accessibility */

        @media (prefers-reduced-motion: reduce) {
          
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

        @media (max-width: 760px), (pointer: coarse) {
          .saga-gallery {
            height: auto;
            min-height: 0;
            overflow: hidden;
          }

          .saga-gallery-top {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            padding: 82px 18px 28px;
          }

          .saga-gallery-top h2 {
            font-size: clamp(52px, 14vw, 66px);
          }

          .saga-gallery-track {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: auto;
            gap: 0;
            transform: none !important;
            will-change: auto;
          }

          .saga-gallery-panel {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            padding: 0 18px 24px;
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .saga-gallery-frame {
            height: clamp(220px, 36svh, 320px);
          }

          .saga-gallery-frame:nth-child(2) {
            transform: none;
          }

          .saga-gallery-top {
            top: auto;
          }

          .saga-gallery-dots {
            display: none;
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
            src={publicAsset('/assets/logo/saga-jawai-logo.png')}
            alt=""
          />
        </div>

        <nav className="overlay-navigation">
        <button onClick={() => goTo('story')}>
          <small>01</small>The Story
        </button>

        <button onClick={() => goTo('experiences')}>
          <small>02</small>Curated Experiences
        </button>

        <button onClick={() => goTo('stay')}>
          <small>03</small>Stay at SAGA
        </button>

        <button onClick={() => goTo('gallery')}>
          <small>04</small>Gallery
        </button>

        <button onClick={() => goTo('local-welcome')}>
          <small>05</small>The Local Welcome
        </button>

        <button onClick={() => goTo('experience')}>
          <small>06</small>Safari Experience
        </button>

        <button onClick={() => goTo('quote')}>
          <small>07</small>Our Philosophy
        </button>
      </nav>

        <div className="menu-panel-bottom">
          <span>JAWAI · RAJASTHAN · INDIA</span>
          <span>WILD BY NATURE</span>
        </div>
      </aside>

      <button
        type="button"
        className="floating-saga-logo"
        aria-label="SAGA Hospitality — back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <img
          src={publicAsset('/assets/logo/saga-hospitality-logo.png')}
          alt="SAGA Hospitality"
        />
      </button>

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
              src={publicAsset('/assets/video/saga-jawai-hero.mp4')}
              type="video/mp4"
            />
          </video>

          <div className="hero-shade" />



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

        {/* HOSPITALITY STORY */}
        <section
          id="story"
          className="hospitality-story"
        >
          <div className="hospitality-copy">
            

            <h2>
              A Legacy of
              <br />
              Wild Hospitality
            </h2>

            <div className="hospitality-text">
              <p>
                SAGA is shaped by a landscape where
                granite hills, wildlife and village life have
                existed side by side for generations.
              </p>

              <p>
                Our approach to hospitality is rooted in this
                rhythm — thoughtful spaces, considered
                experiences and a deeper connection with the land.
              </p>

              <p>
                Every stay is designed to let Jawai unfold
                naturally, balancing quiet luxury with the raw
                character of Rajasthan.
              </p>
            </div>

            <button
              type="button"
              className="hospitality-gallery-btn"
              onClick={() => goTo('gallery')}
            >
              View Gallery
            </button>
          </div>

          <div className="hospitality-collage">
            <figure className="hospitality-image hospitality-image-one">
              <img
                src={publicAsset('/assets/legacy/architecture.jpg')}
                alt="SAGA architecture"
              />
            </figure>

            <figure className="hospitality-image hospitality-image-two">
              <img
                src={publicAsset('/assets/legacy/interior.jpg')}
                alt="SAGA interior"
              />
            </figure>

            <figure className="hospitality-image hospitality-image-three">
              <img
                src={publicAsset('/assets/legacy/room.jpg')}
                alt="SAGA room"
              />
            </figure>

            <figure className="hospitality-image hospitality-image-four">
              <img
                src={publicAsset('/assets/legacy/landscape.jpg')}
                alt="SAGA landscape"
              />
            </figure>
          </div>
        </section>

        {/* EXPERIENCES — CINEMATIC FILM LIBRARY */}
        <section
          id="experiences"
          className="saga-film-experiences"
        >
          {(() => {
            const experiences = [
              {
                eyebrow: 'NATURAL WONDERS',
                title: 'Hidden Waters',
                text: 'A quieter side of Jawai, revealed where water meets the wilderness.',
                detail: 'Beyond the granite hills, flowing water brings an unexpected softness to the landscape — secluded, refreshing and shaped entirely by nature.',
                poster: publicAsset('/assets/legacy/landscape.jpg'),
              },
              {
                eyebrow: 'DESERT EVENINGS',
                title: 'Rajasthan at Dusk',
                text: 'Camels, open roads and journeys beneath the fading desert light.',
                detail: 'As evening settles over Rajasthan, travellers move through the landscape while the desert slowly changes colour beneath the setting sun.',
                poster: publicAsset('/assets/legacy/architecture.jpg'),
              },
              {
                eyebrow: 'ON THE ROAD',
                title: 'Roads of Rajasthan',
                text: 'Some journeys reveal the character of a place before you ever arrive.',
                detail: 'A jeep moves through the open road carrying the everyday energy, movement and character of Rajasthan.',
                poster: publicAsset('/assets/gallery/gallery-05.jpg'),
              },
              {
                eyebrow: 'EVERYDAY LIFE',
                title: 'A Simple Ritual',
                text: 'The smallest everyday moments often reveal the most about a place.',
                detail: 'At a village handpump, a quiet pause for water becomes a glimpse into a life grounded in simplicity and deeply connected to the land.',
                poster: publicAsset('/assets/gallery/gallery-08.jpg'),
              },
              {
                eyebrow: 'LIVING HERITAGE',
                title: 'Songs of the Land',
                text: 'Some stories of Rajasthan are remembered not in words, but in song.',
                detail: 'A local musician plays and sings, carrying traditions forward through melody, memory and the living culture of Rajasthan.',
                poster: publicAsset('/assets/gallery/gallery-02.jpg'),
              },
              {
                eyebrow: 'WILDLIFE',
                title: 'A Dance of Colour',
                text: 'For a brief moment, the wilderness unfolds in extraordinary colour.',
                detail: 'A peacock spreads its magnificent feathers against the earthy landscape — a vivid encounter with the quieter wildlife of the region.',
                poster: publicAsset('/assets/legacy/interior.jpg'),
              },
              {
                eyebrow: 'LEOPARD COUNTRY',
                title: 'Into the Wild',
                text: 'Quiet footsteps through the landscape that has become synonymous with Jawai.',
                detail: 'A leopard moves through its territory with effortless calm — a rare glimpse of the animal at the heart of Jawai’s wilderness.',
                poster: publicAsset('/assets/gallery/gallery-01.jpg'),
              },
            ];

            const active =
              experiences[experienceIndex];

            const changeExperience = (index) => {
              setExperienceIndex(index);
            };

            const stepExperience = (direction) => {
              const next =
                (experienceIndex + direction + experiences.length) %
                experiences.length;

              changeExperience(next);
            };

            return (
              <div className="saga-film-shell">

                <div className="saga-film-copy">

                  <div className="saga-film-kicker">
                    <span>CURATED EXPERIENCES</span>
                    <i />
                  </div>

                  <div className="saga-film-count">
                    {String(experienceIndex + 1).padStart(2, '0')}
                    <span>/</span>
                    {String(experiences.length).padStart(2, '0')}
                  </div>

                  <h2>{active.title}</h2>

                  <p className="saga-film-intro">
                    {active.text}
                  </p>

                  <p className="saga-film-detail">
                    {active.detail}
                  </p>

                  <div className="saga-film-features">
                    <span>IMMERSIVE</span>
                    <span>LOCAL</span>
                    <span>UNTAMED</span>
                  </div>

                  <button
                    type="button"
                    className="saga-film-explore"
                    onClick={() => stepExperience(1)}
                  >
                    NEXT EXPERIENCE
                    <span>→</span>
                  </button>

                </div>


                <div className="saga-film-stage">

                  <img
                    key={active.poster}
                    className="saga-film-video"
                    src={active.poster}
                    alt={active.title}
                  />

                  <div className="saga-film-shade" />

                  <span className="saga-film-video-count">
                    {String(experienceIndex + 1).padStart(2, '0')}
                    {' / '}
                    {String(experiences.length).padStart(2, '0')}
                  </span>

                </div>


                <aside className="saga-film-rail">

                  <div className="saga-film-rail-line">
                    <span
                      style={{
                        top: `${
                          (experienceIndex /
                            (experiences.length - 1)) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                  <div className="saga-film-items">
                    {experiences.map((item, index) => (
                      <button
                        type="button"
                        key={item.title}
                        className={`saga-film-item ${
                          index === experienceIndex
                            ? 'is-active'
                            : ''
                        }`}
                        onClick={() =>
                          changeExperience(index)
                        }
                      >
                        <div className="saga-film-thumb">
                          <img
                            src={item.poster}
                            alt=""
                            loading="lazy"
                          />

                          <span>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <strong>
                          {item.eyebrow}
                        </strong>
                      </button>
                    ))}
                  </div>

                  <small>SELECT A FILM</small>

                </aside>

              </div>
            );
          })()}
        </section>

        {/* ACCOMMODATION & SUITES */}
        <section id="stay" className="home-accommodation">
          <div className="home-accommodation-head">
            

            <h2>Accommodation &amp; Suites</h2>

            <p>
              Thoughtfully designed spaces for slowing down,
              settling in and experiencing Jawai at your own pace.
            </p>
          </div>

          <div className="home-room-grid">
            {hotelData.rooms.slice(0, 3).map((room) => (
              <article
                className="home-room-card"
                key={room.id}
                onClick={() => navigate('/rooms')}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' ||
                    event.key === ' '
                  ) {
                    navigate('/rooms');
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="home-room-image-wrap">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="home-room-image"
                    loading="lazy"
                  />

                  <span className="home-room-view">
                    VIEW ROOM
                  </span>
                </div>

                <div className="home-room-card-bottom">
                  <h3>{room.name}</h3>

                  <span>
                    {room.size} · {room.occupancy}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="home-room-all"
            onClick={() => navigate('/rooms')}
          >
            EXPLORE ALL ROOMS
          </button>
        </section>

        {/* 8 IMAGE GALLERY */}
        <section
          id="gallery"
          className="saga-gallery"
        >
          <div className="saga-gallery-top">
            
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
                      alt={`SAGA gallery ${
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

        {/* RABARI — KEEPERS OF THE HILLS */}
        <section id="local-welcome" className="rabari-journey">

          <div className="rabari-journey-copy">

            <span className="rabari-eyebrow">
              THE LOCAL WELCOME
            </span>

            <h2>
              Walk with the
              <br />
              <em>Keepers of the Hills</em>
            </h2>

            <p className="rabari-intro">
              Follow the Rabari shepherds through Jawai's granite
              landscape, moving with their sheep and goats from
              morning until dusk.
            </p>

            <div className="rabari-description">
              <span>THE EXPERIENCE</span>

              <p>
                In the granite hills of Jawai, time moves to the rhythm
                of the flock. Walk beside the Rabari shepherds as they
                guide their sheep and goats across open fields, rocky
                trails and thorny scrub.
              </p>

              <p>
                Share a simple meal beneath the open sky, pause in the
                grazing grounds for warm goat-milk chai, and spend a day
                following a pastoral rhythm that has remained almost
                unchanged for centuries.
              </p>
            </div>

            <div className="rabari-time">
              <div>
                <strong>10 AM</strong>
                <span>MORNING DEPARTURE</span>
              </div>

              <i />

              <div>
                <strong>6 PM</strong>
                <span>RETURN AT DUSK</span>
              </div>
            </div>

            <div className="rabari-highlights">

              <div>
                <small>01</small>
                <strong>Walk</strong>
                <span>With the shepherds &amp; their flocks</span>
              </div>

              <div>
                <small>02</small>
                <strong>Share</strong>
                <span>A simple meal beneath the open sky</span>
              </div>

              <div>
                <small>03</small>
                <strong>Taste</strong>
                <span>Goat-milk chai prepared in the phads</span>
              </div>

              <div>
                <small>04</small>
                <strong>Connect</strong>
                <span>With a centuries-old pastoral rhythm</span>
              </div>

            </div>

            <div className="rabari-journey-footer">
              <span>APPROX. 8 HOURS · PRIVATE EXPERIENCE</span>

              <button
                type="button"
                onClick={() => navigate('/experiences')}
              >
                DISCOVER THE RABARI JOURNEY
                <Arrow />
              </button>
            </div>

          </div>

          <div className="rabari-journey-media">
            <img
              src={publicAsset('/assets/rabari/rabari-walk.png')}
              alt="Rabari shepherds walking through the landscape of Jawai"
            />

            <div className="rabari-media-shade" />

            <div className="rabari-location">
              <span>JAWAI · RAJASTHAN</span>
              <small>25.1160° N · 73.1437° E</small>
            </div>
          </div>

        </section>

        {/* JAWAI — ORGANIC 3D IMAGE ORBIT */}
        <section
          id="experience"
          className="jawai-orbit-experience"
        >
          <div className="jawai-orbit-scene">

            <div className="jawai-orbit-atmosphere" />

            <div className="jawai-orbit-ring">

              {[
                publicAsset('/assets/legacy/architecture.jpg'),
                publicAsset('/assets/gallery/gallery-01.jpg'),
                publicAsset('/assets/gallery/gallery-03.jpg'),
                publicAsset('/assets/gallery/gallery-05.jpg'),
                publicAsset('/assets/rabari/rabari-walk.png'),
                publicAsset('/assets/legacy/landscape.jpg'),
                publicAsset('/assets/legacy/interior.jpg'),
                publicAsset('/assets/gallery/gallery-04.jpg'),
                publicAsset('/assets/legacy/room.jpg'),
                publicAsset('/assets/gallery/gallery-02.jpg'),
                publicAsset('/assets/gallery/gallery-08.jpg'),
              ].map((image, index) => (
                <figure
                  className="jawai-orbit-photo"
                  key={image}
                >
                  <img
                    src={image}
                    alt={`Jawai wilderness experience ${index + 1}`}
                  />

                  <span className="jawai-orbit-number">
                    0{index + 1}
                  </span>
                </figure>
              ))}

            </div>

            <div className="jawai-orbit-copy jawai-orbit-copy-refined">
              <span>THE WILDER SIDE OF JAWAI</span>
              <h2>
                Moments from the wild.
              </h2>
            </div>

            <div className="jawai-orbit-progress">
              <span />
              <small>SCROLL TO EXPLORE</small>
            </div>

          </div>
        </section>

        {/* SAGA STATEMENT */}
        <section
          id="quote"
          className="founder-quote founder-quote-with-leopard"
        >
          <div
            className="quote-leopard"
            aria-hidden="true"
          >
            <img
              src={publicAsset('/assets/leopard/saga-running-leopard.png')}
              alt=""
            />
          </div>
          <div className="founder-quote-inner">
            <blockquote>
              “SAGA is inspired by the granite hills of
              the region, the leopards and the communities that
              call this remarkable landscape home. Every
              journey here is shaped by a deep respect for the
              land, its wildlife and the people who have lived
              alongside it for generations.”
            </blockquote>

            <div className="founder-credit">
              
              <span>
                Wild by Nature · Rooted in Purpose
              </span>
            </div>

            <div className="founder-signature">
              Saga
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="saga-final-footer">

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
              SAGA.
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
          <span>© 2026 SAGA</span>
          <span>JAWAI · RAJASTHAN · INDIA</span>
        </div>
      </footer>
    </div>
  );
}

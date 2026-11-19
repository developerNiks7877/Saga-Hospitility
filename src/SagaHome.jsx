import { useNavigate } from "react-router-dom";
import "./saga-home.css";
import { hotelData } from "./data/hotelData";
import { blogPosts } from "./data/blogData";
import ExpandableJournalCards from "./components/common/ExpandableJournalCards";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { publicAsset } from "./utils/publicAsset";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MEDIA = {
  intro:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=90",
  leopard:
    "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=2200&q=90",

  float1:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=90",
  float2:
    "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1400&q=90",
  float3:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=90",
  float4:
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=90",
  float5:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=90",
  float6:
    "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1400&q=90",

  gallery1:
    "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1800&q=90",
  gallery2:
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=90",
  gallery3:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
  gallery4:
    "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1800&q=90",
  gallery5:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1800&q=90",
  gallery6:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=90",
  gallery7:
    "https://images.unsplash.com/photo-1519955045385-7cdb8e07c7f7?auto=format&fit=crop&w=1800&q=90",
  gallery8:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=90",
};

const driveImage = (id, width = 1600) =>
  `https://lh3.googleusercontent.com/d/${id}=w${width}`;

const galleryImages = [
  driveImage("14V3pYDkKZ0ouWDh6FewHQRkze3eXsOEd", 1600),
  driveImage("1ub7gicbO2xiRzmY36kG4lpF_CIwIvtWf", 1600),
  driveImage("1q9ZV4HWXLSMv6zB_fefd9Q6KQg0wg1Y8", 1600),
  driveImage("1rKm7frGRBakx9e9FYPdb9A68ds4-JUxM", 1600),
  driveImage("1dT5IILIi8RrdIyhv7cPiPtG_cPVQiRSF", 1600),
  driveImage("1QQmQOVxJO4QQlSBJh1JAsTebO115xols", 1600),
  driveImage("13pZxWrFf7aL7HFZd8TQuDtOdLlhKfLRg", 1600),
  driveImage("1AuyW7b0SNyXc63v3Srn6Z0ZKpD4rYwq0", 1600),
];

const gallerySlides = Array.from({ length: Math.ceil(galleryImages.length / 2) }, (_, index) =>
  galleryImages.slice(index * 2, index * 2 + 2),
);

const HOME_STAY_IMAGES = [
  driveImage("1DuMUP3-VJJP0MunUxB98gFF2YN-LyNKe", 1600),
  driveImage("1GzhB3tFOcU3AyTVne_n1SuhbQFL82N0L", 1600),
  driveImage("1Sv9e7lF5eOdf0EqvWrtzKKatDYtMkfIP", 1600),
];

const SAFARI_EXPERIENCE_IMAGES = [
  driveImage("1oCVIMnCv02YL3EPbeshsh9QIm4lvhMiG", 1200),
  driveImage("1nsrrJy36rxVlrJn1fkxJ0XgjBw61vhYi", 1200),
  driveImage("1c5YqTwJY-sXCh8hmqoEzx2yZhAvWdTYP", 1200),
  driveImage("1mJm0zKJBMlapm_nvukI8ZlI-6lqmgOR2", 1200),
  driveImage("14EjtQjckMUmripH0RdzhKf17H8Am0NoW", 1200),
  driveImage("1Gt2hZWwmjHBH8-EeR3PjuwE5HWcgbac8", 1200),
  driveImage("1u1baHcfVZcxNCzkqwU0GI_j3w-2Plu1N", 1200),
  driveImage("19twJpfBvqUtn_Pe7UyO53UyMvT-YiqfH", 1200),
  publicAsset("/assets/safari-experiences/DSC09850.webp"),
  publicAsset("/assets/safari-experiences/IMG_1491.webp"),
];

const HERO_VIDEO = publicAsset("/assets/video/saga-hero-1080p.mp4");
// Local MP4s keep the frame switch fast. The repeated clips match the public
// fallbacks already used where the newer Drive links require sign-in.
const EXPERIENCE_VIDEO_ASSETS = [
  "experience-01.mp4",
  "experience-02.mp4",
  "experience-03.mp4",
  "experience-04.mp4",
  "experience-05.mp4",
  "experience-02.mp4",
  "experience-03.mp4",
].map((name) => publicAsset(`/assets/video/curated/${name}`));
const EXPERIENCE_POSTERS = EXPERIENCE_VIDEO_ASSETS.map((video) =>
  video.replace(".mp4", "-poster.jpg"),
);

const experiences = [
  {
    title: "Wilderness Drives",
    image: MEDIA.leopard,
    text: "Explore Rajasthan’s granite hills and grasslands in search of its resident wildlife, guided through an immersive journey into the landscape.",
  },
  {
    title: "Temple Trail",
    image: MEDIA.float4,
    text: "Discover ancient shrines and temples woven into Rajasthan’s granite hills where spirituality, landscape and local tradition continue to meet.",
  },
  {
    title: "Horse Riding",
    image: MEDIA.float5,
    text: "Ride through open trails, rocky outcrops and the raw wilderness of Rajasthan from an entirely different perspective.",
  },
  {
    title: "Village Wander",
    image: MEDIA.float2,
    text: "Meet the communities of Rajasthan and discover everyday life, traditions and stories shaped by generations of belonging.",
  },
  {
    title: "Walks & Hikes",
    image: MEDIA.float3,
    text: "Move slowly through granite formations and open terrain on guided walks that reveal the quieter details of Rajasthan.",
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
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Lock the page completely while fullscreen menu is open */
  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [experienceVideoReady, setExperienceVideoReady] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [loaderLogoReady, setLoaderLogoReady] = useState(false);
  const experienceVideoRef = useRef(null);
  const heroVideoRef = useRef(null);
  const heroReadyForReveal = heroVideoReady && loaderLogoReady;

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;

    let disposed = false;
    const play = () => {
      if (disposed || !video.isConnected) return;
      setHeroVideoReady(true);
      video.play().catch(() => {});
    };
    const replayFromStart = () => {
      video.currentTime = 0;
      play();
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") play();
    };

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("ended", replayFromStart);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("pageshow", play);
    window.addEventListener("online", play);
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) play();

    return () => {
      disposed = true;
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("ended", replayFromStart);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("pageshow", play);
      window.removeEventListener("online", play);
    };
  }, []);

  useEffect(() => {
    // Do not trap visitors behind the loader if a mobile browser asks them
    // to approve video data use. The poster keeps the hero visually complete.
    const loaderFailsafe = window.setTimeout(() => setHeroVideoReady(true), 8000);
    return () => window.clearTimeout(loaderFailsafe);
  }, []);

  useEffect(() => {
    const page = root.current;
    if (!page) return;

    const revealItems = page.querySelectorAll("[data-scroll-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          target.classList.toggle("is-inview", isIntersecting);
        });
      },
      { rootMargin: "0px 0px 240px 0px", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!experienceVideoReady) return;
    const video = experienceVideoRef.current;
    if (!video) return;
    video.muted = true;

    let disposed = false;
    const tryAutoplay = () => {
      if (disposed || !video.isConnected) return;
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", tryAutoplay);
    video.addEventListener("canplay", tryAutoplay);
    video.addEventListener("ended", tryAutoplay);
    document.addEventListener("visibilitychange", tryAutoplay);
    window.addEventListener("pageshow", tryAutoplay);
    window.addEventListener("online", tryAutoplay);
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) tryAutoplay();

    return () => {
      disposed = true;
      video.removeEventListener("loadeddata", tryAutoplay);
      video.removeEventListener("canplay", tryAutoplay);
      video.removeEventListener("ended", tryAutoplay);
      document.removeEventListener("visibilitychange", tryAutoplay);
      window.removeEventListener("pageshow", tryAutoplay);
      window.removeEventListener("online", tryAutoplay);
    };
  }, [experienceIndex, experienceVideoReady]);

  useEffect(() => {
    if (!experienceVideoReady) return;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const onMobile = window.matchMedia("(max-width: 760px)").matches;
    const dataSaving = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "");
    if (onMobile || dataSaving) return;

    const nextIndex = (experienceIndex + 1) % EXPERIENCE_VIDEO_ASSETS.length;
    const preloader = document.createElement("video");
    preloader.preload = "auto";
    preloader.muted = true;
    preloader.src = EXPERIENCE_VIDEO_ASSETS[nextIndex];
    preloader.load();

    return () => {
      preloader.pause();
      preloader.removeAttribute("src");
      preloader.load();
    };
  }, [experienceIndex, experienceVideoReady]);

  useEffect(() => {
    const experienceSection = root.current?.querySelector("#experiences");
    if (!experienceSection) return;
    if (!("IntersectionObserver" in window)) {
      setExperienceVideoReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setExperienceVideoReady(true);
        observer.disconnect();
      },
      {
        rootMargin: window.matchMedia("(max-width: 760px)").matches
          ? "420px 0px"
          : "1600px 0px",
        threshold: 0,
      },
    );
    observer.observe(experienceSection);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      let cleanupOrbitCarousel = () => {};
      ScrollTrigger.defaults({
        invalidateOnRefresh: true,
      });

      /* HERO */
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=130%",
          scrub: 1.2,
          pin: true,
        },
      });

      heroTl
        .to(
          ".hero-media",
          {
            scale: 1.18,
            yPercent: 6,
            ease: "none",
          },
          0,
        )
        .to(
          ".floating-saga-logo",
          {
            top: () => (window.innerWidth <= 700 ? "38px" : "36px"),
            width: () => (window.innerWidth <= 700 ? "85px" : "110px"),
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-meta",
          {
            y: -80,
            opacity: 0,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-shade",
          {
            opacity: 0.62,
          },
          0,
        );

      /* TEXT REVEALS */
      gsap.utils.toArray(".reveal-line").forEach((line) => {
        gsap.fromTo(
          line,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.35,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      /* INTRO IMAGE */
      gsap.fromTo(
        ".intro-image",
        {
          clipPath: "inset(15% 15% 15% 15%)",
          scale: 1.15,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-visual",
            start: "top 85%",
            end: "bottom 40%",
            scrub: 1,
          },
        },
      );

      /* WILDERNESS SPLIT */
      gsap.fromTo(
        ".wildlife-split-image img",
        {
          scale: 1.18,
          xPercent: -6,
        },
        {
          scale: 1,
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".wildlife-split",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        },
      );

      gsap.fromTo(
        ".wildlife-split-copy",
        { xPercent: 18 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".wildlife-split",
            start: "top 95%",
            end: "top 25%",
            scrub: 1.1,
          },
        },
      );

      gsap.fromTo(
        ".wildlife-split-copy > *",
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".wildlife-split",
            start: "top 65%",
            end: "top 20%",
            scrub: 1,
          },
        },
      );

      /* =========================================
         SAGA — CINEMATIC CENTER CAROUSEL
         Smooth glide + progressive depth blur
      ========================================= */

      const orbitSection = document.querySelector(
        ".rajasthan-orbit-experience",
      );

      const orbitCards = gsap.utils.toArray(".rajasthan-orbit-photo");

      if (orbitSection && orbitCards.length) {
        const total = orbitCards.length;

        let position = 0;
        let selectedIndex = 0;
        let motionTween = null;
        let autoTimer = null;
        let sectionVisible = false;
        let interactionActive = false;
        let transitionDuration = 0;
        let suppressClickUntil = 0;
        const cardHandlers = [];
        const orbitScene = orbitSection.querySelector(".rajasthan-orbit-scene");
        let pointerStart = null;

        const wrap = (value) => ((value % total) + total) % total;

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
          const mobile = window.innerWidth <= 760;

          orbitCards.forEach((card, index) => {
            const distance = distanceToPosition(index, position);

            const abs = Math.abs(distance);

            const direction = distance < 0 ? -1 : 1;

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

              const t = 1 - abs;

              const smoothT = t * t * (3 - 2 * t);

              x = distance * (mobile ? 145 : 355);

              y = (1 - smoothT) * (mobile ? 20 : 30);

              z = -80 + smoothT * 260;

              scale = (mobile ? 0.78 : 0.8) + smoothT * (mobile ? 0.62 : 0.76);

              opacity = 0.86 + smoothT * 0.14;

              blur = (1 - smoothT) * 0.15;

              rotateY = -distance * (mobile ? 4 : 6);
            } else {
              const depth = abs - 1;

              const spacing = mobile ? 92 : 185;

              x = direction * ((mobile ? 145 : 355) + depth * spacing);

              y = (mobile ? 20 : 30) + depth * (mobile ? 10 : 14);

              z = -80 - depth * 145;

              scale = Math.max(
                mobile ? 0.42 : 0.43,
                (mobile ? 0.78 : 0.8) - depth * 0.15,
              );

              opacity = Math.max(0, 0.86 - depth * 0.23);

              /*
               * First left/right images stay sharp.
               * Blur begins BEHIND those cards.
               */

              blur = Math.max(0, (depth - 0.15) * 2.1);

              rotateY = direction * -(mobile ? 9 : 13);
            }

            const visible = abs < (mobile ? 3.1 : 4.1);

            gsap.set(card, {
              x,
              y,
              z: mobile ? 0 : z,
              scale,
              opacity: visible ? opacity : 0,

              rotateY: mobile ? 0 : rotateY,
              rotateZ: 0,

              filter: mobile ? "none" : `blur(${blur}px)`,

              visibility: visible ? "visible" : "hidden",

              pointerEvents: abs <= 2.2 ? "auto" : "none",

              zIndex: Math.round(200 - abs * 25),

              transformPerspective: mobile ? 0 : 1400,
              transformOrigin: "50% 50%",
              force3D: !mobile,
            });

            const isCenter = abs < 0.08;

            card.classList.toggle("is-selected", isCenter);

            if (isCenter) {
              selectedIndex = index;
            }
          });
        };

        let autoIndex = selectedIndex;

        const scheduleAuto = () => {
          clearTimeout(autoTimer);

          if (interactionActive || !sectionVisible) {
            return;
          }

          const interval = 2000;
          const delay = Math.max(0, interval - transitionDuration);
          autoTimer = setTimeout(() => {
            if (interactionActive || !sectionVisible) {
              scheduleAuto();
              return;
            }

            autoIndex = wrap(autoIndex + 1);

            moveTo(autoIndex, false);
          }, delay);
        };

        const moveTo = (index, fromClick = false) => {
          clearTimeout(autoTimer);

          if (motionTween) {
            motionTween.kill();
          }

          const distance = distanceToPosition(index, position);

          if (Math.abs(distance) < 0.015) {
            selectedIndex = index;
            transitionDuration = 0;
            scheduleAuto();
            return;
          }

          interactionActive = true;

          if (fromClick) {
            orbitSection.classList.add("has-selected-photo");
          }

          const state = {
            value: position,
          };

          const target = position + distance;
          transitionDuration = fromClick
            ? window.innerWidth <= 760 ? 0.4 : 0.55
            : window.innerWidth <= 760
              ? 0.85
              : 1.1;

          motionTween = gsap.to(state, {
            value: target,

            /*
             * Slower luxury movement.
             * No spring / no popup.
             */
            duration: transitionDuration,

            ease: "power2.inOut",

            onUpdate: () => {
              position = state.value;

              renderCarousel();
            },

            onComplete: () => {
              position = target;

              selectedIndex = wrap(index);

              position = selectedIndex;

              autoIndex = selectedIndex;

              interactionActive = false;

              renderCarousel();

              scheduleAuto();
            },
          });
        };

        orbitCards.forEach((card, index) => {
          card.setAttribute("role", "button");

          card.setAttribute("tabindex", "0");

          const handleClick = (event) => {
            if (Date.now() < suppressClickUntil) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            if (interactionActive) {
              return;
            }

            moveTo(index, true);
          };

          const handleKeyDown = (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();

              if (!interactionActive) {
                moveTo(index, true);
              }
            }
          };

          card.addEventListener("click", handleClick);
          card.addEventListener("keydown", handleKeyDown);
          cardHandlers.push({ card, handleClick, handleKeyDown });
        });

        const handlePointerDown = (event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          pointerStart = { x: event.clientX, y: event.clientY };
        };

        const handlePointerUp = (event) => {
          if (!pointerStart) return;
          const deltaX = event.clientX - pointerStart.x;
          const deltaY = event.clientY - pointerStart.y;
          pointerStart = null;

          if (
            Math.abs(deltaX) < 34 ||
            Math.abs(deltaX) < Math.abs(deltaY) * 1.15 ||
            interactionActive
          ) return;

          suppressClickUntil = Date.now() + 500;
          moveTo(wrap(selectedIndex + (deltaX < 0 ? 1 : -1)), true);
        };

        const handlePointerCancel = () => {
          pointerStart = null;
        };

        orbitScene?.addEventListener("pointerdown", handlePointerDown, { passive: true });
        orbitScene?.addEventListener("pointerup", handlePointerUp);
        orbitScene?.addEventListener("pointercancel", handlePointerCancel);

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

          start: "top 85%",
          end: "bottom 15%",

          onEnter: () => {
            sectionVisible = true;
            if (motionTween?.paused()) motionTween.resume();
            else scheduleAuto();
          },

          onEnterBack: () => {
            sectionVisible = true;
            if (motionTween?.paused()) motionTween.resume();
            else scheduleAuto();
          },

          onLeave: () => {
            sectionVisible = false;
            clearTimeout(autoTimer);
            motionTween?.pause();
          },

          onLeaveBack: () => {
            sectionVisible = false;
            clearTimeout(autoTimer);
            motionTween?.pause();
          },
        });

        /*
         * Keep your existing short pin behaviour.
         */
        ScrollTrigger.create({
          trigger: orbitSection,

          start: "top top",

          end: "+=10%",

          pin: true,

          pinSpacing: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onRefresh: renderCarousel,
        });

        window.addEventListener("resize", renderCarousel);

        cleanupOrbitCarousel = () => {
          clearTimeout(autoTimer);
          motionTween?.kill();
          window.removeEventListener("resize", renderCarousel);
          cardHandlers.forEach(({ card, handleClick, handleKeyDown }) => {
            card.removeEventListener("click", handleClick);
            card.removeEventListener("keydown", handleKeyDown);
          });
          orbitScene?.removeEventListener("pointerdown", handlePointerDown);
          orbitScene?.removeEventListener("pointerup", handlePointerUp);
          orbitScene?.removeEventListener("pointercancel", handlePointerCancel);
        };
      }

      /* =========================================
         NAV LOGO VISIBILITY — ORBIT BOUNDARY
      ========================================= */

      const orbitLogoBoundary = document.querySelector(
        ".rajasthan-orbit-experience",
      );

      const siteNavigation = document.querySelector(".site-nav");

      if (orbitLogoBoundary && siteNavigation) {
        ScrollTrigger.create({
          trigger: orbitLogoBoundary,

          start: "bottom top",

          onEnter: () => {
            siteNavigation.classList.add("nav-after-orbit");
          },

          onLeaveBack: () => {
            siteNavigation.classList.remove("nav-after-orbit");
          },

          onRefresh: (self) => {
            siteNavigation.classList.toggle(
              "nav-after-orbit",
              self.progress === 1 && self.direction >= 0,
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
        const orbit = document.querySelector(".rajasthan-orbit-experience");

        if (!orbit) return;

        const orbitBottom = orbit.getBoundingClientRect().bottom;

        /*
         * Once bottom edge of orbit has passed
         * the top of viewport, we're below orbit.
         */
        const pastOrbit = orbitBottom <= 1;

        document.body.classList.toggle("saga-past-orbit", pastOrbit);
      };

      updateNavLogoAfterOrbit();

      window.addEventListener("scroll", updateNavLogoAfterOrbit, {
        passive: true,
      });

      window.addEventListener("resize", updateNavLogoAfterOrbit);

      /* 8 IMAGE GALLERY */
      const galleryPanels = gsap.utils.toArray(".saga-gallery-panel");

      if (galleryPanels.length > 1) {
        const galleryTween = gsap.to(galleryPanels, {
          xPercent: -100 * (galleryPanels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".saga-gallery",
            start: "top top",
            end: () => `+=${window.innerWidth * (galleryPanels.length - 1)}`,
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
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              const index = Math.min(
                galleryPanels.length - 1,
                Math.round(self.progress * (galleryPanels.length - 1)),
              );

              setGalleryIndex(index);
            },
          },
        });

        galleryPanels.forEach((panel) => {
          const images = panel.querySelectorAll("img");

          gsap.fromTo(
            images,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: galleryTween,
                start: "left 90%",
                end: "right 10%",
                scrub: 1,
              },
            },
          );
        });
      }

      /* QUOTE */
      gsap.fromTo(
        ".founder-quote-inner > *",
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".founder-quote",
            start: "top 72%",
            once: true,
          },
        },
      );

      /* NAV */
      ScrollTrigger.create({
        trigger: ".intro-section",
        start: "top 80",
        end: "bottom 80",
        toggleClass: {
          targets: ".site-nav",
          className: "nav-dark",
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      return () => {
        cleanupOrbitCarousel();
        window.removeEventListener("load", refresh);

        window.removeEventListener("scroll", updateNavLogoAfterOrbit);

        window.removeEventListener("resize", updateNavLogoAfterOrbit);

        document.body.classList.remove("saga-past-orbit");
      };
    },
    {
      scope: root,
    },
  );

  const goTo = (id) => {
    const target = document.getElementById(id);
    setMenuOpen(false);

    // Let the menu's scroll lock restore first, then move to the destination.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        target?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };

  const protectDisplayedMedia = (event) => {
    if (event.target.closest?.("img, video")) event.preventDefault();
  };

  return (
    <div
      ref={root}
      className="saga-page"
      onContextMenu={protectDisplayedMedia}
      onDragStart={protectDisplayedMedia}
    >
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
           RAJASTHAN WILDLIFE FOOTER TRANSITION
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
        <button className="menu-trigger" onClick={() => setMenuOpen(true)}>
          <MenuIcon />
          <span>MENU</span>
        </button>

        <button
          type="button"
          className="nav-book"
          onClick={() => navigate("/coming-soon")}
        >
          BOOK NOW
        </button>
      </header>
      {/* MENU */}
      <aside className={`menu-panel ${menuOpen ? "is-open" : ""}`}>
        <div className="menu-panel-head">
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            <span>×</span>
            CLOSE
          </button>

          <img src={publicAsset("/assets/logo/saga-hospitality-logo.png")} alt="" />
        </div>

        <nav className="overlay-navigation">
          <button onClick={() => goTo("story")}>
            <small>01</small>The Story
          </button>

          <button onClick={() => goTo("experiences")}>
            <small>02</small>Curated Experiences
          </button>

          <button onClick={() => goTo("stay")}>
            <small>03</small>Stay at SAGA
          </button>

          <button onClick={() => goTo("gallery")}>
            <small>04</small>Gallery
          </button>

          <button onClick={() => goTo("local-welcome")}>
            <small>05</small>The Local Welcome
          </button>

          <button onClick={() => goTo("experience")}>
            <small>06</small>Safari Experience
          </button>

          <button onClick={() => goTo("quote")}>
            <small>07</small>Our Philosophy
          </button>

          <button onClick={() => goTo("blog")}>
            <small>08</small>Blog
          </button>
        </nav>

        <div className="menu-panel-bottom">
          <span>RAJASTHAN · INDIA</span>
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
            behavior: "smooth",
          })
        }
      >
        <img
          src={publicAsset("/assets/logo/saga-hospitality-logo.png")}
          alt="SAGA Hospitality"
        />
      </button>

      <div
        className={`saga-site-loader${heroReadyForReveal ? " is-hidden" : ""}`}
        role="status"
        aria-label="Loading SAGA Hospitality"
        aria-hidden={heroReadyForReveal}
      >
        <img
          src={publicAsset("/assets/logo/saga-hospitality-logo.png")}
          alt="SAGA Hospitality"
          onLoad={() => setLoaderLogoReady(true)}
          onError={() => setLoaderLogoReady(true)}
        />
        <span className="saga-site-loader-indicator" aria-hidden="true" />
      </div>

      <main>
        {/* HERO */}
        <section className="hero">
          <video
            ref={heroVideoRef}
            className="hero-media hero-video"
            src={HERO_VIDEO}
            poster={publicAsset("/assets/video/saga-hero-poster.jpg")}
            autoPlay
            muted
            controls={false}
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onLoadedData={() => setHeroVideoReady(true)}
            onError={() => setHeroVideoReady(true)}
          />

          <div className="hero-shade" />
        </section>

        {/* HOSPITALITY STORY */}
        <section id="story" className="hospitality-story">
          <div className="hospitality-copy" data-scroll-reveal>
            <h2>Jawai Came First.</h2>

            <div className="hospitality-text">
              <p>
                Long before Saga Hospitality took shape, there was the land.
                Ancient granite hills, quiet village paths, the presence of
                leopards, and a way of life deeply connected to nature. We
                didn't want to create something that stood apart from it. We
                wanted to become a part of its story.
              </p>

              <p>
                Saga Hospitality was born from that thought.
              </p>

              <p>
                Inspired by the rugged landscape, local traditions, and untamed
                character of Jawai, every detail takes its cue from the
                surroundings. From architecture rooted in traditional forms to
                spaces that carry the warmth and simplicity of the region, the
                idea has always been to stay true to this land.
              </p>

              <p>
                But our story goes beyond the place we're creating. It's about
                the people who call Jawai home, the wildlife that defines its
                landscape, and the quieter moments that make this destination
                worth discovering. We're not here to change Jawai. We're here
                to share a little more of it with you.
              </p>
              <p className="story-mantra">
                <em>Saga Hospitality — Wild by Nature, Rooted in Purpose.</em>
              </p>
            </div>

            <button
              type="button"
              className="hospitality-gallery-btn"
              onClick={() => goTo("gallery")}
            >
              View Gallery
            </button>
          </div>

          <div className="hospitality-collage" data-scroll-reveal>
            <figure className="hospitality-image hospitality-image-one">
              <img src={driveImage("1SEOb62mXsvpBoPYVKqhp-JHvp0Ssv1t2", 1600)} alt="SAGA story" loading="lazy" decoding="async" />
            </figure>

            <figure className="hospitality-image hospitality-image-two">
              <img src={driveImage("1kFk3di_vk_IR83-H0HbOZ57JsMNtj6PQ", 1600)} alt="SAGA story" loading="lazy" decoding="async" />
            </figure>

            <figure className="hospitality-image hospitality-image-three">
              <img src={driveImage("1_TOpA5r432MEXHC8TuKyy6QAjyZW_IVF", 1600)} alt="SAGA story" loading="lazy" decoding="async" />
            </figure>

            <figure className="hospitality-image hospitality-image-four">
              <img src={driveImage("1EGGDLGwqzvw5Y03BcvwILrqQUFQVRjso", 1600)} alt="SAGA story" loading="lazy" decoding="async" />
            </figure>
          </div>
        </section>

        {/* EXPERIENCES — CINEMATIC FILM LIBRARY */}
        <section id="experiences" className="saga-film-experiences">
          {(() => {
            const experiences = [
              {
                eyebrow: "NATURAL WONDERS",
                title: "Written in Stone, Shaped by Time.",
                text: "Jawai's ancient granite hills rise above open landscapes and calm waters, creating a setting unlike the usual Rajasthan scenery.",
                detail:
                  "Watch the light move across the rocks, discover quiet corners, and take in the raw beauty of a landscape that has been here long before us.",
                video: EXPERIENCE_VIDEO_ASSETS[0],
              },
              {
                eyebrow: "DESERT EVENINGS",
                title: "Stay for the Last Light.",
                text: "Evenings in Jawai have their own pace. The rocks turn warm beneath the setting sun, the sky changes colour, and the surroundings settle into silence.",
                detail:
                  "Find a quiet spot, watch the horizon, and let the day end without a hurry.",
                video: EXPERIENCE_VIDEO_ASSETS[1],
              },
              {
                eyebrow: "ON THE ROAD",
                title: "A Different View at Every Turn.",
                text: "The roads around Jawai take you past rocky hills, open countryside, and small settlements.",
                detail:
                  "Each stretch offers a closer look at the region, from its changing terrain to the everyday scenes unfolding along the way. Sometimes, the journey is reason enough to explore.",
                video: EXPERIENCE_VIDEO_ASSETS[2],
              },
              {
                eyebrow: "EVERYDAY LIFE",
                title: "The Beauty of the Ordinary.",
                text: "Morning routines, village lanes, cattle moving along familiar paths, and conversations that fill the day.",
                detail:
                  "Beyond its wildlife and landscapes, Jawai is a place people call home. A closer look at everyday life reveals the warmth and character of the region.",
                video: EXPERIENCE_VIDEO_ASSETS[3],
              },
              {
                eyebrow: "LIVING HERITAGE",
                title: "A Culture Still Lived.",
                text: "Heritage in Jawai isn't confined to monuments or history books. It lives in traditional clothing, local customs, rural homes, and the knowledge passed between generations.",
                detail:
                  "Discover the people and practices that continue to shape the identity of this land.",
                video: EXPERIENCE_VIDEO_ASSETS[4],
              },
              {
                eyebrow: "WILDLIFE",
                title: "The Land Has Its Own Rhythm.",
                text: "Jawai's rocky terrain, open landscapes, and waters support a variety of wildlife and birdlife.",
                detail:
                  "Spend time observing their natural surroundings, following the changing sounds and movements of the landscape. Here, every sighting is a moment worth appreciating.",
                video: EXPERIENCE_VIDEO_ASSETS[5],
              },
              {
                eyebrow: "LEOPARD COUNTRY",
                title: "The Wild Belongs Here.",
                text: "Among Jawai's granite formations, leopards move through a landscape that has long been their home.",
                detail:
                  "Discover the character of leopard country through responsible wildlife exploration, where patience matters and nature decides what it reveals. A glimpse may last only a moment, but the memory can stay much longer.",
                video: EXPERIENCE_VIDEO_ASSETS[6],
              },
            ];

            const active = experiences[experienceIndex];

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
                <div className="saga-film-copy" data-scroll-reveal>
                  <div className="saga-film-kicker">
                    <span>CURATED EXPERIENCES</span>
                    <i />
                  </div>

                  <div className="saga-film-count">
                    {String(experienceIndex + 1).padStart(2, "0")}
                    <span>/</span>
                    {String(experiences.length).padStart(2, "0")}
                  </div>

                  <h2>{active.title}</h2>

                  <p className="saga-film-intro">{active.text}</p>

                  <p className="saga-film-detail">{active.detail}</p>

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

                <div className="saga-film-stage" data-scroll-reveal>
                  <video
                    key={experienceIndex}
                    ref={experienceVideoRef}
                    className="saga-film-video"
                    src={experienceVideoReady ? active.video : undefined}
                    autoPlay={experienceVideoReady}
                    muted
                    defaultMuted
                    controls={false}
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    loop
                    playsInline
                    preload={experienceVideoReady ? "auto" : "none"}
                    fetchPriority={experienceVideoReady ? "high" : "auto"}
                    poster={EXPERIENCE_POSTERS[experienceIndex]}
                  />

                  <div className="saga-film-shade" />

                  <span className="saga-film-video-count">
                    {String(experienceIndex + 1).padStart(2, "0")}
                    {" / "}
                    {String(experiences.length).padStart(2, "0")}
                  </span>

                </div>

                <aside className="saga-film-rail" data-scroll-reveal>
                  <div className="saga-film-rail-line">
                    <span
                      style={{
                        top: `${
                          (experienceIndex / (experiences.length - 1)) * 100
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
                          index === experienceIndex ? "is-active" : ""
                        }`}
                        onClick={() => changeExperience(index)}
                      >
                        <div className="saga-film-thumb">
                          <img
                            src={EXPERIENCE_POSTERS[index]}
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />

                          <span>{String(index + 1).padStart(2, "0")}</span>
                        </div>

                        <strong>{item.eyebrow}</strong>
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
          <div className="home-accommodation-head" data-scroll-reveal>
            <span>STAY AT SAGA HOSPITALITY</span>
            <h2>More Than a Place to Return To.</h2>
            <p>
              A stay in Jawai is about everything that happens between arriving
              and leaving: the roads you explore, the landscapes you discover,
              the stories you hear, and the moments you didn't plan for.
            </p>
            <p>
              Saga Hospitality is imagined as a place to return to after those
              discoveries. Somewhere to slow down, enjoy your own time, and feel
              connected to the region without giving up the comforts of a
              thoughtful stay. Here, the destination is always part of the
              experience.
            </p>
            <em>Stay close to Jawai. Take a little of it home.</em>
          </div>

          <div className="home-room-grid" data-scroll-reveal>
            {hotelData.rooms.slice(0, 3).map((room, index) => (
              <article
                className="home-room-card"
                key={room.id}
                onClick={() => navigate("/coming-soon")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    navigate("/coming-soon");
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="home-room-image-wrap">
                  <img
                    src={HOME_STAY_IMAGES[index]}
                    alt={room.name}
                    className="home-room-image"
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="home-room-view">VIEW ROOM</span>
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
            data-scroll-reveal
            onClick={() => navigate("/coming-soon")}
          >
            EXPLORE ALL ROOMS
          </button>
        </section>

        {/* DRIVE IMAGE GALLERY */}
        <section id="gallery" className="saga-gallery">
          <div className="saga-gallery-top" data-scroll-reveal>
            <h2>Gallery</h2>
          </div>

          <div className="saga-gallery-track">
            {gallerySlides.map((slide, slideIndex) => (
              <div className="saga-gallery-panel" key={slideIndex}>
                {slide.map((image, imageIndex) => (
                  <figure className="saga-gallery-frame" key={image}>
                    <img
                      src={image}
                      alt={`SAGA gallery ${slideIndex * 2 + imageIndex + 1}`}
                      loading="eager"
                      decoding="async"
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
                  galleryIndex === i ? "is-active" : ""
                }`}
                aria-label={`Gallery slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* THE LOCAL WELCOME */}
        <section id="local-welcome" className="saga-local-welcome">
          <div className="saga-local-copy" data-scroll-reveal>
            <span>THE LOCAL WELCOME</span>
            <h2>The People <em>Make the Place.</em></h2>
            <p>
              Beyond the granite hills and wilderness lies another side of
              Jawai, one shaped by its people. Their traditions, everyday
              routines, and connection to the land give the region a character
              that no landscape alone can capture.
            </p>
            <div className="saga-local-note">
              <small>A WELCOME ROOTED IN PEOPLE</small>
              <p>
                At Saga Hospitality, we believe discovering a destination also
                means appreciating the people who call it home.
              </p>
              <p>
                Our approach to hospitality draws from that belief, creating a
                welcome that feels genuine, considered, and connected to
                Rajasthan.
              </p>
              <p>
                Because the most lasting memories of a place often begin with
                its people.
              </p>
            </div>
            <span className="saga-local-signoff">THE PEOPLE MAKE THE PLACE</span>
            <button type="button" onClick={() => navigate("/coming-soon")}>
              DISCOVER LOCAL EXPERIENCES <Arrow />
            </button>
          </div>
          <div className="saga-local-image">
            <img
              src={driveImage("15e7m4KrpPNeHw3Nd1cDVPy4RRapurAor", 1600)}
              alt="Local people and village life in Rajasthan"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(event) => {
                event.currentTarget.onerror = null;
                    event.currentTarget.src = galleryImages[0];
              }}
            />
            <span>RAJASTHAN</span>
            <small>25.1160° N · 73.1437° E</small>
          </div>
        </section>

        {/* RAJASTHAN — ORGANIC 3D IMAGE ORBIT */}
        <section id="experience" className="rajasthan-orbit-experience">
          <div className="rajasthan-orbit-copy rajasthan-orbit-copy-refined">
            <span>SAFARI EXPERIENCE</span>
            <h2>Follow the Wild.</h2>
            <p>
              Out here, the landscape sets the pace. The trails wind past
              granite formations, open terrain, and the natural habitats of
              Jawai's wildlife. Every moment brings a chance to notice
              something unexpected.
            </p>
            <p>
              From the quiet of the hills to the possibility of spotting a
              leopard in its natural surroundings, the experience is shaped
              by patience, observation, and the thrill of the unknown. No two
              journeys through the wild are ever quite the same.
            </p>
          </div>

          <div className="rajasthan-orbit-scene">
            <div className="rajasthan-orbit-atmosphere" />

            <div className="rajasthan-orbit-ring">
              {SAFARI_EXPERIENCE_IMAGES.map((image, index) => (
                <figure className="rajasthan-orbit-photo" key={image}>
                  <img
                    src={image}
                    alt={`Rajasthan wilderness experience ${index + 1}`}
                    loading={index === 0 || index === 1 || index === SAFARI_EXPERIENCE_IMAGES.length - 1 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />

                  <span className="rajasthan-orbit-number">0{index + 1}</span>
                </figure>
              ))}
            </div>

            <div className="rajasthan-orbit-progress">
              <span />
              <small>SCROLL TO EXPLORE</small>
            </div>
          </div>
        </section>

        {/* THE SAGA JOURNAL */}
        <section id="blog" className="home-journal">
          <div className="home-journal-heading" data-scroll-reveal>
            <div>
              <span className="home-journal-eyebrow">THE SAGA JOURNAL</span>
              <h2>Stories from Rajasthan</h2>
            </div>
            <p>
              Dispatches from Rajasthan’s wild heart: stories of place, people
              and time well spent.
            </p>
          </div>

          <ExpandableJournalCards
            cards={[
              blogPosts[0],
              blogPosts[2],
              blogPosts[6],
              blogPosts[7],
              blogPosts[5],
            ]}
          />

          <button
            type="button"
            className="home-journal-link"
            data-scroll-reveal
            onClick={() => navigate("/blog")}
          >
            VIEW ALL BLOGS <span aria-hidden="true">→</span>
          </button>
        </section>

        {/* SAGA STATEMENT */}
        <section
          id="quote"
          className="founder-quote founder-quote-with-leopard"
        >
          <div className="quote-leopard" aria-hidden="true">
            <img src={publicAsset("/assets/leopard/saga-running-leopard.png")} alt="" />
          </div>
          <div className="founder-quote-inner">
            <blockquote>
              <span className="philosophy-eyebrow">OUR PHILOSOPHY</span>
              <strong>A Different Way to Belong.</strong>
              <span>
                To us, hospitality begins with understanding the place we call
                home.
              </span>
              <span>
                It means drawing inspiration from local life, respecting the
                natural environment, and creating spaces that feel comfortable
                without losing their connection to Jawai.
              </span>
              <span>
                We believe the most meaningful experiences are often the
                simplest: a quiet morning, a conversation with someone local,
                or time spent observing the landscape.
              </span>
              <span>
                At Saga Hospitality, we want every stay to feel less like
                stepping away from the destination and more like becoming part
                of its rhythm.
              </span>
              <em>Stay connected to the place. Take its stories with you.</em>
            </blockquote>

            <div className="founder-credit">
              <span>WILD BY NATURE · ROOTED IN PURPOSE</span>
            </div>

            <div className="founder-signature">Saga</div>
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
              Rajasthan, India
              <br />
              India
            </p>

            <button className="footer-signup">CONTACT US</button>
          </div>

          <div>
            <h3>Explore</h3>

            <div className="saga-footer-links">
              <button onClick={() => goTo("story")}>OUR STORY</button>

              <button onClick={() => goTo("experience")}>EXPERIENCE</button>

              <button onClick={() => goTo("experiences")}>EXPERIENCES</button>

              <button onClick={() => goTo("gallery")}>GALLERY</button>

              <button onClick={() => goTo("quote")}>OUR PHILOSOPHY</button>
            </div>
          </div>

          <div className="saga-footer-newsletter">
            <h3>Stay Connected with SAGA</h3>

            <p>
              Share your email with us to receive stories, travel inspiration
              and updates from the world of SAGA.
            </p>

            <input type="email" placeholder="EMAIL ADDRESS" />

            <label className="footer-accept">
              <input type="checkbox" />
              <span>I accept the Terms & Conditions</span>
            </label>

            <button className="footer-signup">SIGN UP</button>
          </div>
        </div>

        <div className="saga-footer-bottom">
          <span>© 2026 SAGA</span>
          <span>RAJASTHAN · INDIA</span>
        </div>
      </footer>
    </div>
  );
}

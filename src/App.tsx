// import React from "react";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {useInview} from "./libs/inview";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import Splide.js
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

import "./App.css";

function App() {
  // Intersection Observerを使用して、要素がビューポートに入ったかどうかを検知
  const [inview, setInview] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useInview<HTMLUListElement>({
    elementRef: listRef,
    setInview,
    once: false, // 1回だけ実行
  });

  // GSAPを使用してアニメーションを実行
  const circle = useRef<HTMLDivElement>(null);
  const gsapContainer = useRef<HTMLDivElement>(null);
  const gsapList = useRef<HTMLUListElement>(null);
  const gsapCardsref = useRef<HTMLLIElement[]>([]);

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);

  useEffect(() => {
    gsapCardsref.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
  }, []);
  // useGSAPを使用しない方法
  // useEffect(() => {
  //   const el = gsapContainer.current;
  //   if (!el) return;

  //   gsap.fromTo(
  //     ".box",
  //     { rotation: 0 },
  //     {
  //       rotation: "+=360",
  //       duration: 3,
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top 40%",
  //         once: true,
  //       },
  //     }
  //   );
  //   gsap.from(circle.current, {
  //     rotation: "-=360",
  //     duration: 3,
  //     scrollTrigger: {
  //         trigger: el,
  //         start: "top 40%",
  //         once: true,
  //       },
  //   });
  // }, []);

  // GSAPを使用 公式サイトよりそのまま引用
  // 内部的にuseLayoutEffectを使用しているため、公式はuseGSAPのカスタムフック使用を推奨
  // useGSAP(
  //   () => {      // use selectors...
  //     gsap.to(".box", { rotation: "+=360", duration: 3 });

  //     // or refs...
  //     gsap.to(circle.current, { rotation: "-=360", duration: 3 });
  //   },
  //   { scope: gsapContainer }
  // );

  useGSAP(
    () => {
      const q = gsap.utils.selector(gsapContainer);
      gsap.fromTo(
        q(".box"),
        { rotation: 0 },
        {
          rotation: "+=360",
          duration: 3,
          scrollTrigger: {
            trigger: gsapContainer.current,
            start: "top 40%",
            once: true,
          },
        }
      );
      gsap.from(circle.current, {
        rotation: "-=360",
        duration: 3,
        scrollTrigger: {
          trigger: gsapContainer.current,
          start: "top 40%",
          once: true,
        },
      });
    },
    { scope: gsapContainer }
  );

  return (
    <>
      <div className="container">
        <span className="observe-end">End</span>
        <span className="observe-start">Start</span>
        <h1>Practice react motion</h1>

        <div className="spacer"></div>

        <hr />

        <section>
          <h2>Intersection Observer</h2>
          <ul
            className={`cardList fade-in${inview ? " inview" : ""}`}
            ref={listRef}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <li className="card" key={index}>
                <div className="card__img"></div>
                <p className="card__name">Card {index + 1}</p>
                <p className="card__text">This is card number {index + 1}.</p>
              </li>
            ))}
          </ul>
        </section>

        <hr />

        <section>
          <h2>GSAP</h2>
          <div className="gsap-container" ref={gsapContainer}>
            <div className="circle" ref={circle}>
              useRef
            </div>
            <div className="box">Selector</div>
          </div>
          <ul className="cardList" ref={gsapList}>
            {Array.from({ length: 8 }).map((_, index) => (
              <li
                className="card"
                key={index}
                ref={(el: HTMLLIElement | null) => {
                  if (el) gsapCardsref.current[index] = el;
                }}
              >
                <div className="card__img"></div>
                <p className="card__name">Card {index + 1}</p>
                <p className="card__text">This is card number {index + 1}.</p>
              </li>
            ))}
          </ul>
        </section>

        <hr />

        <section>
          <h2>Swiper</h2>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{
              clickable: true,
              type: "fraction",
            }}
            scrollbar={{ draggable: true }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide className="slide" key={index}>
                Slide {index + 1}
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <hr />

        <section>
          <h2>Splide</h2>
          <Splide aria-label="スライダーのデモ">
          {Array.from({ length: 8 }).map((_, index) => (
            <SplideSlide className="slide" key={index}>
              Slide {index + 1}
            </SplideSlide>
          ))}
          </Splide>
        </section>
        <hr />
      </div>
    </>
  );
}

export default App;

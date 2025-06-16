import { useEffect } from "react";

interface ObserverOptions {
  threshold?: number;
  rootMargin: string;
}

interface UseInviewProps<T extends HTMLElement> {
  elementRef: React.RefObject<T | null>; // 要素の参照
  setInview: (inview: boolean) => void; // ビューポートに入ったかどうかを設定する関数
  options?: ObserverOptions;
  once?: boolean; // 1回だけ実行するかどうか
}

const defaultOptions: ObserverOptions = {
  threshold: 0.1,
  rootMargin: "-20% 0%",
};

export const useInview = <T extends HTMLElement>({
  elementRef,
  setInview,
  options = defaultOptions,
  once = true, // デフォルトでは1回だけ実行
}: UseInviewProps<T>) => {
  // Intersection Observerを使用して、要素がビューポートに入ったかどうかを検知
  useEffect(() => {
    const target = elementRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {

      if (once) {
        /* 1回だけ実行の際はこちらを使用 */
        if (once) {
          if (entry.isIntersecting) {
            setInview(true);
            observer.disconnect();
          }
        }
      } else {
        /* 複数回実行はこちらを使用 */
        setInview(entry.isIntersecting);
      }
    }, options);
    
    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, setInview, options, once]);
};

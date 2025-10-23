import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

gsap.registerPlugin(useGSAP);

const Wave = ({ setShowWave, wave = 1 }) => {
  const navigate = useNavigate();
  const text = wave == 0 ? "Thank You" : `WAVE ${wave}`;
  const lettersRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    const onComplete = () => {
      setTimeout(() => {
        toast.success("YAY, You've Completed");
        localStorage.removeItem("game");
        navigate("/");
      }, 2000);
    };

    if (wave == "0") {
      onComplete();
    }
  }, [wave]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(lettersRef.current, {
        y: 200,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
      });

      tl.to({}, { duration: 1 });

      tl.to(lettersRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.in",
      });

      // Optional: call setShowWave(false) after exit animation
      tl.call(() => setShowWave?.(false));
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-10 w-full h-screen bg-black/95 flex flex-row justify-center items-center text-9xl dynapuff"
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => (lettersRef.current[index] = el)}
          style={{
            display: "inline-block",
            whiteSpace: "pre", // preserves spaces
            minWidth: char === " " ? "0.5em" : undefined, // optional: tweak space width
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default Wave;

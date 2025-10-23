import { useState, useEffect, useRef } from "react";

const Pacman = () => {
  const frames = {
    over: (
      <path
        d="M150,0C43.94,3.99,-0.57,89.51,0,150c-0.29,86.42,78.53,156.06,150,150c31.04,1.87,72.72,-15.47,90.17,-29.77L150,150L240.61,29.97C223.11,14.33,178.89,-1.93,150,0"
        fill="#f0c419"
        stroke="#000"
        strokeWidth="2"
      />
    ),
    open: (
      <path
        d="M150,0C61.77,-1.75,-3.38,79.91,0,150C2.33,253.86,88.13,300.93,150,300c49.74,2.07,100.22,-23.63,129.95,-74.97L150,150L279.77,75.00C248.57,24.65,197.58,-1.46,150,0Z"
        fill="#f0c419"
        stroke="#000"
        strokeWidth="2"
      />
    ),
    half: (
      <path
        d="M150,0C61.77,-1.75,-3.38,79.91,0,150C2.33,253.86,88.13,300.93,150,300c68.37,3.74,130.17,-52.62,141.71,-99.91L150,150l141.56,-49.95C273.97,40.27,201.15,-5.14,150,0Z"
        fill="#f0c419"
        stroke="#000"
        strokeWidth="2"
      />
    ),
    closed: (
      <ellipse
        rx="150"
        ry="150"
        transform="translate(150 150)"
        fill="#f0c419"
        stroke="#000"
        strokeWidth="2"
      />
    ),
  };

  const frameOrder = ["over", "open", "half", "closed", "half", "open"];
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frameOrder.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      viewBox="0 0 300 300"
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {frames[frameOrder[frameIndex]]}
    </svg>
  );
};

export default function PacmanEater({
  waveText,
  setMistakes,
  waveComplete,
  setTimer,
  typedIndex,
  setTypedIndex,
}) {
  const firstKeyPressed = useRef(false); // track first key

  const chars = waveText.split("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedChar = e.key;

      if (pressedChar.length !== 1) return;

      // first key press detection
      if (!firstKeyPressed.current) {
        firstKeyPressed.current = true;
        setTimer(true);
      }

      setTypedIndex((prev) => {
        if (prev >= chars.length) return prev;

        const expectedChar = chars[prev];

        if (pressedChar === expectedChar) {
          return prev + 1;
        } else {
          setMistakes((m) => m + 1);
          return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chars, setMistakes]);

  useEffect(() => {
    setTypedIndex(0);
    firstKeyPressed.current = false;
  }, [waveText]);

  useEffect(() => {
    if (typedIndex === chars.length) {
      if (firstKeyPressed.current) waveComplete?.(typedIndex);
      firstKeyPressed.current = false; // reset for next wave
    }
  }, [typedIndex, chars.length, waveComplete]);

  // split into words for wrapping but keep spaces as chars
  const words = waveText.split(" ").map((word) => word + " "); // add space to end of each word

  let globalIndex = 0;

  return (
    <div className="flex w-10/12 flex-wrap gap-2 text-5xl font-mono">
      {words.map((word, wIndex) => (
        <span key={wIndex} className="inline-flex gap-1 whitespace-nowrap">
          {word.split("").map((char) => {
            const currentIndex = globalIndex++;

            // make space visible
            const displayChar = char === " " ? "\u00A0" : char;

            if (currentIndex < typedIndex) {
              return (
                <span key={currentIndex} className="text-gray-400">
                  {displayChar === "\u00A0" ? "\u00A0" : "-"}
                </span>
              );
            }

            if (currentIndex === typedIndex) {
              return (
                <span key={currentIndex} className="inline-flex items-center">
                  <Pacman />
                  <span>{displayChar}</span>
                </span>
              );
            }

            return <span key={currentIndex}>{displayChar}</span>;
          })}
        </span>
      ))}
    </div>
  );
}

const typingTexts = [
  "The sun came up. Birds flew across the sky. Children laughed outside. It was a perfect day.",
  "He opened the book. The pages were old. A map fell out. It looked mysterious.",
  "She heard a noise. The lights flickered. Something moved in the dark. She held her breath.",
  "They built a fire. The wood crackled. Stars shone above. It was quiet and calm.",
  "The car stopped suddenly. Smoke rose from the hood. He called for help. The road was empty.",
  "She painted the wall. The color was bright blue. It changed the room. She smiled proudly.",
  "Rain tapped the window. The room was warm. A candle flickered softly. He sipped his tea.",
  "The baby cried loudly. Mom picked him up. He stopped at once. She rocked him gently.",
  "They climbed the hill. The wind was strong. At the top, they cheered. The view was amazing.",
  "He tied his shoes. The race was about to start. His heart beat fast. The whistle blew.",
];

const isValid = (cdata) => {
  const { name, code, wave, waveText } = cdata;
  if (!name || name === "" || !code || code === "" || !wave || wave === null)
    return false;

  const startIndex = Math.floor(Math.random() * 10);

  let waveTexts = waveText;

  for (let i = 0; i < wave; i++) {
    if (waveText[i]) continue;
    const currentIndex = (startIndex + i) % 10;
    waveTexts[i] = typingTexts[currentIndex];
  }
  return true;
};

module.exports = isValid;

// const calculatePlayerMetrics = (players, game) => {
//   if (!players?.length || !game?.waveText?.length) return [];

//   const totalWaves = game.wave;
//   const timers = [15, 30, 60, 90, 120];

//   const result = players.map((player) => {
//     let totalChars = 0;
//     let totalMistakes = 0;
//     let totalTime = 0;
//     let completedCount = 0;

//     for (let i = 0; i < totalWaves; i++) {
//       const expectedText = game.waveText[i] || "";
//       const playerWave = player.waves.find((w) => w.wave === i + 1);

//       if (playerWave) {
//         const typed = playerWave.completed || "";
//         totalChars += typed.length;
//         totalMistakes += playerWave.mistakes || 0;
//         totalTime += playerWave.time || timers[i] || 0;

//         if (typed.trim() === expectedText.trim()) {
//           completedCount++;
//         }
//       }
//     }

//     const completion = (completedCount / totalWaves) * 100;
//     const accuracy =
//       totalChars + totalMistakes > 0
//         ? (totalChars / (totalChars + totalMistakes)) * 100
//         : 0;

//     const grossWPM = totalTime > 0 ? totalChars / 5 / (totalTime / 60) : 0;
//     const netWPM = grossWPM * (accuracy / 100);

//     return {
//       ...player,
//       stats: {
//         totalWaves,
//         completedWaves: completedCount,
//         totalChars,
//         totalMistakes,
//         totalTime,
//         grossWPM: +grossWPM.toFixed(2),
//         netWPM: +netWPM.toFixed(2),
//         accuracy: +accuracy.toFixed(2),
//         completion: +completion.toFixed(2),
//       },
//     };
//   });

//   result.sort((a, b) => {
//     if (b.stats.netWPM !== a.stats.netWPM)
//       return b.stats.netWPM - a.stats.netWPM;
//     if (b.stats.accuracy !== a.stats.accuracy)
//       return b.stats.accuracy - a.stats.accuracy;
//     return b.stats.completion - a.stats.completion;
//   });

//   return result;
// };

// export default calculatePlayerMetrics;

function calculatePlayerMetrics(players, game) {
  if (!players?.length || !game?.waveText?.length) return [];

  const totalWaves = game.wave;
  const timers = [15, 30, 60, 90, 120];

  const result = players.map((player) => {
    let totalChars = 0;
    let totalMistakes = 0;
    let totalTime = 0;
    let completedCount = 0;

    for (let i = 0; i < totalWaves; i++) {
      const expectedText = game.waveText[i] || "";
      const playerWave = player.waves.find((w) => w.wave === i + 1);

      if (playerWave) {
        const typed = playerWave.completed || "";
        totalChars += typed.length;
        totalMistakes += Number(playerWave.mistakes) || 0;
        totalTime += Number(playerWave.time) || timers[i] || 0;

        if (typed.trim() === expectedText.trim()) completedCount++;
      }
    }

    const completion = (completedCount / totalWaves) * 100;
    const accuracy =
      totalChars + totalMistakes > 0
        ? (totalChars / (totalChars + totalMistakes)) * 100
        : 0;

    const grossWPM = totalTime > 0 ? totalChars / 5 / (totalTime / 60) : 0;
    const netWPM = grossWPM * (accuracy / 100);

    return {
      ...player,
      stats: {
        totalWaves,
        completedWaves: completedCount,
        totalChars: +totalChars,
        totalMistakes: +totalMistakes,
        totalTime: +totalTime,
        grossWPM: +grossWPM.toFixed(2),
        netWPM: +netWPM.toFixed(2),
        accuracy: +accuracy.toFixed(2),
        completion: +completion.toFixed(2),
      },
    };
  });

  // ✅ Sort by best performance (numeric sort)
  result.sort((a, b) => {
    const netDiff = b.stats.netWPM - a.stats.netWPM;
    if (netDiff !== 0) return netDiff;
    const accDiff = b.stats.accuracy - a.stats.accuracy;
    if (accDiff !== 0) return accDiff;
    return b.stats.completion - a.stats.completion;
  });

  // ✅ Add ranks (1-based)
  return result.map((p, i) => ({
    ...p,
    stats: { ...p.stats, rank: i + 1 },
  }));
}

export default calculatePlayerMetrics;

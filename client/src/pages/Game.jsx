import { useEffect, useState } from "react";
import Wave from "../components/Wave";
import PacmanEater from "../components/PacmanEater";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Game = () => {
  const navigate = useNavigate();
  const [showWave, setShowWave] = useState(true);
  const data = JSON.parse(localStorage.getItem("game"));
  const [currentWave, setCurrentWave] = useState({
    wave: 1,
    text: "",
    time: 0,
  });
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const [player, setPlayer] = useState({});

  const timers = [15, 30, 60, 90, 120];

  useEffect(() => {
    setPlayer(JSON.parse(localStorage.getItem("Player")) || {});
    if (!data || !data.name) {
      navigate("/");
    }
  }, [navigate]);

  const addPlayerToDB = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/player/add`, data);
      localStorage.clear();
    } catch (error) {
      console.log("Couldn't Connect To DB", error);
    }
  };

  const waveComplete = (typedIndex) => {
    const completedWaveData = {
      wave: currentWave.wave,
      completed: currentWave.text.slice(0, typedIndex),
      time: timers[data?.wave - currentWave.wave] - currentWave.time,
      mistakes: mistakes,
    };

    setMistakes(0);
    setPlayer({ ...player, waves: [...player.waves, completedWaveData] });

    localStorage.setItem(
      "Player",
      JSON.stringify({ ...player, waves: [...player.waves, completedWaveData] })
    );

    if (currentWave.wave === data.wave) {
      addPlayerToDB({
        ...player,
        waves: [...player.waves, completedWaveData],
      });
    }

    setCurrentWave({
      ...currentWave,
      wave: currentWave.wave < data.wave ? currentWave.wave + 1 : 0,
    });
    setTimer(false);
  };

  useEffect(() => {
    if (!timer) return;
    if (currentWave.time <= 0) {
      waveComplete(typedIndex);
      return;
    }

    const interval = setInterval(() => {
      setCurrentWave((prev) => ({
        ...prev,
        time: prev.time > 0 ? prev.time - 1 : 0,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, currentWave.time, currentWave.wave]);

  useEffect(() => {
    if (currentWave.wave === 0) {
      setCurrentWave((prev) => ({ ...prev, text: " ", time: 0 }));
      setShowWave(true);
      return;
    }

    const wavetime = timers[data?.wave - currentWave.wave];

    setCurrentWave({
      ...currentWave,
      text:
        currentWave.wave <= data?.wave
          ? data.waveText[currentWave.wave - 1]
          : "",
      time: wavetime,
    });
    setShowWave(true);
  }, [currentWave.wave]);

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center py-10">
      {showWave && <Wave setShowWave={setShowWave} wave={currentWave.wave} />}
      <div className="w-4/12 p-5 flex flex-col justify-evenly items-center space-y-5">
        <div className="border w-10/12 space-y-2 card !p-5">
          <p className="flex flex-row justify-between items-center">
            <span>Game Name</span> <span>{data?.name}</span>
          </p>
          <p className="flex flex-row justify-between items-center">
            <span>Game Code</span> <span>{data?.code}</span>
          </p>
          <p className="flex flex-row justify-between items-center">
            <span>Total Wave(s)</span>
            <span>{data?.wave}</span>
          </p>
        </div>
        <div className="flex flex-row w-10/12 justify-between items-center">
          <div className="card space-y-2 !p-5 text-center w-3/12">
            <p>Wave</p>
            <h1 className="text-3xl">{currentWave.wave}</h1>
          </div>
          <div className="card space-y-2 !p-5 text-center w-3/12 ">
            <p>Timer</p>
            <h1 className="text-3xl">{currentWave.time}</h1>
          </div>
          <div className="card space-y-2 !p-5 text-center w-5/12 ">
            <p>Mistakes</p>
            <h1 className="text-3xl">{mistakes}</h1>
          </div>
        </div>
        <div className="card space-y-2 !p-5 text-center w-10/12 h-96 overflow-y-auto">
          <p>Current Text</p>
          <p className="text-white text-justify p-5">{currentWave.text}</p>
        </div>
      </div>
      <PacmanEater
        waveText={currentWave.text}
        setMistakes={setMistakes}
        waveComplete={waveComplete}
        setTimer={setTimer}
        typedIndex={typedIndex}
        setTypedIndex={setTypedIndex}
      />
    </div>
  );
};

export default Game;

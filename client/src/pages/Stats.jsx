import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import calculatePlayerMetrics from "../playerCalculation";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    code: "",
    pass: "",
  });
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const getGameAndPlayer = () => {
      setGame(JSON.parse(localStorage.getItem("game")) || null);
      setPlayers(JSON.parse(localStorage.getItem("Players")) || []);
    };
    getGameAndPlayer();
  }, []);

  const logOut = () => {
    localStorage.clear();
    setGame(null);
    setPlayers([]);
    navigate("/");
  };

  const getStats = async (currGame = game) => {
    try {
      if (!currGame) return toast.error("No game data found");

      if (stats.code === currGame.code) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/isValidPass`,
          {
            pass: stats.pass,
            hashedPass: currGame.pass,
          }
        );

        if (!res.data || !res.data.isValid) {
          logOut();
          return toast.error("Code or Password may be wrong");
        }

        const statlist = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/player/get`,
          { gid: currGame._id }
        );

        setPlayers(statlist.data);
        localStorage.setItem("Players", JSON.stringify(statlist.data));
        toast.success("Players Data Fetched");
      } else {
        toast.error("Invalid game code");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching stats");
    }
  };

  const handleStats = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/join`, {
        icode: stats.code,
      });

      if (!res || !res.data?.gameData) return toast.error("Game not Found");

      const gameData = res.data.gameData;
      setGame(gameData);
      localStorage.setItem("game", JSON.stringify(gameData));
      toast.success("Game Found");

      await getStats(gameData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching stats");
    }
  };

  useEffect(() => {
    if (game && players.length) {
      const metrics = calculatePlayerMetrics(players, game);
      setLeaderboard(metrics);
      console.log("Sorted metrics:", metrics);
    }
  }, [game, players]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {!game ? (
        <form
          className="space-y-10 card"
          onSubmit={(e) => {
            e.preventDefault();
            handleStats();
          }}
        >
          <div className="flex flex-col justify-evenly items-center space-y-8">
            <h3 className="dynapuff text-white text-3xl dynapuff">
              Enter Game Code & Pass
            </h3>
            <input
              required
              value={stats.code}
              onChange={(e) => {
                const fcode = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                setStats({ ...stats, code: fcode.toUpperCase() });
              }}
              className="border rounded-md p-1 px-2 text-2xl"
              type="text"
              placeholder="P4CM4N005"
            />
            <input
              required
              value={stats.pass}
              onChange={(e) => {
                setStats({ ...stats, pass: e.target.value });
              }}
              className="border rounded-md p-1 px-2 text-2xl"
              type="text"
              placeholder="Pass****"
            />
          </div>
          <button
            type="submit"
            className="flex flex-row justify-evenly items-center space-x-3 mont text-xl bg-[#59ac77] p-3 px-7 rounded-xl mx-auto cursor-pointer hover:bg-[#59cc77] text-white"
          >
            <span>
              <FaSearch />
            </span>
            <p>Search</p>
          </button>
        </form>
      ) : (
        <div className="flex flex-row w-full h-screen">
          <div className="w-2/10 flex flex-col justify-between items-center py-10">
            <div className="card w-10/12 space-y-2 !px-5">
              <div className="flex flex-row justify-between items-center">
                <h3>Game Name</h3>
                <p>{game.name}</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <h3>Game Code</h3>
                <p>{game.code}</p>
              </div>
              <div className="flex flex-row justify-between items-center">
                <h3>Total Waves</h3>
                <p>{game.wave}</p>
              </div>
              <div className="flex flex-col justify-evenly items-center">
                <h3>Waves</h3>
                <div className="flex flex-col justify-evenly items-center w-full h-72 overflow-y-auto p-1 space-y-3">
                  {game.waveText.map(
                    (item, index) =>
                      item && (
                        <div key={index} className="w-full p-1 space-y-1">
                          <h3>Wave {index + 1}</h3>
                          <p className="border p-1 text-xs rounded-sm">
                            {item}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <h3>Total Players</h3>
                <p>{players.length}</p>
              </div>
            </div>
            <div
              className="bg-red-400/10 p-2 w-8/12 text-center border-2 border-red-500 rounded-lg cursor-pointer"
              onClick={logOut}
            >
              <button className="text-red-500 dynapuff cursor-pointer">
                Logout
              </button>
            </div>
          </div>
          {players.length ? (
            <div className="w-10/12 p-10 grid grid-cols-4 gap-5 overflow-y-auto h-screen">
              {leaderboard.map((item, index) => (
                <div key={index} className="card !px-10 !py-5 space-y-3 flex  flex-col justify-center">
                  <div className="flex flex-row w-full justify-between items-center">
                    <h3>Name</h3>
                    <p>{item.name}</p>
                  </div>
                  <div className="flex flex-row w-full justify-between items-center">
                    <h3>Identity</h3>
                    <p>{item.identity}</p>
                  </div>
                  <div className="flex flex-row w-full justify-between items-center">
                    <h3>Completed Waves</h3>
                    <p>{item.stats.completedWaves}</p>
                  </div>
                  <div className="flex flex-row w-full justify-between items-center">
                    <h3>totalChars</h3>
                    <p>{item.stats.totalChars}</p>
                  </div>
                  <div className="flex flex-row w-full justify-between items-center">
                    <h3>totalMistakes</h3>
                    <p>{item.stats.totalMistakes}</p>
                  </div>

                  <div className="flex flex-row w-full justify-between items-center">
                    <h3>grossWPM</h3>
                    <p>{item.stats.grossWPM}</p>
                  </div>
                  <div className="border-2 border-red-500 rounded-lg p-3 space-y-2 bg-red-400/20">
                    <div className="flex flex-row w-full justify-between items-center">
                      <h3>netWPM</h3>
                      <p>{item.stats.netWPM}</p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <h3>accuracy</h3>
                      <p>{item.stats.accuracy}</p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <h3>completion</h3>
                      <p>{item.stats.completion}</p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <h3>totalTime</h3>
                      <p>{item.stats.totalTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-10/12 h-screen flex justify-center items-center">
              <h1 className="text-3xl">
                There is no one Played Yet!. Get Someone to Play.
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Stats;

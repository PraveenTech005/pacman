import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Join = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState(
    JSON.parse(localStorage.getItem("game")) || false
  );
  const [code, setCode] = useState("");
  const [playerData, setPlayerData] = useState({
    name: "",
    identity: "",
    waves: [],
    gid: "",
  });

  const handleSearch = async () => {
    try {
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/join`, {
        icode: code,
      });
      toast.success("Game Found");
      localStorage.setItem("game", JSON.stringify(res.data.gameData));
      setGame(res.data.gameData);
      setPlayerData({ ...playerData, gid: res.data.gameData._id });
    } catch (error) {
      toast.error("Error while fetcing");
      toast.error(error?.data.response.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex lg:hidden flex-row justify-center items-center py-8 mont text-lg">
        <h2>Sorry , you have to get back with a PC here.</h2>
      </div>
      <div className="w-full h-screen hidden lg:flex flex-row justify-center items-center py-8">
        {!game ? (
          <form
            className="space-y-10 card"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="flex flex-col justify-evenly items-center space-y-8">
              <h3 className="dynapuff text-white text-3xl dynapuff">
                Enter Game Code
              </h3>
              <input
                required
                value={code}
                onChange={(e) => {
                  const fcode = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                  setCode(fcode.toUpperCase());
                }}
                className="border rounded-md p-1 px-2 text-2xl"
                type="text"
                placeholder="P4CM4N0000"
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
          <div className="w-full flex flex-row justify-evenly items-center">
            <div className="border w-6/12 card !p-8">
              <div className="flex space-y-3 flex-col">
                <h3 className="dynapuff text-xl text-center">
                  🕹️ How to Play - PacMan Type
                </h3>
                <p className="text-center">Fast fingers feed the Pacman!</p>
                <div className="flex flex-col space-y-2">
                  <h3 className="dynapuff text-xl">🎯 Objective</h3>
                  <p>
                    Type the given text as fast and accurately as you can before
                    the timer runs out.
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="dynapuff text-xl">⚡ How It Works</h3>
                  <p>• Each wave shows a new line of text.</p>
                  <p>• The timer starts when you press your first key.</p>
                  <p>
                    • Type every character correctly — mistakes are counted.
                  </p>
                  <p>
                    • When you finish a wave, Pacman moves to the next one
                    automatically.
                  </p>
                  <p>• If the timer hits zero, the wave ends — ready or not!</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="dynapuff text-xl">🍒 Tips</h3>
                  <p>
                    • Accuracy matters more than speed — don’t feed Pacman junk
                    text!
                  </p>
                  <p>• Spaces count too — don’t skip them!</p>
                  <p>• Keep your eyes on Pacman 👀 to track your progress.</p>
                  <p>• Finish all waves to complete the game.</p>
                </div>
                <h3 className="dynapuff text-xl text-center pb-5">
                  🏁 Ready to Start
                </h3>
              </div>
            </div>
            <div className="w-4/12 flex flex-col justify-evenly items-center space-y-10">
              <div className="border card space-y-3 !p-4 w-8/12">
                <h3 className="text-center">Code: {game.code}</h3>
                <button
                  className="p-1 px-3 text-xs rounded-md flex mx-auto cursor-pointer space-x-2 text-center"
                  onClick={() => {
                    setGame(false);
                    localStorage.removeItem("game");
                  }}
                >
                  <p>Wrong Room?</p>{" "}
                  <span className="text-white">Click Here</span>
                </button>
              </div>
              <div className="border w-8/12 space-y-5 card">
                <p className="flex flex-row justify-between items-center">
                  <span>Game Name</span> <span>{game.name}</span>
                </p>
                <p className="flex flex-row justify-between items-center">
                  <span>Game Code</span> <span>{game.code}</span>
                </p>
                <p className="flex flex-row justify-between items-center">
                  <span>Total Wave(s)</span>
                  <span>{game.wave}</span>
                </p>
              </div>
              <form
                className="card w-8/12 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  localStorage.setItem("Player", JSON.stringify(playerData));
                  navigate("/play");
                }}
              >
                <div className="flex flex-col space-y-2">
                  <h3 className="mont text-white">Name</h3>
                  <input
                    required
                    value={playerData.name}
                    onChange={(e) => {
                      setPlayerData({ ...playerData, name: e.target.value });
                    }}
                    className="border rounded-md p-1 px-2"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="mont text-white">Identity</h3>
                  <input
                    required
                    value={playerData.identity}
                    onChange={(e) => {
                      setPlayerData({
                        ...playerData,
                        identity: e.target.value,
                      });
                    }}
                    className="border rounded-md p-1 px-2"
                    type="text"
                    placeholder="Something to identify You"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#59ac77] text-white hover:bg-[#59cc77] p-2 px-4 rounded-md mont mx-auto flex"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Join;

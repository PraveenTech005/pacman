import { MdAdd, MdChevronRight, MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen grid grid-cols-1 gap-20 lg:gap-0 py-10 lg:py-0 lg:grid-cols-3 justify-evenly items-center">
      <div className="card space-y-20 w-10/12 lg:w-8/12 mx-auto">
        <h1 className="dyna text-3xl text-center">Create a Game</h1>
        <button
          className="mx-auto flex cursor-pointer rounded-full"
          onClick={() => navigate("/create")}
        >
          <MdAdd className="border-4 rounded-full p-1 border-[#59AC77] hover:border-[#59EC77] duration-300 text-[#59AC77] hover:text-[#59EC77] mx-auto w-30 h-30" />
        </button>
        <p>
          Host your own typing race! 🎉 Choose a custom text, set up the game,
          and get a unique code to share with your friends. Be the boss of the
          race!
        </p>
      </div>
      <div className="card space-y-20 w-10/12 lg:w-8/12 mx-auto">
        <h1 className="dyna text-3xl text-center">Join a Game</h1>
        <button
          className="mx-auto flex cursor-pointer rounded-full"
          onClick={() => navigate("/join")}
        >
          <MdChevronRight className="border-4 rounded-full p-1 border-[#59AC77] hover:border-[#59EC77] text-[#59AC77] hover:text-[#59EC77] duration-300 mx-auto w-30 h-30" />
        </button>
        <p>
          Got a code? 🚀 Join your friend's typing race and prove your speed. No
          time to waste—fingers on the keyboard!. Click the button, Enter Code,
          Boom.
        </p>
      </div>
      <div className="card space-y-20 w-10/12 lg:w-8/12 mx-auto">
        <h1 className="dyna text-3xl text-center">Get Stats</h1>
        <button
          className="mx-auto flex cursor-pointer rounded-full"
          onClick={() => navigate("/stats")}
        >
          <MdDownload  className="border-4 rounded-full p-5 border-[#59AC77] hover:border-[#59EC77] text-[#59AC77] hover:text-[#59EC77] duration-300 mx-auto w-30 h-30" />
        </button>
        <p>
          Got a code? 🚀 Join your friend's typing race and prove your speed. No
          time to waste—fingers on the keyboard!. Click the button, Enter Code,
          Boom.
        </p>
      </div>
    </div>
  );
};

export default Home;

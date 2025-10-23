import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    code: "",
    pass: "",
    wave: 1,
    waveText: ["", "", "", "", ""],
  });

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
    const { name, code, pass, wave, waveText } = cdata;
    if (
      !name ||
      name === "" ||
      !code ||
      code === "" ||
      !pass ||
      pass === "" ||
      !wave ||
      wave === null
    )
      return false;

    const startIndex = Math.floor(Math.random() * 10);

    let waveTexts = waveText;

    for (let i = 0; i < wave; i++) {
      if (waveText[i]) continue;
      const currentIndex = (startIndex + i) % 10;
      waveTexts[i] = typingTexts[currentIndex];
      setData({ ...data, waveText: waveTexts });
    }
    return true;
  };

  const handleGameSubmit = async () => {
    try {
      if (isValid(data)) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/create`,
          data
        );
        console.log(res.data.message);
        toast.success(`Game ${data.name} Created`);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-row justify-center items-center py-10">
      <div className=" w-9/12 lg:w-8/12 card flex flex-col lg:flex-row justify-evenly items-center space-x-10 m-auto space-y-10 lg:space-y-0">
        <form
          className="w-11/12 lg:w-4/12 space-y-5 mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleGameSubmit();
          }}
        >
          <div className="flex flex-col space-y-2">
            <h3 className="mont text-white">Name</h3>
            <input
              maxLength={10}
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="border rounded-md p-1 px-2"
              type="text"
              placeholder="Name"
              pattern="[A-Za-z]+"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="mont text-white">Set Game Code</h3>
            <input
              required
              value={data.code}
              onChange={(e) => {
                const fcode = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                setData({ ...data, code: fcode.toUpperCase() });
              }}
              className="border rounded-md p-1 px-2"
              type="text"
              placeholder="P4CM4N005"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="mont text-white">Set Password</h3>
            <input
              required
              value={data.pass}
              onChange={(e) => {
                setData({ ...data, pass: e.target.value });
              }}
              className="border rounded-md p-1 px-2"
              type="text"
              placeholder="Pass****"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="mont text-white">
              Wave Count <span className="text-xs text-[#969696]">(1 - 5)</span>
            </h3>
            <input
              required
              value={data.wave}
              onChange={(e) => {
                const value = e.target.value.match(/[1-5]/g);
                const fwave = value ? value.pop() : 1;
                setData({ ...data, wave: fwave });
              }}
              className="border rounded-md p-1 px-2"
              type="number"
              max={5}
              min={1}
              placeholder="1 - 5"
            />
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
        <div className="w-11/12 lg:w-7/12 lg:h-92 overflow-auto flex flex-1 flex-col custom space-y-5 ">
          <p className="text-[#888] pl-10">
            You can add custom sentences or leave it blank.
          </p>
          <div className="flex flex-col w-full lg:p-10 space-y-5">
            {data.wave ? (
              Array.from({ length: data.wave }).map((_, i) => (
                <div key={i} className="w-full space-y-2">
                  <h3>Wave {i + 1} Text</h3>
                  <textarea
                    value={data.waveText[i]}
                    onChange={(e) => {
                      const newWaveText = [...data.waveText];
                      newWaveText[i] = e.target.value;
                      setData({ ...data, waveText: newWaveText });
                    }}
                    rows={3}
                    placeholder={`Custom Sentence ${i + 1}`}
                    className="border rounded-md p-1 w-full px-2"
                  />
                </div>
              ))
            ) : (
              <div className="text-center">
                <p>Please add a number of wave you need.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

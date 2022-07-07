import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { setEnvironmentData } from "worker_threads";
import "./App.css";
import { Pokemon } from "./Pokemon";

function App() {
  const [modalIsVis, setModalIsVis] = useState(false);

  return (
    <>
    <Pokemon />
      {/* <div className="bg-slate-600 w-screen h-screen flex justify-center items-center">
        <div
          id="desktop-container"
          className="w-[80vw] h-[80vh] bg-pink-300 rounded relative"
        >
          {modalIsVis && (
            <Draggable defaultPosition={{ x: -100, y: -200 }}>
              <div className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-600 rounded-lg">
                <div id="folder-header" className="flex justify-between p-4">
                  <p>Pokemon.exe</p>
                  <button onClick={() => setModalIsVis(false)}>close</button>
                </div>
                <Pokemon />
              </div>
            </Draggable>
          )}
          <div
            id="taskbar"
            className="w-full flex gap-8 bg-yellow-400 h-12 absolute bottom-0"
          >
            <button>start</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>

          <div
            id="folders-container"
            className="bg-sky-300 w-48 h-full flex flex-col p-4 gap-4"
          >
            <button
              id="pokemon-folder"
              className="bg-purple-300 w-20 h-20"
              onClick={() => setModalIsVis(true)}
            >
              pokes
            </button>
            <div id="pokemon-folder" className="bg-purple-300 w-20 h-20 ">
              pokes
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default App;

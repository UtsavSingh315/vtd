import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(100); // Initial size of the image
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isClicked) {
      timer = setInterval(() => {
        setSize((prevSize) => Math.max(100, prevSize - 40));
        setCount((prevCount) => Math.max(0, prevCount - 1));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isClicked]);

  useEffect(() => {
    if (count >= 100) {
      setShowModal(true);
    }
  }, [count]);

  const handleClick = () => {
    setIsClicked(true);
    setCount((count) => count + 1);
    setSize((prevSize) => prevSize + 10);
    setTimeout(() => setIsClicked(false), 100);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      onClick={handleClick}
      className="relative  h-[100vh] w-[100vw]  flex flex-col justify-center items-center">
      <div className="absolute inset-0 flex justify-center items-center opacity-20 z-0">
        <h1 className="text-9xl font-bold">{count}</h1>
      </div>
      <div className="flex flex-col justify-center items-center h-[80vh] relative">
        <div className="z-10 flex justify-center items-center flex-col">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        </div>
      </div>
      <h1 className="text-center mt-4">love count {count}</h1>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-500 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">
              You got 3 love wishes!
            </h2>
            <p className="text-lg text-pink-500">Love you 3000</p>
            <button
              className="mt-4 px-4 py-2 bg-pink-700 text-white rounded"
              onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

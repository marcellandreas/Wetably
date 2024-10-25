import { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(15 * 60); // 15 menit
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 menit
  const [isWorking, setIsWorking] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [workInput, setWorkInput] = useState("15");
  const [breakInput, setBreakInput] = useState("5");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsWorking(!isWorking);
      setTimeLeft(isWorking ? breakTime : workTime);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft, workTime, breakTime, isWorking]);

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "work" | "break"
  ) => {
    const value = Number(event.target.value);
    setErrorMessage("");

    // Validasi nilai input hanya saat timer tidak aktif
    if (!isActive) {
      if (value <= 0) {
        setErrorMessage("Value must be greater than 0.");
        return;
      }

      if (type === "work") {
        setWorkTime(value * 60);
        setWorkInput(event.target.value);
        if (isWorking) {
          setTimeLeft(value * 60);
        }
      } else {
        setBreakTime(value * 60);
        setBreakInput(event.target.value);
        if (!isWorking) {
          setTimeLeft(value * 60);
        }
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 bg-gray-100">
      <h2 className="text-2xl mb-4">
        {isWorking ? "Work Time" : "Break Time"}
      </h2>
      <div className="text-6xl font-mono mb-4">{formatTime(timeLeft)}</div>
      <div className="flex gap-4 mb-4">
        <label className="flex flex-col items-center">
          <span className="text-gray-600">Work Duration (minutes)</span>
          <input
            type="number"
            min={1}
            value={workInput}
            onChange={(e) => handleTimeChange(e, "work")}
            className="border p-2 rounded text-center"
          />
        </label>
        <label className="flex flex-col items-center">
          <span className="text-gray-600">Break Duration (minutes)</span>
          <input
            type="number"
            min={1}
            value={breakInput}
            onChange={(e) => handleTimeChange(e, "break")}
            className="border p-2 rounded text-center"
          />
        </label>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <button
        onClick={() => setIsActive(!isActive)}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${
          isActive ? "bg-red-500" : ""
        }`}
      >
        {isActive ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default PomodoroTimer;

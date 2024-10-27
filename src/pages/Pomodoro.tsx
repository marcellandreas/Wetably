import PomodoroTimer from "@/components/PomodoroTimer";

const Pomodoro = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Pomodoro Timer</h1>
      <p className="text-left mb-6  text-gray-700">
        The Pomodoro Technique is a time management method that encourages
        focused work sessions followed by short breaks. Typically, you work for
        25 minutes (a `Pomodoro`) and then take a 5-minute break. This cycle is
        repeated, helping to improve focus and productivity.
      </p>
      <PomodoroTimer />
    </div>
  );
};

export default Pomodoro;

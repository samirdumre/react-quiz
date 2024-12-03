import { useEffect } from "react";

export default function Timer({ dispatch, remainingTimeInSeconds }) {
  const mins = Math.floor(remainingTimeInSeconds / 60);
  const secs = remainingTimeInSeconds % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 ? "0" : ""}
      {mins}:{secs < 10 ? "0" : ""}
      {secs}
    </div>
  );
}

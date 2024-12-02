import { useState, useReducer } from "react";

function reducer(state, action) {  // here state means current state and is 0 for the first time
  if (action.type === "dec" || action.type == "inc") {
    return state + action.payload; // state + action.payload is the new state based on previous "state"   
  }
  if (action.type === "setCount") {
    return action.payload;
  }
} // the current state is stored in count variable

function DateCounter() {
  // const [count, setCount] = useState(0);  
  // const [step, setStep] = useState(1);

  const [count, dispatch] = useReducer(reducer, 0);   // reducer is a function and 0 is the state and the current state is stored in count variable


  // This mutates the date object.
  const date = new Date("june 21 2027");
  // date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type: "dec", payload: -1});  // the parameters stored in dispatch is passed in action

    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({type: "inc", payload: 1});

    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({type: "setCount", payload: Number(e.target.value)})
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={1}
          onChange={defineStep}
        />
        <span>{1}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

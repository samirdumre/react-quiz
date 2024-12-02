import { useEffect, useLayoutEffect, useReducer } from "react";
import Error from './Error'
import Loader from './Loader'
import Header from "./Header";
import Startscreen from "./StartScreen";
import MainPortion from "./MainPortion";

function App() {
  const initialState = {
    questions: [],

    // 'loading', 'error', 'ready', 'active', 'finished'
    status: "loading",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFetchError":
        return {
          ...state,
          status: "error",
        }
      default:
        throw new Error("Action unknown");
    }
  }

  const [{status, question}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function questionsFetch() {
      try {
        const res = await fetch(`http://localhost:9000/questions`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error("Error: ", error);
        dispatch({ type: "dataFetchError" });
      } finally {
        console.log("Fetch attempt finished");
      }
    }

    questionsFetch();
  }, []);
  return (
    <div className="app">
      <Header />
      <MainPortion>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Startscreen />}
      </MainPortion>
    </div>
  );
}

export default App;

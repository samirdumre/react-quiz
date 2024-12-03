import { useEffect, useReducer } from "react";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import MainPortion from "./components/MainPortion";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import questionsData from "./questions.json";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

function App() {
  const initialState = {
    questions: questionsData.questions,

    // 'loading', 'error', 'ready', 'active', 'finished'
    status: "ready",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
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
        };
      case "start":
        return {
          ...state,
          status: "active",
        };
      case "newAnswer":
        const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + 1
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "finish":
        return {
          ...state,
          status: "finished",
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };
      case "restart":
        return {
          ...initialState,
          highScore: state.highScore,
        };
      default:
        throw new Error("Action unknown");
    }
  }

  const [{ status, questions, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // For Fake API using localhost

  // useEffect(() => {
  //   async function questionsFetch() {
  //     try {
  //       const res = await fetch(`http://localhost:9000/questions`);
  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await res.json();
  //       dispatch({ type: "dataReceived", payload: data });
  //     } catch (error) {
  //       console.error("Error: ", error);
  //       dispatch({ type: "dataFetchError" });
  //     } finally {
  //       console.log("Fetch attempt finished");
  //     }
  //   }
  //   questionsFetch();
  // }, []);

  return (
    <div className="app">
      <Header />
      <MainPortion>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </MainPortion>
    </div>
  );
}

export default App;

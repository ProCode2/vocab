import React, { useEffect } from "react";
import "./App.css";
import "./index.css";
import WordList from "./components/WordList";
import Modal from "./components/Modal";
import WordDisplay from "./components/WordDisplay";
import { useDispatch, useSelector } from "react-redux";
import { setWords } from "./actions/wordActions";
import { setFullPage } from "./actions/appActions";
import Head from "./components/Head";

const App = () => {
  const dispatch = useDispatch();

  const appState = useSelector((state) => state.app);
  const fullPage = appState.fullPage;

  useEffect(() => {
    fetch("/getall")
      .then((res) => res.json())
      .then((d) => dispatch(setWords(d)))
      .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <div className="font-kumbh relative">
      <div className="bg-crane w-screen h-screen">
        <Head />
      </div>
      <div className={fullPage ? "s t" : "s"}>
        <div className="flex justify-between items-center mx-4">
          {!fullPage ? (
            <h1 className="text-xl my-4 font-bold">Word List</h1>
          ) : null}
          {fullPage ? (
            <i
              className="fa fa-times text-xl cursor-pointer ml-auto p-4"
              aria-hidden="true"
              onClick={() => dispatch(setFullPage(false))}
            ></i>
          ) : null}
        </div>
        {!fullPage ? <WordList /> : <WordDisplay />}
      </div>
      <Modal />
    </div>
  );
};

export default App;

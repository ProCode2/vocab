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
import FlashMessage from "./components/FlashMessage";
import { getAllWord } from "./Fetch/wordData";

const App = () => {
  const dispatch = useDispatch();

  const appState = useSelector((state) => state.app);
  const fullPage = appState.fullPage;

  useEffect(() => {
    getAllWord()
      .then((data) => {
        dispatch(setWords(data.data.words));
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <div className="font-kumbh relative">
      <div className="bg-crane w-screen h-screen">
        {/* logo and search input */}
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
      {/* floating action button and dialog box */}
      <Modal />
      <FlashMessage />
    </div>
  );
};

export default App;

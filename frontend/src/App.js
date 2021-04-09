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
    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `
        query {
          words {
            _id
            word
            origin
            pronunciations
            info {
              pos
              definitions {
                definition
                examples
              }
            }
          }
        }
        `,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
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
    </div>
  );
};

export default App;

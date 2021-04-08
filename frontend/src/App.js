import React, { useState } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [searching, setSearching] = useState(false);
  const fullPage = (event) => {
    let classNames = event.currentTarget.className.split(" ");
    console.log(classNames);
    if (classNames.includes("t") == false) {
      event.currentTarget.classList.add("t");
    } else {
      event.currentTarget.classList.remove("t");
    }
  };

  return (
    <div className="App">
      <div className="f">
        <form action="#">
          <div className="p-4 text-white">
            {!searching ? (
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Vocab</h1>
                <p onClick={() => setSearching(true)}>S</p>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <input
                  className="bg-transparent focus:outline-none"
                  type="text"
                  autoFocus
                />
                <p onClick={() => setSearching(false)}>X</p>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="s" onClick={fullPage}>
        <div className="c">
          <h1 className="text-black text-bold text-2xl mb-2">New</h1>
          <hr />
          <p>n(j)o</p>
        </div>
      </div>
    </div>
  );
}

export default App;

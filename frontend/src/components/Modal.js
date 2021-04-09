import React, { useState } from "react";
import "./Modal.css";

function Modal() {
  // manage open or close sate of the dialog box
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  //  add the new word
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let newWord = event.currentTarget.querySelector("input").value;
    fetch(`/add/${newWord}`)
      .then((res) => res.json())
      .then((word) => {
        console.log(word);
        setShow(false);
        setLoading(false);
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button
        onClick={() => setShow(true)}
        className="fixed right-2 bottom-2 z-10 p-0 w-16 h-16 bg-crane rounded-full hover:bg-pink-900 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
      >
        <svg
          viewBox="0 0 20 20"
          enableBackground="new 0 0 20 20"
          className="w-6 h-6 inline-block"
        >
          <path
            fill="#FFFFFF"
            d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
          />
        </svg>
      </button>
      {show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add To Dictionary</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form action="#" onSubmit={handleFormSubmit}>
                  <div className="relative p-8 flex items-center justify-center bg-white">
                    <div className="w-full max-w-xs mx-auto">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Word
                        </label>
                        <div className="mt-1">
                          <input
                            autoComplete="off"
                            autoFocus
                            type="text"
                            name="word"
                            id="word"
                            className="shadow-sm block w-full sm:text-sm py-2 pl-2 text-gray-800 text-xl focus:outline-none border-b-2 focus:border-crane"
                            aria-describedby="word-description"
                          />
                        </div>
                        <p
                          className="mt-2 text-sm text-gray-500"
                          id="word-description"
                        >
                          Should be a valid word.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShow(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-between items-center bg-crane text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="sybmit"
                    >
                      {loading && <div className="loader mr-2"></div>}
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Modal;

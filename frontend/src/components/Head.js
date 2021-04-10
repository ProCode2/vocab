import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setSearching } from "../actions/appActions";

const Head = () => {
  // getting the app state
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const searching = appState.searching;

  // set new search query, typed by user
  const handleChange = (event) => {
    dispatch(setSearchText(event.target.value));
  };

  return (
    <form action="#" onSubmit={(e) => e.preventDefault()}>
      <div className="p-4 text-white">
        {!searching ? (
          //  Logo
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Vocab</h1>
            <i
              className="fa fa-search text-xl cursor-pointer"
              aria-hidden="true"
              onClick={() => dispatch(setSearching(true))}
            ></i>
          </div>
        ) : (
          // input form
          <div className="flex justify-between items-center text-xl">
            <input
              className="bg-transparent focus:outline-none"
              type="text"
              placeholder="Search"
              onChange={handleChange}
              autoFocus
            />
            <i
              className="fa fa-times text-xl cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                dispatch(setSearchText(""));
                dispatch(setSearching(false));
              }}
            ></i>
          </div>
        )}
      </div>
    </form>
  );
};

export default Head;

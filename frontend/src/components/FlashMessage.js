import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFlashMessage } from "../actions/appActions";

const FlashMessage = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const flashMessage = appState.flashMessage;

  useEffect(() => {
    // remove the component after 3 seconds
    let timeoutID = setTimeout(() => {
      dispatch(setFlashMessage(""));
      clearTimeout(timeoutID);
    }, 3000);
  }, [flashMessage, dispatch]);

  return flashMessage !== "" ? (
    <div className="bg-gray-600 text-white text-center py-4 transition-all ease-out duration-500 fixed w-full bottom-0">
      <p>{flashMessage}</p>
    </div>
  ) : null;
};

export default FlashMessage;

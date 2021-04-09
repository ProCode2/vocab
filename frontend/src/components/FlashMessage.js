import React from "react";
import { useSelector } from "react-redux";

const FlashMessage = () => {
  const appState = useSelector((state) => state.app);
  const flashMessage = appState.flashMessage;

  return flashMessage !== "" ? (
    <div className="bg-gray-600 text-white text-center py-4 transition-all ease-out duration-500 fixed w-full bottom-0">
      <p>{flashMessage}</p>
    </div>
  ) : null;
};

export default FlashMessage;

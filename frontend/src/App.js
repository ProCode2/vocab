import React from "react";
import "./App.css";
import "./index.css";

function App() {
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  }, []);
  return <div className="App">"Hello World"</div>;
}

export default App;

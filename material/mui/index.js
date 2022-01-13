import React from "https://unpkg.com/react@17/umd/react.development.js";
import ReactDOM from "https://unpkg.com/react-dom@17/umd/react-dom.development.js";
import Button from "@mui/material/Button";

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

console.log("Hello");

ReactDOM.render(<App />, document.querySelector("#app"));

console.log("Hello");

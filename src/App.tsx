import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import User from "./features/user/User";

function App() {
  return <div className="App">
    <User />
  </div>;
}

export default App;

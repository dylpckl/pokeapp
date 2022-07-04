import { useEffect, useState } from "react";
import { setEnvironmentData } from "worker_threads";
import "./App.css";
import { Pokemon } from "./Pokemon";

function App() {
  return <Pokemon />;
}

export default App;

import "./App.css";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return <Routes>{routes.map((val) => val)}</Routes>;
}

export default App;

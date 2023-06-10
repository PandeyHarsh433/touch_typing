import "./App.css";
import Top from "./Components/Header";
import Home from "./Components/Home";
import Background from "./Components/Background";

function App() {
  return (
    <div className="App">
      <Background />
      <Top />
      <Home />
    </div>
  );
}

export default App;

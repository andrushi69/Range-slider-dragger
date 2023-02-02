import React from "react";
import RangeSlider from "./components/RangeSlider/RangeSlider";


function App() {
  return (
    <div className="App">
      <h1 className="mainTitle">Welcome to Range Slider</h1>
      <RangeSlider min={0} max={99}/>
    </div>
  );
}

export default App;

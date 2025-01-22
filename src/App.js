import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Birthday from "./Birthday";
import GiftCover from "./GiftCover";

function App() {
  const [showCover, setShowCover] = useState(true);

  const handleOpenGift = () => {
    setShowCover(false);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {showCover ? <GiftCover onOpenGift={handleOpenGift} /> : <Birthday />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;

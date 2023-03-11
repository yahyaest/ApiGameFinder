import React from "react";
import Banner from "./common/banner";
import GameInfo from "./gameInfo";

const GameForm = (props) => {
  const { id } = props.match.params;
  let localData = JSON.parse(localStorage.getItem(`${id}`));

  return (
    <div>
      <Banner data={localData} />
      <GameInfo data={localData} />
    </div>
  );
};

export default GameForm;

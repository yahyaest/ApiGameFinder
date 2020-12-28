import React from "react";
import Banner from "./common/banner";
import GameInfo from "./gameInfo";

const GameForm = (props) => {
  const { id } = props.match.params;
  //console.log(id);
  let localData = JSON.parse(localStorage.getItem(`${id}`));
 // console.log("localData", localData);

  //// Using localStorage persist the data in new tab contrary to props.location.state
  // const { data } = props.location.state;
  //console.log(data);

  return (
    <div>
      <Banner data={localData} />
      <GameInfo data={localData} />
    </div>
  );
};

export default GameForm;

import React from "react";
import "../css/gameInfo.css";

const GameInfo = ({ data }) => {
  return (
    <div className="container">
      {data.cover && (
        <img
          className="cover"
          src={`https://${data?.cover.url}`.replace("thumb", "720p")}
          alt="data.name}"
        />
      )}

      <h1>Story Line</h1>
      <p>{data?.storyline || data?.summary}</p>
      <h1>Release Date </h1>
      <h5>{data.release_dates ? data.release_dates[0].human : "Not Found"}</h5>
      <h1>Screenshots</h1>
      <div className="sceenshots">
        {data.screenshots
          ? data.screenshots.map((screenshot) => (
              <img
                key={screenshot.id}
                src={`https://${screenshot.url}`.replace("thumb", "logo_med")}
                alt={data.name}
              ></img>
            ))
          : ""}
      </div>
    </div>
  );
};

export default GameInfo;

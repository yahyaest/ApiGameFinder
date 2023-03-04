import React, { useState } from "react";

function CorsPage() {
  const [isHome, setIsHome] = useState(false);
  return (
    <div style={{ width: "90%", marginTop: "250px", textAlign: "center" }}>
      <p>
        This site uses igdb api that doesn't support cors origin. <br /> To
        enable CORS please click on the button below. <br /> You'll be directed
        to "https://cors-anywhere.herokuapp.com/corsdemo" to unlock access to
        igdb api. <br /> Then refresh the site and everything will work
        perfectly. <br /> If you get redirect to this page again then you have
        riched the limit 50 api call per hour. <br /> Please retry after one
        hour.
      </p>

      {isHome ? (
        <button
          className="register__button"
          style={{ width: "175px" }}
          onClick={() =>
            window.location.replace("/")
          }
        >
          Home Page
        </button>
      ) : (
        <button
          className="register__button"
          style={{ width: "175px" }}
          onClick={() => {
            setIsHome(true);
            window.open("https://cors-anywhere.herokuapp.com/corsdemo");
          }}
        >
          Enable CORS
        </button>
      )}
    </div>
  );
}

export default CorsPage;

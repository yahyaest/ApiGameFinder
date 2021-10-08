import React from "react";

function CorsPage() {
  return (
    <div style={{ width: "90%", marginTop: "250px", textAlign: "center" }}>
      <p>
        This site uses igdb api that doesn't support cors origin. <br /> To
        enable CORS please click on the button below. <br /> You'll be directed
        to "https://cors-anywhere.herokuapp.com/corsdemo" to unlock access to
        igdb api. <br /> Then refresh the site and everything will work
        perfectly. <br /> If you get redirect to this pagr again then you have
        riched the limit 50 api call per hour. <br /> Please retry after one
        hour.
      </p>

      <button
        className="register__button"
        style={{ width: "175px" }}
        onClick={() =>
          window.open("https://cors-anywhere.herokuapp.com/corsdemo")
        }
      >
        Enable CORS
      </button>
    </div>
  );
}

export default CorsPage;

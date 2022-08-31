import React from "react";
// CSS
import "./Home.css";
// Link
import { Link } from "react-router-dom";
// Context
import { useGlobalContext } from "../useContext";

const Home = () => {
  const { playerFirst, iconClicked, setIconClicked, setPlayMode, setScore } =
    useGlobalContext();

  return (
    <section className="home">
      <header>
        <img src={"/assets/logo.svg"} alt="logo" className="logo" />
      </header>

      <div className="choice">
        <p>PICK PLAYER 1'S MARK</p>
        <div className="icon-container">
          <div
            className={`icon ${iconClicked === "x" && "clicked-icon"}`}
            onClick={() => setIconClicked("x")}
          >
            <img
              src={
                iconClicked === "x"
                  ? "/assets/icon-x-dark.svg"
                  : "/assets/icon-x-gray.svg"
              }
              alt="x"
              className="x"
            />
          </div>

          <div
            className={`icon ${iconClicked === "o" && "clicked-icon"}`}
            onClick={() => setIconClicked("o")}
          >
            <img
              src={
                iconClicked === "o"
                  ? "/assets/icon-o-dark.svg"
                  : "/assets/icon-o-gray.svg"
              }
              alt="o"
              className="o"
            />
          </div>
        </div>
        <p>REMEMBER: X GOES FIRST</p>
      </div>

      <div className="btn-container">
        <Link
          to={"/game"}
          className="btn cpu-btn"
          onClick={() => {
            setPlayMode("vs CPU");
            playerFirst("vs CPU");
            setScore({ wins: 0, ties: 0, losses: 0 });
          }}
        >
          NEW GAME (VS CPU)
        </Link>

        <Link
          to={"/game"}
          className="btn player-btn"
          onClick={() => {
            setPlayMode("vs PLAYER");
            setScore({ wins: 0, ties: 0, losses: 0 });
            playerFirst("vs PLAYER");
          }}
        >
          NEW GAME (VS PLAYER)
        </Link>
      </div>

      <div className="text">
        <p>
          This App was ceated by <span className="name">Yassin Yahyawi</span> as
          part of the{" "}
          <a
            href="https:www.frontendmentor.io"
            target="_blank"
            rel="noreferrer"
          >
            frontendmentor.io
          </a>{" "}
          challenge.
        </p>
      </div>
    </section>
  );
};

export default Home;

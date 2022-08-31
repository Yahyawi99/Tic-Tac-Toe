import React, { useEffect } from "react";
// CSS
import "./Playground.css";
// Link
import { Link } from "react-router-dom";
// Context
import { useGlobalContext } from "../useContext";

const Playground = () => {
  const {
    opponent,
    GridRef,
    turn,
    squares,
    addIcon,
    setIsGameOn,
    showModal,
    setShowModal,
    score,
    setScore,
    gameDefaultOptions,
    singlePlayerMode,
    playMode,
    twoPlayerMode,
    result,
    resultMsg,
  } = useGlobalContext();

  useEffect(() => {
    if (playMode === "vs CPU") {
      singlePlayerMode();
    } else {
      twoPlayerMode();
    }
  }, [turn]);

  return (
    <>
      <section className="playground">
        <header>
          <img src={"/assets/logo.svg"} alt="logo" className="logo" />

          <div className="turn">
            <img
              src={`/assets/icon-${opponent}.svg`}
              alt="icon"
              className="icon_turn"
            />
            <p>TURN</p>
          </div>

          <div
            className="restart-icon"
            onClick={() => {
              gameDefaultOptions();
              setScore({ wins: 0, ties: 0, losses: 0 });
            }}
          >
            <img
              src={"/assets/icon-restart.svg"}
              alt="restart"
              className="restart"
            />
          </div>
        </header>

        <div className="grid" ref={GridRef}>
          {squares.map((item, i) => {
            return (
              <div key={i} className="square" onClick={(e) => addIcon(e)}>
                {item}
              </div>
            );
          })}
        </div>

        <div className="score-container">
          <div className="P1">
            <p>X (P1)</p>
            <span className="score">{score.wins}</span>
          </div>

          <div className="ties">
            <p>TIES</p>
            <span className="score">{score.ties}</span>
          </div>

          <div className="P2">
            <p>O ({playMode === "vs CPU" ? "CPU" : "P2"})</p>
            <span className="score">{score.losses}</span>
          </div>
        </div>
      </section>

      {showModal && (
        <Modal
          gameDefaultOptions={gameDefaultOptions}
          setIsGameOn={setIsGameOn}
          setShowModal={setShowModal}
          result={result}
          resultMsg={resultMsg}
          setScore={setScore}
        />
      )}
    </>
  );
};

const Modal = ({
  setShowModal,
  setIsGameOn,
  gameDefaultOptions,
  result,
  resultMsg,
  setScore,
}) => {
  return (
    <section className="modal">
      <div className="modal-container">
        <p className="game-state">{resultMsg}</p>

        {resultMsg !== "YOU TIED!" && (
          <p className="game-msg">
            <img src={result.src} alt="winner-icon" />
            <span style={{ color: result.clr }}>TAKES THE ROUND</span>
          </p>
        )}

        <div className="modal-btns">
          <Link
            to={"/"}
            className="btn"
            onClick={() => {
              setShowModal(false);
              setIsGameOn(true);
              setScore({ wins: 0, ties: 0, losses: 0 });
            }}
          >
            QUIT
          </Link>
          <button
            style={{
              backgroundColor: result.btnClr,
              boxShadow: `0px 4px ${result.btnShadow}`,
            }}
            className="btn"
            onClick={() => {
              setShowModal(false);
              gameDefaultOptions();
            }}
          >
            NEXT ROUND
          </button>
        </div>
      </div>
    </section>
  );
};

export default Playground;

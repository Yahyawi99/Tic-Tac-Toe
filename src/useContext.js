import React, { useContext, useState, useRef } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [playMode, setPlayMode] = useState("vs CPU");
  const [iconClicked, setIconClicked] = useState("x");
  const [choosenIcon, setChoosenIcon] = useState(iconClicked);
  const [turn, setTurn] = useState("player1");
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
  const [showModal, setShowModal] = useState(false);
  const [opponent, setOpponent] = useState(iconClicked);
  const [IsGameOn, setIsGameOn] = useState(true);
  const [score, setScore] = useState({ wins: 0, ties: 0, losses: 0 });
  const [result, setResult] = useState({
    src: "",
    clr: "",
    btnClr: "",
    btnShadow: "",
  });
  const [resultMsg, setResultMsg] = useState("");
  const GridRef = useRef(null);

  // *************************************************************************************************************************************
  // *************************************************************************************************************************************
  // *************************************************************************************************************************************

  const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

  // add icon to square
  const addIcon = (e) => {
    if (!e.currentTarget.children.length && turn !== "bot") {
      e.currentTarget.innerHTML = `<img src="/assets/icon-${choosenIcon}.svg" alt="icon"  />`;

      if (playMode === "vs CPU") {
        setTurn("bot");
      } else {
        if (turn === "player2") {
          setTurn("player1");
        } else {
          setTurn("player2");
        }
      }
    }
    gameLogic();
  };

  // player vs bot mode
  const singlePlayerMode = async () => {
    if (IsGameOn && playMode === "vs CPU") {
      if (turn === "bot") {
        gameLogic();

        await wait(500);

        const mySquares = GridRef.current.children;

        if (iconClicked === "x") {
          setOpponent("o");

          botBrain(mySquares);
        } else {
          setOpponent("x");

          botBrain(mySquares);
        }
        await wait(600);
        setTurn("player1");
      } else if (turn === "player1") {
        gameLogic();

        setOpponent(iconClicked);
        setChoosenIcon(iconClicked);
      }
    }
  };

  // Bot brain
  const checkIfEmpty = (element) => {
    return true
      ? element.children.length > 0 &&
          element.children[0].src.includes(iconClicked)
      : false;
  };

  const botBrain = (grid) => {
    if (
      (checkIfEmpty(grid[1]) &&
        checkIfEmpty(grid[2]) &&
        grid[0].children.length === 0) ||
      (checkIfEmpty(grid[4]) &&
        checkIfEmpty(grid[8]) &&
        grid[0].children.length === 0) ||
      (checkIfEmpty(grid[6]) &&
        checkIfEmpty(grid[3]) &&
        grid[0].children.length === 0)
    ) {
      grid[0].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    if (
      (checkIfEmpty(grid[4]) &&
        checkIfEmpty(grid[7]) &&
        grid[1].children.length === 0) ||
      (checkIfEmpty(grid[0]) &&
        checkIfEmpty(grid[2]) &&
        grid[1].children.length === 0)
    ) {
      console.log("in 1");

      grid[1].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    if (
      (checkIfEmpty(grid[0]) &&
        checkIfEmpty(grid[1]) &&
        grid[2].children.length === 0) ||
      (checkIfEmpty(grid[6]) &&
        checkIfEmpty(grid[4]) &&
        grid[2].children.length === 0) ||
      (checkIfEmpty(grid[5]) &&
        checkIfEmpty(grid[8]) &&
        grid[2].children.length === 0)
    ) {
      grid[2].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    if (
      (checkIfEmpty(grid[4]) &&
        checkIfEmpty(grid[5]) &&
        grid[3].children.length === 0) ||
      (checkIfEmpty(grid[0]) &&
        checkIfEmpty(grid[6]) &&
        grid[3].children.length === 0)
    ) {
      grid[3].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    if (
      (checkIfEmpty(grid[0]) &&
        checkIfEmpty(grid[8]) &&
        grid[4].children.length === 0) ||
      (checkIfEmpty(grid[1]) &&
        checkIfEmpty(grid[7]) &&
        grid[4].children.length === 0) ||
      (checkIfEmpty(grid[2]) &&
        checkIfEmpty(grid[6]) &&
        grid[4].children.length === 0) ||
      (checkIfEmpty(grid[5]) &&
        checkIfEmpty(grid[3]) &&
        grid[4].children.length === 0)
    ) {
      grid[4].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    if (
      (checkIfEmpty(grid[2]) &&
        checkIfEmpty(grid[8]) &&
        grid[5].children.length === 0) ||
      (checkIfEmpty(grid[3]) &&
        checkIfEmpty(grid[4]) &&
        grid[5].children.length === 0)
    ) {
      grid[5].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    if (
      (checkIfEmpty(grid[0]) &&
        checkIfEmpty(grid[3]) &&
        grid[6].children.length === 0) ||
      (checkIfEmpty(grid[2]) &&
        checkIfEmpty(grid[4]) &&
        grid[6].children.length === 0) ||
      (checkIfEmpty(grid[8]) &&
        checkIfEmpty(grid[7]) &&
        grid[6].children.length === 0)
    ) {
      grid[6].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    if (
      (checkIfEmpty(grid[1]) &&
        checkIfEmpty(grid[4]) &&
        grid[7].children.length === 0) ||
      (checkIfEmpty(grid[6]) &&
        checkIfEmpty(grid[8]) &&
        grid[7].children.length === 0)
    ) {
      grid[7].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    if (
      (checkIfEmpty(grid[0]) &&
        checkIfEmpty(grid[4]) &&
        grid[8].children.length === 0) ||
      (checkIfEmpty(grid[2]) &&
        checkIfEmpty(grid[5]) &&
        grid[8].children.length === 0) ||
      (checkIfEmpty(grid[6]) &&
        checkIfEmpty(grid[7]) &&
        grid[8].children.length === 0)
    ) {
      grid[8].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
      return;
    }

    // Random
    const filtredGrid = [...grid].filter(
      (square) => square.children.length === 0
    );

    let rndm = Math.floor(Math.random() * filtredGrid.length);

    filtredGrid[
      rndm
    ].innerHTML = `<img src="/assets/icon-o.svg" alt="icon"  />`;
    return;
  };

  // two player mode
  const twoPlayerMode = () => {
    if (IsGameOn && playMode === "vs PLAYER") {
      gameLogic();

      if (turn === "player1") {
        setChoosenIcon(iconClicked);
        setOpponent(iconClicked);
      } else {
        if (iconClicked === "x") {
          setChoosenIcon("o");
          setOpponent("o");
        } else {
          setChoosenIcon("x");
          setOpponent("x");
        }
      }
    }
  };

  // game logic
  const gameLogic = () => {
    const mySquare = GridRef.current.children;
    const Grid = [...GridRef.current.children].every(
      (element) => element.innerHTML !== ""
    );

    if (
      mySquare[0].innerHTML &&
      mySquare[0].innerHTML === mySquare[1].innerHTML &&
      mySquare[0].innerHTML === mySquare[2].innerHTML
    ) {
      styleWinnerSquare(
        mySquare[0].children[0].src,
        mySquare[0],
        mySquare[1],
        mySquare[2]
      );
    } else if (
      mySquare[3].innerHTML &&
      mySquare[3].innerHTML === mySquare[4].innerHTML &&
      mySquare[3].innerHTML === mySquare[5].innerHTML
    ) {
      styleWinnerSquare(
        mySquare[3].children[0].src,
        mySquare[3],
        mySquare[4],
        mySquare[5]
      );
    } else if (
      mySquare[6].innerHTML &&
      mySquare[6].innerHTML === mySquare[7].innerHTML &&
      mySquare[6].innerHTML === mySquare[8].innerHTML
    ) {
      styleWinnerSquare(
        mySquare[6].children[0].src,
        mySquare[6],
        mySquare[7],
        mySquare[8]
      );
    } else if (
      mySquare[0].innerHTML &&
      mySquare[0].innerHTML === mySquare[3].innerHTML &&
      mySquare[0].innerHTML === mySquare[6].innerHTML
    ) {
      styleWinnerSquare(
        mySquare[0].children[0].src,
        mySquare[0],
        mySquare[3],
        mySquare[6]
      );
    } else if (
      mySquare[1].innerHTML &&
      mySquare[1].innerHTML === mySquare[4].innerHTML &&
      mySquare[1].innerHTML === mySquare[7].innerHTML
    ) {
      styleWinnerSquare(
        mySquare[1].children[0].src,
        mySquare[1],
        mySquare[4],
        mySquare[7]
      );
    } else if (
      mySquare[2].innerHTML &&
      mySquare[2].innerHTML === mySquare[5].innerHTML &&
      mySquare[2].innerHTML === mySquare[8].innerHTML
    ) {
      styleWinnerSquare(
        mySquare[2].children[0].src,
        mySquare[2],
        mySquare[5],
        mySquare[8]
      );
    } else if (
      mySquare[0].innerHTML &&
      mySquare[0].innerHTML === mySquare[4].innerHTML &&
      mySquare[0].innerHTML === mySquare[8].innerHTML
    ) {
      styleWinnerSquare(
        mySquare[0].children[0].src,
        mySquare[0],
        mySquare[4],
        mySquare[8]
      );
    } else if (
      mySquare[2].innerHTML &&
      mySquare[2].innerHTML === mySquare[4].innerHTML &&
      mySquare[2].innerHTML === mySquare[6].innerHTML
    ) {
      styleWinnerSquare(
        mySquare[2].children[0].src,
        mySquare[2],
        mySquare[4],
        mySquare[6]
      );

      return;
    } else if (Grid) {
      gameScore(null);

      setIsGameOn(false);

      modalResult("tie");

      setTimeout(() => {
        setShowModal(true);
      }, 100);
    }
  };

  // styling winner squares
  const styleWinnerSquare = (src, child1, child2, child3) => {
    if (src.includes("icon-x")) {
      child1.children[0].src = "assets/icon-x-dark.svg";
      child2.children[0].src = "assets/icon-x-dark.svg";
      child3.children[0].src = "assets/icon-x-dark.svg";

      modalResult("x");
    }

    if (src.includes("icon-o")) {
      child1.children[0].src = "assets/icon-o-dark.svg";
      child2.children[0].src = "assets/icon-o-dark.svg";
      child3.children[0].src = "assets/icon-o-dark.svg";

      modalResult("o");
    }

    child1.style.backgroundColor = "rgba(255,255,0,0.85)";
    child2.style.backgroundColor = "rgba(255,255,0,0.85)";
    child3.style.backgroundColor = "rgba(255,255,0,0.85)";

    setTurn("Game Over");

    setTimeout(() => {
      setShowModal(true);
      gameScore(src);
    }, 100);
  };

  // score
  const gameScore = (src) => {
    if (src) {
      const result = src.includes(`-${iconClicked}`);

      if (result) {
        setScore({ ...score, wins: score.wins + 1 });
      } else {
        setScore({ ...score, losses: score.losses + 1 });
      }
    } else {
      setScore({ ...score, ties: score.ties + 1 });
    }
  };

  // make the player who chooses X plays first
  const playerFirst = (mode) => {
    if (mode === "vs CPU") {
      if (iconClicked === "o") {
        setTurn("bot");
      } else {
        setTurn("player1");
      }
      //
    } else {
      if (iconClicked === "o") {
        setTurn("player2");
        setChoosenIcon("x");
        setOpponent("x");
      } else {
        setTurn("player1");
        setChoosenIcon(iconClicked);
        setOpponent(iconClicked);
      }
    }
  };

  // reset to default
  const gameDefaultOptions = () => {
    [...GridRef.current.children].forEach((element) => {
      element.innerHTML = "";
      element.style.backgroundColor = "var(--player-select-bg-color)";
    });
    setIsGameOn(true);
    playerFirst(playMode);
  };

  // Modal result
  const modalResult = (icon) => {
    if (icon === "x") {
      setResult({
        src: "/assets/icon-x.svg",
        clr: "var(--blue-button-bg)",
        btnClr: "var(--yellow-button-bg)",
        btnShadow: "var(--yellow-button-shadow)",
      });
    } else if (icon === "o") {
      setResult({
        src: "/assets/icon-o.svg",
        clr: "var(--yellow-button-bg)",
        btnClr: "var(--blue-button-bg)",
        btnShadow: "var(--blue-button-shadow)",
      });
    } else {
      setResult({
        src: "",
        clr: "",
        btnClr: "var(--gray-button-bg-hover)",
        btnShadow: "var(--gray-button-shadow)",
      });
    }

    modalResultTxt(icon);
  };

  const modalResultTxt = (icon) => {
    if (icon === iconClicked) {
      setResultMsg("YOU WON!");
    } else if (icon === "tie") {
      setResultMsg("YOU TIED!");
    } else {
      setResultMsg("YOU LOST!");
    }
  };

  return (
    <AppContext.Provider
      value={{
        GridRef,
        iconClicked,
        setIconClicked,
        turn,
        setTurn,
        squares,
        setSquares,
        wait,
        opponent,
        setOpponent,
        playerFirst,
        gameLogic,
        IsGameOn,
        setIsGameOn,
        showModal,
        setShowModal,
        score,
        setScore,
        gameDefaultOptions,
        singlePlayerMode,
        playMode,
        setPlayMode,
        twoPlayerMode,
        addIcon,
        result,
        resultMsg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;

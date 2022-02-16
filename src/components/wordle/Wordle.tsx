import React, { useEffect, useState } from "react";
import "./Wordle.css";
import BlockLine from "../BlockLine/BlockLine";
import data from "../../data/wordle-data.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

enum MATCHES {
  GREEN = "green",
  ORANGE = "orange",
  GREY = "grey",
  WHITE = "white",
  EMPTY = "transparent",
}

interface enteredWord {
  letters: string[];
  matches: MATCHES[];
}

const LENGTH = 5;
const EMPTY: enteredWord = {
  letters: ["", "", "", "", ""],
  matches: [
    MATCHES.EMPTY,
    MATCHES.EMPTY,
    MATCHES.EMPTY,
    MATCHES.EMPTY,
    MATCHES.EMPTY,
  ],
};

// Todays Solution
const WORD =
  data.solutions[
    Math.floor(new Date().setHours(0, 0, 0, 0) / 1000) % data.solutions.length
  ].toUpperCase();

// check every letter if it matches today's solution
const matchWord = (word: string[]): MATCHES[] => {
  const matches: MATCHES[] = [];
  word.map((w, i) => {
    if (WORD.at(i) === w) {
      matches[i] = MATCHES.GREEN;
    } else if (WORD.includes(w)) {
      matches[i] = MATCHES.ORANGE;
    } else {
      matches[i] = MATCHES.GREY;
    }
  });
  return matches;
};

// check if the given input is a valid word
const checkIfValid = (word: string): boolean => {
  return data.wordle.includes(word.toLowerCase());
};

const Wordle = (): JSX.Element => {
  const [curLetters, setCurLetters] = useState<string[]>([]); // TODO try out with useRef
  const [oldMatches, setOldMatches] = useState<enteredWord[]>([]);
  const notify = () => toast.error("Invalid input! Try again 🚀");

  useEffect(() => {
    console.log(WORD);
    const matchInput = () => {
      if (checkIfValid(curLetters.join(""))) {
        setOldMatches((oldMatches) => [
          { letters: curLetters, matches: matchWord(curLetters) },
          ...oldMatches,
        ]);
        setCurLetters(() => []);
      } else {
        notify();
      }
    };

    const handleNewLetter = (letter: string) => {
      setCurLetters((curLetters) => [...curLetters, letter.toUpperCase()]);
    };

    const keypress = (event: KeyboardEvent) => {
      const key = event.key;
      if (event.key === "Enter") {
        if (curLetters.length === LENGTH) {
          matchInput();
        }
      } else if (event.key === "Backspace" && curLetters.length > 0) {
        setCurLetters((curLetters) => [
          ...curLetters.slice(0, curLetters.length - 1),
        ]);
      } else if (
        /[a-zA-Z]/.test(key) &&
        !event.ctrlKey &&
        !event.altKey &&
        event.key.length === 1
      ) {
        if (curLetters.length < LENGTH) {
          handleNewLetter(key);
        }
        // comment out, used to check the word automatically, when a 6th letter was entered
        // else {
        //   matchInput();
        //   setCurLetters(() => [key.toUpperCase()]);
        // }
      }
    };

    document.body.addEventListener("keydown", keypress);
    return () => document.body.removeEventListener("keydown", keypress);
  }, [curLetters]);

  return (
    <>
      <div className="Title">Christina's Wordle</div>
      <ToastContainer />
      <div className="Row-block">
        {curLetters.length > 0 && curLetters.length <= 5 && (
          <BlockLine
            blocks={{
              letters: curLetters,
              matches: [
                MATCHES.WHITE,
                MATCHES.WHITE,
                MATCHES.WHITE,
                MATCHES.WHITE,
                MATCHES.WHITE,
              ],
            }}
          />
        )}
        {oldMatches.map((oldMatch, index) => (
          <BlockLine blocks={oldMatch} key={index} />
        ))}
        {6 - (oldMatches.length + (curLetters.length > 0 ? 1 : 0)) > 0 &&
          [
            ...Array(6 - (oldMatches.length + (curLetters.length > 0 ? 1 : 0))),
          ].map((spaceholder, index) => (
            <BlockLine blocks={EMPTY} key={index} />
          ))}
      </div>
    </>
  );
};

export default Wordle;
export { MATCHES };
export type { enteredWord };

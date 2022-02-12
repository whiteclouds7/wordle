import React, { useEffect, useState } from "react";
import "./Wordle.css";
import BlockLine from "../BlockLine/BlockLine";

const LENGTH = 5;
const WORD = "HELLO";
enum MATCHES {
  GREEN = "green",
  ORANGE = "orange",
  GREY = "grey",
  WHITE = "white",
}
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

interface enteredWord {
  letters: string[];
  matches: MATCHES[];
}

const Wordle = (): JSX.Element => {
  const [curLetters, setCurLetters] = useState<string[]>([]); // TODO try out with useRef
  const [oldMatches, setOldMatches] = useState<enteredWord[]>([]);

  useEffect(() => {
    const matchInput = () => {
      setOldMatches((oldMatches) => [
        { letters: curLetters, matches: matchWord(curLetters) },
        ...oldMatches,
      ]);
      setCurLetters(() => []);
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
        } else {
          matchInput();
          setCurLetters(() => [key.toUpperCase()]);
        }
      }
    };

    document.body.addEventListener("keydown", keypress);
    return () => document.body.removeEventListener("keydown", keypress);
  }, [curLetters]);

  return (
    <>
      <div className="Title">Christina's Wordle</div>
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
      </div>
    </>
  );
};

export default Wordle;
export { MATCHES };
export type { enteredWord };

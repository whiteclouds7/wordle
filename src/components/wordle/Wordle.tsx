import React, { useEffect, useState } from "react";
import "./Wordle.css";
import BlockLine from "../BlockLine/BlockLine";

const LENGTH = 5;
const WORD = "HELLO";
enum MATCHES {
  GREEN,
  ORANGE,
  RED,
}
const matchWord = (word: string[]): MATCHES[] => {
  const matches: number[] = [];
  word.map((w, i) => {
    if (WORD.at(i) === w) {
      matches[i] = MATCHES.GREEN;
    } else if (WORD.includes(w)) {
      matches[i] = MATCHES.ORANGE;
    } else {
      matches[i] = MATCHES.RED;
    }
  });
  return matches;
};

interface enteredWord {
  letters: string[];
  matches?: MATCHES[];
}

const Wordle = (): JSX.Element => {
  const [curLetters, setCurLetters] = useState<string[]>([]); // TODO try out with useRef
  const handleNewLetter = (letter: string) => {
    setCurLetters((curLetters) => [...curLetters, letter.toUpperCase()]);
  };
  const [oldMatches, setOldMatches] = useState<enteredWord[]>([]);

  useEffect(() => {
    const matchInput = () => {
      setOldMatches((oldMatches) => [
        { letters: curLetters, matches: matchWord(curLetters) },
        ...oldMatches,
      ]);
      setCurLetters((curLetters) => []);
    };
    const keypress = (event: KeyboardEvent) => {
      const key = event.key;
      console.log(key);
      console.log(curLetters);
      if (event.key === "Enter") {
        console.log(curLetters.length);
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
          setCurLetters((curLetters) => [key.toUpperCase()]);
        }
      }
    };

    document.body.addEventListener("keydown", keypress);
    return () => document.body.removeEventListener("keydown", keypress);
  }, [curLetters]);

  return (
    <div className="Row-block">
      {curLetters.length > 0 && curLetters.length <= 5 && (
        <BlockLine blocks={{ letters: curLetters }} />
      )}
      {oldMatches.map((oldMatch, index) => (
        <BlockLine blocks={oldMatch} key={index} />
      ))}
    </div>
  );
};

export default Wordle;
export { MATCHES };
export type { enteredWord };

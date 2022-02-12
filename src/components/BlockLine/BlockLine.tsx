import React from "react";
import "./BlockLine.css";
import LetterBlock from "../LetterBlock/LetterBlock";
import { enteredWord } from "../wordle/Wordle";

interface Props {
  blocks: enteredWord;
}

const BlockLine = ({ blocks }: Props): JSX.Element => {
  return (
    <div className="Line">
      {blocks.letters.map((letter, index) => (
        <LetterBlock
          letter={letter}
          color={blocks.matches[index]}
          key={index}
        />
      ))}
    </div>
  );
};

export default BlockLine;

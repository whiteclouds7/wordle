import React from "react";
import "./BlockLine.css";
import LetterBlock from "../LetterBlock/LetterBlock";
import { enteredWord } from "../wordle/Wordle";

interface Props {
  blocks: enteredWord;
}

const BlockLine = ({ blocks }: Props): JSX.Element => {
  console.log(blocks);

  return (
    <div className="Line">
      {blocks.letters.map((letter, index) => (
        <LetterBlock
          letter={letter}
          color={blocks.matches ? blocks.matches[index] : undefined}
          key={index}
        />
      ))}
    </div>
  );
};

export default BlockLine;

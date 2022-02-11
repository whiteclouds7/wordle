import React from "react";
import "./LetterCode.css";
import { MATCHES } from "../wordle/Wordle";

interface Props {
  letter: string;
  color?: MATCHES;
}

const LetterBlock = (props: Props): JSX.Element => {
  return (
    <div className="Block">
      <span className="Letter">{props.letter}</span>
    </div>
  );
};

export default LetterBlock;

import React from "react";
import { useScore } from "../context/ScoreContext";
import { StrongGameOver } from "../styled/Random";
import { StyledCharacter } from "../styled/Game";
import { StyledLink } from "../styled/Navbar";

export default function GameOver({ history }) {
    const [score] = useScore();
    if (score === -1) {
        history.push("/");
    }
    return (
        <div>
            <h1>Game Over</h1>
            <StrongGameOver>The Score you scored is:-</StrongGameOver>
            <StyledCharacter>{score}</StyledCharacter>
            <StyledLink to="/">Go Home</StyledLink>
            <StyledLink to="/Game">Play Again</StyledLink>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";
import { StyledTitle } from "../styled/Random";

export default function GameOver({ history }) {
    const [score] = useScore();
    const [scoreMessage, setScoreMessage] = useState("");

    if (score === -1) {
        history.push("/");
    }

    useEffect(() => {
        const saveHighScore = async () => {
            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify({ name: "Devyash", score }),
                };
                const res = await fetch(
                    "/.netlify/functions/saveHighScore",
                    options
                );
                const data = await res.json();
                if (data.id) {
                    setScoreMessage("Congrats! You got a high score!!");
                } else {
                    setScoreMessage("Sorry, not a high score. Keep trying!");
                }
            } catch (err) {
                console.error(err);
            }
        };
        saveHighScore();
    }, [score]);
    return (
        <div>
            <StyledTitle>Game Over</StyledTitle>
            <h3>{scoreMessage}</h3>

            <StyledCharacter>{score}</StyledCharacter>
            <div>
                <StyledLink to="/">Go Home</StyledLink>
            </div>
            <div>
                <StyledLink to="/game">Play Again</StyledLink>
            </div>
        </div>
    );
}

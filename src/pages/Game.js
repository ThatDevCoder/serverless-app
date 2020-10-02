import React, { useState, useEffect, useCallback } from "react";
import {
    StyledGame,
    StyledScore,
    StyledTimer,
    StyledCharacter,
} from "../styled/Game";
import { Strong } from "../styled/Random";
import { useScore } from "../context/ScoreContext";

export default function Game({ history }) {
    const [score, setScore] = useScore(0);
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const [currentCharacter, setCurrentCharacter] = useState("");
    const MAX_SECONDS = 10;
    const [ms, setMs] = useState(0);
    const [seconds, setSeconds] = useState(MAX_SECONDS);

    useEffect(() => {
        setRandomCharacter();
        setScore(0);
        const currentTime = new Date();
        const interval = setInterval(() => updateTime(currentTime), 1);
        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
    }, []);


    const addLeadingZeros = (num, length) => {
        let zeros = "";
        for (let i = 0; i < length; i++) {
            zeros += "0";
        }
        return (zeros + num).slice(-length);
    };

    useEffect(() => {
        if (seconds <= -1) {
            // Todo : save the score
            history.push("/gameOver");
        }
    }, [seconds, ms, history]);

    const keyUpHandler = useCallback(
        (e) => {
            console.log(currentCharacter);
            if (e.key === currentCharacter) {
                setScore((prevScore) => prevScore + 1);
            } else {
                if (score > 0) {
                    setScore((prevScore) => prevScore - 1);
                }
            }
            setRandomCharacter();
        },
        // eslint-disable-next-line
        [currentCharacter]
    );

    useEffect(() => {
        document.addEventListener("keyup", keyUpHandler);
        return () => {
            document.removeEventListener("keyup", keyUpHandler);
        };
    }, [keyUpHandler]);

    const setRandomCharacter = () => {
        const randomint = Math.floor(Math.random() * 36);
        setCurrentCharacter(characters[randomint]);
    };

    return (
        <StyledGame>
            <StyledScore>
                Score:<Strong>{score}</Strong>
            </StyledScore>
            <StyledCharacter>{currentCharacter}</StyledCharacter>
            <StyledTimer>
                Time:{" "}
                <Strong>
                    {seconds}:{ms}
                </Strong>
            </StyledTimer>
        </StyledGame>
    );
}

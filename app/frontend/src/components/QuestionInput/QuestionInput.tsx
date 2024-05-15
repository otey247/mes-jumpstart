// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useRef, useState } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Send28Filled, Broom28Filled } from "@fluentui/react-icons";
import { RAIPanel } from "../RAIPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import styles from "./QuestionInput.module.css";
import { Button } from "react-bootstrap";
import {
    SpeechRecognizer,
    ResultReason,
  } from "microsoft-cognitiveservices-speech-sdk";
import MicrophoneIcon from "../../assets/mic-outline.svg";

interface Props {
    onSend: (question: string) => void;
    disabled: boolean;
    placeholder?: string;
    clearOnSend?: boolean;
    onAdjustClick?: () => void;
    onInfoClick?: () => void;
    showClearChat?: boolean;
    onClearClick?: () => void;
    onRegenerateClick?: () => void;
    onMicrophoneClick?: () => void;
    onStopClick?: () => void;
    recognizedText: string;
    isListening: boolean;
    isRecognizing: boolean;
    setRecognizedText: (text: string) => void;
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, onAdjustClick, showClearChat, onClearClick, onRegenerateClick, onStopClick, onMicrophoneClick, recognizedText,isListening, isRecognizing, setRecognizedText, }: Props) => {
    const [question, setQuestion] = useState<string>("");
    const [liveRecognizedText, setLiveRecognizedText] = useState<string>("");
    const [microphoneIconActive, setMicrophoneIconActive] =
    useState<boolean>(false);

    useEffect(() => {
        if (isRecognizing) {
            setLiveRecognizedText((prevLiveText) => prevLiveText + " " +  recognizedText);
            setMicrophoneIconActive(true);
            console.log("text: " ,recognizedText) // Set microphone icon to active (blue)
        } else {
          setMicrophoneIconActive(false); // Set microphone icon to inactive
        }
      }, [recognizedText, isRecognizing]);
    
      const sendQuestion = () => {
        if (disabled || (!question.trim() && !liveRecognizedText.trim())) {
          return;
        }
    
        const textToSend = question || liveRecognizedText;
    
        onSend(textToSend);
    
        if (clearOnSend) {
          setQuestion("");
          setLiveRecognizedText("");
          setRecognizedText(""); // Clear recognizedText
        }
      };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (
        _ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        newValue?: string
      ) => {
        setQuestion(newValue || "");
        setLiveRecognizedText(newValue || ""); // Update liveRecognizedText when edited
      };

    const sendQuestionDisabled = disabled || !question.trim();

    const [clearChatTextEnabled, setClearChatTextEnable] = useState<boolean>(true); 
    
    const onMouseEnter = () => {
        setClearChatTextEnable(false);
    }

    const onMouseLeave = () => {
        setClearChatTextEnable(true);
    }

    return (
        <Stack>
            <Stack.Item>
            <Stack horizontal className={styles.questionInputContainer}>
                {showClearChat ? (
                    <div className={styles.questionClearButtonsContainer}>
                        <div
                            className={styles.questionClearChatButton}
                            aria-label="Clear chat button"
                            onClick={onClearClick}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                        >
                            <Broom28Filled primaryFill="rgba(255, 255, 255, 1)" />
                            <span id={"test"} hidden={clearChatTextEnabled}>Clear Chat</span>
                        </div>
                    </div>
                )
                : null}
                <TextField
                    className={styles.questionInputTextArea}
                    placeholder={placeholder}
                    multiline
                    resizable={false}
                    borderless
                    value={question || liveRecognizedText}
                    onChange={(e, newValue) => {
                        if (newValue !== undefined) {
                          onQuestionChange(e, newValue);
                          setRecognizedText(newValue);
                        }
                      }}
                    onKeyDown={onEnterPress}
                />
                    
                
                <div className={styles.questionInputButtonsContainer}>
                    <div
                        className={`${styles.questionInputSendButton} ${sendQuestionDisabled ? styles.questionInputSendButtonDisabled : ""}`}
                        aria-label="Ask question button"
                        onClick={sendQuestion}
                    >
                        <Send28Filled primaryFill="rgba(115, 118, 225, 1)" />
                    </div>
                    {/* Microphone Icon */}
                    <div
                    className={styles.questionInputMicrophone}
                    onClick={isListening ? onStopClick : onMicrophoneClick}
                    onKeyDown={(e) =>
                        e.key === "Enter" || e.key === " "
                        ? isListening
                            ? onStopClick && onStopClick()
                            : onMicrophoneClick && onMicrophoneClick()
                        : null
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Microphone button"
                    >
                    {microphoneIconActive ? (
                        <FontAwesomeIcon
                        icon={faMicrophone}
                        className={styles.microphoneIconActive}
                        style={{ color: "blue" }}
                        />
                    ) : (
                        <img
                        src={MicrophoneIcon}
                        className={styles.microphoneIcon}
                        alt="Microphone"
                        />
                    )}
                </div>
                </div>
            </Stack>
            </Stack.Item>
            <Stack.Item align="center">
                <RAIPanel onAdjustClick={onAdjustClick} onRegenerateClick={onRegenerateClick} />
            </Stack.Item>
        </Stack>
    );
};

import React, { useEffect, useState, useRef } from "react";
import "../../CSS/utilities.css";
import { useParams } from "react-router-dom";
import { Socket } from "dgram";
import { render } from "@testing-library/react";

function sendMessage(ws: WebSocket, message: string, pseudo: string) {
    if (ws) {
        ws.send(pseudo + " : " + message);
    }
}

const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, ws: WebSocket, pseudo: string) => {
    if (event.key === 'Enter') {
        if (!event.ctrlKey) {
            event.preventDefault(); // Prevent default to avoid new line in textarea
            const message = event.currentTarget.value;
            sendMessage(ws, message, pseudo);
            event.currentTarget.value = ""
        } else {
            // For Ctrl+Enter, we manually add a new line
            event.preventDefault(); // Still prevent the default to control exactly where the newline is added
            const textarea = event.target as HTMLTextAreaElement;
            const cursorPosition = textarea.selectionStart;
            const textBeforeCursor = textarea.value.substring(0, cursorPosition);
            const textAfterCursor = textarea.value.substring(cursorPosition);

            textarea.value = textBeforeCursor + '\n' + textAfterCursor;
            textarea.selectionStart = cursorPosition + 1;
            textarea.selectionEnd = cursorPosition + 1;
        }
    }
};

function scrollToBottom(element: HTMLElement) {
    element.scrollTop = element.scrollHeight;
}


export default function Connection() {

    const [messages, setMessages] = useState<string[]>([]);
    const { pseudo } = useParams()
    const [ws, setWs] = useState<WebSocket | null>(null);
    const scrollBoxRef = useRef(null);
    useEffect(() => {
        // Create WebSocket connection.
        const socket = new WebSocket('ws://localhost:8080');
        setWs(socket)

        // Connection opened
        socket.addEventListener('open', (event) => {
            console.log('Connected to WS Server');
        });

        // Listen for messages
        socket.addEventListener('message', (event) => {
            console.log('Message from server ', event.data);
            setMessages((prev) => [...prev, event.data]); // Append new data correctly
        });


        // Listen for possible errors
        socket.addEventListener('error', (event) => {
            console.error('WebSocket error:', event);
        });

        // Clean up on component unmount or when connection should be closed
        return () => {
            socket.close();
            console.log('Disconnected from WS Server');
        };
    }, []); // Empty dependency array means this effect will only run once on mount

    useEffect(() => {
        scrollToBottom(scrollBoxRef.current!);
    }, [messages])


    return (
        <div className="fullCenter">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <span id="pseudoBox" >
                    Your Pseudo : {pseudo}
                </span>

                <div ref={scrollBoxRef} className="chatFrame">
                    {messages.map((message, index) => (
                        <div key={index} className={message.split(" : ")[0] == pseudo ? "alignRight" : "alignLeft"}>
                            <pre className={message.split(" : ")[0] == pseudo ? "self" : "guest"} key={index}>
                                {message}
                            </pre>
                        </div>
                    ))}
                </div>
                <textarea className="textAreaFram" onKeyDown={(e) => handleKeyDown(e, ws!, pseudo!)}></textarea>
            </div>
        </div >
    );
}


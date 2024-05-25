const { json } = require("express");
const WebSocket = require("ws");

// Replace with your actual API key
const API_KEY = "1hNtzZBkVzpvurVq2e38gqsUcEorLAXElG6b2nQB3pMU8ZUb";
const WEBSOCKET_URL = "wss://api.hume.ai/v0/stream/models";

async function connectToHumeWebSocket() {
	const ws = new WebSocket(WEBSOCKET_URL, {
		headers: {
			"X-Hume-Api-Key": API_KEY,
		},
	});

	ws.on("open", function open() {
		ws.send(
			JSON.stringify({
				models: {
					language: {},
				},
				raw_text: true,
				data: "i hate you",
			})
		);
		console.log("WebSocket connection opened.");
	});

	ws.on("message", function incoming(data) {
		// Parse the JSON data
		const message = JSON.parse(data);
		console.log("Received message:", JSON.stringify(message, null, 2));

		// Process the message based on its type
		if (message.type === "response") {
			// Handle response from Hume AI
			handleHumeResponse(message.payload);
		} else {
			// Handle other types of messages
			// (e.g., 'ping', 'pong', 'error', etc.)
			console.log("Unhandled message type:", message.type);
		}
	});

	ws.on("close", function close() {
		console.log("WebSocket connection closed.");
	});

	ws.on("error", function error(err) {
		console.error("WebSocket error:", err);
	});
}

function handleHumeResponse(response) {
	// Process the response from Hume AI
	console.log("Received Hume AI response:", response);
	// Add your response handling logic here
}

// Connect to the Hume WebSocket
connectToHumeWebSocket();

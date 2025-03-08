import React, { useState, useEffect } from "react";
import Peer from "peerjs";

const ChatBox = () => {
  const [peerId, setPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [peer, setPeer] = useState(null);
  const [conn, setConn] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false); 

  useEffect(() => {
    const newPeer = new Peer();
    
    newPeer.on("open", (id) => {
      setPeerId(id);
    });

    newPeer.on("connection", (connection) => {
      setConn(connection);
      setConnected(true);
      setupConnection(connection);
    });

    setPeer(newPeer);
  }, []);

  const setupConnection = (connection) => {
    connection.on("data", (data) => {
      setMessages((prevMessages) => [...prevMessages, { text: data, sender: "them" }]);
    });

    connection.on("open", () => {
      setConnected(true); 
    });

    connection.on("close", () => {
      setConnected(false);
    });
  };

  const connectToPeer = () => {
    if (!peer || !remoteId) return;
    
    const connection = peer.connect(remoteId);
    connection.on("open", () => {
      setConn(connection);
      setConnected(true); 
    });

    setupConnection(connection);
  };

  const sendMessage = () => {
    if (conn && message.trim()) {
      conn.send(message);
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: "me" }]);
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
      <h2>Chat</h2>
      <p><strong>Your ID:</strong> {peerId}</p>
      <input
        type="text"
        placeholder="Enter recipient ID..."
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
        style={{ padding: "8px", width: "60%", marginRight: "10px" }}
      />
      <button
        onClick={connectToPeer}
        style={{
          backgroundColor: connected ? "green" : "black",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {connected ? "Connected" : "Connect"}
      </button>

      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid white", height: "200px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.sender === "me" ? "right" : "left" }}>
            <strong>{msg.sender === "me" ? "You" : "Them"}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: "8px", width: "60%", marginTop: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "8px 15px", marginLeft: "10px" }}>Send</button>
    </div>
  );
};

export default ChatBox;

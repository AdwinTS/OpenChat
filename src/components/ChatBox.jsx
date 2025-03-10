// import React, { useState, useEffect } from "react";
// import Peer from "peerjs";

// const ChatBox = () => {
//   const [peerId, setPeerId] = useState("");
//   const [remoteId, setRemoteId] = useState("");
//   const [peer, setPeer] = useState(null);
//   const [conn, setConn] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [connected, setConnected] = useState(false); 

//   useEffect(() => {
//     const newPeer = new Peer();
    
//     newPeer.on("open", (id) => {
//       setPeerId(id);
//     });

//     newPeer.on("connection", (connection) => {
//       setConn(connection);
//       setConnected(true);
//       setupConnection(connection);
//     });

//     setPeer(newPeer);
//   }, []);

//   const setupConnection = (connection) => {
//     connection.on("data", (data) => {
//       setMessages((prevMessages) => [...prevMessages, { text: data, sender: "them" }]);
//     });

//     connection.on("open", () => {
//       setConnected(true); 
//     });

//     connection.on("close", () => {
//       setConnected(false);
//     });
//   };

//   const connectToPeer = () => {
//     if (!peer || !remoteId) return;
    
//     const connection = peer.connect(remoteId);
//     connection.on("open", () => {
//       setConn(connection);
//       setConnected(true); 
//     });

//     setupConnection(connection);
//   };

//   const sendMessage = () => {
//     if (conn && message.trim()) {
//       conn.send(message);
//       setMessages((prevMessages) => [...prevMessages, { text: message, sender: "me" }]);
//       setMessage("");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
//       <h2>Chat</h2>
//       <p><strong>Your ID:</strong> {peerId}</p>
//       <input
//         type="text"
//         placeholder="Enter recipient ID..."
//         value={remoteId}
//         onChange={(e) => setRemoteId(e.target.value)}
//         style={{ padding: "8px", width: "60%", marginRight: "10px" }}
//       />
//       <button
//         onClick={connectToPeer}
//         style={{
//           backgroundColor: connected ? "green" : "black",
//           color: "white",
//           padding: "10px 20px",
//           border: "none",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         {connected ? "Connected" : "Connect"}
//       </button>

//       <div style={{ marginTop: "20px", padding: "10px", border: "1px solid white", height: "200px", overflowY: "auto" }}>
//         {messages.map((msg, index) => (
//           <p key={index} style={{ textAlign: msg.sender === "me" ? "right" : "left" }}>
//             <strong>{msg.sender === "me" ? "You" : "Them"}:</strong> {msg.text}
//           </p>
//         ))}
//       </div>

//       <input
//         type="text"
//         placeholder="Type a message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         style={{ padding: "8px", width: "60%", marginTop: "10px" }}
//       />
//       <button onClick={sendMessage} style={{ padding: "8px 15px", marginLeft: "10px" }}>Send</button>
//     </div>
//   );
// };

// export default ChatBox;
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
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Cyber Chat</h2>
          <p style={styles.peerId}><strong>Your ID:</strong> {peerId}</p>
        </div>

        <div style={styles.connectContainer}>
          <input
            type="text"
            placeholder="Enter recipient ID..."
            value={remoteId}
            onChange={(e) => setRemoteId(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={connectToPeer}
            style={{
              ...styles.connectButton,
              backgroundColor: connected ? "#00FF88" : "#007BFF",
              boxShadow: connected ? "0 0 10px #00FF88" : "0 0 10px #007BFF",
            }}
          >
            {connected ? "Connected" : "Connect"}
          </button>
        </div>

        <div style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div key={index} style={{ ...styles.message, justifyContent: msg.sender === "me" ? "flex-end" : "flex-start" }}>
              <div style={{ ...styles.messageBubble, backgroundColor: msg.sender === "me" ? "#007BFF" : "#FF007F" }}>
                <strong>{msg.sender === "me" ? "You" : "Them"}:</strong> {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.messageInputContainer}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.messageInput}
          />
          <button onClick={sendMessage} style={styles.sendButton}>Send</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0A0A0A", // Dark background for the outer container
    padding: "40px",
  },
  container: {
    textAlign: "center",
    padding: "20px",
    color: "white",
    background: "#1A1A2E", // Dark blue background for the chat container
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 123, 255, 0.3)",
    maxWidth: "500px",
    width: "100%",
    fontFamily: "'Arial', sans-serif",
    border: "1px solid #007BFF", // Neon blue border
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#007BFF", // Neon blue for the title
    textShadow: "0 0 10px #007BFF",
  },
  peerId: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#FF007F", // Neon pink for the peer ID
    textShadow: "0 0 10px #FF007F",
  },
  connectContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "60%",
    marginRight: "10px",
    borderRadius: "8px",
    border: "1px solid #007BFF",
    fontSize: "14px",
    backgroundColor: "#2A2A40", // Dark blue input background
    color: "white",
    outline: "none",
    boxShadow: "0 0 10px #007BFF",
  },
  connectButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    outline: "none",
  },
  chatWindow: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #007BFF",
    borderRadius: "10px",
    height: "300px",
    overflowY: "auto",
    background: "#2A2A40", // Dark blue background for the chat window
    boxShadow: "0 0 10px #007BFF",
  },
  message: {
    display: "flex",
    marginBottom: "10px",
  },
  messageBubble: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
    wordWrap: "break-word",
    color: "white",
    fontSize: "14px",
    boxShadow: "0 0 10px rgba(0, 123, 255, 0.5)",
  },
  messageInputContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  messageInput: {
    padding: "10px",
    width: "60%",
    borderRadius: "8px",
    border: "1px solid #007BFF",
    fontSize: "14px",
    backgroundColor: "#2A2A40", // Dark blue input background
    color: "white",
    outline: "none",
    boxShadow: "0 0 10px #007BFF",
  },
  sendButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#FF007F", // Neon pink for the send button
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    outline: "none",
    boxShadow: "0 0 10px #FF007F",
  },
};

export default ChatBox;
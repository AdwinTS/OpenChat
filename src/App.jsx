import React from "react";
import ChatBox from "./components/ChatBox";


const App = () => {
  return (
    <div style={styles.container}>
      <h1>OpenChat</h1>
      <div style={styles.section}>
        <ChatBox />
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  section: {
    margin: "20px auto",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    maxWidth: "400px",
  },
};

export default App;

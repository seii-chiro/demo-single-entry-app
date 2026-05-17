import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

function App() {
  const [staticMessage, setStaticMessage] = useState("");
  const [messageFromDb, setMessageFromDb] = useState("");

  useEffect(() => {
    const fetchStaticMessage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hello`);
        const data = await response.json();
        setStaticMessage(data.message);
      } catch (error) {
        console.error("Error fetching static message:", error);
      }
    };

    const fetchMessageFromDb = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sample`);
        const data = await response.json();
        setMessageFromDb(data.message);
      } catch (error) {
        console.error("Error fetching message from DB:", error);
      }
    };

    fetchStaticMessage();
    fetchMessageFromDb();
  }, []);

  return (
    <div>
      <p>{staticMessage}</p>
      <p>{messageFromDb}</p>
    </div>
  );
}

export default App;

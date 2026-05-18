import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

type ApiStatus = {
  message: string;
  loading: boolean;
  error: string;
};

const initialStatus: ApiStatus = {
  message: "",
  loading: true,
  error: "",
};

function App() {
  const [staticMessage, setStaticMessage] = useState<ApiStatus>(initialStatus);
  const [messageFromDb, setMessageFromDb] = useState<ApiStatus>(initialStatus);

  useEffect(() => {
    const fetchStaticMessage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hello`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setStaticMessage({
          message: data.message,
          loading: false,
          error: "",
        });
      } catch (error) {
        console.error("Error fetching static message:", error);
        setStaticMessage({
          message: "",
          loading: false,
          error: "Backend API is not responding.",
        });
      }
    };

    const fetchMessageFromDb = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sample`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setMessageFromDb({
          message: data.message,
          loading: false,
          error: "",
        });
      } catch (error) {
        console.error("Error fetching message from DB:", error);
        setMessageFromDb({
          message: "",
          loading: false,
          error: "Database-backed endpoint is not responding.",
        });
      }
    };

    fetchStaticMessage();
    fetchMessageFromDb();
  }, []);

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Docker workshop</p>
        <h1>Single entry app demo</h1>
        <p className="intro">
          This React frontend is served behind one entrypoint and reads from
          backend endpoints through the same Docker stack.
        </p>

        <div className="meta-row" aria-label="Runtime configuration">
          <span>Base URL</span>
          <code>{BASE_URL || "same origin"}</code>
        </div>
      </section>

      <section className="status-grid" aria-label="Service responses">
        <article className="status-card">
          <div className="card-header">
            <span className="status-dot"></span>
            <span>Backend API</span>
          </div>
          <h2>/api/hello</h2>
          <p>
            {staticMessage.loading
              ? "Waiting for response..."
              : staticMessage.error || staticMessage.message}
          </p>
        </article>

        <article className="status-card">
          <div className="card-header">
            <span className="status-dot database"></span>
            <span>Database path</span>
          </div>
          <h2>/api/sample</h2>
          <p>
            {messageFromDb.loading
              ? "Waiting for response..."
              : messageFromDb.error || messageFromDb.message}
          </p>
        </article>
      </section>
    </main>
  );
}

export default App;

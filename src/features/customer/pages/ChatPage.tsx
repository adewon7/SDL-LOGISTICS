import { useState } from "react";
import { ChevronLeft, Image, Mic, Send, Play } from "lucide-react";
import { Avatar } from "../../../components/ui/Avatar";
import { Pill } from "../../../components/ui/Pill";
import { DRIVER } from "../../../data/customerData";
import styles from "./ChatPage.module.css";

interface ChatMessage {
  who: "me" | "them";
  text?: string;
  voice?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { who: "them", text: "Good afternoon! I'm on my way to the pickup." },
  { who: "me", text: "Great — I'm at the main gate in a blue shirt." },
  { who: "them", voice: true },
];

const WAVE_HEIGHTS = [8, 14, 10, 16, 7, 12, 15, 9, 13, 6, 11];

interface ChatPageProps {
  back: () => void;
}

export function ChatPage({ back }: ChatPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMessages((current) => [...current, { who: "me", text }]);
    setText("");
    setTimeout(() => {
      setMessages((current) => [...current, { who: "them", text: "Noted, see you shortly 👍" }]);
    }, 1200);
  };

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={back} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <Avatar name={DRIVER.name} size="small" />
        <div className="grow">
          <b style={{ fontSize: 14 }}>{DRIVER.name}</b>
          <div className="muted" style={{ fontSize: 11.5 }}>Messages are monitored for safety</div>
        </div>
        <Pill tone="green">online</Pill>
      </div>

      <div className="body">
        <div className={styles.chat}>
          {messages.map((m, i) => {
            const bubbleClass = `${styles.bubble} ${m.who === "me" ? styles.bubbleMe : styles.bubbleThem}`;
            return m.voice ? (
              <div key={i} className={bubbleClass}>
                <div className="row">
                  <Play size={16} />
                  <span className={styles.wave}>
                    {WAVE_HEIGHTS.map((h, j) => (
                      <span key={j} className={styles.waveBar} style={{ height: h }} />
                    ))}
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 700 }}>0:07</span>
                </div>
              </div>
            ) : (
              <div key={i} className={bubbleClass}>{m.text}</div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid var(--line)", padding: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <button className="iconbtn" aria-label="Attach photo">
          <Image size={17} />
        </button>
        <input
          className="grow"
          style={{ border: "1.5px solid var(--line)", borderRadius: 999, padding: "11px 16px", font: "inherit", fontSize: 14 }}
          placeholder="Message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        {text.trim() ? (
          <button className="iconbtn" style={{ background: "var(--navy)", color: "#fff", border: 0 }} onClick={send} aria-label="Send">
            <Send size={16} />
          </button>
        ) : (
          <button className="iconbtn" aria-label="Record voice note">
            <Mic size={17} color="var(--teal)" />
          </button>
        )}
      </div>
    </>
  );
}
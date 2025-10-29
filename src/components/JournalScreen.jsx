import { useState, useEffect } from "react";
import { useJournalStore } from "../store/useJournalStore";
import Panel from "./Panel";

export default function JournalScreen() {
  const [text, setText] = useState("");
  
  // Store selectors
  const currentDate = useJournalStore((s) => s.currentDate);
  const currentEntry = useJournalStore((s) => s.getEntry(currentDate));
  const addEntry = useJournalStore((s) => s.addEntry);
  const advanceDay = useJournalStore((s) => s.advanceDay);
  const goBackDay = useJournalStore((s) => s.goBackDay);
  const allEntries = useJournalStore((s) => s.entries);
  
  // Initialize text with current entry if it exists
  useEffect(() => {
    if (currentEntry) {
      setText(currentEntry.content);
    } else {
      setText("");
    }
  }, [currentEntry]);
  
  const onSave = () => {
    const t = (text || "").trim();
    if (!t) return;
    addEntry(t);
    console.log("Entry saved:", t); // Debug log
  };
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="screen xp-container">
      <div className="journal-grid">
        {/* JOURNAL SECTION */}
        <Panel
          title="DAILY JOURNAL"
          className="panel-journal"
          right={
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="font-vt323" style={{ fontSize: 12, opacity: 0.8 }}>
                {formatDate(currentDate)}
              </span>
              <button
                onClick={goBackDay}
                style={{ fontSize: 12, padding: "4px 8px", opacity: 0.7 }}
                title="Previous day"
              >
                ←
              </button>
              <button
                onClick={advanceDay}
                style={{ fontSize: 12, padding: "4px 8px", opacity: 0.7 }}
                title="Next day"
              >
                →
              </button>
            </div>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <textarea
              className="font-vt323"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How was your day? What did you learn? What are you grateful for?"
              style={{
                width: "100%",
                minHeight: "200px",
                padding: "12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.2)",
                color: "inherit",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="font-vt323" style={{ fontSize: 12, opacity: 0.7 }}>
                {currentEntry ? "Entry saved" : "No entry for this day"}
              </span>
              <button 
                onClick={onSave}
                style={{
                  padding: "8px 16px",
                  background: "linear-gradient(90deg, #6EE7F5, #3B82F6)",
                  border: "none",
                  borderRadius: 8,
                  color: "#000",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Save Entry
              </button>
            </div>
          </div>
        </Panel>
        
        {/* SIMPLE ENTRIES LIST */}
        <Panel
          title="RECENT ENTRIES"
          className="panel-entries"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.keys(allEntries).length === 0 ? (
              <div style={{ opacity: 0.7, fontFamily: "VT323, monospace" }}>
                No journal entries yet.
              </div>
            ) : (
              Object.entries(allEntries)
                .sort(([a], [b]) => new Date(b) - new Date(a)) // Sort by date, newest first
                .slice(0, 5) // Show only last 5 entries
                .map(([date, entry]) => (
                  <div key={entry.id} style={{ 
                    padding: "8px", 
                    background: "rgba(255,255,255,0.05)", 
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <div style={{ 
                      fontFamily: "VT323, monospace", 
                      fontSize: 12, 
                      opacity: 0.7, 
                      marginBottom: 4 
                    }}>
                      {formatDate(date)}
                    </div>
                    <div style={{ 
                      fontFamily: "VT323, monospace", 
                      fontSize: 14,
                      lineHeight: 1.4,
                      maxHeight: "60px",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {entry.content}
                    </div>
                  </div>
                ))
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
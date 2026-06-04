import { useState, useEffect } from "react";

const styles = `
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }

  body {
    font-family: 'Lexend', sans-serif;
    background: linear-gradient(145deg, #020d18 0%, #031a2c 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    position: relative;
    overflow-x: hidden;
  }

  .bubbles {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .bubble {
    position: absolute;
    bottom: -60px;
    border-radius: 50%;
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.15);
    animation: rise linear infinite;
  }

  .bubble:nth-child(1)  { width: 14px; height: 14px; left: 10%; animation-duration: 8s;  animation-delay: 0s;   }
  .bubble:nth-child(2)  { width: 8px;  height: 8px;  left: 25%; animation-duration: 11s; animation-delay: 2s;   }
  .bubble:nth-child(3)  { width: 20px; height: 20px; left: 40%; animation-duration: 9s;  animation-delay: 4s;   }
  .bubble:nth-child(4)  { width: 6px;  height: 6px;  left: 55%; animation-duration: 13s; animation-delay: 1s;   }
  .bubble:nth-child(5)  { width: 16px; height: 16px; left: 70%; animation-duration: 10s; animation-delay: 3s;   }
  .bubble:nth-child(6)  { width: 10px; height: 10px; left: 85%; animation-duration: 7s;  animation-delay: 5s;   }
  .bubble:nth-child(7)  { width: 12px; height: 12px; left: 18%; animation-duration: 12s; animation-delay: 6s;   }
  .bubble:nth-child(8)  { width: 7px;  height: 7px;  left: 62%; animation-duration: 9s;  animation-delay: 0.5s; }
  .bubble:nth-child(9)  { width: 24px; height: 24px; left: 75%; animation-duration: 14s; animation-delay: 7s;   }
  .bubble:nth-child(10) { width: 5px;  height: 5px;  left: 33%; animation-duration: 6s;  animation-delay: 2.5s; }

  @keyframes rise {
    0%   { transform: translateY(0) scale(1);    opacity: 0;   }
    10%  { opacity: 0.8; }
    90%  { opacity: 0.5; }
    100% { transform: translateY(-100vh) scale(1.3); opacity: 0; }
  }

  .app-wrapper {
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Kotak utama - glassmorphism keren */
  .mission-card {
    background: rgba(6, 25, 45, 0.75);
    backdrop-filter: blur(12px);
    border-radius: 32px;
    padding: 28px 24px 36px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: none;
  }

  .header {
    text-align: center;
    margin-bottom: 28px;
  }

  .header .tag {
    display: inline-block;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #38bdf8;
    font-weight: 600;
    margin-bottom: 12px;
    padding: 4px 14px;
    background: rgba(56, 189, 248, 0.08);
    border-radius: 100px;
  }

  .header h1 {
    font-size: 38px;
    font-weight: 800;
    color: #e0f2fe;
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .header h1 span { 
    color: #38bdf8;
    text-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
  }

  .progress-card {
    background: rgba(10, 40, 70, 0.5);
    border-radius: 24px;
    padding: 18px 20px;
    margin-bottom: 24px;
  }

  .progress-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .progress-top .label {
    font-size: 12px;
    color: #5b8fa8;
    font-weight: 500;
  }

  .progress-top .pct {
    font-size: 13px;
    font-weight: 700;
    color: #38bdf8;
  }

  .progress-track {
    height: 6px;
    background: rgba(56, 189, 248, 0.1);
    border-radius: 100px;
    overflow: hidden;
    margin-bottom: 14px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc);
    border-radius: 100px;
    transition: width 0.5s ease;
  }

  .stat-row {
    display: flex;
    gap: 0;
  }

  .stat-item {
    flex: 1;
    text-align: center;
    padding: 8px 0;
  }

  .stat-item .num {
    font-size: 22px;
    font-weight: 800;
    color: #e0f2fe;
    line-height: 1;
    margin-bottom: 3px;
  }

  .stat-item .num.blue  { color: #38bdf8; }
  .stat-item .num.green { color: #34d399; }

  .stat-item .lbl {
    font-size: 10px;
    color: #4a7c9c;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .input-wrap {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .input-wrap input {
    flex: 1;
    padding: 14px 16px;
    border-radius: 18px;
    border: none;
    background: rgba(10, 40, 70, 0.6);
    color: #e0f2fe;
    font-size: 14px;
    font-family: 'Lexend', sans-serif;
    outline: none;
  }

  .input-wrap input::placeholder { color: #2d5a7a; }

  .input-wrap input:focus {
    background: rgba(10, 50, 85, 0.8);
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.3);
  }

  .btn-add {
    padding: 14px 22px;
    border-radius: 18px;
    border: none;
    background: #0ea5e9;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Lexend', sans-serif;
    cursor: pointer;
    transition: all 0.18s;
  }

  .btn-add:hover { background: #38bdf8; transform: translateY(-1px); }
  .btn-add:active { transform: scale(0.96); }
  .btn-add:disabled { background: rgba(56, 189, 248, 0.2); color: #2d5a7a; cursor: not-allowed; }

  .filter-row {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
  }

  .tab {
    flex: 1;
    padding: 10px 6px;
    border-radius: 40px;
    border: none;
    background: rgba(10, 40, 70, 0.4);
    color: #6a9ec0;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Lexend', sans-serif;
    cursor: pointer;
    transition: all 0.18s;
    text-align: center;
  }

  .tab:hover { color: #7dd3fc; background: rgba(56, 189, 248, 0.1); }
  .tab.active { background: #0ea5e9; color: white; }

  .section-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #4a7c9c;
    margin-bottom: 12px;
    padding-left: 4px;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 18px;
    background: rgba(10, 40, 70, 0.4);
    transition: all 0.2s;
  }

  .todo-item:hover { background: rgba(14, 60, 100, 0.6); transform: translateX(3px); }
  .todo-item.done { opacity: 0.5; }

  .checkbox {
    width: 22px;
    height: 22px;
    min-width: 22px;
    border-radius: 50%;
    border: 2px solid rgba(56, 189, 248, 0.5);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
  }

  .checkbox:hover { border-color: #38bdf8; }
  .checkbox.checked { background: #34d399; border-color: #34d399; }

  .todo-text {
    flex: 1;
    font-size: 14px;
    color: #bae6fd;
    cursor: pointer;
  }

  .todo-text.done { text-decoration: line-through; color: #3a6c8c; }

  .btn-del {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #3a6c8c;
    font-size: 18px;
    cursor: pointer;
  }

  .btn-del:hover { background: rgba(239, 68, 68, 0.15); color: #f87171; }

  .empty {
    text-align: center;
    padding: 44px 0;
  }

  .empty .icon { font-size: 38px; margin-bottom: 12px; }
  .empty h3 { font-size: 15px; color: #2d5a7a; }
  .empty p { font-size: 12px; color: #2d5a7a; }

  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  .divider-line { flex: 1; height: 1px; background: rgba(56, 189, 248, 0.15); }
  .divider-text { font-size: 10px; color: #4a7c9c; letter-spacing: 1.5px; text-transform: uppercase; }

  .btn-clear {
    display: block;
    margin: 8px auto 0;
    background: rgba(239, 68, 68, 0.1);
    border: none;
    border-radius: 40px;
    color: #f87171;
    font-size: 12px;
    padding: 8px 20px;
    cursor: pointer;
  }

  .btn-clear:hover { background: rgba(239, 68, 68, 0.25); color: #ff9e9e; }
`;

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("ocean-todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("ocean-todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTodos(todos.filter(t => !t.completed));
  }

  const filtered = todos.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const activeTodos = filtered.filter(t => !t.completed);
  const completedTodos = filtered.filter(t => t.completed);
  const total = todos.length;
  const done = todos.filter(t => t.completed).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <>
      <style>{styles}</style>
    
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble" />
        ))}
      </div>

      <div className="app-wrapper">
        <div className="mission-card">
          <div className="header">
            <div className="tag">FOCUS ON ACTION</div>
            <h1>🌊 Daily <span>Mission</span></h1>
             <p>Stay focused, stay productive</p>
          </div>

          <div className="progress-card">
            <div className="progress-top">
              <span className="label">🐚 Progress</span>
              <span className="pct">{pct}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: pct + "%" }} />
            </div>
            <div className="stat-row">
              <div className="stat-item"><div className="num">{total}</div><div className="lbl">TOTAL</div></div>
              <div className="stat-item"><div className="num blue">{total - done}</div><div className="lbl">AKTIF</div></div>
              <div className="stat-item"><div className="num green">{done}</div><div className="lbl">SELESAI</div></div>
            </div>
          </div>

          <div className="input-wrap">
            <input type="text" placeholder="Tambah tugas baru..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTodo()} autoFocus />
            <button className="btn-add" onClick={addTodo} disabled={!input.trim()}>+ Tambah</button>
          </div>

          <div className="filter-row">
            <button className={`tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>🌊 Semua ({total})</button>
            <button className={`tab ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>🐠 Aktif ({total - done})</button>
            <button className={`tab ${filter === "done" ? "active" : ""}`} onClick={() => setFilter("done")}>⭐ Selesai ({done})</button>
          </div>

          {(filter === "all" || filter === "active") && (
            <>
              <div className="section-label">🐋 TUGAS AKTIF</div>
              <div className="todo-list">
                {activeTodos.length === 0 ? (
                  <div className="empty"><div className="icon">🐠</div><p>Belum ada tugas. Tambahkan di atas.</p></div>
                ) : (
                  activeTodos.map(todo => (
                    <div key={todo.id} className="todo-item">
                      <div className={`checkbox ${todo.completed ? "checked" : ""}`} onClick={() => toggleTodo(todo.id)}>{todo.completed && "✓"}</div>
                      <span className="todo-text" onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                      <button className="btn-del" onClick={() => deleteTodo(todo.id)}>×</button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {completedTodos.length > 0 && (filter === "all" || filter === "done") && (
            <>
              <div className="divider"><div className="divider-line" /><span className="divider-text">⭐ SELESAI ({completedTodos.length})</span><div className="divider-line" /></div>
              <div className="todo-list">
                {completedTodos.map(todo => (
                  <div key={todo.id} className="todo-item done">
                    <div className="checkbox checked" onClick={() => toggleTodo(todo.id)}>✓</div>
                    <span className="todo-text done" onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                    <button className="btn-del" onClick={() => deleteTodo(todo.id)}>×</button>
                  </div>
                ))}
              </div>
              {filter !== "active" && <button className="btn-clear" onClick={clearCompleted}>Hapus semua yang selesai ({completedTodos.length})</button>}
            </>
          )}
        </div>
      </div>
    </>
  );
}
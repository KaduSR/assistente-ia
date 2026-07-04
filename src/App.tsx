
import React, { useState, useEffect, useRef } from "react"
import "./styles.css"

const FAQ = {
  "react": "React cria interfaces com componentes reutilizaveis e virtual DOM. Versao atual: 19, com Server Components.",
  "typescript": "TypeScript adiciona tipos estaticos ao JavaScript. Pega erros em compilacao e melhora a DX.",
  "api": "API define como componentes se comunicam. REST e GraphQL sao os estilos mais comuns.",
  "design": "UX/UI Design cria produtos digitais uteis e agradaveis. Envolve pesquisa, prototipacao e testes.",
  "performance": "Performance web e medida por LCP, FID e CLS. Lighthouse ajuda a identificar gargalos.",
  "default": "Interessante! Vou pesquisar e te retorno com mais detalhes. Pergunte sobre React, TypeScript, API ou Design."
}

export default function App() {
  const [msgs, setMsgs] = useState([{role: "ai", text: "Ola! Pergunte sobre React, TypeScript, API ou Design."}])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" }) }, [msgs])

  const send = () => {
    if (!input.trim() || loading) return
    setMsgs(prev => [...prev, { role: "user", text: input }])
    const q = input.toLowerCase()
    setInput("")
    setLoading(true)
    let resp = FAQ.default
    Object.keys(FAQ).forEach(k => { if (q.includes(k)) resp = FAQ[k as keyof typeof FAQ] })
    setTimeout(() => {
      setMsgs(prev => [...prev, { role: "ai", text: resp }])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <h1>Assistente IA</h1>
        </div>
      </header>
      <div className="chat" ref={ref}>
        {msgs.map((m, i) => (
          <div key={i} className={"msg " + m.role}>
            {m.role === "ai" && <div className="avatar">AI</div>}
            <div className={"bubble " + m.role}>{m.text}</div>
            {m.role === "user" && <div className="avatar user">U</div>}
          </div>
        ))}
        {loading && <div className="msg ai"><div className="avatar">AI</div><div className="bubble ai">...</div></div>}
      </div>
      <div className="input-area">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()} placeholder="Digite sua mensagem..." />
        <button onClick={send} disabled={!input.trim() || loading}>Enviar</button>
      </div>
    </div>
  )
}

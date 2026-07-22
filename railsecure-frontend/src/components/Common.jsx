import React from "react";
import { motion } from "framer-motion";
import { Bell, Moon, Search, ShieldCheck } from "lucide-react";

export function Header({ title, dark, setDark }) {
  return <header className="topbar">
    <div><p className="eyebrow">RAILSECURE DIGITAL RAILWAY</p><h1>{title}</h1></div>
    <div className="topActions">
      <div className="search"><Search size={17}/><input aria-label="Search" placeholder="Search journeys, stations..."/></div>
      <button className="iconBtn" aria-label="Toggle theme" onClick={()=>setDark(!dark)}><Moon size={19}/></button>
      <button className="iconBtn notification" aria-label="Notifications"><Bell size={19}/><i/></button>
      <div className="avatar">RZ</div>
    </div>
  </header>
}

export function Page({ children }) {
  return <motion.main initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.35}}>{children}</motion.main>
}

export function Badge({ children, tone="green" }) { return <span className={`badge ${tone}`}>{children}</span> }

export function Verified() { return <span className="verified"><ShieldCheck size={15}/> Identity verified</span> }

export function SectionTitle({ title, action }) {
  return <div className="sectionTitle"><h2>{title}</h2>{action && <button>{action}</button>}</div>
}

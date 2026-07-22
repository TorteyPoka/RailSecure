import React from "react";
import { ArrowRight, Clock3, MapPin, Navigation, QrCode, Sparkles, Ticket, Users, WalletCards } from "lucide-react";
import { journeys, history } from "../data/dummy";
import { Badge, Page, SectionTitle, Verified } from "./Common";

export default function Dashboard({ setPage }) {
  const j = journeys[0];
  return <Page>
    <section className="hero">
      <div><Verified/><h2>Good evening, Shayon 👋</h2><p>Your next journey is ready. Everything you need is in one secure place.</p></div>
      <div className="heroGlow"/>
    </section>

    <div className="stats">
      <div className="stat glass"><span><Ticket/></span><div><b>2</b><small>Active tickets</small></div></div>
      <div className="stat glass"><span><WalletCards/></span><div><b>৳2,450</b><small>Wallet balance</small></div></div>
      <div className="stat glass"><span><Sparkles/></span><div><b>1,280</b><small>Reward points</small></div></div>
      <div className="stat glass"><span><Users/></span><div><b>4</b><small>Group members</small></div></div>
    </div>

    <SectionTitle title="Upcoming journey" action="View all"/>
    <article className="journeyCard glass">
      <div className="journeyTop"><div><Badge>{j.status}</Badge><h3>{j.train} <small>#{j.number}</small></h3><p>{j.date} 2026 • {j.coach} • Seat {j.seat}</p></div><button className="primary" onClick={()=>setPage("My Tickets")}><QrCode size={18}/> View ticket</button></div>
      <div className="route">
        <div><b>{j.depart}</b><strong>{j.from}</strong><span>Dhaka Railway Station</span></div>
        <div className="routeLine"><div className="trainDot">🚆</div><span>5h 20m • Direct</span></div>
        <div className="right"><b>{j.arrive}</b><strong>{j.to}</strong><span>Chattogram Railway Station</span></div>
      </div>
      <div className="journeyActions">
        <button onClick={()=>setPage("Live Tracking")}><Navigation size={17}/> Track live</button>
        <button onClick={()=>setPage("Group Travel")}><Users size={17}/> Manage group</button>
        <button><MapPin size={17}/> Station info</button>
      </div>
    </article>

    <div className="dashboardGrid">
      <section>
        <SectionTitle title="Quick actions"/>
        <div className="quickGrid">
          {[["My tickets",Ticket,"My Tickets"],["Live tracking",Navigation,"Live Tracking"],["Group travel",Users,"Group Travel"],["Wallet",WalletCards,"Wallet"]].map(([t,I,p])=>
            <button className="quick glass" key={t} onClick={()=>setPage(p)}><I/><b>{t}</b><span>Open <ArrowRight size={14}/></span></button>
          )}
        </div>
      </section>
      <section>
        <SectionTitle title="Recent travel" action="History"/>
        <div className="history glass">{history.map(x=><div key={x.title}><span className="historyIcon"><Clock3 size={18}/></span><div><b>{x.title}</b><small>{x.meta}</small></div><strong>{x.amount}</strong></div>)}</div>
      </section>
    </div>
  </Page>
}

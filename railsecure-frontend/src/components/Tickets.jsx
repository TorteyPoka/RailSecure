import React from "react";
import { Download, Send, ShieldCheck, Timer, TrainFront } from "lucide-react";
import { journeys } from "../data/dummy";
import { Badge, Page, SectionTitle } from "./Common";

export default function Tickets() {
  return <Page>
    <SectionTitle title="My digital tickets" action="Travel history"/>
    <div className="ticketGrid">{journeys.map((j,i)=><article className="digitalTicket glass" key={j.id}>
      <div className="ticketHead"><div><Badge tone={i?"blue":"green"}>{i?"Scheduled":"Active"}</Badge><h3>{j.train}</h3><span>Train #{j.number} • {j.date} 2026</span></div><TrainFront size={34}/></div>
      <div className="ticketRoute"><div><b>{j.depart}</b><span>{j.from}</span></div><div className="dash">•••••• 🚆 ••••••</div><div><b>{j.arrive}</b><span>{j.to}</span></div></div>
      <div className="ticketInfo"><div><small>COACH</small><b>{j.coach}</b></div><div><small>SEAT</small><b>{j.seat}</b></div><div><small>CLASS</small><b>Snigdha</b></div></div>
      <div className="qr"><div className="fakeQr">{Array.from({length:64}).map((_,n)=><i key={n} className={(n*7+n%5)%3===0?"on":""}/>)}</div><div><b>Dynamic Secure QR</b><span><ShieldCheck size={14}/> Refreshes automatically</span><span><Timer size={14}/> Valid near departure time</span></div></div>
      <div className="ticketButtons"><button className="primary"><Download size={17}/> Save ticket</button><button><Send size={17}/> Transfer</button></div>
    </article>)}</div>
  </Page>
}

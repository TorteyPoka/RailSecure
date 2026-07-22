import React from "react";
import { Copy, Link2, MessageCircle, Plus, ShieldCheck, Users } from "lucide-react";
import { groupMembers } from "../data/dummy";
import { Badge, Page, SectionTitle } from "./Common";

export default function GroupTravel() {
  return <Page>
    <div className="groupHero glass"><div><Badge tone="blue">NEW • GROUP TRAVEL</Badge><h2>Everyone together, one journey hub.</h2><p>Link family or friends to a booking, coordinate seats, share updates, and manage the trip from one secure place.</p><div className="groupHeroBtns"><button className="primary"><Plus size={17}/> Create group</button><button><Link2 size={17}/> Join with code</button></div></div><div className="groupVisual"><Users size={62}/><span>4 travelers linked</span></div></div>
    <div className="groupGrid">
      <section>
        <SectionTitle title="Chattogram Weekend Group" action="Manage"/>
        <article className="groupCard glass">
          <div className="groupJourney"><div><b>Subarna Express #701</b><span>18 Jul 2026 • 07:00</span></div><strong>Dhaka <span>→</span> Chattogram</strong></div>
          <div className="inviteCode"><div><small>GROUP INVITE CODE</small><b>RAIL-7K2P</b></div><button><Copy size={17}/> Copy</button></div>
          <div className="memberList">{groupMembers.map((m,i)=><div className="member" key={m.name}><span className="memberAvatar">{m.initials}</span><div><b>{m.name}{i===0 && " (Organizer)"}</b><small>Seat {m.seat}</small></div><Badge tone={m.status==="Pending"?"orange":"green"}>{m.status}</Badge></div>)}</div>
        </article>
      </section>
      <aside>
        <SectionTitle title="Group tools"/>
        <div className="groupTools glass">
          <button><MessageCircle/><div><b>Group updates</b><span>Send journey alerts to everyone</span></div></button>
          <button><ShieldCheck/><div><b>Linked booking security</b><span>Only verified members can join</span></div></button>
          <button><Users/><div><b>Seat coordination</b><span>Keep coach and seats together</span></div></button>
        </div>
        <div className="tip glass"><b>Family-friendly controls</b><p>One organizer can keep track of linked tickets while each traveler retains ownership of their own verified identity.</p></div>
      </aside>
    </div>
  </Page>
}

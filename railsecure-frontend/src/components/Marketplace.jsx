import React from "react";
import { Filter, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { marketplace } from "../data/dummy";
import { Badge, Page, SectionTitle } from "./Common";

export default function Marketplace() {
  return <Page>
    <div className="marketHero"><div><Badge tone="orange">FAIR RESALE</Badge><h2>Verified ticket marketplace</h2><p>Buy from verified travelers. Tickets can never be listed above the original price.</p></div><button className="primary">+ List a ticket</button></div>
    <div className="filters glass"><div><Search size={18}/><input placeholder="Search route or train"/></div><select><option>Any date</option><option>This week</option></select><select><option>All classes</option><option>AC Seat</option><option>Snigdha</option></select><button><SlidersHorizontal size={17}/> Price</button><button><Filter size={17}/> Filters</button></div>
    <SectionTitle title="Available verified tickets" action="12 results"/>
    <div className="marketList">{marketplace.map(x=><article className="marketItem glass" key={x.id}>
      <div className="marketRoute"><span>{x.date} • {x.time}</span><h3>{x.route}</h3><p>{x.train} • {x.cls}</p></div>
      <div className="seller"><ShieldCheck size={18}/><div><b>Verified seller</b><span>Identity checked</span></div></div>
      <div className="price"><small>Original ৳{x.original}</small><b>৳{x.price}</b><span>You save ৳{x.original-x.price}</span></div>
      <button className="primary">View ticket</button>
    </article>)}</div>
  </Page>
}

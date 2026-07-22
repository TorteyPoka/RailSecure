import React from "react";
import { MapPin, Navigation, Radio, TrainFront } from "lucide-react";
import { Page, Badge } from "./Common";

export default function Tracking() {
  return <Page><div className="trackingGrid">
    <section className="mapCard glass">
      <div className="mapHeader"><div><Badge>LIVE</Badge><h2>Subarna Express #701</h2><p>Dhaka → Chattogram</p></div><span className="livePulse"><Radio size={18}/> Updating now</span></div>
      <div className="fakeMap">
        <div className="mapRoad r1"/><div className="mapRoad r2"/><div className="mapRoad r3"/>
        <span className="mapCity c1">Dhaka</span><span className="mapCity c2">Cumilla</span><span className="mapCity c3">Chattogram</span>
        <div className="railPath"/><div className="movingTrain"><TrainFront size={19}/></div>
      </div>
      <div className="trackingStats"><div><small>Current speed</small><b>78 km/h</b></div><div><small>Next station</small><b>Cumilla</b></div><div><small>ETA</small><b>09:42</b></div><div><small>Delay</small><b className="greenText">On time</b></div></div>
    </section>
    <aside className="timeline glass"><h2>Journey timeline</h2>
      {[["Dhaka","07:00","Departed","done"],["Airport","07:25","Departed","done"],["Cumilla","09:42","Next stop","current"],["Feni","10:35","Scheduled",""],["Chattogram","12:20","Arrival",""]].map(([a,b,c,d])=>
        <div className={`timelineItem ${d}`} key={a}><span className="dot"/><div><b>{a}</b><small>{c}</small></div><strong>{b}</strong></div>)}
      <button className="primary full"><Navigation size={17}/> Open station navigation</button>
      <div className="support"><MapPin/><div><b>Need help during travel?</b><span>Emergency support is available 24/7.</span></div></div>
    </aside>
  </div></Page>
}

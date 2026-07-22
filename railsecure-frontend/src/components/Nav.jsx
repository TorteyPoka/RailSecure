import React from "react";
import { Home, Ticket, MapPinned, Store, Users, WalletCards, Bell, UserRound, Settings } from "lucide-react";

const items = [
  ["Dashboard", Home], ["My Tickets", Ticket], ["Live Tracking", MapPinned],
  ["Marketplace", Store], ["Group Travel", Users], ["Wallet", WalletCards],
  ["Notifications", Bell], ["Profile", UserRound], ["Settings", Settings]
];

export default function Nav({ page, setPage }) {
  return (
    <>
      <aside className="sidebar glass">
        <div className="brand"><div className="brandMark">R</div><div><b>RailSecure</b><span>Travel with confidence</span></div></div>
        <nav>{items.map(([label, Icon]) =>
          <button key={label} className={page===label ? "active" : ""} onClick={()=>setPage(label)}>
            <Icon size={19}/><span>{label}</span>
          </button>
        )}</nav>
        <div className="secureBox"><div>🛡️</div><b>Secure by design</b><span>Identity verified • Encrypted</span></div>
      </aside>
      <nav className="bottomNav glass">
        {items.slice(0,5).map(([label, Icon]) =>
          <button key={label} className={page===label ? "active" : ""} onClick={()=>setPage(label)}>
            <Icon size={20}/><span>{label==="My Tickets"?"Tickets":label==="Live Tracking"?"Track":label==="Group Travel"?"Group":label}</span>
          </button>
        )}
      </nav>
    </>
  );
}

import React from "react";
import { Bell, Bot, CheckCircle2, CreditCard, Gift, Headphones, History, Settings, ShieldCheck, WalletCards } from "lucide-react";
import { Page } from "./Common";

const map = {
  Wallet: [WalletCards, "৳2,450", "Secure wallet balance", ["Add money","Payment history","Refund status"]],
  Notifications: [Bell, "3 new", "Travel alerts & updates", ["Train #701 is on time","Group member joined","Reward points earned"]],
  Profile: [ShieldCheck, "Verified", "Identity & traveler profile", ["NID verification complete","Mobile number verified","Emergency contact added"]],
  Settings: [Settings, "Personalize", "Security, accessibility & appearance", ["Light / dark mode","Language & accessibility","Privacy and login security"]]
};

export default function GenericPage({page}) {
  const [Icon,big,sub,items]=map[page] || [Bot,"24/7","AI travel assistant",["Ask about your journey","Station information","Emergency support"]];
  return <Page><div className="genericHero glass"><Icon size={44}/><div><h2>{page}</h2><b>{big}</b><p>{sub}</p></div></div><div className="genericCards">{items.map((x,i)=><article className="glass" key={x}><span>{i===0?<CheckCircle2/>:i===1?<History/>:<Gift/>}</span><h3>{x}</h3><p>Dummy frontend data ready for future API integration.</p><button>Open</button></article>)}</div><div className="assistantBar glass"><Headphones/><div><b>RailSecure AI & Emergency Support</b><span>Need help? Your digital travel assistant is always available.</span></div><button className="primary">Get support</button></div></Page>
}




// // // Topbar.jsx
// // import React, { useState } from "react";

// // /* ── Font scoped only to topbar ── */
// // const TopbarFont = () => (
// //   <style>{`
// //     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// //     .tb-root * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
// //     .tb-input { transition: border-color 0.15s, background 0.15s; }
// //     .tb-input:focus { outline: none; border-color: #A5B4FC !important; background: #fff !important; }
// //     .tb-input::placeholder { color: #94A3B8; }
// //     .tb-icon-btn:hover { background: #F1F5F9 !important; }
// //     .tb-user:hover { background: #F8FAFC !important; }
// //   `}</style>
// // );

// // /* ── Notification Panel ── */
// // const NOTIFICATIONS = [
// //   { id:"1", type:"warning", title:"High bounce rate detected",        body:'"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.', time:"2 hours ago", unread:true  },
// //   { id:"2", type:"success", title:"April Newsletter sent successfully", body:"to 8,230 recipients.",                                                      time:"2 hours ago", unread:true  },
// //   { id:"3", type:"success", title:"WhatsApp Flash Sale completed",     body:"68.3% read rate, 22.4% CTR.",                                                time:"5 hours ago", unread:true  },
// //   { id:"4", type:"info",    title:"Contact import completed",          body:'342 new contacts added to "Active Customers".',                              time:"1 day ago",   unread:false },
// //   { id:"5", type:"info",    title:"Re-engagement Series scheduled",    body:"for May 1, 2026 at 9:00 AM IST.",                                           time:"1 day ago",   unread:false },
// // ];

// // function NotifPanel({ open, onClose }) {
// //   const [notifs, setNotifs] = useState(NOTIFICATIONS);
// //   const unread = notifs.filter(n => n.unread).length;
// //   const markAll = () => setNotifs(p => p.map(n => ({ ...n, unread: false })));
// //   const markOne = id => setNotifs(p => p.map(n => n.id === id ? { ...n, unread: false } : n));

// //   const CFG = {
// //     warning: { iconBg:"#FEF3C7", c:"#D97706" },
// //     success:  { iconBg:"#DCFCE7", c:"#16A34A" },
// //     info:     { iconBg:"#E0E7FF", c:"#4F46E5" },
// //   };

// //   const Icon = ({ type }) => {
// //     const c = CFG[type].c;
// //     if (type === "warning") return (
// //       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
// //         <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinejoin="round"/>
// //         <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
// //         <circle cx="12" cy="17" r="1" fill={c} stroke="none"/>
// //       </svg>
// //     );
// //     if (type === "success") return (
// //       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
// //         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
// //       </svg>
// //     );
// //     return (
// //       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
// //         <circle cx="12" cy="12" r="10"/>
// //         <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round"/>
// //         <circle cx="12" cy="8" r="1" fill={c} stroke="none"/>
// //       </svg>
// //     );
// //   };

// //   if (!open) return null;
// //   return (
// //     <>
// //       <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(15,23,42,0.15)" }}/>
// //       <aside style={{
// //         position:"fixed", top:0, right:0, zIndex:9999,
// //         height:"100vh", width:340,
// //         background:"#fff", borderLeft:"1px solid #E2E8F0",
// //         boxShadow:"-8px 0 32px rgba(0,0,0,0.08)",
// //         display:"flex", flexDirection:"column",
// //         fontFamily:"'Plus Jakarta Sans',sans-serif",
// //       }}>
// //         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
// //           <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>
// //             Notifications
// //             {unread > 0 && (
// //               <span style={{ marginLeft:8, background:"#4F46E5", color:"#fff", fontSize:10, fontWeight:700, borderRadius:999, padding:"2px 7px" }}>
// //                 {unread}
// //               </span>
// //             )}
// //           </span>
// //           <div style={{ display:"flex", gap:8, alignItems:"center" }}>
// //             {unread > 0 && (
// //               <button onClick={markAll} style={{ fontSize:11, fontWeight:600, color:"#4F46E5", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
// //                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
// //                 Mark all read
// //               </button>
// //             )}
// //             <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:4, borderRadius:6, display:"flex" }}>
// //               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/></svg>
// //             </button>
// //           </div>
// //         </div>
// //         <div style={{ flex:1, overflowY:"auto" }}>
// //           {notifs.map(n => (
// //             <div key={n.id} onClick={() => markOne(n.id)} style={{
// //               display:"flex", gap:12, padding:"14px 20px",
// //               borderBottom:"1px solid #F1F5F9",
// //               background: n.unread ? "rgba(238,242,255,0.4)" : "#fff",
// //               cursor:"pointer",
// //             }}>
// //               <div style={{ width:32, height:32, borderRadius:"50%", background:CFG[n.type].iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
// //                 <Icon type={n.type}/>
// //               </div>
// //               <div style={{ flex:1 }}>
// //                 <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#1E293B", display:"flex", alignItems:"center", gap:6 }}>
// //                   {n.title}
// //                   {n.unread && <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F46E5", display:"inline-block", flexShrink:0 }}/>}
// //                 </p>
// //                 <p style={{ margin:"3px 0 0", fontSize:12, color:"#64748B", lineHeight:1.5 }}>{n.body}</p>
// //                 <p style={{ margin:"5px 0 0", fontSize:10.5, color:"#94A3B8" }}>{n.time}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </aside>
// //     </>
// //   );
// // }

// // /* ── Topbar Icons ── */
// // const SearchIcon = () => (
// //   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
// //     <circle cx="11" cy="11" r="7" stroke="#60A5FA" strokeWidth="2.5"/>
// //     <path d="M19.5 19.5l-4.2-4.2" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
// //   </svg>
// // );

// // const BellIcon = () => (
// //   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
// //     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
// //     <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
// //     <ellipse cx="9.5" cy="10.5" rx="1.2" ry="2" fill="#FDE68A" opacity="0.7" transform="rotate(-15 9.5 10.5)"/>
// //   </svg>
// // );

// // export default function Topbar({ title = "Dashboard", onMenuClick }) {
// //   const [notifOpen, setNotifOpen] = useState(false);
// //   const badgeCount = 3;

// //   return (
// //     <div className="tb-root">
// //       <TopbarFont/>
// //       <header style={{
// //         height: 64, display:"flex", alignItems:"center",
// //         padding:"0 24px", borderBottom:"1px solid #E5E9EF",
// //         background:"#fff", width:"100%", flexShrink: 0,
// //         fontFamily:"'Plus Jakarta Sans',sans-serif",
// //       }}>

// //         {/* Mobile hamburger */}
// //         <button
// //           onClick={onMenuClick}
// //           className="tb-icon-btn"
// //           style={{
// //             display:"none", // shown via media query if needed
// //             background:"none", border:"none", cursor:"pointer",
// //             padding:"6px 8px", borderRadius:8, marginRight:8,
// //             alignItems:"center", justifyContent:"center",
// //           }}
// //         >
// //           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
// //             <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
// //           </svg>
// //         </button>

// //         {/* Title */}
// //         <div style={{ fontSize:17, fontWeight:700, color:"#0F172A", letterSpacing:"-0.3px", whiteSpace:"nowrap", flexShrink:0 }}>
// //           {title}
// //         </div>

// //         {/* Center search */}
// //         <div style={{ flex:1, display:"flex", justifyContent:"center", padding:"0 32px" }}>
// //           <div style={{ position:"relative", width:"100%", maxWidth:400 }}>
// //             <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", pointerEvents:"none" }}>
// //               <SearchIcon/>
// //             </span>
// //             <input
// //               type="text"
// //               placeholder="Search campaigns, contacts..."
// //               className="tb-input"
// //               style={{
// //                 width:"100%", height:40, borderRadius:999,
// //                 border:"1.5px solid #E2E8F0", background:"#F8FAFC",
// //                 paddingLeft:42, paddingRight:18,
// //                 fontSize:13.5, color:"#334155",
// //                 fontFamily:"'Plus Jakarta Sans',sans-serif",
// //                 display:"block",
// //               }}
// //             />
// //           </div>
// //         </div>

// //         {/* Right icons */}
// //         <div style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>

// //           {/* Bell */}
// //           <button
// //             className="tb-icon-btn"
// //             onClick={() => setNotifOpen(true)}
// //             style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
// //           >
// //             <BellIcon/>
// //             <span style={{
// //               position:"absolute", top:4, right:4,
// //               minWidth:18, height:18, borderRadius:999,
// //               background:"#EF4444", color:"#fff",
// //               fontSize:10, fontWeight:800,
// //               display:"flex", alignItems:"center", justifyContent:"center",
// //               border:"2px solid #fff", padding:"0 3px", lineHeight:1,
// //             }}>{badgeCount}</span>
// //           </button>

// //           {/* Help */}
// //           <button
// //             className="tb-icon-btn"
// //             style={{ background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
// //           >
// //             <span style={{ fontSize:20, fontWeight:800, color:"#EC4899", lineHeight:"22px", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", userSelect:"none" }}>?</span>
// //           </button>

// //           {/* User */}
// //           <div
// //             className="tb-user"
// //             style={{ display:"flex", alignItems:"center", gap:10, marginLeft:8, cursor:"pointer", padding:"4px 10px 4px 4px", borderRadius:10, transition:"background 0.15s" }}
// //           >
// //             <div style={{ width:36, height:36, borderRadius:"50%", background:"#7C3AED", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700, flexShrink:0 }}>
// //               SA
// //             </div>
// //             <span style={{ fontSize:14, fontWeight:600, color:"#0F172A", whiteSpace:"nowrap" }}>
// //               Subramanian
// //             </span>
// //           </div>
// //         </div>
// //       </header>

// //       <NotifPanel open={notifOpen} onClose={() => setNotifOpen(false)}/>
// //     </div>
// //   );
// // }

// // Topbar.jsx — search + profile dropdown with working sign out
// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// /* ── Font scoped only to topbar ── */
// const TopbarFont = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//     .tb-root * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
//     .tb-input { transition: border-color 0.15s, background 0.15s; }
//     .tb-input:focus { outline: none; border-color: #A5B4FC !important; background: #fff !important; }
//     .tb-input::placeholder { color: #94A3B8; }
//     .tb-icon-btn:hover { background: #F1F5F9 !important; }
//     .tb-user:hover { background: #F8FAFC !important; }
//     @media (max-width: 767px) {
//       .tb-mobile-menu { display: flex !important; }
//       .tb-user-name { display: none; }
//     }
//     @media (min-width: 768px) {
//       .tb-mobile-menu { display: none; }
//       .tb-user-name { display: inline-block; }
//     }
//   `}</style>
// );

// /* ── Notification Panel (unchanged) ── */
// const NOTIFICATIONS = [
//   { id:"1", type:"warning", title:"High bounce rate detected",        body:'"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.', time:"2 hours ago", unread:true  },
//   { id:"2", type:"success", title:"April Newsletter sent successfully", body:"to 8,230 recipients.",                                                      time:"2 hours ago", unread:true  },
//   { id:"3", type:"success", title:"WhatsApp Flash Sale completed",     body:"68.3% read rate, 22.4% CTR.",                                                time:"5 hours ago", unread:true  },
//   { id:"4", type:"info",    title:"Contact import completed",          body:'342 new contacts added to "Active Customers".',                              time:"1 day ago",   unread:false },
//   { id:"5", type:"info",    title:"Re-engagement Series scheduled",    body:"for May 1, 2026 at 9:00 AM IST.",                                           time:"1 day ago",   unread:false },
// ];

// function NotifPanel({ open, onClose }) {
//   const [notifs, setNotifs] = useState(NOTIFICATIONS);
//   const unread = notifs.filter(n => n.unread).length;
//   const markAll = () => setNotifs(p => p.map(n => ({ ...n, unread: false })));
//   const markOne = id => setNotifs(p => p.map(n => n.id === id ? { ...n, unread: false } : n));

//   const CFG = {
//     warning: { iconBg:"#FEF3C7", c:"#D97706" },
//     success:  { iconBg:"#DCFCE7", c:"#16A34A" },
//     info:     { iconBg:"#E0E7FF", c:"#4F46E5" },
//   };

//   const Icon = ({ type }) => {
//     const c = CFG[type].c;
//     if (type === "warning") return (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinejoin="round"/>
//         <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
//         <circle cx="12" cy="17" r="1" fill={c} stroke="none"/>
//       </svg>
//     );
//     if (type === "success") return (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     );
//     return (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
//         <circle cx="12" cy="12" r="10"/>
//         <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round"/>
//         <circle cx="12" cy="8" r="1" fill={c} stroke="none"/>
//       </svg>
//     );
//   };

//   if (!open) return null;
//   return (
//     <>
//       <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(15,23,42,0.15)" }}/>
//       <aside style={{
//         position:"fixed", top:0, right:0, zIndex:9999,
//         height:"100vh", width:340,
//         background:"#fff", borderLeft:"1px solid #E2E8F0",
//         boxShadow:"-8px 0 32px rgba(0,0,0,0.08)",
//         display:"flex", flexDirection:"column",
//         fontFamily:"'Plus Jakarta Sans',sans-serif",
//       }}>
//         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
//           <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>
//             Notifications
//             {unread > 0 && (
//               <span style={{ marginLeft:8, background:"#4F46E5", color:"#fff", fontSize:10, fontWeight:700, borderRadius:999, padding:"2px 7px" }}>
//                 {unread}
//               </span>
//             )}
//           </span>
//           <div style={{ display:"flex", gap:8, alignItems:"center" }}>
//             {unread > 0 && (
//               <button onClick={markAll} style={{ fontSize:11, fontWeight:600, color:"#4F46E5", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
//                 Mark all read
//               </button>
//             )}
//             <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:4, borderRadius:6, display:"flex" }}>
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/></svg>
//             </button>
//           </div>
//         </div>
//         <div style={{ flex:1, overflowY:"auto" }}>
//           {notifs.map(n => (
//             <div key={n.id} onClick={() => markOne(n.id)} style={{
//               display:"flex", gap:12, padding:"14px 20px",
//               borderBottom:"1px solid #F1F5F9",
//               background: n.unread ? "rgba(238,242,255,0.4)" : "#fff",
//               cursor:"pointer",
//             }}>
//               <div style={{ width:32, height:32, borderRadius:"50%", background:CFG[n.type].iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                 <Icon type={n.type}/>
//               </div>
//               <div style={{ flex:1 }}>
//                 <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#1E293B", display:"flex", alignItems:"center", gap:6 }}>
//                   {n.title}
//                   {n.unread && <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F46E5", display:"inline-block", flexShrink:0 }}/>}
//                 </p>
//                 <p style={{ margin:"3px 0 0", fontSize:12, color:"#64748B", lineHeight:1.5 }}>{n.body}</p>
//                 <p style={{ margin:"5px 0 0", fontSize:10.5, color:"#94A3B8" }}>{n.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </aside>
//     </>
//   );
// }

// /* ── Topbar Icons ── */
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <circle cx="11" cy="11" r="7" stroke="#60A5FA" strokeWidth="2.5"/>
//     <path d="M19.5 19.5l-4.2-4.2" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
//   </svg>
// );

// const BellIcon = () => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
//     <ellipse cx="9.5" cy="10.5" rx="1.2" ry="2" fill="#FDE68A" opacity="0.7" transform="rotate(-15 9.5 10.5)"/>
//   </svg>
// );

// export default function Topbar({ title = "Dashboard", onMenuClick, onSearch }) {
//   const navigate = useNavigate();
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dropdownRef = useRef(null);
//   const badgeCount = 3;

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (onSearch) onSearch(searchTerm);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [searchTerm, onSearch]);

//   // Close profile dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSignOut = () => {
//     // Clear any auth tokens / user data
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("user");
//     // You can also clear other app-specific keys if needed
//     // Then redirect to login
//     navigate("/login");
//   };

//   const handleProfileSettings = () => {
//     navigate("/settings");
//     setProfileOpen(false);
//   };

//   return (
//     <div className="tb-root">
//       <TopbarFont />
//       <header style={{
//         height: 64, display:"flex", alignItems:"center",
//         padding:"0 24px", borderBottom:"1px solid #E5E9EF",
//         background:"#fff", width:"100%", flexShrink: 0,
//         fontFamily:"'Plus Jakarta Sans',sans-serif",
//         gap: "12px",
//       }}>
//         {/* Mobile hamburger */}
//         <button
//           onClick={onMenuClick}
//           className="tb-icon-btn tb-mobile-menu"
//           style={{
//             background:"none", border:"none", cursor:"pointer",
//             padding:"6px 8px", borderRadius:8,
//             alignItems:"center", justifyContent:"center",
//           }}
//         >
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
//             <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
//           </svg>
//         </button>

//         {/* Title */}
//         <div style={{ fontSize:17, fontWeight:700, color:"#0F172A", letterSpacing:"-0.3px", whiteSpace:"nowrap", flexShrink:0 }}>
//           {title}
//         </div>

//         {/* Spacer */}
//         <div style={{ flex: 1 }} />

//         {/* Search bar */}
//         <div style={{ width: "260px", maxWidth: "100%", marginRight: "8px" }}>
//           <div style={{ position:"relative", width:"100%" }}>
//             <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", pointerEvents:"none" }}>
//               <SearchIcon/>
//             </span>
//             <input
//               type="text"
//               placeholder="Search..."
//               className="tb-input"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               style={{
//                 width:"100%", height:40, borderRadius:999,
//                 border:"1.5px solid #E2E8F0", background:"#F8FAFC",
//                 paddingLeft:42, paddingRight:18,
//                 fontSize:13.5, color:"#334155",
//                 fontFamily:"'Plus Jakarta Sans',sans-serif",
//                 display:"block",
//               }}
//             />
//           </div>
//         </div>

//         {/* Right icons */}
//         <div style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
//           {/* Bell */}
//           <button
//             className="tb-icon-btn"
//             onClick={() => setNotifOpen(true)}
//             style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
//           >
//             <BellIcon/>
//             <span style={{
//               position:"absolute", top:4, right:4,
//               minWidth:18, height:18, borderRadius:999,
//               background:"#EF4444", color:"#fff",
//               fontSize:10, fontWeight:800,
//               display:"flex", alignItems:"center", justifyContent:"center",
//               border:"2px solid #fff", padding:"0 3px", lineHeight:1,
//             }}>{badgeCount}</span>
//           </button>

//           {/* Help */}
//           <button
//             className="tb-icon-btn"
//             style={{ background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
//           >
//             <span style={{ fontSize:20, fontWeight:800, color:"#EC4899", lineHeight:"22px", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", userSelect:"none" }}>?</span>
//           </button>

//           {/* User with dropdown */}
//           <div
//             ref={dropdownRef}
//             className="tb-user"
//             onClick={() => setProfileOpen(!profileOpen)}
//             style={{ position:"relative", display:"flex", alignItems:"center", gap:10, marginLeft:8, cursor:"pointer", padding:"4px 10px 4px 4px", borderRadius:10, transition:"background 0.15s" }}
//           >
//             <div style={{ width:36, height:36, borderRadius:"50%", background:"#7C3AED", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700, flexShrink:0 }}>
//               SA
//             </div>
//             <span className="tb-user-name" style={{ fontSize:14, fontWeight:600, color:"#0F172A", whiteSpace:"nowrap" }}>
//               Subramanian
//             </span>

//             {/* Dropdown menu */}
//             {profileOpen && (
//               <div style={{
//                 position:"absolute", top: "calc(100% + 8px)", right: 0,
//                 width: 180, background:"#fff", borderRadius:12,
//                 boxShadow:"0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.02)",
//                 border:"1px solid #E2E8F0", zIndex: 100,
//                 overflow:"hidden",
//               }}>
//                 <button
//                   onClick={handleProfileSettings}
//                   style={{
//                     width:"100%", textAlign:"left", padding:"10px 16px",
//                     fontSize:13, fontWeight:500, color:"#1E293B",
//                     background:"none", border:"none", cursor:"pointer",
//                     transition:"background 0.15s",
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.background="#F8FAFC"}
//                   onMouseLeave={(e) => e.currentTarget.style.background="#fff"}
//                 >
//                   ⚙️ Profile Settings
//                 </button>
//                 <button
//                   onClick={handleSignOut}
//                   style={{
//                     width:"100%", textAlign:"left", padding:"10px 16px",
//                     fontSize:13, fontWeight:500, color:"#EF4444",
//                     background:"none", border:"none", cursor:"pointer",
//                     borderTop:"1px solid #F1F5F9",
//                     transition:"background 0.15s",
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.background="#FEF2F2"}
//                   onMouseLeave={(e) => e.currentTarget.style.background="#fff"}
//                 >
//                   🚪 Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <NotifPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
//     </div>
//   );
// }


// Topbar.jsx — search + profile dropdown with working sign out + dynamic user name
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notificationsApi } from "../../../services/api/notifications.api";

/* ── Font scoped only to topbar ── */
const TopbarFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .tb-root * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
    .tb-input { transition: border-color 0.15s, background 0.15s; }
    .tb-input:focus { outline: none; border-color: #A5B4FC !important; background: #fff !important; }
    .tb-input::placeholder { color: #94A3B8; }
    .tb-icon-btn:hover { background: #F1F5F9 !important; }
    .tb-user:hover { background: #F8FAFC !important; }
    @media (max-width: 767px) {
      .tb-mobile-menu { display: flex !important; }
      .tb-user-name { display: none; }
    }
    @media (min-width: 768px) {
      .tb-mobile-menu { display: none; }
      .tb-user-name { display: inline-block; }
    }
  `}</style>
);

/* ── Notification Panel (unchanged) ── */
// const NOTIFICATIONS = [
//   { id:"1", type:"warning", title:"High bounce rate detected",        body:'"April Newsletter" has a 5.8% hard bounce rate, above your 5% threshold.', time:"2 hours ago", unread:true  },
//   { id:"2", type:"success", title:"April Newsletter sent successfully", body:"to 8,230 recipients.",                                                      time:"2 hours ago", unread:true  },
//   { id:"3", type:"success", title:"WhatsApp Flash Sale completed",     body:"68.3% read rate, 22.4% CTR.",                                                time:"5 hours ago", unread:true  },
//   { id:"4", type:"info",    title:"Contact import completed",          body:'342 new contacts added to "Active Customers".',                              time:"1 day ago",   unread:false },
//   { id:"5", type:"info",    title:"Re-engagement Series scheduled",    body:"for May 1, 2026 at 9:00 AM IST.",                                           time:"1 day ago",   unread:false },
// ];

function NotifPanel({
  open,
  onClose,
  notifications,
  loadNotifications
}){
  // const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifications.filter(
  n => !n.is_read
).length;
const markAll = async () => {
  try {
    await notificationsApi.markAllRead();
    await loadNotifications();
  } catch (err) {
    console.error(err);
  }
};
const markOne = async (id) => {
  try {
    await notificationsApi.markRead(id);
    await loadNotifications();
  } catch (err) {
    console.error(err);
  }
};

  const CFG = {
  campaignSent:      { iconBg:"#DCFCE7", c:"#16A34A", type:"success" },
  campaignScheduled: { iconBg:"#DBEAFE", c:"#2563EB", type:"info" },
  campaignFailed:    { iconBg:"#FEE2E2", c:"#DC2626", type:"error" },
  approvalRequested: { iconBg:"#FEF3C7", c:"#D97706", type:"warning" },
  contactImported:   { iconBg:"#E0F2FE", c:"#0284C7", type:"info" },
  listCreated:       { iconBg:"#F3E8FF", c:"#7C3AED", type:"info" },
  templateCreated:   { iconBg:"#EDE9FE", c:"#6366F1", type:"info" },

  success: { iconBg:"#DCFCE7", c:"#16A34A" },
  warning: { iconBg:"#FEF3C7", c:"#D97706" },
  info:    { iconBg:"#E0E7FF", c:"#4F46E5" },
  error:   { iconBg:"#FEE2E2", c:"#DC2626" },
};

 const Icon = ({ type }) => {
  const config = CFG[type] || CFG.info;
  const c = config.c;

  if (type === "warning") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
        <circle cx="12" cy="17" r="1" fill={c} stroke="none"/>
      </svg>
    );
  }

  if (type === "success") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === "error") {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M15 9L9 15M9 9l6 6" strokeLinecap="round"/>
    </svg>
  );
}

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1" fill={c} stroke="none"/>
    </svg>
  );
};

  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:9998, background:"rgba(15,23,42,0.15)" }}/>
      <aside style={{
        position:"fixed", top:0, right:0, zIndex:9999,
        height:"100vh", width:340,
        background:"#fff", borderLeft:"1px solid #E2E8F0",
        boxShadow:"-8px 0 32px rgba(0,0,0,0.08)",
        display:"flex", flexDirection:"column",
        fontFamily:"'Plus Jakarta Sans',sans-serif",
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
          <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>
            Notifications
            {unread > 0 && (
              <span style={{ marginLeft:8, background:"#4F46E5", color:"#fff", fontSize:10, fontWeight:700, borderRadius:999, padding:"2px 7px" }}>
                {unread}
              </span>
            )}
          </span>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {unread > 0 && (
              <button onClick={markAll} style={{ fontSize:11, fontWeight:600, color:"#4F46E5", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:4, borderRadius:6, display:"flex" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {notifications.map(n => {

  const config =
    CFG[n.notification_type] || CFG.info;

  return (
            <div key={n.id} onClick={() => markOne(n.id)} style={{
              display:"flex", gap:12, padding:"14px 20px",
              borderBottom:"1px solid #F1F5F9",
              background:!n.is_read ? "rgba(238,242,255,0.4)" : "#fff",
              cursor:"pointer",
            }}>
              <div style={{
  width:32,
  height:32,
  borderRadius:"50%",
background: config.iconBg,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  flexShrink:0
}}>
 <Icon type={config.type} />
</div>
              <div style={{ flex:1 }}>
                <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#1E293B", display:"flex", alignItems:"center", gap:6 }}>
                  {n.title}
                  {!n.is_read && <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F46E5", display:"inline-block", flexShrink:0 }}/>}
                </p>
                <p style={{ margin:"3px 0 0", fontSize:12, color:"#64748B", lineHeight:1.5 }}>{n.message}</p>
                <p style={{ margin:"5px 0 0", fontSize:10.5, color:"#94A3B8" }}>{n.time}</p>
              </div>
            </div>
         );
})}
        </div>
      </aside>
    </>
  );
}

/* ── Topbar Icons ── */
// const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <circle cx="11" cy="11" r="7" stroke="#60A5FA" strokeWidth="2.5"/>
//     <path d="M19.5 19.5l-4.2-4.2" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
//   </svg>
// );

const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="9.5" cy="10.5" rx="1.2" ry="2" fill="#FDE68A" opacity="0.7" transform="rotate(-15 9.5 10.5)"/>
  </svg>
);

export default function Topbar({ title = "Dashboard", onMenuClick}) {
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
const [unreadCount, setUnreadCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
//  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("User");
  const dropdownRef = useRef(null);
  const badgeCount = unreadCount;
  // const badgeCount = 3;
useEffect(() => {
  loadNotifications();
}, []);
const loadNotifications = async () => {
  try {
    const data =
      await notificationsApi.getAll();
      console.log("NOTIFICATIONS DATA:", data);

    setNotifications(data);

const unread = data.filter(
  n => !n.is_read
).length;

setUnreadCount(unread);
  } catch (err) {
    console.error(
      "Notification load failed",
      err
    );
  }
};
  // Load user name from localStorage
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const { user } = JSON.parse(authData);
        if (user && user.full_name) {
          setUserName(user.full_name.split(" ")[0]); // Show first name only
        } else if (user && user.fullName) {
          setUserName(user.fullName.split(" ")[0]);
        }
      } catch (e) {
        console.warn("Failed to parse user data", e);
      }
    }
  }, []);

  // Debounced search
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (onSearch) onSearch(searchTerm);
  //   }, 300);
  //   return () => clearTimeout(timer);
  // }, [searchTerm, onSearch]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // Clear auth data and any other app keys
    localStorage.removeItem("auth");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    // Redirect to login
    navigate("/login", { replace: true });
  };

  const handleProfileSettings = () => {
    navigate("/settings");
    setProfileOpen(false);
  };

  // Get initials for avatar
  const getInitials = () => {
    if (userName && userName !== "User") return userName.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="tb-root">
      <TopbarFont />
      <header style={{
        height: 64, display:"flex", alignItems:"center",
        padding:"0 24px", borderBottom:"1px solid #E5E9EF",
        background:"#fff", width:"100%", flexShrink: 0,
        fontFamily:"'Plus Jakarta Sans',sans-serif",
        gap: "12px",
      }}>
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="tb-icon-btn tb-mobile-menu"
          style={{
            background:"none", border:"none", cursor:"pointer",
            padding:"6px 8px", borderRadius:8,
            alignItems:"center", justifyContent:"center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <div style={{ fontSize:17, fontWeight:700, color:"#0F172A", letterSpacing:"-0.3px", whiteSpace:"nowrap", flexShrink:0 }}>
          {title}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Search bar */}
        {/* <div style={{ width: "260px", maxWidth: "100%", marginRight: "8px" }}>
          <div style={{ position:"relative", width:"100%" }}>
            <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", pointerEvents:"none" }}>
              <SearchIcon/> */}
            {/* </span>
            <input
              type="text"
              placeholder="Search..."
              className="tb-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width:"100%", height:40, borderRadius:999,
                border:"1.5px solid #E2E8F0", background:"#F8FAFC",
                paddingLeft:42, paddingRight:18,
                fontSize:13.5, color:"#334155",
                fontFamily:"'Plus Jakarta Sans',sans-serif",
                display:"block",
              }}
            />
          </div>
        </div> */}

        {/* Right icons */}
        <div style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
          {/* Bell */}
          <button
            className="tb-icon-btn"
            onClick={() => setNotifOpen(true)}
            style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
          >
            <BellIcon/>
            <span style={{
              position:"absolute", top:4, right:4,
              minWidth:18, height:18, borderRadius:999,
              background:"#EF4444", color:"#fff",
              fontSize:10, fontWeight:800,
              display:"flex", alignItems:"center", justifyContent:"center",
              border:"2px solid #fff", padding:"0 3px", lineHeight:1,
            }}>{badgeCount}</span>
          </button>

          {/* Help */}
          <button
            className="tb-icon-btn"
            onClick={() => setShowAbout(true)}
            style={{ background:"none", border:"none", cursor:"pointer", padding:"7px 9px", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
          >
            <span style={{ fontSize:20, fontWeight:800, color:"#EC4899", lineHeight:"22px", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", userSelect:"none" }}>?</span>
          </button>

          {/* User with dropdown */}
          <div
            ref={dropdownRef}
            className="tb-user"
            onClick={() => setProfileOpen(!profileOpen)}
            style={{ position:"relative", display:"flex", alignItems:"center", gap:10, marginLeft:8, cursor:"pointer", padding:"4px 10px 4px 4px", borderRadius:10, transition:"background 0.15s" }}
          >
            <div style={{ width:36, height:36, borderRadius:"50%", background:"#7C3AED", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:700, flexShrink:0 }}>
              {getInitials()}
            </div>
            <span className="tb-user-name" style={{ fontSize:14, fontWeight:600, color:"#0F172A", whiteSpace:"nowrap" }}>
              {userName}
            </span>

            {/* Dropdown menu */}
            {profileOpen && (
              <div style={{
                position:"absolute", top: "calc(100% + 8px)", right: 0,
                width: 180, background:"#fff", borderRadius:12,
                boxShadow:"0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.02)",
                border:"1px solid #E2E8F0", zIndex: 100,
                overflow:"hidden",
              }}>
                <button
                  onClick={handleProfileSettings}
                  style={{
                    width:"100%", textAlign:"left", padding:"10px 16px",
                    fontSize:13, fontWeight:500, color:"#1E293B",
                    background:"none", border:"none", cursor:"pointer",
                    transition:"background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background="#F8FAFC"}
                  onMouseLeave={(e) => e.currentTarget.style.background="#fff"}
                >
                  ⚙️ Profile Settings
                </button>
                <button
                  onClick={handleSignOut}
                  style={{
                    width:"100%", textAlign:"left", padding:"10px 16px",
                    fontSize:13, fontWeight:500, color:"#EF4444",
                    background:"none", border:"none", cursor:"pointer",
                    borderTop:"1px solid #F1F5F9",
                    transition:"background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background="#FEF2F2"}
                  onMouseLeave={(e) => e.currentTarget.style.background="#fff"}
                >
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {showAbout && (
  <>
    <div
      onClick={() => setShowAbout(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 9998
      }}
    />

    <div
  style={{
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
width: "700px",
maxWidth: "88vw",
height: "560px",
maxHeight: "80vh",
    background: "#fff",
    borderRadius: "24px",
    // overflow: "auto",
    zIndex: 9999,
    display: "flex",
    boxShadow: "0 25px 60px rgba(0,0,0,.18)"
  }}
>
  {/* LEFT SIDE */}
  <div
    style={{
      width: "38%",
      background:
        "linear-gradient(180deg,#F8F6FF 0%,#F2EDFF 100%)",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRight: "1px solid #ECE8FF"
    }}
  >
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px"
        }}
      >
        <div
          style={{
            fontSize: "42px",
            color: "#7C3AED"
          }}
        >
          ⚡
        </div>

        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#111827"
            }}
          >
            WYN<span style={{ color: "#7C3AED" }}>Reach</span>
          </div>

          <div
            style={{
              color: "#6B7280",
              fontSize: "14px"
            }}
          >
            Marketing Suite
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 8px 24px rgba(124,58,237,.08)"
        }}
      >
        <div
          style={{
            display: "flex",
            height: "110px",
            borderRadius: "14px",
            overflow: "auto"
          }}
        >
          <div
            style={{
              width: "22%",
              background: "#6D28D9"
            }}
          />

          <div
            style={{
              flex: 1,
              background: "#F9FAFB",
              padding: "16px"
            }}
          >
            <div
              style={{
                width: "70%",
                height: "12px",
                background: "#DDD6FE",
                borderRadius: "6px",
                marginBottom: "12px"
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "12px"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#EDE9FE"
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#DCFCE7"
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#FDE68A"
                }}
              />
            </div>

            <div
              style={{
                height: "80px",
                borderRadius: "12px",
                background: "#F3F4F6"
              }}
            />
          </div>
        </div>
      </div>
    </div>

    <div
      style={{
        borderLeft: "4px solid #7C3AED",
        paddingLeft: "14px"
      }}
    >
      <div
        style={{
          fontWeight: 700,
          color: "#111827"
        }}
      >
        Powerful engagement.
      </div>

      <div
        style={{
          fontWeight: 700,
          color: "#111827"
        }}
      >
        Meaningful connections.
      </div>

      <div
        style={{
          marginTop: "8px",
          color: "#6B7280"
        }}
      >
        All in one platform.
      </div>
      <div
  style={{
    marginTop: "18px",
    padding: "8px 10px",
    borderTop: "1px solid #E5E7EB",
    fontSize: "10px",
    color: "#6B7280",
    textAlign: "center"
  }}
>
  🔒 Privacy Policy • All customer data is encrypted, securely stored,
  and handled in accordance with industry best practices.
</div>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div
  style={{
    flex: 1,
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }}
>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "22px",
          fontWeight: 800
        }}
      >
        About{" "}
        <span style={{ color: "#7C3AED" }}>
          WynReach
        </span>
      </h2>

      <button
        onClick={() => setShowAbout(false)}
        style={{
          border: "none",
          background: "transparent",
          fontSize: "28px",
          cursor: "pointer",
          color: "#9CA3AF"
        }}
      >
        ×
      </button>
    </div>

    <p
      style={{
        marginTop: "10px",
        color: "#4B5563",
        lineHeight: "1.5"
      }}
    >
      WynReach is a multi-channel customer engagement
      platform designed to help businesses create,
      schedule and track marketing campaigns across
      multiple channels.
    </p>

    <h3
      style={{
        marginTop: "12px",
        marginBottom: "10px"
      }}
    >
      What you can do with WynReach
    </h3>

    <div
      style={{
        display: "grid",
        gap: "6px"
      }}
    >
      {[
        ["📧", "Email & Whatsapp Campaigns ", "Design, send and automate campaigns"],
        ["👥", "Contact Management", "Manage contacts and audience lists"],
        ["📊", "Analytics & Reporting", "Track performance and insights"],
        ["📅", "Campaign Scheduling", "Schedule campaigns at the right time"],
        ["📈", "Engagement Tracking", "Monitor opens and clicks"]
      ].map(([icon, title, desc]) => (
        <div
          key={title}
          style={{
            display: "flex",
            gap: "10px",
         padding: "2px 4px",
            borderRadius: "14px",
            background: "#FAFAFA",
            border: "1px solid #E5E7EB"
          }}
        >
          <div style={{ fontSize: "24px" }}>{icon}</div>

          <div>
            <div
              style={{
                fontWeight: 600
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#6B7280"
              }}
            >
              {desc}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div
  style={{
    marginTop: "10px",
    display: "flex",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    overflow: "hidden",
    fontSize: "12px"
  }}
>
  <div
    style={{
      flex: 1,
      textAlign: "center",
      padding: "8px 6px"
    }}
  >
    <div
      style={{
        fontWeight: 600,
        fontSize: "12px"
      }}
    >
      Version
    </div>

    <div
      style={{
        color: "#6B7280",
        marginTop: "2px"
      }}
    >
      1.0.0
    </div>
  </div>

  <div
    style={{
      flex: 1,
      textAlign: "center",
      padding: "8px 6px",
      borderLeft: "1px solid #E5E7EB"
    }}
  >
    <div
      style={{
        fontWeight: 600,
        fontSize: "12px"
      }}
    >
      Status
    </div>

    <div
      style={{
        color: "#6B7280",
        marginTop: "2px"
      }}
    >
      Beta
    </div>
  </div>

  <div
    style={{
      flex: 1.4,
      textAlign: "center",
      padding: "8px 6px",
      borderLeft: "1px solid #E5E7EB"
    }}
  >
    <div
      style={{
        fontWeight: 600,
        fontSize: "12px"
      }}
    >
      Support
    </div>

    <div
      style={{
        color: "#7C3AED",
        fontSize: "11px",
        marginTop: "2px"
      }}
    >
      support@wynsync.com
    </div>
  </div>
</div>



    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "24px"
      }}
    >
      <button
        onClick={() => setShowAbout(false)}
        style={{
          width: "140px",
          height: "42px",
          border: "none",
          borderRadius: "12px",
          background:
            "linear-gradient(90deg,#7C3AED,#9333EA)",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  </div>
</div>
  </>
)}
      <NotifPanel
  open={notifOpen}
  onClose={() => setNotifOpen(false)}
  notifications={notifications}
  loadNotifications={loadNotifications}
/>
    </div>
  );
}
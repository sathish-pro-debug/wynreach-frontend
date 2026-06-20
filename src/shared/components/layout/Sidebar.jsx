



// // // // Sidebar.jsx — no visible scrollbar, touch/wheel scroll works, font forced
// // // import React, { useState } from 'react';
// // // import { NavLink, useNavigate } from 'react-router-dom';

// // // const SidebarFont = () => (
// // //   <style>{`
// // //     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// // //     .sidebar-root,
// // //     .sidebar-root *,
// // //     .sidebar-root *::before,
// // //     .sidebar-root *::after {
// // //       font-family: 'Plus Jakarta Sans', sans-serif !important;
// // //       box-sizing: border-box;
// // //     }
// // //     .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
// // //     .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
// // //     .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
// // //     .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
// // //     .sidebar-root nav::-webkit-scrollbar { display: none; }
// // //   `}</style>
// // // );

// // // const ROUTES = {
// // //   DASHBOARD:         '/',
// // //   CONTACTS:          '/contacts',
// // //   LISTS:             '/lists',
// // //   SUPPRESSION:       '/suppression',
// // //   CAMPAIGNS:         '/campaigns',
// // //   CAMPAIGN_CALENDAR: '/calendar',
// // //   TEMPLATES:         '/templates',
// // //   ANALYTICS:         '/analytics',
// // //   AUTOMATION:        '/automation',
// // //   SETTINGS:          '/settings',
// // //   CAMPAIGN_NEW:      '/campaigns/new',
// // //   CHATBOT:           '/chatbot',      // ✅
// // // };

// // // const NAV_GROUPS = [
// // //   {
// // //     items: [{
// // //       label: 'Dashboard',
// // //       svgIcon: true,
// // //       to: ROUTES.DASHBOARD,
// // //     }],
// // //   },
// // //   {
// // //     label: 'AUDIENCE',
// // //     items: [{
// // //       label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
// // //       children: [
// // //         { label: 'All Contacts', to: ROUTES.CONTACTS },
// // //         { label: 'Lists',        to: ROUTES.LISTS },
// // //         { label: 'Suppression',  to: ROUTES.SUPPRESSION },
// // //       ],
// // //     }],
// // //   },
// // //   {
// // //     label: 'CAMPAIGNS',
// // //     items: [
// // //       {
// // //         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
// // //         children: [
// // //           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
// // //           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
// // //         ],
// // //       },
// // //       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
// // //     ],
// // //   },
// // //   {
// // //     label: 'INTELLIGENCE',
// // //     items: [
// // //       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
// // //       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
// // //       { label: 'Chatbot',    emoji: '🤖', to: ROUTES.CHATBOT },   // ✅ new chatbot item
// // //     ],
// // //   },
// // //   {
// // //     items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
// // //   },
// // // ];

// // // const DashIcon = () => (
// // //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
// // //     <rect x="3" y="3" width="7" height="7" rx="1"/>
// // //     <rect x="14" y="3" width="7" height="7" rx="1"/>
// // //     <rect x="3" y="14" width="7" height="7" rx="1"/>
// // //     <rect x="14" y="14" width="7" height="7" rx="1"/>
// // //   </svg>
// // // );

// // // const ChevronIcon = ({ open }) => (
// // //   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// // //     style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
// // //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
// // //   </svg>
// // // );

// // // const MailIcon = () => (
// // //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
// // //     <path strokeLinecap="round" strokeLinejoin="round"
// // //       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
// // //   </svg>
// // // );

// // // const PlusIcon = () => (
// // //   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
// // //   </svg>
// // // );

// // // const S = {
// // //   rowPy:        7,
// // //   rowPx:        10,
// // //   groupLabelPt: 12,
// // //   groupLabelPb: 4,
// // //   childPy:      5,
// // //   childPx:      10,
// // //   fontSize:     13,
// // //   labelFontSize: 9.5,
// // //   emojiSize:    15,
// // // };

// // // export default function Sidebar({ isOpen = true, onClose }) {
// // //   const navigate = useNavigate();
// // //   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

// // //   const toggle = lbl =>
// // //     setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

// // //   const go = to => { navigate(to); onClose?.(); };

// // //   return (
// // //     <>
// // //       <SidebarFont />

// // //       {isOpen && (
// // //         <div
// // //           className="md:hidden"
// // //           style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.5)' }}
// // //           onClick={onClose}
// // //         />
// // //       )}

// // //       <aside
// // //         className="sidebar-root"
// // //         style={{
// // //           position:      'fixed',
// // //           top: 0, left: 0, bottom: 0,
// // //           width:         260,
// // //           zIndex:        40,
// // //           background:    '#0D1117',
// // //           borderRight:   '1px solid rgba(255,255,255,0.06)',
// // //           display:       'flex',
// // //           flexDirection: 'column',
// // //           transform:     isOpen ? 'translateX(0)' : 'translateX(-100%)',
// // //           transition:    'transform 0.2s',
// // //           overflow:      'hidden',
// // //         }}
// // //       >

// // //         {/* ── LOGO ── */}
// // //         <div style={{
// // //           display: 'flex', alignItems: 'center', gap: 10,
// // //           padding: '13px 14px',
// // //           borderBottom: '1px solid rgba(255,255,255,0.06)',
// // //           flexShrink: 0,
// // //         }}>
// // //           <div style={{
// // //             width: 34, height: 34, borderRadius: 10, flexShrink: 0,
// // //             background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
// // //             display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //           }}>
// // //             <MailIcon />
// // //           </div>
// // //           <div>
// // //             <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
// // //               WYNReach
// // //             </p>
// // //             <p style={{
// // //               fontSize: 9.5, fontWeight: 600, color: '#4B5563', margin: 0,
// // //               textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 1,
// // //             }}>
// // //               WynSync Suite
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* ── NEW CAMPAIGN ── */}
// // //         <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
// // //           <button
// // //             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
// // //             style={{
// // //               width: '100%', display: 'flex', alignItems: 'center',
// // //               justifyContent: 'center', gap: 7,
// // //               background: 'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
// // //               border: 'none', borderRadius: 8, padding: '9px 0',
// // //               color: '#fff', fontSize: 13, fontWeight: 600,
// // //               cursor: 'pointer',
// // //             }}
// // //           >
// // //             <PlusIcon /> New Campaign
// // //           </button>
// // //         </div>

// // //         {/* ── NAV — scrollable but no visible scrollbar ── */}
// // //         <nav style={{
// // //           flex: 1,
// // //           padding: '2px 7px 8px',
// // //           overflowY:          'auto',
// // //           overflowX:          'hidden',
// // //           scrollbarWidth:     'none',
// // //           msOverflowStyle:    'none',
// // //           display: 'flex',
// // //           flexDirection: 'column',
// // //         }}>
// // //           {NAV_GROUPS.map((group, gi) => (
// // //             <div key={gi}>

// // //               {group.label && (
// // //                 <p style={{
// // //                   padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
// // //                   fontSize: S.labelFontSize, fontWeight: 700, color: '#374151',
// // //                   textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
// // //                 }}>
// // //                   {group.label}
// // //                 </p>
// // //               )}

// // //               {group.items.map(item => (
// // //                 <div key={item.label}>

// // //                   {item.children ? (
// // //                     <>
// // //                       <button
// // //                         className="sb-nav-btn"
// // //                         onClick={() => toggle(item.label)}
// // //                         style={{
// // //                           width: '100%', display: 'flex', alignItems: 'center',
// // //                           gap: 8, padding: `${S.rowPy}px ${S.rowPx}px`,
// // //                           borderRadius: 7, background: 'none', border: 'none',
// // //                           cursor: 'pointer',
// // //                           color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
// // //                           fontSize: S.fontSize, fontWeight: 500,
// // //                           transition: 'background 0.15s, color 0.15s',
// // //                         }}
// // //                       >
// // //                         <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>
// // //                           {item.emoji}
// // //                         </span>
// // //                         <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
// // //                         <ChevronIcon open={expanded.includes(item.label)} />
// // //                       </button>

// // //                       {expanded.includes(item.label) && (
// // //                         <div style={{ paddingLeft: 33, marginBottom: 2 }}>
// // //                           {item.children.map(child => (
// // //                             <NavLink
// // //                               key={child.to}
// // //                               to={child.to}
// // //                               end
// // //                               onClick={onClose}
// // //                               className="sb-child-link"
// // //                               style={({ isActive }) => ({
// // //                                 display: 'flex', alignItems: 'center', gap: 8,
// // //                                 padding: `${S.childPy}px ${S.childPx}px`,
// // //                                 borderRadius: 6,
// // //                                 fontSize: 12.5, fontWeight: isActive ? 600 : 500,
// // //                                 color: isActive ? '#A78BFA' : '#4B5563',
// // //                                 textDecoration: 'none',
// // //                                 transition: 'color 0.15s, background 0.15s',
// // //                                 borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
// // //                               })}
// // //                             >
// // //                               {({ isActive }) => (
// // //                                 <>
// // //                                   <span style={{
// // //                                     width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
// // //                                     background: isActive ? '#7C3AED' : '#374151',
// // //                                   }} />
// // //                                   {child.label}
// // //                                 </>
// // //                               )}
// // //                             </NavLink>
// // //                           ))}
// // //                         </div>
// // //                       )}
// // //                     </>
// // //                   ) : (
// // //                     <NavLink
// // //                       to={item.to}
// // //                       end={item.to === '/'}
// // //                       onClick={onClose}
// // //                       className="sb-item-link"
// // //                       style={({ isActive }) => ({
// // //                         display: 'flex', alignItems: 'center', gap: 8,
// // //                         padding: `${S.rowPy}px ${S.rowPx}px`,
// // //                         borderRadius: 7,
// // //                         fontSize: S.fontSize, fontWeight: 500,
// // //                         color: isActive ? '#fff' : '#94A3B8',
// // //                         textDecoration: 'none',
// // //                         background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
// // //                         position: 'relative',
// // //                         transition: 'background 0.15s, color 0.15s',
// // //                       })}
// // //                     >
// // //                       {({ isActive }) => (
// // //                         <>
// // //                           {isActive && (
// // //                             <span style={{
// // //                               position: 'absolute', left: 0, top: 5, bottom: 5,
// // //                               width: 3, borderRadius: '0 3px 3px 0',
// // //                               background: '#818CF8',
// // //                             }} />
// // //                           )}
// // //                           {item.svgIcon
// // //                             ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon /></span>
// // //                             : <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
// // //                           }
// // //                           {item.label}
// // //                         </>
// // //                       )}
// // //                     </NavLink>
// // //                   )}

// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ))}
// // //         </nav>

// // //         {/* ── USER FOOTER ── */}
// // //         <div style={{
// // //           padding: '8px 10px',
// // //           borderTop: '1px solid rgba(255,255,255,0.06)',
// // //           flexShrink: 0,
// // //         }}>
// // //           <button
// // //             className="sb-footer-btn"
// // //             onClick={() => go(ROUTES.SETTINGS)}
// // //             style={{
// // //               width: '100%', display: 'flex', alignItems: 'center', gap: 9,
// // //               padding: '7px 8px', borderRadius: 8,
// // //               background: 'none', border: 'none', cursor: 'pointer',
// // //               transition: 'background 0.15s',
// // //             }}
// // //           >
// // //             <div style={{
// // //               width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
// // //               background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
// // //               display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //               color: '#fff', fontSize: 11.5, fontWeight: 700,
// // //             }}>SA</div>
// // //             <div style={{ textAlign: 'left', minWidth: 0 }}>
// // //               <p style={{
// // //                 fontSize: 12.5, fontWeight: 600, color: '#E2E8F0',
// // //                 lineHeight: 1.3, margin: 0,
// // //                 whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
// // //               }}>Subramanian A.</p>
// // //               <p style={{ fontSize: 10.5, color: '#4B5563', margin: 0, marginTop: 1, lineHeight: 1.3 }}>
// // //                 Owner · WynSync
// // //               </p>
// // //             </div>
// // //           </button>
// // //         </div>

// // //       </aside>
// // //     </>
// // //   );
// // // }




// // // // Sidebar.jsx — no visible scrollbar, touch/wheel scroll works, font forced
// // // import React, { useState } from 'react';
// // // import { NavLink, useNavigate } from 'react-router-dom';

// // // const SidebarFont = () => (
// // //   <style>{`
// // //     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// // //     .sidebar-root,
// // //     .sidebar-root *,
// // //     .sidebar-root *::before,
// // //     .sidebar-root *::after {
// // //       font-family: 'Plus Jakarta Sans', sans-serif !important;
// // //       box-sizing: border-box;
// // //     }
// // //     .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
// // //     .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
// // //     .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
// // //     .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
// // //     .sidebar-root nav::-webkit-scrollbar { display: none; }
// // //   `}</style>
// // // );

// // // const ROUTES = {
// // //   DASHBOARD:         '/',
// // //   CONTACTS:          '/contacts',
// // //   LISTS:             '/lists',
// // //   SUPPRESSION:       '/suppression',
// // //   CAMPAIGNS:         '/campaigns',
// // //   CAMPAIGN_CALENDAR: '/calendar',
// // //   TEMPLATES:         '/templates',
// // //   ANALYTICS:         '/analytics',
// // //   AUTOMATION:        '/automation',
// // //   SETTINGS:          '/settings',
// // //   CAMPAIGN_NEW:      '/campaigns/new',
// // //   CHATBOT:           '/chatbot',
// // //   INBOX:             '/inbox',         // ✅ new inbox route
// // // };

// // // const NAV_GROUPS = [
// // //   {
// // //     items: [{
// // //       label: 'Dashboard',
// // //       svgIcon: true,
// // //       to: ROUTES.DASHBOARD,
// // //     }],
// // //   },
// // //   {
// // //     label: 'AUDIENCE',
// // //     items: [{
// // //       label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
// // //       children: [
// // //         { label: 'All Contacts', to: ROUTES.CONTACTS },
// // //         { label: 'Lists',        to: ROUTES.LISTS },
// // //         { label: 'Suppression',  to: ROUTES.SUPPRESSION },
// // //       ],
// // //     }],
// // //   },
// // //   {
// // //     label: 'CAMPAIGNS',
// // //     items: [
// // //       {
// // //         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
// // //         children: [
// // //           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
// // //           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
// // //         ],
// // //       },
// // //       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
// // //     ],
// // //   },
// // //   // ✅ New WHATSAPP group with Inbox
// // //   {
// // //     label: 'WHATSAPP',
// // //     items: [
// // //       { label: 'Inbox', emoji: '💬', to: ROUTES.INBOX },
// // //     ],
// // //   },
// // //   {
// // //     label: 'INTELLIGENCE',
// // //     items: [
// // //       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
// // //       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
// // //       { label: 'Chatbot',    emoji: '🤖', to: ROUTES.CHATBOT },
// // //     ],
// // //   },
// // //   {
// // //     items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
// // //   },
// // // ];

// // // const DashIcon = () => (
// // //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
// // //     <rect x="3" y="3" width="7" height="7" rx="1"/>
// // //     <rect x="14" y="3" width="7" height="7" rx="1"/>
// // //     <rect x="3" y="14" width="7" height="7" rx="1"/>
// // //     <rect x="14" y="14" width="7" height="7" rx="1"/>
// // //   </svg>
// // // );

// // // const ChevronIcon = ({ open }) => (
// // //   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// // //     style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
// // //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
// // //   </svg>
// // // );

// // // const MailIcon = () => (
// // //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
// // //     <path strokeLinecap="round" strokeLinejoin="round"
// // //       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
// // //   </svg>
// // // );

// // // const PlusIcon = () => (
// // //   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// // //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
// // //   </svg>
// // // );

// // // const S = {
// // //   rowPy:        7,
// // //   rowPx:        10,
// // //   groupLabelPt: 12,
// // //   groupLabelPb: 4,
// // //   childPy:      5,
// // //   childPx:      10,
// // //   fontSize:     13,
// // //   labelFontSize: 9.5,
// // //   emojiSize:    15,
// // // };

// // // export default function Sidebar({ isOpen = true, onClose }) {
// // //   const navigate = useNavigate();
// // //   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

// // //   const toggle = lbl =>
// // //     setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

// // //   const go = to => { navigate(to); onClose?.(); };

// // //   return (
// // //     <>
// // //       <SidebarFont />

// // //       {isOpen && (
// // //         <div
// // //           className="md:hidden"
// // //           style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.5)' }}
// // //           onClick={onClose}
// // //         />
// // //       )}

// // //       <aside
// // //         className="sidebar-root"
// // //         style={{
// // //           position:      'fixed',
// // //           top: 0, left: 0, bottom: 0,
// // //           width:         260,
// // //           zIndex:        40,
// // //           background:    '#0D1117',
// // //           borderRight:   '1px solid rgba(255,255,255,0.06)',
// // //           display:       'flex',
// // //           flexDirection: 'column',
// // //           transform:     isOpen ? 'translateX(0)' : 'translateX(-100%)',
// // //           transition:    'transform 0.2s',
// // //           overflow:      'hidden',
// // //         }}
// // //       >

// // //         {/* ── LOGO ── */}
// // //         <div style={{
// // //           display: 'flex', alignItems: 'center', gap: 10,
// // //           padding: '13px 14px',
// // //           borderBottom: '1px solid rgba(255,255,255,0.06)',
// // //           flexShrink: 0,
// // //         }}>
// // //           <div style={{
// // //             width: 34, height: 34, borderRadius: 10, flexShrink: 0,
// // //             background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
// // //             display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //           }}>
// // //             <MailIcon />
// // //           </div>
// // //           <div>
// // //             <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
// // //               WYNReach
// // //             </p>
// // //             <p style={{
// // //               fontSize: 9.5, fontWeight: 600, color: '#4B5563', margin: 0,
// // //               textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 1,
// // //             }}>
// // //               WynSync Suite
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* ── NEW CAMPAIGN ── */}
// // //         <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
// // //           <button
// // //             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
// // //             style={{
// // //               width: '100%', display: 'flex', alignItems: 'center',
// // //               justifyContent: 'center', gap: 7,
// // //               background: 'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
// // //               border: 'none', borderRadius: 8, padding: '9px 0',
// // //               color: '#fff', fontSize: 13, fontWeight: 600,
// // //               cursor: 'pointer',
// // //             }}
// // //           >
// // //             <PlusIcon /> New Campaign
// // //           </button>
// // //         </div>

// // //         {/* ── NAV — scrollable but no visible scrollbar ── */}
// // //         <nav style={{
// // //           flex: 1,
// // //           padding: '2px 7px 8px',
// // //           overflowY:          'auto',
// // //           overflowX:          'hidden',
// // //           scrollbarWidth:     'none',
// // //           msOverflowStyle:    'none',
// // //           display: 'flex',
// // //           flexDirection: 'column',
// // //         }}>
// // //           {NAV_GROUPS.map((group, gi) => (
// // //             <div key={gi}>

// // //               {group.label && (
// // //                 <p style={{
// // //                   padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
// // //                   fontSize: S.labelFontSize, fontWeight: 700, color: '#374151',
// // //                   textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
// // //                 }}>
// // //                   {group.label}
// // //                 </p>
// // //               )}

// // //               {group.items.map(item => (
// // //                 <div key={item.label}>

// // //                   {item.children ? (
// // //                     <>
// // //                       <button
// // //                         className="sb-nav-btn"
// // //                         onClick={() => toggle(item.label)}
// // //                         style={{
// // //                           width: '100%', display: 'flex', alignItems: 'center',
// // //                           gap: 8, padding: `${S.rowPy}px ${S.rowPx}px`,
// // //                           borderRadius: 7, background: 'none', border: 'none',
// // //                           cursor: 'pointer',
// // //                           color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
// // //                           fontSize: S.fontSize, fontWeight: 500,
// // //                           transition: 'background 0.15s, color 0.15s',
// // //                         }}
// // //                       >
// // //                         <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>
// // //                           {item.emoji}
// // //                         </span>
// // //                         <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
// // //                         <ChevronIcon open={expanded.includes(item.label)} />
// // //                       </button>

// // //                       {expanded.includes(item.label) && (
// // //                         <div style={{ paddingLeft: 33, marginBottom: 2 }}>
// // //                           {item.children.map(child => (
// // //                             <NavLink
// // //                               key={child.to}
// // //                               to={child.to}
// // //                               end
// // //                               onClick={onClose}
// // //                               className="sb-child-link"
// // //                               style={({ isActive }) => ({
// // //                                 display: 'flex', alignItems: 'center', gap: 8,
// // //                                 padding: `${S.childPy}px ${S.childPx}px`,
// // //                                 borderRadius: 6,
// // //                                 fontSize: 12.5, fontWeight: isActive ? 600 : 500,
// // //                                 color: isActive ? '#A78BFA' : '#4B5563',
// // //                                 textDecoration: 'none',
// // //                                 transition: 'color 0.15s, background 0.15s',
// // //                                 borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
// // //                               })}
// // //                             >
// // //                               {({ isActive }) => (
// // //                                 <>
// // //                                   <span style={{
// // //                                     width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
// // //                                     background: isActive ? '#7C3AED' : '#374151',
// // //                                   }} />
// // //                                   {child.label}
// // //                                 </>
// // //                               )}
// // //                             </NavLink>
// // //                           ))}
// // //                         </div>
// // //                       )}
// // //                     </>
// // //                   ) : (
// // //                     <NavLink
// // //                       to={item.to}
// // //                       end={item.to === '/'}
// // //                       onClick={onClose}
// // //                       className="sb-item-link"
// // //                       style={({ isActive }) => ({
// // //                         display: 'flex', alignItems: 'center', gap: 8,
// // //                         padding: `${S.rowPy}px ${S.rowPx}px`,
// // //                         borderRadius: 7,
// // //                         fontSize: S.fontSize, fontWeight: 500,
// // //                         color: isActive ? '#fff' : '#94A3B8',
// // //                         textDecoration: 'none',
// // //                         background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
// // //                         position: 'relative',
// // //                         transition: 'background 0.15s, color 0.15s',
// // //                       })}
// // //                     >
// // //                       {({ isActive }) => (
// // //                         <>
// // //                           {isActive && (
// // //                             <span style={{
// // //                               position: 'absolute', left: 0, top: 5, bottom: 5,
// // //                               width: 3, borderRadius: '0 3px 3px 0',
// // //                               background: '#818CF8',
// // //                             }} />
// // //                           )}
// // //                           {item.svgIcon
// // //                             ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon /></span>
// // //                             : <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
// // //                           }
// // //                           {item.label}
// // //                         </>
// // //                       )}
// // //                     </NavLink>
// // //                   )}

// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ))}
// // //         </nav>

// // //         {/* ── USER FOOTER ── */}
// // //         <div style={{
// // //           padding: '8px 10px',
// // //           borderTop: '1px solid rgba(255,255,255,0.06)',
// // //           flexShrink: 0,
// // //         }}>
// // //           <button
// // //             className="sb-footer-btn"
// // //             onClick={() => go(ROUTES.SETTINGS)}
// // //             style={{
// // //               width: '100%', display: 'flex', alignItems: 'center', gap: 9,
// // //               padding: '7px 8px', borderRadius: 8,
// // //               background: 'none', border: 'none', cursor: 'pointer',
// // //               transition: 'background 0.15s',
// // //             }}
// // //           >
// // //             <div style={{
// // //               width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
// // //               background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
// // //               display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //               color: '#fff', fontSize: 11.5, fontWeight: 700,
// // //             }}>SA</div>
// // //             <div style={{ textAlign: 'left', minWidth: 0 }}>
// // //               <p style={{
// // //                 fontSize: 12.5, fontWeight: 600, color: '#E2E8F0',
// // //                 lineHeight: 1.3, margin: 0,
// // //                 whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
// // //               }}>Subramanian A.</p>
// // //               <p style={{ fontSize: 10.5, color: '#4B5563', margin: 0, marginTop: 1, lineHeight: 1.3 }}>
// // //                 Owner · WynSync
// // //               </p>
// // //             </div>
// // //           </button>
// // //         </div>

// // //       </aside>
// // //     </>
// // //   );
// // // }



// // // Sidebar.jsx — no visible scrollbar, touch/wheel scroll works, font forced
// // // Added Email Logs under Campaigns (only change)

// // import React, { useState } from 'react';
// // import { NavLink, useNavigate } from 'react-router-dom';

// // const SidebarFont = () => (
// //   <style>{`
// //     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// //     .sidebar-root,
// //     .sidebar-root *,
// //     .sidebar-root *::before,
// //     .sidebar-root *::after {
// //       font-family: 'Plus Jakarta Sans', sans-serif !important;
// //       box-sizing: border-box;
// //     }
// //     .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
// //     .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
// //     .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
// //     .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
// //     .sidebar-root nav::-webkit-scrollbar { display: none; }
// //   `}</style>
// // );

// // const ROUTES = {
// //   DASHBOARD:         '/',
// //   CONTACTS:          '/contacts',
// //   LISTS:             '/lists',
// //   SUPPRESSION:       '/suppression',
// //   CAMPAIGNS:         '/campaigns',
// //   CAMPAIGN_CALENDAR: '/calendar',
// //   TEMPLATES:         '/templates',
// //   ANALYTICS:         '/analytics',
// //   AUTOMATION:        '/automation',
// //   SETTINGS:          '/settings',
// //   CAMPAIGN_NEW:      '/campaigns/new',
// //   CHATBOT:           '/chatbot',
// //   INBOX:             '/inbox',
// //   EMAIL_LOGS:        '/email/logs',     // ✅ added
// // };

// // const NAV_GROUPS = [
// //   {
// //     items: [{
// //       label: 'Dashboard',
// //       svgIcon: true,
// //       to: ROUTES.DASHBOARD,
// //     }],
// //   },
// //   {
// //     label: 'AUDIENCE',
// //     items: [{
// //       label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
// //       children: [
// //         { label: 'All Contacts', to: ROUTES.CONTACTS },
// //         { label: 'Lists',        to: ROUTES.LISTS },
// //         { label: 'Suppression',  to: ROUTES.SUPPRESSION },
// //       ],
// //     }],
// //   },
// //   {
// //     label: 'CAMPAIGNS',
// //     items: [
// //       {
// //         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
// //         children: [
// //           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
// //           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
// //           { label: 'Email Logs',    to: ROUTES.EMAIL_LOGS },   // ✅ new child
// //         ],
// //       },
// //       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
// //     ],
// //   },
// //   {
// //     label: 'WHATSAPP',
// //     items: [
// //       { label: 'Inbox', emoji: '💬', to: ROUTES.INBOX },
// //     ],
// //   },
// //   {
// //     label: 'INTELLIGENCE',
// //     items: [
// //       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
// //       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
// //       { label: 'Chatbot',    emoji: '🤖', to: ROUTES.CHATBOT },
// //     ],
// //   },
// //   {
// //     items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
// //   },
// // ];

// // const DashIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
// //     <rect x="3" y="3" width="7" height="7" rx="1"/>
// //     <rect x="14" y="3" width="7" height="7" rx="1"/>
// //     <rect x="3" y="14" width="7" height="7" rx="1"/>
// //     <rect x="14" y="14" width="7" height="7" rx="1"/>
// //   </svg>
// // );

// // const ChevronIcon = ({ open }) => (
// //   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// //     style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
// //   </svg>
// // );

// // const MailIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round"
// //       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
// //   </svg>
// // );

// // const PlusIcon = () => (
// //   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
// //   </svg>
// // );

// // const S = {
// //   rowPy:        7,
// //   rowPx:        10,
// //   groupLabelPt: 12,
// //   groupLabelPb: 4,
// //   childPy:      5,
// //   childPx:      10,
// //   fontSize:     13,
// //   labelFontSize: 9.5,
// //   emojiSize:    15,
// // };

// // export default function Sidebar({ isOpen = true, onClose }) {
// //   const navigate = useNavigate();
// //   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

// //   const toggle = lbl =>
// //     setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

// //   const go = to => { navigate(to); onClose?.(); };

// //   return (
// //     <>
// //       <SidebarFont />

// //       {isOpen && (
// //         <div
// //           className="md:hidden"
// //           style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.5)' }}
// //           onClick={onClose}
// //         />
// //       )}

// //       <aside
// //         className="sidebar-root"
// //         style={{
// //           position:      'fixed',
// //           top: 0, left: 0, bottom: 0,
// //           width:         260,
// //           zIndex:        40,
// //           background:    '#0D1117',
// //           borderRight:   '1px solid rgba(255,255,255,0.06)',
// //           display:       'flex',
// //           flexDirection: 'column',
// //           transform:     isOpen ? 'translateX(0)' : 'translateX(-100%)',
// //           transition:    'transform 0.2s',
// //           overflow:      'hidden',
// //         }}
// //       >

// //         {/* ── LOGO ── */}
// //         <div style={{
// //           display: 'flex', alignItems: 'center', gap: 10,
// //           padding: '13px 14px',
// //           borderBottom: '1px solid rgba(255,255,255,0.06)',
// //           flexShrink: 0,
// //         }}>
// //           <div style={{
// //             width: 34, height: 34, borderRadius: 10, flexShrink: 0,
// //             background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
// //             display: 'flex', alignItems: 'center', justifyContent: 'center',
// //           }}>
// //             <MailIcon />
// //           </div>
// //           <div>
// //             <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
// //               WYNReach
// //             </p>
// //             <p style={{
// //               fontSize: 9.5, fontWeight: 600, color: '#4B5563', margin: 0,
// //               textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 1,
// //             }}>
// //               WynSync Suite
// //             </p>
// //           </div>
// //         </div>

// //         {/* ── NEW CAMPAIGN ── */}
// //         <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
// //           <button
// //             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
// //             style={{
// //               width: '100%', display: 'flex', alignItems: 'center',
// //               justifyContent: 'center', gap: 7,
// //               background: 'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
// //               border: 'none', borderRadius: 8, padding: '9px 0',
// //               color: '#fff', fontSize: 13, fontWeight: 600,
// //               cursor: 'pointer',
// //             }}
// //           >
// //             <PlusIcon /> New Campaign
// //           </button>
// //         </div>

// //         {/* ── NAV — scrollable but no visible scrollbar ── */}
// //         <nav style={{
// //           flex: 1,
// //           padding: '2px 7px 8px',
// //           overflowY:          'auto',
// //           overflowX:          'hidden',
// //           scrollbarWidth:     'none',
// //           msOverflowStyle:    'none',
// //           display: 'flex',
// //           flexDirection: 'column',
// //         }}>
// //           {NAV_GROUPS.map((group, gi) => (
// //             <div key={gi}>

// //               {group.label && (
// //                 <p style={{
// //                   padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
// //                   fontSize: S.labelFontSize, fontWeight: 700, color: '#374151',
// //                   textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
// //                 }}>
// //                   {group.label}
// //                 </p>
// //               )}

// //               {group.items.map(item => (
// //                 <div key={item.label}>

// //                   {item.children ? (
// //                     <>
// //                       <button
// //                         className="sb-nav-btn"
// //                         onClick={() => toggle(item.label)}
// //                         style={{
// //                           width: '100%', display: 'flex', alignItems: 'center',
// //                           gap: 8, padding: `${S.rowPy}px ${S.rowPx}px`,
// //                           borderRadius: 7, background: 'none', border: 'none',
// //                           cursor: 'pointer',
// //                           color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
// //                           fontSize: S.fontSize, fontWeight: 500,
// //                           transition: 'background 0.15s, color 0.15s',
// //                         }}
// //                       >
// //                         <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>
// //                           {item.emoji}
// //                         </span>
// //                         <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
// //                         <ChevronIcon open={expanded.includes(item.label)} />
// //                       </button>

// //                       {expanded.includes(item.label) && (
// //                         <div style={{ paddingLeft: 33, marginBottom: 2 }}>
// //                           {item.children.map(child => (
// //                             <NavLink
// //                               key={child.to}
// //                               to={child.to}
// //                               end
// //                               onClick={onClose}
// //                               className="sb-child-link"
// //                               style={({ isActive }) => ({
// //                                 display: 'flex', alignItems: 'center', gap: 8,
// //                                 padding: `${S.childPy}px ${S.childPx}px`,
// //                                 borderRadius: 6,
// //                                 fontSize: 12.5, fontWeight: isActive ? 600 : 500,
// //                                 color: isActive ? '#A78BFA' : '#4B5563',
// //                                 textDecoration: 'none',
// //                                 transition: 'color 0.15s, background 0.15s',
// //                                 borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
// //                               })}
// //                             >
// //                               {({ isActive }) => (
// //                                 <>
// //                                   <span style={{
// //                                     width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
// //                                     background: isActive ? '#7C3AED' : '#374151',
// //                                   }} />
// //                                   {child.label}
// //                                 </>
// //                               )}
// //                             </NavLink>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </>
// //                   ) : (
// //                     <NavLink
// //                       to={item.to}
// //                       end={item.to === '/'}
// //                       onClick={onClose}
// //                       className="sb-item-link"
// //                       style={({ isActive }) => ({
// //                         display: 'flex', alignItems: 'center', gap: 8,
// //                         padding: `${S.rowPy}px ${S.rowPx}px`,
// //                         borderRadius: 7,
// //                         fontSize: S.fontSize, fontWeight: 500,
// //                         color: isActive ? '#fff' : '#94A3B8',
// //                         textDecoration: 'none',
// //                         background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
// //                         position: 'relative',
// //                         transition: 'background 0.15s, color 0.15s',
// //                       })}
// //                     >
// //                       {({ isActive }) => (
// //                         <>
// //                           {isActive && (
// //                             <span style={{
// //                               position: 'absolute', left: 0, top: 5, bottom: 5,
// //                               width: 3, borderRadius: '0 3px 3px 0',
// //                               background: '#818CF8',
// //                             }} />
// //                           )}
// //                           {item.svgIcon
// //                             ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon /></span>
// //                             : <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
// //                           }
// //                           {item.label}
// //                         </>
// //                       )}
// //                     </NavLink>
// //                   )}

// //                 </div>
// //               ))}
// //             </div>
// //           ))}
// //         </nav>

// //         {/* ── USER FOOTER ── */}
// //         <div style={{
// //           padding: '8px 10px',
// //           borderTop: '1px solid rgba(255,255,255,0.06)',
// //           flexShrink: 0,
// //         }}>
// //           <button
// //             className="sb-footer-btn"
// //             onClick={() => go(ROUTES.SETTINGS)}
// //             style={{
// //               width: '100%', display: 'flex', alignItems: 'center', gap: 9,
// //               padding: '7px 8px', borderRadius: 8,
// //               background: 'none', border: 'none', cursor: 'pointer',
// //               transition: 'background 0.15s',
// //             }}
// //           >
// //             <div style={{
// //               width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
// //               background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
// //               display: 'flex', alignItems: 'center', justifyContent: 'center',
// //               color: '#fff', fontSize: 11.5, fontWeight: 700,
// //             }}>SA</div>
// //             <div style={{ textAlign: 'left', minWidth: 0 }}>
// //               <p style={{
// //                 fontSize: 12.5, fontWeight: 600, color: '#E2E8F0',
// //                 lineHeight: 1.3, margin: 0,
// //                 whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
// //               }}>Subramanian A.</p>
// //               <p style={{ fontSize: 10.5, color: '#4B5563', margin: 0, marginTop: 1, lineHeight: 1.3 }}>
// //                 Owner · WynSync
// //               </p>
// //             </div>
// //           </button>
// //         </div>

// //       </aside>
// //     </>
// //   );
// // }


// // Sidebar.jsx — no visible scrollbar, touch/wheel scroll works, font forced
// // Added separate EMAIL group with Email Logs (not under Campaigns)

// // import React, { useState } from 'react';
// // import { NavLink, useNavigate } from 'react-router-dom';

// // const SidebarFont = () => (
// //   <style>{`
// //     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// //     .sidebar-root,
// //     .sidebar-root *,
// //     .sidebar-root *::before,
// //     .sidebar-root *::after {
// //       font-family: 'Plus Jakarta Sans', sans-serif !important;
// //       box-sizing: border-box;
// //     }
// //     .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
// //     .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
// //     .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
// //     .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
// //     .sidebar-root nav::-webkit-scrollbar { display: none; }
// //   `}</style>
// // );

// // const ROUTES = {
// //   DASHBOARD:         '/',
// //   CONTACTS:          '/contacts',
// //   LISTS:             '/lists',
// //   SUPPRESSION:       '/suppression',
// //   CAMPAIGNS:         '/campaigns',
// //   CAMPAIGN_CALENDAR: '/calendar',
// //   TEMPLATES:         '/templates',
// //   ANALYTICS:         '/analytics',
// //   AUTOMATION:        '/automation',
// //   SETTINGS:          '/settings',
// //   CAMPAIGN_NEW:      '/campaigns/new',
// //   CHATBOT:           '/chatbot',
// //   INBOX:             '/inbox',
// //   EMAIL_LOGS:        '/email/logs',     // ✅ route for Email Logs
// // };

// // const NAV_GROUPS = [
// //   {
// //     items: [{
// //       label: 'Dashboard',
// //       svgIcon: true,
// //       to: ROUTES.DASHBOARD,
// //     }],
// //   },
// //   {
// //     label: 'AUDIENCE',
// //     items: [{
// //       label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
// //       children: [
// //         { label: 'All Contacts', to: ROUTES.CONTACTS },
// //         { label: 'Lists',        to: ROUTES.LISTS },
// //         { label: 'Suppression',  to: ROUTES.SUPPRESSION },
// //       ],
// //     }],
// //   },
// //   {
// //     label: 'CAMPAIGNS',
// //     items: [
// //       {
// //         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
// //         children: [
// //           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
// //           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
// //         ],
// //       },
// //       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
// //     ],
// //   },
// //   // ✅ NEW EMAIL group (separate section)
// //   {
// //     label: 'EMAIL',
// //     items: [
// //       { label: 'Email Logs', emoji: '📧', to: ROUTES.EMAIL_LOGS },
// //     ],
// //   },
// //   {
// //     label: 'WHATSAPP',
// //     items: [
// //       { label: 'Inbox', emoji: '💬', to: ROUTES.INBOX },
// //     ],
// //   },
// //   {
// //     label: 'INTELLIGENCE',
// //     items: [
// //       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
// //       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
// //       { label: 'Chatbot',    emoji: '🤖', to: ROUTES.CHATBOT },
// //     ],
// //   },
// //   {
// //     items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
// //   },
// // ];

// // const DashIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
// //     <rect x="3" y="3" width="7" height="7" rx="1"/>
// //     <rect x="14" y="3" width="7" height="7" rx="1"/>
// //     <rect x="3" y="14" width="7" height="7" rx="1"/>
// //     <rect x="14" y="14" width="7" height="7" rx="1"/>
// //   </svg>
// // );

// // const ChevronIcon = ({ open }) => (
// //   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
// //     style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
// //   </svg>
// // );

// // const MailIcon = () => (
// //   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
// //     <path strokeLinecap="round" strokeLinejoin="round"
// //       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
// //   </svg>
// // );

// // const PlusIcon = () => (
// //   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
// //   </svg>
// // );

// // const S = {
// //   rowPy:        7,
// //   rowPx:        10,
// //   groupLabelPt: 12,
// //   groupLabelPb: 4,
// //   childPy:      5,
// //   childPx:      10,
// //   fontSize:     13,
// //   labelFontSize: 9.5,
// //   emojiSize:    15,
// // };

// // export default function Sidebar({ isOpen = true, onClose }) {
// //   const navigate = useNavigate();
// //   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns']);

// //   const toggle = lbl =>
// //     setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

// //   const go = to => { navigate(to); onClose?.(); };

// //   return (
// //     <>
// //       <SidebarFont />

// //       {isOpen && (
// //         <div
// //           className="md:hidden"
// //           style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.5)' }}
// //           onClick={onClose}
// //         />
// //       )}

// //       <aside
// //         className="sidebar-root"
// //         style={{
// //           position:      'fixed',
// //           top: 0, left: 0, bottom: 0,
// //           width:         260,
// //           zIndex:        40,
// //           background:    '#0D1117',
// //           borderRight:   '1px solid rgba(255,255,255,0.06)',
// //           display:       'flex',
// //           flexDirection: 'column',
// //           transform:     isOpen ? 'translateX(0)' : 'translateX(-100%)',
// //           transition:    'transform 0.2s',
// //           overflow:      'hidden',
// //         }}
// //       >

// //         {/* ── LOGO ── */}
// //         <div style={{
// //           display: 'flex', alignItems: 'center', gap: 10,
// //           padding: '13px 14px',
// //           borderBottom: '1px solid rgba(255,255,255,0.06)',
// //           flexShrink: 0,
// //         }}>
// //           <div style={{
// //             width: 34, height: 34, borderRadius: 10, flexShrink: 0,
// //             background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
// //             display: 'flex', alignItems: 'center', justifyContent: 'center',
// //           }}>
// //             <MailIcon />
// //           </div>
// //           <div>
// //             <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
// //               WYNReach
// //             </p>
// //             <p style={{
// //               fontSize: 9.5, fontWeight: 600, color: '#4B5563', margin: 0,
// //               textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 1,
// //             }}>
// //               WynSync Suite
// //             </p>
// //           </div>
// //         </div>

// //         {/* ── NEW CAMPAIGN ── */}
// //         <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
// //           <button
// //             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
// //             style={{
// //               width: '100%', display: 'flex', alignItems: 'center',
// //               justifyContent: 'center', gap: 7,
// //               background: 'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
// //               border: 'none', borderRadius: 8, padding: '9px 0',
// //               color: '#fff', fontSize: 13, fontWeight: 600,
// //               cursor: 'pointer',
// //             }}
// //           >
// //             <PlusIcon /> New Campaign
// //           </button>
// //         </div>

// //         {/* ── NAV — scrollable but no visible scrollbar ── */}
// //         <nav style={{
// //           flex: 1,
// //           padding: '2px 7px 8px',
// //           overflowY:          'auto',
// //           overflowX:          'hidden',
// //           scrollbarWidth:     'none',
// //           msOverflowStyle:    'none',
// //           display: 'flex',
// //           flexDirection: 'column',
// //         }}>
// //           {NAV_GROUPS.map((group, gi) => (
// //             <div key={gi}>

// //               {group.label && (
// //                 <p style={{
// //                   padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
// //                   fontSize: S.labelFontSize, fontWeight: 700, color: '#374151',
// //                   textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
// //                 }}>
// //                   {group.label}
// //                 </p>
// //               )}

// //               {group.items.map(item => (
// //                 <div key={item.label}>

// //                   {item.children ? (
// //                     <>
// //                       <button
// //                         className="sb-nav-btn"
// //                         onClick={() => toggle(item.label)}
// //                         style={{
// //                           width: '100%', display: 'flex', alignItems: 'center',
// //                           gap: 8, padding: `${S.rowPy}px ${S.rowPx}px`,
// //                           borderRadius: 7, background: 'none', border: 'none',
// //                           cursor: 'pointer',
// //                           color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
// //                           fontSize: S.fontSize, fontWeight: 500,
// //                           transition: 'background 0.15s, color 0.15s',
// //                         }}
// //                       >
// //                         <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>
// //                           {item.emoji}
// //                         </span>
// //                         <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
// //                         <ChevronIcon open={expanded.includes(item.label)} />
// //                       </button>

// //                       {expanded.includes(item.label) && (
// //                         <div style={{ paddingLeft: 33, marginBottom: 2 }}>
// //                           {item.children.map(child => (
// //                             <NavLink
// //                               key={child.to}
// //                               to={child.to}
// //                               end
// //                               onClick={onClose}
// //                               className="sb-child-link"
// //                               style={({ isActive }) => ({
// //                                 display: 'flex', alignItems: 'center', gap: 8,
// //                                 padding: `${S.childPy}px ${S.childPx}px`,
// //                                 borderRadius: 6,
// //                                 fontSize: 12.5, fontWeight: isActive ? 600 : 500,
// //                                 color: isActive ? '#A78BFA' : '#4B5563',
// //                                 textDecoration: 'none',
// //                                 transition: 'color 0.15s, background 0.15s',
// //                                 borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
// //                               })}
// //                             >
// //                               {({ isActive }) => (
// //                                 <>
// //                                   <span style={{
// //                                     width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
// //                                     background: isActive ? '#7C3AED' : '#374151',
// //                                   }} />
// //                                   {child.label}
// //                                 </>
// //                               )}
// //                             </NavLink>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </>
// //                   ) : (
// //                     <NavLink
// //                       to={item.to}
// //                       end={item.to === '/'}
// //                       onClick={onClose}
// //                       className="sb-item-link"
// //                       style={({ isActive }) => ({
// //                         display: 'flex', alignItems: 'center', gap: 8,
// //                         padding: `${S.rowPy}px ${S.rowPx}px`,
// //                         borderRadius: 7,
// //                         fontSize: S.fontSize, fontWeight: 500,
// //                         color: isActive ? '#fff' : '#94A3B8',
// //                         textDecoration: 'none',
// //                         background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
// //                         position: 'relative',
// //                         transition: 'background 0.15s, color 0.15s',
// //                       })}
// //                     >
// //                       {({ isActive }) => (
// //                         <>
// //                           {isActive && (
// //                             <span style={{
// //                               position: 'absolute', left: 0, top: 5, bottom: 5,
// //                               width: 3, borderRadius: '0 3px 3px 0',
// //                               background: '#818CF8',
// //                             }} />
// //                           )}
// //                           {item.svgIcon
// //                             ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon /></span>
// //                             : <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
// //                           }
// //                           {item.label}
// //                         </>
// //                       )}
// //                     </NavLink>
// //                   )}

// //                 </div>
// //               ))}
// //             </div>
// //           ))}
// //         </nav>

// //         {/* ── USER FOOTER ── */}
// //         <div style={{
// //           padding: '8px 10px',
// //           borderTop: '1px solid rgba(255,255,255,0.06)',
// //           flexShrink: 0,
// //         }}>
// //           <button
// //             className="sb-footer-btn"
// //             onClick={() => go(ROUTES.SETTINGS)}
// //             style={{
// //               width: '100%', display: 'flex', alignItems: 'center', gap: 9,
// //               padding: '7px 8px', borderRadius: 8,
// //               background: 'none', border: 'none', cursor: 'pointer',
// //               transition: 'background 0.15s',
// //             }}
// //           >
// //             <div style={{
// //               width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
// //               background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
// //               display: 'flex', alignItems: 'center', justifyContent: 'center',
// //               color: '#fff', fontSize: 11.5, fontWeight: 700,
// //             }}>SA</div>
// //             <div style={{ textAlign: 'left', minWidth: 0 }}>
// //               <p style={{
// //                 fontSize: 12.5, fontWeight: 600, color: '#E2E8F0',
// //                 lineHeight: 1.3, margin: 0,
// //                 whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
// //               }}>Subramanian A.</p>
// //               <p style={{ fontSize: 10.5, color: '#4B5563', margin: 0, marginTop: 1, lineHeight: 1.3 }}>
// //                 Owner · WynSync
// //               </p>
// //             </div>
// //           </button>
// //         </div>

// //       </aside>
// //     </>
// //   );
// // }


// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const SidebarFont = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//     .sidebar-root,
//     .sidebar-root *,
//     .sidebar-root *::before,
//     .sidebar-root *::after {
//       font-family: 'Plus Jakarta Sans', sans-serif !important;
//       box-sizing: border-box;
//     }
//     .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
//     .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
//     .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
//     .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
//     .sidebar-root nav::-webkit-scrollbar { display: none; }
//   `}</style>
// );

// const ROUTES = {
//   DASHBOARD:         '/',
//   CONTACTS:          '/contacts',
//   LISTS:             '/lists',
//   SUPPRESSION:       '/suppression',
//   CAMPAIGNS:         '/campaigns',
//   CAMPAIGN_CALENDAR: '/calendar',
//   TEMPLATES:         '/templates',
//   ANALYTICS:         '/analytics',
//   AUTOMATION:        '/automation',
//   SETTINGS:          '/settings',
//   CAMPAIGN_NEW:      '/campaigns/new',
//   CHATBOT:           '/chatbot',
//   INBOX:             '/inbox',
//   EMAIL_LOGS:        '/email/logs',
//   WHATSAPP_LOGS:     '/whatsapp/logs',     // ✅ route for WhatsApp logs
// };

// const NAV_GROUPS = [
//   {
//     items: [{
//       label: 'Dashboard',
//       svgIcon: true,
//       to: ROUTES.DASHBOARD,
//     }],
//   },
//   {
//     label: 'AUDIENCE',
//     items: [{
//       label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
//       children: [
//         { label: 'All Contacts', to: ROUTES.CONTACTS },
//         { label: 'Lists',        to: ROUTES.LISTS },
//         { label: 'Suppression',  to: ROUTES.SUPPRESSION },
//       ],
//     }],
//   },
//   {
//     label: 'CAMPAIGNS',
//     items: [
//       {
//         label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
//         children: [
//           { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
//           { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
//         ],
//       },
//       { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
//     ],
//   },
//   {
//     label: 'EMAIL',
//     items: [
//       { label: 'Email Logs', emoji: '📧', to: ROUTES.EMAIL_LOGS },
//     ],
//   },
//   {
//     label: 'WHATSAPP',
//     items: [
//       {
//         label: 'WhatsApp', emoji: '💬', to: '#',   // expandable parent
//         children: [
//           { label: 'Inbox',        to: ROUTES.INBOX },
//           { label: 'Message Logs', to: ROUTES.WHATSAPP_LOGS },   // ✅ added child
//         ],
//       },
//     ],
//   },
//   {
//     label: 'INTELLIGENCE',
//     items: [
//       { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
//       { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
//       { label: 'Chatbot',    emoji: '🤖', to: ROUTES.CHATBOT },
//     ],
//   },
//   {
//     items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
//   },
// ];

// const DashIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
//     <rect x="3" y="3" width="7" height="7" rx="1"/>
//     <rect x="14" y="3" width="7" height="7" rx="1"/>
//     <rect x="3" y="14" width="7" height="7" rx="1"/>
//     <rect x="14" y="14" width="7" height="7" rx="1"/>
//   </svg>
// );

// const ChevronIcon = ({ open }) => (
//   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//     style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
//   </svg>
// );

// const MailIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round"
//       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//   </svg>
// );

// const PlusIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
//   </svg>
// );

// const S = {
//   rowPy:        7,
//   rowPx:        10,
//   groupLabelPt: 12,
//   groupLabelPb: 4,
//   childPy:      5,
//   childPx:      10,
//   fontSize:     13,
//   labelFontSize: 9.5,
//   emojiSize:    15,
// };

// export default function Sidebar({ isOpen = true, onClose }) {
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(['Contacts', 'Campaigns', 'WhatsApp']);   // ✅ include WhatsApp to keep it open

//   const toggle = lbl =>
//     setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

//   const go = to => { navigate(to); onClose?.(); };

//   return (
//     <>
//       <SidebarFont />

//       {isOpen && (
//         <div
//           className="md:hidden"
//           style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.5)' }}
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className="sidebar-root"
//         style={{
//           position:      'fixed',
//           top: 0, left: 0, bottom: 0,
//           width:         260,
//           zIndex:        40,
//           background:    '#0D1117',
//           borderRight:   '1px solid rgba(255,255,255,0.06)',
//           display:       'flex',
//           flexDirection: 'column',
//           transform:     isOpen ? 'translateX(0)' : 'translateX(-100%)',
//           transition:    'transform 0.2s',
//           overflow:      'hidden',
//         }}
//       >

//         {/* ── LOGO ── */}
//         <div style={{
//           display: 'flex', alignItems: 'center', gap: 10,
//           padding: '13px 14px',
//           borderBottom: '1px solid rgba(255,255,255,0.06)',
//           flexShrink: 0,
//         }}>
//           <div style={{
//             width: 34, height: 34, borderRadius: 10, flexShrink: 0,
//             background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <MailIcon />
//           </div>
//           <div>
//             <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
//               WYNReach
//             </p>
//             <p style={{
//               fontSize: 9.5, fontWeight: 600, color: '#4B5563', margin: 0,
//               textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 1,
//             }}>
//               WynSync Suite
//             </p>
//           </div>
//         </div>

//         {/* ── NEW CAMPAIGN ── */}
//         <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
//           <button
//             onClick={() => go(ROUTES.CAMPAIGN_NEW)}
//             style={{
//               width: '100%', display: 'flex', alignItems: 'center',
//               justifyContent: 'center', gap: 7,
//               background: 'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
//               border: 'none', borderRadius: 8, padding: '9px 0',
//               color: '#fff', fontSize: 13, fontWeight: 600,
//               cursor: 'pointer',
//             }}
//           >
//             <PlusIcon /> New Campaign
//           </button>
//         </div>

//         {/* ── NAV — scrollable but no visible scrollbar ── */}
//         <nav style={{
//           flex: 1,
//           padding: '2px 7px 8px',
//           overflowY:          'auto',
//           overflowX:          'hidden',
//           scrollbarWidth:     'none',
//           msOverflowStyle:    'none',
//           display: 'flex',
//           flexDirection: 'column',
//         }}>
//           {NAV_GROUPS.map((group, gi) => (
//             <div key={gi}>

//               {group.label && (
//                 <p style={{
//                   padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
//                   fontSize: S.labelFontSize, fontWeight: 700, color: '#374151',
//                   textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
//                 }}>
//                   {group.label}
//                 </p>
//               )}

//               {group.items.map(item => (
//                 <div key={item.label}>

//                   {item.children ? (
//                     <>
//                       <button
//                         className="sb-nav-btn"
//                         onClick={() => toggle(item.label)}
//                         style={{
//                           width: '100%', display: 'flex', alignItems: 'center',
//                           gap: 8, padding: `${S.rowPy}px ${S.rowPx}px`,
//                           borderRadius: 7, background: 'none', border: 'none',
//                           cursor: 'pointer',
//                           color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
//                           fontSize: S.fontSize, fontWeight: 500,
//                           transition: 'background 0.15s, color 0.15s',
//                         }}
//                       >
//                         <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>
//                           {item.emoji}
//                         </span>
//                         <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
//                         <ChevronIcon open={expanded.includes(item.label)} />
//                       </button>

//                       {expanded.includes(item.label) && (
//                         <div style={{ paddingLeft: 33, marginBottom: 2 }}>
//                           {item.children.map(child => (
//                             <NavLink
//                               key={child.to}
//                               to={child.to}
//                               end
//                               onClick={onClose}
//                               className="sb-child-link"
//                               style={({ isActive }) => ({
//                                 display: 'flex', alignItems: 'center', gap: 8,
//                                 padding: `${S.childPy}px ${S.childPx}px`,
//                                 borderRadius: 6,
//                                 fontSize: 12.5, fontWeight: isActive ? 600 : 500,
//                                 color: isActive ? '#A78BFA' : '#4B5563',
//                                 textDecoration: 'none',
//                                 transition: 'color 0.15s, background 0.15s',
//                                 borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
//                               })}
//                             >
//                               {({ isActive }) => (
//                                 <>
//                                   <span style={{
//                                     width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
//                                     background: isActive ? '#7C3AED' : '#374151',
//                                   }} />
//                                   {child.label}
//                                 </>
//                               )}
//                             </NavLink>
//                           ))}
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <NavLink
//                       to={item.to}
//                       end={item.to === '/'}
//                       onClick={onClose}
//                       className="sb-item-link"
//                       style={({ isActive }) => ({
//                         display: 'flex', alignItems: 'center', gap: 8,
//                         padding: `${S.rowPy}px ${S.rowPx}px`,
//                         borderRadius: 7,
//                         fontSize: S.fontSize, fontWeight: 500,
//                         color: isActive ? '#fff' : '#94A3B8',
//                         textDecoration: 'none',
//                         background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
//                         position: 'relative',
//                         transition: 'background 0.15s, color 0.15s',
//                       })}
//                     >
//                       {({ isActive }) => (
//                         <>
//                           {isActive && (
//                             <span style={{
//                               position: 'absolute', left: 0, top: 5, bottom: 5,
//                               width: 3, borderRadius: '0 3px 3px 0',
//                               background: '#818CF8',
//                             }} />
//                           )}
//                           {item.svgIcon
//                             ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon /></span>
//                             : <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
//                           }
//                           {item.label}
//                         </>
//                       )}
//                     </NavLink>
//                   )}

//                 </div>
//               ))}
//             </div>
//           ))}
//         </nav>

//         {/* ── USER FOOTER ── */}
//         <div style={{
//           padding: '8px 10px',
//           borderTop: '1px solid rgba(255,255,255,0.06)',
//           flexShrink: 0,
//         }}>
//           <button
//             className="sb-footer-btn"
//             onClick={() => go(ROUTES.SETTINGS)}
//             style={{
//               width: '100%', display: 'flex', alignItems: 'center', gap: 9,
//               padding: '7px 8px', borderRadius: 8,
//               background: 'none', border: 'none', cursor: 'pointer',
//               transition: 'background 0.15s',
//             }}
//           >
//             <div style={{
//               width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
//               background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               color: '#fff', fontSize: 11.5, fontWeight: 700,
//             }}>SA</div>
//             <div style={{ textAlign: 'left', minWidth: 0 }}>
//               <p style={{
//                 fontSize: 12.5, fontWeight: 600, color: '#E2E8F0',
//                 lineHeight: 1.3, margin: 0,
//                 whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//               }}>Subramanian A.</p>
//               <p style={{ fontSize: 10.5, color: '#4B5563', margin: 0, marginTop: 1, lineHeight: 1.3 }}>
//                 Owner · WynSync
//               </p>
//             </div>
//           </button>
//         </div>

//       </aside>
//     </>
//   );
// }



import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SidebarFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .sidebar-root,
    .sidebar-root *,
    .sidebar-root *::before,
    .sidebar-root *::after {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .sb-nav-btn:hover  { background: rgba(255,255,255,0.05) !important; }
    .sb-child-link:hover { background: rgba(255,255,255,0.04) !important; color: #94A3B8 !important; }
    .sb-item-link:hover  { background: rgba(255,255,255,0.05) !important; color: #CBD5E1 !important; }
    .sb-footer-btn:hover { background: rgba(255,255,255,0.05) !important; }
    .sidebar-root nav::-webkit-scrollbar { display: none; }
  `}</style>
);

const ROUTES = {
  DASHBOARD:         '/',
  CONTACTS:          '/contacts',
  LISTS:             '/lists',
  SUPPRESSION:       '/suppression',
  CAMPAIGNS:         '/campaigns',
  CAMPAIGN_CALENDAR: '/calendar',
  TEMPLATES:         '/templates',
  ANALYTICS:         '/analytics',
  AUTOMATION:        '/automation',
  SETTINGS:          '/settings',
  CAMPAIGN_NEW:      '/campaigns/new',
  CHATBOT:           '/chatbot',
  INBOX:             '/inbox',
  EMAIL_LOGS:        '/email/logs',
  WHATSAPP_LOGS:     '/whatsapp/logs',
};

const NAV_GROUPS = [
  {
    items: [{
      label: 'Dashboard',
      svgIcon: true,
      to: ROUTES.DASHBOARD,
    }],
  },
  {
    label: 'AUDIENCE',
    items: [{
      label: 'Contacts', emoji: '👥', to: ROUTES.CONTACTS,
      children: [
        { label: 'All Contacts', to: ROUTES.CONTACTS },
        { label: 'Lists',        to: ROUTES.LISTS },
        { label: 'Suppression',  to: ROUTES.SUPPRESSION },
      ],
    }],
  },
  {
    label: 'CAMPAIGNS',
    items: [
      {
        label: 'Campaigns', emoji: '🔔', to: ROUTES.CAMPAIGNS,
        children: [
          { label: 'All Campaigns', to: ROUTES.CAMPAIGNS },
          { label: 'Calendar',      to: ROUTES.CAMPAIGN_CALENDAR },
        ],
      },
      { label: 'Templates', emoji: '📁', to: ROUTES.TEMPLATES },
    ],
  },
  {
    label: 'EMAIL',
    items: [
      { label: 'Email Logs', emoji: '📧', to: ROUTES.EMAIL_LOGS },
    ],
  },
  {
    label: 'WHATSAPP',
    items: [
      {
        label: 'WhatsApp', emoji: '💬', to: '#',
        children: [
          { label: 'Inbox',        to: ROUTES.INBOX },
          { label: 'Message Logs', to: ROUTES.WHATSAPP_LOGS },
        ],
      },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { label: 'Analytics',  emoji: '📊', to: ROUTES.ANALYTICS },
      { label: 'Automation', emoji: '⚡', to: ROUTES.AUTOMATION },
      { label: 'Chatbot',    emoji: '🤖', to: ROUTES.CHATBOT },
    ],
  },
  {
    items: [{ label: 'Settings', emoji: '⚙️', to: ROUTES.SETTINGS }],
  },
];

const DashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
);

const S = {
  rowPy:        7,
  rowPx:        10,
  groupLabelPt: 12,
  groupLabelPb: 4,
  childPy:      5,
  childPx:      10,
  fontSize:     13,
  labelFontSize: 9.5,
  emojiSize:    15,
};

export default function Sidebar({ isOpen = true, onClose }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(['Contacts', 'Campaigns', 'WhatsApp']);

  // Dynamic user state
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState("Member");

  // Load user from localStorage
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const user = parsed.user;
        if (user) {
          setUserName(user.full_name || user.fullName || "User");
          setUserRole(user.role || "Member");
        }
      } catch (err) {
        console.error("Sidebar user parse error", err);
      }
    }
  }, []);

  // Get initials from userName
  const getInitials = () => {
    if (!userName) return "U";
    return userName
      .split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const toggle = lbl =>
    setExpanded(p => p.includes(lbl) ? p.filter(l => l !== lbl) : [...p, lbl]);

  const go = to => { navigate(to); onClose?.(); };

  return (
    <>
      <SidebarFont />

      {isOpen && (
        <div
          className="md:hidden"
          style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
        />
      )}

      <aside
        className="sidebar-root"
        style={{
          position:      'fixed',
          top: 0, left: 0, bottom: 0,
          width:         260,
          zIndex:        40,
          background:    '#0D1117',
          borderRight:   '1px solid rgba(255,255,255,0.06)',
          display:       'flex',
          flexDirection: 'column',
          transform:     isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition:    'transform 0.2s',
          overflow:      'hidden',
        }}
      >

        {/* ── LOGO ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '13px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MailIcon />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: 0 }}>
              WYNReach
            </p>
            <p style={{
              fontSize: 9.5, fontWeight: 600, color: '#4B5563', margin: 0,
              textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 1,
            }}>
              WynSync Suite
            </p>
          </div>
        </div>

        {/* ── NEW CAMPAIGN ── */}
        <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
          <button
            onClick={() => go(ROUTES.CAMPAIGN_NEW)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 7,
              background: 'linear-gradient(135deg,#5B5BD6 0%,#6D28D9 100%)',
              border: 'none', borderRadius: 8, padding: '9px 0',
              color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <PlusIcon /> New Campaign
          </button>
        </div>

        {/* ── NAV — scrollable but no visible scrollbar ── */}
        <nav style={{
          flex: 1,
          padding: '2px 7px 8px',
          overflowY:          'auto',
          overflowX:          'hidden',
          scrollbarWidth:     'none',
          msOverflowStyle:    'none',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>

              {group.label && (
                <p style={{
                  padding: `${S.groupLabelPt}px 10px ${S.groupLabelPb}px`,
                  fontSize: S.labelFontSize, fontWeight: 700, color: '#374151',
                  textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0,
                }}>
                  {group.label}
                </p>
              )}

              {group.items.map(item => (
                <div key={item.label}>

                  {item.children ? (
                    <>
                      <button
                        className="sb-nav-btn"
                        onClick={() => toggle(item.label)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center',
                          gap: 8, padding: `${S.rowPy}px ${S.rowPx}px`,
                          borderRadius: 7, background: 'none', border: 'none',
                          cursor: 'pointer',
                          color: expanded.includes(item.label) ? '#C4B5FD' : '#94A3B8',
                          fontSize: S.fontSize, fontWeight: 500,
                          transition: 'background 0.15s, color 0.15s',
                        }}
                      >
                        <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>
                          {item.emoji}
                        </span>
                        <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                        <ChevronIcon open={expanded.includes(item.label)} />
                      </button>

                      {expanded.includes(item.label) && (
                        <div style={{ paddingLeft: 33, marginBottom: 2 }}>
                          {item.children.map(child => (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              end
                              onClick={onClose}
                              className="sb-child-link"
                              style={({ isActive }) => ({
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: `${S.childPy}px ${S.childPx}px`,
                                borderRadius: 6,
                                fontSize: 12.5, fontWeight: isActive ? 600 : 500,
                                color: isActive ? '#A78BFA' : '#4B5563',
                                textDecoration: 'none',
                                transition: 'color 0.15s, background 0.15s',
                                borderLeft: isActive ? '2.5px solid #7C3AED' : '2.5px solid transparent',
                              })}
                            >
                              {({ isActive }) => (
                                <>
                                  <span style={{
                                    width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                                    background: isActive ? '#7C3AED' : '#374151',
                                  }} />
                                  {child.label}
                                </>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className="sb-item-link"
                      style={({ isActive }) => ({
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: `${S.rowPy}px ${S.rowPx}px`,
                        borderRadius: 7,
                        fontSize: S.fontSize, fontWeight: 500,
                        color: isActive ? '#fff' : '#94A3B8',
                        textDecoration: 'none',
                        background: isActive ? 'rgba(99,102,241,0.18)' : 'none',
                        position: 'relative',
                        transition: 'background 0.15s, color 0.15s',
                      })}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span style={{
                              position: 'absolute', left: 0, top: 5, bottom: 5,
                              width: 3, borderRadius: '0 3px 3px 0',
                              background: '#818CF8',
                            }} />
                          )}
                          {item.svgIcon
                            ? <span style={{ color: isActive ? '#818CF8' : 'currentColor' }}><DashIcon /></span>
                            : <span style={{ fontSize: S.emojiSize, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
                          }
                          {item.label}
                        </>
                      )}
                    </NavLink>
                  )}

                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* ── USER FOOTER (DYNAMIC) ── */}
        <div style={{
          padding: '8px 10px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <button
            className="sb-footer-btn"
            onClick={() => go(ROUTES.SETTINGS)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 8px', borderRadius: 8,
              background: 'none', border: 'none', cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#6366F1 0%,#7C3AED 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 11.5, fontWeight: 700,
            }}>
              {getInitials()}
            </div>
            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <p style={{
                fontSize: 12.5, fontWeight: 600, color: '#E2E8F0',
                lineHeight: 1.3, margin: 0,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {userName}
              </p>
              <p style={{
                fontSize: 10.5, color: '#4B5563', margin: 0, marginTop: 1, lineHeight: 1.3,
              }}>
                {userRole} · WynReach
              </p>
            </div>
          </button>
        </div>

      </aside>
    </>
  );
}
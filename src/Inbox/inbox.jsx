// import { useState, useRef, useEffect } from "react";

// const API = "https://wynreach-backend.onrender.com/api/inbox";
// const CONTACTS_API = "https://wynreach-backend.onrender.com/api/contacts";
// const AGENTS = ["Alice", "Bob", "Charlie", "Diana"];
// const WA_BG = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b2bec3' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

// function Avatar({ name }) {
//   const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
//   return (
//     <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0" style={{ background: "#075e54" }}>
//       {initials}
//     </div>
//   );
// }

// function StatusRow({ label, value, highlight }) {
//   return (
//     <div className="flex justify-between items-start gap-2">
//       <span className="text-sm text-gray-500">{label}</span>
//       <span className={`text-sm font-semibold text-right ${highlight ? "text-gray-900" : "text-gray-700"}`}>: {value}</span>
//     </div>
//   );
// }

// // function MessageBubble({ msg, onButtonClick }) {
// //   const isUser = msg.from_type === "user";
// //   const isAgent = msg.from_type === "agent";
// //   const isBot = msg.from_type === "bot";
// //   const time = new Date(msg.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

// //   if (isBot && msg.msg_type === "interactive" && msg.content) {
// //     return (
// //       <div className="flex justify-end">
// //         <div className="max-w-xs bg-[#dcf8c6] rounded-xl rounded-tr-sm shadow px-4 py-3 text-sm">
// //           <p className="font-semibold text-gray-800 mb-1">{msg.content.header}</p>
// //           <p className="text-gray-700 mb-3">{msg.content.body}</p>
// //           <div className="space-y-2">
// //             {msg.content.buttons?.map((btn) => (
// //               <button key={btn.id} onClick={() => onButtonClick(btn.label)}
// //                 className="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 text-blue-600 text-sm font-medium hover:bg-blue-50 transition">
// //                 <span className="text-gray-400">↩</span><span>{btn.label}</span>
// //               </button>
// //             ))}
// //           </div>
// //           <p className="text-right text-xs text-gray-400 mt-2">{time} ✓✓</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
// //       <div className={`max-w-xs px-4 py-2 rounded-xl shadow text-sm ${isUser ? "bg-white rounded-tl-sm" : "bg-[#dcf8c6] rounded-tr-sm"}`}>
// //         {isAgent && <p className="text-xs text-green-600 font-semibold mb-0.5">Agent</p>}
// //         <p>{msg.text}</p>
// //         <p className={`text-xs mt-1 text-gray-400 ${!isUser ? "text-right" : ""}`}>{time} {!isUser && "✓✓"}</p>
// //       </div>
// //     </div>
// //   );
// // }

// function MessageBubble({ msg, onButtonClick }) {
//   const isUser = msg.from_type === "user";
//   const isAgent = msg.from_type === "agent";
//   const isBot = msg.from_type === "bot";
//   const time = new Date(msg.created_at).toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit"
//   });

//   // Bot interactive message
//   if (isBot && msg.msg_type === "interactive" && msg.content) {
//     return (
//       <div className="flex justify-end">
//         <div className="max-w-xs bg-[#dcf8c6] rounded-xl rounded-tr-sm shadow px-4 py-3 text-sm">
//           <p className="font-semibold text-gray-800 mb-1">{msg.content.header}</p>
//           <p className="text-gray-700 mb-3">{msg.content.body}</p>
//           <div className="space-y-2">
//             {msg.content.buttons?.map((btn) => (
//               <button key={btn.id} onClick={() => onButtonClick(btn.label)}
//                 className="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 text-blue-600 text-sm font-medium hover:bg-blue-50 transition">
//                 <span className="text-gray-400">↩</span><span>{btn.label}</span>
//               </button>
//             ))}
//           </div>
//           <p className="text-right text-xs text-gray-400 mt-2">{time} ✓✓</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ User = left side (white), Agent/Bot = right side (green)
//   const isRight = !isUser; // agent, bot, template எல்லாம் right

//   return (
//     <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
//       <div className={`max-w-xs px-4 py-2 rounded-xl shadow text-sm ${isRight
//         ? "bg-[#dcf8c6] rounded-tr-sm"
//         : "bg-white rounded-tl-sm"
//         }`}>
//         {isAgent && (
//           <p className="text-xs text-green-700 font-semibold mb-0.5">Agent</p>
//         )}
//         <p className="text-gray-800">{msg.text}</p>
//         <p className={`text-xs mt-1 text-gray-400 flex items-center gap-1 ${isRight ? "justify-end" : ""}`}>
//           {time}
//           {isRight && (
//             // ✅ Blue double tick — agent message
//             <span style={{ color: msg.is_read ? "#53bdeb" : "#8696a0" }}>
//               <svg viewBox="0 0 16 11" width="16" height="11" fill="currentColor">
//                 <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178L4.249 8.17l-2.6-2.312a.492.492 0 0 0-.37-.114.493.493 0 0 0-.325.164l-.7.791a.483.483 0 0 0 .054.68l3.533 3.147a.494.494 0 0 0 .707-.049l7.205-8.523a.483.483 0 0 0-.054-.68l-.628-.621zM15.27.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.137 7.44-.468-.416a.483.483 0 0 0-.68.054l-.49.583a.483.483 0 0 0 .054.68l1.16 1.033a.494.494 0 0 0 .707-.049l7.205-8.523a.483.483 0 0 0-.054-.68l-.612-.198z" />
//               </svg>
//             </span>
//           )}
//           {isUser && (
//             // Single grey tick — user message received
//             <span className="text-gray-400">✓</span>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function Inbox() {
//   const [conversations, setConversations] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [liveHistory, setLiveHistory] = useState("live");
//   const [filter, setFilter] = useState("All");
//   const [inputText, setInputText] = useState("");
//   const [showTemplateModal, setShowTemplateModal] = useState(false);
//   const [statusOpen, setStatusOpen] = useState(true);
//   const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const messagesEndRef = useRef(null);
//   const [showNewConvModal, setShowNewConvModal] = useState(false);
//   const [waTemplates, setWaTemplates] = useState([]);

//   const fetchWaTemplates = async () => {
//     try {
//       const res = await fetch('https://wynreach-backend.onrender.com/api/templates/?type=whatsapp&status=active');
//       const data = await res.json();
//       setWaTemplates(data.data || []);
//     } catch (err) {
//       console.error('Failed to fetch templates', err);
//     }
//   };
//   const [contactSearch, setContactSearch] = useState("");
//   const [allContacts, setAllContacts] = useState([]);

//   const selected = conversations.find((c) => c.id === selectedId);

//   const fetchConversations = async () => {
//     try {
//       const isClosed = liveHistory === "history" ? true : false;
//       const res = await fetch(`${API}/?is_closed=${isClosed}`);
//       const data = await res.json();
//       setConversations(data);
//       if (data.length > 0 && !selectedId) setSelectedId(data[0].id);
//     } catch (err) {
//       console.error("Failed to fetch conversations", err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchAllContacts = async (query = "") => {
//     try {
//       const res = await fetch(`${CONTACTS_API}/`);
//       const data = await res.json();
//       if (query.trim()) {
//         const q = query.toLowerCase();
//         const filtered = data.filter(
//           (c) =>
//             c.name?.toLowerCase().includes(q) ||
//             c.phone?.includes(q) ||
//             c.email?.toLowerCase().includes(q)
//         );
//         setAllContacts(filtered);
//       } else {
//         setAllContacts(data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch contacts", err);
//     }
//   };

//   const handleNewConversation = async (contact) => {
//     console.log("Contact selected:", contact);
//     console.log("Phone being sent:", contact.phone);
//     try {
//       await fetch(`${API}/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contact_name: contact.name,
//           phone_number: contact.phone,
//         }),
//       });
//       setShowNewConvModal(false);
//       setContactSearch("");
//       fetchConversations();
//     } catch (err) {
//       console.error("Failed to create conversation", err);
//     }
//   };

//   useEffect(() => {
//     fetchConversations();
//   }, [liveHistory]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchConversations();
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [liveHistory, selectedId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [selected?.messages?.length]);

//   const filtered = conversations.filter((c) => {
//     if (filter === "All") return true;
//     if (filter === "Unread") return c.status === "unread";
//     if (filter === "Read") return c.status === "read";
//     if (filter === "Intervened") return c.status === "intervened";
//     return true;
//   });


//   // async function sendMessage() {
//   //   if (!inputText.trim() || !selectedId) return;
//   //   const text = inputText;
//   //   setInputText("");
//   //   try {
//   //     await fetch(`${API}/${selectedId}/messages`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ from_type: "agent", text: text, msg_type: "text" }),
//   //     });
//   //     fetchConversations();
//   //   } catch (err) {
//   //     console.error("Send failed", err);
//   //     setInputText(text);
//   //   }
//   // }


//   async function sendMessage() {
//     if (!inputText.trim() || !selectedId) return;
//     const text = inputText;
//     setInputText("");
//     try {
//       // DB-ல save
//       await fetch(`${API}/${selectedId}/messages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ from_type: "agent", text: text, msg_type: "text" }),
//       });

//       fetchConversations();
//     } catch (err) {
//       console.error("Send failed", err);
//       setInputText(text);
//     }
//   }

//   async function updateConversation(id, data) {
//     try {
//       await fetch(`${API}/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       fetchConversations();
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   }

//   // async function sendTemplate(templateText) {
//   //   if (!selectedId) return;
//   //   try {
//   //     await fetch(`${API}/${selectedId}/messages`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ from_type: "template", text: templateText, msg_type: "text" }),
//   //     });
//   //     setShowTemplateModal(false);
//   //     fetchConversations();
//   //   } catch (err) {
//   //     console.error("Template send failed", err);
//   //   }
//   // }


//   async function sendTemplate(templateName) {
//     if (!selectedId) return;
//     try {
//       // 1. Inbox-ல message save பண்ணு
//       await fetch(`${API}/${selectedId}/messages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ from_type: "template", text: templateName, msg_type: "text" }),
//       });

//       // 2. Contact phone number எடு
//       const phone = selected?.phone_number;
//       if (phone) {
//         // 3. Actual WhatsApp message send பண்ணு
//         await fetch('https://wynreach-backend.onrender.com/api/whatsapp/send', {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             to_phone: phone,
//             template_name: templateName,
//             language_code: "en",
//           }),
//         });
//       }

//       setShowTemplateModal(false);
//       fetchConversations();
//     } catch (err) {
//       console.error("Template send failed", err);
//     }
//   }

//   async function handleButtonClick(btnLabel) {
//     if (!selectedId) return;
//     try {
//       await fetch(`${API}/${selectedId}/messages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ from_type: "user", text: btnLabel.replace(/^[^\w\s]*\s*/, ""), msg_type: "text" }),
//       });
//       fetchConversations();
//     } catch (err) {
//       console.error("Button click failed", err);
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden" style={{ fontFamily: "system-ui, sans-serif" }}>

//       {/* LEFT PANEL */}
//       <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
//         <div className="px-3 pt-3 pb-2 border-b border-gray-100">
//           <div className="flex gap-2 mb-3">
//             {["live", "history"].map((tab) => (
//               <button key={tab} onClick={() => { setLiveHistory(tab); setSelectedId(null); }}
//                 className={`flex-1 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${liveHistory === tab ? "bg-[#25d366] text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
//                 {tab === "live" ? "Live" : "History"}
//               </button>
//             ))}
//           </div>
//           <div className="flex flex-wrap gap-1.5 mb-2">
//             {["All", "Unread", "Read", "Intervened"].map((f) => (
//               <button key={f} onClick={() => setFilter(f)}
//                 className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filter === f ? "bg-[#25d366] text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
//                 {f}
//               </button>
//             ))}
//           </div>
//           <button className="px-3 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-100">Prospects</button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {filtered.length === 0 ? (
//             <div className="p-8 text-center text-gray-400 text-sm">No {liveHistory} conversations</div>
//           ) : filtered.map((conv) => (
//             <div key={conv.id} onClick={() => setSelectedId(conv.id)}
//               className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 transition-all hover:bg-gray-50 ${selectedId === conv.id ? "bg-green-50 border-l-4 border-l-[#25d366]" : ""}`}>
//               <Avatar name={conv.contact_name} />
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-center">
//                   <span className={`text-sm truncate ${conv.status === "unread" ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>{conv.contact_name}</span>
//                   <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{new Date(conv.created_at).toLocaleDateString()}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 truncate mt-0.5">{conv.last_message}</p>
//               </div>
//               {conv.status === "unread" && <div className="w-2 h-2 rounded-full bg-[#25d366] flex-shrink-0" />}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CHAT PANEL */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {selected ? (
//           <>
//             <div className="px-5 py-3 flex items-center gap-3 shadow-sm" style={{ background: "#075e54" }}>
//               <Avatar name={selected.contact_name} />
//               <div>
//                 <p className="font-semibold text-white">{selected.contact_name}</p>
//                 <p className="text-xs text-green-200">{selected.is_closed ? "Conversation closed" : "Active"}</p>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ backgroundImage: `url("${WA_BG}")`, backgroundColor: "#e5ddd5" }}>
//               {selected.messages?.map((msg) => (
//                 <MessageBubble key={msg.id} msg={msg} onButtonClick={handleButtonClick} />
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {selected.is_closed ? (
//               <div className="bg-white border-t border-gray-200 p-4">
//                 <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between gap-4 border border-gray-200">
//                   <div>
//                     <p className="font-bold text-gray-800">Chat Conversation closed!</p>
//                     <p className="text-sm text-gray-500 mt-0.5">Send a template to initiate a chat</p>
//                   </div>
//                   <button onClick={() => { setShowTemplateModal(true); fetchWaTemplates(); }}
//                     className="bg-[#25d366] hover:bg-[#128C7E] text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors shadow">
//                     Send Template
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white border-t border-gray-200 p-3 flex flex-col gap-2">
//                 <div className="flex items-center gap-2">
//                   <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                     placeholder="Type a message..."
//                     className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#25d366] transition" />
//                   <button onClick={sendMessage}
//                     className="w-10 h-10 rounded-full bg-[#25d366] hover:bg-[#128C7E] flex items-center justify-center text-white shadow transition-colors">
//                     <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
//                   </button>
//                 </div>
//                 <button onClick={() => updateConversation(selectedId, { status: "intervened" })}
//                   className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#128C7E] text-white font-semibold py-2.5 rounded-full text-sm shadow transition-colors">
//                   Intervene →
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
//             <div className="text-5xl">💬</div>
//             <p className="text-sm">Select a conversation</p>
//             {/* <button onClick={async () => {
//               const name = prompt("Contact name:");
//               if (!name) return;
//               const phone = prompt("Phone number (optional):");
//               await fetch(`${API}/`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ contact_name: name, phone_number: phone || null }),
//               });
//               fetchConversations();
//             }}
//               className="px-4 py-2 bg-[#25d366] text-white rounded-lg text-sm font-semibold hover:bg-[#128C7E] transition">
//               + New Conversation
//             </button> */}
//             <button
//               onClick={() => {
//                 setShowNewConvModal(true);
//                 fetchAllContacts();
//               }}
//               className="px-4 py-2 bg-[#25d366] text-white rounded-lg text-sm font-semibold hover:bg-[#128C7E] transition">
//               + New Conversation
//             </button>
//           </div>
//         )}
//       </div>

//       {/* RIGHT PANEL */}
//       {selected && (
//         <div className="w-72 flex-shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-y-auto">
//           <div className="p-4 border-b border-gray-100 relative">
//             <button onClick={() => setAgentDropdownOpen((o) => !o)}
//               className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">
//               <span>{selected.assigned_agent || "Assign Agent"}</span>
//               <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current text-gray-400">
//                 <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//               </svg>
//             </button>
//             {agentDropdownOpen && (
//               <div className="absolute top-14 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
//                 {AGENTS.map((agent) => (
//                   <button key={agent} onClick={() => { updateConversation(selectedId, { assigned_agent: agent }); setAgentDropdownOpen(false); }}
//                     className="w-full text-left px-4 py-2.5 text-sm hover:bg-green-50 hover:text-green-700 transition">
//                     {agent}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="p-4">
//             <button onClick={() => setStatusOpen((o) => !o)} className="w-full flex items-center justify-between mb-4">
//               <span className="font-semibold text-gray-800">Status Details</span>
//               <svg viewBox="0 0 20 20" className={`w-4 h-4 fill-current text-gray-500 transition-transform ${statusOpen ? "rotate-180" : ""}`}>
//                 <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//               </svg>
//             </button>
//             {statusOpen && (
//               <div className="space-y-4">
//                 <StatusRow label="Template Messages" value={selected.template_messages} />
//                 <StatusRow label="Session Messages" value={selected.session_messages} />
//                 <StatusRow label="Assigned Agent" value={selected.assigned_agent || "None"} />
//                 <StatusRow label="Conversation Status" value={selected.is_closed ? "Closed" : "Open"} />
//                 <StatusRow label="Status" value={selected.status} highlight />
//               </div>
//             )}
//           </div>

//           <div className="px-4 pb-4 mt-auto">
//             <button onClick={() => updateConversation(selectedId, { is_closed: !selected.is_closed })}
//               className={`w-full py-2 rounded-lg text-sm font-medium transition ${selected.is_closed ? "bg-[#25d366] text-white hover:bg-[#128C7E]" : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"}`}>
//               {selected.is_closed ? "Reopen Conversation" : "Close Conversation"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* TEMPLATE MODAL */}
//       {showTemplateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">
//             <h3 className="font-bold text-lg text-gray-900 mb-4">Send Template</h3>
//             <div className="space-y-3">
//               {waTemplates.length === 0 ? (
//                 <p className="text-center text-sm text-gray-400 py-4">No active templates found</p>
//               ) : (
//                 waTemplates.map((t) => (
//                   <button key={t.id} onClick={() => sendTemplate(t.name)}
//                     className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-300 text-sm font-medium transition">
//                     💬 {t.name}
//                   </button>
//                 ))
//               )}
//             </div>
//             <button onClick={() => setShowTemplateModal(false)} className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
//           </div>
//         </div>
//       )}

//       {showNewConvModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.3)" }}>
//           <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-bold text-lg text-gray-900">New Conversation</h3>
//               <button
//                 onClick={() => { setShowNewConvModal(false); setContactSearch(""); }}
//                 className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
//                 <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder="Search contact by name or phone..."
//               value={contactSearch}
//               onChange={(e) => {
//                 setContactSearch(e.target.value);
//                 fetchAllContacts(e.target.value);
//               }}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
//               autoFocus
//             />
//             <div className="max-h-64 overflow-y-auto space-y-2">
//               {allContacts.length === 0 ? (
//                 <p className="text-center text-sm text-gray-400 py-4">No contacts found</p>
//               ) : (
//                 allContacts.map((contact) => (
//                   <button
//                     key={contact.id}
//                     onClick={() => handleNewConversation(contact)}
//                     className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 text-sm transition cursor-pointer"
//                   >
//                     <p className="font-semibold text-gray-800">{contact.name}</p>
//                     <p className="text-xs text-gray-500">{contact.phone} · {contact.email}</p>
//                   </button>
//                 ))
//               )}
//             </div>
//             <button
//               onClick={() => { setShowNewConvModal(false); setContactSearch(""); }}
//               className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added for navigation

const API = "https://wynreach-backend.onrender.com/api/inbox";
const CONTACTS_API = "https://wynreach-backend.onrender.com/api/contacts";
const AGENTS = ["Alice", "Bob", "Charlie", "Diana"];
const WA_BG = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b2bec3' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

function Avatar({ name }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0" style={{ background: "#075e54" }}>
      {initials}
    </div>
  );
}

function StatusRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold text-right ${highlight ? "text-gray-900" : "text-gray-700"}`}>: {value}</span>
    </div>
  );
}

function MessageBubble({ msg, onButtonClick }) {
  const isUser = msg.from_type === "user";
  const isAgent = msg.from_type === "agent";
  const isBot = msg.from_type === "bot";
  const time = new Date(msg.created_at).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  // Bot interactive message
  if (isBot && msg.msg_type === "interactive" && msg.content) {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs bg-[#dcf8c6] rounded-xl rounded-tr-sm shadow px-4 py-3 text-sm">
          <p className="font-semibold text-gray-800 mb-1">{msg.content.header}</p>
          <p className="text-gray-700 mb-3">{msg.content.body}</p>
          <div className="space-y-2">
            {msg.content.buttons?.map((btn) => (
              <button key={btn.id} onClick={() => onButtonClick(btn.label)}
                className="w-full flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 text-blue-600 text-sm font-medium hover:bg-blue-50 transition">
                <span className="text-gray-400">↩</span><span>{btn.label}</span>
              </button>
            ))}
          </div>
          <p className="text-right text-xs text-gray-400 mt-2">{time} ✓✓</p>
        </div>
      </div>
    );
  }

  const isRight = !isUser; // agent, bot, template எல்லாம் right

  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs px-4 py-2 rounded-xl shadow text-sm ${isRight
        ? "bg-[#dcf8c6] rounded-tr-sm"
        : "bg-white rounded-tl-sm"
        }`}>
        {isAgent && (
          <p className="text-xs text-green-700 font-semibold mb-0.5">Agent</p>
        )}
        <p className="text-gray-800">{msg.text}</p>
        <p className={`text-xs mt-1 text-gray-400 flex items-center gap-1 ${isRight ? "justify-end" : ""}`}>
          {time}
          {isRight && (
            <span style={{ color: msg.is_read ? "#53bdeb" : "#8696a0" }}>
              <svg viewBox="0 0 16 11" width="16" height="11" fill="currentColor">
                <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178L4.249 8.17l-2.6-2.312a.492.492 0 0 0-.37-.114.493.493 0 0 0-.325.164l-.7.791a.483.483 0 0 0 .054.68l3.533 3.147a.494.494 0 0 0 .707-.049l7.205-8.523a.483.483 0 0 0-.054-.68l-.628-.621zM15.27.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.137 7.44-.468-.416a.483.483 0 0 0-.68.054l-.49.583a.483.483 0 0 0 .054.68l1.16 1.033a.494.494 0 0 0 .707-.049l7.205-8.523a.483.483 0 0 0-.054-.68l-.612-.198z" />
              </svg>
            </span>
          )}
          {isUser && (
            <span className="text-gray-400">✓</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default function Inbox() {
  const navigate = useNavigate(); // ✅ for back navigation
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [liveHistory, setLiveHistory] = useState("live");
  const [filter, setFilter] = useState("All");
  const [inputText, setInputText] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [statusOpen, setStatusOpen] = useState(true);
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [showNewConvModal, setShowNewConvModal] = useState(false);
  const [waTemplates, setWaTemplates] = useState([]);

  const fetchWaTemplates = async () => {
    try {
      const res = await fetch('https://wynreach-backend.onrender.com/api/templates/?type=whatsapp&status=active');
      const data = await res.json();
      setWaTemplates(data.data || []);
    } catch (err) {
      console.error('Failed to fetch templates', err);
    }
  };
  const [contactSearch, setContactSearch] = useState("");
  const [allContacts, setAllContacts] = useState([]);

  const selected = conversations.find((c) => c.id === selectedId);

  const fetchConversations = async () => {
    try {
      const isClosed = liveHistory === "history" ? true : false;
      const res = await fetch(`${API}/?is_closed=${isClosed}`);
      const data = await res.json();
      setConversations(data);
      if (data.length > 0 && !selectedId) setSelectedId(data[0].id);
    } catch (err) {
      console.error("Failed to fetch conversations", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllContacts = async (query = "") => {
    try {
      const res = await fetch(`${CONTACTS_API}/`);
      const data = await res.json();
      if (query.trim()) {
        const q = query.toLowerCase();
        const filtered = data.filter(
          (c) =>
            c.name?.toLowerCase().includes(q) ||
            c.phone?.includes(q) ||
            c.email?.toLowerCase().includes(q)
        );
        setAllContacts(filtered);
      } else {
        setAllContacts(data);
      }
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    }
  };

  const handleNewConversation = async (contact) => {
    console.log("Contact selected:", contact);
    console.log("Phone being sent:", contact.phone);
    try {
      await fetch(`${API}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_name: contact.name,
          phone_number: contact.phone,
        }),
      });
      setShowNewConvModal(false);
      setContactSearch("");
      fetchConversations();
    } catch (err) {
      console.error("Failed to create conversation", err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [liveHistory]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchConversations();
    }, 1000);
    return () => clearInterval(interval);
  }, [liveHistory, selectedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages?.length]);

  const filtered = conversations.filter((c) => {
    if (filter === "All") return true;
    if (filter === "Unread") return c.status === "unread";
    if (filter === "Read") return c.status === "read";
    if (filter === "Intervened") return c.status === "intervened";
    return true;
  });

  async function sendMessage() {
    if (!inputText.trim() || !selectedId) return;
    const text = inputText;
    setInputText("");
    try {
      await fetch(`${API}/${selectedId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_type: "agent", text: text, msg_type: "text" }),
      });
      fetchConversations();
    } catch (err) {
      console.error("Send failed", err);
      setInputText(text);
    }
  }

  async function updateConversation(id, data) {
    try {
      await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      fetchConversations();
    } catch (err) {
      console.error("Update failed", err);
    }
  }

  async function sendTemplate(templateName) {
    if (!selectedId) return;
    try {
      await fetch(`${API}/${selectedId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_type: "template", text: templateName, msg_type: "text" }),
      });
      const phone = selected?.phone_number;
      if (phone) {
        await fetch('https://wynreach-backend.onrender.com/api/whatsapp/send', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to_phone: phone,
            template_name: templateName,
            language_code: "en",
          }),
        });
      }
      setShowTemplateModal(false);
      fetchConversations();
    } catch (err) {
      console.error("Template send failed", err);
    }
  }

  async function handleButtonClick(btnLabel) {
    if (!selectedId) return;
    try {
      await fetch(`${API}/${selectedId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_type: "user", text: btnLabel.replace(/^[^\w\s]*\s*/, ""), msg_type: "text" }),
      });
      fetchConversations();
    } catch (err) {
      console.error("Button click failed", err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* LEFT PANEL */}
      <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Header with Back Arrow */}
        <div className="px-3 pt-3 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            {/* Back Arrow Button */}
            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Back to Dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="font-semibold text-gray-800 text-sm">Inbox</span>
          </div>
          <div className="flex gap-2 mb-3">
            {["live", "history"].map((tab) => (
              <button key={tab} onClick={() => { setLiveHistory(tab); setSelectedId(null); }}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${liveHistory === tab ? "bg-[#25d366] text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {tab === "live" ? "Live" : "History"}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {["All", "Unread", "Read", "Intervened"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filter === f ? "bg-[#25d366] text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {f}
              </button>
            ))}
          </div>
          <button className="px-3 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-100">Prospects</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No {liveHistory} conversations</div>
          ) : filtered.map((conv) => (
            <div key={conv.id} onClick={() => setSelectedId(conv.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 transition-all hover:bg-gray-50 ${selectedId === conv.id ? "bg-green-50 border-l-4 border-l-[#25d366]" : ""}`}>
              <Avatar name={conv.contact_name} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className={`text-sm truncate ${conv.status === "unread" ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>{conv.contact_name}</span>
                  <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{new Date(conv.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{conv.last_message}</p>
              </div>
              {conv.status === "unread" && <div className="w-2 h-2 rounded-full bg-[#25d366] flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* CHAT PANEL */}
      <div className="flex-1 flex flex-col min-w-0">
        {selected ? (
          <>
            <div className="px-5 py-3 flex items-center gap-3 shadow-sm" style={{ background: "#075e54" }}>
              <Avatar name={selected.contact_name} />
              <div>
                <p className="font-semibold text-white">{selected.contact_name}</p>
                <p className="text-xs text-green-200">{selected.is_closed ? "Conversation closed" : "Active"}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ backgroundImage: `url("${WA_BG}")`, backgroundColor: "#e5ddd5" }}>
              {selected.messages?.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} onButtonClick={handleButtonClick} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {selected.is_closed ? (
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between gap-4 border border-gray-200">
                  <div>
                    <p className="font-bold text-gray-800">Chat Conversation closed!</p>
                    <p className="text-sm text-gray-500 mt-0.5">Send a template to initiate a chat</p>
                  </div>
                  <button onClick={() => { setShowTemplateModal(true); fetchWaTemplates(); }}
                    className="bg-[#25d366] hover:bg-[#128C7E] text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors shadow">
                    Send Template
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border-t border-gray-200 p-3 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#25d366] transition" />
                  <button onClick={sendMessage}
                    className="w-10 h-10 rounded-full bg-[#25d366] hover:bg-[#128C7E] flex items-center justify-center text-white shadow transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                  </button>
                </div>
                <button onClick={() => updateConversation(selectedId, { status: "intervened" })}
                  className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#128C7E] text-white font-semibold py-2.5 rounded-full text-sm shadow transition-colors">
                  Intervene →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <div className="text-5xl">💬</div>
            <p className="text-sm">Select a conversation</p>
            <button
              onClick={() => {
                setShowNewConvModal(true);
                fetchAllContacts();
              }}
              className="px-4 py-2 bg-[#25d366] text-white rounded-lg text-sm font-semibold hover:bg-[#128C7E] transition">
              + New Conversation
            </button>
          </div>
        )}
      </div>

   

      {/* TEMPLATE MODAL */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Send Template</h3>
            <div className="space-y-3">
              {waTemplates.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-4">No active templates found</p>
              ) : (
                waTemplates.map((t) => (
                  <button key={t.id} onClick={() => sendTemplate(t.name)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-300 text-sm font-medium transition">
                    💬 {t.name}
                  </button>
                ))
              )}
            </div>
            <button onClick={() => setShowTemplateModal(false)} className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        </div>
      )}

      {showNewConvModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900">New Conversation</h3>
              <button
                onClick={() => { setShowNewConvModal(false); setContactSearch(""); }}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="Search contact by name or phone..."
              value={contactSearch}
              onChange={(e) => {
                setContactSearch(e.target.value);
                fetchAllContacts(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              autoFocus
            />
            <div className="max-h-64 overflow-y-auto space-y-2">
              {allContacts.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-4">No contacts found</p>
              ) : (
                allContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => handleNewConversation(contact)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 text-sm transition cursor-pointer"
                  >
                    <p className="font-semibold text-gray-800">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.phone} · {contact.email}</p>
                  </button>
                ))
              )}
            </div>
            <button
              onClick={() => { setShowNewConvModal(false); setContactSearch(""); }}
              className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
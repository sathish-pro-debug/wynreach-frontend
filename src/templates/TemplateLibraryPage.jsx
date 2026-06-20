// // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import TemplateEditorPage from "./TemplateEditorPage";

// // // // // // // // const API = "https://wynreach-backend.onrender.com/api/templates";

// // // // // // // // const CHANNEL_TABS = [
// // // // // // // //   { label: "All", value: "" },
// // // // // // // //   { label: "Email", value: "email" },
// // // // // // // //   { label: "WhatsApp", value: "whatsapp" },
// // // // // // // // ];
// // // // // // // // const CATEGORIES = [
// // // // // // // //   "All Categories",
// // // // // // // //   "Marketing",
// // // // // // // //   "Utility",
// // // // // // // //   "Authentication",
// // // // // // // //   "Promotional",
// // // // // // // //   "Transactional",
// // // // // // // //   "Onboarding",
// // // // // // // //   "Announcement",
// // // // // // // //   "Re-engagement",
// // // // // // // // ];

// // // // // // // // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// // // // // // // //   if (!isOpen) return null;
// // // // // // // //   return (
// // // // // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // // // // // //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
// // // // // // // //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// // // // // // // //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// // // // // // // //         <div className="flex gap-3">
// // // // // // // //           <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// // // // // // // //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const Toast = ({ message, type = "success", onClose }) => (
// // // // // // // //   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
// // // // // // // //     <span>{type === "success" ? "✓" : "✕"}</span>
// // // // // // // //     {message}
// // // // // // // //     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
// // // // // // // //   </div>
// // // // // // // // );

// // // // // // // // // ✅ Fallback thumbnails (used when no content)
// // // // // // // // const EmailThumb = () => {
// // // // // // // //   const accent = "#6366f1";
// // // // // // // //   return (
// // // // // // // //     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
// // // // // // // //       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
// // // // // // // //       <div className="h-5 bg-slate-200 rounded" />
// // // // // // // //       <div className="space-y-0.5">
// // // // // // // //         <div className="h-1 bg-slate-200 rounded" />
// // // // // // // //         <div className="h-1 bg-slate-200 rounded w-3/4" />
// // // // // // // //       </div>
// // // // // // // //       <div className="flex gap-1">
// // // // // // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // // // // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // // // // // //       </div>
// // // // // // // //       <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const WAThumb = () => (
// // // // // // // //   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // // // // // //     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// // // // // // // //       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
// // // // // // // //       <div className="text-[7px] font-bold text-white">WhatsApp</div>
// // // // // // // //     </div>
// // // // // // // //     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
// // // // // // // //       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
// // // // // // // //         <div className="h-1 bg-green-400 rounded w-full" />
// // // // // // // //         <div className="h-1 bg-green-300 rounded w-4/5" />
// // // // // // // //         <div className="h-1 bg-green-300 rounded w-3/5" />
// // // // // // // //       </div>
// // // // // // // //       <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
// // // // // // // //     </div>
// // // // // // // //   </div>
// // // // // // // // );

// // // // // // // // // ✅ Mini Email Preview — actual blocks render
// // // // // // // // const MiniEmailPreview = ({ content }) => {
// // // // // // // //   let blocks = [];
// // // // // // // //   try { blocks = JSON.parse(content || "[]"); } catch { }
// // // // // // // //   if (!blocks.length) return <EmailThumb />;
// // // // // // // //   return (
// // // // // // // //     <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
// // // // // // // //       <div className="bg-indigo-600 px-2 py-1">
// // // // // // // //         <div className="h-1 bg-indigo-300 rounded w-3/4" />
// // // // // // // //       </div>
// // // // // // // //       <div className="p-1.5 space-y-1">
// // // // // // // //         {blocks.slice(0, 5).map((block, i) => {
// // // // // // // //           const p = block.props || {};
// // // // // // // //           if (block.type === "header") return (
// // // // // // // //             <div key={i} className="h-2 rounded" style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }} />
// // // // // // // //           );
// // // // // // // //           if (block.type === "image") return (
// // // // // // // //             <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center">
// // // // // // // //               <span className="text-[8px] text-indigo-300">IMG</span>
// // // // // // // //             </div>
// // // // // // // //           );
// // // // // // // //           if (block.type === "button") return (
// // // // // // // //             <div key={i} className="h-3 rounded mx-auto w-16 flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}>
// // // // // // // //               <span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span>
// // // // // // // //             </div>
// // // // // // // //           );
// // // // // // // //           if (block.type === "divider") return (
// // // // // // // //             <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />
// // // // // // // //           );
// // // // // // // //           if (block.type === "columns") return (
// // // // // // // //             <div key={i} className="flex gap-0.5">
// // // // // // // //               <div className="flex-1 h-4 bg-slate-100 rounded" />
// // // // // // // //               <div className="flex-1 h-4 bg-slate-100 rounded" />
// // // // // // // //             </div>
// // // // // // // //           );
// // // // // // // //           if (block.type === "footer") return (
// // // // // // // //             <div key={i} className="h-1 bg-slate-100 rounded w-full" />
// // // // // // // //           );
// // // // // // // //           // text / default
// // // // // // // //           return (
// // // // // // // //             <div key={i} className="space-y-0.5">
// // // // // // // //               <div className="h-1 bg-slate-200 rounded w-full" />
// // // // // // // //               <div className="h-1 bg-slate-200 rounded w-4/5" />
// // // // // // // //               <div className="h-1 bg-slate-200 rounded w-3/5" />
// // // // // // // //             </div>
// // // // // // // //           );
// // // // // // // //         })}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // // ✅ Mini WhatsApp Preview — actual body text render
// // // // // // // // const MiniWAPreview = ({ content }) => {
// // // // // // // //   let wa = {};
// // // // // // // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // // // // // // //   const body = wa.body || "";
// // // // // // // //   if (!body) return <WAThumb />;
// // // // // // // //   return (
// // // // // // // //     <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // // // // // //       <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// // // // // // // //         <div className="w-3 h-3 rounded-full bg-[#25d366]" />
// // // // // // // //         <div className="text-[6px] font-bold text-white">WhatsApp</div>
// // // // // // // //       </div>
// // // // // // // //       <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
// // // // // // // //         <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
// // // // // // // //           {wa.header && (
// // // // // // // //             <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">
// // // // // // // //               {wa.header}
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //           <div className="text-[6px] text-slate-600 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
// // // // // // // //             {body.substring(0, 100)}
// // // // // // // //           </div>
// // // // // // // //           {wa.actions && wa.actions.length > 0 && (
// // // // // // // //             <div className="mt-1 border-t border-slate-100 pt-0.5">
// // // // // // // //               <div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">
// // // // // // // //                 {wa.actions[0].name}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const WAStatusBadge = ({ status }) => {
// // // // // // // //   if (!status) return null;
// // // // // // // //   if (status === "pending_review" || status === "pending")
// // // // // // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">⏳ Pending Review</span>;
// // // // // // // //   if (status === "active")
// // // // // // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">✓ Active</span>;
// // // // // // // //   return null;
// // // // // // // // };

// // // // // // // // const TemplateCard = ({ tpl, onEdit, onDuplicate, onDelete }) => {
// // // // // // // //   const isWA = tpl.type === "whatsapp";
// // // // // // // //   const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
// // // // // // // //   const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

// // // // // // // //   return (
// // // // // // // //     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
// // // // // // // //       {/* ✅ Actual preview instead of gradient */}
// // // // // // // //       <div
// // // // // // // //         onClick={onEdit}
// // // // // // // //         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
// // // // // // // //       >
// // // // // // // //         {isWA
// // // // // // // //           ? <MiniWAPreview content={tpl.content} />
// // // // // // // //           : <MiniEmailPreview content={tpl.content} />
// // // // // // // //         }
// // // // // // // //       </div>
// // // // // // // //       <div onClick={onEdit} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
// // // // // // // //         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
// // // // // // // //         <div className="flex flex-wrap items-center gap-1.5 mb-2">
// // // // // // // //           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
// // // // // // // //             {isWA ? "💬 WhatsApp" : "✉️ Email"}
// // // // // // // //           </span>
// // // // // // // //           {tpl.category && (
// // // // // // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{tpl.category}</span>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //         <WAStatusBadge status={isWA ? tpl.status : null} />
// // // // // // // //         <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
// // // // // // // //       </div>
// // // // // // // //       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
// // // // // // // //         <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
// // // // // // // //         <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
// // // // // // // //         <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const StatCard = ({ label, value, icon, color }) => (
// // // // // // // //   <div className={`rounded-2xl p-4 border ${color}`}>
// // // // // // // //     <div className="flex items-center gap-2 mb-1">
// // // // // // // //       <span className="text-lg">{icon}</span>
// // // // // // // //       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
// // // // // // // //     </div>
// // // // // // // //     <p className="text-2xl font-bold text-slate-900">{value}</p>
// // // // // // // //   </div>
// // // // // // // // );

// // // // // // // // // ✅ Channel Selection Modal
// // // // // // // // const ChannelSelectModal = ({ onSelect, onClose }) => (
// // // // // // // //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // // // // // //     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
// // // // // // // //       <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
// // // // // // // //       <p className="text-sm text-slate-500 mb-6">Which channel is this template for?</p>
// // // // // // // //       <div className="flex gap-4 mb-6">
// // // // // // // //         <button
// // // // // // // //           onClick={() => onSelect("email")}
// // // // // // // //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
// // // // // // // //         >
// // // // // // // //           <span className="text-4xl">✉️</span>
// // // // // // // //           <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
// // // // // // // //           <span className="text-xs text-slate-400 text-center">Drag & drop email builder with blocks</span>
// // // // // // // //         </button>
// // // // // // // //         <button
// // // // // // // //           onClick={() => onSelect("whatsapp")}
// // // // // // // //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
// // // // // // // //         >
// // // // // // // //           <span className="text-4xl">💬</span>
// // // // // // // //           <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
// // // // // // // //           <span className="text-xs text-slate-400 text-center">WhatsApp Business template with CTA</span>
// // // // // // // //         </button>
// // // // // // // //       </div>
// // // // // // // //       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
// // // // // // // //     </div>
// // // // // // // //   </div>
// // // // // // // // );

// // // // // // // // export default function TemplateLibraryPage() {
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const [templates, setTemplates] = useState([]);
// // // // // // // //   const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // // // // // //   const [editingId, setEditingId] = useState(undefined);
// // // // // // // //   const [selectedChannel, setSelectedChannel] = useState("email");
// // // // // // // //   const [showChannelModal, setShowChannelModal] = useState(false);
// // // // // // // //   const [channel, setChannel] = useState("");
// // // // // // // //   const [category, setCategory] = useState("All Categories");
// // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // //   const [catOpen, setCatOpen] = useState(false);
// // // // // // // //   const [deleteTarget, setDeleteTarget] = useState(null);
// // // // // // // //   const [toast, setToast] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const catRef = useRef();

// // // // // // // //   const fetchTemplates = async () => {
// // // // // // // //     try {
// // // // // // // //       setLoading(true);
// // // // // // // //       const params = new URLSearchParams();
// // // // // // // //       if (channel) params.append("type", channel);
// // // // // // // //       if (category !== "All Categories") params.append("category", category);
// // // // // // // //       if (search) params.append("search", search);
// // // // // // // //       const res = await fetch(`${API}/?${params}`);
// // // // // // // //       const data = await res.json();
// // // // // // // //       setTemplates(data.data || []);
// // // // // // // //       setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // // // // // //     } catch (err) {
// // // // // // // //       showToast("Failed to load templates", "error");
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => { fetchTemplates(); }, [channel, category, search]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
// // // // // // // //       .then((r) => r.json())
// // // // // // // //       .then((data) => { if (data.synced?.length > 0) fetchTemplates(); })
// // // // // // // //       .catch(() => {});
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
// // // // // // // //     document.addEventListener("mousedown", handler);
// // // // // // // //     return () => document.removeEventListener("mousedown", handler);
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
// // // // // // // //   }, [toast]);

// // // // // // // //   const showToast = (message, type = "success") => setToast({ message, type });

// // // // // // // //   const handleDuplicate = async (tpl) => {
// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
// // // // // // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl.name}" duplicated`); }
// // // // // // // //     } catch { showToast("Failed to duplicate", "error"); }
// // // // // // // //   };

// // // // // // // //   const confirmDelete = async () => {
// // // // // // // //     const tpl = templates.find((t) => t.id === deleteTarget);
// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
// // // // // // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl?.name}" deleted`, "error"); }
// // // // // // // //     } catch { showToast("Failed to delete", "error"); }
// // // // // // // //     setDeleteTarget(null);
// // // // // // // //   };

// // // // // // // //   const handleChannelSelect = (ch) => {
// // // // // // // //     setSelectedChannel(ch);
// // // // // // // //     setShowChannelModal(false);
// // // // // // // //     setEditingId(null);
// // // // // // // //   };

// // // // // // // //   if (editingId !== undefined) {
// // // // // // // //     return (
// // // // // // // //       <TemplateEditorPage
// // // // // // // //         templateId={editingId}
// // // // // // // //         initialChannel={selectedChannel}
// // // // // // // //         onBack={() => { fetchTemplates(); setEditingId(undefined); }}
// // // // // // // //       />
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">

// // // // // // // //       {showChannelModal && (
// // // // // // // //         <ChannelSelectModal
// // // // // // // //           onSelect={handleChannelSelect}
// // // // // // // //           onClose={() => setShowChannelModal(false)}
// // // // // // // //         />
// // // // // // // //       )}

// // // // // // // //       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
// // // // // // // //         <div className="flex items-center gap-3">
// // // // // // // //           <button
// // // // // // // //             onClick={() => navigate("/dashboard")}
// // // // // // // //             className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
// // // // // // // //           >
// // // // // // // //             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
// // // // // // // //               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
// // // // // // // //             </svg>
// // // // // // // //           </button>
// // // // // // // //           <div>
// // // // // // // //             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
// // // // // // // //             <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //         <button
// // // // // // // //           onClick={() => setShowChannelModal(true)}
// // // // // // // //           className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
// // // // // // // //         >
// // // // // // // //           + Create Template
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // // // // // // //         <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
// // // // // // // //         <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
// // // // // // // //         <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
// // // // // // // //         <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
// // // // // // // //       </div>

// // // // // // // //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// // // // // // // //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// // // // // // // //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// // // // // // // //             {CHANNEL_TABS.map((tab) => (
// // // // // // // //               <button
// // // // // // // //                 key={tab.value}
// // // // // // // //                 onClick={() => setChannel(tab.value)}
// // // // // // // //                 className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
// // // // // // // //               >
// // // // // // // //                 {tab.label}
// // // // // // // //               </button>
// // // // // // // //             ))}
// // // // // // // //           </div>

// // // // // // // //           <div className="relative" ref={catRef}>
// // // // // // // //             <button
// // // // // // // //               onClick={() => setCatOpen((o) => !o)}
// // // // // // // //               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
// // // // // // // //             >
// // // // // // // //               {category} <span className="text-slate-400 text-[10px]">▾</span>
// // // // // // // //             </button>
// // // // // // // //             {catOpen && (
// // // // // // // //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
// // // // // // // //                 {CATEGORIES.map((c) => (
// // // // // // // //                   <div
// // // // // // // //                     key={c}
// // // // // // // //                     onClick={() => { setCategory(c); setCatOpen(false); }}
// // // // // // // //                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
// // // // // // // //                   >
// // // // // // // //                     {c}
// // // // // // // //                   </div>
// // // // // // // //                 ))}
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </div>

// // // // // // // //           <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

// // // // // // // //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
// // // // // // // //             <span className="text-slate-400 text-sm">🔍</span>
// // // // // // // //             <input
// // // // // // // //               value={search}
// // // // // // // //               onChange={(e) => setSearch(e.target.value)}
// // // // // // // //               placeholder="Search templates..."
// // // // // // // //               className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
// // // // // // // //             />
// // // // // // // //             {search && (
// // // // // // // //               <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">×</button>
// // // // // // // //             )}
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="p-5">
// // // // // // // //           {loading ? (
// // // // // // // //             <div className="text-center py-16 text-slate-400">Loading templates...</div>
// // // // // // // //           ) : templates.length === 0 ? (
// // // // // // // //             <div className="text-center py-16">
// // // // // // // //               <div className="text-4xl mb-3">🗂</div>
// // // // // // // //               <p className="text-sm font-semibold text-slate-700">No templates found</p>
// // // // // // // //               <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
// // // // // // // //             </div>
// // // // // // // //           ) : (
// // // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// // // // // // // //               {templates.map((tpl) => (
// // // // // // // //                 <TemplateCard
// // // // // // // //                   key={tpl.id}
// // // // // // // //                   tpl={tpl}
// // // // // // // //                   // onEdit={() => {
// // // // // // // //                   //   setSelectedChannel(tpl.type || "email");
// // // // // // // //                   //   setEditingId(tpl.id);
// // // // // // // //                   // }}
// // // // // // // // onEdit={() => {
// // // // // // // //   try {
// // // // // // // //     const data = JSON.parse(tpl.content || "{}");

// // // // // // // //     if (data.layout) {
// // // // // // // //       navigate(`/email-builder?template=${data.layout}`);
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //   } catch (e) {
// // // // // // // //     console.error(e);
// // // // // // // //   }

// // // // // // // //   setSelectedChannel(tpl.type || "email");
// // // // // // // //   setEditingId(tpl.id);
// // // // // // // // }}
// // // // // // // //                   onDuplicate={() => handleDuplicate(tpl)}
// // // // // // // //                   onDelete={() => setDeleteTarget(tpl.id)}
// // // // // // // //                 />
// // // // // // // //               ))}
// // // // // // // //               <div
// // // // // // // //                 onClick={() => setShowChannelModal(true)}
// // // // // // // //                 className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
// // // // // // // //               >
// // // // // // // //                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
// // // // // // // //                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
// // // // // // // //                 </div>
// // // // // // // //                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <ConfirmDialog
// // // // // // // //         isOpen={!!deleteTarget}
// // // // // // // //         onClose={() => setDeleteTarget(null)}
// // // // // // // //         onConfirm={confirmDelete}
// // // // // // // //         title="Delete Template"
// // // // // // // //         message="Are you sure you want to delete this template? This action cannot be undone."
// // // // // // // //       />
// // // // // // // //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }



// // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import TemplateEditorPage from "./TemplateEditorPage";

// // // // // // // const API = "https://wynreach-backend.onrender.com/api/templates";

// // // // // // // const CHANNEL_TABS = [
// // // // // // //   { label: "All", value: "" },
// // // // // // //   { label: "Email", value: "email" },
// // // // // // //   { label: "WhatsApp", value: "whatsapp" },
// // // // // // // ];
// // // // // // // const CATEGORIES = [
// // // // // // //   "All Categories",
// // // // // // //   "Marketing",
// // // // // // //   "Utility",
// // // // // // //   "Authentication",
// // // // // // //   "Promotional",
// // // // // // //   "Transactional",
// // // // // // //   "Onboarding",
// // // // // // //   "Announcement",
// // // // // // //   "Re-engagement",
// // // // // // // ];

// // // // // // // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// // // // // // //   if (!isOpen) return null;
// // // // // // //   return (
// // // // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // // // // //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
// // // // // // //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// // // // // // //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// // // // // // //         <div className="flex gap-3">
// // // // // // //           <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// // // // // // //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const Toast = ({ message, type = "success", onClose }) => (
// // // // // // //   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
// // // // // // //     <span>{type === "success" ? "✓" : "✕"}</span>
// // // // // // //     {message}
// // // // // // //     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
// // // // // // //   </div>
// // // // // // // );

// // // // // // // // Fallback thumbnails (used when no content)
// // // // // // // const EmailThumb = () => {
// // // // // // //   const accent = "#6366f1";
// // // // // // //   return (
// // // // // // //     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
// // // // // // //       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
// // // // // // //       <div className="h-5 bg-slate-200 rounded" />
// // // // // // //       <div className="space-y-0.5">
// // // // // // //         <div className="h-1 bg-slate-200 rounded" />
// // // // // // //         <div className="h-1 bg-slate-200 rounded w-3/4" />
// // // // // // //       </div>
// // // // // // //       <div className="flex gap-1">
// // // // // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // // // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // // // // //       </div>
// // // // // // //       <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const WAThumb = () => (
// // // // // // //   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // // // // //     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// // // // // // //       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
// // // // // // //       <div className="text-[7px] font-bold text-white">WhatsApp</div>
// // // // // // //     </div>
// // // // // // //     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
// // // // // // //       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
// // // // // // //         <div className="h-1 bg-green-400 rounded w-full" />
// // // // // // //         <div className="h-1 bg-green-300 rounded w-4/5" />
// // // // // // //         <div className="h-1 bg-green-300 rounded w-3/5" />
// // // // // // //       </div>
// // // // // // //       <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
// // // // // // //     </div>
// // // // // // //   </div>
// // // // // // // );

// // // // // // // // Mini Email Preview — actual blocks render
// // // // // // // const MiniEmailPreview = ({ content }) => {
// // // // // // //   let blocks = [];
// // // // // // //   try { blocks = JSON.parse(content || "[]"); } catch { }
// // // // // // //   if (!blocks.length) return <EmailThumb />;
// // // // // // //   return (
// // // // // // //     <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
// // // // // // //       <div className="bg-indigo-600 px-2 py-1">
// // // // // // //         <div className="h-1 bg-indigo-300 rounded w-3/4" />
// // // // // // //       </div>
// // // // // // //       <div className="p-1.5 space-y-1">
// // // // // // //         {blocks.slice(0, 5).map((block, i) => {
// // // // // // //           const p = block.props || {};
// // // // // // //           if (block.type === "header") return (
// // // // // // //             <div key={i} className="h-2 rounded" style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }} />
// // // // // // //           );
// // // // // // //           if (block.type === "image") return (
// // // // // // //             <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center">
// // // // // // //               <span className="text-[8px] text-indigo-300">IMG</span>
// // // // // // //             </div>
// // // // // // //           );
// // // // // // //           if (block.type === "button") return (
// // // // // // //             <div key={i} className="h-3 rounded mx-auto w-16 flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}>
// // // // // // //               <span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span>
// // // // // // //             </div>
// // // // // // //           );
// // // // // // //           if (block.type === "divider") return (
// // // // // // //             <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />
// // // // // // //           );
// // // // // // //           if (block.type === "columns") return (
// // // // // // //             <div key={i} className="flex gap-0.5">
// // // // // // //               <div className="flex-1 h-4 bg-slate-100 rounded" />
// // // // // // //               <div className="flex-1 h-4 bg-slate-100 rounded" />
// // // // // // //             </div>
// // // // // // //           );
// // // // // // //           if (block.type === "footer") return (
// // // // // // //             <div key={i} className="h-1 bg-slate-100 rounded w-full" />
// // // // // // //           );
// // // // // // //           return (
// // // // // // //             <div key={i} className="space-y-0.5">
// // // // // // //               <div className="h-1 bg-slate-200 rounded w-full" />
// // // // // // //               <div className="h-1 bg-slate-200 rounded w-4/5" />
// // // // // // //               <div className="h-1 bg-slate-200 rounded w-3/5" />
// // // // // // //             </div>
// // // // // // //           );
// // // // // // //         })}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // // ✅ NEW: Generative Preview Component
// // // // // // // const GenerativePreview = ({ data }) => {
// // // // // // //   // Fallback styles if some fields are missing
// // // // // // //   const bgColor = data.bgColor || "#1a1a2e";
// // // // // // //   const logoColor = data.logoColor || "#ffffff";
// // // // // // //   const accentColor = data.accentColor || "#f5a623";
// // // // // // //   const logo = data.logo || "";
// // // // // // //   const title = data.title || "";
// // // // // // //   const subtitle = data.subtitle || "";
// // // // // // //   const headerImg = data.headerImg || null;

// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       style={{
// // // // // // //         background: bgColor,
// // // // // // //         color: logoColor,
// // // // // // //         padding: "10px",
// // // // // // //         borderRadius: "12px",
// // // // // // //         height: "160px",
// // // // // // //         width: "100%",
// // // // // // //         overflow: "hidden",
// // // // // // //         display: "flex",
// // // // // // //         flexDirection: "column",
// // // // // // //         fontFamily: "system-ui, -apple-system, sans-serif",
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       {logo && (
// // // // // // //         <div
// // // // // // //           style={{
// // // // // // //             fontWeight: "bold",
// // // // // // //             fontSize: "11px",
// // // // // // //             marginBottom: "4px",
// // // // // // //             letterSpacing: "0.5px",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {logo}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //       {headerImg && (
// // // // // // //         <img
// // // // // // //           src={headerImg}
// // // // // // //           alt="header"
// // // // // // //           style={{
// // // // // // //             width: "100%",
// // // // // // //             height: "50px",
// // // // // // //             objectFit: "cover",
// // // // // // //             borderRadius: "6px",
// // // // // // //             marginBottom: "6px",
// // // // // // //           }}
// // // // // // //         />
// // // // // // //       )}
// // // // // // //       {title && (
// // // // // // //         <div
// // // // // // //           style={{
// // // // // // //             fontWeight: "bold",
// // // // // // //             fontSize: "12px",
// // // // // // //             marginTop: "4px",
// // // // // // //             lineHeight: 1.2,
// // // // // // //             overflow: "hidden",
// // // // // // //             textOverflow: "ellipsis",
// // // // // // //             whiteSpace: "nowrap",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {title}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //       {subtitle && (
// // // // // // //         <div
// // // // // // //           style={{
// // // // // // //             fontSize: "9px",
// // // // // // //             color: accentColor,
// // // // // // //             marginTop: "2px",
// // // // // // //             overflow: "hidden",
// // // // // // //             textOverflow: "ellipsis",
// // // // // // //             whiteSpace: "nowrap",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {subtitle}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // // Mini WhatsApp Preview — actual body text render
// // // // // // // const MiniWAPreview = ({ content }) => {
// // // // // // //   let wa = {};
// // // // // // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // // // // // //   const body = wa.body || "";
// // // // // // //   if (!body) return <WAThumb />;
// // // // // // //   return (
// // // // // // //     <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // // // // //       <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// // // // // // //         <div className="w-3 h-3 rounded-full bg-[#25d366]" />
// // // // // // //         <div className="text-[6px] font-bold text-white">WhatsApp</div>
// // // // // // //       </div>
// // // // // // //       <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
// // // // // // //         <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
// // // // // // //           {wa.header && (
// // // // // // //             <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">
// // // // // // //               {wa.header}
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //           <div className="text-[6px] text-slate-600 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
// // // // // // //             {body.substring(0, 100)}
// // // // // // //           </div>
// // // // // // //           {wa.actions && wa.actions.length > 0 && (
// // // // // // //             <div className="mt-1 border-t border-slate-100 pt-0.5">
// // // // // // //               <div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">
// // // // // // //                 {wa.actions[0].name}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const WAStatusBadge = ({ status }) => {
// // // // // // //   if (!status) return null;
// // // // // // //   if (status === "pending_review" || status === "pending")
// // // // // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">⏳ Pending Review</span>;
// // // // // // //   if (status === "active")
// // // // // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">✓ Active</span>;
// // // // // // //   return null;
// // // // // // // };

// // // // // // // const TemplateCard = ({ tpl, onEdit, onDuplicate, onDelete }) => {
// // // // // // //   const isWA = tpl.type === "whatsapp";
// // // // // // //   const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
// // // // // // //   const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

// // // // // // //   // Detect if this is a generative email template
// // // // // // //   let isGenerative = false;
// // // // // // //   let generativeData = null;
// // // // // // //   if (!isWA && tpl.content) {
// // // // // // //     try {
// // // // // // //       const parsed = JSON.parse(tpl.content);
// // // // // // //       if (parsed && parsed.layout) {
// // // // // // //         isGenerative = true;
// // // // // // //         generativeData = parsed;
// // // // // // //       }
// // // // // // //     } catch (e) {}
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
// // // // // // //       {/* Preview area */}
// // // // // // //       <div
// // // // // // //         onClick={onEdit}
// // // // // // //         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
// // // // // // //       >
// // // // // // //         {isWA ? (
// // // // // // //           <MiniWAPreview content={tpl.content} />
// // // // // // //         ) : isGenerative ? (
// // // // // // //           <GenerativePreview data={generativeData} />
// // // // // // //         ) : (
// // // // // // //           <MiniEmailPreview content={tpl.content} />
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       <div onClick={onEdit} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
// // // // // // //         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
// // // // // // //         <div className="flex flex-wrap items-center gap-1.5 mb-2">
// // // // // // //           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
// // // // // // //             {isWA ? "💬 WhatsApp" : "✉️ Email"}
// // // // // // //           </span>
// // // // // // //           {tpl.category && (
// // // // // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{tpl.category}</span>
// // // // // // //           )}
// // // // // // //           {isGenerative && (
// // // // // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">✨ Generative</span>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //         <WAStatusBadge status={isWA ? tpl.status : null} />
// // // // // // //         <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
// // // // // // //       </div>

// // // // // // //       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
// // // // // // //         <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
// // // // // // //         <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
// // // // // // //         <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const StatCard = ({ label, value, icon, color }) => (
// // // // // // //   <div className={`rounded-2xl p-4 border ${color}`}>
// // // // // // //     <div className="flex items-center gap-2 mb-1">
// // // // // // //       <span className="text-lg">{icon}</span>
// // // // // // //       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
// // // // // // //     </div>
// // // // // // //     <p className="text-2xl font-bold text-slate-900">{value}</p>
// // // // // // //   </div>
// // // // // // // );

// // // // // // // // Channel Selection Modal
// // // // // // // const ChannelSelectModal = ({ onSelect, onClose }) => (
// // // // // // //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // // // // //     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
// // // // // // //       <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
// // // // // // //       <p className="text-sm text-slate-500 mb-6">Which channel is this template for?</p>
// // // // // // //       <div className="flex gap-4 mb-6">
// // // // // // //         <button
// // // // // // //           onClick={() => onSelect("email")}
// // // // // // //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
// // // // // // //         >
// // // // // // //           <span className="text-4xl">✉️</span>
// // // // // // //           <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
// // // // // // //           <span className="text-xs text-slate-400 text-center">Drag & drop email builder with blocks</span>
// // // // // // //         </button>
// // // // // // //         <button
// // // // // // //           onClick={() => onSelect("whatsapp")}
// // // // // // //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
// // // // // // //         >
// // // // // // //           <span className="text-4xl">💬</span>
// // // // // // //           <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
// // // // // // //           <span className="text-xs text-slate-400 text-center">WhatsApp Business template with CTA</span>
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
// // // // // // //     </div>
// // // // // // //   </div>
// // // // // // // );

// // // // // // // export default function TemplateLibraryPage() {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const [templates, setTemplates] = useState([]);
// // // // // // //   const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // // // // //   const [editingId, setEditingId] = useState(undefined);
// // // // // // //   const [selectedChannel, setSelectedChannel] = useState("email");
// // // // // // //   const [showChannelModal, setShowChannelModal] = useState(false);
// // // // // // //   const [channel, setChannel] = useState("");
// // // // // // //   const [category, setCategory] = useState("All Categories");
// // // // // // //   const [search, setSearch] = useState("");
// // // // // // //   const [catOpen, setCatOpen] = useState(false);
// // // // // // //   const [deleteTarget, setDeleteTarget] = useState(null);
// // // // // // //   const [toast, setToast] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const catRef = useRef();

// // // // // // //   const fetchTemplates = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const params = new URLSearchParams();
// // // // // // //       if (channel) params.append("type", channel);
// // // // // // //       if (category !== "All Categories") params.append("category", category);
// // // // // // //       if (search) params.append("search", search);
// // // // // // //       const res = await fetch(`${API}/?${params}`);
// // // // // // //       const data = await res.json();
// // // // // // //       setTemplates(data.data || []);
// // // // // // //       setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // // // // //     } catch (err) {
// // // // // // //       showToast("Failed to load templates", "error");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => { fetchTemplates(); }, [channel, category, search]);

// // // // // // //   useEffect(() => {
// // // // // // //     fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
// // // // // // //       .then((r) => r.json())
// // // // // // //       .then((data) => { if (data.synced?.length > 0) fetchTemplates(); })
// // // // // // //       .catch(() => {});
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
// // // // // // //     document.addEventListener("mousedown", handler);
// // // // // // //     return () => document.removeEventListener("mousedown", handler);
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
// // // // // // //   }, [toast]);

// // // // // // //   const showToast = (message, type = "success") => setToast({ message, type });

// // // // // // //   const handleDuplicate = async (tpl) => {
// // // // // // //     try {
// // // // // // //       const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
// // // // // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl.name}" duplicated`); }
// // // // // // //     } catch { showToast("Failed to duplicate", "error"); }
// // // // // // //   };

// // // // // // //   const confirmDelete = async () => {
// // // // // // //     const tpl = templates.find((t) => t.id === deleteTarget);
// // // // // // //     try {
// // // // // // //       const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
// // // // // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl?.name}" deleted`, "error"); }
// // // // // // //     } catch { showToast("Failed to delete", "error"); }
// // // // // // //     setDeleteTarget(null);
// // // // // // //   };

// // // // // // //   const handleChannelSelect = (ch) => {
// // // // // // //     setSelectedChannel(ch);
// // // // // // //     setShowChannelModal(false);
// // // // // // //     setEditingId(null);
// // // // // // //   };

// // // // // // //   // Edit handler for a template (passed to TemplateCard)
// // // // // // //   const handleTemplateEdit = (tpl) => {
// // // // // // //     try {
// // // // // // //       const data = JSON.parse(tpl.content || "{}");
// // // // // // //       // If it's a generative email template (has layout field), open EmailBuilder
// // // // // // //       if (data.layout) {
// // // // // // //         navigate(`/email-builder?template=${data.layout}`);
// // // // // // //         return;
// // // // // // //       }
// // // // // // //     } catch (e) {
// // // // // // //       console.error(e);
// // // // // // //     }
// // // // // // //     // Otherwise open normal block editor
// // // // // // //     setSelectedChannel(tpl.type || "email");
// // // // // // //     setEditingId(tpl.id);
// // // // // // //   };

// // // // // // //   if (editingId !== undefined) {
// // // // // // //     return (
// // // // // // //       <TemplateEditorPage
// // // // // // //         templateId={editingId}
// // // // // // //         initialChannel={selectedChannel}
// // // // // // //         onBack={() => { fetchTemplates(); setEditingId(undefined); }}
// // // // // // //       />
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">

// // // // // // //       {showChannelModal && (
// // // // // // //         <ChannelSelectModal
// // // // // // //           onSelect={handleChannelSelect}
// // // // // // //           onClose={() => setShowChannelModal(false)}
// // // // // // //         />
// // // // // // //       )}

// // // // // // //       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
// // // // // // //         <div className="flex items-center gap-3">
// // // // // // //           <button
// // // // // // //             onClick={() => navigate("/dashboard")}
// // // // // // //             className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
// // // // // // //           >
// // // // // // //             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
// // // // // // //               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
// // // // // // //             </svg>
// // // // // // //           </button>
// // // // // // //           <div>
// // // // // // //             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
// // // // // // //             <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //         <button
// // // // // // //           onClick={() => setShowChannelModal(true)}
// // // // // // //           className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
// // // // // // //         >
// // // // // // //           + Create Template
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // // // // // //         <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
// // // // // // //         <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
// // // // // // //         <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
// // // // // // //         <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
// // // // // // //       </div>

// // // // // // //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// // // // // // //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// // // // // // //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// // // // // // //             {CHANNEL_TABS.map((tab) => (
// // // // // // //               <button
// // // // // // //                 key={tab.value}
// // // // // // //                 onClick={() => setChannel(tab.value)}
// // // // // // //                 className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
// // // // // // //               >
// // // // // // //                 {tab.label}
// // // // // // //               </button>
// // // // // // //             ))}
// // // // // // //           </div>

// // // // // // //           <div className="relative" ref={catRef}>
// // // // // // //             <button
// // // // // // //               onClick={() => setCatOpen((o) => !o)}
// // // // // // //               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
// // // // // // //             >
// // // // // // //               {category} <span className="text-slate-400 text-[10px]">▾</span>
// // // // // // //             </button>
// // // // // // //             {catOpen && (
// // // // // // //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
// // // // // // //                 {CATEGORIES.map((c) => (
// // // // // // //                   <div
// // // // // // //                     key={c}
// // // // // // //                     onClick={() => { setCategory(c); setCatOpen(false); }}
// // // // // // //                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
// // // // // // //                   >
// // // // // // //                     {c}
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>

// // // // // // //           <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

// // // // // // //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
// // // // // // //             <span className="text-slate-400 text-sm">🔍</span>
// // // // // // //             <input
// // // // // // //               value={search}
// // // // // // //               onChange={(e) => setSearch(e.target.value)}
// // // // // // //               placeholder="Search templates..."
// // // // // // //               className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
// // // // // // //             />
// // // // // // //             {search && (
// // // // // // //               <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">×</button>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="p-5">
// // // // // // //           {loading ? (
// // // // // // //             <div className="text-center py-16 text-slate-400">Loading templates...</div>
// // // // // // //           ) : templates.length === 0 ? (
// // // // // // //             <div className="text-center py-16">
// // // // // // //               <div className="text-4xl mb-3">🗂</div>
// // // // // // //               <p className="text-sm font-semibold text-slate-700">No templates found</p>
// // // // // // //               <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
// // // // // // //             </div>
// // // // // // //           ) : (
// // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// // // // // // //               {templates.map((tpl) => (
// // // // // // //                 <TemplateCard
// // // // // // //                   key={tpl.id}
// // // // // // //                   tpl={tpl}
// // // // // // //                   onEdit={() => handleTemplateEdit(tpl)}
// // // // // // //                   onDuplicate={() => handleDuplicate(tpl)}
// // // // // // //                   onDelete={() => setDeleteTarget(tpl.id)}
// // // // // // //                 />
// // // // // // //               ))}
// // // // // // //               <div
// // // // // // //                 onClick={() => setShowChannelModal(true)}
// // // // // // //                 className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
// // // // // // //               >
// // // // // // //                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
// // // // // // //                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
// // // // // // //                 </div>
// // // // // // //                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <ConfirmDialog
// // // // // // //         isOpen={!!deleteTarget}
// // // // // // //         onClose={() => setDeleteTarget(null)}
// // // // // // //         onConfirm={confirmDelete}
// // // // // // //         title="Delete Template"
// // // // // // //         message="Are you sure you want to delete this template? This action cannot be undone."
// // // // // // //       />
// // // // // // //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }



// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import TemplateEditorPage from "./TemplateEditorPage";

// // // // // // const API = "https://wynreach-backend.onrender.com/api/templates";

// // // // // // const CHANNEL_TABS = [
// // // // // //   { label: "All", value: "" },
// // // // // //   { label: "Email", value: "email" },
// // // // // //   { label: "WhatsApp", value: "whatsapp" },
// // // // // // ];
// // // // // // const CATEGORIES = [
// // // // // //   "All Categories",
// // // // // //   "Marketing",
// // // // // //   "Utility",
// // // // // //   "Authentication",
// // // // // //   "Promotional",
// // // // // //   "Transactional",
// // // // // //   "Onboarding",
// // // // // //   "Announcement",
// // // // // //   "Re-engagement",
// // // // // // ];

// // // // // // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// // // // // //   if (!isOpen) return null;
// // // // // //   return (
// // // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // // // //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
// // // // // //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// // // // // //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// // // // // //         <div className="flex gap-3">
// // // // // //           <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// // // // // //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const Toast = ({ message, type = "success", onClose }) => (
// // // // // //   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
// // // // // //     <span>{type === "success" ? "✓" : "✕"}</span>
// // // // // //     {message}
// // // // // //     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
// // // // // //   </div>
// // // // // // );

// // // // // // // ---------- Helper to parse template content ----------
// // // // // // const parseTemplateContent = (content) => {
// // // // // //   if (!content) return { isGenerative: false, blocks: [], generativeData: null };
// // // // // //   try {
// // // // // //     const parsed = JSON.parse(content);
// // // // // //     if (Array.isArray(parsed)) {
// // // // // //       return { isGenerative: false, blocks: parsed, generativeData: null };
// // // // // //     }
// // // // // //     if (parsed && parsed.layout) {
// // // // // //       return { isGenerative: true, blocks: [], generativeData: parsed };
// // // // // //     }
// // // // // //     return { isGenerative: false, blocks: [], generativeData: null };
// // // // // //   } catch (e) {
// // // // // //     return { isGenerative: false, blocks: [], generativeData: null };
// // // // // //   }
// // // // // // };

// // // // // // // ---------- Full email preview for generative templates ----------
// // // // // // const GenerativeFullPreview = ({ data }) => {
// // // // // //   if (!data) return null;
// // // // // //   return (
// // // // // //     <div
// // // // // //       style={{
// // // // // //         background: data.bgColor || "#ffffff",
// // // // // //         fontFamily: data.font || "Arial, sans-serif",
// // // // // //         padding: "30px",
// // // // // //         borderRadius: "12px",
// // // // // //         border: "1px solid #e2e8f0",
// // // // // //         maxWidth: "700px",
// // // // // //         margin: "0 auto",
// // // // // //       }}
// // // // // //     >
// // // // // //       {data.logo && (
// // // // // //         <div style={{ color: data.logoColor || "#000000", fontSize: "28px", fontWeight: 700, marginBottom: "20px", textAlign: data.logoAlign || "center" }}>
// // // // // //           {data.logo}
// // // // // //         </div>
// // // // // //       )}
// // // // // //       {data.headerImg && (
// // // // // //         <img src={data.headerImg} alt="Header" style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }} />
// // // // // //       )}
// // // // // //       {data.tag && (
// // // // // //         <div style={{ display: "inline-block", background: data.accentColor || "#4f46e5", color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, marginBottom: "15px" }}>
// // // // // //           {data.tag}
// // // // // //         </div>
// // // // // //       )}
// // // // // //       <h1 style={{ color: data.logoColor || "#000000", fontSize: "38px", marginBottom: "10px", fontWeight: 700 }}>{data.title}</h1>
// // // // // //       {data.subtitle && (
// // // // // //         <h3 style={{ color: data.accentColor || "#4f46e5", marginBottom: "20px", fontSize: "18px" }}>{data.subtitle}</h3>
// // // // // //       )}
// // // // // //       <p style={{ color: data.logoColor || "#333333", lineHeight: 1.8, fontSize: "16px", whiteSpace: "pre-wrap", marginBottom: "20px" }}>{data.body}</p>
// // // // // //       {data.buttonText && (
// // // // // //         <div style={{ marginTop: "30px", textAlign: "center" }}>
// // // // // //           <span style={{ background: data.buttonColor || data.accentColor || "#4f46e5", color: data.buttonTextColor || "#ffffff", padding: "14px 30px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, display: "inline-block" }}>
// // // // // //             {data.buttonText}
// // // // // //           </span>
// // // // // //         </div>
// // // // // //       )}
// // // // // //       {data.footerText && (
// // // // // //         <div style={{ marginTop: "40px", fontSize: "13px", opacity: 0.7, color: data.logoColor || "#666666", textAlign: "center", borderTop: `1px solid ${data.accentColor || "#e2e8f0"}40`, paddingTop: "20px" }}>
// // // // // //           {data.footerText}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // ---------- Full email preview for block‑based templates ----------
// // // // // // const BlockFullPreview = ({ blocks }) => {
// // // // // //   const safeBlocks = Array.isArray(blocks) ? blocks : [];
// // // // // //   if (safeBlocks.length === 0) return <div className="text-center py-8">No content</div>;

// // // // // //   const EmailBlockContent = ({ block }) => {
// // // // // //     const p = block.props;
// // // // // //     switch (block.type) {
// // // // // //       case "header":
// // // // // //         return <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: "bold", padding: "8px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// // // // // //       case "text":
// // // // // //         return <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: "8px 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap" }}>{p.text}</p>;
// // // // // //       case "image":
// // // // // //         return <img src={p.url} alt={p.alt} style={{ width: "100%", borderRadius: 8, display: "block", margin: "12px 0" }} />;
// // // // // //       case "button":
// // // // // //         return <div style={{ textAlign: "center", margin: "14px 0" }}><span style={{ display: "inline-block", background: p.bgColor, color: p.textColor, padding: "11px 28px", borderRadius: 7, fontWeight: "bold", fontSize: 14 }}>{p.label}</span></div>;
// // // // // //       case "columns":
// // // // // //         return <div style={{ display: "flex", gap: 12, margin: "8px 0" }}><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.left}</div><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.right}</div></div>;
// // // // // //       case "divider":
// // // // // //         return <hr style={{ border: "none", borderTop: `1px solid ${p.color}`, margin: "14px 0" }} />;
// // // // // //       case "footer":
// // // // // //         return <div style={{ textAlign: "center", color: p.color, fontSize: p.fontSize, padding: "10px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// // // // // //       default:
// // // // // //         return null;
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", background: "#fff", maxWidth: "700px", margin: "0 auto" }}>
// // // // // //       {safeBlocks.map((block, idx) => (
// // // // // //         <EmailBlockContent key={idx} block={block} />
// // // // // //       ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // ---------- WhatsApp full preview ----------
// // // // // // const WhatsAppFullPreview = ({ content }) => {
// // // // // //   let wa = {};
// // // // // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // // // // //   return (
// // // // // //     <div className="bg-[#e5ddd5] p-4 rounded-xl" style={{ maxWidth: "500px", margin: "0 auto" }}>
// // // // // //       <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow border border-slate-100">
// // // // // //         <div className="bg-[#075e54] px-4 py-2 flex items-center gap-2">
// // // // // //           <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">A</div>
// // // // // //           <div className="text-white text-xs font-semibold">Business Name</div>
// // // // // //         </div>
// // // // // //         <div className="p-4">
// // // // // //           {wa.header && <div className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">{wa.header}</div>}
// // // // // //           <p className="text-sm text-slate-700 whitespace-pre-wrap">{wa.body || "No message content"}</p>
// // // // // //           {wa.actions?.length > 0 && (
// // // // // //             <div className="mt-3 border-t pt-2">
// // // // // //               {wa.actions.map((act, i) => (
// // // // // //                 <div key={i} className="text-sm font-semibold text-[#00a5f4] text-center py-1">{act.name}</div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // ---------- Preview Modal Component ----------
// // // // // // const TemplatePreviewModal = ({ tpl, onClose }) => {
// // // // // //   const isWA = tpl.type === "whatsapp";
// // // // // //   const parsed = parseTemplateContent(tpl.content);

// // // // // //   return (
// // // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-auto">
// // // // // //       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
// // // // // //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// // // // // //           <div>
// // // // // //             <h2 className="text-lg font-bold text-slate-800">{tpl.name}</h2>
// // // // // //             <p className="text-xs text-slate-500">{isWA ? "WhatsApp Template" : "Email Template"}</p>
// // // // // //           </div>
// // // // // //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// // // // // //         </div>
// // // // // //         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
// // // // // //           {isWA ? (
// // // // // //             <WhatsAppFullPreview content={tpl.content} />
// // // // // //           ) : parsed.isGenerative ? (
// // // // // //             <GenerativeFullPreview data={parsed.generativeData} />
// // // // // //           ) : (
// // // // // //             <BlockFullPreview blocks={parsed.blocks} />
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // ---------- Mini previews for cards (unchanged) ----------
// // // // // // const EmailThumb = () => {
// // // // // //   const accent = "#6366f1";
// // // // // //   return (
// // // // // //     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
// // // // // //       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
// // // // // //       <div className="h-5 bg-slate-200 rounded" />
// // // // // //       <div className="space-y-0.5">
// // // // // //         <div className="h-1 bg-slate-200 rounded" />
// // // // // //         <div className="h-1 bg-slate-200 rounded w-3/4" />
// // // // // //       </div>
// // // // // //       <div className="flex gap-1">
// // // // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // // // //       </div>
// // // // // //       <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const WAThumb = () => (
// // // // // //   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // // // //     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// // // // // //       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
// // // // // //       <div className="text-[7px] font-bold text-white">WhatsApp</div>
// // // // // //     </div>
// // // // // //     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
// // // // // //       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
// // // // // //         <div className="h-1 bg-green-400 rounded w-full" />
// // // // // //         <div className="h-1 bg-green-300 rounded w-4/5" />
// // // // // //         <div className="h-1 bg-green-300 rounded w-3/5" />
// // // // // //       </div>
// // // // // //       <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
// // // // // //     </div>
// // // // // //   </div>
// // // // // // );

// // // // // // const MiniEmailPreview = ({ content }) => {
// // // // // //   let blocks = [];
// // // // // //   try { blocks = JSON.parse(content || "[]"); } catch { }
// // // // // //   if (!blocks.length) return <EmailThumb />;
// // // // // //   return (
// // // // // //     <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
// // // // // //       <div className="bg-indigo-600 px-2 py-1"><div className="h-1 bg-indigo-300 rounded w-3/4" /></div>
// // // // // //       <div className="p-1.5 space-y-1">
// // // // // //         {blocks.slice(0, 5).map((block, i) => {
// // // // // //           const p = block.props || {};
// // // // // //           if (block.type === "header") return <div key={i} className="h-2 rounded" style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }} />;
// // // // // //           if (block.type === "image") return <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center"><span className="text-[8px] text-indigo-300">IMG</span></div>;
// // // // // //           if (block.type === "button") return <div key={i} className="h-3 rounded mx-auto w-16 flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span></div>;
// // // // // //           if (block.type === "divider") return <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />;
// // // // // //           if (block.type === "columns") return <div key={i} className="flex gap-0.5"><div className="flex-1 h-4 bg-slate-100 rounded" /><div className="flex-1 h-4 bg-slate-100 rounded" /></div>;
// // // // // //           if (block.type === "footer") return <div key={i} className="h-1 bg-slate-100 rounded w-full" />;
// // // // // //           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /><div className="h-1 bg-slate-200 rounded w-3/5" /></div>;
// // // // // //         })}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const GenerativePreview = ({ data }) => {
// // // // // //   const bgColor = data.bgColor || "#1a1a2e";
// // // // // //   const logoColor = data.logoColor || "#ffffff";
// // // // // //   const accentColor = data.accentColor || "#f5a623";
// // // // // //   const logo = data.logo || "";
// // // // // //   const title = data.title || "";
// // // // // //   const subtitle = data.subtitle || "";
// // // // // //   const headerImg = data.headerImg || null;
// // // // // //   return (
// // // // // //     <div style={{ background: bgColor, color: logoColor, padding: "10px", borderRadius: "12px", height: "160px", width: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
// // // // // //       {logo && <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>{logo}</div>}
// // // // // //       {headerImg && <img src={headerImg} alt="header" style={{ width: "100%", height: "50px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />}
// // // // // //       {title && <div style={{ fontWeight: "bold", fontSize: "12px", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>}
// // // // // //       {subtitle && <div style={{ fontSize: "9px", color: accentColor, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</div>}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const MiniWAPreview = ({ content }) => {
// // // // // //   let wa = {};
// // // // // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // // // // //   const body = wa.body || "";
// // // // // //   if (!body) return <WAThumb />;
// // // // // //   return (
// // // // // //     <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // // // //       <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#25d366]" /><div className="text-[6px] font-bold text-white">WhatsApp</div></div>
// // // // // //       <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
// // // // // //         <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
// // // // // //           {wa.header && <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">{wa.header}</div>}
// // // // // //           <div className="text-[6px] text-slate-600 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{body.substring(0, 100)}</div>
// // // // // //           {wa.actions?.length > 0 && <div className="mt-1 border-t border-slate-100 pt-0.5"><div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">{wa.actions[0].name}</div></div>}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const WAStatusBadge = ({ status }) => {
// // // // // //   if (!status) return null;
// // // // // //   if (status === "pending_review" || status === "pending")
// // // // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">⏳ Pending Review</span>;
// // // // // //   if (status === "active")
// // // // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">✓ Active</span>;
// // // // // //   return null;
// // // // // // };

// // // // // // // ---------- Template Card – card click opens preview, edit button navigates ----------
// // // // // // const TemplateCard = ({ tpl, onPreview, onEdit, onDuplicate, onDelete }) => {
// // // // // //   const isWA = tpl.type === "whatsapp";
// // // // // //   const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
// // // // // //   const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

// // // // // //   let isGenerative = false;
// // // // // //   let generativeData = null;
// // // // // //   if (!isWA && tpl.content) {
// // // // // //     try {
// // // // // //       const parsed = JSON.parse(tpl.content);
// // // // // //       if (parsed && parsed.layout) {
// // // // // //         isGenerative = true;
// // // // // //         generativeData = parsed;
// // // // // //       }
// // // // // //     } catch (e) {}
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
// // // // // //       {/* Preview area – click opens modal */}
// // // // // //       <div
// // // // // //         onClick={onPreview}
// // // // // //         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
// // // // // //       >
// // // // // //         {isWA ? (
// // // // // //           <MiniWAPreview content={tpl.content} />
// // // // // //         ) : isGenerative ? (
// // // // // //           <GenerativePreview data={generativeData} />
// // // // // //         ) : (
// // // // // //           <MiniEmailPreview content={tpl.content} />
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Text area – also click opens modal */}
// // // // // //       <div onClick={onPreview} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
// // // // // //         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
// // // // // //         <div className="flex flex-wrap items-center gap-1.5 mb-2">
// // // // // //           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
// // // // // //             {isWA ? "💬 WhatsApp" : "✉️ Email"}
// // // // // //           </span>
// // // // // //           {tpl.category && (
// // // // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{tpl.category}</span>
// // // // // //           )}
// // // // // //           {isGenerative && (
// // // // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">✨ Generative</span>
// // // // // //           )}
// // // // // //         </div>
// // // // // //         <WAStatusBadge status={isWA ? tpl.status : null} />
// // // // // //         <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
// // // // // //       </div>

// // // // // //       {/* Buttons – edit navigates, duplicate/delete stay the same */}
// // // // // //       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
// // // // // //         <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
// // // // // //         <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
// // // // // //         <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const StatCard = ({ label, value, icon, color }) => (
// // // // // //   <div className={`rounded-2xl p-4 border ${color}`}>
// // // // // //     <div className="flex items-center gap-2 mb-1">
// // // // // //       <span className="text-lg">{icon}</span>
// // // // // //       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
// // // // // //     </div>
// // // // // //     <p className="text-2xl font-bold text-slate-900">{value}</p>
// // // // // //   </div>
// // // // // // );

// // // // // // const ChannelSelectModal = ({ onSelect, onClose }) => (
// // // // // //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // // // //     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
// // // // // //       <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
// // // // // //       <p className="text-sm text-slate-500 mb-6">Which channel is this template for?</p>
// // // // // //       <div className="flex gap-4 mb-6">
// // // // // //         <button onClick={() => onSelect("email")} className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
// // // // // //           <span className="text-4xl">✉️</span>
// // // // // //           <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
// // // // // //           <span className="text-xs text-slate-400 text-center">Drag & drop email builder with blocks</span>
// // // // // //         </button>
// // // // // //         <button onClick={() => onSelect("whatsapp")} className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group">
// // // // // //           <span className="text-4xl">💬</span>
// // // // // //           <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
// // // // // //           <span className="text-xs text-slate-400 text-center">WhatsApp Business template with CTA</span>
// // // // // //         </button>
// // // // // //       </div>
// // // // // //       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
// // // // // //     </div>
// // // // // //   </div>
// // // // // // );

// // // // // // export default function TemplateLibraryPage() {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [templates, setTemplates] = useState([]);
// // // // // //   const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // // // //   const [editingId, setEditingId] = useState(undefined);
// // // // // //   const [selectedChannel, setSelectedChannel] = useState("email");
// // // // // //   const [showChannelModal, setShowChannelModal] = useState(false);
// // // // // //   const [channel, setChannel] = useState("");
// // // // // //   const [category, setCategory] = useState("All Categories");
// // // // // //   const [search, setSearch] = useState("");
// // // // // //   const [catOpen, setCatOpen] = useState(false);
// // // // // //   const [deleteTarget, setDeleteTarget] = useState(null);
// // // // // //   const [toast, setToast] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [previewTpl, setPreviewTpl] = useState(null); // for modal
// // // // // //   const catRef = useRef();

// // // // // //   const fetchTemplates = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const params = new URLSearchParams();
// // // // // //       if (channel) params.append("type", channel);
// // // // // //       if (category !== "All Categories") params.append("category", category);
// // // // // //       if (search) params.append("search", search);
// // // // // //       const res = await fetch(`${API}/?${params}`);
// // // // // //       const data = await res.json();
// // // // // //       setTemplates(data.data || []);
// // // // // //       setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // // // //     } catch (err) {
// // // // // //       showToast("Failed to load templates", "error");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => { fetchTemplates(); }, [channel, category, search]);

// // // // // //   useEffect(() => {
// // // // // //     fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
// // // // // //       .then((r) => r.json())
// // // // // //       .then((data) => { if (data.synced?.length > 0) fetchTemplates(); })
// // // // // //       .catch(() => {});
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
// // // // // //     document.addEventListener("mousedown", handler);
// // // // // //     return () => document.removeEventListener("mousedown", handler);
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
// // // // // //   }, [toast]);

// // // // // //   const showToast = (message, type = "success") => setToast({ message, type });

// // // // // //   const handleDuplicate = async (tpl) => {
// // // // // //     try {
// // // // // //       const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
// // // // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl.name}" duplicated`); }
// // // // // //     } catch { showToast("Failed to duplicate", "error"); }
// // // // // //   };

// // // // // //   const confirmDelete = async () => {
// // // // // //     const tpl = templates.find((t) => t.id === deleteTarget);
// // // // // //     try {
// // // // // //       const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
// // // // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl?.name}" deleted`, "error"); }
// // // // // //     } catch { showToast("Failed to delete", "error"); }
// // // // // //     setDeleteTarget(null);
// // // // // //   };

// // // // // //   const handleChannelSelect = (ch) => {
// // // // // //     setSelectedChannel(ch);
// // // // // //     setShowChannelModal(false);
// // // // // //     setEditingId(null);
// // // // // //   };

// // // // // //   // Edit button click – navigates to editor
// // // // // //   const handleTemplateEdit = (tpl) => {
// // // // // //     try {
// // // // // //       const data = JSON.parse(tpl.content || "{}");
// // // // // //       if (data.layout) {
// // // // // //         navigate(`/email-builder?template=${data.layout}`);
// // // // // //         return;
// // // // // //       }
// // // // // //     } catch (e) {}
// // // // // //     setSelectedChannel(tpl.type || "email");
// // // // // //     setEditingId(tpl.id);
// // // // // //   };

// // // // // //   // Card click – opens preview modal
// // // // // //   const handlePreview = (tpl) => {
// // // // // //     setPreviewTpl(tpl);
// // // // // //   };

// // // // // //   if (editingId !== undefined) {
// // // // // //     return (
// // // // // //       <TemplateEditorPage
// // // // // //         templateId={editingId}
// // // // // //         initialChannel={selectedChannel}
// // // // // //         onBack={() => { fetchTemplates(); setEditingId(undefined); }}
// // // // // //       />
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
// // // // // //       {showChannelModal && <ChannelSelectModal onSelect={handleChannelSelect} onClose={() => setShowChannelModal(false)} />}
// // // // // //       {previewTpl && <TemplatePreviewModal tpl={previewTpl} onClose={() => setPreviewTpl(null)} />}

// // // // // //       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
// // // // // //         <div className="flex items-center gap-3">
// // // // // //           <button onClick={() => navigate("/dashboard")} className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md">
// // // // // //             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
// // // // // //               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
// // // // // //             </svg>
// // // // // //           </button>
// // // // // //           <div>
// // // // // //             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
// // // // // //             <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <button onClick={() => setShowChannelModal(true)} className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0">
// // // // // //           + Create Template
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // // // // //         <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
// // // // // //         <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
// // // // // //         <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
// // // // // //         <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
// // // // // //       </div>

// // // // // //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// // // // // //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// // // // // //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// // // // // //             {CHANNEL_TABS.map((tab) => (
// // // // // //               <button key={tab.value} onClick={() => setChannel(tab.value)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
// // // // // //                 {tab.label}
// // // // // //               </button>
// // // // // //             ))}
// // // // // //           </div>

// // // // // //           <div className="relative" ref={catRef}>
// // // // // //             <button onClick={() => setCatOpen((o) => !o)} className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
// // // // // //               {category} <span className="text-slate-400 text-[10px]">▾</span>
// // // // // //             </button>
// // // // // //             {catOpen && (
// // // // // //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
// // // // // //                 {CATEGORIES.map((c) => (
// // // // // //                   <div key={c} onClick={() => { setCategory(c); setCatOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}>
// // // // // //                     {c}
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

// // // // // //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
// // // // // //             <span className="text-slate-400 text-sm">🔍</span>
// // // // // //             <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400" />
// // // // // //             {search && <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">×</button>}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="p-5">
// // // // // //           {loading ? (
// // // // // //             <div className="text-center py-16 text-slate-400">Loading templates...</div>
// // // // // //           ) : templates.length === 0 ? (
// // // // // //             <div className="text-center py-16">
// // // // // //               <div className="text-4xl mb-3">🗂</div>
// // // // // //               <p className="text-sm font-semibold text-slate-700">No templates found</p>
// // // // // //               <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// // // // // //               {templates.map((tpl) => (
// // // // // //                 <TemplateCard
// // // // // //                   key={tpl.id}
// // // // // //                   tpl={tpl}
// // // // // //                   onPreview={() => handlePreview(tpl)}
// // // // // //                   onEdit={() => handleTemplateEdit(tpl)}
// // // // // //                   onDuplicate={() => handleDuplicate(tpl)}
// // // // // //                   onDelete={() => setDeleteTarget(tpl.id)}
// // // // // //                 />
// // // // // //               ))}
// // // // // //               <div onClick={() => setShowChannelModal(true)} className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
// // // // // //                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
// // // // // //                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
// // // // // //                 </div>
// // // // // //                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Delete Template" message="Are you sure you want to delete this template? This action cannot be undone." />
// // // // // //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// // // // // //     </div>
// // // // // //   );
// // // // // // }




// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import TemplateEditorPage from "./TemplateEditorPage";

// // // // // const API = "https://wynreach-backend.onrender.com/api/templates";

// // // // // const CHANNEL_TABS = [
// // // // //   { label: "All", value: "" },
// // // // //   { label: "Email", value: "email" },
// // // // //   { label: "WhatsApp", value: "whatsapp" },
// // // // // ];
// // // // // const CATEGORIES = [
// // // // //   "All Categories",
// // // // //   "Marketing",
// // // // //   "Utility",
// // // // //   "Authentication"
 
// // // // // ];

// // // // // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// // // // //   if (!isOpen) return null;
// // // // //   return (
// // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // // //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
// // // // //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// // // // //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// // // // //         <div className="flex gap-3">
// // // // //           <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// // // // //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const Toast = ({ message, type = "success", onClose }) => (
// // // // //   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
// // // // //     <span>{type === "success" ? "✓" : "✕"}</span>
// // // // //     {message}
// // // // //     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
// // // // //   </div>
// // // // // );

// // // // // // ---------- Helper to parse template content ----------
// // // // // const parseTemplateContent = (content) => {
// // // // //   if (!content) return { isGenerative: false, blocks: [], generativeData: null };
// // // // //   try {
// // // // //     const parsed = JSON.parse(content);
// // // // //     if (Array.isArray(parsed)) {
// // // // //       return { isGenerative: false, blocks: parsed, generativeData: null };
// // // // //     }
// // // // //     if (parsed && parsed.layout) {
// // // // //       return { isGenerative: true, blocks: [], generativeData: parsed };
// // // // //     }
// // // // //     return { isGenerative: false, blocks: [], generativeData: null };
// // // // //   } catch (e) {
// // // // //     return { isGenerative: false, blocks: [], generativeData: null };
// // // // //   }
// // // // // };

// // // // // // ---------- Full email preview for generative templates ----------
// // // // // const GenerativeFullPreview = ({ data }) => {
// // // // //   if (!data) return null;
// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         background: data.bgColor || "#ffffff",
// // // // //         fontFamily: data.font || "Arial, sans-serif",
// // // // //         padding: "30px",
// // // // //         borderRadius: "12px",
// // // // //         border: "1px solid #e2e8f0",
// // // // //         maxWidth: "700px",
// // // // //         margin: "0 auto",
// // // // //       }}
// // // // //     >
// // // // //       {data.logo && (
// // // // //         <div style={{ color: data.logoColor || "#000000", fontSize: "28px", fontWeight: 700, marginBottom: "20px", textAlign: data.logoAlign || "center" }}>
// // // // //           {data.logo}
// // // // //         </div>
// // // // //       )}
// // // // //       {data.headerImg && (
// // // // //         <img src={data.headerImg} alt="Header" style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }} />
// // // // //       )}
// // // // //       {data.tag && (
// // // // //         <div style={{ display: "inline-block", background: data.accentColor || "#4f46e5", color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, marginBottom: "15px" }}>
// // // // //           {data.tag}
// // // // //         </div>
// // // // //       )}
// // // // //       <h1 style={{ color: data.logoColor || "#000000", fontSize: "38px", marginBottom: "10px", fontWeight: 700 }}>{data.title}</h1>
// // // // //       {data.subtitle && (
// // // // //         <h3 style={{ color: data.accentColor || "#4f46e5", marginBottom: "20px", fontSize: "18px" }}>{data.subtitle}</h3>
// // // // //       )}
// // // // //       <p style={{ color: data.logoColor || "#333333", lineHeight: 1.8, fontSize: "16px", whiteSpace: "pre-wrap", marginBottom: "20px" }}>{data.body}</p>
// // // // //       {data.buttonText && (
// // // // //         <div style={{ marginTop: "30px", textAlign: "center" }}>
// // // // //           <span style={{ background: data.buttonColor || data.accentColor || "#4f46e5", color: data.buttonTextColor || "#ffffff", padding: "14px 30px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, display: "inline-block" }}>
// // // // //             {data.buttonText}
// // // // //           </span>
// // // // //         </div>
// // // // //       )}
// // // // //       {data.footerText && (
// // // // //         <div style={{ marginTop: "40px", fontSize: "13px", opacity: 0.7, color: data.logoColor || "#666666", textAlign: "center", borderTop: `1px solid ${data.accentColor || "#e2e8f0"}40`, paddingTop: "20px" }}>
// // // // //           {data.footerText}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // ---------- Full email preview for block‑based templates ----------
// // // // // const BlockFullPreview = ({ blocks }) => {
// // // // //   const safeBlocks = Array.isArray(blocks) ? blocks : [];
// // // // //   if (safeBlocks.length === 0) return <div className="text-center py-8">No content</div>;

// // // // //   const EmailBlockContent = ({ block }) => {
// // // // //     const p = block.props;
// // // // //     switch (block.type) {
// // // // //       case "header":
// // // // //         return <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: "bold", padding: "8px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// // // // //       case "text":
// // // // //         return <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: "8px 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap" }}>{p.text}</p>;
// // // // //       case "image":
// // // // //         return <img src={p.url} alt={p.alt} style={{ width: "100%", borderRadius: 8, display: "block", margin: "12px 0" }} />;
// // // // //       case "button":
// // // // //         return <div style={{ textAlign: "center", margin: "14px 0" }}><span style={{ display: "inline-block", background: p.bgColor, color: p.textColor, padding: "11px 28px", borderRadius: 7, fontWeight: "bold", fontSize: 14 }}>{p.label}</span></div>;
// // // // //       case "columns":
// // // // //         return <div style={{ display: "flex", gap: 12, margin: "8px 0" }}><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.left}</div><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.right}</div></div>;
// // // // //       case "divider":
// // // // //         return <hr style={{ border: "none", borderTop: `1px solid ${p.color}`, margin: "14px 0" }} />;
// // // // //       case "footer":
// // // // //         return <div style={{ textAlign: "center", color: p.color, fontSize: p.fontSize, padding: "10px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// // // // //       default:
// // // // //         return null;
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", background: "#fff", maxWidth: "700px", margin: "0 auto" }}>
// // // // //       {safeBlocks.map((block, idx) => (
// // // // //         <EmailBlockContent key={idx} block={block} />
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // ---------- WhatsApp full preview ----------
// // // // // const WhatsAppFullPreview = ({ content }) => {
// // // // //   let wa = {};
// // // // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // // // //   return (
// // // // //     <div className="bg-[#e5ddd5] p-4 rounded-xl" style={{ maxWidth: "500px", margin: "0 auto" }}>
// // // // //       <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow border border-slate-100">
// // // // //         <div className="bg-[#075e54] px-4 py-2 flex items-center gap-2">
// // // // //           <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">A</div>
// // // // //           <div className="text-white text-xs font-semibold">Business Name</div>
// // // // //         </div>
// // // // //         <div className="p-4">
// // // // //           {wa.header && <div className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">{wa.header}</div>}
// // // // //           <p className="text-sm text-slate-700 whitespace-pre-wrap">{wa.body || "No message content"}</p>
// // // // //           {wa.actions?.length > 0 && (
// // // // //             <div className="mt-3 border-t pt-2">
// // // // //               {wa.actions.map((act, i) => (
// // // // //                 <div key={i} className="text-sm font-semibold text-[#00a5f4] text-center py-1">{act.name}</div>
// // // // //               ))}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // ---------- Preview Modal Component ----------
// // // // // const TemplatePreviewModal = ({ tpl, onClose }) => {
// // // // //   const isWA = tpl.type === "whatsapp";
// // // // //   const parsed = parseTemplateContent(tpl.content);

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-auto">
// // // // //       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
// // // // //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// // // // //           <div>
// // // // //             <h2 className="text-lg font-bold text-slate-800">{tpl.name}</h2>
// // // // //             <p className="text-xs text-slate-500">{isWA ? "WhatsApp Template" : "Email Template"}</p>
// // // // //           </div>
// // // // //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// // // // //         </div>
// // // // //         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
// // // // //           {isWA ? (
// // // // //             <WhatsAppFullPreview content={tpl.content} />
// // // // //           ) : parsed.isGenerative ? (
// // // // //             <GenerativeFullPreview data={parsed.generativeData} />
// // // // //           ) : (
// // // // //             <BlockFullPreview blocks={parsed.blocks} />
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // ---------- Mini previews for cards ----------
// // // // // const EmailThumb = () => {
// // // // //   const accent = "#6366f1";
// // // // //   return (
// // // // //     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
// // // // //       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
// // // // //       <div className="h-5 bg-slate-200 rounded" />
// // // // //       <div className="space-y-0.5">
// // // // //         <div className="h-1 bg-slate-200 rounded" />
// // // // //         <div className="h-1 bg-slate-200 rounded w-3/4" />
// // // // //       </div>
// // // // //       <div className="flex gap-1">
// // // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // // //       </div>
// // // // //       <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const WAThumb = () => (
// // // // //   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // // //     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// // // // //       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
// // // // //       <div className="text-[7px] font-bold text-white">WhatsApp</div>
// // // // //     </div>
// // // // //     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
// // // // //       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
// // // // //         <div className="h-1 bg-green-400 rounded w-full" />
// // // // //         <div className="h-1 bg-green-300 rounded w-4/5" />
// // // // //         <div className="h-1 bg-green-300 rounded w-3/5" />
// // // // //       </div>
// // // // //       <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
// // // // //     </div>
// // // // //   </div>
// // // // // );

// // // // // const MiniEmailPreview = ({ content }) => {
// // // // //   let blocks = [];
// // // // //   try { blocks = JSON.parse(content || "[]"); } catch { }
// // // // //   if (!blocks.length) return <EmailThumb />;
// // // // //   return (
// // // // //     <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
// // // // //       <div className="bg-indigo-600 px-2 py-1"><div className="h-1 bg-indigo-300 rounded w-3/4" /></div>
// // // // //       <div className="p-1.5 space-y-1">
// // // // //         {blocks.slice(0, 5).map((block, i) => {
// // // // //           const p = block.props || {};
// // // // //           if (block.type === "header") return <div key={i} className="h-2 rounded" style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }} />;
// // // // //           if (block.type === "image") return <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center"><span className="text-[8px] text-indigo-300">IMG</span></div>;
// // // // //           if (block.type === "button") return <div key={i} className="h-3 rounded mx-auto w-16 flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span></div>;
// // // // //           if (block.type === "divider") return <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />;
// // // // //           if (block.type === "columns") return <div key={i} className="flex gap-0.5"><div className="flex-1 h-4 bg-slate-100 rounded" /><div className="flex-1 h-4 bg-slate-100 rounded" /></div>;
// // // // //           if (block.type === "footer") return <div key={i} className="h-1 bg-slate-100 rounded w-full" />;
// // // // //           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /><div className="h-1 bg-slate-200 rounded w-3/5" /></div>;
// // // // //         })}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const GenerativePreview = ({ data }) => {
// // // // //   const bgColor = data.bgColor || "#1a1a2e";
// // // // //   const logoColor = data.logoColor || "#ffffff";
// // // // //   const accentColor = data.accentColor || "#f5a623";
// // // // //   const logo = data.logo || "";
// // // // //   const title = data.title || "";
// // // // //   const subtitle = data.subtitle || "";
// // // // //   const headerImg = data.headerImg || null;
// // // // //   return (
// // // // //     <div style={{ background: bgColor, color: logoColor, padding: "10px", borderRadius: "12px", height: "160px", width: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
// // // // //       {logo && <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>{logo}</div>}
// // // // //       {headerImg && <img src={headerImg} alt="header" style={{ width: "100%", height: "50px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />}
// // // // //       {title && <div style={{ fontWeight: "bold", fontSize: "12px", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>}
// // // // //       {subtitle && <div style={{ fontSize: "9px", color: accentColor, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</div>}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const MiniWAPreview = ({ content }) => {
// // // // //   let wa = {};
// // // // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // // // //   const body = wa.body || "";
// // // // //   if (!body) return <WAThumb />;
// // // // //   return (
// // // // //     <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // // //       <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#25d366]" /><div className="text-[6px] font-bold text-white">WhatsApp</div></div>
// // // // //       <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
// // // // //         <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
// // // // //           {wa.header && <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">{wa.header}</div>}
// // // // //           <div className="text-[6px] text-slate-600 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{body.substring(0, 100)}</div>
// // // // //           {wa.actions?.length > 0 && <div className="mt-1 border-t border-slate-100 pt-0.5"><div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">{wa.actions[0].name}</div></div>}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const WAStatusBadge = ({ status }) => {
// // // // //   if (!status) return null;
// // // // //   if (status === "pending_review" || status === "pending")
// // // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">⏳ Pending Review</span>;
// // // // //   if (status === "active")
// // // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">✓ Active</span>;
// // // // //   return null;
// // // // // };

// // // // // // ---------- Template Card – card click opens preview, edit button navigates ----------
// // // // // const TemplateCard = ({ tpl, onPreview, onEdit, onDuplicate, onDelete }) => {
// // // // //   const isWA = tpl.type === "whatsapp";
// // // // //   const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
// // // // //   const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

// // // // //   let isGenerative = false;
// // // // //   let generativeData = null;
// // // // //   if (!isWA && tpl.content) {
// // // // //     try {
// // // // //       const parsed = JSON.parse(tpl.content);
// // // // //       if (parsed && parsed.layout) {
// // // // //         isGenerative = true;
// // // // //         generativeData = parsed;
// // // // //       }
// // // // //     } catch (e) {}
// // // // //   }

// // // // //   return (
// // // // //     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
// // // // //       {/* Preview area – click opens modal */}
// // // // //       <div
// // // // //         onClick={onPreview}
// // // // //         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
// // // // //       >
// // // // //         {isWA ? (
// // // // //           <MiniWAPreview content={tpl.content} />
// // // // //         ) : isGenerative ? (
// // // // //           <GenerativePreview data={generativeData} />
// // // // //         ) : (
// // // // //           <MiniEmailPreview content={tpl.content} />
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Text area – also click opens modal */}
// // // // //       <div onClick={onPreview} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
// // // // //         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
// // // // //         <div className="flex flex-wrap items-center gap-1.5 mb-2">
// // // // //           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
// // // // //             {isWA ? "💬 WhatsApp" : "✉️ Email"}
// // // // //           </span>
// // // // //           {tpl.category && (
// // // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{tpl.category}</span>
// // // // //           )}
// // // // //           {isGenerative && (
// // // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">✨ Generative</span>
// // // // //           )}
// // // // //         </div>
// // // // //         <WAStatusBadge status={isWA ? tpl.status : null} />
// // // // //         <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
// // // // //       </div>

// // // // //       {/* Buttons – edit navigates, duplicate/delete stay the same */}
// // // // //       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
// // // // //         <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
// // // // //         <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
// // // // //         <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const StatCard = ({ label, value, icon, color }) => (
// // // // //   <div className={`rounded-2xl p-4 border ${color}`}>
// // // // //     <div className="flex items-center gap-2 mb-1">
// // // // //       <span className="text-lg">{icon}</span>
// // // // //       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
// // // // //     </div>
// // // // //     <p className="text-2xl font-bold text-slate-900">{value}</p>
// // // // //   </div>
// // // // // );

// // // // // const ChannelSelectModal = ({ onSelect, onClose }) => (
// // // // //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // // //     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
// // // // //       <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
// // // // //       <p className="text-sm text-slate-500 mb-6">Which channel is this template for?</p>
// // // // //       <div className="flex gap-4 mb-6">
// // // // //         <button onClick={() => onSelect("email")} className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
// // // // //           <span className="text-4xl">✉️</span>
// // // // //           <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
// // // // //           <span className="text-xs text-slate-400 text-center">Drag & drop email builder with blocks</span>
// // // // //         </button>
// // // // //         <button onClick={() => onSelect("whatsapp")} className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group">
// // // // //           <span className="text-4xl">💬</span>
// // // // //           <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
// // // // //           <span className="text-xs text-slate-400 text-center">WhatsApp Business template with CTA</span>
// // // // //         </button>
// // // // //       </div>
// // // // //       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
// // // // //     </div>
// // // // //   </div>
// // // // // );

// // // // // export default function TemplateLibraryPage() {
// // // // //   const navigate = useNavigate();
// // // // //   const [templates, setTemplates] = useState([]);
// // // // //   const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // // //   const [editingId, setEditingId] = useState(undefined);
// // // // //   const [selectedChannel, setSelectedChannel] = useState("email");
// // // // //   const [showChannelModal, setShowChannelModal] = useState(false);
// // // // //   const [channel, setChannel] = useState("");
// // // // //   const [category, setCategory] = useState("All Categories");
// // // // //   const [search, setSearch] = useState("");
// // // // //   const [catOpen, setCatOpen] = useState(false);
// // // // //   const [deleteTarget, setDeleteTarget] = useState(null);
// // // // //   const [toast, setToast] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [previewTpl, setPreviewTpl] = useState(null);
// // // // //   const catRef = useRef();

// // // // //   const fetchTemplates = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const params = new URLSearchParams();
// // // // //       if (channel) params.append("type", channel);
// // // // //       if (category !== "All Categories") params.append("category", category);
// // // // //       if (search) params.append("search", search);
// // // // //       const res = await fetch(`${API}/?${params}`);
// // // // //       const data = await res.json();
// // // // //       setTemplates(data.data || []);
// // // // //       setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // // //     } catch (err) {
// // // // //       showToast("Failed to load templates", "error");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => { fetchTemplates(); }, [channel, category, search]);

// // // // //   useEffect(() => {
// // // // //     fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
// // // // //       .then((r) => r.json())
// // // // //       .then((data) => { if (data.synced?.length > 0) fetchTemplates(); })
// // // // //       .catch(() => {});
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
// // // // //     document.addEventListener("mousedown", handler);
// // // // //     return () => document.removeEventListener("mousedown", handler);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
// // // // //   }, [toast]);

// // // // //   const showToast = (message, type = "success") => setToast({ message, type });

// // // // //   const handleDuplicate = async (tpl) => {
// // // // //     try {
// // // // //       const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
// // // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl.name}" duplicated`); }
// // // // //     } catch { showToast("Failed to duplicate", "error"); }
// // // // //   };

// // // // //   const confirmDelete = async () => {
// // // // //     const tpl = templates.find((t) => t.id === deleteTarget);
// // // // //     try {
// // // // //       const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
// // // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl?.name}" deleted`, "error"); }
// // // // //     } catch { showToast("Failed to delete", "error"); }
// // // // //     setDeleteTarget(null);
// // // // //   };

// // // // //   const handleChannelSelect = (ch) => {
// // // // //     setSelectedChannel(ch);
// // // // //     setShowChannelModal(false);
// // // // //     setEditingId(null);
// // // // //   };

// // // // //   const handleTemplateEdit = (tpl) => {
// // // // //     try {
// // // // //       const data = JSON.parse(tpl.content || "{}");
// // // // //       if (data.layout) {
// // // // //         navigate(`/email-builder?template=${data.layout}`);
// // // // //         return;
// // // // //       }
// // // // //     } catch (e) {}
// // // // //     setSelectedChannel(tpl.type || "email");
// // // // //     setEditingId(tpl.id);
// // // // //   };

// // // // //   const handlePreview = (tpl) => {
// // // // //     setPreviewTpl(tpl);
// // // // //   };

// // // // //   if (editingId !== undefined) {
// // // // //     return (
// // // // //       <TemplateEditorPage
// // // // //         templateId={editingId}
// // // // //         initialChannel={selectedChannel}
// // // // //         onBack={() => { fetchTemplates(); setEditingId(undefined); }}
// // // // //       />
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
// // // // //       {showChannelModal && <ChannelSelectModal onSelect={handleChannelSelect} onClose={() => setShowChannelModal(false)} />}
// // // // //       {previewTpl && <TemplatePreviewModal tpl={previewTpl} onClose={() => setPreviewTpl(null)} />}

// // // // //       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
// // // // //         <div className="flex items-center gap-3">
// // // // //           <button onClick={() => navigate("/dashboard")} className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md">
// // // // //             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
// // // // //               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
// // // // //             </svg>
// // // // //           </button>
// // // // //           <div>
// // // // //             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
// // // // //             <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
// // // // //           </div>
// // // // //         </div>
// // // // //         <button onClick={() => setShowChannelModal(true)} className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0">
// // // // //           + Create Template
// // // // //         </button>
// // // // //       </div>

// // // // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // // // //         <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
// // // // //         <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
// // // // //         <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
// // // // //         <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
// // // // //       </div>

// // // // //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// // // // //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// // // // //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// // // // //             {CHANNEL_TABS.map((tab) => (
// // // // //               <button key={tab.value} onClick={() => setChannel(tab.value)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
// // // // //                 {tab.label}
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>

// // // // //           <div className="relative" ref={catRef}>
// // // // //             <button onClick={() => setCatOpen((o) => !o)} className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
// // // // //               {category} <span className="text-slate-400 text-[10px]">▾</span>
// // // // //             </button>
// // // // //             {catOpen && (
// // // // //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
// // // // //                 {CATEGORIES.map((c) => (
// // // // //                   <div key={c} onClick={() => { setCategory(c); setCatOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}>
// // // // //                     {c}
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

// // // // //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
// // // // //             <span className="text-slate-400 text-sm">🔍</span>
// // // // //             <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400" />
// // // // //             {search && <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">×</button>}
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="p-5">
// // // // //           {loading ? (
// // // // //             <div className="text-center py-16 text-slate-400">Loading templates...</div>
// // // // //           ) : templates.length === 0 ? (
// // // // //             <div className="text-center py-16">
// // // // //               <div className="text-4xl mb-3">🗂</div>
// // // // //               <p className="text-sm font-semibold text-slate-700">No templates found</p>
// // // // //               <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
// // // // //             </div>
// // // // //           ) : (
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// // // // //               {templates.map((tpl) => (
// // // // //                 <TemplateCard
// // // // //                   key={tpl.id}
// // // // //                   tpl={tpl}
// // // // //                   onPreview={() => handlePreview(tpl)}
// // // // //                   onEdit={() => handleTemplateEdit(tpl)}
// // // // //                   onDuplicate={() => handleDuplicate(tpl)}
// // // // //                   onDelete={() => setDeleteTarget(tpl.id)}
// // // // //                 />
// // // // //               ))}
// // // // //               <div onClick={() => setShowChannelModal(true)} className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
// // // // //                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
// // // // //                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
// // // // //                 </div>
// // // // //                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Delete Template" message="Are you sure you want to delete this template? This action cannot be undone." />
// // // // //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import TemplateEditorPage from "./TemplateEditorPage";

// // // // const API = "https://wynreach-backend.onrender.com/api/templates";

// // // // const CHANNEL_TABS = [
// // // //   { label: "All", value: "" },
// // // //   { label: "Email", value: "email" },
// // // //   { label: "WhatsApp", value: "whatsapp" },
// // // // ];
// // // // const CATEGORIES = [
// // // //   "All Categories",
// // // //   "Marketing",
// // // //   "Utility",
// // // //   "Authentication"
// // // // ];

// // // // // ---------- ConfirmDialog & Toast (unchanged) ----------
// // // // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// // // //   if (!isOpen) return null;
// // // //   return (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
// // // //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// // // //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// // // //         <div className="flex gap-3">
// // // //           <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// // // //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const Toast = ({ message, type = "success", onClose }) => (
// // // //   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
// // // //     <span>{type === "success" ? "✓" : "✕"}</span>
// // // //     {message}
// // // //     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
// // // //   </div>
// // // // );

// // // // // ---------- Helper to parse template content (unchanged) ----------
// // // // const parseTemplateContent = (content) => {
// // // //   if (!content) return { isGenerative: false, blocks: [], generativeData: null };
// // // //   try {
// // // //     const parsed = JSON.parse(content);
// // // //     if (Array.isArray(parsed)) {
// // // //       return { isGenerative: false, blocks: parsed, generativeData: null };
// // // //     }
// // // //     if (parsed && parsed.layout) {
// // // //       return { isGenerative: true, blocks: [], generativeData: parsed };
// // // //     }
// // // //     return { isGenerative: false, blocks: [], generativeData: null };
// // // //   } catch (e) {
// // // //     return { isGenerative: false, blocks: [], generativeData: null };
// // // //   }
// // // // };

// // // // // ---------- Full preview modals (unchanged) ----------
// // // // const GenerativeFullPreview = ({ data }) => {
// // // //   if (!data) return null;
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         background: data.bgColor || "#ffffff",
// // // //         fontFamily: data.font || "Arial, sans-serif",
// // // //         padding: "30px",
// // // //         borderRadius: "12px",
// // // //         border: "1px solid #e2e8f0",
// // // //         maxWidth: "700px",
// // // //         margin: "0 auto",
// // // //       }}
// // // //     >
// // // //       {data.logo && (
// // // //         <div style={{ color: data.logoColor || "#000000", fontSize: "28px", fontWeight: 700, marginBottom: "20px", textAlign: data.logoAlign || "center" }}>
// // // //           {data.logo}
// // // //         </div>
// // // //       )}
// // // //       {data.headerImg && (
// // // //         <img src={data.headerImg} alt="Header" style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }} />
// // // //       )}
// // // //       {data.tag && (
// // // //         <div style={{ display: "inline-block", background: data.accentColor || "#4f46e5", color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, marginBottom: "15px" }}>
// // // //           {data.tag}
// // // //         </div>
// // // //       )}
// // // //       <h1 style={{ color: data.logoColor || "#000000", fontSize: "38px", marginBottom: "10px", fontWeight: 700 }}>{data.title}</h1>
// // // //       {data.subtitle && (
// // // //         <h3 style={{ color: data.accentColor || "#4f46e5", marginBottom: "20px", fontSize: "18px" }}>{data.subtitle}</h3>
// // // //       )}
// // // //       <p style={{ color: data.logoColor || "#333333", lineHeight: 1.8, fontSize: "16px", whiteSpace: "pre-wrap", marginBottom: "20px" }}>{data.body}</p>
// // // //       {data.buttonText && (
// // // //         <div style={{ marginTop: "30px", textAlign: "center" }}>
// // // //           <span style={{ background: data.buttonColor || data.accentColor || "#4f46e5", color: data.buttonTextColor || "#ffffff", padding: "14px 30px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, display: "inline-block" }}>
// // // //             {data.buttonText}
// // // //           </span>
// // // //         </div>
// // // //       )}
// // // //       {data.footerText && (
// // // //         <div style={{ marginTop: "40px", fontSize: "13px", opacity: 0.7, color: data.logoColor || "#666666", textAlign: "center", borderTop: `1px solid ${data.accentColor || "#e2e8f0"}40`, paddingTop: "20px" }}>
// // // //           {data.footerText}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // const BlockFullPreview = ({ blocks }) => {
// // // //   const safeBlocks = Array.isArray(blocks) ? blocks : [];
// // // //   if (safeBlocks.length === 0) return <div className="text-center py-8">No content</div>;

// // // //   const EmailBlockContent = ({ block }) => {
// // // //     const p = block.props;
// // // //     switch (block.type) {
// // // //       case "header":
// // // //         return <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: "bold", padding: "8px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// // // //       case "text":
// // // //         return <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: "8px 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap" }}>{p.text}</p>;
// // // //       case "image":
// // // //         return <img src={p.url} alt={p.alt} style={{ width: "100%", borderRadius: 8, display: "block", margin: "12px 0" }} />;
// // // //       case "button":
// // // //         return <div style={{ textAlign: "center", margin: "14px 0" }}><span style={{ display: "inline-block", background: p.bgColor, color: p.textColor, padding: "11px 28px", borderRadius: 7, fontWeight: "bold", fontSize: 14 }}>{p.label}</span></div>;
// // // //       case "columns":
// // // //         return <div style={{ display: "flex", gap: 12, margin: "8px 0" }}><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.left}</div><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.right}</div></div>;
// // // //       case "divider":
// // // //         return <hr style={{ border: "none", borderTop: `1px solid ${p.color}`, margin: "14px 0" }} />;
// // // //       case "footer":
// // // //         return <div style={{ textAlign: "center", color: p.color, fontSize: p.fontSize, padding: "10px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// // // //       default:
// // // //         return null;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", background: "#fff", maxWidth: "700px", margin: "0 auto" }}>
// // // //       {safeBlocks.map((block, idx) => (
// // // //         <EmailBlockContent key={idx} block={block} />
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // const WhatsAppFullPreview = ({ content }) => {
// // // //   let wa = {};
// // // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // // //   return (
// // // //     <div className="bg-[#e5ddd5] p-4 rounded-xl" style={{ maxWidth: "500px", margin: "0 auto" }}>
// // // //       <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow border border-slate-100">
// // // //         <div className="bg-[#075e54] px-4 py-2 flex items-center gap-2">
// // // //           <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">A</div>
// // // //           <div className="text-white text-xs font-semibold">Business Name</div>
// // // //         </div>
// // // //         <div className="p-4">
// // // //           {wa.header && <div className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">{wa.header}</div>}
// // // //           <p className="text-sm text-slate-700 whitespace-pre-wrap">{wa.body || "No message content"}</p>
// // // //           {wa.actions?.length > 0 && (
// // // //             <div className="mt-3 border-t pt-2">
// // // //               {wa.actions.map((act, i) => (
// // // //                 <div key={i} className="text-sm font-semibold text-[#00a5f4] text-center py-1">{act.name}</div>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const TemplatePreviewModal = ({ tpl, onClose }) => {
// // // //   const isWA = tpl.type === "whatsapp";
// // // //   const parsed = parseTemplateContent(tpl.content);

// // // //   return (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-auto">
// // // //       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
// // // //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// // // //           <div>
// // // //             <h2 className="text-lg font-bold text-slate-800">{tpl.name}</h2>
// // // //             <p className="text-xs text-slate-500">{isWA ? "WhatsApp Template" : "Email Template"}</p>
// // // //           </div>
// // // //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// // // //         </div>
// // // //         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
// // // //           {isWA ? (
// // // //             <WhatsAppFullPreview content={tpl.content} />
// // // //           ) : parsed.isGenerative ? (
// // // //             <GenerativeFullPreview data={parsed.generativeData} />
// // // //           ) : (
// // // //             <BlockFullPreview blocks={parsed.blocks} />
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // ---------- Mini previews for cards ----------
// // // // const EmailThumb = () => {
// // // //   const accent = "#6366f1";
// // // //   return (
// // // //     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
// // // //       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
// // // //       <div className="h-5 bg-slate-200 rounded" />
// // // //       <div className="space-y-0.5">
// // // //         <div className="h-1 bg-slate-200 rounded" />
// // // //         <div className="h-1 bg-slate-200 rounded w-3/4" />
// // // //       </div>
// // // //       <div className="flex gap-1">
// // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // // //       </div>
// // // //       <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
// // // //     </div>
// // // //   );
// // // // };

// // // // const WAThumb = () => (
// // // //   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // //     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// // // //       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
// // // //       <div className="text-[7px] font-bold text-white">WhatsApp</div>
// // // //     </div>
// // // //     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
// // // //       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
// // // //         <div className="h-1 bg-green-400 rounded w-full" />
// // // //         <div className="h-1 bg-green-300 rounded w-4/5" />
// // // //         <div className="h-1 bg-green-300 rounded w-3/5" />
// // // //       </div>
// // // //       <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const MiniEmailPreview = ({ content }) => {
// // // //   let blocks = [];
// // // //   try { blocks = JSON.parse(content || "[]"); } catch { }
// // // //   if (!blocks.length) return <EmailThumb />;
// // // //   return (
// // // //     <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
// // // //       <div className="bg-indigo-600 px-2 py-1"><div className="h-1 bg-indigo-300 rounded w-3/4" /></div>
// // // //       <div className="p-1.5 space-y-1">
// // // //         {blocks.slice(0, 5).map((block, i) => {
// // // //           const p = block.props || {};
// // // //           if (block.type === "header") return <div key={i} className="h-2 rounded" style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }} />;
// // // //           if (block.type === "image") return <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center"><span className="text-[8px] text-indigo-300">IMG</span></div>;
// // // //           if (block.type === "button") return <div key={i} className="h-3 rounded mx-auto w-16 flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span></div>;
// // // //           if (block.type === "divider") return <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />;
// // // //           if (block.type === "columns") return <div key={i} className="flex gap-0.5"><div className="flex-1 h-4 bg-slate-100 rounded" /><div className="flex-1 h-4 bg-slate-100 rounded" /></div>;
// // // //           if (block.type === "footer") return <div key={i} className="h-1 bg-slate-100 rounded w-full" />;
// // // //           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /><div className="h-1 bg-slate-200 rounded w-3/5" /></div>;
// // // //         })}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const GenerativePreview = ({ data }) => {
// // // //   const bgColor = data.bgColor || "#1a1a2e";
// // // //   const logoColor = data.logoColor || "#ffffff";
// // // //   const accentColor = data.accentColor || "#f5a623";
// // // //   const logo = data.logo || "";
// // // //   const title = data.title || "";
// // // //   const subtitle = data.subtitle || "";
// // // //   const headerImg = data.headerImg || null;
// // // //   return (
// // // //     <div style={{ background: bgColor, color: logoColor, padding: "10px", borderRadius: "12px", height: "160px", width: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
// // // //       {logo && <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>{logo}</div>}
// // // //       {headerImg && <img src={headerImg} alt="header" style={{ width: "100%", height: "50px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />}
// // // //       {title && <div style={{ fontWeight: "bold", fontSize: "12px", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>}
// // // //       {subtitle && <div style={{ fontSize: "9px", color: accentColor, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</div>}
// // // //     </div>
// // // //   );
// // // // };

// // // // const MiniWAPreview = ({ content }) => {
// // // //   let wa = {};
// // // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // // //   const body = wa.body || "";
// // // //   if (!body) return <WAThumb />;
// // // //   return (
// // // //     <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // // //       <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#25d366]" /><div className="text-[6px] font-bold text-white">WhatsApp</div></div>
// // // //       <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
// // // //         <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
// // // //           {wa.header && <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">{wa.header}</div>}
// // // //           <div className="text-[6px] text-slate-600 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{body.substring(0, 100)}</div>
// // // //           {wa.actions?.length > 0 && <div className="mt-1 border-t border-slate-100 pt-0.5"><div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">{wa.actions[0].name}</div></div>}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const WAStatusBadge = ({ status }) => {
// // // //   if (!status) return null;
// // // //   if (status === "pending_review" || status === "pending")
// // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">⏳ Pending Review</span>;
// // // //   if (status === "active")
// // // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">✓ Active</span>;
// // // //   return null;
// // // // };

// // // // // ---------- Template Card (unchanged) ----------
// // // // const TemplateCard = ({ tpl, onPreview, onEdit, onDuplicate, onDelete }) => {
// // // //   const isWA = tpl.type === "whatsapp";
// // // //   const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
// // // //   const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

// // // //   let isGenerative = false;
// // // //   let generativeData = null;
// // // //   if (!isWA && tpl.content) {
// // // //     try {
// // // //       const parsed = JSON.parse(tpl.content);
// // // //       if (parsed && parsed.layout) {
// // // //         isGenerative = true;
// // // //         generativeData = parsed;
// // // //       }
// // // //     } catch (e) {}
// // // //   }

// // // //   return (
// // // //     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
// // // //       <div
// // // //         onClick={onPreview}
// // // //         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
// // // //       >
// // // //         {isWA ? (
// // // //           <MiniWAPreview content={tpl.content} />
// // // //         ) : isGenerative ? (
// // // //           <GenerativePreview data={generativeData} />
// // // //         ) : (
// // // //           <MiniEmailPreview content={tpl.content} />
// // // //         )}
// // // //       </div>

// // // //       <div onClick={onPreview} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
// // // //         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
// // // //         <div className="flex flex-wrap items-center gap-1.5 mb-2">
// // // //           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
// // // //             {isWA ? "💬 WhatsApp" : "✉️ Email"}
// // // //           </span>
// // // //           {tpl.category && (
// // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{tpl.category}</span>
// // // //           )}
// // // //           {isGenerative && (
// // // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">✨ Generative</span>
// // // //           )}
// // // //         </div>
// // // //         <WAStatusBadge status={isWA ? tpl.status : null} />
// // // //         <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
// // // //       </div>

// // // //       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
// // // //         <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
// // // //         <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
// // // //         <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const StatCard = ({ label, value, icon, color }) => (
// // // //   <div className={`rounded-2xl p-4 border ${color}`}>
// // // //     <div className="flex items-center gap-2 mb-1">
// // // //       <span className="text-lg">{icon}</span>
// // // //       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
// // // //     </div>
// // // //     <p className="text-2xl font-bold text-slate-900">{value}</p>
// // // //   </div>
// // // // );

// // // // // =====================================================
// // // // // 1. CHANNEL SELECT MODAL (First step)
// // // // // =====================================================
// // // // const ChannelSelectModal = ({ onSelect, onClose }) => (
// // // //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // //     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
// // // //       <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
// // // //       <p className="text-sm text-slate-500 mb-6">Choose a channel to start</p>
// // // //       <div className="flex gap-4 mb-6">
// // // //         <button
// // // //           onClick={() => onSelect("email")}
// // // //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
// // // //         >
// // // //           <span className="text-4xl">✉️</span>
// // // //           <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
// // // //           <span className="text-xs text-slate-400 text-center">Build email templates</span>
// // // //         </button>
// // // //         <button
// // // //           onClick={() => onSelect("whatsapp")}
// // // //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
// // // //         >
// // // //           <span className="text-4xl">💬</span>
// // // //           <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
// // // //           <span className="text-xs text-slate-400 text-center">WhatsApp Business templates</span>
// // // //         </button>
// // // //       </div>
// // // //       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // // =====================================================
// // // // // 2. EMAIL CATEGORY SELECT MODAL (Second step)
// // // // // =====================================================
// // // // const EmailCategoryModal = ({ onSelect, onClose }) => (
// // // //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // // //     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
// // // //       <h2 className="text-lg font-bold text-slate-800 mb-1">Choose Template Type</h2>
// // // //       <p className="text-sm text-slate-500 mb-6">Select a category to continue</p>
// // // //       <div className="space-y-4 mb-6">
// // // //         <button
// // // //           onClick={() => onSelect("basic")}
// // // //           className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
// // // //         >
// // // //           <span className="text-3xl">📄</span>
// // // //           <div className="text-left">
// // // //             <div className="font-semibold text-slate-700 group-hover:text-indigo-600">Basic Templates</div>
// // // //             <div className="text-xs text-slate-400">Start with a pre‑built layout (Welcome, Promo, etc.)</div>
// // // //           </div>
// // // //         </button>
// // // //         <button
// // // //           onClick={() => onSelect("generative")}
// // // //           className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50 transition-all group"
// // // //         >
// // // //           <span className="text-3xl">✨</span>
// // // //           <div className="text-left">
// // // //             <div className="font-semibold text-slate-700 group-hover:text-amber-600">Generative Templates</div>
// // // //             <div className="text-xs text-slate-400">Premium‑designed templates for professionals</div>
// // // //           </div>
// // // //         </button>
// // // //         <button
// // // //           onClick={() => onSelect("ai")}
// // // //           className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
// // // //         >
// // // //           <span className="text-3xl">🤖</span>
// // // //           <div className="text-left">
// // // //             <div className="font-semibold text-slate-700 group-hover:text-purple-600">AI Generated</div>
// // // //             <div className="text-xs text-slate-400">Generate a template with AI</div>
// // // //           </div>
// // // //         </button>
// // // //       </div>
// // // //       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // // =====================================================
// // // // // 3. TEMPLATE PICKER MODAL (used for Basic & Generative)
// // // // // =====================================================
// // // // const TemplatePickerModal = ({ templates, onSelect, onClose, title }) => {
// // // //   const [hoveredId, setHoveredId] = useState(null);

// // // //   const MiniPreview = ({ template }) => {
// // // //     // For generative templates, we don't have blocks; we show a colored preview
// // // //     if (template.isGenerative) {
// // // //       return (
// // // //         <div
// // // //           className="w-full h-full flex items-center justify-center text-5xl"
// // // //           style={{ backgroundColor: template.bg || "#f0f0f0" }}
// // // //         >
// // // //           {template.thumb || "📄"}
// // // //         </div>
// // // //       );
// // // //     }
// // // //     // For basic (block-based) templates
// // // //     return (
// // // //       <div className="w-full h-full flex flex-col p-2 space-y-1.5 overflow-hidden">
// // // //         {template.blocks.slice(0, 4).map((block, i) => {
// // // //           const p = block.props || {};
// // // //           if (block.type === "header") return <div key={i} className="h-2.5 rounded font-bold" style={{ background: p.color || "#0f172a", width: i === 0 ? "80%" : "60%", opacity: 0.8 }} />;
// // // //           if (block.type === "image") return <div key={i} className="h-10 rounded w-full bg-indigo-100 flex items-center justify-center"><span className="text-[8px] text-indigo-400">IMAGE</span></div>;
// // // //           if (block.type === "button") return <div key={i} className="h-4 rounded w-24 mx-auto flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[7px] text-white font-bold">{p.label || "Button"}</span></div>;
// // // //           if (block.type === "divider") return <div key={i} className="h-px w-full bg-slate-200" />;
// // // //           if (block.type === "columns") return <div key={i} className="flex gap-1"><div className="flex-1 h-6 bg-slate-100 rounded" /><div className="flex-1 h-6 bg-slate-100 rounded" /></div>;
// // // //           if (block.type === "footer") return <div key={i} className="h-1.5 bg-slate-100 rounded w-full mt-auto" />;
// // // //           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /></div>;
// // // //         })}
// // // //       </div>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
// // // //       <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
// // // //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// // // //           <div>
// // // //             <h2 className="text-lg font-bold text-slate-800">{title || "Choose a Template"}</h2>
// // // //             <p className="text-xs text-slate-500 mt-0.5">Select a template to start building</p>
// // // //           </div>
// // // //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// // // //         </div>
// // // //         <div className="flex-1 overflow-y-auto p-6">
// // // //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
// // // //             {templates.map((template) => (
// // // //               <button
// // // //                 key={template.id}
// // // //                 onClick={() => onSelect(template)}
// // // //                 onMouseEnter={() => setHoveredId(template.id)}
// // // //                 onMouseLeave={() => setHoveredId(null)}
// // // //                 className={`group flex flex-col rounded-xl border-2 overflow-hidden transition-all text-left ${hoveredId === template.id ? "border-indigo-500 shadow-lg scale-[1.02]" : "border-slate-200 hover:border-indigo-300"}`}
// // // //               >
// // // //                 <div className="h-36 flex flex-col overflow-hidden" style={{ background: template.bg || "#f8fafc" }}>
// // // //                   <MiniPreview template={template} />
// // // //                 </div>
// // // //                 <div className="px-3 py-2 bg-white border-t border-slate-100">
// // // //                   <p className="text-xs font-bold text-slate-800 truncate">{template.emoji || "📄"} {template.name}</p>
// // // //                   <p className="text-[10px] text-slate-400 truncate mt-0.5">{template.description}</p>
// // // //                 </div>
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // =====================================================
// // // // // 4. BASIC & GENERATIVE TEMPLATE DEFINITIONS
// // // // // =====================================================

// // // // // Basic templates (block-based)
// // // // const BASIC_TEMPLATES = [
// // // //   {
// // // //     id: "blank",
// // // //     name: "Blank",
// // // //     description: "Start from scratch",
// // // //     emoji: "📄",
// // // //     bg: "#f8fafc",
// // // //     blocks: []
// // // //   },
// // // //   {
// // // //     id: "welcome",
// // // //     name: "Welcome Email",
// // // //     description: "Greet new subscribers",
// // // //     emoji: "👋",
// // // //     bg: "#eff6ff",
// // // //     blocks: [
// // // //       { id: 1, type: "header", props: { text: "Welcome to {{company}}! 🎉", align: "center", color: "#1e40af", fontSize: "26px" } },
// // // //       { id: 2, type: "image", props: { url: "https://placehold.co/560x200/3b82f6/ffffff?text=Welcome", alt: "Welcome" } },
// // // //       { id: 3, type: "text", props: { text: "Hi {{first_name}},\n\nWe're thrilled to have you on board. Get started by exploring our features and let us know if you need any help.", align: "left", color: "#334155", fontSize: "14px" } },
// // // //       { id: 4, type: "button", props: { label: "Get Started →", url: "#", bgColor: "#3b82f6", textColor: "#ffffff" } },
// // // //       { id: 5, type: "divider", props: { color: "#e2e8f0" } },
// // // //       { id: 6, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// // // //     ]
// // // //   },
// // // //   {
// // // //     id: "promo",
// // // //     name: "Promotional Offer",
// // // //     description: "Announce deals & discounts",
// // // //     emoji: "🎁",
// // // //     bg: "#fdf4ff",
// // // //     blocks: [
// // // //       { id: 1, type: "header", props: { text: "🔥 Special Offer Just for You!", align: "center", color: "#7e22ce", fontSize: "26px" } },
// // // //       { id: 2, type: "image", props: { url: "https://placehold.co/560x200/a855f7/ffffff?text=SALE+50%25+OFF", alt: "Sale" } },
// // // //       { id: 3, type: "text", props: { text: "Hi {{first_name}},\n\nDon't miss out on our limited time offer. Use the code below to get 50% off your next purchase.", align: "center", color: "#334155", fontSize: "14px" } },
// // // //       { id: 4, type: "header", props: { text: "SAVE50", align: "center", color: "#7e22ce", fontSize: "32px" } },
// // // //       { id: 5, type: "button", props: { label: "Claim Your Discount", url: "#", bgColor: "#a855f7", textColor: "#ffffff" } },
// // // //       { id: 6, type: "text", props: { text: "Offer expires on {{date}}. Terms and conditions apply.", align: "center", color: "#94a3b8", fontSize: "12px" } },
// // // //       { id: 7, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// // // //     ]
// // // //   },
// // // //   {
// // // //     id: "newsletter",
// // // //     name: "Newsletter",
// // // //     description: "Share updates & news",
// // // //     emoji: "📰",
// // // //     bg: "#f0fdf4",
// // // //     blocks: [
// // // //       { id: 1, type: "header", props: { text: "{{company}} Monthly Newsletter", align: "center", color: "#15803d", fontSize: "24px" } },
// // // //       { id: 2, type: "divider", props: { color: "#bbf7d0" } },
// // // //       { id: 3, type: "header", props: { text: "What's New This Month", align: "left", color: "#166534", fontSize: "18px" } },
// // // //       { id: 4, type: "text", props: { text: "Hi {{first_name}},\n\nHere's a roundup of everything that happened this month. We've been busy building new features and improving your experience.", align: "left", color: "#334155", fontSize: "14px" } },
// // // //       { id: 5, type: "columns", props: { left: "📊 Feature Update\nWe launched new analytics dashboard this month.", right: "🚀 Coming Soon\nExciting features are on the way. Stay tuned!" } },
// // // //       { id: 6, type: "button", props: { label: "Read Full Update", url: "#", bgColor: "#16a34a", textColor: "#ffffff" } },
// // // //       { id: 7, type: "divider", props: { color: "#e2e8f0" } },
// // // //       { id: 8, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// // // //     ]
// // // //   },
// // // //   {
// // // //     id: "order",
// // // //     name: "Order Confirmation",
// // // //     description: "Confirm purchases",
// // // //     emoji: "🛒",
// // // //     bg: "#fff7ed",
// // // //     blocks: [
// // // //       { id: 1, type: "header", props: { text: "Order Confirmed! ✅", align: "center", color: "#c2410c", fontSize: "26px" } },
// // // //       { id: 2, type: "text", props: { text: "Hi {{first_name}},\n\nThank you for your order! We've received your purchase and it's being processed.", align: "center", color: "#334155", fontSize: "14px" } },
// // // //       { id: 3, type: "columns", props: { left: "Order ID\n#{{order_id}}", right: "Amount\n₹{{amount}}" } },
// // // //       { id: 4, type: "divider", props: { color: "#fed7aa" } },
// // // //       { id: 5, type: "text", props: { text: "Your order will be delivered by {{date}}. You'll receive a tracking link once it ships.", align: "left", color: "#334155", fontSize: "14px" } },
// // // //       { id: 6, type: "button", props: { label: "Track Your Order", url: "#", bgColor: "#ea580c", textColor: "#ffffff" } },
// // // //       { id: 7, type: "footer", props: { text: "© 2025 {{company}} · Need help? Reply to this email.", color: "#94a3b8", fontSize: "12px" } },
// // // //     ]
// // // //   },
// // // // ];

// // // // // Generative templates (these are the same as in the editor's generative modal)
// // // // const GENERATIVE_TEMPLATES = [
// // // //   { id: "botanical", name: "Botanical Newsletter", thumb: "🌿", bg: "#f5f0e8", accent: "#2d5a27", isGenerative: true },
// // // //   { id: "darkpromo", name: "Dark Promo", thumb: "⚡", bg: "#0f0f1a", accent: "#f5a623", isGenerative: true },
// // // //   { id: "minimal", name: "Minimal Clean", thumb: "📄", bg: "#ffffff", accent: "#e63946", isGenerative: true },
// // // //   { id: "event", name: "Event Invite", thumb: "🎤", bg: "#1e1b4b", accent: "#a78bfa", isGenerative: true },
// // // //   { id: "pets", name: "Pets Rescue", thumb: "🐾", bg: "#fef9f0", accent: "#e67e22", isGenerative: true },
// // // //   { id: "halloween", name: "Halloween Sale", thumb: "🎃", bg: "#000000", accent: "#ff6600", isGenerative: true },
// // // // ];

// // // // // =====================================================
// // // // // MAIN TEMPLATE LIBRARY PAGE
// // // // // =====================================================
// // // // export default function TemplateLibraryPage() {
// // // //   const navigate = useNavigate();
// // // //   const [templates, setTemplates] = useState([]);
// // // //   const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // //   const [editingId, setEditingId] = useState(undefined);
// // // //   const [selectedChannel, setSelectedChannel] = useState("email");
// // // //   const [initialBlocks, setInitialBlocks] = useState(null); // for new templates with preset blocks

// // // //   const [showChannelModal, setShowChannelModal] = useState(false);
// // // //   const [showEmailCategoryModal, setShowEmailCategoryModal] = useState(false);
// // // //   const [showTemplatePicker, setShowTemplatePicker] = useState(false);
// // // //   const [pickerTemplates, setPickerTemplates] = useState([]);
// // // //   const [pickerTitle, setPickerTitle] = useState("");

// // // //   const [channel, setChannel] = useState("");
// // // //   const [category, setCategory] = useState("All Categories");
// // // //   const [search, setSearch] = useState("");
// // // //   const [catOpen, setCatOpen] = useState(false);
// // // //   const [deleteTarget, setDeleteTarget] = useState(null);
// // // //   const [toast, setToast] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [previewTpl, setPreviewTpl] = useState(null);
// // // //   const catRef = useRef();

// // // //   const fetchTemplates = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const params = new URLSearchParams();
// // // //       if (channel) params.append("type", channel);
// // // //       if (category !== "All Categories") params.append("category", category);
// // // //       if (search) params.append("search", search);
// // // //       const res = await fetch(`${API}/?${params}`);
// // // //       const data = await res.json();
// // // //       setTemplates(data.data || []);
// // // //       setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // // //     } catch (err) {
// // // //       showToast("Failed to load templates", "error");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => { fetchTemplates(); }, [channel, category, search]);

// // // //   useEffect(() => {
// // // //     fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
// // // //       .then((r) => r.json())
// // // //       .then((data) => { if (data.synced?.length > 0) fetchTemplates(); })
// // // //       .catch(() => {});
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
// // // //     document.addEventListener("mousedown", handler);
// // // //     return () => document.removeEventListener("mousedown", handler);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
// // // //   }, [toast]);

// // // //   const showToast = (message, type = "success") => setToast({ message, type });

// // // //   const handleDuplicate = async (tpl) => {
// // // //     try {
// // // //       const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
// // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl.name}" duplicated`); }
// // // //     } catch { showToast("Failed to duplicate", "error"); }
// // // //   };

// // // //   const confirmDelete = async () => {
// // // //     const tpl = templates.find((t) => t.id === deleteTarget);
// // // //     try {
// // // //       const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
// // // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl?.name}" deleted`, "error"); }
// // // //     } catch { showToast("Failed to delete", "error"); }
// // // //     setDeleteTarget(null);
// // // //   };

// // // //   // -------- CREATE TEMPLATE FLOW --------
// // // //   const handleChannelSelect = (ch) => {
// // // //     setShowChannelModal(false);
// // // //     if (ch === "whatsapp") {
// // // //       setSelectedChannel("whatsapp");
// // // //       setEditingId(null);
// // // //       setInitialBlocks(null);
// // // //     } else if (ch === "email") {
// // // //       // Show email category modal
// // // //       setShowEmailCategoryModal(true);
// // // //     }
// // // //   };

// // // //   const handleEmailCategorySelect = (type) => {
// // // //     setShowEmailCategoryModal(false);
// // // //     if (type === "basic") {
// // // //       setPickerTemplates(BASIC_TEMPLATES);
// // // //       setPickerTitle("Basic Templates");
// // // //       setShowTemplatePicker(true);
// // // //     } else if (type === "generative") {
// // // //       setPickerTemplates(GENERATIVE_TEMPLATES);
// // // //       setPickerTitle("Generative Templates");
// // // //       setShowTemplatePicker(true);
// // // //     } else if (type === "ai") {
// // // //       // Navigate to AI templates page
// // // //       navigate("/ai-templates");
// // // //     }
// // // //   };

// // // //   const handleTemplatePick = (template) => {
// // // //     setShowTemplatePicker(false);
// // // //     // Determine if it's a generative template (has isGenerative flag)
// // // //     if (template.isGenerative) {
// // // //       // Navigate to email-builder with the template id
// // // //       navigate(`/email-builder?template=${template.id}`);
// // // //       return;
// // // //     }
// // // //     // Basic template: open editor with blocks
// // // //     const blocksWithIds = template.blocks.map((b, i) => ({ ...b, id: Date.now() + i }));
// // // //     setInitialBlocks(blocksWithIds);
// // // //     setSelectedChannel("email");
// // // //     setEditingId(null); // new template, no ID
// // // //   };

// // // //   // -------- EDIT EXISTING TEMPLATE --------
// // // //   const handleTemplateEdit = (tpl) => {
// // // //     try {
// // // //       const data = JSON.parse(tpl.content || "{}");
// // // //       if (data.layout) {
// // // //         navigate(`/email-builder?template=${data.layout}`);
// // // //         return;
// // // //       }
// // // //     } catch (e) {}
// // // //     setSelectedChannel(tpl.type || "email");
// // // //     setEditingId(tpl.id);
// // // //     setInitialBlocks(null);
// // // //   };

// // // //   const handlePreview = (tpl) => {
// // // //     setPreviewTpl(tpl);
// // // //   };

// // // //   // If editor is open, render it
// // // //   if (editingId !== undefined) {
// // // //     return (
// // // //       <TemplateEditorPage
// // // //         templateId={editingId}
// // // //         initialChannel={selectedChannel}
// // // //         initialBlocks={initialBlocks}
// // // //         onBack={() => {
// // // //           fetchTemplates();
// // // //           setEditingId(undefined);
// // // //           setInitialBlocks(null);
// // // //         }}
// // // //       />
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
// // // //       {/* Channel Selection Modal */}
// // // //       {showChannelModal && (
// // // //         <ChannelSelectModal
// // // //           onSelect={handleChannelSelect}
// // // //           onClose={() => setShowChannelModal(false)}
// // // //         />
// // // //       )}

// // // //       {/* Email Category Modal */}
// // // //       {showEmailCategoryModal && (
// // // //         <EmailCategoryModal
// // // //           onSelect={handleEmailCategorySelect}
// // // //           onClose={() => setShowEmailCategoryModal(false)}
// // // //         />
// // // //       )}

// // // //       {/* Template Picker Modal (Basic / Generative) */}
// // // //       {showTemplatePicker && (
// // // //         <TemplatePickerModal
// // // //           templates={pickerTemplates}
// // // //           onSelect={handleTemplatePick}
// // // //           onClose={() => setShowTemplatePicker(false)}
// // // //           title={pickerTitle}
// // // //         />
// // // //       )}

// // // //       {/* Template Preview Modal */}
// // // //       {previewTpl && (
// // // //         <TemplatePreviewModal
// // // //           tpl={previewTpl}
// // // //           onClose={() => setPreviewTpl(null)}
// // // //         />
// // // //       )}

// // // //       {/* Header */}
// // // //       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
// // // //         <div className="flex items-center gap-3">
// // // //           <button
// // // //             onClick={() => navigate("/dashboard")}
// // // //             className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
// // // //           >
// // // //             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
// // // //               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
// // // //             </svg>
// // // //           </button>
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
// // // //             <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
// // // //           </div>
// // // //         </div>
// // // //         <button
// // // //           onClick={() => setShowChannelModal(true)}
// // // //           className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
// // // //         >
// // // //           + Create Template
// // // //         </button>
// // // //       </div>

// // // //       {/* Stats */}
// // // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // // //         <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
// // // //         <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
// // // //         <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
// // // //         <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
// // // //       </div>

// // // //       {/* Filter Bar & Grid */}
// // // //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// // // //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// // // //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// // // //             {CHANNEL_TABS.map((tab) => (
// // // //               <button
// // // //                 key={tab.value}
// // // //                 onClick={() => setChannel(tab.value)}
// // // //                 className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
// // // //               >
// // // //                 {tab.label}
// // // //               </button>
// // // //             ))}
// // // //           </div>

// // // //           <div className="relative" ref={catRef}>
// // // //             <button
// // // //               onClick={() => setCatOpen((o) => !o)}
// // // //               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
// // // //             >
// // // //               {category} <span className="text-slate-400 text-[10px]">▾</span>
// // // //             </button>
// // // //             {catOpen && (
// // // //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
// // // //                 {CATEGORIES.map((c) => (
// // // //                   <div
// // // //                     key={c}
// // // //                     onClick={() => { setCategory(c); setCatOpen(false); }}
// // // //                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
// // // //                   >
// // // //                     {c}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

// // // //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
// // // //             <span className="text-slate-400 text-sm">🔍</span>
// // // //             <input
// // // //               value={search}
// // // //               onChange={(e) => setSearch(e.target.value)}
// // // //               placeholder="Search templates..."
// // // //               className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
// // // //             />
// // // //             {search && (
// // // //               <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">×</button>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         <div className="p-5">
// // // //           {loading ? (
// // // //             <div className="text-center py-16 text-slate-400">Loading templates...</div>
// // // //           ) : templates.length === 0 ? (
// // // //             <div className="text-center py-16">
// // // //               <div className="text-4xl mb-3">🗂</div>
// // // //               <p className="text-sm font-semibold text-slate-700">No templates found</p>
// // // //               <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// // // //               {templates.map((tpl) => (
// // // //                 <TemplateCard
// // // //                   key={tpl.id}
// // // //                   tpl={tpl}
// // // //                   onPreview={() => handlePreview(tpl)}
// // // //                   onEdit={() => handleTemplateEdit(tpl)}
// // // //                   onDuplicate={() => handleDuplicate(tpl)}
// // // //                   onDelete={() => setDeleteTarget(tpl.id)}
// // // //                 />
// // // //               ))}
// // // //               <div
// // // //                 onClick={() => setShowChannelModal(true)}
// // // //                 className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
// // // //               >
// // // //                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
// // // //                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
// // // //                 </div>
// // // //                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       <ConfirmDialog
// // // //         isOpen={!!deleteTarget}
// // // //         onClose={() => setDeleteTarget(null)}
// // // //         onConfirm={confirmDelete}
// // // //         title="Delete Template"
// // // //         message="Are you sure you want to delete this template? This action cannot be undone."
// // // //       />
// // // //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// // // //     </div>
// // // //   );
// // // // }



// // // import React, { useState, useEffect, useRef } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import TemplateEditorPage from "./TemplateEditorPage";

// // // const API = "https://wynreach-backend.onrender.com/api/templates";

// // // const CHANNEL_TABS = [
// // //   { label: "All", value: "" },
// // //   { label: "Email", value: "email" },
// // //   { label: "WhatsApp", value: "whatsapp" },
// // // ];
// // // const CATEGORIES = [
// // //   "All Categories",
// // //   "Marketing",
// // //   "Utility",
// // //   "Authentication"
// // // ];

// // // // ---------- ConfirmDialog ----------
// // // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// // //   if (!isOpen) return null;
// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
// // //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// // //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// // //         <div className="flex gap-3">
// // //           <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// // //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ---------- Toast ----------
// // // const Toast = ({ message, type = "success", onClose }) => (
// // //   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
// // //     <span>{type === "success" ? "✓" : "✕"}</span>
// // //     {message}
// // //     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
// // //   </div>
// // // );

// // // // ---------- Helper to parse template content ----------
// // // const parseTemplateContent = (content) => {
// // //   if (!content) return { isGenerative: false, blocks: [], generativeData: null };
// // //   try {
// // //     const parsed = JSON.parse(content);
// // //     if (Array.isArray(parsed)) {
// // //       return { isGenerative: false, blocks: parsed, generativeData: null };
// // //     }
// // //     if (parsed && parsed.layout) {
// // //       return { isGenerative: true, blocks: [], generativeData: parsed };
// // //     }
// // //     return { isGenerative: false, blocks: [], generativeData: null };
// // //   } catch (e) {
// // //     return { isGenerative: false, blocks: [], generativeData: null };
// // //   }
// // // };

// // // // ---------- Full preview modals ----------
// // // const GenerativeFullPreview = ({ data }) => {
// // //   if (!data) return null;
// // //   return (
// // //     <div
// // //       style={{
// // //         background: data.bgColor || "#ffffff",
// // //         fontFamily: data.font || "Arial, sans-serif",
// // //         padding: "30px",
// // //         borderRadius: "12px",
// // //         border: "1px solid #e2e8f0",
// // //         maxWidth: "700px",
// // //         margin: "0 auto",
// // //       }}
// // //     >
// // //       {data.logo && (
// // //         <div style={{ color: data.logoColor || "#000000", fontSize: "28px", fontWeight: 700, marginBottom: "20px", textAlign: data.logoAlign || "center" }}>
// // //           {data.logo}
// // //         </div>
// // //       )}
// // //       {data.headerImg && (
// // //         <img src={data.headerImg} alt="Header" style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }} />
// // //       )}
// // //       {data.tag && (
// // //         <div style={{ display: "inline-block", background: data.accentColor || "#4f46e5", color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, marginBottom: "15px" }}>
// // //           {data.tag}
// // //         </div>
// // //       )}
// // //       <h1 style={{ color: data.logoColor || "#000000", fontSize: "38px", marginBottom: "10px", fontWeight: 700 }}>{data.title}</h1>
// // //       {data.subtitle && (
// // //         <h3 style={{ color: data.accentColor || "#4f46e5", marginBottom: "20px", fontSize: "18px" }}>{data.subtitle}</h3>
// // //       )}
// // //       <p style={{ color: data.logoColor || "#333333", lineHeight: 1.8, fontSize: "16px", whiteSpace: "pre-wrap", marginBottom: "20px" }}>{data.body}</p>
// // //       {data.buttonText && (
// // //         <div style={{ marginTop: "30px", textAlign: "center" }}>
// // //           <span style={{ background: data.buttonColor || data.accentColor || "#4f46e5", color: data.buttonTextColor || "#ffffff", padding: "14px 30px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, display: "inline-block" }}>
// // //             {data.buttonText}
// // //           </span>
// // //         </div>
// // //       )}
// // //       {data.footerText && (
// // //         <div style={{ marginTop: "40px", fontSize: "13px", opacity: 0.7, color: data.logoColor || "#666666", textAlign: "center", borderTop: `1px solid ${data.accentColor || "#e2e8f0"}40`, paddingTop: "20px" }}>
// // //           {data.footerText}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const BlockFullPreview = ({ blocks }) => {
// // //   const safeBlocks = Array.isArray(blocks) ? blocks : [];
// // //   if (safeBlocks.length === 0) return <div className="text-center py-8">No content</div>;

// // //   const EmailBlockContent = ({ block }) => {
// // //     const p = block.props;
// // //     switch (block.type) {
// // //       case "header":
// // //         return <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: "bold", padding: "8px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// // //       case "text":
// // //         return <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: "8px 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap" }}>{p.text}</p>;
// // //       case "image":
// // //         return <img src={p.url} alt={p.alt} style={{ width: "100%", borderRadius: 8, display: "block", margin: "12px 0" }} />;
// // //       case "button":
// // //         return <div style={{ textAlign: "center", margin: "14px 0" }}><span style={{ display: "inline-block", background: p.bgColor, color: p.textColor, padding: "11px 28px", borderRadius: 7, fontWeight: "bold", fontSize: 14 }}>{p.label}</span></div>;
// // //       case "columns":
// // //         return <div style={{ display: "flex", gap: 12, margin: "8px 0" }}><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.left}</div><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.right}</div></div>;
// // //       case "divider":
// // //         return <hr style={{ border: "none", borderTop: `1px solid ${p.color}`, margin: "14px 0" }} />;
// // //       case "footer":
// // //         return <div style={{ textAlign: "center", color: p.color, fontSize: p.fontSize, padding: "10px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", background: "#fff", maxWidth: "700px", margin: "0 auto" }}>
// // //       {safeBlocks.map((block, idx) => (
// // //         <EmailBlockContent key={idx} block={block} />
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // const WhatsAppFullPreview = ({ content }) => {
// // //   let wa = {};
// // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // //   return (
// // //     <div className="bg-[#e5ddd5] p-4 rounded-xl" style={{ maxWidth: "500px", margin: "0 auto" }}>
// // //       <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow border border-slate-100">
// // //         <div className="bg-[#075e54] px-4 py-2 flex items-center gap-2">
// // //           <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">A</div>
// // //           <div className="text-white text-xs font-semibold">Business Name</div>
// // //         </div>
// // //         <div className="p-4">
// // //           {wa.header && <div className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">{wa.header}</div>}
// // //           <p className="text-sm text-slate-700 whitespace-pre-wrap">{wa.body || "No message content"}</p>
// // //           {wa.actions?.length > 0 && (
// // //             <div className="mt-3 border-t pt-2">
// // //               {wa.actions.map((act, i) => (
// // //                 <div key={i} className="text-sm font-semibold text-[#00a5f4] text-center py-1">{act.name}</div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const TemplatePreviewModal = ({ tpl, onClose }) => {
// // //   const isWA = tpl.type === "whatsapp";
// // //   const parsed = parseTemplateContent(tpl.content);

// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-auto">
// // //       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
// // //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// // //           <div>
// // //             <h2 className="text-lg font-bold text-slate-800">{tpl.name}</h2>
// // //             <p className="text-xs text-slate-500">{isWA ? "WhatsApp Template" : "Email Template"}</p>
// // //           </div>
// // //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// // //         </div>
// // //         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
// // //           {isWA ? (
// // //             <WhatsAppFullPreview content={tpl.content} />
// // //           ) : parsed.isGenerative ? (
// // //             <GenerativeFullPreview data={parsed.generativeData} />
// // //           ) : (
// // //             <BlockFullPreview blocks={parsed.blocks} />
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ---------- Mini previews for cards ----------
// // // const EmailThumb = () => {
// // //   const accent = "#6366f1";
// // //   return (
// // //     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
// // //       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
// // //       <div className="h-5 bg-slate-200 rounded" />
// // //       <div className="space-y-0.5">
// // //         <div className="h-1 bg-slate-200 rounded" />
// // //         <div className="h-1 bg-slate-200 rounded w-3/4" />
// // //       </div>
// // //       <div className="flex gap-1">
// // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// // //       </div>
// // //       <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
// // //     </div>
// // //   );
// // // };

// // // const WAThumb = () => (
// // //   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // //     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// // //       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
// // //       <div className="text-[7px] font-bold text-white">WhatsApp</div>
// // //     </div>
// // //     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
// // //       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
// // //         <div className="h-1 bg-green-400 rounded w-full" />
// // //         <div className="h-1 bg-green-300 rounded w-4/5" />
// // //         <div className="h-1 bg-green-300 rounded w-3/5" />
// // //       </div>
// // //       <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
// // //     </div>
// // //   </div>
// // // );

// // // const MiniEmailPreview = ({ content }) => {
// // //   let blocks = [];
// // //   try { blocks = JSON.parse(content || "[]"); } catch { }
// // //   if (!blocks.length) return <EmailThumb />;
// // //   return (
// // //     <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
// // //       <div className="bg-indigo-600 px-2 py-1"><div className="h-1 bg-indigo-300 rounded w-3/4" /></div>
// // //       <div className="p-1.5 space-y-1">
// // //         {blocks.slice(0, 5).map((block, i) => {
// // //           const p = block.props || {};
// // //           if (block.type === "header") return <div key={i} className="h-2 rounded" style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }} />;
// // //           if (block.type === "image") return <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center"><span className="text-[8px] text-indigo-300">IMG</span></div>;
// // //           if (block.type === "button") return <div key={i} className="h-3 rounded mx-auto w-16 flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span></div>;
// // //           if (block.type === "divider") return <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />;
// // //           if (block.type === "columns") return <div key={i} className="flex gap-0.5"><div className="flex-1 h-4 bg-slate-100 rounded" /><div className="flex-1 h-4 bg-slate-100 rounded" /></div>;
// // //           if (block.type === "footer") return <div key={i} className="h-1 bg-slate-100 rounded w-full" />;
// // //           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /><div className="h-1 bg-slate-200 rounded w-3/5" /></div>;
// // //         })}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const GenerativePreview = ({ data }) => {
// // //   const bgColor = data.bgColor || "#1a1a2e";
// // //   const logoColor = data.logoColor || "#ffffff";
// // //   const accentColor = data.accentColor || "#f5a623";
// // //   const logo = data.logo || "";
// // //   const title = data.title || "";
// // //   const subtitle = data.subtitle || "";
// // //   const headerImg = data.headerImg || null;
// // //   return (
// // //     <div style={{ background: bgColor, color: logoColor, padding: "10px", borderRadius: "12px", height: "160px", width: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
// // //       {logo && <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>{logo}</div>}
// // //       {headerImg && <img src={headerImg} alt="header" style={{ width: "100%", height: "50px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />}
// // //       {title && <div style={{ fontWeight: "bold", fontSize: "12px", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>}
// // //       {subtitle && <div style={{ fontSize: "9px", color: accentColor, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</div>}
// // //     </div>
// // //   );
// // // };

// // // const MiniWAPreview = ({ content }) => {
// // //   let wa = {};
// // //   try { wa = JSON.parse(content || "{}"); } catch { }
// // //   const body = wa.body || "";
// // //   if (!body) return <WAThumb />;
// // //   return (
// // //     <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// // //       <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#25d366]" /><div className="text-[6px] font-bold text-white">WhatsApp</div></div>
// // //       <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
// // //         <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
// // //           {wa.header && <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">{wa.header}</div>}
// // //           <div className="text-[6px] text-slate-600 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{body.substring(0, 100)}</div>
// // //           {wa.actions?.length > 0 && <div className="mt-1 border-t border-slate-100 pt-0.5"><div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">{wa.actions[0].name}</div></div>}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const WAStatusBadge = ({ status }) => {
// // //   if (!status) return null;
// // //   if (status === "pending_review" || status === "pending")
// // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">⏳ Pending Review</span>;
// // //   if (status === "active")
// // //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">✓ Active</span>;
// // //   return null;
// // // };

// // // // ---------- Template Card ----------
// // // const TemplateCard = ({ tpl, onPreview, onEdit, onDuplicate, onDelete }) => {
// // //   const isWA = tpl.type === "whatsapp";
// // //   const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
// // //   const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

// // //   let isGenerative = false;
// // //   let generativeData = null;
// // //   if (!isWA && tpl.content) {
// // //     try {
// // //       const parsed = JSON.parse(tpl.content);
// // //       if (parsed && parsed.layout) {
// // //         isGenerative = true;
// // //         generativeData = parsed;
// // //       }
// // //     } catch (e) {}
// // //   }

// // //   return (
// // //     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
// // //       <div
// // //         onClick={onPreview}
// // //         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
// // //       >
// // //         {isWA ? (
// // //           <MiniWAPreview content={tpl.content} />
// // //         ) : isGenerative ? (
// // //           <GenerativePreview data={generativeData} />
// // //         ) : (
// // //           <MiniEmailPreview content={tpl.content} />
// // //         )}
// // //       </div>

// // //       <div onClick={onPreview} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
// // //         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
// // //         <div className="flex flex-wrap items-center gap-1.5 mb-2">
// // //           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
// // //             {isWA ? "💬 WhatsApp" : "✉️ Email"}
// // //           </span>
// // //           {tpl.category && (
// // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{tpl.category}</span>
// // //           )}
// // //           {isGenerative && (
// // //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">✨ Generative</span>
// // //           )}
// // //         </div>
// // //         <WAStatusBadge status={isWA ? tpl.status : null} />
// // //         <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
// // //       </div>

// // //       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
// // //         <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
// // //         <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
// // //         <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const StatCard = ({ label, value, icon, color }) => (
// // //   <div className={`rounded-2xl p-4 border ${color}`}>
// // //     <div className="flex items-center gap-2 mb-1">
// // //       <span className="text-lg">{icon}</span>
// // //       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
// // //     </div>
// // //     <p className="text-2xl font-bold text-slate-900">{value}</p>
// // //   </div>
// // // );

// // // // =====================================================
// // // // 1. CHANNEL SELECT MODAL
// // // // =====================================================
// // // const ChannelSelectModal = ({ onSelect, onClose }) => (
// // //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// // //     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
// // //       <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
// // //       <p className="text-sm text-slate-500 mb-6">Choose a channel to start</p>
// // //       <div className="flex gap-4 mb-6">
// // //         <button
// // //           onClick={() => onSelect("email")}
// // //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
// // //         >
// // //           <span className="text-4xl">✉️</span>
// // //           <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
// // //           <span className="text-xs text-slate-400 text-center">Build email templates</span>
// // //         </button>
// // //         <button
// // //           onClick={() => onSelect("whatsapp")}
// // //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
// // //         >
// // //           <span className="text-4xl">💬</span>
// // //           <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
// // //           <span className="text-xs text-slate-400 text-center">WhatsApp Business templates</span>
// // //         </button>
// // //       </div>
// // //       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
// // //     </div>
// // //   </div>
// // // );

// // // // =====================================================
// // // // 2. TEMPLATE PICKER MODAL (with tabs)
// // // // =====================================================
// // // const TemplatePickerModal = ({
// // //   onSelect,
// // //   onClose,
// // //   onAI,
// // //   onBasicTemplates,
// // //   onGenerativeTemplates
// // // }) => {
// // //   const [hoveredId, setHoveredId] = useState(null);
// // //   const [activeTab, setActiveTab] = useState("basic"); // "basic" or "generative"

// // //   // Basic templates (block-based)
// // //   const BASIC_TEMPLATES = [
// // //     {
// // //       id: "blank",
// // //       name: "Blank",
// // //       description: "Start from scratch",
// // //       emoji: "📄",
// // //       bg: "#f8fafc",
// // //       blocks: []
// // //     },
// // //     {
// // //       id: "welcome",
// // //       name: "Welcome Email",
// // //       description: "Greet new subscribers",
// // //       emoji: "👋",
// // //       bg: "#eff6ff",
// // //       blocks: [
// // //         { id: 1, type: "header", props: { text: "Welcome to {{company}}! 🎉", align: "center", color: "#1e40af", fontSize: "26px" } },
// // //         { id: 2, type: "image", props: { url: "https://placehold.co/560x200/3b82f6/ffffff?text=Welcome", alt: "Welcome" } },
// // //         { id: 3, type: "text", props: { text: "Hi {{first_name}},\n\nWe're thrilled to have you on board. Get started by exploring our features and let us know if you need any help.", align: "left", color: "#334155", fontSize: "14px" } },
// // //         { id: 4, type: "button", props: { label: "Get Started →", url: "#", bgColor: "#3b82f6", textColor: "#ffffff" } },
// // //         { id: 5, type: "divider", props: { color: "#e2e8f0" } },
// // //         { id: 6, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// // //       ]
// // //     },
// // //     {
// // //       id: "promo",
// // //       name: "Promotional Offer",
// // //       description: "Announce deals & discounts",
// // //       emoji: "🎁",
// // //       bg: "#fdf4ff",
// // //       blocks: [
// // //         { id: 1, type: "header", props: { text: "🔥 Special Offer Just for You!", align: "center", color: "#7e22ce", fontSize: "26px" } },
// // //         { id: 2, type: "image", props: { url: "https://placehold.co/560x200/a855f7/ffffff?text=SALE+50%25+OFF", alt: "Sale" } },
// // //         { id: 3, type: "text", props: { text: "Hi {{first_name}},\n\nDon't miss out on our limited time offer. Use the code below to get 50% off your next purchase.", align: "center", color: "#334155", fontSize: "14px" } },
// // //         { id: 4, type: "header", props: { text: "SAVE50", align: "center", color: "#7e22ce", fontSize: "32px" } },
// // //         { id: 5, type: "button", props: { label: "Claim Your Discount", url: "#", bgColor: "#a855f7", textColor: "#ffffff" } },
// // //         { id: 6, type: "text", props: { text: "Offer expires on {{date}}. Terms and conditions apply.", align: "center", color: "#94a3b8", fontSize: "12px" } },
// // //         { id: 7, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// // //       ]
// // //     },
// // //     {
// // //       id: "newsletter",
// // //       name: "Newsletter",
// // //       description: "Share updates & news",
// // //       emoji: "📰",
// // //       bg: "#f0fdf4",
// // //       blocks: [
// // //         { id: 1, type: "header", props: { text: "{{company}} Monthly Newsletter", align: "center", color: "#15803d", fontSize: "24px" } },
// // //         { id: 2, type: "divider", props: { color: "#bbf7d0" } },
// // //         { id: 3, type: "header", props: { text: "What's New This Month", align: "left", color: "#166534", fontSize: "18px" } },
// // //         { id: 4, type: "text", props: { text: "Hi {{first_name}},\n\nHere's a roundup of everything that happened this month. We've been busy building new features and improving your experience.", align: "left", color: "#334155", fontSize: "14px" } },
// // //         { id: 5, type: "columns", props: { left: "📊 Feature Update\nWe launched new analytics dashboard this month.", right: "🚀 Coming Soon\nExciting features are on the way. Stay tuned!" } },
// // //         { id: 6, type: "button", props: { label: "Read Full Update", url: "#", bgColor: "#16a34a", textColor: "#ffffff" } },
// // //         { id: 7, type: "divider", props: { color: "#e2e8f0" } },
// // //         { id: 8, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// // //       ]
// // //     },
// // //     {
// // //       id: "order",
// // //       name: "Order Confirmation",
// // //       description: "Confirm purchases",
// // //       emoji: "🛒",
// // //       bg: "#fff7ed",
// // //       blocks: [
// // //         { id: 1, type: "header", props: { text: "Order Confirmed! ✅", align: "center", color: "#c2410c", fontSize: "26px" } },
// // //         { id: 2, type: "text", props: { text: "Hi {{first_name}},\n\nThank you for your order! We've received your purchase and it's being processed.", align: "center", color: "#334155", fontSize: "14px" } },
// // //         { id: 3, type: "columns", props: { left: "Order ID\n#{{order_id}}", right: "Amount\n₹{{amount}}" } },
// // //         { id: 4, type: "divider", props: { color: "#fed7aa" } },
// // //         { id: 5, type: "text", props: { text: "Your order will be delivered by {{date}}. You'll receive a tracking link once it ships.", align: "left", color: "#334155", fontSize: "14px" } },
// // //         { id: 6, type: "button", props: { label: "Track Your Order", url: "#", bgColor: "#ea580c", textColor: "#ffffff" } },
// // //         { id: 7, type: "footer", props: { text: "© 2025 {{company}} · Need help? Reply to this email.", color: "#94a3b8", fontSize: "12px" } },
// // //       ]
// // //     },
// // //   ];

// // //   // Generative templates (the original set)
// // //   const GENERATIVE_TEMPLATES = [
// // //     { id: "halloween", name: "Halloween", thumb: "🎃", bg: "#000000", accent: "#ff6600", isGenerative: true },
// // //     { id: "darkmode", name: "Dark Mode", thumb: "🌙", bg: "#1a1a2e", accent: "#f5a623", isGenerative: true },
// // //     { id: "blackfriday", name: "Black Friday", thumb: "🖤", bg: "#0a0a0a", accent: "#ff0000", isGenerative: true },
// // //     { id: "christmas", name: "Christmas", thumb: "🎄", bg: "#1a472a", accent: "#c41e3a", isGenerative: true },
// // //     { id: "startup", name: "Startup Launch", thumb: "🚀", bg: "#0f172a", accent: "#3b82f6", isGenerative: true },
// // //     { id: "saas", name: "SaaS Promo", thumb: "💻", bg: "#f8fafc", accent: "#6366f1", isGenerative: true },
// // //   ];

// // //   const templates = activeTab === "basic" ? BASIC_TEMPLATES : GENERATIVE_TEMPLATES;

// // //   const MiniPreview = ({ template }) => {
// // //     if (template.isGenerative) {
// // //       return (
// // //         <div
// // //           className="w-full h-full flex items-center justify-center text-5xl"
// // //           style={{ backgroundColor: template.bg || "#f0f0f0" }}
// // //         >
// // //           {template.thumb || "📄"}
// // //         </div>
// // //       );
// // //     }
// // //     return (
// // //       <div className="w-full h-full flex flex-col p-2 space-y-1.5 overflow-hidden">
// // //         {template.blocks.slice(0, 4).map((block, i) => {
// // //           const p = block.props || {};
// // //           if (block.type === "header") return <div key={i} className="h-2.5 rounded font-bold" style={{ background: p.color || "#0f172a", width: i === 0 ? "80%" : "60%", opacity: 0.8 }} />;
// // //           if (block.type === "image") return <div key={i} className="h-10 rounded w-full bg-indigo-100 flex items-center justify-center"><span className="text-[8px] text-indigo-400">IMAGE</span></div>;
// // //           if (block.type === "button") return <div key={i} className="h-4 rounded w-24 mx-auto flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[7px] text-white font-bold">{p.label || "Button"}</span></div>;
// // //           if (block.type === "divider") return <div key={i} className="h-px w-full bg-slate-200" />;
// // //           if (block.type === "columns") return <div key={i} className="flex gap-1"><div className="flex-1 h-6 bg-slate-100 rounded" /><div className="flex-1 h-6 bg-slate-100 rounded" /></div>;
// // //           if (block.type === "footer") return <div key={i} className="h-1.5 bg-slate-100 rounded w-full mt-auto" />;
// // //           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /></div>;
// // //         })}
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
// // //       <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
// // //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// // //           <div>
// // //             <h2 className="text-lg font-bold text-slate-800">Choose a Template</h2>
// // //             <p className="text-xs text-slate-500 mt-0.5">Select a template to start building</p>
// // //           </div>
// // //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// // //         </div>

// // //         {/* Tabs + AI Button */}
// // //        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">

// // //   {/* BASIC */}
// // //   <button
// // //     onClick={onBasicTemplates}
// // //     className="border rounded-2xl p-6 text-left hover:border-indigo-500 hover:shadow-lg transition"
// // //   >
// // //     <div className="text-3xl mb-3">📄</div>
// // //     <h3 className="font-bold text-lg">Basic Templates</h3>
// // //     <p className="text-sm text-slate-500 mt-2">
// // //       Use ready-made email templates
// // //     </p>
// // //   </button>

// // //   {/* GENERATIVE */}
// // //   <button
// // //     onClick={onGenerativeTemplates}
// // //     className="border rounded-2xl p-6 text-left hover:border-purple-500 hover:shadow-lg transition"
// // //   >
// // //     <div className="text-3xl mb-3">✨</div>
// // //     <h3 className="font-bold text-lg">Generative Templates</h3>
// // //     <p className="text-sm text-slate-500 mt-2">
// // //       Halloween, Dark Mode and custom layouts
// // //     </p>
// // //   </button>

// // //   {/* AI */}
// // //   <button
// // //     onClick={onAI}
// // //     className="border rounded-2xl p-6 text-left hover:border-green-500 hover:shadow-lg transition"
// // //   >
// // //     <div className="text-3xl mb-3">🤖</div>
// // //     <h3 className="font-bold text-lg">AI Generated</h3>
// // //     <p className="text-sm text-slate-500 mt-2">
// // //       Generate template using AI
// // //     </p>
// // //   </button>

// // // </div>

// // //         <div className="flex-1 overflow-y-auto p-6">
// // //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
// // //             {templates.map((template) => (
// // //               <button
// // //                 key={template.id}
// // //                 onClick={() => onSelect(template)}
// // //                 onMouseEnter={() => setHoveredId(template.id)}
// // //                 onMouseLeave={() => setHoveredId(null)}
// // //                 className={`group flex flex-col rounded-xl border-2 overflow-hidden transition-all text-left ${hoveredId === template.id ? "border-indigo-500 shadow-lg scale-[1.02]" : "border-slate-200 hover:border-indigo-300"}`}
// // //               >
// // //                 <div className="h-36 flex flex-col overflow-hidden" style={{ background: template.bg || "#f8fafc" }}>
// // //                   <MiniPreview template={template} />
// // //                 </div>
// // //                 <div className="px-3 py-2 bg-white border-t border-slate-100">
// // //                   <p className="text-xs font-bold text-slate-800 truncate">{template.emoji || "📄"} {template.name}</p>
// // //                   <p className="text-[10px] text-slate-400 truncate mt-0.5">{template.description}</p>
// // //                 </div>
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // =====================================================
// // // // MAIN PAGE
// // // // =====================================================
// // // export default function TemplateLibraryPage() {
// // //   const navigate = useNavigate();
// // //   const [templates, setTemplates] = useState([]);
// // //   const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // //   const [editingId, setEditingId] = useState(undefined);
// // //   const [selectedChannel, setSelectedChannel] = useState("email");
// // //   const [initialBlocks, setInitialBlocks] = useState(null);

// // //   const [showChannelModal, setShowChannelModal] = useState(false);
// // //   const [showTemplatePicker, setShowTemplatePicker] = useState(false);
// // //   const [channel, setChannel] = useState("");
// // //   const [category, setCategory] = useState("All Categories");
// // //   const [search, setSearch] = useState("");
// // //   const [catOpen, setCatOpen] = useState(false);
// // //   const [deleteTarget, setDeleteTarget] = useState(null);
// // //   const [toast, setToast] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [previewTpl, setPreviewTpl] = useState(null);
// // //   const catRef = useRef();

// // //   const fetchTemplates = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const params = new URLSearchParams();
// // //       if (channel) params.append("type", channel);
// // //       if (category !== "All Categories") params.append("category", category);
// // //       if (search) params.append("search", search);
// // //       const res = await fetch(`${API}/?${params}`);
// // //       const data = await res.json();
// // //       setTemplates(data.data || []);
// // //       setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// // //     } catch (err) {
// // //       showToast("Failed to load templates", "error");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => { fetchTemplates(); }, [channel, category, search]);

// // //   useEffect(() => {
// // //     fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
// // //       .then((r) => r.json())
// // //       .then((data) => { if (data.synced?.length > 0) fetchTemplates(); })
// // //       .catch(() => {});
// // //   }, []);

// // //   useEffect(() => {
// // //     const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
// // //     document.addEventListener("mousedown", handler);
// // //     return () => document.removeEventListener("mousedown", handler);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
// // //   }, [toast]);

// // //   const showToast = (message, type = "success") => setToast({ message, type });

// // //   const handleDuplicate = async (tpl) => {
// // //     try {
// // //       const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
// // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl.name}" duplicated`); }
// // //     } catch { showToast("Failed to duplicate", "error"); }
// // //   };

// // //   const confirmDelete = async () => {
// // //     const tpl = templates.find((t) => t.id === deleteTarget);
// // //     try {
// // //       const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
// // //       if (res.ok) { fetchTemplates(); showToast(`"${tpl?.name}" deleted`, "error"); }
// // //     } catch { showToast("Failed to delete", "error"); }
// // //     setDeleteTarget(null);
// // //   };

// // //   // -------- CREATE TEMPLATE FLOW --------
// // //   const handleChannelSelect = (ch) => {
// // //     setShowChannelModal(false);
// // //     if (ch === "whatsapp") {
// // //       setSelectedChannel("whatsapp");
// // //       setEditingId(null);
// // //       setInitialBlocks(null);
// // //       setShowTemplatePicker(false);
// // //     } else if (ch === "email") {
// // //       setShowTemplatePicker(true);
// // //     }
// // //   };

// // //   const handleTemplatePick = (template) => {
// // //     setShowTemplatePicker(false);
// // //     // If it's a generative template, navigate to email-builder with the template id
// // //     if (template.isGenerative) {
// // //       navigate(`/email-builder?template=${template.id}`);
// // //       return;
// // //     }
// // //     // Basic template: open editor with blocks
// // //     const blocksWithIds = template.blocks.map((b, i) => ({
// // //       ...b,
// // //       id: Date.now() + i,
// // //     }));
// // //     setInitialBlocks(blocksWithIds);
// // //     setSelectedChannel("email");
// // //     setEditingId(null);
// // //   };

// // //   const handleAI = () => {
// // //     setShowTemplatePicker(false);
// // //     navigate("/ai-templates");
// // //   };

// // //   // -------- EDIT EXISTING TEMPLATE --------
// // //   const handleTemplateEdit = (tpl) => {
// // //     try {
// // //       const data = JSON.parse(tpl.content || "{}");
// // //       if (data.layout) {
// // //         navigate(`/email-builder?template=${data.layout}`);
// // //         return;
// // //       }
// // //     } catch (e) {}
// // //     setSelectedChannel(tpl.type || "email");
// // //     setEditingId(tpl.id);
// // //     setInitialBlocks(null);
// // //   };

// // //   const handlePreview = (tpl) => {
// // //     setPreviewTpl(tpl);
// // //   };

// // //   // If editor is open, render it
// // //   if (editingId !== undefined) {
// // //     return (
// // //       <TemplateEditorPage
// // //         templateId={editingId}
// // //         initialChannel={selectedChannel}
// // //         initialBlocks={initialBlocks}
// // //         onBack={() => {
// // //           fetchTemplates();
// // //           setEditingId(undefined);
// // //           setInitialBlocks(null);
// // //         }}
// // //       />
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
// // //       {/* Channel Selection Modal */}
// // //       {showChannelModal && (
// // //         <ChannelSelectModal
// // //           onSelect={handleChannelSelect}
// // //           onClose={() => setShowChannelModal(false)}
// // //         />
// // //       )}

// // //       {/* Template Picker Modal (with tabs) */}
// // //       {showTemplatePicker && (
// // //         <TemplatePickerModal
// // //   onSelect={handleTemplatePick}
// // //   onClose={() => setShowTemplatePicker(false)}
// // //   onAI={handleAI}
// // //   onBasicTemplates={() => {
// // //     console.log("Basic Click");
// // //   }}
// // //   onGenerativeTemplates={() => {
// // //     console.log("Generative Click");
// // //   }}
// // // />
// // //       )}

// // //       {/* Template Preview Modal */}
// // //       {previewTpl && (
// // //         <TemplatePreviewModal
// // //           tpl={previewTpl}
// // //           onClose={() => setPreviewTpl(null)}
// // //         />
// // //       )}

// // //       {/* Header */}
// // //       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
// // //         <div className="flex items-center gap-3">
// // //           <button
// // //             onClick={() => navigate("/dashboard")}
// // //             className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
// // //           >
// // //             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
// // //             </svg>
// // //           </button>
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
// // //             <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
// // //           </div>
// // //         </div>
// // //         <button
// // //           onClick={() => setShowChannelModal(true)}
// // //           className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
// // //         >
// // //           + Create Template
// // //         </button>
// // //       </div>

// // //       {/* Stats */}
// // //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// // //         <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
// // //         <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
// // //         <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
// // //         <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
// // //       </div>

// // //       {/* Filter Bar & Grid */}
// // //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// // //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// // //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// // //             {CHANNEL_TABS.map((tab) => (
// // //               <button
// // //                 key={tab.value}
// // //                 onClick={() => setChannel(tab.value)}
// // //                 className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
// // //               >
// // //                 {tab.label}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           <div className="relative" ref={catRef}>
// // //             <button
// // //               onClick={() => setCatOpen((o) => !o)}
// // //               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
// // //             >
// // //               {category} <span className="text-slate-400 text-[10px]">▾</span>
// // //             </button>
// // //             {catOpen && (
// // //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
// // //                 {CATEGORIES.map((c) => (
// // //                   <div
// // //                     key={c}
// // //                     onClick={() => { setCategory(c); setCatOpen(false); }}
// // //                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
// // //                   >
// // //                     {c}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>

// // //           <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

// // //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
// // //             <span className="text-slate-400 text-sm">🔍</span>
// // //             <input
// // //               value={search}
// // //               onChange={(e) => setSearch(e.target.value)}
// // //               placeholder="Search templates..."
// // //               className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
// // //             />
// // //             {search && (
// // //               <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">×</button>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div className="p-5">
// // //           {loading ? (
// // //             <div className="text-center py-16 text-slate-400">Loading templates...</div>
// // //           ) : templates.length === 0 ? (
// // //             <div className="text-center py-16">
// // //               <div className="text-4xl mb-3">🗂</div>
// // //               <p className="text-sm font-semibold text-slate-700">No templates found</p>
// // //               <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
// // //             </div>
// // //           ) : (
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// // //               {templates.map((tpl) => (
// // //                 <TemplateCard
// // //                   key={tpl.id}
// // //                   tpl={tpl}
// // //                   onPreview={() => handlePreview(tpl)}
// // //                   onEdit={() => handleTemplateEdit(tpl)}
// // //                   onDuplicate={() => handleDuplicate(tpl)}
// // //                   onDelete={() => setDeleteTarget(tpl.id)}
// // //                 />
// // //               ))}
// // //               <div
// // //                 onClick={() => setShowChannelModal(true)}
// // //                 className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
// // //               >
// // //                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
// // //                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
// // //                 </div>
// // //                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       <ConfirmDialog
// // //         isOpen={!!deleteTarget}
// // //         onClose={() => setDeleteTarget(null)}
// // //         onConfirm={confirmDelete}
// // //         title="Delete Template"
// // //         message="Are you sure you want to delete this template? This action cannot be undone."
// // //       />
// // //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// // //     </div>
// // //   );
// // // }



// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import TemplateEditorPage from "./TemplateEditorPage";

// // const API = "https://wynreach-backend.onrender.com/api/templates";

// // const CHANNEL_TABS = [
// //   { label: "All", value: "" },
// //   { label: "Email", value: "email" },
// //   { label: "WhatsApp", value: "whatsapp" },
// // ];
// // const CATEGORIES = [
// //   "All Categories",
// //   "Marketing",
// //   "Utility",
// //   "Authentication"
// // ];

// // // ---------- ConfirmDialog ----------
// // const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// //       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
// //         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
// //         <p className="text-sm text-slate-500 mb-6">{message}</p>
// //         <div className="flex gap-3">
// //           <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
// //           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ---------- Toast ----------
// // const Toast = ({ message, type = "success", onClose }) => (
// //   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
// //     <span>{type === "success" ? "✓" : "✕"}</span>
// //     {message}
// //     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
// //   </div>
// // );

// // // ---------- Helper to parse template content ----------
// // const parseTemplateContent = (content) => {
// //   if (!content) return { isGenerative: false, blocks: [], generativeData: null };
// //   try {
// //     const parsed = JSON.parse(content);
// //     if (Array.isArray(parsed)) {
// //       return { isGenerative: false, blocks: parsed, generativeData: null };
// //     }
// //     if (parsed && parsed.layout) {
// //       return { isGenerative: true, blocks: [], generativeData: parsed };
// //     }
// //     return { isGenerative: false, blocks: [], generativeData: null };
// //   } catch (e) {
// //     return { isGenerative: false, blocks: [], generativeData: null };
// //   }
// // };

// // // ---------- Full preview modals ----------
// // const GenerativeFullPreview = ({ data }) => {
// //   if (!data) return null;
// //   return (
// //     <div
// //       style={{
// //         background: data.bgColor || "#ffffff",
// //         fontFamily: data.font || "Arial, sans-serif",
// //         padding: "30px",
// //         borderRadius: "12px",
// //         border: "1px solid #e2e8f0",
// //         maxWidth: "700px",
// //         margin: "0 auto",
// //       }}
// //     >
// //       {data.logo && (
// //         <div style={{ color: data.logoColor || "#000000", fontSize: "28px", fontWeight: 700, marginBottom: "20px", textAlign: data.logoAlign || "center" }}>
// //           {data.logo}
// //         </div>
// //       )}
// //       {data.headerImg && (
// //         <img src={data.headerImg} alt="Header" style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }} />
// //       )}
// //       {data.tag && (
// //         <div style={{ display: "inline-block", background: data.accentColor || "#4f46e5", color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, marginBottom: "15px" }}>
// //           {data.tag}
// //         </div>
// //       )}
// //       <h1 style={{ color: data.logoColor || "#000000", fontSize: "38px", marginBottom: "10px", fontWeight: 700 }}>{data.title}</h1>
// //       {data.subtitle && (
// //         <h3 style={{ color: data.accentColor || "#4f46e5", marginBottom: "20px", fontSize: "18px" }}>{data.subtitle}</h3>
// //       )}
// //       <p style={{ color: data.logoColor || "#333333", lineHeight: 1.8, fontSize: "16px", whiteSpace: "pre-wrap", marginBottom: "20px" }}>{data.body}</p>
// //       {data.buttonText && (
// //         <div style={{ marginTop: "30px", textAlign: "center" }}>
// //           <span style={{ background: data.buttonColor || data.accentColor || "#4f46e5", color: data.buttonTextColor || "#ffffff", padding: "14px 30px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, display: "inline-block" }}>
// //             {data.buttonText}
// //           </span>
// //         </div>
// //       )}
// //       {data.footerText && (
// //         <div style={{ marginTop: "40px", fontSize: "13px", opacity: 0.7, color: data.logoColor || "#666666", textAlign: "center", borderTop: `1px solid ${data.accentColor || "#e2e8f0"}40`, paddingTop: "20px" }}>
// //           {data.footerText}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const BlockFullPreview = ({ blocks }) => {
// //   const safeBlocks = Array.isArray(blocks) ? blocks : [];
// //   if (safeBlocks.length === 0) return <div className="text-center py-8">No content</div>;

// //   const EmailBlockContent = ({ block }) => {
// //     const p = block.props;
// //     switch (block.type) {
// //       case "header":
// //         return <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: "bold", padding: "8px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// //       case "text":
// //         return <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: "8px 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap" }}>{p.text}</p>;
// //       case "image":
// //         return <img src={p.url} alt={p.alt} style={{ width: "100%", borderRadius: 8, display: "block", margin: "12px 0" }} />;
// //       case "button":
// //         return <div style={{ textAlign: "center", margin: "14px 0" }}><span style={{ display: "inline-block", background: p.bgColor, color: p.textColor, padding: "11px 28px", borderRadius: 7, fontWeight: "bold", fontSize: 14 }}>{p.label}</span></div>;
// //       case "columns":
// //         return <div style={{ display: "flex", gap: 12, margin: "8px 0" }}><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.left}</div><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.right}</div></div>;
// //       case "divider":
// //         return <hr style={{ border: "none", borderTop: `1px solid ${p.color}`, margin: "14px 0" }} />;
// //       case "footer":
// //         return <div style={{ textAlign: "center", color: p.color, fontSize: p.fontSize, padding: "10px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", background: "#fff", maxWidth: "700px", margin: "0 auto" }}>
// //       {safeBlocks.map((block, idx) => (
// //         <EmailBlockContent key={idx} block={block} />
// //       ))}
// //     </div>
// //   );
// // };

// // const WhatsAppFullPreview = ({ content }) => {
// //   let wa = {};
// //   try { wa = JSON.parse(content || "{}"); } catch { }
// //   return (
// //     <div className="bg-[#e5ddd5] p-4 rounded-xl" style={{ maxWidth: "500px", margin: "0 auto" }}>
// //       <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow border border-slate-100">
// //         <div className="bg-[#075e54] px-4 py-2 flex items-center gap-2">
// //           <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">A</div>
// //           <div className="text-white text-xs font-semibold">Business Name</div>
// //         </div>
// //         <div className="p-4">
// //           {wa.header && <div className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">{wa.header}</div>}
// //           <p className="text-sm text-slate-700 whitespace-pre-wrap">{wa.body || "No message content"}</p>
// //           {wa.actions?.length > 0 && (
// //             <div className="mt-3 border-t pt-2">
// //               {wa.actions.map((act, i) => (
// //                 <div key={i} className="text-sm font-semibold text-[#00a5f4] text-center py-1">{act.name}</div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const TemplatePreviewModal = ({ tpl, onClose }) => {
// //   const isWA = tpl.type === "whatsapp";
// //   const parsed = parseTemplateContent(tpl.content);

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-auto">
// //       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
// //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// //           <div>
// //             <h2 className="text-lg font-bold text-slate-800">{tpl.name}</h2>
// //             <p className="text-xs text-slate-500">{isWA ? "WhatsApp Template" : "Email Template"}</p>
// //           </div>
// //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// //         </div>
// //         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
// //           {isWA ? (
// //             <WhatsAppFullPreview content={tpl.content} />
// //           ) : parsed.isGenerative ? (
// //             <GenerativeFullPreview data={parsed.generativeData} />
// //           ) : (
// //             <BlockFullPreview blocks={parsed.blocks} />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ---------- Mini previews for cards ----------
// // const EmailThumb = () => {
// //   const accent = "#6366f1";
// //   return (
// //     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
// //       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
// //       <div className="h-5 bg-slate-200 rounded" />
// //       <div className="space-y-0.5">
// //         <div className="h-1 bg-slate-200 rounded" />
// //         <div className="h-1 bg-slate-200 rounded w-3/4" />
// //       </div>
// //       <div className="flex gap-1">
// //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// //         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
// //       </div>
// //       <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
// //     </div>
// //   );
// // };

// // const WAThumb = () => (
// //   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// //     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
// //       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
// //       <div className="text-[7px] font-bold text-white">WhatsApp</div>
// //     </div>
// //     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
// //       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
// //         <div className="h-1 bg-green-400 rounded w-full" />
// //         <div className="h-1 bg-green-300 rounded w-4/5" />
// //         <div className="h-1 bg-green-300 rounded w-3/5" />
// //       </div>
// //       <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
// //     </div>
// //   </div>
// // );

// // const MiniEmailPreview = ({ content }) => {
// //   let blocks = [];
// //   try { blocks = JSON.parse(content || "[]"); } catch { }
// //   if (!blocks.length) return <EmailThumb />;
// //   return (
// //     <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
// //       <div className="bg-indigo-600 px-2 py-1"><div className="h-1 bg-indigo-300 rounded w-3/4" /></div>
// //       <div className="p-1.5 space-y-1">
// //         {blocks.slice(0, 5).map((block, i) => {
// //           const p = block.props || {};
// //           if (block.type === "header") return <div key={i} className="h-2 rounded" style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }} />;
// //           if (block.type === "image") return <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center"><span className="text-[8px] text-indigo-300">IMG</span></div>;
// //           if (block.type === "button") return <div key={i} className="h-3 rounded mx-auto w-16 flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span></div>;
// //           if (block.type === "divider") return <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />;
// //           if (block.type === "columns") return <div key={i} className="flex gap-0.5"><div className="flex-1 h-4 bg-slate-100 rounded" /><div className="flex-1 h-4 bg-slate-100 rounded" /></div>;
// //           if (block.type === "footer") return <div key={i} className="h-1 bg-slate-100 rounded w-full" />;
// //           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /><div className="h-1 bg-slate-200 rounded w-3/5" /></div>;
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // const GenerativePreview = ({ data }) => {
// //   const bgColor = data.bgColor || "#1a1a2e";
// //   const logoColor = data.logoColor || "#ffffff";
// //   const accentColor = data.accentColor || "#f5a623";
// //   const logo = data.logo || "";
// //   const title = data.title || "";
// //   const subtitle = data.subtitle || "";
// //   const headerImg = data.headerImg || null;
// //   return (
// //     <div style={{ background: bgColor, color: logoColor, padding: "10px", borderRadius: "12px", height: "160px", width: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
// //       {logo && <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>{logo}</div>}
// //       {headerImg && <img src={headerImg} alt="header" style={{ width: "100%", height: "50px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />}
// //       {title && <div style={{ fontWeight: "bold", fontSize: "12px", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>}
// //       {subtitle && <div style={{ fontSize: "9px", color: accentColor, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</div>}
// //     </div>
// //   );
// // };

// // const MiniWAPreview = ({ content }) => {
// //   let wa = {};
// //   try { wa = JSON.parse(content || "{}"); } catch { }
// //   const body = wa.body || "";
// //   if (!body) return <WAThumb />;
// //   return (
// //     <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
// //       <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#25d366]" /><div className="text-[6px] font-bold text-white">WhatsApp</div></div>
// //       <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
// //         <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
// //           {wa.header && <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">{wa.header}</div>}
// //           <div className="text-[6px] text-slate-600 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{body.substring(0, 100)}</div>
// //           {wa.actions?.length > 0 && <div className="mt-1 border-t border-slate-100 pt-0.5"><div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">{wa.actions[0].name}</div></div>}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const WAStatusBadge = ({ status }) => {
// //   if (!status) return null;
// //   if (status === "pending_review" || status === "pending")
// //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">⏳ Pending Review</span>;
// //   if (status === "active")
// //     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">✓ Active</span>;
// //   return null;
// // };

// // // ---------- Template Card ----------
// // const TemplateCard = ({ tpl, onPreview, onEdit, onDuplicate, onDelete }) => {
// //   const isWA = tpl.type === "whatsapp";
// //   const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
// //   const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

// //   let isGenerative = false;
// //   let generativeData = null;
// //   if (!isWA && tpl.content) {
// //     try {
// //       const parsed = JSON.parse(tpl.content);
// //       if (parsed && parsed.layout) {
// //         isGenerative = true;
// //         generativeData = parsed;
// //       }
// //     } catch (e) {}
// //   }

// //   return (
// //     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
// //       <div
// //         onClick={onPreview}
// //         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
// //       >
// //         {isWA ? (
// //           <MiniWAPreview content={tpl.content} />
// //         ) : isGenerative ? (
// //           <GenerativePreview data={generativeData} />
// //         ) : (
// //           <MiniEmailPreview content={tpl.content} />
// //         )}
// //       </div>

// //       <div onClick={onPreview} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
// //         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
// //         <div className="flex flex-wrap items-center gap-1.5 mb-2">
// //           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
// //             {isWA ? "💬 WhatsApp" : "✉️ Email"}
// //           </span>
// //           {tpl.category && (
// //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{tpl.category}</span>
// //           )}
// //           {isGenerative && (
// //             <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">✨ Generative</span>
// //           )}
// //         </div>
// //         <WAStatusBadge status={isWA ? tpl.status : null} />
// //         <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
// //       </div>

// //       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
// //         <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
// //         <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
// //         <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
// //       </div>
// //     </div>
// //   );
// // };

// // const StatCard = ({ label, value, icon, color }) => (
// //   <div className={`rounded-2xl p-4 border ${color}`}>
// //     <div className="flex items-center gap-2 mb-1">
// //       <span className="text-lg">{icon}</span>
// //       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
// //     </div>
// //     <p className="text-2xl font-bold text-slate-900">{value}</p>
// //   </div>
// // );

// // // =====================================================
// // // 1. CHANNEL SELECT MODAL
// // // =====================================================
// // const ChannelSelectModal = ({ onSelect, onClose }) => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
// //     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
// //       <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
// //       <p className="text-sm text-slate-500 mb-6">Choose a channel to start</p>
// //       <div className="flex gap-4 mb-6">
// //         <button
// //           onClick={() => onSelect("email")}
// //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
// //         >
// //           <span className="text-4xl">✉️</span>
// //           <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
// //           <span className="text-xs text-slate-400 text-center">Build email templates</span>
// //         </button>
// //         <button
// //           onClick={() => onSelect("whatsapp")}
// //           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
// //         >
// //           <span className="text-4xl">💬</span>
// //           <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
// //           <span className="text-xs text-slate-400 text-center">WhatsApp Business templates</span>
// //         </button>
// //       </div>
// //       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
// //     </div>
// //   </div>
// // );

// // // =====================================================
// // // 2. TEMPLATE PICKER MODAL (three cards)
// // // =====================================================
// // const TemplatePickerModal = ({ onBasic, onGenerative, onAI, onClose }) => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
// //     <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
// //       <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// //         <div>
// //           <h2 className="text-lg font-bold text-slate-800">Choose Template Type</h2>
// //           <p className="text-xs text-slate-500 mt-0.5">Select a category to get started</p>
// //         </div>
// //         <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// //       </div>
// //       <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
// //         <button
// //           onClick={onBasic}
// //           className="border rounded-2xl p-6 text-left hover:border-indigo-500 hover:shadow-lg transition"
// //         >
// //           <div className="text-3xl mb-3">📄</div>
// //           <h3 className="font-bold text-lg">Basic Templates</h3>
// //           <p className="text-sm text-slate-500 mt-2">Use ready‑made email templates</p>
// //         </button>
// //         <button
// //           onClick={onGenerative}
// //           className="border rounded-2xl p-6 text-left hover:border-purple-500 hover:shadow-lg transition"
// //         >
// //           <div className="text-3xl mb-3">✨</div>
// //           <h3 className="font-bold text-lg">Generative Templates</h3>
// //           <p className="text-sm text-slate-500 mt-2">Halloween, Dark Mode and custom layouts</p>
// //         </button>
// //         <button
// //           onClick={onAI}
// //           className="border rounded-2xl p-6 text-left hover:border-green-500 hover:shadow-lg transition"
// //         >
// //           <div className="text-3xl mb-3">🤖</div>
// //           <h3 className="font-bold text-lg">AI Generated</h3>
// //           <p className="text-sm text-slate-500 mt-2">Generate template using AI</p>
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // // =====================================================
// // // 3. TEMPLATE GRID MODAL (reusable for Basic & Generative)
// // // =====================================================
// // const TemplateGridModal = ({ templates, title, onSelect, onClose }) => {
// //   const [hoveredId, setHoveredId] = useState(null);

// //   const MiniPreview = ({ template }) => {
// //     if (template.isGenerative) {
// //       return (
// //         <div
// //           className="w-full h-full flex items-center justify-center text-5xl"
// //           style={{ backgroundColor: template.bg || "#f0f0f0" }}
// //         >
// //           {template.thumb || "📄"}
// //         </div>
// //       );
// //     }
// //     return (
// //       <div className="w-full h-full flex flex-col p-2 space-y-1.5 overflow-hidden">
// //         {template.blocks.slice(0, 4).map((block, i) => {
// //           const p = block.props || {};
// //           if (block.type === "header") return <div key={i} className="h-2.5 rounded font-bold" style={{ background: p.color || "#0f172a", width: i === 0 ? "80%" : "60%", opacity: 0.8 }} />;
// //           if (block.type === "image") return <div key={i} className="h-10 rounded w-full bg-indigo-100 flex items-center justify-center"><span className="text-[8px] text-indigo-400">IMAGE</span></div>;
// //           if (block.type === "button") return <div key={i} className="h-4 rounded w-24 mx-auto flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[7px] text-white font-bold">{p.label || "Button"}</span></div>;
// //           if (block.type === "divider") return <div key={i} className="h-px w-full bg-slate-200" />;
// //           if (block.type === "columns") return <div key={i} className="flex gap-1"><div className="flex-1 h-6 bg-slate-100 rounded" /><div className="flex-1 h-6 bg-slate-100 rounded" /></div>;
// //           if (block.type === "footer") return <div key={i} className="h-1.5 bg-slate-100 rounded w-full mt-auto" />;
// //           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /></div>;
// //         })}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
// //       <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
// //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
// //           <div>
// //             <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// //             <p className="text-xs text-slate-500 mt-0.5">Select a template to start building</p>
// //           </div>
// //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
// //         </div>
// //         <div className="flex-1 overflow-y-auto p-6">
// //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
// //             {templates.map((template) => (
// //               <button
// //                 key={template.id}
// //                 onClick={() => onSelect(template)}
// //                 onMouseEnter={() => setHoveredId(template.id)}
// //                 onMouseLeave={() => setHoveredId(null)}
// //                 className={`group flex flex-col rounded-xl border-2 overflow-hidden transition-all text-left ${hoveredId === template.id ? "border-indigo-500 shadow-lg scale-[1.02]" : "border-slate-200 hover:border-indigo-300"}`}
// //               >
// //                 <div className="h-36 flex flex-col overflow-hidden" style={{ background: template.bg || "#f8fafc" }}>
// //                   <MiniPreview template={template} />
// //                 </div>
// //                 <div className="px-3 py-2 bg-white border-t border-slate-100">
// //                   <p className="text-xs font-bold text-slate-800 truncate">{template.emoji || "📄"} {template.name}</p>
// //                   <p className="text-[10px] text-slate-400 truncate mt-0.5">{template.description}</p>
// //                 </div>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // =====================================================
// // // 4. TEMPLATE DEFINITIONS (top‑level)
// // // =====================================================
// // const BASIC_TEMPLATES = [
// //   {
// //     id: "blank",
// //     name: "Blank",
// //     description: "Start from scratch",
// //     emoji: "📄",
// //     bg: "#f8fafc",
// //     blocks: []
// //   },
// //   {
// //     id: "welcome",
// //     name: "Welcome Email",
// //     description: "Greet new subscribers",
// //     emoji: "👋",
// //     bg: "#eff6ff",
// //     blocks: [
// //       { id: 1, type: "header", props: { text: "Welcome to {{company}}! 🎉", align: "center", color: "#1e40af", fontSize: "26px" } },
// //       { id: 2, type: "image", props: { url: "https://placehold.co/560x200/3b82f6/ffffff?text=Welcome", alt: "Welcome" } },
// //       { id: 3, type: "text", props: { text: "Hi {{first_name}},\n\nWe're thrilled to have you on board. Get started by exploring our features and let us know if you need any help.", align: "left", color: "#334155", fontSize: "14px" } },
// //       { id: 4, type: "button", props: { label: "Get Started →", url: "#", bgColor: "#3b82f6", textColor: "#ffffff" } },
// //       { id: 5, type: "divider", props: { color: "#e2e8f0" } },
// //       { id: 6, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// //     ]
// //   },
// //   {
// //     id: "promo",
// //     name: "Promotional Offer",
// //     description: "Announce deals & discounts",
// //     emoji: "🎁",
// //     bg: "#fdf4ff",
// //     blocks: [
// //       { id: 1, type: "header", props: { text: "🔥 Special Offer Just for You!", align: "center", color: "#7e22ce", fontSize: "26px" } },
// //       { id: 2, type: "image", props: { url: "https://placehold.co/560x200/a855f7/ffffff?text=SALE+50%25+OFF", alt: "Sale" } },
// //       { id: 3, type: "text", props: { text: "Hi {{first_name}},\n\nDon't miss out on our limited time offer. Use the code below to get 50% off your next purchase.", align: "center", color: "#334155", fontSize: "14px" } },
// //       { id: 4, type: "header", props: { text: "SAVE50", align: "center", color: "#7e22ce", fontSize: "32px" } },
// //       { id: 5, type: "button", props: { label: "Claim Your Discount", url: "#", bgColor: "#a855f7", textColor: "#ffffff" } },
// //       { id: 6, type: "text", props: { text: "Offer expires on {{date}}. Terms and conditions apply.", align: "center", color: "#94a3b8", fontSize: "12px" } },
// //       { id: 7, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// //     ]
// //   },
// //   {
// //     id: "newsletter",
// //     name: "Newsletter",
// //     description: "Share updates & news",
// //     emoji: "📰",
// //     bg: "#f0fdf4",
// //     blocks: [
// //       { id: 1, type: "header", props: { text: "{{company}} Monthly Newsletter", align: "center", color: "#15803d", fontSize: "24px" } },
// //       { id: 2, type: "divider", props: { color: "#bbf7d0" } },
// //       { id: 3, type: "header", props: { text: "What's New This Month", align: "left", color: "#166534", fontSize: "18px" } },
// //       { id: 4, type: "text", props: { text: "Hi {{first_name}},\n\nHere's a roundup of everything that happened this month. We've been busy building new features and improving your experience.", align: "left", color: "#334155", fontSize: "14px" } },
// //       { id: 5, type: "columns", props: { left: "📊 Feature Update\nWe launched new analytics dashboard this month.", right: "🚀 Coming Soon\nExciting features are on the way. Stay tuned!" } },
// //       { id: 6, type: "button", props: { label: "Read Full Update", url: "#", bgColor: "#16a34a", textColor: "#ffffff" } },
// //       { id: 7, type: "divider", props: { color: "#e2e8f0" } },
// //       { id: 8, type: "footer", props: { text: "© 2025 {{company}} · Unsubscribe", color: "#94a3b8", fontSize: "12px" } },
// //     ]
// //   },
// //   {
// //     id: "order",
// //     name: "Order Confirmation",
// //     description: "Confirm purchases",
// //     emoji: "🛒",
// //     bg: "#fff7ed",
// //     blocks: [
// //       { id: 1, type: "header", props: { text: "Order Confirmed! ✅", align: "center", color: "#c2410c", fontSize: "26px" } },
// //       { id: 2, type: "text", props: { text: "Hi {{first_name}},\n\nThank you for your order! We've received your purchase and it's being processed.", align: "center", color: "#334155", fontSize: "14px" } },
// //       { id: 3, type: "columns", props: { left: "Order ID\n#{{order_id}}", right: "Amount\n₹{{amount}}" } },
// //       { id: 4, type: "divider", props: { color: "#fed7aa" } },
// //       { id: 5, type: "text", props: { text: "Your order will be delivered by {{date}}. You'll receive a tracking link once it ships.", align: "left", color: "#334155", fontSize: "14px" } },
// //       { id: 6, type: "button", props: { label: "Track Your Order", url: "#", bgColor: "#ea580c", textColor: "#ffffff" } },
// //       { id: 7, type: "footer", props: { text: "© 2025 {{company}} · Need help? Reply to this email.", color: "#94a3b8", fontSize: "12px" } },
// //     ]
// //   },
// // ];

// // const GENERATIVE_TEMPLATES = [
// //   { id: "halloween", name: "Halloween", thumb: "🎃", bg: "#000000", accent: "#ff6600", isGenerative: true },
// //   { id: "darkmode", name: "Dark Mode", thumb: "🌙", bg: "#1a1a2e", accent: "#f5a623", isGenerative: true },
// //   { id: "blackfriday", name: "Black Friday", thumb: "🖤", bg: "#0a0a0a", accent: "#ff0000", isGenerative: true },
// //   { id: "christmas", name: "Christmas", thumb: "🎄", bg: "#1a472a", accent: "#c41e3a", isGenerative: true },
// //   { id: "startup", name: "Startup Launch", thumb: "🚀", bg: "#0f172a", accent: "#3b82f6", isGenerative: true },
// //   { id: "saas", name: "SaaS Promo", thumb: "💻", bg: "#f8fafc", accent: "#6366f1", isGenerative: true },
// // ];

// // // =====================================================
// // // MAIN PAGE
// // // =====================================================
// // export default function TemplateLibraryPage() {
// //   const navigate = useNavigate();
// //   const [templates, setTemplates] = useState([]);
// //   const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// //   const [editingId, setEditingId] = useState(undefined);
// //   const [selectedChannel, setSelectedChannel] = useState("email");
// //   const [initialBlocks, setInitialBlocks] = useState(null);

// //   const [showChannelModal, setShowChannelModal] = useState(false);
// //   const [showTemplatePicker, setShowTemplatePicker] = useState(false);
// //   const [showBasicModal, setShowBasicModal] = useState(false);
// //   const [showGenerativeModal, setShowGenerativeModal] = useState(false);

// //   const [channel, setChannel] = useState("");
// //   const [category, setCategory] = useState("All Categories");
// //   const [search, setSearch] = useState("");
// //   const [catOpen, setCatOpen] = useState(false);
// //   const [deleteTarget, setDeleteTarget] = useState(null);
// //   const [toast, setToast] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [previewTpl, setPreviewTpl] = useState(null);
// //   const catRef = useRef();

// //   const fetchTemplates = async () => {
// //     try {
// //       setLoading(true);
// //       const params = new URLSearchParams();
// //       if (channel) params.append("type", channel);
// //       if (category !== "All Categories") params.append("category", category);
// //       if (search) params.append("search", search);
// //       const res = await fetch(`${API}/?${params}`);
// //       const data = await res.json();
// //       setTemplates(data.data || []);
// //       setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
// //     } catch (err) {
// //       showToast("Failed to load templates", "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchTemplates(); }, [channel, category, search]);

// //   useEffect(() => {
// //     fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
// //       .then((r) => r.json())
// //       .then((data) => { if (data.synced?.length > 0) fetchTemplates(); })
// //       .catch(() => {});
// //   }, []);

// //   useEffect(() => {
// //     const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
// //     document.addEventListener("mousedown", handler);
// //     return () => document.removeEventListener("mousedown", handler);
// //   }, []);

// //   useEffect(() => {
// //     if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
// //   }, [toast]);

// //   const showToast = (message, type = "success") => setToast({ message, type });

// //   const handleDuplicate = async (tpl) => {
// //     try {
// //       const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
// //       if (res.ok) { fetchTemplates(); showToast(`"${tpl.name}" duplicated`); }
// //     } catch { showToast("Failed to duplicate", "error"); }
// //   };

// //   const confirmDelete = async () => {
// //     const tpl = templates.find((t) => t.id === deleteTarget);
// //     try {
// //       const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
// //       if (res.ok) { fetchTemplates(); showToast(`"${tpl?.name}" deleted`, "error"); }
// //     } catch { showToast("Failed to delete", "error"); }
// //     setDeleteTarget(null);
// //   };

// //   // -------- CREATE TEMPLATE FLOW --------
// //   const handleChannelSelect = (ch) => {
// //     setShowChannelModal(false);
// //     if (ch === "whatsapp") {
// //       setSelectedChannel("whatsapp");
// //       setEditingId(null);
// //       setInitialBlocks(null);
// //       setShowTemplatePicker(false);
// //     } else if (ch === "email") {
// //       setShowTemplatePicker(true);
// //     }
// //   };

// //   const handleTemplatePick = (template) => {
// //     // Close whichever modal is open
// //     setShowBasicModal(false);
// //     setShowGenerativeModal(false);
// //     setShowTemplatePicker(false);

// //     // If it's a generative template, navigate to email-builder with the template id
// //     if (template.isGenerative) {
// //       navigate(`/email-builder?template=${template.id}`);
// //       return;
// //     }
// //     // Basic template: open editor with blocks
// //     const blocksWithIds = template.blocks.map((b, i) => ({
// //       ...b,
// //       id: Date.now() + i,
// //     }));
// //     setInitialBlocks(blocksWithIds);
// //     setSelectedChannel("email");
// //     setEditingId(null);
// //   };

// //   const handleAI = () => {
// //     setShowTemplatePicker(false);
// //     navigate("/ai-templates");
// //   };

// //   // -------- EDIT EXISTING TEMPLATE --------
// //   const handleTemplateEdit = (tpl) => {
// //     try {
// //       const data = JSON.parse(tpl.content || "{}");
// //       if (data.layout) {
// //         navigate(`/email-builder?template=${data.layout}`);
// //         return;
// //       }
// //     } catch (e) {}
// //     setSelectedChannel(tpl.type || "email");
// //     setEditingId(tpl.id);
// //     setInitialBlocks(null);
// //   };

// //   const handlePreview = (tpl) => {
// //     setPreviewTpl(tpl);
// //   };

// //   // If editor is open, render it
// //   if (editingId !== undefined) {
// //     return (
// //       <TemplateEditorPage
// //         templateId={editingId}
// //         initialChannel={selectedChannel}
// //         initialBlocks={initialBlocks}
// //         onBack={() => {
// //           fetchTemplates();
// //           setEditingId(undefined);
// //           setInitialBlocks(null);
// //         }}
// //       />
// //     );
// //   }

// //   return (
// //     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
// //       {/* Channel Selection Modal */}
// //       {showChannelModal && (
// //         <ChannelSelectModal
// //           onSelect={handleChannelSelect}
// //           onClose={() => setShowChannelModal(false)}
// //         />
// //       )}

// //       {/* Template Picker Modal (three cards) */}
// //       {showTemplatePicker && (
// //         <TemplatePickerModal
// //           onBasic={() => {
// //             setShowTemplatePicker(false);
// //             setShowBasicModal(true);
// //           }}
// //           onGenerative={() => {
// //             setShowTemplatePicker(false);
// //             setShowGenerativeModal(true);
// //           }}
// //           onAI={handleAI}
// //           onClose={() => setShowTemplatePicker(false)}
// //         />
// //       )}

// //       {/* Basic Templates Grid */}
// //       {showBasicModal && (
// //         <TemplateGridModal
// //           templates={BASIC_TEMPLATES}
// //           title="Basic Templates"
// //           onSelect={handleTemplatePick}
// //           onClose={() => setShowBasicModal(false)}
// //         />
// //       )}

// //       {/* Generative Templates Grid */}
// //       {showGenerativeModal && (
// //         <TemplateGridModal
// //           templates={GENERATIVE_TEMPLATES}
// //           title="Generative Templates"
// //           onSelect={handleTemplatePick}
// //           onClose={() => setShowGenerativeModal(false)}
// //         />
// //       )}

// //       {/* Template Preview Modal */}
// //       {previewTpl && (
// //         <TemplatePreviewModal
// //           tpl={previewTpl}
// //           onClose={() => setPreviewTpl(null)}
// //         />
// //       )}

// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
// //         <div className="flex items-center gap-3">
// //           <button
// //             onClick={() => navigate("/dashboard")}
// //             className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
// //           >
// //             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
// //               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
// //             </svg>
// //           </button>
// //           <div>
// //             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
// //             <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
// //           </div>
// //         </div>
// //         <button
// //           onClick={() => setShowChannelModal(true)}
// //           className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
// //         >
// //           + Create Template
// //         </button>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// //         <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
// //         <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
// //         <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
// //         <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
// //       </div>

// //       {/* Filter Bar & Grid */}
// //       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
// //         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
// //           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
// //             {CHANNEL_TABS.map((tab) => (
// //               <button
// //                 key={tab.value}
// //                 onClick={() => setChannel(tab.value)}
// //                 className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
// //               >
// //                 {tab.label}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="relative" ref={catRef}>
// //             <button
// //               onClick={() => setCatOpen((o) => !o)}
// //               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
// //             >
// //               {category} <span className="text-slate-400 text-[10px]">▾</span>
// //             </button>
// //             {catOpen && (
// //               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
// //                 {CATEGORIES.map((c) => (
// //                   <div
// //                     key={c}
// //                     onClick={() => { setCategory(c); setCatOpen(false); }}
// //                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
// //                   >
// //                     {c}
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

// //           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
// //             <span className="text-slate-400 text-sm">🔍</span>
// //             <input
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder="Search templates..."
// //               className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
// //             />
// //             {search && (
// //               <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">×</button>
// //             )}
// //           </div>
// //         </div>

// //         <div className="p-5">
// //           {loading ? (
// //             <div className="text-center py-16 text-slate-400">Loading templates...</div>
// //           ) : templates.length === 0 ? (
// //             <div className="text-center py-16">
// //               <div className="text-4xl mb-3">🗂</div>
// //               <p className="text-sm font-semibold text-slate-700">No templates found</p>
// //               <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //               {templates.map((tpl) => (
// //                 <TemplateCard
// //                   key={tpl.id}
// //                   tpl={tpl}
// //                   onPreview={() => handlePreview(tpl)}
// //                   onEdit={() => handleTemplateEdit(tpl)}
// //                   onDuplicate={() => handleDuplicate(tpl)}
// //                   onDelete={() => setDeleteTarget(tpl.id)}
// //                 />
// //               ))}
// //               <div
// //                 onClick={() => setShowChannelModal(true)}
// //                 className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
// //               >
// //                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
// //                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
// //                 </div>
// //                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <ConfirmDialog
// //         isOpen={!!deleteTarget}
// //         onClose={() => setDeleteTarget(null)}
// //         onConfirm={confirmDelete}
// //         title="Delete Template"
// //         message="Are you sure you want to delete this template? This action cannot be undone."
// //       />
// //       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
// //     </div>
// //   );
// // }



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import TemplateEditorPage from "./TemplateEditorPage";


// const API = "https://wynreach-backend.onrender.com/api/templates";

// const CHANNEL_TABS = [
//   { label: "All", value: "" },
//   { label: "Email", value: "email" },
//   { label: "WhatsApp", value: "whatsapp" },
// ];
// const CATEGORIES = [
//   "All Categories",
//   "Marketing",
//   "Utility",
//   "Authentication"
// ];

// // ---------- ConfirmDialog ----------
// const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//       <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
//         <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
//         <p className="text-sm text-slate-500 mb-6">{message}</p>
//         <div className="flex gap-3">
//           <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
//           <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------- Toast ----------
// const Toast = ({ message, type = "success", onClose }) => (
//   <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
//     <span>{type === "success" ? "✓" : "✕"}</span>
//     {message}
//     <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">×</button>
//   </div>
// );

// // ---------- Helper: parse template content ----------
// const parseTemplateContent = (content) => {
//   if (!content) return { isGenerative: false, blocks: [], generativeData: null };
//   try {
//     const parsed = JSON.parse(content);
//     if (Array.isArray(parsed)) {
//       return { isGenerative: false, blocks: parsed, generativeData: null };
//     }
//     if (parsed && parsed.layout) {
//       return { isGenerative: true, blocks: [], generativeData: parsed };
//     }
//     return { isGenerative: false, blocks: [], generativeData: null };
//   } catch (e) {
//     return { isGenerative: false, blocks: [], generativeData: null };
//   }
// };

// // ---------- Full preview modals ----------
// const GenerativeFullPreview = ({ data }) => {
//   if (!data) return null;
//   return (
//     <div
//       style={{
//         background: data.bgColor || "#ffffff",
//         fontFamily: data.font || "Arial, sans-serif",
//         padding: "30px",
//         borderRadius: "12px",
//         border: "1px solid #e2e8f0",
//         maxWidth: "700px",
//         margin: "0 auto",
//       }}
//     >
//       {data.logo && (
//         <div style={{ color: data.logoColor || "#000000", fontSize: "28px", fontWeight: 700, marginBottom: "20px", textAlign: data.logoAlign || "center" }}>
//           {data.logo}
//         </div>
//       )}
//       {data.headerImg && (
//         <img src={data.headerImg} alt="Header" style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }} />
//       )}
//       {data.tag && (
//         <div style={{ display: "inline-block", background: data.accentColor || "#4f46e5", color: "#ffffff", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, marginBottom: "15px" }}>
//           {data.tag}
//         </div>
//       )}
//       <h1 style={{ color: data.logoColor || "#000000", fontSize: "38px", marginBottom: "10px", fontWeight: 700 }}>{data.title}</h1>
//       {data.subtitle && (
//         <h3 style={{ color: data.accentColor || "#4f46e5", marginBottom: "20px", fontSize: "18px" }}>{data.subtitle}</h3>
//       )}
//       <p style={{ color: data.logoColor || "#333333", lineHeight: 1.8, fontSize: "16px", whiteSpace: "pre-wrap", marginBottom: "20px" }}>{data.body}</p>
//       {data.buttonText && (
//         <div style={{ marginTop: "30px", textAlign: "center" }}>
//           <span style={{ background: data.buttonColor || data.accentColor || "#4f46e5", color: data.buttonTextColor || "#ffffff", padding: "14px 30px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, display: "inline-block" }}>
//             {data.buttonText}
//           </span>
//         </div>
//       )}
//       {data.footerText && (
//         <div style={{ marginTop: "40px", fontSize: "13px", opacity: 0.7, color: data.logoColor || "#666666", textAlign: "center", borderTop: `1px solid ${data.accentColor || "#e2e8f0"}40`, paddingTop: "20px" }}>
//           {data.footerText}
//         </div>
//       )}
//     </div>
//   );
// };

// const BlockFullPreview = ({ blocks }) => {
//   const safeBlocks = Array.isArray(blocks) ? blocks : [];
//   if (safeBlocks.length === 0) return <div className="text-center py-8">No content</div>;

//   const EmailBlockContent = ({ block }) => {
//     const p = block.props;
//     switch (block.type) {
//       case "header":
//         return <div style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, fontWeight: "bold", padding: "8px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
//       case "text":
//         return <p style={{ textAlign: p.align, color: p.color, fontSize: p.fontSize, lineHeight: 1.6, margin: "8px 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap" }}>{p.text}</p>;
//       case "image":
//         return <img src={p.url} alt={p.alt} style={{ width: "100%", borderRadius: 8, display: "block", margin: "12px 0" }} />;
//       case "button":
//         return <div style={{ textAlign: "center", margin: "14px 0" }}><span style={{ display: "inline-block", background: p.bgColor, color: p.textColor, padding: "11px 28px", borderRadius: 7, fontWeight: "bold", fontSize: 14 }}>{p.label}</span></div>;
//       case "columns":
//         return <div style={{ display: "flex", gap: 12, margin: "8px 0" }}><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.left}</div><div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.right}</div></div>;
//       case "divider":
//         return <hr style={{ border: "none", borderTop: `1px solid ${p.color}`, margin: "14px 0" }} />;
//       case "footer":
//         return <div style={{ textAlign: "center", color: p.color, fontSize: p.fontSize, padding: "10px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", background: "#fff", maxWidth: "700px", margin: "0 auto" }}>
//       {safeBlocks.map((block, idx) => (
//         <EmailBlockContent key={idx} block={block} />
//       ))}
//     </div>
//   );
// };

// const WhatsAppFullPreview = ({ content }) => {
//   let wa = {};
//   try { wa = JSON.parse(content || "{}"); } catch { }
//   return (
//     <div className="bg-[#e5ddd5] p-4 rounded-xl" style={{ maxWidth: "500px", margin: "0 auto" }}>
//       <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow border border-slate-100">
//         <div className="bg-[#075e54] px-4 py-2 flex items-center gap-2">
//           <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">A</div>
//           <div className="text-white text-xs font-semibold">Business Name</div>
//         </div>
//         <div className="p-4">
//           {wa.header && <div className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">{wa.header}</div>}
//           <p className="text-sm text-slate-700 whitespace-pre-wrap">{wa.body || "No message content"}</p>
//           {wa.actions?.length > 0 && (
//             <div className="mt-3 border-t pt-2">
//               {wa.actions.map((act, i) => (
//                 <div key={i} className="text-sm font-semibold text-[#00a5f4] text-center py-1">{act.name}</div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const TemplatePreviewModal = ({ tpl, onClose }) => {
//   const isWA = tpl.type === "whatsapp";
//   const parsed = parseTemplateContent(tpl.content);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-auto">
//       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
//           <div>
//             <h2 className="text-lg font-bold text-slate-800">{tpl.name}</h2>
//             <p className="text-xs text-slate-500">{isWA ? "WhatsApp Template" : "Email Template"}</p>
//           </div>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
//           {isWA ? (
//             <WhatsAppFullPreview content={tpl.content} />
//           ) : parsed.isGenerative ? (
//             <GenerativeFullPreview data={parsed.generativeData} />
//           ) : (
//             <BlockFullPreview blocks={parsed.blocks} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------- Mini previews for cards ----------
// const EmailThumb = () => {
//   const accent = "#6366f1";
//   return (
//     <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
//       <div className="h-2 rounded-full w-full" style={{ background: accent }} />
//       <div className="h-5 bg-slate-200 rounded" />
//       <div className="space-y-0.5">
//         <div className="h-1 bg-slate-200 rounded" />
//         <div className="h-1 bg-slate-200 rounded w-3/4" />
//       </div>
//       <div className="flex gap-1">
//         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
//         <div className="flex-1 h-1.5 bg-slate-200 rounded" />
//       </div>
//       <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
//     </div>
//   );
// };

// const WAThumb = () => (
//   <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
//     <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
//       <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
//       <div className="text-[7px] font-bold text-white">WhatsApp</div>
//     </div>
//     <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
//       <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
//         <div className="h-1 bg-green-400 rounded w-full" />
//         <div className="h-1 bg-green-300 rounded w-4/5" />
//         <div className="h-1 bg-green-300 rounded w-3/5" />
//       </div>
//       <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
//     </div>
//   </div>
// );

// const MiniEmailPreview = ({ content }) => {
//   let blocks = [];
//   try { blocks = JSON.parse(content || "[]"); } catch { }
//   if (!blocks.length) return <EmailThumb />;
//   return (
//     <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
//       <div className="bg-indigo-600 px-2 py-1"><div className="h-1 bg-indigo-300 rounded w-3/4" /></div>
//       <div className="p-1.5 space-y-1">
//         {blocks.slice(0, 5).map((block, i) => {
//           const p = block.props || {};
//           if (block.type === "header") return <div key={i} className="h-2 rounded" style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }} />;
//           if (block.type === "image") return <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center"><span className="text-[8px] text-indigo-300">IMG</span></div>;
//           if (block.type === "button") return <div key={i} className="h-3 rounded mx-auto w-16 flex items-center justify-center" style={{ background: p.bgColor || "#4f46e5" }}><span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span></div>;
//           if (block.type === "divider") return <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />;
//           if (block.type === "columns") return <div key={i} className="flex gap-0.5"><div className="flex-1 h-4 bg-slate-100 rounded" /><div className="flex-1 h-4 bg-slate-100 rounded" /></div>;
//           if (block.type === "footer") return <div key={i} className="h-1 bg-slate-100 rounded w-full" />;
//           return <div key={i} className="space-y-0.5"><div className="h-1 bg-slate-200 rounded w-full" /><div className="h-1 bg-slate-200 rounded w-4/5" /><div className="h-1 bg-slate-200 rounded w-3/5" /></div>;
//         })}
//       </div>
//     </div>
//   );
// };

// const GenerativePreview = ({ data }) => {
//   const bgColor = data.bgColor || "#1a1a2e";
//   const logoColor = data.logoColor || "#ffffff";
//   const accentColor = data.accentColor || "#f5a623";
//   const logo = data.logo || "";
//   const title = data.title || "";
//   const subtitle = data.subtitle || "";
//   const headerImg = data.headerImg || null;
//   return (
//     <div style={{ background: bgColor, color: logoColor, padding: "10px", borderRadius: "12px", height: "160px", width: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
//       {logo && <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>{logo}</div>}
//       {headerImg && <img src={headerImg} alt="header" style={{ width: "100%", height: "50px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />}
//       {title && <div style={{ fontWeight: "bold", fontSize: "12px", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>}
//       {subtitle && <div style={{ fontSize: "9px", color: accentColor, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subtitle}</div>}
//     </div>
//   );
// };

// const MiniWAPreview = ({ content }) => {
//   let wa = {};
//   try { wa = JSON.parse(content || "{}"); } catch { }
//   const body = wa.body || "";
//   if (!body) return <WAThumb />;
//   return (
//     <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
//       <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#25d366]" /><div className="text-[6px] font-bold text-white">WhatsApp</div></div>
//       <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
//         <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
//           {wa.header && <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">{wa.header}</div>}
//           <div className="text-[6px] text-slate-600 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{body.substring(0, 100)}</div>
//           {wa.actions?.length > 0 && <div className="mt-1 border-t border-slate-100 pt-0.5"><div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">{wa.actions[0].name}</div></div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// const WAStatusBadge = ({ status }) => {
//   if (!status) return null;
//   if (status === "pending_review" || status === "pending")
//     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">⏳ Pending Review</span>;
//   if (status === "active")
//     return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">✓ Active</span>;
//   return null;
// };

// // ---------- Template Card ----------
// const TemplateCard = ({ tpl, onPreview, onEdit, onDuplicate, onDelete }) => {
//   const isWA = tpl.type === "whatsapp";
//   const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
//   const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

//   let isGenerative = false;
//   let generativeData = null;
//   if (!isWA && tpl.content) {
//     try {
//       const parsed = JSON.parse(tpl.content);
//       if (parsed && parsed.layout) {
//         isGenerative = true;
//         generativeData = parsed;
//       }
//     } catch (e) {}
//   }

//   return (
//     <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
//       <div
//         onClick={onPreview}
//         className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
//       >
//         {isWA ? (
//           <MiniWAPreview content={tpl.content} />
//         ) : isGenerative ? (
//           <GenerativePreview data={generativeData} />
//         ) : (
//           <MiniEmailPreview content={tpl.content} />
//         )}
//       </div>

//       <div onClick={onPreview} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
//         <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
//         <div className="flex flex-wrap items-center gap-1.5 mb-2">
//           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}>
//             {isWA ? "💬 WhatsApp" : "✉️ Email"}
//           </span>
//           {tpl.category && (
//             <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">{tpl.category}</span>
//           )}
//           {isGenerative && (
//             <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">✨ Generative</span>
//           )}
//         </div>
//         <WAStatusBadge status={isWA ? tpl.status : null} />
//         <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
//       </div>

//       <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
//         <button onClick={onEdit} className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
//         <button onClick={onDuplicate} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" title="Duplicate">⧉</button>
//         <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">🗑</button>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ label, value, icon, color }) => (
//   <div className={`rounded-2xl p-4 border ${color}`}>
//     <div className="flex items-center gap-2 mb-1">
//       <span className="text-lg">{icon}</span>
//       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
//     </div>
//     <p className="text-2xl font-bold text-slate-900">{value}</p>
//   </div>
// );

// // =====================================================
// // 1. CHANNEL SELECT MODAL
// // =====================================================
// const ChannelSelectModal = ({ onSelect, onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//     <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
//       <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
//       <p className="text-sm text-slate-500 mb-6">Choose a channel to start</p>
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => onSelect("email")}
//           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
//         >
//           <span className="text-4xl">✉️</span>
//           <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
//           <span className="text-xs text-slate-400 text-center">Build email templates</span>
//         </button>
//         <button
//           onClick={() => onSelect("whatsapp")}
//           className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
//         >
//           <span className="text-4xl">💬</span>
//           <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
//           <span className="text-xs text-slate-400 text-center">WhatsApp Business templates</span>
//         </button>
//       </div>
//       <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
//     </div>
//   </div>
// );

// // =====================================================
// // 2. TEMPLATE PICKER MODAL (three cards)
// // =====================================================
// const TemplatePickerModal = ({ onBasic, onGenerative, onAI, onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//     <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
//       <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
//         <div>
//           <h2 className="text-lg font-bold text-slate-800">Choose Template Type</h2>
//           <p className="text-xs text-slate-500 mt-0.5">Select a category to get started</p>
//         </div>
//         <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">×</button>
//       </div>
//       <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <button
//           onClick={onBasic}
//           className="border rounded-2xl p-6 text-left hover:border-indigo-500 hover:shadow-lg transition"
//         >
//           <div className="text-3xl mb-3">📄</div>
//           <h3 className="font-bold text-lg">Basic Templates</h3>
//           <p className="text-sm text-slate-500 mt-2">Use ready‑made email templates</p>
//         </button>
//         <button
//           onClick={onGenerative}
//           className="border rounded-2xl p-6 text-left hover:border-purple-500 hover:shadow-lg transition"
//         >
//           <div className="text-3xl mb-3">✨</div>
//           <h3 className="font-bold text-lg">Generative Templates</h3>
//           <p className="text-sm text-slate-500 mt-2">Halloween, Dark Mode and custom layouts</p>
//         </button>
//         <button
//           onClick={onAI}
//           className="border rounded-2xl p-6 text-left hover:border-green-500 hover:shadow-lg transition"
//         >
//           <div className="text-3xl mb-3">🤖</div>
//           <h3 className="font-bold text-lg">AI Generated</h3>
//           <p className="text-sm text-slate-500 mt-2">Generate template using AI</p>
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // =====================================================
// // MAIN PAGE
// // =====================================================
// export default function TemplateLibraryPage() {

//   const navigate = useNavigate();
//   const [templates, setTemplates] = useState([]);
//   const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
//   const [editingId, setEditingId] = useState(undefined);
//   const [selectedChannel, setSelectedChannel] = useState("email");
//   const [initialBlocks, setInitialBlocks] = useState(null);
//   const [skipPicker, setSkipPicker] = useState(false);
//   const [openGenerativeOnLoad, setOpenGenerativeOnLoad] = useState(false);

//   const [showChannelModal, setShowChannelModal] = useState(false);
//   const [showTemplatePicker, setShowTemplatePicker] = useState(false);

//   const [channel, setChannel] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [search, setSearch] = useState("");
//   const [catOpen, setCatOpen] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [previewTpl, setPreviewTpl] = useState(null);
//   const [showGenerativeModal, setShowGenerativeModal] = useState(false);
//   const catRef = useRef();

//   const fetchTemplates = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       if (channel) params.append("type", channel);
//       if (category !== "All Categories") params.append("category", category);
//       if (search) params.append("search", search);
//       const res = await fetch(`${API}/?${params}`);
//       const data = await res.json();
//       setTemplates(data.data || []);
//       setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
//     } catch (err) {
//       showToast("Failed to load templates", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchTemplates(); }, [channel, category, search]);

//   useEffect(() => {
//     fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
//       .then((r) => r.json())
//       .then((data) => { if (data.synced?.length > 0) fetchTemplates(); })
//       .catch(() => {});
//   }, []);

//   useEffect(() => {
//     const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
//   }, [toast]);

//   const showToast = (message, type = "success") => setToast({ message, type });

//   const handleDuplicate = async (tpl) => {
//     try {
//       const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
//       if (res.ok) { fetchTemplates(); showToast(`"${tpl.name}" duplicated`); }
//     } catch { showToast("Failed to duplicate", "error"); }
//   };

//   const confirmDelete = async () => {
//     const tpl = templates.find((t) => t.id === deleteTarget);
//     try {
//       const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
//       if (res.ok) { fetchTemplates(); showToast(`"${tpl?.name}" deleted`, "error"); }
//     } catch { showToast("Failed to delete", "error"); }
//     setDeleteTarget(null);
//   };

//   // -------- CREATE TEMPLATE FLOW --------
//   const handleChannelSelect = (ch) => {
//     setShowChannelModal(false);
//     if (ch === "whatsapp") {
//       setSelectedChannel("whatsapp");
//       setEditingId(null);
//       setInitialBlocks(null);
//       setSkipPicker(false);
//       setOpenGenerativeOnLoad(false);
//     } else if (ch === "email") {
//       setShowTemplatePicker(true);
//     }
//   };

//   const handlePickerAction = (type) => {
//     setShowTemplatePicker(false);
//     if (type === "basic") {
//       setSelectedChannel("email");
//       setEditingId(null);
//       setInitialBlocks([]);
//       setSkipPicker(false);
//       setOpenGenerativeOnLoad(false);
//     }
//   else if (type === "generative") {
//   setShowGenerativeModal(true);
// }
//     else if (type === "ai") {
//       navigate("/ai-templates");
//     }
//   };

//   // -------- EDIT EXISTING TEMPLATE --------
//   const handleTemplateEdit = (tpl) => {
//     try {
//       const data = JSON.parse(tpl.content || "{}");
//       if (data.layout) {
//         navigate(`/email-builder?template=${data.layout}`);
//         return;
//       }
//     } catch (e) {}
//     setSelectedChannel(tpl.type || "email");
//     setEditingId(tpl.id);
//     setInitialBlocks(null);
//     setSkipPicker(false);
//     setOpenGenerativeOnLoad(false);
//   };

//   const handlePreview = (tpl) => {
//     setPreviewTpl(tpl);
//   };

//   // If editor is open, render it
//   if (editingId !== undefined) {
//     return (
//       <TemplateEditorPage
//         templateId={editingId}
//         initialChannel={selectedChannel}
//         initialBlocks={initialBlocks}
//         skipPicker={skipPicker}
//         openGenerativeOnLoad={openGenerativeOnLoad}
//         onBack={() => {
//           fetchTemplates();
//           setEditingId(undefined);
//           setInitialBlocks(null);
//           setSkipPicker(false);
//           setOpenGenerativeOnLoad(false);
//         }}
//       />
//     );
//   }

//   return (
//     <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
//       {/* Channel Selection Modal */}
//       {showChannelModal && (
//         <ChannelSelectModal
//           onSelect={handleChannelSelect}
//           onClose={() => setShowChannelModal(false)}
//         />
//       )}

//       {/* Template Picker Modal (three cards) */}
//       {showTemplatePicker && (
//         <TemplatePickerModal
//           onBasic={() => handlePickerAction("basic")}
//           onGenerative={() => handlePickerAction("generative")}
//           onAI={() => handlePickerAction("ai")}
//           onClose={() => setShowTemplatePicker(false)}
//         />
//       )}
// {showGenerativeModal && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
//     <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl">

//       <div className="flex justify-between items-center px-6 py-4 border-b">
//         <h2 className="font-bold text-lg">
//           ✨ Generative Templates
//         </h2>

//         <button
//           onClick={() => setShowGenerativeModal(false)}
//         >
//           ×
//         </button>
//       </div>

//       <div className="p-6 grid grid-cols-3 gap-4">

//         {[
//           {
//             id: "botanical",
//             name: "Botanical Newsletter",
//             emoji: "🌿"
//           },
//           {
//             id: "darkpromo",
//             name: "Dark Promo",
//             emoji: "⚡"
//           },
//           {
//             id: "minimal",
//             name: "Minimal Clean",
//             emoji: "📄"
//           },
//           {
//             id: "event",
//             name: "Event Invite",
//             emoji: "🎤"
//           },
//           {
//             id: "pets",
//             name: "Pets Rescue",
//             emoji: "🐾"
//           },
//           {
//             id: "halloween",
//             name: "Halloween Sale",
//             emoji: "🎃"
//           }
//         ].map((template) => (
//           <button
//             key={template.id}
//             onClick={() => {
//               window.open(
//                 `/email-builder?template=${template.id}`,
//                 "_blank"
//               );

//               setShowGenerativeModal(false);
//             }}
//             className="border rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg"
//           >
//             <div className="text-4xl mb-3">
//               {template.emoji}
//             </div>

//             <div className="font-semibold">
//               {template.name}
//             </div>
//           </button>
//         ))}

//       </div>
//     </div>
//   </div>
// )}
//       {/* Template Preview Modal */}
//       {previewTpl && (
//         <TemplatePreviewModal
//           tpl={previewTpl}
//           onClose={() => setPreviewTpl(null)}
//         />
//       )}

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
//             <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
//           </div>
//         </div>
//         <button
//           onClick={() => setShowChannelModal(true)}
//           className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
//         >
//           + Create Template
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//         <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
//         <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
//         <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
//         <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
//       </div>

//       {/* Filter Bar & Grid */}
//       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
//           <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
//             {CHANNEL_TABS.map((tab) => (
//               <button
//                 key={tab.value}
//                 onClick={() => setChannel(tab.value)}
//                 className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           <div className="relative" ref={catRef}>
//             <button
//               onClick={() => setCatOpen((o) => !o)}
//               className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
//             >
//               {category} <span className="text-slate-400 text-[10px]">▾</span>
//             </button>
//             {catOpen && (
//               <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
//                 {CATEGORIES.map((c) => (
//                   <div
//                     key={c}
//                     onClick={() => { setCategory(c); setCatOpen(false); }}
//                     className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
//                   >
//                     {c}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

//           <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
//             <span className="text-slate-400 text-sm">🔍</span>
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search templates..."
//               className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
//             />
//             {search && (
//               <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">×</button>
//             )}
//           </div>
//         </div>

//         <div className="p-5">
//           {loading ? (
//             <div className="text-center py-16 text-slate-400">Loading templates...</div>
//           ) : templates.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="text-4xl mb-3">🗂</div>
//               <p className="text-sm font-semibold text-slate-700">No templates found</p>
//               <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {templates.map((tpl) => (
//                 <TemplateCard
//                   key={tpl.id}
//                   tpl={tpl}
//                   onPreview={() => handlePreview(tpl)}
//                   onEdit={() => handleTemplateEdit(tpl)}
//                   onDuplicate={() => handleDuplicate(tpl)}
//                   onDelete={() => setDeleteTarget(tpl.id)}
//                 />
//               ))}
//               <div
//                 onClick={() => setShowChannelModal(true)}
//                 className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
//               >
//                 <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
//                   <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">+</span>
//                 </div>
//                 <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">New Template</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <ConfirmDialog
//         isOpen={!!deleteTarget}
//         onClose={() => setDeleteTarget(null)}
//         onConfirm={confirmDelete}
//         title="Delete Template"
//         message="Are you sure you want to delete this template? This action cannot be undone."
//       />
//       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TemplateEditorPage from "./TemplateEditorPage";

const API = "https://wynreach-backend.onrender.com/api/templates";

const CHANNEL_TABS = [
  { label: "All", value: "" },
  { label: "Email", value: "email" },
  { label: "WhatsApp", value: "whatsapp" },
];
const CATEGORIES = ["All Categories", "Marketing", "Utility", "Authentication"];

// ---------- ConfirmDialog ----------
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
        <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Toast ----------
const Toast = ({ message, type = "success", onClose }) => (
  <div
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white transition-all ${
      type === "success" ? "bg-emerald-600" : "bg-red-600"
    }`}
  >
    <span>{type === "success" ? "✓" : "✕"}</span>
    {message}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
      ×
    </button>
  </div>
);

// ---------- Helper: parse template content ----------
const parseTemplateContent = (content) => {
  if (!content) return { isGenerative: false, blocks: [], generativeData: null };
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return { isGenerative: false, blocks: parsed, generativeData: null };
    }
    if (parsed && parsed.layout) {
      return { isGenerative: true, blocks: [], generativeData: parsed };
    }
    return { isGenerative: false, blocks: [], generativeData: null };
  } catch (e) {
    return { isGenerative: false, blocks: [], generativeData: null };
  }
};

// ---------- Full preview modals ----------
const GenerativeFullPreview = ({ data }) => {
  if (!data) return null;
  return (
    <div
      style={{
        background: data.bgColor || "#ffffff",
        fontFamily: data.font || "Arial, sans-serif",
        padding: "30px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {data.logo && (
        <div
          style={{
            color: data.logoColor || "#000000",
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "20px",
            textAlign: data.logoAlign || "center",
          }}
        >
          {data.logo}
        </div>
      )}
      {data.headerImg && (
        <img
          src={data.headerImg}
          alt="Header"
          style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }}
        />
      )}
      {data.tag && (
        <div
          style={{
            display: "inline-block",
            background: data.accentColor || "#4f46e5",
            color: "#ffffff",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            marginBottom: "15px",
          }}
        >
          {data.tag}
        </div>
      )}
      <h1 style={{ color: data.logoColor || "#000000", fontSize: "38px", marginBottom: "10px", fontWeight: 700 }}>
        {data.title}
      </h1>
      {data.subtitle && (
        <h3 style={{ color: data.accentColor || "#4f46e5", marginBottom: "20px", fontSize: "18px" }}>
          {data.subtitle}
        </h3>
      )}
      <p
        style={{
          color: data.logoColor || "#333333",
          lineHeight: 1.8,
          fontSize: "16px",
          whiteSpace: "pre-wrap",
          marginBottom: "20px",
        }}
      >
        {data.body}
      </p>
      {data.buttonText && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <span
            style={{
              background: data.buttonColor || data.accentColor || "#4f46e5",
              color: data.buttonTextColor || "#ffffff",
              padding: "14px 30px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            {data.buttonText}
          </span>
        </div>
      )}
      {data.footerText && (
        <div
          style={{
            marginTop: "40px",
            fontSize: "13px",
            opacity: 0.7,
            color: data.logoColor || "#666666",
            textAlign: "center",
            borderTop: `1px solid ${data.accentColor || "#e2e8f0"}40`,
            paddingTop: "20px",
          }}
        >
          {data.footerText}
        </div>
      )}
    </div>
  );
};

const BlockFullPreview = ({ blocks }) => {
  const safeBlocks = Array.isArray(blocks) ? blocks : [];
  if (safeBlocks.length === 0) return <div className="text-center py-8">No content</div>;

  const EmailBlockContent = ({ block }) => {
    const p = block.props;
    switch (block.type) {
      case "header":
        return (
          <div
            style={{
              textAlign: p.align,
              color: p.color,
              fontSize: p.fontSize,
              fontWeight: "bold",
              padding: "8px 0",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {p.text}
          </div>
        );
      case "text":
        return (
          <p
            style={{
              textAlign: p.align,
              color: p.color,
              fontSize: p.fontSize,
              lineHeight: 1.6,
              margin: "8px 0",
              fontFamily: "Arial, sans-serif",
              whiteSpace: "pre-wrap",
            }}
          >
            {p.text}
          </p>
        );
      case "image":
        return (
          <img
            src={p.url}
            alt={p.alt}
            style={{ width: "100%", borderRadius: 8, display: "block", margin: "12px 0" }}
          />
        );
      case "button":
        return (
          <div style={{ textAlign: "center", margin: "14px 0" }}>
            <span
              style={{
                display: "inline-block",
                background: p.bgColor,
                color: p.textColor,
                padding: "11px 28px",
                borderRadius: 7,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {p.label}
            </span>
          </div>
        );
      case "columns":
        return (
          <div style={{ display: "flex", gap: 12, margin: "8px 0" }}>
            <div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.left}</div>
            <div style={{ flex: 1, padding: 12, background: "#f8fafc", borderRadius: 7 }}>{p.right}</div>
          </div>
        );
      case "divider":
        return <hr style={{ border: "none", borderTop: `1px solid ${p.color}`, margin: "14px 0" }} />;
      case "footer":
        return (
          <div
            style={{
              textAlign: "center",
              color: p.color,
              fontSize: p.fontSize,
              padding: "10px 0",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {p.text}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "20px",
        background: "#fff",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {safeBlocks.map((block, idx) => (
        <EmailBlockContent key={idx} block={block} />
      ))}
    </div>
  );
};

const WhatsAppFullPreview = ({ content }) => {
  let wa = {};
  try {
    wa = JSON.parse(content || "{}");
  } catch {}
  return (
    <div className="bg-[#e5ddd5] p-4 rounded-xl" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div className="bg-white rounded-[0_10px_10px_10px] overflow-hidden shadow border border-slate-100">
        <div className="bg-[#075e54] px-4 py-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div className="text-white text-xs font-semibold">Business Name</div>
        </div>
        <div className="p-4">
          {wa.header && <div className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">{wa.header}</div>}
          <p className="text-sm text-slate-700 whitespace-pre-wrap">{wa.body || "No message content"}</p>
          {wa.actions?.length > 0 && (
            <div className="mt-3 border-t pt-2">
              {wa.actions.map((act, i) => (
                <div key={i} className="text-sm font-semibold text-[#00a5f4] text-center py-1">
                  {act.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TemplatePreviewModal = ({ tpl, onClose }) => {
  const isWA = tpl.type === "whatsapp";
  const parsed = parseTemplateContent(tpl.content);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{tpl.name}</h2>
            <p className="text-xs text-slate-500">{isWA ? "WhatsApp Template" : "Email Template"}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {isWA ? (
            <WhatsAppFullPreview content={tpl.content} />
          ) : parsed.isGenerative ? (
            <GenerativeFullPreview data={parsed.generativeData} />
          ) : (
            <BlockFullPreview blocks={parsed.blocks} />
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Mini previews for cards ----------
const EmailThumb = () => {
  const accent = "#6366f1";
  return (
    <div className="w-[90px] bg-white rounded-lg shadow-sm p-2.5 space-y-1.5 border border-slate-100">
      <div className="h-2 rounded-full w-full" style={{ background: accent }} />
      <div className="h-5 bg-slate-200 rounded" />
      <div className="space-y-0.5">
        <div className="h-1 bg-slate-200 rounded" />
        <div className="h-1 bg-slate-200 rounded w-3/4" />
      </div>
      <div className="flex gap-1">
        <div className="flex-1 h-1.5 bg-slate-200 rounded" />
        <div className="flex-1 h-1.5 bg-slate-200 rounded" />
      </div>
      <div className="h-2 w-12 rounded mx-auto" style={{ background: accent }} />
    </div>
  );
};

const WAThumb = () => (
  <div className="w-[90px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
    <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
      <div className="w-3.5 h-3.5 rounded-full bg-[#25d366]" />
      <div className="text-[7px] font-bold text-white">WhatsApp</div>
    </div>
    <div className="bg-[#e5ddd5] p-1.5 min-h-[52px]">
      <div className="bg-[#dcf8c6] rounded-[0_5px_5px_5px] p-1.5 space-y-0.5">
        <div className="h-1 bg-green-400 rounded w-full" />
        <div className="h-1 bg-green-300 rounded w-4/5" />
        <div className="h-1 bg-green-300 rounded w-3/5" />
      </div>
      <div className="h-2 bg-[#25d366] rounded mt-1.5 opacity-80" />
    </div>
  </div>
);

const MiniEmailPreview = ({ content }) => {
  let blocks = [];
  try {
    blocks = JSON.parse(content || "[]");
  } catch {}
  if (!blocks.length) return <EmailThumb />;
  return (
    <div className="w-[130px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-indigo-600 px-2 py-1">
        <div className="h-1 bg-indigo-300 rounded w-3/4" />
      </div>
      <div className="p-1.5 space-y-1">
        {blocks.slice(0, 5).map((block, i) => {
          const p = block.props || {};
          if (block.type === "header")
            return (
              <div
                key={i}
                className="h-2 rounded"
                style={{ background: p.color || "#0f172a", width: "70%", opacity: 0.8 }}
              />
            );
          if (block.type === "image")
            return (
              <div key={i} className="h-8 bg-indigo-100 rounded w-full flex items-center justify-center">
                <span className="text-[8px] text-indigo-300">IMG</span>
              </div>
            );
          if (block.type === "button")
            return (
              <div
                key={i}
                className="h-3 rounded mx-auto w-16 flex items-center justify-center"
                style={{ background: p.bgColor || "#4f46e5" }}
              >
                <span className="text-[6px] text-white font-bold truncate px-1">{p.label || "Button"}</span>
              </div>
            );
          if (block.type === "divider")
            return <div key={i} className="h-px w-full" style={{ background: p.color || "#e2e8f0" }} />;
          if (block.type === "columns")
            return (
              <div key={i} className="flex gap-0.5">
                <div className="flex-1 h-4 bg-slate-100 rounded" />
                <div className="flex-1 h-4 bg-slate-100 rounded" />
              </div>
            );
          if (block.type === "footer") return <div key={i} className="h-1 bg-slate-100 rounded w-full" />;
          return (
            <div key={i} className="space-y-0.5">
              <div className="h-1 bg-slate-200 rounded w-full" />
              <div className="h-1 bg-slate-200 rounded w-4/5" />
              <div className="h-1 bg-slate-200 rounded w-3/5" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GenerativePreview = ({ data }) => {
  const bgColor = data.bgColor || "#1a1a2e";
  const logoColor = data.logoColor || "#ffffff";
  const accentColor = data.accentColor || "#f5a623";
  const logo = data.logo || "";
  const title = data.title || "";
  const subtitle = data.subtitle || "";
  const headerImg = data.headerImg || null;
  return (
    <div
      style={{
        background: bgColor,
        color: logoColor,
        padding: "10px",
        borderRadius: "12px",
        height: "160px",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {logo && <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>{logo}</div>}
      {headerImg && (
        <img
          src={headerImg}
          alt="header"
          style={{
            width: "100%",
            height: "50px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "6px",
          }}
        />
      )}
      {title && (
        <div
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            marginTop: "4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
      )}
      {subtitle && (
        <div
          style={{
            fontSize: "9px",
            color: accentColor,
            marginTop: "2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

const MiniWAPreview = ({ content }) => {
  let wa = {};
  try {
    wa = JSON.parse(content || "{}");
  } catch {}
  const body = wa.body || "";
  if (!body) return <WAThumb />;
  return (
    <div className="w-[130px] bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
      <div className="bg-[#075e54] px-2 py-1.5 flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-[#25d366]" />
        <div className="text-[6px] font-bold text-white">WhatsApp</div>
      </div>
      <div className="bg-[#e5ddd5] p-1.5 min-h-[60px]">
        <div className="bg-white rounded-[0_4px_4px_4px] p-1.5 shadow-sm">
          {wa.header && (
            <div className="text-[7px] font-bold text-slate-800 mb-0.5 truncate border-b border-slate-100 pb-0.5">
              {wa.header}
            </div>
          )}
          <div
            className="text-[6px] text-slate-600 leading-tight"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {body.substring(0, 100)}
          </div>
          {wa.actions?.length > 0 && (
            <div className="mt-1 border-t border-slate-100 pt-0.5">
              <div className="text-[6px] text-[#00a5f4] text-center font-semibold truncate">
                {wa.actions[0].name}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WAStatusBadge = ({ status }) => {
  if (!status) return null;
  if (status === "pending_review" || status === "pending")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
        ⏳ Pending Review
      </span>
    );
  if (status === "active")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
        ✓ Active
      </span>
    );
  return null;
};

// ---------- Template Card ----------
const TemplateCard = ({ tpl, onPreview, onEdit, onDuplicate, onDelete }) => {
  const isWA = tpl.type === "whatsapp";
  const bg = isWA ? "bg-[#e5ddd5]" : "bg-slate-50";
  const badgeBg = isWA ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700";

  let isGenerative = false;
  let generativeData = null;
  if (!isWA && tpl.content) {
    try {
      const parsed = JSON.parse(tpl.content);
      if (parsed && parsed.layout) {
        isGenerative = true;
        generativeData = parsed;
      }
    } catch (e) {}
  }

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-150 flex flex-col">
      <div
        onClick={onPreview}
        className={`${bg} h-44 flex items-center justify-center border-b border-slate-100 cursor-pointer relative overflow-hidden`}
      >
        {isWA ? (
          <MiniWAPreview content={tpl.content} />
        ) : isGenerative ? (
          <GenerativePreview data={generativeData} />
        ) : (
          <MiniEmailPreview content={tpl.content} />
        )}
      </div>

      <div onClick={onPreview} className="px-4 pt-3 pb-2 cursor-pointer flex-1">
        <p className="font-semibold text-sm text-slate-800 truncate mb-1.5">{tpl.name}</p>
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeBg}`}
          >
            {isWA ? "💬 WhatsApp" : "✉️ Email"}
          </span>
          {tpl.category && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
              {tpl.category}
            </span>
          )}
          {isGenerative && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
              ✨ Generative
            </span>
          )}
        </div>
        <WAStatusBadge status={isWA ? tpl.status : null} />
        <p className="text-[11px] text-slate-400 mt-1.5">📊 Used in {tpl.times_used || 0} campaigns</p>
      </div>

      <div className="px-4 pb-3 pt-2 flex gap-2 border-t border-slate-100">
        <button
          onClick={onEdit}
          className="flex-1 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDuplicate}
          className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          title="Duplicate"
        >
          ⧉
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className={`rounded-2xl p-4 border ${color}`}>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
    </div>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

// =====================================================
// 1. CHANNEL SELECT MODAL
// =====================================================
const ChannelSelectModal = ({ onSelect, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
    <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-100">
      <h2 className="text-lg font-bold text-slate-800 mb-1">Create New Template</h2>
      <p className="text-sm text-slate-500 mb-6">Choose a channel to start</p>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => onSelect("email")}
          className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
        >
          <span className="text-4xl">✉️</span>
          <span className="font-semibold text-slate-700 group-hover:text-indigo-600 text-sm">Email</span>
          <span className="text-xs text-slate-400 text-center">Build email templates</span>
        </button>
        <button
          onClick={() => onSelect("whatsapp")}
          className="flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
        >
          <span className="text-4xl">💬</span>
          <span className="font-semibold text-slate-700 group-hover:text-green-600 text-sm">WhatsApp</span>
          <span className="text-xs text-slate-400 text-center">WhatsApp Business templates</span>
        </button>
      </div>
      <button onClick={onClose} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">
        Cancel
      </button>
    </div>
  </div>
);

// =====================================================
// 2. TEMPLATE PICKER MODAL (three cards)
// =====================================================
const TemplatePickerModal = ({ onBasic, onGenerative, onAI, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Choose Template Type</h2>
          <p className="text-xs text-slate-500 mt-0.5">Select a category to get started</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
        >
          ×
        </button>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onBasic}
          className="border rounded-2xl p-6 text-left hover:border-indigo-500 hover:shadow-lg transition"
        >
          <div className="text-3xl mb-3">📄</div>
          <h3 className="font-bold text-lg">Basic Templates</h3>
          <p className="text-sm text-slate-500 mt-2">Use ready‑made email templates</p>
        </button>
        <button
          onClick={onGenerative}
          className="border rounded-2xl p-6 text-left hover:border-purple-500 hover:shadow-lg transition"
        >
          <div className="text-3xl mb-3">✨</div>
          <h3 className="font-bold text-lg">Generative Templates</h3>
          <p className="text-sm text-slate-500 mt-2">Halloween, Dark Mode and custom layouts</p>
        </button>
        <button
          onClick={onAI}
          className="border rounded-2xl p-6 text-left hover:border-green-500 hover:shadow-lg transition"
        >
          <div className="text-3xl mb-3">🤖</div>
          <h3 className="font-bold text-lg">AI Generated</h3>
          <p className="text-sm text-slate-500 mt-2">Generate template using AI</p>
        </button>
      </div>
    </div>
  </div>
);

// =====================================================
// 3. GENERATIVE PICKER MODAL (with rich preview cards)
// =====================================================
const GENERATIVE_TEMPLATES = [
  {
    id: "botanical",
    name: "Botanical Newsletter",
    bgColor: "#f5f0e8",
    logoColor: "#2d5a27",
    accentColor: "#2d5a27",
    logo: "🌿",
    title: "Botanical",
    subtitle: "Fresh & organic",
  },
  {
    id: "darkpromo",
    name: "Dark Promo",
    bgColor: "#0f0f1a",
    logoColor: "#ffffff",
    accentColor: "#f5a623",
    logo: "⚡",
    title: "Dark Promo",
    subtitle: "Bold & electric",
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    bgColor: "#ffffff",
    logoColor: "#1e293b",
    accentColor: "#e63946",
    logo: "📄",
    title: "Minimal",
    subtitle: "Clean & modern",
  },
  {
    id: "event",
    name: "Event Invite",
    bgColor: "#1e1b4b",
    logoColor: "#ffffff",
    accentColor: "#a78bfa",
    logo: "🎤",
    title: "Event Invite",
    subtitle: "Exciting & vibrant",
  },
  {
    id: "pets",
    name: "Pets Rescue",
    bgColor: "#fef9f0",
    logoColor: "#3b2e1e",
    accentColor: "#e67e22",
    logo: "🐾",
    title: "Pets Rescue",
    subtitle: "Heartwarming",
  },
  {
    id: "halloween",
    name: "Halloween Sale",
    bgColor: "#000000",
    logoColor: "#ff6600",
    accentColor: "#ff6600",
    logo: "🎃",
    title: "Halloween",
    subtitle: "Spooky deals",
  },
];

const GenerativePickerModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSelect = (templateId) => {
    window.open(`/email-builder?template=${templateId}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-800">✨ Generative Templates</h2>
            <p className="text-xs text-slate-500 mt-0.5">Choose a design to start building</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GENERATIVE_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelect(template.id)}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-purple-400 transition-all duration-150 flex flex-col"
              >
                {/* Preview area */}
                <div className="h-44 flex items-center justify-center border-b border-slate-100 bg-slate-50 overflow-hidden">
                  <GenerativePreview data={template} />
                </div>
                {/* Info */}
                <div className="px-4 pt-3 pb-3 text-left">
                  <p className="font-semibold text-sm text-slate-800 truncate">
                    {template.logo} {template.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">{template.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MAIN PAGE
// =====================================================
export default function TemplateLibraryPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [stats, setStats] = useState({ total: 0, email: 0, whatsapp: 0, pending_review: 0 });
  const [editingId, setEditingId] = useState(undefined);
  const [selectedChannel, setSelectedChannel] = useState("email");
  const [initialBlocks, setInitialBlocks] = useState(null);
  const [skipPicker, setSkipPicker] = useState(false);
  const [openGenerativeOnLoad, setOpenGenerativeOnLoad] = useState(false);

  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [showGenerativeModal, setShowGenerativeModal] = useState(false);

  const [channel, setChannel] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewTpl, setPreviewTpl] = useState(null);
  const catRef = useRef();

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (channel) params.append("type", channel);
      if (category !== "All Categories") params.append("category", category);
      if (search) params.append("search", search);
      const res = await fetch(`${API}/?${params}`);
      const data = await res.json();
      setTemplates(data.data || []);
      setStats(data.stats || { total: 0, email: 0, whatsapp: 0, pending_review: 0 });
    } catch (err) {
      showToast("Failed to load templates", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [channel, category, search]);

  useEffect(() => {
    fetch("https://wynreach-backend.onrender.com/api/whatsapp/templates/sync", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (data.synced?.length > 0) fetchTemplates();
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (message, type = "success") => setToast({ message, type });

  const handleDuplicate = async (tpl) => {
    try {
      const res = await fetch(`${API}/${tpl.id}/duplicate`, { method: "POST" });
      if (res.ok) {
        fetchTemplates();
        showToast(`"${tpl.name}" duplicated`);
      }
    } catch {
      showToast("Failed to duplicate", "error");
    }
  };

  const confirmDelete = async () => {
    const tpl = templates.find((t) => t.id === deleteTarget);
    try {
      const res = await fetch(`${API}/${deleteTarget}`, { method: "DELETE" });
      if (res.ok) {
        fetchTemplates();
        showToast(`"${tpl?.name}" deleted`, "error");
      }
    } catch {
      showToast("Failed to delete", "error");
    }
    setDeleteTarget(null);
  };

  // -------- CREATE TEMPLATE FLOW --------
  const handleChannelSelect = (ch) => {
    setShowChannelModal(false);
    if (ch === "whatsapp") {
      setSelectedChannel("whatsapp");
      setEditingId(null);
      setInitialBlocks(null);
      setSkipPicker(false);
      setOpenGenerativeOnLoad(false);
    } else if (ch === "email") {
      setShowTemplatePicker(true);
    }
  };

  const handlePickerAction = (type) => {
    setShowTemplatePicker(false);
    if (type === "basic") {
      setSelectedChannel("email");
      setEditingId(null);
      setInitialBlocks([]);
      setSkipPicker(false);
      setOpenGenerativeOnLoad(false);
    } else if (type === "generative") {
      setShowGenerativeModal(true);
    } else if (type === "ai") {
      navigate("/ai-templates");
    }
  };

  // -------- EDIT EXISTING TEMPLATE --------
  const handleTemplateEdit = (tpl) => {
    try {
      const data = JSON.parse(tpl.content || "{}");
      if (data.layout) {
        navigate(`/email-builder?template=${data.layout}`);
        return;
      }
    } catch (e) {}
    setSelectedChannel(tpl.type || "email");
    setEditingId(tpl.id);
    setInitialBlocks(null);
    setSkipPicker(false);
    setOpenGenerativeOnLoad(false);
  };

  const handlePreview = (tpl) => {
    setPreviewTpl(tpl);
  };

  // If editor is open, render it
  if (editingId !== undefined) {
    return (
      <TemplateEditorPage
        templateId={editingId}
        initialChannel={selectedChannel}
        initialBlocks={initialBlocks}
        skipPicker={skipPicker}
        openGenerativeOnLoad={openGenerativeOnLoad}
        onBack={() => {
          fetchTemplates();
          setEditingId(undefined);
          setInitialBlocks(null);
          setSkipPicker(false);
          setOpenGenerativeOnLoad(false);
        }}
      />
    );
  }

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen">
      {/* Channel Selection Modal */}
      {showChannelModal && (
        <ChannelSelectModal
          onSelect={handleChannelSelect}
          onClose={() => setShowChannelModal(false)}
        />
      )}

      {/* Template Picker Modal (three cards) */}
      {showTemplatePicker && (
        <TemplatePickerModal
          onBasic={() => handlePickerAction("basic")}
          onGenerative={() => handlePickerAction("generative")}
          onAI={() => handlePickerAction("ai")}
          onClose={() => setShowTemplatePicker(false)}
        />
      )}

      {/* Enhanced Generative Picker Modal */}
      {showGenerativeModal && (
        <GenerativePickerModal onClose={() => setShowGenerativeModal(false)} />
      )}

      {/* Template Preview Modal */}
      {previewTpl && (
        <TemplatePreviewModal tpl={previewTpl} onClose={() => setPreviewTpl(null)} />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Template Studio</h1>
            <p className="text-sm text-slate-500 mt-1">Reusable Email & WhatsApp templates with merge tag support</p>
          </div>
        </div>
        <button
          onClick={() => setShowChannelModal(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
        >
          + Create Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon="📁" label="Total Templates" value={stats.total} color="bg-white border-slate-200" />
        <StatCard icon="✉️" label="Email" value={stats.email} color="bg-indigo-50 border-indigo-200" />
        <StatCard icon="💬" label="WhatsApp" value={stats.whatsapp} color="bg-green-50 border-green-200" />
        <StatCard icon="⏳" label="Pending Review" value={stats.pending_review} color="bg-amber-50 border-amber-200" />
      </div>

      {/* Filter Bar & Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-slate-100">
          <div className="flex gap-0.5 bg-slate-100 rounded-xl p-1">
            {CHANNEL_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setChannel(tab.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  channel === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative" ref={catRef}>
            <button
              onClick={() => setCatOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {category} <span className="text-slate-400 text-[10px]">▾</span>
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-10 min-w-[190px] overflow-hidden">
                {CATEGORIES.map((c) => (
                  <div
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      setCatOpen(false);
                    }}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      category === c ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="text-xs text-slate-400 font-medium">{templates.length} templates</span>

          <div className="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
            <span className="text-slate-400 text-sm">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="border-none bg-transparent outline-none text-xs text-slate-700 w-full placeholder:text-slate-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 text-xs">
                ×
              </button>
            )}
          </div>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="text-center py-16 text-slate-400">Loading templates...</div>
          ) : templates.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🗂</div>
              <p className="text-sm font-semibold text-slate-700">No templates found</p>
              <p className="text-xs text-slate-400 mt-1">Create your first template!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {templates.map((tpl) => (
                <TemplateCard
                  key={tpl.id}
                  tpl={tpl}
                  onPreview={() => handlePreview(tpl)}
                  onEdit={() => handleTemplateEdit(tpl)}
                  onDuplicate={() => handleDuplicate(tpl)}
                  onDelete={() => setDeleteTarget(tpl.id)}
                />
              ))}
              <div
                onClick={() => setShowChannelModal(true)}
                className="rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[268px] cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 flex items-center justify-center mb-2 transition-colors">
                  <span className="text-lg text-slate-300 group-hover:text-indigo-400 transition-colors leading-none">
                    +
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">
                  New Template
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Template"
        message="Are you sure you want to delete this template? This action cannot be undone."
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
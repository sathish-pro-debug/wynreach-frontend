


// // import React, { useState, useMemo, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";  // ✅ added for navigation
// // import ReactDOM from "react-dom";
// // import {
// //   getContacts,
// //   createContact,
// //   deleteContact,
// //   updateContact,
// //   addContactToList
// // } from "../services/contactApi";
// // import { getLists } from "../services/listApi";
// // import { suppressContact } from "../services/suppressionApi";

// // /* ─── AVATAR COLORS ─────────────────────────────────────────────── */
// // const AVATAR_COLORS = [
// //   ["#4f46e5", "#7c3aed"],
// //   ["#7c3aed", "#a855f7"],
// //   ["#f59e0b", "#d97706"],
// //   ["#ef4444", "#dc2626"],
// //   ["#0ea5e9", "#06b6d4"],
// //   ["#10b981", "#059669"],
// // ];

// // /* ─── ICONS (unchanged) ───────────────────────────────────────── */
// // const SearchIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <circle cx="11" cy="11" r="8" />
// //     <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
// //   </svg>
// // );
// // const UploadIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const ImportIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const UserPlusIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //     <path d="M19 10v4m-2-2h4" strokeLinecap="round" />
// //   </svg>
// // );
// // const ChevLeft = () => (
// //   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //     <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const ChevRight = () => (
// //   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //     <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const DotsIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
// //     <circle cx="5" cy="12" r="2" />
// //     <circle cx="12" cy="12" r="2" />
// //     <circle cx="19" cy="12" r="2" />
// //   </svg>
// // );
// // const XIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const FileIcon = () => (
// //   <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
// //     <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
// //   </svg>
// // );
// // const MailIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
// //     <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const PhoneIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
// //   </svg>
// // );
// // const TagIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
// //     <line x1="7" y1="7" x2="7.01" y2="7" />
// //   </svg>
// // );
// // const ListIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
// //     <line x1="16" y1="2" x2="16" y2="6" />
// //     <line x1="8" y1="2" x2="8" y2="6" />
// //     <line x1="3" y1="10" x2="21" y2="10" />
// //     <circle cx="7" cy="15" r="1" />
// //     <circle cx="12" cy="15" r="1" />
// //     <circle cx="17" cy="15" r="1" />
// //   </svg>
// // );
// // const CampaignIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M22 6L12 13 2 6M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
// //     <path d="M12 13l-10-6" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const EditIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M17 3l4 4L7 21H3v-4L17 3z" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const DeleteIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
// //   </svg>
// // );
// // const SuppressIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <circle cx="12" cy="12" r="10" />
// //     <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
// //   </svg>
// // );

// // /* ─── UTILS ──────────────────────────────────────────────────────── */
// // const cn = (...classes) => classes.filter(Boolean).join(" ");

// // /* ─── CUSTOM MODAL POPUPS (unchanged) ──────────────────────────── */
// // const AlertModal = ({ isOpen, title, message, type = "info", onClose }) => {
// //   if (!isOpen) return null;
// //   const getIcon = () => {
// //     if (type === "success") return "✓";
// //     if (type === "error") return "✕";
// //     return "ℹ";
// //   };
// //   const getColor = () => {
// //     if (type === "success") return "text-emerald-600 bg-emerald-100";
// //     if (type === "error") return "text-red-600 bg-red-100";
// //     return "text-blue-600 bg-blue-100";
// //   };
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="p-6">
// //           <div className={`flex items-center justify-center mb-4 w-12 h-12 rounded-full mx-auto ${getColor()}`}>
// //             <span className="text-2xl font-bold">{getIcon()}</span>
// //           </div>
// //           <h3 className="text-lg font-bold text-slate-900 text-center mb-2">{title}</h3>
// //           <p className="text-sm text-slate-500 text-center mb-6">{message}</p>
// //           <div className="flex justify-center">
// //             <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">OK</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onCancel}>
// //       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="p-6">
// //           <div className="flex items-center justify-center mb-4">
// //             <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
// //               <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //               </svg>
// //             </div>
// //           </div>
// //           <h3 className="text-lg font-bold text-slate-900 text-center mb-2">{title}</h3>
// //           <p className="text-sm text-slate-500 text-center mb-6">{message}</p>
// //           <div className="flex gap-3">
// //             <button onClick={onCancel} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
// //             <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Confirm</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const PromptModal = ({ isOpen, title, message, defaultValue, onConfirm, onCancel }) => {
// //   const [value, setValue] = useState(defaultValue || "");
// //   useEffect(() => {
// //     if (isOpen) setValue(defaultValue || "");
// //   }, [isOpen, defaultValue]);
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onCancel}>
// //       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="p-6">
// //           <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
// //           <p className="text-sm text-slate-500 mb-4">{message}</p>
// //           <input
// //             type="text"
// //             value={value}
// //             onChange={(e) => setValue(e.target.value)}
// //             className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 mb-6"
// //             autoFocus
// //           />
// //           <div className="flex gap-3">
// //             <button onClick={onCancel} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
// //             <button onClick={() => onConfirm(value)} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">OK</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── ADD TO LIST MODAL ───────────────────────────────────────── */
// // const AddToListModal = ({ isOpen, onClose, onConfirm, uniqueLists, selectedCount }) => {
// //   const [selectedListId, setSelectedListId] = useState("");
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     if (!isOpen) { setSelectedListId(""); setError(""); }
// //   }, [isOpen]);

// //   if (!isOpen) return null;

// //   const handleConfirm = () => {
// //     if (!selectedListId) { setError("Please select a list"); return; }
// //     onConfirm(selectedListId);
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
// //           <h3 className="text-lg font-bold text-slate-900">Add to List</h3>
// //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
// //         </div>
// //         <div className="p-6 space-y-4">
// //           <p className="text-sm text-slate-500">
// //             Select a list to add <span className="font-semibold text-slate-700">{selectedCount} contact{selectedCount > 1 ? "s" : ""}</span> to:
// //           </p>
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">List <span className="text-red-500">*</span></label>
// //             <select
// //               value={selectedListId}
// //               onChange={(e) => { setSelectedListId(e.target.value); setError(""); }}
// //               className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${error ? "border-red-300" : "border-slate-200"}`}
// //             >
// //               <option value="">Select a list</option>
// //               {uniqueLists.map((list) => (
// //                 <option key={list.id} value={list.id}>{list.list_name}</option>
// //               ))}
// //             </select>
// //             {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
// //           </div>
// //           <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
// //             <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
// //             <button onClick={handleConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Add to List</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── SUB-COMPONENTS ─────────────────────────────────────────────── */
// // const Avatar = ({ name, ci }) => {
// //   const ini = (name || "?")
// //     .split(" ")
// //     .map((n) => n[0])
// //     .join("")
// //     .toUpperCase()
// //     .slice(0, 2);
// //   const [from, to] = AVATAR_COLORS[ci % AVATAR_COLORS.length];
// //   return (
// //     <div
// //       className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
// //       style={{ background: `linear-gradient(135deg,${from},${to})` }}
// //     >
// //       {ini}
// //     </div>
// //   );
// // };

// // const StatusBadge = ({ status }) => {
// //   const active = status === "active";
// //   return (
// //     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
// //       <span className="w-1.5 h-1.5 rounded-full bg-current" />
// //       {active ? "Active" : "Suppressed"}
// //     </span>
// //   );
// // };

// // const TagChip = ({ label }) => (
// //   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white">
// //     {label}
// //   </span>
// // );

// // const ListBadge = ({ list }) => (
// //   <span className="inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white whitespace-nowrap">
// //     {list}
// //   </span>
// // );

// // // EngBar component is kept but not used in any popup now (only for reference)
// // const EngBar = ({ score }) => {
// //   const cls =
// //     score >= 70
// //       ? { bar: "bg-emerald-500", text: "text-emerald-600" }
// //       : score >= 40
// //         ? { bar: "bg-indigo-500", text: "text-indigo-500" }
// //         : score > 0
// //           ? { bar: "bg-amber-400", text: "text-amber-500" }
// //           : { bar: "bg-slate-200", text: "text-slate-400" };
// //   return (
// //     <div className="flex items-center gap-2.5">
// //       <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
// //         <div className={`h-full rounded-full ${cls.bar}`} style={{ width: `${score}%` }} />
// //       </div>
// //       <span className={`text-xs font-black ${cls.text}`}>{score}</span>
// //     </div>
// //   );
// // };

// // const ContactActionsDropdown = ({ contact, onEdit, onDelete, onSuppress }) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [position, setPosition] = useState({ top: 0, left: 0 });
// //   const handleOpen = (e) => {
// //     e.stopPropagation();
// //     const rect = e.currentTarget.getBoundingClientRect();
// //     setPosition({ top: rect.bottom + window.scrollY, left: rect.right - 160 + window.scrollX });
// //     setIsOpen(true);
// //   };
// //   useEffect(() => {
// //     if (!isOpen) return;
// //     const handleClickOutside = (e) => {
// //       if (!e.target.closest(".contact-dropdown-menu")) setIsOpen(false);
// //     };
// //     document.addEventListener("click", handleClickOutside);
// //     return () => document.removeEventListener("click", handleClickOutside);
// //   }, [isOpen]);
// //   return (
// //     <div className="relative">
// //       <button onClick={handleOpen} className="text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg p-1.5 transition-colors">
// //         <DotsIcon />
// //       </button>
// //       {isOpen &&
// //         ReactDOM.createPortal(
// //           <div
// //             className="contact-dropdown-menu fixed bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 w-40"
// //             style={{ top: position.top, left: position.left }}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <button onClick={() => { onEdit(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
// //               <EditIcon /> Edit
// //             </button>
// //             <button onClick={() => { onDelete(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
// //               <DeleteIcon /> Delete
// //             </button>
// //             <button onClick={() => { onSuppress(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2">
// //               <SuppressIcon /> Suppress
// //             </button>
// //           </div>,
// //           document.body
// //         )}
// //     </div>
// //   );
// // };

// // /* ─── CONTACT DETAIL MODAL (ENGAGEMENT SCORE REMOVED) ──────────── */
// // const ContactDetailModal = ({ contact, isOpen, onClose }) => {
// //   if (!isOpen || !contact) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
// //           <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
// //           <div className="flex items-center gap-4">
// //             <Avatar name={contact.fullName} ci={contact.ci} />
// //             <div>
// //               <h2 className="text-xl font-bold text-slate-900">{contact.fullName}</h2>
// //               <p className="text-sm text-slate-500">Contact since {new Date().toLocaleDateString()}</p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="p-6 space-y-5">
// //           <div className="grid grid-cols-2 gap-4">
// //             <div className="flex items-start gap-3"><MailIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.email || "—"}</p></div></div>
// //             <div className="flex items-start gap-3"><PhoneIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Phone</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.phone || "—"}</p></div></div>
// //             <div className="flex items-start gap-3"><TagIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Tags</p><div className="flex flex-wrap gap-1 mt-1">{contact.tags.length > 0 ? contact.tags.map((t) => <TagChip key={t} label={t} />) : <span className="text-sm text-slate-400">—</span>}</div></div></div>
// //             <div className="flex items-start gap-3"><ListIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Lists</p>
// //               <div className="flex flex-wrap gap-2 mt-1">
// //                 {contact.lists?.length > 0 ? (
// //                   contact.lists.map((list) => (
// //                     <ListBadge key={list.id} list={list.name} />
// //                   ))
// //                 ) : (
// //                   <span className="text-sm text-slate-400">—</span>
// //                 )}
// //               </div>
// //             </div></div>
// //             <div className="flex items-start gap-3"><CampaignIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Last Campaign</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.last_campaign || "—"}</p></div></div>
// //           </div>
// //           <div className="border-t border-slate-100 pt-4">
// //             <div className="flex justify-between items-center">
// //               <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</p><StatusBadge status={contact.status} /></div>
// //               <button onClick={() => window.open(`mailto:${contact.email}`, "_blank")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Send Message</button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── EDIT CONTACT MODAL (ENGAGEMENT SCORE REMOVED) ─────────────── */
// // const EditContactModal = ({ contact, isOpen, onClose, onSave, lists, uniqueLists }) => {
// //   const [formData, setFormData] = useState({ fullName: "", email: "", countryCode: "91", phone: "", list: "", tags: "" });
// //   const [errors, setErrors] = useState({});

// //   useEffect(() => {
// //     if (contact && uniqueLists.length > 0) {
// //       let rawPhone = contact.phone || "";
// //       let countryCode = "91";
// //       const knownCodes = ["971", "65", "60", "61", "44", "1", "91"];
// //       for (const code of knownCodes) {
// //         if (rawPhone.startsWith(code) && rawPhone.length > code.length) {
// //           countryCode = code;
// //           rawPhone = rawPhone.slice(code.length);
// //           break;
// //         }
// //       }
// //       setFormData({
// //         fullName: contact.fullName || "",
// //         email: contact.email || "",
// //         countryCode,
// //         phone: rawPhone,
// //         list: contact.lists?.[0]?.id ? String(contact.lists[0].id) : "",
// //         tags: contact.tags ? contact.tags.filter(t => t).join(", ") : "",
// //       });
// //     }
// //   }, [contact, uniqueLists]);

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
// //     if (!formData.email.trim()) newErrors.email = "Email is required";
// //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };
// //   const handleSubmit = () => {
// //     if (!validate()) return;
// //     const fullPhone = formData.phone ? `${formData.countryCode}${formData.phone}` : "";
// //     onSave({ ...formData, phone: fullPhone, tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [] });
// //     onClose();
// //   };
// //   if (!isOpen || !contact) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
// //           <h3 className="text-lg font-bold text-slate-900">Edit Contact</h3>
// //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
// //         </div>
// //         <div className="p-6 space-y-4">
// //           {/* Full Name */}
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
// //             <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.fullName ? "border-red-300" : "border-slate-200"}`} />
// //             {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
// //           </div>
// //           {/* Email */}
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
// //             <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.email ? "border-red-300" : "border-slate-200"}`} />
// //             {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
// //           </div>
// //           {/* Phone with country code */}
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
// //             <div className="flex gap-2">
// //               <select value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
// //                 <option value="91">🇮🇳 +91</option>
// //                 <option value="1">🇺🇸 +1</option>
// //                 <option value="44">🇬🇧 +44</option>
// //                 <option value="61">🇦🇺 +61</option>
// //                 <option value="971">🇦🇪 +971</option>
// //                 <option value="65">🇸🇬 +65</option>
// //                 <option value="60">🇲🇾 +60</option>
// //               </select>
// //               <input type="tel" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); if (value.length <= 10) setFormData({ ...formData, phone: value }); }} placeholder="9876543210" maxLength={10} className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
// //             </div>
// //           </div>
// //           {/* List */}
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">List</label>
// //             <select value={formData.list} onChange={(e) => setFormData({ ...formData, list: e.target.value })} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
// //               <option value="">Select a list</option>
// //               {uniqueLists.map((list) => (
// //                 <option key={list.id} value={String(list.id)}>
// //                   {list.list_name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           {/* Tags */}
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags (comma separated)</label>
// //             <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="vip, customer, lead" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
// //           </div>
// //           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
// //             <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
// //             <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Changes</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const DeleteConfirmModal = ({ contact, isOpen, onClose, onConfirm }) => {
// //   if (!isOpen || !contact) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="p-6">
// //           <div className="flex items-center justify-center mb-4"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><DeleteIcon className="w-6 h-6 text-red-600" /></div></div>
// //           <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Delete Contact</h3>
// //           <p className="text-sm text-slate-500 text-center mb-6">Are you sure you want to delete <span className="font-semibold text-slate-700">{contact.fullName}</span>?<br />This action cannot be undone.</p>
// //           <div className="flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button onClick={() => onConfirm(contact)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Delete</button></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const SuppressModal = ({ contact, isOpen, onClose, onConfirm }) => {
// //   const [selectedChannel, setSelectedChannel] = useState("email");
// //   const [reason, setReason] = useState("");
// //   const [source, setSource] = useState("");

// //   const reasonOptions = [
// //     "Hard Bounce",
// //     "Unsubscribed",
// //     "Opted Out",
// //     "Spam Complaint",
// //     "Manual Blacklist",
// //   ];

// //   useEffect(() => {
// //     if (!isOpen) {
// //       setReason("");
// //       setSource("");
// //       setSelectedChannel("email");
// //     }
// //   }, [isOpen]);

// //   if (!isOpen || !contact) return null;

// //   const handleConfirm = () => {
// //     onConfirm(contact, selectedChannel, reason, source);
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="p-6">
// //           <div className="flex items-center justify-center mb-4">
// //             <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
// //               <SuppressIcon className="w-6 h-6 text-amber-600" />
// //             </div>
// //           </div>
// //           <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Suppress Contact</h3>
// //           <p className="text-sm text-slate-500 text-center mb-6">Suppress <span className="font-semibold text-slate-700">{contact.fullName}</span> from which channel?</p>
// //           <div className="space-y-3 mb-6">
// //             <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
// //               <input type="radio" name="channel" value="email" checked={selectedChannel === "email"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" />
// //               <div><p className="font-semibold text-slate-800 text-sm">Email Only</p><p className="text-xs text-slate-400">Stop email communications</p></div>
// //             </label>
// //             <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
// //               <input type="radio" name="channel" value="whatsapp" checked={selectedChannel === "whatsapp"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" />
// //               <div><p className="font-semibold text-slate-800 text-sm">WhatsApp Only</p><p className="text-xs text-slate-400">Stop WhatsApp communications</p></div>
// //             </label>
// //             <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
// //               <input type="radio" name="channel" value="both" checked={selectedChannel === "both"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" />
// //               <div><p className="font-semibold text-slate-800 text-sm">Both Channels</p><p className="text-xs text-slate-400">Stop all communications</p></div>
// //             </label>
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason <span className="text-slate-400 text-xs font-normal">(optional)</span></label>
// //             <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
// //               <option value="">All Reasons</option>
// //               {reasonOptions.map((item) => (<option key={item} value={item}>{item}</option>))}
// //             </select>
// //             <p className="text-xs text-slate-400 mt-1">Select suppression reason</p>
// //           </div>
// //           <div className="mb-6">
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Source <span className="text-slate-400 text-xs font-normal">(optional)</span></label>
// //             <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g., Admin, Support Ticket, Import, API" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
// //             <p className="text-xs text-slate-400 mt-1">Where did this suppression request come from?</p>
// //           </div>
// //           <div className="flex gap-3">
// //             <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
// //             <button onClick={handleConfirm} className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700">Suppress</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── ADD SINGLE CONTACT MODAL (ENGAGEMENT SCORE REMOVED) ───────── */
// // const SingleContactModal = ({ isOpen, onClose, onAdd, uniqueLists }) => {
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     countryCode: "91",
// //     phone: "",
// //     tags: "",
// //     list: "",
// //     is_whatsapp: false,
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
// //     if (!formData.email.trim()) newErrors.email = "Email is required";
// //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
// //     if (!formData.phone.trim()) {
// //       newErrors.phone = "Phone number is required";
// //     } else if (!/^\d{10}$/.test(formData.phone)) {
// //       newErrors.phone = "Phone number must be exactly 10 digits";
// //     }
// //     if (!formData.list) newErrors.list = "Please select a list";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validate()) return;
// //     setIsSubmitting(true);
// //     const fullPhone = `${formData.countryCode}${formData.phone}`;
// //     await onAdd({ ...formData, phone: fullPhone });
// //     setIsSubmitting(false);
// //     onClose();
// //     setFormData({ fullName: "", email: "", countryCode: "91", phone: "", tags: "", list: "", is_whatsapp: false });
// //     setErrors({});
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
// //           <h3 className="text-lg font-bold text-slate-900">Add Single Contact</h3>
// //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
// //         </div>
// //         <div className="p-6 space-y-5">
// //           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label><input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Doe" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.fullName ? "border-red-300" : "border-slate-200"}`} />{errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}</div>
// //           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.email ? "border-red-300" : "border-slate-200"}`} />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}</div>
// //           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label><div className="flex gap-2"><select value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"><option value="91">🇮🇳 +91</option><option value="1">🇺🇸 +1</option><option value="44">🇬🇧 +44</option><option value="61">🇦🇺 +61</option><option value="971">🇦🇪 +971</option><option value="65">🇸🇬 +65</option><option value="60">🇲🇾 +60</option></select><input type="tel" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); if (value.length <= 10) setFormData({ ...formData, phone: value }); }} placeholder="9876543210" maxLength={10} className={`flex-1 rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.phone ? "border-red-300" : "border-slate-200"}`} /></div>{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}</div>
// //           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags (comma separated)</label><input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="vip, customer, lead" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" /></div>
// //           {/* WhatsApp Toggle */}
// //           <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
// //             <div>
// //               <p className="text-sm font-semibold text-slate-700">WhatsApp Number?</p>
// //               <p className="text-xs text-slate-400">This number is on WhatsApp</p>
// //             </div>
// //             <button
// //               type="button"
// //               onClick={() => setFormData({ ...formData, is_whatsapp: !formData.is_whatsapp })}
// //               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.is_whatsapp ? "bg-green-500" : "bg-slate-200"
// //                 }`}
// //             >
// //               <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.is_whatsapp ? "translate-x-6" : "translate-x-1"
// //                 }`} />
// //             </button>
// //           </div>
// //           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">List <span className="text-red-500">*</span></label><select value={formData.list} onChange={(e) => setFormData({ ...formData, list: e.target.value })} className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.list ? "border-red-300" : "border-slate-200"}`}><option value="">Select a list</option>{uniqueLists.map((list) => (<option key={list.id} value={list.id}>{list.list_name}</option>))}</select>{errors.list && <p className="text-xs text-red-500 mt-1">{errors.list}</p>}</div>
// //           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100"><button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button><button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50">{isSubmitting ? "Adding..." : "Add Contact"}</button></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── IMPORT WIZARD COMPONENTS (unchanged) ─────────────────────── */
// // const Modal = ({ isOpen, onClose, title, children }) => {
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold text-slate-900">{title}</h3><button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors"><XIcon /></button></div>
// //         <div className="px-6 py-6">{children}</div>
// //       </div>
// //     </div>
// //   );
// // };

// // const UploadStep = ({ onFileSelect, selectedFile, onParsed, showAlert }) => {
// //   const [isParsing, setIsParsing] = useState(false);
// //   const handleFileUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     onFileSelect(file);
// //     setIsParsing(true);
// //     const reader = new FileReader();
// //     reader.onload = (ev) => {
// //       const text = ev.target.result;
// //       const lines = text.split("\n").filter((l) => l.trim());
// //       if (lines.length < 2) {
// //         showAlert("Invalid CSV", "CSV file must contain at least a header row and one data row.", "error");
// //         setIsParsing(false);
// //         return;
// //       }
// //       const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim());
// //       const preview = [];
// //       for (let i = 1; i <= Math.min(5, lines.length - 1); i++) {
// //         const values = lines[i].split(",").map((v) => v.replace(/"/g, "").trim());
// //         const row = {};
// //         headers.forEach((h, idx) => (row[h] = values[idx] || ""));
// //         preview.push(row);
// //       }
// //       onParsed({ headers, preview, fullData: lines.slice(1) });
// //       setIsParsing(false);
// //     };
// //     reader.readAsText(file);
// //   };
// //   return (
// //     <div className="space-y-6">
// //       <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors">
// //         <div className="flex justify-center mb-3"><FileIcon /></div>
// //         <p className="text-sm font-semibold text-slate-700 mb-1">Upload CSV File</p>
// //         <p className="text-xs text-slate-400 mb-3">Supported format: .csv with headers</p>
// //         <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
// //         <label htmlFor="csv-upload" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition"><UploadIcon /> Choose File</label>
// //         {selectedFile && <p className="text-xs text-emerald-600 mt-3 flex items-center justify-center gap-1">✓ {selectedFile.name}</p>}
// //       </div>
// //       {isParsing && <div className="flex items-center justify-center gap-2 text-sm text-indigo-600"><div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>Parsing file...</div>}
// //     </div>
// //   );
// // };

// // const MappingStep = ({ headers, preview, onMappingComplete, showAlert }) => {
// //   const [mapping, setMapping] = useState({});
// //   const requiredFields = [
// //     { key: "fullName", label: "Full Name", required: true, description: "Contact's full name" },
// //     { key: "email", label: "Email", required: true, description: "Contact's email address" },
// //     { key: "phone", label: "Phone", required: false, description: "Contact's phone number" },
// //     { key: "status", label: "Status", required: false, description: "active/suppressed" },
// //     { key: "tags", label: "Tags", required: false, description: "Comma-separated tags" },
// //     { key: "list", label: "List", required: false, description: "List name" },
// //   ];
// //   const handleMap = (field, header) => setMapping((prev) => ({ ...prev, [field]: header }));
// //   const handleContinue = () => {
// //     const missing = requiredFields.filter((f) => f.required && !mapping[f.key]);
// //     if (missing.length) {
// //       showAlert("Missing Required Fields", `Please map required fields: ${missing.map((m) => m.label).join(", ")}`, "error");
// //       return;
// //     }
// //     onMappingComplete(mapping);
// //   };
// //   if (!headers || headers.length === 0) {
// //     return <div className="text-center py-8"><p className="text-red-500">No headers found.</p><button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Go Back</button></div>;
// //   }
// //   return (
// //     <div className="space-y-6">
// //       <div className="bg-blue-50 rounded-lg p-3 border border-blue-100"><p className="text-xs text-blue-700">📌 Map your CSV columns to contact fields. Required fields must be mapped.</p><p className="text-xs text-blue-600 mt-1">Found {headers.length} columns: {headers.join(", ")}</p></div>
// //       <div className="space-y-3 max-h-96 overflow-y-auto">
// //         {requiredFields.map((field) => (
// //           <div key={field.key} className="flex items-center gap-4">
// //             <div className="w-32"><span className="text-sm font-semibold text-slate-700">{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</span><p className="text-xs text-slate-400">{field.description}</p></div>
// //             <select value={mapping[field.key] || ""} onChange={(e) => handleMap(field.key, e.target.value)} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
// //               <option value="">-- Select column --</option>
// //               {headers.map((h) => (<option key={h} value={h}>{h}</option>))}
// //             </select>
// //           </div>
// //         ))}
// //       </div>
// //       {preview && preview.length > 0 && (
// //         <div>
// //           <label className="block text-sm font-semibold text-slate-700 mb-2">Preview (first 5 rows)</label>
// //           <div className="overflow-x-auto border rounded-lg max-h-64 overflow-y-auto">
// //             <table className="w-full text-xs">
// //               <thead className="bg-slate-50 sticky top-0">
// //                 <tr>{headers.map((h) => (<th key={h} className="px-3 py-2 text-left font-semibold text-slate-600 border-b">{h}</th>))}</tr>
// //               </thead>
// //               <tbody>
// //                 {preview.map((row, idx) => (
// //                   <tr key={idx} className="border-t border-slate-100">
// //                     {headers.map((h) => (<td key={h} className="px-3 py-2 text-slate-500">{row[h] || "—"}</td>))}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}
// //       <div className="flex justify-end pt-4"><button onClick={handleContinue} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Continue to Duplicate Rules</button></div>
// //     </div>
// //   );
// // };

// // const DuplicateStep = ({ onComplete, onBack, showAlert }) => {
// //   const [duplicateRule, setDuplicateRule] = useState("update");
// //   const [matchField, setMatchField] = useState("email");
// //   const handleImport = async () => {
// //     showAlert("Import Info", `Importing with rule: ${duplicateRule}, match on: ${matchField}`, "info");
// //     onComplete();
// //   };
// //   return (
// //     <div className="space-y-6">
// //       <div className="bg-amber-50 rounded-lg p-3 border border-amber-100"><p className="text-xs text-amber-700">⚠️ Configure how to handle duplicate contacts during import.</p></div>
// //       <div><label className="block text-sm font-semibold text-slate-700 mb-2">Match duplicates by</label><select value={matchField} onChange={(e) => setMatchField(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500"><option value="email">Email</option><option value="phone">Phone</option><option value="email_or_phone">Email or Phone</option></select></div>
// //       <div><label className="block text-sm font-semibold text-slate-700 mb-2">If duplicate found</label><div className="space-y-2">
// //         <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="duplicateRule" value="skip" checked={duplicateRule === "skip"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">Skip duplicate</p><p className="text-xs text-slate-400">Don't import contacts that already exist</p></div></label>
// //         <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="duplicateRule" value="update" checked={duplicateRule === "update"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">Update existing</p><p className="text-xs text-slate-400">Overwrite existing contact data with new values</p></div></label>
// //         <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="duplicateRule" value="create_new" checked={duplicateRule === "create_new"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">Create as new</p><p className="text-xs text-slate-400">Always create a new contact even if duplicate exists</p></div></label>
// //       </div></div>
// //       <div className="flex justify-between pt-4"><button onClick={onBack} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Back</button><button onClick={handleImport} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">Confirm Import</button></div>
// //     </div>
// //   );
// // };

// // const SuccessStep = ({ importedCount, onClose }) => (
// //   <div className="text-center py-8 space-y-4">
// //     <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto"><svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
// //     <h4 className="text-xl font-bold text-slate-900">Import Complete!</h4><p className="text-slate-500">Successfully imported <span className="font-bold text-emerald-600">{importedCount}</span> contacts.</p>
// //     <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Close</button>
// //   </div>
// // );

// // /* ─── MAIN PAGE ──────────────────────────────────────────────────── */
// // export default function ContactsPage() {
// //   const navigate = useNavigate(); // ✅ for back navigation
// //   const [contacts, setContacts] = useState([]);
// //   const [lists, setLists] = useState([]);

// //   const uniqueLists = useMemo(() => [
// //     ...new Map(
// //       lists.map((list) => [list.id, list])
// //     ).values()
// //   ], [lists]);

// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [listFilter, setListFilter] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("");
// //   const [channelFilter, setChannelFilter] = useState("all");
// //   const [page, setPage] = useState(1);
// //   const [selected, setSelected] = useState(new Set());
// //   const LIMIT = 10;

// //   const [selectedContact, setSelectedContact] = useState(null);
// //   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
// //   const [isSingleContactModalOpen, setIsSingleContactModalOpen] = useState(false);
// //   const [isImportModalOpen, setIsImportModalOpen] = useState(false);
// //   const [importStep, setImportStep] = useState(1);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [parsedData, setParsedData] = useState({ headers: [], preview: [], fullData: [] });
// //   const [columnMapping, setColumnMapping] = useState({});
// //   const [importedCount, setImportedCount] = useState(0);
// //   const [editingContact, setEditingContact] = useState(null);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [deletingContact, setDeletingContact] = useState(null);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [suppressingContact, setSuppressingContact] = useState(null);
// //   const [isSuppressModalOpen, setIsSuppressModalOpen] = useState(false);
// //   const [isAddToListModalOpen, setIsAddToListModalOpen] = useState(false);

// //   const [alertModal, setAlertModal] = useState({ isOpen: false, title: "", message: "", type: "info" });
// //   const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });
// //   const [promptModal, setPromptModal] = useState({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null });

// //   const showAlert = (title, message, type = "info") => setAlertModal({ isOpen: true, title, message, type });
// //   const showConfirm = (title, message, onConfirm) => setConfirmModal({ isOpen: true, title, message, onConfirm });
// //   const showPrompt = (title, message, defaultValue, onConfirm) => setPromptModal({ isOpen: true, title, message, defaultValue, onConfirm });

// //   const fetchContacts = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getContacts();
// //       console.log("Backend response:", data);
// //       const formatted = data.map((item, index) => ({
// //         id: item.id,
// //         fullName: item.name,
// //         email: item.email,
// //         phone: item.phone || "",
// //         status: item.status,
// //         tags: item.tags || [],
// //         score: item.score || 50,
// //         lists: item.lists || [],
// //         is_whatsapp: item.is_whatsapp || false,
// //         campaign: item.last_campaign || "—",
// //         ci: index % AVATAR_COLORS.length,
// //       }));
// //       setContacts(formatted);
// //     } catch (error) {
// //       console.error(error);
// //       showAlert("Error", "Failed to load contacts", "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchLists = async () => {
// //     try {
// //       const data = await getLists();
// //       setLists(data);
// //     } catch (error) {
// //       showAlert("Error", "Failed to load lists", "error");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchContacts();
// //     fetchLists();
// //   }, []);

// //   useEffect(() => setPage(1), [search, listFilter, statusFilter, channelFilter]);

// //   const handleEdit = (contact) => {
// //     setEditingContact(contact);
// //     setIsEditModalOpen(true);
// //   };

// //   const handleEditSave = async (updatedData) => {
// //     try {
// //       await updateContact(
// //         editingContact.id,
// //         {
// //           full_name: updatedData.fullName,
// //           email: updatedData.email,
// //           phone: updatedData.phone,
// //           status: "active",
// //           tags: updatedData.tags,
// //           campaign: editingcontact.last_campaign
// //         }
// //       );
// //       await fetchContacts();
// //       setIsEditModalOpen(false);
// //       setEditingContact(null);
// //       showAlert("Success", "Contact updated successfully", "success");
// //     } catch (error) {
// //       console.error(error);
// //       showAlert("Error", error?.response?.data?.detail || "Failed to update contact", "error");
// //     }
// //   };

// //   const handleDelete = (contact) => {
// //     setDeletingContact(contact);
// //     setIsDeleteModalOpen(true);
// //   };
// //   const handleDeleteSelected = async () => {
// //     try {
// //       for (const contactId of selected) {
// //         await deleteContact(contactId);
// //       }
// //       await fetchContacts();
// //       clearSel();
// //       showAlert("Success", "Contacts deleted successfully", "success");
// //     } catch (error) {
// //       console.error(error);
// //       showAlert("Error", "Failed to delete contacts", "error");
// //     }
// //   };

// //   const handleDeleteConfirm = async (contact) => {
// //     try {
// //       await deleteContact(contact.id);
// //       await fetchContacts();
// //       showAlert("Success", `Contact "${contact.fullName}" deleted permanently!`, "success");
// //     } catch (error) {
// //       showAlert("Error", "Failed to delete contact.", "error");
// //     } finally {
// //       setIsDeleteModalOpen(false);
// //       setDeletingContact(null);
// //     }
// //   };

// //   const handleSuppress = (contact) => {
// //     setSuppressingContact(contact);
// //     setIsSuppressModalOpen(true);
// //   };

// //   const handleSuppressConfirm = async (contact, channel, reason, source) => {
// //     try {
// //       await suppressContact(contact.id, { reason: reason || "Manual Blacklist", channel: channel });
// //       await fetchContacts();
// //       showAlert("Success", "Contact suppressed successfully", "success");
// //       setIsSuppressModalOpen(false);
// //       setSuppressingContact(null);
// //     } catch (error) {
// //       showAlert("Error", "Failed to suppress contact", "error");
// //     }
// //   };

// //   const handleAddSingleContact = () => setIsSingleContactModalOpen(true);

// //   const handleSingleContactAdd = async (newContact) => {
// //     try {
// //       await createContact({
// //         full_name: newContact.fullName,
// //         email: newContact.email,
// //         phone: newContact.phone,
// //         status: "active",
// //         list_id: parseInt(newContact.list),
// //         tags: newContact.tags ? newContact.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
// //         is_whatsapp: newContact.is_whatsapp,
// //       });
// //       await fetchContacts();
// //       showAlert("Success", "Contact added successfully", "success");
// //     } catch (error) {
// //       console.error(error);
// //       showAlert("Error", "Failed to add contact.", "error");
// //     }
// //   };

// //   const handleOpenAddToList = () => {
// //     if (selected.size === 0) {
// //       showAlert("No selection", "Please select at least one contact.", "info");
// //       return;
// //     }
// //     setIsAddToListModalOpen(true);
// //   };

// //   const handleAddToListConfirm = async (listId) => {
// //     try {
// //       for (const contactId of selected) {
// //         try {
// //           await addContactToList(contactId, listId);
// //         } catch (err) {
// //           if (err?.response?.status !== 400) throw err;
// //         }
// //       }
// //       await fetchContacts();
// //       const targetList = lists.find((list) => String(list.id) === String(listId));
// //       showAlert("Success", `Added ${selected.size} contact(s) to "${targetList?.list_name}"`, "success");
// //       clearSel();
// //       setIsAddToListModalOpen(false);
// //     } catch (error) {
// //       console.error(error);
// //       showAlert("Error", "Failed to add contacts to list", "error");
// //     }
// //   };

// //   const handleApplyTag = () => {
// //     if (!selected.size) {
// //       showAlert("No selection", "Please select at least one contact.", "info");
// //       return;
// //     }
// //     showPrompt("Apply Tag", "Enter tag name:", "", (tag) => {
// //       if (tag && tag.trim()) {
// //         setContacts((prev) =>
// //           prev.map((c) => (selected.has(c.id) ? { ...c, tags: [...c.tags, tag.trim()] } : c))
// //         );
// //         showAlert("Success", `Tag "${tag.trim()}" applied to ${selected.size} contacts`, "success");
// //         clearSel();
// //       }
// //     });
// //   };

// //   const handleImport = () => {
// //     setImportStep(1);
// //     setSelectedFile(null);
// //     setParsedData({ headers: [], preview: [], fullData: [] });
// //     setColumnMapping({});
// //     setIsImportModalOpen(true);
// //   };

// //   const handleFileSelect = (file) => setSelectedFile(file);
// //   const handleParsed = (data) => {
// //     setParsedData(data);
// //     setImportStep(2);
// //   };
// //   const handleMappingComplete = (mapping) => {
// //     setColumnMapping(mapping);
// //     setImportStep(3);
// //   };
// //   const handleDuplicateComplete = () => {
// //     const newContacts = parsedData.fullData.slice(0, 5).map((line, idx) => {
// //       const values = line.split(",").map((v) => v.replace(/"/g, "").trim());
// //       return {
// //         id: `imp_${Date.now()}_${idx}`,
// //         fullName: values[0] || "Unknown",
// //         email: values[1] || "",
// //         phone: values[2] || "",
// //         status: "active",
// //         tags: [],
// //         score: 50,
// //         lists: [],
// //         campaign: "—",
// //         ci: idx % AVATAR_COLORS.length,
// //       };
// //     });
// //     setContacts((prev) => [...newContacts, ...prev]);
// //     setImportedCount(newContacts.length);
// //     setImportStep(4);
// //   };
// //   const handleImportClose = () => {
// //     setIsImportModalOpen(false);
// //     setImportStep(1);
// //     setSelectedFile(null);
// //     setParsedData({ headers: [], preview: [], fullData: [] });
// //     setColumnMapping({});
// //   };

// //   const clearSel = () => setSelected(new Set());
// //   const toggleRow = (id) =>
// //     setSelected((prev) => {
// //       const newSet = new Set(prev);
// //       newSet.has(id) ? newSet.delete(id) : newSet.add(id);
// //       return newSet;
// //     });
// //   const toggleAll = (e) =>
// //     e.target.checked ? setSelected(new Set(paginated.map((c) => c.id))) : setSelected(new Set());

// //   const handleExport = () => {
// //     const headers = ["Full Name", "Email", "Phone", "Status", "Tags", "List(s)", "Campaign"];
// //     const rows = filtered.map((c) => [
// //       c.fullName,
// //       c.email,
// //       c.phone,
// //       c.status,
// //       c.tags.join(";"),
// //       c.lists.map(l => l.name).join(", "),
// //       c.campaign,
// //     ]);
// //     const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
// //     const a = document.createElement("a");
// //     a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
// //     a.download = `contacts_${new Date().toISOString().slice(0, 10)}.csv`;
// //     a.click();
// //     showAlert("Export", "Export started successfully", "success");
// //   };

// //   const filtered = useMemo(() => {
// //     let result = contacts;
// //     if (search.trim()) {
// //       const q = search.toLowerCase();
// //       result = result.filter(
// //         (c) =>
// //           c.fullName.toLowerCase().includes(q) ||
// //           c.email.toLowerCase().includes(q) ||
// //           c.phone.includes(q) ||
// //           c.tags.some((tag) => tag.toLowerCase().includes(q))
// //       );
// //     }
// //     if (listFilter) {
// //       result = result.filter(c => c.lists.some(list => list.name === listFilter));
// //     }
// //     if (statusFilter) result = result.filter((c) => c.status === statusFilter);
// //     if (channelFilter === "whatsapp") result = result.filter((c) => c.is_whatsapp === true);
// //     return result;
// //   }, [contacts, search, listFilter, statusFilter, channelFilter]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / LIMIT));
// //   const currentPage = Math.min(page, totalPages);
// //   const paginated = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
// //   const activeCount = contacts.filter((c) => c.status === "active").length;
// //   const suppCount = contacts.filter((c) => c.status === "suppressed").length;
// //   const allChecked = paginated.length > 0 && paginated.every((c) => selected.has(c.id));
// //   const pageButtons = useMemo(() => {
// //     const btns = [];
// //     if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) btns.push(i);
// //     else {
// //       btns.push(1);
// //       if (currentPage > 3) btns.push("...");
// //       for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
// //       if (currentPage < totalPages - 2) btns.push("...");
// //       btns.push(totalPages);
// //     }
// //     return btns;
// //   }, [currentPage, totalPages]);
// //   const startItem = (currentPage - 1) * LIMIT + 1;
// //   const endItem = Math.min(currentPage * LIMIT, filtered.length);
// //   const openContactDetail = (contact) => {
// //     setSelectedContact(contact);
// //     setIsContactModalOpen(true);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="p-10 text-center">
// //         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
// //         <p className="mt-4 text-slate-500">Loading contacts...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 bg-slate-50 min-h-screen">
// //       <AlertModal
// //         isOpen={alertModal.isOpen}
// //         title={alertModal.title}
// //         message={alertModal.message}
// //         type={alertModal.type}
// //         onClose={() => setAlertModal({ isOpen: false, title: "", message: "", type: "info" })}
// //       />
// //       <ConfirmModal
// //         isOpen={confirmModal.isOpen}
// //         title={confirmModal.title}
// //         message={confirmModal.message}
// //         onConfirm={() => {
// //           confirmModal.onConfirm?.();
// //           setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null });
// //         }}
// //         onCancel={() => setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null })}
// //       />
// //       <PromptModal
// //         isOpen={promptModal.isOpen}
// //         title={promptModal.title}
// //         message={promptModal.message}
// //         defaultValue={promptModal.defaultValue}
// //         onConfirm={(value) => {
// //           promptModal.onConfirm?.(value);
// //           setPromptModal({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null });
// //         }}
// //         onCancel={() => setPromptModal({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null })}
// //       />

// //       {/* HEADER with Back Arrow */}
// //       <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
// //         <div className="flex items-center gap-3">
// //           {/* Back Arrow Button - same style as TemplateEditorPage */}
// //           <button
// //             onClick={() => navigate("/dashboard")}
// //             className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
// //             aria-label="Back to Dashboard"
// //           >
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //               strokeWidth={2.5}
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 d="M15 19l-7-7 7-7"
// //               />
// //             </svg>
// //           </button>
// //           <div>
// //             <h1 className="text-[26px] font-extrabold text-slate-900 leading-[1.2] tracking-[-0.02em]">All Contacts</h1>
// //             <p className="text-sm text-slate-400 mt-1 font-medium">{contacts.length.toLocaleString()} total · {activeCount.toLocaleString()} active · {suppCount.toLocaleString()} suppressed</p>
// //           </div>
// //         </div>
// //         <div className="flex gap-2.5">
// //           <button onClick={handleAddSingleContact} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"><UserPlusIcon /> Add Contact</button>
// //           <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"><UploadIcon /> Export</button>
// //           <button onClick={handleImport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"><ImportIcon /> Import Contacts</button>
// //         </div>
// //       </div>

// //       {/* BULK ACTION BAR */}
// //       {selected.size > 0 && (
// //         <div className="flex flex-wrap items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-4">
// //           <span className="text-sm font-bold text-indigo-700">{selected.size} selected</span>
// //           <button onClick={handleOpenAddToList} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Add to List</button>
// //           <button onClick={handleApplyTag} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Apply Tag</button>
// //           <button onClick={handleDeleteSelected} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Delete</button>
// //           <button onClick={clearSel} className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-medium">Clear</button>
// //         </div>
// //       )}

// //       {/* CARD */}
// //       <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
// //         {/* FILTERS */}
// //         <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
// //           <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span><input type="text" placeholder="Search by name, email, phone or tag" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
// //           <select value={listFilter} onChange={(e) => setListFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
// //             <option value="">All Lists</option>
// //             {uniqueLists.map((list) => (
// //               <option key={list.id} value={list.list_name}>{list.list_name}</option>
// //             ))}
// //           </select>
// //           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"><option value="">All Status</option><option value="active">Active</option><option value="suppressed">Suppressed</option></select>
// //           <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"><option value="all">All Channels</option><option value="email">Email eligible</option><option value="whatsapp">WhatsApp eligible</option></select>
// //           <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
// //         </div>

// //         {/* TABLE */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm border-collapse">
// //             <thead>
// //               <tr className="border-b border-slate-100 bg-slate-50">
// //                 <th className="px-4 py-3 w-10"><input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-indigo-600" /></th>
// //                 {["CONTACT", "LISTS", "STATUS", "TAGS", "LAST CAMPAIGN", ""].map((h) => (
// //                   <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">{h}</th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {paginated.length === 0 ? (
// //                 <tr><td colSpan={7} className="text-center py-16 text-slate-400 text-sm font-medium">No contacts found. Try adjusting your search or filters.</td></tr>
// //               ) : (
// //                 paginated.map((c) => (
// //                   <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
// //                     <td className="px-4 py-3.5"><input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleRow(c.id)} className="accent-indigo-600" /></td>
// //                     <td className="px-4 py-3.5"><div className="flex items-center gap-3 cursor-pointer" onClick={() => openContactDetail(c)}><Avatar name={c.fullName} ci={c.ci} /><div><p className="font-bold text-slate-800 text-sm leading-tight">{c.fullName}</p><p className="text-xs text-slate-400 font-medium mt-0.5">{c.email || c.phone || "—"}</p></div></div></td>
// //                     <td className="px-4 py-3.5">
// //                       <div className="flex flex-wrap gap-2">
// //                         {c.lists?.length > 0 ? (
// //                           c.lists.map((list) => (
// //                             <ListBadge key={list.id} list={list.name} />
// //                           ))
// //                         ) : (
// //                           <span className="text-slate-400 text-sm">—</span>
// //                         )}
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
// //                     <td className="px-4 py-3.5"><div className="flex gap-1.5 flex-wrap">{c.tags.slice(0, 2).map((t) => <TagChip key={t} label={t} />)}{c.tags.length > 2 && <TagChip label={`+${c.tags.length - 2}`} />}</div></td>
// //                     <td className="px-4 py-3.5 text-sm text-slate-400 font-medium">{c.campaign || "—"}</td>
// //                     <td className="px-3 py-3.5"><ContactActionsDropdown contact={c} onEdit={handleEdit} onDelete={handleDelete} onSuppress={handleSuppress} /></td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* PAGINATION */}
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
// //           <p className="text-sm text-slate-400 font-medium">Showing {filtered.length === 0 ? "0" : `${startItem}–${endItem}`} of {filtered.length.toLocaleString()} contacts</p>
// //           <div className="flex items-center gap-1">
// //             <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"><ChevLeft /></button>
// //             {pageButtons.map((b, i) =>
// //               b === "..." ? <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span> : <button key={b} onClick={() => setPage(b)} className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${currentPage === b ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>{b}</button>
// //             )}
// //             <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"><ChevRight /></button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* MODALS */}
// //       <ContactDetailModal contact={selectedContact} isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
// //       <SingleContactModal
// //         isOpen={isSingleContactModalOpen}
// //         onClose={() => setIsSingleContactModalOpen(false)}
// //         onAdd={handleSingleContactAdd}
// //         uniqueLists={uniqueLists}
// //       />
// //       <Modal isOpen={isImportModalOpen} onClose={handleImportClose} title="Import Contacts">
// //         {importStep === 1 && <UploadStep onFileSelect={handleFileSelect} selectedFile={selectedFile} onParsed={handleParsed} showAlert={showAlert} />}
// //         {importStep === 2 && <MappingStep headers={parsedData.headers} preview={parsedData.preview} onMappingComplete={handleMappingComplete} showAlert={showAlert} />}
// //         {importStep === 3 && <DuplicateStep onComplete={handleDuplicateComplete} onBack={() => setImportStep(2)} showAlert={showAlert} />}
// //         {importStep === 4 && <SuccessStep importedCount={importedCount} onClose={handleImportClose} />}
// //       </Modal>
// //       <EditContactModal contact={editingContact} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleEditSave} lists={lists} uniqueLists={uniqueLists} />
// //       <DeleteConfirmModal contact={deletingContact} isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />
// //       <SuppressModal contact={suppressingContact} isOpen={isSuppressModalOpen} onClose={() => setIsSuppressModalOpen(false)} onConfirm={handleSuppressConfirm} />
// //       <AddToListModal
// //         isOpen={isAddToListModalOpen}
// //         onClose={() => setIsAddToListModalOpen(false)}
// //         onConfirm={handleAddToListConfirm}
// //         uniqueLists={uniqueLists}
// //         selectedCount={selected.size}
// //       />
// //     </div>
// //   );
// // }



// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactDOM from "react-dom";
// import {
//   getContacts,
//   createContact,
//   deleteContact,
//   updateContact,
//   addContactToList
// } from "../services/contactApi";
// import { getLists } from "../services/listApi";
// import { suppressContact } from "../services/suppressionApi";
// import Papa from "papaparse";

// /* ─── AVATAR COLORS ─────────────────────────────────────────────── */
// const AVATAR_COLORS = [
//   ["#4f46e5", "#7c3aed"],
//   ["#7c3aed", "#a855f7"],
//   ["#f59e0b", "#d97706"],
//   ["#ef4444", "#dc2626"],
//   ["#0ea5e9", "#06b6d4"],
//   ["#10b981", "#059669"],
// ];

// /* ─── ICONS (unchanged) ───────────────────────────────────────── */
// const SearchIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="11" cy="11" r="8" />
//     <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
//   </svg>
// );
// const UploadIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const ImportIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const UserPlusIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     <path d="M19 10v4m-2-2h4" strokeLinecap="round" />
//   </svg>
// );
// const ChevLeft = () => (
//   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const ChevRight = () => (
//   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const DotsIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
//     <circle cx="5" cy="12" r="2" />
//     <circle cx="12" cy="12" r="2" />
//     <circle cx="19" cy="12" r="2" />
//   </svg>
// );
// const XIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const FileIcon = () => (
//   <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//     <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
//   </svg>
// );
// const MailIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//     <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const PhoneIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );
// const TagIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
//     <line x1="7" y1="7" x2="7.01" y2="7" />
//   </svg>
// );
// const ListIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//     <circle cx="7" cy="15" r="1" />
//     <circle cx="12" cy="15" r="1" />
//     <circle cx="17" cy="15" r="1" />
//   </svg>
// );
// const CampaignIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M22 6L12 13 2 6M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
//     <path d="M12 13l-10-6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const EditIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M17 3l4 4L7 21H3v-4L17 3z" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const DeleteIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
//   </svg>
// );
// const SuppressIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="10" />
//     <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//   </svg>
// );

// /* ─── UTILS ──────────────────────────────────────────────────────── */
// const cn = (...classes) => classes.filter(Boolean).join(" ");


// const isWhatsAppEligible = (phone) => {
//   const digits = phone.replace(/\D/g, "");
//   const last10 = digits.slice(-10);
//   return last10.length === 10 && /^[6-9]/.test(last10);
// };

// /* ─── CUSTOM MODAL POPUPS (unchanged) ──────────────────────────── */
// const AlertModal = ({ isOpen, title, message, type = "info", onClose }) => {
//   if (!isOpen) return null;
//   const getIcon = () => {
//     if (type === "success") return "✓";
//     if (type === "error") return "✕";
//     return "ℹ";
//   };
//   const getColor = () => {
//     if (type === "success") return "text-emerald-600 bg-emerald-100";
//     if (type === "error") return "text-red-600 bg-red-100";
//     return "text-blue-600 bg-blue-100";
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="p-6">
//           <div className={`flex items-center justify-center mb-4 w-12 h-12 rounded-full mx-auto ${getColor()}`}>
//             <span className="text-2xl font-bold">{getIcon()}</span>
//           </div>
//           <h3 className="text-lg font-bold text-slate-900 text-center mb-2">{title}</h3>
//           <p className="text-sm text-slate-500 text-center mb-6">{message}</p>
//           <div className="flex justify-center">
//             <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">OK</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onCancel}>
//       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
//               <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//             </div>
//           </div>
//           <h3 className="text-lg font-bold text-slate-900 text-center mb-2">{title}</h3>
//           <p className="text-sm text-slate-500 text-center mb-6">{message}</p>
//           <div className="flex gap-3">
//             <button onClick={onCancel} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
//             <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Confirm</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PromptModal = ({ isOpen, title, message, defaultValue, onConfirm, onCancel }) => {
//   const [value, setValue] = useState(defaultValue || "");
//   useEffect(() => {
//     if (isOpen) setValue(defaultValue || "");
//   }, [isOpen, defaultValue]);
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onCancel}>
//       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="p-6">
//           <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
//           <p className="text-sm text-slate-500 mb-4">{message}</p>
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 mb-6"
//             autoFocus
//           />
//           <div className="flex gap-3">
//             <button onClick={onCancel} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
//             <button onClick={() => onConfirm(value)} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">OK</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── ADD TO LIST MODAL ───────────────────────────────────────── */
// const AddToListModal = ({ isOpen, onClose, onConfirm, uniqueLists, selectedCount }) => {
//   const [selectedListId, setSelectedListId] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!isOpen) { setSelectedListId(""); setError(""); }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleConfirm = () => {
//     if (!selectedListId) { setError("Please select a list"); return; }
//     onConfirm(selectedListId);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">Add to List</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
//         </div>
//         <div className="p-6 space-y-4">
//           <p className="text-sm text-slate-500">
//             Select a list to add <span className="font-semibold text-slate-700">{selectedCount} contact{selectedCount > 1 ? "s" : ""}</span> to:
//           </p>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">List <span className="text-red-500">*</span></label>
//             <select
//               value={selectedListId}
//               onChange={(e) => { setSelectedListId(e.target.value); setError(""); }}
//               className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${error ? "border-red-300" : "border-slate-200"}`}
//             >
//               <option value="">Select a list</option>
//               {uniqueLists.map((list) => (
//                 <option key={list.id} value={list.id}>{list.list_name}</option>
//               ))}
//             </select>
//             {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//           </div>
//           <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
//             <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
//             <button onClick={handleConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Add to List</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── SUB-COMPONENTS ─────────────────────────────────────────────── */
// const Avatar = ({ name, ci }) => {
//   const ini = (name || "?")
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
//   const [from, to] = AVATAR_COLORS[ci % AVATAR_COLORS.length];
//   return (
//     <div
//       className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
//       style={{ background: `linear-gradient(135deg,${from},${to})` }}
//     >
//       {ini}
//     </div>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const active = status === "active";
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
//       <span className="w-1.5 h-1.5 rounded-full bg-current" />
//       {active ? "Active" : "Suppressed"}
//     </span>
//   );
// };

// const TagChip = ({ label }) => (
//   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white">
//     {label}
//   </span>
// );

// const ListBadge = ({ list }) => (
//   <span className="inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white whitespace-nowrap">
//     {list}
//   </span>
// );

// // EngBar component is kept but not used in any popup now (only for reference)
// const EngBar = ({ score }) => {
//   const cls =
//     score >= 70
//       ? { bar: "bg-emerald-500", text: "text-emerald-600" }
//       : score >= 40
//         ? { bar: "bg-indigo-500", text: "text-indigo-500" }
//         : score > 0
//           ? { bar: "bg-amber-400", text: "text-amber-500" }
//           : { bar: "bg-slate-200", text: "text-slate-400" };
//   return (
//     <div className="flex items-center gap-2.5">
//       <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
//         <div className={`h-full rounded-full ${cls.bar}`} style={{ width: `${score}%` }} />
//       </div>
//       <span className={`text-xs font-black ${cls.text}`}>{score}</span>
//     </div>
//   );
// };

// const ContactActionsDropdown = ({ contact, onEdit, onDelete, onSuppress }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   const handleOpen = (e) => {
//     e.stopPropagation();
//     const rect = e.currentTarget.getBoundingClientRect();
//     setPosition({ top: rect.bottom + window.scrollY, left: rect.right - 160 + window.scrollX });
//     setIsOpen(true);
//   };
//   useEffect(() => {
//     if (!isOpen) return;
//     const handleClickOutside = (e) => {
//       if (!e.target.closest(".contact-dropdown-menu")) setIsOpen(false);
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isOpen]);
//   return (
//     <div className="relative">
//       <button onClick={handleOpen} className="text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg p-1.5 transition-colors">
//         <DotsIcon />
//       </button>
//       {isOpen &&
//         ReactDOM.createPortal(
//           <div
//             className="contact-dropdown-menu fixed bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 w-40"
//             style={{ top: position.top, left: position.left }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button onClick={() => { onEdit(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
//               <EditIcon /> Edit
//             </button>
//             <button onClick={() => { onDelete(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
//               <DeleteIcon /> Delete
//             </button>
//             <button onClick={() => { onSuppress(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2">
//               <SuppressIcon /> Suppress
//             </button>
//           </div>,
//           document.body
//         )}
//     </div>
//   );
// };

// /* ─── CONTACT DETAIL MODAL (ENGAGEMENT SCORE REMOVED) ──────────── */
// const ContactDetailModal = ({ contact, isOpen, onClose }) => {
//   if (!isOpen || !contact) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
//           <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
//           <div className="flex items-center gap-4">
//             <Avatar name={contact.fullName} ci={contact.ci} />
//             <div>
//               <h2 className="text-xl font-bold text-slate-900">{contact.fullName}</h2>
//               <p className="text-sm text-slate-500">Contact since {new Date().toLocaleDateString()}</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-6 space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-start gap-3"><MailIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.email || "—"}</p></div></div>
//             <div className="flex items-start gap-3"><PhoneIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Phone</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.phone || "—"}</p></div></div>
//             <div className="flex items-start gap-3"><TagIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Tags</p><div className="flex flex-wrap gap-1 mt-1">{contact.tags.length > 0 ? contact.tags.map((t) => <TagChip key={t} label={t} />) : <span className="text-sm text-slate-400">—</span>}</div></div></div>
//             <div className="flex items-start gap-3"><ListIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Lists</p>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {contact.lists?.length > 0 ? (
//                   contact.lists.map((list) => (
//                     <ListBadge key={list.id} list={list.name} />
//                   ))
//                 ) : (
//                   <span className="text-sm text-slate-400">—</span>
//                 )}
//               </div>
//             </div></div>
//             <div className="flex items-start gap-3"><CampaignIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Last Campaign</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.last_campaign || "—"}</p></div></div>
//           </div>
//           <div className="border-t border-slate-100 pt-4">
//             <div className="flex justify-between items-center">
//               <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</p><StatusBadge status={contact.status} /></div>
//               <button onClick={() => window.open(`mailto:${contact.email}`, "_blank")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Send Message</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── EDIT CONTACT MODAL (ENGAGEMENT SCORE REMOVED) ─────────────── */
// const EditContactModal = ({ contact, isOpen, onClose, onSave, lists, uniqueLists }) => {
//   const [formData, setFormData] = useState({ fullName: "", email: "", countryCode: "91", phone: "", list: "", tags: "" });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (contact && uniqueLists.length > 0) {
//       let rawPhone = contact.phone || "";
//       let countryCode = "91";
//       const knownCodes = ["971", "65", "60", "61", "44", "1", "91"];
//       for (const code of knownCodes) {
//         if (rawPhone.startsWith(code) && rawPhone.length > code.length) {
//           countryCode = code;
//           rawPhone = rawPhone.slice(code.length);
//           break;
//         }
//       }
//       setFormData({
//         fullName: contact.fullName || "",
//         email: contact.email || "",
//         countryCode,
//         phone: rawPhone,
//         list: contact.lists?.[0]?.id ? String(contact.lists[0].id) : "",
//         tags: contact.tags ? contact.tags.filter(t => t).join(", ") : "",
//       });
//     }
//   }, [contact, uniqueLists]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//   const handleSubmit = () => {
//     if (!validate()) return;
//     const fullPhone = formData.phone ? `${formData.countryCode}${formData.phone}` : "";
//     onSave({ ...formData, phone: fullPhone, tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [] });
//     onClose();
//   };
//   if (!isOpen || !contact) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">Edit Contact</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
//         </div>
//         <div className="p-6 space-y-4">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
//             <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.fullName ? "border-red-300" : "border-slate-200"}`} />
//             {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
//           </div>
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
//             <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.email ? "border-red-300" : "border-slate-200"}`} />
//             {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
//           </div>
//           {/* Phone with country code */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
//             <div className="flex gap-2">
//               <select value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
//                 <option value="91">🇮🇳 +91</option>
//                 <option value="1">🇺🇸 +1</option>
//                 <option value="44">🇬🇧 +44</option>
//                 <option value="61">🇦🇺 +61</option>
//                 <option value="971">🇦🇪 +971</option>
//                 <option value="65">🇸🇬 +65</option>
//                 <option value="60">🇲🇾 +60</option>
//               </select>
//               <input type="tel" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); if (value.length <= 10) setFormData({ ...formData, phone: value, is_whatsapp: isWhatsAppEligible(value) }); }} placeholder="9876543210" maxLength={10} className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
//             </div>
//           </div>
//           {/* List */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">List</label>
//             <select value={formData.list} onChange={(e) => setFormData({ ...formData, list: e.target.value })} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
//               <option value="">Select a list</option>
//               {uniqueLists.map((list) => (
//                 <option key={list.id} value={String(list.id)}>
//                   {list.list_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Tags */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags (comma separated)</label>
//             <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="vip, customer, lead" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
//           </div>
//           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
//             <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
//             <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Changes</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DeleteConfirmModal = ({ contact, isOpen, onClose, onConfirm }) => {
//   if (!isOpen || !contact) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><DeleteIcon className="w-6 h-6 text-red-600" /></div></div>
//           <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Delete Contact</h3>
//           <p className="text-sm text-slate-500 text-center mb-6">Are you sure you want to delete <span className="font-semibold text-slate-700">{contact.fullName}</span>?<br />This action cannot be undone.</p>
//           <div className="flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button onClick={() => onConfirm(contact)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Delete</button></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SuppressModal = ({ contact, isOpen, onClose, onConfirm }) => {
//   const [selectedChannel, setSelectedChannel] = useState("email");
//   const [reason, setReason] = useState("");
//   const [source, setSource] = useState("");

//   const reasonOptions = [
//     "Hard Bounce",
//     "Unsubscribed",
//     "Opted Out",
//     "Spam Complaint",
//     "Manual Blacklist",
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setReason("");
//       setSource("");
//       setSelectedChannel("email");
//     }
//   }, [isOpen]);

//   if (!isOpen || !contact) return null;

//   const handleConfirm = () => {
//     onConfirm(contact, selectedChannel, reason, source);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
//               <SuppressIcon className="w-6 h-6 text-amber-600" />
//             </div>
//           </div>
//           <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Suppress Contact</h3>
//           <p className="text-sm text-slate-500 text-center mb-6">Suppress <span className="font-semibold text-slate-700">{contact.fullName}</span> from which channel?</p>
//           <div className="space-y-3 mb-6">
//             <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
//               <input type="radio" name="channel" value="email" checked={selectedChannel === "email"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" />
//               <div><p className="font-semibold text-slate-800 text-sm">Email Only</p><p className="text-xs text-slate-400">Stop email communications</p></div>
//             </label>
//             <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
//               <input type="radio" name="channel" value="whatsapp" checked={selectedChannel === "whatsapp"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" />
//               <div><p className="font-semibold text-slate-800 text-sm">WhatsApp Only</p><p className="text-xs text-slate-400">Stop WhatsApp communications</p></div>
//             </label>
//             <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
//               <input type="radio" name="channel" value="both" checked={selectedChannel === "both"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" />
//               <div><p className="font-semibold text-slate-800 text-sm">Both Channels</p><p className="text-xs text-slate-400">Stop all communications</p></div>
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason <span className="text-slate-400 text-xs font-normal">(optional)</span></label>
//             <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
//               <option value="">All Reasons</option>
//               {reasonOptions.map((item) => (<option key={item} value={item}>{item}</option>))}
//             </select>
//             <p className="text-xs text-slate-400 mt-1">Select suppression reason</p>
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Source <span className="text-slate-400 text-xs font-normal">(optional)</span></label>
//             <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g., Admin, Support Ticket, Import, API" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
//             <p className="text-xs text-slate-400 mt-1">Where did this suppression request come from?</p>
//           </div>
//           <div className="flex gap-3">
//             <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
//             <button onClick={handleConfirm} className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700">Suppress</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── ADD SINGLE CONTACT MODAL (ENGAGEMENT SCORE REMOVED) ───────── */
// const SingleContactModal = ({ isOpen, onClose, onAdd, uniqueLists }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     countryCode: "91",
//     phone: "",
//     tags: "",
//     list: "",
//     is_whatsapp: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be exactly 10 digits";
//     }
//     if (!formData.list) newErrors.list = "Please select a list";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;
//     setIsSubmitting(true);
//     const fullPhone = `${formData.countryCode}${formData.phone}`;
//     await onAdd({ ...formData, phone: fullPhone });
//     setIsSubmitting(false);
//     onClose();
//     setFormData({ fullName: "", email: "", countryCode: "91", phone: "", tags: "", list: "", is_whatsapp: false });
//     setErrors({});
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">Add Single Contact</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
//         </div>
//         <div className="p-6 space-y-5">
//           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label><input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Doe" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.fullName ? "border-red-300" : "border-slate-200"}`} />{errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}</div>
//           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.email ? "border-red-300" : "border-slate-200"}`} />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}</div>
//           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label><div className="flex gap-2"><select value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"><option value="91">🇮🇳 +91</option><option value="1">🇺🇸 +1</option><option value="44">🇬🇧 +44</option><option value="61">🇦🇺 +61</option><option value="971">🇦🇪 +971</option><option value="65">🇸🇬 +65</option><option value="60">🇲🇾 +60</option></select><input type="tel" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); if (value.length <= 10) setFormData({ ...formData, phone: value, is_whatsapp: isWhatsAppEligible(value) }); }} placeholder="9876543210" maxLength={10} className={`flex-1 rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.phone ? "border-red-300" : "border-slate-200"}`} /></div>{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}</div>
//           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags (comma separated)</label><input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="vip, customer, lead" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" /></div>
//           {/* WhatsApp Toggle */}
//           {/* <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
//             <div>
//               <p className="text-sm font-semibold text-slate-700">WhatsApp Number?</p>
//               <p className="text-xs text-slate-400">This number is on WhatsApp</p>
//             </div>
//             <button
//               type="button"
//               onClick={() => setFormData({ ...formData, is_whatsapp: !formData.is_whatsapp })}
//               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.is_whatsapp ? "bg-green-500" : "bg-slate-200"
//                 }`}
//             >
//               <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.is_whatsapp ? "translate-x-6" : "translate-x-1"
//                 }`} />
//             </button>
//           </div> */}
//           <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">List <span className="text-red-500">*</span></label><select value={formData.list} onChange={(e) => setFormData({ ...formData, list: e.target.value })} className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.list ? "border-red-300" : "border-slate-200"}`}><option value="">Select a list</option>{uniqueLists.map((list) => (<option key={list.id} value={list.id}>{list.list_name}</option>))}</select>{errors.list && <p className="text-xs text-red-500 mt-1">{errors.list}</p>}</div>
//           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100"><button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button><button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50">{isSubmitting ? "Adding..." : "Add Contact"}</button></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── IMPORT WIZARD COMPONENTS (with sample CSV download) ─────────────────────── */
// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors"><XIcon /></button>
//         </div>
//         <div className="px-6 py-6">{children}</div>
//       </div>
//     </div>
//   );
// };

// // Helper to download sample CSV
// // Helper to download sample CSV (without Score column)
// const downloadSampleCSV = () => {
//   const headers = ['Full Name', 'Email', 'Phone', 'Tags', 'List', 'Status'];
//   const sampleRows = [
//     ['John Doe', 'john@example.com', '9876543210', 'vip,customer', 'Active Customers', 'active'],
//     ['Jane Smith', 'jane@example.com', '9876543211', 'lead', 'All Subscribers', 'active'],
//   ];
//   const csvContent = [headers, ...sampleRows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);
//   link.href = url;
//   link.setAttribute('download', 'sample_contacts.csv');
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// };

// const UploadStep = ({ onFileSelect, selectedFile, onParsed, showAlert }) => {
//   const [isParsing, setIsParsing] = useState(false);
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     onFileSelect(file);
//     setIsParsing(true);
//     const reader = new FileReader();
//    reader.onload = (ev) => {
//   Papa.parse(ev.target.result, {
//     header: true,
//     skipEmptyLines: true,

//     complete: (results) => {
//       const headers = results.meta.fields || [];

//       const preview = results.data.slice(0, 5);

//       onParsed({
//         headers,
//         preview,
//         fullData: results.data,
//       });

//       setIsParsing(false);
//     },

//     error: () => {
//       showAlert(
//         "Invalid CSV",
//         "Unable to parse CSV file",
//         "error"
//       );

//       setIsParsing(false);
//     },
//   });
// };
//     reader.readAsText(file);
//   };
//   return (
//     <div className="space-y-6">
//       <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors">
//         <div className="flex justify-center mb-3"><FileIcon /></div>
//         <p className="text-sm font-semibold text-slate-700 mb-1">Upload CSV File</p>
//         <p className="text-xs text-slate-400 mb-3">Supported format: .csv with headers</p>
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//           <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
//           <label htmlFor="csv-upload" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition">
//             <UploadIcon /> Choose File
//           </label>
//           <button
//             type="button"
//             onClick={downloadSampleCSV}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
//           >
//             <UploadIcon className="rotate-180" /> Download Sample CSV
//           </button>
//         </div>
//         {selectedFile && <p className="text-xs text-emerald-600 mt-3 flex items-center justify-center gap-1">✓ {selectedFile.name}</p>}
//       </div>
//       {isParsing && <div className="flex items-center justify-center gap-2 text-sm text-indigo-600"><div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>Parsing file...</div>}
//     </div>
//   );
// };

// const MappingStep = ({ headers, preview, onMappingComplete, showAlert }) => {
//   const [mapping, setMapping] = useState({});
//   const requiredFields = [
//     { key: "fullName", label: "Full Name", required: true, description: "Contact's full name" },
//     { key: "email", label: "Email", required: true, description: "Contact's email address" },
//     { key: "phone", label: "Phone", required: false, description: "Contact's phone number" },
//     { key: "status", label: "Status", required: false, description: "active/suppressed" },
//     { key: "tags", label: "Tags", required: false, description: "Comma-separated tags" },
//     { key: "list", label: "List", required: false, description: "List name" },
//   ];
//   const handleMap = (field, header) => setMapping((prev) => ({ ...prev, [field]: header }));
//   const handleContinue = () => {
//     const missing = requiredFields.filter((f) => f.required && !mapping[f.key]);
//     if (missing.length) {
//       showAlert("Missing Required Fields", `Please map required fields: ${missing.map((m) => m.label).join(", ")}`, "error");
//       return;
//     }
//     onMappingComplete(mapping);
//   };
//   if (!headers || headers.length === 0) {
//     return <div className="text-center py-8"><p className="text-red-500">No headers found.</p><button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Go Back</button></div>;
//   }
//   return (
//     <div className="space-y-6">
//       <div className="bg-blue-50 rounded-lg p-3 border border-blue-100"><p className="text-xs text-blue-700">📌 Map your CSV columns to contact fields. Required fields must be mapped.</p><p className="text-xs text-blue-600 mt-1">Found {headers.length} columns: {headers.join(", ")}</p></div>
//       <div className="space-y-3 max-h-96 overflow-y-auto">
//         {requiredFields.map((field) => (
//           <div key={field.key} className="flex items-center gap-4">
//             <div className="w-32"><span className="text-sm font-semibold text-slate-700">{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</span><p className="text-xs text-slate-400">{field.description}</p></div>
//             <select value={mapping[field.key] || ""} onChange={(e) => handleMap(field.key, e.target.value)} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
//               <option value="">-- Select column --</option>
//               {headers.map((h) => (<option key={h} value={h}>{h}</option>))}
//             </select>
//           </div>
//         ))}
//       </div>
//       {preview && preview.length > 0 && (
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Preview (first 5 rows)</label>
//           <div className="overflow-x-auto border rounded-lg max-h-64 overflow-y-auto">
//             <table className="w-full text-xs">
//               <thead className="bg-slate-50 sticky top-0">
//                 <tr>{headers.map((h) => (<th key={h} className="px-3 py-2 text-left font-semibold text-slate-600 border-b">{h}</th>))}</tr>
//               </thead>
//               <tbody>
//                 {preview.map((row, idx) => (
//                   <tr key={idx} className="border-t border-slate-100">
//                     {headers.map((h) => (<td key={h} className="px-3 py-2 text-slate-500">{row[h] || "—"}</td>))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-end pt-4"><button onClick={handleContinue} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Continue to Duplicate Rules</button></div>
//     </div>
//   );
// };

// const DuplicateStep = ({ onComplete, onBack, showAlert }) => {
//   const [duplicateRule, setDuplicateRule] = useState("update");
//   const [matchField, setMatchField] = useState("email");
//   const handleImport = async () => {
//     showAlert("Import Info", `Importing with rule: ${duplicateRule}, match on: ${matchField}`, "info");
//     onComplete();
//   };
//   return (
//     <div className="space-y-6">
//       <div className="bg-amber-50 rounded-lg p-3 border border-amber-100"><p className="text-xs text-amber-700">⚠️ Configure how to handle duplicate contacts during import.</p></div>
//       <div><label className="block text-sm font-semibold text-slate-700 mb-2">Match duplicates by</label><select value={matchField} onChange={(e) => setMatchField(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500"><option value="email">Email</option><option value="phone">Phone</option><option value="email_or_phone">Email or Phone</option></select></div>
//       <div><label className="block text-sm font-semibold text-slate-700 mb-2">If duplicate found</label><div className="space-y-2">
//         <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="duplicateRule" value="skip" checked={duplicateRule === "skip"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">Skip duplicate</p><p className="text-xs text-slate-400">Don't import contacts that already exist</p></div></label>
//         <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="duplicateRule" value="update" checked={duplicateRule === "update"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">Update existing</p><p className="text-xs text-slate-400">Overwrite existing contact data with new values</p></div></label>
//         <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="duplicateRule" value="create_new" checked={duplicateRule === "create_new"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">Create as new</p><p className="text-xs text-slate-400">Always create a new contact even if duplicate exists</p></div></label>
//       </div></div>
//       <div className="flex justify-between pt-4"><button onClick={onBack} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Back</button><button onClick={handleImport} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">Confirm Import</button></div>
//     </div>
//   );
// };

// const SuccessStep = ({ importedCount, onClose }) => (
//   <div className="text-center py-8 space-y-4">
//     <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto"><svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
//     <h4 className="text-xl font-bold text-slate-900">Import Complete!</h4><p className="text-slate-500">Successfully imported <span className="font-bold text-emerald-600">{importedCount}</span> contacts.</p>
//     <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Close</button>
//   </div>
// );

// /* ─── MAIN PAGE ──────────────────────────────────────────────────── */
// export default function ContactsPage() {
//   const navigate = useNavigate(); // ✅ for back navigation
//   const [contacts, setContacts] = useState([]);
//   const [lists, setLists] = useState([]);

//   const uniqueLists = useMemo(() => [
//     ...new Map(
//       lists.map((list) => [list.id, list])
//     ).values()
//   ], [lists]);

//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [listFilter, setListFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [channelFilter, setChannelFilter] = useState("all");
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState(new Set());
//   const LIMIT = 10;

//   const [selectedContact, setSelectedContact] = useState(null);
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//   const [isSingleContactModalOpen, setIsSingleContactModalOpen] = useState(false);
//   const [isImportModalOpen, setIsImportModalOpen] = useState(false);
//   const [importStep, setImportStep] = useState(1);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [parsedData, setParsedData] = useState({ headers: [], preview: [], fullData: [] });
//   const [columnMapping, setColumnMapping] = useState({});
//   const [importedCount, setImportedCount] = useState(0);
//   const [editingContact, setEditingContact] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [deletingContact, setDeletingContact] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [suppressingContact, setSuppressingContact] = useState(null);
//   const [isSuppressModalOpen, setIsSuppressModalOpen] = useState(false);
//   const [isAddToListModalOpen, setIsAddToListModalOpen] = useState(false);

//   const [alertModal, setAlertModal] = useState({ isOpen: false, title: "", message: "", type: "info" });
//   const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });
//   const [promptModal, setPromptModal] = useState({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null });

//   const showAlert = (title, message, type = "info") => setAlertModal({ isOpen: true, title, message, type });
//   const showConfirm = (title, message, onConfirm) => setConfirmModal({ isOpen: true, title, message, onConfirm });
//   const showPrompt = (title, message, defaultValue, onConfirm) => setPromptModal({ isOpen: true, title, message, defaultValue, onConfirm });

//   const fetchContacts = async () => {
//     try {
//       setLoading(true);
//       const data = await getContacts();
//       console.log("Backend response:", data);
//       const formatted = data.map((item, index) => ({
//         id: item.id,
//         fullName: item.name,
//         email: item.email,
//         phone: item.phone || "",
//         status: item.status,
//         tags: item.tags || [],
//         score: item.score || 50,
//         lists: item.lists || [],
//         is_whatsapp: item.is_whatsapp || false,
//         campaign: item.last_campaign || "—",
//         ci: index % AVATAR_COLORS.length,
//       }));
//       setContacts(formatted);
//     } catch (error) {
//       console.error(error);
//       showAlert("Error", "Failed to load contacts", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLists = async () => {
//     try {
//       const data = await getLists();
//       setLists(data);
//     } catch (error) {
//       showAlert("Error", "Failed to load lists", "error");
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//     fetchLists();
//   }, []);

//   useEffect(() => setPage(1), [search, listFilter, statusFilter, channelFilter]);

//   const handleEdit = (contact) => {
//     setEditingContact(contact);
//     setIsEditModalOpen(true);
//   };

//   const handleEditSave = async (updatedData) => {
//     try {
//       await updateContact(
//         editingContact.id,
//         {
//           full_name: updatedData.fullName,
//           email: updatedData.email,
//           phone: updatedData.phone,
//           status: "active",
//           tags: updatedData.tags,
//           campaign: editingcontact.last_campaign
//         }
//       );
//       await fetchContacts();
//       setIsEditModalOpen(false);
//       setEditingContact(null);
//       showAlert("Success", "Contact updated successfully", "success");
//     } catch (error) {
//       console.error(error);
//       showAlert("Error", error?.response?.data?.detail || "Failed to update contact", "error");
//     }
//   };

//   const handleDelete = (contact) => {
//     setDeletingContact(contact);
//     setIsDeleteModalOpen(true);
//   };
//   const handleDeleteSelected = async () => {
//     try {
//       for (const contactId of selected) {
//         await deleteContact(contactId);
//       }
//       await fetchContacts();
//       clearSel();
//       showAlert("Success", "Contacts deleted successfully", "success");
//     } catch (error) {
//       console.error(error);
//       showAlert("Error", "Failed to delete contacts", "error");
//     }
//   };

//   const handleDeleteConfirm = async (contact) => {
//     try {
//       await deleteContact(contact.id);
//       await fetchContacts();
//       showAlert("Success", `Contact "${contact.fullName}" deleted permanently!`, "success");
//     } catch (error) {
//       showAlert("Error", "Failed to delete contact.", "error");
//     } finally {
//       setIsDeleteModalOpen(false);
//       setDeletingContact(null);
//     }
//   };

//   const handleSuppress = (contact) => {
//     setSuppressingContact(contact);
//     setIsSuppressModalOpen(true);
//   };

//   const handleSuppressConfirm = async (contact, channel, reason, source) => {
//     try {
//       await suppressContact(contact.id, { reason: reason || "Manual Blacklist", channel: channel });
//       await fetchContacts();
//       showAlert("Success", "Contact suppressed successfully", "success");
//       setIsSuppressModalOpen(false);
//       setSuppressingContact(null);
//     } catch (error) {
//       showAlert("Error", "Failed to suppress contact", "error");
//     }
//   };

//   const handleAddSingleContact = () => setIsSingleContactModalOpen(true);

//   const handleSingleContactAdd = async (newContact) => {
//     try {
//       await createContact({
//         full_name: newContact.fullName,
//         email: newContact.email,
//         phone: newContact.phone,
//         status: "active",
//         list_id: parseInt(newContact.list),
//         tags: newContact.tags ? newContact.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
//         is_whatsapp: newContact.is_whatsapp,
//       });
//       await fetchContacts();
//       showAlert("Success", "Contact added successfully", "success");
//     } catch (error) {
//       console.error(error);
//       showAlert("Error", "Failed to add contact.", "error");
//     }
//   };

//   const handleOpenAddToList = () => {
//     if (selected.size === 0) {
//       showAlert("No selection", "Please select at least one contact.", "info");
//       return;
//     }
//     setIsAddToListModalOpen(true);
//   };

//   const handleAddToListConfirm = async (listId) => {
//     try {
//       for (const contactId of selected) {
//         try {
//           await addContactToList(contactId, listId);
//         } catch (err) {
//           if (err?.response?.status !== 400) throw err;
//         }
//       }
//       await fetchContacts();
//       const targetList = lists.find((list) => String(list.id) === String(listId));
//       showAlert("Success", `Added ${selected.size} contact(s) to "${targetList?.list_name}"`, "success");
//       clearSel();
//       setIsAddToListModalOpen(false);
//     } catch (error) {
//       console.error(error);
//       showAlert("Error", "Failed to add contacts to list", "error");
//     }
//   };

//   const handleApplyTag = () => {
//     if (!selected.size) {
//       showAlert("No selection", "Please select at least one contact.", "info");
//       return;
//     }
//     showPrompt("Apply Tag", "Enter tag name:", "", (tag) => {
//       if (tag && tag.trim()) {
//         setContacts((prev) =>
//           prev.map((c) => (selected.has(c.id) ? { ...c, tags: [...c.tags, tag.trim()] } : c))
//         );
//         showAlert("Success", `Tag "${tag.trim()}" applied to ${selected.size} contacts`, "success");
//         clearSel();
//       }
//     });
//   };

//   const handleImport = () => {
//     setImportStep(1);
//     setSelectedFile(null);
//     setParsedData({ headers: [], preview: [], fullData: [] });
//     setColumnMapping({});
//     setIsImportModalOpen(true);
//   };

//   const handleFileSelect = (file) => setSelectedFile(file);
//   const handleParsed = (data) => {
//     setParsedData(data);
//     setImportStep(2);
//   };
//   const handleMappingComplete = (mapping) => {
//     setColumnMapping(mapping);
//     setImportStep(3);
//   };
// const handleDuplicateComplete = async () => {
//   try {
//     let imported = 0;

//     for (const line of parsedData.fullData) {
//       const values = line.split(",").map((v) =>
//         v.replace(/"/g, "").trim()
//       );

//       await createContact({
//         full_name: values[0] || "",
//         email: values[1] || "",
//         phone: values[2] || "",
//         status: values[5] || "active",

//         tags: values[3]
//           ? values[3]
//               .split(",")
//               .map((t) => t.trim())
//               .filter(Boolean)
//           : [],

//         list_id: getListIdByName(values[4]), // list name -> id
//       });

//       imported++;
//     }

//     await fetchContacts();

//     setImportedCount(imported);
//     setImportStep(4);
//   } catch (err) {
//     console.error(err);
//     showAlert(
//       "Import Failed",
//       "Unable to import contacts",
//       "error"
//     );
//   }
// };
//   const handleImportClose = () => {
//     setIsImportModalOpen(false);
//     setImportStep(1);
//     setSelectedFile(null);
//     setParsedData({ headers: [], preview: [], fullData: [] });
//     setColumnMapping({});
//   };

//   const clearSel = () => setSelected(new Set());
//   const toggleRow = (id) =>
//     setSelected((prev) => {
//       const newSet = new Set(prev);
//       newSet.has(id) ? newSet.delete(id) : newSet.add(id);
//       return newSet;
//     });
//   const toggleAll = (e) =>
//     e.target.checked ? setSelected(new Set(paginated.map((c) => c.id))) : setSelected(new Set());

//   const handleExport = () => {
//     const headers = ["Full Name", "Email", "Phone", "Status", "Tags", "List(s)", "Campaign"];
//     const rows = filtered.map((c) => [
//       c.fullName,
//       c.email,
//       c.phone,
//       c.status,
//       c.tags.join(";"),
//       c.lists.map(l => l.name).join(", "),
//       c.campaign,
//     ]);
//     const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
//     a.download = `contacts_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     showAlert("Export", "Export started successfully", "success");
//   };

//   const filtered = useMemo(() => {
//     let result = contacts;
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter(
//         (c) =>
//           c.fullName.toLowerCase().includes(q) ||
//           c.email.toLowerCase().includes(q) ||
//           c.phone.includes(q) ||
//           c.tags.some((tag) => tag.toLowerCase().includes(q))
//       );
//     }
//     if (listFilter) {
//       result = result.filter(c => c.lists.some(list => list.name === listFilter));
//     }
//     if (statusFilter) result = result.filter((c) => c.status === statusFilter);
//     if (channelFilter === "whatsapp") result = result.filter((c) => c.is_whatsapp === true);
//     return result;
//   }, [contacts, search, listFilter, statusFilter, channelFilter]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / LIMIT));
//   const currentPage = Math.min(page, totalPages);
//   const paginated = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
//   const activeCount = contacts.filter((c) => c.status === "active").length;
//   const suppCount = contacts.filter((c) => c.status === "suppressed").length;
//   const allChecked = paginated.length > 0 && paginated.every((c) => selected.has(c.id));
//   const pageButtons = useMemo(() => {
//     const btns = [];
//     if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) btns.push(i);
//     else {
//       btns.push(1);
//       if (currentPage > 3) btns.push("...");
//       for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
//       if (currentPage < totalPages - 2) btns.push("...");
//       btns.push(totalPages);
//     }
//     return btns;
//   }, [currentPage, totalPages]);
//   const startItem = (currentPage - 1) * LIMIT + 1;
//   const endItem = Math.min(currentPage * LIMIT, filtered.length);
//   const openContactDetail = (contact) => {
//     setSelectedContact(contact);
//     setIsContactModalOpen(true);
//   };

//   if (loading) {
//     return (
//       <div className="p-10 text-center">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
//         <p className="mt-4 text-slate-500">Loading contacts...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       <AlertModal
//         isOpen={alertModal.isOpen}
//         title={alertModal.title}
//         message={alertModal.message}
//         type={alertModal.type}
//         onClose={() => setAlertModal({ isOpen: false, title: "", message: "", type: "info" })}
//       />
//       <ConfirmModal
//         isOpen={confirmModal.isOpen}
//         title={confirmModal.title}
//         message={confirmModal.message}
//         onConfirm={() => {
//           confirmModal.onConfirm?.();
//           setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null });
//         }}
//         onCancel={() => setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null })}
//       />
//       <PromptModal
//         isOpen={promptModal.isOpen}
//         title={promptModal.title}
//         message={promptModal.message}
//         defaultValue={promptModal.defaultValue}
//         onConfirm={(value) => {
//           promptModal.onConfirm?.(value);
//           setPromptModal({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null });
//         }}
//         onCancel={() => setPromptModal({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null })}
//       />

//       {/* HEADER with Back Arrow */}
//       <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
//             aria-label="Back to Dashboard"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2.5}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>
//           <div>
//             <h1 className="text-[26px] font-extrabold text-slate-900 leading-[1.2] tracking-[-0.02em]">All Contacts</h1>
//             <p className="text-sm text-slate-400 mt-1 font-medium">{contacts.length.toLocaleString()} total · {activeCount.toLocaleString()} active · {suppCount.toLocaleString()} suppressed</p>
//           </div>
//         </div>
//         <div className="flex gap-2.5">
//           <button onClick={handleAddSingleContact} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"><UserPlusIcon /> Add Contact</button>
//           <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"><UploadIcon /> Export</button>
//           <button onClick={handleImport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"><ImportIcon /> Import Contacts</button>
//         </div>
//       </div>

//       {/* BULK ACTION BAR */}
//       {selected.size > 0 && (
//         <div className="flex flex-wrap items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-4">
//           <span className="text-sm font-bold text-indigo-700">{selected.size} selected</span>
//           <button onClick={handleOpenAddToList} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Add to List</button>
//           <button onClick={handleApplyTag} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Apply Tag</button>
//           <button onClick={handleDeleteSelected} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Delete</button>
//           <button onClick={clearSel} className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-medium">Clear</button>
//         </div>
//       )}

//       {/* CARD */}
//       <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//         {/* FILTERS */}
//         <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
//           <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span><input type="text" placeholder="Search by name, email, phone or tag" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
//           <select value={listFilter} onChange={(e) => setListFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
//             <option value="">All Lists</option>
//             {uniqueLists.map((list) => (
//               <option key={list.id} value={list.list_name}>{list.list_name}</option>
//             ))}
//           </select>
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"><option value="">All Status</option><option value="active">Active</option><option value="suppressed">Suppressed</option></select>
//           <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"><option value="all">All Channels</option><option value="email">Email eligible</option><option value="whatsapp">WhatsApp eligible</option></select>
//           <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className="border-b border-slate-100 bg-slate-50">
//                 <th className="px-4 py-3 w-10"><input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-indigo-600" /></th>
//                 {["CONTACT", "LISTS", "STATUS", "TAGS", "LAST CAMPAIGN", ""].map((h) => (
//                   <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {paginated.length === 0 ? (
//                 <tr><td colSpan={7} className="text-center py-16 text-slate-400 text-sm font-medium">No contacts found. Try adjusting your search or filters.</td></tr>
//               ) : (
//                 paginated.map((c) => (
//                   <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
//                     <td className="px-4 py-3.5"><input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleRow(c.id)} className="accent-indigo-600" /></td>
//                     <td className="px-4 py-3.5"><div className="flex items-center gap-3 cursor-pointer" onClick={() => openContactDetail(c)}><Avatar name={c.fullName} ci={c.ci} /><div><p className="font-bold text-slate-800 text-sm leading-tight">{c.fullName}</p><p className="text-xs text-slate-400 font-medium mt-0.5">{c.email || c.phone || "—"}</p></div></div></td>
//                     <td className="px-4 py-3.5">
//                       <div className="flex flex-wrap gap-2">
//                         {c.lists?.length > 0 ? (
//                           c.lists.map((list) => (
//                             <ListBadge key={list.id} list={list.name} />
//                           ))
//                         ) : (
//                           <span className="text-slate-400 text-sm">—</span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
//                     <td className="px-4 py-3.5"><div className="flex gap-1.5 flex-wrap">{c.tags.slice(0, 2).map((t) => <TagChip key={t} label={t} />)}{c.tags.length > 2 && <TagChip label={`+${c.tags.length - 2}`} />}</div></td>
//                     <td className="px-4 py-3.5 text-sm text-slate-400 font-medium">{c.campaign || "—"}</td>
//                     <td className="px-3 py-3.5"><ContactActionsDropdown contact={c} onEdit={handleEdit} onDelete={handleDelete} onSuppress={handleSuppress} /></td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
//           <p className="text-sm text-slate-400 font-medium">Showing {filtered.length === 0 ? "0" : `${startItem}–${endItem}`} of {filtered.length.toLocaleString()} contacts</p>
//           <div className="flex items-center gap-1">
//             <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"><ChevLeft /></button>
//             {pageButtons.map((b, i) =>
//               b === "..." ? <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span> : <button key={b} onClick={() => setPage(b)} className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${currentPage === b ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>{b}</button>
//             )}
//             <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"><ChevRight /></button>
//           </div>
//         </div>
//       </div>

//       {/* MODALS */}
//       <ContactDetailModal contact={selectedContact} isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
//       <SingleContactModal
//         isOpen={isSingleContactModalOpen}
//         onClose={() => setIsSingleContactModalOpen(false)}
//         onAdd={handleSingleContactAdd}
//         uniqueLists={uniqueLists}
//       />
//       <Modal isOpen={isImportModalOpen} onClose={handleImportClose} title="Import Contacts">
//         {importStep === 1 && <UploadStep onFileSelect={handleFileSelect} selectedFile={selectedFile} onParsed={handleParsed} showAlert={showAlert} />}
//         {importStep === 2 && <MappingStep headers={parsedData.headers} preview={parsedData.preview} onMappingComplete={handleMappingComplete} showAlert={showAlert} />}
//         {importStep === 3 && <DuplicateStep onComplete={handleDuplicateComplete} onBack={() => setImportStep(2)} showAlert={showAlert} />}
//         {importStep === 4 && <SuccessStep importedCount={importedCount} onClose={handleImportClose} />}
//       </Modal>
//       <EditContactModal contact={editingContact} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleEditSave} lists={lists} uniqueLists={uniqueLists} />
//       <DeleteConfirmModal contact={deletingContact} isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />
//       <SuppressModal contact={suppressingContact} isOpen={isSuppressModalOpen} onClose={() => setIsSuppressModalOpen(false)} onConfirm={handleSuppressConfirm} />
//       <AddToListModal
//         isOpen={isAddToListModalOpen}
//         onClose={() => setIsAddToListModalOpen(false)}
//         onConfirm={handleAddToListConfirm}
//         uniqueLists={uniqueLists}
//         selectedCount={selected.size}
//       />
//     </div>
//   );
// }




import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  addContactToList,
} from "../services/contactApi";
import { getLists } from "../services/listApi";
import { suppressContact } from "../services/suppressionApi";
import Papa from "papaparse";

/* ─── AVATAR COLORS ─────────────────────────────────────────────── */
const AVATAR_COLORS = [
  ["#4f46e5", "#7c3aed"],
  ["#7c3aed", "#a855f7"],
  ["#f59e0b", "#d97706"],
  ["#ef4444", "#dc2626"],
  ["#0ea5e9", "#06b6d4"],
  ["#10b981", "#059669"],
];

/* ─── ICONS (unchanged) ───────────────────────────────────────── */
const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);
const UploadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ImportIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const UserPlusIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <path d="M19 10v4m-2-2h4" strokeLinecap="round" />
  </svg>
);
const ChevLeft = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevRight = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DotsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FileIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const TagIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const ListIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="7" cy="15" r="1" />
    <circle cx="12" cy="15" r="1" />
    <circle cx="17" cy="15" r="1" />
  </svg>
);
const CampaignIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 6L12 13 2 6M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
    <path d="M12 13l-10-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EditIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3l4 4L7 21H3v-4L17 3z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DeleteIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
  </svg>
);
const SuppressIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

/* ─── UTILS ──────────────────────────────────────────────────────── */
const cn = (...classes) => classes.filter(Boolean).join(" ");
const isWhatsAppEligible = (phone) => {
  const digits = phone.replace(/\D/g, "");
  const last10 = digits.slice(-10);
  return last10.length === 10 && /^[6-9]/.test(last10);
};

/* ─── CUSTOM MODAL POPUPS (unchanged) ──────────────────────────── */
const AlertModal = ({ isOpen, title, message, type = "info", onClose }) => {
  if (!isOpen) return null;
  const getIcon = () => {
    if (type === "success") return "✓";
    if (type === "error") return "✕";
    return "ℹ";
  };
  const getColor = () => {
    if (type === "success") return "text-emerald-600 bg-emerald-100";
    if (type === "error") return "text-red-600 bg-red-100";
    return "text-blue-600 bg-blue-100";
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className={`flex items-center justify-center mb-4 w-12 h-12 rounded-full mx-auto ${getColor()}`}>
            <span className="text-2xl font-bold">{getIcon()}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 text-center mb-2">{title}</h3>
          <p className="text-sm text-slate-500 text-center mb-6">{message}</p>
          <div className="flex justify-center">
            <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 text-center mb-2">{title}</h3>
          <p className="text-sm text-slate-500 text-center mb-6">{message}</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PromptModal = ({ isOpen, title, message, defaultValue, onConfirm, onCancel }) => {
  const [value, setValue] = useState(defaultValue || "");
  useEffect(() => {
    if (isOpen) setValue(defaultValue || "");
  }, [isOpen, defaultValue]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-500 mb-4">{message}</p>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 mb-6"
            autoFocus
          />
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={() => onConfirm(value)} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddToListModal = ({ isOpen, onClose, onConfirm, uniqueLists, selectedCount }) => {
  const [selectedListId, setSelectedListId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!isOpen) { setSelectedListId(""); setError(""); }
  }, [isOpen]);
  if (!isOpen) return null;
  const handleConfirm = () => {
    if (!selectedListId) { setError("Please select a list"); return; }
    onConfirm(selectedListId);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Add to List</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-500">
            Select a list to add <span className="font-semibold text-slate-700">{selectedCount} contact{selectedCount > 1 ? "s" : ""}</span> to:
          </p>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">List <span className="text-red-500">*</span></label>
            <select
              value={selectedListId}
              onChange={(e) => { setSelectedListId(e.target.value); setError(""); }}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${error ? "border-red-300" : "border-slate-200"}`}
            >
              <option value="">Select a list</option>
              {uniqueLists.map((list) => (
                <option key={list.id} value={list.id}>{list.list_name}</option>
              ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Add to List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── SUB-COMPONENTS (Avatar, StatusBadge, etc.) ───────────────── */
const Avatar = ({ name, ci }) => {
  const ini = (name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const [from, to] = AVATAR_COLORS[ci % AVATAR_COLORS.length];
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
      style={{ background: `linear-gradient(135deg,${from},${to})` }}
    >
      {ini}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const active = status === "active";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {active ? "Active" : "Suppressed"}
    </span>
  );
};

const TagChip = ({ label }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white">
    {label}
  </span>
);

const ListBadge = ({ list }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white whitespace-nowrap">
    {list}
  </span>
);

const EngBar = ({ score }) => {
  const cls =
    score >= 70
      ? { bar: "bg-emerald-500", text: "text-emerald-600" }
      : score >= 40
        ? { bar: "bg-indigo-500", text: "text-indigo-500" }
        : score > 0
          ? { bar: "bg-amber-400", text: "text-amber-500" }
          : { bar: "bg-slate-200", text: "text-slate-400" };
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
        <div className={`h-full rounded-full ${cls.bar}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-black ${cls.text}`}>{score}</span>
    </div>
  );
};

const ContactActionsDropdown = ({ contact, onEdit, onDelete, onSuppress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const handleOpen = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.bottom + window.scrollY, left: rect.right - 160 + window.scrollX });
    setIsOpen(true);
  };
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest(".contact-dropdown-menu")) setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);
  return (
    <div className="relative">
      <button onClick={handleOpen} className="text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg p-1.5 transition-colors">
        <DotsIcon />
      </button>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="contact-dropdown-menu fixed bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 w-40"
            style={{ top: position.top, left: position.left }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => { onEdit(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <EditIcon /> Edit
            </button>
            <button onClick={() => { onDelete(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
              <DeleteIcon /> Delete
            </button>
            <button onClick={() => { onSuppress(contact); setIsOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2">
              <SuppressIcon /> Suppress
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

/* ─── CONTACT DETAIL MODAL ──────────────────────────────────────── */
const ContactDetailModal = ({ contact, isOpen, onClose }) => {
  if (!isOpen || !contact) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
          <div className="flex items-center gap-4">
            <Avatar name={contact.fullName} ci={contact.ci} />
            <div>
              <h2 className="text-xl font-bold text-slate-900">{contact.fullName}</h2>
              <p className="text-sm text-slate-500">Contact since {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3"><MailIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.email || "—"}</p></div></div>
            <div className="flex items-start gap-3"><PhoneIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Phone</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.phone || "—"}</p></div></div>
            <div className="flex items-start gap-3"><TagIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Tags</p><div className="flex flex-wrap gap-1 mt-1">{contact.tags.length > 0 ? contact.tags.map((t) => <TagChip key={t} label={t} />) : <span className="text-sm text-slate-400">—</span>}</div></div></div>
            <div className="flex items-start gap-3"><ListIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Lists</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {contact.lists?.length > 0 ? (
                  contact.lists.map((list) => (
                    <ListBadge key={list.id} list={list.name} />
                  ))
                ) : (
                  <span className="text-sm text-slate-400">—</span>
                )}
              </div>
            </div></div>
            <div className="flex items-start gap-3"><CampaignIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Last Campaign</p><p className="text-sm text-slate-800 font-medium mt-0.5">{contact.last_campaign || "—"}</p></div></div>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <div className="flex justify-between items-center">
              <div><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</p><StatusBadge status={contact.status} /></div>
              <button onClick={() => window.open(`mailto:${contact.email}`, "_blank")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── EDIT CONTACT MODAL ────────────────────────────────────────── */
const EditContactModal = ({ contact, isOpen, onClose, onSave, lists, uniqueLists }) => {
  const [formData, setFormData] = useState({ fullName: "", email: "", countryCode: "91", phone: "", list: "", tags: "" });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (contact && uniqueLists.length > 0) {
      let rawPhone = contact.phone || "";
      let countryCode = "91";
      const knownCodes = ["971", "65", "60", "61", "44", "1", "91"];
      for (const code of knownCodes) {
        if (rawPhone.startsWith(code) && rawPhone.length > code.length) {
          countryCode = code;
          rawPhone = rawPhone.slice(code.length);
          break;
        }
      }
      setFormData({
        fullName: contact.fullName || "",
        email: contact.email || "",
        countryCode,
        phone: rawPhone,
        list: contact.lists?.[0]?.id ? String(contact.lists[0].id) : "",
        tags: contact.tags ? contact.tags.filter(t => t).join(", ") : "",
      });
    }
  }, [contact, uniqueLists]);
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (!validate()) return;
    const fullPhone = formData.phone ? `${formData.countryCode}${formData.phone}` : "";
    onSave({ ...formData, phone: fullPhone, tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [] });
    onClose();
  };
  if (!isOpen || !contact) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Edit Contact</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
            <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.fullName ? "border-red-300" : "border-slate-200"}`} />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.email ? "border-red-300" : "border-slate-200"}`} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
            <div className="flex gap-2">
              <select value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                <option value="91">🇮🇳 +91</option>
                <option value="1">🇺🇸 +1</option>
                <option value="44">🇬🇧 +44</option>
                <option value="61">🇦🇺 +61</option>
                <option value="971">🇦🇪 +971</option>
                <option value="65">🇸🇬 +65</option>
                <option value="60">🇲🇾 +60</option>
              </select>
              <input type="tel" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); if (value.length <= 10) setFormData({ ...formData, phone: value }); }} placeholder="9876543210" maxLength={10} className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">List</label>
            <select value={formData.list} onChange={(e) => setFormData({ ...formData, list: e.target.value })} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
              <option value="">Select a list</option>
              {uniqueLists.map((list) => (
                <option key={list.id} value={String(list.id)}>{list.list_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags (comma separated)</label>
            <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="vip, customer, lead" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ contact, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !contact) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-center mb-4"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><DeleteIcon className="w-6 h-6 text-red-600" /></div></div>
          <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Delete Contact</h3>
          <p className="text-sm text-slate-500 text-center mb-6">Are you sure you want to delete <span className="font-semibold text-slate-700">{contact.fullName}</span>?<br />This action cannot be undone.</p>
          <div className="flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button onClick={() => onConfirm(contact)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Delete</button></div>
        </div>
      </div>
    </div>
  );
};

const SuppressModal = ({ contact, isOpen, onClose, onConfirm }) => {
  const [selectedChannel, setSelectedChannel] = useState("email");
  const [reason, setReason] = useState("");
  const [source, setSource] = useState("");
  const reasonOptions = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
  useEffect(() => {
    if (!isOpen) { setReason(""); setSource(""); setSelectedChannel("email"); }
  }, [isOpen]);
  if (!isOpen || !contact) return null;
  const handleConfirm = () => { onConfirm(contact, selectedChannel, reason, source); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-center mb-4"><div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center"><SuppressIcon className="w-6 h-6 text-amber-600" /></div></div>
          <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Suppress Contact</h3>
          <p className="text-sm text-slate-500 text-center mb-6">Suppress <span className="font-semibold text-slate-700">{contact.fullName}</span> from which channel?</p>
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="channel" value="email" checked={selectedChannel === "email"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">Email Only</p><p className="text-xs text-slate-400">Stop email communications</p></div></label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="channel" value="whatsapp" checked={selectedChannel === "whatsapp"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">WhatsApp Only</p><p className="text-xs text-slate-400">Stop WhatsApp communications</p></div></label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"><input type="radio" name="channel" value="both" checked={selectedChannel === "both"} onChange={(e) => setSelectedChannel(e.target.value)} className="text-indigo-600" /><div><p className="font-semibold text-slate-800 text-sm">Both Channels</p><p className="text-xs text-slate-400">Stop all communications</p></div></label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason <span className="text-slate-400 text-xs font-normal">(optional)</span></label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
              <option value="">All Reasons</option>
              {reasonOptions.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Source <span className="text-slate-400 text-xs font-normal">(optional)</span></label>
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g., Admin, Support Ticket, Import, API" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleConfirm} className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700">Suppress</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── ADD SINGLE CONTACT MODAL ───────────────────────────────────── */
const SingleContactModal = ({ isOpen, onClose, onAdd, uniqueLists }) => {
  const [formData, setFormData] = useState({ fullName: "", email: "", countryCode: "91", phone: "", tags: "", list: "", is_whatsapp: false });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be exactly 10 digits";
    if (!formData.list) newErrors.list = "Please select a list";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    const fullPhone = `${formData.countryCode}${formData.phone}`;
    await onAdd({ ...formData, phone: fullPhone });
    setIsSubmitting(false);
    onClose();
    setFormData({ fullName: "", email: "", countryCode: "91", phone: "", tags: "", list: "", is_whatsapp: false });
    setErrors({});
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Add Single Contact</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
        </div>
        <div className="p-6 space-y-5">
          <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label><input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Doe" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.fullName ? "border-red-300" : "border-slate-200"}`} />{errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}</div>
          <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.email ? "border-red-300" : "border-slate-200"}`} />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}</div>
          <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label><div className="flex gap-2"><select value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"><option value="91">🇮🇳 +91</option><option value="1">🇺🇸 +1</option><option value="44">🇬🇧 +44</option><option value="61">🇦🇺 +61</option><option value="971">🇦🇪 +971</option><option value="65">🇸🇬 +65</option><option value="60">🇲🇾 +60</option></select><input type="tel" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); if (value.length <= 10) setFormData({ ...formData, phone: value, is_whatsapp: isWhatsAppEligible(value) }); }} placeholder="9876543210" maxLength={10} className={`flex-1 rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.phone ? "border-red-300" : "border-slate-200"}`} /></div>{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}</div>
          <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags (comma separated)</label><input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="vip, customer, lead" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" /></div>
          <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">List <span className="text-red-500">*</span></label><select value={formData.list} onChange={(e) => setFormData({ ...formData, list: e.target.value })} className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.list ? "border-red-300" : "border-slate-200"}`}><option value="">Select a list</option>{uniqueLists.map((list) => (<option key={list.id} value={list.id}>{list.list_name}</option>))}</select>{errors.list && <p className="text-xs text-red-500 mt-1">{errors.list}</p>}</div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100"><button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button><button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50">{isSubmitting ? "Adding..." : "Add Contact"}</button></div>
        </div>
      </div>
    </div>
  );
};

/* ─── IMPORT WIZARD COMPONENTS (with sample CSV download) ─────────────────────── */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors"><XIcon /></button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
};

const downloadSampleCSV = () => {
  const headers = ['Full Name', 'Email', 'Phone', 'Tags', 'List', 'Status'];
  const sampleRows = [
    ['John Doe', 'john@example.com', '9876543210', 'vip,customer', 'Active Customers', 'active'],
    ['Jane Smith', 'jane@example.com', '9876543211', 'lead', 'All Subscribers', 'active'],
  ];
  const csvContent = [headers, ...sampleRows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', 'sample_contacts.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const UploadStep = ({ onFileSelect, selectedFile, onParsed, showAlert }) => {
  const [isParsing, setIsParsing] = useState(false);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onFileSelect(file);
    setIsParsing(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      Papa.parse(ev.target.result, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const headers = results.meta.fields || [];
          const preview = results.data.slice(0, 5);
          onParsed({ headers, preview, fullData: results.data });
          setIsParsing(false);
        },
        error: () => {
          showAlert("Invalid CSV", "Unable to parse CSV file", "error");
          setIsParsing(false);
        },
      });
    };
    reader.readAsText(file);
  };
  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors">
        <div className="flex justify-center mb-3"><FileIcon /></div>
        <p className="text-sm font-semibold text-slate-700 mb-1">Upload CSV File</p>
        <p className="text-xs text-slate-400 mb-3">Supported format: .csv with headers</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
          <label htmlFor="csv-upload" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition">
            <UploadIcon /> Choose File
          </label>
          <button type="button" onClick={downloadSampleCSV} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition">
            <UploadIcon className="rotate-180" /> Download Sample CSV
          </button>
        </div>
        {selectedFile && <p className="text-xs text-emerald-600 mt-3 flex items-center justify-center gap-1">✓ {selectedFile.name}</p>}
      </div>
      {isParsing && <div className="flex items-center justify-center gap-2 text-sm text-indigo-600"><div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>Parsing file...</div>}
    </div>
  );
};

const MappingStep = ({ headers, preview, onMappingComplete, showAlert }) => {
  const [mapping, setMapping] = useState({});
  const requiredFields = [
    { key: "fullName", label: "Full Name", required: true, description: "Contact's full name" },
    { key: "email", label: "Email", required: true, description: "Contact's email address" },
    { key: "phone", label: "Phone", required: false, description: "Contact's phone number" },
    { key: "status", label: "Status", required: false, description: "active/suppressed" },
    { key: "tags", label: "Tags", required: false, description: "Comma-separated tags" },
    { key: "list", label: "List", required: false, description: "List name" },
  ];
  const handleMap = (field, header) => setMapping((prev) => ({ ...prev, [field]: header }));
  const handleContinue = () => {
    const missing = requiredFields.filter((f) => f.required && !mapping[f.key]);
    if (missing.length) {
      showAlert("Missing Required Fields", `Please map required fields: ${missing.map((m) => m.label).join(", ")}`, "error");
      return;
    }
    onMappingComplete(mapping);
  };
  if (!headers || headers.length === 0) {
    return <div className="text-center py-8"><p className="text-red-500">No headers found.</p><button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Go Back</button></div>;
  }
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100"><p className="text-xs text-blue-700">📌 Map your CSV columns to contact fields. Required fields must be mapped.</p><p className="text-xs text-blue-600 mt-1">Found {headers.length} columns: {headers.join(", ")}</p></div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {requiredFields.map((field) => (
          <div key={field.key} className="flex items-center gap-4">
            <div className="w-32"><span className="text-sm font-semibold text-slate-700">{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</span><p className="text-xs text-slate-400">{field.description}</p></div>
            <select value={mapping[field.key] || ""} onChange={(e) => handleMap(field.key, e.target.value)} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option value="">-- Select column --</option>
              {headers.map((h) => (<option key={h} value={h}>{h}</option>))}
            </select>
          </div>
        ))}
      </div>
      {preview && preview.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Preview (first 5 rows)</label>
          <div className="overflow-x-auto border rounded-lg max-h-64 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 sticky top-0">
                <tr>{headers.map((h) => (<th key={h} className="px-3 py-2 text-left font-semibold text-slate-600 border-b">{h}</th>))}</tr>
              </thead>
              <tbody>
                {preview.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-100">
                    {headers.map((h) => (<td key={h} className="px-3 py-2 text-slate-500">{row[h] || "—"}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="flex justify-end pt-4"><button onClick={handleContinue} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Continue to Duplicate Rules</button></div>
    </div>
  );
};

// DuplicateStep now receives a function `onImport` that does the actual import and returns the number of imported contacts.
// After import, it calls `onImportSuccess` (which closes modal and shows success alert).
const DuplicateStep = ({ onImport, onBack, showAlert, onImportSuccess }) => {
  const [duplicateRule, setDuplicateRule] = useState("update");
  const [matchField, setMatchField] = useState("email");
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const importedCount = await onImport(duplicateRule, matchField);
      onImportSuccess(importedCount);
    } catch (error) {
      showAlert("Import Failed", error.message || "Unable to import contacts", "error");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
        <p className="text-xs text-amber-700">⚠️ Configure how to handle duplicate contacts during import.</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Match duplicates by</label>
        <select value={matchField} onChange={(e) => setMatchField(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500">
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="email_or_phone">Email or Phone</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">If duplicate found</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input type="radio" name="duplicateRule" value="skip" checked={duplicateRule === "skip"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" />
            <div><p className="font-semibold text-slate-800 text-sm">Skip duplicate</p><p className="text-xs text-slate-400">Don't import contacts that already exist</p></div>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input type="radio" name="duplicateRule" value="update" checked={duplicateRule === "update"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" />
            <div><p className="font-semibold text-slate-800 text-sm">Update existing</p><p className="text-xs text-slate-400">Overwrite existing contact data with new values</p></div>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input type="radio" name="duplicateRule" value="create_new" checked={duplicateRule === "create_new"} onChange={(e) => setDuplicateRule(e.target.value)} className="text-indigo-600" />
            <div><p className="font-semibold text-slate-800 text-sm">Create as new</p><p className="text-xs text-slate-400">Always create a new contact even if duplicate exists</p></div>
          </label>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Back</button>
        <button onClick={handleImport} disabled={isImporting} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-50">
          {isImporting ? "Importing..." : "Confirm Import"}
        </button>
      </div>
    </div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────── */
export default function ContactsPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [lists, setLists] = useState([]);
  const uniqueLists = useMemo(() => [...new Map(lists.map((list) => [list.id, list])).values()], [lists]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [listFilter, setListFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const LIMIT = 10;

  const [selectedContact, setSelectedContact] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSingleContactModalOpen, setIsSingleContactModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importStep, setImportStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState({ headers: [], preview: [], fullData: [] });
  const [columnMapping, setColumnMapping] = useState({});
  const [editingContact, setEditingContact] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingContact, setDeletingContact] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [suppressingContact, setSuppressingContact] = useState(null);
  const [isSuppressModalOpen, setIsSuppressModalOpen] = useState(false);
  const [isAddToListModalOpen, setIsAddToListModalOpen] = useState(false);

  const [alertModal, setAlertModal] = useState({ isOpen: false, title: "", message: "", type: "info" });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });
  const [promptModal, setPromptModal] = useState({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null });

  const showAlert = (title, message, type = "info") => setAlertModal({ isOpen: true, title, message, type });
  const showConfirm = (title, message, onConfirm) => setConfirmModal({ isOpen: true, title, message, onConfirm });
  const showPrompt = (title, message, defaultValue, onConfirm) => setPromptModal({ isOpen: true, title, message, defaultValue, onConfirm });

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      const formatted = data.map((item, index) => ({
        id: item.id,
        fullName: item.name,
        email: item.email,
        phone: item.phone || "",
        status: item.status,
        tags: item.tags || [],
        score: item.score || 50,
        lists: item.lists || [],
        is_whatsapp: item.is_whatsapp || false,
        campaign: item.last_campaign || "—",
        ci: index % AVATAR_COLORS.length,
      }));
      setContacts(formatted);
    } catch (error) {
      showAlert("Error", "Failed to load contacts", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchLists = async () => {
    try {
      const data = await getLists();
      setLists(data);
    } catch (error) {
      showAlert("Error", "Failed to load lists", "error");
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchLists();
  }, []);

  useEffect(() => setPage(1), [search, listFilter, statusFilter, channelFilter]);

  // Helper to get list ID from list name
  const getListIdByName = (listName) => {
    if (!listName) return null;
    const found = lists.find(l => l.list_name.toLowerCase() === listName.toLowerCase());
    return found ? found.id : null;
  };

  // Actual import function (called from DuplicateStep)
  const performImport = async (duplicateRule, matchField) => {
    try {
      let imported = 0;
      const { fullData } = parsedData;
      const mapping = columnMapping;

      for (const row of fullData) {
        const fullName = mapping.fullName ? row[mapping.fullName] : "";
        const email = mapping.email ? row[mapping.email] : "";
        const phone = mapping.phone ? row[mapping.phone] : "";
        const status = mapping.status ? row[mapping.status] : "active";
        const tagsRaw = mapping.tags ? row[mapping.tags] : "";
        const listName = mapping.list ? row[mapping.list] : "";

        const tags = tagsRaw ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean) : [];
        const listId = getListIdByName(listName);

        await createContact({
          full_name: fullName,
          email: email,
          phone: phone || "",
          status: status === "suppressed" ? "suppressed" : "active",
          tags: tags,
          list_id: listId,
        });

        imported++;
      }

      await fetchContacts();
      return imported;
    } catch (err) {
      console.error(err);
      throw new Error("Unable to import contacts. Please check your data and try again.");
    }
  };

  const handleImportSuccess = (importedCount) => {
    setIsImportModalOpen(false);
    setImportStep(1);
    setSelectedFile(null);
    setParsedData({ headers: [], preview: [], fullData: [] });
    setColumnMapping({});
    showAlert("Import Successful", `Successfully imported ${importedCount} contact${importedCount !== 1 ? "s" : ""}.`, "success");
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async (updatedData) => {
    try {
      await updateContact(editingContact.id, {
        full_name: updatedData.fullName,
        email: updatedData.email,
        phone: updatedData.phone,
        status: "active",
        tags: updatedData.tags,
        campaign: editingcontact.last_campaign
      });
      await fetchContacts();
      setIsEditModalOpen(false);
      setEditingContact(null);
      showAlert("Success", "Contact updated successfully", "success");
    } catch (error) {
      showAlert("Error", error?.response?.data?.detail || "Failed to update contact", "error");
    }
  };

  const handleDelete = (contact) => {
    setDeletingContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = async () => {
    try {
      for (const contactId of selected) {
        await deleteContact(contactId);
      }
      await fetchContacts();
      clearSel();
      showAlert("Success", "Contacts deleted successfully", "success");
    } catch (error) {
      showAlert("Error", "Failed to delete contacts", "error");
    }
  };

  const handleDeleteConfirm = async (contact) => {
    try {
      await deleteContact(contact.id);
      await fetchContacts();
      showAlert("Success", `Contact "${contact.fullName}" deleted permanently!`, "success");
    } catch (error) {
      showAlert("Error", "Failed to delete contact.", "error");
    } finally {
      setIsDeleteModalOpen(false);
      setDeletingContact(null);
    }
  };

  const handleSuppress = (contact) => {
    setSuppressingContact(contact);
    setIsSuppressModalOpen(true);
  };

  const handleSuppressConfirm = async (contact, channel, reason) => {
    try {
      await suppressContact(contact.id, { reason: reason || "Manual Blacklist", channel });
      await fetchContacts();
      showAlert("Success", "Contact suppressed successfully", "success");
      setIsSuppressModalOpen(false);
      setSuppressingContact(null);
    } catch (error) {
      showAlert("Error", "Failed to suppress contact", "error");
    }
  };

  const handleAddSingleContact = () => setIsSingleContactModalOpen(true);

  const handleSingleContactAdd = async (newContact) => {
    try {
      await createContact({
        full_name: newContact.fullName,
        email: newContact.email,
        phone: newContact.phone,
        status: "active",
        list_id: parseInt(newContact.list),
        tags: newContact.tags ? newContact.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
        is_whatsapp: newContact.is_whatsapp,
      });
      await fetchContacts();
      showAlert("Success", "Contact added successfully", "success");
    } catch (error) {
      showAlert("Error", "Failed to add contact.", "error");
    }
  };

  const handleOpenAddToList = () => {
    if (selected.size === 0) {
      showAlert("No selection", "Please select at least one contact.", "info");
      return;
    }
    setIsAddToListModalOpen(true);
  };

  const handleAddToListConfirm = async (listId) => {
    try {
      for (const contactId of selected) {
        try {
          await addContactToList(contactId, listId);
        } catch (err) {
          if (err?.response?.status !== 400) throw err;
        }
      }
      await fetchContacts();
      const targetList = lists.find(list => String(list.id) === String(listId));
      showAlert("Success", `Added ${selected.size} contact(s) to "${targetList?.list_name}"`, "success");
      clearSel();
      setIsAddToListModalOpen(false);
    } catch (error) {
      showAlert("Error", "Failed to add contacts to list", "error");
    }
  };

  const handleApplyTag = () => {
    if (!selected.size) {
      showAlert("No selection", "Please select at least one contact.", "info");
      return;
    }
    showPrompt("Apply Tag", "Enter tag name:", "", (tag) => {
      if (tag && tag.trim()) {
        setContacts((prev) =>
          prev.map(c => (selected.has(c.id) ? { ...c, tags: [...c.tags, tag.trim()] } : c))
        );
        showAlert("Success", `Tag "${tag.trim()}" applied to ${selected.size} contacts`, "success");
        clearSel();
      }
    });
  };

  const handleImport = () => {
    setImportStep(1);
    setSelectedFile(null);
    setParsedData({ headers: [], preview: [], fullData: [] });
    setColumnMapping({});
    setIsImportModalOpen(true);
  };

  const handleFileSelect = (file) => setSelectedFile(file);
  const handleParsed = (data) => {
    setParsedData(data);
    setImportStep(2);
  };
  const handleMappingComplete = (mapping) => {
    setColumnMapping(mapping);
    setImportStep(3);
  };

  const handleImportClose = () => {
    setIsImportModalOpen(false);
    setImportStep(1);
    setSelectedFile(null);
    setParsedData({ headers: [], preview: [], fullData: [] });
    setColumnMapping({});
  };

  const clearSel = () => setSelected(new Set());
  const toggleRow = (id) => setSelected(prev => { const newSet = new Set(prev); newSet.has(id) ? newSet.delete(id) : newSet.add(id); return newSet; });
  const toggleAll = (e) => e.target.checked ? setSelected(new Set(paginated.map(c => c.id))) : setSelected(new Set());

  const handleExport = () => {
    const headers = ["Full Name", "Email", "Phone", "Status", "Tags", "List(s)", "Campaign"];
    const rows = filtered.map(c => [
      c.fullName, c.email, c.phone, c.status, c.tags.join(";"), c.lists.map(l => l.name).join(", "), c.campaign,
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `contacts_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showAlert("Export", "Export started successfully", "success");
  };

  const filtered = useMemo(() => {
    let result = contacts;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    if (listFilter) result = result.filter(c => c.lists.some(list => list.name === listFilter));
    if (statusFilter) result = result.filter(c => c.status === statusFilter);
    if (channelFilter === "whatsapp") result = result.filter(c => c.is_whatsapp === true);
    return result;
  }, [contacts, search, listFilter, statusFilter, channelFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIMIT));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
  const activeCount = contacts.filter(c => c.status === "active").length;
  const suppCount = contacts.filter(c => c.status === "suppressed").length;
  const allChecked = paginated.length > 0 && paginated.every(c => selected.has(c.id));
  const pageButtons = useMemo(() => {
    const btns = [];
    if (totalPages <= 7) for (let i = 1; i <= totalPages; i++) btns.push(i);
    else {
      btns.push(1);
      if (currentPage > 3) btns.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
      if (currentPage < totalPages - 2) btns.push("...");
      btns.push(totalPages);
    }
    return btns;
  }, [currentPage, totalPages]);
  const startItem = (currentPage - 1) * LIMIT + 1;
  const endItem = Math.min(currentPage * LIMIT, filtered.length);
  const openContactDetail = (contact) => {
    setSelectedContact(contact);
    setIsContactModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-slate-500">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <AlertModal isOpen={alertModal.isOpen} title={alertModal.title} message={alertModal.message} type={alertModal.type} onClose={() => setAlertModal({ isOpen: false, title: "", message: "", type: "info" })} />
      <ConfirmModal isOpen={confirmModal.isOpen} title={confirmModal.title} message={confirmModal.message} onConfirm={() => { confirmModal.onConfirm?.(); setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null }); }} onCancel={() => setConfirmModal({ isOpen: false, title: "", message: "", onConfirm: null })} />
      <PromptModal isOpen={promptModal.isOpen} title={promptModal.title} message={promptModal.message} defaultValue={promptModal.defaultValue} onConfirm={(value) => { promptModal.onConfirm?.(value); setPromptModal({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null }); }} onCancel={() => setPromptModal({ isOpen: false, title: "", message: "", defaultValue: "", onConfirm: null })} />

      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md" aria-label="Back to Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="text-[26px] font-extrabold text-slate-900 leading-[1.2] tracking-[-0.02em]">All Contacts</h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">{contacts.length.toLocaleString()} total · {activeCount.toLocaleString()} active · {suppCount.toLocaleString()} suppressed</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button onClick={handleAddSingleContact} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"><UserPlusIcon /> Add Contact</button>
          <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"><UploadIcon /> Export</button>
          <button onClick={handleImport} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"><ImportIcon /> Import Contacts</button>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-4">
          <span className="text-sm font-bold text-indigo-700">{selected.size} selected</span>
          <button onClick={handleOpenAddToList} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Add to List</button>
          <button onClick={handleApplyTag} className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Apply Tag</button>
          <button onClick={handleDeleteSelected} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Delete</button>
          <button onClick={clearSel} className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-medium">Clear</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span><input type="text" placeholder="Search by name, email, phone or tag" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
          <select value={listFilter} onChange={(e) => setListFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
            <option value="">All Lists</option>
            {uniqueLists.map(list => <option key={list.id} value={list.list_name}>{list.list_name}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"><option value="">All Status</option><option value="active">Active</option><option value="suppressed">Suppressed</option></select>
          <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)} className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"><option value="all">All Channels</option><option value="email">Email eligible</option><option value="whatsapp">WhatsApp eligible</option></select>
          <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 w-10"><input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-indigo-600" /></th>
                {["CONTACT", "LISTS", "STATUS", "TAGS", "LAST CAMPAIGN", ""].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-slate-400 text-sm font-medium">No contacts found. Try adjusting your search or filters.</td></tr>
              ) : (
                paginated.map(c => (
                  <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5"><input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleRow(c.id)} className="accent-indigo-600" /></td>
                    <td className="px-4 py-3.5"><div className="flex items-center gap-3 cursor-pointer" onClick={() => openContactDetail(c)}><Avatar name={c.fullName} ci={c.ci} /><div><p className="font-bold text-slate-800 text-sm leading-tight">{c.fullName}</p><p className="text-xs text-slate-400 font-medium mt-0.5">{c.email || c.phone || "—"}</p></div></div></td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-2">
                        {c.lists?.length > 0 ? c.lists.map(list => <ListBadge key={list.id} list={list.name} />) : <span className="text-slate-400 text-sm">—</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3.5"><div className="flex gap-1.5 flex-wrap">{c.tags.slice(0, 2).map(t => <TagChip key={t} label={t} />)}{c.tags.length > 2 && <TagChip label={`+${c.tags.length - 2}`} />}</div></td>
                    <td className="px-4 py-3.5 text-sm text-slate-400 font-medium">{c.campaign || "—"}</td>
                    <td className="px-3 py-3.5"><ContactActionsDropdown contact={c} onEdit={handleEdit} onDelete={handleDelete} onSuppress={handleSuppress} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-sm text-slate-400 font-medium">Showing {filtered.length === 0 ? "0" : `${startItem}–${endItem}`} of {filtered.length.toLocaleString()} contacts</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"><ChevLeft /></button>
            {pageButtons.map((b, i) => b === "..." ? <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span> : <button key={b} onClick={() => setPage(b)} className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${currentPage === b ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>{b}</button>)}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"><ChevRight /></button>
          </div>
        </div>
      </div>

      <ContactDetailModal contact={selectedContact} isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <SingleContactModal isOpen={isSingleContactModalOpen} onClose={() => setIsSingleContactModalOpen(false)} onAdd={handleSingleContactAdd} uniqueLists={uniqueLists} />
      <Modal isOpen={isImportModalOpen} onClose={handleImportClose} title="Import Contacts">
        {importStep === 1 && <UploadStep onFileSelect={handleFileSelect} selectedFile={selectedFile} onParsed={handleParsed} showAlert={showAlert} />}
        {importStep === 2 && <MappingStep headers={parsedData.headers} preview={parsedData.preview} onMappingComplete={handleMappingComplete} showAlert={showAlert} />}
        {importStep === 3 && <DuplicateStep 
          onImport={performImport} 
          onBack={() => setImportStep(2)} 
          showAlert={showAlert} 
          onImportSuccess={handleImportSuccess} 
        />}
      </Modal>
      <EditContactModal contact={editingContact} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleEditSave} lists={lists} uniqueLists={uniqueLists} />
      <DeleteConfirmModal contact={deletingContact} isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />
      <SuppressModal contact={suppressingContact} isOpen={isSuppressModalOpen} onClose={() => setIsSuppressModalOpen(false)} onConfirm={handleSuppressConfirm} />
      <AddToListModal isOpen={isAddToListModalOpen} onClose={() => setIsAddToListModalOpen(false)} onConfirm={handleAddToListConfirm} uniqueLists={uniqueLists} selectedCount={selected.size} />
    </div>
  );
}
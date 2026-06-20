



// // // // SuppressionPage.jsx – Fully backend‑driven with API integration
// // // import React, { useState, useEffect, useMemo } from "react";
// // // import {
// // //   getSuppressions,
// // //   restoreSuppression,
// // // } from "../services/suppressionApi";

// // // /* ================= UTILS ================= */
// // // const cn = (...classes) => classes.filter(Boolean).join(" ");
// // // const formatDate = (dateStr) => {
// // //   if (!dateStr) return "—";
// // //   const d = new Date(dateStr);
// // //   return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// // // };
// // // const formatTime = (dateStr) => {
// // //   if (!dateStr) return "—";
// // //   const d = new Date(dateStr);
// // //   return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
// // // };

// // // /* ================= ICONS ================= */
// // // const DownloadIcon = () => (
// // //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
// // //   </svg>
// // // );
// // // const PlusIcon = () => (
// // //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
// // //   </svg>
// // // );
// // // const XIcon = () => (
// // //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
// // //   </svg>
// // // );
// // // const SearchIcon = () => (
// // //   <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
// // //   </svg>
// // // );
// // // const MailIcon = () => (
// // //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <rect x="2" y="4" width="20" height="16" rx="2" />
// // //     <path d="m22 7-10 7L2 7" />
// // //   </svg>
// // // );
// // // const PhoneIcon = () => (
// // //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
// // //   </svg>
// // // );
// // // const InfoIcon = () => (
// // //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <circle cx="12" cy="12" r="10" />
// // //     <line x1="12" y1="16" x2="12" y2="12" />
// // //     <line x1="12" y1="8" x2="12.01" y2="8" />
// // //   </svg>
// // // );
// // // const CalendarIcon = () => (
// // //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
// // //     <line x1="16" y1="2" x2="16" y2="6" />
// // //     <line x1="8" y1="2" x2="8" y2="6" />
// // //     <line x1="3" y1="10" x2="21" y2="10" />
// // //   </svg>
// // // );
// // // const SourceIcon = () => (
// // //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <path d="M4 4v16h16" />
// // //     <path d="m4 20 8-8 4 4 8-8" />
// // //   </svg>
// // // );

// // // /* ================= UI COMPONENTS ================= */
// // // const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = "md" }) => {
// // //   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
// // //   const variants = {
// // //     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
// // //     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
// // //     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
// // //     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
// // //   };
// // //   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
// // //   return (
// // //     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
// // //       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
// // //       {leftIcon && !loading && leftIcon}
// // //       {children}
// // //     </button>
// // //   );
// // // };

// // // const Badge = ({ children, variant }) => {
// // //   const variantsMap = {
// // //     Email: "bg-indigo-50 text-indigo-700",
// // //     WhatsApp: "bg-emerald-50 text-emerald-700",
// // //     "Hard Bounce": "bg-red-100 text-red-700",
// // //     Unsubscribed: "bg-orange-100 text-orange-700",
// // //     "Opted Out": "bg-amber-100 text-amber-700",
// // //     "Spam Complaint": "bg-rose-100 text-rose-700",
// // //     "Manual Blacklist": "bg-slate-100 text-slate-700",
// // //   };
// // //   const className = variantsMap[variant] || "bg-slate-100 text-slate-700";
// // //   return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
// // // };

// // // const SearchInput = ({ placeholder, onSearch, className }) => {
// // //   const [value, setValue] = useState("");
// // //   useEffect(() => {
// // //     const timer = setTimeout(() => onSearch(value), 300);
// // //     return () => clearTimeout(timer);
// // //   }, [value, onSearch]);
// // //   return (
// // //     <div className="relative">
// // //       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
// // //       <input
// // //         type="text"
// // //         placeholder={placeholder}
// // //         value={value}
// // //         onChange={(e) => setValue(e.target.value)}
// // //         className={cn("pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
// // //   if (totalPages <= 1) return null;
// // //   return (
// // //     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
// // //       <p className="text-sm text-slate-500 font-medium">
// // //         Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems.toLocaleString()} suppressed contacts
// // //       </p>
// // //       <div className="flex gap-1">
// // //         <button
// // //           onClick={() => onPageChange(page - 1)}
// // //           disabled={page === 1}
// // //           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
// // //         >
// // //           ← Prev
// // //         </button>
// // //         <span className="px-3 py-1 text-sm text-slate-600 font-medium">{page} / {totalPages}</span>
// // //         <button
// // //           onClick={() => onPageChange(page + 1)}
// // //           disabled={page === totalPages}
// // //           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
// // //         >
// // //           Next →
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const Modal = ({ isOpen, onClose, title, children }) => {
// // //   if (!isOpen) return null;
// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
// // //       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
// // //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
// // //           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
// // //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
// // //             <XIcon />
// // //           </button>
// // //         </div>
// // //         <div className="px-6 py-4">{children}</div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ── Suppression Detail Modal (unchanged) ──
// // // const SuppressionDetailModal = ({ entry, isOpen, onClose }) => {
// // //   if (!isOpen || !entry) return null;
// // //   const isEmail = entry.channel === "Email";
// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// // //       <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// // //         <div className="relative bg-gradient-to-r from-red-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
// // //           <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
// // //           <div>
// // //             <h2 className="text-xl font-bold text-slate-900">Suppressed Contact</h2>
// // //             <p className="text-sm text-slate-500 mt-1">Blocked from all campaigns</p>
// // //           </div>
// // //         </div>
// // //         <div className="p-6 space-y-5">
// // //           <div className="grid grid-cols-1 gap-4">
// // //             <div className="flex items-start gap-3">
// // //               {isEmail ? <MailIcon /> : <PhoneIcon />}
// // //               <div>
// // //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact</p>
// // //                 <p className="text-sm font-medium text-slate-800">{entry.contact}</p>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-start gap-3">
// // //               <InfoIcon />
// // //               <div>
// // //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Channel</p>
// // //                 <Badge variant={entry.channel}>{entry.channel}</Badge>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-start gap-3">
// // //               <InfoIcon />
// // //               <div>
// // //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Reason</p>
// // //                 <Badge variant={entry.reason}>{entry.reason}</Badge>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-start gap-3">
// // //               <SourceIcon />
// // //               <div>
// // //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Source</p>
// // //                 <p className="text-sm text-slate-700">{entry.source || "—"}</p>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-start gap-3">
// // //               <CalendarIcon />
// // //               <div>
// // //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Since</p>
// // //                 <p className="text-sm text-slate-700">{formatDate(entry.since)} at {formatTime(entry.since)}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* ================= MAIN PAGE ================= */
// // // export default function SuppressionPage() {
// // //   const [suppressions, setSuppressions] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState("");
// // //   const [reasonFilter, setReasonFilter] = useState("");
// // //   const [channelFilter, setChannelFilter] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const pageSize = 10;

// // //   // Detail modal state
// // //   const [selectedEntry, setSelectedEntry] = useState(null);
// // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

// // //   // ── Fetch suppressions from API ──
// // //   const fetchSuppressions = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const data = await getSuppressions();
// // //       // Assume API returns array of objects: { id, contact, channel, reason, source, since }
// // //       setSuppressions(data);
// // //     } catch (error) {
// // //       console.error("FETCH SUPPRESSIONS ERROR:", error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchSuppressions();
// // //   }, []);

// // //   // Reset page when filters change
// // //   useEffect(() => setCurrentPage(1), [search, reasonFilter, channelFilter]);

// // //   // Filtered data
// // //   const filtered = useMemo(() => {
// // //     let result = suppressions;
// // //     if (search) {
// // //       const q = search.toLowerCase();
// // //       result = result.filter(s => s.contact.toLowerCase().includes(q));
// // //     }
// // //     if (reasonFilter) result = result.filter(s => s.reason === reasonFilter);
// // //     if (channelFilter) result = result.filter(s => s.channel === channelFilter);
// // //     return result;
// // //   }, [suppressions, search, reasonFilter, channelFilter]);

// // //   const totalPages = Math.ceil(filtered.length / pageSize);
// // //   const paginated = useMemo(() => {
// // //     const start = (currentPage - 1) * pageSize;
// // //     return filtered.slice(start, start + pageSize);
// // //   }, [filtered, currentPage]);

// // //   // ── Restore (Remove) handler ──
// // //   const handleRemove = async (id, e) => {
// // //     e.stopPropagation();
// // //     try {
// // //       await restoreSuppression(id);
// // //       await fetchSuppressions(); // refresh list
// // //     } catch (error) {
// // //       console.error("RESTORE ERROR:", error);
// // //     }
// // //   };

// // //   // ── Row click for detail modal ──
// // //   const handleRowClick = (entry) => {
// // //     setSelectedEntry(entry);
// // //     setIsDetailModalOpen(true);
// // //   };

// // //   // ── Export to CSV ──
// // //   const handleExport = () => {
// // //     if (filtered.length === 0) {
// // //       alert("No data to export");
// // //       return;
// // //     }
// // //     const headers = ["Contact", "Channel", "Reason", "Source", "Since"];
// // //     const rows = filtered.map(s => [
// // //       s.contact,
// // //       s.channel,
// // //       s.reason,
// // //       s.source,
// // //       formatDate(s.since),
// // //     ]);
// // //     const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
// // //     const blob = new Blob([csv], { type: "text/csv" });
// // //     const url = URL.createObjectURL(blob);
// // //     const a = document.createElement("a");
// // //     a.href = url;
// // //     a.download = `suppression_list_${new Date().toISOString().slice(0, 10)}.csv`;
// // //     a.click();
// // //     URL.revokeObjectURL(url);
// // //   };

// // //   // ── Add manually (now only an alert) ──
// // //   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
// // //   const reasonOptions = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
// // //   const channelOptions = ["Email", "WhatsApp"];

// // //   const handleAddManual = () => {
// // //     alert("Use the Contacts page to suppress contacts.");
// // //     setIsAddModalOpen(false);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="p-10 text-center">
// // //         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
// // //         <p className="mt-4 text-slate-500">Loading suppressions...</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
// // //       {/* HEADER */}
// // //       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
// // //         <div>
// // //           <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.01em]">
// // //             Suppression List
// // //           </h1>
// // //           <p className="text-sm text-slate-500 mt-1 font-medium">
// // //             {suppressions.length.toLocaleString()} contacts blocked from all campaigns
// // //           </p>
// // //         </div>
// // //         <div className="flex flex-wrap gap-2">
// // //           <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
// // //             Export
// // //           </Button>
// // //           <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => setIsAddModalOpen(true)}>
// // //             Add Manually
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       {/* MAIN CARD */}
// // //       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
// // //         {/* FILTERS */}
// // //         <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 p-4 border-b border-slate-100">
// // //           <SearchInput
// // //             placeholder="Search by email or phone..."
// // //             onSearch={setSearch}
// // //             className="w-full sm:w-64"
// // //           />
// // //           <select
// // //             value={reasonFilter}
// // //             onChange={(e) => setReasonFilter(e.target.value)}
// // //             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
// // //           >
// // //             <option value="">All Reasons</option>
// // //             {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
// // //           </select>
// // //           <select
// // //             value={channelFilter}
// // //             onChange={(e) => setChannelFilter(e.target.value)}
// // //             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
// // //           >
// // //             <option value="">All Channels</option>
// // //             {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
// // //           </select>
// // //         </div>

// // //         {/* TABLE */}
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-sm min-w-[600px]">
// // //             <thead>
// // //               <tr className="border-b border-slate-100 bg-slate-50">
// // //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CONTACT</th>
// // //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CHANNEL</th>
// // //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">REASON</th>
// // //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">SOURCE</th>
// // //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">SINCE</th>
// // //                 <th className="px-4 py-3 text-left"></th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-slate-100">
// // //               {paginated.map(s => (
// // //                 <tr
// // //                   key={s.id}
// // //                   className="hover:bg-slate-50 transition-colors cursor-pointer"
// // //                   onClick={() => handleRowClick(s)}
// // //                 >
// // //                   <td className="px-4 py-3 font-medium text-sm text-slate-800 whitespace-nowrap">{s.contact}</td>
// // //                   <td className="px-4 py-3"><Badge variant={s.channel}>{s.channel}</Badge></td>
// // //                   <td className="px-4 py-3"><Badge variant={s.reason}>{s.reason}</Badge></td>
// // //                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.source}</td>
// // //                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{formatDate(s.since)}</td>
// // //                   <td className="px-4 py-3">
// // //                     <Button
// // //                       variant="ghost"
// // //                       size="sm"
// // //                       onClick={(e) => handleRemove(s.id, e)}
// // //                       className="text-red-500 hover:text-red-700"
// // //                     >
// // //                       Remove
// // //                     </Button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //               {paginated.length === 0 && (
// // //                 <tr>
// // //                   <td colSpan="6" className="text-center py-12 text-slate-500">
// // //                     No suppressed contacts found.
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* PAGINATION */}
// // //         <Pagination
// // //           page={currentPage}
// // //           totalPages={totalPages}
// // //           totalItems={filtered.length}
// // //           limit={pageSize}
// // //           onPageChange={setCurrentPage}
// // //         />
// // //       </div>

// // //       {/* ADD MANUALLY MODAL (now only informative) */}
// // //       <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add to Suppression List">
// // //         <div className="space-y-4">
// // //           <p className="text-sm text-slate-600">
// // //             To suppress a contact, please go to the <strong>Contacts</strong> page,
// // //             find the contact and use the <strong>Suppress</strong> action from the dropdown.
// // //           </p>
// // //           <div className="flex justify-end">
// // //             <Button variant="primary" onClick={handleAddManual}>Got it</Button>
// // //           </div>
// // //         </div>
// // //       </Modal>

// // //       {/* DETAIL MODAL */}
// // //       <SuppressionDetailModal
// // //         entry={selectedEntry}
// // //         isOpen={isDetailModalOpen}
// // //         onClose={() => setIsDetailModalOpen(false)}
// // //       />
// // //     </div>
// // //   );
// // // }




// // // SuppressionPage.jsx – Fully backend‑driven with API integration
// // import React, { useState, useEffect, useMemo } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   getSuppressions,
// //   restoreSuppression,
// // } from "../services/suppressionApi";

// // /* ================= UTILS ================= */
// // const cn = (...classes) => classes.filter(Boolean).join(" ");
// // const formatDate = (dateStr) => {
// //   if (!dateStr) return "—";
// //   const d = new Date(dateStr);
// //   return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// // };
// // const formatTime = (dateStr) => {
// //   if (!dateStr) return "—";
// //   const d = new Date(dateStr);
// //   return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
// // };

// // /* ================= ICONS ================= */
// // const DownloadIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const PlusIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
// //   </svg>
// // );
// // const XIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
// //   </svg>
// // );
// // const SearchIcon = () => (
// //   <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
// //   </svg>
// // );
// // const MailIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="2" y="4" width="20" height="16" rx="2" />
// //     <path d="m22 7-10 7L2 7" />
// //   </svg>
// // );
// // const PhoneIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
// //   </svg>
// // );
// // const InfoIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <circle cx="12" cy="12" r="10" />
// //     <line x1="12" y1="16" x2="12" y2="12" />
// //     <line x1="12" y1="8" x2="12.01" y2="8" />
// //   </svg>
// // );
// // const CalendarIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
// //     <line x1="16" y1="2" x2="16" y2="6" />
// //     <line x1="8" y1="2" x2="8" y2="6" />
// //     <line x1="3" y1="10" x2="21" y2="10" />
// //   </svg>
// // );
// // const SourceIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M4 4v16h16" />
// //     <path d="m4 20 8-8 4 4 8-8" />
// //   </svg>
// // );

// // /* ================= UI COMPONENTS ================= */
// // const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = "md" }) => {
// //   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
// //   const variants = {
// //     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
// //     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
// //     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
// //     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
// //   };
// //   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
// //   return (
// //     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
// //       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
// //       {leftIcon && !loading && leftIcon}
// //       {children}
// //     </button>
// //   );
// // };

// // const Badge = ({ children, variant }) => {
// //   const variantsMap = {
// //     Email: "bg-indigo-50 text-indigo-700",
// //     WhatsApp: "bg-emerald-50 text-emerald-700",
// //     "Hard Bounce": "bg-red-100 text-red-700",
// //     Unsubscribed: "bg-orange-100 text-orange-700",
// //     "Opted Out": "bg-amber-100 text-amber-700",
// //     "Spam Complaint": "bg-rose-100 text-rose-700",
// //     "Manual Blacklist": "bg-slate-100 text-slate-700",
// //   };
// //   const className = variantsMap[variant] || "bg-slate-100 text-slate-700";
// //   return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
// // };

// // const SearchInput = ({ placeholder, onSearch, className }) => {
// //   const [value, setValue] = useState("");
// //   useEffect(() => {
// //     const timer = setTimeout(() => onSearch(value), 300);
// //     return () => clearTimeout(timer);
// //   }, [value, onSearch]);
// //   return (
// //     <div className="relative">
// //       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
// //       <input
// //         type="text"
// //         placeholder={placeholder}
// //         value={value}
// //         onChange={(e) => setValue(e.target.value)}
// //         className={cn("pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
// //       />
// //     </div>
// //   );
// // };

// // const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
// //   if (totalPages <= 1) return null;
// //   return (
// //     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
// //       <p className="text-sm text-slate-500 font-medium">
// //         Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems.toLocaleString()} suppressed contacts
// //       </p>
// //       <div className="flex gap-1">
// //         <button
// //           onClick={() => onPageChange(page - 1)}
// //           disabled={page === 1}
// //           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
// //         >
// //           ← Prev
// //         </button>
// //         <span className="px-3 py-1 text-sm text-slate-600 font-medium">{page} / {totalPages}</span>
// //         <button
// //           onClick={() => onPageChange(page + 1)}
// //           disabled={page === totalPages}
// //           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
// //         >
// //           Next →
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // // ── Suppression Detail Modal (unchanged) ──
// // const SuppressionDetailModal = ({ entry, isOpen, onClose }) => {
// //   if (!isOpen || !entry) return null;
// //   const isEmail = entry.channel === "Email";
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="relative bg-gradient-to-r from-red-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
// //           <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
// //           <div>
// //             <h2 className="text-xl font-bold text-slate-900">Suppressed Contact</h2>
// //             <p className="text-sm text-slate-500 mt-1">Blocked from all campaigns</p>
// //           </div>
// //         </div>
// //         <div className="p-6 space-y-5">
// //           <div className="grid grid-cols-1 gap-4">
// //             <div className="flex items-start gap-3">
// //               {isEmail ? <MailIcon /> : <PhoneIcon />}
// //               <div>
// //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact</p>
// //                 <p className="text-sm font-medium text-slate-800">{entry.contact}</p>
// //               </div>
// //             </div>
// //             <div className="flex items-start gap-3">
// //               <InfoIcon />
// //               <div>
// //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Channel</p>
// //                 <Badge variant={entry.channel}>{entry.channel}</Badge>
// //               </div>
// //             </div>
// //             <div className="flex items-start gap-3">
// //               <InfoIcon />
// //               <div>
// //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Reason</p>
// //                 <Badge variant={entry.reason}>{entry.reason}</Badge>
// //               </div>
// //             </div>
// //             <div className="flex items-start gap-3">
// //               <SourceIcon />
// //               <div>
// //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Source</p>
// //                 <p className="text-sm text-slate-700">{entry.source || "—"}</p>
// //               </div>
// //             </div>
// //             <div className="flex items-start gap-3">
// //               <CalendarIcon />
// //               <div>
// //                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Since</p>
// //                 <p className="text-sm text-slate-700">{formatDate(entry.since)} at {formatTime(entry.since)}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ================= MAIN PAGE ================= */
// // export default function SuppressionPage() {
// //   const navigate = useNavigate();
// //   const [suppressions, setSuppressions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [reasonFilter, setReasonFilter] = useState("");
// //   const [channelFilter, setChannelFilter] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const pageSize = 10;

// //   // Detail modal state
// //   const [selectedEntry, setSelectedEntry] = useState(null);
// //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

// //   // ── Fetch suppressions from API ──
// //   const fetchSuppressions = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getSuppressions();
// //       setSuppressions(data);
// //     } catch (error) {
// //       console.error("FETCH SUPPRESSIONS ERROR:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSuppressions();
// //   }, []);

// //   // Reset page when filters change
// //   useEffect(() => setCurrentPage(1), [search, reasonFilter, channelFilter]);

// //   // Filtered data
// //   const filtered = useMemo(() => {
// //     let result = suppressions;
// //     if (search) {
// //       const q = search.toLowerCase();
// //       result = result.filter(s => s.contact.toLowerCase().includes(q));
// //     }
// //     if (reasonFilter) result = result.filter(s => s.reason === reasonFilter);
// //     if (channelFilter) result = result.filter(s => s.channel === channelFilter);
// //     return result;
// //   }, [suppressions, search, reasonFilter, channelFilter]);

// //   const totalPages = Math.ceil(filtered.length / pageSize);
// //   const paginated = useMemo(() => {
// //     const start = (currentPage - 1) * pageSize;
// //     return filtered.slice(start, start + pageSize);
// //   }, [filtered, currentPage]);

// //   // ── Restore (Remove) handler ──
// //   const handleRemove = async (id, e) => {
// //     e.stopPropagation();
// //     try {
// //       await restoreSuppression(id);
// //       await fetchSuppressions();
// //     } catch (error) {
// //       console.error("RESTORE ERROR:", error);
// //     }
// //   };

// //   // ── Row click for detail modal ──
// //   const handleRowClick = (entry) => {
// //     setSelectedEntry(entry);
// //     setIsDetailModalOpen(true);
// //   };

// //   // ── Export to CSV ──
// //   const handleExport = () => {
// //     if (filtered.length === 0) {
// //       alert("No data to export");
// //       return;
// //     }
// //     const headers = ["Contact", "Channel", "Reason", "Source", "Since"];
// //     const rows = filtered.map(s => [
// //       s.contact,
// //       s.channel,
// //       s.reason,
// //       s.source,
// //       formatDate(s.since),
// //     ]);
// //     const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
// //     const blob = new Blob([csv], { type: "text/csv" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = `suppression_list_${new Date().toISOString().slice(0, 10)}.csv`;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   const reasonOptions = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
// //   const channelOptions = ["Email", "WhatsApp"];

// //   if (loading) {
// //     return (
// //       <div className="p-10 text-center">
// //         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
// //         <p className="mt-4 text-slate-500">Loading suppressions...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
// //       {/* HEADER */}
// //       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
// //         <div>
// //           <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.01em]">
// //             Suppression List
// //           </h1>
// //           <p className="text-sm text-slate-500 mt-1 font-medium">
// //             {suppressions.length.toLocaleString()} contacts blocked from all campaigns
// //           </p>
// //         </div>
// //         <div className="flex flex-wrap gap-2">
// //           <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
// //             Export
// //           </Button>
// //           <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => navigate("/contacts")}>
// //             Add Manually
// //           </Button>
// //         </div>
// //       </div>

// //       {/* MAIN CARD */}
// //       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
// //         {/* FILTERS */}
// //         <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 p-4 border-b border-slate-100">
// //           <SearchInput
// //             placeholder="Search by email or phone..."
// //             onSearch={setSearch}
// //             className="w-full sm:w-64"
// //           />
// //           <select
// //             value={reasonFilter}
// //             onChange={(e) => setReasonFilter(e.target.value)}
// //             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
// //           >
// //             <option value="">All Reasons</option>
// //             {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
// //           </select>
// //           <select
// //             value={channelFilter}
// //             onChange={(e) => setChannelFilter(e.target.value)}
// //             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
// //           >
// //             <option value="">All Channels</option>
// //             {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
// //           </select>
// //         </div>

// //         {/* TABLE */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm min-w-[600px]">
// //             <thead>
// //               <tr className="border-b border-slate-100 bg-slate-50">
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CONTACT</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">CHANNEL</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">REASON</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">SOURCE</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">SINCE</th>
// //                 <th className="px-4 py-3 text-left"></th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-slate-100">
// //               {paginated.map(s => (
// //                 <tr
// //                   key={s.id}
// //                   className="hover:bg-slate-50 transition-colors cursor-pointer"
// //                   onClick={() => handleRowClick(s)}
// //                 >
// //                   <td className="px-4 py-3 font-medium text-sm text-slate-800 whitespace-nowrap">{s.contact}</td>
// //                   <td className="px-4 py-3"><Badge variant={s.channel}>{s.channel}</Badge></td>
// //                   <td className="px-4 py-3"><Badge variant={s.reason}>{s.reason}</Badge></td>
// //                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.source}</td>
// //                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{formatDate(s.since)}</td>
// //                   <td className="px-4 py-3">
// //                     <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       onClick={(e) => handleRemove(s.id, e)}
// //                       className="text-red-500 hover:text-red-700"
// //                     >
// //                       Remove
// //                     </Button>
// //                    </td>
// //                  </tr>
// //               ))}
// //               {paginated.length === 0 && (
// //                 <tr>
// //                   <td colSpan="6" className="text-center py-12 text-slate-500">
// //                     No suppressed contacts found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* PAGINATION */}
// //         <Pagination
// //           page={currentPage}
// //           totalPages={totalPages}
// //           totalItems={filtered.length}
// //           limit={pageSize}
// //           onPageChange={setCurrentPage}
// //         />
// //       </div>

// //       {/* DETAIL MODAL */}
// //       <SuppressionDetailModal
// //         entry={selectedEntry}
// //         isOpen={isDetailModalOpen}
// //         onClose={() => setIsDetailModalOpen(false)}
// //       />
// //     </div>
// //   );
// // }



// // SuppressionPage.jsx – Fully backend‑driven with API integration + Back Arrow
// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getSuppressions,
//   restoreSuppression,
// } from "../services/suppressionApi";

// /* ================= UTILS ================= */
// const cn = (...classes) => classes.filter(Boolean).join(" ");
// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   const d = new Date(dateStr);
//   return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// };
// const formatTime = (dateStr) => {
//   if (!dateStr) return "—";
//   const d = new Date(dateStr);
//   return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
// };

// /* ================= ICONS ================= */
// const DownloadIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const PlusIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
//   </svg>
// );
// const XIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
//   </svg>
// );
// const SearchIcon = () => (
//   <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
//   </svg>
// );
// const MailIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="2" y="4" width="20" height="16" rx="2" />
//     <path d="m22 7-10 7L2 7" />
//   </svg>
// );
// const PhoneIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );
// const InfoIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="10" />
//     <line x1="12" y1="16" x2="12" y2="12" />
//     <line x1="12" y1="8" x2="12.01" y2="8" />
//   </svg>
// );
// const CalendarIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );
// const SourceIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 4v16h16" />
//     <path d="m4 20 8-8 4 4 8-8" />
//   </svg>
// );

// /* ================= UI COMPONENTS ================= */
// const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = "md" }) => {
//   const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
//     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
//   };
//   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const Badge = ({ children, variant }) => {
//   const variantsMap = {
//     Email: "bg-indigo-50 text-indigo-700",
//     WhatsApp: "bg-emerald-50 text-emerald-700",
//     "Hard Bounce": "bg-red-100 text-red-700",
//     Unsubscribed: "bg-orange-100 text-orange-700",
//     "Opted Out": "bg-amber-100 text-amber-700",
//     "Spam Complaint": "bg-rose-100 text-rose-700",
//     "Manual Blacklist": "bg-slate-100 text-slate-700",
//   };
//   const className = variantsMap[variant] || "bg-slate-100 text-slate-700";
//   return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
// };

// const SearchInput = ({ placeholder, onSearch, className }) => {
//   const [value, setValue] = useState("");
//   useEffect(() => {
//     const timer = setTimeout(() => onSearch(value), 300);
//     return () => clearTimeout(timer);
//   }, [value, onSearch]);
//   return (
//     <div className="relative">
//       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         className={cn("pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
//       />
//     </div>
//   );
// };

// const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
//   if (totalPages <= 1) return null;
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
//       <p className="text-sm text-slate-500 font-medium">
//         Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems.toLocaleString()} suppressed contacts
//       </p>
//       <div className="flex gap-1">
//         <button
//           onClick={() => onPageChange(page - 1)}
//           disabled={page === 1}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
//         >
//           ← Prev
//         </button>
//         <span className="px-3 py-1 text-sm text-slate-600 font-medium">{page} / {totalPages}</span>
//         <button
//           onClick={() => onPageChange(page + 1)}
//           disabled={page === totalPages}
//           className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// // ── Suppression Detail Modal (unchanged) ──
// const SuppressionDetailModal = ({ entry, isOpen, onClose }) => {
//   if (!isOpen || !entry) return null;
//   const isEmail = entry.channel === "Email";
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="relative bg-gradient-to-r from-red-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
//           <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
//           <div>
//             <h2 className="text-xl font-bold text-slate-900">Suppressed Contact</h2>
//             <p className="text-sm text-slate-500 mt-1">Blocked from all campaigns</p>
//           </div>
//         </div>
//         <div className="p-6 space-y-5">
//           <div className="grid grid-cols-1 gap-4">
//             <div className="flex items-start gap-3">
//               {isEmail ? <MailIcon /> : <PhoneIcon />}
//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact</p>
//                 <p className="text-sm font-medium text-slate-800">{entry.contact}</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <InfoIcon />
//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Channel</p>
//                 <Badge variant={entry.channel}>{entry.channel}</Badge>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <InfoIcon />
//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Reason</p>
//                 <Badge variant={entry.reason}>{entry.reason}</Badge>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <SourceIcon />
//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Source</p>
//                 <p className="text-sm text-slate-700">{entry.source || "—"}</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <CalendarIcon />
//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Since</p>
//                 <p className="text-sm text-slate-700">{formatDate(entry.since)} at {formatTime(entry.since)}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= MAIN PAGE ================= */
// export default function SuppressionPage() {
//   const navigate = useNavigate();
//   const [suppressions, setSuppressions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [reasonFilter, setReasonFilter] = useState("");
//   const [channelFilter, setChannelFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   // Detail modal state
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

//   // ── Fetch suppressions from API ──
//   const fetchSuppressions = async () => {
//     try {
//       setLoading(true);
//       const data = await getSuppressions();
//       setSuppressions(data);
//     } catch (error) {
//       console.error("FETCH SUPPRESSIONS ERROR:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSuppressions();
//   }, []);

//   // Reset page when filters change
//   useEffect(() => setCurrentPage(1), [search, reasonFilter, channelFilter]);

//   // Filtered data
//   const filtered = useMemo(() => {
//     let result = suppressions;
//     if (search) {
//       const q = search.toLowerCase();
//       result = result.filter(s => s.contact.toLowerCase().includes(q));
//     }
//     if (reasonFilter) result = result.filter(s => s.reason === reasonFilter);
//     if (channelFilter) result = result.filter(s => s.channel === channelFilter);
//     return result;
//   }, [suppressions, search, reasonFilter, channelFilter]);

//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return filtered.slice(start, start + pageSize);
//   }, [filtered, currentPage]);

//   // ── Restore (Remove) handler ──
//   const handleRemove = async (id, e) => {
//     e.stopPropagation();
//     try {
//       await restoreSuppression(id);
//       await fetchSuppressions();
//     } catch (error) {
//       console.error("RESTORE ERROR:", error);
//     }
//   };

//   // ── Row click for detail modal ──
//   const handleRowClick = (entry) => {
//     setSelectedEntry(entry);
//     setIsDetailModalOpen(true);
//   };

//   // ── Export to CSV ──
//   const handleExport = () => {
//     if (filtered.length === 0) {
//       alert("No data to export");
//       return;
//     }
//     const headers = ["Contact", "Channel", "Reason", "Source", "Since"];
//     const rows = filtered.map(s => [
//       s.contact,
//       s.channel,
//       s.reason,
//       s.source,
//       formatDate(s.since),
//     ]);
//     const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `suppression_list_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const reasonOptions = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
//   const channelOptions = ["Email", "WhatsApp"];

//   if (loading) {
//     return (
//       <div className="p-10 text-center">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
//         <p className="mt-4 text-slate-500">Loading suppressions...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       {/* HEADER with Back Arrow */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           {/* Back Arrow Button */}
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
//             <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.01em]">
//               Suppression List
//             </h1>
//             <p className="text-sm text-slate-500 mt-1 font-medium">
//               {suppressions.length.toLocaleString()} contacts blocked from all campaigns
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
//             Export
//           </Button>
//           <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => navigate("/contacts")}>
//             Add Manually
//           </Button>
//         </div>
//       </div>

//       {/* MAIN CARD */}
//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         {/* FILTERS */}
//         <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 p-4 border-b border-slate-100">
//           <SearchInput
//             placeholder="Search by email or phone..."
//             onSearch={setSearch}
//             className="w-full sm:w-64"
//           />
//           <select
//             value={reasonFilter}
//             onChange={(e) => setReasonFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
//           >
//             <option value="">All Reasons</option>
//             {reasonOptions.map(r => <option key={r} value={r}>{r}</option>)}
//           </select>
//           <select
//             value={channelFilter}
//             onChange={(e) => setChannelFilter(e.target.value)}
//             className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
//           >
//             <option value="">All Channels</option>
//             {channelOptions.map(c => <option key={c} value={c}>{c}</option>)}
//           </select>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm min-w-[600px]">
//           <thead>
//   <tr className="border-b border-slate-100 bg-slate-50">

//     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
//       NAME
//     </th>

//     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
//       EMAIL
//     </th>

//     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
//       CHANNEL
//     </th>

//     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
//       REASON
//     </th>

//     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
//       SOURCE
//     </th>

//     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
//       SINCE
//     </th>

//     <th className="px-4 py-3 text-left"></th>

//   </tr>
// </thead>
//             <tbody className="divide-y divide-slate-100">
//               {paginated.map(s => (
//                 <tr
//                   key={s.id}
//                   className="hover:bg-slate-50 transition-colors cursor-pointer"
//                   onClick={() => handleRowClick(s)}
//                 >
//                   <td className="px-4 py-3 font-medium text-sm text-slate-800 whitespace-nowrap">{s.contact}</td>
//                   <td className="px-4 py-3"><Badge variant={s.channel}>{s.channel}</Badge></td>
//                   <td className="px-4 py-3"><Badge variant={s.reason}>{s.reason}</Badge></td>
//                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{s.source}</td>
//                   <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{formatDate(s.since)}</td>
//                   <td className="px-4 py-3">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={(e) => handleRemove(s.id, e)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Remove
//                     </Button>
//                    </td>
//                  </tr>
//               ))}
//               {paginated.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="text-center py-12 text-slate-500">
//                     No suppressed contacts found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <Pagination
//           page={currentPage}
//           totalPages={totalPages}
//           totalItems={filtered.length}
//           limit={pageSize}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* DETAIL MODAL */}
//       <SuppressionDetailModal
//         entry={selectedEntry}
//         isOpen={isDetailModalOpen}
//         onClose={() => setIsDetailModalOpen(false)}
//       />
//     </div>
//   );
// }




// SuppressionPage.jsx – Fully backend‑driven with API integration + Back Arrow
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSuppressions,
  restoreSuppression,
} from "../services/suppressionApi";

/* ================= UTILS ================= */
const cn = (...classes) => classes.filter(Boolean).join(" ");
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const formatTime = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

/* ================= ICONS ================= */
const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlusIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4v16m8-8H4" strokeLinecap="round" />
  </svg>
);
const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const InfoIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const SourceIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4v16h16" />
    <path d="m4 20 8-8 4 4 8-8" />
  </svg>
);

/* ================= UI COMPONENTS ================= */
const Button = ({ children, variant, leftIcon, onClick, disabled, loading, size = "md" }) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-300",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
  };
  const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
    </button>
  );
};

const Badge = ({ children, variant }) => {
  const variantsMap = {
    Email: "bg-indigo-50 text-indigo-700",
    WhatsApp: "bg-emerald-50 text-emerald-700",
    "Hard Bounce": "bg-red-100 text-red-700",
    Unsubscribed: "bg-orange-100 text-orange-700",
    "Opted Out": "bg-amber-100 text-amber-700",
    "Spam Complaint": "bg-rose-100 text-rose-700",
    "Manual Blacklist": "bg-slate-100 text-slate-700",
  };
  const className = variantsMap[variant] || "bg-slate-100 text-slate-700";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
};

const SearchInput = ({ placeholder, onSearch, className }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn("pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500", className)}
      />
    </div>
  );
};

const Pagination = ({ page, totalPages, totalItems, limit, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
      <p className="text-sm text-slate-500 font-medium">
        Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems.toLocaleString()} suppressed contacts
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
        >
          ← Prev
        </button>
        <span className="px-3 py-1 text-sm text-slate-600 font-medium">{page} / {totalPages}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 rounded border border-slate-200 text-sm disabled:opacity-50 hover:bg-slate-100 inline-flex items-center gap-1"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// ── Suppression Detail Modal (updated to show name+email) ──
const SuppressionDetailModal = ({ entry, isOpen, onClose }) => {
  if (!isOpen || !entry) return null;
  const isEmail = entry.channel === "Email";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-gradient-to-r from-red-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Suppressed Contact</h2>
            <p className="text-sm text-slate-500 mt-1">Blocked from all campaigns</p>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-3">
              {isEmail ? <MailIcon /> : <PhoneIcon />}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Name</p>
                <p className="text-sm font-medium text-slate-800">{entry.name || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MailIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</p>
                <p className="text-sm font-medium text-slate-800">{entry.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <InfoIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Channel</p>
                <Badge variant={entry.channel}>{entry.channel}</Badge>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <InfoIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Reason</p>
                <Badge variant={entry.reason}>{entry.reason}</Badge>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <SourceIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Source</p>
                <p className="text-sm text-slate-700">{entry.source || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarIcon />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Since</p>
                <p className="text-sm text-slate-700">{formatDate(entry.since)} at {formatTime(entry.since)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */
export default function SuppressionPage() {
  const navigate = useNavigate();
  const [suppressions, setSuppressions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Detail modal state
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // ── Fetch suppressions from API ──
  const fetchSuppressions = async () => {
    try {
      setLoading(true);
      const data = await getSuppressions();
      setSuppressions(data);
    } catch (error) {
      console.error("FETCH SUPPRESSIONS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppressions();
  }, []);

  // Reset page when filters change
  useEffect(() => setCurrentPage(1), [search, reasonFilter, channelFilter]);

  // Filtered data - now searches both name and email
  const filtered = useMemo(() => {
    let result = suppressions;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          (s.name || "").toLowerCase().includes(q) ||
          (s.email || "").toLowerCase().includes(q)
      );
    }
    if (reasonFilter) result = result.filter((s) => s.reason === reasonFilter);
    if (channelFilter) result = result.filter((s) => s.channel === channelFilter);
    return result;
  }, [suppressions, search, reasonFilter, channelFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  // ── Restore (Remove) handler ──
  const handleRemove = async (id, e) => {
    e.stopPropagation();
    try {
      await restoreSuppression(id);
      await fetchSuppressions();
    } catch (error) {
      console.error("RESTORE ERROR:", error);
    }
  };

  // ── Row click for detail modal ──
  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setIsDetailModalOpen(true);
  };

  // ── Export to CSV (updated headers and fields) ──
  const handleExport = () => {
    if (filtered.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = ["Name", "Email", "Channel", "Reason", "Source", "Since"];
    const rows = filtered.map((s) => [
      s.name || "",
      s.email || "",
      s.channel,
      s.reason,
      s.source || "",
      formatDate(s.since),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `suppression_list_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reasonOptions = ["Hard Bounce", "Unsubscribed", "Opted Out", "Spam Complaint", "Manual Blacklist"];
  const channelOptions = ["Email", "WhatsApp"];

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-slate-500">Loading suppressions...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* HEADER with Back Arrow */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Back to Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
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
          <div>
            <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.01em]">
              Suppression List
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {suppressions.length.toLocaleString()} contacts blocked from all campaigns
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" leftIcon={<DownloadIcon />} onClick={handleExport}>
            Export
          </Button>
          <Button variant="primary" leftIcon={<PlusIcon />} onClick={() => navigate("/contacts")}>
            Add Manually
          </Button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* FILTERS */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 p-4 border-b border-slate-100">
          <SearchInput
            placeholder="Search by name or email..."
            onSearch={setSearch}
            className="w-full sm:w-64"
          />
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
          >
            <option value="">All Reasons</option>
            {reasonOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer w-full sm:w-auto"
          >
            <option value="">All Channels</option>
            {channelOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  CHANNEL
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  REASON
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  SOURCE
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  SINCE
                </th>
                <th className="px-4 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(s)}
                >
                  <td className="px-4 py-3 font-medium text-sm text-slate-800 whitespace-nowrap">
                    {s.name || "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{s.email || "-"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.channel}>{s.channel}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={s.reason}>{s.reason}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                    {s.source || "-"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                    {formatDate(s.since)}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleRemove(s.id, e)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-500">
                    No suppressed contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          limit={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* DETAIL MODAL */}
      <SuppressionDetailModal
        entry={selectedEntry}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}
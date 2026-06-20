// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import {
// //   ArrowLeft, Search, Download, CheckCheck, Check, Clock, XCircle,
// //   MessageSquare, Eye, User, Phone, Mail, MapPin, Briefcase,
// //   Tag, Activity, Loader2, ChevronRight
// // } from 'lucide-react';

// // // ---------- HELPER: format date ----------
// // const formatDate = (dateStr) => {
// //   if (!dateStr) return '—';
// //   return new Date(dateStr).toLocaleString();
// // };

// // const formatTime = (dateStr) => {
// //   if (!dateStr) return '';
// //   return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // };

// // // ---------- Status Badge (same as before) ----------
// // const StatusBadge = ({ status }) => {
// //   const getStyles = () => {
// //     switch (status) {
// //       case 'read': return 'bg-blue-100 text-blue-700';
// //       case 'delivered': return 'bg-green-100 text-green-700';
// //       case 'sent': return 'bg-amber-100 text-amber-700';
// //       case 'failed': return 'bg-red-100 text-red-600';
// //       default: return 'bg-gray-100 text-gray-700';
// //     }
// //   };
// //   const getIcon = () => {
// //     switch (status) {
// //       case 'read': return <CheckCheck className="w-3 h-3" />;
// //       case 'delivered': return <CheckCheck className="w-3 h-3" />;
// //       case 'sent': return <Check className="w-3 h-3" />;
// //       case 'failed': return <XCircle className="w-3 h-3" />;
// //       default: return <Clock className="w-3 h-3" />;
// //     }
// //   };
// //   return (
// //     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getStyles()}`}>
// //       {getIcon()}
// //       <span className="capitalize">{status}</span>
// //     </span>
// //   );
// // };

// // // ---------- Helper: get initials ----------
// // const getInitials = (name) => {
// //   if (!name) return '?';
// //   return name.charAt(0).toUpperCase();
// // };

// // // ---------- Main Component ----------
// // export default function WhatsAppLogs() {
// //   // State
// //   const [messages, setMessages] = useState([]);        // filtered messages for current view
// //   const [allMessages, setAllMessages] = useState([]);  // full unfiltered list from API
// //   const [stats, setStats] = useState({ total_sent: 0, delivered: 0, read: 0, failed: 0 });
// //   const [loading, setLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [selectedMessage, setSelectedMessage] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [page, setPage] = useState(1);
// //   const LIMIT = 10;

// //   // ---------- API call to fetch all logs ----------
// //   const refreshData = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await fetch("https://wynreach-backend.onrender.com/api/messagelog/");
// //       const data = await res.json();

// //       if (data.success) {
// //         const rawMessages = data.messages || [];
// //         setAllMessages(rawMessages);
// //         setStats(data.stats || { total_sent: 0, delivered: 0, read: 0, failed: 0 });
// //       } else {
// //         console.error("API returned success: false", data);
// //         setAllMessages([]);
// //         setStats({ total_sent: 0, delivered: 0, read: 0, failed: 0 });
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch message logs:", err);
// //       setAllMessages([]);
// //       setStats({ total_sent: 0, delivered: 0, read: 0, failed: 0 });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ---------- Apply client‑side filtering ----------
// //   useEffect(() => {
// //     if (!allMessages.length) return;

// //     let filtered = [...allMessages];

// //     // Search query (name, phone, email, message content)
// //     if (searchQuery.trim() !== '') {
// //       const lowerQuery = searchQuery.toLowerCase();
// //       filtered = filtered.filter(msg =>
// //         (msg.recipient_name?.toLowerCase().includes(lowerQuery)) ||
// //         (msg.recipient_phone?.toLowerCase().includes(lowerQuery)) ||
// //         (msg.recipient_email?.toLowerCase().includes(lowerQuery)) ||
// //         (msg.message?.toLowerCase().includes(lowerQuery))
// //       );
// //     }

// //     // Status filter
// //     if (statusFilter !== 'all') {
// //       filtered = filtered.filter(msg => msg.status === statusFilter);
// //     }

// //     setMessages(filtered);
// //     // Reset to first page when filters change
// //     setPage(1);
// //   }, [searchQuery, statusFilter, allMessages]);

// //   // ---------- Fetch data on mount ----------
// //   useEffect(() => {
// //     refreshData();
// //   }, []);

// //   // ---------- Export to CSV ----------
// //   const exportToCSV = () => {
// //     if (messages.length === 0) {
// //       alert('No messages to export!');
// //       return;
// //     }
// //     const headers = ['ID', 'Recipient Name', 'Phone', 'Email', 'Location', 'Occupation', 'Company', 'Message', 'Template', 'Campaign', 'Status', 'Sent At', 'Delivered At', 'Read At', 'Engagement Score'];
// //     const rows = messages.map(msg => [
// //       msg.id,
// //       `"${(msg.recipient_name || '').replace(/"/g, '""')}"`,
// //       msg.recipient_phone,
// //       msg.recipient_email || '',
// //       msg.recipient_location || '',
// //       msg.recipient_occupation || '',
// //       msg.recipient_company || '',
// //       `"${msg.message.replace(/"/g, '""')}"`,
// //       msg.template_name || '',
// //       msg.campaign_name || '',
// //       msg.status,
// //       msg.sent_at || '',
// //       msg.delivered_at || '',
// //       msg.read_at || '',
// //       msg.engagement_score || 0,
// //     ]);
// //     const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
// //     const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = `whatsapp_logs_${new Date().toISOString().slice(0, 10)}.csv`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   // ---------- Open details modal ----------
// //   const openDetails = (msg) => {
// //     setSelectedMessage(msg);
// //     setShowDetailsModal(true);
// //   };

// //   // ---------- Pagination ----------
// //   const totalPages = Math.max(1, Math.ceil(messages.length / LIMIT));
// //   const currentPage = Math.min(page, totalPages);
// //   const paginatedMessages = messages.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
// //   const startItem = (currentPage - 1) * LIMIT + 1;
// //   const endItem = Math.min(currentPage * LIMIT, messages.length);

// //   const pageButtons = () => {
// //     const btns = [];
// //     if (totalPages <= 7) {
// //       for (let i = 1; i <= totalPages; i++) btns.push(i);
// //     } else {
// //       btns.push(1);
// //       if (currentPage > 3) btns.push('...');
// //       for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
// //       if (currentPage < totalPages - 2) btns.push('...');
// //       btns.push(totalPages);
// //     }
// //     return btns;
// //   };

// //   return (
// //     <div className="p-6 bg-slate-50 min-h-screen">
// //       <div className="max-w-7xl mx-auto space-y-6">
// //         {/* Header */}
// //         <div className="flex flex-wrap justify-between items-start gap-4">
// //           <div className="flex items-center gap-4">
// //             <Link to="/dashboard" className="p-2 rounded-lg hover:bg-slate-100 transition">
// //               <ArrowLeft className="w-5 h-5 text-slate-500" />
// //             </Link>
// //             <div>
// //               <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.02em]">WhatsApp Message Logs</h1>
// //               <p className="text-sm text-slate-400 mt-1 font-medium">View and manage all sent WhatsApp messages</p>
// //             </div>
// //           </div>
// //           <button
// //             onClick={exportToCSV}
// //             className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
// //           >
// //             <Download className="w-4 h-4" />
// //             <span>Export CSV</span>
// //           </button>
// //         </div>

// //         {/* Stats Cards - from API stats */}
// //         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
// //           {[
// //             { label: 'Total Sent', value: stats.total_sent },
// //             { label: 'Delivered', value: stats.delivered, color: 'text-green-600' },
// //             { label: 'Read', value: stats.read, color: 'text-blue-600' },
// //             { label: 'Failed', value: stats.failed, color: 'text-red-600' },
// //           ].map((stat) => (
// //             <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
// //               <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
// //               <p className={`text-2xl font-bold ${stat.color || 'text-slate-900'}`}>{stat.value}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Main Card */}
// //         <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
// //           {/* Search & Filter Bar */}
// //           <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
// //             <div className="relative">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
// //               <input
// //                 type="text"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 placeholder="Search by name, phone, email, or message..."
// //                 className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-64 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
// //               />
// //             </div>
// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"
// //             >
// //               <option value="all">All Status</option>
// //               <option value="read">Read</option>
// //               <option value="delivered">Delivered</option>
// //               <option value="sent">Sent</option>
// //               <option value="failed">Failed</option>
// //             </select>
// //             <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
// //           </div>

// //           {/* Table / Loading / Empty State */}
// //           {loading ? (
// //             <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
// //               <Loader2 className="w-5 h-5 animate-spin" />
// //               <span>Loading messages...</span>
// //             </div>
// //           ) : messages.length === 0 ? (
// //             <div className="text-center py-16">
// //               <MessageSquare className="w-12 h-12 mx-auto text-slate-400 mb-3" />
// //               <h3 className="text-base font-medium text-slate-900 mb-1">No messages found</h3>
// //               <p className="text-sm text-slate-500">
// //                 {searchQuery || statusFilter !== 'all' ? 'Try adjusting your search or filter.' : 'No messages have been sent yet.'}
// //               </p>
// //               {(searchQuery || statusFilter !== 'all') && (
// //                 <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} className="mt-3 text-sm text-indigo-600 hover:underline">
// //                   Clear filters
// //                 </button>
// //               )}
// //             </div>
// //           ) : (
// //             <div className="overflow-x-auto">
// //               <table className="w-full text-sm border-collapse">
// //                 <thead>
// //                   <tr className="border-b border-slate-100 bg-slate-50">
// //                     {['RECIPIENT', 'MESSAGE', 'CAMPAIGN', 'STATUS', 'SENT AT', ''].map((h) => (
// //                       <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">
// //                         {h}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {paginatedMessages.map((msg) => (
// //                     <tr
// //                       key={msg.id}
// //                       className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
// //                       onClick={() => openDetails(msg)}
// //                     >
// //                       <td className="px-4 py-3.5">
// //                         <div className="flex items-center gap-3">
// //                           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
// //                             {getInitials(msg.recipient_name)}
// //                           </div>
// //                           <div>
// //                             <p className="font-bold text-slate-800 text-sm leading-tight">{msg.recipient_name || 'Unknown'}</p>
// //                             <p className="text-xs text-slate-400 font-medium mt-0.5">{msg.recipient_phone}</p>
// //                             {msg.recipient_email && <p className="text-xs text-slate-400">{msg.recipient_email}</p>}
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-3.5">
// //                         <div className="flex items-start gap-2 max-w-md">
// //                           <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
// //                           <p className="text-sm text-slate-700 line-clamp-2">{msg.message}</p>
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-3.5 text-sm text-slate-600">{msg.campaign_name || '—'}</td>
// //                       <td className="px-4 py-3.5"><StatusBadge status={msg.status} /></td>
// //                       <td className="px-4 py-3.5 text-sm text-slate-500">{formatDate(msg.sent_at)}</td>
// //                       <td className="px-4 py-3.5">
// //                         <button
// //                           onClick={(e) => { e.stopPropagation(); openDetails(msg); }}
// //                           className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
// //                         >
// //                           <Eye className="w-4 h-4 text-slate-500" />
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}

// //           {/* Pagination */}
// //           {messages.length > 0 && !loading && (
// //             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
// //               <p className="text-sm text-slate-400 font-medium">
// //                 Showing {startItem}–{endItem} of {messages.length.toLocaleString()} messages
// //               </p>
// //               <div className="flex items-center gap-1">
// //                 <button
// //                   onClick={() => setPage(p => Math.max(1, p - 1))}
// //                   disabled={currentPage === 1}
// //                   className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"
// //                 >
// //                   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
// //                   </svg>
// //                 </button>
// //                 {pageButtons().map((b, i) =>
// //                   b === '...' ? (
// //                     <span key={`dot${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span>
// //                   ) : (
// //                     <button
// //                       key={b}
// //                       onClick={() => setPage(b)}
// //                       className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${
// //                         currentPage === b
// //                           ? 'bg-indigo-600 text-white border-indigo-600'
// //                           : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
// //                       }`}
// //                     >
// //                       {b}
// //                     </button>
// //                   )
// //                 )}
// //                 <button
// //                   onClick={() => setPage(p => Math.min(totalPages, p + 1))}
// //                   disabled={currentPage === totalPages}
// //                   className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"
// //                 >
// //                   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //                     <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
// //                   </svg>
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Details Modal - same style as before */}
// //       {showDetailsModal && selectedMessage && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}>
// //           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// //             <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
// //               <button onClick={() => setShowDetailsModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
// //                 <XCircle className="w-5 h-5" />
// //               </button>
// //               <div className="flex items-center gap-4">
// //                 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
// //                   {getInitials(selectedMessage.recipient_name)}
// //                 </div>
// //                 <div>
// //                   <h2 className="text-xl font-bold text-slate-900">{selectedMessage.recipient_name || 'Unknown'}</h2>
// //                   <p className="text-sm text-slate-500">{selectedMessage.recipient_phone}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="p-6 space-y-5">
// //               {/* Contact Information */}
// //               <div>
// //                 <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
// //                   <User className="w-4 h-4 text-indigo-600" />
// //                   Contact Information
// //                 </h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //                   <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
// //                     <Phone className="w-4 h-4 text-green-600" />
// //                     <div>
// //                       <p className="text-xs text-slate-500">Phone</p>
// //                       <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_phone}</p>
// //                     </div>
// //                   </div>
// //                   {selectedMessage.recipient_email && (
// //                     <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
// //                       <Mail className="w-4 h-4 text-blue-600" />
// //                       <div>
// //                         <p className="text-xs text-slate-500">Email</p>
// //                         <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_email}</p>
// //                       </div>
// //                     </div>
// //                   )}
// //                   {selectedMessage.recipient_location && (
// //                     <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
// //                       <MapPin className="w-4 h-4 text-red-600" />
// //                       <div>
// //                         <p className="text-xs text-slate-500">Location</p>
// //                         <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_location}</p>
// //                       </div>
// //                     </div>
// //                   )}
// //                   {selectedMessage.recipient_occupation && (
// //                     <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
// //                       <Briefcase className="w-4 h-4 text-purple-600" />
// //                       <div>
// //                         <p className="text-xs text-slate-500">Occupation</p>
// //                         <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_occupation}</p>
// //                       </div>
// //                     </div>
// //                   )}
// //                   {selectedMessage.recipient_company && (
// //                     <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
// //                       <Briefcase className="w-4 h-4 text-purple-600" />
// //                       <div>
// //                         <p className="text-xs text-slate-500">Company</p>
// //                         <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_company}</p>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Message Details */}
// //               <div>
// //                 <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
// //                   <MessageSquare className="w-4 h-4 text-green-600" />
// //                   Message Details
// //                 </h3>
// //                 <div className="bg-slate-50 rounded-lg p-4 space-y-3">
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <p className="text-xs text-slate-500">Campaign</p>
// //                       <p className="text-sm font-medium text-slate-800">{selectedMessage.campaign_name || '—'}</p>
// //                     </div>
// //                     <StatusBadge status={selectedMessage.status} />
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-slate-500">Message</p>
// //                     <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
// //                       <p className="text-sm text-slate-700">{selectedMessage.message}</p>
// //                     </div>
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-2 text-xs">
// //                     <div className="flex items-center gap-1 text-slate-500">
// //                       <Clock className="w-3 h-3" />
// //                       <span>Sent: {formatDate(selectedMessage.sent_at)}</span>
// //                     </div>
// //                     {selectedMessage.delivered_at && (
// //                       <div className="flex items-center gap-1 text-green-600">
// //                         <CheckCheck className="w-3 h-3" />
// //                         <span>Delivered: {formatDate(selectedMessage.delivered_at)}</span>
// //                       </div>
// //                     )}
// //                     {selectedMessage.read_at && (
// //                       <div className="flex items-center gap-1 text-blue-600">
// //                         <CheckCheck className="w-3 h-3" />
// //                         <span>Read: {formatDate(selectedMessage.read_at)}</span>
// //                       </div>
// //                     )}
// //                   </div>
// //                   <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
// //                     <Activity className="w-4 h-4 text-indigo-500" />
// //                     <div>
// //                       <p className="text-xs text-slate-500">Engagement Score</p>
// //                       <div className="flex items-center gap-2">
// //                         <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
// //                           <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedMessage.engagement_score}%` }} />
// //                         </div>
// //                         <span className="text-sm font-bold text-indigo-600">{selectedMessage.engagement_score}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Tags */}
// //               {selectedMessage.tags && selectedMessage.tags.length > 0 && (
// //                 <div>
// //                   <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
// //                     <Tag className="w-4 h-4 text-yellow-600" />
// //                     Tags
// //                   </h3>
// //                   <div className="flex flex-wrap gap-1.5">
// //                     {selectedMessage.tags.map((tag, idx) => (
// //                       <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">
// //                         {tag}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Error Reason */}
// //               {selectedMessage.error_reason && (
// //                 <div className="p-3 bg-red-50 rounded-lg">
// //                   <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">Error Reason</p>
// //                   <p className="text-sm text-red-700 mt-1">{selectedMessage.error_reason}</p>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="border-t border-slate-100 p-4 flex justify-end">
// //               <button onClick={() => setShowDetailsModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition">
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }










// import { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   ArrowLeft, Search, Download, CheckCheck, Check, Clock, XCircle,
//   MessageSquare, Eye, User, Phone, Mail, MapPin, Briefcase,
//   Tag, Activity, Loader2, ArrowDownLeft, ArrowUpRight
// } from 'lucide-react';

// const formatDate = (dateStr) => {
//   if (!dateStr) return '—';
//   return new Date(dateStr).toLocaleString();
// };

// // Direction badge — shows if message is incoming or outgoing
// const DirectionBadge = ({ direction }) => {
//   if (direction === 'incoming') {
//     return (
//       <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
//         <ArrowDownLeft className="w-3 h-3" />
//         Received
//       </span>
//     );
//   }
//   return (
//     <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
//       <ArrowUpRight className="w-3 h-3" />
//       Sent
//     </span>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const getStyles = () => {
//     switch (status) {
//       case 'read': return 'bg-blue-100 text-blue-700';
//       case 'delivered': return 'bg-green-100 text-green-700';
//       case 'sent': return 'bg-amber-100 text-amber-700';
//       case 'failed': return 'bg-red-100 text-red-600';
//       case 'received': return 'bg-emerald-100 text-emerald-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };
//   const getIcon = () => {
//     switch (status) {
//       case 'read': return <CheckCheck className="w-3 h-3" />;
//       case 'delivered': return <CheckCheck className="w-3 h-3" />;
//       case 'sent': return <Check className="w-3 h-3" />;
//       case 'failed': return <XCircle className="w-3 h-3" />;
//       case 'received': return <ArrowDownLeft className="w-3 h-3" />;
//       default: return <Clock className="w-3 h-3" />;
//     }
//   };
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getStyles()}`}>
//       {getIcon()}
//       <span className="capitalize">{status}</span>
//     </span>
//   );
// };

// const getInitials = (name) => {
//   if (!name) return '?';
//   return name.charAt(0).toUpperCase();
// };

// export default function WhatsAppLogs() {
//   // const [messages, setMessages] = useState([]);
//   const [allMessages, setAllMessages] = useState([]);
//   const [stats, setStats] = useState({ total_sent: 0, delivered: 0, read: 0, failed: 0, received: 0 });
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [directionFilter, setDirectionFilter] = useState('all'); // NEW: all | incoming | outgoing
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [page, setPage] = useState(1);
//   const LIMIT = 10;

//   const refreshData = async () => {
//     try {
//       setLoading(true);

//       // Fetch both APIs in parallel
//       const [logsRes, inboxRes] = await Promise.all([
//         fetch("https://wynreach-backend.onrender.com/api/messagelog/"),
//       ]);

//       const logsData = await logsRes.json();

//       // Outgoing messages from messagelog
//       let outgoing = [];
//       let apiStats = { total_sent: 0, delivered: 0, read: 0, failed: 0, received: 0 };

//       if (logsData.success) {
//         outgoing = (logsData.messages || []).map(m => ({
//           ...m,
//           direction: m.direction || 'outgoing',
//           status: m.status || 'sent',
//         }));
//         apiStats = { ...apiStats, ...(logsData.stats || {}) };
//       }
//       // Merge and sort by date descending
//       const merged = [...outgoing].sort((a, b) => {
//         const da = a.sent_at ? new Date(a.sent_at) : 0;
//         const db = b.sent_at ? new Date(b.sent_at) : 0;
//         return db - da;
//       });

//       setAllMessages(merged);
//       setStats(apiStats);
//     } catch (err) {
//       console.error("Failed to fetch message logs:", err);
//       setAllMessages([]);
//       setStats({ total_sent: 0, delivered: 0, read: 0, failed: 0, received: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   if (!allMessages.length) {
//   //     setMessages([]);
//   //     return;
//   //   }
//   //   let filtered = [...allMessages];

//   //   if (searchQuery.trim() !== '') {
//   //     const q = searchQuery.toLowerCase();
//   //     filtered = filtered.filter(m =>
//   //       (m.recipient_name?.toLowerCase().includes(q)) ||
//   //       (m.recipient_phone?.toLowerCase().includes(q)) ||
//   //       (m.recipient_email?.toLowerCase().includes(q)) ||
//   //       (m.message?.toLowerCase().includes(q))
//   //     );
//   //   }

//   //   if (statusFilter !== 'all') {
//   //     filtered = filtered.filter(m => m.status === statusFilter);
//   //   }

//   //   if (directionFilter !== 'all') {
//   //     filtered = filtered.filter(m => m.direction === directionFilter);
//   //   }

//   //   setMessages(filtered);
//   //   setPage(1);
//   // }, [searchQuery, statusFilter, directionFilter, allMessages]);

//   const messages = useMemo(() => {
//     let filtered = [...allMessages];
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       filtered = filtered.filter(m =>
//         m.recipient_name?.toLowerCase().includes(q) ||
//         m.recipient_phone?.toLowerCase().includes(q) ||
//         m.recipient_email?.toLowerCase().includes(q) ||
//         m.message?.toLowerCase().includes(q)
//       );
//     }
//     if (statusFilter !== 'all') filtered = filtered.filter(m => m.status === statusFilter);
//     if (directionFilter !== 'all') filtered = filtered.filter(m => m.direction === directionFilter);
//     return filtered;
//   }, [searchQuery, statusFilter, directionFilter, allMessages]);

//   useEffect(() => { setPage(1); }, [searchQuery, statusFilter, directionFilter]);


//   useEffect(() => { refreshData(); }, []);

//   const exportToCSV = () => {
//     if (messages.length === 0) { alert('No messages to export!'); return; }
//     const headers = ['ID', 'Direction', 'Recipient Name', 'Phone', 'Message', 'Campaign', 'Status', 'Date'];
//     const rows = messages.map(m => [
//       m.id,
//       m.direction,
//       `"${(m.recipient_name || '').replace(/"/g, '""')}"`,
//       m.recipient_phone,
//       `"${(m.message || '').replace(/"/g, '""')}"`,
//       m.campaign_name || '',
//       m.status,
//       m.sent_at || '',
//     ]);
//     const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
//     const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `whatsapp_logs_${new Date().toISOString().slice(0, 10)}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const openDetails = (msg) => { setSelectedMessage(msg); setShowDetailsModal(true); };

//   const totalPages = Math.max(1, Math.ceil(messages.length / LIMIT));
//   const currentPage = Math.min(page, totalPages);
//   const paginatedMessages = messages.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
//   const startItem = messages.length === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
//   const endItem = Math.min(currentPage * LIMIT, messages.length);

//   const pageButtons = () => {
//     const btns = [];
//     if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) btns.push(i); }
//     else {
//       btns.push(1);
//       if (currentPage > 3) btns.push('...');
//       for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
//       if (currentPage < totalPages - 2) btns.push('...');
//       btns.push(totalPages);
//     }
//     return btns;
//   };

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-start gap-4">
//           <div className="flex items-center gap-4">
//             <Link to="/dashboard" className="p-2 rounded-lg hover:bg-slate-100 transition">
//               <ArrowLeft className="w-5 h-5 text-slate-500" />
//             </Link>
//             <div>
//               <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.02em]">WhatsApp Message Logs</h1>
//               <p className="text-sm text-slate-400 mt-1 font-medium">All sent and received WhatsApp messages</p>
//             </div>
//           </div>
//           <button
//             onClick={exportToCSV}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
//           >
//             <Download className="w-4 h-4" />
//             Export CSV
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
//           {[
//             { label: 'Total Sent', value: stats.total_sent },
//             { label: 'Delivered', value: stats.delivered, color: 'text-green-600' },
//             { label: 'Read', value: stats.read, color: 'text-blue-600' },
//             { label: 'Failed', value: stats.failed, color: 'text-red-600' },
//             { label: 'Received', value: stats.received, color: 'text-emerald-600' },
//           ].map((stat) => (
//             <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
//               <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
//               <p className={`text-2xl font-bold ${stat.color || 'text-slate-900'}`}>{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

//           {/* Filter Bar */}
//           <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search by name, phone, or message..."
//                 className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-64 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
//               />
//             </div>

//             {/* Direction filter — NEW */}
//             <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
//               {[
//                 { val: 'all', label: 'All' },
//                 { val: 'outgoing', label: '↑ Sent' },
//                 { val: 'incoming', label: '↓ Received' },
//               ].map(opt => (
//                 <button
//                   key={opt.val}
//                   onClick={() => setDirectionFilter(opt.val)}
//                   className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${directionFilter === opt.val
//                     ? 'bg-white text-slate-900 shadow-sm'
//                     : 'text-slate-500 hover:text-slate-700'
//                     }`}
//                 >
//                   {opt.label}
//                 </button>
//               ))}
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"
//             >
//               <option value="all">All Status</option>
//               <option value="received">Received</option>
//               <option value="read">Read</option>
//               <option value="delivered">Delivered</option>
//               <option value="sent">Sent</option>
//               <option value="failed">Failed</option>
//             </select>

//             <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
//           </div>

//           {/* Table */}
//           {loading ? (
//             <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               <span>Loading messages...</span>
//             </div>
//           ) : messages.length === 0 ? (
//             <div className="text-center py-16">
//               <MessageSquare className="w-12 h-12 mx-auto text-slate-400 mb-3" />
//               <h3 className="text-base font-medium text-slate-900 mb-1">No messages found</h3>
//               <p className="text-sm text-slate-500">
//                 {searchQuery || statusFilter !== 'all' || directionFilter !== 'all'
//                   ? 'Try adjusting your filters.'
//                   : 'No messages yet.'}
//               </p>
//               {(searchQuery || statusFilter !== 'all' || directionFilter !== 'all') && (
//                 <button
//                   onClick={() => { setSearchQuery(''); setStatusFilter('all'); setDirectionFilter('all'); }}
//                   className="mt-3 text-sm text-indigo-600 hover:underline"
//                 >
//                   Clear filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm border-collapse">
//                 <thead>
//                   <tr className="border-b border-slate-100 bg-slate-50">
//                     {['RECIPIENT', 'MESSAGE', 'DIRECTION', 'CAMPAIGN', 'STATUS', 'DATE', ''].map((h) => (
//                       <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedMessages.map((msg) => (
//                     <tr
//                       key={msg.id}
//                       className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${msg.direction === 'incoming' ? 'bg-emerald-50/30' : ''
//                         }`}
//                       onClick={() => openDetails(msg)}
//                     >
//                       <td className="px-4 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${msg.direction === 'incoming'
//                             ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
//                             : 'bg-gradient-to-br from-indigo-500 to-purple-600'
//                             }`}>
//                             {getInitials(msg.recipient_name)}
//                           </div>
//                           <div>
//                             <p className="font-bold text-slate-800 text-sm leading-tight">{msg.recipient_name || 'Unknown'}</p>
//                             <p className="text-xs text-slate-400 font-medium mt-0.5">{msg.recipient_phone}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3.5">
//                         <div className="flex items-start gap-2 max-w-xs">
//                           <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
//                           <p className="text-sm text-slate-700 line-clamp-2">{msg.message}</p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3.5">
//                         <DirectionBadge direction={msg.direction} />
//                       </td>
//                       <td className="px-4 py-3.5 text-sm text-slate-600">{msg.campaign_name || '—'}</td>
//                       <td className="px-4 py-3.5"><StatusBadge status={msg.status} /></td>
//                       <td className="px-4 py-3.5 text-sm text-slate-500 whitespace-nowrap">{formatDate(msg.sent_at)}</td>
//                       <td className="px-4 py-3.5">
//                         <button
//                           onClick={(e) => { e.stopPropagation(); openDetails(msg); }}
//                           className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
//                         >
//                           <Eye className="w-4 h-4 text-slate-500" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Pagination */}
//           {messages.length > 0 && !loading && (
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
//               <p className="text-sm text-slate-400 font-medium">
//                 Showing {startItem}–{endItem} of {messages.length.toLocaleString()} messages
//               </p>
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => setPage(p => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"
//                 >
//                   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </button>
//                 {pageButtons().map((b, i) =>
//                   b === '...' ? (
//                     <span key={`dot${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span>
//                   ) : (
//                     <button
//                       key={b}
//                       onClick={() => setPage(b)}
//                       className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${currentPage === b
//                         ? 'bg-indigo-600 text-white border-indigo-600'
//                         : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
//                         }`}
//                     >
//                       {b}
//                     </button>
//                   )
//                 )}
//                 <button
//                   onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"
//                 >
//                   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Details Modal */}
//       {showDetailsModal && selectedMessage && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}>
//           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//             <div className={`relative p-6 rounded-t-2xl border-b border-slate-100 ${selectedMessage.direction === 'incoming'
//               ? 'bg-gradient-to-r from-emerald-50 to-slate-50'
//               : 'bg-gradient-to-r from-indigo-50 to-slate-50'
//               }`}>
//               <button onClick={() => setShowDetailsModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
//                 <XCircle className="w-5 h-5" />
//               </button>
//               <div className="flex items-center gap-4">
//                 <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold ${selectedMessage.direction === 'incoming'
//                   ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
//                   : 'bg-gradient-to-br from-indigo-500 to-purple-600'
//                   }`}>
//                   {getInitials(selectedMessage.recipient_name)}
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <h2 className="text-xl font-bold text-slate-900">{selectedMessage.recipient_name || 'Unknown'}</h2>
//                     <DirectionBadge direction={selectedMessage.direction} />
//                   </div>
//                   <p className="text-sm text-slate-500">{selectedMessage.recipient_phone}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 space-y-5">
//               {/* Contact Info */}
//               <div>
//                 <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
//                   <User className="w-4 h-4 text-indigo-600" />
//                   Contact Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
//                     <Phone className="w-4 h-4 text-green-600" />
//                     <div>
//                       <p className="text-xs text-slate-500">Phone</p>
//                       <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_phone}</p>
//                     </div>
//                   </div>
//                   {selectedMessage.recipient_email && (
//                     <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
//                       <Mail className="w-4 h-4 text-blue-600" />
//                       <div>
//                         <p className="text-xs text-slate-500">Email</p>
//                         <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_email}</p>
//                       </div>
//                     </div>
//                   )}
//                   {selectedMessage.recipient_location && (
//                     <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
//                       <MapPin className="w-4 h-4 text-red-600" />
//                       <div>
//                         <p className="text-xs text-slate-500">Location</p>
//                         <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_location}</p>
//                       </div>
//                     </div>
//                   )}
//                   {selectedMessage.recipient_occupation && (
//                     <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
//                       <Briefcase className="w-4 h-4 text-purple-600" />
//                       <div>
//                         <p className="text-xs text-slate-500">Occupation</p>
//                         <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_occupation}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Message Details */}
//               <div>
//                 <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
//                   <MessageSquare className="w-4 h-4 text-green-600" />
//                   Message Details
//                 </h3>
//                 <div className="bg-slate-50 rounded-lg p-4 space-y-3">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-xs text-slate-500">Campaign</p>
//                       <p className="text-sm font-medium text-slate-800">{selectedMessage.campaign_name || '—'}</p>
//                     </div>
//                     <StatusBadge status={selectedMessage.status} />
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500">Message</p>
//                     <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
//                       <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     <div className="flex items-center gap-1 text-slate-500">
//                       <Clock className="w-3 h-3" />
//                       <span>{selectedMessage.direction === 'incoming' ? 'Received' : 'Sent'}: {formatDate(selectedMessage.sent_at)}</span>
//                     </div>
//                     {selectedMessage.delivered_at && (
//                       <div className="flex items-center gap-1 text-green-600">
//                         <CheckCheck className="w-3 h-3" />
//                         <span>Delivered: {formatDate(selectedMessage.delivered_at)}</span>
//                       </div>
//                     )}
//                     {selectedMessage.read_at && (
//                       <div className="flex items-center gap-1 text-blue-600">
//                         <CheckCheck className="w-3 h-3" />
//                         <span>Read: {formatDate(selectedMessage.read_at)}</span>
//                       </div>
//                     )}
//                   </div>
//                   {selectedMessage.direction === 'outgoing' && (
//                     <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
//                       <Activity className="w-4 h-4 text-indigo-500" />
//                       <div>
//                         <p className="text-xs text-slate-500">Engagement Score</p>
//                         <div className="flex items-center gap-2">
//                           <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
//                             <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedMessage.engagement_score}%` }} />
//                           </div>
//                           <span className="text-sm font-bold text-indigo-600">{selectedMessage.engagement_score}</span>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {selectedMessage.tags && selectedMessage.tags.length > 0 && (
//                 <div>
//                   <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
//                     <Tag className="w-4 h-4 text-yellow-600" />
//                     Tags
//                   </h3>
//                   <div className="flex flex-wrap gap-1.5">
//                     {selectedMessage.tags.map((tag, idx) => (
//                       <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">{tag}</span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {selectedMessage.error_reason && (
//                 <div className="p-3 bg-red-50 rounded-lg">
//                   <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">Error Reason</p>
//                   <p className="text-sm text-red-700 mt-1">{selectedMessage.error_reason}</p>
//                 </div>
//               )}
//             </div>

//             <div className="border-t border-slate-100 p-4 flex justify-end">
//               <button onClick={() => setShowDetailsModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ added for navigation
import {
  Search, Download, CheckCheck, Check, Clock, XCircle,
  MessageSquare, Eye, User, Phone, Mail, MapPin, Briefcase,
  Tag, Activity, Loader2, ArrowDownLeft, ArrowUpRight
} from 'lucide-react';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString();
};

// Direction badge — shows if message is incoming or outgoing
const DirectionBadge = ({ direction }) => {
  if (direction === 'incoming') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
        <ArrowDownLeft className="w-3 h-3" />
        Received
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
      <ArrowUpRight className="w-3 h-3" />
      Sent
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const displayStatus = status === 'received' ? 'delivered' : status;
  const getStyles = () => {
    switch (status) {
      case 'read': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'sent': return 'bg-amber-100 text-amber-700';
      case 'failed': return 'bg-red-100 text-red-600';
      case 'received': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  const getIcon = () => {
    switch (status) {
      case 'read': return <CheckCheck className="w-3 h-3" />;
      case 'delivered': return <CheckCheck className="w-3 h-3" />;
      case 'sent': return <Check className="w-3 h-3" />;
      case 'failed': return <XCircle className="w-3 h-3" />;
      case 'received': return <CheckCheck className="w-3 h-3" />;;
      default: return <Clock className="w-3 h-3" />;
    }
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getStyles()}`}>
      {getIcon()}
      <span className="capitalize">{displayStatus}</span>
    </span>
  );
};

const getInitials = (name) => {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
};

export default function WhatsAppLogs() {
  const navigate = useNavigate(); // ✅ for back navigation
  const [allMessages, setAllMessages] = useState([]);
  const [stats, setStats] = useState({ total_sent: 0, delivered: 0, read: 0, failed: 0, received: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [directionFilter, setDirectionFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const refreshData = async () => {
    try {
      setLoading(true);
      const logsRes = await fetch("https://wynreach-backend.onrender.com/api/messagelog/");
      const logsData = await logsRes.json();

      let outgoing = [];
      let apiStats = { total_sent: 0, delivered: 0, read: 0, failed: 0, received: 0 };

      if (logsData.success) {
        outgoing = (logsData.messages || []).map(m => ({
          ...m,
          direction: m.direction || 'outgoing',
          status: m.status || 'sent',
        }));
        apiStats = { ...apiStats, ...(logsData.stats || {}) };
      }
      const merged = [...outgoing].sort((a, b) => {
        const da = a.sent_at ? new Date(a.sent_at) : 0;
        const db = b.sent_at ? new Date(b.sent_at) : 0;
        return db - da;
      });

      setAllMessages(merged);
      setStats(apiStats);
    } catch (err) {
      console.error("Failed to fetch message logs:", err);
      setAllMessages([]);
      setStats({ total_sent: 0, delivered: 0, read: 0, failed: 0, received: 0 });
    } finally {
      setLoading(false);
    }
  };

  const messages = useMemo(() => {
    let filtered = [...allMessages];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(m =>
        m.recipient_name?.toLowerCase().includes(q) ||
        m.recipient_phone?.toLowerCase().includes(q) ||
        m.recipient_email?.toLowerCase().includes(q) ||
        m.message?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') filtered = filtered.filter(m => m.status === statusFilter);
    if (directionFilter !== 'all') filtered = filtered.filter(m => m.direction === directionFilter);
    return filtered;
  }, [searchQuery, statusFilter, directionFilter, allMessages]);

  useEffect(() => { setPage(1); }, [searchQuery, statusFilter, directionFilter]);
  useEffect(() => { refreshData(); }, []);

  const exportToCSV = () => {
    if (messages.length === 0) { alert('No messages to export!'); return; }
    const headers = ['ID', 'Direction', 'Recipient Name', 'Phone', 'Message', 'Campaign', 'Status', 'Date'];
    const rows = messages.map(m => [
      m.id,
      m.direction,
      `"${(m.recipient_name || '').replace(/"/g, '""')}"`,
      m.recipient_phone,
      `"${(m.message || '').replace(/"/g, '""')}"`,
      m.campaign_name || '',
      m.status,
      m.sent_at || '',
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `whatsapp_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDetails = (msg) => { setSelectedMessage(msg); setShowDetailsModal(true); };

  const totalPages = Math.max(1, Math.ceil(messages.length / LIMIT));
  const currentPage = Math.min(page, totalPages);
  const paginatedMessages = messages.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);
  const startItem = messages.length === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
  const endItem = Math.min(currentPage * LIMIT, messages.length);

  const pageButtons = () => {
    const btns = [];
    if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) btns.push(i); }
    else {
      btns.push(1);
      if (currentPage > 3) btns.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) btns.push(i);
      if (currentPage < totalPages - 2) btns.push('...');
      btns.push(totalPages);
    }
    return btns;
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER with Back Arrow */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            {/* Back Arrow Button */}
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
              <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.02em]">WhatsApp Message Logs</h1>
              <p className="text-sm text-slate-400 mt-1 font-medium">All sent and received WhatsApp messages</p>
            </div>
          </div>
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: 'Total Sent', value: stats.total_sent },
            { label: 'Delivered', value: stats.delivered, color: 'text-green-600' },
            { label: 'Read', value: stats.read, color: 'text-blue-600' },
            { label: 'Failed', value: stats.failed, color: 'text-red-600' },
            { label: 'Received', value: stats.received, color: 'text-emerald-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color || 'text-slate-900'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, phone, or message..."
                className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-64 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
              {[
                { val: 'all', label: 'All' },
                { val: 'outgoing', label: '↑ Sent' },
                { val: 'incoming', label: '↓ Received' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setDirectionFilter(opt.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${directionFilter === opt.val
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div> */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer"
            >
              <option value="all">All Status</option>
              {/* <option value="received">Received</option> */}
              <option value="read">Read</option>
              <option value="delivered">Delivered</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
            </select>

            <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading messages...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <h3 className="text-base font-medium text-slate-900 mb-1">No messages found</h3>
              <p className="text-sm text-slate-500">
                {searchQuery || statusFilter !== 'all' || directionFilter !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'No messages yet.'}
              </p>
              {(searchQuery || statusFilter !== 'all' || directionFilter !== 'all') && (
                <button
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); setDirectionFilter('all'); }}
                  className="mt-3 text-sm text-indigo-600 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['RECIPIENT', 'CAMPAIGN', 'STATUS', 'DATE', ''].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedMessages.map((msg) => (
                    <tr
                      key={msg.id}
                      className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${msg.direction === 'incoming' ? 'bg-emerald-50/30' : ''
                        }`}
                      onClick={() => openDetails(msg)}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${msg.direction === 'incoming'
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                            : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                            }`}>
                            {getInitials(msg.recipient_name)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm leading-tight">{msg.recipient_name || 'Unknown'}</p>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">{msg.recipient_phone}</p>
                          </div>
                        </div>
                      </td>
                      {/* <td className="px-4 py-3.5">
                        <div className="flex items-start gap-2 max-w-xs">
                          <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-slate-700 line-clamp-2">{msg.message}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <DirectionBadge direction={msg.direction} />
                      </td> */}
                      <td className="px-4 py-3.5 text-sm text-slate-600">{msg.campaign_name || '—'}</td>
                      <td className="px-4 py-3.5"><StatusBadge status={msg.status} /></td>
                      <td className="px-4 py-3.5 text-sm text-slate-500 whitespace-nowrap">{formatDate(msg.sent_at)}</td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); openDetails(msg); }}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-slate-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {messages.length > 0 && !loading && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
              <p className="text-sm text-slate-400 font-medium">
                Showing {startItem}–{endItem} of {messages.length.toLocaleString()} messages
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {pageButtons().map((b, i) =>
                  b === '...' ? (
                    <span key={`dot${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-semibold">…</span>
                  ) : (
                    <button
                      key={b}
                      onClick={() => setPage(b)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${currentPage === b
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                      {b}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className={`relative p-6 rounded-t-2xl border-b border-slate-100 ${selectedMessage.direction === 'incoming'
              ? 'bg-gradient-to-r from-emerald-50 to-slate-50'
              : 'bg-gradient-to-r from-indigo-50 to-slate-50'
              }`}>
              <button onClick={() => setShowDetailsModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold ${selectedMessage.direction === 'incoming'
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  }`}>
                  {getInitials(selectedMessage.recipient_name)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-slate-900">{selectedMessage.recipient_name || 'Unknown'}</h2>
                    <DirectionBadge direction={selectedMessage.direction} />
                  </div>
                  <p className="text-sm text-slate-500">{selectedMessage.recipient_phone}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_phone}</p>
                    </div>
                  </div>
                  {selectedMessage.recipient_email && (
                    <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-slate-500">Email</p>
                        <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_email}</p>
                      </div>
                    </div>
                  )}
                  {selectedMessage.recipient_location && (
                    <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="text-xs text-slate-500">Location</p>
                        <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_location}</p>
                      </div>
                    </div>
                  )}
                  {selectedMessage.recipient_occupation && (
                    <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-xs text-slate-500">Occupation</p>
                        <p className="text-sm font-medium text-slate-800">{selectedMessage.recipient_occupation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Details */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  Message Details
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-slate-500">Campaign</p>
                      <p className="text-sm font-medium text-slate-800">{selectedMessage.campaign_name || '—'}</p>
                    </div>
                    <StatusBadge status={selectedMessage.status} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Message</p>
                    <div className="mt-1 p-3 bg-white rounded-lg border border-slate-200">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{selectedMessage.direction === 'incoming' ? 'Received' : 'Sent'}: {formatDate(selectedMessage.sent_at)}</span>
                    </div>
                    {selectedMessage.delivered_at && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCheck className="w-3 h-3" />
                        <span>Delivered: {formatDate(selectedMessage.delivered_at)}</span>
                      </div>
                    )}
                    {selectedMessage.read_at && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <CheckCheck className="w-3 h-3" />
                        <span>Read: {formatDate(selectedMessage.read_at)}</span>
                      </div>
                    )}
                  </div>
                  {selectedMessage.direction === 'outgoing' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                      <Activity className="w-4 h-4 text-indigo-500" />
                      <div>
                        <p className="text-xs text-slate-500">Engagement Score</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedMessage.engagement_score}%` }} />
                          </div>
                          <span className="text-sm font-bold text-indigo-600">{selectedMessage.engagement_score}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedMessage.tags && selectedMessage.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-yellow-600" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMessage.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedMessage.error_reason && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">Error Reason</p>
                  <p className="text-sm text-red-700 mt-1">{selectedMessage.error_reason}</p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 p-4 flex justify-end">
              <button onClick={() => setShowDetailsModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Search, Download, Mail, CheckCircle, XCircle,
//   Loader2, Upload, RefreshCw
// } from 'lucide-react';

// const API = import.meta.env.VITE_API_BASE_URL;
// const POLLING_INTERVAL = 5000; // Poll every 5 seconds
// const REFRESH_DELAY_AFTER_SEND = 1000;

// const computeStats = (logs) => {

//   const totalSent = logs.length;

//   const delivered = logs.filter(
//     l => l.status === "delivered"
//   ).length;

//   const opened = logs.filter(
//     l => (l.opens || 0) > 0
//   ).length;

//   const clicked = logs.filter(
//     l => (l.clicks || 0) > 0
//   ).length;

//   const bounced = logs.filter(
//     l => l.status === "bounced"
//   ).length;

//   const failed = logs.filter(
//     l => l.status === "failed"
//   ).length;

//   const complaints = logs.filter(
//     l => l.status === "complaint"
//   ).length;

//   const suppressed = logs.filter(
//     l => l.status === "suppressed"
//   ).length;

//   return {
//     total_sent: totalSent,

//     delivered,

//     opened,

//     clicked,

//     bounced,

//     failed,

//     complaints,

//     suppressed,

//     open_rate:
//       totalSent > 0
//         ? ((opened / totalSent) * 100).toFixed(1)
//         : "0.0",

//     click_rate:
//       totalSent > 0
//         ? ((clicked / totalSent) * 100).toFixed(1)
//         : "0.0",

//     bounce_rate:
//       totalSent > 0
//         ? ((bounced / totalSent) * 100).toFixed(1)
//         : "0.0",

//     complaint_rate:
//       totalSent > 0
//         ? ((complaints / totalSent) * 100).toFixed(1)
//         : "0.0",
//   };
// };

// const StatusBadge = ({ status }) => {
//   const getStyles = () => {
//     switch (status) {
//       case 'delivered': return 'bg-green-100 text-green-700';
//       case 'opened': return 'bg-blue-100 text-blue-700';
//       case 'clicked': return 'bg-blue-100 text-blue-700';
//       case 'bounced': return 'bg-red-100 text-red-600';
//       case 'failed': return 'bg-orange-100 text-orange-700';
//       case 'complaint': return 'bg-red-200 text-red-800';
//       case 'suppressed': return 'bg-gray-200 text-gray-700';
//       default: return 'bg-amber-100 text-amber-700';
//     }
//   };
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getStyles()}`}>
//       <span className="w-1.5 h-1.5 rounded-full bg-current" />
//       <span className="capitalize">{status}</span>
//     </span>
//   );
// };

// export default function EmailLogs() {
//   const navigate = useNavigate(); // ✅ for back navigation
//   const [logs, setLogs] = useState([]);
//   const [stats, setStats] = useState({ total_sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, failed: 0 });
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [selectedLog, setSelectedLog] = useState(null);
//   const [page, setPage] = useState(1);
//   const [lastRefresh, setLastRefresh] = useState(null);
//   const LIMIT = 10;

//   // Use refs to track polling and abort controller
//   const pollingIntervalRef = useRef(null);
//   const abortControllerRef = useRef(new AbortController());

//   const fetchLogs = async (isAutoRefresh = false) => {
//     // Don't show loading spinner for auto-refresh (polling)
//     if (!isAutoRefresh) {
//       setIsRefreshing(true);
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const signal = abortControllerRef.current.signal;

//       const res = await fetch(`${API}/email-logs/`, {
//         headers: { Authorization: `Bearer ${token}` },
//         signal, // Abort previous request if new one starts
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setLogs(data);
//         setStats(computeStats(data));
//         setLastRefresh(new Date().toLocaleTimeString());
//       } else {
//         setLogs([]);
//         setStats({ total_sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, failed: 0 });
//       }
//     } catch (e) {
//       // Only log if not an abort error
//       if (e.name !== 'AbortError') {
//         console.error('Error fetching logs:', e);
//       }
//     } finally {
//       setLoading(false);
//       if (!isAutoRefresh) {
//         setIsRefreshing(false);
//       }
//     }
//   };

//   // Start polling on component mount
//   useEffect(() => {
//     // Initial fetch
//     fetchLogs(false);

//     // Set up polling interval
//     pollingIntervalRef.current = setInterval(() => {
//       fetchLogs(true); // true = isAutoRefresh
//     }, POLLING_INTERVAL);

//     // Cleanup on unmount
//     return () => {
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current);
//       }
//       // Abort any pending requests
//       abortControllerRef.current.abort();
//     };
//   }, []);

//   // Create new AbortController when dependencies change
//   useEffect(() => {
//     return () => {
//       abortControllerRef.current.abort();
//       abortControllerRef.current = new AbortController();
//     };
//   }, []);

//   // Manual refresh handler
//   const handleManualRefresh = () => {
//     // Reset abort controller for fresh request
//     abortControllerRef.current.abort();
//     abortControllerRef.current = new AbortController();
//     fetchLogs(false);
//   };

//   const filteredLogs = logs.filter(log => {
//     const matchesSearch = !searchQuery ||
//       log.recipient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       log.recipient_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       log.subject?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const totalPages = Math.max(1, Math.ceil(filteredLogs.length / LIMIT));
//   const currentPage = Math.min(page, totalPages);
//   const paginatedLogs = filteredLogs.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

//   const exportToCSV = () => {
//     if (filteredLogs.length === 0) { alert('No data to export!'); return; }
//     const headers = ['ID', 'Recipient Name', 'Email', 'Subject', 'Template', 'Status', 'Opens', 'Clicks', 'Sent At'];
//     const rows = filteredLogs.map(log => [
//       log.id, `"${log.recipient_name || ''}"`, log.recipient_email,
//       `"${log.subject || ''}"`, log.template_name || '', log.status,
//       log.opens || 0, log.clicks || 0, log.sent_at || ''
//     ]);
//     const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
//     const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `email_logs_${new Date().toISOString().slice(0, 10)}.csv`;
//     document.body.appendChild(link); link.click(); document.body.removeChild(link);
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—';
//     return new Date(dateStr).toLocaleString();
//   };

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
//         {/* Header with Back Arrow */}
//         <div className="flex flex-wrap justify-between items-start gap-4">
//           <div className="flex items-center gap-3">
//             {/* Back Arrow Button */}
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
//               aria-label="Back to Dashboard"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2.5}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>
//             <div>
//               <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-[-0.02em]">Email Logs</h1>
//               <p className="text-sm text-slate-400 mt-1 font-medium">View email delivery logs and analytics</p>
//               {lastRefresh && <p className="text-xs text-slate-400 mt-2">Last updated: {lastRefresh}</p>}
//             </div>
//             <div className="flex gap-2.5">
//               <button
//                 onClick={handleManualRefresh}
//                 disabled={isRefreshing}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
//               >
//                 <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//                 {isRefreshing ? 'Refreshing...' : 'Refresh'}
//               </button>
//               <button onClick={exportToCSV} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition">
//                 <Download className="w-4 h-4" /> Export CSV
//               </button>
//             </div>

//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
//           {[
//             { label: 'Total Sent', value: stats.total_sent },
//             { label: 'Delivered', value: stats.delivered, color: 'text-emerald-600' },
//             { label: 'Opened', value: stats.opened, color: 'text-blue-600' },
//             { label: 'Clicked', value: stats.clicked, color: 'text-blue-600' },
//             { label: 'Open Rate', value: `${stats.open_rate}%` },
//             { label: 'Click Rate', value: `${stats.click_rate}%` },
//             { label: 'Bounced', value: stats.bounced, color: 'text-red-600' },
//             { label: 'Failed', value: stats.failed, color: 'text-orange-600' },
//             { label: 'Complaint Rate', value: `${stats.complaint_rate}%` },
//           ].map((stat) => (
//             <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
//               <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
//               <p className={`text-2xl font-bold ${stat.color || 'text-slate-900'}`}>{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
//           <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 border-b border-slate-100">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
//                 placeholder="Search by name, email, or subject..."
//                 className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none w-64 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
//             </div>
//             <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
//               className="py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-pointer">
//               <option value="all">All Status</option>
//               <option value="sent">Sent</option>
//               <option value="delivered">Delivered</option>
//               <option value="opened">Opened</option>
//               <option value="clicked">Clicked</option>
//               <option value="bounced">Bounced</option>
//               <option value="complaint">Complaint</option>
//               <option value="failed">Failed</option>
//               <option value="suppressed">Suppressed</option>
//             </select>
//             <span className="ml-auto text-xs text-slate-400 font-medium">Page {currentPage} · {LIMIT} per page</span>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
//               <Loader2 className="w-5 h-5 animate-spin" /><span>Loading email logs...</span>
//             </div>
//           ) : filteredLogs.length === 0 ? (
//             <div className="text-center py-16">
//               <Mail className="w-12 h-12 mx-auto text-slate-400 mb-3" />
//               <h3 className="text-base font-medium text-slate-900 mb-1">No email logs found</h3>
//               <p className="text-sm text-slate-500">
//                 {searchQuery || statusFilter !== 'all' ? 'Try adjusting your search or filter.' : 'No emails have been sent yet.'}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm border-collapse">
//                 <thead>
//                   <tr className="border-b border-slate-100 bg-slate-50">
//                     {['RECIPIENT', 'SUBJECT', 'TEMPLATE', 'STATUS', 'ENGAGEMENT', 'SENT AT'].map((h) => (
//                       <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 tracking-wider uppercase whitespace-nowrap">{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedLogs.map((log) => (
//                     <tr key={log.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedLog(log)}>
//                       <td className="px-4 py-3.5">
//                         <p className="font-bold text-slate-800 text-sm">{log.recipient_name}</p>
//                         <p className="text-xs text-slate-400">{log.recipient_email}</p>
//                       </td>
//                       <td className="px-4 py-3.5">
//                         <div className="flex items-start gap-2 max-w-xs">
//                           <Mail className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
//                           <p className="text-sm text-slate-700 line-clamp-2">{log.subject}</p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3.5 text-sm text-slate-600">{log.template_name || '—'}</td>
//                       <td className="px-4 py-3.5"><StatusBadge status={log.status} /></td>
//                       <td className="px-4 py-3.5">
//                         <span className="text-sm text-slate-700">{log.opens || 0} opens</span>
//                         <span className="text-slate-400 mx-1">·</span>
//                         <span className="text-sm text-slate-700">{log.clicks || 0} clicks</span>
//                       </td>
//                       <td className="px-4 py-3.5 text-sm text-slate-500">{formatDate(log.sent_at)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {filteredLogs.length > 0 && !loading && (
//             <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 bg-slate-50">
//               <p className="text-sm text-slate-400 font-medium">Showing {filteredLogs.length} logs</p>
//               <div className="flex items-center gap-1">
//                 <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
//                   className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40">
//                   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                 </button>
//                 {pageButtons().map((b, i) => b === '...' ? (
//                   <span key={`dot${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400">…</span>
//                 ) : (
//                   <button key={b} onClick={() => setPage(b)}
//                     className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${currentPage === b ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}>
//                     {b}
//                   </button>
//                 ))}
//                 <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
//                   className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-40">
//                   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Detail Modal */}
//       {selectedLog && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedLog(null)}>
//           <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//             <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
//               <button onClick={() => setSelectedLog(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XCircle className="w-5 h-5" /></button>
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
//                   {selectedLog.recipient_name?.charAt(0) || '?'}
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-slate-900">{selectedLog.recipient_name}</h2>
//                   <p className="text-sm text-slate-500">{selectedLog.recipient_email}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   { label: 'Subject', value: selectedLog.subject },
//                   { label: 'Template', value: selectedLog.template_name || '—' },
//                   { label: 'Sent At', value: formatDate(selectedLog.sent_at) },
//                   { label: 'Opens', value: selectedLog.opens || 0 },
//                   { label: 'Clicks', value: selectedLog.clicks || 0 },
//                   { label: 'Opened At', value: selectedLog?.opened_at ? formatDate(selectedLog.opened_at) : "-" },
//                   { label: 'Clicked At', value: selectedLog?.clicked_at ? formatDate(selectedLog.clicked_at) : "-" },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="bg-slate-50 rounded-lg p-3">
//                     <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
//                     <p className="text-sm font-medium text-slate-800 mt-1">{value}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="bg-slate-50 rounded-lg p-3">
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</p>
//                 <div className="mt-1"><StatusBadge status={selectedLog.status} /></div>
//               </div>
//             </div>
//             <div className="border-t border-slate-100 p-4 flex justify-end">
//               <button onClick={() => setSelectedLog(null)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition">Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Download, Mail, CheckCircle, XCircle,
  Loader2, RefreshCw, Clock, ArrowLeft
} from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;
const POLLING_INTERVAL = 5000;

const computeStats = (logs) => {
  const totalSent = logs.length;
  const delivered = logs.filter(l => l.status === "delivered").length;
  const opened = logs.filter(l => (l.opens || 0) > 0).length;
  const clicked = logs.filter(l => (l.clicks || 0) > 0).length;
  const bounced = logs.filter(l => l.status === "bounced").length;
  const failed = logs.filter(l => l.status === "failed").length;
  const complaints = logs.filter(l => l.status === "complaint").length;
  const suppressed = logs.filter(l => l.status === "suppressed").length;

  return {
    total_sent: totalSent,
    delivered,
    opened,
    clicked,
    bounced,
    failed,
    complaints,
    suppressed,
    open_rate: totalSent > 0 ? ((opened / totalSent) * 100).toFixed(1) : "0.0",
    click_rate: totalSent > 0 ? ((clicked / totalSent) * 100).toFixed(1) : "0.0",
    bounce_rate: totalSent > 0 ? ((bounced / totalSent) * 100).toFixed(1) : "0.0",
    complaint_rate: totalSent > 0 ? ((complaints / totalSent) * 100).toFixed(1) : "0.0",
  };
};

const StatusBadge = ({ status }) => {
  const styles = {
    delivered: 'bg-emerald-100 text-emerald-700',
    opened: 'bg-blue-100 text-blue-700',
    clicked: 'bg-indigo-100 text-indigo-700',
    bounced: 'bg-red-100 text-red-600',
    failed: 'bg-orange-100 text-orange-700',
    complaint: 'bg-rose-100 text-rose-700',
    suppressed: 'bg-gray-100 text-gray-600',
    sent: 'bg-amber-100 text-amber-700',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="capitalize">{status}</span>
    </span>
  );
};

export default function EmailLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ total_sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, failed: 0, complaints: 0, complaint_rate: '0.0' });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);
  const [page, setPage] = useState(1);
  const [lastRefresh, setLastRefresh] = useState(null);
  const LIMIT = 10;

  const pollingIntervalRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  const fetchLogs = async (isAutoRefresh = false) => {
    if (!isAutoRefresh) setIsRefreshing(true);
    try {
      const token = localStorage.getItem('token');
      const signal = abortControllerRef.current.signal;
      const res = await fetch(`${API}/email-logs/`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
        setStats(computeStats(data));
        setLastRefresh(new Date().toLocaleTimeString());
      } else {
        setLogs([]);
        setStats({ total_sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, failed: 0, complaints: 0, complaint_rate: '0.0' });
      }
    } catch (e) {
      if (e.name !== 'AbortError') console.error('Error fetching logs:', e);
    } finally {
      setLoading(false);
      if (!isAutoRefresh) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs(false);
    pollingIntervalRef.current = setInterval(() => fetchLogs(true), POLLING_INTERVAL);
    return () => {
      clearInterval(pollingIntervalRef.current);
      abortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
    };
  }, []);

  const handleManualRefresh = () => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    fetchLogs(false);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !searchQuery ||
      log.recipient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recipient_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / LIMIT));
  const currentPage = Math.min(page, totalPages);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

  const exportToCSV = () => {
    if (filteredLogs.length === 0) { alert('No data to export!'); return; }
    const headers = ['ID', 'Recipient Name', 'Email', 'Subject', 'Template', 'Status', 'Opens', 'Clicks', 'Sent At'];
    const rows = filteredLogs.map(log => [
      log.id, `"${log.recipient_name || ''}"`, log.recipient_email,
      `"${log.subject || ''}"`, log.template_name || '', log.status,
      log.opens || 0, log.clicks || 0, log.sent_at || ''
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `email_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString();
  };

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

  // Stats configuration – plain cards, no icons or colors
  const statItems = [
    { label: 'Total Sent', value: stats.total_sent },
    { label: 'Delivered', value: stats.delivered },
    { label: 'Opened', value: stats.opened },
    { label: 'Clicked', value: stats.clicked },
    { label: 'Bounced', value: stats.bounced },
    { label: 'Failed', value: stats.failed },
    { label: 'Complaint Rate', value: `${stats.complaint_rate}%` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md border border-slate-200/50"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Email Logs</h1>
              <p className="text-sm text-slate-500 mt-0.5 font-medium">Track delivery and engagement of your emails</p>
              {lastRefresh && (
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Updated {lastRefresh}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards – Plain, no icons/colors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Table Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                placeholder="Search by name, email, or subject..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/60 bg-slate-50/50 transition"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="py-2.5 pl-4 pr-9 text-sm border border-slate-200 rounded-xl bg-slate-50/50 text-slate-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="bounced">Bounced</option>
              <option value="complaint">Complaint</option>
              <option value="failed">Failed</option>
              <option value="suppressed">Suppressed</option>
            </select>
            <span className="ml-auto text-xs text-slate-400 font-medium whitespace-nowrap">
              Page {currentPage} · {LIMIT} per page
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
              <span className="font-medium">Loading email logs...</span>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-20">
              <Mail className="w-14 h-14 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-1">No email logs found</h3>
              <p className="text-sm text-slate-500">
                {searchQuery || statusFilter !== 'all' ? 'Try adjusting your search or filter.' : 'No emails have been sent yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80">
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Recipient</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Template</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Engagement</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Sent At</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-indigo-50/30 transition-colors cursor-pointer group"
                      onClick={() => setSelectedLog(log)}
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">{log.recipient_name || '—'}</p>
                        <p className="text-xs text-slate-400">{log.recipient_email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-2 max-w-xs">
                          <Mail className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-slate-700 line-clamp-2">{log.subject || '—'}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{log.template_name || '—'}</td>
                      <td className="px-5 py-4"><StatusBadge status={log.status} /></td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-700">{log.opens || 0} opens</span>
                        <span className="text-slate-300 mx-1.5">·</span>
                        <span className="text-sm text-slate-700">{log.clicks || 0} clicks</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">{formatDate(log.sent_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredLogs.length > 0 && !loading && (
            <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 bg-slate-50/60">
              <p className="text-sm text-slate-500 font-medium">Showing {filteredLogs.length} logs</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {pageButtons().map((b, i) => b === '...' ? (
                  <span key={`dot${i}`} className="w-9 h-9 flex items-center justify-center text-xs text-slate-400">…</span>
                ) : (
                  <button
                    key={b}
                    onClick={() => setPage(b)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl border text-xs font-bold transition-all ${currentPage === b ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}
                  >
                    {b}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedLog(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/60" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-200/60">
              <button
                onClick={() => setSelectedLog(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  {selectedLog.recipient_name?.charAt(0) || '?'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedLog.recipient_name || 'Unknown'}</h2>
                  <p className="text-sm text-slate-500">{selectedLog.recipient_email}</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Subject', value: selectedLog.subject || '—' },
                  { label: 'Template', value: selectedLog.template_name || '—' },
                  { label: 'Sent At', value: formatDate(selectedLog.sent_at) },
                  { label: 'Opens', value: selectedLog.opens || 0 },
                  { label: 'Clicks', value: selectedLog.clicks || 0 },
                  { label: 'Opened At', value: selectedLog?.opened_at ? formatDate(selectedLog.opened_at) : '—' },
                  { label: 'Clicked At', value: selectedLog?.clicked_at ? formatDate(selectedLog.clicked_at) : '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-medium text-slate-800 mt-1 truncate">{value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</p>
                <div className="mt-1"><StatusBadge status={selectedLog.status} /></div>
              </div>
            </div>
            <div className="border-t border-slate-100 p-4 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
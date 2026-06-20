

// // import { getCampaignLogs } from '../services/api/campaignApi';

// import { useEffect, useMemo, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { getCampaignLogs } from '../services/api/campaignApi';

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// const formatDateTime = (value) => {
//   if (!value) return '—';

//   try {
//     return new Date(value).toLocaleString();
//   } catch {
//     return '—';
//   }
// };

// const formatNumber = (value) => {
//   if (value === undefined || value === null) return '0';
//   return Number(value).toLocaleString();
// };

// const statusStyles = {
//   sent: 'bg-blue-50 text-blue-700',
//   delivered: 'bg-emerald-50 text-emerald-700',
//   opened: 'bg-sky-50 text-sky-700',
//   clicked: 'bg-indigo-50 text-indigo-700',
//   failed: 'bg-red-50 text-red-700',
//   bounced: 'bg-orange-50 text-orange-700',
//   pending: 'bg-slate-100 text-slate-700',
//   unsubscribed: 'bg-rose-50 text-rose-700',
// };

// const Button = ({ children, onClick, variant = 'secondary' }) => {
//   const variants = {
//     secondary:
//       'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700',
//     primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
//         variants[variant]
//       )}
//     >
//       {children}
//     </button>
//   );
// };

// const MetricCard = ({ title, value, accent }) => {
//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl p-5">
//       <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-2">
//         {title}
//       </p>

//       <p className={cn('text-3xl font-bold', accent)}>
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// };

// const StatusBadge = ({ status }) => {
//   return (
//     <span
//       className={cn(
//         'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
//         statusStyles[status] || 'bg-slate-100 text-slate-700'
//       )}
//     >
//       {status || 'unknown'}
//     </span>
//   );
// };

// export default function CampaignLogsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [campaign, setCampaign] = useState(null);
//   const [logs, setLogs] = useState([]);
//   const [summary, setSummary] = useState({});

//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);

//   const ITEMS_PER_PAGE = 25;

//   useEffect(() => {
//     fetchCampaignLogs();
//   }, [id]);

//   async function fetchCampaignLogs() {
//     try {
//       setLoading(true);

//       const data = await getCampaignLogs(id);

//       console.log('CAMPAIGN LOGS RESPONSE:', data);

//       setCampaign(data.campaign || null);
//       setLogs(data.logs || []);

//       setSummary(
//         data.summary || {
//           total: 0,
//           sent: 0,
//           delivered: 0,
//           opened: 0,
//           clicked: 0,
//           failed: 0,
//           bounced: 0,
//           unsubscribed: 0,
//         }
//       );
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to load campaign logs');
//     } finally {
//       setLoading(false);
//     }
//   }

//   const filteredLogs = useMemo(() => {
//     let filtered = [...logs];

//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(
//         (log) =>
//           log.status?.toLowerCase() === statusFilter.toLowerCase()
//       );
//     }

//     if (search.trim()) {
//       const query = search.toLowerCase();

//       filtered = filtered.filter(
//         (log) =>
//           log.contactName?.toLowerCase().includes(query) ||
//           log.email?.toLowerCase().includes(query) ||
//           log.phone?.toLowerCase().includes(query)
//       );
//     }

//     return filtered;
//   }, [logs, search, statusFilter]);

//   const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);

//   const paginatedLogs = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;

//     return filteredLogs.slice(start, end);
//   }, [filteredLogs, currentPage]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, statusFilter]);

//   const exportCSV = () => {
//     const headers = [
//       'Contact Name',
//       'Email',
//       'Phone',
//       'Status',
//       'Failure Reason',
//       'Sent At',
//       'Delivered At',
//       'Opened At',
//       'Clicked At',
//       'Open Count',
//       'Device',
//       'Browser',
//       'Country',
//     ];

//     const rows = filteredLogs.map((log) => [
//       log.contactName || '',
//       log.email || '',
//       log.phone || '',
//       log.status || '',
//       log.failureReason || '',
//       formatDateTime(log.sentAt),
//       formatDateTime(log.deliveredAt),
//       formatDateTime(log.openedAt),
//       formatDateTime(log.clickedAt),
//       log.openCount || 0,
//       log.device || '',
//       log.browser || '',
//       log.country || '',
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) => row.join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], {
//       type: 'text/csv;charset=utf-8;',
//     });

//     const url = URL.createObjectURL(blob);

//     const link = document.createElement('a');

//     link.href = url;
//     link.download = `campaign-logs-${id}.csv`;

//     link.click();
//   };

//   if (loading) {
//     return (
//       <div className="p-6 space-y-4">
//         <div className="h-8 w-60 bg-slate-100 rounded animate-pulse" />
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={index}
//               className="h-28 bg-slate-100 rounded-2xl animate-pulse"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       <div className="flex items-center justify-between gap-4 mb-6">
//         <div>
//           <button
//             onClick={() => navigate('/campaigns')}
//             className="text-sm text-slate-500 hover:text-slate-700 mb-2"
//           >
//             ← Back to Campaigns
//           </button>

//           <h1 className="text-3xl font-bold text-slate-900">
//             Campaign Logs
//           </h1>

//           <p className="text-sm text-slate-500 mt-1">
//             {campaign?.campaign_name || 'Campaign'}
//           </p>
//         </div>

//         <Button variant="primary" onClick={exportCSV}>
//           Export CSV
//         </Button>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <MetricCard
//           title="Total Audience"
//           value={summary.total}
//           accent="text-slate-900"
//         />

//         <MetricCard
//           title="Sent"
//           value={summary.sent}
//           accent="text-blue-700"
//         />

//         <MetricCard
//           title="Delivered"
//           value={summary.delivered}
//           accent="text-emerald-700"
//         />

//         <MetricCard
//           title="Opened"
//           value={summary.opened}
//           accent="text-sky-700"
//         />

//         <MetricCard
//           title="Clicked"
//           value={summary.clicked}
//           accent="text-indigo-700"
//         />

//         <MetricCard
//           title="Failed"
//           value={summary.failed}
//           accent="text-red-700"
//         />

//         <MetricCard
//           title="Bounced"
//           value={summary.bounced}
//           accent="text-orange-700"
//         />

//         <MetricCard
//           title="Unsubscribed"
//           value={summary.unsubscribed}
//           accent="text-rose-700"
//         />
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
//         <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
//           <input
//             type="text"
//             placeholder="Search by name, email or phone"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full lg:w-80 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <div className="flex flex-wrap gap-2">
//             {[
//               'all',
//               'sent',
//               'delivered',
//               'opened',
//               'clicked',
//               'failed',
//               'bounced',
//               'pending',
//               'unsubscribed',
//             ].map((status) => (
//               <button
//                 key={status}
//                 onClick={() => setStatusFilter(status)}
//                 className={cn(
//                   'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors capitalize',
//                   statusFilter === status
//                     ? 'bg-indigo-600 text-white'
//                     : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
//                 )}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-slate-50 border-b border-slate-200">
//               <tr>
//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Contact
//                 </th>

//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Status
//                 </th>

//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Failure Reason
//                 </th>

//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Sent At
//                 </th>

//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Opened At
//                 </th>

//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Clicked At
//                 </th>

//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Opens
//                 </th>

//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Device
//                 </th>

//                 <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
//                   Country
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedLogs.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="9"
//                     className="text-center py-12 text-slate-400"
//                   >
//                     No logs found
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedLogs.map((log, index) => (
//                   <tr
//                     key={log.id || index}
//                     className="border-b border-slate-100 hover:bg-slate-50"
//                   >
//                     <td className="px-4 py-4">
//                       <div>
//                         <p className="font-semibold text-slate-900">
//                           {log.contactName || 'Unknown'}
//                         </p>

//                         <p className="text-xs text-slate-500">
//                           {log.email || '—'}
//                         </p>

//                         <p className="text-xs text-slate-400">
//                           {log.phone || '—'}
//                         </p>
//                       </div>
//                     </td>

//                     <td className="px-4 py-4">
//                       <StatusBadge status={log.status} />
//                     </td>

//                     <td className="px-4 py-4 text-red-600 text-xs max-w-[220px]">
//                       {log.failureReason || '—'}
//                     </td>

//                     <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
//                       {formatDateTime(log.sentAt)}
//                     </td>

//                     <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
//                       {formatDateTime(log.openedAt)}
//                     </td>

//                     <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
//                       {formatDateTime(log.clickedAt)}
//                     </td>

//                     <td className="px-4 py-4 font-semibold text-slate-800">
//                       {log.openCount || 0}
//                     </td>

//                     <td className="px-4 py-4 text-slate-600">
//                       <div>
//                         <p>{log.device || '—'}</p>
//                         <p className="text-xs text-slate-400">
//                           {log.browser || '—'}
//                         </p>
//                       </div>
//                     </td>

//                     <td className="px-4 py-4 text-slate-600">
//                       {log.country || '—'}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 py-4 border-t border-slate-200 bg-slate-50">
//           <p className="text-sm text-slate-500">
//             Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
//             {Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length)} of{' '}
//             {filteredLogs.length} contacts
//           </p>

//           <div className="flex items-center gap-2">
//             <Button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             >
//               Previous
//             </Button>

//             <span className="text-sm font-medium text-slate-700 px-2">
//               Page {currentPage} of {totalPages || 1}
//             </span>

//             <Button
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   Math.min(prev + 1, totalPages)
//                 )
//               }
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCampaignLogs } from '../services/api/campaignApi';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const formatDateTime = (value) => {
  if (!value) return '—';

  try {
    return new Date(value).toLocaleString();
  } catch {
    return '—';
  }
};

const formatNumber = (value) => {
  if (value === undefined || value === null) return '0';
  return Number(value).toLocaleString();
};

const statusStyles = {
  sent: 'bg-blue-50 text-blue-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  opened: 'bg-sky-50 text-sky-700',
  clicked: 'bg-indigo-50 text-indigo-700',
  failed: 'bg-red-50 text-red-700',
  bounced: 'bg-orange-50 text-orange-700',
  pending: 'bg-slate-100 text-slate-700',
  unsubscribed: 'bg-rose-50 text-rose-700',
};

const Button = ({ children, onClick, variant = 'secondary' }) => {
  const variants = {
    secondary:
      'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700',
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        variants[variant]
      )}
    >
      {children}
    </button>
  );
};

const MetricCard = ({ title, value, accent }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-2">
        {title}
      </p>

      <p className={cn('text-3xl font-bold', accent)}>
        {formatNumber(value)}
      </p>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
        statusStyles[status] || 'bg-slate-100 text-slate-700'
      )}
    >
      {status || 'unknown'}
    </span>
  );
};

export default function CampaignLogsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState({});

  // const dummyLogs = [
  //   {
  //     id: 1,
  //     contactName: 'John Doe',
  //     email: 'john@example.com',
  //     phone: '+91 9876543210',
  //     status: 'opened',
  //     failureReason: '',
  //     sentAt: '2026-05-11T10:00:00Z',
  //     deliveredAt: '2026-05-11T10:01:00Z',
  //     openedAt: '2026-05-11T10:05:00Z',
  //     clickedAt: '2026-05-11T10:06:00Z',
  //     openCount: 3,
  //     device: 'Mobile',
  //     browser: 'Chrome',
  //     country: 'India',
  //   },
  //   {
  //     id: 2,
  //     contactName: 'Sarah Wilson',
  //     email: 'sarah@example.com',
  //     phone: '+91 9123456780',
  //     status: 'failed',
  //     failureReason: 'Invalid email address',
  //     sentAt: '2026-05-11T10:00:00Z',
  //     deliveredAt: '',
  //     openedAt: '',
  //     clickedAt: '',
  //     openCount: 0,
  //     device: '',
  //     browser: '',
  //     country: 'USA',
  //   },
  //   {
  //     id: 3,
  //     contactName: 'Alex Johnson',
  //     email: 'alex@example.com',
  //     phone: '+91 9988776655',
  //     status: 'clicked',
  //     failureReason: '',
  //     sentAt: '2026-05-11T10:00:00Z',
  //     deliveredAt: '2026-05-11T10:01:00Z',
  //     openedAt: '2026-05-11T10:03:00Z',
  //     clickedAt: '2026-05-11T10:07:00Z',
  //     openCount: 5,
  //     device: 'Desktop',
  //     browser: 'Firefox',
  //     country: 'Canada',
  //   },
  // ];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    fetchCampaignLogs();
  }, [id]);

  async function fetchCampaignLogs() {
    try {
      setLoading(true);

      const data = await getCampaignLogs(id);

      console.log('CAMPAIGN LOGS RESPONSE:', data);

      setCampaign(data.campaign || null);
      setLogs(data.logs || []);

      setSummary(
  data.summary || {
    total: 0,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    failed: 0,
    bounced: 0,
    unsubscribed: 0,
  }
);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load campaign logs');
    } finally {
      setLoading(false);
    }
  }

  const filteredLogs = useMemo(() => {
    let filtered = [...logs];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (log) =>
          log.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      filtered = filtered.filter(
        (log) =>
          log.contactName?.toLowerCase().includes(query) ||
          log.email?.toLowerCase().includes(query) ||
          log.phone?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [logs, search, statusFilter]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return filteredLogs.slice(start, end);
  }, [filteredLogs, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const exportCSV = () => {
    const headers = [
      'Contact Name',
      'Email',
      'Phone',
      'Status',
      'Failure Reason',
      'Sent At',
      'Delivered At',
      'Opened At',
      'Clicked At',
      'Open Count',
      'Device',
      'Browser',
      'Country',
    ];

    const rows = filteredLogs.map((log) => [
      log.contactName || '',
      log.email || '',
      log.phone || '',
      log.status || '',
      log.failureReason || '',
      formatDateTime(log.sentAt),
      formatDateTime(log.deliveredAt),
      formatDateTime(log.openedAt),
      formatDateTime(log.clickedAt),
      log.openCount || 0,
      log.device || '',
      log.browser || '',
      log.country || '',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = `campaign-logs-${id}.csv`;

    link.click();
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-60 bg-slate-100 rounded animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-28 bg-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={() => navigate('/campaigns')}
            className="text-sm text-slate-500 hover:text-slate-700 mb-2"
          >
            ← Back to Campaigns
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            Campaign Logs
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            {campaign?.campaign_name || 'Campaign'}
          </p>
        </div>

        <Button variant="primary" onClick={exportCSV}>
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Audience"
          value={summary.total}
          accent="text-slate-900"
        />

        <MetricCard
          title="Sent"
          value={summary.sent}
          accent="text-blue-700"
        />

        <MetricCard
          title="Delivered"
          value={summary.delivered}
          accent="text-emerald-700"
        />

        <MetricCard
          title="Opened"
          value={summary.opened}
          accent="text-sky-700"
        />

        <MetricCard
          title="Clicked"
          value={summary.clicked}
          accent="text-indigo-700"
        />

        <MetricCard
          title="Failed"
          value={summary.failed}
          accent="text-red-700"
        />

        <MetricCard
          title="Bounced"
          value={summary.bounced}
          accent="text-orange-700"
        />

        <MetricCard
          title="Unsubscribed"
          value={summary.unsubscribed}
          accent="text-rose-700"
        />
      </div>
      

      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <input
            type="text"
            placeholder="Search by name, email or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-80 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex flex-wrap gap-2">
            {[
              'all',
              'sent',
              'delivered',
              'opened',
              'clicked',
              'failed',
              'bounced',
              'pending',
              'unsubscribed',
            ].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors capitalize',
                  statusFilter === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Contact
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Status
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Failure Reason
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Sent At
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Opened At
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Clicked At
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Opens
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Device
                </th>

                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase text-xs">
                  Country
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-12 text-slate-400"
                  >
                    No logs found
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log, index) => (
                  <tr
                    key={log.id || index}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {log.contactName || 'Unknown'}
                        </p>

                        <p className="text-xs text-slate-500">
                          {log.email || '—'}
                        </p>

                        <p className="text-xs text-slate-400">
                          {log.phone || '—'}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={log.status} />
                    </td>

                    <td className="px-4 py-4 text-red-600 text-xs max-w-[220px]">
                      {log.failureReason || '—'}
                    </td>

                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {formatDateTime(log.sentAt)}
                    </td>

                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {formatDateTime(log.openedAt)}
                    </td>

                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                      {formatDateTime(log.clickedAt)}
                    </td>

                    <td className="px-4 py-4 font-semibold text-slate-800">
                      {log.openCount || 0}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      <div>
                        <p>{log.device || '—'}</p>
                        <p className="text-xs text-slate-400">
                          {log.browser || '—'}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {log.country || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 py-4 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length)} of{' '}
            {filteredLogs.length} contacts
          </p>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>

            <span className="text-sm font-medium text-slate-700 px-2">
              Page {currentPage} of {totalPages || 1}
            </span>

            <Button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

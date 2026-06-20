// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { FileUp } from 'lucide-react';
// // import { subDays, format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

// // const API_BASE = 'https://wynreach-backend.onrender.com/api';

// // const getAuthToken = () => {
// //   const auth = localStorage.getItem('wynreach-auth');
// //   if (auth) {
// //     try {
// //       const parsed = JSON.parse(auth);
// //       return parsed.accessToken || parsed.state?.accessToken;
// //     } catch (e) { return null; }
// //   }
// //   return null;
// // };

// // const cn = (...classes) => classes.filter(Boolean).join(' ');
// // const formatNumber = (num) => {
// //   if (num === undefined || num === null) return '—';
// //   if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
// //   if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
// //   return num.toLocaleString();
// // };
// // const formatPercent = (value) => {
// //   if (value === undefined || value === null) return '—';
// //   return `${Number(value).toFixed(1)}%`;
// // };

// // const ChevronUpIcon = () => (
// //   <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
// //   </svg>
// // );
// // const ChevronDownIcon = () => (
// //   <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
// //   </svg>
// // );

// // const Button = ({ children, variant, leftIcon, onClick, disabled, loading }) => {
// //   const base = "inline-flex items-center gap-2 rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
// //   const variants = {
// //     primary: "bg-indigo-600 text-white hover:bg-indigo-700",
// //     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
// //   };
// //   return (
// //     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, "px-3 py-2 text-sm flex items-center justify-center")}>
// //       {loading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
// //       {leftIcon && !loading && leftIcon}
// //       {children}
// //     </button>
// //   );
// // };

// // const PeriodTabs = ({ period, setPeriod, setShowCustomPicker }) => {
// //   const tabs = [
// //     { label: 'Today', value: 'today' },
// //     { label: 'Yesterday', value: 'yesterday' },
// //     { label: 'This week', value: 'this-week' },
// //     { label: 'Last 30 days', value: '30' },
// //     { label: 'Last 90 days', value: '90' },
// //     { label: 'Custom', value: 'custom' },
// //   ];
// //   return (
// //     <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
// //       {tabs.map((tab) => (
// //         <button key={tab.value} onClick={() => {
// //           if (tab.value === 'custom') { setPeriod('custom'); setShowCustomPicker(true); }
// //           else { setPeriod(tab.value); setShowCustomPicker(false); }
// //         }} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
// //           period === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
// //         )}>
// //           {tab.label}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // };

// // const KpiCard = ({ label, value, delta }) => {
// //   const isPositive = delta >= 0;
// //   return (
// //     <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
// //       <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">{label}</p>
// //       <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
// //       {delta !== undefined && delta !== null && (
// //         <div className={cn("flex items-center gap-1 mt-2 text-xs font-semibold", isPositive ? "text-emerald-600" : "text-red-500")}>
// //           {isPositive ? <ChevronUpIcon /> : <ChevronDownIcon />}
// //           <span>{Math.abs(delta)}% vs prev period</span>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const TrendChart = ({ data, isLoading }) => {
// //   if (isLoading) return (
// //     <div className="h-64 flex items-center justify-center">
// //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
// //     </div>
// //   );
// //   if (!data.length) return <div className="h-64 flex items-center justify-center text-slate-400">No data available</div>;

// //   const maxValue = Math.max(...data.map(d => Math.max(d.sent, d.opens)), 1);
// //   const height = 200, width = 700;

// //   const getPoints = (key) => data.map((d, i) => [(i / (data.length - 1)) * width, height - (d[key] / maxValue) * height]);

// //   const smoothPath = (points) => {
// //     if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`;
// //     let d = `M ${points[0][0]} ${points[0][1]}`;
// //     for (let i = 1; i < points.length; i++) {
// //       const [x, y] = points[i], [px, py] = points[i - 1];
// //       const cx = (px + x) / 2;
// //       d += ` Q ${px} ${py}, ${cx} ${(py + y) / 2}`;
// //     }
// //     return d;
// //   };

// //   const sentPoints = getPoints("sent");
// //   const openPoints = getPoints("opens");
// //   const areaPath = smoothPath(sentPoints) + ` L ${width} ${height} L 0 ${height} Z`;

// //   return (
// //     <div>
// //       <svg viewBox={`0 0 ${width} ${height + 40}`} className="w-full h-auto">
// //         {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
// //           <line key={i} x1="0" y1={height - r * height} x2={width} y2={height - r * height} stroke="#e2e8f0" strokeDasharray="4,4" />
// //         ))}
// //         <defs>
// //           <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
// //             <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
// //             <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
// //           </linearGradient>
// //         </defs>
// //         <path d={areaPath} fill="url(#sentGradient)" />
// //         <path d={smoothPath(sentPoints)} fill="none" stroke="#4F46E5" strokeWidth="2.5" />
// //         <path d={smoothPath(openPoints)} fill="none" stroke="#059669" strokeWidth="2.5" />
// //         {data.map((d, i) => {
// //           const x = (i / (data.length - 1)) * width;
// //           if (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) {
// //             return <text key={i} x={x} y={height + 15} textAnchor="middle" fontSize="10" fill="#94a3b8">{d.date}</text>;
// //           }
// //           return null;
// //         })}
// //       </svg>
// //       <div className="flex justify-center gap-6 mt-4">
// //         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500"></div><span className="text-xs text-slate-600">Sends</span></div>
// //         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs text-slate-600">Opens</span></div>
// //       </div>
// //     </div>
// //   );
// // };

// // const CampaignTable = ({ campaigns, isLoading, onRowClick }) => {
// //   if (isLoading) return (
// //     <div className="animate-pulse p-4 space-y-3">
// //       {[1,2,3].map(i => <div key={i} className="h-10 bg-slate-100 rounded"></div>)}
// //     </div>
// //   );
// //   if (!campaigns.length) return (
// //     <div className="p-8 text-center text-slate-400">No campaigns found for this period</div>
// //   );
// //   return (
// //     <div className="overflow-x-auto">
// //       <table className="w-full text-sm">
// //         <thead>
// //           <tr className="border-b border-slate-100 bg-slate-50">
// //             {['CAMPAIGN', 'CHANNEL', 'SENT', 'DELIVERED', 'OPEN RATE', 'CTR', 'BOUNCE', 'UNSUBS'].map(h => (
// //               <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody className="divide-y divide-slate-100">
// //           {campaigns.map((c) => (
// //             <tr key={c.id} onClick={() => onRowClick(c)} className="hover:bg-slate-50 cursor-pointer transition-colors">
// //               <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{c.campaignName}</td>
// //               <td className="px-4 py-3">
// //                 <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
// //                   c.channel === 'email' ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700")}>
// //                   {c.channel === 'email' ? 'Email' : 'WhatsApp'}
// //                 </span>
// //               </td>
// //               <td className="px-4 py-3 text-slate-600">{formatNumber(c.sent)}</td>
// //               <td className="px-4 py-3 text-slate-600">{formatNumber(c.delivered)} ({c.deliveryRate}%)</td>
// //               <td className="px-4 py-3 font-semibold text-emerald-600">{c.openRate}%</td>
// //               <td className="px-4 py-3 text-slate-600">{c.ctr}%</td>
// //               <td className="px-4 py-3 text-slate-600">{c.bounce}%</td>
// //               <td className="px-4 py-3 text-slate-600">{c.unsubs}%</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // const CampaignDetailModal = ({ campaign, isOpen, onClose }) => {
// //   if (!isOpen || !campaign) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
// //         <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 border-b border-slate-100">
// //           <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-black/70 hover:text-black">×</button>
// //           <h2 className="text-2xl font-bold text-slate-900">{campaign.campaignName}</h2>
// //           <p className="text-sm text-slate-500 mt-1">Campaign Date: {campaign.date}</p>
// //         </div>
// //         <div className="p-6">
// //           <div className="grid grid-cols-4 gap-4">
// //             <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
// //               <p className="text-2xl font-bold text-slate-900">{formatNumber(campaign.sent)}</p>
// //               <p className="text-xs text-indigo-600 mt-1 font-medium">Sent</p>
// //             </div>
// //             <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-100">
// //               <p className="text-2xl font-bold text-emerald-600">{formatNumber(campaign.delivered)}</p>
// //               <p className="text-xs text-emerald-600 mt-1 font-medium">Delivered</p>
// //             </div>
// //             <div className="bg-violet-50 rounded-2xl p-4 text-center border border-violet-100">
// //               <p className="text-2xl font-bold text-indigo-600">{campaign.openRate}%</p>
// //               <p className="text-xs text-violet-600 mt-1 font-medium">Open Rate</p>
// //             </div>
// //             <div className="bg-amber-50 rounded-2xl p-4 text-center border border-amber-100">
// //               <p className="text-2xl font-bold text-amber-600">{campaign.ctr}%</p>
// //               <p className="text-xs text-amber-600 mt-1 font-medium">CTR</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Generate trend data from campaigns
// // const generateTrendFromCampaigns = (campaigns, period) => {
// //   const today = new Date();
// //   let days = 30;
// //   if (period === 'today' || period === 'yesterday') days = 1;
// //   else if (period === 'this-week') days = 7;
// //   else if (period === '90') days = 90;

// //   const startDate = period === 'yesterday' ? subDays(today, 1) : subDays(today, days - 1);
// //   const endDate = period === 'yesterday' ? subDays(today, 1) : today;
// //   const daysList = eachDayOfInterval({ start: startDate, end: endDate });

// //   return daysList.map(date => ({
// //     date: format(date, 'MMM dd'),
// //     sent: Math.floor(Math.random() * 5000) + 1000,
// //     opens: Math.floor(Math.random() * 2000) + 500,
// //   }));
// // };

// // export default function AnalyticsPage() {
// //   const [period, setPeriod] = useState('30');
// //   const [customStartDate, setCustomStartDate] = useState('');
// //   const [customEndDate, setCustomEndDate] = useState('');
// //   const [showCustomPicker, setShowCustomPicker] = useState(false);
// //   const [overview, setOverview] = useState(null);
// //   const [campaigns, setCampaigns] = useState([]);
// //   const [trendData, setTrendData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [selectedCampaign, setSelectedCampaign] = useState(null);
// //   const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
// //   const [channel, setChannel] = useState("all");

// //   const fetchData = useCallback(async () => {
// //     setIsLoading(true);
// //     const token = getAuthToken();
// //     const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

// //     try {
// //       const [overviewRes, campaignsRes] = await Promise.all([
// //         fetch(`${API_BASE}/analytics/overview?period=${period}`, { headers }),
// //         fetch(`${API_BASE}/analytics/campaigns?period=${period}`, { headers }),
// //       ]);

// //       if (overviewRes.ok) {
// //         const data = await overviewRes.json();
// //         setOverview(data);
// //       }

// //       if (campaignsRes.ok) {
// //         const data = await campaignsRes.json();
// //         setCampaigns(data);
// //         setTrendData(generateTrendFromCampaigns(data, period));
// //       }
// //     } catch (err) {
// //       console.error('Analytics fetch error:', err);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [period]);

// //   useEffect(() => { fetchData(); }, [fetchData]);

// //   const handleExport = () => {
// //     if (!campaigns.length) { alert('No data to export'); return; }
// //     const headers = ['Campaign Name','Channel','Sent','Delivered','Delivery Rate (%)','Open Rate (%)','CTR (%)','Bounce Rate (%)','Unsubscribes (%)'];
// //     const rows = campaigns.map(c => [c.campaignName, c.channel, c.sent, c.delivered, c.deliveryRate, c.openRate, c.ctr, c.bounce, c.unsubs]);
// //     const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
// //     const blob = new Blob([csv], { type: 'text/csv' });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = `analytics_${period}.csv`;
// //     link.click();
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50 pt-3 px-4 md:px-6 pb-4">
// //       <div className="max-w-[1400px] mx-auto">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
// //           <div>
// //             <h3 className="text-xl font-bold text-slate-900">Analytics Overview</h3>
// //             <p className="text-xs text-slate-500 mt-0.5">Workspace-level performance across all campaigns</p>
// //           </div>
// //           <div className="flex items-center gap-3 relative">
// //             <PeriodTabs period={period} setPeriod={setPeriod} setShowCustomPicker={setShowCustomPicker} />
// //             {showCustomPicker && (
// //               <div className="absolute top-14 right-24 z-50 w-[320px] bg-white border border-slate-200 rounded-xl shadow-xl p-4">
// //                 <div className="space-y-3">
// //                   <div>
// //                     <label className="text-xs font-medium text-slate-500 mb-1 block">Start Date</label>
// //                     <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
// //                   </div>
// //                   <div>
// //                     <label className="text-xs font-medium text-slate-500 mb-1 block">End Date</label>
// //                     <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
// //                   </div>
// //                   <div className="flex justify-end gap-2 pt-2">
// //                     <button onClick={() => setShowCustomPicker(false)} className="text-sm px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Cancel</button>
// //                     <button onClick={() => { if (!customStartDate || !customEndDate) { alert('Please select both dates'); return; } setPeriod('custom'); setShowCustomPicker(false); fetchData(); }} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg">Apply</button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //             <Button variant="secondary" leftIcon={<FileUp className="h-4 w-4 text-indigo-500" strokeWidth={2.2} />} onClick={handleExport}>Export</Button>
// //           </div>
// //         </div>

// //         {/* KPI Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //           <KpiCard label="TOTAL SENT" value={formatNumber(overview?.totalSent)} delta={overview?.totalSentDelta} />
// //           <KpiCard label="AVG DELIVERY RATE" value={formatPercent(overview?.avgDeliveryRate)} delta={overview?.avgDeliveryRateDelta} />
// //           <KpiCard label="AVG OPEN RATE" value={formatPercent(overview?.avgOpenRate)} delta={overview?.avgOpenRateDelta} />
// //           <KpiCard label="AVG CLICK RATE" value={formatPercent(overview?.avgClickRate)} delta={overview?.avgClickRateDelta} />
// //         </div>

// //         {/* Chart + Channel Breakdown */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
// //           <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4">
// //             <div className="flex justify-between items-center mb-2">
// //               <h3 className="text-xs font-semibold text-slate-800">Sends & Opens</h3>
// //               <select value={channel} onChange={e => setChannel(e.target.value)} className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white">
// //                 <option value="all">All Channels</option>
// //                 <option value="email">Email</option>
// //                 <option value="whatsapp">WhatsApp</option>
// //               </select>
// //             </div>
// //             <TrendChart data={trendData} isLoading={isLoading} />
// //           </div>
// //           <div className="bg-white rounded-lg border border-slate-200 p-4">
// //             <h3 className="text-xs font-semibold text-slate-800 mb-3">Channel Breakdown</h3>
// //             {isLoading ? (
// //               <div className="space-y-4 animate-pulse">
// //                 <div className="h-8 bg-slate-100 rounded"></div>
// //                 <div className="h-8 bg-slate-100 rounded"></div>
// //               </div>
// //             ) : overview ? (
// //               <div className="space-y-6">
// //                 <div>
// //                   <div className="flex justify-between mb-2">
// //                     <span className="text-sm font-semibold text-slate-700">✉️ Email Campaigns</span>
// //                     <span className="text-sm font-bold text-slate-800">{formatNumber(overview.emailSent)}</span>
// //                   </div>
// //                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
// //                     <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${overview.totalSent > 0 ? (overview.emailSent / overview.totalSent * 100) : 0}%` }} />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <div className="flex justify-between mb-2">
// //                     <span className="text-sm font-semibold text-slate-700">💬 WhatsApp</span>
// //                     <span className="text-sm font-bold text-slate-800">{formatNumber(overview.whatsappSent)}</span>
// //                   </div>
// //                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
// //                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overview.totalSent > 0 ? (overview.whatsappSent / overview.totalSent * 100) : 0}%` }} />
// //                   </div>
// //                 </div>
// //                 <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
// //                   <div className="bg-slate-50 rounded-lg px-3 py-3 text-center">
// //                     <p className="text-lg font-bold text-red-600">{formatNumber(overview.hardBounces)}</p>
// //                     <p className="text-[11px] text-slate-500 mt-1">Hard Bounces</p>
// //                   </div>
// //                   <div className="bg-slate-50 rounded-lg px-3 py-3 text-center">
// //                     <p className="text-lg font-bold text-amber-600">{formatNumber(overview.unsubscribes)}</p>
// //                     <p className="text-[11px] text-slate-500 mt-1">Unsubscribes</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ) : <p className="text-sm text-slate-400">No data</p>}
// //           </div>
// //         </div>

// //         {/* Campaign Table */}
// //         <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
// //           <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
// //             <h3 className="text-sm font-bold text-slate-900">Campaign Performance</h3>
// //             <Button variant="secondary" leftIcon={<FileUp className="h-4 w-4 text-indigo-500" strokeWidth={2.2} />} onClick={handleExport}>Export</Button>
// //           </div>
// //           <CampaignTable campaigns={campaigns} isLoading={isLoading} onRowClick={c => { setSelectedCampaign(c); setIsCampaignModalOpen(true); }} />
// //         </div>
// //       </div>
// //       <CampaignDetailModal campaign={selectedCampaign} isOpen={isCampaignModalOpen} onClose={() => setIsCampaignModalOpen(false)} />
// //     </div>
// //   );
// // }




// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { FileUp } from 'lucide-react';
// import { subDays, format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

// const API_BASE = 'https://wynreach-backend.onrender.com/api';

// const getAuthToken = () => {
//   const auth = localStorage.getItem('wynreach-auth');
//   if (auth) {
//     try {
//       const parsed = JSON.parse(auth);
//       return parsed.accessToken || parsed.state?.accessToken;
//     } catch (e) { return null; }
//   }
//   return null;
// };

// const cn = (...classes) => classes.filter(Boolean).join(' ');
// const formatNumber = (num) => {
//   if (num === undefined || num === null) return '—';
//   if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
//   if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
//   return num.toLocaleString();
// };
// const formatPercent = (value) => {
//   if (value === undefined || value === null) return '—';
//   return `${Number(value).toFixed(1)}%`;
// };

// const ChevronUpIcon = () => (
//   <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
//   </svg>
// );
// const ChevronDownIcon = () => (
//   <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//   </svg>
// );

// const Button = ({ children, variant, leftIcon, onClick, disabled, loading }) => {
//   const base = "inline-flex items-center gap-2 rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
//   };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, "px-3 py-2 text-sm flex items-center justify-center")}>
//       {loading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//     </button>
//   );
// };

// const PeriodTabs = ({ period, setPeriod, setShowCustomPicker }) => {
//   const tabs = [
//     { label: 'Today', value: 'today' },
//     { label: 'Yesterday', value: 'yesterday' },
//     { label: 'This week', value: 'this-week' },
//     { label: 'Last 30 days', value: '30' },
//     { label: 'Last 90 days', value: '90' },
//     { label: 'Custom', value: 'custom' },
//   ];
//   return (
//     <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
//       {tabs.map((tab) => (
//         <button key={tab.value} onClick={() => {
//           if (tab.value === 'custom') { setPeriod('custom'); setShowCustomPicker(true); }
//           else { setPeriod(tab.value); setShowCustomPicker(false); }
//         }} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
//           period === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
//         )}>
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// const KpiCard = ({ label, value, delta }) => {
//   const isPositive = delta >= 0;
//   return (
//     <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
//       <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">{label}</p>
//       <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
//       {delta !== undefined && delta !== null && (
//         <div className={cn("flex items-center gap-1 mt-2 text-xs font-semibold", isPositive ? "text-emerald-600" : "text-red-500")}>
//           {isPositive ? <ChevronUpIcon /> : <ChevronDownIcon />}
//           <span>{Math.abs(delta)}% vs prev period</span>
//         </div>
//       )}
//     </div>
//   );
// };

// const TrendChart = ({ data, isLoading, error }) => {
//   if (error) return <div className="h-64 flex items-center justify-center text-red-500 text-sm">Failed to load chart data</div>;
//   if (isLoading) return (
//     <div className="h-64 flex items-center justify-center">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//     </div>
//   );
//   if (!data.length) return <div className="h-64 flex items-center justify-center text-slate-400">No data available</div>;

//   const maxValue = Math.max(...data.map(d => Math.max(d.sent, d.opens)), 1);
//   const height = 200, width = 700;

//   const getPoints = (key) => data.map((d, i) => [(i / (data.length - 1)) * width, height - (d[key] / maxValue) * height]);

//   const smoothPath = (points) => {
//     if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`;
//     let d = `M ${points[0][0]} ${points[0][1]}`;
//     for (let i = 1; i < points.length; i++) {
//       const [x, y] = points[i], [px, py] = points[i - 1];
//       const cx = (px + x) / 2;
//       d += ` Q ${px} ${py}, ${cx} ${(py + y) / 2}`;
//     }
//     return d;
//   };

//   const sentPoints = getPoints("sent");
//   const openPoints = getPoints("opens");
//   const areaPath = smoothPath(sentPoints) + ` L ${width} ${height} L 0 ${height} Z`;

//   return (
//     <div>
//       <svg viewBox={`0 0 ${width} ${height + 40}`} className="w-full h-auto">
//         {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
//           <line key={i} x1="0" y1={height - r * height} x2={width} y2={height - r * height} stroke="#e2e8f0" strokeDasharray="4,4" />
//         ))}
//         <defs>
//           <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
//             <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
//           </linearGradient>
//         </defs>
//         <path d={areaPath} fill="url(#sentGradient)" />
//         <path d={smoothPath(sentPoints)} fill="none" stroke="#4F46E5" strokeWidth="2.5" />
//         <path d={smoothPath(openPoints)} fill="none" stroke="#059669" strokeWidth="2.5" />
//         {data.map((d, i) => {
//           const x = (i / (data.length - 1)) * width;
//           if (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) {
//             return <text key={i} x={x} y={height + 15} textAnchor="middle" fontSize="10" fill="#94a3b8">{d.date}</text>;
//           }
//           return null;
//         })}
//       </svg>
//       <div className="flex justify-center gap-6 mt-4">
//         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500"></div><span className="text-xs text-slate-600">Sends</span></div>
//         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs text-slate-600">Opens</span></div>
//       </div>
//     </div>
//   );
// };

// const CampaignTable = ({ campaigns, isLoading, error, onRowClick }) => {
//   if (error) return <div className="p-8 text-center text-red-500 text-sm">{error}</div>;
//   if (isLoading) return (
//     <div className="animate-pulse p-4 space-y-3">
//       {[1,2,3].map(i => <div key={i} className="h-10 bg-slate-100 rounded"></div>)}
//     </div>
//   );
//   if (!campaigns.length) return (
//     <div className="p-8 text-center text-slate-400">No campaigns found for this period</div>
//   );
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="border-b border-slate-100 bg-slate-50">
//             {['CAMPAIGN', 'CHANNEL', 'SENT', 'DELIVERED', 'OPEN RATE', 'CTR', 'BOUNCE', 'UNSUBS'].map(h => (
//               <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-100">
//           {campaigns.map((c) => (
//             <tr key={c.id} onClick={() => onRowClick(c)} className="hover:bg-slate-50 cursor-pointer transition-colors">
//               <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{c.campaignName}</td>
//               <td className="px-4 py-3">
//                 <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
//                   c.channel === 'email' ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700")}>
//                   {c.channel === 'email' ? 'Email' : 'WhatsApp'}
//                 </span>
//               </td>
//               <td className="px-4 py-3 text-slate-600">{formatNumber(c.sent)}</td>
//               <td className="px-4 py-3 text-slate-600">{formatNumber(c.delivered)} ({c.deliveryRate}%)</td>
//               <td className="px-4 py-3 font-semibold text-emerald-600">{c.openRate}%</td>
//               <td className="px-4 py-3 text-slate-600">{c.ctr}%</td>
//               <td className="px-4 py-3 text-slate-600">{c.bounce}%</td>
//               <td className="px-4 py-3 text-slate-600">{c.unsubs}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const CampaignDetailModal = ({ campaign, isOpen, onClose }) => {
//   if (!isOpen || !campaign) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
//         <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 border-b border-slate-100">
//           <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-black/70 hover:text-black">×</button>
//           <h2 className="text-2xl font-bold text-slate-900">{campaign.campaignName}</h2>
//           <p className="text-sm text-slate-500 mt-1">Campaign Date: {campaign.date}</p>
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-4 gap-4">
//             <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
//               <p className="text-2xl font-bold text-slate-900">{formatNumber(campaign.sent)}</p>
//               <p className="text-xs text-indigo-600 mt-1 font-medium">Sent</p>
//             </div>
//             <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-100">
//               <p className="text-2xl font-bold text-emerald-600">{formatNumber(campaign.delivered)}</p>
//               <p className="text-xs text-emerald-600 mt-1 font-medium">Delivered</p>
//             </div>
//             <div className="bg-violet-50 rounded-2xl p-4 text-center border border-violet-100">
//               <p className="text-2xl font-bold text-indigo-600">{campaign.openRate}%</p>
//               <p className="text-xs text-violet-600 mt-1 font-medium">Open Rate</p>
//             </div>
//             <div className="bg-amber-50 rounded-2xl p-4 text-center border border-amber-100">
//               <p className="text-2xl font-bold text-amber-600">{campaign.ctr}%</p>
//               <p className="text-xs text-amber-600 mt-1 font-medium">CTR</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Generate trend data from campaigns (mock fallback)
// const generateTrendFromCampaigns = (campaigns, period) => {
//   const today = new Date();
//   let days = 30;
//   if (period === 'today' || period === 'yesterday') days = 1;
//   else if (period === 'this-week') days = 7;
//   else if (period === '90') days = 90;

//   const startDate = period === 'yesterday' ? subDays(today, 1) : subDays(today, days - 1);
//   const endDate = period === 'yesterday' ? subDays(today, 1) : today;
//   const daysList = eachDayOfInterval({ start: startDate, end: endDate });

//   return daysList.map(date => ({
//     date: format(date, 'MMM dd'),
//     sent: Math.floor(Math.random() * 5000) + 1000,
//     opens: Math.floor(Math.random() * 2000) + 500,
//   }));
// };

// export default function AnalyticsPage() {
//   const [period, setPeriod] = useState('30');
//   const [customStartDate, setCustomStartDate] = useState('');
//   const [customEndDate, setCustomEndDate] = useState('');
//   const [showCustomPicker, setShowCustomPicker] = useState(false);
//   const [overview, setOverview] = useState(null);
//   const [campaigns, setCampaigns] = useState([]);
//   const [trendData, setTrendData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null); // General error for overview/campaigns
//   const [selectedCampaign, setSelectedCampaign] = useState(null);
//   const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
//   const [channel, setChannel] = useState("all");

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     const token = getAuthToken();
//     console.log("🔑 TOKEN:", token ? `${token.substring(0, 20)}...` : "MISSING");

//     if (!token) {
//       setError("Authentication token not found. Please log in again.");
//       setIsLoading(false);
//       return;
//     }

//     const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

//     try {
//       const overviewUrl = `${API_BASE}/analytics/overview?period=${period}`;
//       const campaignsUrl = `${API_BASE}/analytics/campaigns?period=${period}`;
//       console.log("📡 Fetching:", { overviewUrl, campaignsUrl });

//       const [overviewRes, campaignsRes] = await Promise.all([
//         fetch(overviewUrl, { headers }),
//         fetch(campaignsUrl, { headers }),
//       ]);

//       console.log("📊 Overview status:", overviewRes.status);
//       console.log("📊 Campaign status:", campaignsRes.status);

//       // Parse JSON regardless of status to inspect response
//       let overviewData = null;
//       let campaignData = null;
//       try {
//         overviewData = await overviewRes.json();
//         console.log("📦 Overview response:", overviewData);
//       } catch (e) {
//         console.error("Failed to parse overview JSON", e);
//       }
//       try {
//         campaignData = await campaignsRes.json();
//         console.log("📦 Campaign response:", campaignData);
//       } catch (e) {
//         console.error("Failed to parse campaign JSON", e);
//       }

//       if (!overviewRes.ok) {
//         console.error("Overview API error:", overviewRes.status, overviewData);
//         setError(prev => `Overview API error ${overviewRes.status}: ${overviewData?.detail || 'Unknown error'}`);
//       } else if (overviewData) {
//         setOverview(overviewData);
//       }

//       if (!campaignsRes.ok) {
//         console.error("Campaigns API error:", campaignsRes.status, campaignData);
//         setError(prev => `Campaigns API error ${campaignsRes.status}: ${campaignData?.detail || 'Unknown error'}`);
//       } else if (campaignData && Array.isArray(campaignData)) {
//         setCampaigns(campaignData);
//         setTrendData(generateTrendFromCampaigns(campaignData, period));
//       } else if (campaignData && !Array.isArray(campaignData)) {
//         console.warn("Campaigns response is not an array:", campaignData);
//         setError("Invalid campaigns data format");
//       }
//     } catch (err) {
//       console.error('Analytics fetch error:', err);
//       setError("Network error - failed to fetch analytics data");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [period]);

//   useEffect(() => { fetchData(); }, [fetchData]);

//   const handleExport = () => {
//     if (!campaigns.length) { alert('No data to export'); return; }
//     const headers = ['Campaign Name','Channel','Sent','Delivered','Delivery Rate (%)','Open Rate (%)','CTR (%)','Bounce Rate (%)','Unsubscribes (%)'];
//     const rows = campaigns.map(c => [c.campaignName, c.channel, c.sent, c.delivered, c.deliveryRate, c.openRate, c.ctr, c.bounce, c.unsubs]);
//     const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `analytics_${period}.csv`;
//     link.click();
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 pt-3 px-4 md:px-6 pb-4">
//       <div className="max-w-[1400px] mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
//           <div>
//             <h3 className="text-xl font-bold text-slate-900">Analytics Overview</h3>
//             <p className="text-xs text-slate-500 mt-0.5">Workspace-level performance across all campaigns</p>
//           </div>
//           <div className="flex items-center gap-3 relative">
//             <PeriodTabs period={period} setPeriod={setPeriod} setShowCustomPicker={setShowCustomPicker} />
//             {showCustomPicker && (
//               <div className="absolute top-14 right-24 z-50 w-[320px] bg-white border border-slate-200 rounded-xl shadow-xl p-4">
//                 <div className="space-y-3">
//                   <div>
//                     <label className="text-xs font-medium text-slate-500 mb-1 block">Start Date</label>
//                     <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
//                   </div>
//                   <div>
//                     <label className="text-xs font-medium text-slate-500 mb-1 block">End Date</label>
//                     <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
//                   </div>
//                   <div className="flex justify-end gap-2 pt-2">
//                     <button onClick={() => setShowCustomPicker(false)} className="text-sm px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Cancel</button>
//                     <button onClick={() => { if (!customStartDate || !customEndDate) { alert('Please select both dates'); return; } setPeriod('custom'); setShowCustomPicker(false); fetchData(); }} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg">Apply</button>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <Button variant="secondary" leftIcon={<FileUp className="h-4 w-4 text-indigo-500" strokeWidth={2.2} />} onClick={handleExport}>Export</Button>
//           </div>
//         </div>

//         {/* Display global error if any */}
//         {error && (
//           <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//             ⚠️ {error}
//           </div>
//         )}

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <KpiCard label="TOTAL SENT" value={formatNumber(overview?.totalSent)} delta={overview?.totalSentDelta} />
//           <KpiCard label="AVG DELIVERY RATE" value={formatPercent(overview?.avgDeliveryRate)} delta={overview?.avgDeliveryRateDelta} />
//           <KpiCard label="AVG OPEN RATE" value={formatPercent(overview?.avgOpenRate)} delta={overview?.avgOpenRateDelta} />
//           <KpiCard label="AVG CLICK RATE" value={formatPercent(overview?.avgClickRate)} delta={overview?.avgClickRateDelta} />
//         </div>

//         {/* Chart + Channel Breakdown */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//           <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-xs font-semibold text-slate-800">Sends & Opens</h3>
//               <select value={channel} onChange={e => setChannel(e.target.value)} className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white">
//                 <option value="all">All Channels</option>
//                 <option value="email">Email</option>
//                 <option value="whatsapp">WhatsApp</option>
//               </select>
//             </div>
//             <TrendChart data={trendData} isLoading={isLoading} error={error} />
//           </div>
//           <div className="bg-white rounded-lg border border-slate-200 p-4">
//             <h3 className="text-xs font-semibold text-slate-800 mb-3">Channel Breakdown</h3>
//             {isLoading ? (
//               <div className="space-y-4 animate-pulse">
//                 <div className="h-8 bg-slate-100 rounded"></div>
//                 <div className="h-8 bg-slate-100 rounded"></div>
//               </div>
//             ) : overview ? (
//               <div className="space-y-6">
//                 <div>
//                   <div className="flex justify-between mb-2">
//                     <span className="text-sm font-semibold text-slate-700">✉️ Email Campaigns</span>
//                     <span className="text-sm font-bold text-slate-800">{formatNumber(overview.emailSent)}</span>
//                   </div>
//                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                     <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${overview.totalSent > 0 ? (overview.emailSent / overview.totalSent * 100) : 0}%` }} />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between mb-2">
//                     <span className="text-sm font-semibold text-slate-700">💬 WhatsApp</span>
//                     <span className="text-sm font-bold text-slate-800">{formatNumber(overview.whatsappSent)}</span>
//                   </div>
//                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overview.totalSent > 0 ? (overview.whatsappSent / overview.totalSent * 100) : 0}%` }} />
//                   </div>
//                 </div>
//                 <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
//                   <div className="bg-slate-50 rounded-lg px-3 py-3 text-center">
//                     <p className="text-lg font-bold text-red-600">{formatNumber(overview.hardBounces)}</p>
//                     <p className="text-[11px] text-slate-500 mt-1">Hard Bounces</p>
//                   </div>
//                   <div className="bg-slate-50 rounded-lg px-3 py-3 text-center">
//                     <p className="text-lg font-bold text-amber-600">{formatNumber(overview.unsubscribes)}</p>
//                     <p className="text-[11px] text-slate-500 mt-1">Unsubscribes</p>
//                   </div>
//                 </div>
//               </div>
//             ) : <p className="text-sm text-slate-400">No data</p>}
//           </div>
//         </div>

//         {/* Campaign Table */}
//         <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
//           <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
//             <h3 className="text-sm font-bold text-slate-900">Campaign Performance</h3>
//             <Button variant="secondary" leftIcon={<FileUp className="h-4 w-4 text-indigo-500" strokeWidth={2.2} />} onClick={handleExport}>Export</Button>
//           </div>
//           <CampaignTable campaigns={campaigns} isLoading={isLoading} error={error} onRowClick={c => { setSelectedCampaign(c); setIsCampaignModalOpen(true); }} />
//         </div>
//       </div>
//       <CampaignDetailModal campaign={selectedCampaign} isOpen={isCampaignModalOpen} onClose={() => setIsCampaignModalOpen(false)} />
//     </div>
//   );
// }


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ added for navigation
import { FileUp } from 'lucide-react';
import { subDays, format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

const API_BASE = 'https://wynreach-backend.onrender.com/api';

const getAuthToken = () => {
  const auth = localStorage.getItem('wynreach-auth');
  if (auth) {
    try {
      const parsed = JSON.parse(auth);
      return parsed.accessToken || parsed.state?.accessToken;
    } catch (e) { return null; }
  }
  return null;
};

const cn = (...classes) => classes.filter(Boolean).join(' ');
const formatNumber = (num) => {
  if (num === undefined || num === null) return '—';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toLocaleString();
};
const formatPercent = (value) => {
  if (value === undefined || value === null) return '—';
  return `${Number(value).toFixed(1)}%`;
};

const ChevronUpIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Button = ({ children, variant, leftIcon, onClick, disabled, loading }) => {
  const base = "inline-flex items-center gap-2 rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant] || variants.secondary, "px-3 py-2 text-sm flex items-center justify-center")}>
      {loading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
    </button>
  );
};

const PeriodTabs = ({ period, setPeriod, setShowCustomPicker }) => {
  const tabs = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This week', value: 'this-week' },
    { label: 'Last 30 days', value: '30' },
    { label: 'Last 90 days', value: '90' },
    { label: 'Custom', value: 'custom' },
  ];
  return (
    <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button key={tab.value} onClick={() => {
          if (tab.value === 'custom') { setPeriod('custom'); setShowCustomPicker(true); }
          else { setPeriod(tab.value); setShowCustomPicker(false); }
        }} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
          period === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
        )}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const KpiCard = ({ label, value, delta }) => {
  const isPositive = delta >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      {delta !== undefined && delta !== null && (
        <div className={cn("flex items-center gap-1 mt-2 text-xs font-semibold", isPositive ? "text-emerald-600" : "text-red-500")}>
          {isPositive ? <ChevronUpIcon /> : <ChevronDownIcon />}
          <span>{Math.abs(delta)}% vs prev period</span>
        </div>
      )}
    </div>
  );
};

const TrendChart = ({ data, isLoading, error }) => {
  if (error) return <div className="h-64 flex items-center justify-center text-red-500 text-sm">Failed to load chart data</div>;
  if (isLoading) return (
    <div className="h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );
  if (!data.length) return <div className="h-64 flex items-center justify-center text-slate-400">No data available</div>;

  const maxValue = Math.max(...data.map(d => Math.max(d.sent, d.opens)), 1);
  const height = 200, width = 700;

  const getPoints = (key) => data.map((d, i) => [(i / (data.length - 1)) * width, height - (d[key] / maxValue) * height]);

  const smoothPath = (points) => {
    if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`;
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i], [px, py] = points[i - 1];
      const cx = (px + x) / 2;
      d += ` Q ${px} ${py}, ${cx} ${(py + y) / 2}`;
    }
    return d;
  };

  const sentPoints = getPoints("sent");
  const openPoints = getPoints("opens");
  const areaPath = smoothPath(sentPoints) + ` L ${width} ${height} L 0 ${height} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height + 40}`} className="w-full h-auto">
        {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
          <line key={i} x1="0" y1={height - r * height} x2={width} y2={height - r * height} stroke="#e2e8f0" strokeDasharray="4,4" />
        ))}
        <defs>
          <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#sentGradient)" />
        <path d={smoothPath(sentPoints)} fill="none" stroke="#4F46E5" strokeWidth="2.5" />
        <path d={smoothPath(openPoints)} fill="none" stroke="#059669" strokeWidth="2.5" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          if (i % Math.ceil(data.length / 6) === 0 || i === data.length - 1) {
            return <text key={i} x={x} y={height + 15} textAnchor="middle" fontSize="10" fill="#94a3b8">{d.date}</text>;
          }
          return null;
        })}
      </svg>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500"></div><span className="text-xs text-slate-600">Sends</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs text-slate-600">Opens</span></div>
      </div>
    </div>
  );
};

const CampaignTable = ({ campaigns, isLoading, error, onRowClick }) => {
  if (error) return <div className="p-8 text-center text-red-500 text-sm">{error}</div>;
  if (isLoading) return (
    <div className="animate-pulse p-4 space-y-3">
      {[1,2,3].map(i => <div key={i} className="h-10 bg-slate-100 rounded"></div>)}
    </div>
  );
  if (!campaigns.length) return (
    <div className="p-8 text-center text-slate-400">No campaigns found for this period</div>
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {['CAMPAIGN', 'CHANNEL', 'SENT', 'DELIVERED', 'OPENED', 'CLICKED', 'BOUNCED', 'FAILED', 'COMPLAINED'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {campaigns.map((c) => (
            <tr key={c.id} onClick={() => onRowClick(c)} className="hover:bg-slate-50 cursor-pointer transition-colors">
              <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{c.campaignName}</td>
              <td className="px-4 py-3">
                <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                  c.channel === 'email' ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700")}>
                  {c.channel === 'email' ? 'Email' : 'WhatsApp'}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{formatNumber(c.sent)}</td>
              <td className="px-4 py-3 text-slate-600">{formatNumber(c.delivered)} ({c.deliveryRate}%)</td>
              <td className="px-4 py-3 font-semibold text-emerald-600">{formatNumber(c.opened)}</td>
              <td className="px-4 py-3 text-slate-600">{formatNumber(c.clicked)}</td>
              <td className="px-4 py-3 text-slate-600">{formatNumber(c.bounced)}</td>
              <td className="px-4 py-3 text-slate-600">{formatNumber(c.failed)}</td>
              <td className="px-4 py-3 text-slate-600">{formatNumber(c.complained)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CampaignDetailModal = ({ campaign, isOpen, onClose }) => {
  if (!isOpen || !campaign) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 border-b border-slate-100">
          <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-black/70 hover:text-black">×</button>
          <h2 className="text-2xl font-bold text-slate-900">{campaign.campaignName}</h2>
          <p className="text-sm text-slate-500 mt-1">Campaign Date: {campaign.date}</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
              <p className="text-2xl font-bold text-slate-900">{formatNumber(campaign.sent)}</p>
              <p className="text-xs text-indigo-600 mt-1 font-medium">Sent</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-100">
              <p className="text-2xl font-bold text-emerald-600">{formatNumber(campaign.delivered)}</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">Delivered</p>
            </div>
            <div className="bg-violet-50 rounded-2xl p-4 text-center border border-violet-100">
              <p className="text-2xl font-bold text-indigo-600">{campaign.openRate}%</p>
              <p className="text-xs text-violet-600 mt-1 font-medium">Open Rate</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 text-center border border-amber-100">
              <p className="text-2xl font-bold text-amber-600">{campaign.ctr}%</p>
              <p className="text-xs text-amber-600 mt-1 font-medium">CTR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate trend data from campaigns (mock fallback)
const generateTrendFromCampaigns = (campaigns, period) => {
  const today = new Date();
  let days = 30;
  if (period === 'today' || period === 'yesterday') days = 1;
  else if (period === 'this-week') days = 7;
  else if (period === '90') days = 90;

  const startDate = period === 'yesterday' ? subDays(today, 1) : subDays(today, days - 1);
  const endDate = period === 'yesterday' ? subDays(today, 1) : today;
  const daysList = eachDayOfInterval({ start: startDate, end: endDate });

  return daysList.map(date => ({
    date: format(date, 'MMM dd'),
    sent: Math.floor(Math.random() * 5000) + 1000,
    opens: Math.floor(Math.random() * 2000) + 500,
  }));
};

export default function AnalyticsPage() {
  const navigate = useNavigate(); // ✅ for back navigation
  const [period, setPeriod] = useState('30');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [overview, setOverview] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  const [trendData, setTrendData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [channel, setChannel] = useState("all");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = getAuthToken();
    console.log("🔑 TOKEN:", token ? `${token.substring(0, 20)}...` : "MISSING");

    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

    try {
      const overviewUrl = `${API_BASE}/analytics/overview?period=${period}`;
      const campaignsUrl =
  `${API_BASE}/analytics/campaigns?page=${page}&limit=15&period=${period}`;
      console.log("📡 Fetching:", { overviewUrl, campaignsUrl });

      const [overviewRes, campaignsRes] = await Promise.all([
        fetch(overviewUrl, { headers }),
        fetch(campaignsUrl, { headers }),
      ]);

      console.log("📊 Overview status:", overviewRes.status);
      console.log("📊 Campaign status:", campaignsRes.status);

      let overviewData = null;
      let campaignData = null;
      try {
        overviewData = await overviewRes.json();
        console.log("📦 Overview response:", overviewData);
      } catch (e) {
        console.error("Failed to parse overview JSON", e);
      }
      try {
        campaignData = await campaignsRes.json();
        console.log("📦 Campaign response:", campaignData);
      } catch (e) {
        console.error("Failed to parse campaign JSON", e);
      }

      if (!overviewRes.ok) {
        console.error("Overview API error:", overviewRes.status, overviewData);
        setError(prev => `Overview API error ${overviewRes.status}: ${overviewData?.detail || 'Unknown error'}`);
      } else if (overviewData) {
        setOverview(overviewData);
      }
if (!campaignsRes.ok) {
  console.error("Campaigns API error:", campaignsRes.status, campaignData);

  setError(
    `Campaigns API error ${campaignsRes.status}: ${
      campaignData?.detail || "Unknown error"
    }`
  );
}
else if (campaignData?.data) {

  setCampaigns(campaignData.data);

  setTrendData(
    generateTrendFromCampaigns(
      campaignData.data,
      period
    )
  );
  setTotalPages(campaignData.totalPages || 1);

  console.log(
    "Campaigns loaded:",
    campaignData.data.length
  );

}
else {

  console.warn(
    "Unexpected campaigns response:",
    campaignData
  );

  setCampaigns([]);
}
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError("Network error - failed to fetch analytics data");
    } finally {
      setIsLoading(false);
    }
 }, [period, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleExport = () => {
    if (!campaigns.length) { alert('No data to export'); return; }
    const headers = ['Campaign Name','Channel','Sent','Delivered','Opened','Clicked','Bounced','Failed','Complained'];
    const rows = campaigns.map(c => [c.campaignName, c.channel, c.sent, c.delivered, c.opened, c.clicked, c.bounced, c.failed, c.complained]);
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `analytics_${period}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-3 px-4 md:px-6 pb-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Header with Back Arrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
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
              <h3 className="text-xl font-bold text-slate-900">Analytics Overview</h3>
              <p className="text-xs text-slate-500 mt-0.5">Workspace-level performance across all campaigns</p>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <PeriodTabs period={period} setPeriod={setPeriod} setShowCustomPicker={setShowCustomPicker} />
            {showCustomPicker && (
              <div className="absolute top-14 right-24 z-50 w-[320px] bg-white border border-slate-200 rounded-xl shadow-xl p-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Start Date</label>
                    <input type="date" value={customStartDate} onChange={e => setCustomStartDate(e.target.value)} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">End Date</label>
                    <input type="date" value={customEndDate} onChange={e => setCustomEndDate(e.target.value)} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button onClick={() => setShowCustomPicker(false)} className="text-sm px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Cancel</button>
                    <button onClick={() => { if (!customStartDate || !customEndDate) { alert('Please select both dates'); return; } setPeriod('custom'); setShowCustomPicker(false); fetchData(); }} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg">Apply</button>
                  </div>
                </div>
              </div>
            )}
            <Button variant="secondary" leftIcon={<FileUp className="h-4 w-4 text-indigo-500" strokeWidth={2.2} />} onClick={handleExport}>Export</Button>
          </div>
        </div>

        {/* Display global error if any */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard label="TOTAL SENT" value={formatNumber(overview?.totalSent)} delta={overview?.totalSentDelta} />
          <KpiCard label="AVG DELIVERY RATE" value={formatPercent(overview?.avgDeliveryRate)} delta={overview?.avgDeliveryRateDelta} />
          <KpiCard label="AVG OPEN RATE" value={formatPercent(overview?.avgOpenRate)} delta={overview?.avgOpenRateDelta} />
          <KpiCard label="AVG CLICK RATE" value={formatPercent(overview?.avgClickRate)} delta={overview?.avgClickRateDelta} />
        </div>

        {/* Chart + Channel Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-semibold text-slate-800">Sends & Opens</h3>
              <select value={channel} onChange={e => setChannel(e.target.value)} className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white">
                <option value="all">All Channels</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
            <TrendChart data={trendData} isLoading={isLoading} error={error} />
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-800 mb-3">Channel Breakdown</h3>
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-slate-100 rounded"></div>
                <div className="h-8 bg-slate-100 rounded"></div>
              </div>
            ) : overview ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">✉️ Email Campaigns</span>
                    <span className="text-sm font-bold text-slate-800">{formatNumber(overview.emailSent)}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${overview.totalSent > 0 ? (overview.emailSent / overview.totalSent * 100) : 0}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">💬 WhatsApp</span>
                    <span className="text-sm font-bold text-slate-800">{formatNumber(overview.whatsappSent)}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overview.totalSent > 0 ? (overview.whatsappSent / overview.totalSent * 100) : 0}%` }} />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg px-3 py-3 text-center">
                    <p className="text-lg font-bold text-red-600">{formatNumber(overview.hardBounces)}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Hard Bounces</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg px-3 py-3 text-center">
                    <p className="text-lg font-bold text-amber-600">{formatNumber(overview.unsubscribes)}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Unsubscribes</p>
                  </div>
                </div>
              </div>
            ) : <p className="text-sm text-slate-400">No data</p>}
          </div>
        </div>

        {/* Campaign Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Campaign Performance</h3>
            <Button variant="secondary" leftIcon={<FileUp className="h-4 w-4 text-indigo-500" strokeWidth={2.2} />} onClick={handleExport}>Export</Button>
          </div>
          <CampaignTable campaigns={campaigns} isLoading={isLoading} error={error} onRowClick={c => { setSelectedCampaign(c); setIsCampaignModalOpen(true); }} />
        <div className="flex justify-between items-center px-4 py-4 border-t">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-4 py-2 border rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-4 py-2 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
        </div>
      </div>
      <CampaignDetailModal campaign={selectedCampaign} isOpen={isCampaignModalOpen} onClose={() => setIsCampaignModalOpen(false)} />
    </div>
  );
}

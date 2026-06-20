
import React, { useMemo, useEffect, useState } from "react";
import {
  Mail,
  MessageCircle,
  Users,
  BarChart3,
  MousePointerClick,
  Calendar,
  X,
} from "lucide-react";
import { useCampaignList } from "../services/queries/campaigns.queries";
import { useNavigate, useSearchParams } from "react-router-dom";

// const CampaignDetailModal = ({ campaign, isOpen, onClose }) => {
//   if (!isOpen || !campaign) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* HEADER */}
//         <div className="relative bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 p-6">
          
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
//           >
//             <X size={24} />
//           </button>

//           <div>
//             <h2 className="text-3xl font-bold text-white">
//               {campaign.name}
//             </h2>

//             <p className="text-indigo-100 mt-1 text-sm">
//               {campaign.subtitle}
//             </p>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="p-6 space-y-6">

//           {/* TOP GRID */}
//           <div className="grid grid-cols-2 gap-5">

//             {/* Channel */}
//             <div className="flex items-start gap-3">
//               {campaign.channel === "Email" ? (
//                 <Mail className="w-5 h-5 text-indigo-500 mt-1" />
//               ) : (
//                 <MessageCircle className="w-5 h-5 text-emerald-500 mt-1" />
//               )}

//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase">
//                   Channel
//                 </p>

//                 <p className="text-sm font-semibold text-slate-800 mt-1">
//                   {campaign.channel}
//                 </p>
//               </div>
//             </div>

//             {/* Status */}
//             <div className="flex items-start gap-3">
//               <BarChart3 className="w-5 h-5 text-violet-500 mt-1" />

//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase">
//                   Status
//                 </p>

//                 <p className="text-sm font-semibold text-slate-800 mt-1">
//                   {campaign.status}
//                 </p>
//               </div>
//             </div>

//             {/* Audience */}
//             <div className="flex items-start gap-3">
//               <Users className="w-5 h-5 text-amber-500 mt-1" />

//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase">
//                   Audience
//                 </p>

//                 <p className="text-sm font-semibold text-slate-800 mt-1">
//                   {campaign.audience}
//                 </p>
//               </div>
//             </div>

//             {/* Date */}
//             <div className="flex items-start gap-3">
//               <Calendar className="w-5 h-5 text-rose-500 mt-1" />

//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase">
//                   Campaign Date
//                 </p>

//                 <p className="text-sm font-semibold text-slate-800 mt-1">
//                   {campaign.date}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* METRICS */}
//           <div className="border-t border-slate-100 pt-5">
//             <h3 className="text-lg font-bold text-slate-900 mb-4">
//               Performance Metrics
//             </h3>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//               <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
//                 <p className="text-xs font-semibold text-indigo-500 mt-1 uppercase">
//                   Sent
//                 </p>
//                 <p className="text-2xl font-bold text-indigo-700">
//                   {campaign.audience}
//                 </p>

                
//               </div>

//               <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
//                 <p className="text-xs font-semibold text-emerald-500 mt-1 uppercase">
//                   Open Rate
//                 </p>
//                 <p className="text-2xl font-bold text-emerald-700">
//                   {campaign.openRate ? `${campaign.openRate}%` : "--"}
//                 </p>

                
//               </div>

//               <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100">
//                 <p className="text-xs font-semibold text-violet-500 mt-1 uppercase">
//                   CTR
//                 </p>
//                 <p className="text-2xl font-bold text-violet-700">
//                   {campaign.ctr ? `${campaign.ctr}%` : "--"}
//                 </p>

                
//               </div>

//               <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
//                  <p className="text-xs font-semibold text-amber-500 mt-1 uppercase">
//                   Status
//                 </p>
//                 <p className="text-2xl font-bold text-amber-700">
//                   {campaign.status}
//                 </p>

               
//               </div>

//             </div>
//           </div>

//           {/* FOOTER */}
//           <div className="border-t border-slate-100 pt-5 flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
//             >
//               Close
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };
// const mockCampaigns = [
//   { 
//     id: 1, 
//     name: "Q2 Product Launch", 
//     subtitle: "Re-engagement + launch", 
//     channel: "Email", 
//     status: "Completed", 
//     audience: "12,450", 
//     openRate: "41.2", 
//     ctr: "8.4", 
//     date: "Apr 15",
//     dateObj: new Date("2026-04-15")
//   },
//   { 
//     id: 2, 
//     name: "April Newsletter", 
//     subtitle: "Monthly product update", 
//     channel: "Email", 
//     status: "Sent", 
//     audience: "8,230", 
//     openRate: "38.7", 
//     ctr: "7.1", 
//     date: "Apr 22",
//     dateObj: new Date("2026-04-22")
//   },
//   { 
//     id: 3, 
//     name: "WhatsApp Flash Sale", 
//     subtitle: "24-hour limited offer", 
//     channel: "WhatsApp", 
//     status: "Completed", 
//     audience: "3,180", 
//     openRate: "68.3", 
//     ctr: "22.4", 
//     date: "Apr 19",
//     dateObj: new Date("2026-04-19")
//   },
//   { 
//     id: 4, 
//     name: "Re-engagement Series", 
//     subtitle: "90-day inactive win-back", 
//     channel: "Email", 
//     status: "Scheduled", 
//     audience: "5,400", 
//     openRate: null, 
//     ctr: null, 
//     date: "May 1",
//     dateObj: new Date("2026-05-01")
//   },
//   { 
//     id: 5, 
//     name: "Customer Onboarding Welcome", 
//     subtitle: "First-touch welcome", 
//     channel: "Email", 
//     status: "Draft", 
//     audience: "-", 
//     openRate: null, 
//     ctr: null, 
//     date: "Draft",
//     dateObj: null
//   },
//   { 
//     id: 6, 
//     name: "Mother's Day Promo", 
//     subtitle: "WhatsApp campaign with offer", 
//     channel: "WhatsApp", 
//     status: "Draft", 
//     audience: "-", 
//     openRate: null, 
//     ctr: null, 
//     date: "Draft",
//     dateObj: null
//   },
// ];

export default function CampaignsPage() {
  const tabs = ["All", "Draft", "Scheduled", "Sent"];
const navigate = useNavigate();
const [searchParams] = useSearchParams();

const selectedChannel =
  searchParams.get("channel");

const selectedDate =
  searchParams.get("date");

const [activeTab, setActiveTab] = useState("All");
const [channel, setChannel] = useState("All Channels");
const [search, setSearch] = useState("");
const [dateRange, setDateRange] = useState("This year");
// const [selectedCampaign, setSelectedCampaign] = useState(null);

const [customStartDate, setCustomStartDate] = useState("");
const [customEndDate, setCustomEndDate] = useState("");
const [showCustomPicker, setShowCustomPicker] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const statusFilter = useMemo(() => {
  return activeTab === "All"
    ? {}
    : { status: activeTab.toLowerCase() };
}, [activeTab]);

const {
  data: campaignsData,
  isLoading,
  isError,
  error,
} = useCampaignList(statusFilter);

const campaigns = useMemo(() => {
  if (!Array.isArray(campaignsData)) return [];

  return campaignsData.map((c) => {
    const campaignDate = c.scheduled_at || c.created_at;
    const openRate =
      c.open_rate ??
      (c.total_sent > 0
        ? (c.total_opened / c.total_sent) * 100
        : 0);
    const ctr =
      c.click_rate ??
      (c.total_sent > 0
        ? (c.total_clicked / c.total_sent) * 100
        : 0);

    return {
      id: c.id,
      name: c.campaign_name,
      channel: c.channel === "email" ? "Email" : "WhatsApp",
      status:
        c.status?.charAt(0).toUpperCase() +
          c.status?.slice(1) ||
        "Draft",
      audience: c.estimated_recipients
        ? c.estimated_recipients.toLocaleString()
        : "—",
      openRate: openRate ? openRate.toFixed(1) : null,
      ctr: ctr ? ctr.toFixed(1) : null,
      date: campaignDate
        ? new Date(campaignDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "—",
      dateObj: campaignDate ? new Date(campaignDate) : null,
    };
  });
}, [campaignsData]);


const [openMenuId, setOpenMenuId] = useState(null);
// FILTERED DATA
const filteredCampaigns = campaigns.filter((c) => {
  const matchTab =
    activeTab === "All" || c.status === activeTab;

  const matchChannel =
    channel === "All Channels" || c.channel === channel;

  const matchSearch =
  (c.name || '')
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  (c.subtitle || '')
    .toLowerCase()
    .includes(search.toLowerCase());
const today = new Date();

let matchDate = true;

  if (!c.dateObj) {
  matchDate = true;
}

else if (dateRange === "Today") {

  matchDate =
    c.dateObj.toDateString() ===
    today.toDateString();

}

else if (dateRange === "This week") {

  const startOfWeek = new Date(today);

  startOfWeek.setDate(
    today.getDate() - today.getDay()
  );

  matchDate = c.dateObj >= startOfWeek;
}

else if (dateRange === "Last 30 days") {

  const past = new Date();

  past.setDate(today.getDate() - 30);

  matchDate = c.dateObj >= past;
}

else if (dateRange === "Last 90 days") {

  const past = new Date();

  past.setDate(today.getDate() - 90);

  matchDate = c.dateObj >= past;
}

else if (dateRange === "This year") {

  matchDate =
    c.dateObj.getFullYear() ===
    today.getFullYear();
}

else if (
  dateRange === "Custom" &&
  customStartDate &&
  customEndDate
) {

  const start = new Date(customStartDate);

  const end = new Date(customEndDate);

  end.setHours(23, 59, 59, 999);

  matchDate =
    c.dateObj >= start &&
    c.dateObj <= end;
}
return matchTab && matchChannel && matchSearch && matchDate;
});
const totalPages = Math.ceil(
  filteredCampaigns.length / itemsPerPage
);
// PAGINATION
const paginatedData = filteredCampaigns.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
const getVisiblePages = () => {
  const pages = [];

  const startPage = Math.min(
    currentPage,
    Math.max(1, totalPages - 3)
  );

  for (let i = startPage; i < startPage + 3; i++) {
    if (i <= totalPages) {
      pages.push(i);
    }
  }

  return pages;
};
useEffect(() => {
  setCurrentPage(1);
}, [
  activeTab,
  channel,
  search,
  dateRange,
  customStartDate,
  customEndDate,
]);

useEffect(() => {

  async function fetchCampaigns() {

    try {

      const data = await getAllCampaigns();

      console.log('Campaigns:', data);
const formatted = Array.isArray(data)
  ? data.map((c) => {
        

      const campaignDate =
        c.scheduled_at || c.created_at;

      return {
      id: c.id,

      name: c.campaign_name,

      subtitle: c.goal_label || 'No goal',

      channel:
        c.channel === 'email'
          ? 'Email'
          : 'WhatsApp',

      status: c.status
        ? c.status.charAt(0).toUpperCase() +
          c.status.slice(1)
        : 'Draft',

      audience: c.estimated_recipients
  ? c.estimated_recipients.toLocaleString()
  : '—',

     openRate: null,
ctr: null,

     date: campaignDate
  ? new Date(campaignDate).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
      }
    )
  : '—',

      dateObj: campaignDate
  ? new Date(campaignDate)
  : null,
    };
})
  
  : [];

      setCampaigns(formatted);

    } catch (error) {

      console.error('Campaign fetch failed:', error);

    } finally {

      setLoading(false);

    }
  }

  if (selectedDate) {
    setDateRange("Custom");
    setCustomStartDate(selectedDate);
    setCustomEndDate(selectedDate);
  }
}, []);
if (isLoading) {
  return (
    <div className="p-8">
      Loading campaigns...
    </div>
  );
}

if (isError) {
  return (
    <div className="p-8 text-red-600">
      Failed to load campaigns: {error?.message || 'Unknown error'}
    </div>
  );
}
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1e293b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
     

      <div className="px-8 pt-2 pb-8 max-w-[1200px] mx-auto w-full">
        
        {/* HEADER */}
        <div className="flex items-start justify-between mb-5">
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
    <h1 className="text-[20px] font-semibold text-[#0f172a]">
      All Campaigns
    </h1>

    <p className="text-[#94a3b8] text-[12px] mt-0.5">
      Manage and track all your email and WhatsApp campaigns
    </p>
  </div>
</div>
          <div className="flex items-center gap-3">

  {/* Calendar */}
  <button
    onClick={() => navigate("/calendar")}
    className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[12px] font-semibold text-[#334155] shadow-sm hover:bg-gray-50 transition"
    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
  >
    <span className="text-indigo-500 text-[14px] leading-none">📅</span>
    Calendar
  </button>

  {/* New Campaign */}
  <button
    onClick={() => navigate('/campaigns/new')}
    className="bg-[#4F46E5] text-white px-5 py-2 rounded-lg text-[12px] font-semibold shadow-md hover:opacity-90 transition"
    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
  >
    + New Campaign
  </button>

</div>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl px-4 py-3 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
  {/* LEFT SIDE */}
  <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">

    {/* TABS */}
    <div className="bg-[#EEF2FF] border border-[#E2E8F0] p-1 rounded-xl flex gap-1">
      {tabs.map((tab, i) => (
       <button
  key={tab}
  onClick={() => setActiveTab(tab)}
  className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition ${
    activeTab === tab
      ? "bg-white text-[#0f172a] shadow-sm"
      : "text-[#334155] hover:bg-white/60"
  }`}
>
  {tab}
</button>
      ))}
    </div>

    {/* CHANNEL */}
    <select
  value={channel}
  onChange={(e) => setChannel(e.target.value)}
  className="bg-[#EEF2FF] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#334155] outline-none"
>
  <option>All Channels</option>
  <option>Email</option>
  <option>WhatsApp</option>
</select>

    {/* DATE */}
    <div className="relative">
   <select
  value={dateRange}
  onClick={() => {
    if (dateRange === "Custom") {
      setShowCustomPicker(true);
    }
  }}
  onChange={(e) => {
    const value = e.target.value;

    setDateRange(value);

    if (value === "Custom") {
      setShowCustomPicker(true);
    }
  }}
  className="bg-[#EEF2FF] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#334155] outline-none"
>
  <option>Today</option>
  <option>This week</option>
  <option>Last 30 days</option>
  <option>Last 90 days</option>
  <option>This year</option>
  <option>Custom</option>
</select>
{showCustomPicker && (
  <div className="absolute left-full ml-3 top-0 z-50 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-4">

    <div className="space-y-3">

      <div>
        <label className="text-xs font-medium text-slate-500">
          Start Date
        </label>

        <input
          type="date"
          value={customStartDate}
          onChange={(e) =>
            setCustomStartDate(e.target.value)
          }
          className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">
          End Date
        </label>

        <input
          type="date"
          value={customEndDate}
          onChange={(e) =>
            setCustomEndDate(e.target.value)
          }
          className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setShowCustomPicker(false)}
          className="px-3 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => setShowCustomPicker(false)}
          className="px-3 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Apply
        </button>

      </div>

    </div>

  </div>
)}
</div>
  </div>

  {/* RIGHT SIDE - SEARCH */}
  <div className="relative w-[240px] shrink-0">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs">
      🔍
    </span>
    <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search campaigns..."
  className="w-full bg-white border border-[#E2E8F0] rounded-lg py-1.5 pl-9 pr-3 text-[12px] outline-none focus:ring-2 focus:ring-indigo-200 transition"
/>
  </div>

</div>

        {/* TABLE - Tightened row height and font sizes */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <table className="w-full text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <thead className="bg-[#F8FAFC]">
  {/* <tr className="border-b border-[#E2E8F0]"> */}
<tr className="hover:bg-[#F8FAFC] transition">
    <th className="pl-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Campaign
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Channel
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Status
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Audience
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Open Rate
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      CTR
    </th>

    <th className="px-6 py-4 text-left text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wide">
      Date
    </th>

    <th className="pr-6 py-4"></th>

  </tr>
</thead>
            <tbody className="divide-y divide-gray-50">
  {paginatedData.map((c) => (
//     <tr
//   key={c.id}
//   className="hover:bg-gray-50/50 transition cursor-pointer"
//   onClick={() => {

//     if (c.status === "Draft") {

//       navigate(`/campaigns/edit/${c.id}`);

//     } else {

//       setSelectedCampaign(c);

//     }
//   }}
// >
<tr
  key={c.id}
  className="hover:bg-gray-50/50 transition"
>
      
      {/* Campaign */}
      <td className="pl-8 py-4">
        <div className="font-semibold text-[12px] text-[#0f172a]">{c.name}</div>
        <div className="text-[11px] text-[#94A3B8]">{c.subtitle}</div>
      </td>

      {/* Channel */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium ${
            c.channel === "Email"
              ? "bg-[#EEF2FF] text-[#4F46E5]"
              : "bg-[#ECFDF5] text-[#16A34A]"
          }`}
        >
          <span className="text-[11px]">
            {c.channel === "Email" ? "📩" : "💬"}
          </span>
          {c.channel}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[12px] font-medium ${
            c.status === "Completed"
              ? "bg-[#ECFDF5] text-[#16A34A]"
              : c.status === "Sent"
              ? "bg-[#EFF6FF] text-[#2563EB]"
              : c.status === "Scheduled"
              ? "bg-[#EEF2FF] text-[#4F46E5]"
              : "bg-[#F1F5F9] text-[#64748B]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              c.status === "Completed"
                ? "bg-[#16A34A]"
                : c.status === "Sent"
                ? "bg-[#2563EB]"
                : c.status === "Scheduled"
                ? "bg-[#4F46E5]"
                : "bg-[#64748B]"
            }`}
          ></span>
          {c.status}
        </span>
      </td>

      {/* Audience */}
      <td className="px-6 py-4 text-[12px] font-medium text-[#334155]">
        {c.audience}
      </td>

      {/* Open Rate */}
      <td className={`px-6 py-4 font-semibold text-[12px] ${
        c.openRate ? "text-green-500" : "text-gray-300"
      }`}>
        {c.openRate ? `${c.openRate}%` : "—"}
      </td>

      {/* CTR */}
      <td className={`px-6 py-4 font-medium text-[12px] ${
        c.ctr ? "text-gray-700" : "text-gray-300"
      }`}>
        {c.ctr ? `${c.ctr}%` : "—"}
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-[#94A3B8] font-medium text-[12px]">
        {c.date}
      </td>

      <td className="pr-8 py-4 text-right relative">
  
  <div
    className="relative inline-block"
    onMouseEnter={() => setOpenMenuId(c.id)}
    onMouseLeave={() => setOpenMenuId(null)}
  >
    
    <button
      className="text-gray-400 hover:text-gray-700 text-lg font-bold px-2"
    >
      ⋯
    </button>

    {openMenuId === c.id && (
      <div className="absolute right-0 top-7 z-20 w-48 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
        
        {c.status === "Draft" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();

              navigate(`/campaigns/edit/${c.id}`);

              setOpenMenuId(null);
            }}
            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            Edit Campaign
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();

              navigate(`/campaigns/${c.id}`);

              setOpenMenuId(null);
            }}
            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            View Campaign Details
          </button>
        )}

      </div>
    )}

  </div>

</td>

    </tr>
  ))}
</tbody>
          </table>
          {/* {selectedCampaign && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
      
      <h2 className="text-[16px] font-semibold mb-4">
        {selectedCampaign.name}
      </h2>

      <div className="text-[13px] text-gray-600 space-y-2">
        <p><strong>Channel:</strong> {selectedCampaign.channel}</p>
        <p><strong>Status:</strong> {selectedCampaign.status}</p>
        <p><strong>Audience:</strong> {selectedCampaign.audience}</p>
        <p><strong>Open Rate:</strong> {selectedCampaign.openRate || "-"}</p>
        <p><strong>CTR:</strong> {selectedCampaign.ctr || "-"}</p>
        <p><strong>Date:</strong> {selectedCampaign.date}</p>
      </div>

      <button
        onClick={() => setSelectedCampaign(null)}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
      >
        Close
      </button>

    </div>
  </div>
)} */}


{/* <CampaignDetailModal
  campaign={selectedCampaign}
  isOpen={!!selectedCampaign}
  onClose={() => setSelectedCampaign(null)}
/> */}

          {/* FOOTER */}
         <div className="flex items-center justify-between px-6 py-4">

  {/* LEFT TEXT */}
  <p className="text-[12px] text-[#94A3B8] font-medium">
  Showing{" "}
  {(currentPage - 1) * itemsPerPage + 1}
  -
  {Math.min(
    currentPage * itemsPerPage,
    filteredCampaigns.length
  )}{" "}
  of {filteredCampaigns.length} campaigns
</p>

  {/* PAGINATION */}
  <div className="flex items-center gap-2">

   <button
    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
    className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E2E8F0] text-[11px] text-[#64748B]"
  >
    &lt;
  </button>

{getVisiblePages().map((page) => (
  <button
    key={page}
    onClick={() => setCurrentPage(page)}
    className={`w-8 h-8 flex items-center justify-center rounded-md text-xs ${
      currentPage === page
        ? "bg-[#4F46E5] text-white"
        : "border border-[#E2E8F0] text-[#64748B]"
    }`}
  >
    {page}
  </button>
))}

{!getVisiblePages().includes(totalPages) && (
  <>
    <span className="px-1 text-[#64748B]">...</span>

    <button
      onClick={() => setCurrentPage(totalPages)}
      className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E2E8F0] text-xs text-[#64748B]"
    >
      {totalPages}
    </button>
  </>
)}

  {/* Next */}
  <button
    onClick={() =>
      setCurrentPage((p) =>
        Math.min(p + 1, totalPages)
      )
    }
    className="w-7 h-7 flex items-center justify-center rounded-md border border-[#E2E8F0] text-[11px] text-[#64748B]"
  >
    &gt;
  </button>

  </div>

</div>
        </div>
      </div>
    </div>
  );
}


// DashboardPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// =====================================================
// HELPER FUNCTIONS
// =====================================================
const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

// Updated ChannelIcon with vibrant colors
const ChannelIcon = ({ ch, size = "w-10 h-10" }) => {
  const isWhatsApp = ch === "whatsapp";

  return (
    <div
      className={`${size} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
        isWhatsApp
          ? "bg-emerald-500 text-white"
          : "bg-indigo-500 text-white"
      }`}
    >
      {isWhatsApp ? (
        // WhatsApp Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .19 5.33.19 11.88c0 2.09.55 4.13 1.58 5.93L0 24l6.36-1.67a11.8 11.8 0 0 0 5.71 1.46h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.44-8.43Zm-8.45 18.3h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.77.99 1-3.68-.23-.38a9.88 9.88 0 0 1-1.52-5.24c0-5.45 4.43-9.88 9.89-9.88a9.83 9.83 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.98c0 5.45-4.43 9.9-9.85 9.9Zm5.43-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.38-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.15 4.56.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z" />
        </svg>
      ) : (
        // Email Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8m-16 10h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"
          />
        </svg>
      )}
    </div>
  );
};

const Badge = ({ status }) => {
  const map = {
    active: "bg-green-50 text-green-700",
    sent: "bg-violet-50 text-violet-700",
    scheduled: "bg-blue-50 text-blue-700",
    completed: "bg-emerald-50 text-emerald-700",
    draft: "bg-gray-50 text-gray-700",
  };
  const displayStatus =
    status === "active" ? "Active" : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || "bg-gray-50 text-gray-700"}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {displayStatus}
    </span>
  );
};

const EngagementChart = ({ filter, sendsData, opensData, labels }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sendsData.length || !opensData.length) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const PAD = { top: 16, right: 16, bottom: 40, left: 42 };
    const cW = W - PAD.left - PAD.right;
    const cH = H - PAD.top - PAD.bottom;

    const sendsColor = "#4F46E5";
    const opensColor = "#10B981";

    const allVals = [...sendsData, ...opensData];
    const minV = Math.min(...allVals) * 0.92;
    const maxV = Math.max(...allVals) * 1.05;
    const n = sendsData.length;

    const xOf = (i) => PAD.left + (i / (n - 1)) * cW;
    const yOf = (v) => PAD.top + cH - ((v - minV) / (maxV - minV)) * cH;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;
    [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
      const y = PAD.top + cH * t;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + cW, y);
      ctx.stroke();
    });

    // Y-axis labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "right";
    [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
      const v = Math.round(maxV - t * (maxV - minV));
      ctx.fillText(v, PAD.left - 6, PAD.top + cH * t + 4);
    });

    // X-axis labels (show subset)
    ctx.textAlign = "center";
    const labelIdxs = [0, Math.floor(n / 4), Math.floor(n / 2), Math.floor(3 * n / 4), n - 1];
    labelIdxs.forEach((i) => {
      if (labels[i]) ctx.fillText(labels[i], xOf(i), H - PAD.bottom + 18);
    });

    const drawArea = (data, color) => {
      const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + cH);
      grad.addColorStop(0, color + "40");
      grad.addColorStop(1, color + "00");

      ctx.beginPath();
      ctx.moveTo(xOf(0), yOf(data[0]));
      for (let i = 1; i < n; i++) {
        const x0 = xOf(i - 1),
          y0 = yOf(data[i - 1]);
        const x1 = xOf(i),
          y1 = yOf(data[i]);
        ctx.bezierCurveTo(
          x0 + (x1 - x0) * 0.5,
          y0,
          x0 + (x1 - x0) * 0.5,
          y1,
          x1,
          y1
        );
      }
      ctx.lineTo(xOf(n - 1), PAD.top + cH);
      ctx.lineTo(xOf(0), PAD.top + cH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xOf(0), yOf(data[0]));
      for (let i = 1; i < n; i++) {
        const x0 = xOf(i - 1),
          y0 = yOf(data[i - 1]);
        const x1 = xOf(i),
          y1 = yOf(data[i]);
        ctx.bezierCurveTo(
          x0 + (x1 - x0) * 0.5,
          y0,
          x0 + (x1 - x0) * 0.5,
          y1,
          x1,
          y1
        );
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };
if (filter === "all" || filter === "whatsapp")
  drawArea(opensData, opensColor);
    if (filter === "all" || filter === "email") drawArea(sendsData, sendsColor);
  }, [filter, sendsData, opensData, labels]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "220px", display: "block" }} />;
};

const KpiCard = ({ label, value, delta, sub, accent }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: accent }} />
    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">{label}</p>
    <p className="text-3xl font-bold text-slate-900 leading-none">{value?.toLocaleString() ?? value ?? 0}</p>
    {delta && (
      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-xs font-semibold text-emerald-600">↑ {delta}</span>
        <span className="text-xs text-slate-500">vs last month</span>
      </div>
    )}
    {sub && !delta && <p className="text-xs text-slate-500 mt-2">{sub}</p>}
  </div>
);

// =====================================================
// MAIN DASHBOARD COMPONENT
// =====================================================
export default function DashboardPage() {
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(true);
  const [chartFilter, setChartFilter] = useState("all");
  const [messageCredits, setMessageCredits] = useState(0);

  // Dashboard state from API
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({
    orderTotal: 0,
    sentCampaigns: 0,
    scheduledCampaigns: 0,
    draftCampaigns: 0,
  });
  const [sentCampaignsPreview, setSentCampaignsPreview] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingScheduled, setUpcomingScheduled] = useState([]);
  const [engagementData, setEngagementData] = useState({
  labels: [],
  email: [],
  whatsapp: [],
});

  // Fetch dashboard data from backend
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard/overview");
      const data = response.data;

      if (data.success) {
        setKpis({
          orderTotal: data.kpis?.orderTotal ?? 0,
          sentCampaigns: data.kpis?.sentCampaigns ?? 0,
          scheduledCampaigns: data.kpis?.scheduledCampaigns ?? 0,
          draftCampaigns: data.kpis?.draftCampaigns ?? 0,
        });
        setSentCampaignsPreview(data.sentCampaignsPreview || []);
        setRecentActivity(data.recentActivity || []);
        setUpcomingScheduled(data.upcomingScheduled || []);
       setEngagementData(
  data.engagement || {
    labels: [],
    email: [],
    whatsapp: [],
  }
);
      }
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load wallet credits from localStorage and listen for updates
  useEffect(() => {
    fetchDashboard();

    const credits = localStorage.getItem("wallet_message_credits");
    if (credits) setMessageCredits(parseInt(credits));

    const handleWalletUpdate = (event) => {
      if (event.detail && event.detail.messageCredits !== undefined) {
        setMessageCredits(event.detail.messageCredits);
      }
    };
    window.addEventListener("walletUpdate", handleWalletUpdate);
    return () => window.removeEventListener("walletUpdate", handleWalletUpdate);
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight">
            {greeting()}, Subramanian 👋
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Here's what's happening with your campaigns — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/analytics")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            📊 Reports
          </button>
          <button
            onClick={() => navigate("/billing")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            💰 Wallet
            {messageCredits > 0 && (
              <span className="ml-1 text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">
                {messageCredits.toLocaleString()} credits
              </span>
            )}
          </button>
          <button
            onClick={() => navigate("/campaigns/new")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 4v16m8-8H4" strokeLinecap="round" />
            </svg>
            New Campaign
          </button>
        </div>
      </div>

      {/* Alert - demo alert */}
      {alertVisible && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="text-base mt-0.5">⚠️</span>
            <div>
              <p className="text-sm font-bold text-amber-900">Campaign bounce rate alert</p>
              <p className="text-sm text-amber-800 mt-0.5">
                "April Newsletter" has a hard bounce rate of 5.8%, above your 5% threshold.{" "}
                <button
                  onClick={() => navigate("/campaigns/1")}
                  className="font-bold underline text-amber-900 hover:text-amber-800"
                >
                  Review campaign →
                </button>
              </p>
            </div>
          </div>
          <button
            onClick={() => setAlertVisible(false)}
            className="text-amber-700 hover:text-amber-900 text-lg leading-none flex-shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard label="ORDER TOTAL" value={kpis.orderTotal} accent="#4f46e5" />
        <KpiCard label="SENT" value={kpis.sentCampaigns} accent="#7c3aed" />
        <KpiCard label="SCHEDULED" value={kpis.scheduledCampaigns} accent="#0284c7" />
        <KpiCard label="DRAFT" value={kpis.draftCampaigns} accent="#f59e0b" />
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {/* Sent Campaigns Table (latest 4) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Sent Campaigns</h2>
              <button
                onClick={() => navigate("/campaigns")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Campaign</th>
                    <th className="pb-2 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="pb-2 text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Open Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {sentCampaignsPreview.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-6 text-center text-slate-400 text-sm">
                        No sent campaigns
                      </td>
                    </tr>
                  ) : (
                    sentCampaignsPreview.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => navigate(`/campaigns/${c.id}`)}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-2.5">
                            <ChannelIcon ch={c.channel} />
                            <div>
                              <p className="font-semibold text-slate-800 text-[13px] leading-tight">
                                {c.campaignName}
                              </p>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {c.totalRecipients?.toLocaleString() || 0} recipients · {c.channel}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-3">
                          <Badge status={c.status} />
                        </td>
                        <td className="py-3 text-right font-semibold text-emerald-600 text-[13px]">
                          {c.openRate != null ? `${Number(c.openRate).toFixed(1)}%` : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Scheduled Sends */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Upcoming Scheduled Sends</h2>
              <button
                onClick={() => navigate("/calendar")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Calendar →
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {upcomingScheduled.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-sm">
                  No scheduled campaigns
                </div>
              ) : (
                upcomingScheduled.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 cursor-pointer hover:bg-slate-50 rounded-lg px-2"
                    onClick={() => navigate(`/campaigns/${s.id}`)}
                  >
                    <div className="flex items-center gap-2.5">
                      <ChannelIcon ch={s.channel} />
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">
                          {s.campaignName}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {(s.recipients || 0).toLocaleString()} recipients · {s.channel}
                        </p>
                      </div>
                    </div>
                    <span className="text-[12px] font-semibold text-indigo-600 whitespace-nowrap ml-3">
                      {s.scheduledAt
                        ? new Date(s.scheduledAt).toLocaleString()
                        : "Not Scheduled"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {/* Engagement Trend Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">
  Sent Campaign Trend — Last 30 Days
</h2>
              <div className="flex gap-0.5 bg-slate-100 rounded-lg p-0.5">
                {
[
  { key: "email", label: "Email" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "all", label: "All" },
].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setChartFilter(key)}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                      chartFilter === key
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <EngagementChart
  filter={chartFilter}
  sendsData={engagementData.email || []}
  opensData={engagementData.whatsapp || []}
  labels={engagementData.labels || []}
/>
            <div className="flex items-center gap-5 mt-3 pt-3 border-t border-slate-100">
              {(chartFilter === "all" || chartFilter === "email") && (
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <span className="w-3 h-3 rounded-sm bg-indigo-600" />
                  Email
                </div>
              )}
              {(chartFilter === "all" || chartFilter === "whatsapp") && (
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                  WhatsApp
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-center text-slate-400 text-sm py-4">No recent activity</p>
              ) : (
                recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${item.bg || "bg-gray-100"}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-slate-800 leading-snug">{item.message || item.content}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
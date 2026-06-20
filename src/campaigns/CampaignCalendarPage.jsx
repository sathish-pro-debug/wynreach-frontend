
  // CampaignCalendarPage.jsx – Complete working model with proper navigation
  import React, { useState, useEffect, useCallback, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { getAllCampaigns } from '../services/api/campaignApi';
  import { Mail } from "lucide-react";
  import { FaWhatsapp } from "react-icons/fa";


  import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    isSameDay,
    isToday,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
  } from 'date-fns';

  // ===================== Mock Data (based on screenshot) =====================
  // const MOCK_CAMPAIGNS = [
  //   {
  //     id: '1',
  //     campaignName: 'Q2 Product Launch',
  //     description: 'Re-engagement + launch',
  //     channel: 'email',
  //     status: 'completed',
  //     scheduledDate: '2026-04-15T10:00:00Z',
  //     sentDate: '2026-04-15T10:00:00Z',
  //     audienceSize: 12450,
  //   },
  //   {
  //     id: '2',
  //     campaignName: 'April Newsletter',
  //     description: 'Monthly product update',
  //     channel: 'email',
  //     status: 'sent',
  //     scheduledDate: '2026-04-22T09:00:00Z',
  //     sentDate: '2026-04-22T09:00:00Z',
  //     audienceSize: 8230,
  //   },
  //   {
  //     id: '3',
  //     campaignName: 'WhatsApp Flash Sale',
  //     description: '24-hour limited offer',
  //     channel: 'whatsapp',
  //     status: 'completed',
  //     scheduledDate: '2026-04-19T14:30:00Z',
  //     sentDate: '2026-04-19T14:30:00Z',
  //     audienceSize: 3180,
  //   },
  //   {
  //     id: '4',
  //     campaignName: 'Re-engagement Series',
  //     description: '90-day inactive win-back',
  //     channel: 'email',
  //     status: 'scheduled',
  //     scheduledDate: '2026-05-01T08:00:00Z',
  //     sentDate: null,
  //     audienceSize: 5400,
  //   },
  //   {
  //     id: '5',
  //     campaignName: 'Customer Onboarding',
  //     description: 'First-touch welcome',
  //     channel: 'email',
  //     status: 'draft',
  //     scheduledDate: null,
  //     sentDate: null,
  //     audienceSize: null,
  //   },
  //   {
  //     id: '6',
  //     campaignName: "Mother's Day Promo",
  //     description: 'WhatsApp campaign with offer',
  //     channel: 'whatsapp',
  //     status: 'draft',
  //     scheduledDate: null,
  //     sentDate: null,
  //     audienceSize: null,
  //   },
  //   {
  //     id: '7',
  //     campaignName: 'Tech Summit 2026',
  //     description: 'Annual tech conference',
  //     channel: 'email',
  //     status: 'scheduled',
  //     scheduledDate: '2026-06-10T09:00:00Z',
  //     sentDate: null,
  //     audienceSize: 15000,
  //   },
  // ];

  // ===================== Custom Hook =====================
  const useCampaignCalendar = (currentDate, viewMode) => {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isMountedRef = useRef(true);

    useEffect(() => {
      isMountedRef.current = true;
      return () => { isMountedRef.current = false; };
    }, []);

    const fetchCampaigns = useCallback(async () => {
      if (!isMountedRef.current) return;
      setIsLoading(true);
      
      let startDate, endDate;
      
      if (viewMode === 'month') {
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
      } else {
        startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
        endDate = endOfWeek(currentDate, { weekStartsOn: 0 });
      }
      
      // Simulate API delay
      try {

    const data = await getAllCampaigns();

    const formatted = Array.isArray(data)
      ? data.map((c) => ({

          id: c.id,

          campaignName: c.campaign_name,

          description: c.goal_label || 'No goal',

          channel: c.channel,

          status: c.status,

        scheduledDate: c.scheduled_at
    ? c.scheduled_at.split("T")[0]
    : c.created_at.split("T")[0],

          sentDate:
            c.created_at,

          audienceSize:
            c.audience_count || 0,

        }))
      : [];

    const filtered = formatted.filter((campaign) => {

      const campaignDate =
        campaign.scheduledDate ||
        campaign.sentDate;

      if (!campaignDate) return false;

      const date = new Date(campaignDate);

      return (
        date >= startDate &&
        date <= endDate
      );
    });

    setCampaigns(filtered);

  } catch (error) {

    console.error(
      'Calendar campaigns fetch failed:',
      error
    );

  } finally {

    setIsLoading(false);

  }
    }, [currentDate, viewMode]);

    useEffect(() => {
      fetchCampaigns();
    }, [fetchCampaigns]);

    return { campaigns, isLoading };
  };

  // ===================== Utility Functions =====================
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  // ===================== Icons (SVG) =====================
  const PlusIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const ListIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  // ===================== UI Components =====================
  const Button = ({ children, variant, size, leftIcon, rightIcon, onClick, disabled, active }) => {
    const base = "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
      secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
      ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
      active: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500",
    };
    const sizes = {
      sm: "px-2.5 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    };
    
    let variantKey = variant;
    if (active && variant === 'ghost') {
      variantKey = 'active';
    }
    
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(base, variants[variantKey] || variants.secondary, sizes[size] || sizes.md)}
      >
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </button>
    );
  };

  const PageHeader = ({ title, description, action }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 leading-tight">{title}</h1>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      {action && <div className="flex flex-wrap gap-2">{action}</div>}
    </div>
  );

  const CampaignCard = ({ campaign, onClick }) => {
    const channelColors = {
      email: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      whatsapp: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    
    return (
      <div
        onClick={onClick}
        className={cn(
          "text-[11px] font-medium rounded-md px-1.5 py-1 mb-1 truncate cursor-pointer hover:opacity-80 transition-all border-l-2",
          channelColors[campaign.channel] || channelColors.email
        )}
        title={`${campaign.campaignName} - Click to view details`}
      >
        {campaign.campaignName}
      </div>
    );
  };

  // ===================== Main CampaignCalendarPage Component =====================
  export default function CampaignCalendarPage() {
    const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());// April 2026
    const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
    const { campaigns, isLoading } = useCampaignCalendar(currentDate, viewMode);

    const handlePrev = () => {
      const newDate = viewMode === 'month' 
        ? subMonths(currentDate, 1)
        : new Date(currentDate.setDate(currentDate.getDate() - 7));
      setCurrentDate(new Date(newDate));
    };

    const handleNext = () => {
      const newDate = viewMode === 'month'
        ? addMonths(currentDate, 1)
        : new Date(currentDate.setDate(currentDate.getDate() + 7));
      setCurrentDate(new Date(newDate));
    };

    const handleToday = () => {
      setCurrentDate(new Date());
    };

    const handleNewCampaign = () => {
      navigate('/campaigns/new');
    };

    const handleCampaignClick = (campaign) => {
      navigate(`/campaigns/${campaign.id}`);
    };
    const handleEmailClick = (day) => {
    navigate(
      `/campaigns?date=${format(day, "yyyy-MM-dd")}&channel=email`
    );
  };

  const handleWhatsappClick = (day) => {
    navigate(
      `/campaigns?date=${format(day, "yyyy-MM-dd")}&channel=whatsapp`
    );
  };
    // Generate calendar days based on view mode
    let calendarDays = [];
    let weekDays = [];
    
    if (viewMode === 'month') {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const startDate = monthStart;
      const endDate = monthEnd;
      
      const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
      const startPadding = getDay(startDate);
      
      // Add padding days from previous month
      for (let i = 0; i < startPadding; i++) {
        calendarDays.push(null);
      }
      // Add days of current month
      calendarDays.push(...daysInMonth);
      
      weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    } else {
      // Week view
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      calendarDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
      weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    }

    const getCampaignsForDay = (day) => {
    if (!day) return [];

    return campaigns.filter((campaign) => {
      const campaignDate =
        campaign.scheduledDate || campaign.sentDate;

      if (!campaignDate) return false;

      // Prevent timezone shifting
      const dateOnly = campaignDate.split("T")[0];
      const localDate = new Date(dateOnly);

      return isSameDay(localDate, day);
    });
  };

    const getWeekNumber = (date) => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    const weekNumber = getWeekNumber(currentDate);

    return (
      <div className="pt-3 px-4 md:px-6 pb-4 bg-slate-50 min-h-screen scale-[1] origin-top">
        {/* <div className="flex items-center gap-3 mb-4"> */}
    {/* <button
      onClick={() => navigate(-1)}
      className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200"
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
      <h1 className="text-xl font-semibold text-slate-900">
        Campaign Calendar
      </h1>
      <p className="text-xs text-slate-500">
        {format(currentDate, 'MMMM yyyy')} — scheduled and sent campaigns
      </p>
    </div>
  </div> */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

  {/* Left Side */}
  <div className="flex items-center gap-3">

    <button
      onClick={() => navigate(-1)}
      className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200"
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
      <h1 className="text-3xl font-bold text-slate-900">
        Campaign Calendar
      </h1>

      <p className="text-sm text-slate-500">
        {format(currentDate, "MMMM yyyy")} — scheduled and sent campaigns
      </p>
    </div>

  </div>

  {/* Right Side */}
  <div className="flex items-center gap-3">

    <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">

      <Button
        variant="ghost"
        size="sm"
        leftIcon={<CalendarIcon />}
        active={viewMode === "month"}
        onClick={() => setViewMode("month")}
      >
        Month
      </Button>

      <Button
        variant="ghost"
        size="sm"
        leftIcon={<ListIcon />}
        active={viewMode === "week"}
        onClick={() => setViewMode("week")}
      >
        Week
      </Button>

    </div>

    <Button
      variant="primary"
      leftIcon={<PlusIcon />}
      onClick={handleNewCampaign}
    >
      New Campaign
    </Button>

  </div>

</div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <button
    onClick={handlePrev}
    className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
  >
    {viewMode === 'month'
      ? `< ${format(subMonths(currentDate, 1), "MMMM")}`
      : '< Previous Week'}
  </button>
            <h2 className="text-lg font-semibold text-slate-800">
              {format(currentDate, viewMode === 'month' ? 'MMMM yyyy' : "'Week of' MMM d, yyyy")}
              {viewMode === 'week' && (
                <span className="text-sm font-normal text-slate-400 ml-2">
                  (Week {weekNumber})
                </span>
              )}
            </h2>
            {/* RIGHT - Next Month */}
  <button
    onClick={handleNext}
    className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
  >
    {viewMode === 'month'
      ? `${format(addMonths(currentDate, 1), "MMMM")} >`
      : 'Next Week >'}
  </button> {/* Spacer for alignment */}
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="text-sm text-slate-500 mt-3">Loading campaigns...</p>
            </div>
          ) : (
            <div className="grid grid-cols-7">
              {calendarDays.map((day, idx) => {
                if (!day) {
                  return (
                    <div
                      key={`empty-${idx}`}
                      className="min-h-[95px] bg-slate-50/30 border-b border-r border-slate-100 last:border-r-0"
                    />
                  );
                }
                
                const dayCampaigns = getCampaignsForDay(day);
                const emailCount = dayCampaigns.filter(
    c => c.channel === "email"
  ).length;

  const whatsappCount = dayCampaigns.filter(
    c => c.channel === "whatsapp"
  ).length;
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const isCurrentDay = isToday(day);
                
                return (
                  <div
    key={day.toISOString()}
    onClick={() => {
      console.log(dayCampaigns);
    }}
    className={cn(
    "relative min-h-[95px] p-2 border-b border-r border-slate-100 transition-colors",
                      !isCurrentMonth && viewMode === 'month' ? "bg-slate-50/30" : "bg-white",
                      isCurrentDay && "bg-amber-50",
                      "hover:bg-slate-50"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center h-7 w-7 rounded-full text-sm font-semibold",
                          isCurrentDay
                            ? "bg-amber-100 text-amber-600 ring-1 ring-amber-300"
                            : isCurrentMonth || viewMode === 'week'
                              ? "text-slate-700"
                              : "text-slate-400"
                        )}
                      >
                        {format(day, 'd')}
                      </span>
                      {dayCampaigns.length > 0 && (
                        <span className="text-[11px] font-semibold text-slate-500">
    {dayCampaigns.length}
  </span>
                      )}
                    </div>
                    
                    {/* <div className="space-y-1 max-h-[80px] overflow-y-auto">
                      {dayCampaigns.map((campaign) => (
                        <CampaignCard
                          key={campaign.id}
                          campaign={campaign}
                          onClick={() => handleCampaignClick(campaign)}
                        />
                      ))}
                    </div> */}
                    



    <div className="absolute bottom-2 right-2 flex items-center gap-3">

    {emailCount > 0 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEmailClick(day);
        }}
        className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        title={`${emailCount} Email Campaigns`}
      >
        <Mail
          size={18}
          className="text-blue-600"
        />

        <span className="text-xs font-semibold text-blue-600">
          {emailCount}
        </span>
      </button>
    )}

    {whatsappCount > 0 && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleWhatsappClick(day);
        }}
        className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        title={`${whatsappCount} WhatsApp Campaigns`}
      >
        <FaWhatsapp
          size={18}
          className="text-green-500"
        />

        <span className="text-xs font-semibold text-green-600">
          {whatsappCount}
        </span>
      </button>
    )}

  </div>
            </div>    
                );
              })}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-6 px-6 py-3 border-t border-slate-100 bg-slate-50 text-xs">
            <span className="text-slate-500 font-medium">Legend:</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-indigo-100 border-l-2 border-indigo-300"></div>
              <span className="text-slate-600">Email Campaign</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-100 border-l-2 border-emerald-300"></div>
              <span className="text-slate-600">WhatsApp Campaign</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300"></div>
              <span className="text-slate-600">Today</span>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Campaigns</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{campaigns.length}</p>
            <p className="text-xs text-slate-500 mt-1">
              in {format(currentDate, viewMode === 'month' ? 'MMMM' : 'this week')}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email Campaigns</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              {campaigns.filter(c => c.channel === 'email').length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">WhatsApp Campaigns</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {campaigns.filter(c => c.channel === 'whatsapp').length}
            </p>
          </div>
        </div>
      </div>
    );
  }
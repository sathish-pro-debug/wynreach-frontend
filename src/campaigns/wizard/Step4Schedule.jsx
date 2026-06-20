// // Step4Schedule.jsx
// import React, { useContext, createContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// // ----------------------------- Native Date Helpers (replaces date-fns) -----------------------------
// const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// const addDays = (date, days) => {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// };

// // ----------------------------- Wizard Store (Context) -----------------------------
// // Extend the store to include schedule fields.
// const WizardContext = createContext(null);

// export const useWizardStore = () => {
//   const context = useContext(WizardContext);
//   if (!context) throw new Error('useWizardStore must be used within WizardProvider');
//   return context;
// };

// export const WizardProvider = ({ children }) => {
//   const [state, setState] = useState({
//     // Previous steps data (simplified for this example)
//     campaignName: '',
//     channel: 'email',
//     goalLabel: null,
//     audienceListIds: [],
//     estimatedRecipients: 0,
//     suppressedCount: 0,
//     subjectLine: '',
//     previewText: '',
//     templateId: '',
//     senderIdentityId: '',
//     // Step 4 specific
//     sendMode: 'immediate',
//     scheduledAt: null,
//     timezone: 'Asia/Kolkata',
//   });
//   const [step, setStep] = useState(4); // For demo, we start at step 4.

//   const setStep4 = ({ sendMode, scheduledAt, timezone }) => {
//     setState((prev) => ({ ...prev, sendMode, scheduledAt, timezone }));
//   };
//   const nextStep = () => setStep((s) => s + 1);
//   const prevStep = () => setStep((s) => Math.max(1, s - 1));

//   return (
//     <WizardContext.Provider
//       value={{
//         ...state,
//         step,
//         setStep4,
//         nextStep,
//         prevStep,
//       }}
//     >
//       {children}
//     </WizardContext.Provider>
//   );
// };

// // ----------------------------- Custom UI Components (Tailwind only) -----------------------------
// const Input = ({ label, type = 'text', placeholder, min, error, optional, ...props }) => (
//   <div className="space-y-1">
//     {label && (
//       <label className="block text-sm font-semibold text-slate-700">
//         {label} {optional && <span className="text-slate-400 text-xs font-normal">(optional)</span>}
//       </label>
//     )}
//     <input
//       type={type}
//       placeholder={placeholder}
//       min={min}
//       {...props}
//       className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
//         error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200'
//       }`}
//     />
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Select = ({ label, options, error, ...props }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
//     <select
//       {...props}
//       className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
//         error ? 'border-red-300' : 'border-slate-200'
//       }`}
//     >
//       {options.map((opt) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//     {error && <p className="text-xs text-red-500">{error}</p>}
//   </div>
// );

// const Button = ({ children, variant, type = 'button', onClick, disabled }) => {
//   const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variantClass = variant === 'primary'
//     ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500"
//     : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
//   return (
//     <button type={type} onClick={onClick} className={`${base} ${variantClass}`} disabled={disabled}>
//       {children}
//     </button>
//   );
// };

// const Alert = ({ children, variant = 'info' }) => {
//   const variantClass = variant === 'info'
//     ? "bg-blue-50 border-blue-200 text-blue-800"
//     : "bg-red-50 border-red-200 text-red-700";
//   return (
//     <div className={`rounded-xl border p-4 text-sm ${variantClass}`}>
//       {children}
//     </div>
//   );
// };

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// // ----------------------------- Main Step4Schedule Component -----------------------------
// const TZ_OPTIONS = [
//   { label: 'Asia/Kolkata (IST, UTC+5:30)', value: 'Asia/Kolkata' },
//   { label: 'Europe/Stockholm (CET, UTC+1)', value: 'Europe/Stockholm' },
//   { label: 'America/New_York (EST, UTC-5)', value: 'America/New_York' },
//   { label: 'UTC (Coordinated Universal Time)', value: 'UTC' },
// ];

// // Schema definition
// const schema = z.object({
//   sendMode: z.enum(['immediate', 'scheduled']),
//   date: z.string().optional(),
//   time: z.string().optional(),
//   timezone: z.string().min(1),
// });

// export default function Step4Schedule() {
//   const { sendMode, scheduledAt, timezone, setStep4, nextStep, prevStep } = useWizardStore();

//   // Compute default date and time from stored scheduledAt or fallback to tomorrow 09:00
//   let defaultDate = formatDate(addDays(new Date(), 1));
//   let defaultTime = '09:00';
//   if (scheduledAt) {
//     const parts = scheduledAt.split('T');
//     if (parts[0]) defaultDate = parts[0];
//     if (parts[1]) defaultTime = parts[1].slice(0, 5);
//   }

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       sendMode: sendMode || 'immediate',
//       date: defaultDate,
//       time: defaultTime,
//       timezone: timezone || 'Asia/Kolkata',
//     },
//   });

//   const mode = watch('sendMode');

//   const onSubmit = (values) => {
//     let scheduled = null;
//     if (values.sendMode === 'scheduled' && values.date && values.time) {
//       scheduled = `${values.date}T${values.time}:00`;
//     }
//     setStep4({
//       sendMode: values.sendMode,
//       scheduledAt: scheduled,
//       timezone: values.timezone,
//     });
//     nextStep();
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//       <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
//         <h2 className="text-lg font-bold text-slate-900">Schedule Campaign</h2>
//         <p className="text-sm text-slate-500 mt-1">
//           Choose when to send, or send immediately after review.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="px-6 sm:px-8 py-6 space-y-5">
//           {/* Send mode selector */}
//           <div className="space-y-2">
//             {['immediate', 'scheduled'].map((opt) => (
//               <label
//                 key={opt}
//                 className={cn(
//                   'flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all',
//                   mode === opt ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'
//                 )}
//               >
//                 <input
//                   type="radio"
//                   value={opt}
//                   {...register('sendMode')}
//                   className="mt-0.5 accent-indigo-600 shrink-0"
//                 />
//                 <div>
//                   <p className="font-semibold text-sm text-slate-800">
//                     {opt === 'immediate' ? '⚡ Send Immediately' : '📅 Schedule for Later'}
//                   </p>
//                   <p className="text-xs text-slate-400 mt-0.5">
//                     {opt === 'immediate'
//                       ? 'Send right after the Review step confirmation'
//                       : 'Choose a specific date and time'}
//                   </p>
//                 </div>
//               </label>
//             ))}
//           </div>

//           {/* Scheduled date/time pickers (only when 'scheduled' is selected) */}
//           {mode === 'scheduled' && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Input
//                 label="Date"
//                 type="date"
//                 min={formatDate(new Date())}
//                 error={errors.date?.message}
//                 {...register('date')}
//               />
//               <Input
//                 label="Time"
//                 type="time"
//                 error={errors.time?.message}
//                 {...register('time')}
//               />
//             </div>
//           )}

//           <Select
//             label="Timezone"
//             options={TZ_OPTIONS}
//             error={errors.timezone?.message}
//             {...register('timezone')}
//           />

//           <Alert variant="info">
//             <strong>Best practice:</strong> For B2B email, Tuesdays and Thursdays at 9–11 AM
//             typically see the highest open rates.
//           </Alert>
//         </div>

//         <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
//           <Button variant="secondary" type="button" onClick={prevStep}>
//             ← Back
//           </Button>
//           <Button variant="primary" type="submit">
//             Continue → Review
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }



// Step4Schedule.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWizardStore } from './WizardShell';
// import { DateTime } from "luxon";
import { updateCampaignSchedule } from '../../services/api/campaignScheduleApi';

// ---------- Helpers ----------
const formatDate = (date) => { const y = date.getFullYear(); const m = String(date.getMonth() + 1).padStart(2,'0'); const d = String(date.getDate()).padStart(2,'0'); return `${y}-${m}-${d}`; };
const addDays = (date, days) => { const r = new Date(date); r.setDate(r.getDate() + days); return r; };

// const Input = ({ label, type, placeholder, min, error, ...props }) => (
//   <div className="space-y-1">
//     <label className="block text-sm font-semibold text-slate-700">{label}</label>
    
const Input = ({ label, type, placeholder, min, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">
      {label}
    </label>

    <input
      type={type}
      placeholder={placeholder}
      min={min}
      {...props}
      className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
        error ? 'border-red-300' : 'border-slate-200'
      }`}
    />

    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-slate-700">
      {label}
    </label>

    <select
      {...props}
      className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
        error ? 'border-red-300' : 'border-slate-200'
      }`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>

    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Button = ({ children, variant, type, onClick, disabled }) => {
  const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary' ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 focus:ring-indigo-500" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
  return <button type={type} onClick={onClick} className={`${base} ${variantClass}`} disabled={disabled}>{children}</button>;
};

const Alert = ({ children, variant = 'info' }) => {
  const cls = variant === 'info' ? "bg-blue-50 border-blue-200 text-blue-800" : "bg-red-50 border-red-200 text-red-700";
  return <div className={`rounded-xl border p-4 text-sm ${cls}`}>{children}</div>;
};

const cn = (...classes) => classes.filter(Boolean).join(' ');
const TZ_OPTIONS = [
  { label: 'Asia/Kolkata (IST, UTC+5:30)', value: 'Asia/Kolkata' },
  { label: 'Europe/Stockholm (CET, UTC+1)', value: 'Europe/Stockholm' },
  { label: 'America/New_York (EST, UTC-5)', value: 'America/New_York' },
  { label: 'UTC (Coordinated Universal Time)', value: 'UTC' },
];
const schema = z.object({
  sendMode: z.enum(['immediate', 'scheduled']),
  date: z.string().optional(),
  time: z.string().optional(),
  timezone: z.enum([
    'Asia/Kolkata',
    'Europe/Stockholm',
    'America/New_York',
    'UTC'
  ])
});

export default function Step4Schedule() {
  // const { sendMode, scheduledAt, timezone, setStep4, nextStep, prevStep } = useWizardStore();

  const {
  sendMode,
  scheduledAt,
  timezone,
  setStep4,
  nextStep,
  prevStep,
  createdCampaignId
} = useWizardStore();
console.log("STORE TIMEZONE =", timezone);
  let defaultDate = formatDate(addDays(new Date(), 1)), defaultTime = '09:00';
  if (scheduledAt) { const parts = scheduledAt.split('T'); if (parts[0]) defaultDate = parts[0]; if (parts[1]) defaultTime = parts[1].slice(0,5); }
  const {
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors }
} = useForm({
    
    resolver: zodResolver(schema),
    defaultValues: {
  sendMode: sendMode || 'immediate',
  date: defaultDate,
  time: defaultTime,
  timezone: TZ_OPTIONS.some(t => t.value === timezone)
    ? timezone
    : 'Asia/Kolkata'
},
    
  });
  console.log('Timezone validation error:', errors.timezone);
  console.log("timezone from store:", timezone);
  const mode = watch('sendMode');

React.useEffect(() => {
  if (mode === "immediate") {
    setValue("timezone", "Asia/Kolkata");
  }
}, [mode]);
  console.log("FORM TIMEZONE =", watch("timezone"));
  // const onSubmit = (values) => {
  //   let scheduled = null;
  //   if (values.sendMode === 'scheduled' && values.date && values.time) scheduled = `${values.date}T${values.time}:00`;
  //   setStep4({ sendMode: values.sendMode, scheduledAt: scheduled, timezone: values.timezone });
  //   nextStep();
  // };

  const onSubmit = async (values) => {
console.log("FULL FORM VALUES");
console.log(values);
console.log("DATE FIELD =", values.date);
console.log("TIME FIELD =", values.time);
  let scheduled = null;

if (
  values.sendMode === "scheduled" &&
  values.date &&
  values.time
) {
//   const localDateTime = DateTime.fromISO(
//     `${values.date}T${values.time}`,
//     {
//       zone: values.timezone,
//     }
//   );

//   console.log(
//     "LOCAL TIME =",
//     localDateTime.toString()
//   );

//   console.log(
//     "UTC TIME =",
//     localDateTime.toUTC().toISO()
//   );

//   scheduled = localDateTime
//     .toUTC()
//     .toISO();
scheduled = `${values.date}T${values.time}:00`;
}

  try {
    if (!createdCampaignId) {
  console.error('Campaign ID missing');
  alert('Campaign session expired. Please create campaign again.');
  return;
}
console.log('Sending schedule payload:', {
  campaignId: createdCampaignId,
  send_mode: values.sendMode,
  scheduled_at: scheduled,
  timezone: values.timezone,
});
    await updateCampaignSchedule(
  createdCampaignId,
  {
    send_mode: values.sendMode,
    scheduled_at: scheduled,
    timezone:
      values.sendMode === "scheduled"
        ? values.timezone
        : null,
  }
);

    setStep4({
  sendMode: values.sendMode,
  scheduledAt: scheduled,
  timezone:
    values.sendMode === "scheduled"
      ? values.timezone
      : null,
});

  console.log("BEFORE nextStep");

nextStep();

console.log("AFTER nextStep");

  } catch (error) {

  console.error('Schedule update failed:', error);
  console.error('Response data:', error?.response?.data);
  console.error('Response status:', error?.response?.status);

  alert(
    error?.response?.data?.detail ||
    error?.message ||
    'Failed to save schedule'
  );
}
};

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-900">Schedule Campaign</h2><p className="text-sm text-slate-500 mt-1">Choose when to send, or send immediately after review.</p></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 sm:px-8 py-6 space-y-5">
          <div className="space-y-2">
            {['immediate', 'scheduled'].map(opt => (
              <label key={opt} className={cn('flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all', mode === opt ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300')}>
                <input type="radio" value={opt} {...register('sendMode')} className="mt-0.5 accent-indigo-600 shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-slate-800">{opt === 'immediate' ? '⚡ Send Immediately' : '📅 Schedule for Later'}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{opt === 'immediate' ? 'Send right after the Review step confirmation' : 'Choose a specific date and time'}</p>
                </div>
              </label>
            ))}
          </div>
          {/* {mode === 'scheduled' && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><Input label="Date" type="date" min={formatDate(new Date())} error={errors.date?.message} {...register('date')} /><Input label="Time" type="time" error={errors.time?.message} {...register('time')} /></div>} */}
         {mode === 'scheduled' && (
  <div className="space-y-5">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Date
        </label>

        <input
          type="date"
          min={formatDate(new Date())}
          {...register('date')}
          className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-300
            px-4
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500/20
            focus:border-indigo-500
          "
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Time
        </label>

        <input
          type="time"
          {...register('time')}
          className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-300
            px-4
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500/20
            focus:border-indigo-500
          "
        />
      </div>

    </div>

    <div className="max-w-md">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Timezone
      </label>

      <select
        {...register("timezone")}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          text-sm
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500/20
          focus:border-indigo-500
        "
      >
        <option value="Asia/Kolkata">Asia/Kolkata (IST, UTC+5:30)</option>
        <option value="Europe/Stockholm">Europe/Stockholm (CET, UTC+1)</option>
        <option value="America/New_York">America/New_York (EST, UTC-5)</option>
        <option value="UTC">UTC</option>
      </select>
    </div>

  </div>
)}
     <Alert variant="info"><strong>Best practice:</strong> For B2B email, Tuesdays and Thursdays at 9–11 AM typically see the highest open rates.</Alert>
        </div>
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between"><Button variant="secondary" type="button" onClick={prevStep}>← Back</Button><Button variant="primary" type="submit">Continue → Review</Button></div>
      </form>
    </div>
  );
}
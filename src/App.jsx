


// // App.jsx – Single entry point with routing
// import { lazy, Suspense } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './app/Layout';
// import Providers from './app/Provider';
// import ProtectedRoute from './shared/components/guards/ProtectedRoute';
// import PageLoader from './shared/components/feedback/PageLoader';
// import Billing from './dashboard/Billing';
// import WalletCheckout from './dashboard/WalletCheckout';
// import ResetPasswordPage from './Features/auth/ResetPasswordPage';
// import CampaignLogsPage from './campaigns/CampaignLogsPage';
// import SetPasswordPage from './Features/auth/SetPasswordPage'; // ✅ import SetPasswordPage

// // ===================== Route constants =====================
// const ROUTES = {
//   LOGIN: '/login',
//   CONTACTS: '/contacts',
//   LISTS: '/lists',
//   SUPPRESSION: '/suppression',
//   CAMPAIGNS: '/campaigns',
//   CAMPAIGN_CALENDAR: '/calendar',
//   CAMPAIGN_NEW: '/campaigns/new',
//   TEMPLATES: '/templates',
//   TEMPLATE_NEW: '/templates/new',
//   ANALYTICS: '/analytics',
//   AUTOMATION: '/automation',
//   SETTINGS: '/settings',
//   CHATBOT: '/chatbot',
//   BILLING: '/billing',
//   WALLET_CHECKOUT: '/wallet/checkout',
//   INBOX: '/inbox',
//   EMAIL_LOGS: '/email/logs',
//   WHATSAPP_LOGS: '/whatsapp/logs',
// };

// // Lazy-loaded pages
// const LoginPage = lazy(() => import('./Features/auth/LoginPage'));
// const DashboardPage = lazy(() => import('./dashboard/DashboardPage'));
// const ContactsPage = lazy(() => import('./contacts/ContactsPage'));
// const ListsPage = lazy(() => import('./contacts/ListsPage'));
// const SuppressionPage = lazy(() => import('./contacts/SuppressionPage'));
// const CampaignsPage = lazy(() => import('./campaigns/CampaignsPage'));
// const CampaignDetailPage = lazy(() => import('./campaigns/CampaignDetailPage'));
// const CampaignCalendarPage = lazy(() => import('./campaigns/CampaignCalendarPage'));
// const WizardShell = lazy(() => import('./campaigns/wizard/WizardShell'));
// const TemplateLibraryPage = lazy(() => import('./templates/TemplateLibraryPage'));
// const TemplateEditorPage = lazy(() => import('./templates/TemplateEditorPage'));
// const AnalyticsPage = lazy(() => import('./Features/Analytics/AnalyticsPage'));
// const AutomationPage = lazy(() => import('./Features/automation/AutomationPage'));
// const SettingsPage = lazy(() => import('./settings/SettingsPage'));
// const ChatbotPage = lazy(() => import('./chatbot/Chatbot'));
// const BillingPage = lazy(() => import('./dashboard/Billing'));
// const WalletCheckoutPage = lazy(() => import('./dashboard/WalletCheckout'));
// const NotFoundPage = lazy(() => import('./dashboard/NotFound'));
// const InboxPage = lazy(() => import('./Inbox/inbox'));
// const EmailLogs = lazy(() => import('./email/email'));
// const WhatsAppLogs = lazy(() => import('./whatsapp/whatsapp'));

// const Wrap = ({ children }) => (
//   <Suspense fallback={<PageLoader />}>{children}</Suspense>
// );

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Providers>
//         <Routes>
//           {/* ✅ PUBLIC ROUTES (no authentication needed) */}
//           <Route path={ROUTES.LOGIN} element={<Wrap><LoginPage /></Wrap>} />
//           <Route path="/reset-password" element={<Wrap><ResetPasswordPage /></Wrap>} />
//           <Route path="/set-password/:token" element={<Wrap><SetPasswordPage /></Wrap>} />

//           {/* ✅ PROTECTED ROUTES (require authentication) */}
//           <Route element={<ProtectedRoute />}>
//             <Route element={<Layout />}>
//               <Route index element={<Wrap><DashboardPage /></Wrap>} />
//               <Route path="/dashboard" element={<Wrap><DashboardPage /></Wrap>} />

//               {/* Contacts */}
//               <Route path={ROUTES.CONTACTS} element={<Wrap><ContactsPage /></Wrap>} />
//               <Route path={ROUTES.LISTS} element={<Wrap><ListsPage /></Wrap>} />
//               <Route path={ROUTES.SUPPRESSION} element={<Wrap><SuppressionPage /></Wrap>} />

//               {/* Campaigns */}
//               <Route path={ROUTES.CAMPAIGNS} element={<Wrap><CampaignsPage /></Wrap>} />
//               <Route path={ROUTES.CAMPAIGN_CALENDAR} element={<Wrap><CampaignCalendarPage /></Wrap>} />
//               <Route path="/campaigns/:id" element={<Wrap><CampaignDetailPage /></Wrap>} />
//               <Route
//                 path="/campaigns/:id/logs"
//                 element={<CampaignLogsPage />}
//               />
//               <Route path={ROUTES.CAMPAIGN_NEW} element={<Wrap><WizardShell /></Wrap>} />
//               <Route
//                 path="/campaigns/edit/:id"
//                 element={<Wrap><WizardShell /></Wrap>}
//               />

//               {/* Templates */}
//               <Route path={ROUTES.TEMPLATES} element={<Wrap><TemplateLibraryPage /></Wrap>} />
//               <Route path={ROUTES.TEMPLATE_NEW} element={<Wrap><TemplateEditorPage /></Wrap>} />
//               <Route path="/templates/:id/edit" element={<Wrap><TemplateEditorPage /></Wrap>} />

//               {/* Analytics, Automation, Chatbot */}
//               <Route path={ROUTES.ANALYTICS} element={<Wrap><AnalyticsPage /></Wrap>} />
//               <Route path={ROUTES.AUTOMATION} element={<Wrap><AutomationPage /></Wrap>} />
//               <Route path={ROUTES.CHATBOT} element={<Wrap><ChatbotPage /></Wrap>} />

//               {/* Inbox (WhatsApp) */}
//               <Route path={ROUTES.INBOX} element={<Wrap><InboxPage /></Wrap>} />

//               {/* Email Logs */}
//               <Route path={ROUTES.EMAIL_LOGS} element={<Wrap><EmailLogs /></Wrap>} />

//               {/* WhatsApp Message Logs */}
//               <Route path={ROUTES.WHATSAPP_LOGS} element={<Wrap><WhatsAppLogs /></Wrap>} />

//               {/* Billing & Wallet */}
//               <Route path={ROUTES.BILLING} element={<Wrap><BillingPage /></Wrap>} />
//               <Route path={ROUTES.WALLET_CHECKOUT} element={<Wrap><WalletCheckoutPage /></Wrap>} />

//               {/* Settings */}
//               <Route path={ROUTES.SETTINGS} element={<Wrap><SettingsPage /></Wrap>} />
//               <Route path="/settings/:tab" element={<Wrap><SettingsPage /></Wrap>} />

//               {/* 404 Not Found – inside layout */}
//               <Route path="*" element={<Wrap><NotFoundPage /></Wrap>} />
//             </Route>
//           </Route>
//         </Routes>
//       </Providers>
//     </BrowserRouter>
//   );
// }


// App.jsx – Single entry point with routing
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // ✅ Added Navigate
import Layout from './app/Layout';
import Providers from './app/Provider';
import ProtectedRoute from './shared/components/guards/ProtectedRoute';
import PageLoader from './shared/components/feedback/PageLoader';
import Billing from './dashboard/Billing';
import WalletCheckout from './dashboard/WalletCheckout';
import ResetPasswordPage from './Features/auth/ResetPasswordPage';
import CampaignLogsPage from './campaigns/CampaignLogsPage';
import SetPasswordPage from './Features/auth/SetPasswordPage';

// ✅ Import the EmailBuilder component
import EmailBuilder from './templates/TemplateBuilder';

// ✅ Import the AI Template Generator
import AITemplateGenerator from './templates/AITemplateGenerator';
import AcceptInvite from './settings/AcceptInvite'; 

// ===================== Route constants =====================
const ROUTES = {
  SIGNUP: '/signup', // ✅ ADDED
  LOGIN: '/login',
  CONTACTS: '/contacts',
  LISTS: '/lists',
  SUPPRESSION: '/suppression',
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_CALENDAR: '/calendar',
  CAMPAIGN_NEW: '/campaigns/new',
  TEMPLATES: '/templates',
  TEMPLATE_NEW: '/templates/new',
  ANALYTICS: '/analytics',
  AUTOMATION: '/automation',
  SETTINGS: '/settings',
  CHATBOT: '/chatbot',
  BILLING: '/billing',
  WALLET_CHECKOUT: '/wallet/checkout',
  INBOX: '/inbox',
  EMAIL_LOGS: '/email/logs',
  WHATSAPP_LOGS: '/whatsapp/logs',
  EMAIL_BUILDER: '/email-builder',
  AI_TEMPLATES: '/ai-templates',
};

// Lazy-loaded pages
const LoginPage = lazy(() => import('./Features/auth/LoginPage'));
// ✅ REMOVED SignupPage import - we don't need it
const DashboardPage = lazy(() => import('./dashboard/DashboardPage'));
const ContactsPage = lazy(() => import('./contacts/ContactsPage'));
const ListsPage = lazy(() => import('./contacts/ListsPage'));
const SuppressionPage = lazy(() => import('./contacts/SuppressionPage'));
const CampaignsPage = lazy(() => import('./campaigns/CampaignsPage'));
const CampaignDetailPage = lazy(() => import('./campaigns/CampaignDetailPage'));
const CampaignCalendarPage = lazy(() => import('./campaigns/CampaignCalendarPage'));
const WizardShell = lazy(() => import('./campaigns/wizard/WizardShell'));
const TemplateLibraryPage = lazy(() => import('./templates/TemplateLibraryPage'));
const TemplateEditorPage = lazy(() => import('./templates/TemplateEditorPage'));
const AnalyticsPage = lazy(() => import('./Features/Analytics/AnalyticsPage'));
const AutomationPage = lazy(() => import('./Features/automation/AutomationPage'));
const SettingsPage = lazy(() => import('./settings/SettingsPage'));
const ChatbotPage = lazy(() => import('./chatbot/Chatbot'));
const BillingPage = lazy(() => import('./dashboard/Billing'));
const WalletCheckoutPage = lazy(() => import('./dashboard/WalletCheckout'));
const NotFoundPage = lazy(() => import('./dashboard/NotFound'));
const InboxPage = lazy(() => import('./Inbox/inbox'));
const EmailLogs = lazy(() => import('./email/email'));
const WhatsAppLogs = lazy(() => import('./whatsapp/whatsapp'));

const Wrap = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          {/* PUBLIC ROUTES */}
          {/* ✅ Root redirects to signup */}
          <Route path="/" element={<Navigate to={ROUTES.SIGNUP} replace />} />
          
          {/* ✅ Signup page - shows signup form by default */}
          <Route path={ROUTES.SIGNUP} element={
            <Wrap>
              <LoginPage initialMode="signup" />
            </Wrap>
          } />
          
          {/* Login page - shows login form by default */}
          <Route path={ROUTES.LOGIN} element={<Wrap><LoginPage /></Wrap>} />
          
          <Route path="/reset-password" element={<Wrap><ResetPasswordPage /></Wrap>} />
          <Route path="/set-password/:token" element={<Wrap><SetPasswordPage /></Wrap>} />
          <Route path="/accept-invite" element={<Wrap><AcceptInvite /></Wrap>} />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Wrap><DashboardPage /></Wrap>} />
              <Route path="/dashboard" element={<Wrap><DashboardPage /></Wrap>} />

              {/* Contacts */}
              <Route path={ROUTES.CONTACTS} element={<Wrap><ContactsPage /></Wrap>} />
              <Route path={ROUTES.LISTS} element={<Wrap><ListsPage /></Wrap>} />
              <Route path={ROUTES.SUPPRESSION} element={<Wrap><SuppressionPage /></Wrap>} />

              {/* Campaigns */}
              <Route path={ROUTES.CAMPAIGNS} element={<Wrap><CampaignsPage /></Wrap>} />
              <Route path={ROUTES.CAMPAIGN_CALENDAR} element={<Wrap><CampaignCalendarPage /></Wrap>} />
              <Route path="/campaigns/:id" element={<Wrap><CampaignDetailPage /></Wrap>} />
              <Route path="/campaigns/:id/logs" element={<CampaignLogsPage />} />
              <Route path={ROUTES.CAMPAIGN_NEW} element={<Wrap><WizardShell /></Wrap>} />
              <Route path="/campaigns/edit/:id" element={<Wrap><WizardShell /></Wrap>} />

              {/* Templates */}
              <Route path={ROUTES.TEMPLATES} element={<Wrap><TemplateLibraryPage /></Wrap>} />
              <Route path={ROUTES.TEMPLATE_NEW} element={<Wrap><TemplateEditorPage /></Wrap>} />
              <Route path="/templates/:id/edit" element={<Wrap><TemplateEditorPage /></Wrap>} />

              {/* Email Builder */}
              <Route path={ROUTES.EMAIL_BUILDER} element={<Wrap><EmailBuilder /></Wrap>} />

              {/* AI Template Generator */}
              <Route path={ROUTES.AI_TEMPLATES} element={<Wrap><AITemplateGenerator /></Wrap>} />

              {/* Analytics, Automation, Chatbot */}
              <Route path={ROUTES.ANALYTICS} element={<Wrap><AnalyticsPage /></Wrap>} />
              <Route path={ROUTES.AUTOMATION} element={<Wrap><AutomationPage /></Wrap>} />
              <Route path={ROUTES.CHATBOT} element={<Wrap><ChatbotPage /></Wrap>} />

              {/* Inbox (WhatsApp) */}
              <Route path={ROUTES.INBOX} element={<Wrap><InboxPage /></Wrap>} />

              {/* Email Logs */}
              <Route path={ROUTES.EMAIL_LOGS} element={<Wrap><EmailLogs /></Wrap>} />

              {/* WhatsApp Message Logs */}
              <Route path={ROUTES.WHATSAPP_LOGS} element={<Wrap><WhatsAppLogs /></Wrap>} />

              {/* Billing & Wallet */}
              <Route path={ROUTES.BILLING} element={<Wrap><BillingPage /></Wrap>} />
              <Route path={ROUTES.WALLET_CHECKOUT} element={<Wrap><WalletCheckoutPage /></Wrap>} />

              {/* Settings */}
              <Route path={ROUTES.SETTINGS} element={<Wrap><SettingsPage /></Wrap>} />
              <Route path="/settings/:tab" element={<Wrap><SettingsPage /></Wrap>} />

              {/* 404 */}
              <Route path="*" element={<Wrap><NotFoundPage /></Wrap>} />
            </Route>
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}
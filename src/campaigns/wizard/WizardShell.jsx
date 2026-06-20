
// WizardShell.jsx – adapted for embedding inside dashboard content (no full-screen)
import React, { createContext, useContext, useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Step1Setup from './Step1Setup';
import Step2Audience from './Step2Audience';
import Step3Content from './Step3Content';
import Step4Schedule from './Step4Schedule';
import Step5Review from './Step5Review';
import Step6Confirm from './Step6Confirm';
import WizardProgressBar from './WizardProgressBar';
import { ToastProvider } from './Step5Review';

import { useParams } from 'react-router-dom';
import { getCampaignById } from '../../services/api/campaignApi';

// ---------- Shared Wizard Context ----------
const WizardContext = createContext(null);

export const useWizardStore = () => {
  const context = useContext(WizardContext);
  if (!context) throw new Error('useWizardStore must be used within WizardProvider');
  return context;
};

const WizardProvider = ({ children }) => {
  const [state, setState] = useState({
    campaignName: '',
    channel: null,
    goalLabel: null,
    audienceListIds: [],
    excludeListIds: [],
    estimatedRecipients: 0,
    suppressedCount: 0,
    subjectLine: '',
    previewText: '',
    templateId: '',
    senderIdentityId: '',
    sendMode: 'immediate',
    scheduledAt: null,
    timezone: 'Asia/Kolkata',
    createdCampaignId: null,
  });
  const [step, setStep] = useState(1);

  const setStep1 = ({ campaignName, channel, goalLabel }) =>
    setState(prev => ({ ...prev, campaignName, channel, goalLabel }));
  const setStep2 = ({ audienceListIds, excludeListIds, estimatedRecipients, suppressedCount }) =>
    setState(prev => ({ ...prev, audienceListIds, excludeListIds, estimatedRecipients, suppressedCount }));
  const setStep3 = ({ subjectLine, previewText, templateId, senderIdentityId }) =>
    setState(prev => ({ ...prev, subjectLine, previewText, templateId, senderIdentityId }));
  const setStep4 = ({ sendMode, scheduledAt, timezone }) =>
    setState(prev => ({ ...prev, sendMode, scheduledAt, timezone }));
  const setCreatedCampaignId = (id) => setState(prev => ({ ...prev, createdCampaignId: id }));
  const reset = () => {
    setState({
      campaignName: '', channel: null, goalLabel: null,
      audienceListIds: [], excludeListIds: [], estimatedRecipients: 0, suppressedCount: 0,
      subjectLine: '', previewText: '', templateId: '', senderIdentityId: '',
      sendMode: 'immediate', scheduledAt: null, timezone: 'Asia/Kolkata',
      createdCampaignId: null,
    });
    setStep(1);
  };
  const nextStep = () => setStep(s => Math.min(6, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <WizardContext.Provider value={{
  ...state,
  step,
  setStep, 
  setStep1,
  setStep2,
  setStep3,
  setStep4,
  setCreatedCampaignId,
  reset,
  nextStep,
  prevStep
}}>
      {children}
    </WizardContext.Provider>
  );
};

// ---------- Wizard Shell (no min-h-screen, no positioning) ----------
const XIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DiscardButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
    <XIcon /> Discard
  </button>
);

// const navigate = (to) => {
//   console.log(`Navigate to ${to}`);
//   // Use React Router navigate if available, otherwise fallback
//   if (typeof window !== 'undefined' && window.location) {
//     window.location.hash = to;
//   }
// };

const ROUTES = { CAMPAIGNS: '/campaigns' };

const WizardShell = () => {

  const { id } = useParams();


  const isEditMode = !!id;
  const navigate = useNavigate();
 const {
  step,
  setStep,
  reset,
  setStep1,
  setStep2,
  setStep3,
  setStep4,
  setCreatedCampaignId,
} = useWizardStore();
  React.useEffect(() => {

  async function loadCampaign() {

    if (!isEditMode) return;

    try {

      const campaign = await getCampaignById(id);

      console.log(
  JSON.stringify(campaign, null, 2)
);

      // STEP 1 DATA
      setStep1({
        campaignName: campaign.campaign_name,
        channel: campaign.channel,
        goalLabel: campaign.goal_label,
      });
            // STEP 2 DATA
      setStep2({
        audienceListIds: campaign.audience_list_ids || [],
        excludeListIds: campaign.exclude_list_ids || [],
        estimatedRecipients: campaign.estimated_recipients || 0,
        suppressedCount: campaign.suppressed_count || 0,
      });
      // STEP 3 DATA
      setStep3({
        subjectLine: campaign.subject_line || '',
        previewText: campaign.preview_text || '',
        templateId: campaign.template_id || '',
        senderIdentityId: campaign.sender_identity_id || '',
      });

      // STEP 4 DATA
      setStep4({
        sendMode: campaign.send_mode || 'immediate',
        scheduledAt: campaign.scheduled_at,
        timezone: campaign.timezone || 'Asia/Kolkata',
      });

      setCreatedCampaignId(campaign.id);

      setStep(campaign.current_step || 1);

    } catch (error) {

      console.error(error);

    }
  }

  loadCampaign();

}, [id]);
  const handleDiscard = () => { reset(); navigate(ROUTES.CAMPAIGNS); };
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Header inside wizard (optional – you can remove if your outer layout already has a title) */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">New Campaign</h1>
          <p className="text-sm text-slate-500">Create a new email or WhatsApp campaign</p>
        </div>
        {step < 6 && <DiscardButton onClick={handleDiscard} />}
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <WizardProgressBar current={step} />
      </div>

      {/* Step content – overflow visible to allow dropdowns */}
      <div className="overflow-visible">
        <div className="overflow-visible">
          {step === 1 && <Step1Setup />}
          {step === 2 && <Step2Audience />}
          {step === 3 && <Step3Content />}
          {step === 4 && <Step4Schedule />}
          {step === 5 && <Step5Review />}
          {step === 6 && <Step6Confirm />}
        </div>
      </div>
    </div>
  );
};

// Wrap with providers
export default function WizardShellApp() {
  return (
    <ToastProvider>
      <WizardProvider>
        <WizardShell />
      </WizardProvider>
    </ToastProvider>
  );
}
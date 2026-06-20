// frontend/src/Features/automation/CreateSequenceModal.jsx
import { useState, useEffect } from 'react';
import { 
  X, GitBranch, Plus, Trash2, Clock, MessageSquare, Mail, ChevronRight, FileText, Loader2
} from 'lucide-react';
import { createSequence } from '../../services/automationApi';
import { campaignsApi } from '../../services/api/campaigns.api';

const TEMPLATE_API = 'https://wynreach-backend.onrender.com/api/templates';

const Button = ({ children, variant = 'primary', leftIcon, onClick, size = 'sm' }) => {
  const baseClass = "inline-flex items-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variantClass = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";
  const sizeClass = size === 'sm' ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass}`} onClick={onClick}>
      {leftIcon && leftIcon}
      {children}
    </button>
  );
};

const CreateSequenceModal = ({ isOpen, onClose, onSave }) => {
  const [sequenceData, setSequenceData] = useState({
    name: '',
    description: '',
    campaign_id: '',
    campaign_name: '',
    campaign_channel: '',
    steps: [{ 
      id: Date.now(), 
      delay_hours: '0', 
      delay_minutes: '0',
      type: 'whatsapp', 
      template_id: '', 
      template_name: '', 
      template_type: '' 
    }],
  });
  
  const [stepTemplates, setStepTemplates] = useState({});
  const [loadingTemplates, setLoadingTemplates] = useState({});
  const [campaigns, setCampaigns] = useState([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCampaigns();
      loadTemplatesForStep(sequenceData.steps[0].id, 'whatsapp');
    }
  }, [isOpen]);

  const fetchCampaigns = async () => {
    try {
      setCampaignsLoading(true);
      const result = await campaignsApi.getAll();
      console.log('📋 Campaigns API response:', result);

      const availableCampaigns = result.filter(c => 
        c.status === 'sent' || c.status === 'scheduled'
      );

      setCampaigns(
        availableCampaigns.map((campaign) => ({
          id: String(campaign.id),
          name: campaign.campaign_name,
          channel: campaign.channel,
          status: campaign.status,
          sent_at: campaign.sent_at,
          scheduled_at: campaign.scheduled_at,
        }))
      );
      
    } catch (error) {
      console.error('❌ Failed to fetch campaigns:', error);
      setCampaigns([]);
    } finally {
      setCampaignsLoading(false);
    }
  };

  const loadTemplatesForStep = async (stepId, type) => {
    try {
      setLoadingTemplates(prev => ({ ...prev, [stepId]: true }));
      console.log(`📋 Fetching ${type} templates for step ${stepId}...`);
      
      const res = await fetch(`${TEMPLATE_API}/?type=${type}&status=active`);
      const result = await res.json();
      
      let templatesArray = [];
      if (Array.isArray(result)) {
        templatesArray = result;
      } else if (result.data && Array.isArray(result.data)) {
        templatesArray = result.data;
      } else if (result.templates && Array.isArray(result.templates)) {
        templatesArray = result.templates;
      }
      
      const filteredTemplates = templatesArray.filter(template => 
        template.status === 'active' || template.status === 'approved'
      );
      
      console.log(`✅ Found ${filteredTemplates.length} ${type} templates for step ${stepId}`);
      
      setStepTemplates(prev => ({
        ...prev,
        [stepId]: filteredTemplates.map((template) => ({
          id: String(template.id || template._id),
          name: template.name || 'Unnamed Template',
          type: template.type || template.channel || type,
          subject: template.subject || template.subject_line || '',
          content: template.content || template.body || template.text || '',
          status: template.status,
          meta_approved: template.meta_approved || template.status === 'approved',
        }))
      }));
      
    } catch (error) {
      console.error(`❌ Failed to fetch ${type} templates:`, error);
      setStepTemplates(prev => ({ ...prev, [stepId]: [] }));
    } finally {
      setLoadingTemplates(prev => ({ ...prev, [stepId]: false }));
    }
  };

  if (!isOpen) return null;

  const handleSave = async () => {
    console.log('📝 Saving sequence with data:', sequenceData);
    
    if (!sequenceData.name.trim()) {
      alert('Please enter a sequence name');
      return;
    }
    
    if (!sequenceData.campaign_id) {
      alert('Please select a campaign');
      return;
    }
    
    for (const step of sequenceData.steps) {
      if (!step.template_id) {
        alert(`Please select a template for Step ${sequenceData.steps.indexOf(step) + 1}`);
        return;
      }
    }
    
    setIsSaving(true);
    
    try {
      const payload = {
        ...sequenceData,
        steps: sequenceData.steps.map(step => ({
          ...step,
          delay: (parseInt(step.delay_hours) || 0) + (parseInt(step.delay_minutes) || 0) / 60,
        })),
      };
      
      console.log('📤 Calling createSequence API with payload:', payload);
      const newSequence = await createSequence(payload);
      console.log('✅ Sequence created successfully:', newSequence);
      
      if (!newSequence || !newSequence.id) {
        throw new Error('Sequence creation failed - no ID returned');
      }
      
      alert(`✅ Sequence "${newSequence.name}" created successfully!`);
      onSave(newSequence);
      
      setTimeout(() => {
        onClose();
      }, 500);
      
    } catch (err) {
      console.error('❌ Error creating sequence:', err);
      const errorMsg = err.response?.data?.detail || err.message || 'Unknown error';
      alert(`❌ Failed to create sequence: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const addStep = () => {
    const newStep = { 
      id: Date.now(), 
      delay_hours: '24', 
      delay_minutes: '0',
      type: 'whatsapp', 
      template_id: '', 
      template_name: '', 
      template_type: '' 
    };
    
    setSequenceData({
      ...sequenceData,
      steps: [...sequenceData.steps, newStep],
    });
    
    loadTemplatesForStep(newStep.id, 'whatsapp');
  };

  const removeStep = (id) => {
    if (sequenceData.steps.length > 1) {
      setSequenceData({
        ...sequenceData,
        steps: sequenceData.steps.filter(step => step.id !== id),
      });
      setStepTemplates(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const updateStep = (stepId, field, value) => {
    setSequenceData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      ),
    }));
    
    if (field === 'type') {
      loadTemplatesForStep(stepId, value);
    }
  };

  const getTotalDuration = () => {
    let totalHours = 0;
    let totalMinutes = 0;
    
    sequenceData.steps.forEach((step, idx) => {
      if (idx > 0) {
        totalHours += parseInt(step.delay_hours) || 0;
        totalMinutes += parseInt(step.delay_minutes) || 0;
      }
    });
    
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    
    return { hours: totalHours, minutes: totalMinutes };
  };

  const StepTemplateSelector = ({ step, stepIndex, onUpdate }) => {
    const isWhatsApp = step.type === 'whatsapp';
    const availableTemplates = stepTemplates[step.id] || [];
    const isLoading = loadingTemplates[step.id] || false;
    
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              <Clock className="h-3 w-3 inline mr-1" />
              Wait Hours
            </label>
            <input 
              type="number" 
              value={step.delay_hours} 
              onChange={(e) => onUpdate('delay_hours', e.target.value)} 
              min="0" 
              max="720" 
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
              disabled={stepIndex === 0} 
            />
            {stepIndex === 0 && <p className="text-xs text-slate-400 mt-1">First step sends immediately</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              <Clock className="h-3 w-3 inline mr-1" />
              Wait Minutes
            </label>
            <input 
              type="number" 
              value={step.delay_minutes} 
              onChange={(e) => onUpdate('delay_minutes', e.target.value)} 
              min="0" 
              max="59" 
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
              disabled={stepIndex === 0} 
            />
            {stepIndex === 0 && <p className="text-xs text-slate-400 mt-1">First step sends immediately</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Channel</label>
            <select 
              value={step.type} 
              onChange={(e) => {
                const newType = e.target.value;
                onUpdate('type', newType);
                onUpdate('template_id', '');
                onUpdate('template_name', '');
                onUpdate('template_type', '');
              }} 
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            {step.type === 'whatsapp' ? <MessageSquare className="h-3 w-3 inline mr-1" /> : <Mail className="h-3 w-3 inline mr-1" />}
            Select {step.type === 'whatsapp' ? 'WhatsApp' : 'Email'} Template
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-2">
            {isLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
              </div>
            ) : availableTemplates.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p>No {step.type} templates found.</p>
                {isWhatsApp ? (
                  <p className="text-xs mt-1">WhatsApp templates need <strong>status='active'</strong> and <strong>Meta approval</strong>.</p>
                ) : (
                  <p className="text-xs mt-1">Email templates need <strong>status='active'</strong>.</p>
                )}
                <a href="/templates" className="text-indigo-600 text-sm hover:underline mt-2 inline-block">
                  Create a {step.type} template →
                </a>
              </div>
            ) : (
              availableTemplates.map((template) => {
                let previewText = '';
                if (typeof template.content === 'string') {
                  previewText = template.content;
                }
                
                return (
                  <label
                    key={template.id}
                    className={`flex items-start gap-3 p-2 rounded-lg border cursor-pointer transition-colors ${
                      step.template_id === template.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`step_${step.id}_template`}
                      checked={step.template_id === template.id}
                      onChange={() => {
                        onUpdate('template_id', template.id);
                        onUpdate('template_name', template.name);
                        onUpdate('template_type', template.type);
                      }}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-slate-800 text-sm">{template.name}</p>
                        {isWhatsApp ? (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                            ✅ Meta Approved
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                            📧 Email Template
                          </span>
                        )}
                      </div>
                      {step.type === 'email' && template.subject && (
                        <p className="text-xs font-medium text-slate-600 mt-1">Subject: {template.subject}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {previewText.substring(0, 80)}...
                      </p>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>
        
        {step.template_id && step.template_name && (
          <div className="bg-indigo-50 rounded-lg p-2 border border-indigo-100">
            <p className="text-xs text-indigo-700 flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Selected: {step.template_name}
            </p>
          </div>
        )}
      </div>
    );
  };

  const totalDuration = getTotalDuration();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <GitBranch className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Create Follow-up Sequence</h3>
              <p className="text-xs text-slate-400">Multi-channel follow-ups based on campaign</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-6 py-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sequence Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              value={sequenceData.name} 
              onChange={(e) => setSequenceData({ ...sequenceData, name: e.target.value })} 
              placeholder="e.g., Summer Sale Follow-ups" 
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
            <textarea 
              value={sequenceData.description} 
              onChange={(e) => setSequenceData({ ...sequenceData, description: e.target.value })} 
              placeholder="Brief description..." 
              rows={2} 
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm resize-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Select Campaign <span className="text-red-500">*</span>
            </label>
            <select
              value={sequenceData.campaign_id}
              onChange={(e) => {
                const selectedCampaign = campaigns.find(c => c.id === e.target.value);
                setSequenceData(prev => ({
                  ...prev,
                  campaign_id: e.target.value,
                  campaign_name: selectedCampaign?.name || '',
                  campaign_channel: selectedCampaign?.channel || ''
                }));
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">
                {campaignsLoading ? 'Loading campaigns...' : 'Select a campaign'}
              </option>
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name} ({campaign.channel}) - 
                  {campaign.status === 'sent' ? `Sent: ${campaign.sent_at ? new Date(campaign.sent_at).toLocaleDateString() : 'N/A'}` : 'Scheduled'}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">Follow-ups will be sent based on this campaign's sent time</p>
          </div>
          
          <div className="border-t border-slate-100 pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Sequence Steps</h3>
                <p className="text-xs text-slate-400 mt-0.5">Each step can use different channels (WhatsApp/Email)</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {sequenceData.steps.map((step, index) => (
                <div key={step.id} className="bg-slate-50 rounded-xl p-5 space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Step {index + 1}</h4>
                    </div>
                    {sequenceData.steps.length > 1 && (
                      <button onClick={() => removeStep(step.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    )}
                  </div>
                                                 
                  <StepTemplateSelector 
                    step={step}
                    stepIndex={index}
                    onUpdate={(field, value) => updateStep(step.id, field, value)}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <button
                onClick={addStep}
                className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Follow-up
              </button>
            </div>
          </div>
          
          <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-5">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-indigo-600" />
              Sequence Overview
            </h4>
            <div className="space-y-2">
              {sequenceData.steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>
                    {index === 0 ? 'Immediately' : `After ${step.delay_hours}h ${step.delay_minutes}m`}
                  </span>
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                  <span>Send {step.type === 'whatsapp' ? 'WhatsApp' : 'Email'}</span>
                  {step.template_name && (
                    <span className="text-xs text-slate-400 ml-1">({step.template_name})</span>
                  )}
                </div>
              ))}
            </div>
            {sequenceData.steps.length > 1 && (
              <div className="mt-3 pt-3 border-t border-indigo-100 text-xs text-slate-500">
                Total duration: {totalDuration.hours}h {totalDuration.minutes}m
              </div>
            )}
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white flex flex-col sm:flex-row items-center justify-end gap-3 px-6 py-5 border-t border-slate-100">
          <button 
            onClick={onClose} 
            className="w-full sm:w-auto px-6 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium text-sm"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Sequence'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSequenceModal;
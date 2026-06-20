// frontend/src/Features/automation/CreateRuleModal.jsx
import { useState, useEffect } from 'react';
import { X, ChevronRight, FileText, Loader2 } from 'lucide-react';
import { createRule } from '../../services/api/automation.api';
import { templatesApi } from '../../services/templates.api';

const TRIGGER_TYPES = [
  { id: 'message_sent', label: 'Message sent', description: 'When a message is sent to a contact' },
  { id: 'message_delivered', label: 'Message delivered', description: 'When a message is delivered to contact' },
  { id: 'message_read', label: 'Message read', description: 'When a contact reads your message' },
  { id: 'message_replied', label: 'Message replied', description: 'When a contact replies to your message' },
];

// Fallback campaigns (will be used if API fails)
const FALLBACK_CAMPAIGNS = [
  {
    id: 'camp_1',
    campaign_name: 'Summer Sale 2024',
    channel: 'email',
    status: 'sent',
    sent_at: '2024-06-01T00:00:00Z',
    created_at: '2024-05-01T00:00:00Z'
  },
  {
    id: 'camp_2',
    campaign_name: 'Welcome Email Series',
    channel: 'email',
    status: 'draft',
    sent_at: null,
    created_at: '2024-05-15T00:00:00Z'
  },
  {
    id: 'camp_3',
    campaign_name: 'Abandoned Cart Reminder',
    channel: 'whatsapp',
    status: 'scheduled',
    sent_at: null,
    created_at: '2024-05-20T00:00:00Z'
  }
];

// Fallback templates (will be used if API fails)
const FALLBACK_WHATSAPP_TEMPLATES = [
  { id: 1, name: 'Welcome Template', type: 'whatsapp', status: 'active', meta_approved: true, content: 'Welcome {{contact_name}}! Thanks for joining.' },
  { id: 2, name: 'Order Confirmation', type: 'whatsapp', status: 'active', meta_approved: true, content: 'Your order #{{order_id}} has been confirmed.' },
  { id: 3, name: 'Appointment Reminder', type: 'whatsapp', status: 'active', meta_approved: true, content: 'Reminder: Your appointment is on {{date}} at {{time}}.' },
];

const FALLBACK_EMAIL_TEMPLATES = [
  { id: 1, name: 'Welcome Email', type: 'email', status: 'active', subject: 'Welcome to our platform!', content: 'Dear {{contact_name}}...' },
  { id: 2, name: 'Weekly Newsletter', type: 'email', status: 'active', subject: 'This week\'s updates', content: 'Here\'s what\'s new this week...' },
];

const getActionTypes = (campaignChannel) => {
  const commonActions = [
    { id: 'add_to_list', label: 'Add to list', description: 'Add contact to a specific list' },
    { id: 'add_tag', label: 'Add tag', description: 'Add a tag to the contact' },
    { id: 'remove_tag', label: 'Remove tag', description: 'Remove a tag from the contact' },
    { id: 'notify_team', label: 'Notify team', description: 'Send notification to team members' },
  ];
  
  if (campaignChannel === 'whatsapp') {
    return [
      { id: 'send_whatsapp_message', label: 'Send WhatsApp message', description: 'Send a WhatsApp template message' },
      ...commonActions
    ];
  } else if (campaignChannel === 'email') {
    return [
      { id: 'send_email_campaign', label: 'Send email campaign', description: 'Send an email campaign to the contact' },
      ...commonActions
    ];
  }
  
  return commonActions;
};

const CONDITION_TYPES = [
  { id: 'always', label: 'Always (no condition)', description: 'Execute action for every contact' },
  { id: 'field_equals', label: 'Field equals value', description: 'Check if a contact field equals a specific value' },
  { id: 'tag_exists', label: 'Has tag', description: 'Check if contact has a specific tag' },
];

const Button = ({ children, variant = 'primary', onClick, disabled, loading }) => {
  const baseClass = "inline-flex items-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm focus:ring-indigo-500"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-300";
  return (
    <button className={`${baseClass} ${variantClass} px-4 py-2 text-sm`} onClick={onClick} disabled={disabled || loading}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {children}
    </button>
  );
};

const CreateRuleModal = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [actionTypes, setActionTypes] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  
  const [ruleData, setRuleData] = useState({
    name: '',
    description: '',
    campaign_id: '',
    campaign_name: '',
    campaign_channel: '',
    trigger_type: 'message_read',
    trigger_config: {},
    condition_type: 'always',
    condition_config: {},
    action_type: '',
    action_config: {
      template_id: '',
      template_name: '',
      template_type: '',
    },
  });

  // Fetch ALL campaigns when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchAllCampaigns();
    }
  }, [isOpen]);

  // In CreateRuleModal.jsx - fetch all campaigns for dropdown
const fetchAllCampaigns = async () => {
  const response = await fetch('https://wynreach-backend.onrender.com/api/campaigns');
  const campaigns = await response.json();
  setCampaigns(campaigns); // User selects from existing campaigns
};

// In CreateRuleModal.jsx - Replace the fetchTemplates function

const fetchTemplates = async (templateType) => {
  setLoadingTemplates(true);
  setError(null);
  
  try {
    console.log(`Fetching ${templateType} templates from API...`);
    
    // Call the templates API
    const response = await templatesApi.getAll({ type: templateType });
    console.log('API Response:', response);
    
    // Extract templates from response (handle different response structures)
    let allTemplates = [];
    
    if (Array.isArray(response)) {
      allTemplates = response;
    } else if (response.data && Array.isArray(response.data)) {
      allTemplates = response.data;
    } else if (response.templates && Array.isArray(response.templates)) {
      allTemplates = response.templates;
    } else if (response.results && Array.isArray(response.results)) {
      allTemplates = response.results;
    }
    
    console.log(`Found ${allTemplates.length} total templates`);
    
    // Filter for WhatsApp templates
    const whatsappTemplates = allTemplates.filter(t => 
      t.type?.toLowerCase() === 'whatsapp' || 
      t.channel?.toLowerCase() === 'whatsapp'
    );
    
    console.log(`Found ${whatsappTemplates.length} WhatsApp templates`);
    
    // Filter for Meta approved templates only
    const approvedTemplates = whatsappTemplates.filter(t => 
      t.meta_approved === true || t.status === 'active'
    );
    
    console.log(`Found ${approvedTemplates.length} Meta approved templates`);
    
    if (approvedTemplates.length > 0) {
      setTemplates(approvedTemplates);
    } else {
      setTemplates([]);
      setError('No Meta-approved WhatsApp templates found. Templates need Meta approval to be used in automation.');
    }
    
  } catch (err) {
    console.error(`Failed to fetch ${templateType} templates:`, err);
    setTemplates([]);
    setError(`Could not load templates. Error: ${err.message}`);
  } finally {
    setLoadingTemplates(false);
  }
};

  // Update action types when campaign channel changes
  useEffect(() => {
    if (ruleData.campaign_channel) {
      const newActionTypes = getActionTypes(ruleData.campaign_channel);
      setActionTypes(newActionTypes);
      
      if (ruleData.campaign_channel === 'whatsapp') {
        setRuleData(prev => ({
          ...prev,
          action_type: 'send_whatsapp_message',
          action_config: { template_id: '', template_name: '', template_type: 'whatsapp' }
        }));
      } else if (ruleData.campaign_channel === 'email') {
        setRuleData(prev => ({
          ...prev,
          action_type: 'send_email_campaign',
          action_config: { template_id: '', template_name: '', template_type: 'email' }
        }));
      }
    }
  }, [ruleData.campaign_channel]);

  // Load templates when action type changes
  useEffect(() => {
    if (isOpen && ruleData.action_type) {
      if (ruleData.action_type === 'send_whatsapp_message') {
        fetchTemplates('whatsapp');
      } else if (ruleData.action_type === 'send_email_campaign') {
        fetchTemplates('email');
      } else {
        setTemplates([]);
      }
    }
  }, [ruleData.action_type, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!ruleData.name.trim()) {
      setError('Please enter a rule name');
      return;
    }
    
    if (!ruleData.campaign_id) {
      setError('Please select a target campaign');
      return;
    }
    
    if (!ruleData.action_type) {
      setError('Please select an action');
      return;
    }
    
    if ((ruleData.action_type === 'send_whatsapp_message' || ruleData.action_type === 'send_email_campaign') && !ruleData.action_config.template_id) {
      setError('Please select a template');
      return;
    }
    
    setIsCreating(true);
    setError(null);
    
    try {
      const newRule = await createRule(ruleData);
      onSave(newRule);
      onClose();
      setRuleData({
        name: '',
        description: '',
        campaign_id: '',
        campaign_name: '',
        campaign_channel: '',
        trigger_type: 'message_read',
        trigger_config: {},
        condition_type: 'always',
        condition_config: {},
        action_type: '',
        action_config: { template_id: '', template_name: '', template_type: '' },
      });
      setCurrentStep(1);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create rule');
    } finally {
      setIsCreating(false);
    }
  };

  const ActionConfig = () => {
    const selectedAction = ruleData.action_type;
    
    if (selectedAction === 'send_whatsapp_message') {
      return (
        <div className="space-y-4 border-t border-slate-100 pt-4 mt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select WhatsApp Template</label>
            {loadingTemplates ? (
              <div className="flex items-center justify-center py-8 text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading WhatsApp templates...
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto border border-slate-200 rounded-lg p-2">
                {templates.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p>No approved WhatsApp templates found.</p>
                    <p className="text-xs mt-1">Templates need <strong>Meta approval</strong> to be used.</p>
                  </div>
                ) : (
                  templates.map((template) => (
                    <label
                      key={template.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        ruleData.action_config.template_id === template.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="whatsappTemplate"
                        value={template.id}
                        checked={ruleData.action_config.template_id === template.id}
                        onChange={() => {
                          setRuleData(prev => ({
                            ...prev,
                            action_config: {
                              template_id: template.id,
                              template_name: template.name,
                              template_type: 'whatsapp',
                            }
                          }));
                        }}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-800 text-sm">{template.name}</p>
                          {template.meta_approved && (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                              ✅ Meta Approved
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {template.content?.substring(0, 100)}...
                        </p>
                        {template.status && (
                          <p className="text-xs text-slate-400 mt-1">Status: {template.status}</p>
                        )}
                      </div>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>
          {ruleData.action_config.template_id && (
            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
              <p className="text-xs text-indigo-700 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Selected: {ruleData.action_config.template_name}
              </p>
            </div>
          )}
        </div>
      );
    }
    
    if (selectedAction === 'send_email_campaign') {
      return (
        <div className="space-y-4 border-t border-slate-100 pt-4 mt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Email Template</label>
            {loadingTemplates ? (
              <div className="flex items-center justify-center py-8 text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading email templates...
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto border border-slate-200 rounded-lg p-2">
                {templates.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p>No active email templates found.</p>
                  </div>
                ) : (
                  templates.map((template) => (
                    <label
                      key={template.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        ruleData.action_config.template_id === template.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="emailTemplate"
                        value={template.id}
                        checked={ruleData.action_config.template_id === template.id}
                        onChange={() => {
                          setRuleData(prev => ({
                            ...prev,
                            action_config: {
                              template_id: template.id,
                              template_name: template.name,
                              template_type: 'email',
                            }
                          }));
                        }}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-800 text-sm">{template.name}</p>
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                            📧 Email Template
                          </span>
                        </div>
                        {template.subject && (
                          <p className="text-xs text-slate-500 mt-1">Subject: {template.subject}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {template.content?.substring(0, 100)}...
                        </p>
                      </div>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>
          {ruleData.action_config.template_id && (
            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
              <p className="text-xs text-indigo-700 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Selected: {ruleData.action_config.template_name}
              </p>
            </div>
          )}
        </div>
      );
    }
    
    // Other action types (add_to_list, add_tag, remove_tag, notify_team)
    if (selectedAction === 'add_to_list') {
      return (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">List Name</label>
          <input
            type="text"
            value={ruleData.action_config.list_name || ''}
            onChange={(e) => setRuleData(prev => ({
              ...prev,
              action_config: { ...prev.action_config, list_name: e.target.value }
            }))}
            placeholder="e.g., VIP List"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
          />
        </div>
      );
    }
    
    if (selectedAction === 'add_tag') {
      return (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tag Name</label>
          <input
            type="text"
            value={ruleData.action_config.tag_name || ''}
            onChange={(e) => setRuleData(prev => ({
              ...prev,
              action_config: { ...prev.action_config, tag_name: e.target.value }
            }))}
            placeholder="e.g., VIP Customer"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
          />
        </div>
      );
    }
    
    if (selectedAction === 'remove_tag') {
      return (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tag Name</label>
          <input
            type="text"
            value={ruleData.action_config.tag_name || ''}
            onChange={(e) => setRuleData(prev => ({
              ...prev,
              action_config: { ...prev.action_config, tag_name: e.target.value }
            }))}
            placeholder="e.g., Old Tag"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
          />
        </div>
      );
    }
    
    if (selectedAction === 'notify_team') {
      return (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notification Message</label>
          <textarea
            value={ruleData.action_config.message || ''}
            onChange={(e) => setRuleData(prev => ({
              ...prev,
              action_config: { ...prev.action_config, message: e.target.value }
            }))}
            rows={3}
            placeholder="Enter notification message..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm resize-none"
          />
        </div>
      );
    }
    
    return null;
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" onClick={handleModalContentClick}>
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Create Automation Rule</h3>
            <p className="text-xs text-slate-400 mt-0.5">Target Campaign → Trigger → Condition → Action</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-6 py-6 space-y-6">
          {error && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
              ⚠️ {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rule Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={ruleData.name}
              onChange={(e) => setRuleData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Follow-up after campaign open"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description (optional)</label>
            <textarea
              value={ruleData.description}
              onChange={(e) => setRuleData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              placeholder="What does this rule do?"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm resize-none"
            />
          </div>
          
          {/* Target Campaign Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Target Campaign <span className="text-red-500">*</span>
            </label>
            {loadingCampaigns ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                <span className="ml-2 text-sm text-slate-500">Loading campaigns...</span>
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-500">No campaigns found.</p>
                <p className="text-xs text-slate-400 mt-1">Please create a campaign first.</p>
              </div>
            ) : (
              <select
                value={ruleData.campaign_id}
                onChange={(e) => {
                  const selectedCampaign = campaigns.find(c => c.id === e.target.value);
                  console.log('Selected campaign:', selectedCampaign);
                  setRuleData(prev => ({
                    ...prev,
                    campaign_id: e.target.value,
                    campaign_name: selectedCampaign?.campaign_name || '',
                    campaign_channel: selectedCampaign?.channel || ''
                  }));
                }}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
              >
                <option value="">Select a campaign</option>
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.campaign_name} ({campaign.channel?.toUpperCase()}) - 
                    Status: {campaign.status?.toUpperCase()}
                    {campaign.sent_at && ` - Sent on ${new Date(campaign.sent_at).toLocaleDateString()}`}
                  </option>
                ))}
              </select>
            )}
            <p className="text-xs text-slate-400 mt-1">
              This rule will be associated with the selected campaign
            </p>
          </div>
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
              <span className={`text-sm ${currentStep >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>Trigger</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
              <span className={`text-sm ${currentStep >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>Condition</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
              <span className={`text-sm ${currentStep >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>Action</span>
            </div>
          </div>
          
          <div className="h-px bg-slate-100 my-4"></div>
          
          <div className="space-y-4">
            {currentStep === 1 && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Trigger Type</label>
                <select
                  value={ruleData.trigger_type}
                  onChange={(e) => setRuleData(prev => ({ ...prev, trigger_type: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
                >
                  {TRIGGER_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  This rule triggers when contacts perform this action on the campaign
                </p>
              </div>
            )}
            
            {currentStep === 2 && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Condition Type</label>
                <select
                  value={ruleData.condition_type}
                  onChange={(e) => setRuleData(prev => ({ ...prev, condition_type: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
                >
                  {CONDITION_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Additional conditions that must be met for the action to execute
                </p>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Action Type</label>
                  {actionTypes.length > 0 ? (
                    <select
                      value={ruleData.action_type}
                      onChange={(e) => {
                        setRuleData(prev => ({ 
                          ...prev, 
                          action_type: e.target.value, 
                          action_config: { template_id: '', template_name: '', template_type: '' }
                        }));
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm"
                    >
                      {actionTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-slate-500 italic">Select a campaign first to see available actions</p>
                  )}
                  
                  {ruleData.campaign_channel && (
                    <p className="text-xs text-blue-600 mt-1">
                      💡 Based on the campaign type ({ruleData.campaign_channel.toUpperCase()}), you can only send {ruleData.campaign_channel.toUpperCase()} follow-ups.
                    </p>
                  )}
                </div>
                <ActionConfig />
              </div>
            )}
          </div>
          
          <div className="flex justify-between pt-4 border-t border-slate-100">
            <div>
              {currentStep > 1 && (
                <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
              )}
            </div>
            <div className="flex gap-3">
              {currentStep < 3 ? (
                <Button variant="primary" onClick={() => setCurrentStep(currentStep + 1)}>Continue</Button>
              ) : (
                <Button variant="primary" onClick={handleSave} loading={isCreating}>Create Rule</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRuleModal;
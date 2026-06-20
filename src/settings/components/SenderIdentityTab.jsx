// SenderIdentityTab.jsx – Complete with Active/Inactive Domain & Email Sync
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// API Configuration
const API_BASE_URL = 'https://wynreach-backend.onrender.com/api/sender-identity';

const getAuthToken = () => {
  const authStr = localStorage.getItem('auth');
  if (authStr) {
    try {
      const auth = JSON.parse(authStr);
      return auth.accessToken || auth.access_token || auth.token;
    } catch (e) {
      console.error('Error parsing auth:', e);
    }
  }
  return localStorage.getItem('access_token') || 
         localStorage.getItem('token') ||
         sessionStorage.getItem('access_token') ||
         sessionStorage.getItem('token');
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== Icons ====================
const PlusIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const MailIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CopyIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ==================== UI Components ====================
const StatusBadge = ({ status }) => {
  const config = {
    active: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Active" },
    inactive: { bg: "bg-gray-100", text: "text-gray-600", label: "Inactive" },
    pending: { bg: "bg-amber-50", text: "text-amber-700", label: "Pending" },
    verified: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Verified" },
    failed: { bg: "bg-red-50", text: "text-red-700", label: "Failed" },
  };
  const { bg, text, label } = config[status] || config.pending;
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
      {label}
    </span>
  );
};

const Button = ({ children, variant, onClick, disabled, loading, className }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    whatsapp: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <XIcon />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
};

// ==================== Main Component ====================
export default function SenderIdentityTab() {
  const [emailDomains, setEmailDomains] = useState([]);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [whatsappNumbers, setWhatsappNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [showDNSInstructions, setShowDNSInstructions] = useState(false);
  const [showLinkNumber, setShowLinkNumber] = useState(false);
  
  const [domainForm, setDomainForm] = useState({ domain: '', sender_name: '' });
  const [domainFormError, setDomainFormError] = useState('');
  
  const [emailForm, setEmailForm] = useState({ prefix: '', selected_domain: '' });
  const [emailFormError, setEmailFormError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newlyAddedDomain, setNewlyAddedDomain] = useState(null);
  const [dnsRecords, setDnsRecords] = useState([]);
  
  const [waForm, setWaForm] = useState({ phone_number: '', account_name: '' });
  const [waFormError, setWaFormError] = useState('');

  // OTP Verification States
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpResendCountdown, setOtpResendCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Show inactive emails toggle
  const [showInactiveEmails, setShowInactiveEmails] = useState(false);

  // ==================== WHATSAPP FUNCTIONS ====================
  
  const handleVerifyWhatsApp = (phoneNumber) => {
    window.open('https://developers.facebook.com/apps/', '_blank');
  };

  const handleCheckVerificationStatus = async (waId, phoneNumber) => {
    try {
      const response = await api.get(`/whatsapp/numbers/${waId}/status`);
      
      if (response.data.is_verified) {
        alert(`✅ WhatsApp number "${phoneNumber}" is verified!`);
      } else {
        alert(`⏳ Number "${phoneNumber}" is still pending verification.`);
      }
      await fetchWhatsAppNumbers();
    } catch (error) {
      alert(`Error checking status: ${error.response?.data?.detail || error.message}`);
    }
  };

  // ==================== ACTIVE/INACTIVE TOGGLE ====================
  
  const handleToggleDomainStatus = async (domainId, domainName, isActive) => {
    const confirmMsg = isActive 
      ? `Deactivate domain "${domainName}"? It will not be available for sending.`
      : `Activate domain "${domainName}"? It will be available for sending.`;
    
    if (!confirm(confirmMsg)) return;
    
    try {
      const response = await api.post('/email-domains/toggle-status', {
        domain_id: domainId
      });
      alert(`✅ Domain "${domainName}" is now ${response.data.status}!`);
      await fetchEmailDomains();
      await fetchEmailAddresses(); // Refresh emails to show updated status
    } catch (error) {
      alert(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  // ==================== API FUNCTIONS ====================
  const fetchEmailDomains = async () => {
    try {
      const response = await api.get('/email-domains');
      console.log('Domains fetched:', response.data);
      setEmailDomains(response.data || []);
    } catch (error) {
      console.error('Error fetching domains:', error);
      setEmailDomains([]);
    }
  };

  const fetchEmailAddresses = async () => {
    try {
      const response = await api.get('/email-addresses', {
        params: { include_inactive: showInactiveEmails }
      });
      console.log('Emails fetched:', response.data);
      setEmailAddresses(response.data || []);
    } catch (error) {
      console.error('Error fetching email addresses:', error);
      setEmailAddresses([]);
    }
  };

  const fetchWhatsAppNumbers = async () => {
    try {
      const response = await api.get('/whatsapp/numbers');
      setWhatsappNumbers(response.data || []);
    } catch (error) {
      console.error('Error fetching WhatsApp numbers:', error);
      setWhatsappNumbers([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchEmailDomains(), fetchEmailAddresses(), fetchWhatsAppNumbers()]);
      setLoading(false);
    };
    loadData();
  }, [showInactiveEmails]);

  // ==================== HANDLERS ====================
  const handleAddDomainSubmit = async () => {
    if (!domainForm.domain.trim()) {
      setDomainFormError('Domain name is required');
      return;
    }
    if (!domainForm.sender_name.trim()) {
      setDomainFormError('Company name is required');
      return;
    }
    
    setDomainFormError('');
    setIsSubmitting(true);
    
    try {
      const response = await api.post('/email-domains', {
        domain: domainForm.domain,
        sender_name: domainForm.sender_name,
        email_address: `temp@${domainForm.domain}`
      });
      
      console.log('Domain creation response:', response.data);
      
      if (response.data.verification_status === 'verified') {
        alert(`✅ Domain "${domainForm.domain}" is already verified! You can create email addresses.`);
        setShowAddDomain(false);
        await fetchEmailDomains();
      } else {
        const domainId = response.data.id;
        const dnsResponse = await api.get(`/email-domains/${domainId}/dns-instructions`);
        setDnsRecords(dnsResponse.data.records || []);
        
        setNewlyAddedDomain({
          id: domainId,
          domain: domainForm.domain
        });
        
        setShowAddDomain(false);
        setShowDNSInstructions(true);
        await fetchEmailDomains();
        
        alert(`📝 Domain "${domainForm.domain}" added! Please add the DNS records to your domain provider and click Verify DNS.`);
      }
      
      setDomainForm({ domain: '', sender_name: '' });
      
    } catch (error) {
      console.error('Error adding domain:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to add domain';
      setDomainFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== OTP EMAIL VERIFICATION ====================
  const handleCreateEmailWithOTP = async () => {
    if (!emailForm.prefix.trim()) {
      setEmailFormError('Email prefix is required');
      return;
    }
    if (!emailForm.selected_domain) {
      setEmailFormError('Please select a domain');
      return;
    }
    
    const prefixRegex = /^[a-zA-Z0-9._-]+$/;
    if (!prefixRegex.test(emailForm.prefix)) {
      setEmailFormError('Only letters, numbers, dots, hyphens, and underscores allowed');
      return;
    }
    
    setEmailFormError('');
    setIsSubmitting(true);
    
    try {
      const fullEmail = `${emailForm.prefix}@${emailForm.selected_domain}`;
      const domainId = emailDomains.find(d => d.domain === emailForm.selected_domain)?.id;
      
      const response = await api.post('/email-addresses', {
        email: fullEmail,
        domain_id: domainId
      });
      
      if (response.data) {
        setShowAddEmail(false);
        setEmailForm({ prefix: '', selected_domain: '' });
        
        setPendingEmail(response.data);
        setShowOTPModal(true);
        setOtpCode('');
        setOtpError('');
        setOtpResendCountdown(60);
        
        const interval = setInterval(() => {
          setOtpResendCountdown(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      setEmailFormError(error.response?.data?.detail || 'Failed to create email address');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsSubmitting(true);
    setOtpError('');
    
    try {
      const response = await api.post(`/email-addresses/verify-otp/${pendingEmail.id}`, {
        otp: otpCode
      });
      
      alert('✅ Email address verified successfully!');
      setShowOTPModal(false);
      setPendingEmail(null);
      setOtpCode('');
      await fetchEmailAddresses();
    } catch (error) {
      setOtpError(error.response?.data?.detail || 'Invalid OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (otpResendCountdown > 0) return;
    
    setIsResending(true);
    
    try {
      await api.post(`/email-addresses/resend-otp/${pendingEmail.id}`);
      alert('📨 New OTP sent to your email!');
      setOtpResendCountdown(60);
      
      const interval = setInterval(() => {
        setOtpResendCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      alert(error.response?.data?.detail || 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  // ==================== REGULAR EMAIL HANDLERS ====================
  const handleDeleteEmailAddress = async (emailId, email) => {
    if (!confirm(`Delete email address "${email}"?`)) return;
    try {
      await api.delete(`/email-addresses/${emailId}`);
      alert(`Email address "${email}" deleted.`);
      await fetchEmailAddresses();
    } catch (error) {
      alert(`Failed to delete: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleVerifyDomain = async (domainId, domainName) => {
    try {
      const response = await api.post('/email-domains/verify', { 
        domain_id: domainId
      });
      
      if (response.data.verified) {
        alert(`✅ Domain "${domainName}" verified successfully!`);
      } else {
        alert(`⏳ Verification pending. ${response.data.message}`);
      }
      await fetchEmailDomains();
    } catch (error) {
      alert(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleDeleteDomain = async (domainId, domainName) => {
    if (!confirm(`Remove domain "${domainName}"? All email addresses under this domain will also be deleted.`)) return;
    try {
      await api.delete(`/email-domains/${domainId}`);
      alert(`Domain "${domainName}" removed.`);
      await Promise.all([fetchEmailDomains(), fetchEmailAddresses()]);
    } catch (error) {
      alert(`Failed to delete: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleLinkNumberSubmit = async () => {
    if (!waForm.phone_number.trim()) {
      setWaFormError('Phone number is required');
      return;
    }
    if (!waForm.account_name.trim()) {
      setWaFormError('Account name is required');
      return;
    }
    
    setWaFormError('');
    setIsSubmitting(true);
    
    try {
      const response = await api.post('/whatsapp/numbers', waForm);
      alert(`WhatsApp number "${waForm.phone_number}" linked successfully!`);
      setShowLinkNumber(false);
      setWaForm({ phone_number: '', account_name: '' });
      await fetchWhatsAppNumbers();
    } catch (error) {
      setWaFormError(error.response?.data?.detail || 'Failed to link WhatsApp number');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWhatsApp = async (waId, phoneNumber) => {
    if (!confirm(`Unlink "${phoneNumber}"?`)) return;
    try {
      await api.delete(`/whatsapp/numbers/${waId}`);
      alert(`WhatsApp number "${phoneNumber}" unlinked.`);
      await fetchWhatsAppNumbers();
    } catch (error) {
      alert(`Failed to unlink: ${error.response?.data?.detail || error.message}`);
    }
  };

  // ✅ Only show verified AND active domains
  const activeVerifiedDomains = emailDomains.filter(d => 
    (d.verification_status === 'verified' || d.verification_status === 'active') && 
    d.is_active !== false
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      
      {/* ==================== HEADER ==================== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Sender Identity</h1>
        <p className="text-slate-500 mt-1">Manage your email domains, email addresses, and WhatsApp numbers</p>
      </div>

      {/* ==================== VERIFIED DOMAINS CARD ==================== */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <GlobeIcon />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Verified Domains</h2>
                <p className="text-sm text-slate-500">Get verified for your domains</p>
              </div>
            </div>
            <Button variant="primary" onClick={() => setShowAddDomain(true)}>
              <PlusIcon /> Add Domain
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {emailDomains.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-slate-300 mb-2">
                <GlobeIcon />
              </div>
              <p className="text-slate-400">No domains added yet</p>
              <Button variant="secondary" onClick={() => setShowAddDomain(true)} className="mt-3">
                Add your first domain
              </Button>
            </div>
          ) : (
            emailDomains.map(domain => (
              <div key={domain.id} className={`px-6 py-4 hover:bg-slate-50 transition-colors ${domain.is_active === false ? 'bg-gray-50/50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${domain.is_active === false ? 'bg-gray-100' : 'bg-slate-100'}`}>
                      <GlobeIcon />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium ${domain.is_active === false ? 'text-gray-400 line-through' : 'text-slate-900'}`}>
                          {domain.domain}
                        </span>
                        <StatusBadge status={domain.verification_status || 'pending'} />
                        {domain.is_default && (
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Default</span>
                        )}
                      </div>
                      <p className={`text-sm mt-0.5 ${domain.is_active === false ? 'text-gray-400' : 'text-slate-500'}`}>
                        {domain.sender_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(domain.verification_status === 'verified' || domain.verification_status === 'active' || domain.verification_status === 'inactive') && (
                      <Button 
                        variant="secondary" 
                        onClick={() => handleToggleDomainStatus(domain.id, domain.domain, domain.is_active !== false)}
                        className={`text-xs px-3 py-1.5 ${domain.is_active !== false ? 'text-amber-600 border-amber-200 hover:bg-amber-50' : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'}`}
                      >
                        {domain.is_active !== false ? '⏸️ Deactivate' : '▶️ Activate'}
                      </Button>
                    )}
                    {domain.verification_status === 'pending' && (
                      <Button variant="secondary" onClick={() => handleVerifyDomain(domain.id, domain.domain)}>
                        Verify DNS
                      </Button>
                    )}
                    <button 
                      onClick={() => handleDeleteDomain(domain.id, domain.domain)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ==================== EMAIL ADDRESSES CARD ==================== */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <MailIcon />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Email Addresses</h2>
                <p className="text-sm text-slate-500">Email addresses you can send from</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-500">
                <input
                  type="checkbox"
                  checked={showInactiveEmails}
                  onChange={(e) => setShowInactiveEmails(e.target.checked)}
                  className="rounded border-slate-300"
                />
                Show inactive
              </label>
              <Button 
                variant="primary" 
                onClick={() => setShowAddEmail(true)}
                disabled={activeVerifiedDomains.length === 0}
              >
                <PlusIcon /> Create Email
              </Button>
            </div>
          </div>
          {activeVerifiedDomains.length === 0 && (
            <div className="mt-2 ml-14">
              <p className="text-xs text-amber-600">⚠️ You need at least one verified and active domain before creating email addresses</p>
            </div>
          )}
        </div>
        
        <div className="divide-y divide-slate-100">
          {emailAddresses.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-slate-300 mb-2">
                <MailIcon />
              </div>
              <p className="text-slate-400">No email addresses created yet</p>
              {activeVerifiedDomains.length > 0 && (
                <Button variant="secondary" onClick={() => setShowAddEmail(true)} className="mt-3">
                  Create your first email address
                </Button>
              )}
            </div>
          ) : (
            emailAddresses.map(email => {
              // ✅ Determine if email is active (based on both email status and domain status)
              const domain = emailDomains.find(d => d.id === email.domain_id);
              const isActive = email.is_active !== false && domain?.is_active !== false;
              
              return (
                <div key={email.id} className={`px-6 py-4 hover:bg-slate-50 transition-colors ${!isActive ? 'bg-gray-50/50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${!isActive ? 'bg-gray-100' : 'bg-emerald-50'}`}>
                        <MailIcon />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-mono font-medium ${!isActive ? 'text-gray-400 line-through' : 'text-slate-900'}`}>
                            {email.email}
                          </span>
                          <StatusBadge status={email.status || 'verified'} />
                          {!isActive ? (
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Inactive</span>
                          ) : (
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">
                          Created {new Date(email.created_at).toLocaleDateString()}
                          {!isActive && ' · Domain deactivated'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteEmailAddress(email.id, email.email)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ==================== WHATSAPP NUMBERS CARD ==================== */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-teal-50 rounded-xl flex items-center justify-center">
                <ChatIcon />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">WhatsApp Numbers</h2>
                <p className="text-sm text-slate-500">Linked WhatsApp Business numbers</p>
              </div>
            </div>
            <Button variant="primary" onClick={() => setShowLinkNumber(true)}>
              <PlusIcon /> Link Number
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {whatsappNumbers.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-slate-300 mb-2">
                <ChatIcon />
              </div>
              <p className="text-slate-400">No WhatsApp numbers linked yet</p>
              <div className="flex justify-center gap-3 mt-3">
                <Button variant="secondary" onClick={() => setShowLinkNumber(true)}>
                  Link your first number
                </Button>
                <Button 
                  variant="whatsapp" 
                  onClick={() => window.open('https://developers.facebook.com/apps/', '_blank')}
                >
                  Get WhatsApp Access
                </Button>
              </div>
            </div>
          ) : (
            whatsappNumbers.map(wa => (
              <div key={wa.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 bg-teal-50 rounded-xl flex items-center justify-center">
                      <ChatIcon />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-slate-900">{wa.phone_number}</span>
                        <StatusBadge status={wa.status || 'pending'} />
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{wa.account_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => handleCheckVerificationStatus(wa.id, wa.phone_number)}
                      className="text-xs px-3 py-1.5"
                    >
                      Check Status
                    </Button>
                    <Button 
                      variant="whatsapp" 
                      onClick={() => handleVerifyWhatsApp(wa.phone_number)}
                      className="text-xs px-3 py-1.5"
                    >
                      Verify on Meta
                    </Button>
                    <button 
                      onClick={() => handleDeleteWhatsApp(wa.id, wa.phone_number)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ==================== MODALS ==================== */}
      
      {/* Add Domain Modal */}
      <Modal isOpen={showAddDomain} onClose={() => setShowAddDomain(false)} title="Add Domain">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Domain Name</label>
            <input
              type="text"
              value={domainForm.domain}
              onChange={(e) => setDomainForm(prev => ({ ...prev, domain: e.target.value }))}
              placeholder="mycompany.com"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-slate-400 mt-1">Enter only the domain (without www or https://)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={domainForm.sender_name}
              onChange={(e) => setDomainForm(prev => ({ ...prev, sender_name: e.target.value }))}
              placeholder="My Company"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          {domainFormError && (
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-sm text-red-600">{domainFormError}</p>
            </div>
          )}
          
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-700">ℹ️ After adding, you'll need to add DNS records to verify domain ownership.</p>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddDomain(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddDomainSubmit} loading={isSubmitting}>
              Add Domain
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Email Modal */}
      <Modal isOpen={showAddEmail} onClose={() => setShowAddEmail(false)} title="Create Email Address">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Prefix</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={emailForm.prefix}
                onChange={(e) => setEmailForm(prev => ({ ...prev, prefix: e.target.value }))}
                placeholder="newsletter"
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <span className="text-slate-500">@</span>
              <select
                value={emailForm.selected_domain}
                onChange={(e) => setEmailForm(prev => ({ ...prev, selected_domain: e.target.value }))}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select domain</option>
                {activeVerifiedDomains.map(domain => (
                  <option key={domain.id} value={domain.domain}>{domain.domain}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-slate-400 mt-1">Examples: newsletter, support, hello, info, contact</p>
          </div>
          
          {emailForm.prefix && emailForm.selected_domain && (
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-700">
                ✓ Full email: <strong className="font-mono">{emailForm.prefix}@{emailForm.selected_domain}</strong>
              </p>
            </div>
          )}
          
          {emailFormError && (
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-sm text-red-600">{emailFormError}</p>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddEmail(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateEmailWithOTP} loading={isSubmitting}>
              Create Email
            </Button>
          </div>
        </div>
      </Modal>

      {/* OTP Verification Modal */}
      <Modal isOpen={showOTPModal} onClose={() => setShowOTPModal(false)} title="Verify Email Address">
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              A 6-digit verification code has been sent to:
            </p>
            <p className="text-sm font-semibold text-blue-900 mt-1">
              {pendingEmail?.email}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Enter Verification Code
            </label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 6) {
                  setOtpCode(value);
                  setOtpError('');
                }
              }}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-2xl tracking-widest font-mono"
              autoFocus
            />
            <p className="text-xs text-slate-400 mt-1">Enter the 6-digit code sent to your email</p>
          </div>
          
          {otpError && (
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-sm text-red-600">{otpError}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <button
              onClick={handleResendOTP}
              disabled={otpResendCountdown > 0 || isResending}
              className={`text-sm ${otpResendCountdown > 0 ? 'text-slate-400' : 'text-indigo-600 hover:text-indigo-800'} font-medium`}
            >
              {isResending ? 'Sending...' : 
               otpResendCountdown > 0 ? `Resend in ${otpResendCountdown}s` : 'Resend OTP'}
            </button>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => {
              setShowOTPModal(false);
              setPendingEmail(null);
              setOtpCode('');
            }}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleVerifyOTP} loading={isSubmitting}>
              Verify Email
            </Button>
          </div>
        </div>
      </Modal>

      {/* DNS Instructions Modal */}
      <Modal isOpen={showDNSInstructions} onClose={() => setShowDNSInstructions(false)} title="DNS Records Required">
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              Add these DNS records to your domain provider to verify ownership of <strong>{newlyAddedDomain?.domain}</strong>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              ⏱️ DNS propagation may take 5-30 minutes. After adding, click "Verify DNS" to check.
            </p>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {dnsRecords.map((record, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden hover:border-indigo-200 transition-colors">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        record.type === 'TXT' ? 'bg-green-100 text-green-700' :
                        record.type === 'CNAME' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {record.type}
                      </span>
                      {record.description && (
                        <span className="text-xs text-slate-500">{record.description}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        const copyText = `${record.type}\nName: ${record.name}\nValue: ${record.value}`;
                        navigator.clipboard.writeText(copyText);
                        alert(`✅ Copied ${record.type} record`);
                      }}
                      className="px-2 py-1 text-slate-500 hover:text-indigo-600 text-xs flex items-center gap-1 rounded hover:bg-slate-100 transition-colors"
                    >
                      <CopyIcon /> Copy All
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Name/Host
                      <span className="text-slate-400 font-normal ml-1">(required)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-slate-100 p-2 rounded flex-1 break-all">{record.name}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(record.name)}
                        className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Copy name"
                      >
                        <CopyIcon />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Value/Data
                      <span className="text-slate-400 font-normal ml-1">(required)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-slate-100 p-2 rounded flex-1 break-all">{record.value}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(record.value)}
                        className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Copy value"
                      >
                        <CopyIcon />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-400 pt-1 border-t border-slate-100">
                    💡 TTL (Time to Live): Set to 3600 (1 hour) or default value
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-amber-50 rounded-lg p-3">
            <p className="text-xs text-amber-700">
              ⚠️ <strong>Important:</strong> After adding these records, wait 5-30 minutes for DNS propagation, 
              then click "Verify DNS" on the domain to complete verification.
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowDNSInstructions(false)}>
              Close
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {
                setShowDNSInstructions(false);
                if (newlyAddedDomain?.id) {
                  handleVerifyDomain(newlyAddedDomain.id, newlyAddedDomain.domain);
                }
              }}
            >
              I've Added the Records
            </Button>
          </div>
        </div>
      </Modal>

      {/* Link WhatsApp Modal */}
      <Modal isOpen={showLinkNumber} onClose={() => setShowLinkNumber(false)} title="Link WhatsApp Number">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={waForm.phone_number}
              onChange={(e) => setWaForm(prev => ({ ...prev, phone_number: e.target.value }))}
              placeholder="+919840012345"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-slate-400 mt-1">Include country code (e.g., +91 for India)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
            <input
              type="text"
              value={waForm.account_name}
              onChange={(e) => setWaForm(prev => ({ ...prev, account_name: e.target.value }))}
              placeholder="My Business"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          {waFormError && (
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-sm text-red-600">{waFormError}</p>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowLinkNumber(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleLinkNumberSubmit} loading={isSubmitting}>
              Link Number
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
// Step3Content.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWizardStore } from './WizardShell';
import { useNavigate } from "react-router-dom";
import { updateCampaignContent } from '../../services/api/campaignContentApi';

const TEMPLATE_API = 'https://wynreach-backend.onrender.com/api/templates';
const SENDER_API = 'https://wynreach-backend.onrender.com/api/sender-identity/email-addresses';
const WHATSAPP_API = 'https://wynreach-backend.onrender.com/api/sender-identity/whatsapp/numbers';

// ==================== AUTH TOKEN HELPER ====================
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

// ==================== FETCH WITH AUTH ====================
const fetchWithAuth = async (url) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const parseTemplateData = (content) => {
  if (!content) return { isGenerative: false, blocks: [], generativeData: null };
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return { isGenerative: false, blocks: parsed, generativeData: null };
    if (parsed && parsed.layout) return { isGenerative: true, blocks: [], generativeData: parsed };
    return { isGenerative: false, blocks: [], generativeData: null };
  } catch {
    return { isGenerative: false, blocks: [], generativeData: null };
  }
};

const TemplateMiniPreview = ({ blocks }) => {
  const containerStyle = { maxHeight: '140px', overflow: 'hidden', fontSize: '10px', lineHeight: 1.4 };
  const EmailBlockContent = ({ block }) => {
    const p = block.props;
    switch (block.type) {
      case "header": return <div style={{ textAlign: p.align, color: p.color, fontSize: '12px', fontWeight: "bold", padding: "4px 0", fontFamily: "Arial, sans-serif" }}>{p.text}</div>;
      case "text": return <p style={{ textAlign: p.align, color: p.color, fontSize: '10px', lineHeight: 1.4, margin: "4px 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap" }}>{p.text}</p>;
      case "image": return <img src={p.url} alt={p.alt} style={{ width: "100%", borderRadius: 4, display: "block", margin: "4px 0", maxHeight: '60px', objectFit: 'cover' }} />;
      case "button": return <div style={{ textAlign: "center", margin: "6px 0" }}><span style={{ display: "inline-block", background: p.bgColor, color: p.textColor, padding: "4px 10px", borderRadius: 6, fontWeight: "bold", fontSize: '10px' }}>{p.label}</span></div>;
      case "columns": return <div style={{ display: "flex", gap: "8px", margin: "4px 0" }}><div style={{ flex: 1, padding: 6, background: "#f8fafc", borderRadius: 4, fontSize: "9px", color: "#475569" }}>{p.left}</div><div style={{ flex: 1, padding: 6, background: "#f8fafc", borderRadius: 4, fontSize: "9px", color: "#475569" }}>{p.right}</div></div>;
      case "divider": return <hr style={{ border: "none", borderTop: `1px solid ${p.color}`, margin: "6px 0" }} />;
      case "footer": return <div style={{ textAlign: "center", color: p.color, fontSize: '8px', padding: "4px 0" }}>{p.text}</div>;
      default: return null;
    }
  };
  if (!blocks || blocks.length === 0) return <div className="text-center text-slate-400 text-xs p-2">Empty template</div>;
  return <div style={containerStyle}>{blocks.slice(0, 6).map((block, idx) => <EmailBlockContent key={idx} block={block} />)}</div>;
};

const GenerativeMiniPreview = ({ data }) => {
  const bgColor = data.bgColor || "#1a1a2e";
  const logoColor = data.logoColor || "#ffffff";
  const accentColor = data.accentColor || "#f5a623";
  return (
    <div style={{ background: bgColor, color: logoColor, padding: "10px", borderRadius: "12px", height: "140px", overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif" }}>
      {data.logo && <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px" }}>{data.logo}</div>}
      {data.headerImg && <img src={data.headerImg} alt="header" style={{ width: "100%", height: "50px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />}
      {data.title && <div style={{ fontWeight: "bold", fontSize: "12px", marginTop: "4px", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.title}</div>}
      {data.subtitle && <div style={{ fontSize: "9px", color: accentColor, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.subtitle}</div>}
    </div>
  );
};

const useTemplateList = ({ channel }) => {
  const [data, setData] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const result = await fetchWithAuth(`${TEMPLATE_API}/?type=${channel}&status=active`);
        const filteredTemplates = (result.data || []).filter(t => t.status === 'active');
        setData({
          items: filteredTemplates.map(t => {
            const { isGenerative, blocks, generativeData } = parseTemplateData(t.content);
            return { id: String(t.id), templateName: t.name, type: t.type, content: t.content, isGenerative, blocks, generativeData };
          }),
        });
      } catch (error) {
        console.error('Failed to fetch templates:', error);
        setData({ items: [] });
      } finally {
        setIsLoading(false);
      }
    };
    if (channel) fetchTemplates();
  }, [channel]);
  return { data, isLoading };
};

// ✅ FIXED: useSenderIdentities with auth token
const useSenderIdentities = (channel) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSenders = async () => {
      try {
        setIsLoading(true);

        const endpoint =
          channel === "email"
            ? "https://wynreach-backend.onrender.com/api/sender-identity/email-addresses"
            : "https://wynreach-backend.onrender.com/api/sender-identity/whatsapp/numbers";

        
        const result = await fetchWithAuth(endpoint);
        console.log(result);
        console.log('Sender API Response:', result);

        // ✅ Handle different response structures
        let senderList = [];
        if (Array.isArray(result)) {
          senderList = result;
        } else if (result.data && Array.isArray(result.data)) {
          senderList = result.data;
        } else if (result.senders && Array.isArray(result.senders)) {
          senderList = result.senders;
        }

       if (channel === "email") {
  const verifiedEmails = senderList.filter(
    (item) =>
      item.status?.toLowerCase() === "verified" &&
      item.is_active !== false
  );

  setData(
    verifiedEmails.map((item) => ({
      id: String(item.id),
      name: item.email,
    }))
  );
} else {
  const verifiedNumbers = senderList.filter(
    (item) => item.status?.toLowerCase() === "verified"
  );

  setData(
    verifiedNumbers.map((item) => ({
      id: String(item.id),
      name: item.phone_number || item.phone,
    }))
  );
}
      } catch (err) {
  console.error("Failed to fetch sender identities", err);
  setData([]);
}
       
       finally {
        setIsLoading(false);
      }
    };

    fetchSenders();
  }, [channel]);

  return { data, isLoading };
};

const Button = ({ children, variant, type, onClick, disabled }) => {
  const base = "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary' ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";
  return <button type={type} onClick={onClick} className={`${base} ${variantClass}`} disabled={disabled}>{children}</button>;
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Step3Content() {
  const navigate = useNavigate();
  const { createdCampaignId, channel, subjectLine, previewText, templateId, senderIdentityId, setStep3, nextStep, prevStep } = useWizardStore();
  const { data: templates, isLoading: loadingTemplates } = useTemplateList({ channel });
  const { data: senders, isLoading: loadingSenders } = useSenderIdentities(channel);

  const schema = useMemo(() => z.object({
    subjectLine: channel === 'email' ? z.string().min(1, 'Subject line required').max(150) : z.string().optional(),
    previewText: z.string().optional(),
    templateId: z.string().min(1, 'Please select a template'),
    senderIdentityId: z.string().min(1, 'Please select a sender'),
  }), [channel]);

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      subjectLine: subjectLine || '',
      previewText: previewText || '',
      templateId: templateId || '',
      senderIdentityId: senderIdentityId || '',
    },
  });

  const currentTemplate = watch('templateId');
  const currentSender = watch('senderIdentityId');
  const subject = watch('subjectLine');
useEffect(() => {
  // No senders available
  if (senders.length === 0) {
    setValue("senderIdentityId", "");
    return;
  }

  const exists = senders.some(
    (s) => String(s.id) === String(currentSender)
  );

  if (!exists) {
    setValue("senderIdentityId", String(senders[0].id), {
      shouldValidate: true,
    });
    trigger("senderIdentityId");
  }
}, [senders, currentSender, setValue, trigger]);

  const onSubmit = async (values) => {
    try {
      await updateCampaignContent(createdCampaignId, {
        subject_line: values.subjectLine,
        preview_text: values.previewText,
        template_id: values.templateId,
        sender_identity_id: values.senderIdentityId,
      });
      setStep3({ 
        subjectLine: values.subjectLine || '', 
        previewText: values.previewText || '', 
        templateId: values.templateId, 
        senderIdentityId: values.senderIdentityId 
      });
      nextStep();
    } catch (error) {
      console.error(error);
      alert('Failed to save content');
    }
  };

  const isReady = currentTemplate && currentSender && (channel !== 'email' || subject);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible">
      <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Campaign Content</h2>
        <p className="text-sm text-slate-500 mt-1">Choose a template and set your message content.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="overflow-visible">
        <div className="px-6 sm:px-8 py-6 space-y-5 overflow-visible">
          {channel === 'email' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Subject Line</label>
              <input {...register('subjectLine')} placeholder="e.g. 🚀 Big news: WYNReach V2 is here" className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.subjectLine ? 'border-red-300' : 'border-slate-200'}`} />
              {errors.subjectLine && <p className="text-xs text-red-500 mt-1">{errors.subjectLine.message}</p>}
              <div className="flex justify-between mt-1.5">
                <span className="text-xs text-slate-400">{(subject || '').length} / 150 characters</span>
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Choose a Template</p>
            {errors.templateId && <p className="text-xs text-red-600 mb-2">{errors.templateId.message}</p>}
            {loadingTemplates ? (
              <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
            ) : (
              <div className="max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(templates?.items || []).map(tmpl => (
                    <div key={tmpl.id} onClick={() => { setValue('templateId', tmpl.id, { shouldValidate: true }); trigger('templateId'); }}
                      className={cn('rounded-xl border-2 overflow-hidden cursor-pointer transition-all bg-white', currentTemplate === tmpl.id ? tmpl.type === 'whatsapp' ? 'border-green-500 shadow-md ring-2 ring-green-200' : 'border-indigo-500 shadow-md ring-2 ring-indigo-200' : 'border-slate-200 hover:border-slate-300 hover:shadow')}>
                      <div className="bg-slate-50 p-2 border-b border-slate-100 min-h-[140px]">
                        {tmpl.type === 'email' && tmpl.isGenerative ? <GenerativeMiniPreview data={tmpl.generativeData} /> : tmpl.type === 'email' ? <TemplateMiniPreview blocks={tmpl.blocks} /> : <div className="text-xs text-slate-600 p-2">{tmpl.blocks?.[0]?.props?.text || tmpl.templateName}</div>}
                      </div>
                      <div className="px-3 py-2 flex justify-between items-center">
                        <p className="text-xs font-bold text-slate-800 truncate">{tmpl.templateName}</p>
                        <span className={cn("text-[9px] font-semibold px-2 py-0.5 rounded-full", tmpl.type === 'whatsapp' ? 'bg-green-100 text-green-700' : tmpl.isGenerative ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700')}>
                          {tmpl.type === 'whatsapp' ? '📱 WA' : tmpl.isGenerative ? '✨ Gen' : '📧 Email'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {channel === 'email' && (
                    <div onClick={() => navigate("/templates/new")} className="rounded-xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center h-[200px] border-slate-300 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50">
                      <div className="text-center">
                        <div className="text-3xl mb-2">✏️</div>
                        <p className="text-xs font-semibold text-slate-600">Start Blank</p>
                        <p className="text-[10px] text-slate-400 mt-1">Create new template</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative z-20">
            <p className="text-sm font-semibold text-slate-700 mb-2">Sender Identity</p>
            {loadingSenders ? (
              <div className="flex justify-center py-4"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div></div>
            ) : (
              <select {...register('senderIdentityId')} onChange={(e) => { setValue('senderIdentityId', e.target.value, { shouldValidate: true }); trigger('senderIdentityId'); }}
                className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.senderIdentityId ? 'border-red-300' : 'border-slate-200'}`}>
                <option value="">Select a sender…</option>
                {senders?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            )}
            {errors.senderIdentityId && <p className="text-xs text-red-500 mt-1">{errors.senderIdentityId.message}</p>}
          </div>
        </div>

        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
          <Button type="button" onClick={prevStep}>← Back</Button>
          <Button type="submit" variant="primary" disabled={!isReady}>Continue → Schedule</Button>
        </div>
      </form>
    </div>
  );
}
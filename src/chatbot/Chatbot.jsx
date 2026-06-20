
// // // import { useState, useEffect, useRef } from 'react';
// // // import { Bot, MessageSquare, HelpCircle, MousePointerClick, Save, Plus, Power, Eye, Edit, Trash2, Copy, BarChart3, Send, X } from 'lucide-react';

// // // const API_BASE = 'https://wynreach-backend.onrender.com/api/chatbots';

// // // export default function Chatbot() {
// // //   const [activeTab, setActiveTab] = useState('list');
// // //   const [chatbots, setChatbots] = useState([]);
// // //   const [loading, setLoading] = useState(false);
  
// // //   // Form states (same as original)
// // //   const [welcomeMessage, setWelcomeMessage] = useState('Hi! Welcome to our service. How can I help you today?');
// // //   const [faqs, setFaqs] = useState([
// // //     { question: 'What are your hours?', answer: 'We are available 24/7' },
// // //     { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
// // //   ]);
// // //   const [buttons, setButtons] = useState([
// // //     { label: 'View Pricing', action: '/pricing' },
// // //     { label: 'Contact Support', action: '/contact' },
// // //   ]);
  
// // //   // Chat functionality states
// // //   const [message, setMessage] = useState("");
// // //   const [chat, setChat] = useState([]);
// // //   const [selectedChatbot, setSelectedChatbot] = useState(null);
// // //   const [showChatInterface, setShowChatInterface] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [newChatbotName, setNewChatbotName] = useState('');
// // //   const [newChatbotDesc, setNewChatbotDesc] = useState('');
// // //   const [newFaqQuestion, setNewFaqQuestion] = useState('');
// // //   const [newFaqAnswer, setNewFaqAnswer] = useState('');
// // //   const [newButtonLabel, setNewButtonLabel] = useState('');
// // //   const [newButtonAction, setNewButtonAction] = useState('');
// // //   const [showAddFaq, setShowAddFaq] = useState(false);
// // //   const [showAddButton, setShowAddButton] = useState(false);
// // //   const [editingChatbot, setEditingChatbot] = useState(null);
  
// // //   const chatEndRef = useRef(null);

// // //   // -------------------- API CALLS --------------------
// // //   const fetchChatbots = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await fetch(`${API_BASE}/`);
// // //       if (!res.ok) throw new Error();
// // //       const data = await res.json();
// // //       setChatbots(data);
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert('Could not load chatbots. Make sure backend is running.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const createChatbot = async (data) => {
// // //     const res = await fetch(`${API_BASE}/`, {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify(data)
// // //     });
// // //     if (!res.ok) throw new Error('Create failed');
// // //     return res.json();
// // //   };

// // //   const updateChatbot = async (id, data) => {
// // //     const res = await fetch(`${API_BASE}/${id}`, {
// // //       method: 'PUT',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify(data)
// // //     });
// // //     if (!res.ok) throw new Error('Update failed');
// // //     return res.json();
// // //   };

// // //   const deleteChatbot = async (id) => {
// // //     const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
// // //     if (!res.ok) throw new Error('Delete failed');
// // //   };

// // //   const duplicateChatbot = async (id) => {
// // //     const res = await fetch(`${API_BASE}/${id}/duplicate`, { method: 'POST' });
// // //     if (!res.ok) throw new Error('Duplicate failed');
// // //     return res.json();
// // //   };

// // //   const toggleStatusAPI = async (id) => {
// // //     const res = await fetch(`${API_BASE}/${id}/status`, { method: 'PATCH' });
// // //     if (!res.ok) throw new Error('Toggle failed');
// // //     return res.json();
// // //   };

// // //   // Load chatbots on mount
// // //   useEffect(() => {
// // //     fetchChatbots();
// // //   }, []);

// // //   // Auto-scroll chat
// // //   useEffect(() => {
// // //     if (chatEndRef.current) {
// // //       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
// // //     }
// // //   }, [chat]);

// // //   // -------------------- CRUD Handlers --------------------
// // //   const toggleStatus = async (id) => {
// // //     try {
// // //       await toggleStatusAPI(id);
// // //       fetchChatbots();
// // //     } catch (err) {
// // //       alert('Failed to toggle status');
// // //     }
// // //   };

// // //   const handleTabChange = (tab) => {
// // //     setActiveTab(tab);
// // //     setShowChatInterface(false);
// // //     setSelectedChatbot(null);
// // //     if (tab === 'create') {
// // //       setNewChatbotName('');
// // //       setNewChatbotDesc('');
// // //       setWelcomeMessage('Hi! Welcome to our service. How can I help you today?');
// // //       setFaqs([
// // //         { question: 'What are your hours?', answer: 'We are available 24/7' },
// // //         { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
// // //       ]);
// // //       setButtons([
// // //         { label: 'View Pricing', action: '/pricing' },
// // //         { label: 'Contact Support', action: '/contact' },
// // //       ]);
// // //       setEditingChatbot(null);
// // //     }
// // //   };

// // //   const handleEditChatbot = (chatbot) => {
// // //     setEditingChatbot(chatbot);
// // //     setNewChatbotName(chatbot.name);
// // //     setNewChatbotDesc(chatbot.description || '');
// // //     setWelcomeMessage(chatbot.welcome_message);
// // //     setFaqs(chatbot.faqs || []);
// // //     setButtons(chatbot.buttons || []);
// // //     setActiveTab('create');
// // //   };

// // //   const handleDeleteChatbot = async (id) => {
// // //     if (window.confirm('Are you sure you want to delete this chatbot?')) {
// // //       try {
// // //         await deleteChatbot(id);
// // //         fetchChatbots();
// // //       } catch (err) {
// // //         alert('Delete failed');
// // //       }
// // //     }
// // //   };

// // //   const handleDuplicateChatbot = async (chatbot) => {
// // //     try {
// // //       await duplicateChatbot(chatbot.id);
// // //       fetchChatbots();
// // //     } catch (err) {
// // //       alert('Duplicate failed');
// // //     }
// // //   };

// // //   const handleSaveChatbot = async () => {
// // //     if (!newChatbotName.trim()) {
// // //       alert('Please enter a chatbot name');
// // //       return;
// // //     }

// // //     const payload = {
// // //       name: newChatbotName,
// // //       description: newChatbotDesc,
// // //       welcome_message: welcomeMessage,
// // //       buttons: buttons,
// // //       faqs: faqs,
// // //       status: 'active'
// // //     };

// // //     try {
// // //       if (editingChatbot) {
// // //         await updateChatbot(editingChatbot.id, payload);
// // //         alert(`Chatbot "${newChatbotName}" updated successfully!`);
// // //       } else {
// // //         await createChatbot(payload);
// // //         alert(`Chatbot "${newChatbotName}" created successfully!`);
// // //       }
// // //       resetForm();
// // //       fetchChatbots();
// // //       setActiveTab('list');
// // //     } catch (err) {
// // //       alert('Error saving chatbot: ' + err.message);
// // //     }
// // //   };

// // //   const resetForm = () => {
// // //     setNewChatbotName('');
// // //     setNewChatbotDesc('');
// // //     setWelcomeMessage('Hi! Welcome to our service. How can I help you today?');
// // //     setFaqs([
// // //       { question: 'What are your hours?', answer: 'We are available 24/7' },
// // //       { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
// // //     ]);
// // //     setButtons([
// // //       { label: 'View Pricing', action: '/pricing' },
// // //       { label: 'Contact Support', action: '/contact' },
// // //     ]);
// // //     setEditingChatbot(null);
// // //   };

// // //   // -------------------- FAQ / Button helpers --------------------
// // //   const addFaq = () => {
// // //     if (newFaqQuestion && newFaqAnswer) {
// // //       setFaqs([...faqs, { question: newFaqQuestion, answer: newFaqAnswer }]);
// // //       setNewFaqQuestion('');
// // //       setNewFaqAnswer('');
// // //       setShowAddFaq(false);
// // //     } else {
// // //       alert('Please enter both question and answer');
// // //     }
// // //   };

// // //   const addButton = () => {
// // //     if (newButtonLabel && newButtonAction) {
// // //       setButtons([...buttons, { label: newButtonLabel, action: newButtonAction }]);
// // //       setNewButtonLabel('');
// // //       setNewButtonAction('');
// // //       setShowAddButton(false);
// // //     } else {
// // //       alert('Please enter both button label and action');
// // //     }
// // //   };

// // //   const removeFaq = (index) => {
// // //     if (window.confirm('Remove this FAQ?')) {
// // //       setFaqs(faqs.filter((_, i) => i !== index));
// // //     }
// // //   };

// // //   const removeButton = (index) => {
// // //     if (window.confirm('Remove this button?')) {
// // //       setButtons(buttons.filter((_, i) => i !== index));
// // //     }
// // //   };

// // //   // -------------------- Chat functions --------------------
// // //   // const sendMessage = async () => {
// // //   //   if (!message.trim() || isLoading || !selectedChatbot) return;

// // //   //   const userMsg = { type: "user", text: message, timestamp: new Date() };
// // //   //   setChat(prev => [...prev, userMsg]);
// // //   //   setMessage("");
// // //   //   setIsLoading(true);

// // //   //   try {
// // //   //     const response = await fetch(`${API_BASE}/chat`, {
// // //   //       method: "POST",
// // //   //       headers: { "Content-Type": "application/json" },
// // //   //       body: JSON.stringify({ 
// // //   //         message: message,
// // //   //         chatbot_id: selectedChatbot.id 
// // //   //       }),
// // //   //     });

// // //   //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

// // //   //     const data = await response.json();
// // //   //     const botMsg = { type: "bot", text: data.reply, timestamp: new Date() };
// // //   //     setChat(prev => [...prev, botMsg]);
// // //   //   } catch (error) {
// // //   //     console.error("Error sending message:", error);
// // //   //     // Fallback: search FAQ
// // //   //     const faqAnswer = selectedChatbot?.faqs?.find(f => 
// // //   //       message.toLowerCase().includes(f.question.toLowerCase())
// // //   //     );
// // //   //     if (faqAnswer) {
// // //   //       const botMsg = { type: "bot", text: faqAnswer.answer, timestamp: new Date() };
// // //   //       setChat(prev => [...prev, botMsg]);
// // //   //     } else {
// // //   //       const errorMsg = { 
// // //   //         type: "bot", 
// // //   //         text: "Sorry, I'm having trouble connecting. Please try again later.", 
// // //   //         timestamp: new Date() 
// // //   //       };
// // //   //       setChat(prev => [...prev, errorMsg]);
// // //   //     }
// // //   //   } finally {
// // //   //     setIsLoading(false);
// // //   //   }
// // //   // };

// // //   const sendMessage = async () => {

// // //   if (!message.trim() || isLoading || !selectedChatbot) {
// // //     return;
// // //   }

// // //   // Store current message before clearing input
// // //   const currentMessage = message.trim();

// // //   // User message
// // //   const userMsg = {
// // //     type: "user",
// // //     text: currentMessage,
// // //     timestamp: new Date()
// // //   };

// // //   // Add user message to UI
// // //   setChat(prev => [...prev, userMsg]);

// // //   // Clear input
// // //   setMessage("");

// // //   // Loading state
// // //   setIsLoading(true);

// // //   try {

// // //     // -----------------------------------------
// // //     // SEND MESSAGE TO BACKEND
// // //     // -----------------------------------------
// // //     const response = await fetch(`${API_BASE}/chat`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json"
// // //       },
// // //       body: JSON.stringify({
// // //         message: currentMessage,
// // //         chatbot_id: selectedChatbot.id
// // //       })
// // //     });

// // //     // Handle API errors
// // //     if (!response.ok) {

// // //       let errorText = `HTTP ${response.status}`;

// // //       try {
// // //         const errorData = await response.json();
// // //         errorText = errorData.detail || errorText;
// // //       } catch (_) {}

// // //       throw new Error(errorText);
// // //     }

// // //     // -----------------------------------------
// // //     // GET BOT RESPONSE
// // //     // -----------------------------------------
// // //     const data = await response.json();

// // //     const botMsg = {
// // //       type: "bot",
// // //       text: data.reply,
// // //       timestamp: new Date()
// // //     };

// // //     // Add bot message
// // //     setChat(prev => [...prev, botMsg]);

// // //     // -----------------------------------------
// // //     // REFRESH CHATBOT STATS
// // //     // -----------------------------------------
// // //     await fetchChatbots();

// // //   } catch (error) {

// // //     console.error("SEND MESSAGE ERROR:", error);

// // //     // -----------------------------------------
// // //     // FAQ FALLBACK
// // //     // -----------------------------------------
// // //     const faqMatch = selectedChatbot?.faqs?.find((faq) =>
// // //       currentMessage
// // //         .toLowerCase()
// // //         .includes(faq.question.toLowerCase())
// // //     );

// // //     if (faqMatch) {

// // //       const faqReply = {
// // //         type: "bot",
// // //         text: faqMatch.answer,
// // //         timestamp: new Date()
// // //       };

// // //       setChat(prev => [...prev, faqReply]);

// // //     } else {

// // //       // Generic error fallback
// // //       const errorMsg = {
// // //         type: "bot",
// // //         text:
// // //           "Sorry, I'm having trouble connecting right now. Please try again later.",
// // //         timestamp: new Date()
// // //       };

// // //       setChat(prev => [...prev, errorMsg]);
// // //     }

// // //   } finally {

// // //     // Stop loading
// // //     setIsLoading(false);
// // //   }
// // // };

// // //   const handleKeyPress = (e) => {
// // //     if (e.key === 'Enter' && !e.shiftKey) {
// // //       e.preventDefault();
// // //       sendMessage();
// // //     }
// // //   };

// // //   const openChatInterface = (chatbot) => {
// // //     setSelectedChatbot(chatbot);
// // //     setShowChatInterface(true);
// // //     setChat([
// // //       { 
// // //         type: "bot", 
// // //         text: chatbot.welcome_message || "Hi! How can I help you today?", 
// // //         timestamp: new Date() 
// // //       }
// // //     ]);
// // //   };

// // //   const closeChatInterface = () => {
// // //     setShowChatInterface(false);
// // //     setSelectedChatbot(null);
// // //     setChat([]);
// // //   };

// // //   const handleButtonClick = async (buttonLabel, isFaq = false, faqAnswer = null) => {
// // //     if (!selectedChatbot) return;
// // //     const userMsg = { type: "user", text: buttonLabel, timestamp: new Date() };
// // //     setChat(prev => [...prev, userMsg]);
// // //     setIsLoading(true);
    
// // //     try {
// // //       const response = await fetch(`${API_BASE}/chat`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ 
// // //           message: buttonLabel,
// // //           chatbot_id: selectedChatbot.id 
// // //         }),
// // //       });
      
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         const botMsg = { type: "bot", text: data.reply, timestamp: new Date() };
// // //         setChat(prev => [...prev, botMsg]);
// // //       } else {
// // //         throw new Error("Backend not available");
// // //       }
// // //     } catch (error) {
// // //       if (faqAnswer) {
// // //         const botMsg = { type: "bot", text: faqAnswer, timestamp: new Date() };
// // //         setChat(prev => [...prev, botMsg]);
// // //       } else {
// // //         const botMsg = { type: "bot", text: `You selected: ${buttonLabel}. How can I help you further?`, timestamp: new Date() };
// // //         setChat(prev => [...prev, botMsg]);
// // //       }
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // -------------------- Render --------------------
// // //   return (
// // //     <div className="p-1 lg:p-3 bg-slate-50 min-h-screen font-sans">
 
// // //       {showChatInterface && selectedChatbot && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[90vh] max-h-[700px] flex flex-col overflow-hidden">
// // //             {/* Modal Header */}
// // //             <div className="flex items-center justify-between p-4 border-b border-slate-200 flex-shrink-0">
// // //               <div className="flex items-center gap-3">
// // //                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
// // //                   selectedChatbot.status === "active" ? "bg-emerald-100" : "bg-slate-100"
// // //                 }`}>
// // //                   <Bot className={`w-5 h-5 ${
// // //                     selectedChatbot.status === "active" ? "text-emerald-600" : "text-slate-500"
// // //                   }`} />
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="font-semibold text-slate-900">{selectedChatbot.name}</h3>
// // //                   <p className="text-xs text-slate-500">
// // //                     {selectedChatbot.status === "active" ? "🟢 Online" : "⚫ Offline"} • Typically replies instantly
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //               <button onClick={closeChatInterface} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
// // //                 <X className="w-5 h-5 text-slate-500" />
// // //               </button>
// // //             </div>

// // //             {/* Chat Messages */}
// // //             <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-slate-50">
// // //               {chat.map((msg, idx) => (
// // //                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
// // //                   <div className={`max-w-[75%] rounded-lg px-4 py-2 break-words ${
// // //                     msg.type === "user" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-800"
// // //                   }`}>
// // //                     <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
// // //                     <p className="text-xs mt-1 opacity-70">{msg.timestamp?.toLocaleTimeString()}</p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //               {isLoading && (
// // //                 <div className="flex justify-start">
// // //                   <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
// // //                     <div className="flex gap-1">
// // //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
// // //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
// // //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //               <div ref={chatEndRef} />
// // //             </div>

// // //             {/* Quick Actions */}
// // //             {selectedChatbot.buttons?.length > 0 && (
// // //               <div className="px-4 py-3 border-t border-slate-200 bg-white flex-shrink-0">
// // //                 <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
// // //                 <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
// // //                   {selectedChatbot.buttons.map((button, idx) => (
// // //                     <button key={idx} onClick={() => handleButtonClick(button.label, false, null)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors break-words">
// // //                       {button.label}
// // //                     </button>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* FAQs */}
// // //             {selectedChatbot.faqs?.length > 0 && (
// // //               <div className="px-4 py-3 border-t border-slate-200 bg-white flex-shrink-0">
// // //                 <p className="text-xs text-slate-500 mb-2">Frequently Asked Questions:</p>
// // //                 <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
// // //                   {selectedChatbot.faqs.map((faq, idx) => (
// // //                     <button key={idx} onClick={() => handleButtonClick(faq.question, true, faq.answer)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors break-words">
// // //                       {faq.question}
// // //                     </button>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Input */}
// // //             <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
// // //               <div className="flex gap-2">
// // //                 <input
// // //                   type="text"
// // //                   value={message}
// // //                   onChange={(e) => setMessage(e.target.value)}
// // //                   onKeyPress={handleKeyPress}
// // //                   placeholder="Type your message..."
// // //                   disabled={isLoading}
// // //                   className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
// // //                 />
// // //                 <button onClick={sendMessage} disabled={isLoading || !message.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50">
// // //                   <Send className="w-4 h-4" />
// // //                   Send
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Main Content */}
// // //       <div className="space-y-6">
// // //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-slate-900">AI Chatbot</h1>
// // //             <p className="text-sm text-slate-600 mt-1">Configure and manage AI-powered chatbot responses</p>
// // //           </div>
// // //           <div className="flex items-center gap-2">
// // //             <button onClick={() => handleTabChange('list')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
// // //               activeTab === 'list' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
// // //             }`}>
// // //               Active Chatbots
// // //             </button>
// // //             <button onClick={() => handleTabChange('create')} className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
// // //               activeTab === 'create' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
// // //             }`}>
// // //               <Plus className="w-4 h-4" />
// // //               {editingChatbot ? 'Edit Chatbot' : 'Create New'}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Active Chatbots List */}
// // //         {activeTab === 'list' && (
// // //           <div className="space-y-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// // //                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Total Chatbots</p>
// // //                 <p className="text-3xl font-bold text-slate-900">{chatbots.length}</p>
// // //               </div>
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// // //                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Active</p>
// // //                 <p className="text-3xl font-bold text-emerald-600">{chatbots.filter(b => b.status === 'active').length}</p>
// // //               </div>
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// // //                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Total Conversations</p>
// // //                 <p className="text-3xl font-bold text-slate-900">{chatbots.reduce((sum, bot) => sum + (bot.conversations || 0), 0).toLocaleString()}</p>
// // //               </div>
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// // //                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Avg. Satisfaction</p>
// // //                 <p className="text-3xl font-bold text-indigo-600">{(chatbots.reduce((sum, bot) => sum + (bot.satisfaction || 0), 0) / chatbots.length || 0).toFixed(1)}</p>
// // //               </div>
// // //             </div>

// // //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
// // //               {loading ? (
// // //                 <div className="col-span-2 text-center py-10">Loading chatbots...</div>
// // //               ) : (
// // //                 chatbots.map((chatbot) => (
// // //                   <div key={chatbot.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
// // //                     <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
// // //                       <div className="flex items-start gap-3">
// // //                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${chatbot.status === 'active' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
// // //                           <Bot className={`w-6 h-6 ${chatbot.status === 'active' ? 'text-emerald-600' : 'text-slate-500'}`} />
// // //                         </div>
// // //                         <div>
// // //                           <h3 className="font-semibold text-slate-900 mb-1">{chatbot.name}</h3>
// // //                           <p className="text-xs text-slate-500">Last active: {chatbot.last_active ? new Date(chatbot.last_active).toLocaleString() : 'Never'}</p>
// // //                           {chatbot.description && <p className="text-xs text-slate-500 mt-1">{chatbot.description}</p>}
// // //                         </div>
// // //                       </div>
// // //                       <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${chatbot.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-50 text-yellow-700'}`}>
// // //                         {chatbot.status}
// // //                       </span>
// // //                     </div>

// // //                     <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-slate-100">
// // //                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Conversations</p><p className="text-lg font-bold text-slate-900">{(chatbot.conversations || 0).toLocaleString()}</p></div>
// // //                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Responses</p><p className="text-lg font-bold text-slate-900">{(chatbot.responses || 0).toLocaleString()}</p></div>
// // //                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Rating</p><p className="text-lg font-bold text-indigo-600">{chatbot.satisfaction || 0} ⭐</p></div>
// // //                     </div>

// // //                     <div className="flex flex-wrap gap-2 mb-4">
// // //                       {chatbot.buttons?.length > 0 && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">{chatbot.buttons.length} Buttons</span>}
// // //                       {chatbot.faqs?.length > 0 && <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">{chatbot.faqs.length} FAQs</span>}
// // //                     </div>

// // //                     <div className="flex flex-wrap items-center gap-2">
// // //                       <button onClick={() => openChatInterface(chatbot)} className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
// // //                         <MessageSquare className="w-4 h-4" /> Chat Now
// // //                       </button>
// // //                       <button onClick={() => toggleStatus(chatbot.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${chatbot.status === 'active' ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
// // //                         <Power className="w-4 h-4" /> {chatbot.status === 'active' ? 'Pause' : 'Activate'}
// // //                       </button>
// // //                       <button onClick={() => handleDuplicateChatbot(chatbot)} className="p-2 hover:bg-slate-100 rounded-lg" title="Duplicate"><Copy className="w-4 h-4 text-slate-500" /></button>
// // //                       <button onClick={() => handleEditChatbot(chatbot)} className="p-2 hover:bg-slate-100 rounded-lg" title="Edit"><Edit className="w-4 h-4 text-slate-500" /></button>
// // //                       <button onClick={() => handleDeleteChatbot(chatbot.id)} className="p-2 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
// // //                     </div>
// // //                   </div>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Create / Edit Chatbot */}
// // //         {activeTab === 'create' && (
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
// // //             <div className="space-y-5">
// // //               {/* Basic Info */}
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// // //                 <h3 className="text-sm font-bold text-slate-900 mb-4">Basic Information</h3>
// // //                 <div className="space-y-4">
// // //                   <div>
// // //                     <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Chatbot Name *</label>
// // //                     <input type="text" value={newChatbotName} onChange={(e) => setNewChatbotName(e.target.value)} placeholder="e.g., Customer Support Bot" className="w-full px-4 py-2 bg-white !text-black border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Description</label>
// // //                     <textarea value={newChatbotDesc} onChange={(e) => setNewChatbotDesc(e.target.value)} placeholder="Brief description of what this chatbot does..." rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Welcome Message */}
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// // //                 <div className="flex items-center gap-2 mb-4"><MessageSquare className="w-5 h-5 text-indigo-600" /><h3 className="text-sm font-bold text-slate-900">Welcome Message</h3></div>
// // //                 <textarea value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
// // //               </div>

// // //               {/* FAQ Setup */}
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// // //                 <div className="flex items-center gap-2 mb-4"><HelpCircle className="w-5 h-5 text-emerald-600" /><h3 className="text-sm font-bold text-slate-900">FAQ Responses</h3><span className="ml-auto text-xs text-slate-500">{faqs.length} FAQs</span></div>
// // //                 <div className="space-y-3">
// // //                   {faqs.map((faq, index) => (
// // //                     <div key={index} className="p-3 bg-slate-50 rounded-lg relative group">
// // //                       <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3 text-red-600" /></button>
// // //                       <p className="text-sm font-medium text-slate-800 mb-1">Q: {faq.question}</p>
// // //                       <p className="text-sm text-slate-600">A: {faq.answer}</p>
// // //                     </div>
// // //                   ))}
// // //                   {showAddFaq ? (
// // //                     <div className="space-y-2 p-3 bg-indigo-50 rounded-lg">
// // //                       <input type="text" value={newFaqQuestion} onChange={(e) => setNewFaqQuestion(e.target.value)} placeholder="Enter question" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
// // //                       <input type="text" value={newFaqAnswer} onChange={(e) => setNewFaqAnswer(e.target.value)} placeholder="Enter answer" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
// // //                       <div className="flex gap-2"><button onClick={addFaq} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">Add</button><button onClick={() => setShowAddFaq(false)} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm">Cancel</button></div>
// // //                     </div>
// // //                   ) : (
// // //                     <button onClick={() => setShowAddFaq(true)} className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 text-sm text-slate-600">+ Add FAQ</button>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Button Setup */}
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// // //                 <div className="flex items-center gap-2 mb-4"><MousePointerClick className="w-5 h-5 text-amber-600" /><h3 className="text-sm font-bold text-slate-900">Quick Action Buttons</h3><span className="ml-auto text-xs text-slate-500">{buttons.length} Buttons</span></div>
// // //                 <div className="space-y-2">
// // //                   {buttons.map((button, index) => (
// // //                     <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg group">
// // //                       <span className="flex-1 text-sm text-slate-700">{button.label} → {button.action}</span>
// // //                       <button onClick={() => removeButton(index)} className="p-1 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3 text-red-600" /></button>
// // //                     </div>
// // //                   ))}
// // //                   {showAddButton ? (
// // //                     <div className="space-y-2 p-3 bg-indigo-50 rounded-lg">
// // //                       <input type="text" value={newButtonLabel} onChange={(e) => setNewButtonLabel(e.target.value)} placeholder="Button label (e.g., View Pricing)" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
// // //                       <input type="text" value={newButtonAction} onChange={(e) => setNewButtonAction(e.target.value)} placeholder="Action (e.g., /pricing)" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
// // //                       <div className="flex gap-2"><button onClick={addButton} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">Add</button><button onClick={() => setShowAddButton(false)} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm">Cancel</button></div>
// // //                     </div>
// // //                   ) : (
// // //                     <button onClick={() => setShowAddButton(true)} className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 text-sm text-slate-600">+ Add Button</button>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               <button onClick={handleSaveChatbot} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
// // //                 <Save className="w-4 h-4" /> {editingChatbot ? 'Update Chatbot' : 'Save & Activate Chatbot'}
// // //               </button>
// // //             </div>

// // //             {/* Live Preview */}
// // //             <div className="space-y-5">
// // //               <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-6">
// // //                 <div className="flex items-center gap-2 mb-4"><Bot className="w-5 h-5 text-indigo-600" /><h3 className="text-sm font-bold text-slate-900">Live Preview</h3><span className="text-xs text-slate-500">(Updates in real-time)</span></div>
// // //                 <div className="bg-slate-50 rounded-xl p-4 min-h-[500px] flex flex-col">
// // //                   <div className="flex-1 space-y-3">
// // //                     <div className="flex gap-2">
// // //                       <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
// // //                       <div className="bg-white rounded-lg px-4 py-2 max-w-[80%] shadow-sm border border-slate-200">
// // //                         <p className="text-sm text-slate-800">{welcomeMessage || "Welcome message will appear here"}</p>
// // //                       </div>
// // //                     </div>
// // //                     {buttons.length > 0 && (
// // //                       <div className="pl-10">
// // //                         <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
// // //                         <div className="flex gap-2 flex-wrap">
// // //                           {buttons.map((btn, idx) => (
// // //                             <button key={idx} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm">{btn.label}</button>
// // //                           ))}
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                     {faqs.length > 0 && (
// // //                       <div className="pl-10">
// // //                         <p className="text-xs text-slate-500 mb-2">Frequently Asked Questions:</p>
// // //                         <div className="flex gap-2 flex-wrap">
// // //                           {faqs.map((faq, idx) => (
// // //                             <button key={idx} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm">{faq.question}</button>
// // //                           ))}
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom'; // ✅ added for navigation
// // import { Bot, MessageSquare, HelpCircle, MousePointerClick, Save, Plus, Power, Eye, Edit, Trash2, Copy, BarChart3, Send, X } from 'lucide-react';

// // const API_BASE = 'https://wynreach-backend.onrender.com/api/chatbots';

// // export default function Chatbot() {
// //   const navigate = useNavigate(); // ✅ for back navigation
// //   const [activeTab, setActiveTab] = useState('list');
// //   const [chatbots, setChatbots] = useState([]);
// //   const [loading, setLoading] = useState(false);
  
// //   // Form states (same as original)
// //   const [welcomeMessage, setWelcomeMessage] = useState('Hi! Welcome to our service. How can I help you today?');
// //   const [faqs, setFaqs] = useState([
// //     { question: 'What are your hours?', answer: 'We are available 24/7' },
// //     { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
// //   ]);
// //   const [buttons, setButtons] = useState([
// //     { label: 'View Pricing', action: '/pricing' },
// //     { label: 'Contact Support', action: '/contact' },
// //   ]);
  
// //   // Chat functionality states
// //   const [message, setMessage] = useState("");
// //   const [chat, setChat] = useState([]);
// //   const [selectedChatbot, setSelectedChatbot] = useState(null);
// //   const [showChatInterface, setShowChatInterface] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [newChatbotName, setNewChatbotName] = useState('');
// //   const [newChatbotDesc, setNewChatbotDesc] = useState('');
// //   const [newFaqQuestion, setNewFaqQuestion] = useState('');
// //   const [newFaqAnswer, setNewFaqAnswer] = useState('');
// //   const [newButtonLabel, setNewButtonLabel] = useState('');
// //   const [newButtonAction, setNewButtonAction] = useState('');
// //   const [showAddFaq, setShowAddFaq] = useState(false);
// //   const [showAddButton, setShowAddButton] = useState(false);
// //   const [editingChatbot, setEditingChatbot] = useState(null);
  
// //   const chatEndRef = useRef(null);

// //   // -------------------- API CALLS --------------------
// //   const fetchChatbots = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`${API_BASE}/`);
// //       if (!res.ok) throw new Error();
// //       const data = await res.json();
// //       setChatbots(data);
// //     } catch (error) {
// //       console.error(error);
// //       alert('Could not load chatbots. Make sure backend is running.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const createChatbot = async (data) => {
// //     const res = await fetch(`${API_BASE}/`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(data)
// //     });
// //     if (!res.ok) throw new Error('Create failed');
// //     return res.json();
// //   };

// //   const updateChatbot = async (id, data) => {
// //     const res = await fetch(`${API_BASE}/${id}`, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(data)
// //     });
// //     if (!res.ok) throw new Error('Update failed');
// //     return res.json();
// //   };

// //   const deleteChatbot = async (id) => {
// //     const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
// //     if (!res.ok) throw new Error('Delete failed');
// //   };

// //   const duplicateChatbot = async (id) => {
// //     const res = await fetch(`${API_BASE}/${id}/duplicate`, { method: 'POST' });
// //     if (!res.ok) throw new Error('Duplicate failed');
// //     return res.json();
// //   };

// //   const toggleStatusAPI = async (id) => {
// //     const res = await fetch(`${API_BASE}/${id}/status`, { method: 'PATCH' });
// //     if (!res.ok) throw new Error('Toggle failed');
// //     return res.json();
// //   };

// //   // Load chatbots on mount
// //   useEffect(() => {
// //     fetchChatbots();
// //   }, []);

// //   // Auto-scroll chat
// //   useEffect(() => {
// //     if (chatEndRef.current) {
// //       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   }, [chat]);

// //   // -------------------- CRUD Handlers --------------------
// //   const toggleStatus = async (id) => {
// //     try {
// //       await toggleStatusAPI(id);
// //       fetchChatbots();
// //     } catch (err) {
// //       alert('Failed to toggle status');
// //     }
// //   };

// //   const handleTabChange = (tab) => {
// //     setActiveTab(tab);
// //     setShowChatInterface(false);
// //     setSelectedChatbot(null);
// //     if (tab === 'create') {
// //       setNewChatbotName('');
// //       setNewChatbotDesc('');
// //       setWelcomeMessage('Hi! Welcome to our service. How can I help you today?');
// //       setFaqs([
// //         { question: 'What are your hours?', answer: 'We are available 24/7' },
// //         { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
// //       ]);
// //       setButtons([
// //         { label: 'View Pricing', action: '/pricing' },
// //         { label: 'Contact Support', action: '/contact' },
// //       ]);
// //       setEditingChatbot(null);
// //     }
// //   };

// //   const handleEditChatbot = (chatbot) => {
// //     setEditingChatbot(chatbot);
// //     setNewChatbotName(chatbot.name);
// //     setNewChatbotDesc(chatbot.description || '');
// //     setWelcomeMessage(chatbot.welcome_message);
// //     setFaqs(chatbot.faqs || []);
// //     setButtons(chatbot.buttons || []);
// //     setActiveTab('create');
// //   };

// //   const handleDeleteChatbot = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this chatbot?')) {
// //       try {
// //         await deleteChatbot(id);
// //         fetchChatbots();
// //       } catch (err) {
// //         alert('Delete failed');
// //       }
// //     }
// //   };

// //   const handleDuplicateChatbot = async (chatbot) => {
// //     try {
// //       await duplicateChatbot(chatbot.id);
// //       fetchChatbots();
// //     } catch (err) {
// //       alert('Duplicate failed');
// //     }
// //   };

// //   const handleSaveChatbot = async () => {
// //     if (!newChatbotName.trim()) {
// //       alert('Please enter a chatbot name');
// //       return;
// //     }

// //     const payload = {
// //       name: newChatbotName,
// //       description: newChatbotDesc,
// //       welcome_message: welcomeMessage,
// //       buttons: buttons,
// //       faqs: faqs,
// //       status: 'active'
// //     };

// //     try {
// //       if (editingChatbot) {
// //         await updateChatbot(editingChatbot.id, payload);
// //         alert(`Chatbot "${newChatbotName}" updated successfully!`);
// //       } else {
// //         await createChatbot(payload);
// //         alert(`Chatbot "${newChatbotName}" created successfully!`);
// //       }
// //       resetForm();
// //       fetchChatbots();
// //       setActiveTab('list');
// //     } catch (err) {
// //       alert('Error saving chatbot: ' + err.message);
// //     }
// //   };

// //   const resetForm = () => {
// //     setNewChatbotName('');
// //     setNewChatbotDesc('');
// //     setWelcomeMessage('Hi! Welcome to our service. How can I help you today?');
// //     setFaqs([
// //       { question: 'What are your hours?', answer: 'We are available 24/7' },
// //       { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
// //     ]);
// //     setButtons([
// //       { label: 'View Pricing', action: '/pricing' },
// //       { label: 'Contact Support', action: '/contact' },
// //     ]);
// //     setEditingChatbot(null);
// //   };

// //   // -------------------- FAQ / Button helpers --------------------
// //   const addFaq = () => {
// //     if (newFaqQuestion && newFaqAnswer) {
// //       setFaqs([...faqs, { question: newFaqQuestion, answer: newFaqAnswer }]);
// //       setNewFaqQuestion('');
// //       setNewFaqAnswer('');
// //       setShowAddFaq(false);
// //     } else {
// //       alert('Please enter both question and answer');
// //     }
// //   };

// //   const addButton = () => {
// //     if (newButtonLabel && newButtonAction) {
// //       setButtons([...buttons, { label: newButtonLabel, action: newButtonAction }]);
// //       setNewButtonLabel('');
// //       setNewButtonAction('');
// //       setShowAddButton(false);
// //     } else {
// //       alert('Please enter both button label and action');
// //     }
// //   };

// //   const removeFaq = (index) => {
// //     if (window.confirm('Remove this FAQ?')) {
// //       setFaqs(faqs.filter((_, i) => i !== index));
// //     }
// //   };

// //   const removeButton = (index) => {
// //     if (window.confirm('Remove this button?')) {
// //       setButtons(buttons.filter((_, i) => i !== index));
// //     }
// //   };

// //   // -------------------- Chat functions --------------------
// //   const sendMessage = async () => {
// //     if (!message.trim() || isLoading || !selectedChatbot) {
// //       return;
// //     }

// //     const currentMessage = message.trim();
// //     const userMsg = { type: "user", text: currentMessage, timestamp: new Date() };
// //     setChat(prev => [...prev, userMsg]);
// //     setMessage("");
// //     setIsLoading(true);

// //     try {
// //       const response = await fetch(`${API_BASE}/chat`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           message: currentMessage,
// //           chatbot_id: selectedChatbot.id
// //         })
// //       });

// //       if (!response.ok) {
// //         let errorText = `HTTP ${response.status}`;
// //         try {
// //           const errorData = await response.json();
// //           errorText = errorData.detail || errorText;
// //         } catch (_) {}
// //         throw new Error(errorText);
// //       }

// //       const data = await response.json();
// //       const botMsg = { type: "bot", text: data.reply, timestamp: new Date() };
// //       setChat(prev => [...prev, botMsg]);
// //       await fetchChatbots();
// //     } catch (error) {
// //       console.error("SEND MESSAGE ERROR:", error);
// //       const faqMatch = selectedChatbot?.faqs?.find((faq) =>
// //         currentMessage.toLowerCase().includes(faq.question.toLowerCase())
// //       );
// //       if (faqMatch) {
// //         const faqReply = { type: "bot", text: faqMatch.answer, timestamp: new Date() };
// //         setChat(prev => [...prev, faqReply]);
// //       } else {
// //         const errorMsg = { type: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again later.", timestamp: new Date() };
// //         setChat(prev => [...prev, errorMsg]);
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage();
// //     }
// //   };

// //   const openChatInterface = (chatbot) => {
// //     setSelectedChatbot(chatbot);
// //     setShowChatInterface(true);
// //     setChat([
// //       { type: "bot", text: chatbot.welcome_message || "Hi! How can I help you today?", timestamp: new Date() }
// //     ]);
// //   };

// //   const closeChatInterface = () => {
// //     setShowChatInterface(false);
// //     setSelectedChatbot(null);
// //     setChat([]);
// //   };

// //   const handleButtonClick = async (buttonLabel, isFaq = false, faqAnswer = null) => {
// //     if (!selectedChatbot) return;
// //     const userMsg = { type: "user", text: buttonLabel, timestamp: new Date() };
// //     setChat(prev => [...prev, userMsg]);
// //     setIsLoading(true);
    
// //     try {
// //       const response = await fetch(`${API_BASE}/chat`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ 
// //           message: buttonLabel,
// //           chatbot_id: selectedChatbot.id 
// //         }),
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         const botMsg = { type: "bot", text: data.reply, timestamp: new Date() };
// //         setChat(prev => [...prev, botMsg]);
// //       } else {
// //         throw new Error("Backend not available");
// //       }
// //     } catch (error) {
// //       if (faqAnswer) {
// //         const botMsg = { type: "bot", text: faqAnswer, timestamp: new Date() };
// //         setChat(prev => [...prev, botMsg]);
// //       } else {
// //         const botMsg = { type: "bot", text: `You selected: ${buttonLabel}. How can I help you further?`, timestamp: new Date() };
// //         setChat(prev => [...prev, botMsg]);
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // -------------------- Render --------------------
// //   return (
// //     <div className="p-1 lg:p-3 bg-slate-50 min-h-screen font-sans">
 
// //       {showChatInterface && selectedChatbot && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[90vh] max-h-[700px] flex flex-col overflow-hidden">
// //             {/* Modal Header */}
// //             <div className="flex items-center justify-between p-4 border-b border-slate-200 flex-shrink-0">
// //               <div className="flex items-center gap-3">
// //                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
// //                   selectedChatbot.status === "active" ? "bg-emerald-100" : "bg-slate-100"
// //                 }`}>
// //                   <Bot className={`w-5 h-5 ${
// //                     selectedChatbot.status === "active" ? "text-emerald-600" : "text-slate-500"
// //                   }`} />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-semibold text-slate-900">{selectedChatbot.name}</h3>
// //                   <p className="text-xs text-slate-500">
// //                     {selectedChatbot.status === "active" ? "🟢 Online" : "⚫ Offline"} • Typically replies instantly
// //                   </p>
// //                 </div>
// //               </div>
// //               <button onClick={closeChatInterface} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
// //                 <X className="w-5 h-5 text-slate-500" />
// //               </button>
// //             </div>

// //             {/* Chat Messages */}
// //             <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-slate-50">
// //               {chat.map((msg, idx) => (
// //                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
// //                   <div className={`max-w-[75%] rounded-lg px-4 py-2 break-words ${
// //                     msg.type === "user" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-800"
// //                   }`}>
// //                     <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
// //                     <p className="text-xs mt-1 opacity-70">{msg.timestamp?.toLocaleTimeString()}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //               {isLoading && (
// //                 <div className="flex justify-start">
// //                   <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
// //                     <div className="flex gap-1">
// //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
// //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
// //                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //               <div ref={chatEndRef} />
// //             </div>

// //             {/* Quick Actions */}
// //             {selectedChatbot.buttons?.length > 0 && (
// //               <div className="px-4 py-3 border-t border-slate-200 bg-white flex-shrink-0">
// //                 <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
// //                 <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
// //                   {selectedChatbot.buttons.map((button, idx) => (
// //                     <button key={idx} onClick={() => handleButtonClick(button.label, false, null)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors break-words">
// //                       {button.label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* FAQs */}
// //             {selectedChatbot.faqs?.length > 0 && (
// //               <div className="px-4 py-3 border-t border-slate-200 bg-white flex-shrink-0">
// //                 <p className="text-xs text-slate-500 mb-2">Frequently Asked Questions:</p>
// //                 <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
// //                   {selectedChatbot.faqs.map((faq, idx) => (
// //                     <button key={idx} onClick={() => handleButtonClick(faq.question, true, faq.answer)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors break-words">
// //                       {faq.question}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Input */}
// //             <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
// //               <div className="flex gap-2">
// //                 <input
// //                   type="text"
// //                   value={message}
// //                   onChange={(e) => setMessage(e.target.value)}
// //                   onKeyPress={handleKeyPress}
// //                   placeholder="Type your message..."
// //                   disabled={isLoading}
// //                   className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
// //                 />
// //                 <button onClick={sendMessage} disabled={isLoading || !message.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50">
// //                   <Send className="w-4 h-4" />
// //                   Send
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Main Content */}
// //       <div className="space-y-6">
// //         {/* Header with Back Arrow */}
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <div className="flex items-center gap-3">
// //             {/* Back Arrow Button */}
// //             <button
// //               onClick={() => navigate("/dashboard")}
// //               className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
// //               aria-label="Back to Dashboard"
// //             >
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //                 strokeWidth={2.5}
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   d="M15 19l-7-7 7-7"
// //                 />
// //               </svg>
// //             </button>
// //             <div>
// //               <h1 className="text-2xl font-bold text-slate-900">AI Chatbot</h1>
// //               <p className="text-sm text-slate-600 mt-1">Configure and manage AI-powered chatbot responses</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <button onClick={() => handleTabChange('list')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
// //               activeTab === 'list' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
// //             }`}>
// //               Active Chatbots
// //             </button>
// //             <button onClick={() => handleTabChange('create')} className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
// //               activeTab === 'create' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
// //             }`}>
// //               <Plus className="w-4 h-4" />
// //               {editingChatbot ? 'Edit Chatbot' : 'Create New'}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Active Chatbots List */}
// //         {activeTab === 'list' && (
// //           <div className="space-y-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// //                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Total Chatbots</p>
// //                 <p className="text-3xl font-bold text-slate-900">{chatbots.length}</p>
// //               </div>
// //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// //                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Active</p>
// //                 <p className="text-3xl font-bold text-emerald-600">{chatbots.filter(b => b.status === 'active').length}</p>
// //               </div>
// //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// //                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Total Conversations</p>
// //                 <p className="text-3xl font-bold text-slate-900">{chatbots.reduce((sum, bot) => sum + (bot.conversations || 0), 0).toLocaleString()}</p>
// //               </div>
// //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// //                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Avg. Satisfaction</p>
// //                 <p className="text-3xl font-bold text-indigo-600">{(chatbots.reduce((sum, bot) => sum + (bot.satisfaction || 0), 0) / chatbots.length || 0).toFixed(1)}</p>
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
// //               {loading ? (
// //                 <div className="col-span-2 text-center py-10">Loading chatbots...</div>
// //               ) : (
// //                 chatbots.map((chatbot) => (
// //                   <div key={chatbot.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
// //                     <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
// //                       <div className="flex items-start gap-3">
// //                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${chatbot.status === 'active' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
// //                           <Bot className={`w-6 h-6 ${chatbot.status === 'active' ? 'text-emerald-600' : 'text-slate-500'}`} />
// //                         </div>
// //                         <div>
// //                           <h3 className="font-semibold text-slate-900 mb-1">{chatbot.name}</h3>
// //                           <p className="text-xs text-slate-500">Last active: {chatbot.last_active ? new Date(chatbot.last_active).toLocaleString() : 'Never'}</p>
// //                           {chatbot.description && <p className="text-xs text-slate-500 mt-1">{chatbot.description}</p>}
// //                         </div>
// //                       </div>
// //                       <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${chatbot.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-50 text-yellow-700'}`}>
// //                         {chatbot.status}
// //                       </span>
// //                     </div>

// //                     <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-slate-100">
// //                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Conversations</p><p className="text-lg font-bold text-slate-900">{(chatbot.conversations || 0).toLocaleString()}</p></div>
// //                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Responses</p><p className="text-lg font-bold text-slate-900">{(chatbot.responses || 0).toLocaleString()}</p></div>
// //                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Rating</p><p className="text-lg font-bold text-indigo-600">{chatbot.satisfaction || 0} ⭐</p></div>
// //                     </div>

// //                     <div className="flex flex-wrap gap-2 mb-4">
// //                       {chatbot.buttons?.length > 0 && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">{chatbot.buttons.length} Buttons</span>}
// //                       {chatbot.faqs?.length > 0 && <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">{chatbot.faqs.length} FAQs</span>}
// //                     </div>

// //                     <div className="flex flex-wrap items-center gap-2">
// //                       <button onClick={() => openChatInterface(chatbot)} className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
// //                         <MessageSquare className="w-4 h-4" /> Chat Now
// //                       </button>
// //                       <button onClick={() => toggleStatus(chatbot.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${chatbot.status === 'active' ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
// //                         <Power className="w-4 h-4" /> {chatbot.status === 'active' ? 'Pause' : 'Activate'}
// //                       </button>
// //                       <button onClick={() => handleDuplicateChatbot(chatbot)} className="p-2 hover:bg-slate-100 rounded-lg" title="Duplicate"><Copy className="w-4 h-4 text-slate-500" /></button>
// //                       <button onClick={() => handleEditChatbot(chatbot)} className="p-2 hover:bg-slate-100 rounded-lg" title="Edit"><Edit className="w-4 h-4 text-slate-500" /></button>
// //                       <button onClick={() => handleDeleteChatbot(chatbot.id)} className="p-2 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Create / Edit Chatbot */}
// //         {activeTab === 'create' && (
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
// //             <div className="space-y-5">
// //               {/* Basic Info */}
// //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// //                 <h3 className="text-sm font-bold text-slate-900 mb-4">Basic Information</h3>
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Chatbot Name *</label>
// //                     <input type="text" value={newChatbotName} onChange={(e) => setNewChatbotName(e.target.value)} placeholder="e.g., Customer Support Bot" className="w-full px-4 py-2 bg-white !text-black border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Description</label>
// //                     <textarea value={newChatbotDesc} onChange={(e) => setNewChatbotDesc(e.target.value)} placeholder="Brief description of what this chatbot does..." rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Welcome Message */}
// //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// //                 <div className="flex items-center gap-2 mb-4"><MessageSquare className="w-5 h-5 text-indigo-600" /><h3 className="text-sm font-bold text-slate-900">Welcome Message</h3></div>
// //                 <textarea value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
// //               </div>

// //               {/* FAQ Setup */}
// //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// //                 <div className="flex items-center gap-2 mb-4"><HelpCircle className="w-5 h-5 text-emerald-600" /><h3 className="text-sm font-bold text-slate-900">FAQ Responses</h3><span className="ml-auto text-xs text-slate-500">{faqs.length} FAQs</span></div>
// //                 <div className="space-y-3">
// //                   {faqs.map((faq, index) => (
// //                     <div key={index} className="p-3 bg-slate-50 rounded-lg relative group">
// //                       <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3 text-red-600" /></button>
// //                       <p className="text-sm font-medium text-slate-800 mb-1">Q: {faq.question}</p>
// //                       <p className="text-sm text-slate-600">A: {faq.answer}</p>
// //                     </div>
// //                   ))}
// //                   {showAddFaq ? (
// //                     <div className="space-y-2 p-3 bg-indigo-50 rounded-lg">
// //                       <input type="text" value={newFaqQuestion} onChange={(e) => setNewFaqQuestion(e.target.value)} placeholder="Enter question" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
// //                       <input type="text" value={newFaqAnswer} onChange={(e) => setNewFaqAnswer(e.target.value)} placeholder="Enter answer" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
// //                       <div className="flex gap-2"><button onClick={addFaq} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">Add</button><button onClick={() => setShowAddFaq(false)} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm">Cancel</button></div>
// //                     </div>
// //                   ) : (
// //                     <button onClick={() => setShowAddFaq(true)} className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 text-sm text-slate-600">+ Add FAQ</button>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Button Setup */}
// //               <div className="bg-white rounded-xl border border-slate-200 p-5">
// //                 <div className="flex items-center gap-2 mb-4"><MousePointerClick className="w-5 h-5 text-amber-600" /><h3 className="text-sm font-bold text-slate-900">Quick Action Buttons</h3><span className="ml-auto text-xs text-slate-500">{buttons.length} Buttons</span></div>
// //                 <div className="space-y-2">
// //                   {buttons.map((button, index) => (
// //                     <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg group">
// //                       <span className="flex-1 text-sm text-slate-700">{button.label} → {button.action}</span>
// //                       <button onClick={() => removeButton(index)} className="p-1 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3 text-red-600" /></button>
// //                     </div>
// //                   ))}
// //                   {showAddButton ? (
// //                     <div className="space-y-2 p-3 bg-indigo-50 rounded-lg">
// //                       <input type="text" value={newButtonLabel} onChange={(e) => setNewButtonLabel(e.target.value)} placeholder="Button label (e.g., View Pricing)" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
// //                       <input type="text" value={newButtonAction} onChange={(e) => setNewButtonAction(e.target.value)} placeholder="Action (e.g., /pricing)" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
// //                       <div className="flex gap-2"><button onClick={addButton} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">Add</button><button onClick={() => setShowAddButton(false)} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm">Cancel</button></div>
// //                     </div>
// //                   ) : (
// //                     <button onClick={() => setShowAddButton(true)} className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 text-sm text-slate-600">+ Add Button</button>
// //                   )}
// //                 </div>
// //               </div>

// //               <button onClick={handleSaveChatbot} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
// //                 <Save className="w-4 h-4" /> {editingChatbot ? 'Update Chatbot' : 'Save & Activate Chatbot'}
// //               </button>
// //             </div>

// //             {/* Live Preview */}
// //             <div className="space-y-5">
// //               <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-6">
// //                 <div className="flex items-center gap-2 mb-4"><Bot className="w-5 h-5 text-indigo-600" /><h3 className="text-sm font-bold text-slate-900">Live Preview</h3><span className="text-xs text-slate-500">(Updates in real-time)</span></div>
// //                 <div className="bg-slate-50 rounded-xl p-4 min-h-[500px] flex flex-col">
// //                   <div className="flex-1 space-y-3">
// //                     <div className="flex gap-2">
// //                       <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
// //                       <div className="bg-white rounded-lg px-4 py-2 max-w-[80%] shadow-sm border border-slate-200">
// //                         <p className="text-sm text-slate-800">{welcomeMessage || "Welcome message will appear here"}</p>
// //                       </div>
// //                     </div>
// //                     {buttons.length > 0 && (
// //                       <div className="pl-10">
// //                         <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
// //                         <div className="flex gap-2 flex-wrap">
// //                           {buttons.map((btn, idx) => (
// //                             <button key={idx} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm">{btn.label}</button>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                     {faqs.length > 0 && (
// //                       <div className="pl-10">
// //                         <p className="text-xs text-slate-500 mb-2">Frequently Asked Questions:</p>
// //                         <div className="flex gap-2 flex-wrap">
// //                           {faqs.map((faq, idx) => (
// //                             <button key={idx} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm">{faq.question}</button>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Bot, MessageSquare, HelpCircle, MousePointerClick, Save, Plus, Power, Eye, Edit, Trash2, Copy, BarChart3, Send, X } from 'lucide-react';

// const API_BASE = 'https://wynreach-backend.onrender.com/api/chatbots';

// export default function Chatbot() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('list');
//   const [chatbots, setChatbots] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // Form states
//   const [welcomeMessage, setWelcomeMessage] = useState('Hi! Welcome to our service. How can I help you today?');
//   const [faqs, setFaqs] = useState([
//     { question: 'What are your hours?', answer: 'We are available 24/7' },
//     { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
//   ]);
//   const [buttons, setButtons] = useState([
//     { label: 'View Pricing', action: '/pricing' },
//     { label: 'Contact Support', action: '/contact' },
//   ]);
//   const [chatbotStatus, setChatbotStatus] = useState('active');
  
//   // Chat states
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [selectedChatbot, setSelectedChatbot] = useState(null);
//   const [showChatInterface, setShowChatInterface] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [newChatbotName, setNewChatbotName] = useState('');
//   const [newChatbotDesc, setNewChatbotDesc] = useState('');
//   const [newFaqQuestion, setNewFaqQuestion] = useState('');
//   const [newFaqAnswer, setNewFaqAnswer] = useState('');
//   const [newButtonLabel, setNewButtonLabel] = useState('');
//   const [newButtonAction, setNewButtonAction] = useState('');
//   const [showAddFaq, setShowAddFaq] = useState(false);
//   const [showAddButton, setShowAddButton] = useState(false);
//   const [editingChatbot, setEditingChatbot] = useState(null);
  
//   const chatEndRef = useRef(null);

//   // -------------------- API CALLS --------------------
//   const fetchChatbots = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/`);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setChatbots(data);
//     } catch (error) {
//       console.error(error);
//       alert('Could not load chatbots. Make sure backend is running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createChatbot = async (data) => {
//     const res = await fetch(`${API_BASE}/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     if (!res.ok) throw new Error('Create failed');
//     return res.json();
//   };

//   const updateChatbot = async (id, data) => {
//     const res = await fetch(`${API_BASE}/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     if (!res.ok) throw new Error('Update failed');
//     return res.json();
//   };

//   const deleteChatbot = async (id) => {
//     const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
//     if (!res.ok) throw new Error('Delete failed');
//   };

//   const duplicateChatbot = async (id) => {
//     const res = await fetch(`${API_BASE}/${id}/duplicate`, { method: 'POST' });
//     if (!res.ok) throw new Error('Duplicate failed');
//     return res.json();
//   };

//   const toggleStatusAPI = async (id) => {
//     const res = await fetch(`${API_BASE}/${id}/status`, { method: 'PATCH' });
//     if (!res.ok) throw new Error('Toggle failed');
//     return res.json();
//   };

//   useEffect(() => {
//     fetchChatbots();
//   }, []);

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [chat]);

//   // -------------------- CRUD Handlers --------------------
//   // ✅ OPTIMISTIC TOGGLE – no refresh, no flicker
//   const toggleStatus = async (id) => {
//     const botToToggle = chatbots.find(b => b.id === id);
//     if (!botToToggle) return;

//     const newStatus = botToToggle.status === 'active' ? 'inactive' : 'active';
//     const originalStatus = botToToggle.status;

//     // Optimistic update – change UI instantly
//     setChatbots(prev => prev.map(bot =>
//       bot.id === id ? { ...bot, status: newStatus } : bot
//     ));

//     try {
//       await toggleStatusAPI(id);
//       // Success – no need to do anything else
//     } catch (err) {
//       // Revert on error
//       setChatbots(prev => prev.map(bot =>
//         bot.id === id ? { ...bot, status: originalStatus } : bot
//       ));
//       alert('Failed to toggle status. Please try again.');
//     }
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setShowChatInterface(false);
//     setSelectedChatbot(null);
//     if (tab === 'create') {
//       setNewChatbotName('');
//       setNewChatbotDesc('');
//       setWelcomeMessage('Hi! Welcome to our service. How can I help you today?');
//       setFaqs([
//         { question: 'What are your hours?', answer: 'We are available 24/7' },
//         { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
//       ]);
//       setButtons([
//         { label: 'View Pricing', action: '/pricing' },
//         { label: 'Contact Support', action: '/contact' },
//       ]);
//       setChatbotStatus('active');
//       setEditingChatbot(null);
//     }
//   };

//   const handleEditChatbot = (chatbot) => {
//     setEditingChatbot(chatbot);
//     setNewChatbotName(chatbot.name);
//     setNewChatbotDesc(chatbot.description || '');
//     setWelcomeMessage(chatbot.welcome_message);
//     setFaqs(chatbot.faqs || []);
//     setButtons(chatbot.buttons || []);
//     setChatbotStatus(chatbot.status || 'active');
//     setActiveTab('create');
//   };

//   const handleDeleteChatbot = async (id) => {
//     if (window.confirm('Are you sure you want to delete this chatbot?')) {
//       try {
//         await deleteChatbot(id);
//         // Remove from local state optimistically
//         setChatbots(prev => prev.filter(bot => bot.id !== id));
//       } catch (err) {
//         alert('Delete failed');
//         fetchChatbots(); // fallback refresh
//       }
//     }
//   };

//   const handleDuplicateChatbot = async (chatbot) => {
//     try {
//       const newBot = await duplicateChatbot(chatbot.id);
//       setChatbots(prev => [...prev, newBot]);
//     } catch (err) {
//       alert('Duplicate failed');
//     }
//   };

//   const handleSaveChatbot = async () => {
//     if (!newChatbotName.trim()) {
//       alert('Please enter a chatbot name');
//       return;
//     }

//     const payload = {
//       name: newChatbotName,
//       description: newChatbotDesc,
//       welcome_message: welcomeMessage,
//       buttons: buttons,
//       faqs: faqs,
//       status: chatbotStatus
//     };

//     try {
//       let savedBot;
//       if (editingChatbot) {
//         savedBot = await updateChatbot(editingChatbot.id, payload);
//         setChatbots(prev => prev.map(bot => bot.id === editingChatbot.id ? savedBot : bot));
//         alert(`Chatbot "${newChatbotName}" updated successfully!`);
//       } else {
//         savedBot = await createChatbot(payload);
//         setChatbots(prev => [...prev, savedBot]);
//         alert(`Chatbot "${newChatbotName}" created successfully!`);
//       }
//       resetForm();
//       setActiveTab('list');
//     } catch (err) {
//       alert('Error saving chatbot: ' + err.message);
//     }
//   };

//   const resetForm = () => {
//     setNewChatbotName('');
//     setNewChatbotDesc('');
//     setWelcomeMessage('Hi! Welcome to our service. How can I help you today?');
//     setFaqs([
//       { question: 'What are your hours?', answer: 'We are available 24/7' },
//       { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
//     ]);
//     setButtons([
//       { label: 'View Pricing', action: '/pricing' },
//       { label: 'Contact Support', action: '/contact' },
//     ]);
//     setChatbotStatus('active');
//     setEditingChatbot(null);
//   };

//   // -------------------- FAQ / Button helpers --------------------
//   const addFaq = () => {
//     if (newFaqQuestion && newFaqAnswer) {
//       setFaqs([...faqs, { question: newFaqQuestion, answer: newFaqAnswer }]);
//       setNewFaqQuestion('');
//       setNewFaqAnswer('');
//       setShowAddFaq(false);
//     } else {
//       alert('Please enter both question and answer');
//     }
//   };

//   const addButton = () => {
//     if (newButtonLabel && newButtonAction) {
//       setButtons([...buttons, { label: newButtonLabel, action: newButtonAction }]);
//       setNewButtonLabel('');
//       setNewButtonAction('');
//       setShowAddButton(false);
//     } else {
//       alert('Please enter both button label and action');
//     }
//   };

//   const removeFaq = (index) => {
//     if (window.confirm('Remove this FAQ?')) {
//       setFaqs(faqs.filter((_, i) => i !== index));
//     }
//   };

//   const removeButton = (index) => {
//     if (window.confirm('Remove this button?')) {
//       setButtons(buttons.filter((_, i) => i !== index));
//     }
//   };

//   // -------------------- Chat functions --------------------
//   const sendMessage = async () => {
//     if (!message.trim() || isLoading || !selectedChatbot) return;

//     const currentMessage = message.trim();
//     const userMsg = { type: "user", text: currentMessage, timestamp: new Date() };
//     setChat(prev => [...prev, userMsg]);
//     setMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API_BASE}/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: currentMessage,
//           chatbot_id: selectedChatbot.id
//         })
//       });

//       if (!response.ok) {
//         let errorText = `HTTP ${response.status}`;
//         try {
//           const errorData = await response.json();
//           errorText = errorData.detail || errorText;
//         } catch (_) {}
//         throw new Error(errorText);
//       }

//       const data = await response.json();
//       const botMsg = { type: "bot", text: data.reply, timestamp: new Date() };
//       setChat(prev => [...prev, botMsg]);
      
//       // Update conversation count in local state
//       setChatbots(prev => prev.map(bot =>
//         bot.id === selectedChatbot.id ? { ...bot, conversations: (bot.conversations || 0) + 1 } : bot
//       ));
//     } catch (error) {
//       console.error("SEND MESSAGE ERROR:", error);
//       const faqMatch = selectedChatbot?.faqs?.find((faq) =>
//         currentMessage.toLowerCase().includes(faq.question.toLowerCase())
//       );
//       if (faqMatch) {
//         const faqReply = { type: "bot", text: faqMatch.answer, timestamp: new Date() };
//         setChat(prev => [...prev, faqReply]);
//       } else {
//         const errorMsg = { type: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again later.", timestamp: new Date() };
//         setChat(prev => [...prev, errorMsg]);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const openChatInterface = (chatbot) => {
//     setSelectedChatbot(chatbot);
//     setShowChatInterface(true);
//     setChat([
//       { type: "bot", text: chatbot.welcome_message || "Hi! How can I help you today?", timestamp: new Date() }
//     ]);
//   };

//   const closeChatInterface = () => {
//     setShowChatInterface(false);
//     setSelectedChatbot(null);
//     setChat([]);
//   };

//   const handleButtonClick = async (buttonLabel, isFaq = false, faqAnswer = null) => {
//     if (!selectedChatbot) return;
//     const userMsg = { type: "user", text: buttonLabel, timestamp: new Date() };
//     setChat(prev => [...prev, userMsg]);
//     setIsLoading(true);
    
//     try {
//       const response = await fetch(`${API_BASE}/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           message: buttonLabel,
//           chatbot_id: selectedChatbot.id 
//         }),
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         const botMsg = { type: "bot", text: data.reply, timestamp: new Date() };
//         setChat(prev => [...prev, botMsg]);
//       } else {
//         throw new Error("Backend not available");
//       }
//     } catch (error) {
//       if (faqAnswer) {
//         const botMsg = { type: "bot", text: faqAnswer, timestamp: new Date() };
//         setChat(prev => [...prev, botMsg]);
//       } else {
//         const botMsg = { type: "bot", text: `You selected: ${buttonLabel}. How can I help you further?`, timestamp: new Date() };
//         setChat(prev => [...prev, botMsg]);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // -------------------- Render --------------------
//   return (
//     <div className="p-1 lg:p-3 bg-slate-50 min-h-screen font-sans">
 
//       {showChatInterface && selectedChatbot && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[90vh] max-h-[700px] flex flex-col overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b border-slate-200 flex-shrink-0">
//               <div className="flex items-center gap-3">
//                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                   selectedChatbot.status === "active" ? "bg-emerald-100" : "bg-slate-100"
//                 }`}>
//                   <Bot className={`w-5 h-5 ${
//                     selectedChatbot.status === "active" ? "text-emerald-600" : "text-slate-500"
//                   }`} />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-slate-900">{selectedChatbot.name}</h3>
//                   <p className="text-xs text-slate-500">
//                     {selectedChatbot.status === "active" ? "🟢 Online" : "⚫ Offline"} • Typically replies instantly
//                   </p>
//                 </div>
//               </div>
//               <button onClick={closeChatInterface} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
//                 <X className="w-5 h-5 text-slate-500" />
//               </button>
//             </div>

//             <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-slate-50">
//               {chat.map((msg, idx) => (
//                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[75%] rounded-lg px-4 py-2 break-words ${
//                     msg.type === "user" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-800"
//                   }`}>
//                     <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
//                     <p className="text-xs mt-1 opacity-70">{msg.timestamp?.toLocaleTimeString()}</p>
//                   </div>
//                 </div>
//               ))}
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
//                     <div className="flex gap-1">
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={chatEndRef} />
//             </div>

//             {selectedChatbot.buttons?.length > 0 && (
//               <div className="px-4 py-3 border-t border-slate-200 bg-white flex-shrink-0">
//                 <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
//                 <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
//                   {selectedChatbot.buttons.map((button, idx) => (
//                     <button key={idx} onClick={() => handleButtonClick(button.label, false, null)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors break-words">
//                       {button.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedChatbot.faqs?.length > 0 && (
//               <div className="px-4 py-3 border-t border-slate-200 bg-white flex-shrink-0">
//                 <p className="text-xs text-slate-500 mb-2">Frequently Asked Questions:</p>
//                 <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
//                   {selectedChatbot.faqs.map((faq, idx) => (
//                     <button key={idx} onClick={() => handleButtonClick(faq.question, true, faq.answer)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors break-words">
//                       {faq.question}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type your message..."
//                   disabled={isLoading}
//                   className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
//                 />
//                 <button onClick={sendMessage} disabled={isLoading || !message.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50">
//                   <Send className="w-4 h-4" />
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="space-y-6">
//         {/* Header with Back Arrow */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
//               aria-label="Back to Dashboard"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2.5}
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">AI Chatbot</h1>
//               <p className="text-sm text-slate-600 mt-1">Configure and manage AI-powered chatbot responses</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={() => handleTabChange('list')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
//               activeTab === 'list' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
//             }`}>
//               Active Chatbots
//             </button>
//             <button onClick={() => handleTabChange('create')} className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
//               activeTab === 'create' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
//             }`}>
//               <Plus className="w-4 h-4" />
//               {editingChatbot ? 'Edit Chatbot' : 'Create New'}
//             </button>
//           </div>
//         </div>

//         {/* Active Chatbots List */}
//         {activeTab === 'list' && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="bg-white rounded-xl border border-slate-200 p-5">
//                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Total Chatbots</p>
//                 <p className="text-3xl font-bold text-slate-900">{chatbots.length}</p>
//               </div>
//               <div className="bg-white rounded-xl border border-slate-200 p-5">
//                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Active</p>
//                 <p className="text-3xl font-bold text-emerald-600">{chatbots.filter(b => b.status === 'active').length}</p>
//               </div>
//               <div className="bg-white rounded-xl border border-slate-200 p-5">
//                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Total Conversations</p>
//                 <p className="text-3xl font-bold text-slate-900">{chatbots.reduce((sum, bot) => sum + (bot.conversations || 0), 0).toLocaleString()}</p>
//               </div>
//               <div className="bg-white rounded-xl border border-slate-200 p-5">
//                 <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Avg. Satisfaction</p>
//                 <p className="text-3xl font-bold text-indigo-600">{(chatbots.reduce((sum, bot) => sum + (bot.satisfaction || 0), 0) / chatbots.length || 0).toFixed(1)}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//               {loading ? (
//                 <div className="col-span-2 text-center py-10">Loading chatbots...</div>
//               ) : (
//                 chatbots.map((chatbot) => (
//                   <div key={chatbot.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
//                     <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
//                       <div className="flex items-start gap-3">
//                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${chatbot.status === 'active' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
//                           <Bot className={`w-6 h-6 ${chatbot.status === 'active' ? 'text-emerald-600' : 'text-slate-500'}`} />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-slate-900 mb-1">{chatbot.name}</h3>
//                           <p className="text-xs text-slate-500">Last active: {chatbot.last_active ? new Date(chatbot.last_active).toLocaleString() : 'Never'}</p>
//                           {chatbot.description && <p className="text-xs text-slate-500 mt-1">{chatbot.description}</p>}
//                         </div>
//                       </div>
//                       {/* ✅ Toggle Switch - No Refresh */}
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           className="sr-only peer"
//                           checked={chatbot.status === 'active'}
//                           onChange={() => toggleStatus(chatbot.id)}
//                         />
//                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
//                         <span className="ml-3 text-sm font-medium text-slate-700">
//                           {chatbot.status === 'active' ? 'Active' : 'Inactive'}
//                         </span>
//                       </label>
//                     </div>

//                     <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-slate-100">
//                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Conversations</p><p className="text-lg font-bold text-slate-900">{(chatbot.conversations || 0).toLocaleString()}</p></div>
//                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Responses</p><p className="text-lg font-bold text-slate-900">{(chatbot.responses || 0).toLocaleString()}</p></div>
//                       <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Rating</p><p className="text-lg font-bold text-indigo-600">{chatbot.satisfaction || 0} ⭐</p></div>
//                     </div>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {chatbot.buttons?.length > 0 && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">{chatbot.buttons.length} Buttons</span>}
//                       {chatbot.faqs?.length > 0 && <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">{chatbot.faqs.length} FAQs</span>}
//                     </div>

//                     <div className="flex flex-wrap items-center gap-2">
//                       <button onClick={() => openChatInterface(chatbot)} className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
//                         <MessageSquare className="w-4 h-4" /> Chat Now
//                       </button>
//                       <button onClick={() => handleDuplicateChatbot(chatbot)} className="p-2 hover:bg-slate-100 rounded-lg" title="Duplicate"><Copy className="w-4 h-4 text-slate-500" /></button>
//                       <button onClick={() => handleEditChatbot(chatbot)} className="p-2 hover:bg-slate-100 rounded-lg" title="Edit"><Edit className="w-4 h-4 text-slate-500" /></button>
//                       <button onClick={() => handleDeleteChatbot(chatbot.id)} className="p-2 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         )}

//         {/* Create / Edit Chatbot */}
//         {activeTab === 'create' && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//             <div className="space-y-5">
//               {/* Basic Info */}
//               <div className="bg-white rounded-xl border border-slate-200 p-5">
//                 <h3 className="text-sm font-bold text-slate-900 mb-4">Basic Information</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Chatbot Name *</label>
//                     <input type="text" value={newChatbotName} onChange={(e) => setNewChatbotName(e.target.value)} placeholder="e.g., Customer Support Bot" className="w-full px-4 py-2 bg-white !text-black border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Description</label>
//                     <textarea value={newChatbotDesc} onChange={(e) => setNewChatbotDesc(e.target.value)} placeholder="Brief description of what this chatbot does..." rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Status</label>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         className="sr-only peer"
//                         checked={chatbotStatus === 'active'}
//                         onChange={() => setChatbotStatus(chatbotStatus === 'active' ? 'inactive' : 'active')}
//                       />
//                       <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
//                       <span className="ml-3 text-sm font-medium text-slate-700">
//                         {chatbotStatus === 'active' ? 'Active' : 'Inactive'}
//                       </span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Welcome Message */}
//               <div className="bg-white rounded-xl border border-slate-200 p-5">
//                 <div className="flex items-center gap-2 mb-4"><MessageSquare className="w-5 h-5 text-indigo-600" /><h3 className="text-sm font-bold text-slate-900">Welcome Message</h3></div>
//                 <textarea value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
//               </div>

//               {/* FAQ Setup */}
//               <div className="bg-white rounded-xl border border-slate-200 p-5">
//                 <div className="flex items-center gap-2 mb-4"><HelpCircle className="w-5 h-5 text-emerald-600" /><h3 className="text-sm font-bold text-slate-900">FAQ Responses</h3><span className="ml-auto text-xs text-slate-500">{faqs.length} FAQs</span></div>
//                 <div className="space-y-3">
//                   {faqs.map((faq, index) => (
//                     <div key={index} className="p-3 bg-slate-50 rounded-lg relative group">
//                       <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3 text-red-600" /></button>
//                       <p className="text-sm font-medium text-slate-800 mb-1">Q: {faq.question}</p>
//                       <p className="text-sm text-slate-600">A: {faq.answer}</p>
//                     </div>
//                   ))}
//                   {showAddFaq ? (
//                     <div className="space-y-2 p-3 bg-indigo-50 rounded-lg">
//                       <input type="text" value={newFaqQuestion} onChange={(e) => setNewFaqQuestion(e.target.value)} placeholder="Enter question" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
//                       <input type="text" value={newFaqAnswer} onChange={(e) => setNewFaqAnswer(e.target.value)} placeholder="Enter answer" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
//                       <div className="flex gap-2"><button onClick={addFaq} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">Add</button><button onClick={() => setShowAddFaq(false)} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm">Cancel</button></div>
//                     </div>
//                   ) : (
//                     <button onClick={() => setShowAddFaq(true)} className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 text-sm text-slate-600">+ Add FAQ</button>
//                   )}
//                 </div>
//               </div>

//               {/* Button Setup */}
//               <div className="bg-white rounded-xl border border-slate-200 p-5">
//                 <div className="flex items-center gap-2 mb-4"><MousePointerClick className="w-5 h-5 text-amber-600" /><h3 className="text-sm font-bold text-slate-900">Quick Action Buttons</h3><span className="ml-auto text-xs text-slate-500">{buttons.length} Buttons</span></div>
//                 <div className="space-y-2">
//                   {buttons.map((button, index) => (
//                     <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg group">
//                       <span className="flex-1 text-sm text-slate-700">{button.label} → {button.action}</span>
//                       <button onClick={() => removeButton(index)} className="p-1 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3 text-red-600" /></button>
//                     </div>
//                   ))}
//                   {showAddButton ? (
//                     <div className="space-y-2 p-3 bg-indigo-50 rounded-lg">
//                       <input type="text" value={newButtonLabel} onChange={(e) => setNewButtonLabel(e.target.value)} placeholder="Button label (e.g., View Pricing)" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
//                       <input type="text" value={newButtonAction} onChange={(e) => setNewButtonAction(e.target.value)} placeholder="Action (e.g., /pricing)" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
//                       <div className="flex gap-2"><button onClick={addButton} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">Add</button><button onClick={() => setShowAddButton(false)} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm">Cancel</button></div>
//                     </div>
//                   ) : (
//                     <button onClick={() => setShowAddButton(true)} className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 text-sm text-slate-600">+ Add Button</button>
//                   )}
//                 </div>
//               </div>

//               <button onClick={handleSaveChatbot} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
//                 <Save className="w-4 h-4" /> {editingChatbot ? 'Update Chatbot' : 'Save & Activate Chatbot'}
//               </button>
//             </div>

//             {/* Live Preview */}
//             <div className="space-y-5">
//               <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-6">
//                 <div className="flex items-center gap-2 mb-4"><Bot className="w-5 h-5 text-indigo-600" /><h3 className="text-sm font-bold text-slate-900">Live Preview</h3><span className="text-xs text-slate-500">(Updates in real-time)</span></div>
//                 <div className="bg-slate-50 rounded-xl p-4 min-h-[500px] flex flex-col">
//                   <div className="flex-1 space-y-3">
//                     <div className="flex gap-2">
//                       <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
//                       <div className="bg-white rounded-lg px-4 py-2 max-w-[80%] shadow-sm border border-slate-200">
//                         <p className="text-sm text-slate-800">{welcomeMessage || "Welcome message will appear here"}</p>
//                       </div>
//                     </div>
//                     {buttons.length > 0 && (
//                       <div className="pl-10">
//                         <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
//                         <div className="flex gap-2 flex-wrap">
//                           {buttons.map((btn, idx) => (
//                             <button key={idx} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm">{btn.label}</button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     {faqs.length > 0 && (
//                       <div className="pl-10">
//                         <p className="text-xs text-slate-500 mb-2">Frequently Asked Questions:</p>
//                         <div className="flex gap-2 flex-wrap">
//                           {faqs.map((faq, idx) => (
//                             <button key={idx} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm">{faq.question}</button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageSquare, HelpCircle, MousePointerClick, Save, Plus, Edit, Trash2, Copy, Send, X } from 'lucide-react';

const API_BASE = 'https://wynreach-backend.onrender.com/api/chatbots';

export default function Chatbot() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [chatbots, setChatbots] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [welcomeMessage, setWelcomeMessage] = useState('Hi! Welcome to our service. How can I help you today?');
  const [faqs, setFaqs] = useState([
    { question: 'What are your hours?', answer: 'We are available 24/7' },
    { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
  ]);
  const [buttons, setButtons] = useState([
    { label: 'View Pricing', action: '/pricing' },
    { label: 'Contact Support', action: '/contact' },
  ]);
  const [chatbotStatus, setChatbotStatus] = useState('active');
  
  // Chat states
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newChatbotName, setNewChatbotName] = useState('');
  const [newChatbotDesc, setNewChatbotDesc] = useState('');
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newButtonLabel, setNewButtonLabel] = useState('');
  const [newButtonAction, setNewButtonAction] = useState('');
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [editingChatbot, setEditingChatbot] = useState(null);
  
  const chatEndRef = useRef(null);

  // -------------------- API CALLS --------------------
  const fetchChatbots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setChatbots(data);
    } catch (error) {
      console.error(error);
      alert('Could not load chatbots. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const createChatbot = async (data) => {
    const res = await fetch(`${API_BASE}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Create failed');
    return res.json();
  };

  const updateChatbot = async (id, data) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  };

  const deleteChatbot = async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
  };

  const duplicateChatbot = async (id) => {
    const res = await fetch(`${API_BASE}/${id}/duplicate`, { method: 'POST' });
    if (!res.ok) throw new Error('Duplicate failed');
    return res.json();
  };

  const toggleStatusAPI = async (id) => {
    const res = await fetch(`${API_BASE}/${id}/status`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Toggle failed');
    return res.json();
  };

  useEffect(() => {
    fetchChatbots();
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  // -------------------- CRUD Handlers --------------------
  const toggleStatus = async (id) => {
    const botToToggle = chatbots.find(b => b.id === id);
    if (!botToToggle) return;

    const newStatus = botToToggle.status === 'active' ? 'inactive' : 'active';
    const originalStatus = botToToggle.status;

    // Optimistic update
    setChatbots(prev => prev.map(bot =>
      bot.id === id ? { ...bot, status: newStatus } : bot
    ));

    try {
      await toggleStatusAPI(id);
      // Success – no further action
    } catch (err) {
      // Revert on error
      setChatbots(prev => prev.map(bot =>
        bot.id === id ? { ...bot, status: originalStatus } : bot
      ));
      alert('Failed to toggle status. Please try again.');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowChatInterface(false);
    setSelectedChatbot(null);
    if (tab === 'create') {
      setNewChatbotName('');
      setNewChatbotDesc('');
      setWelcomeMessage('Hi! Welcome to our service. How can I help you today?');
      setFaqs([
        { question: 'What are your hours?', answer: 'We are available 24/7' },
        { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
      ]);
      setButtons([
        { label: 'View Pricing', action: '/pricing' },
        { label: 'Contact Support', action: '/contact' },
      ]);
      setChatbotStatus('active');
      setEditingChatbot(null);
    }
  };

  const handleEditChatbot = (chatbot) => {
    setEditingChatbot(chatbot);
    setNewChatbotName(chatbot.name);
    setNewChatbotDesc(chatbot.description || '');
    setWelcomeMessage(chatbot.welcome_message);
    setFaqs(chatbot.faqs || []);
    setButtons(chatbot.buttons || []);
    setChatbotStatus(chatbot.status || 'active');
    setActiveTab('create');
  };

  const handleDeleteChatbot = async (id) => {
    if (window.confirm('Are you sure you want to delete this chatbot?')) {
      try {
        await deleteChatbot(id);
        setChatbots(prev => prev.filter(bot => bot.id !== id));
      } catch (err) {
        alert('Delete failed');
        fetchChatbots(); // fallback
      }
    }
  };

  const handleDuplicateChatbot = async (chatbot) => {
    try {
      const newBot = await duplicateChatbot(chatbot.id);
      setChatbots(prev => [...prev, newBot]);
    } catch (err) {
      alert('Duplicate failed');
    }
  };

  const handleSaveChatbot = async () => {
    if (!newChatbotName.trim()) {
      alert('Please enter a chatbot name');
      return;
    }

    const payload = {
      name: newChatbotName,
      description: newChatbotDesc,
      welcome_message: welcomeMessage,
      buttons: buttons,
      faqs: faqs,
      status: chatbotStatus
    };

    try {
      let savedBot;
      if (editingChatbot) {
        savedBot = await updateChatbot(editingChatbot.id, payload);
        setChatbots(prev => prev.map(bot => bot.id === editingChatbot.id ? savedBot : bot));
        alert(`Chatbot "${newChatbotName}" updated successfully!`);
      } else {
        savedBot = await createChatbot(payload);
        setChatbots(prev => [...prev, savedBot]);
        alert(`Chatbot "${newChatbotName}" created successfully!`);
      }
      resetForm();
      setActiveTab('list');
    } catch (err) {
      alert('Error saving chatbot: ' + err.message);
    }
  };

  const resetForm = () => {
    setNewChatbotName('');
    setNewChatbotDesc('');
    setWelcomeMessage('Hi! Welcome to our service. How can I help you today?');
    setFaqs([
      { question: 'What are your hours?', answer: 'We are available 24/7' },
      { question: 'How do I get started?', answer: 'Click on the signup button to create an account' },
    ]);
    setButtons([
      { label: 'View Pricing', action: '/pricing' },
      { label: 'Contact Support', action: '/contact' },
    ]);
    setChatbotStatus('active');
    setEditingChatbot(null);
  };

  // -------------------- FAQ / Button helpers --------------------
  const addFaq = () => {
    if (newFaqQuestion && newFaqAnswer) {
      setFaqs([...faqs, { question: newFaqQuestion, answer: newFaqAnswer }]);
      setNewFaqQuestion('');
      setNewFaqAnswer('');
      setShowAddFaq(false);
    } else {
      alert('Please enter both question and answer');
    }
  };

  const addButton = () => {
    if (newButtonLabel && newButtonAction) {
      setButtons([...buttons, { label: newButtonLabel, action: newButtonAction }]);
      setNewButtonLabel('');
      setNewButtonAction('');
      setShowAddButton(false);
    } else {
      alert('Please enter both button label and action');
    }
  };

  const removeFaq = (index) => {
    if (window.confirm('Remove this FAQ?')) {
      setFaqs(faqs.filter((_, i) => i !== index));
    }
  };

  const removeButton = (index) => {
    if (window.confirm('Remove this button?')) {
      setButtons(buttons.filter((_, i) => i !== index));
    }
  };

  // -------------------- Chat functions --------------------
  const sendMessage = async () => {
    if (!message.trim() || isLoading || !selectedChatbot) return;

    const currentMessage = message.trim();
    const userMsg = { type: "user", text: currentMessage, timestamp: new Date() };
    setChat(prev => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentMessage,
          chatbot_id: selectedChatbot.id
        })
      });

      if (!response.ok) {
        let errorText = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorText = errorData.detail || errorText;
        } catch (_) {}
        // If chatbot is inactive, close interface and show alert
        if (response.status === 403) {
          alert(errorText);
          closeChatInterface();
          return;
        }
        throw new Error(errorText);
      }

      const data = await response.json();
      const botMsg = { type: "bot", text: data.reply, timestamp: new Date() };
      setChat(prev => [...prev, botMsg]);
      
      // Update conversation count optimistically
      setChatbots(prev => prev.map(bot =>
        bot.id === selectedChatbot.id ? { ...bot, conversations: (bot.conversations || 0) + 1 } : bot
      ));
    } catch (error) {
      console.error("SEND MESSAGE ERROR:", error);
      const faqMatch = selectedChatbot?.faqs?.find((faq) =>
        currentMessage.toLowerCase().includes(faq.question.toLowerCase())
      );
      if (faqMatch) {
        const faqReply = { type: "bot", text: faqMatch.answer, timestamp: new Date() };
        setChat(prev => [...prev, faqReply]);
      } else {
        const errorMsg = { type: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again later.", timestamp: new Date() };
        setChat(prev => [...prev, errorMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ✅ Prevent opening chat for inactive chatbots
  const openChatInterface = (chatbot) => {
    if (chatbot.status !== "active") {
      alert("This chatbot is inactive. Please activate it to start a conversation.");
      return;
    }
    setSelectedChatbot(chatbot);
    setShowChatInterface(true);
    setChat([
      { type: "bot", text: chatbot.welcome_message || "Hi! How can I help you today?", timestamp: new Date() }
    ]);
  };

  const closeChatInterface = () => {
    setShowChatInterface(false);
    setSelectedChatbot(null);
    setChat([]);
  };

  const handleButtonClick = async (buttonLabel, isFaq = false, faqAnswer = null) => {
    if (!selectedChatbot) return;
    const userMsg = { type: "user", text: buttonLabel, timestamp: new Date() };
    setChat(prev => [...prev, userMsg]);
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: buttonLabel,
          chatbot_id: selectedChatbot.id 
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const botMsg = { type: "bot", text: data.reply, timestamp: new Date() };
        setChat(prev => [...prev, botMsg]);
      } else {
        if (response.status === 403) {
          const errorData = await response.json();
          alert(errorData.detail);
          closeChatInterface();
          return;
        }
        throw new Error("Backend not available");
      }
    } catch (error) {
      if (faqAnswer) {
        const botMsg = { type: "bot", text: faqAnswer, timestamp: new Date() };
        setChat(prev => [...prev, botMsg]);
      } else {
        const botMsg = { type: "bot", text: `You selected: ${buttonLabel}. How can I help you further?`, timestamp: new Date() };
        setChat(prev => [...prev, botMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="p-1 lg:p-3 bg-slate-50 min-h-screen font-sans">
 
      {/* Chat Modal */}
      {showChatInterface && selectedChatbot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[90vh] max-h-[700px] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedChatbot.status === "active" ? "bg-emerald-100" : "bg-slate-100"
                }`}>
                  <Bot className={`w-5 h-5 ${
                    selectedChatbot.status === "active" ? "text-emerald-600" : "text-slate-500"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedChatbot.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedChatbot.status === "active" ? "🟢 Online" : "⚫ Offline"} • Typically replies instantly
                  </p>
                </div>
              </div>
              <button onClick={closeChatInterface} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {chat.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-lg px-4 py-2 break-words ${
                    msg.type === "user" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-800"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.timestamp?.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {selectedChatbot.buttons?.length > 0 && (
              <div className="px-4 py-3 border-t border-slate-200 bg-white flex-shrink-0">
                <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
                <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                  {selectedChatbot.buttons.map((button, idx) => (
                    <button key={idx} onClick={() => handleButtonClick(button.label, false, null)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors break-words">
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedChatbot.faqs?.length > 0 && (
              <div className="px-4 py-3 border-t border-slate-200 bg-white flex-shrink-0">
                <p className="text-xs text-slate-500 mb-2">Frequently Asked Questions:</p>
                <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto">
                  {selectedChatbot.faqs.map((faq, idx) => (
                    <button key={idx} onClick={() => handleButtonClick(faq.question, true, faq.answer)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors break-words">
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                />
                <button onClick={sendMessage} disabled={isLoading || !message.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50">
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Back to Dashboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AI Chatbot</h1>
              <p className="text-sm text-slate-600 mt-1">Configure and manage AI-powered chatbot responses</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleTabChange('list')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
              activeTab === 'list' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}>
              Active Chatbots
            </button>
            <button onClick={() => handleTabChange('create')} className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all text-sm font-semibold ${
              activeTab === 'create' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}>
              <Plus className="w-4 h-4" />
              {editingChatbot ? 'Edit Chatbot' : 'Create New'}
            </button>
          </div>
        </div>

        {/* Chatbot List */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Total Chatbots</p>
                <p className="text-3xl font-bold text-slate-900">{chatbots.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Active</p>
                <p className="text-3xl font-bold text-emerald-600">{chatbots.filter(b => b.status === 'active').length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Total Conversations</p>
                <p className="text-3xl font-bold text-slate-900">{chatbots.reduce((sum, bot) => sum + (bot.conversations || 0), 0).toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide mb-2">Avg. Satisfaction</p>
                <p className="text-3xl font-bold text-indigo-600">{(chatbots.reduce((sum, bot) => sum + (bot.satisfaction || 0), 0) / chatbots.length || 0).toFixed(1)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {loading ? (
                <div className="col-span-2 text-center py-10">Loading chatbots...</div>
              ) : (
                chatbots.map((chatbot) => (
                  <div key={chatbot.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${chatbot.status === 'active' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                          <Bot className={`w-6 h-6 ${chatbot.status === 'active' ? 'text-emerald-600' : 'text-slate-500'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{chatbot.name}</h3>
                          <p className="text-xs text-slate-500">Last active: {chatbot.last_active ? new Date(chatbot.last_active).toLocaleString() : 'Never'}</p>
                          {chatbot.description && <p className="text-xs text-slate-500 mt-1">{chatbot.description}</p>}
                        </div>
                      </div>
                      {/* Toggle Switch */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={chatbot.status === 'active'}
                          onChange={() => toggleStatus(chatbot.id)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-700">
                          {chatbot.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-slate-100">
                      <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Conversations</p><p className="text-lg font-bold text-slate-900">{(chatbot.conversations || 0).toLocaleString()}</p></div>
                      <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Responses</p><p className="text-lg font-bold text-slate-900">{(chatbot.responses || 0).toLocaleString()}</p></div>
                      <div><p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Rating</p><p className="text-lg font-bold text-indigo-600">{chatbot.satisfaction || 0} ⭐</p></div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {chatbot.buttons?.length > 0 && <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">{chatbot.buttons.length} Buttons</span>}
                      {chatbot.faqs?.length > 0 && <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">{chatbot.faqs.length} FAQs</span>}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={() => openChatInterface(chatbot)} className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                        <MessageSquare className="w-4 h-4" /> Chat Now
                      </button>
                      <button onClick={() => handleDuplicateChatbot(chatbot)} className="p-2 hover:bg-slate-100 rounded-lg" title="Duplicate"><Copy className="w-4 h-4 text-slate-500" /></button>
                      <button onClick={() => handleEditChatbot(chatbot)} className="p-2 hover:bg-slate-100 rounded-lg" title="Edit"><Edit className="w-4 h-4 text-slate-500" /></button>
                      <button onClick={() => handleDeleteChatbot(chatbot.id)} className="p-2 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Create/Edit Form */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Chatbot Name *</label>
                    <input type="text" value={newChatbotName} onChange={(e) => setNewChatbotName(e.target.value)} placeholder="e.g., Customer Support Bot" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Description</label>
                    <textarea value={newChatbotDesc} onChange={(e) => setNewChatbotDesc(e.target.value)} placeholder="Brief description..." rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Status</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={chatbotStatus === 'active'}
                        onChange={() => setChatbotStatus(chatbotStatus === 'active' ? 'inactive' : 'active')}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      <span className="ml-3 text-sm font-medium text-slate-700">
                        {chatbotStatus === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-4"><MessageSquare className="w-5 h-5 text-indigo-600" /><h3 className="text-sm font-bold text-slate-900">Welcome Message</h3></div>
                <textarea value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} rows={3} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-4"><HelpCircle className="w-5 h-5 text-emerald-600" /><h3 className="text-sm font-bold text-slate-900">FAQ Responses</h3><span className="ml-auto text-xs text-slate-500">{faqs.length} FAQs</span></div>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg relative group">
                      <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3 text-red-600" /></button>
                      <p className="text-sm font-medium text-slate-800 mb-1">Q: {faq.question}</p>
                      <p className="text-sm text-slate-600">A: {faq.answer}</p>
                    </div>
                  ))}
                  {showAddFaq ? (
                    <div className="space-y-2 p-3 bg-indigo-50 rounded-lg">
                      <input type="text" value={newFaqQuestion} onChange={(e) => setNewFaqQuestion(e.target.value)} placeholder="Enter question" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                      <input type="text" value={newFaqAnswer} onChange={(e) => setNewFaqAnswer(e.target.value)} placeholder="Enter answer" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                      <div className="flex gap-2"><button onClick={addFaq} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">Add</button><button onClick={() => setShowAddFaq(false)} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm">Cancel</button></div>
                    </div>
                  ) : (
                    <button onClick={() => setShowAddFaq(true)} className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 text-sm text-slate-600">+ Add FAQ</button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-4"><MousePointerClick className="w-5 h-5 text-amber-600" /><h3 className="text-sm font-bold text-slate-900">Quick Action Buttons</h3><span className="ml-auto text-xs text-slate-500">{buttons.length} Buttons</span></div>
                <div className="space-y-2">
                  {buttons.map((button, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg group">
                      <span className="flex-1 text-sm text-slate-700">{button.label} → {button.action}</span>
                      <button onClick={() => removeButton(index)} className="p-1 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3 text-red-600" /></button>
                    </div>
                  ))}
                  {showAddButton ? (
                    <div className="space-y-2 p-3 bg-indigo-50 rounded-lg">
                      <input type="text" value={newButtonLabel} onChange={(e) => setNewButtonLabel(e.target.value)} placeholder="Button label" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                      <input type="text" value={newButtonAction} onChange={(e) => setNewButtonAction(e.target.value)} placeholder="Action (e.g., /pricing)" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                      <div className="flex gap-2"><button onClick={addButton} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">Add</button><button onClick={() => setShowAddButton(false)} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-sm">Cancel</button></div>
                    </div>
                  ) : (
                    <button onClick={() => setShowAddButton(true)} className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 text-sm text-slate-600">+ Add Button</button>
                  )}
                </div>
              </div>

              <button onClick={handleSaveChatbot} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                <Save className="w-4 h-4" /> {editingChatbot ? 'Update Chatbot' : 'Save & Activate Chatbot'}
              </button>
            </div>

            {/* Live Preview */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-6">
                <div className="flex items-center gap-2 mb-4"><Bot className="w-5 h-5 text-indigo-600" /><h3 className="text-sm font-bold text-slate-900">Live Preview</h3><span className="text-xs text-slate-500">(Updates in real-time)</span></div>
                <div className="bg-slate-50 rounded-xl p-4 min-h-[500px] flex flex-col">
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                      <div className="bg-white rounded-lg px-4 py-2 max-w-[80%] shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-800">{welcomeMessage || "Welcome message will appear here"}</p>
                      </div>
                    </div>
                    {buttons.length > 0 && (
                      <div className="pl-10">
                        <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
                        <div className="flex gap-2 flex-wrap">
                          {buttons.map((btn, idx) => (
                            <button key={idx} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm">{btn.label}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {faqs.length > 0 && (
                      <div className="pl-10">
                        <p className="text-xs text-slate-500 mb-2">Frequently Asked Questions:</p>
                        <div className="flex gap-2 flex-wrap">
                          {faqs.map((faq, idx) => (
                            <button key={idx} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm">{faq.question}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // // Mock AI generation – replace with real API call later
// // const generateTemplateFromPrompt = async (prompt) => {
// //   // Simulate API delay
// //   await new Promise(resolve => setTimeout(resolve, 1500));
// //   // Return a mock template (botanical style but with AI‑like content)
// //   return {
// //     layout: "botanical",
// //     name: `AI: ${prompt.slice(0, 30)}`,
// //     font: "'Inter', sans-serif",
// //     logo: "✨ AI CRAFT",
// //     logoColor: "#2d5a27",
// //     bgColor: "#f5f0e8",
// //     accentColor: "#2d5a27",
// //     buttonColor: "#2d5a27",
// //     buttonTextColor: "#ffffff",
// //     buttonText: "Discover Now",
// //     headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80",
// //     tag: "AI Generated",
// //     title: prompt,
// //     subtitle: "Inspired by your idea",
// //     body: `We generated this template based on your prompt: "${prompt}". You can now edit every detail – text, colours, images – to make it perfect.`,
// //     footerText: "© 2026 AI Studio · Powered by Machine Learning",
// //   };
// // };

// // export default function AITemplateGenerator() {
// //   const [prompt, setPrompt] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleGenerate = async () => {
// //     if (!prompt.trim()) {
// //       alert('Please describe what kind of email template you need.');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const generated = await generateTemplateFromPrompt(prompt);
// //       // Navigate to the email builder with the generated data as state
// //       navigate('/email-builder', { state: { generatedTemplate: generated } });
// //     } catch (error) {
// //       alert('Generation failed. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-6">
// //       <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
// //         <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">🤖 AI Template Generator</h1>
// //         <p className="text-center text-gray-500 mb-8">
// //           Describe the email template you need, and our AI will create a custom design.
// //         </p>
// //         <textarea
// //           rows={5}
// //           className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
// //           placeholder="e.g., A promotional email for a summer sale with bright colours, a discount code, and a call-to-action button..."
// //           value={prompt}
// //           onChange={(e) => setPrompt(e.target.value)}
// //           disabled={loading}
// //         />
// //         <button
// //           onClick={handleGenerate}
// //           disabled={loading}
// //           className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
// //         >
// //           {loading ? (
// //             <>
// //               <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //               Generating...
// //             </>
// //           ) : (
// //             '✨ Generate Template'
// //           )}
// //         </button>
// //         <p className="text-xs text-gray-400 text-center mt-6">
// //           Your template will open in the email builder where you can edit everything.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // ─── Mock AI generation – replace with real API later ──────────────────────
// const generateTemplateFromPrompt = async (prompt) => {
//   await new Promise(resolve => setTimeout(resolve, 1500));
//   return {
//     layout: "botanical",
//     name: `AI: ${prompt.slice(0, 30)}`,
//     font: "'Inter', sans-serif",
//     logo: "✨ AI CRAFT",
//     logoColor: "#2d5a27",
//     bgColor: "#f5f0e8",
//     accentColor: "#2d5a27",
//     buttonColor: "#2d5a27",
//     buttonTextColor: "#ffffff",
//     buttonText: "Discover Now",
//     headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80",
//     tag: "AI Generated",
//     title: prompt,
//     subtitle: "Inspired by your idea",
//     body: `We generated this template based on your prompt: "${prompt}". You can now edit every detail – text, colours, images – to make it perfect.`,
//     footerText: "© 2026 AI Studio · Powered by Machine Learning",
//   };
// };

// // ─── Simple preview renderer (reuses the same visual style as email builder) ──
// const PreviewTemplate = ({ template }) => {
//   const t = template;
//   if (!t) return null;

//   return (
//     <div className="mt-8 border-t pt-6">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Generated Preview</h3>
//       <div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}>
//         <div className="flex items-center justify-between px-6 py-4">
//           <span className="text-2xl font-black tracking-tight" style={{ color: t.logoColor }}>{t.logo}</span>
//           <div className="flex gap-1.5 text-lg">●○●○</div>
//         </div>
//         <div className="px-4">
//           <img src={t.headerImg} alt="header" className="w-full rounded-xl" style={{ height: 280, objectFit: "cover" }} />
//         </div>
//         <div className="px-6 py-5">
//           <div className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }}>{t.tag}</div>
//           <h2 className="text-2xl font-extrabold leading-tight mt-1" style={{ color: "#1a1a1a", fontFamily: t.font }}>{t.title}</h2>
//           <div className="text-sm font-semibold mt-1" style={{ color: t.accentColor }}>{t.subtitle}</div>
//           <div className="text-sm leading-relaxed text-gray-700 mt-3" style={{ fontFamily: t.font }}>{t.body}</div>
//           <div className="mt-6">
//             <button className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}>
//               {t.buttonText}
//             </button>
//           </div>
//         </div>
//         <div className="px-6 py-4 text-center text-xs text-gray-400 border-t border-gray-200">
//           {t.footerText}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function AITemplateGenerator() {
//   const [prompt, setPrompt] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [generatedTemplate, setGeneratedTemplate] = useState(null);
//   const navigate = useNavigate();

//   const handleGenerate = async () => {
//     if (!prompt.trim()) {
//       alert('Please describe what kind of email template you need.');
//       return;
//     }
//     setLoading(true);
//     try {
//       const generated = await generateTemplateFromPrompt(prompt);
//       setGeneratedTemplate(generated);
//     } catch (error) {
//       alert('Generation failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUseTemplate = () => {
//     if (generatedTemplate) {
//       navigate('/email-builder', { state: { generatedTemplate } });
//     }
//   };

//   const handleBack = () => {
//     navigate(-1); // Go back to previous page
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
//       {/* Header with back arrow */}
//       <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-3 shadow-sm">
//         <button
//           onClick={handleBack}
//           className="group flex items-center justify-center w-10 h-10 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
//           aria-label="Go back"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2.5}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <span className="text-xl font-black text-purple-700">🤖 AI Template Studio</span>
//       </div>

//       <div className="max-w-4xl mx-auto p-6">
//         {/* Input card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
//           <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">AI Template Generator</h1>
//           <p className="text-center text-gray-500 mb-8">
//             Describe the email template you need, and our AI will create a custom design.
//           </p>
//           <textarea
//             rows={5}
//             className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
//             placeholder="e.g., A promotional email for a summer sale with bright colours, a discount code, and a call-to-action button..."
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             disabled={loading}
//           />
//           <button
//             onClick={handleGenerate}
//             disabled={loading}
//             className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 Generating...
//               </>
//             ) : (
//               '✨ Generate Template'
//             )}
//           </button>
//         </div>

//         {/* Generated preview (if any) */}
//         {generatedTemplate && (
//           <div className="bg-white rounded-2xl shadow-xl p-6">
//             <PreviewTemplate template={generatedTemplate} />
//             <div className="flex justify-center mt-6">
//               <button
//                 onClick={handleUseTemplate}
//                 className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
//               >
//                 Use This Template →
//               </button>
//             </div>
//             <p className="text-xs text-gray-400 text-center mt-4">
//               Clicking "Use This Template" will open the full editor where you can further customise and save.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAITemplate } from "../services/api/aiTemplateApi";

// ─── Mock AI generation – replace with real API later ──────────────────────
// const generateTemplateFromPrompt = async (prompt) => {
//   await new Promise(resolve => setTimeout(resolve, 1500));
//   return {
//     layout: "botanical",
//     name: `AI: ${prompt.slice(0, 30)}`,
//     font: "'Inter', sans-serif",
//     logo: "✨ AI CRAFT",
//     logoColor: "#2d5a27",
//     bgColor: "#f5f0e8",
//     accentColor: "#2d5a27",
//     buttonColor: "#2d5a27",
//     buttonTextColor: "#ffffff",
//     buttonText: "Discover Now",
//     headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80",
//     tag: "AI Generated",
//     title: prompt,
//     subtitle: "Inspired by your idea",
//     body: `We generated this template based on your prompt: "${prompt}". You can now edit every detail – text, colours, images – to make it perfect.`,
//     footerText: "© 2026 AI Studio · Powered by Machine Learning",
//   };
// };

// ─── Simple preview renderer (reuses the same visual style as email builder) ──
const PreviewTemplate = ({ template }) => {
  const t = template;
  if (!t) return null;

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Generated Preview</h3>
      <div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}>
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-2xl font-black tracking-tight" style={{ color: t.logoColor }}>{t.logo}</span>
          <div className="flex gap-1.5 text-lg">●○●○</div>
        </div>
        <div className="px-4">
          <img src={t.headerImg} alt="header" className="w-full rounded-xl" style={{ height: 280, objectFit: "cover" }} />
        </div>
        <div className="px-6 py-5">
          <div className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }}>{t.tag}</div>
          <h2 className="text-2xl font-extrabold leading-tight mt-1" style={{ color: "#1a1a1a", fontFamily: t.font }}>{t.title}</h2>
          <div className="text-sm font-semibold mt-1" style={{ color: t.accentColor }}>{t.subtitle}</div>
          <div className="text-sm leading-relaxed text-gray-700 mt-3" style={{ fontFamily: t.font }}>{t.body}</div>
          <div className="mt-6">
            <button className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}>
              {t.buttonText}
            </button>
          </div>
        </div>
        <div className="px-6 py-4 text-center text-xs text-gray-400 border-t border-gray-200">
          {t.footerText}
        </div>
      </div>
    </div>
  );
};

export default function AITemplateGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const navigate = useNavigate();

 const handleGenerate = async () => {
  if (!prompt.trim()) {
    alert("Please describe what kind of email template you need.");
    return;
  }

  setLoading(true);

  try {
    const generated = await generateAITemplate(prompt);
    setGeneratedTemplate(generated);
  } catch (error) {
    console.error(error);
    alert("Generation failed.");
  } finally {
    setLoading(false);
  }
};

  const handleUseTemplate = () => {
  if (!generatedTemplate) return;

  localStorage.setItem(
    "generatedTemplate",
    JSON.stringify(generatedTemplate)
  );

  navigate("/email-builder", {
    state: { generatedTemplate },
  });
};

  // ✅ Back arrow navigation – goes to template library page
  const handleBack = () => {
    navigate('/templates'); // adjust route if your template library is different
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header with back arrow */}
      <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-3 shadow-sm">
        <button
          onClick={handleBack}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
          aria-label="Go back to templates"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-xl font-black text-purple-700">🤖 AI Template Studio</span>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Input card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">AI Template Generator</h1>
          <p className="text-center text-gray-500 mb-8">
            Describe the email template you need, and our AI will create a custom design.
          </p>
          <textarea
            rows={5}
            className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="e.g., A promotional email for a summer sale with bright colours, a discount code, and a call-to-action button..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              '✨ Generate Template'
            )}
          </button>
        </div>

        {/* Generated preview (if any) */}
        {generatedTemplate && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <PreviewTemplate template={generatedTemplate} />
            <div className="flex justify-center mt-6">
              <button
                onClick={handleUseTemplate}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Use This Template →
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              Clicking "Use This Template" will open the full editor where you can further customise and save.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
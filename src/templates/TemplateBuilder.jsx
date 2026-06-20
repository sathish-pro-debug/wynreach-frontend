// // // // // import { useState, useRef } from "react";

// // // // // // ── Google Fonts available for selection ──────────────────────────────────────
// // // // // const FONTS = [
// // // // //   { label: "Inter", value: "'Inter', sans-serif" },
// // // // //   { label: "Playfair Display", value: "'Playfair Display', serif" },
// // // // //   { label: "Poppins", value: "'Poppins', sans-serif" },
// // // // //   { label: "Merriweather", value: "'Merriweather', serif" },
// // // // //   { label: "Montserrat", value: "'Montserrat', sans-serif" },
// // // // //   { label: "Lato", value: "'Lato', sans-serif" },
// // // // //   { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
// // // // // ];

// // // // // // ── Default data for Template A (Product / Newsletter) ────────────────────────
// // // // // const defaultA = {
// // // // //   logo: "🌿 URBAN LEAF",
// // // // //   logoColor: "#2d5a27",
// // // // //   bgColor: "#fef9f0",
// // // // //   accentColor: "#2d5a27",
// // // // //   buttonColor: "#2d5a27",
// // // // //   buttonText: "Shop Now →",
// // // // //   headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80",
// // // // //   tag: "New!",
// // // // //   title: "Spring Collection is Here",
// // // // //   price: "From 20€",
// // // // //   body: "Explore our hand-picked seasonal plants that bring life, colour and calm into every corner of your home.",
// // // // //   footerText: "© 2026 Urban Leaf · Unsubscribe",
// // // // // };

// // // // // // ── Default data for Template B (Promo / Offer) ───────────────────────────────
// // // // // const defaultB = {
// // // // //   logo: "⚡ FLASHBOLT",
// // // // //   logoColor: "#fff",
// // // // //   bgColor: "#0a0a14",
// // // // //   accentColor: "#f5a623",
// // // // //   buttonColor: "#f5a623",
// // // // //   buttonText: "Grab the Deal →",
// // // // //   headerImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
// // // // //   tag: "Limited Offer",
// // // // //   title: "50% Off Everything Today",
// // // // //   price: "Ends midnight",
// // // // //   body: "This is your one chance to stock up on our best-selling tech accessories at half the usual price. No code needed.",
// // // // //   footerText: "© 2026 Flashbolt · Manage preferences",
// // // // // };

// // // // // // ── Default data for Template C (Modern Corporate) ────────────────────────────
// // // // // const defaultC = {
// // // // //   logo: "🔷 NEXUS",
// // // // //   logoColor: "#1e3a8a",
// // // // //   bgColor: "#ffffff",
// // // // //   accentColor: "#3b82f6",
// // // // //   buttonColor: "#3b82f6",
// // // // //   buttonText: "Learn More →",
// // // // //   headerImg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
// // // // //   tag: "Insight",
// // // // //   title: "Scaling Your Business in 2026",
// // // // //   price: "Free Guide",
// // // // //   body: "Discover actionable strategies from industry leaders. Download our latest report and turn insights into growth.",
// // // // //   footerText: "© 2026 Nexus · All rights reserved",
// // // // // };

// // // // // // ── Editable field component (with better styling) ────────────────────────────
// // // // // function EditableText({ value, onChange, className, style, multiline }) {
// // // // //   const [editing, setEditing] = useState(false);
// // // // //   if (editing) {
// // // // //     return multiline ? (
// // // // //       <textarea
// // // // //         autoFocus
// // // // //         className={`${className} border-2 border-indigo-400 rounded-xl outline-none w-full resize-none bg-white/90 backdrop-blur-sm p-2 shadow-inner`}
// // // // //         style={{ ...style, minHeight: 80 }}
// // // // //         value={value}
// // // // //         onChange={(e) => onChange(e.target.value)}
// // // // //         onBlur={() => setEditing(false)}
// // // // //       />
// // // // //     ) : (
// // // // //       <input
// // // // //         autoFocus
// // // // //         className={`${className} border-2 border-indigo-400 rounded-lg outline-none w-full px-2 py-1 bg-white/90 backdrop-blur-sm`}
// // // // //         style={style}
// // // // //         value={value}
// // // // //         onChange={(e) => onChange(e.target.value)}
// // // // //         onBlur={() => setEditing(false)}
// // // // //       />
// // // // //     );
// // // // //   }
// // // // //   return (
// // // // //     <span
// // // // //       className={`${className} cursor-pointer transition-all duration-150 hover:scale-[1.02] hover:shadow-sm inline-block rounded-md px-1 py-0.5 hover:bg-white/40`}
// // // // //       style={style}
// // // // //       title="Click to edit"
// // // // //       onClick={() => setEditing(true)}
// // // // //     >
// // // // //       {value}
// // // // //     </span>
// // // // //   );
// // // // // }

// // // // // // ── Image-replaceable block (with improved overlay) ───────────────────────────
// // // // // function EditableImage({ src, onSrcChange, className, style }) {
// // // // //   const fileRef = useRef();
// // // // //   const [urlMode, setUrlMode] = useState(false);
// // // // //   const [urlInput, setUrlInput] = useState("");

// // // // //   function handleFile(e) {
// // // // //     const file = e.target.files[0];
// // // // //     if (!file) return;
// // // // //     const reader = new FileReader();
// // // // //     reader.onload = (ev) => onSrcChange(ev.target.result);
// // // // //     reader.readAsDataURL(file);
// // // // //   }

// // // // //   return (
// // // // //     <div className="relative group rounded-xl overflow-hidden shadow-md">
// // // // //       <img src={src} alt="" className={`${className} transition-transform duration-300 group-hover:scale-105`} style={style} />
// // // // //       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
// // // // //         <button
// // // // //           className="text-xs bg-white text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 shadow-lg transform transition hover:scale-105"
// // // // //           onClick={() => fileRef.current.click()}
// // // // //         >
// // // // //           📁 Upload
// // // // //         </button>
// // // // //         <button
// // // // //           className="text-xs bg-white/90 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-white shadow-lg transform transition hover:scale-105"
// // // // //           onClick={() => setUrlMode(true)}
// // // // //         >
// // // // //           🔗 Use URL
// // // // //         </button>
// // // // //       </div>
// // // // //       <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
// // // // //       {urlMode && (
// // // // //         <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 rounded-xl p-5 z-10 backdrop-blur-md">
// // // // //           <input
// // // // //             autoFocus
// // // // //             className="w-full text-sm px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // // // //             placeholder="Paste image URL…"
// // // // //             value={urlInput}
// // // // //             onChange={(e) => setUrlInput(e.target.value)}
// // // // //           />
// // // // //           <div className="flex gap-3">
// // // // //             <button
// // // // //               className="text-sm bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
// // // // //               onClick={() => { onSrcChange(urlInput); setUrlMode(false); setUrlInput(""); }}
// // // // //             >Apply</button>
// // // // //             <button
// // // // //               className="text-sm bg-gray-500 text-white px-5 py-2 rounded-xl hover:bg-gray-600 transition"
// // // // //               onClick={() => setUrlMode(false)}
// // // // //             >Cancel</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ── Enhanced Control Panel with gradient and better layout ────────────────────
// // // // // function ControlPanel({ data, setData, font, setFont }) {
// // // // //   return (
// // // // //     <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-6 shadow-xl border border-white/50 sticky top-4 z-10">
// // // // //       <div className="flex flex-wrap items-center gap-5">
// // // // //         <div className="flex flex-col gap-1">
// // // // //           <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Font</label>
// // // // //           <select
// // // // //             className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
// // // // //             value={font}
// // // // //             onChange={(e) => setFont(e.target.value)}
// // // // //           >
// // // // //             {FONTS.map((f) => (
// // // // //               <option key={f.value} value={f.value}>{f.label}</option>
// // // // //             ))}
// // // // //           </select>
// // // // //         </div>

// // // // //         <div className="flex flex-col gap-1">
// // // // //           <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Background</label>
// // // // //           <input type="color" value={data.bgColor} onChange={(e) => setData({ ...data, bgColor: e.target.value })}
// // // // //             className="w-10 h-10 cursor-pointer rounded-xl border-2 border-gray-200 shadow-sm" />
// // // // //         </div>

// // // // //         <div className="flex flex-col gap-1">
// // // // //           <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Accent</label>
// // // // //           <input type="color" value={data.accentColor} onChange={(e) => setData({ ...data, accentColor: e.target.value })}
// // // // //             className="w-10 h-10 cursor-pointer rounded-xl border-2 border-gray-200 shadow-sm" />
// // // // //         </div>

// // // // //         <div className="flex flex-col gap-1">
// // // // //           <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Button</label>
// // // // //           <input type="color" value={data.buttonColor} onChange={(e) => setData({ ...data, buttonColor: e.target.value })}
// // // // //             className="w-10 h-10 cursor-pointer rounded-xl border-2 border-gray-200 shadow-sm" />
// // // // //         </div>

// // // // //         <div className="flex flex-col gap-1">
// // // // //           <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Logo color</label>
// // // // //           <input type="color" value={data.logoColor} onChange={(e) => setData({ ...data, logoColor: e.target.value })}
// // // // //             className="w-10 h-10 cursor-pointer rounded-xl border-2 border-gray-200 shadow-sm" />
// // // // //         </div>

// // // // //         <div className="ml-auto text-xs text-gray-400 italic flex items-center gap-1">
// // // // //           <span className="text-indigo-400">✨</span> Click any text to edit
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ── Template A: Clean botanical newsletter (enhanced visuals) ─────────────────
// // // // // function TemplateA({ data, setData, font }) {
// // // // //   const upd = (key) => (val) => setData({ ...data, [key]: val });

// // // // //   return (
// // // // //     <div
// // // // //       className="w-full max-w-[560px] mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl"
// // // // //       style={{ fontFamily: font, backgroundColor: data.bgColor }}
// // // // //     >
// // // // //       <div className="relative overflow-hidden">
// // // // //         <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full blur-2xl -mr-16 -mt-16"></div>
// // // // //         <div className="flex items-center justify-between px-6 py-5">
// // // // //           <EditableText
// // // // //             value={data.logo}
// // // // //             onChange={upd("logo")}
// // // // //             className="text-2xl font-black tracking-tight"
// // // // //             style={{ color: data.logoColor, fontFamily: font }}
// // // // //           />
// // // // //           <div className="flex gap-3 text-xl opacity-60">
// // // // //             <span>🌿</span> <span>🌸</span>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="px-4">
// // // // //         <EditableImage
// // // // //           src={data.headerImg}
// // // // //           onSrcChange={upd("headerImg")}
// // // // //           className="w-full rounded-2xl object-cover shadow-md"
// // // // //           style={{ height: 280 }}
// // // // //         />
// // // // //       </div>

// // // // //       <div className="px-6 py-6">
// // // // //         <EditableText
// // // // //           value={data.tag}
// // // // //           onChange={upd("tag")}
// // // // //           className="text-xs font-bold uppercase tracking-widest"
// // // // //           style={{ color: data.accentColor }}
// // // // //         />
// // // // //         <EditableText
// // // // //           value={data.title}
// // // // //           onChange={upd("title")}
// // // // //           className="text-2xl font-extrabold leading-tight block mt-2"
// // // // //           style={{ color: "#1e293b", fontFamily: font }}
// // // // //         />
// // // // //         <EditableText
// // // // //           value={data.price}
// // // // //           onChange={upd("price")}
// // // // //           className="text-sm font-semibold block mt-1"
// // // // //           style={{ color: data.accentColor }}
// // // // //         />
// // // // //         <EditableText
// // // // //           value={data.body}
// // // // //           onChange={upd("body")}
// // // // //           multiline
// // // // //           className="text-sm leading-relaxed text-gray-600 block mt-4"
// // // // //           style={{ fontFamily: font }}
// // // // //         />

// // // // //         <div className="mt-7">
// // // // //           <button
// // // // //             className="inline-block px-7 py-3 rounded-full text-white text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
// // // // //             style={{ backgroundColor: data.buttonColor }}
// // // // //           >
// // // // //             <EditableText
// // // // //               value={data.buttonText}
// // // // //               onChange={upd("buttonText")}
// // // // //               className="text-white text-sm font-bold"
// // // // //             />
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="px-6 py-4 text-xs text-center border-t border-white/30 backdrop-blur-sm" style={{ borderColor: `${data.accentColor}20`, color: "#94a3b8" }}>
// // // // //         <EditableText value={data.footerText} onChange={upd("footerText")} />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ── Template B: Bold dark promo (enhanced) ────────────────────────────────────
// // // // // function TemplateB({ data, setData, font }) {
// // // // //   const upd = (key) => (val) => setData({ ...data, [key]: val });

// // // // //   return (
// // // // //     <div
// // // // //       className="w-full max-w-[560px] mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl"
// // // // //       style={{ fontFamily: font, backgroundColor: data.bgColor }}
// // // // //     >
// // // // //       <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${data.accentColor}, ${data.accentColor}88)` }} />

// // // // //       <div className="flex items-center justify-between px-6 py-5">
// // // // //         <EditableText
// // // // //           value={data.logo}
// // // // //           onChange={upd("logo")}
// // // // //           className="text-xl font-black tracking-widest uppercase"
// // // // //           style={{ color: data.logoColor, fontFamily: font }}
// // // // //         />
// // // // //         <span
// // // // //           className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md"
// // // // //           style={{ backgroundColor: `${data.accentColor}22`, color: data.accentColor }}
// // // // //         >
// // // // //           <EditableText value={data.tag} onChange={upd("tag")} className="text-[11px] font-bold" />
// // // // //         </span>
// // // // //       </div>

// // // // //       <div className="px-4">
// // // // //         <EditableImage
// // // // //           src={data.headerImg}
// // // // //           onSrcChange={upd("headerImg")}
// // // // //           className="w-full rounded-2xl object-cover shadow-xl"
// // // // //           style={{ height: 240 }}
// // // // //         />
// // // // //       </div>

// // // // //       <div className="px-6 py-6">
// // // // //         <EditableText
// // // // //           value={data.title}
// // // // //           onChange={upd("title")}
// // // // //           className="text-3xl font-extrabold leading-tight block"
// // // // //           style={{ color: "#ffffff", fontFamily: font }}
// // // // //         />
// // // // //         <EditableText
// // // // //           value={data.price}
// // // // //           onChange={upd("price")}
// // // // //           className="text-sm font-semibold block mt-2"
// // // // //           style={{ color: data.accentColor }}
// // // // //         />
// // // // //         <EditableText
// // // // //           value={data.body}
// // // // //           onChange={upd("body")}
// // // // //           multiline
// // // // //           className="text-sm leading-relaxed block mt-4"
// // // // //           style={{ color: "#bbb", fontFamily: font }}
// // // // //         />

// // // // //         <div className="mt-7 flex gap-4 items-center">
// // // // //           <button
// // // // //             className="px-7 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-xl"
// // // // //             style={{ backgroundColor: data.buttonColor, color: data.bgColor }}
// // // // //           >
// // // // //             <EditableText
// // // // //               value={data.buttonText}
// // // // //               onChange={upd("buttonText")}
// // // // //               className="text-sm font-bold"
// // // // //               style={{ color: data.bgColor }}
// // // // //             />
// // // // //           </button>
// // // // //           <span className="text-xs text-gray-500">No code needed</span>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="mx-6 border-t" style={{ borderColor: `${data.accentColor}30` }} />

// // // // //       <div className="px-6 py-4 text-center text-xs" style={{ color: "#555" }}>
// // // // //         <EditableText value={data.footerText} onChange={upd("footerText")} />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ── Template C: Modern Corporate (enhanced with cards) ────────────────────────
// // // // // function TemplateC({ data, setData, font }) {
// // // // //   const upd = (key) => (val) => setData({ ...data, [key]: val });

// // // // //   return (
// // // // //     <div
// // // // //       className="w-full max-w-[560px] mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl"
// // // // //       style={{ fontFamily: font, backgroundColor: data.bgColor }}
// // // // //     >
// // // // //       <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 flex items-center justify-between border-b border-indigo-100">
// // // // //         <EditableText
// // // // //           value={data.logo}
// // // // //           onChange={upd("logo")}
// // // // //           className="text-xl font-black tracking-tight"
// // // // //           style={{ color: data.logoColor, fontFamily: font }}
// // // // //         />
// // // // //         <div className="flex gap-3 text-gray-500">
// // // // //           <span className="hover:text-indigo-600 cursor-pointer">🔗</span>
// // // // //           <span className="hover:text-indigo-600 cursor-pointer">🐦</span>
// // // // //           <span className="hover:text-indigo-600 cursor-pointer">📘</span>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="px-4 pt-5">
// // // // //         <EditableImage
// // // // //           src={data.headerImg}
// // // // //           onSrcChange={upd("headerImg")}
// // // // //           className="w-full rounded-2xl object-cover shadow-lg"
// // // // //           style={{ height: 220 }}
// // // // //         />
// // // // //       </div>

// // // // //       <div className="px-6 py-6">
// // // // //         <div className="mb-3">
// // // // //           <EditableText
// // // // //             value={data.tag}
// // // // //             onChange={upd("tag")}
// // // // //             className="text-xs font-semibold uppercase tracking-wider"
// // // // //             style={{ color: data.accentColor }}
// // // // //           />
// // // // //           <EditableText
// // // // //             value={data.title}
// // // // //             onChange={upd("title")}
// // // // //             className="text-2xl font-bold leading-tight block mt-1"
// // // // //             style={{ color: "#1e293b", fontFamily: font }}
// // // // //           />
// // // // //         </div>

// // // // //         <div className="grid grid-cols-2 gap-4 my-6">
// // // // //           <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition">
// // // // //             <div className="text-3xl mb-2">📊</div>
// // // // //             <div className="text-xs font-bold text-gray-700">Data‑driven</div>
// // // // //             <div className="text-[11px] text-gray-500">Real insights</div>
// // // // //           </div>
// // // // //           <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition">
// // // // //             <div className="text-3xl mb-2">⚡</div>
// // // // //             <div className="text-xs font-bold text-gray-700">Fast results</div>
// // // // //             <div className="text-[11px] text-gray-500">Proven ROI</div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <EditableText
// // // // //           value={data.body}
// // // // //           onChange={upd("body")}
// // // // //           multiline
// // // // //           className="text-sm leading-relaxed text-gray-600 block mt-2"
// // // // //           style={{ fontFamily: font }}
// // // // //         />

// // // // //         <div className="mt-7 text-center">
// // // // //           <button
// // // // //             className="inline-block px-8 py-3 rounded-xl text-white text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
// // // // //             style={{ backgroundColor: data.buttonColor }}
// // // // //           >
// // // // //             <EditableText
// // // // //               value={data.buttonText}
// // // // //               onChange={upd("buttonText")}
// // // // //               className="text-white text-sm font-semibold"
// // // // //             />
// // // // //           </button>
// // // // //           <p className="text-[11px] text-gray-400 mt-3">
// // // // //             <EditableText value={data.price} onChange={upd("price")} />
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="bg-gray-50 px-6 py-4 text-xs text-center border-t border-gray-100 text-gray-500">
// // // // //         <EditableText value={data.footerText} onChange={upd("footerText")} />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ── Main App with Attractive Sidebar and Gradient Background ──────────────────
// // // // // export default function EmailBuilder() {
// // // // //   const [activeTab, setActiveTab] = useState("A");
// // // // //   const [dataA, setDataA] = useState(defaultA);
// // // // //   const [dataB, setDataB] = useState(defaultB);
// // // // //   const [dataC, setDataC] = useState(defaultC);
// // // // //   const [fontA, setFontA] = useState(FONTS[0].value);
// // // // //   const [fontB, setFontB] = useState(FONTS[1].value);
// // // // //   const [fontC, setFontC] = useState(FONTS[2].value);

// // // // //   const fontLink = `https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Playfair+Display:wght@700;800;900&family=Poppins:wght@400;500;600;700;800&family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600;700;800&family=Lato:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap`;

// // // // //   return (
// // // // //     <>
// // // // //       <link rel="stylesheet" href={fontLink} />
// // // // //       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
// // // // //         {/* Top bar with glassmorphism */}
// // // // //         <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-white/40 shadow-sm px-6 py-4 flex items-center justify-between">
// // // // //           <div className="flex items-center gap-3">
// // // // //             <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg">
// // // // //               <span className="text-white text-xl">✉</span>
// // // // //             </div>
// // // // //             <div>
// // // // //               <h1 className="text-xl font-black bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">MailCraft Studio</h1>
// // // // //               <p className="text-[10px] text-gray-500">Drag‑free email builder</p>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="flex gap-3">
// // // // //             <button className="text-sm border border-gray-300 bg-white rounded-xl px-5 py-2 hover:bg-gray-50 transition shadow-sm font-medium flex items-center gap-1">
// // // // //               <span>👁️</span> Preview
// // // // //             </button>
// // // // //             <button className="text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl px-5 py-2 hover:shadow-lg transition shadow-md font-medium flex items-center gap-1">
// // // // //               <span>💾</span> Save & Export
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-73px)]">
// // // // //           {/* Left sidebar: modern card-style template picker */}
// // // // //           <div className="w-full lg:w-64 bg-white/60 backdrop-blur-sm border-r border-white/40 p-5 flex flex-row lg:flex-col gap-4">
// // // // //             <div className="mb-2 hidden lg:block">
// // // // //               <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Choose template</p>
// // // // //             </div>

// // // // //             {/* Template A */}
// // // // //             <button
// // // // //               onClick={() => setActiveTab("A")}
// // // // //               className={`group flex-1 lg:flex-none rounded-2xl p-4 text-left transition-all duration-200 ${
// // // // //                 activeTab === "A" 
// // // // //                   ? "bg-white shadow-xl ring-2 ring-indigo-500 scale-[1.02]" 
// // // // //                   : "bg-white/50 hover:bg-white hover:shadow-md"
// // // // //               }`}
// // // // //             >
// // // // //               <div className="w-full h-20 rounded-xl mb-3 overflow-hidden bg-gradient-to-br from-amber-100 to-green-100 flex items-center justify-center text-3xl shadow-inner">
// // // // //                 🌿
// // // // //               </div>
// // // // //               <p className="text-sm font-bold text-gray-800">Botanical</p>
// // // // //               <p className="text-xs text-gray-500">Clean newsletter</p>
// // // // //             </button>

// // // // //             {/* Template B */}
// // // // //             <button
// // // // //               onClick={() => setActiveTab("B")}
// // // // //               className={`group flex-1 lg:flex-none rounded-2xl p-4 text-left transition-all duration-200 ${
// // // // //                 activeTab === "B" 
// // // // //                   ? "bg-white shadow-xl ring-2 ring-indigo-500 scale-[1.02]" 
// // // // //                   : "bg-white/50 hover:bg-white hover:shadow-md"
// // // // //               }`}
// // // // //             >
// // // // //               <div className="w-full h-20 rounded-xl mb-3 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-3xl shadow-inner">
// // // // //                 ⚡
// // // // //               </div>
// // // // //               <p className="text-sm font-bold text-gray-800">Dark Promo</p>
// // // // //               <p className="text-xs text-gray-500">Bold offer email</p>
// // // // //             </button>

// // // // //             {/* Template C */}
// // // // //             <button
// // // // //               onClick={() => setActiveTab("C")}
// // // // //               className={`group flex-1 lg:flex-none rounded-2xl p-4 text-left transition-all duration-200 ${
// // // // //                 activeTab === "C" 
// // // // //                   ? "bg-white shadow-xl ring-2 ring-indigo-500 scale-[1.02]" 
// // // // //                   : "bg-white/50 hover:bg-white hover:shadow-md"
// // // // //               }`}
// // // // //             >
// // // // //               <div className="w-full h-20 rounded-xl mb-3 overflow-hidden bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center text-3xl shadow-inner">
// // // // //                 🔷
// // // // //               </div>
// // // // //               <p className="text-sm font-bold text-gray-800">Corporate</p>
// // // // //               <p className="text-xs text-gray-500">Modern business</p>
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* Main editor area with smooth scroll */}
// // // // //           <div className="flex-1 p-6 overflow-auto">
// // // // //             {activeTab === "A" && (
// // // // //               <>
// // // // //                 <ControlPanel data={dataA} setData={setDataA} font={fontA} setFont={setFontA} />
// // // // //                 <div className="animate-fadeIn">
// // // // //                   <TemplateA data={dataA} setData={setDataA} font={fontA} />
// // // // //                 </div>
// // // // //               </>
// // // // //             )}
// // // // //             {activeTab === "B" && (
// // // // //               <>
// // // // //                 <ControlPanel data={dataB} setData={setDataB} font={fontB} setFont={setFontB} />
// // // // //                 <div className="animate-fadeIn">
// // // // //                   <TemplateB data={dataB} setData={setDataB} font={fontB} />
// // // // //                 </div>
// // // // //               </>
// // // // //             )}
// // // // //             {activeTab === "C" && (
// // // // //               <>
// // // // //                 <ControlPanel data={dataC} setData={setDataC} font={fontC} setFont={setFontC} />
// // // // //                 <div className="animate-fadeIn">
// // // // //                   <TemplateC data={dataC} setData={setDataC} font={fontC} />
// // // // //                 </div>
// // // // //               </>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Add a simple fade-in animation */}
// // // // //       <style>{`
// // // // //         @keyframes fadeIn {
// // // // //           from { opacity: 0; transform: translateY(10px); }
// // // // //           to { opacity: 1; transform: translateY(0); }
// // // // //         }
// // // // //         .animate-fadeIn {
// // // // //           animation: fadeIn 0.3s ease-out;
// // // // //         }
// // // // //       `}</style>
// // // // //     </>
// // // // //   );
// // // // // }



// // // // import { useState, useRef, useCallback } from "react";

// // // // // ─── Google Fonts ─────────────────────────────────────────────────────────────
// // // // const FONTS = [
// // // //   { label: "Inter", value: "'Inter', sans-serif" },
// // // //   { label: "Playfair Display", value: "'Playfair Display', serif" },
// // // //   { label: "Poppins", value: "'Poppins', sans-serif" },
// // // //   { label: "Merriweather", value: "'Merriweather', serif" },
// // // //   { label: "Montserrat", value: "'Montserrat', sans-serif" },
// // // //   { label: "Lato", value: "'Lato', sans-serif" },
// // // //   { label: "Roboto", value: "'Roboto', sans-serif" },
// // // //   { label: "Georgia", value: "Georgia, serif" },
// // // // ];

// // // // // ─── Base template presets ────────────────────────────────────────────────────
// // // // const PRESETS = {
// // // //   botanical: {
// // // //     layout: "botanical",
// // // //     name: "Botanical Newsletter",
// // // //     font: "'Inter', sans-serif",
// // // //     logo: "🌿 URBAN LEAF",
// // // //     logoColor: "#2d5a27",
// // // //     bgColor: "#f5f0e8",
// // // //     accentColor: "#2d5a27",
// // // //     buttonColor: "#2d5a27",
// // // //     buttonTextColor: "#ffffff",
// // // //     buttonText: "Shop Now",
// // // //     headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80",
// // // //     tag: "New!",
// // // //     title: "Spring Collection is Here",
// // // //     subtitle: "From 20€",
// // // //     body: "Explore our hand-picked seasonal plants that bring life, colour and calm into every corner of your home.",
// // // //     footerText: "© 2026 Urban Leaf · Unsubscribe",
// // // //   },
// // // //   darkpromo: {
// // // //     layout: "darkpromo",
// // // //     name: "Dark Promo",
// // // //     font: "'Poppins', sans-serif",
// // // //     logo: "⚡ FLASHBOLT",
// // // //     logoColor: "#ffffff",
// // // //     bgColor: "#0f0f1a",
// // // //     accentColor: "#f5a623",
// // // //     buttonColor: "#f5a623",
// // // //     buttonTextColor: "#0f0f1a",
// // // //     buttonText: "Grab the Deal",
// // // //     headerImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
// // // //     tag: "Limited Offer",
// // // //     title: "50% Off Everything Today",
// // // //     subtitle: "Ends midnight",
// // // //     body: "This is your one chance to stock up on our best-selling tech accessories at half the usual price. No code needed.",
// // // //     footerText: "© 2026 Flashbolt · Manage preferences",
// // // //   },
// // // //   minimal: {
// // // //     layout: "minimal",
// // // //     name: "Minimal Clean",
// // // //     font: "'Inter', sans-serif",
// // // //     logo: "BLOOM",
// // // //     logoColor: "#111",
// // // //     bgColor: "#ffffff",
// // // //     accentColor: "#e63946",
// // // //     buttonColor: "#111111",
// // // //     buttonTextColor: "#ffffff",
// // // //     buttonText: "Read More",
// // // //     headerImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
// // // //     tag: "Story",
// // // //     title: "This Week in Design",
// // // //     subtitle: "Issue #42 · June 2026",
// // // //     body: "A curated roundup of the best design work, tools, and ideas from across the web — delivered every Wednesday.",
// // // //     footerText: "© 2026 Bloom · Unsubscribe · View in browser",
// // // //   },
// // // //   event: {
// // // //     layout: "event",
// // // //     name: "Event Invite",
// // // //     font: "'Montserrat', sans-serif",
// // // //     logo: "🎤 DEVCONF",
// // // //     logoColor: "#ffffff",
// // // //     bgColor: "#1e1b4b",
// // // //     accentColor: "#a78bfa",
// // // //     buttonColor: "#a78bfa",
// // // //     buttonTextColor: "#1e1b4b",
// // // //     buttonText: "Reserve My Spot",
// // // //     headerImg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
// // // //     tag: "You're Invited",
// // // //     title: "DevConf 2026 — Join Us",
// // // //     subtitle: "July 18–20 · San Francisco",
// // // //     body: "Three days of talks, workshops, and networking with the brightest minds in software. Early bird tickets available now.",
// // // //     footerText: "© 2026 DevConf · Unsubscribe",
// // // //   },
// // // //   pets: {
// // // //     layout: "pets",
// // // //     name: "Pets Rescue",
// // // //     font: "'Inter', sans-serif",
// // // //     logo: "FriendswithPaw",
// // // //     logoColor: "#2d5a27",
// // // //     bgColor: "#fef9f0",
// // // //     accentColor: "#e67e22",
// // // //     buttonColor: "#2d5a27",
// // // //     buttonTextColor: "#ffffff",
// // // //     buttonText: "Donate Now",
// // // //     headerImg: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80",
// // // //     tag: "Thank you",
// // // //     title: "Your kindness saved 37 cats and dogs",
// // // //     subtitle: "This year, thanks to you",
// // // //     body: "Dear Jane,\n\nYour generosity and caring spirit have made a tremendous difference. Because of you, 37 cats and dogs found forever homes and received urgent medical care.\n\nWe couldn't have done it without you.",
// // // //     footerText: "FriendswithPaw\n2/260, 6th cross street, bharathidasan nagar, sharamugapuram\n600099 Chennai\ncontact@friendswithpaw.org\n\nPrivacy • Imprint • Unsubscribe",
// // // //     viewInBrowserText: "View in browser",
// // // //   },
// // // //   // ★ HALLOWEEN TEMPLATE (with editable image) ★
// // // //   halloween: {
// // // //     layout: "halloween",
// // // //     name: "Halloween Sale",
// // // //     font: "'Montserrat', sans-serif",
// // // //     bgColor: "#000000",
// // // //     accentColor: "#ff6600",
// // // //     viewInBrowserText: "View in browser",
// // // //     scaryText: "SCARY LOW PRICES",
// // // //     forOneNight: "FOR ONE NIGHT ONLY",
// // // //     year: "2021",
// // // //     date: "31st October",
// // // //     body: "Snatch your piece for the best price with our **24-hour limited Halloween megasale**!",
// // // //     reminderButton: "GET A REMINDER",
// // // //     dealsButton: "Check out all deals →",
// // // //     headerImg: "https://images.unsplash.com/photo-1533400908194-0b2ecc2674fb?w=600&q=80", // Halloween pumpkin
// // // //     products: [
// // // //       { name: "iPhone", price: "480€", delivery: "Incl. free delivery" },
// // // //       { name: "aPhone", price: "585€", delivery: "Incl. free delivery" },
// // // //       { name: "uPhone", price: "530€", delivery: "Incl. free delivery" },
// // // //     ],
// // // //     footerText: "Wynsync technologies\n2/260, 6th cross street, bharathidasan nagar, shanmugapuram\n600099 Chennai\nTel.: 123 4567 8900\nEmail: jane@yourcompanyname.com\nwww.yourcompany.com\n\nData protection\nImprint\nUnsubscribe",
// // // //   },
// // // // };

// // // // let idCounter = 10;
// // // // const uid = () => ++idCounter;

// // // // // ─── Initial templates (6 templates) ──────────────────────────────────────────
// // // // const INITIAL_TEMPLATES = [
// // // //   { id: 1, ...PRESETS.botanical },
// // // //   { id: 2, ...PRESETS.darkpromo },
// // // //   { id: 3, ...PRESETS.minimal },
// // // //   { id: 4, ...PRESETS.event },
// // // //   { id: 5, ...PRESETS.pets },
// // // //   { id: 6, ...PRESETS.halloween },
// // // // ];

// // // // // ─── Inline editable text component ───────────────────────────────────────────
// // // // function Editable({ value, onChange, tag: Tag = "span", className = "", style = {}, multiline = false }) {
// // // //   const [editing, setEditing] = useState(false);
// // // //   const shared = {
// // // //     className: `outline-none border-0 bg-transparent w-full ${className}`,
// // // //     style,
// // // //     value,
// // // //     onChange: (e) => onChange(e.target.value),
// // // //     onBlur: () => setEditing(false),
// // // //     autoFocus: true,
// // // //   };
// // // //   if (!editing)
// // // //     return (
// // // //       <Tag
// // // //         className={`cursor-text hover:ring-2 hover:ring-blue-400 hover:ring-offset-1 rounded transition-all ${className}`}
// // // //         style={style}
// // // //         title="Click to edit"
// // // //         onClick={() => setEditing(true)}
// // // //       >
// // // //         {value}
// // // //       </Tag>
// // // //     );
// // // //   return multiline ? (
// // // //     <textarea {...shared} rows={3} className={shared.className + " resize-none"} />
// // // //   ) : (
// // // //     <input {...shared} />
// // // //   );
// // // // }

// // // // // ─── Editable image with upload / URL ─────────────────────────────────────────
// // // // function EditableImg({ src, onSrcChange, className = "", style = {} }) {
// // // //   const fileRef = useRef();
// // // //   const [urlMode, setUrlMode] = useState(false);
// // // //   const [urlVal, setUrlVal] = useState("");
// // // //   const handleFile = (e) => {
// // // //     const f = e.target.files[0];
// // // //     if (!f) return;
// // // //     const r = new FileReader();
// // // //     r.onload = (ev) => onSrcChange(ev.target.result);
// // // //     r.readAsDataURL(f);
// // // //   };
// // // //   return (
// // // //     <div className="relative group">
// // // //       <img src={src} alt="" className={`w-full object-cover ${className}`} style={style} />
// // // //       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center rounded-lg">
// // // //         <button onClick={() => fileRef.current.click()} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">
// // // //           📁 Upload image
// // // //         </button>
// // // //         <button onClick={() => setUrlMode(true)} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">
// // // //           🔗 Paste URL
// // // //         </button>
// // // //       </div>
// // // //       <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
// // // //       {urlMode && (
// // // //         <div className="absolute inset-0 bg-black/75 flex flex-col gap-2 items-center justify-center rounded-lg p-4 z-10">
// // // //           <input
// // // //             autoFocus
// // // //             className="w-full text-sm px-3 py-1.5 rounded-lg border border-gray-300"
// // // //             placeholder="https://…"
// // // //             value={urlVal}
// // // //             onChange={(e) => setUrlVal(e.target.value)}
// // // //           />
// // // //           <div className="flex gap-2">
// // // //             <button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => { if (urlVal) onSrcChange(urlVal); setUrlMode(false); setUrlVal(""); }}>Apply</button>
// // // //             <button className="text-xs bg-gray-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => setUrlMode(false)}>Cancel</button>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── LAYOUT: Botanical ────────────────────────────────────────────────────────
// // // // function LayoutBotanical({ t, upd }) {
// // // //   return (
// // // //     <div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}>
// // // //       <div className="flex items-center justify-between px-6 py-4">
// // // //         <Editable value={t.logo} onChange={upd("logo")} className="text-2xl font-black tracking-tight" style={{ color: t.logoColor }} />
// // // //         <div className="flex gap-1.5 text-lg">{"●○●○".split("").map((c, i) => <span key={i}>{c}</span>)}</div>
// // // //       </div>
// // // //       <div className="px-4">
// // // //         <EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 280 }} />
// // // //       </div>
// // // //       <div className="px-6 py-5">
// // // //         <Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} />
// // // //         <Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight block mt-1" style={{ color: "#1a1a1a", fontFamily: t.font }} />
// // // //         <Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} />
// // // //         <Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-700 block mt-3" style={{ fontFamily: t.font }} />
// // // //         <div className="mt-6">
// // // //           <button className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}>
// // // //             <Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} />
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //       <div className="px-6 py-4 text-center text-xs text-gray-400 border-t border-gray-200">
// // // //         <Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── LAYOUT: Dark Promo ───────────────────────────────────────────────────────
// // // // function LayoutDarkPromo({ t, upd }) {
// // // //   return (
// // // //     <div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}>
// // // //       <div className="h-1.5" style={{ backgroundColor: t.accentColor }} />
// // // //       <div className="flex items-center justify-between px-6 py-5">
// // // //         <Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-widest uppercase" style={{ color: t.logoColor }} />
// // // //         <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: t.accentColor + "22", color: t.accentColor }}>
// // // //           <Editable value={t.tag} onChange={upd("tag")} style={{ color: t.accentColor }} />
// // // //         </span>
// // // //       </div>
// // // //       <div className="px-4">
// // // //         <EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 240 }} />
// // // //       </div>
// // // //       <div className="px-6 py-6">
// // // //         <Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-extrabold leading-tight block" style={{ color: "#ffffff", fontFamily: t.font }} />
// // // //         <Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} />
// // // //         <Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed block mt-4" style={{ color: "#aaaaaa", fontFamily: t.font }} />
// // // //         <div className="mt-7 flex items-center gap-3">
// // // //           <button className="px-7 py-3 rounded-lg text-sm font-bold shadow-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}>
// // // //             <Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} />
// // // //           </button>
// // // //           <span className="text-xs" style={{ color: "#555" }}>No code required</span>
// // // //         </div>
// // // //       </div>
// // // //       <div className="mx-6 border-t border-gray-800" />
// // // //       <div className="px-6 py-4 text-center">
// // // //         <Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── LAYOUT: Minimal ──────────────────────────────────────────────────────────
// // // // function LayoutMinimal({ t, upd }) {
// // // //   return (
// // // //     <div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}>
// // // //       <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
// // // //         <Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-[0.3em] uppercase" style={{ color: t.logoColor }} />
// // // //         <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
// // // //           <Editable value={t.tag} onChange={upd("tag")} className="text-xs font-medium text-gray-400" />
// // // //         </span>
// // // //       </div>
// // // //       <EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 220 }} />
// // // //       <div className="px-8 py-7">
// // // //         <Editable value={t.subtitle} onChange={upd("subtitle")} className="text-xs font-semibold uppercase tracking-widest block" style={{ color: t.accentColor }} />
// // // //         <Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-black leading-tight block mt-2" style={{ color: "#111" }} />
// // // //         <div className="h-0.5 w-12 mt-4 mb-4" style={{ backgroundColor: t.accentColor }} />
// // // //         <Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-600 block" style={{ fontFamily: t.font }} />
// // // //         <button className="mt-6 px-6 py-3 text-sm font-bold rounded-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}>
// // // //           <Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} />
// // // //         </button>
// // // //       </div>
// // // //       <div className="px-8 py-4 border-t border-gray-100 text-center">
// // // //         <Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── LAYOUT: Event ────────────────────────────────────────────────────────────
// // // // function LayoutEvent({ t, upd }) {
// // // //   return (
// // // //     <div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}>
// // // //       <div className="relative">
// // // //         <EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 200 }} />
// // // //         <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "linear-gradient(to bottom, rgba(30,27,75,0.5), rgba(30,27,75,0.9))" }}>
// // // //           <Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ color: t.accentColor, border: `1px solid ${t.accentColor}` }} />
// // // //           <Editable value={t.logo} onChange={upd("logo")} tag="h1" className="text-2xl font-black text-center tracking-wide" style={{ color: "#fff" }} />
// // // //         </div>
// // // //       </div>
// // // //       <div className="px-8 py-7 text-center">
// // // //         <Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold" style={{ color: "#ffffff" }} />
// // // //         <Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm block mt-1" style={{ color: t.accentColor }} />
// // // //         <Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed mt-4 block" style={{ color: "#aaaaaa", fontFamily: t.font }} />
// // // //         <button className="mt-6 px-8 py-3 rounded-full text-sm font-bold" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}>
// // // //           <Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} />
// // // //         </button>
// // // //       </div>
// // // //       <div className="px-6 py-4 border-t text-center" style={{ borderColor: "#ffffff11" }}>
// // // //         <Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── LAYOUT: Pets Rescue ──────────────────────────────────────────────────────
// // // // function LayoutPets({ t, upd }) {
// // // //   return (
// // // //     <div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}>
// // // //       <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
// // // //         <Editable value={t.logo} onChange={upd("logo")} className="text-xl font-bold" style={{ color: t.logoColor }} />
// // // //         <Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-500 underline" />
// // // //       </div>
// // // //       <EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 240 }} />
// // // //       <div className="px-6 py-7">
// // // //         <Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} />
// // // //         <Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight mt-2" style={{ color: "#2c2c2c" }} />
// // // //         <Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold mt-1 block" style={{ color: t.accentColor }} />
// // // //         <Editable value={t.body} onChange={upd("body")} multiline className="text-base leading-relaxed text-gray-700 mt-4 whitespace-pre-wrap" style={{ fontFamily: t.font }} />
// // // //         <div className="mt-7">
// // // //           <button className="px-6 py-3 rounded-lg text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}>
// // // //             <Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} />
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //       <div className="px-6 py-5 border-t border-gray-200 text-center text-xs text-gray-500">
// // // //         <Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ★ LAYOUT: HALLOWEEN (exact design + editable image) ★
// // // // function LayoutHalloween({ t, upd }) {
// // // //   const updateProduct = (index, field, value) => {
// // // //     const newProducts = [...t.products];
// // // //     newProducts[index] = { ...newProducts[index], [field]: value };
// // // //     upd("products")(newProducts);
// // // //   };

// // // //   return (
// // // //     <div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}>
// // // //       {/* "View in browser" top right */}
// // // //       <div className="flex justify-end px-6 pt-4">
// // // //         <Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-400 underline" />
// // // //       </div>

// // // //       {/* Editable image */}
// // // //       {t.headerImg && (
// // // //         <div className="px-4 mt-2">
// // // //           <EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 200 }} />
// // // //         </div>
// // // //       )}

// // // //       {/* SCARY LOW PRICES */}
// // // //       <div className="px-6 text-center mt-6">
// // // //         <Editable
// // // //           value={t.scaryText}
// // // //           onChange={upd("scaryText")}
// // // //           tag="div"
// // // //           className="text-4xl font-black uppercase leading-tight"
// // // //           style={{ color: t.accentColor }}
// // // //         />
// // // //       </div>

// // // //       {/* FOR ONE NIGHT ONLY */}
// // // //       <div className="px-6 text-center mt-2">
// // // //         <Editable value={t.forOneNight} onChange={upd("forOneNight")} tag="div" className="text-sm font-semibold uppercase tracking-wider" style={{ color: t.accentColor }} />
// // // //       </div>

// // // //       {/* 2021 / 31st October */}
// // // //       <div className="px-6 text-center mt-6">
// // // //         <Editable value={t.year} onChange={upd("year")} tag="div" className="text-lg font-bold text-white" />
// // // //         <Editable value={t.date} onChange={upd("date")} tag="div" className="text-2xl font-black" style={{ color: t.accentColor }} />
// // // //       </div>

// // // //       {/* Body text */}
// // // //       <div className="px-6 text-center mt-4">
// // // //         <Editable
// // // //           value={t.body}
// // // //           onChange={upd("body")}
// // // //           multiline
// // // //           className="text-sm leading-relaxed text-gray-300"
// // // //           style={{ fontFamily: t.font }}
// // // //         />
// // // //       </div>

// // // //       {/* GET A REMINDER button */}
// // // //       <div className="px-6 text-center mt-6">
// // // //         <button
// // // //           className="px-6 py-2 rounded-full text-sm font-bold border-2 bg-transparent transition hover:bg-opacity-10 hover:bg-white"
// // // //           style={{ borderColor: t.accentColor, color: t.accentColor }}
// // // //         >
// // // //           <Editable value={t.reminderButton} onChange={upd("reminderButton")} style={{ color: t.accentColor }} />
// // // //         </button>
// // // //       </div>

// // // //       {/* Product cards */}
// // // //       <div className="px-6 mt-8 space-y-4">
// // // //         {t.products.map((product, idx) => (
// // // //           <div key={idx} className="bg-gray-900 rounded-xl p-4 flex justify-between items-center">
// // // //             <div className="flex-1">
// // // //               <Editable
// // // //                 value={product.name}
// // // //                 onChange={(val) => updateProduct(idx, "name", val)}
// // // //                 tag="div"
// // // //                 className="text-lg font-bold text-white"
// // // //               />
// // // //               <Editable
// // // //                 value={product.delivery}
// // // //                 onChange={(val) => updateProduct(idx, "delivery", val)}
// // // //                 className="text-xs text-gray-400"
// // // //               />
// // // //             </div>
// // // //             <div>
// // // //               <Editable
// // // //                 value={product.price}
// // // //                 onChange={(val) => updateProduct(idx, "price", val)}
// // // //                 tag="div"
// // // //                 className="text-xl font-black"
// // // //                 style={{ color: t.accentColor }}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* Check out all deals button */}
// // // //       <div className="px-6 text-center mt-6">
// // // //         <button
// // // //           className="px-6 py-2 rounded-full text-sm font-bold"
// // // //           style={{ backgroundColor: t.accentColor, color: "#000000" }}
// // // //         >
// // // //           <Editable value={t.dealsButton} onChange={upd("dealsButton")} style={{ color: "#000000" }} />
// // // //         </button>
// // // //       </div>

// // // //       {/* Footer */}
// // // //       <div className="px-6 py-6 mt-6 border-t border-gray-800 text-center text-xs text-gray-500">
// // // //         <Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // const LAYOUT_COMPONENTS = {
// // // //   botanical: LayoutBotanical,
// // // //   darkpromo: LayoutDarkPromo,
// // // //   minimal: LayoutMinimal,
// // // //   event: LayoutEvent,
// // // //   pets: LayoutPets,
// // // //   halloween: LayoutHalloween,
// // // // };

// // // // // ─── Style Panel (with conditional controls for Halloween) ───────────────────
// // // // function StylePanel({ t, upd }) {
// // // //   const isHalloween = t.layout === "halloween";
// // // //   return (
// // // //     <div className="space-y-5 text-sm">
// // // //       <div>
// // // //         <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Font</label>
// // // //         <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={t.font} onChange={(e) => upd("font")(e.target.value)}>
// // // //           {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
// // // //         </select>
// // // //       </div>

// // // //       {[
// // // //         { key: "bgColor", label: "Background" },
// // // //         { key: "accentColor", label: "Accent color" },
// // // //       ].map(({ key, label }) => (
// // // //         <div key={key} className="flex items-center justify-between">
// // // //           <label className="text-sm text-gray-600">{label}</label>
// // // //           <input type="color" value={t[key]} onChange={(e) => upd(key)(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" />
// // // //         </div>
// // // //       ))}

// // // //       {!isHalloween && (
// // // //         <>
// // // //           <div className="flex items-center justify-between">
// // // //             <label className="text-sm text-gray-600">Logo color</label>
// // // //             <input type="color" value={t.logoColor || "#000000"} onChange={(e) => upd("logoColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" />
// // // //           </div>
// // // //           <div className="flex items-center justify-between">
// // // //             <label className="text-sm text-gray-600">Button bg</label>
// // // //             <input type="color" value={t.buttonColor || "#000000"} onChange={(e) => upd("buttonColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" />
// // // //           </div>
// // // //           <div className="flex items-center justify-between">
// // // //             <label className="text-sm text-gray-600">Button text</label>
// // // //             <input type="color" value={t.buttonTextColor || "#ffffff"} onChange={(e) => upd("buttonTextColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" />
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── New Template Modal ───────────────────────────────────────────────────────
// // // // function NewTemplateModal({ onAdd, onClose }) {
// // // //   const [name, setName] = useState("My Template");
// // // //   const [preset, setPreset] = useState("botanical");
// // // //   return (
// // // //     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
// // // //       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
// // // //         <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Template</h2>
// // // //         <div className="space-y-4">
// // // //           <div>
// // // //             <label className="text-sm font-medium text-gray-600 block mb-1">Template name</label>
// // // //             <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} />
// // // //           </div>
// // // //           <div>
// // // //             <label className="text-sm font-medium text-gray-600 block mb-2">Start from preset</label>
// // // //             <div className="grid grid-cols-2 gap-2">
// // // //               {Object.entries(PRESETS).map(([key, p]) => (
// // // //                 <button
// // // //                   key={key}
// // // //                   onClick={() => setPreset(key)}
// // // //                   className={`border-2 rounded-xl p-3 text-left transition ${preset === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
// // // //                 >
// // // //                   <div className="h-10 rounded-lg mb-2" style={{ backgroundColor: p.bgColor, border: "1px solid #ddd" }} />
// // // //                   <p className="text-xs font-semibold text-gray-700">{p.name}</p>
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //         <div className="flex gap-3 mt-6">
// // // //           <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
// // // //           <button
// // // //             onClick={() => { onAdd({ id: uid(), ...PRESETS[preset], name: name || PRESETS[preset].name }); onClose(); }}
// // // //             className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700"
// // // //           >
// // // //             Create Template
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Main App ─────────────────────────────────────────────────────────────────
// // // // export default function EmailBuilder() {
// // // //   const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
// // // //   const [activeId, setActiveId] = useState(1);
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [renamingId, setRenamingId] = useState(null);
// // // //   const [renameVal, setRenameVal] = useState("");
// // // //   const [activePanel, setActivePanel] = useState("style");

// // // //   const active = templates.find((t) => t.id === activeId);

// // // //   const updateActive = useCallback((key) => (val) => {
// // // //     setTemplates((ts) => ts.map((t) => (t.id === activeId ? { ...t, [key]: val } : t)));
// // // //   }, [activeId]);

// // // //   const addTemplate = (tpl) => {
// // // //     setTemplates((ts) => [...ts, tpl]);
// // // //     setActiveId(tpl.id);
// // // //   };

// // // //   const duplicate = (id) => {
// // // //     const src = templates.find((t) => t.id === id);
// // // //     const copy = { ...src, id: uid(), name: src.name + " (copy)" };
// // // //     setTemplates((ts) => [...ts, copy]);
// // // //     setActiveId(copy.id);
// // // //   };

// // // //   const remove = (id) => {
// // // //     if (templates.length === 1) return;
// // // //     const next = templates.find((t) => t.id !== id);
// // // //     setTemplates((ts) => ts.filter((t) => t.id !== id));
// // // //     if (activeId === id) setActiveId(next.id);
// // // //   };

// // // //   const startRename = (t) => {
// // // //     setRenamingId(t.id);
// // // //     setRenameVal(t.name);
// // // //   };
// // // //   const commitRename = () => {
// // // //     setTemplates((ts) => ts.map((t) => (t.id === renamingId ? { ...t, name: renameVal } : t)));
// // // //     setRenamingId(null);
// // // //   };

// // // //   const LayoutComponent = active ? LAYOUT_COMPONENTS[active.layout] : null;
// // // //   const fontLink = "https://fonts.googleapis.com/css2?family=Inter&family=Playfair+Display:wght@700;900&family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;600;700;900&family=Lato:wght@400;700&family=Roboto:wght@400;700&display=swap";

// // // //   return (
// // // //     <>
// // // //       <link rel="stylesheet" href={fontLink} />
// // // //       {showModal && <NewTemplateModal onAdd={addTemplate} onClose={() => setShowModal(false)} />}

// // // //       <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
// // // //         {/* Top bar */}
// // // //         <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0">
// // // //           <div className="flex items-center gap-3">
// // // //             <span className="text-xl font-black text-blue-600">✉ MailCraft</span>
// // // //             <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full hidden sm:block">Template Builder</span>
// // // //           </div>
// // // //           <div className="flex gap-2">
// // // //             <button
// // // //               className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "style" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
// // // //               onClick={() => setActivePanel("style")}
// // // //             >Style</button>
// // // //             <button
// // // //               className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "preview" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
// // // //               onClick={() => setActivePanel("preview")}
// // // //             >Preview</button>
// // // //             <button className="text-xs bg-blue-600 text-white rounded-lg px-4 py-1.5 font-semibold hover:bg-blue-700">Save &amp; Export</button>
// // // //           </div>
// // // //         </div>

// // // //         <div className="flex flex-1 overflow-hidden">
// // // //           {/* Left sidebar: template list */}
// // // //           <div className="w-52 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto">
// // // //             <div className="px-3 pt-4 pb-2 flex items-center justify-between">
// // // //               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Templates</span>
// // // //               <button onClick={() => setShowModal(true)} className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-base leading-none hover:bg-blue-700" title="Add template">+</button>
// // // //             </div>
// // // //             <div className="flex-1 px-2 pb-4 space-y-1">
// // // //               {templates.map((t) => (
// // // //                 <div
// // // //                   key={t.id}
// // // //                   onClick={() => setActiveId(t.id)}
// // // //                   className={`group relative rounded-xl cursor-pointer border-2 transition p-2 ${activeId === t.id ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200 hover:bg-gray-50"}`}
// // // //                 >
// // // //                   <div className="w-full h-12 rounded-lg mb-1.5 flex items-end overflow-hidden" style={{ backgroundColor: t.bgColor }}>
// // // //                     <div className="w-full px-2 pb-1.5">
// // // //                       <div className="h-1.5 rounded-full w-3/4 opacity-60" style={{ backgroundColor: t.accentColor }} />
// // // //                       <div className="h-1 rounded-full w-1/2 mt-1 opacity-30" style={{ backgroundColor: t.accentColor }} />
// // // //                     </div>
// // // //                   </div>
// // // //                   {renamingId === t.id ? (
// // // //                     <input
// // // //                       autoFocus
// // // //                       className="text-xs w-full border border-blue-300 rounded px-1 py-0.5 outline-none"
// // // //                       value={renameVal}
// // // //                       onChange={(e) => setRenameVal(e.target.value)}
// // // //                       onBlur={commitRename}
// // // //                       onKeyDown={(e) => e.key === "Enter" && commitRename()}
// // // //                       onClick={(e) => e.stopPropagation()}
// // // //                     />
// // // //                   ) : (
// // // //                     <p className="text-xs font-semibold text-gray-700 truncate">{t.name}</p>
// // // //                   )}
// // // //                   <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition" onClick={(e) => e.stopPropagation()}>
// // // //                     <button onClick={() => startRename(t)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50" title="Rename">✏️</button>
// // // //                     <button onClick={() => duplicate(t.id)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50" title="Duplicate">⧉</button>
// // // //                     {templates.length > 1 && (
// // // //                       <button onClick={() => remove(t.id)} className="w-5 h-5 rounded bg-white border border-red-200 text-red-400 flex items-center justify-center text-xs hover:bg-red-50" title="Delete">✕</button>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* Centre: canvas */}
// // // //           <div className="flex-1 overflow-y-auto p-6">
// // // //             {active && LayoutComponent && (
// // // //               <LayoutComponent key={active.id} t={active} upd={updateActive} />
// // // //             )}
// // // //             <p className="text-center text-xs text-gray-400 mt-4">Click any text in the preview to edit it · Hover image to replace</p>
// // // //           </div>

// // // //           {/* Right sidebar: style controls */}
// // // //           {activePanel === "style" && (
// // // //             <div className="w-56 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 p-4">
// // // //               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Style</p>
// // // //               {active && <StylePanel t={active} upd={updateActive} />}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }



// // // import { useState, useRef, useCallback, useEffect } from "react";

// // // // ─── Google Fonts ─────────────────────────────────────────────────────────────
// // // const FONTS = [
// // //   { label: "Inter", value: "'Inter', sans-serif" },
// // //   { label: "Playfair Display", value: "'Playfair Display', serif" },
// // //   { label: "Poppins", value: "'Poppins', sans-serif" },
// // //   { label: "Merriweather", value: "'Merriweather', serif" },
// // //   { label: "Montserrat", value: "'Montserrat', sans-serif" },
// // //   { label: "Lato", value: "'Lato', sans-serif" },
// // //   { label: "Roboto", value: "'Roboto', sans-serif" },
// // //   { label: "Georgia", value: "Georgia, serif" },
// // // ];

// // // // ─── Base template presets ────────────────────────────────────────────────────
// // // const PRESETS = {
// // //   botanical: { layout: "botanical", name: "Botanical Newsletter", font: "'Inter', sans-serif", logo: "🌿 URBAN LEAF", logoColor: "#2d5a27", bgColor: "#f5f0e8", accentColor: "#2d5a27", buttonColor: "#2d5a27", buttonTextColor: "#ffffff", buttonText: "Shop Now", headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80", tag: "New!", title: "Spring Collection is Here", subtitle: "From 20€", body: "Explore our hand-picked seasonal plants that bring life, colour and calm into every corner of your home.", footerText: "© 2026 Urban Leaf · Unsubscribe" },
// // //   darkpromo: { layout: "darkpromo", name: "Dark Promo", font: "'Poppins', sans-serif", logo: "⚡ FLASHBOLT", logoColor: "#ffffff", bgColor: "#0f0f1a", accentColor: "#f5a623", buttonColor: "#f5a623", buttonTextColor: "#0f0f1a", buttonText: "Grab the Deal", headerImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80", tag: "Limited Offer", title: "50% Off Everything Today", subtitle: "Ends midnight", body: "This is your one chance to stock up on our best-selling tech accessories at half the usual price. No code needed.", footerText: "© 2026 Flashbolt · Manage preferences" },
// // //   minimal: { layout: "minimal", name: "Minimal Clean", font: "'Inter', sans-serif", logo: "BLOOM", logoColor: "#111", bgColor: "#ffffff", accentColor: "#e63946", buttonColor: "#111111", buttonTextColor: "#ffffff", buttonText: "Read More", headerImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tag: "Story", title: "This Week in Design", subtitle: "Issue #42 · June 2026", body: "A curated roundup of the best design work, tools, and ideas from across the web — delivered every Wednesday.", footerText: "© 2026 Bloom · Unsubscribe · View in browser" },
// // //   event: { layout: "event", name: "Event Invite", font: "'Montserrat', sans-serif", logo: "🎤 DEVCONF", logoColor: "#ffffff", bgColor: "#1e1b4b", accentColor: "#a78bfa", buttonColor: "#a78bfa", buttonTextColor: "#1e1b4b", buttonText: "Reserve My Spot", headerImg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", tag: "You're Invited", title: "DevConf 2026 — Join Us", subtitle: "July 18–20 · San Francisco", body: "Three days of talks, workshops, and networking with the brightest minds in software. Early bird tickets available now.", footerText: "© 2026 DevConf · Unsubscribe" },
// // //   pets: { layout: "pets", name: "Pets Rescue", font: "'Inter', sans-serif", logo: "FriendswithPaw", logoColor: "#2d5a27", bgColor: "#fef9f0", accentColor: "#e67e22", buttonColor: "#2d5a27", buttonTextColor: "#ffffff", buttonText: "Donate Now", headerImg: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80", tag: "Thank you", title: "Your kindness saved 37 cats and dogs", subtitle: "This year, thanks to you", body: "Dear Jane,\n\nYour generosity and caring spirit have made a tremendous difference. Because of you, 37 cats and dogs found forever homes and received urgent medical care.\n\nWe couldn't have done it without you.", footerText: "FriendswithPaw\n2/260, 6th cross street, bharathidasan nagar, sharamugapuram\n600099 Chennai\ncontact@friendswithpaw.org\n\nPrivacy • Imprint • Unsubscribe", viewInBrowserText: "View in browser" },
// // //   halloween: { layout: "halloween", name: "Halloween Sale", font: "'Montserrat', sans-serif", bgColor: "#000000", accentColor: "#ff6600", viewInBrowserText: "View in browser", scaryText: "SCARY LOW PRICES", forOneNight: "FOR ONE NIGHT ONLY", year: "2021", date: "31st October", body: "Snatch your piece for the best price with our **24-hour limited Halloween megasale**!", reminderButton: "GET A REMINDER", dealsButton: "Check out all deals →", headerImg: "https://images.unsplash.com/photo-1533400908194-0b2ecc2674fb?w=600&q=80", products: [{ name: "iPhone", price: "480€", delivery: "Incl. free delivery" }, { name: "aPhone", price: "585€", delivery: "Incl. free delivery" }, { name: "uPhone", price: "530€", delivery: "Incl. free delivery" }], footerText: "Wynsync technologies\n2/260, 6th cross street, bharathidasan nagar, shanmugapuram\n600099 Chennai\nTel.: 123 4567 8900\nEmail: jane@yourcompanyname.com\nwww.yourcompany.com\n\nData protection\nImprint\nUnsubscribe" },
// // // };

// // // let idCounter = 10;
// // // const uid = () => ++idCounter;

// // // const INITIAL_TEMPLATES = [
// // //   { id: 1, ...PRESETS.botanical },
// // //   { id: 2, ...PRESETS.darkpromo },
// // //   { id: 3, ...PRESETS.minimal },
// // //   { id: 4, ...PRESETS.event },
// // //   { id: 5, ...PRESETS.pets },
// // //   { id: 6, ...PRESETS.halloween },
// // // ];

// // // // ─── Editable text component ─────────────────────────────────────────────────
// // // function Editable({ value, onChange, tag: Tag = "span", className = "", style = {}, multiline = false }) {
// // //   const [editing, setEditing] = useState(false);
// // //   const shared = { className: `outline-none border-0 bg-transparent w-full ${className}`, style, value, onChange: (e) => onChange(e.target.value), onBlur: () => setEditing(false), autoFocus: true };
// // //   if (!editing) return <Tag className={`cursor-text hover:ring-2 hover:ring-blue-400 hover:ring-offset-1 rounded transition-all ${className}`} style={style} title="Click to edit" onClick={() => setEditing(true)}>{value}</Tag>;
// // //   return multiline ? <textarea {...shared} rows={3} className={shared.className + " resize-none"} /> : <input {...shared} />;
// // // }

// // // // ─── Editable image with upload / URL ─────────────────────────────────────────
// // // function EditableImg({ src, onSrcChange, className = "", style = {} }) {
// // //   const fileRef = useRef();
// // //   const [urlMode, setUrlMode] = useState(false);
// // //   const [urlVal, setUrlVal] = useState("");
// // //   const handleFile = (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => onSrcChange(ev.target.result); r.readAsDataURL(f); };
// // //   return (<div className="relative group"><img src={src} alt="" className={`w-full object-cover ${className}`} style={style} /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center rounded-lg"><button onClick={() => fileRef.current.click()} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">📁 Upload image</button><button onClick={() => setUrlMode(true)} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">🔗 Paste URL</button></div><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />{urlMode && (<div className="absolute inset-0 bg-black/75 flex flex-col gap-2 items-center justify-center rounded-lg p-4 z-10"><input autoFocus className="w-full text-sm px-3 py-1.5 rounded-lg border border-gray-300" placeholder="https://…" value={urlVal} onChange={(e) => setUrlVal(e.target.value)} /><div className="flex gap-2"><button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => { if (urlVal) onSrcChange(urlVal); setUrlMode(false); setUrlVal(""); }}>Apply</button><button className="text-xs bg-gray-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => setUrlMode(false)}>Cancel</button></div></div>)}</div>);
// // // }

// // // // ─── Layouts (unchanged) ──────────────────────────────────────────────────────
// // // function LayoutBotanical({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-6 py-4"><Editable value={t.logo} onChange={upd("logo")} className="text-2xl font-black tracking-tight" style={{ color: t.logoColor }} /><div className="flex gap-1.5 text-lg">{"●○●○".split("").map((c, i) => <span key={i}>{c}</span>)}</div></div><div className="px-4"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 280 }} /></div><div className="px-6 py-5"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight block mt-1" style={{ color: "#1a1a1a", fontFamily: t.font }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-700 block mt-3" style={{ fontFamily: t.font }} /><div className="mt-6"><button className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} /></button></div></div><div className="px-6 py-4 text-center text-xs text-gray-400 border-t border-gray-200"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" /></div></div>); }
// // // function LayoutDarkPromo({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="h-1.5" style={{ backgroundColor: t.accentColor }} /><div className="flex items-center justify-between px-6 py-5"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-widest uppercase" style={{ color: t.logoColor }} /><span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: t.accentColor + "22", color: t.accentColor }}><Editable value={t.tag} onChange={upd("tag")} style={{ color: t.accentColor }} /></span></div><div className="px-4"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 240 }} /></div><div className="px-6 py-6"><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-extrabold leading-tight block" style={{ color: "#ffffff", fontFamily: t.font }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed block mt-4" style={{ color: "#aaaaaa", fontFamily: t.font }} /><div className="mt-7 flex items-center gap-3"><button className="px-7 py-3 rounded-lg text-sm font-bold shadow-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} /></button><span className="text-xs" style={{ color: "#555" }}>No code required</span></div></div><div className="mx-6 border-t border-gray-800" /><div className="px-6 py-4 text-center"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} /></div></div>); }
// // // function LayoutMinimal({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-8 py-5 border-b border-gray-100"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-[0.3em] uppercase" style={{ color: t.logoColor }} /><span className="text-xs font-medium text-gray-400 uppercase tracking-widest"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-medium text-gray-400" /></span></div><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 220 }} /><div className="px-8 py-7"><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-xs font-semibold uppercase tracking-widest block" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-black leading-tight block mt-2" style={{ color: "#111" }} /><div className="h-0.5 w-12 mt-4 mb-4" style={{ backgroundColor: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-600 block" style={{ fontFamily: t.font }} /><button className="mt-6 px-6 py-3 text-sm font-bold rounded-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div><div className="px-8 py-4 border-t border-gray-100 text-center"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" /></div></div>); }
// // // function LayoutEvent({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="relative"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 200 }} /><div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "linear-gradient(to bottom, rgba(30,27,75,0.5), rgba(30,27,75,0.9))" }}><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ color: t.accentColor, border: `1px solid ${t.accentColor}` }} /><Editable value={t.logo} onChange={upd("logo")} tag="h1" className="text-2xl font-black text-center tracking-wide" style={{ color: "#fff" }} /></div></div><div className="px-8 py-7 text-center"><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold" style={{ color: "#ffffff" }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed mt-4 block" style={{ color: "#aaaaaa", fontFamily: t.font }} /><button className="mt-6 px-8 py-3 rounded-full text-sm font-bold" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div><div className="px-6 py-4 border-t text-center" style={{ borderColor: "#ffffff11" }}><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} /></div></div>); }
// // // function LayoutPets({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-6 py-4 border-b border-gray-200"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-bold" style={{ color: t.logoColor }} /><Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-500 underline" /></div><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 240 }} /><div className="px-6 py-7"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight mt-2" style={{ color: "#2c2c2c" }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold mt-1 block" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-base leading-relaxed text-gray-700 mt-4 whitespace-pre-wrap" style={{ fontFamily: t.font }} /><div className="mt-7"><button className="px-6 py-3 rounded-lg text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div></div><div className="px-6 py-5 border-t border-gray-200 text-center text-xs text-gray-500"><Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" /></div></div>); }
// // // function LayoutHalloween({ t, upd }) { const updateProduct = (index, field, value) => { const newProducts = [...t.products]; newProducts[index] = { ...newProducts[index], [field]: value }; upd("products")(newProducts); }; return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex justify-end px-6 pt-4"><Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-400 underline" /></div>{t.headerImg && (<div className="px-4 mt-2"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 200 }} /></div>)}<div className="px-6 text-center mt-6"><Editable value={t.scaryText} onChange={upd("scaryText")} tag="div" className="text-4xl font-black uppercase leading-tight" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-2"><Editable value={t.forOneNight} onChange={upd("forOneNight")} tag="div" className="text-sm font-semibold uppercase tracking-wider" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-6"><Editable value={t.year} onChange={upd("year")} tag="div" className="text-lg font-bold text-white" /><Editable value={t.date} onChange={upd("date")} tag="div" className="text-2xl font-black" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-4"><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-300" style={{ fontFamily: t.font }} /></div><div className="px-6 text-center mt-6"><button className="px-6 py-2 rounded-full text-sm font-bold border-2 bg-transparent transition hover:bg-opacity-10 hover:bg-white" style={{ borderColor: t.accentColor, color: t.accentColor }}><Editable value={t.reminderButton} onChange={upd("reminderButton")} style={{ color: t.accentColor }} /></button></div><div className="px-6 mt-8 space-y-4">{t.products.map((product, idx) => (<div key={idx} className="bg-gray-900 rounded-xl p-4 flex justify-between items-center"><div className="flex-1"><Editable value={product.name} onChange={(val) => updateProduct(idx, "name", val)} tag="div" className="text-lg font-bold text-white" /><Editable value={product.delivery} onChange={(val) => updateProduct(idx, "delivery", val)} className="text-xs text-gray-400" /></div><div><Editable value={product.price} onChange={(val) => updateProduct(idx, "price", val)} tag="div" className="text-xl font-black" style={{ color: t.accentColor }} /></div></div>))}</div><div className="px-6 text-center mt-6"><button className="px-6 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: t.accentColor, color: "#000000" }}><Editable value={t.dealsButton} onChange={upd("dealsButton")} style={{ color: "#000000" }} /></button></div><div className="px-6 py-6 mt-6 border-t border-gray-800 text-center text-xs text-gray-500"><Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" /></div></div>); }

// // // const LAYOUT_COMPONENTS = { botanical: LayoutBotanical, darkpromo: LayoutDarkPromo, minimal: LayoutMinimal, event: LayoutEvent, pets: LayoutPets, halloween: LayoutHalloween };

// // // function StylePanel({ t, upd }) { const isHalloween = t.layout === "halloween"; return (<div className="space-y-5 text-sm"><div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Font</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={t.font} onChange={(e) => upd("font")(e.target.value)}>{FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}</select></div>{[{ key: "bgColor", label: "Background" }, { key: "accentColor", label: "Accent color" }].map(({ key, label }) => (<div key={key} className="flex items-center justify-between"><label className="text-sm text-gray-600">{label}</label><input type="color" value={t[key]} onChange={(e) => upd(key)(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div>))}{!isHalloween && (<><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Logo color</label><input type="color" value={t.logoColor || "#000000"} onChange={(e) => upd("logoColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Button bg</label><input type="color" value={t.buttonColor || "#000000"} onChange={(e) => upd("buttonColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Button text</label><input type="color" value={t.buttonTextColor || "#ffffff"} onChange={(e) => upd("buttonTextColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div></>)}</div>); }

// // // function NewTemplateModal({ onAdd, onClose }) { const [name, setName] = useState("My Template"); const [preset, setPreset] = useState("botanical"); return (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"><h2 className="text-lg font-bold text-gray-800 mb-4">Add New Template</h2><div className="space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Template name</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} /></div><div><label className="text-sm font-medium text-gray-600 block mb-2">Start from preset</label><div className="grid grid-cols-2 gap-2">{Object.entries(PRESETS).map(([key, p]) => (<button key={key} onClick={() => setPreset(key)} className={`border-2 rounded-xl p-3 text-left transition ${preset === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}><div className="h-10 rounded-lg mb-2" style={{ backgroundColor: p.bgColor, border: "1px solid #ddd" }} /><p className="text-xs font-semibold text-gray-700">{p.name}</p></button>))}</div></div></div><div className="flex gap-3 mt-6"><button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button><button onClick={() => { onAdd({ id: uid(), ...PRESETS[preset], name: name || PRESETS[preset].name }); onClose(); }} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700">Create Template</button></div></div></div>); }

// // // // ─── Main App ─────────────────────────────────────────────────────────────────
// // // export default function EmailBuilder() {
// // //   const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
// // //   const [activeId, setActiveId] = useState(1);
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [renamingId, setRenamingId] = useState(null);
// // //   const [renameVal, setRenameVal] = useState("");
// // //   const [activePanel, setActivePanel] = useState("style");

// // //   // ✅ NEW: Read query parameter to auto-select a template
// // //   useEffect(() => {
// // //     const params = new URLSearchParams(window.location.search);
// // //     const templateParam = params.get("template");
// // //     if (templateParam) {
// // //       const mapping = {
// // //         botanical: 1,
// // //         darkpromo: 2,
// // //         minimal: 3,
// // //         event: 4,
// // //         pets: 5,
// // //         halloween: 6,
// // //       };
// // //       const targetId = mapping[templateParam];
// // //       if (targetId && templates.find(t => t.id === targetId)) {
// // //         setActiveId(targetId);
// // //       }
// // //     }
// // //   }, [templates]);

// // //   const active = templates.find((t) => t.id === activeId);
// // //   const updateActive = useCallback((key) => (val) => { setTemplates((ts) => ts.map((t) => (t.id === activeId ? { ...t, [key]: val } : t))); }, [activeId]);
// // //   const addTemplate = (tpl) => { setTemplates((ts) => [...ts, tpl]); setActiveId(tpl.id); };
// // //   const duplicate = (id) => { const src = templates.find((t) => t.id === id); const copy = { ...src, id: uid(), name: src.name + " (copy)" }; setTemplates((ts) => [...ts, copy]); setActiveId(copy.id); };
// // //   const remove = (id) => { if (templates.length === 1) return; const next = templates.find((t) => t.id !== id); setTemplates((ts) => ts.filter((t) => t.id !== id)); if (activeId === id) setActiveId(next.id); };
// // //   const startRename = (t) => { setRenamingId(t.id); setRenameVal(t.name); };
// // //   const commitRename = () => { setTemplates((ts) => ts.map((t) => (t.id === renamingId ? { ...t, name: renameVal } : t))); setRenamingId(null); };
// // //   const LayoutComponent = active ? LAYOUT_COMPONENTS[active.layout] : null;
// // //   const fontLink = "https://fonts.googleapis.com/css2?family=Inter&family=Playfair+Display:wght@700;900&family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;600;700;900&family=Lato:wght@400;700&family=Roboto:wght@400;700&display=swap";

// // //   return (
// // //     <>
// // //       <link rel="stylesheet" href={fontLink} />
// // //       {showModal && <NewTemplateModal onAdd={addTemplate} onClose={() => setShowModal(false)} />}
// // //       <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
// // //         <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0">
// // //           <div className="flex items-center gap-3"><span className="text-xl font-black text-blue-600">✉ MailCraft</span><span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full hidden sm:block">Template Builder</span></div>
// // //           <div className="flex gap-2"><button className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "style" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`} onClick={() => setActivePanel("style")}>Style</button><button className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "preview" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`} onClick={() => setActivePanel("preview")}>Preview</button><button className="text-xs bg-blue-600 text-white rounded-lg px-4 py-1.5 font-semibold hover:bg-blue-700">Save &amp; Export</button></div>
// // //         </div>
// // //         <div className="flex flex-1 overflow-hidden">
// // //           <div className="w-52 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto">
// // //             <div className="px-3 pt-4 pb-2 flex items-center justify-between"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Templates</span><button onClick={() => setShowModal(true)} className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-base leading-none hover:bg-blue-700">+</button></div>
// // //             <div className="flex-1 px-2 pb-4 space-y-1">{templates.map((t) => (<div key={t.id} onClick={() => setActiveId(t.id)} className={`group relative rounded-xl cursor-pointer border-2 transition p-2 ${activeId === t.id ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200 hover:bg-gray-50"}`}><div className="w-full h-12 rounded-lg mb-1.5 flex items-end overflow-hidden" style={{ backgroundColor: t.bgColor }}><div className="w-full px-2 pb-1.5"><div className="h-1.5 rounded-full w-3/4 opacity-60" style={{ backgroundColor: t.accentColor }} /><div className="h-1 rounded-full w-1/2 mt-1 opacity-30" style={{ backgroundColor: t.accentColor }} /></div></div>{renamingId === t.id ? (<input autoFocus className="text-xs w-full border border-blue-300 rounded px-1 py-0.5 outline-none" value={renameVal} onChange={(e) => setRenameVal(e.target.value)} onBlur={commitRename} onKeyDown={(e) => e.key === "Enter" && commitRename()} onClick={(e) => e.stopPropagation()} />) : (<p className="text-xs font-semibold text-gray-700 truncate">{t.name}</p>)}<div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition" onClick={(e) => e.stopPropagation()}><button onClick={() => startRename(t)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50">✏️</button><button onClick={() => duplicate(t.id)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50">⧉</button>{templates.length > 1 && <button onClick={() => remove(t.id)} className="w-5 h-5 rounded bg-white border border-red-200 text-red-400 flex items-center justify-center text-xs hover:bg-red-50">✕</button>}</div></div>))}</div>
// // //           </div>
// // //           <div className="flex-1 overflow-y-auto p-6">{active && LayoutComponent && <LayoutComponent key={active.id} t={active} upd={updateActive} />}<p className="text-center text-xs text-gray-400 mt-4">Click any text in the preview to edit it · Hover image to replace</p></div>
// // //           {activePanel === "style" && (<div className="w-56 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 p-4"><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Style</p>{active && <StylePanel t={active} upd={updateActive} />}</div>)}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }


// // import { useState, useRef, useCallback, useEffect } from "react";

// // // ─── Google Fonts ─────────────────────────────────────────────────────────────
// // const FONTS = [
// //   { label: "Inter", value: "'Inter', sans-serif" },
// //   { label: "Playfair Display", value: "'Playfair Display', serif" },
// //   { label: "Poppins", value: "'Poppins', sans-serif" },
// //   { label: "Merriweather", value: "'Merriweather', serif" },
// //   { label: "Montserrat", value: "'Montserrat', sans-serif" },
// //   { label: "Lato", value: "'Lato', sans-serif" },
// //   { label: "Roboto", value: "'Roboto', sans-serif" },
// //   { label: "Georgia", value: "Georgia, serif" },
// // ];

// // // ─── Base template presets ────────────────────────────────────────────────────
// // const PRESETS = {
// //   botanical: { layout: "botanical", name: "Botanical Newsletter", font: "'Inter', sans-serif", logo: "🌿 URBAN LEAF", logoColor: "#2d5a27", bgColor: "#f5f0e8", accentColor: "#2d5a27", buttonColor: "#2d5a27", buttonTextColor: "#ffffff", buttonText: "Shop Now", headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80", tag: "New!", title: "Spring Collection is Here", subtitle: "From 20€", body: "Explore our hand-picked seasonal plants that bring life, colour and calm into every corner of your home.", footerText: "© 2026 Urban Leaf · Unsubscribe" },
// //   darkpromo: { layout: "darkpromo", name: "Dark Promo", font: "'Poppins', sans-serif", logo: "⚡ FLASHBOLT", logoColor: "#ffffff", bgColor: "#0f0f1a", accentColor: "#f5a623", buttonColor: "#f5a623", buttonTextColor: "#0f0f1a", buttonText: "Grab the Deal", headerImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80", tag: "Limited Offer", title: "50% Off Everything Today", subtitle: "Ends midnight", body: "This is your one chance to stock up on our best-selling tech accessories at half the usual price. No code needed.", footerText: "© 2026 Flashbolt · Manage preferences" },
// //   minimal: { layout: "minimal", name: "Minimal Clean", font: "'Inter', sans-serif", logo: "BLOOM", logoColor: "#111", bgColor: "#ffffff", accentColor: "#e63946", buttonColor: "#111111", buttonTextColor: "#ffffff", buttonText: "Read More", headerImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tag: "Story", title: "This Week in Design", subtitle: "Issue #42 · June 2026", body: "A curated roundup of the best design work, tools, and ideas from across the web — delivered every Wednesday.", footerText: "© 2026 Bloom · Unsubscribe · View in browser" },
// //   event: { layout: "event", name: "Event Invite", font: "'Montserrat', sans-serif", logo: "🎤 DEVCONF", logoColor: "#ffffff", bgColor: "#1e1b4b", accentColor: "#a78bfa", buttonColor: "#a78bfa", buttonTextColor: "#1e1b4b", buttonText: "Reserve My Spot", headerImg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", tag: "You're Invited", title: "DevConf 2026 — Join Us", subtitle: "July 18–20 · San Francisco", body: "Three days of talks, workshops, and networking with the brightest minds in software. Early bird tickets available now.", footerText: "© 2026 DevConf · Unsubscribe" },
// //   pets: { layout: "pets", name: "Pets Rescue", font: "'Inter', sans-serif", logo: "FriendswithPaw", logoColor: "#2d5a27", bgColor: "#fef9f0", accentColor: "#e67e22", buttonColor: "#2d5a27", buttonTextColor: "#ffffff", buttonText: "Donate Now", headerImg: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80", tag: "Thank you", title: "Your kindness saved 37 cats and dogs", subtitle: "This year, thanks to you", body: "Dear Jane,\n\nYour generosity and caring spirit have made a tremendous difference. Because of you, 37 cats and dogs found forever homes and received urgent medical care.\n\nWe couldn't have done it without you.", footerText: "FriendswithPaw\n2/260, 6th cross street, bharathidasan nagar, sharamugapuram\n600099 Chennai\ncontact@friendswithpaw.org\n\nPrivacy • Imprint • Unsubscribe", viewInBrowserText: "View in browser" },
// //   halloween: { layout: "halloween", name: "Halloween Sale", font: "'Montserrat', sans-serif", bgColor: "#000000", accentColor: "#ff6600", viewInBrowserText: "View in browser", scaryText: "SCARY LOW PRICES", forOneNight: "FOR ONE NIGHT ONLY", year: "2021", date: "31st October", body: "Snatch your piece for the best price with our **24-hour limited Halloween megasale**!", reminderButton: "GET A REMINDER", dealsButton: "Check out all deals →", headerImg: "https://images.unsplash.com/photo-1533400908194-0b2ecc2674fb?w=600&q=80", products: [{ name: "iPhone", price: "480€", delivery: "Incl. free delivery" }, { name: "aPhone", price: "585€", delivery: "Incl. free delivery" }, { name: "uPhone", price: "530€", delivery: "Incl. free delivery" }], footerText: "Wynsync technologies\n2/260, 6th cross street, bharathidasan nagar, shanmugapuram\n600099 Chennai\nTel.: 123 4567 8900\nEmail: jane@yourcompanyname.com\nwww.yourcompany.com\n\nData protection\nImprint\nUnsubscribe" },
// // };

// // let idCounter = 10;
// // const uid = () => ++idCounter;

// // const INITIAL_TEMPLATES = [
// //   { id: 1, ...PRESETS.botanical },
// //   { id: 2, ...PRESETS.darkpromo },
// //   { id: 3, ...PRESETS.minimal },
// //   { id: 4, ...PRESETS.event },
// //   { id: 5, ...PRESETS.pets },
// //   { id: 6, ...PRESETS.halloween },
// // ];

// // // ─── Editable text component ─────────────────────────────────────────────────
// // function Editable({ value, onChange, tag: Tag = "span", className = "", style = {}, multiline = false }) {
// //   const [editing, setEditing] = useState(false);
// //   const shared = { className: `outline-none border-0 bg-transparent w-full ${className}`, style, value, onChange: (e) => onChange(e.target.value), onBlur: () => setEditing(false), autoFocus: true };
// //   if (!editing) return <Tag className={`cursor-text hover:ring-2 hover:ring-blue-400 hover:ring-offset-1 rounded transition-all ${className}`} style={style} title="Click to edit" onClick={() => setEditing(true)}>{value}</Tag>;
// //   return multiline ? <textarea {...shared} rows={3} className={shared.className + " resize-none"} /> : <input {...shared} />;
// // }

// // // ─── Editable image with upload / URL ─────────────────────────────────────────
// // function EditableImg({ src, onSrcChange, className = "", style = {} }) {
// //   const fileRef = useRef();
// //   const [urlMode, setUrlMode] = useState(false);
// //   const [urlVal, setUrlVal] = useState("");
// //   const handleFile = (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => onSrcChange(ev.target.result); r.readAsDataURL(f); };
// //   return (<div className="relative group"><img src={src} alt="" className={`w-full object-cover ${className}`} style={style} /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center rounded-lg"><button onClick={() => fileRef.current.click()} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">📁 Upload image</button><button onClick={() => setUrlMode(true)} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">🔗 Paste URL</button></div><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />{urlMode && (<div className="absolute inset-0 bg-black/75 flex flex-col gap-2 items-center justify-center rounded-lg p-4 z-10"><input autoFocus className="w-full text-sm px-3 py-1.5 rounded-lg border border-gray-300" placeholder="https://…" value={urlVal} onChange={(e) => setUrlVal(e.target.value)} /><div className="flex gap-2"><button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => { if (urlVal) onSrcChange(urlVal); setUrlMode(false); setUrlVal(""); }}>Apply</button><button className="text-xs bg-gray-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => setUrlMode(false)}>Cancel</button></div></div>)}</div>);
// // }

// // // ─── Layouts (unchanged) ──────────────────────────────────────────────────────
// // function LayoutBotanical({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-6 py-4"><Editable value={t.logo} onChange={upd("logo")} className="text-2xl font-black tracking-tight" style={{ color: t.logoColor }} /><div className="flex gap-1.5 text-lg">{"●○●○".split("").map((c, i) => <span key={i}>{c}</span>)}</div></div><div className="px-4"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 280 }} /></div><div className="px-6 py-5"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight block mt-1" style={{ color: "#1a1a1a", fontFamily: t.font }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-700 block mt-3" style={{ fontFamily: t.font }} /><div className="mt-6"><button className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} /></button></div></div><div className="px-6 py-4 text-center text-xs text-gray-400 border-t border-gray-200"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" /></div></div>); }
// // function LayoutDarkPromo({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="h-1.5" style={{ backgroundColor: t.accentColor }} /><div className="flex items-center justify-between px-6 py-5"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-widest uppercase" style={{ color: t.logoColor }} /><span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: t.accentColor + "22", color: t.accentColor }}><Editable value={t.tag} onChange={upd("tag")} style={{ color: t.accentColor }} /></span></div><div className="px-4"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 240 }} /></div><div className="px-6 py-6"><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-extrabold leading-tight block" style={{ color: "#ffffff", fontFamily: t.font }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed block mt-4" style={{ color: "#aaaaaa", fontFamily: t.font }} /><div className="mt-7 flex items-center gap-3"><button className="px-7 py-3 rounded-lg text-sm font-bold shadow-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} /></button><span className="text-xs" style={{ color: "#555" }}>No code required</span></div></div><div className="mx-6 border-t border-gray-800" /><div className="px-6 py-4 text-center"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} /></div></div>); }
// // function LayoutMinimal({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-8 py-5 border-b border-gray-100"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-[0.3em] uppercase" style={{ color: t.logoColor }} /><span className="text-xs font-medium text-gray-400 uppercase tracking-widest"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-medium text-gray-400" /></span></div><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 220 }} /><div className="px-8 py-7"><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-xs font-semibold uppercase tracking-widest block" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-black leading-tight block mt-2" style={{ color: "#111" }} /><div className="h-0.5 w-12 mt-4 mb-4" style={{ backgroundColor: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-600 block" style={{ fontFamily: t.font }} /><button className="mt-6 px-6 py-3 text-sm font-bold rounded-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div><div className="px-8 py-4 border-t border-gray-100 text-center"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" /></div></div>); }
// // function LayoutEvent({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="relative"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 200 }} /><div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "linear-gradient(to bottom, rgba(30,27,75,0.5), rgba(30,27,75,0.9))" }}><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ color: t.accentColor, border: `1px solid ${t.accentColor}` }} /><Editable value={t.logo} onChange={upd("logo")} tag="h1" className="text-2xl font-black text-center tracking-wide" style={{ color: "#fff" }} /></div></div><div className="px-8 py-7 text-center"><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold" style={{ color: "#ffffff" }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed mt-4 block" style={{ color: "#aaaaaa", fontFamily: t.font }} /><button className="mt-6 px-8 py-3 rounded-full text-sm font-bold" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div><div className="px-6 py-4 border-t text-center" style={{ borderColor: "#ffffff11" }}><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} /></div></div>); }
// // function LayoutPets({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-6 py-4 border-b border-gray-200"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-bold" style={{ color: t.logoColor }} /><Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-500 underline" /></div><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 240 }} /><div className="px-6 py-7"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight mt-2" style={{ color: "#2c2c2c" }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold mt-1 block" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-base leading-relaxed text-gray-700 mt-4 whitespace-pre-wrap" style={{ fontFamily: t.font }} /><div className="mt-7"><button className="px-6 py-3 rounded-lg text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div></div><div className="px-6 py-5 border-t border-gray-200 text-center text-xs text-gray-500"><Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" /></div></div>); }
// // function LayoutHalloween({ t, upd }) { const updateProduct = (index, field, value) => { const newProducts = [...t.products]; newProducts[index] = { ...newProducts[index], [field]: value }; upd("products")(newProducts); }; return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex justify-end px-6 pt-4"><Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-400 underline" /></div>{t.headerImg && (<div className="px-4 mt-2"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 200 }} /></div>)}<div className="px-6 text-center mt-6"><Editable value={t.scaryText} onChange={upd("scaryText")} tag="div" className="text-4xl font-black uppercase leading-tight" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-2"><Editable value={t.forOneNight} onChange={upd("forOneNight")} tag="div" className="text-sm font-semibold uppercase tracking-wider" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-6"><Editable value={t.year} onChange={upd("year")} tag="div" className="text-lg font-bold text-white" /><Editable value={t.date} onChange={upd("date")} tag="div" className="text-2xl font-black" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-4"><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-300" style={{ fontFamily: t.font }} /></div><div className="px-6 text-center mt-6"><button className="px-6 py-2 rounded-full text-sm font-bold border-2 bg-transparent transition hover:bg-opacity-10 hover:bg-white" style={{ borderColor: t.accentColor, color: t.accentColor }}><Editable value={t.reminderButton} onChange={upd("reminderButton")} style={{ color: t.accentColor }} /></button></div><div className="px-6 mt-8 space-y-4">{t.products.map((product, idx) => (<div key={idx} className="bg-gray-900 rounded-xl p-4 flex justify-between items-center"><div className="flex-1"><Editable value={product.name} onChange={(val) => updateProduct(idx, "name", val)} tag="div" className="text-lg font-bold text-white" /><Editable value={product.delivery} onChange={(val) => updateProduct(idx, "delivery", val)} className="text-xs text-gray-400" /></div><div><Editable value={product.price} onChange={(val) => updateProduct(idx, "price", val)} tag="div" className="text-xl font-black" style={{ color: t.accentColor }} /></div></div>))}</div><div className="px-6 text-center mt-6"><button className="px-6 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: t.accentColor, color: "#000000" }}><Editable value={t.dealsButton} onChange={upd("dealsButton")} style={{ color: "#000000" }} /></button></div><div className="px-6 py-6 mt-6 border-t border-gray-800 text-center text-xs text-gray-500"><Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" /></div></div>); }

// // const LAYOUT_COMPONENTS = { botanical: LayoutBotanical, darkpromo: LayoutDarkPromo, minimal: LayoutMinimal, event: LayoutEvent, pets: LayoutPets, halloween: LayoutHalloween };

// // function StylePanel({ t, upd }) { const isHalloween = t.layout === "halloween"; return (<div className="space-y-5 text-sm"><div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Font</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={t.font} onChange={(e) => upd("font")(e.target.value)}>{FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}</select></div>{[{ key: "bgColor", label: "Background" }, { key: "accentColor", label: "Accent color" }].map(({ key, label }) => (<div key={key} className="flex items-center justify-between"><label className="text-sm text-gray-600">{label}</label><input type="color" value={t[key]} onChange={(e) => upd(key)(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div>))}{!isHalloween && (<><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Logo color</label><input type="color" value={t.logoColor || "#000000"} onChange={(e) => upd("logoColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Button bg</label><input type="color" value={t.buttonColor || "#000000"} onChange={(e) => upd("buttonColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Button text</label><input type="color" value={t.buttonTextColor || "#ffffff"} onChange={(e) => upd("buttonTextColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div></>)}</div>); }

// // function NewTemplateModal({ onAdd, onClose }) { const [name, setName] = useState("My Template"); const [preset, setPreset] = useState("botanical"); return (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"><h2 className="text-lg font-bold text-gray-800 mb-4">Add New Template</h2><div className="space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Template name</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} /></div><div><label className="text-sm font-medium text-gray-600 block mb-2">Start from preset</label><div className="grid grid-cols-2 gap-2">{Object.entries(PRESETS).map(([key, p]) => (<button key={key} onClick={() => setPreset(key)} className={`border-2 rounded-xl p-3 text-left transition ${preset === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}><div className="h-10 rounded-lg mb-2" style={{ backgroundColor: p.bgColor, border: "1px solid #ddd" }} /><p className="text-xs font-semibold text-gray-700">{p.name}</p></button>))}</div></div></div><div className="flex gap-3 mt-6"><button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button><button onClick={() => { onAdd({ id: uid(), ...PRESETS[preset], name: name || PRESETS[preset].name }); onClose(); }} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700">Create Template</button></div></div></div>); }

// // // ─── Main App with single template mode (hides sidebar) ──────────────────────
// // export default function EmailBuilder() {
// //   const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
// //   const [activeId, setActiveId] = useState(1);
// //   const [showModal, setShowModal] = useState(false);
// //   const [renamingId, setRenamingId] = useState(null);
// //   const [renameVal, setRenameVal] = useState("");
// //   const [activePanel, setActivePanel] = useState("style");
// //   const [isSingleMode, setIsSingleMode] = useState(false);

// //   // Read query parameter to determine single mode and auto-select template
// //   useEffect(() => {
// //     const params = new URLSearchParams(window.location.search);
// //     const templateParam = params.get("template");
// //     if (templateParam) {
// //       const mapping = {
// //         botanical: 1,
// //         darkpromo: 2,
// //         minimal: 3,
// //         event: 4,
// //         pets: 5,
// //         halloween: 6,
// //       };
// //       const targetId = mapping[templateParam];
// //       if (targetId && templates.find(t => t.id === targetId)) {
// //         setActiveId(targetId);
// //         setIsSingleMode(true); // Hide sidebar, disable template switching
// //       }
// //     } else {
// //       setIsSingleMode(false);
// //     }
// //   }, [templates]);

// //   const active = templates.find((t) => t.id === activeId);
// //   const updateActive = useCallback((key) => (val) => { setTemplates((ts) => ts.map((t) => (t.id === activeId ? { ...t, [key]: val } : t))); }, [activeId]);

// //   // In single mode, these actions are disabled/not rendered
// //   const addTemplate = (tpl) => { if (!isSingleMode) { setTemplates((ts) => [...ts, tpl]); setActiveId(tpl.id); } };
// //   const duplicate = (id) => { if (!isSingleMode) { const src = templates.find((t) => t.id === id); const copy = { ...src, id: uid(), name: src.name + " (copy)" }; setTemplates((ts) => [...ts, copy]); setActiveId(copy.id); } };
// //   const remove = (id) => { if (!isSingleMode && templates.length > 1) { const next = templates.find((t) => t.id !== id); setTemplates((ts) => ts.filter((t) => t.id !== id)); if (activeId === id) setActiveId(next.id); } };
// //   const startRename = (t) => { if (!isSingleMode) { setRenamingId(t.id); setRenameVal(t.name); } };
// //   const commitRename = () => { if (!isSingleMode) { setTemplates((ts) => ts.map((t) => (t.id === renamingId ? { ...t, name: renameVal } : t))); setRenamingId(null); } };

// //   const LayoutComponent = active ? LAYOUT_COMPONENTS[active.layout] : null;
// //   const fontLink = "https://fonts.googleapis.com/css2?family=Inter&family=Playfair+Display:wght@700;900&family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;600;700;900&family=Lato:wght@400;700&family=Roboto:wght@400;700&display=swap";

// //   return (
// //     <>
// //       <link rel="stylesheet" href={fontLink} />
// //       {!isSingleMode && showModal && <NewTemplateModal onAdd={addTemplate} onClose={() => setShowModal(false)} />}
// //       <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
// //         <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0">
// //           <div className="flex items-center gap-3">
// //             <span className="text-xl font-black text-blue-600">✉ MailCraft</span>
// //             <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full hidden sm:block">
// //               {isSingleMode ? "Single Template" : "Template Builder"}
// //             </span>
// //           </div>
// //           <div className="flex gap-2">
// //             <button className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "style" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`} onClick={() => setActivePanel("style")}>Style</button>
// //             <button className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "preview" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`} onClick={() => setActivePanel("preview")}>Preview</button>
// //             <button className="text-xs bg-blue-600 text-white rounded-lg px-4 py-1.5 font-semibold hover:bg-blue-700">Save &amp; Export</button>
// //           </div>
// //         </div>
// //         <div className="flex flex-1 overflow-hidden">
// //           {/* Left sidebar - hidden in single mode */}
// //           {!isSingleMode && (
// //             <div className="w-52 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto">
// //               <div className="px-3 pt-4 pb-2 flex items-center justify-between">
// //                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Templates</span>
// //                 <button onClick={() => setShowModal(true)} className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-base leading-none hover:bg-blue-700" title="Add template">+</button>
// //               </div>
// //               <div className="flex-1 px-2 pb-4 space-y-1">
// //                 {templates.map((t) => (
// //                   <div key={t.id} onClick={() => setActiveId(t.id)} className={`group relative rounded-xl cursor-pointer border-2 transition p-2 ${activeId === t.id ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200 hover:bg-gray-50"}`}>
// //                     <div className="w-full h-12 rounded-lg mb-1.5 flex items-end overflow-hidden" style={{ backgroundColor: t.bgColor }}>
// //                       <div className="w-full px-2 pb-1.5">
// //                         <div className="h-1.5 rounded-full w-3/4 opacity-60" style={{ backgroundColor: t.accentColor }} />
// //                         <div className="h-1 rounded-full w-1/2 mt-1 opacity-30" style={{ backgroundColor: t.accentColor }} />
// //                       </div>
// //                     </div>
// //                     {renamingId === t.id ? (
// //                       <input autoFocus className="text-xs w-full border border-blue-300 rounded px-1 py-0.5 outline-none" value={renameVal} onChange={(e) => setRenameVal(e.target.value)} onBlur={commitRename} onKeyDown={(e) => e.key === "Enter" && commitRename()} onClick={(e) => e.stopPropagation()} />
// //                     ) : (
// //                       <p className="text-xs font-semibold text-gray-700 truncate">{t.name}</p>
// //                     )}
// //                     <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition" onClick={(e) => e.stopPropagation()}>
// //                       <button onClick={() => startRename(t)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50">✏️</button>
// //                       <button onClick={() => duplicate(t.id)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50">⧉</button>
// //                       {templates.length > 1 && (
// //                         <button onClick={() => remove(t.id)} className="w-5 h-5 rounded bg-white border border-red-200 text-red-400 flex items-center justify-center text-xs hover:bg-red-50">✕</button>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //           {/* Canvas area - takes full width when sidebar hidden */}
// //           <div className={`flex-1 overflow-y-auto p-6 ${isSingleMode ? "w-full" : ""}`}>
// //             {active && LayoutComponent && <LayoutComponent key={active.id} t={active} upd={updateActive} />}
// //             <p className="text-center text-xs text-gray-400 mt-4">Click any text in the preview to edit it · Hover image to replace</p>
// //           </div>
// //           {/* Style panel - always visible on right */}
// //           {activePanel === "style" && (
// //             <div className="w-56 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 p-4">
// //               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Style</p>
// //               {active && <StylePanel t={active} upd={updateActive} />}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }



// import { useState, useRef, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // ─── Google Fonts ─────────────────────────────────────────────────────────────
// const FONTS = [
//   { label: "Inter", value: "'Inter', sans-serif" },
//   { label: "Playfair Display", value: "'Playfair Display', serif" },
//   { label: "Poppins", value: "'Poppins', sans-serif" },
//   { label: "Merriweather", value: "'Merriweather', serif" },
//   { label: "Montserrat", value: "'Montserrat', sans-serif" },
//   { label: "Lato", value: "'Lato', sans-serif" },
//   { label: "Roboto", value: "'Roboto', sans-serif" },
//   { label: "Georgia", value: "Georgia, serif" },
// ];

// // ─── Base template presets ────────────────────────────────────────────────────
// const PRESETS = {
//   botanical: { layout: "botanical", name: "Botanical Newsletter", font: "'Inter', sans-serif", logo: "🌿 URBAN LEAF", logoColor: "#2d5a27", bgColor: "#f5f0e8", accentColor: "#2d5a27", buttonColor: "#2d5a27", buttonTextColor: "#ffffff", buttonText: "Shop Now", headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80", tag: "New!", title: "Spring Collection is Here", subtitle: "From 20€", body: "Explore our hand-picked seasonal plants that bring life, colour and calm into every corner of your home.", footerText: "© 2026 Urban Leaf · Unsubscribe" },
//   darkpromo: { layout: "darkpromo", name: "Dark Promo", font: "'Poppins', sans-serif", logo: "⚡ FLASHBOLT", logoColor: "#ffffff", bgColor: "#0f0f1a", accentColor: "#f5a623", buttonColor: "#f5a623", buttonTextColor: "#0f0f1a", buttonText: "Grab the Deal", headerImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80", tag: "Limited Offer", title: "50% Off Everything Today", subtitle: "Ends midnight", body: "This is your one chance to stock up on our best-selling tech accessories at half the usual price. No code needed.", footerText: "© 2026 Flashbolt · Manage preferences" },
//   minimal: { layout: "minimal", name: "Minimal Clean", font: "'Inter', sans-serif", logo: "BLOOM", logoColor: "#111", bgColor: "#ffffff", accentColor: "#e63946", buttonColor: "#111111", buttonTextColor: "#ffffff", buttonText: "Read More", headerImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tag: "Story", title: "This Week in Design", subtitle: "Issue #42 · June 2026", body: "A curated roundup of the best design work, tools, and ideas from across the web — delivered every Wednesday.", footerText: "© 2026 Bloom · Unsubscribe · View in browser" },
//   event: { layout: "event", name: "Event Invite", font: "'Montserrat', sans-serif", logo: "🎤 DEVCONF", logoColor: "#ffffff", bgColor: "#1e1b4b", accentColor: "#a78bfa", buttonColor: "#a78bfa", buttonTextColor: "#1e1b4b", buttonText: "Reserve My Spot", headerImg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", tag: "You're Invited", title: "DevConf 2026 — Join Us", subtitle: "July 18–20 · San Francisco", body: "Three days of talks, workshops, and networking with the brightest minds in software. Early bird tickets available now.", footerText: "© 2026 DevConf · Unsubscribe" },
//   pets: { layout: "pets", name: "Pets Rescue", font: "'Inter', sans-serif", logo: "FriendswithPaw", logoColor: "#2d5a27", bgColor: "#fef9f0", accentColor: "#e67e22", buttonColor: "#2d5a27", buttonTextColor: "#ffffff", buttonText: "Donate Now", headerImg: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80", tag: "Thank you", title: "Your kindness saved 37 cats and dogs", subtitle: "This year, thanks to you", body: "Dear Jane,\n\nYour generosity and caring spirit have made a tremendous difference. Because of you, 37 cats and dogs found forever homes and received urgent medical care.\n\nWe couldn't have done it without you.", footerText: "FriendswithPaw\n2/260, 6th cross street, bharathidasan nagar, sharamugapuram\n600099 Chennai\ncontact@friendswithpaw.org\n\nPrivacy • Imprint • Unsubscribe", viewInBrowserText: "View in browser" },
//   halloween: { layout: "halloween", name: "Halloween Sale", font: "'Montserrat', sans-serif", bgColor: "#000000", accentColor: "#ff6600", viewInBrowserText: "View in browser", scaryText: "SCARY LOW PRICES", forOneNight: "FOR ONE NIGHT ONLY", year: "2021", date: "31st October", body: "Snatch your piece for the best price with our **24-hour limited Halloween megasale**!", reminderButton: "GET A REMINDER", dealsButton: "Check out all deals →", headerImg: "https://images.unsplash.com/photo-1533400908194-0b2ecc2674fb?w=600&q=80", products: [{ name: "iPhone", price: "480€", delivery: "Incl. free delivery" }, { name: "aPhone", price: "585€", delivery: "Incl. free delivery" }, { name: "uPhone", price: "530€", delivery: "Incl. free delivery" }], footerText: "Wynsync technologies\n2/260, 6th cross street, bharathidasan nagar, shanmugapuram\n600099 Chennai\nTel.: 123 4567 8900\nEmail: jane@yourcompanyname.com\nwww.yourcompany.com\n\nData protection\nImprint\nUnsubscribe" },
// };

// let idCounter = 10;
// const uid = () => ++idCounter;

// const INITIAL_TEMPLATES = [
//   { id: 1, ...PRESETS.botanical },
//   { id: 2, ...PRESETS.darkpromo },
//   { id: 3, ...PRESETS.minimal },
//   { id: 4, ...PRESETS.event },
//   { id: 5, ...PRESETS.pets },
//   { id: 6, ...PRESETS.halloween },
// ];

// // ─── Editable text component ─────────────────────────────────────────────────
// function Editable({ value, onChange, tag: Tag = "span", className = "", style = {}, multiline = false }) {
//   const [editing, setEditing] = useState(false);
//   const shared = { className: `outline-none border-0 bg-transparent w-full ${className}`, style, value, onChange: (e) => onChange(e.target.value), onBlur: () => setEditing(false), autoFocus: true };
//   if (!editing) return <Tag className={`cursor-text hover:ring-2 hover:ring-blue-400 hover:ring-offset-1 rounded transition-all ${className}`} style={style} title="Click to edit" onClick={() => setEditing(true)}>{value}</Tag>;
//   return multiline ? <textarea {...shared} rows={3} className={shared.className + " resize-none"} /> : <input {...shared} />;
// }

// // ─── Editable image with upload / URL ─────────────────────────────────────────
// function EditableImg({ src, onSrcChange, className = "", style = {} }) {
//   const fileRef = useRef();
//   const [urlMode, setUrlMode] = useState(false);
//   const [urlVal, setUrlVal] = useState("");
//   const handleFile = (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => onSrcChange(ev.target.result); r.readAsDataURL(f); };
//   return (<div className="relative group"><img src={src} alt="" className={`w-full object-cover ${className}`} style={style} /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center rounded-lg"><button onClick={() => fileRef.current.click()} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">📁 Upload image</button><button onClick={() => setUrlMode(true)} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">🔗 Paste URL</button></div><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />{urlMode && (<div className="absolute inset-0 bg-black/75 flex flex-col gap-2 items-center justify-center rounded-lg p-4 z-10"><input autoFocus className="w-full text-sm px-3 py-1.5 rounded-lg border border-gray-300" placeholder="https://…" value={urlVal} onChange={(e) => setUrlVal(e.target.value)} /><div className="flex gap-2"><button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => { if (urlVal) onSrcChange(urlVal); setUrlMode(false); setUrlVal(""); }}>Apply</button><button className="text-xs bg-gray-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => setUrlMode(false)}>Cancel</button></div></div>)}</div>);
// }

// // ─── Layout components ──────────────────────────────────────────────────────
// function LayoutBotanical({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-6 py-4"><Editable value={t.logo} onChange={upd("logo")} className="text-2xl font-black tracking-tight" style={{ color: t.logoColor }} /><div className="flex gap-1.5 text-lg">{"●○●○".split("").map((c, i) => <span key={i}>{c}</span>)}</div></div><div className="px-4"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 280 }} /></div><div className="px-6 py-5"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight block mt-1" style={{ color: "#1a1a1a", fontFamily: t.font }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-700 block mt-3" style={{ fontFamily: t.font }} /><div className="mt-6"><button className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} /></button></div></div><div className="px-6 py-4 text-center text-xs text-gray-400 border-t border-gray-200"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" /></div></div>); }
// function LayoutDarkPromo({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="h-1.5" style={{ backgroundColor: t.accentColor }} /><div className="flex items-center justify-between px-6 py-5"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-widest uppercase" style={{ color: t.logoColor }} /><span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: t.accentColor + "22", color: t.accentColor }}><Editable value={t.tag} onChange={upd("tag")} style={{ color: t.accentColor }} /></span></div><div className="px-4"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 240 }} /></div><div className="px-6 py-6"><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-extrabold leading-tight block" style={{ color: "#ffffff", fontFamily: t.font }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed block mt-4" style={{ color: "#aaaaaa", fontFamily: t.font }} /><div className="mt-7 flex items-center gap-3"><button className="px-7 py-3 rounded-lg text-sm font-bold shadow-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} /></button><span className="text-xs" style={{ color: "#555" }}>No code required</span></div></div><div className="mx-6 border-t border-gray-800" /><div className="px-6 py-4 text-center"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} /></div></div>); }
// function LayoutMinimal({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-8 py-5 border-b border-gray-100"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-[0.3em] uppercase" style={{ color: t.logoColor }} /><span className="text-xs font-medium text-gray-400 uppercase tracking-widest"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-medium text-gray-400" /></span></div><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 220 }} /><div className="px-8 py-7"><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-xs font-semibold uppercase tracking-widest block" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-black leading-tight block mt-2" style={{ color: "#111" }} /><div className="h-0.5 w-12 mt-4 mb-4" style={{ backgroundColor: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-600 block" style={{ fontFamily: t.font }} /><button className="mt-6 px-6 py-3 text-sm font-bold rounded-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div><div className="px-8 py-4 border-t border-gray-100 text-center"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" /></div></div>); }
// function LayoutEvent({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="relative"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 200 }} /><div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "linear-gradient(to bottom, rgba(30,27,75,0.5), rgba(30,27,75,0.9))" }}><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ color: t.accentColor, border: `1px solid ${t.accentColor}` }} /><Editable value={t.logo} onChange={upd("logo")} tag="h1" className="text-2xl font-black text-center tracking-wide" style={{ color: "#fff" }} /></div></div><div className="px-8 py-7 text-center"><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold" style={{ color: "#ffffff" }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed mt-4 block" style={{ color: "#aaaaaa", fontFamily: t.font }} /><button className="mt-6 px-8 py-3 rounded-full text-sm font-bold" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div><div className="px-6 py-4 border-t text-center" style={{ borderColor: "#ffffff11" }}><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} /></div></div>); }
// function LayoutPets({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-6 py-4 border-b border-gray-200"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-bold" style={{ color: t.logoColor }} /><Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-500 underline" /></div><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 240 }} /><div className="px-6 py-7"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight mt-2" style={{ color: "#2c2c2c" }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold mt-1 block" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-base leading-relaxed text-gray-700 mt-4 whitespace-pre-wrap" style={{ fontFamily: t.font }} /><div className="mt-7"><button className="px-6 py-3 rounded-lg text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div></div><div className="px-6 py-5 border-t border-gray-200 text-center text-xs text-gray-500"><Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" /></div></div>); }
// function LayoutHalloween({ t, upd }) { const updateProduct = (index, field, value) => { const newProducts = [...t.products]; newProducts[index] = { ...newProducts[index], [field]: value }; upd("products")(newProducts); }; return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex justify-end px-6 pt-4"><Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-400 underline" /></div>{t.headerImg && (<div className="px-4 mt-2"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 200 }} /></div>)}<div className="px-6 text-center mt-6"><Editable value={t.scaryText} onChange={upd("scaryText")} tag="div" className="text-4xl font-black uppercase leading-tight" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-2"><Editable value={t.forOneNight} onChange={upd("forOneNight")} tag="div" className="text-sm font-semibold uppercase tracking-wider" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-6"><Editable value={t.year} onChange={upd("year")} tag="div" className="text-lg font-bold text-white" /><Editable value={t.date} onChange={upd("date")} tag="div" className="text-2xl font-black" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-4"><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-300" style={{ fontFamily: t.font }} /></div><div className="px-6 text-center mt-6"><button className="px-6 py-2 rounded-full text-sm font-bold border-2 bg-transparent transition hover:bg-opacity-10 hover:bg-white" style={{ borderColor: t.accentColor, color: t.accentColor }}><Editable value={t.reminderButton} onChange={upd("reminderButton")} style={{ color: t.accentColor }} /></button></div><div className="px-6 mt-8 space-y-4">{t.products.map((product, idx) => (<div key={idx} className="bg-gray-900 rounded-xl p-4 flex justify-between items-center"><div className="flex-1"><Editable value={product.name} onChange={(val) => updateProduct(idx, "name", val)} tag="div" className="text-lg font-bold text-white" /><Editable value={product.delivery} onChange={(val) => updateProduct(idx, "delivery", val)} className="text-xs text-gray-400" /></div><div><Editable value={product.price} onChange={(val) => updateProduct(idx, "price", val)} tag="div" className="text-xl font-black" style={{ color: t.accentColor }} /></div></div>))}</div><div className="px-6 text-center mt-6"><button className="px-6 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: t.accentColor, color: "#000000" }}><Editable value={t.dealsButton} onChange={upd("dealsButton")} style={{ color: "#000000" }} /></button></div><div className="px-6 py-6 mt-6 border-t border-gray-800 text-center text-xs text-gray-500"><Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" /></div></div>); }

// const LAYOUT_COMPONENTS = { botanical: LayoutBotanical, darkpromo: LayoutDarkPromo, minimal: LayoutMinimal, event: LayoutEvent, pets: LayoutPets, halloween: LayoutHalloween };

// function StylePanel({ t, upd }) { const isHalloween = t.layout === "halloween"; return (<div className="space-y-5 text-sm"><div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Font</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={t.font} onChange={(e) => upd("font")(e.target.value)}>{FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}</select></div>{[{ key: "bgColor", label: "Background" }, { key: "accentColor", label: "Accent color" }].map(({ key, label }) => (<div key={key} className="flex items-center justify-between"><label className="text-sm text-gray-600">{label}</label><input type="color" value={t[key]} onChange={(e) => upd(key)(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div>))}{!isHalloween && (<><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Logo color</label><input type="color" value={t.logoColor || "#000000"} onChange={(e) => upd("logoColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Button bg</label><input type="color" value={t.buttonColor || "#000000"} onChange={(e) => upd("buttonColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Button text</label><input type="color" value={t.buttonTextColor || "#ffffff"} onChange={(e) => upd("buttonTextColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div></>)}</div>); }

// function NewTemplateModal({ onAdd, onClose }) { const [name, setName] = useState("My Template"); const [preset, setPreset] = useState("botanical"); return (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"><h2 className="text-lg font-bold text-gray-800 mb-4">Add New Template</h2><div className="space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Template name</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} /></div><div><label className="text-sm font-medium text-gray-600 block mb-2">Start from preset</label><div className="grid grid-cols-2 gap-2">{Object.entries(PRESETS).map(([key, p]) => (<button key={key} onClick={() => setPreset(key)} className={`border-2 rounded-xl p-3 text-left transition ${preset === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}><div className="h-10 rounded-lg mb-2" style={{ backgroundColor: p.bgColor, border: "1px solid #ddd" }} /><p className="text-xs font-semibold text-gray-700">{p.name}</p></button>))}</div></div></div><div className="flex gap-3 mt-6"><button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button><button onClick={() => { onAdd({ id: uid(), ...PRESETS[preset], name: name || PRESETS[preset].name }); onClose(); }} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700">Create Template</button></div></div></div>); }

// // ─── Helper: generate HTML string from template data ─────────────────────────
// function generateHTML(template) {
//   return `<!DOCTYPE html>
// <html>
// <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${template.name || "Email Template"}</title>
// <style>
//   body { margin:0; padding:0; background-color:#f0f0f0; font-family:${template.font || "Arial, sans-serif"}; }
//   .container { max-width:560px; margin:0 auto; background-color:${template.bgColor || "#ffffff"}; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px -5px rgba(0,0,0,0.1); }
//   .header { padding:20px 24px; display:flex; justify-content:space-between; align-items:center; }
//   .logo { font-size:24px; font-weight:900; color:${template.logoColor || "#000"}; }
//   .img-wrapper { padding:0 16px; }
//   .img-wrapper img { width:100%; border-radius:12px; height:auto; }
//   .content { padding:24px; }
//   .tag { font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; color:${template.accentColor || "#000"}; }
//   .title { font-size:24px; font-weight:800; margin-top:8px; color:#1a1a1a; }
//   .subtitle { font-size:14px; font-weight:600; margin-top:4px; color:${template.accentColor || "#000"}; }
//   .body { font-size:14px; line-height:1.6; margin-top:16px; color:#4a4a4a; }
//   .button { display:inline-block; margin-top:24px; background-color:${template.buttonColor || "#000"}; color:${template.buttonTextColor || "#fff"}; padding:12px 24px; border-radius:999px; text-decoration:none; font-weight:bold; font-size:14px; }
//   .footer { padding:16px 24px; text-align:center; font-size:12px; color:#9ca3af; border-top:1px solid #e5e7eb; }
// </style>
// </head>
// <body style="margin:0;padding:20px;background:#f0f0f0;">
// <div class="container">
//   <div class="header"><span class="logo">${template.logo || ""}</span><span>●●●●</span></div>
//   <div class="img-wrapper"><img src="${template.headerImg || ""}" alt="header"></div>
//   <div class="content">
//     <div class="tag">${template.tag || ""}</div>
//     <div class="title">${template.title || ""}</div>
//     <div class="subtitle">${template.subtitle || ""}</div>
//     <div class="body">${(template.body || "").replace(/\n/g, "<br>")}</div>
//     <a href="#" class="button">${template.buttonText || "Button"}</a>
//   </div>
//   <div class="footer">${(template.footerText || "").replace(/\n/g, "<br>")}</div>
// </div>
// </body>
// </html>`;
// }

// // ─── Main App with Save, Export & Back Arrow ──────────────────────────────────
// const API = "https://wynreach-backend.onrender.com/api/templates";

// export default function EmailBuilder({ templateId: initialTemplateId, onBack }) {
//   const navigate = useNavigate();
//   const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
//   const [activeId, setActiveId] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [renamingId, setRenamingId] = useState(null);
//   const [renameVal, setRenameVal] = useState("");
//   const [activePanel, setActivePanel] = useState("style");
//   const [isSingleMode, setIsSingleMode] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [toast, setToast] = useState(null);

//   // Load template if editing or via URL param
//   useEffect(() => {
//     if (initialTemplateId && !String(initialTemplateId).startsWith("tpl-")) {
//       fetch(`${API}/${initialTemplateId}`)
//         .then(r => r.json())
//         .then(data => {
//           if (data && data.content) {
//             try {
//               const loaded = JSON.parse(data.content);
//               const newTemplate = { id: data.id, name: data.name, layout: loaded.layout || "botanical", ...loaded };
//               setTemplates([newTemplate]);
//               setActiveId(newTemplate.id);
//               setIsSingleMode(true);
//             } catch(e) { console.error(e); }
//           }
//         })
//         .catch(console.error);
//     } else {
//       const params = new URLSearchParams(window.location.search);
//       const templateParam = params.get("template");
//       if (templateParam) {
//         const mapping = { botanical:1, darkpromo:2, minimal:3, event:4, pets:5, halloween:6 };
//         const targetId = mapping[templateParam];
//         if (targetId && templates.find(t => t.id === targetId)) {
//           setActiveId(targetId);
//           setIsSingleMode(true);
//         }
//       } else {
//         setIsSingleMode(false);
//       }
//     }
//   }, [initialTemplateId]);

//   const active = templates.find((t) => t.id === activeId);
//   const updateActive = useCallback((key) => (val) => {
//     setTemplates((ts) => ts.map((t) => (t.id === activeId ? { ...t, [key]: val } : t)));
//   }, [activeId]);

//   const handleSave = async () => {
//     if (!active) return;
//     setSaving(true);
//     try {
//       const payload = {
//         name: active.name,
//         type: "email",
//         category: "Marketing",
//         content: JSON.stringify(active),
//         variables: [],
//         status: "active",
//       };
//       let url = `${API}/`;
//       let method = "POST";
//       if (initialTemplateId && !String(initialTemplateId).startsWith("tpl-")) {
//         url = `${API}/${initialTemplateId}`;
//         method = "PATCH";
//       }
//       const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
//       if (res.ok) {
//         const saved = await res.json();
//         showToast(`✅ Template "${active.name}" saved!`, "success");
//         if (method === "POST" && saved.id) {
//           setTemplates(ts => ts.map(t => t.id === active.id ? { ...t, id: saved.id } : t));
//           setActiveId(saved.id);
//         }
//       } else throw new Error("Save failed");
//     } catch (err) {
//       showToast("❌ Save failed: " + err.message, "error");
//     } finally { setSaving(false); }
//   };

//   const handleExport = () => {
//     if (!active) return;
//     const html = generateHTML(active);
//     const blob = new Blob([html], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${active.name || "template"}.html`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//     showToast(`📄 Exported as ${a.download}`, "success");
//   };

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   // ✅ Back button: if onBack prop exists, call it; otherwise navigate to templates list
//   const handleBack = () => {
//     if (onBack) {
//       onBack();
//     } else {
//       navigate("/templates");
//     }
//   };

//   const addTemplate = (tpl) => { if (!isSingleMode) { setTemplates((ts) => [...ts, tpl]); setActiveId(tpl.id); } };
//   const duplicate = (id) => { if (!isSingleMode) { const src = templates.find((t) => t.id === id); const copy = { ...src, id: uid(), name: src.name + " (copy)" }; setTemplates((ts) => [...ts, copy]); setActiveId(copy.id); } };
//   const remove = (id) => { if (!isSingleMode && templates.length > 1) { const next = templates.find((t) => t.id !== id); setTemplates((ts) => ts.filter((t) => t.id !== id)); if (activeId === id) setActiveId(next.id); } };
//   const startRename = (t) => { if (!isSingleMode) { setRenamingId(t.id); setRenameVal(t.name); } };
//   const commitRename = () => { if (!isSingleMode) { setTemplates((ts) => ts.map((t) => (t.id === renamingId ? { ...t, name: renameVal } : t))); setRenamingId(null); } };
//   const LayoutComponent = active ? LAYOUT_COMPONENTS[active.layout] : null;
//   const fontLink = "https://fonts.googleapis.com/css2?family=Inter&family=Playfair+Display:wght@700;900&family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;600;700;900&family=Lato:wght@400;700&family=Roboto:wght@400;700&display=swap";

//   return (
//     <>
//       <link rel="stylesheet" href={fontLink} />
//       {!isSingleMode && showModal && <NewTemplateModal onAdd={addTemplate} onClose={() => setShowModal(false)} />}
//       <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
//         <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0">
//           <div className="flex items-center gap-3">
//             {/* Back arrow button */}
//             <button
//               onClick={handleBack}
//               className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
//               aria-label="Go back to templates"
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
//             <span className="text-xl font-black text-blue-600">✉ MailCraft</span>
//             <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full hidden sm:block">
//               {isSingleMode ? "Single Template" : "Template Builder"}
//             </span>
//           </div>
//           <div className="flex gap-2">
//             <button className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "style" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`} onClick={() => setActivePanel("style")}>Style</button>
//             <button className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "preview" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`} onClick={() => setActivePanel("preview")}>Preview</button>
//             <button onClick={handleSave} disabled={saving} className="text-xs bg-emerald-600 text-white rounded-lg px-4 py-1.5 font-semibold hover:bg-emerald-700 disabled:opacity-50">
//               {saving ? "Saving..." : "💾 Save"}
//             </button>
//             <button onClick={handleExport} className="text-xs bg-blue-600 text-white rounded-lg px-4 py-1.5 font-semibold hover:bg-blue-700">
//               📎 Export
//             </button>
//           </div>
//         </div>
//         <div className="flex flex-1 overflow-hidden">
//           {!isSingleMode && (
//             <div className="w-52 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto">
//               <div className="px-3 pt-4 pb-2 flex items-center justify-between">
//                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Templates</span>
//                 <button onClick={() => setShowModal(true)} className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-base leading-none hover:bg-blue-700">+</button>
//               </div>
//               <div className="flex-1 px-2 pb-4 space-y-1">
//                 {templates.map((t) => (
//                   <div key={t.id} onClick={() => setActiveId(t.id)} className={`group relative rounded-xl cursor-pointer border-2 transition p-2 ${activeId === t.id ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200 hover:bg-gray-50"}`}>
//                     <div className="w-full h-12 rounded-lg mb-1.5 flex items-end overflow-hidden" style={{ backgroundColor: t.bgColor }}>
//                       <div className="w-full px-2 pb-1.5"><div className="h-1.5 rounded-full w-3/4 opacity-60" style={{ backgroundColor: t.accentColor }} /><div className="h-1 rounded-full w-1/2 mt-1 opacity-30" style={{ backgroundColor: t.accentColor }} /></div>
//                     </div>
//                     {renamingId === t.id ? (
//                       <input autoFocus className="text-xs w-full border border-blue-300 rounded px-1 py-0.5 outline-none" value={renameVal} onChange={(e) => setRenameVal(e.target.value)} onBlur={commitRename} onKeyDown={(e) => e.key === "Enter" && commitRename()} onClick={(e) => e.stopPropagation()} />
//                     ) : (
//                       <p className="text-xs font-semibold text-gray-700 truncate">{t.name}</p>
//                     )}
//                     <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition" onClick={(e) => e.stopPropagation()}>
//                       <button onClick={() => startRename(t)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50">✏️</button>
//                       <button onClick={() => duplicate(t.id)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50">⧉</button>
//                       {templates.length > 1 && <button onClick={() => remove(t.id)} className="w-5 h-5 rounded bg-white border border-red-200 text-red-400 flex items-center justify-center text-xs hover:bg-red-50">✕</button>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div className={`flex-1 overflow-y-auto p-6 ${isSingleMode ? "w-full" : ""}`}>
//             {active && LayoutComponent && <LayoutComponent key={active.id} t={active} upd={updateActive} />}
//             <p className="text-center text-xs text-gray-400 mt-4">Click any text to edit · Hover image to replace</p>
//           </div>
//           {activePanel === "style" && (
//             <div className="w-56 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 p-4">
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Style</p>
//               {active && <StylePanel t={active} upd={updateActive} />}
//             </div>
//           )}
//         </div>
//       </div>
//       {toast && (
//         <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
//           <span>{toast.type === "success" ? "✓" : "✕"}</span> {toast.message}
//           <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">×</button>
//         </div>
//       )}
//     </>
//   );
// }



// EmailBuilder.jsx – full file with AI template support
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ─── Google Fonts ─────────────────────────────────────────────────────────────
const FONTS = [
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Poppins", value: "'Poppins', sans-serif" },
  { label: "Merriweather", value: "'Merriweather', serif" },
  { label: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Lato", value: "'Lato', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
];

// ─── Base template presets ────────────────────────────────────────────────────
const PRESETS = {
  botanical: { layout: "botanical", name: "Botanical Newsletter", font: "'Inter', sans-serif", logo: "🌿 URBAN LEAF", logoColor: "#2d5a27", bgColor: "#f5f0e8", accentColor: "#2d5a27", buttonColor: "#2d5a27", buttonTextColor: "#ffffff", buttonText: "Shop Now", headerImg: "https://images.unsplash.com/photo-1490750967868-88df5691cc6e?w=600&q=80", tag: "New!", title: "Spring Collection is Here", subtitle: "From 20€", body: "Explore our hand-picked seasonal plants that bring life, colour and calm into every corner of your home.", footerText: "© 2026 Urban Leaf · Unsubscribe" },
  darkpromo: { layout: "darkpromo", name: "Dark Promo", font: "'Poppins', sans-serif", logo: "⚡ FLASHBOLT", logoColor: "#ffffff", bgColor: "#0f0f1a", accentColor: "#f5a623", buttonColor: "#f5a623", buttonTextColor: "#0f0f1a", buttonText: "Grab the Deal", headerImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80", tag: "Limited Offer", title: "50% Off Everything Today", subtitle: "Ends midnight", body: "This is your one chance to stock up on our best-selling tech accessories at half the usual price. No code needed.", footerText: "© 2026 Flashbolt · Manage preferences" },
  minimal: { layout: "minimal", name: "Minimal Clean", font: "'Inter', sans-serif", logo: "BLOOM", logoColor: "#111", bgColor: "#ffffff", accentColor: "#e63946", buttonColor: "#111111", buttonTextColor: "#ffffff", buttonText: "Read More", headerImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tag: "Story", title: "This Week in Design", subtitle: "Issue #42 · June 2026", body: "A curated roundup of the best design work, tools, and ideas from across the web — delivered every Wednesday.", footerText: "© 2026 Bloom · Unsubscribe · View in browser" },
  event: { layout: "event", name: "Event Invite", font: "'Montserrat', sans-serif", logo: "🎤 DEVCONF", logoColor: "#ffffff", bgColor: "#1e1b4b", accentColor: "#a78bfa", buttonColor: "#a78bfa", buttonTextColor: "#1e1b4b", buttonText: "Reserve My Spot", headerImg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", tag: "You're Invited", title: "DevConf 2026 — Join Us", subtitle: "July 18–20 · San Francisco", body: "Three days of talks, workshops, and networking with the brightest minds in software. Early bird tickets available now.", footerText: "© 2026 DevConf · Unsubscribe" },
  pets: { layout: "pets", name: "Pets Rescue", font: "'Inter', sans-serif", logo: "FriendswithPaw", logoColor: "#2d5a27", bgColor: "#fef9f0", accentColor: "#e67e22", buttonColor: "#2d5a27", buttonTextColor: "#ffffff", buttonText: "Donate Now", headerImg: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80", tag: "Thank you", title: "Your kindness saved 37 cats and dogs", subtitle: "This year, thanks to you", body: "Dear Jane,\n\nYour generosity and caring spirit have made a tremendous difference. Because of you, 37 cats and dogs found forever homes and received urgent medical care.\n\nWe couldn't have done it without you.", footerText: "FriendswithPaw\n2/260, 6th cross street, bharathidasan nagar, sharamugapuram\n600099 Chennai\ncontact@friendswithpaw.org\n\nPrivacy • Imprint • Unsubscribe", viewInBrowserText: "View in browser" },
  halloween: { layout: "halloween", name: "Halloween Sale", font: "'Montserrat', sans-serif", bgColor: "#000000", accentColor: "#ff6600", viewInBrowserText: "View in browser", scaryText: "SCARY LOW PRICES", forOneNight: "FOR ONE NIGHT ONLY", year: "2021", date: "31st October", body: "Snatch your piece for the best price with our **24-hour limited Halloween megasale**!", reminderButton: "GET A REMINDER", dealsButton: "Check out all deals →", headerImg: "https://images.unsplash.com/photo-1533400908194-0b2ecc2674fb?w=600&q=80", products: [{ name: "iPhone", price: "480€", delivery: "Incl. free delivery" }, { name: "aPhone", price: "585€", delivery: "Incl. free delivery" }, { name: "uPhone", price: "530€", delivery: "Incl. free delivery" }], footerText: "Wynsync technologies\n2/260, 6th cross street, bharathidasan nagar, shanmugapuram\n600099 Chennai\nTel.: 123 4567 8900\nEmail: jane@yourcompanyname.com\nwww.yourcompany.com\n\nData protection\nImprint\nUnsubscribe" },
};

let idCounter = 10;
const uid = () => ++idCounter;

const INITIAL_TEMPLATES = [
  { id: 1, ...PRESETS.botanical },
  { id: 2, ...PRESETS.darkpromo },
  { id: 3, ...PRESETS.minimal },
  { id: 4, ...PRESETS.event },
  { id: 5, ...PRESETS.pets },
  { id: 6, ...PRESETS.halloween },
];

// ─── Editable text component ─────────────────────────────────────────────────
function Editable({ value, onChange, tag: Tag = "span", className = "", style = {}, multiline = false }) {
  const [editing, setEditing] = useState(false);
  const shared = { className: `outline-none border-0 bg-transparent w-full ${className}`, style, value, onChange: (e) => onChange(e.target.value), onBlur: () => setEditing(false), autoFocus: true };
  if (!editing) return <Tag className={`cursor-text hover:ring-2 hover:ring-blue-400 hover:ring-offset-1 rounded transition-all ${className}`} style={style} title="Click to edit" onClick={() => setEditing(true)}>{value}</Tag>;
  return multiline ? <textarea {...shared} rows={3} className={shared.className + " resize-none"} /> : <input {...shared} />;
}

// ─── Editable image with upload / URL ─────────────────────────────────────────
function EditableImg({ src, onSrcChange, className = "", style = {} }) {
  const fileRef = useRef();
  const [urlMode, setUrlMode] = useState(false);
  const [urlVal, setUrlVal] = useState("");
  const handleFile = (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => onSrcChange(ev.target.result); r.readAsDataURL(f); };
  return (<div className="relative group"><img src={src} alt="" className={`w-full object-cover ${className}`} style={style} /><div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center rounded-lg"><button onClick={() => fileRef.current.click()} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">📁 Upload image</button><button onClick={() => setUrlMode(true)} className="text-xs bg-white text-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-50">🔗 Paste URL</button></div><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />{urlMode && (<div className="absolute inset-0 bg-black/75 flex flex-col gap-2 items-center justify-center rounded-lg p-4 z-10"><input autoFocus className="w-full text-sm px-3 py-1.5 rounded-lg border border-gray-300" placeholder="https://…" value={urlVal} onChange={(e) => setUrlVal(e.target.value)} /><div className="flex gap-2"><button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => { if (urlVal) onSrcChange(urlVal); setUrlMode(false); setUrlVal(""); }}>Apply</button><button className="text-xs bg-gray-500 text-white px-3 py-1.5 rounded-lg font-semibold" onClick={() => setUrlMode(false)}>Cancel</button></div></div>)}</div>);
}

// ─── Layouts (unchanged) ──────────────────────────────────────────────────────
function LayoutBotanical({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-6 py-4"><Editable value={t.logo} onChange={upd("logo")} className="text-2xl font-black tracking-tight" style={{ color: t.logoColor }} /><div className="flex gap-1.5 text-lg">{"●○●○".split("").map((c, i) => <span key={i}>{c}</span>)}</div></div><div className="px-4"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 280 }} /></div><div className="px-6 py-5"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight block mt-1" style={{ color: "#1a1a1a", fontFamily: t.font }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-700 block mt-3" style={{ fontFamily: t.font }} /><div className="mt-6"><button className="inline-block px-6 py-3 rounded-full text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} /></button></div></div><div className="px-6 py-4 text-center text-xs text-gray-400 border-t border-gray-200"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" /></div></div>); }
function LayoutDarkPromo({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="h-1.5" style={{ backgroundColor: t.accentColor }} /><div className="flex items-center justify-between px-6 py-5"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-widest uppercase" style={{ color: t.logoColor }} /><span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: t.accentColor + "22", color: t.accentColor }}><Editable value={t.tag} onChange={upd("tag")} style={{ color: t.accentColor }} /></span></div><div className="px-4"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 240 }} /></div><div className="px-6 py-6"><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-extrabold leading-tight block" style={{ color: "#ffffff", fontFamily: t.font }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed block mt-4" style={{ color: "#aaaaaa", fontFamily: t.font }} /><div className="mt-7 flex items-center gap-3"><button className="px-7 py-3 rounded-lg text-sm font-bold shadow-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} className="text-sm font-bold" style={{ color: t.buttonTextColor }} /></button><span className="text-xs" style={{ color: "#555" }}>No code required</span></div></div><div className="mx-6 border-t border-gray-800" /><div className="px-6 py-4 text-center"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} /></div></div>); }
function LayoutMinimal({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-8 py-5 border-b border-gray-100"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-black tracking-[0.3em] uppercase" style={{ color: t.logoColor }} /><span className="text-xs font-medium text-gray-400 uppercase tracking-widest"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-medium text-gray-400" /></span></div><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 220 }} /><div className="px-8 py-7"><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-xs font-semibold uppercase tracking-widest block" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-3xl font-black leading-tight block mt-2" style={{ color: "#111" }} /><div className="h-0.5 w-12 mt-4 mb-4" style={{ backgroundColor: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-600 block" style={{ fontFamily: t.font }} /><button className="mt-6 px-6 py-3 text-sm font-bold rounded-lg" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div><div className="px-8 py-4 border-t border-gray-100 text-center"><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs text-gray-400" /></div></div>); }
function LayoutEvent({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="relative"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 200 }} /><div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "linear-gradient(to bottom, rgba(30,27,75,0.5), rgba(30,27,75,0.9))" }}><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3" style={{ color: t.accentColor, border: `1px solid ${t.accentColor}` }} /><Editable value={t.logo} onChange={upd("logo")} tag="h1" className="text-2xl font-black text-center tracking-wide" style={{ color: "#fff" }} /></div></div><div className="px-8 py-7 text-center"><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold" style={{ color: "#ffffff" }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm block mt-1" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed mt-4 block" style={{ color: "#aaaaaa", fontFamily: t.font }} /><button className="mt-6 px-8 py-3 rounded-full text-sm font-bold" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div><div className="px-6 py-4 border-t text-center" style={{ borderColor: "#ffffff11" }}><Editable value={t.footerText} onChange={upd("footerText")} className="text-xs" style={{ color: "#555" }} /></div></div>); }
function LayoutPets({ t, upd }) { return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex items-center justify-between px-6 py-4 border-b border-gray-200"><Editable value={t.logo} onChange={upd("logo")} className="text-xl font-bold" style={{ color: t.logoColor }} /><Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-500 underline" /></div><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} style={{ height: 240 }} /><div className="px-6 py-7"><Editable value={t.tag} onChange={upd("tag")} className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accentColor }} /><Editable value={t.title} onChange={upd("title")} tag="h2" className="text-2xl font-extrabold leading-tight mt-2" style={{ color: "#2c2c2c" }} /><Editable value={t.subtitle} onChange={upd("subtitle")} className="text-sm font-semibold mt-1 block" style={{ color: t.accentColor }} /><Editable value={t.body} onChange={upd("body")} multiline className="text-base leading-relaxed text-gray-700 mt-4 whitespace-pre-wrap" style={{ fontFamily: t.font }} /><div className="mt-7"><button className="px-6 py-3 rounded-lg text-sm font-bold shadow" style={{ backgroundColor: t.buttonColor, color: t.buttonTextColor }}><Editable value={t.buttonText} onChange={upd("buttonText")} style={{ color: t.buttonTextColor }} /></button></div></div><div className="px-6 py-5 border-t border-gray-200 text-center text-xs text-gray-500"><Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" /></div></div>); }
function LayoutHalloween({ t, upd }) { const updateProduct = (index, field, value) => { const newProducts = [...t.products]; newProducts[index] = { ...newProducts[index], [field]: value }; upd("products")(newProducts); }; return (<div className="w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ fontFamily: t.font, backgroundColor: t.bgColor }}><div className="flex justify-end px-6 pt-4"><Editable value={t.viewInBrowserText || "View in browser"} onChange={upd("viewInBrowserText")} className="text-xs text-gray-400 underline" /></div>{t.headerImg && (<div className="px-4 mt-2"><EditableImg src={t.headerImg} onSrcChange={upd("headerImg")} className="rounded-xl" style={{ height: 200 }} /></div>)}<div className="px-6 text-center mt-6"><Editable value={t.scaryText} onChange={upd("scaryText")} tag="div" className="text-4xl font-black uppercase leading-tight" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-2"><Editable value={t.forOneNight} onChange={upd("forOneNight")} tag="div" className="text-sm font-semibold uppercase tracking-wider" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-6"><Editable value={t.year} onChange={upd("year")} tag="div" className="text-lg font-bold text-white" /><Editable value={t.date} onChange={upd("date")} tag="div" className="text-2xl font-black" style={{ color: t.accentColor }} /></div><div className="px-6 text-center mt-4"><Editable value={t.body} onChange={upd("body")} multiline className="text-sm leading-relaxed text-gray-300" style={{ fontFamily: t.font }} /></div><div className="px-6 text-center mt-6"><button className="px-6 py-2 rounded-full text-sm font-bold border-2 bg-transparent transition hover:bg-opacity-10 hover:bg-white" style={{ borderColor: t.accentColor, color: t.accentColor }}><Editable value={t.reminderButton} onChange={upd("reminderButton")} style={{ color: t.accentColor }} /></button></div><div className="px-6 mt-8 space-y-4">{t.products.map((product, idx) => (<div key={idx} className="bg-gray-900 rounded-xl p-4 flex justify-between items-center"><div className="flex-1"><Editable value={product.name} onChange={(val) => updateProduct(idx, "name", val)} tag="div" className="text-lg font-bold text-white" /><Editable value={product.delivery} onChange={(val) => updateProduct(idx, "delivery", val)} className="text-xs text-gray-400" /></div><div><Editable value={product.price} onChange={(val) => updateProduct(idx, "price", val)} tag="div" className="text-xl font-black" style={{ color: t.accentColor }} /></div></div>))}</div><div className="px-6 text-center mt-6"><button className="px-6 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: t.accentColor, color: "#000000" }}><Editable value={t.dealsButton} onChange={upd("dealsButton")} style={{ color: "#000000" }} /></button></div><div className="px-6 py-6 mt-6 border-t border-gray-800 text-center text-xs text-gray-500"><Editable value={t.footerText} onChange={upd("footerText")} multiline className="whitespace-pre-wrap text-center" /></div></div>); }

const LAYOUT_COMPONENTS = {
  botanical: LayoutBotanical,
  darkpromo: LayoutDarkPromo,
  minimal: LayoutMinimal,
  event: LayoutEvent,
  pets: LayoutPets,
  halloween: LayoutHalloween,
  
};
function StylePanel({ t, upd }) { const isHalloween = t.layout === "halloween"; return (<div className="space-y-5 text-sm"><div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Font</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={t.font} onChange={(e) => upd("font")(e.target.value)}>{FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}</select></div>{[{ key: "bgColor", label: "Background" }, { key: "accentColor", label: "Accent color" }].map(({ key, label }) => (<div key={key} className="flex items-center justify-between"><label className="text-sm text-gray-600">{label}</label><input type="color" value={t[key]} onChange={(e) => upd(key)(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div>))}{!isHalloween && (<><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Logo color</label><input type="color" value={t.logoColor || "#000000"} onChange={(e) => upd("logoColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Button bg</label><input type="color" value={t.buttonColor || "#000000"} onChange={(e) => upd("buttonColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div><div className="flex items-center justify-between"><label className="text-sm text-gray-600">Button text</label><input type="color" value={t.buttonTextColor || "#ffffff"} onChange={(e) => upd("buttonTextColor")(e.target.value)} className="w-9 h-8 cursor-pointer rounded border border-gray-200" /></div></>)}</div>); }

function NewTemplateModal({ onAdd, onClose }) { const [name, setName] = useState("My Template"); const [preset, setPreset] = useState("botanical"); return (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"><h2 className="text-lg font-bold text-gray-800 mb-4">Add New Template</h2><div className="space-y-4"><div><label className="text-sm font-medium text-gray-600 block mb-1">Template name</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} /></div><div><label className="text-sm font-medium text-gray-600 block mb-2">Start from preset</label><div className="grid grid-cols-2 gap-2">{Object.entries(PRESETS).map(([key, p]) => (<button key={key} onClick={() => setPreset(key)} className={`border-2 rounded-xl p-3 text-left transition ${preset === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}><div className="h-10 rounded-lg mb-2" style={{ backgroundColor: p.bgColor, border: "1px solid #ddd" }} /><p className="text-xs font-semibold text-gray-700">{p.name}</p></button>))}</div></div></div><div className="flex gap-3 mt-6"><button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button><button onClick={() => { onAdd({ id: uid(), ...PRESETS[preset], name: name || PRESETS[preset].name }); onClose(); }} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-semibold hover:bg-blue-700">Create Template</button></div></div></div>); }

// ─── Helper: generate HTML string from template data ─────────────────────────
function generateHTML(template) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${template.name || "Email Template"}</title>
<style>
  body { margin:0; padding:0; background-color:#f0f0f0; font-family:${template.font || "Arial, sans-serif"}; }
  .container { max-width:560px; margin:0 auto; background-color:${template.bgColor || "#ffffff"}; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px -5px rgba(0,0,0,0.1); }
  .header { padding:20px 24px; display:flex; justify-content:space-between; align-items:center; }
  .logo { font-size:24px; font-weight:900; color:${template.logoColor || "#000"}; }
  .img-wrapper { padding:0 16px; }
  .img-wrapper img { width:100%; border-radius:12px; height:auto; }
  .content { padding:24px; }
  .tag { font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; color:${template.accentColor || "#000"}; }
  .title { font-size:24px; font-weight:800; margin-top:8px; color:#1a1a1a; }
  .subtitle { font-size:14px; font-weight:600; margin-top:4px; color:${template.accentColor || "#000"}; }
  .body { font-size:14px; line-height:1.6; margin-top:16px; color:#4a4a4a; }
  .button { display:inline-block; margin-top:24px; background-color:${template.buttonColor || "#000"}; color:${template.buttonTextColor || "#fff"}; padding:12px 24px; border-radius:999px; text-decoration:none; font-weight:bold; font-size:14px; }
  .footer { padding:16px 24px; text-align:center; font-size:12px; color:#9ca3af; border-top:1px solid #e5e7eb; }
</style>
</head>
<body style="margin:0;padding:20px;background:#f0f0f0;">
<div class="container">
  <div class="header"><span class="logo">${template.logo || ""}</span><span>●●●●</span></div>
  <div class="img-wrapper"><img src="${template.headerImg || ""}" alt="header"></div>
  <div class="content">
    <div class="tag">${template.tag || ""}</div>
    <div class="title">${template.title || ""}</div>
    <div class="subtitle">${template.subtitle || ""}</div>
    <div class="body">${(template.body || "").replace(/\n/g, "<br>")}</div>
    <a href="#" class="button">${template.buttonText || "Button"}</a>
  </div>
  <div class="footer">${(template.footerText || "").replace(/\n/g, "<br>")}</div>
</div>
</body>
</html>`;
}

// ─── Main App with Save, Export & Back Arrow + AI template support ────────────
const API = "https://wynreach-backend.onrender.com/api/templates";

export default function EmailBuilder({ templateId: initialTemplateId, onBack }) {
  const navigate = useNavigate();
  const location = useLocation(); 
  console.log("LOCATION STATE:", location.state);
console.log("GENERATED TEMPLATE:", location.state?.generatedTemplate); // ✅ for receiving generated template
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [activeId, setActiveId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [renameVal, setRenameVal] = useState("");
  const [activePanel, setActivePanel] = useState("style");
  const [isSingleMode, setIsSingleMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Load template if editing or via URL param, or handle generated template
  useEffect(() => {
    // 1. If we have generated template from AI page, load it
    if (location.state?.generatedTemplate) {
      const newTemplate = {
        id: Date.now(),
        ...location.state.generatedTemplate,
        layout: location.state.generatedTemplate.layout || 'botanical',
      };
      setTemplates([newTemplate]);
      setActiveId(newTemplate.id);
      setIsSingleMode(true);
      // Clear the state to avoid re‑loading on refresh
      window.history.replaceState({}, document.title);
      return;
    }

    // 2. If editing an existing template (API)
    if (initialTemplateId && !String(initialTemplateId).startsWith("tpl-")) {
      fetch(`${API}/${initialTemplateId}`)
        .then(r => r.json())
        .then(data => {
          if (data && data.content) {
            try {
              const loaded = JSON.parse(data.content);
              const newTemplate = { id: data.id, name: data.name, layout: loaded.layout || "botanical", ...loaded };
              setTemplates([newTemplate]);
              setActiveId(newTemplate.id);
              setIsSingleMode(true);
            } catch(e) { console.error(e); }
          }
        })
        .catch(console.error);
      return;
    }

    // 3. Check URL query param for generative template selection
    const params = new URLSearchParams(window.location.search);
    const templateParam = params.get("template");
    if (templateParam) {
      const mapping = { botanical:1, darkpromo:2, minimal:3, event:4, pets:5, halloween:6 };
      const targetId = mapping[templateParam];
      if (targetId && templates.find(t => t.id === targetId)) {
        setActiveId(targetId);
        setIsSingleMode(true);
      }
    } else {
      setIsSingleMode(false);
    }
  }, [initialTemplateId, location.state]);

  const active = templates.find((t) => t.id === activeId);
  const updateActive = useCallback((key) => (val) => {
    setTemplates((ts) => ts.map((t) => (t.id === activeId ? { ...t, [key]: val } : t)));
  }, [activeId]);

  const handleSave = async () => {
    if (!active) return;
    setSaving(true);
    try {
      const payload = {
        name: active.name,
        type: "email",
        category: "Marketing",
        content: JSON.stringify(active),
        variables: [],
        status: "active",
      };
      let url = `${API}/`;
      let method = "POST";
      if (initialTemplateId && !String(initialTemplateId).startsWith("tpl-")) {
        url = `${API}/${initialTemplateId}`;
        method = "PATCH";
      }
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        const saved = await res.json();
        showToast(`✅ Template "${active.name}" saved!`, "success");
        if (method === "POST" && saved.id) {
          setTemplates(ts => ts.map(t => t.id === active.id ? { ...t, id: saved.id } : t));
          setActiveId(saved.id);
        }
      } else throw new Error("Save failed");
    } catch (err) {
      showToast("❌ Save failed: " + err.message, "error");
    } finally { setSaving(false); }
  };

  const handleExport = () => {
    if (!active) return;
    const html = generateHTML(active);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${active.name || "template"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`📄 Exported as ${a.download}`, "success");
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBack = () => {
    if (onBack) onBack();
    else navigate("/templates");
  };

  const addTemplate = (tpl) => { if (!isSingleMode) { setTemplates((ts) => [...ts, tpl]); setActiveId(tpl.id); } };
  const duplicate = (id) => { if (!isSingleMode) { const src = templates.find((t) => t.id === id); const copy = { ...src, id: uid(), name: src.name + " (copy)" }; setTemplates((ts) => [...ts, copy]); setActiveId(copy.id); } };
  const remove = (id) => { if (!isSingleMode && templates.length > 1) { const next = templates.find((t) => t.id !== id); setTemplates((ts) => ts.filter((t) => t.id !== id)); if (activeId === id) setActiveId(next.id); } };
  const startRename = (t) => { if (!isSingleMode) { setRenamingId(t.id); setRenameVal(t.name); } };
  const commitRename = () => { if (!isSingleMode) { setTemplates((ts) => ts.map((t) => (t.id === renamingId ? { ...t, name: renameVal } : t))); setRenamingId(null); } };
  const LayoutComponent =
  LAYOUT_COMPONENTS[active.layout] || LayoutBotanical;
  const fontLink = "https://fonts.googleapis.com/css2?family=Inter&family=Playfair+Display:wght@700;900&family=Poppins:wght@400;600;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;600;700;900&family=Lato:wght@400;700&family=Roboto:wght@400;700&display=swap";

  return (
    <>
      <link rel="stylesheet" href={fontLink} />
      {!isSingleMode && showModal && <NewTemplateModal onAdd={addTemplate} onClose={() => setShowModal(false)} />}
      <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xl font-black text-blue-600">✉ MailCraft</span>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full hidden sm:block">
              {isSingleMode ? "Single Template" : "Template Builder"}
            </span>
          </div>
          <div className="flex gap-2">
            <button className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "style" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`} onClick={() => setActivePanel("style")}>Style</button>
            <button className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${activePanel === "preview" ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`} onClick={() => setActivePanel("preview")}>Preview</button>
            <button onClick={handleSave} disabled={saving} className="text-xs bg-emerald-600 text-white rounded-lg px-4 py-1.5 font-semibold hover:bg-emerald-700 disabled:opacity-50">
              {saving ? "Saving..." : "💾 Save"}
            </button>
            <button onClick={handleExport} className="text-xs bg-blue-600 text-white rounded-lg px-4 py-1.5 font-semibold hover:bg-blue-700">
              📎 Export
            </button>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {!isSingleMode && (
            <div className="w-52 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto">
              <div className="px-3 pt-4 pb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Templates</span>
                <button onClick={() => setShowModal(true)} className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-base leading-none hover:bg-blue-700">+</button>
              </div>
              <div className="flex-1 px-2 pb-4 space-y-1">
                {templates.map((t) => (
                  <div key={t.id} onClick={() => setActiveId(t.id)} className={`group relative rounded-xl cursor-pointer border-2 transition p-2 ${activeId === t.id ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200 hover:bg-gray-50"}`}>
                    <div className="w-full h-12 rounded-lg mb-1.5 flex items-end overflow-hidden" style={{ backgroundColor: t.bgColor }}>
                      <div className="w-full px-2 pb-1.5"><div className="h-1.5 rounded-full w-3/4 opacity-60" style={{ backgroundColor: t.accentColor }} /><div className="h-1 rounded-full w-1/2 mt-1 opacity-30" style={{ backgroundColor: t.accentColor }} /></div>
                    </div>
                    {renamingId === t.id ? (
                      <input autoFocus className="text-xs w-full border border-blue-300 rounded px-1 py-0.5 outline-none" value={renameVal} onChange={(e) => setRenameVal(e.target.value)} onBlur={commitRename} onKeyDown={(e) => e.key === "Enter" && commitRename()} onClick={(e) => e.stopPropagation()} />
                    ) : (
                      <p className="text-xs font-semibold text-gray-700 truncate">{t.name}</p>
                    )}
                    <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => startRename(t)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50">✏️</button>
                      <button onClick={() => duplicate(t.id)} className="w-5 h-5 rounded bg-white border border-gray-200 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-50">⧉</button>
                      {templates.length > 1 && <button onClick={() => remove(t.id)} className="w-5 h-5 rounded bg-white border border-red-200 text-red-400 flex items-center justify-center text-xs hover:bg-red-50">✕</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={`flex-1 overflow-y-auto p-6 ${isSingleMode ? "w-full" : ""}`}>
            {active && LayoutComponent && <LayoutComponent key={active.id} t={active} upd={updateActive} />}
            <p className="text-center text-xs text-gray-400 mt-4">Click any text to edit · Hover image to replace</p>
          </div>
          {activePanel === "style" && (
            <div className="w-56 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Style</p>
              {active && <StylePanel t={active} upd={updateActive} />}
            </div>
          )}
        </div>
      </div>
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium text-white ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span> {toast.message}
          <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">×</button>
        </div>
      )}
    </>
  );
}
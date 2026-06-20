

// // // ListsPage.jsx – Archive + Delete Icons (Edit removed)
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   getLists,
// //   createList,
// //   deleteList,
// //   archiveList,
// //   restoreList,
// //   addContact,
// // } from "../services/listApi";

// // /* ================= UTILS ================= */
// // const cn = (...classes) => classes.filter(Boolean).join(" ");
// // const formatNumber = (num) => num?.toLocaleString() || "0";
// // const formatDate = (dateStr) => {
// //   if (!dateStr) return "—";
// //   const d = new Date(dateStr);
// //   return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// // };

// // /* ================= ICONS ================= */
// // const PlusIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
// //   </svg>
// // );
// // const SearchIcon = () => (
// //   <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
// //   </svg>
// // );
// // const XIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const ArchiveIcon = () => (
// //   <svg
// //     className="w-4 h-4"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="currentColor"
// //     strokeWidth="2"
// //   >
// //     {/* outer box */}
// //     <rect
// //       x="4"
// //       y="4"
// //       width="16"
// //       height="16"
// //       rx="2"
// //       ry="2"
// //     />

// //     {/* arrow */}
// //     <path
// //       d="M12 8v6"
// //       strokeLinecap="round"
// //     />

// //     <path
// //       d="M9.5 11.5L12 14l2.5-2.5"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />

// //     {/* bottom line */}
// //     <path
// //       d="M9 17h6"
// //       strokeLinecap="round"
// //     />
// //   </svg>
// // );
// // const TrashIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
// //   </svg>
// // );
// // const RestoreIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
// //     <path d="M12 8v4l3 3M12 8v4l-3 3" strokeLinecap="round" />
// //   </svg>
// // );
// // const UsersIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// //     <circle cx="9" cy="7" r="4" />
// //     <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
// //     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
// //   </svg>
// // );
// // const MailIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="2" y="4" width="20" height="16" rx="2" />
// //     <path d="m22 7-10 7L2 7" />
// //   </svg>
// // );
// // const WhatsAppIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
// //   </svg>
// // );
// // const CalendarIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
// //     <line x1="16" y1="2" x2="16" y2="6" />
// //     <line x1="8" y1="2" x2="8" y2="6" />
// //     <line x1="3" y1="10" x2="21" y2="10" />
// //   </svg>
// // );
// // const CampaignIcon = () => (
// //   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M22 6L12 13 2 6M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
// //     <path d="M12 13l-10-6" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const DownloadIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
// //   </svg>
// // );
// // const UserPlusIcon = () => (
// //   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //     <path d="M19 10v4m-2-2h4" strokeLinecap="round" />
// //   </svg>
// // );

// // /* ================= UI COMPONENTS ================= */
// // const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = "md" }) => {
// //   const base =
// //     "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
// //   const variants = {
// //     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
// //     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
// //     ghost: "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
// //     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
// //   };
// //   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
// //   return (
// //     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
// //       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
// //       {leftIcon && !loading && leftIcon}
// //       {children}
// //       {rightIcon && !loading && rightIcon}
// //     </button>
// //   );
// // };

// // const SearchInput = ({ value, onChange, placeholder }) => (
// //   <div className="relative">
// //     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
// //       <SearchIcon />
// //     </span>
// //     <input
// //       type="text"
// //       value={value}
// //       onChange={(e) => onChange(e.target.value)}
// //       placeholder={placeholder}
// //       className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
// //     />
// //   </div>
// // );

// // const Modal = ({ open, onClose, title, children, footer }) => {
// //   if (!open) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
// //       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
// //           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
// //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
// //         </div>
// //         <div className="px-6 py-4">{children}</div>
// //         {footer && (
// //           <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
// //             {footer}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const ConfirmModal = ({ open, onClose, onConfirm, title, message, isLoading, confirmVariant = "danger" }) => {
// //   if (!open) return null;
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
// //       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="px-6 py-4 border-b border-slate-100">
// //           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
// //         </div>
// //         <div className="px-6 py-4">
// //           <p className="text-sm text-slate-600">{message}</p>
// //         </div>
// //         <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
// //           <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
// //           <Button variant={confirmVariant} onClick={onConfirm} loading={isLoading}>Confirm</Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const AddContactModal = ({ isOpen, onClose, onAdd, listName }) => {
// //   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.name.trim()) newErrors.name = "Name is required";
// //     if (!formData.email.trim()) newErrors.email = "Email is required";
// //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validate()) return;
// //     setIsSubmitting(true);
// //     await onAdd(formData);
// //     setIsSubmitting(false);
// //     onClose();
// //     setFormData({ name: "", email: "", phone: "" });
// //     setErrors({});
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
// //         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
// //           <h3 className="text-lg font-bold text-slate-900">Add Contact to {listName}</h3>
// //           <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
// //         </div>
// //         <div className="p-6 space-y-4">
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
// //             <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.name ? "border-red-300" : "border-slate-200"}`} />
// //             {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
// //           </div>
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
// //             <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm ${errors.email ? "border-red-300" : "border-slate-200"}`} />
// //             {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
// //           </div>
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number (optional)</label>
// //             <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" />
// //           </div>
// //           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
// //             <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
// //             <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">{isSubmitting ? "Adding..." : "Add Contact"}</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const ListDetailModal = ({ list, isOpen, onClose, onAddContact, onExport }) => {
// //   const [showAddContact, setShowAddContact] = useState(false);
// //   if (!isOpen || !list) return null;
// //   const handleAddContact = (contactData) => {
// //     onAddContact(list.id, contactData);
// //     setShowAddContact(false);
// //   };
// //   return (
// //     <>
// //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
// //         <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
// //           <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
// //             <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
// //             <div><h2 className="text-xl font-bold text-slate-900">{list.list_name}</h2>{list.description && <p className="text-sm text-slate-500 mt-1">{list.description}</p>}</div>
// //           </div>
// //           <div className="p-6 space-y-5">
// //             <div className="grid grid-cols-2 gap-4">
// //               <td
// //   className="px-4 py-3 font-semibold text-sm text-slate-600"
// //   onClick={() => openListDetail(list)}
// // >
// //   {formatNumber(list.contacts)}
// // </td><div className="flex items-start gap-3"><MailIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase">Email Eligible</p><p className="text-lg font-bold text-emerald-600">{formatNumber(list.email_eligible)}</p></div></div>
// //               <div className="flex items-start gap-3"><WhatsAppIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase">WhatsApp Eligible</p><p className="text-lg font-bold text-green-600">{formatNumber(list.wa_eligible)}</p></div></div>
// //               <div className="flex items-start gap-3"><CampaignIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase">Campaigns Sent</p><p className="text-lg font-bold text-indigo-600">{list.campaigns || 0}</p></div></div>
// //               <div className="flex items-start gap-3 col-span-2"><CalendarIcon /><div><p className="text-xs font-semibold text-slate-400 uppercase">Last Updated</p><p className="text-sm text-slate-700">{formatDate(list.updated_at)}</p></div></div>
// //             </div>
// //             <div className="border-t border-slate-100 pt-4">
// //               <div className="flex flex-wrap justify-between items-center gap-3">
// //                 <div><p className="text-xs font-semibold text-slate-400 uppercase">Status</p><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${list.is_archived ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{list.is_archived ? "Archived" : "Active"}</span></div>
               
// //               </div>
// //             </div>
// //             {list.contacts && list.contacts.length > 0 && (
// //               <div className="border-t border-slate-100 pt-4">
// //                 <h4 className="text-sm font-semibold text-slate-900 mb-3">Recent Contacts</h4>
// //                 <div className="space-y-2">
// //                   {list.contacts.slice(0, 3).map((contact) => (
// //                     <div key={contact.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
// //                       <div><p className="text-sm font-medium text-slate-800">{contact.name}</p><p className="text-xs text-slate-400">{contact.email}</p></div>
// //                       <span className={`text-xs px-2 py-0.5 rounded-full ${contact.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{contact.status}</span>
// //                     </div>
// //                   ))}
// //                   {list.contacts.length > 3 && <p className="text-xs text-indigo-600 text-center mt-2 cursor-pointer hover:underline">+{list.contacts.length - 3} more contacts</p>}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //       <AddContactModal isOpen={showAddContact} onClose={() => setShowAddContact(false)} onAdd={handleAddContact} listName={list.list_name} />
// //     </>
// //   );
// // };

// // /* ================= MAIN PAGE ================= */
// // export default function ListsPage() {
// //   const [lists, setLists] = useState([]);
// //   const [archivedLists, setArchivedLists] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState("active");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
// //   const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
// //   const [selectedList, setSelectedList] = useState(null);
// //   const [newListName, setNewListName] = useState("");
// //   const [newListDesc, setNewListDesc] = useState("");
// //   const [isCreating, setIsCreating] = useState(false);
// //   const [isSavingAs, setIsSavingAs] = useState(false);
// //   const [isDeleting, setIsDeleting] = useState(false);
// //   const [isArchiving, setIsArchiving] = useState(false);
// //   const [isRestoring, setIsRestoring] = useState(false);
// //   const [formError, setFormError] = useState("");
// //   const [detailList, setDetailList] = useState(null);
// //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

// //   const fetchLists = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getLists();
// //       const active = data.filter((item) => !item.is_archived);
// //       const archived = data.filter((item) => item.is_archived);
// //       setLists(active);
// //       setArchivedLists(archived);
// //     } catch (error) {
// //       console.error("FETCH LIST ERROR:", error);
// //       alert("Failed to load lists. Please refresh the page.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLists();
// //   }, []);

// //   const filteredLists = lists.filter(
// //     (list) =>
// //       list.list_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
// //   );
// //   const filteredArchived = archivedLists.filter(
// //     (list) =>
// //       list.list_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
// //   );

// //   const handleCreateList = () => {
// //     setIsCreateModalOpen(true);
// //     setNewListName("");
// //     setNewListDesc("");
// //     setFormError("");
// //   };

// //   const handleCreateSubmit = async (saveAsArchived = false) => {
// //     if (!newListName.trim()) {
// //       setFormError("List name is required");
// //       return;
// //     }
// //     setFormError("");
// //     try {
// //       if (saveAsArchived) setIsSavingAs(true);
// //       else setIsCreating(true);
// //       await createList({
// //         list_name: newListName.trim(),
// //         description: newListDesc.trim(),
// //         is_archived: saveAsArchived,
// //       });
// //       await fetchLists();
// //       setIsCreateModalOpen(false);
// //     } catch (error) {
// //       console.error("CREATE ERROR:", error);
// //       alert("Failed to create list.");
// //     } finally {
// //       setIsCreating(false);
// //       setIsSavingAs(false);
// //     }
// //   };

// //   const handleArchiveClick = (list) => {
// //     setSelectedList(list);
// //     setIsArchiveModalOpen(true);
// //   };

// //   const handleArchiveConfirm = async () => {
// //     if (!selectedList) return;
// //     try {
// //       setIsArchiving(true);
// //       await archiveList(selectedList.id);
// //       await fetchLists();
// //       setIsArchiveModalOpen(false);
// //       setSelectedList(null);
// //     } catch (error) {
// //       console.error("ARCHIVE ERROR:", error);
// //       alert("Failed to archive list.");
// //     } finally {
// //       setIsArchiving(false);
// //     }
// //   };

// //   const handleRestoreClick = (list) => {
// //     setSelectedList(list);
// //     setIsRestoreModalOpen(true);
// //   };

// //   const handleRestoreConfirm = async () => {
// //     if (!selectedList) return;
// //     try {
// //       setIsRestoring(true);
// //       await restoreList(selectedList.id);
// //       await fetchLists();
// //       setIsRestoreModalOpen(false);
// //       setSelectedList(null);
// //     } catch (error) {
// //       console.error("RESTORE ERROR:", error);
// //       alert("Failed to restore list.");
// //     } finally {
// //       setIsRestoring(false);
// //     }
// //   };

// //   const handleDeleteClick = (list) => {
// //     setSelectedList(list);
// //     setIsDeleteModalOpen(true);
// //   };

// //   const handleDeleteConfirm = async () => {
// //     if (!selectedList) return;
// //     try {
// //       setIsDeleting(true);
// //       await deleteList(selectedList.id);
// //       await fetchLists();
// //       setIsDeleteModalOpen(false);
// //       setSelectedList(null);
// //     } catch (error) {
// //       console.error("DELETE ERROR:", error);
// //       alert("Failed to delete list.");
// //     } finally {
// //       setIsDeleting(false);
// //     }
// //   };

// //   const openListDetail = (list) => {
// //     setDetailList(list);
// //     setIsDetailModalOpen(true);
// //   };

// //   const handleAddContactToList = async (listId, contactData) => {
// //     try {
// //       await addContact(listId, contactData);
// //       await fetchLists();
// //       alert(`Contact "${contactData.name}" added!`);
// //     } catch (error) {
// //       console.error("ADD CONTACT ERROR:", error);
// //       alert("Failed to add contact.");
// //     }
// //   };

// //   const handleExportList = (list) => {
// //     const headers = ["Name", "Email", "Phone", "Status"];
// //     const rows = (list.contacts || []).map((c) => [c.name, c.email, c.phone || "", c.status]);
// //     const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
// //     const blob = new Blob([csv], { type: "text/csv" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = `${list.list_name.replace(/\s+/g, "_")}_contacts.csv`;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //     alert(`Exporting ${list.list_name} contacts...`);
// //   };

// //   const totalLists = activeTab === "active" ? filteredLists.length : filteredArchived.length;

// //   if (loading) {
// //     return (
// //       <div className="p-10 text-center">
// //         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
// //         <p className="mt-4 text-slate-500">Loading lists...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
// //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
// //         <div>
// //           <h1 className="text-[26px] font-extrabold text-slate-900">Audience Lists</h1>
// //           <p className="text-sm text-slate-500 mt-1">Manage your contact lists and audience segments</p>
// //         </div>
// //         <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateList}>Create List</Button>
// //       </div>

// //       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
// //         <div className="border-b border-slate-100 px-6 pt-2">
// //           <div className="flex gap-6">
// //             <button onClick={() => { setActiveTab("active"); setSearchTerm(""); }} className={`px-1 py-2.5 text-sm font-semibold border-b-2 ${activeTab === "active" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500"}`}>Active Lists ({lists.length})</button>
// //             <button onClick={() => { setActiveTab("archived"); setSearchTerm(""); }} className={`px-1 py-2.5 text-sm font-semibold border-b-2 ${activeTab === "archived" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500"}`}>Archived Lists ({archivedLists.length})</button>
// //           </div>
// //         </div>
// //         <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
// //           <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search lists..." />
// //           <span className="text-xs text-slate-400">{totalLists} list{totalLists !== 1 ? "s" : ""} found</span>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="border-b border-slate-100 bg-slate-50">
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">LIST NAME</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">CONTACTS</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">EMAIL ELIGIBLE</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">WA ELIGIBLE</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">CAMPAIGNS</th>
// //                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">LAST UPDATED</th>
// //                 <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400">ACTIONS</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-slate-100">
// //               {activeTab === "active" ? (
// //                 filteredLists.length === 0 ? (
// //                   <tr><td colSpan="7" className="text-center py-12">No active lists found</td></tr>
// //                 ) : (
// //                   filteredLists.map((list) => (
// //                     <tr key={list.id} className="hover:bg-slate-50">
// //                       <td className="px-4 py-3 cursor-pointer" onClick={() => openListDetail(list)}>
// //                         <p className="font-semibold text-sm text-slate-800 hover:text-indigo-600">{list.list_name}</p>
// //                         {list.description && <p className="text-xs text-slate-400">{list.description}</p>}
// //                       </td>
// //                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.contacts)}</td>
// //                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.email_eligible)}</td>
// //                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.wa_eligible)}</td>
// //                       <td className="px-4 py-3" onClick={() => openListDetail(list)}><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600">{list.campaigns || 0}</span></td>
// //                       <td className="px-4 py-3 text-xs text-slate-400" onClick={() => openListDetail(list)}>{formatDate(list.updated_at)}</td>
// //                       <td className="px-4 py-3 text-right">
// //                         <div className="flex items-center justify-end gap-1">
// //                           <Button
// //   variant="ghost"
// //   size="icon"
// //   onClick={(e) => {
// //     e.stopPropagation();
// //     handleArchiveClick(list);
// //   }}
// //   title="Archive list"
// // >
// //   <ArchiveIcon />
// // </Button>
// //                           <Button
// //                             variant="ghost"
// //                             size="icon"
// //                             onClick={(e) => { e.stopPropagation(); handleDeleteClick(list); }}
// //                             title="Delete list"
// //                           >
// //                             <TrashIcon />
// //                           </Button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )
// //               ) : (
// //                 filteredArchived.length === 0 ? (
// //                   <tr><td colSpan="7" className="text-center py-12">No archived lists found</td></tr>
// //                 ) : (
// //                   filteredArchived.map((list) => (
// //                     <tr key={list.id} className="hover:bg-slate-50">
// //                       <td className="px-4 py-3 cursor-pointer" onClick={() => openListDetail(list)}>
// //                         <p className="font-semibold text-sm text-slate-800 hover:text-indigo-600">{list.list_name}</p>
// //                         {list.description && <p className="text-xs text-slate-400">{list.description}</p>}
// //                       </td>
// //                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.contacts)}</td>
// //                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.email_eligible)}</td>
// //                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.wa_eligible)}</td>
// //                       <td className="px-4 py-3" onClick={() => openListDetail(list)}><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500">{list.campaigns || 0}</span></td>
// //                       <td className="px-4 py-3 text-xs text-slate-400" onClick={() => openListDetail(list)}>{formatDate(list.updated_at)}</td>
// //                       <td className="px-4 py-3 text-right">
// //                         <div className="flex items-center justify-end gap-2">
// //                           <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); handleRestoreClick(list); }}>Restore</Button>
// //                           <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteClick(list); }}>Delete</Button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Create List Modal */}
// //       <Modal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New List"
// //         footer={
// //           <div className="flex justify-between w-full">
// //             <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating || isSavingAs}>Cancel</Button>
// //             <div className="flex gap-2">
// //               <Button variant="secondary" onClick={() => handleCreateSubmit(true)} loading={isSavingAs} disabled={isCreating}>Save As Archived</Button>
// //               <Button variant="primary" onClick={() => handleCreateSubmit(false)} loading={isCreating} disabled={isSavingAs}>Create List</Button>
// //             </div>
// //           </div>
// //         }
// //       >
// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1">List Name</label>
// //             <input list="list-names" type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="Select or type list name..." className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" autoFocus />
// //             <datalist id="list-names">
// //               <option value="Active Customers" /><option value="All Subscribers" /><option value="Trial Users" /><option value="VIP Customers" />
// //             </datalist>
// //             {formError && <p className="text-xs text-red-500 mt-1">{formError}</p>}
// //           </div>
// //           <div>
// //             <label className="block text-sm font-semibold text-slate-700 mb-1">Description (optional)</label>
// //             <input type="text" value={newListDesc} onChange={(e) => setNewListDesc(e.target.value)} placeholder="Describe the purpose of this list..." className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
// //           </div>
// //         </div>
// //       </Modal>

// //       {/* Archive Confirm Modal */}
// //       <ConfirmModal
// //         open={isArchiveModalOpen}
// //         onClose={() => setIsArchiveModalOpen(false)}
// //         onConfirm={handleArchiveConfirm}
// //         title="Archive List"
// //         message={`Archive "${selectedList?.list_name}"? You can restore it later from the archived lists section.`}
// //         isLoading={isArchiving}
// //         confirmVariant="primary"
// //       />

// //       {/* Restore Confirm Modal */}
// //       <ConfirmModal
// //         open={isRestoreModalOpen}
// //         onClose={() => setIsRestoreModalOpen(false)}
// //         onConfirm={handleRestoreConfirm}
// //         title="Restore List"
// //         message={`Restore "${selectedList?.list_name}" to active lists?`}
// //         isLoading={isRestoring}
// //         confirmVariant="primary"
// //       />

// //       {/* Delete Confirm Modal */}
// //       <ConfirmModal
// //         open={isDeleteModalOpen}
// //         onClose={() => setIsDeleteModalOpen(false)}
// //         onConfirm={handleDeleteConfirm}
// //         title="Delete List"
// //         message={`Are you sure you want to permanently delete "${selectedList?.list_name}"? This action cannot be undone.`}
// //         isLoading={isDeleting}
// //       />

// //       {/* List Detail Modal */}
// //       <ListDetailModal
// //         list={detailList}
// //         isOpen={isDetailModalOpen}
// //         onClose={() => setIsDetailModalOpen(false)}
// //         onAddContact={handleAddContactToList}
// //         onExport={handleExportList}
// //       />
// //     </div>
// //   );
// // }


// // ListsPage.jsx – Archive + Delete Icons (Edit removed)
// import React, { useState, useEffect } from "react";
// import {
//   getLists,
//   createList,
//   deleteList,
//   archiveList,
//   restoreList,
//   addContact,
// } from "../services/listApi";

// /* ================= UTILS ================= */
// const cn = (...classes) => classes.filter(Boolean).join(" ");
// const formatNumber = (num) => num?.toLocaleString() || "0";
// const formatDate = (dateStr) => {
//   if (!dateStr) return "—";
//   const d = new Date(dateStr);
//   return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// };

// /* ================= ICONS ================= */
// const PlusIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M12 4v16m8-8H4" strokeLinecap="round" />
//   </svg>
// );
// const SearchIcon = () => (
//   <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
//   </svg>
// );
// const XIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const ArchiveIcon = () => (
//   <svg
//     className="w-4 h-4"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
//     <path d="M12 8v6" strokeLinecap="round" />
//     <path d="M9.5 11.5L12 14l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M9 17h6" strokeLinecap="round" />
//   </svg>
// );
// const TrashIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
//   </svg>
// );
// const RestoreIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
//     <path d="M12 8v4l3 3M12 8v4l-3 3" strokeLinecap="round" />
//   </svg>
// );
// const UsersIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//     <circle cx="9" cy="7" r="4" />
//     <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//   </svg>
// );
// const MailIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="2" y="4" width="20" height="16" rx="2" />
//     <path d="m22 7-10 7L2 7" />
//   </svg>
// );
// const WhatsAppIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
//   </svg>
// );
// const CalendarIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );
// const CampaignIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M22 6L12 13 2 6M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
//     <path d="M12 13l-10-6" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const DownloadIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
// const UserPlusIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     <path d="M19 10v4m-2-2h4" strokeLinecap="round" />
//   </svg>
// );

// /* ================= UI COMPONENTS ================= */
// const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = "md" }) => {
//   const base =
//     "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
//   const variants = {
//     primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
//     ghost: "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
//     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
//   };
//   const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
//       {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
//       {leftIcon && !loading && leftIcon}
//       {children}
//       {rightIcon && !loading && rightIcon}
//     </button>
//   );
// };

// const SearchInput = ({ value, onChange, placeholder }) => (
//   <div className="relative">
//     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//       <SearchIcon />
//     </span>
//     <input
//       type="text"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//     />
//   </div>
// );

// const Modal = ({ open, onClose, title, children, footer }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
//         </div>
//         <div className="px-6 py-4">{children}</div>
//         {footer && (
//           <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
//             {footer}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const ConfirmModal = ({ open, onClose, onConfirm, title, message, isLoading, confirmVariant = "danger" }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">{title}</h3>
//         </div>
//         <div className="px-6 py-4">
//           <p className="text-sm text-slate-600">{message}</p>
//         </div>
//         <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
//           <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
//           <Button variant={confirmVariant} onClick={onConfirm} loading={isLoading}>Confirm</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddContactModal = ({ isOpen, onClose, onAdd, listName }) => {
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;
//     setIsSubmitting(true);
//     await onAdd(formData);
//     setIsSubmitting(false);
//     onClose();
//     setFormData({ name: "", email: "", phone: "" });
//     setErrors({});
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//       <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-900">Add Contact to {listName}</h3>
//           <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
//         </div>
//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
//             <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.name ? "border-red-300" : "border-slate-200"}`} />
//             {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
//             <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm ${errors.email ? "border-red-300" : "border-slate-200"}`} />
//             {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number (optional)</label>
//             <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" />
//           </div>
//           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
//             <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
//             <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">{isSubmitting ? "Adding..." : "Add Contact"}</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ListDetailModal = ({ list, isOpen, onClose, onAddContact, onExport }) => {
//   const [showAddContact, setShowAddContact] = useState(false);
//   if (!isOpen || !list) return null;
//   const handleAddContact = (contactData) => {
//     onAddContact(list.id, contactData);
//     setShowAddContact(false);
//   };
//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
//         <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
//           <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
//             <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
//             <div>
//               <h2 className="text-xl font-bold text-slate-900">{list.list_name}</h2>
//               {list.description && <p className="text-sm text-slate-500 mt-1">{list.description}</p>}
//             </div>
//           </div>
//           <div className="p-6 space-y-5">
//             <div className="grid grid-cols-2 gap-4">
//               {/* REPLACED invalid <td> with proper div for total contacts */}
//               <div className="flex items-start gap-3">
//                 <UsersIcon />
//                 <div>
//                   <p className="text-xs font-semibold text-slate-400 uppercase">Total Contacts</p>
//                   <p className="text-lg font-bold text-slate-800">{formatNumber(list.contacts)}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <MailIcon />
//                 <div>
//                   <p className="text-xs font-semibold text-slate-400 uppercase">Email Eligible</p>
//                   <p className="text-lg font-bold text-emerald-600">{formatNumber(list.email_eligible)}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <WhatsAppIcon />
//                 <div>
//                   <p className="text-xs font-semibold text-slate-400 uppercase">WhatsApp Eligible</p>
//                   <p className="text-lg font-bold text-green-600">{formatNumber(list.wa_eligible)}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <CampaignIcon />
//                 <div>
//                   <p className="text-xs font-semibold text-slate-400 uppercase">Campaigns Sent</p>
//                   <p className="text-lg font-bold text-indigo-600">{list.campaigns || 0}</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3 col-span-2">
//                 <CalendarIcon />
//                 <div>
//                   <p className="text-xs font-semibold text-slate-400 uppercase">Last Updated</p>
//                   <p className="text-sm text-slate-700">{formatDate(list.updated_at)}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="border-t border-slate-100 pt-4">
//               <div className="flex flex-wrap justify-between items-center gap-3">
//                 <div>
//                   <p className="text-xs font-semibold text-slate-400 uppercase">Status</p>
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${list.is_archived ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
//                     {list.is_archived ? "Archived" : "Active"}
//                   </span>
//                 </div>
//                 <Button variant="secondary" size="sm" leftIcon={<UserPlusIcon />} onClick={() => setShowAddContact(true)}>
//                   Add Contact
//                 </Button>
//               </div>
//             </div>
//             {/* REMOVED the {list.contacts && list.contacts.length > 0 && ...} block entirely */}
//           </div>
//         </div>
//       </div>
//       <AddContactModal isOpen={showAddContact} onClose={() => setShowAddContact(false)} onAdd={handleAddContact} listName={list.list_name} />
//     </>
//   );
// };

// /* ================= MAIN PAGE ================= */
// export default function ListsPage() {
//   const [lists, setLists] = useState([]);
//   const [archivedLists, setArchivedLists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("active");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
//   const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
//   const [selectedList, setSelectedList] = useState(null);
//   const [newListName, setNewListName] = useState("");
//   const [newListDesc, setNewListDesc] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const [isSavingAs, setIsSavingAs] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isArchiving, setIsArchiving] = useState(false);
//   const [isRestoring, setIsRestoring] = useState(false);
//   const [formError, setFormError] = useState("");
//   const [detailList, setDetailList] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

//   const fetchLists = async () => {
//     console.log("FETCHING LISTS...");
//     try {
//       setLoading(true);
//       const data = await getLists();
//       const active = data.filter((item) => !item.is_archived);
//       const archived = data.filter((item) => item.is_archived);
//       setLists(active);
//       setArchivedLists(archived);
//     } catch (error) {
//       console.error("FETCH LIST ERROR:", error);
//       alert("Failed to load lists. Please refresh the page.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLists();
//   }, []);

//   const filteredLists = lists.filter(
//     (list) =>
//       list.list_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
//   );
//   const filteredArchived = archivedLists.filter(
//     (list) =>
//       list.list_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const handleCreateList = () => {
//     setIsCreateModalOpen(true);
//     setNewListName("");
//     setNewListDesc("");
//     setFormError("");
//   };

//   const handleCreateSubmit = async (saveAsArchived = false) => {
//     if (!newListName.trim()) {
//       setFormError("List name is required");
//       return;
//     }
//     setFormError("");
//     try {
//       if (saveAsArchived) setIsSavingAs(true);
//       else setIsCreating(true);
//       await createList({
//         list_name: newListName.trim(),
//         description: newListDesc.trim(),
//         is_archived: saveAsArchived,
//       });
//       await fetchLists();
//       setIsCreateModalOpen(false);
//     } catch (error) {
//       console.error("CREATE ERROR:", error);
//       alert("Failed to create list.");
//     } finally {
//       setIsCreating(false);
//       setIsSavingAs(false);
//     }
//   };

//   const handleArchiveClick = (list) => {
//     setSelectedList(list);
//     setIsArchiveModalOpen(true);
//   };

//   const handleArchiveConfirm = async () => {
//     if (!selectedList) return;
//     try {
//       setIsArchiving(true);
//       await archiveList(selectedList.id);
//       await fetchLists();
//       setIsArchiveModalOpen(false);
//       setSelectedList(null);
//     } catch (error) {
//       console.error("ARCHIVE ERROR:", error);
//       alert("Failed to archive list.");
//     } finally {
//       setIsArchiving(false);
//     }
//   };

//   const handleRestoreClick = (list) => {
//     setSelectedList(list);
//     setIsRestoreModalOpen(true);
//   };

//   const handleRestoreConfirm = async () => {
//     if (!selectedList) return;
//     try {
//       setIsRestoring(true);
//       await restoreList(selectedList.id);
//       await fetchLists();
//       setIsRestoreModalOpen(false);
//       setSelectedList(null);
//     } catch (error) {
//       console.error("RESTORE ERROR:", error);
//       alert("Failed to restore list.");
//     } finally {
//       setIsRestoring(false);
//     }
//   };

//   const handleDeleteClick = (list) => {
//     setSelectedList(list);
//     setIsDeleteModalOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!selectedList) return;
//     try {
//       setIsDeleting(true);
//       await deleteList(selectedList.id);
//       await fetchLists();
//       setIsDeleteModalOpen(false);
//       setSelectedList(null);
//     } catch (error) {
//       console.error("DELETE ERROR:", error);
//       alert("Failed to delete list.");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const openListDetail = (list) => {
//     setDetailList(list);
//     setIsDetailModalOpen(true);
//   };

//   const handleAddContactToList = async (listId, contactData) => {
//     try {
//       await addContact(listId, contactData);
//       await fetchLists();
//       alert(`Contact "${contactData.name}" added!`);
//     } catch (error) {
//       console.error("ADD CONTACT ERROR:", error);
//       alert("Failed to add contact.");
//     }
//   };

//   const handleExportList = (list) => {
//     const headers = ["Name", "Email", "Phone", "Status"];
//     const rows = (list.contacts || []).map((c) => [c.name, c.email, c.phone || "", c.status]);
//     const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${list.list_name.replace(/\s+/g, "_")}_contacts.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//     alert(`Exporting ${list.list_name} contacts...`);
//   };

//   if (loading) {
//     return (
//       <div className="p-10 text-center">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
//         <p className="mt-4 text-slate-500">Loading lists...</p>
//       </div>
//     );
//   }

//   // Moved totalLists calculation BELOW loading check to avoid unnecessary re-renders
//   const totalLists = activeTab === "active" ? filteredLists.length : filteredArchived.length;

//   return (
//     <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-[26px] font-extrabold text-slate-900">Audience Lists</h1>
//           <p className="text-sm text-slate-500 mt-1">Manage your contact lists and audience segments</p>
//         </div>
//         <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateList}>Create List</Button>
//       </div>

//       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//         <div className="border-b border-slate-100 px-6 pt-2">
//           <div className="flex gap-6">
//             <button onClick={() => { setActiveTab("active"); setSearchTerm(""); }} className={`px-1 py-2.5 text-sm font-semibold border-b-2 ${activeTab === "active" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500"}`}>Active Lists ({lists.length})</button>
//             <button onClick={() => { setActiveTab("archived"); setSearchTerm(""); }} className={`px-1 py-2.5 text-sm font-semibold border-b-2 ${activeTab === "archived" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500"}`}>Archived Lists ({archivedLists.length})</button>
//           </div>
//         </div>
//         <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
//           <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search lists..." />
//           <span className="text-xs text-slate-400">{totalLists} list{totalLists !== 1 ? "s" : ""} found</span>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-slate-100 bg-slate-50">
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">LIST NAME</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">CONTACTS</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">EMAIL ELIGIBLE</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">WA ELIGIBLE</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">CAMPAIGNS</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">LAST UPDATED</th>
//                 <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {activeTab === "active" ? (
//                 filteredLists.length === 0 ? (
//                   <tr><td colSpan="7" className="text-center py-12">No active lists found</td></tr>
//                 ) : (
//                   filteredLists.map((list) => (
//                     <tr key={list.id} className="hover:bg-slate-50">
//                       <td className="px-4 py-3 cursor-pointer" onClick={() => openListDetail(list)}>
//                         <p className="font-semibold text-sm text-slate-800 hover:text-indigo-600">{list.list_name}</p>
//                         {list.description && <p className="text-xs text-slate-400">{list.description}</p>}
//                       </td>
//                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.contacts)}</td>
//                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.email_eligible)}</td>
//                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.wa_eligible)}</td>
//                       <td className="px-4 py-3" onClick={() => openListDetail(list)}><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600">{list.campaigns || 0}</span></td>
//                       <td className="px-4 py-3 text-xs text-slate-400" onClick={() => openListDetail(list)}>{formatDate(list.updated_at)}</td>
//                       <td className="px-4 py-3 text-right">
//                         <div className="flex items-center justify-end gap-1">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleArchiveClick(list);
//                             }}
//                             title="Archive list"
//                           >
//                             <ArchiveIcon />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={(e) => { e.stopPropagation(); handleDeleteClick(list); }}
//                             title="Delete list"
//                           >
//                             <TrashIcon />
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )
//               ) : (
//                 filteredArchived.length === 0 ? (
//                   <tr><td colSpan="7" className="text-center py-12">No archived lists found</td></tr>
//                 ) : (
//                   filteredArchived.map((list) => (
//                     <tr key={list.id} className="hover:bg-slate-50">
//                       <td className="px-4 py-3 cursor-pointer" onClick={() => openListDetail(list)}>
//                         <p className="font-semibold text-sm text-slate-800 hover:text-indigo-600">{list.list_name}</p>
//                         {list.description && <p className="text-xs text-slate-400">{list.description}</p>}
//                       </td>
//                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.contacts)}</td>
//                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.email_eligible)}</td>
//                       <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.wa_eligible)}</td>
//                       <td className="px-4 py-3" onClick={() => openListDetail(list)}><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500">{list.campaigns || 0}</span></td>
//                       <td className="px-4 py-3 text-xs text-slate-400" onClick={() => openListDetail(list)}>{formatDate(list.updated_at)}</td>
//                       <td className="px-4 py-3 text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); handleRestoreClick(list); }}>Restore</Button>
//                           <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteClick(list); }}>Delete</Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Create List Modal */}
//       <Modal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New List"
//         footer={
//           <div className="flex justify-between w-full">
//             <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating || isSavingAs}>Cancel</Button>
//             <div className="flex gap-2">
//               <Button variant="secondary" onClick={() => handleCreateSubmit(true)} loading={isSavingAs} disabled={isCreating}>Save As Archived</Button>
//               <Button variant="primary" onClick={() => handleCreateSubmit(false)} loading={isCreating} disabled={isSavingAs}>Create List</Button>
//             </div>
//           </div>
//         }
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">List Name</label>
//             <input list="list-names" type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="Select or type list name..." className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" autoFocus />
//             <datalist id="list-names">
//               <option value="Active Customers" /><option value="All Subscribers" /><option value="Trial Users" /><option value="VIP Customers" />
//             </datalist>
//             {formError && <p className="text-xs text-red-500 mt-1">{formError}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1">Description (optional)</label>
//             <input type="text" value={newListDesc} onChange={(e) => setNewListDesc(e.target.value)} placeholder="Describe the purpose of this list..." className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
//           </div>
//         </div>
//       </Modal>

//       {/* Archive Confirm Modal */}
//       <ConfirmModal
//         open={isArchiveModalOpen}
//         onClose={() => setIsArchiveModalOpen(false)}
//         onConfirm={handleArchiveConfirm}
//         title="Archive List"
//         message={`Archive "${selectedList?.list_name}"? You can restore it later from the archived lists section.`}
//         isLoading={isArchiving}
//         confirmVariant="primary"
//       />

//       {/* Restore Confirm Modal */}
//       <ConfirmModal
//         open={isRestoreModalOpen}
//         onClose={() => setIsRestoreModalOpen(false)}
//         onConfirm={handleRestoreConfirm}
//         title="Restore List"
//         message={`Restore "${selectedList?.list_name}" to active lists?`}
//         isLoading={isRestoring}
//         confirmVariant="primary"
//       />

//       {/* Delete Confirm Modal */}
//       <ConfirmModal
//         open={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onConfirm={handleDeleteConfirm}
//         title="Delete List"
//         message={`Are you sure you want to permanently delete "${selectedList?.list_name}"? This action cannot be undone.`}
//         isLoading={isDeleting}
//       />

//       {/* List Detail Modal */}
//       <ListDetailModal
//         list={detailList}
//         isOpen={isDetailModalOpen}
//         onClose={() => setIsDetailModalOpen(false)}
//         onAddContact={handleAddContactToList}
//         onExport={handleExportList}
//       />
//     </div>
//   );
// }



// ListsPage.jsx – Archive + Delete Icons (Edit removed) + Back Arrow
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added for navigation
import {
  getLists,
  createList,
  deleteList,
  archiveList,
  restoreList,
  addContact,
} from "../services/listApi";

/* ================= UTILS ================= */
const cn = (...classes) => classes.filter(Boolean).join(" ");
const formatNumber = (num) => num?.toLocaleString() || "0";
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/* ================= ICONS ================= */
const PlusIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4v16m8-8H4" strokeLinecap="round" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
  </svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArchiveIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <path d="M12 8v6" strokeLinecap="round" />
    <path d="M9.5 11.5L12 14l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17h6" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" />
  </svg>
);
const RestoreIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
    <path d="M12 8v4l3 3M12 8v4l-3 3" strokeLinecap="round" />
  </svg>
);
const UsersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const CampaignIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 6L12 13 2 6M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
    <path d="M12 13l-10-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DownloadIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const UserPlusIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <path d="M19 10v4m-2-2h4" strokeLinecap="round" />
  </svg>
);

/* ================= UI COMPONENTS ================= */
const Button = ({ children, variant, leftIcon, rightIcon, onClick, disabled, loading, size = "md" }) => {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
  };
  const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-3 py-1.5 text-sm", icon: "p-1.5" };
  return (
    <button onClick={onClick} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size])}>
      {loading && <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />}
      {leftIcon && !loading && leftIcon}
      {children}
      {rightIcon && !loading && rightIcon}
    </button>
  );
};

const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
      <SearchIcon />
    </span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
    />
  </div>
);

const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const ConfirmModal = ({ open, onClose, onConfirm, title, message, isLoading, confirmVariant = "danger" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-slate-600">{message}</p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button variant={confirmVariant} onClick={onConfirm} loading={isLoading}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

const AddContactModal = ({ isOpen, onClose, onAdd, listName }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    await onAdd(formData);
    setIsSubmitting(false);
    onClose();
    setFormData({ name: "", email: "", phone: "" });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Add Contact to {listName}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${errors.name ? "border-red-300" : "border-slate-200"}`} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm ${errors.email ? "border-red-300" : "border-slate-200"}`} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number (optional)</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">{isSubmitting ? "Adding..." : "Add Contact"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListDetailModal = ({ list, isOpen, onClose, onAddContact, onExport }) => {
  const [showAddContact, setShowAddContact] = useState(false);
  if (!isOpen || !list) return null;
  const handleAddContact = (contactData) => {
    onAddContact(list.id, contactData);
    setShowAddContact(false);
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
          <div className="relative bg-gradient-to-r from-indigo-50 to-slate-50 p-6 rounded-t-2xl border-b border-slate-100">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><XIcon /></button>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{list.list_name}</h2>
              {list.description && <p className="text-sm text-slate-500 mt-1">{list.description}</p>}
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <UsersIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Total Contacts</p>
                  <p className="text-lg font-bold text-slate-800">{formatNumber(list.contacts)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MailIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Email Eligible</p>
                  <p className="text-lg font-bold text-emerald-600">{formatNumber(list.email_eligible)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <WhatsAppIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">WhatsApp Eligible</p>
                  <p className="text-lg font-bold text-green-600">{formatNumber(list.wa_eligible)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CampaignIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Campaigns Sent</p>
                  <p className="text-lg font-bold text-indigo-600">{list.campaigns || 0}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 col-span-2">
                <CalendarIcon />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Last Updated</p>
                  <p className="text-sm text-slate-700">{formatDate(list.updated_at)}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${list.is_archived ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {list.is_archived ? "Archived" : "Active"}
                  </span>
                </div>
                <Button variant="secondary" size="sm" leftIcon={<UserPlusIcon />} onClick={() => setShowAddContact(true)}>
                  Add Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddContactModal isOpen={showAddContact} onClose={() => setShowAddContact(false)} onAdd={handleAddContact} listName={list.list_name} />
    </>
  );
};

/* ================= MAIN PAGE ================= */
export default function ListsPage() {
  const navigate = useNavigate(); // ✅ for back navigation
  const [lists, setLists] = useState([]);
  const [archivedLists, setArchivedLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState("");
  const [newListDesc, setNewListDesc] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSavingAs, setIsSavingAs] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [formError, setFormError] = useState("");
  const [detailList, setDetailList] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const fetchLists = async () => {
    console.log("FETCHING LISTS...");
    try {
      setLoading(true);
      const data = await getLists();
      const active = data.filter((item) => !item.is_archived);
      const archived = data.filter((item) => item.is_archived);
      setLists(active);
      setArchivedLists(archived);
    } catch (error) {
      console.error("FETCH LIST ERROR:", error);
      alert("Failed to load lists. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const filteredLists = lists.filter(
    (list) =>
      list.list_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const filteredArchived = archivedLists.filter(
    (list) =>
      list.list_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (list.description && list.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateList = () => {
    setIsCreateModalOpen(true);
    setNewListName("");
    setNewListDesc("");
    setFormError("");
  };

  const handleCreateSubmit = async (saveAsArchived = false) => {
    if (!newListName.trim()) {
      setFormError("List name is required");
      return;
    }
    setFormError("");
    try {
      if (saveAsArchived) setIsSavingAs(true);
      else setIsCreating(true);
      await createList({
        list_name: newListName.trim(),
        description: newListDesc.trim(),
        is_archived: saveAsArchived,
      });
      await fetchLists();
      setIsCreateModalOpen(false);
    }catch (error) {
  console.error("CREATE ERROR:", error);

  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);

  alert(
    error.response?.data?.detail ||
    "Failed to create list."
  );
}
    finally {
      setIsCreating(false);
      setIsSavingAs(false);
    }
  };

  const handleArchiveClick = (list) => {
    setSelectedList(list);
    setIsArchiveModalOpen(true);
  };

  const handleArchiveConfirm = async () => {
    if (!selectedList) return;
    try {
      setIsArchiving(true);
      await archiveList(selectedList.id);
      await fetchLists();
      setIsArchiveModalOpen(false);
      setSelectedList(null);
    } catch (error) {
      console.error("ARCHIVE ERROR:", error);
      alert("Failed to archive list.");
    } finally {
      setIsArchiving(false);
    }
  };

  const handleRestoreClick = (list) => {
    setSelectedList(list);
    setIsRestoreModalOpen(true);
  };

  const handleRestoreConfirm = async () => {
    if (!selectedList) return;
    try {
      setIsRestoring(true);
      await restoreList(selectedList.id);
      await fetchLists();
      setIsRestoreModalOpen(false);
      setSelectedList(null);
    } catch (error) {
      console.error("RESTORE ERROR:", error);
      alert("Failed to restore list.");
    } finally {
      setIsRestoring(false);
    }
  };

  const handleDeleteClick = (list) => {
    setSelectedList(list);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedList) return;
    try {
      setIsDeleting(true);
      await deleteList(selectedList.id);
      await fetchLists();
      setIsDeleteModalOpen(false);
      setSelectedList(null);
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Failed to delete list.");
    } finally {
      setIsDeleting(false);
    }
  };

  const openListDetail = (list) => {
    setDetailList(list);
    setIsDetailModalOpen(true);
  };

  const handleAddContactToList = async (listId, contactData) => {
    try {
      await addContact(listId, contactData);
      await fetchLists();
      alert(`Contact "${contactData.name}" added!`);
    } catch (error) {
      console.error("ADD CONTACT ERROR:", error);
      alert("Failed to add contact.");
    }
  };

  const handleExportList = (list) => {
    const headers = ["Name", "Email", "Phone", "Status"];
    const rows = (list.contacts || []).map((c) => [c.name, c.email, c.phone || "", c.status]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${list.list_name.replace(/\s+/g, "_")}_contacts.csv`;
    a.click();
    URL.revokeObjectURL(url);
    alert(`Exporting ${list.list_name} contacts...`);
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-slate-500">Loading lists...</p>
      </div>
    );
  }

  const totalLists = activeTab === "active" ? filteredLists.length : filteredArchived.length;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* HEADER with Back Arrow */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Back Arrow Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Back to Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-[26px] font-extrabold text-slate-900">Audience Lists</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your contact lists and audience segments</p>
          </div>
        </div>
        <Button variant="primary" leftIcon={<PlusIcon />} onClick={handleCreateList}>Create List</Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="border-b border-slate-100 px-6 pt-2">
          <div className="flex gap-6">
            <button onClick={() => { setActiveTab("active"); setSearchTerm(""); }} className={`px-1 py-2.5 text-sm font-semibold border-b-2 ${activeTab === "active" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500"}`}>Active Lists ({lists.length})</button>
            <button onClick={() => { setActiveTab("archived"); setSearchTerm(""); }} className={`px-1 py-2.5 text-sm font-semibold border-b-2 ${activeTab === "archived" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500"}`}>Archived Lists ({archivedLists.length})</button>
          </div>
        </div>
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search lists..." />
          <span className="text-xs text-slate-400">{totalLists} list{totalLists !== 1 ? "s" : ""} found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">LIST NAME</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">CONTACTS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">EMAIL ELIGIBLE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">WA ELIGIBLE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">CAMPAIGNS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">LAST UPDATED</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === "active" ? (
                filteredLists.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-12">No active lists found</td></tr>
                ) : (
                  filteredLists.map((list) => (
                    <tr key={list.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 cursor-pointer" onClick={() => openListDetail(list)}>
                        <p className="font-semibold text-sm text-slate-800 hover:text-indigo-600">{list.list_name}</p>
                        {list.description && <p className="text-xs text-slate-400">{list.description}</p>}
                       </td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.contacts)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.email_eligible)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.wa_eligible)}</td>
                      <td className="px-4 py-3" onClick={() => openListDetail(list)}><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600">{list.campaigns || 0}</span></td>
                      <td className="px-4 py-3 text-xs text-slate-400" onClick={() => openListDetail(list)}>{formatDate(list.updated_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArchiveClick(list);
                            }}
                            title="Archive list"
                          >
                            <ArchiveIcon />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(list); }}
                            title="Delete list"
                          >
                            <TrashIcon />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                filteredArchived.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-12">No archived lists found</td></tr>
                ) : (
                  filteredArchived.map((list) => (
                    <tr key={list.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 cursor-pointer" onClick={() => openListDetail(list)}>
                        <p className="font-semibold text-sm text-slate-800 hover:text-indigo-600">{list.list_name}</p>
                        {list.description && <p className="text-xs text-slate-400">{list.description}</p>}
                       </td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.contacts)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.email_eligible)}</td>
                      <td className="px-4 py-3 font-semibold text-sm text-slate-600" onClick={() => openListDetail(list)}>{formatNumber(list.wa_eligible)}</td>
                      <td className="px-4 py-3" onClick={() => openListDetail(list)}><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-500">{list.campaigns || 0}</span></td>
                      <td className="px-4 py-3 text-xs text-slate-400" onClick={() => openListDetail(list)}>{formatDate(list.updated_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); handleRestoreClick(list); }}>Restore</Button>
                          <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteClick(list); }}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create List Modal */}
      <Modal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New List"
        footer={
          <div className="flex justify-between w-full">
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating || isSavingAs}>Cancel</Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => handleCreateSubmit(true)} loading={isSavingAs} disabled={isCreating}>Save As Archived</Button>
              <Button variant="primary" onClick={() => handleCreateSubmit(false)} loading={isCreating} disabled={isSavingAs}>Create List</Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">List Name</label>
            <input list="list-names" type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="Select or type list name..." className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" autoFocus />
            <datalist id="list-names">
              <option value="Active Customers" /><option value="All Subscribers" /><option value="Trial Users" /><option value="VIP Customers" />
            </datalist>
            {formError && <p className="text-xs text-red-500 mt-1">{formError}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description (optional)</label>
            <input type="text" value={newListDesc} onChange={(e) => setNewListDesc(e.target.value)} placeholder="Describe the purpose of this list..." className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </div>
        </div>
      </Modal>

      {/* Archive Confirm Modal */}
      <ConfirmModal
        open={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={handleArchiveConfirm}
        title="Archive List"
        message={`Archive "${selectedList?.list_name}"? You can restore it later from the archived lists section.`}
        isLoading={isArchiving}
        confirmVariant="primary"
      />

      {/* Restore Confirm Modal */}
      <ConfirmModal
        open={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
        onConfirm={handleRestoreConfirm}
        title="Restore List"
        message={`Restore "${selectedList?.list_name}" to active lists?`}
        isLoading={isRestoring}
        confirmVariant="primary"
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete List"
        message={`Are you sure you want to permanently delete "${selectedList?.list_name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />

      {/* List Detail Modal */}
      <ListDetailModal
        list={detailList}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddContact={handleAddContactToList}
        onExport={handleExportList}
      />
    </div>
  );
}
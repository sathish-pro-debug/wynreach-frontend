// frontend/src/settings/components/ProfileTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from '../../services/api/client';
import { useAuthStore, useCurrentUser } from '../../store/auth.store';
import { 
  Camera, X, RotateCw, Move, User, Mail, Phone, Briefcase, 
  MapPin, Clock, Shield, Edit2, Lock, Save, AlertCircle, 
  CheckCircle, ZoomIn, ZoomOut, Upload, Trash2, Image as ImageIcon,
  Check, ChevronDown, Calendar, Building, Globe, Info
} from 'lucide-react';
import Cropper from 'react-easy-crop';

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: CheckCircle },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: AlertCircle },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: Info },
  };

  const { bg, border, text, icon: Icon } = config[type];

  return (
    <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-in slide-in-from-top-2 fade-in duration-200 ${bg} ${border} ${text}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-4 text-current/60 hover:text-current transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Password Input Component
const PasswordInput = ({ label, value, onChange, placeholder, error, show, onToggle, id }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full rounded-xl border ${error ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 transition-all`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
      >
        {show ? <Lock className="w-4 h-4" /> : <Lock className="w-4 h-4 opacity-50" />}
      </button>
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

// Image Cropper Modal
const ImageCropperModal = ({ image, onClose, onCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async () => {
    try {
      const img = await createImage(image);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.restore();

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        }, 'image/jpeg', 0.9);
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg();
      if (croppedImage) {
        onCrop(croppedImage);
        onClose();
      }
    }
  };

  const quickRotate = (degrees) => {
    setRotation(prev => {
      let newRotation = prev + degrees;
      if (newRotation > 180) newRotation -= 360;
      if (newRotation < -180) newRotation += 360;
      return newRotation;
    });
  };

  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 1));
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-5 py-4 border-b bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-900">Edit Profile Picture</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="relative h-80 bg-black/5">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              objectFit="contain"
            />
          </div>

          <div className="p-5 space-y-5">
            {/* Zoom Control */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  Zoom
                </label>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={handleZoomChange}
                  className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                />
                
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex gap-2 mt-3">
                {[1, 1.5, 2, 2.5, 3].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setZoom(preset)}
                    className={`flex-1 text-xs py-1.5 rounded-lg transition-all ${
                      Math.abs(zoom - preset) < 0.01
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {Math.round(preset * 100)}%
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Control */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  Rotate
                </label>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {rotation}°
                </span>
              </div>
              
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => quickRotate(-90)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  ↺ -90°
                </button>
                <button
                  onClick={() => quickRotate(90)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  ↻ +90°
                </button>
              </div>
              
              <div className="relative pt-2">
                <input
                  type="range"
                  min={-180}
                  max={180}
                  step={1}
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
                  <span>-180°</span>
                  <span>-90°</span>
                  <span className="text-indigo-600 font-medium">0°</span>
                  <span>90°</span>
                  <span>180°</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100">
              <Move className="w-3.5 h-3.5" />
              <span>Drag to reposition</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 py-4 border-t bg-slate-50/50">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProfileTab() {
  const { user, updateUser } = useAuthStore();
  const fileInputRef = useRef(null);
  
  const [view, setView] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', role: '', memberSince: '',
    timezone: 'Asia/Kolkata', company: '', jobTitle: '', bio: '', avatar: ''
  });
  
  const [editForm, setEditForm] = useState({ ...profile });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [errors, setErrors] = useState({});
  
  const timezones = [
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)', offset: 'UTC+5:30' },
    { value: 'America/New_York', label: 'Eastern Time (ET)', offset: 'UTC-5' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: 'UTC-8' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', offset: 'UTC+0' },
    { value: 'Asia/Singapore', label: 'Singapore Time (SGT)', offset: 'UTC+8' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)', offset: 'UTC+11' },
  ];
  
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };
  
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/auth/me');
      const userData = response.data.user;
      updateUser(userData);
      updateProfileState(userData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      showToast('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUserProfile();
  }, []);
  
  const updateProfileState = (userData) => {
    const profileData = {
      name: userData.full_name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      company: userData.company || '',
      role: userData.role === 'owner' ? 'Workspace Owner' : 'Team Member',
      memberSince: userData.created_at 
        ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      timezone: userData.timezone || 'Asia/Kolkata',
      jobTitle: userData.job_title || '',
      bio: userData.bio || '',
      avatar: userData.avatar || '',
    };
    setProfile(profileData);
    setEditForm(profileData);
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      const response = await apiClient.put('/auth/me', {
        full_name: editForm.name,
        phone: editForm.phone,
        company: editForm.company,
        job_title: editForm.jobTitle,
        timezone: editForm.timezone,
        bio: editForm.bio,
        avatar: editForm.avatar
      });
      
      if (response.data.success) {
        setProfile({ ...editForm });
        updateUser(response.data.user);
        setView('profile');
        showToast('Profile updated successfully!', 'success');
      }
    } catch (error) {
      showToast(error.response?.data?.detail || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size should be less than 5MB', 'error');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleRemovePhoto = async () => {
    if (!confirm('Are you sure you want to remove your profile photo?')) return;
    
    setUploadingImage(true);
    try {
      const response = await apiClient.put('/auth/me', { avatar: '' });
      
      if (response.data.success) {
        setEditForm(prev => ({ ...prev, avatar: '' }));
        setProfile(prev => ({ ...prev, avatar: '' }));
        updateUser(response.data.user);
        showToast('Profile photo removed successfully!', 'success');
      } else {
        showToast('Failed to remove photo', 'error');
      }
    } catch (error) {
      console.error('Error removing photo:', error);
      showToast(error.response?.data?.detail || 'Failed to remove photo', 'error');
    } finally {
      setUploadingImage(false);
    }
  };
  
  const handleCropComplete = async (croppedImage) => {
    setShowCropper(false);
    setUploadingImage(true);
    
    try {
      const response = await apiClient.put('/auth/me', { avatar: croppedImage });
      
      if (response.data.success) {
        setEditForm(prev => ({ ...prev, avatar: croppedImage }));
        setProfile(prev => ({ ...prev, avatar: croppedImage }));
        updateUser(response.data.user);
        showToast('Profile photo updated successfully!', 'success');
      } else {
        showToast('Failed to update photo', 'error');
      }
    } catch (error) {
      console.error('Error updating photo:', error);
      showToast(error.response?.data?.detail || 'Failed to update photo', 'error');
    } finally {
      setUploadingImage(false);
      setTempImage(null);
    }
  };
  
  const handleUpdatePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      setErrors({ confirm: 'Passwords do not match' });
      return;
    }
    if (passwordData.new.length < 8) {
      setErrors({ new: 'Password must be at least 8 characters' });
      return;
    }
    if (!passwordData.current) {
      setErrors({ current: 'Current password is required' });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const response = await apiClient.post('/auth/change-password', {
        current_password: passwordData.current,
        new_password: passwordData.new
      });
      
      if (response.data.success) {
        showToast('Password changed successfully!', 'success');
        setView('profile');
        setPasswordData({ current: '', new: '', confirm: '' });
        setErrors({});
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      }
    } catch (error) {
      showToast(error.response?.data?.detail || 'Failed to change password', 'error');
    } finally {
      setIsSaving(false);
    }
  };
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  // Password change view
  if (view === 'password') {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/30">
            <button 
              onClick={() => setView('profile')} 
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-3 transition-colors group"
            >
              ← <span className="group-hover:underline">Back to Profile</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Lock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Security</h2>
                <p className="text-sm text-slate-500 mt-0.5">Update your password to keep your account secure</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleUpdatePassword(); }}>
            <div className="p-6 space-y-5">
              <PasswordInput 
                label="Current Password" 
                value={passwordData.current} 
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })} 
                placeholder="Enter your current password" 
                error={errors.current} 
                show={showCurrentPassword} 
                onToggle={() => setShowCurrentPassword(!showCurrentPassword)} 
                id="current-password" 
              />
              <PasswordInput 
                label="New Password" 
                value={passwordData.new} 
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })} 
                placeholder="Minimum 8 characters" 
                error={errors.new} 
                show={showNewPassword} 
                onToggle={() => setShowNewPassword(!showNewPassword)} 
                id="new-password" 
              />
              <PasswordInput 
                label="Confirm New Password" 
                value={passwordData.confirm} 
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })} 
                placeholder="Confirm your new password" 
                error={errors.confirm} 
                show={showConfirmPassword} 
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)} 
                id="confirm-password" 
              />
              
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 mt-6">
                <button 
                  type="button" 
                  onClick={() => setView('profile')} 
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving} 
                  className="px-5 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-sm"
                >
                  {isSaving && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                  {isSaving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // Edit profile view
  if (view === 'edit') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        {showCropper && tempImage && (
          <ImageCropperModal image={tempImage} onClose={() => { setShowCropper(false); setTempImage(null); }} onCrop={handleCropComplete} />
        )}
        
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/30">
            <button 
              onClick={() => setView('profile')} 
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-3 transition-colors group"
            >
              ← <span className="group-hover:underline">Back to Profile</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Edit2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
                <p className="text-sm text-slate-500 mt-0.5">Update your personal information and preferences</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Profile Photo Section - Enhanced */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 mb-6 border-b border-slate-200">
              <div className="relative">
                <div 
                  className="relative w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {editForm.avatar ? (
                    <>
                      <img src={editForm.avatar} alt="Profile" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      {getInitials(editForm.name)}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </>
                  )}
                </div>
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-slate-900">Profile Photo</h3>
                <p className="text-sm text-slate-500 mt-1">JPG, PNG or GIF. Max 5MB</p>
                <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                  </button>
                  {editForm.avatar && (
                    <button
                      onClick={handleRemovePhoto}
                      disabled={uploadingImage}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
              
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
            </div>
            
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    value={editForm.email} 
                    disabled 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="tel" 
                    value={editForm.phone} 
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} 
                    placeholder="+1 (555) 000-9999" 
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Company
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={editForm.company} 
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} 
                    placeholder="Your company name" 
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Job Title
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={editForm.jobTitle} 
                    onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })} 
                    placeholder="Product Manager, Engineer, etc." 
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Timezone
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    value={editForm.timezone} 
                    onChange={(e) => setEditForm({ ...editForm, timezone: e.target.value })} 
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 appearance-none bg-white"
                  >
                    {timezones.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} ({opt.offset})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Bio
                </label>
                <textarea 
                  value={editForm.bio} 
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} 
                  rows={4} 
                  placeholder="Tell us a little about yourself..." 
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 resize-none"
                />
                <p className="text-xs text-slate-400 text-right">{editForm.bio?.length || 0}/500 characters</p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-200">
              <button 
                onClick={() => setView('profile')} 
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile} 
                disabled={isSaving} 
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-sm"
              >
                {isSaving && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Profile view (Default)
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showCropper && tempImage && (
        <ImageCropperModal image={tempImage} onClose={() => { setShowCropper(false); setTempImage(null); }} onCrop={handleCropComplete} />
      )}
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        {/* Profile Header */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-6 gap-4">
            <div className="relative">
              <div 
                className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white overflow-hidden cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  getInitials(profile.name)
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setView('edit')} 
                className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center gap-2 transition-all shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
              <button 
                onClick={() => setView('password')} 
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-2 transition-all"
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
            </div>
          </div>
          
          {/* User Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">{profile.name || 'User'}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                <Shield className="w-3 h-3" />
                {profile.role}
              </span>
              <span className="text-slate-300 text-xs">•</span>
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Member since {profile.memberSince}
              </span>
            </div>
            {profile.bio && (
              <p className="text-sm text-slate-600 mt-4 max-w-2xl leading-relaxed">{profile.bio}</p>
            )}
          </div>
          
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Mail className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email</p>
                <p className="text-sm font-medium text-slate-900">{profile.email || '—'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Phone className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Phone</p>
                <p className="text-sm font-medium text-slate-900">{profile.phone || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Building className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Company</p>
                <p className="text-sm font-medium text-slate-900">{profile.company || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Globe className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Timezone</p>
                <p className="text-sm font-medium text-slate-900">
                  {timezones.find(tz => tz.value === profile.timezone)?.label || profile.timezone}
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional Info Section */}
          {(profile.jobTitle || profile.role) && (
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Work Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.jobTitle && (
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Job Title</p>
                    <p className="text-sm font-medium text-slate-900 mt-1.5">{profile.jobTitle}</p>
                  </div>
                )}
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Workspace Role</p>
                  <p className="text-sm font-medium text-slate-900 mt-1.5">{profile.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
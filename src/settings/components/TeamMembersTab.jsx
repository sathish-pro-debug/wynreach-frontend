// frontend/src/settings/components/TeamMembersTab.jsx
import React, { useState, useEffect } from 'react';
import { Users, Mail, Trash2, UserPlus, RefreshCw, X, Send } from 'lucide-react';

const API_BASE = 'https://wynreach-backend.onrender.com/api';

const getAuthToken = () => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    try {
      const parsed = JSON.parse(auth);
      return parsed.accessToken || parsed.access_token;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const getUser = () => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    try {
      const parsed = JSON.parse(auth);
      return parsed.user;
    } catch (e) {
      return null;
    }
  }
  return null;
};

export default function TeamMembersTab() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: '', full_name: '', role: 'Viewer' }); // ✅ Added full_name
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isInviting, setIsInviting] = useState(false);
  
  const currentUser = getUser();
  const isOwner = currentUser?.role === 'owner';

  // Fetch team members from /api/team/members
  const fetchTeamMembers = async () => {
    const token = getAuthToken();
    
    console.log('Fetching team members from /api/team/members');
    
    if (!token) {
      console.error('No auth token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/team/members`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Team members:', data);
        // ✅ Ensure data is an array
        setMembers(Array.isArray(data) ? data : []);
      } else if (response.status === 401) {
        setMessage({ type: 'error', text: 'Session expired. Please login again.' });
        setMembers([]);
      } else {
        const error = await response.json();
        // ✅ Handle different error formats
        let errorMsg = 'Failed to fetch team members';
        if (error.detail) {
          if (typeof error.detail === 'string') {
            errorMsg = error.detail;
          } else if (Array.isArray(error.detail)) {
            errorMsg = error.detail.map(e => e.msg).join(', ');
          }
        }
        setMessage({ type: 'error', text: errorMsg });
        setMembers([]);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      setMessage({ type: 'error', text: 'Network error. Please check if backend is running.' });
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Invite member using /api/team/invite
  const handleInvite = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    
    setIsInviting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE}/team/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: inviteForm.email,
          full_name: inviteForm.full_name, // ✅ Send full_name
          role: inviteForm.role
        })
      });

      const data = await response.json();
      console.log('Invite response:', data);

      if (response.ok) {
        setMessage({ type: 'success', text: `Invitation sent to ${inviteForm.email}!` });
        setInviteForm({ email: '', full_name: '', role: 'Viewer' });
        setTimeout(() => {
          setShowInviteModal(false);
          setMessage({ type: '', text: '' });
          fetchTeamMembers();
        }, 2000);
      } else {
        // ✅ Handle different error formats
        let errorMsg = 'Failed to send invitation';
        if (data.detail) {
          if (typeof data.detail === 'string') {
            errorMsg = data.detail;
          } else if (Array.isArray(data.detail)) {
            errorMsg = data.detail.map(e => e.msg).join(', ');
          }
        }
        setMessage({ type: 'error', text: errorMsg });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsInviting(false);
    }
  };

  // Remove member using /api/team/member
  const handleRemoveMember = async (memberId, memberName) => {
    if (!window.confirm(`Are you sure you want to remove ${memberName} from the team?`)) {
      return;
    }

    const token = getAuthToken();

    try {
      const response = await fetch(`${API_BASE}/team/member?member_id=${memberId}`, { // ✅ Changed to query param
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Member removed successfully!' });
        fetchTeamMembers();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        const error = await response.json();
        let errorMsg = 'Failed to remove member';
        if (error.detail) {
          if (typeof error.detail === 'string') {
            errorMsg = error.detail;
          } else if (Array.isArray(error.detail)) {
            errorMsg = error.detail.map(e => e.msg).join(', ');
          }
        }
        setMessage({ type: 'error', text: errorMsg });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  const getRoleBadgeColor = (role) => {
    // ✅ Ensure role is a string
    const roleStr = typeof role === 'string' ? role.toLowerCase() : '';
    switch (roleStr) {
      case 'owner': return 'bg-amber-100 text-amber-700';
      case 'admin': return 'bg-purple-100 text-purple-700';
      case 'editor': return 'bg-blue-100 text-blue-700';
      case 'viewer': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status) => {
    // ✅ Ensure status is a string
    const statusStr = typeof status === 'string' ? status.toLowerCase() : '';
    switch (statusStr) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl border p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-3">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b bg-slate-50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Team Members</h2>
              <p className="text-sm text-slate-500">Manage your team members and their roles</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchTeamMembers}
                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              {isOwner && (
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Invite Member
                </button>
              )}
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`mx-6 mt-4 p-3 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="divide-y">
          {members.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No team members yet</p>
              {isOwner && (
                <button onClick={() => setShowInviteModal(true)} className="mt-3 text-indigo-600 text-sm">
                  Invite your first team member
                </button>
              )}
            </div>
          ) : (
            members.map((member) => (
              <div key={member.id} className="px-6 py-4 hover:bg-slate-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {/* ✅ Fixed: Use full_name instead of name */}
                      {member.full_name?.charAt(0) || member.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      {/* ✅ Fixed: Use full_name instead of name, fallback to email username */}
                      <p className="font-semibold text-slate-900">
                        {member.full_name && member.full_name !== 'User' 
                          ? member.full_name 
                          : member.email?.split('@')[0] || 'Team Member'}
                      </p>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* ✅ Fixed: Ensure role is rendered as string */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getRoleBadgeColor(member.role)}`}>
                      {typeof member.role === 'string' ? member.role : 'Viewer'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(member.status)}`}>
                      {typeof member.status === 'string' ? member.status : 'active'}
                    </span>
                    {isOwner && member.role !== 'owner' && ( // ✅ Fixed: Compare with lowercase
                      <button
                        onClick={() => handleRemoveMember(member.id, member.full_name || member.email)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Remove member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Invite Modal - ✅ Added Full Name field */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="colleague@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Viewer">Viewer - Read only</option>
                  <option value="Editor">Editor - Can create and edit</option>
                  <option value="Admin">Admin - Can manage team</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isInviting}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {isInviting ? 'Sending...' : 'Send Invitation'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
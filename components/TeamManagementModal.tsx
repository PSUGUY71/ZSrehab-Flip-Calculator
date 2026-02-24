import React, { useState, useMemo, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────

type TeamRole = 'owner' | 'editor' | 'viewer';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  addedDate: string;
  lastActive: string;
  avatar: string; // First letter
}

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  category: 'deal' | 'team' | 'settings' | 'export';
}

interface TeamData {
  members: TeamMember[];
  auditLog: AuditEntry[];
  teamName: string;
  inviteCode: string;
}

interface TeamManagementModalProps {
  currentUser: { id?: string; email?: string | null } | null;
  onClose: () => void;
}

// ─── Local Storage ───────────────────────────────────────────────────

const TEAM_DATA_KEY = 'zs_team_data';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
const generateInviteCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();

export const loadTeamData = (): TeamData => {
  try {
    const stored = localStorage.getItem(TEAM_DATA_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { members: [], auditLog: [], teamName: '', inviteCode: generateInviteCode() };
};

const saveTeamData = (data: TeamData) => {
  try {
    localStorage.setItem(TEAM_DATA_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
};

const addAuditEntry = (data: TeamData, user: string, action: string, details: string, category: AuditEntry['category']): TeamData => {
  const entry: AuditEntry = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    user,
    action,
    details,
    category,
  };
  return { ...data, auditLog: [entry, ...data.auditLog].slice(0, 100) };
};

// ─── Component ───────────────────────────────────────────────────────

export const TeamManagementModal: React.FC<TeamManagementModalProps> = ({
  currentUser,
  onClose,
}) => {
  const [teamData, setTeamData] = useState<TeamData>(() => {
    const loaded = loadTeamData();
    // Initialize with current user as owner if no members
    if (loaded.members.length === 0 && currentUser?.email) {
      const ownerMember: TeamMember = {
        id: currentUser.id || generateId(),
        name: currentUser.email.split('@')[0] || 'Owner',
        email: currentUser.email,
        role: 'owner',
        addedDate: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        avatar: (currentUser.email[0] || 'O').toUpperCase(),
      };
      loaded.members = [ownerMember];
      loaded.teamName = `${ownerMember.name}'s Team`;
    }
    return loaded;
  });
  
  const [activeTab, setActiveTab] = useState<'members' | 'audit' | 'settings'>('members');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<TeamRole>('viewer');
  const [showAddForm, setShowAddForm] = useState(false);
  const [auditFilter, setAuditFilter] = useState<'all' | AuditEntry['category']>('all');

  const currentUserEmail = currentUser?.email || 'Anonymous';
  const currentMember = teamData.members.find(m => m.email === currentUserEmail);
  const isOwner = currentMember?.role === 'owner';

  const filteredAudit = useMemo(() => {
    if (auditFilter === 'all') return teamData.auditLog;
    return teamData.auditLog.filter(e => e.category === auditFilter);
  }, [teamData.auditLog, auditFilter]);

  const handleAddMember = useCallback(() => {
    if (!newMemberEmail.trim() || !newMemberName.trim()) return;
    if (teamData.members.find(m => m.email === newMemberEmail.trim())) {
      alert('A member with this email already exists.');
      return;
    }

    const member: TeamMember = {
      id: generateId(),
      name: newMemberName.trim(),
      email: newMemberEmail.trim().toLowerCase(),
      role: newMemberRole,
      addedDate: new Date().toISOString(),
      lastActive: '—',
      avatar: newMemberName.trim()[0].toUpperCase(),
    };

    let updated = { ...teamData, members: [...teamData.members, member] };
    updated = addAuditEntry(updated, currentUserEmail, 'Added Team Member', `${member.name} (${member.email}) as ${member.role}`, 'team');
    setTeamData(updated);
    saveTeamData(updated);
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberRole('viewer');
    setShowAddForm(false);
  }, [newMemberEmail, newMemberName, newMemberRole, teamData, currentUserEmail]);

  const handleRemoveMember = useCallback((memberId: string) => {
    const member = teamData.members.find(m => m.id === memberId);
    if (!member) return;
    if (member.role === 'owner') {
      alert('Cannot remove the team owner.');
      return;
    }
    if (!confirm(`Remove ${member.name} from the team?`)) return;

    let updated = { ...teamData, members: teamData.members.filter(m => m.id !== memberId) };
    updated = addAuditEntry(updated, currentUserEmail, 'Removed Team Member', `${member.name} (${member.email})`, 'team');
    setTeamData(updated);
    saveTeamData(updated);
  }, [teamData, currentUserEmail]);

  const handleChangeRole = useCallback((memberId: string, newRole: TeamRole) => {
    const member = teamData.members.find(m => m.id === memberId);
    if (!member || member.role === 'owner') return;

    let updated = { ...teamData, members: teamData.members.map(m => m.id === memberId ? { ...m, role: newRole } : m) };
    updated = addAuditEntry(updated, currentUserEmail, 'Changed Role', `${member.name}: ${member.role} → ${newRole}`, 'team');
    setTeamData(updated);
    saveTeamData(updated);
  }, [teamData, currentUserEmail]);

  const handleUpdateTeamName = useCallback((name: string) => {
    let updated = { ...teamData, teamName: name };
    updated = addAuditEntry(updated, currentUserEmail, 'Updated Team Name', `Changed to "${name}"`, 'settings');
    setTeamData(updated);
    saveTeamData(updated);
  }, [teamData, currentUserEmail]);

  const handleRegenerateInvite = useCallback(() => {
    const code = generateInviteCode();
    let updated = { ...teamData, inviteCode: code };
    updated = addAuditEntry(updated, currentUserEmail, 'Regenerated Invite Code', `New code: ${code}`, 'settings');
    setTeamData(updated);
    saveTeamData(updated);
  }, [teamData, currentUserEmail]);

  const roleColors: Record<TeamRole, string> = {
    owner: 'bg-amber-100 text-amber-800 border-amber-300',
    editor: 'bg-blue-100 text-blue-800 border-blue-300',
    viewer: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  const roleIcons: Record<TeamRole, string> = {
    owner: '👑',
    editor: '✏️',
    viewer: '👁️',
  };

  const categoryIcons: Record<string, string> = {
    deal: '📋',
    team: '👥',
    settings: '⚙️',
    export: '📤',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">👥 Team Management</h2>
            <p className="text-xs text-gray-300 mt-0.5">{teamData.teamName || 'Manage your team and permissions'}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Demo Notice */}
        <div className="px-6 pt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex gap-2">
            <span className="text-amber-500 shrink-0">ℹ️</span>
            <div>
              <p className="font-semibold">Local Demo Mode</p>
              <p className="mt-0.5 text-amber-700">Team data is stored in localStorage for demo purposes. For production, team management would sync via Supabase with real-time collaboration.</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex gap-1 border-b border-gray-200">
            {([
              { key: 'members' as const, label: `👥 Members (${teamData.members.length})` },
              { key: 'audit' as const, label: `📜 Activity Log (${teamData.auditLog.length})` },
              { key: 'settings' as const, label: '⚙️ Settings' },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition ${
                  activeTab === tab.key
                    ? 'bg-white border border-gray-200 border-b-white -mb-px text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* MEMBERS TAB */}
          {activeTab === 'members' && (
            <div className="space-y-4">
              {/* Members List */}
              <div className="space-y-2">
                {teamData.members.map(member => (
                  <div key={member.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isOwner && member.role !== 'owner' ? (
                        <select
                          value={member.role}
                          onChange={(e) => handleChangeRole(member.id, e.target.value as TeamRole)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="editor">✏️ Editor</option>
                          <option value="viewer">👁️ Viewer</option>
                        </select>
                      ) : (
                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${roleColors[member.role]}`}>
                          {roleIcons[member.role]} {member.role.toUpperCase()}
                        </span>
                      )}
                      {isOwner && member.role !== 'owner' && (
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-400 hover:text-red-600 text-sm p-1"
                          title="Remove member"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Member Form */}
              {isOwner && (
                <>
                  {showAddForm ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                      <h4 className="text-xs font-bold text-blue-800 uppercase">Add Team Member</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          placeholder="Name"
                          className="text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                          type="email"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          placeholder="Email"
                          className="text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500"
                        />
                        <select
                          value={newMemberRole}
                          onChange={(e) => setNewMemberRole(e.target.value as TeamRole)}
                          className="text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="viewer">👁️ Viewer</option>
                          <option value="editor">✏️ Editor</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddMember}
                          disabled={!newMemberName.trim() || !newMemberEmail.trim()}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
                        >
                          ✅ Add Member
                        </button>
                        <button
                          onClick={() => setShowAddForm(false)}
                          className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-center text-xs font-semibold text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
                    >
                      + Add Team Member
                    </button>
                  )}
                </>
              )}

              {/* Permissions Legend */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <h4 className="text-[10px] font-bold text-gray-600 uppercase mb-2">Role Permissions</h4>
                <div className="grid grid-cols-3 gap-3 text-[10px]">
                  <div>
                    <div className="font-bold text-amber-700 mb-1">👑 Owner</div>
                    <ul className="text-gray-600 space-y-0.5">
                      <li>✅ All permissions</li>
                      <li>✅ Manage team</li>
                      <li>✅ Delete deals</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-blue-700 mb-1">✏️ Editor</div>
                    <ul className="text-gray-600 space-y-0.5">
                      <li>✅ Create/edit deals</li>
                      <li>✅ Run comparisons</li>
                      <li>❌ Manage team</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-gray-600 mb-1">👁️ Viewer</div>
                    <ul className="text-gray-600 space-y-0.5">
                      <li>✅ View deals</li>
                      <li>✅ Export reports</li>
                      <li>❌ Edit anything</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AUDIT TAB */}
          {activeTab === 'audit' && (
            <div className="space-y-3">
              {/* Filter */}
              <div className="flex gap-1 flex-wrap">
                {(['all', 'deal', 'team', 'settings', 'export'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setAuditFilter(f)}
                    className={`text-[10px] px-2.5 py-1 rounded-full font-semibold transition ${
                      auditFilter === f
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f === 'all' ? '📋 All' : `${categoryIcons[f]} ${f.charAt(0).toUpperCase() + f.slice(1)}`}
                  </button>
                ))}
              </div>

              {filteredAudit.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  <p className="text-3xl mb-2">📜</p>
                  <p>No activity recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                  {filteredAudit.map(entry => (
                    <div key={entry.id} className="flex items-start gap-3 p-2.5 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                      <span className="text-sm shrink-0 mt-0.5">{categoryIcons[entry.category] || '📋'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-900">{entry.action}</span>
                          <span className="text-[10px] text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-[10px] text-gray-600 mt-0.5">{entry.details}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">by {entry.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-5">
              {/* Team Name */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Team Name</label>
                <input
                  type="text"
                  value={teamData.teamName}
                  onChange={(e) => handleUpdateTeamName(e.target.value)}
                  placeholder="My Team"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Invite Code */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Invite Code</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg font-mono font-bold tracking-wider text-gray-800">
                    {teamData.inviteCode}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(teamData.inviteCode).catch(() => {});
                    }}
                    className="px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
                  >
                    📋 Copy
                  </button>
                  {isOwner && (
                    <button
                      onClick={handleRegenerateInvite}
                      className="px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition"
                    >
                      🔄 Regenerate
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">Share this code with team members to let them join.</p>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center">
                  <div className="text-[10px] font-semibold text-indigo-600 uppercase">Members</div>
                  <div className="text-2xl font-bold text-indigo-900">{teamData.members.length}</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                  <div className="text-[10px] font-semibold text-purple-600 uppercase">Activity Entries</div>
                  <div className="text-2xl font-bold text-purple-900">{teamData.auditLog.length}</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-[10px] font-semibold text-green-600 uppercase">Editors</div>
                  <div className="text-2xl font-bold text-green-900">{teamData.members.filter(m => m.role === 'editor' || m.role === 'owner').length}</div>
                </div>
              </div>

              {/* Danger Zone */}
              {isOwner && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-red-800 uppercase mb-2">⚠️ Danger Zone</h4>
                  <button
                    onClick={() => {
                      if (confirm('Clear all team data and audit log? This cannot be undone.')) {
                        const fresh: TeamData = { members: teamData.members.filter(m => m.role === 'owner'), auditLog: [], teamName: teamData.teamName, inviteCode: generateInviteCode() };
                        setTeamData(fresh);
                        saveTeamData(fresh);
                      }
                    }}
                    className="px-4 py-2 text-xs font-bold text-red-700 bg-white hover:bg-red-100 border border-red-300 rounded-lg transition"
                  >
                    🗑️ Reset Team Data
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

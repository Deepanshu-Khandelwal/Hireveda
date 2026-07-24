import React, { useEffect, useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code2, 
  Trash2, Edit, Eye, AlertCircle, RefreshCw, ArrowLeft, Search, Database,
  Sparkles, Plus
} from 'lucide-react';
import Modal from './Modal';

const SubmissionsList = ({ onEditProfile, onBackToForm }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingProfile, setViewingProfile] = useState(null);

  const fetchProfiles = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/profiles');
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      } else {
        setError('Failed to retrieve profiles from the server.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the backend server. Make sure it is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDelete = async (id, name, e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete ${name}'s profile?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/profiles/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProfiles(profiles.filter(p => p._id !== id));
        if (viewingProfile && viewingProfile._id === id) {
          setViewingProfile(null);
        }
      } else {
        alert('Failed to delete profile.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while deleting.');
    }
  };

  // Filter profiles based on search term (Name, Title, or Skills)
  const filteredProfiles = profiles.filter(p => {
    const term = searchTerm.toLowerCase();
    const matchesName = p.fullName?.toLowerCase().includes(term);
    const matchesTitle = p.title?.toLowerCase().includes(term);
    const matchesSkills = p.technicalSkills?.some(s => s.toLowerCase().includes(term));
    return matchesName || matchesTitle || matchesSkills;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-slide-up">
      {/* Header bar of list */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-4 sm:p-5 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" /> Database Submissions
          </h2>
          <p className="text-xs text-slate-400">View and manage all portfolio profiles saved in MongoDB Atlas.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search bar & Refresh Button Group */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name, title, skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-650 focus:outline-none transition-colors w-full sm:w-60"
              />
            </div>
            <button
              onClick={fetchProfiles}
              className="p-2 bg-slate-950/50 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
              title="Refresh database entries"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onBackToForm}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold rounded-lg shadow cursor-pointer transition-all active:scale-98 w-full sm:w-auto text-center"
          >
            <Plus className="w-3.5 h-3.5" /> Create Profile
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center space-y-4 bg-slate-900/30 border border-slate-900 rounded-2xl">
          <div className="animate-spin w-8 h-8 border-4 border-t-indigo-500 border-indigo-500/25 rounded-full mx-auto" />
          <p className="text-slate-500 text-sm">Fetching entries from MongoDB...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-5 bg-pink-500/10 border border-pink-500/20 rounded-2xl text-center space-y-3 text-pink-400 max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-pink-500 mx-auto" />
          <p className="text-sm font-medium">{error}</p>
          <button 
            onClick={fetchProfiles}
            className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* List content */}
      {!loading && !error && (
        <>
          {filteredProfiles.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl space-y-4">
              <User className="w-10 h-10 text-slate-700 mx-auto" />
              <p className="text-slate-400 text-sm font-medium">
                {searchTerm ? 'No profiles match your search filters.' : 'No profiles found in the database.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={onBackToForm}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow cursor-pointer transition-colors"
                >
                  Fill Your First Resume Form
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((p) => (
                <div 
                  key={p._id} 
                  className="bg-slate-900/60 backdrop-blur-md border-y border-r border-l-4 border-slate-800/80 border-l-indigo-500/60 hover:border-indigo-500/40 hover:border-l-indigo-400 rounded-2xl p-5 shadow-lg hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(99,102,241,0.06)] transition-all duration-300 group flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div>
                      <h3 className="font-bold text-slate-100 text-base leading-snug group-hover:text-indigo-300 transition-colors">
                        {p.fullName}
                      </h3>
                      <p className="text-indigo-400 text-xs font-semibold mt-0.5">{p.title}</p>
                    </div>

                    {/* Contacts info list */}
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" /> <span className="truncate">{p.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" /> <span>{p.phone}</span>
                      </div>
                      {p.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" /> <span className="truncate">{p.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Tech Skills tags limit to 3 */}
                    {p.technicalSkills && p.technicalSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.technicalSkills.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] rounded font-medium">
                            {tag}
                          </span>
                        ))}
                        {p.technicalSkills.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-semibold self-center ml-1">
                            +{p.technicalSkills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Tray */}
                  <div className="flex items-center justify-between border-t border-slate-850 pt-3.5 mt-4">
                    <button
                      onClick={() => setViewingProfile(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-md active:scale-95 transition-all duration-150 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Resume Details
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditProfile(p)}
                        className="p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded transition-all cursor-pointer"
                        title="Edit profile data"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(p._id, p.fullName, e)}
                        className="p-1.5 text-slate-500 hover:text-pink-500 hover:bg-pink-500/10 rounded transition-all cursor-pointer"
                        title="Delete profile entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ================= READ-ONLY DETAILS RESUME MODAL ================= */}
      {viewingProfile && (
        <Modal 
          isOpen={!!viewingProfile} 
          onClose={() => setViewingProfile(null)} 
          title={`${viewingProfile.fullName}'s Profile Summary`}
        >
          <div className="space-y-6 text-left">
            {/* Header info */}
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-slate-100">{viewingProfile.fullName}</h2>
              <p className="text-indigo-400 text-sm font-semibold">{viewingProfile.title}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 mt-3">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-indigo-500" /> {viewingProfile.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-indigo-500" /> {viewingProfile.phone}</span>
                {viewingProfile.location && (
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-indigo-500" /> {viewingProfile.location}</span>
                )}
              </div>

              {viewingProfile.bio && (
                <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                  {viewingProfile.bio}
                </p>
              )}
            </div>

            {/* Experience */}
            {viewingProfile.experience && viewingProfile.experience.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Work Experience
                </h4>
                <div className="space-y-3">
                  {viewingProfile.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-start flex-wrap text-xs">
                        <span className="font-semibold text-slate-200">{exp.role} <span className="text-indigo-400">@ {exp.company}</span></span>
                        <span className="text-slate-500">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      {exp.description && <p className="text-slate-400 text-[11px] leading-relaxed pl-2 border-l border-slate-800">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {viewingProfile.education && viewingProfile.education.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-850/60">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Education
                </h4>
                <div className="space-y-3">
                  {viewingProfile.education.map((edu, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between items-start flex-wrap">
                        <span className="font-semibold text-slate-200">{edu.degree}</span>
                        <span className="text-slate-500">{edu.passingYear}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span>{edu.institution}</span>
                        {edu.grade && <span className="bg-indigo-500/10 px-1.5 py-0.5 rounded text-indigo-400">Grade: {edu.grade}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            <div className="space-y-3 pt-4 border-t border-slate-850/60">
              {viewingProfile.technicalSkills && viewingProfile.technicalSkills.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Code2 className="w-3 h-3 text-indigo-400" /> Tech Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {viewingProfile.technicalSkills.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-xs rounded">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {viewingProfile.softSkills && viewingProfile.softSkills.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Sparkles className="w-3 h-3 text-purple-400" /> Soft Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {viewingProfile.softSkills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-xs rounded">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SubmissionsList;

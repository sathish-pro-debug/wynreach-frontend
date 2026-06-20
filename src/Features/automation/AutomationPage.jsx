// frontend/src/Features/automation/AutomationPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, GitBranch, Lightbulb, Play, RefreshCw
} from 'lucide-react';
import CreateRuleModal from './CreateRuleModal';
import CreateSequenceModal from './CreateSequenceModal';
import { 
  getSequences, 
  deleteSequence, 
  toggleSequence, 
  testSequence
} from '../../services/automationApi';

const Button = ({ children, variant = 'primary', leftIcon, onClick, disabled = false }) => {
  const baseClass = "inline-flex items-center gap-2 rounded-lg font-semibold transition-all px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";
  return (
    <button className={`${baseClass} ${variantClass}`} onClick={onClick} disabled={disabled}>
      {leftIcon && leftIcon}
      {children}
    </button>
  );
};

const Badge = ({ children, variant }) => {
  const variantClass = variant === 'active' 
    ? "bg-emerald-50 text-emerald-700" 
    : variant === 'completed' 
    ? "bg-blue-50 text-blue-700"
    : "bg-amber-50 text-amber-700";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${variantClass}`}>
      {children}
    </span>
  );
};

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${checked ? 'bg-emerald-500' : 'bg-slate-300'}`}
  >
    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

// ✅ Updated SequenceCard - Only Toggle and Test buttons (No Play/Schedule, No Delete)
const SequenceCard = ({ sequence, onToggle, onTest }) => {
  const isActive = sequence.status === 'active';
  const isCompleted = sequence.status === 'completed';
  const steps = sequence.steps || [];
  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const totalSteps = steps.length;
  
  // Calculate next step time
  let nextStepTime = null;
  let nextStepIndex = null;
  if (isActive) {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].status === 'scheduled' && steps[i].scheduled_at) {
        nextStepTime = steps[i].scheduled_at;
        nextStepIndex = i + 1;
        break;
      }
    }
  }
  
  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
          <GitBranch className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-900">{sequence.name}</p>
            <Badge variant={isCompleted ? 'completed' : isActive ? 'active' : 'paused'}>
              {isCompleted ? 'Completed' : isActive ? 'Active' : 'Paused'}
            </Badge>
            <span className="text-xs text-slate-400">
              {completedSteps}/{totalSteps} steps
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Campaign: {sequence.campaign_name || 'N/A'} • 
            {nextStepTime ? ` Next: Step ${nextStepIndex} at ${new Date(nextStepTime).toLocaleString()}` : 
             isCompleted ? ' ✅ All steps completed' : ' No pending steps'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* ✅ Only Test button */}
        <button 
          onClick={() => onTest(sequence)} 
          className="p-1.5 hover:bg-slate-100 rounded transition-colors" 
          title="Test sequence"
        >
          <Play className="h-4 w-4 text-green-500" />
        </button>
        {/* ✅ Toggle only if not completed */}
        {!isCompleted && (
          <Toggle checked={isActive} onChange={(checked) => onToggle(sequence.id, checked)} />
        )}
      </div>
    </div>
  );
};

// Rule Card Component (unchanged)
const RuleCard = ({ rule, onToggle, onDelete, onTest }) => {
  const isActive = rule.status === 'active';
  
  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg">⚡</div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-900">{rule.name}</p>
            <Badge variant={isActive ? 'active' : 'paused'}>{isActive ? 'Active' : 'Paused'}</Badge>
          </div>
          <p className="text-sm text-slate-500">Trigger: {rule.trigger_type} • Action: {rule.action_type}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onTest(rule)} className="p-1.5 hover:bg-slate-100 rounded" title="Test">
          <Play className="h-4 w-4 text-green-500" />
        </button>
        <button onClick={() => onDelete(rule)} className="p-1.5 hover:bg-red-100 rounded" title="Delete">
          <Trash2 className="h-4 w-4 text-red-400" />
        </button>
        <Toggle checked={isActive} onChange={(checked) => onToggle(rule.id, checked)} />
      </div>
    </div>
  );
};

export default function AutomationPage() {
  const navigate = useNavigate();
  const [rules, setRules] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  const [error, setError] = useState(null);

  const loadSequences = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('📋 Fetching sequences from API...');
      
      const data = await getSequences();
      console.log('✅ Sequences loaded:', data);
      setSequences(data || []);
      
    } catch (error) {
      console.error('❌ Failed to load sequences:', error);
      setError('Failed to load sequences. Please refresh the page.');
      setSequences([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSequences();
  }, []);

  const handleToggleSequence = async (seqId, shouldActivate) => {
    try {
      await toggleSequence(seqId, shouldActivate);
      setSequences(sequences.map(seq => 
        seq.id === seqId ? { ...seq, status: shouldActivate ? 'active' : 'paused' } : seq
      ));
      console.log(`✅ Sequence ${shouldActivate ? 'activated' : 'paused'}`);
    } catch (error) {
      console.error('❌ Error toggling sequence:', error);
      alert('Failed to toggle sequence status');
    }
  };

  const handleTestSequence = async (sequence) => {
    try {
      const result = await testSequence(sequence.id);
      alert(`✅ Test executed: ${result.message || 'Sequence test successful'}`);
    } catch (error) {
      console.error('❌ Error testing sequence:', error);
      alert('Failed to test sequence');
    }
  };

  const handleCreateSequence = (newSequence) => {
    console.log('📝 New sequence created:', newSequence);
    setSequences(prev => [newSequence, ...prev]);
    setTimeout(loadSequences, 1000);
  };

  const handleCreateRule = (newRule) => {
    setRules([newRule, ...rules]);
  };

  const handleToggleRule = (ruleId, shouldActivate) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, status: shouldActivate ? 'active' : 'paused' } : rule
    ));
  };

  const handleDeleteRule = (rule) => {
    if (confirm(`Delete rule "${rule.name}"?`)) {
      setRules(rules.filter(r => r.id !== rule.id));
    }
  };

  const handleTestRule = (rule) => {
    alert(`Testing rule: ${rule.name}\nThis would execute the automation.`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-slate-500">Loading sequences...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Automation</h1>
            <p className="text-sm text-slate-400">Create rules and sequences to automate your marketing</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={loadSequences}>
            Refresh
          </Button>
          <Button variant="secondary" leftIcon={<GitBranch className="h-4 w-4" />} onClick={() => setShowSequenceModal(true)}>
            New Sequence
          </Button>
          <Button variant="primary" leftIcon={<Zap className="h-4 w-4" />} onClick={() => setShowRuleModal(true)}>
            New Rule
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3">
        <Lightbulb className="h-5 w-5 text-blue-600" />
        <p className="text-sm text-blue-700">
          <strong>Rules:</strong> Single trigger → action &nbsp;|&nbsp; 
          <strong>Sequences:</strong> Multi-step follow-ups based on campaign sent time.
          <br />
          Toggle ON to activate. When active, steps will send automatically based on campaign sent time.
          Toggle OFF to pause. When toggled ON again, steps resume from the current time.
        </p>
      </div>

      {/* Rules Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-4 w-4 text-yellow-500" />
          <h2 className="text-sm font-semibold text-slate-500 uppercase">Automation Rules</h2>
          <span className="text-xs text-slate-400">({rules.length})</span>
        </div>
        <div className="space-y-3">
          {rules.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-sm text-slate-400">No rules yet. Click "New Rule" to create one.</p>
            </div>
          ) : (
            rules.map((rule) => (
              <RuleCard
                key={rule.id}
                rule={rule}
                onToggle={handleToggleRule}
                onDelete={handleDeleteRule}
                onTest={handleTestRule}
              />
            ))
          )}
        </div>
      </div>

      {/* Sequences Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="h-4 w-4 text-purple-600" />
          <h2 className="text-sm font-semibold text-slate-500 uppercase">Follow-up Sequences</h2>
          <span className="text-xs text-slate-400">({sequences.length})</span>
        </div>
        <div className="space-y-3">
          {sequences.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-sm text-slate-400">No sequences yet. Click "New Sequence" to create one.</p>
            </div>
          ) : (
            sequences.map((seq) => (
              <SequenceCard
                key={seq.id}
                sequence={seq}
                onToggle={handleToggleSequence}
                onTest={handleTestSequence}
              />
            ))
          )}
        </div>
      </div>

      <CreateRuleModal
        isOpen={showRuleModal}
        onClose={() => setShowRuleModal(false)}
        onSave={handleCreateRule}
      />

      <CreateSequenceModal
        isOpen={showSequenceModal}
        onClose={() => setShowSequenceModal(false)}
        onSave={handleCreateSequence}
      />
    </div>
  );
}
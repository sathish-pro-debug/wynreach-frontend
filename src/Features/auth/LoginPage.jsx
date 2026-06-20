import { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff, Phone, Building } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';

const API_BASE = 'https://wynreach-backend.onrender.com/api';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/\d/, 'Must contain at least one number')
    .regex(/[@$!%*?&]/, 'Must contain at least one special character (@$!%*?&)'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Input component
const Input = forwardRef(({ label, type = 'text', placeholder, leftAddon, rightAddon, error, ...props }, ref) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
    <div className="relative">
      {leftAddon && <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">{leftAddon}</div>}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all ${leftAddon ? 'pl-9' : 'pl-3'} ${rightAddon ? 'pr-9' : 'pr-3'} ${error ? 'border-red-300' : ''}`}
        {...props}
      />
      {rightAddon && <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightAddon}</div>}
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
));

const Button = ({ children, type = 'button', fullWidth = false, loading = false, onClick }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={loading}
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all px-4 py-2.5 text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 shadow-sm ${fullWidth ? 'w-full' : ''}`}
  >
    {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
    {children}
  </button>
);

const Alert = ({ children, type = 'error' }) => {
  const styles = type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700';
  return <div className={`rounded-lg border ${styles} p-3 text-sm`}>{children}</div>;
};

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;
  const inputType = visible ? 'text' : 'password';
  const toggle = () => setVisible(!visible);
  return { inputType, Icon, toggle };
};

// ✅ CHANGE 1: Added initialMode prop with default value 'login'
export default function LoginPage({ initialMode = 'login' }) {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore(); // ✅ Use the store directly
  
  // ✅ CHANGE 2: Use the prop instead of hardcoded 'true'
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const loginPassword = usePasswordToggle();
  const signupPassword = usePasswordToggle();
  const confirmPassword = usePasswordToggle();

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors }, setValue: setLoginValue } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { full_name: '', email: '', phone: '', company: '', password: '', confirmPassword: '' }
  });

  const handleLogin = async (data) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email.trim(), password: data.password }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.detail || 'Login failed');

      // Store in Zustand store
      setAuth(
        json.user,
        json.workspace,
        json.access_token,
        json.refresh_token
      );
      
      // Also store in localStorage for persistence
      localStorage.setItem('auth', JSON.stringify({
        user: json.user,
        accessToken: json.access_token,
        refreshToken: json.refresh_token,
        workspace: json.workspace
      }));

      navigate('/', { replace: true });
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data) => {
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone || '',
          company: data.company || '',
          password: data.password,
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.detail || 'Signup failed');
      
      // Store in Zustand store
      setAuth(
        json.user,
        json.workspace,
        json.access_token,
        json.refresh_token
      );
      
      localStorage.setItem('auth', JSON.stringify({
        user: json.user,
        accessToken: json.access_token,
        refreshToken: json.refresh_token,
        workspace: json.workspace
      }));
      
      navigate('/', { replace: true });
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) { setForgotMessage('Please enter your email'); return; }
    setIsSending(true);
    setForgotMessage(null);
    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });
      const json = await response.json();
      setForgotMessage(response.ok ? (json.message || 'Reset link sent!') : (json.detail || 'Something went wrong'));
    } catch {
      setForgotMessage('Network error. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const fillDemo = () => {
    setLoginValue('email', 'admin@gmail.com');
    setLoginValue('password', 'Admin@123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-md mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">WYNReach</h1>
            <p className="text-sm text-slate-500 mt-1">{isLogin ? 'Sign in to your workspace' : 'Create a new account'}</p>
          </div>

          {authError && <Alert type="error">{authError}</Alert>}
          {authSuccess && <Alert type="success">{authSuccess}</Alert>}

          {showForgot ? (
            <div className="space-y-4">
              <Input label="Email address" type="email" placeholder="you@company.com" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
              {forgotMessage && <div className={`rounded-lg border p-3 text-sm ${forgotMessage.includes('sent') || forgotMessage.includes('!') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>{forgotMessage}</div>}
              <Button onClick={handleForgotPassword} fullWidth loading={isSending}>Send reset link</Button>
              <button onClick={() => { setShowForgot(false); setForgotMessage(null); setForgotEmail(''); }} className="text-sm text-indigo-600 hover:underline w-full text-center">Back to sign in</button>
            </div>
          ) : (
            <>
              {isLogin ? (
                <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-4">
                  <Input label="Email" type="email" placeholder="you@company.com" leftAddon={<Mail className="h-4 w-4" />} error={loginErrors.email?.message} {...registerLogin('email')} />
                  <Input label="Password" type={loginPassword.inputType} placeholder="••••••••" leftAddon={<Lock className="h-4 w-4" />}
                    rightAddon={<button type="button" onClick={loginPassword.toggle} className="focus:outline-none"><loginPassword.Icon className="h-4 w-4 text-slate-400 hover:text-indigo-600" /></button>}
                    error={loginErrors.password?.message} {...registerLogin('password')} />
                  <div className="flex justify-between items-center">
                    <button type="button" onClick={fillDemo} className="text-xs text-indigo-600 hover:underline">Fill demo credentials</button>
                    <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-indigo-600 hover:underline">Forgot password?</button>
                  </div>
                  <Button type="submit" fullWidth loading={isLoading}>Sign in</Button>
                  <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50 p-3">
                    <p className="text-xs font-semibold text-indigo-800 mb-1">Demo Credentials</p>
                    <div className="space-y-1 text-xs text-slate-600">
                      <p><span className="font-medium">Email:</span> admin@gmail.com</p>
                      <p><span className="font-medium">Password:</span> Admin@123</p>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit(handleSignup)} className="space-y-4">
                  <Input label="Full name" type="text" placeholder="John Doe" leftAddon={<User className="h-4 w-4" />} error={signupErrors.full_name?.message} {...registerSignup('full_name')} />
                  <Input label="Email" type="email" placeholder="you@company.com" leftAddon={<Mail className="h-4 w-4" />} error={signupErrors.email?.message} {...registerSignup('email')} />
                  <Input label="Phone (Optional)" type="tel" placeholder="+91 98765 43210" leftAddon={<Phone className="h-4 w-4" />} {...registerSignup('phone')} />
                  <Input label="Company (Optional)" type="text" placeholder="Your Company Name" leftAddon={<Building className="h-4 w-4" />} {...registerSignup('company')} />
                  
                  <Input 
                    label="Password" 
                    type={signupPassword.inputType} 
                    placeholder="Create a strong password" 
                    leftAddon={<Lock className="h-4 w-4" />}
                    rightAddon={
                      <button type="button" onClick={signupPassword.toggle} className="focus:outline-none">
                        <signupPassword.Icon className="h-4 w-4 text-slate-400 hover:text-indigo-600" />
                      </button>
                    }
                    error={signupErrors.password?.message} 
                    {...registerSignup('password')} 
                  />
                  <p className="text-xs text-slate-400 -mt-2">Must be at least 8 characters with uppercase, lowercase, number, and special character</p>
                  
                  <Input 
                    label="Confirm Password" 
                    type={confirmPassword.inputType} 
                    placeholder="Confirm your password" 
                    leftAddon={<Lock className="h-4 w-4" />}
                    rightAddon={
                      <button type="button" onClick={confirmPassword.toggle} className="focus:outline-none">
                        <confirmPassword.Icon className="h-4 w-4 text-slate-400 hover:text-indigo-600" />
                      </button>
                    }
                    error={signupErrors.confirmPassword?.message} 
                    {...registerSignup('confirmPassword')} 
                  />
                  
                  <Button type="submit" fullWidth loading={isLoading}>Create account</Button>
                </form>
              )}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button type="button" onClick={() => { setIsLogin(!isLogin); setAuthError(null); setAuthSuccess(null); }} className="text-indigo-600 hover:underline font-medium">
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">© 2026 WYNReach · Privacy · Terms</p>
      </div>
    </div>
  );
}
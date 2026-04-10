import { useState, useEffect, useRef } from "react";

const API_BASE_URL = "https://your-api-link-here.com";

// API helper — all requests go through here
const api = {
  post: async (endpoint, body) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
  },
};

// ─── Styles ────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .auth-root {
    min-height: 100vh;
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .bg-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
    animation: pulse-glow 6s ease-in-out infinite alternate;
  }
  .bg-glow-1 { width: 500px; height: 500px; background: rgba(99, 60, 255, 0.12); top: -100px; left: -100px; }
  .bg-glow-2 { width: 400px; height: 400px; background: rgba(0, 200, 150, 0.08); bottom: -80px; right: -80px; animation-delay: -3s; }

  @keyframes pulse-glow {
    from { opacity: 0.6; transform: scale(1); }
    to { opacity: 1; transform: scale(1.1); }
  }

  .auth-card {
    position: relative;
    width: 100%;
    max-width: 520px;
    margin: 2rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 2.5rem;
    backdrop-filter: blur(20px);
    animation: card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes card-in {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .auth-card.wide { max-width: 640px; }

  .brand {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 2rem;
  }
  .brand-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, #633cff, #00c896);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .brand-name {
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 18px;
    color: #fff; letter-spacing: -0.02em;
  }

  .page-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 26px;
    color: #fff; letter-spacing: -0.03em;
    margin-bottom: 0.3rem;
  }
  .page-sub {
    font-size: 14px; color: rgba(255,255,255,0.4);
    margin-bottom: 2rem; line-height: 1.5;
  }

  .step-bar {
    display: flex; gap: 6px; margin-bottom: 2rem;
  }
  .step-seg {
    height: 3px; flex: 1; border-radius: 99px;
    background: rgba(255,255,255,0.1);
    transition: background 0.4s;
  }
  .step-seg.active { background: #633cff; }
  .step-seg.done { background: #00c896; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-row.three { grid-template-columns: 1fr 1fr 1fr; }

  .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .field label {
    font-size: 12px; font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.04em; text-transform: uppercase;
  }

  .field input, .field select {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 14px; font-family: 'DM Sans', sans-serif;
    color: #fff;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    -webkit-appearance: none;
  }
  .field input::placeholder { color: rgba(255,255,255,0.2); }
  .field input:focus, .field select:focus {
    border-color: rgba(99,60,255,0.6);
    background: rgba(99,60,255,0.06);
  }
  .field input[readonly] {
    background: rgba(0,200,150,0.05);
    border-color: rgba(0,200,150,0.2);
    color: #00c896;
    cursor: default; font-size: 13px;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.05em;
  }
  .field select option { background: #1a1a2e; color: #fff; }

  .field-note { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 2px; }

  .btn-primary {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg, #633cff, #4f2ee8);
    border: none; border-radius: 12px;
    color: #fff; font-family: 'Syne', sans-serif;
    font-weight: 600; font-size: 15px;
    cursor: pointer; letter-spacing: -0.01em;
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
    margin-top: 6px;
    box-shadow: 0 8px 32px rgba(99,60,255,0.3);
  }
  .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(99,60,255,0.4); }
  .btn-primary:active:not(:disabled) { transform: scale(0.98); opacity: 0.9; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-ghost {
    background: none; border: none;
    color: #633cff; font-size: 14px;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-weight: 500; text-decoration: underline;
    padding: 0;
  }
  .btn-ghost:hover { color: #7a55ff; }

  .switch-text {
    text-align: center; margin-top: 1.5rem;
    font-size: 13px; color: rgba(255,255,255,0.35);
  }

  .divider {
    display: flex; align-items: center; gap: 12px;
    margin: 1.2rem 0;
  }
  .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
  .divider-text { font-size: 12px; color: rgba(255,255,255,0.25); white-space: nowrap; }

  .section-title {
    font-size: 11px; font-weight: 500;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase; letter-spacing: 0.08em;
    margin-bottom: 12px; margin-top: 4px;
  }

  .otp-wrap {
    display: flex; gap: 10px; justify-content: center;
    margin: 1.5rem 0;
  }
  .otp-box {
    width: 52px; height: 60px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    font-size: 22px; font-weight: 700;
    font-family: 'Syne', sans-serif;
    color: #fff; text-align: center;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    caret-color: #633cff;
  }
  .otp-box:focus {
    border-color: rgba(99,60,255,0.7);
    background: rgba(99,60,255,0.08);
  }
  .otp-box.filled { border-color: rgba(0,200,150,0.4); color: #00c896; }

  .otp-hint {
    text-align: center; font-size: 13px;
    color: rgba(255,255,255,0.3); margin-bottom: 0.5rem;
  }

  .email-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(99,60,255,0.1);
    border: 1px solid rgba(99,60,255,0.25);
    border-radius: 99px; padding: 5px 12px;
    font-size: 13px; color: rgba(255,255,255,0.7);
    margin-bottom: 1.2rem;
  }
  .email-badge span { font-size: 15px; }

  .resend-row {
    display: flex; align-items: center; justify-content: center;
    gap: 6px; margin-top: 1rem;
    font-size: 13px; color: rgba(255,255,255,0.3);
  }

  .success-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, rgba(0,200,150,0.2), rgba(0,200,150,0.05));
    border: 1px solid rgba(0,200,150,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; margin: 0 auto 1.5rem;
    animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes pop-in {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .password-wrap { position: relative; }
  .password-wrap input { padding-right: 44px; }
  .toggle-pw {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.3); font-size: 16px; padding: 4px;
    transition: color 0.2s;
  }
  .toggle-pw:hover { color: rgba(255,255,255,0.7); }

  .error-msg {
    font-size: 12px; color: #ff6b6b;
    margin-top: 4px;
  }

  .api-error {
    background: rgba(255, 107, 107, 0.08);
    border: 1px solid rgba(255, 107, 107, 0.25);
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 13px; color: #ff6b6b;
    margin-bottom: 14px;
    text-align: center;
  }

  .loading-spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 500px) {
    .auth-card { padding: 1.8rem 1.4rem; margin: 1rem; }
    .form-row { grid-template-columns: 1fr; }
    .form-row.three { grid-template-columns: 1fr; }
    .otp-box { width: 42px; height: 52px; font-size: 18px; }
  }
`;

// ─── Brand header shared across pages ─────────────────────────
function Brand() {
  return (
    <div className="brand">
      <div className="brand-icon">💬</div>
      <span className="brand-name">Nexus</span>
    </div>
  );
}

// ─── Signup Page ───────────────────────────────────────────────
// API call: POST /api/auth/signup
// Expected request body:
//   { firstName, middleName, lastName, email, password, age, phone, location }
// Expected response:
//   { success: true, userID: "...", message: "..." }
// On error, the API should return a non-2xx status with { message: "..." }
function SignupPage({ onNext }) {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    email: "", password: "", confirmPassword: "",
    age: "", phone: "", location: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    if (!form.age || form.age < 13 || form.age > 120) e.age = "Age 13–120";
    if (!form.phone.match(/^\+?[\d\s\-]{8,}$/)) e.phone = "Enter a valid phone";
    if (!form.location.trim()) e.location = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await api.post("/api/auth/signup", {
        firstName: form.firstName,
        middleName: form.middleName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        age: form.age,
        phone: form.phone,
        location: form.location,
      });
      // data.userID → comes back from your API after successful signup
      onNext({ email: form.email, userID: data.userID });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card wide">
      <Brand />
      <div className="step-bar">
        <div className="step-seg active" />
        <div className="step-seg" />
        <div className="step-seg" />
      </div>
      <p className="page-title">Create your account</p>
      <p className="page-sub">Step 1 of 3 — Fill in your details to get started</p>

      {apiError && <div className="api-error">{apiError}</div>}

      <div className="section-title">Your identity</div>
      <div className="form-row three">
        <div className="field">
          <label>First name *</label>
          <input placeholder="Aarav" value={form.firstName} onChange={set("firstName")} />
          {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
        </div>
        <div className="field">
          <label>Middle name</label>
          <input placeholder="Kumar" value={form.middleName} onChange={set("middleName")} />
        </div>
        <div className="field">
          <label>Last name *</label>
          <input placeholder="Sharma" value={form.lastName} onChange={set("lastName")} />
          {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 8 }}>Contact info</div>
      <div className="form-row">
        <div className="field">
          <label>Email *</label>
          <input type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>
        <div className="field">
          <label>Phone *</label>
          <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Age *</label>
          <input type="number" min="13" max="120" placeholder="21" value={form.age} onChange={set("age")} />
          {errors.age && <span className="error-msg">{errors.age}</span>}
        </div>
        <div className="field">
          <label>Location *</label>
          <input placeholder="Delhi, India" value={form.location} onChange={set("location")} />
          {errors.location && <span className="error-msg">{errors.location}</span>}
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 8 }}>Security</div>
      <div className="form-row">
        <div className="field">
          <label>Password *</label>
          <input type="password" placeholder="Min 6 characters" value={form.password} onChange={set("password")} />
          {errors.password && <span className="error-msg">{errors.password}</span>}
        </div>
        <div className="field">
          <label>Confirm password *</label>
          <input type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={set("confirmPassword")} />
          {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
        </div>
      </div>

      <button className="btn-primary" onClick={submit} disabled={loading}>
        {loading && <span className="loading-spinner" />}
        {loading ? "Creating account…" : "Continue to Login →"}
      </button>

      <p className="switch-text">
        Already have an account? <button className="btn-ghost" onClick={() => onNext({ skip: "login" })}>Sign in</button>
      </p>
    </div>
  );
}

// ─── Login Page ────────────────────────────────────────────────
// API call: POST /api/auth/login
// Expected request body: { email, password }
// Expected response:
//   { success: true, message: "OTP sent to email" }
// On error, return non-2xx with { message: "Invalid credentials" } etc.
function LoginPage({ email: prefillEmail, onNext, onBack }) {
  const [email, setEmail] = useState(prefillEmail || "");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (!password) e.password = "Enter your password";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post("/api/auth/login", { email, password });
      // If successful, backend sends an OTP to the email
      onNext({ email });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <Brand />
      <div className="step-bar">
        <div className="step-seg done" />
        <div className="step-seg active" />
        <div className="step-seg" />
      </div>
      <p className="page-title">Welcome back</p>
      <p className="page-sub">Step 2 of 3 — Sign in to your account</p>

      {apiError && <div className="api-error">{apiError}</div>}

      <div className="field">
        <label>Email address</label>
        <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>

      <div className="field">
        <label>Password</label>
        <div className="password-wrap">
          <input
            type={show ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
          />
          <button className="toggle-pw" onClick={() => setShow(s => !s)}>{show ? "🙈" : "👁️"}</button>
        </div>
        {errors.password && <span className="error-msg">{errors.password}</span>}
      </div>

      <div style={{ textAlign: "right", marginTop: -6, marginBottom: 14 }}>
        <button className="btn-ghost" style={{ fontSize: 13 }}>Forgot password?</button>
      </div>

      <button className="btn-primary" onClick={submit} disabled={loading}>
        {loading && <span className="loading-spinner" />}
        {loading ? "Sending OTP…" : "Send OTP →"}
      </button>

      <div className="divider">
        <div className="divider-line" />
        <span className="divider-text">or</span>
        <div className="divider-line" />
      </div>

      <p className="switch-text" style={{ marginTop: 0 }}>
        Don't have an account? <button className="btn-ghost" onClick={onBack}>Sign up</button>
      </p>
    </div>
  );
}

// ─── OTP Page ──────────────────────────────────────────────────
// API call 1: POST /api/auth/verify-otp
// Expected request body: { email, otp }
// Expected response: { success: true, token: "jwt-token", user: { ... } }
//
// API call 2 (resend): POST /api/auth/resend-otp
// Expected request body: { email }
// Expected response: { success: true, message: "OTP resent" }
function OTPPage({ email, onSuccess, onBack }) {
  const [entered, setEntered] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendCount, setResendCount] = useState(30);
  const refs = useRef([]);

  useEffect(() => {
    if (resendCount <= 0) return;
    const t = setInterval(() => setResendCount(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCount]);

  const handleKey = (i, e) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...entered];
    next[i] = val;
    setEntered(next);
    setError("");
    if (val && i < 5) refs.current[i + 1]?.focus();
    if (!val && e.nativeEvent.inputType === "deleteContentBackward" && i > 0) refs.current[i - 1]?.focus();
  };

  const verify = async () => {
    const typed = entered.join("");
    if (typed.length < 6) { setError("Enter all 6 digits"); return; }
    setLoading(true);
    setError("");
    try {
      const data = await api.post("/api/auth/verify-otp", { email, otp: typed });
      // Optionally store the token: localStorage.setItem("token", data.token)
      setVerified(true);
    } catch (err) {
      setError(err.message || "Incorrect OTP. Try again.");
      setEntered(["", "", "", "", "", ""]);
      refs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setResendLoading(true);
    setError("");
    try {
      await api.post("/api/auth/resend-otp", { email });
      setResendCount(30);
      setEntered(["", "", "", "", "", ""]);
      refs.current[0]?.focus();
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  if (verified) return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <Brand />
      <div className="success-icon">✅</div>
      <p className="page-title" style={{ textAlign: "center" }}>You're in!</p>
      <p className="page-sub" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Identity verified. Welcome to Nexus.
      </p>
      <button className="btn-primary" onClick={onSuccess}>Go to Dashboard →</button>
    </div>
  );

  return (
    <div className="auth-card">
      <Brand />
      <div className="step-bar">
        <div className="step-seg done" />
        <div className="step-seg done" />
        <div className="step-seg active" />
      </div>
      <p className="page-title">Verify it's you</p>
      <p className="page-sub">Step 3 of 3 — Enter the 6-digit code sent to</p>

      <div className="email-badge">
        <span>✉️</span> {email}
      </div>

      <p className="otp-hint">Check your email inbox (and spam folder)</p>

      <div className="otp-wrap">
        {entered.map((v, i) => (
          <input
            key={i}
            ref={el => refs.current[i] = el}
            className={`otp-box${v ? " filled" : ""}`}
            type="text" inputMode="numeric"
            maxLength={1} value={v}
            onChange={e => handleKey(i, e)}
            onKeyDown={e => { if (e.key === "Backspace" && !v && i > 0) refs.current[i - 1]?.focus(); }}
          />
        ))}
      </div>

      {error && <p className="error-msg" style={{ textAlign: "center", marginBottom: 8 }}>{error}</p>}

      <button className="btn-primary" onClick={verify} disabled={loading}>
        {loading && <span className="loading-spinner" />}
        {loading ? "Verifying…" : "Verify & Continue →"}
      </button>

      <div className="resend-row">
        {resendCount > 0
          ? <span>Resend OTP in <strong style={{ color: "rgba(255,255,255,0.6)" }}>{resendCount}s</strong></span>
          : resendLoading
            ? <span><span className="loading-spinner" />Resending…</span>
            : <><span>Didn't receive it?</span><button className="btn-ghost" onClick={resend}>Resend OTP</button></>
        }
      </div>

      <p className="switch-text">
        <button className="btn-ghost" onClick={onBack}>← Back to login</button>
      </p>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("signup");
  const [ctx, setCtx] = useState({ email: "", userID: "" });

  const fromSignup = (data) => {
    if (data.skip === "login") { setPage("login"); return; }
    setCtx(data);
    setPage("login");
  };

  const fromLogin = (data) => {
    setCtx(c => ({ ...c, ...data }));
    setPage("otp");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />

        {page === "signup" && <SignupPage onNext={fromSignup} />}
        {page === "login" && (
          <LoginPage
            email={ctx.email}
            onNext={fromLogin}
            onBack={() => setPage("signup")}
          />
        )}
        {page === "otp" && (
          <OTPPage
            email={ctx.email}
            onSuccess={() => setPage("dashboard")}
            onBack={() => setPage("login")}
          />
        )}
        {page === "dashboard" && (
          <div className="auth-card" style={{ textAlign: "center" }}>
            <Brand />
            <div className="success-icon" style={{ fontSize: 32 }}>🎉</div>
            <p className="page-title" style={{ textAlign: "center" }}>Welcome to Nexus!</p>
            <p className="page-sub" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              Your account is fully set up. Chat dashboard loads here.
            </p>
            <button className="btn-primary" onClick={() => { setPage("signup"); setCtx({ email: "", userID: "" }); }}>
              ← Start over (demo)
            </button>
          </div>
        )}
      </div>
    </>
  );
}

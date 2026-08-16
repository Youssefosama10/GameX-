"use client"
import Link from 'next/link';
import { useState } from 'react'
import { FormState, useForm } from 'react-hook-form';
import { RegisterObjectType, RegisterSchema } from './Register.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterAvtion } from './Register.Actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function RegisterForm() {
  const [showPw, setShowPw] = useState(false);
  const [password, setPassword] = useState("");
  const strength = getStrength(password);
  const [agreed, setAgreed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  

  function IconUser() {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    );
  }
  
  function IconMail() {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  
  function IconLock() {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  
  function IconEye({ open }: { open: boolean }) {
    return open ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  }
  
  function strengthBarClass(barIdx: number, level: number) {
    if (level === 0 || barIdx > level) return "";
    if (level === 1) return "weak";
    if (level === 2) return "medium";
    return "strong";
  }
  
  function getStrength(pw: string): { level: number; label: string } {
    if (!pw) return { level: 0, label: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
  
    if (score <= 1) return { level: 1, label: "Weak" };
    if (score === 2) return { level: 2, label: "Medium" };
    if (score === 3) return { level: 3, label: "Strong" };
    return { level: 4, label: "Very Strong" };
  }
  
  const [isLoding,  setIsLoading] = useState(false)

 const router =  useRouter()


 const { handleSubmit , register , formState } = useForm<RegisterObjectType>( {
  resolver : zodResolver(RegisterSchema)
 } )


// base URL = https://game-x-flax.vercel.app/api/v1/


async function MyhandleSubmit( valuefromRegister : RegisterObjectType )
 {
  setIsLoading(true)

 const isRegisterSuccessfuly = await RegisterAvtion( valuefromRegister )

 if( isRegisterSuccessfuly.success )
 {
   


  toast.success(`${isRegisterSuccessfuly.message}`)
  setTimeout(() => {
   router.push("/login")
  }, 2000);
 


  
} else {

    toast.error(isRegisterSuccessfuly.message)
   
 }
 setIsLoading(false)
  

  console.log("value from Register from" , valuefromRegister);
  
 }

  return (
    <>

<form id="register-form" onSubmit={handleSubmit(MyhandleSubmit)} noValidate>
              {/* Full name */}
              <div className="form-group">
                <label htmlFor="full-name" className="form-label">Frist Name</label>
                <div className="input-wrap">
                  <span className="input-icon"><IconUser /></span>
                  <input
                    id="full-name"
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    {...register("firstName")}
                    />
                </div>
                    { formState.errors.firstName && formState.touchedFields.firstName && <p className='text-red-500'>{formState.errors.firstName.message}</p> }
              </div>
              
              {/* lastName */}
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">LastName</label>
                <div className="input-wrap">
                  <span className="input-icon"><IconUser /></span>
                  <input
                    id="lastName"
                    type="text"
                    className="form-input"
                    placeholder="Enter your lastName"
                    {...register("lastName")}
                  />
                </div>
                { formState.errors.lastName && formState.touchedFields.lastName && <p className='text-red-500'>{formState.errors.lastName.message}</p> }
              </div>

              {/* Email + Username row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="input-wrap">
                    <span className="input-icon"><IconMail /></span>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="Enter your email"
                      autoComplete="email"
                      {...register("email")}
                    />
                  </div>
                  { formState.errors.email && formState.touchedFields.email && <p className='text-red-500'>{formState.errors.email.message}</p> }
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className="input-wrap">
                    <span className="input-icon"><IconUser /></span>
                    <input
                      id="username"
                      type="text"
                      className="form-input"
                      placeholder="Choose a username"
                      autoComplete="username"
                      {...register("username")}
                    />
                  </div>
                  { formState.errors.username && formState.touchedFields.username && <p className='text-red-500'>{formState.errors.username.message}</p> }
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrap">
                  <span className="input-icon"><IconLock /></span>
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    className="form-input"
                    placeholder="Create a password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    style={{ paddingRight: "44px" }}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="input-toggle"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    id="toggle-password"
                    >
                    <IconEye open={showPw} />
                  </button>
                </div>
                    { formState.errors.password && formState.touchedFields.password && <p className='text-red-500'>{formState.errors.password.message}</p> }

                {/* Strength meter */}
                {password && (
                  <div className="password-strength" role="status" aria-live="polite">
                    <p className="strength-label">
                      Password strength: <span>{strength.label}</span>
                    </p>
                    <div className="strength-bars" aria-label={`Password strength: ${strength.label}`}>
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`strength-bar ${strengthBarClass(i, strength.level)}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                <div className="input-wrap">
                  <span className="input-icon"><IconLock /></span>
                  <input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    className="form-input"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    style={{ paddingRight: "44px" }}
                    { ...register("rePassword") }
                  />
                  <button
                    type="button"
                    className="input-toggle"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                    id="toggle-confirm-password"
                    >
                    <IconEye open={showConfirm} />
                  </button>
                </div>
                    { formState.errors.rePassword && formState.touchedFields.rePassword && <p className='text-red-500'>{formState.errors.rePassword.message}</p> }
              </div>

              {/* Terms */}
              <div className="checkbox-wrap">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  aria-required="true"
                />
                <label htmlFor="agree-terms" className="checkbox-label">
                  I agree to the{" "}
                  <Link href="/terms">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy">Privacy Policy</Link>
                </label>
              </div>

              {/* Submit */}
              { isLoding ? <button
                id="create-account-btn"
                type="submit"
                className="btn-primary"
              >
                Creating... 
              </button> : <button
                id="create-account-btn"
                type="submit"
                className="btn-primary"
              >
                Create Account
              </button> }

              <p className="login-link">
                Already have an account?{" "}
                <Link href="/login">Login</Link>
              </p>
            </form>
    </>
  )
}

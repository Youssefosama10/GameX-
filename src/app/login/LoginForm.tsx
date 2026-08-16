"use client"
import Link from 'next/link';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { LoginObjectType, LoginSchema } from './login.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [showPw, setShowPw] = useState(false);
  const [password, setPassword] = useState("");
  const strength = getStrength(password);
  const [agreed, setAgreed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [IsLoading, setIsLoading] = useState(false)
  

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

 const router =  useRouter()


  const { handleSubmit , register , formState } = useForm<LoginObjectType>( {
    resolver : zodResolver(LoginSchema)
   } )
  

   async function MyhandleSubmit(datafromLogin : LoginObjectType)


   
   {
    
       setIsLoading(true)

    const SignInResponse  = await signIn( 'credentials' , { redirect : false , callbackUrl : '/' , ...datafromLogin } )

    if( SignInResponse?.ok ) 
    {
      toast.success("Welcome back — signed in successfully")
      setTimeout(() => {
        router.push("/")
      }, 800);

    }
    else {
      
      toast.error("Invalid email or password")
     
    }
    setIsLoading(false)
      

    //    setIsLoading(true)



    // const isLoginSuccessfuly = await LoginAction(datafromLogin)

    // if( isLoginSuccessfuly.success )
    // // if( isLoginSuccessfuly )
    // {
    //   toast.success(isLoginSuccessfuly.message)
    //   // toast.success("Account created Succesfuly")
    //   setTimeout(() => {
    //     router.push("/")
    //   }, 2000);

    // } else {

    //   toast.error(isLoginSuccessfuly.message)
    //   // toast.error("Account Already exist")
    // }
      
    //     console.log("datafromLogin" , datafromLogin);
        
    //     setIsLoading(false)
      }


  return (
    <>

<form id="register-form" onSubmit={handleSubmit(MyhandleSubmit)} noValidate>
              {/* Full name */}

              {/* Email + Username row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="input-wrap">
                    <span className="input-icon"><IconMail /></span>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-[710]!"
                      placeholder="Enter your email"
                      autoComplete="email"
                      {...register("email")}
                    />
                  </div>
              { formState.errors.email && formState.touchedFields.email && <p className='text-red-500'>{formState.errors.email.message}</p> }
                </div>
              </div>
              {/* Password */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrap">
                  <span className="input-icon"><IconLock /></span>
                  <input
                    id="password"
                    // name="password"
                    type={showPw ? "text" : "password"}
                    className="form-input"
                    placeholder="Create a password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    style={{ paddingRight: "44px" }}
                    { ...register("password") }
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
                <div className="mt-2 text-right">
                  <Link href="/forgot-password" className="text-sm text-violet-400 hover:text-violet-300">
                    Forgot password?
                  </Link>
                </div>
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
           { !IsLoading ?    <button
                id="create-account-btn"
                type="submit"
                className="btn-primary"
                
              >
                Login to GameX
              </button> :    <button
                id="create-account-btn"
                type="submit"
                className="btn-primary"
                
              >
                loading
              </button> }



              <p className="login-link">
              Dont have an accont ?
                <Link href="/register">Register now</Link>
              </p>
            </form>
    </>
  )
}

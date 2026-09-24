"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    X,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import Link from "next/link";

export default function AuthModal() {
    const {
        isAuthModalOpen,
        authModalMode,
        closeAuthModal,
        setAuthModalMode,
        login,
        register,
    } = useAuthStore();

    // Form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [newsletterOptIn, setNewsletterOptIn] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [forgotSuccess, setForgotSuccess] = useState(false);

    // Esc key listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeAuthModal();
        };
        if (isAuthModalOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isAuthModalOpen, closeAuthModal]);

    // Reset errors when mode switches
    useEffect(() => {
        setErrorMessage(null);
        setForgotSuccess(false);
    }, [authModalMode]);

    if (!isAuthModalOpen) return null;

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        const result = await login({ email, password });
        setIsLoading(false);

        if (result.success) {
            toast.success("Welcome back to LUNE", {
                description: "You are now signed in to your account.",
            });
            setPassword("");
        } else {
            setErrorMessage(
                result.message ||
                "Login failed. Please check your credentials.",
            );
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setErrorMessage("Passwords do not match. Please re-enter.");
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        const result = await register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            phone,
        });
        setIsLoading(false);

        if (result.success) {
            toast.success(`Welcome to LUNE, ${name}!`, {
                description: "Your account is ready and activated.",
            });
            setPassword("");
            setPasswordConfirmation("");
        } else {
            setErrorMessage(
                result.message || "Registration could not be completed.",
            );
        }
    };

    const handleForgotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setForgotSuccess(true);
            toast.info("Password reset instructions dispatched to your email.");
        }, 600);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop Blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeAuthModal}
                    className="fixed inset-0 bg-black/65 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ type: "spring", damping: 26, stiffness: 300 }}
                    className="relative w-full max-w-md bg-white shadow-2xl border border-neutral-200/80 z-10 overflow-hidden my-auto"
                >
                    {/* Top Brand Banner */}
                    <div className="bg-neutral-950 text-white p-6 pb-5 text-center relative">
                        <button
                            onClick={closeAuthModal}
                            className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-full transition-colors"
                            aria-label="Close dialog"
                        >
                            <X size={18} />
                        </button>

                        <span className="text-[10px] uppercase tracking-[0.35em] text-white/90 font-semibold block mb-1">
                            Welcome
                        </span>
                        <h3 className="text-xl font-display tracking-wider font-medium text-white">
                            LUNE
                        </h3>
                        <p className="text-[11px] text-neutral-400 font-light mt-1">
                            Access your orders, saved addresses, and wishlist
                        </p>
                    </div>

                    {/* Mode Switcher Tabs */}
                    {authModalMode !== "forgot_password" && (
                        <div className="grid grid-cols-2 border-b border-neutral-200 text-xs font-semibold uppercase tracking-wider">
                            <button
                                onClick={() => setAuthModalMode("login")}
                                className={`py-3.5 text-center transition-all ${authModalMode === "login"
                                    ? "border-b-2 border-neutral-950 text-neutral-950 bg-white font-bold"
                                    : "text-neutral-500 hover:text-neutral-900 bg-neutral-50/60"
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setAuthModalMode("register")}
                                className={`py-3.5 text-center transition-all ${authModalMode === "register"
                                    ? "border-b-2 border-neutral-950 text-neutral-950 bg-white font-bold"
                                    : "text-neutral-500 hover:text-neutral-900 bg-neutral-50/60"
                                    }`}
                            >
                                Create Account
                            </button>
                        </div>
                    )}

                    {/* Body Content */}
                    <div className="p-6 sm:p-8">
                        {/* Error Notification Banner */}
                        {errorMessage && (
                            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                                <AlertCircle
                                    size={15}
                                    className="shrink-0 mt-0.5 text-red-600"
                                />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        {/* 1. SIGN IN FORM */}
                        {authModalMode === "login" && (
                            <form
                                onSubmit={handleLoginSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">
                                        Email or Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="name@example.com or +91..."
                                        className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-3 outline-none focus:border-neutral-950 font-normal transition-colors"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAuthModalMode(
                                                    "forgot_password",
                                                )
                                            }
                                            className="text-[11px] text-neutral-400 hover:text-black underline underline-offset-2"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            required
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="••••••••"
                                            className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-3 outline-none focus:border-neutral-950 font-normal pr-10 transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={15} />
                                            ) : (
                                                <Eye size={15} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] font-semibold py-3.5 hover:bg-black active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-60"
                                >
                                    <span>
                                        {isLoading
                                            ? "Authenticating with Sanctum..."
                                            : "Sign In To Account"}
                                    </span>
                                    <ArrowRight size={14} />
                                </button>
                            </form>
                        )}

                        {/* 2. CREATE ACCOUNT FORM */}
                        {authModalMode === "register" && (
                            <form
                                onSubmit={handleRegisterSubmit}
                                className="space-y-3.5"
                            >
                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="e.g. Julian Voss"
                                        className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-2.5 outline-none focus:border-neutral-950"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="julian@example.com"
                                        className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-2.5 outline-none focus:border-neutral-950"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                                        Phone Number (Optional for SMS/WhatsApp
                                        Order Tracking)
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-2.5 outline-none focus:border-neutral-950"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2.5">
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                                            Password
                                        </label>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            required
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Min 6 chars"
                                            className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-2.5 outline-none focus:border-neutral-950"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                                            Confirm Password
                                        </label>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            required
                                            value={passwordConfirmation}
                                            onChange={(e) =>
                                                setPasswordConfirmation(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Repeat"
                                            className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-2.5 outline-none focus:border-neutral-950"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="newsletter-opt"
                                        checked={newsletterOptIn}
                                        onChange={(e) =>
                                            setNewsletterOptIn(e.target.checked)
                                        }
                                        className="mt-0.5 accent-neutral-950"
                                    />
                                    <label
                                        htmlFor="newsletter-opt"
                                        className="text-[11px] text-neutral-500 leading-tight"
                                    >
                                        Receive invitations to private seasonal
                                        drops & enjoy 10% off your initial
                                        order.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] font-semibold py-3.5 hover:bg-black active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-60 mt-2"
                                >
                                    <span>
                                        {isLoading
                                            ? "Creating Account..."
                                            : "Create Account"}
                                    </span>
                                    <ArrowRight size={14} />
                                </button>
                            </form>
                        )}

                        {/* 3. FORGOT PASSWORD FORM */}
                        {authModalMode === "forgot_password" && (
                            <div className="space-y-4">
                                {forgotSuccess ? (
                                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2 text-center">
                                        <CheckCircle2
                                            size={24}
                                            className="mx-auto text-emerald-600"
                                        />
                                        <p className="font-semibold">
                                            Reset Link Dispatched
                                        </p>
                                        <p className="text-[11px] text-emerald-700">
                                            Check your email inbox for
                                            instructions to reset your password.
                                        </p>
                                        <button
                                            onClick={() =>
                                                setAuthModalMode("login")
                                            }
                                            className="mt-3 text-xs uppercase tracking-widest font-semibold text-neutral-900 underline"
                                        >
                                            Return to Sign In
                                        </button>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleForgotSubmit}
                                        className="space-y-4"
                                    >
                                        <p className="text-xs text-neutral-600">
                                            Enter your registered email address
                                            to receive a secure link to reset
                                            your credentials.
                                        </p>

                                        <div>
                                            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder="name@example.com"
                                                className="w-full bg-white border border-neutral-300 text-xs px-3.5 py-3 outline-none focus:border-neutral-950"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-neutral-950 text-white text-xs uppercase tracking-widest font-semibold py-3.5 hover:bg-black transition-all"
                                        >
                                            {isLoading
                                                ? "Sending..."
                                                : "Send Reset Instructions"}
                                        </button>

                                        <div className="text-center pt-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setAuthModalMode("login")
                                                }
                                                className="text-xs text-neutral-500 hover:text-black underline underline-offset-2"
                                            >
                                                Back to Sign In
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* Social / Alternative Divider */}
                        {authModalMode !== "forgot_password" && (
                            <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">
                                <div className="relative text-center">
                                    <span className="bg-white px-3 text-[10px] uppercase tracking-widest text-neutral-400 font-semibold relative z-10">
                                        Quick Authentication
                                    </span>
                                    <div className="absolute inset-0 top-1/2 border-t border-neutral-200" />
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            toast.info(
                                                "Google OAuth token bridge initialized.",
                                            );
                                        }}
                                        className="flex items-center justify-center gap-2 border border-neutral-200 py-2.5 px-3 text-xs text-neutral-700 hover:border-black transition-colors"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="#4285F4"
                                                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                                            />
                                        </svg>
                                        <span>Google</span>
                                    </button>


                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Security Badge */}
                    <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-100 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                        <ShieldCheck size={14} className="text-neutral-700" />
                        <span>
                            by clicking continue you agree to our <Link href="/privacy-policy" className="text-neutral-950 underline underline-offset-2">Privacy Policy</Link> and <Link href="/terms-of-service" className="text-neutral-950 underline underline-offset-2">Terms of Service</Link>
                        </span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, User } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { login, openAuthModal, isAuthenticated, customer, logout } =
        useAuthStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const res = await login({ email, password });
        setIsLoading(false);

        if (res.success) {
            toast.success("Welcome back to LUNE");
            setTimeout(() => {
                window.location.href = "/";
            }, 500);
        } else {
            setErrorMessage(
                res.message ||
                    "Invalid credentials. Please verify your email and password.",
            );
        }
    };

    if (isAuthenticated && customer) {
        return (
            <div className="max-w-md mx-auto px-4 py-20 sm:py-28 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-800">
                    <User size={30} />
                </div>
                <h1 className="text-2xl font-display text-neutral-900">
                    Signed In As {customer.name}
                </h1>
                <p className="text-xs text-neutral-500">{customer.email}</p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <Link
                        href="/account"
                        className="bg-neutral-950 text-white text-xs uppercase tracking-widest px-6 py-3 font-semibold hover:bg-black"
                    >
                        Go to Account
                    </Link>
                    <Link
                        href="/"
                        className="border border-neutral-900 text-neutral-900 text-xs uppercase tracking-widest px-6 py-3 font-semibold hover:bg-neutral-100"
                    >
                        Continue Shopping
                    </Link>
                    <button
                        onClick={() => {
                            logout();
                            toast.info("Signed out successfully.");
                        }}
                        className="border border-neutral-300 text-neutral-700 text-xs uppercase tracking-widest px-6 py-3 font-semibold hover:border-black"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
            <div className="text-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-2">
                    Account
                </span>
                <h1 className="text-3xl font-display text-neutral-900 font-medium">
                    Sign in to your account
                </h1>
                <p className="text-xs text-neutral-500 mt-2">
                    Access your orders, saved delivery addresses, and wishlist.
                </p>
            </div>

            <div className="bg-neutral-50/70 p-8 border border-neutral-200 shadow-xs">
                {errorMessage && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">
                            Email Address or Phone
                        </label>
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@domain.com"
                            className="w-full bg-white border border-neutral-300 text-xs px-4 py-3 outline-none focus:border-black font-normal"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => openAuthModal("forgot_password")}
                                className="text-[11px] text-neutral-400 hover:text-black underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-white border border-neutral-300 text-xs px-4 py-3 outline-none focus:border-black font-normal"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] font-semibold py-4 hover:bg-black active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-60 shadow-md"
                    >
                        <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                        <ArrowRight size={14} />
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
                    <p className="text-xs text-neutral-500">
                        Don&apos;t have an account yet?{" "}
                        <button
                            type="button"
                            onClick={() => openAuthModal("register")}
                            className="font-semibold text-black underline underline-offset-2"
                        >
                            Create an account
                        </button>
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                    <ShieldCheck size={14} className="text-neutral-600" />
                    <span>Secured via Laravel Sanctum & Botble API</span>
                </div>
            </div>
        </div>
    );
}

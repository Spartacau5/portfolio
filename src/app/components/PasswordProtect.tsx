'use client';

import { useState } from 'react';

interface PasswordProtectProps {
    children: React.ReactNode;
    password: string;
}

export default function PasswordProtect({ children, password }: PasswordProtectProps) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue === password) {
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    // If unlocked, show the content
    if (isUnlocked) {
        return <>{children}</>;
    }

    // Show password overlay (don't render children - their scroll animations would make them invisible anyway)
    return (
        <>
            {/* Blur overlay - click to go back */}
            <div
                onClick={() => window.location.href = '/work/arrive'}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(2px)',
                    WebkitBackdropFilter: 'blur(2px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '20px',
                    cursor: 'pointer',
                }}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '32px',
                        maxWidth: '360px',
                        width: '100%',
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                        cursor: 'default',
                    }}>
                    {/* Lock Icon + Title grouped together */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0px',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: '#f3f4f6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '-6px',
                        }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{
                                fontSize: '18px',
                                fontWeight: 600,
                                color: '#1f2937',
                                marginBottom: '4px',
                            }}>
                                Protected Content
                            </h2>
                            <p style={{
                                fontSize: '14px',
                                color: '#6b7280',
                                lineHeight: 1.5,
                            }}>
                                Enter the password to view this case study
                            </p>
                        </div>
                    </div>

                    {/* Password Input */}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            width: '100%',
                        }}>
                            <input
                                type="password"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setError(false);
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter password"
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    fontSize: '16px',
                                    border: `1px solid ${error ? '#ef4444' : '#e5e7eb'}`,
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, transform 0.1s',
                                    boxSizing: 'border-box',
                                    transform: isShaking ? 'translateX(-4px)' : 'none',
                                    animation: isShaking ? 'shake 0.5s ease-in-out' : 'none',
                                }}
                            />
                            <button
                                type="submit"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#111',
                                    background: isHovered ? '#fafafa' : '#fff',
                                    border: `1px solid ${isHovered ? '#d1d5db' : '#e5e7eb'}`,
                                    borderRadius: '9999px',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.08)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
                                    transform: isHovered ? 'translateY(-1px)' : 'none',
                                }}
                            >
                                Unlock
                            </button>
                        </div>
                    </form>

                    {/* Error Message */}
                    {error && (
                        <p style={{
                            fontSize: '14px',
                            color: '#ef4444',
                            margin: 0,
                        }}>
                            Incorrect password. Please try again.
                        </p>
                    )}

                    {/* Back Link */}
                    <a
                        href="/work/arrive"
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            textDecoration: 'none',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#1f2937'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
                    >
                        ← Back to Arrive
                    </a>
                </div>
            </div>

            {/* Shake animation keyframes */}
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                    20%, 40%, 60%, 80% { transform: translateX(4px); }
                }
            `}</style>
        </>
    );
}

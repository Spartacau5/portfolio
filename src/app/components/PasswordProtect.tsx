'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PasswordProtectProps {
    children: React.ReactNode;
    password: string;
}

export default function PasswordProtect({ children, password }: PasswordProtectProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Go back without smooth scroll animation
    const handleGoBack = () => {
        // Temporarily disable smooth scrolling
        document.documentElement.style.scrollBehavior = 'auto';
        window.history.back();
        // Re-enable after navigation completes
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
        }, 100);
    };

    const [isUnlocked, setIsUnlocked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Request password states
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [isRequestHovered, setIsRequestHovered] = useState(false);
    const [isSubmitHovered, setIsSubmitHovered] = useState(false);
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [hasAttemptedRequestSubmit, setHasAttemptedRequestSubmit] = useState(false);

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

    const handleRequestSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setHasAttemptedRequestSubmit(true);

        // Validate email - must exist and include @
        if (!email || !email.includes('@')) {
            setEmailError(true);
            return;
        }

        setEmailError(false);

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/request-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, role }),
            });

            if (response.ok) {
                setSubmitSuccess(true);
            } else {
                const data = await response.json();
                setSubmitError(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // If unlocked, show the content
    if (isUnlocked) {
        return <>{children}</>;
    }

    // Common input style
    const inputStyle = {
        width: '100%',
        padding: '12px 14px',
        fontSize: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box' as const,
    };

    // Common button style generator
    const getButtonStyle = (isHoveredState: boolean, isPrimary = false) => ({
        width: '100%',
        padding: '0.75rem 1.5rem',
        fontSize: '14px',
        fontWeight: 500,
        color: isPrimary ? '#fff' : '#111',
        background: isPrimary
            ? (isHoveredState ? '#1f2937' : '#111')
            : (isHoveredState ? '#fafafa' : '#fff'),
        border: isPrimary ? 'none' : `1px solid ${isHoveredState ? '#d1d5db' : '#e5e7eb'}`,
        borderRadius: '9999px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: isHoveredState ? '0 4px 12px rgba(0, 0, 0, 0.08)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
        transform: isHoveredState ? 'translateY(-1px)' : 'none',
    });

    // Show password overlay - use portal to render outside PageTransition
    const modalContent = (
        <>
            {/* Overlay - click to go back */}
            <div
                onClick={() => handleGoBack()}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10001,
                    padding: '20px',
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
                    }}>

                    {/* Success State */}
                    {submitSuccess ? (
                        <>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0px',
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#d1fae5',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '-6px',
                                }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h2 style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        color: '#1f2937',
                                        marginBottom: '4px',
                                    }}>
                                        Request Sent
                                    </h2>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#6b7280',
                                        lineHeight: 1.5,
                                    }}>
                                        I'll review your request and send you the password via email shortly.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleGoBack()}
                                style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    textDecoration: 'none',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = '#1f2937'}
                                onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
                            >
                                ← Back to Arrive
                            </button>
                        </>
                    ) : showRequestForm ? (
                        /* Request Password Form */
                        <>
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
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h2 style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        color: '#1f2937',
                                        marginBottom: '4px',
                                    }}>
                                        Request Password
                                    </h2>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#6b7280',
                                        lineHeight: 1.5,
                                    }}>
                                        Enter your details and I'll send you the password
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleRequestSubmit} style={{ width: '100%' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    width: '100%',
                                }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (hasAttemptedRequestSubmit) {
                                                setEmailError(!e.target.value.includes('@'));
                                            }
                                        }}
                                        placeholder={(hasAttemptedRequestSubmit && emailError) ? "Email is required" : "Your email"}
                                        autoFocus
                                        className={(hasAttemptedRequestSubmit && emailError) ? "email-error-input" : ""}
                                        style={{
                                            ...inputStyle,
                                            border: `1px solid ${(hasAttemptedRequestSubmit && emailError) ? '#ef4444' : '#e5e7eb'}`,
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="Your role (e.g., Recruiter, Designer)"
                                        style={inputStyle}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        onMouseEnter={() => setIsSubmitHovered(true)}
                                        onMouseLeave={() => setIsSubmitHovered(false)}
                                        style={{
                                            ...getButtonStyle(isSubmitHovered, true),
                                            opacity: isSubmitting ? 0.7 : 1,
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        }}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Request Password'}
                                    </button>
                                </div>
                            </form>

                            {submitError && (
                                <p style={{
                                    fontSize: '14px',
                                    color: '#ef4444',
                                    margin: 0,
                                }}>
                                    {submitError}
                                </p>
                            )}

                            <button
                                onClick={() => {
                                    setShowRequestForm(false);
                                    setEmail('');
                                    setRole('');
                                    setSubmitError('');
                                    setEmailError(false);
                                    setHasAttemptedRequestSubmit(false);
                                }}
                                onMouseEnter={() => setIsBackHovered(true)}
                                onMouseLeave={() => setIsBackHovered(false)}
                                style={{
                                    fontSize: '14px',
                                    color: isBackHovered ? '#1f2937' : '#6b7280',
                                    textDecoration: 'none',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'color 0.2s',
                                }}
                            >
                                ← Back
                            </button>
                        </>
                    ) : (
                        /* Password Entry Form */
                        <>
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
                                        placeholder={error ? "Incorrect password" : "Enter password"}
                                        autoFocus
                                        className={error ? "password-error-input" : ""}
                                        style={{
                                            ...inputStyle,
                                            border: `1px solid ${error ? '#ef4444' : '#e5e7eb'}`,
                                            transform: isShaking ? 'translateX(-4px)' : 'none',
                                            animation: isShaking ? 'shake 0.5s ease-in-out' : 'none',
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        style={getButtonStyle(isHovered, true)}
                                    >
                                        Unlock
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setError(false);
                                            setInputValue('');
                                            setEmailError(false);
                                            setHasAttemptedRequestSubmit(false);
                                            setShowRequestForm(true);
                                        }}
                                        onMouseEnter={() => setIsRequestHovered(true)}
                                        onMouseLeave={() => setIsRequestHovered(false)}
                                        style={getButtonStyle(isRequestHovered)}
                                    >
                                        Request Password
                                    </button>
                                </div>
                            </form>

                            <button
                                onClick={() => handleGoBack()}
                                style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    textDecoration: 'none',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = '#1f2937'}
                                onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
                            >
                                ← Back to Arrive
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Shake animation keyframes */}
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                    20%, 40%, 60%, 80% { transform: translateX(4px); }
                }
                .email-error-input::placeholder,
                .password-error-input::placeholder {
                    color: #ef4444;
                }
            `}</style>
        </>
    );

    // Overlay style for both pre-mount and portal versions
    const overlayStyle = {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#ffffff',
        zIndex: 10001,
    };

    // Before portal is ready, render a simple overlay to hide nav/footer
    if (!mounted) {
        return <div style={overlayStyle} />;
    }

    // Once mounted, render full modal in portal
    return createPortal(modalContent, document.body);
}

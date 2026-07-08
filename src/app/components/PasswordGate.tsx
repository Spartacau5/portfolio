'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

type PasswordGateProps = {
  open: boolean;
  onClose: () => void;
  password: string;
  redirectTo: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function PasswordGate({ open, onClose, password, redirectTo }: PasswordGateProps) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldControls = useAnimationControls();

  // Focus the field when it opens; reset state when it closes.
  useEffect(() => {
    if (open) {
      setValue('');
      setError(false);
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => inputRef.current?.focus(), 220);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
  }, [open]);

  // Prefetch so the redirect is instant.
  useEffect(() => {
    if (open) router.prefetch(redirectTo);
  }, [open, router, redirectTo]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === password.toLowerCase()) {
      onClose();
      // let the modal ease out, then go
      window.setTimeout(() => router.push(redirectTo), 300);
      return;
    }
    setError(true);
    setValue('');
    inputRef.current?.focus();
    // gentle pulse ring
    fieldControls.start({
      boxShadow: [
        '0 0 0 0 rgba(17,17,17,0)',
        '0 0 0 3px rgba(17,17,17,0.14)',
        '0 0 0 0 rgba(17,17,17,0)',
      ],
      x: [0, -5, 5, -3, 3, 0],
      transition: { duration: 0.42, ease: 'easeInOut' },
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pw-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          onMouseDown={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Enter password to view this case study"
        >
          <motion.div
            className="pw-modal"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.38, ease: EASE }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button type="button" className="pw-close" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <span className="pw-eyebrow">Locked · ZoomInfo</span>

            <form className="pw-form" onSubmit={submit}>
              <motion.div className="pw-field" animate={fieldControls}>
                <input
                  ref={inputRef}
                  type="password"
                  className="pw-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Password"
                />
                {value === '' && (
                  <span className="pw-placeholder" aria-hidden="true">
                    {error ? (
                      <>
                        Try again! or{' '}
                        <a
                          className="pw-mail"
                          href="mailto:arpit.ahluwalia1@gmail.com"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          Email me
                        </a>
                      </>
                    ) : (
                      'Enter password'
                    )}
                  </span>
                )}
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

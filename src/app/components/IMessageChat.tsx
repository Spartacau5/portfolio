'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import Image from 'next/image';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    type?: 'normal' | 'name' | 'subject' | 'phone' | 'email' | 'extra';
}

// Conversation flow steps
const conversationSteps = [
    { step: 0, arpitMessages: [], waitFor: 'initial' }, // Initial state
    { step: 1, arpitMessages: ["what's your name?"], waitFor: 'name' },
    { step: 2, arpitMessages: ["nice to meet you 👋", "so what did you want to talk about?"], waitFor: 'subject' },
    { step: 3, arpitMessages: ["ahhh, i see 👀", "what's your phone number? 📱"], waitFor: 'phone' },
    { step: 4, arpitMessages: ["perfect!", "what's your email? ✉️"], waitFor: 'email' },
    { step: 5, arpitMessages: ["almost done!", "anything else you want me to know?"], waitFor: 'extra' },
    { step: 6, arpitMessages: ["awesome! i'll be in touch soon 📲"], waitFor: 'done' },
];

// Generate a unique session ID
const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export function IMessageChat() {
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [formData, setFormData] = useState({ name: '', subject: '', phone: '', email: '', extra: '' });
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [airtableRecordId, setAirtableRecordId] = useState<string | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);

    // Initialize audio context on first interaction
    const getAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        return audioContextRef.current;
    };

    // Load the combined audio file once
    const loadAudio = async () => {
        if (audioBufferRef.current) return;
        try {
            const ctx = getAudioContext();
            const response = await fetch('/sounds/imessage-combined.mp3');
            const arrayBuffer = await response.arrayBuffer();
            audioBufferRef.current = await ctx.decodeAudioData(arrayBuffer);
        } catch (e) {
            console.log('Failed to load audio:', e);
        }
    };

    // Play a portion of the audio (start and end in seconds)
    const playAudioRange = async (startTime: number, duration: number) => {
        try {
            // Ensure audio is loaded
            if (!audioBufferRef.current) {
                await loadAudio();
            }
            if (!audioBufferRef.current) return;

            const ctx = getAudioContext();
            const source = ctx.createBufferSource();
            source.buffer = audioBufferRef.current;
            source.connect(ctx.destination);
            source.start(0, startTime, duration);
        } catch (e) {
            console.log('Audio playback error:', e);
        }
    };

    // iMessage send sound (0:00 - ~1.5s)
    const playSendSound = async () => {
        await playAudioRange(0, 1.5);
    };

    // iMessage receive sound (around 3.5s in the audio)
    const playReceiveSound = async () => {
        console.log('playReceiveSound called, buffer:', !!audioBufferRef.current);
        await playAudioRange(3.5, 1.5);
    };

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const addArpitMessages = async (texts: string[]) => {
        for (const text of texts) {
            setIsTyping(true);
            await new Promise(resolve => setTimeout(resolve, 1200)); // Typing delay
            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now(), text, isUser: false }]);
            await playReceiveSound();
            await new Promise(resolve => setTimeout(resolve, 300)); // Pause between messages
        }
    };

    const handleStart = async () => {
        if (isStarted) return;
        setIsStarted(true);

        // Generate new session ID for this conversation
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);

        // Load audio on first interaction
        await loadAudio();

        // User sends initial message
        setMessages([{ id: 1, text: "sounds good 🙏", isUser: true }]);
        playSendSound();

        // Arpit responds
        await addArpitMessages(conversationSteps[1].arpitMessages);
        setStep(1);
    };

    const handleSubmit = async (e?: FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userMessage = inputValue.trim();
        setInputValue('');

        // Determine message type based on current step
        const messageType = step === 1 ? 'name' : step === 2 ? 'subject' : step === 3 ? 'phone' : step === 4 ? 'email' : step === 5 ? 'extra' : 'normal';

        // Add user message
        setMessages(prev => [...prev, {
            id: Date.now(),
            text: userMessage,
            isUser: true,
            type: messageType
        }]);
        playSendSound();

        // Store form data and build updated data for submission
        let updatedFormData = { ...formData };
        if (step === 1) {
            updatedFormData.name = userMessage;
            setFormData(prev => ({ ...prev, name: userMessage }));
        }
        if (step === 2) {
            updatedFormData.subject = userMessage;
            setFormData(prev => ({ ...prev, subject: userMessage }));
        }
        if (step === 3) {
            updatedFormData.phone = userMessage;
            setFormData(prev => ({ ...prev, phone: userMessage }));
        }
        if (step === 4) {
            updatedFormData.email = userMessage;
            setFormData(prev => ({ ...prev, email: userMessage }));
        }
        if (step === 5) {
            updatedFormData.extra = userMessage;
            setFormData(prev => ({ ...prev, extra: userMessage }));
        }

        // Submit to Airtable after EACH user response
        submitToAirtable(updatedFormData);

        // Move to next step
        const nextStep = step + 1;
        if (nextStep < conversationSteps.length) {
            await addArpitMessages(conversationSteps[nextStep].arpitMessages);
            setStep(nextStep);
        }
    };

    const submitToAirtable = async (data: typeof formData) => {
        try {
            const response = await fetch('/api/submit-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    sessionId,
                    recordId: airtableRecordId,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                // Store the record ID for future updates
                if (result.recordId && !airtableRecordId) {
                    setAirtableRecordId(result.recordId);
                }
            } else {
                console.error('Failed to submit lead');
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    const getPlaceholder = () => {
        if (!isStarted) return 'iMessage';
        switch (step) {
            case 1: return 'Your name...';
            case 2: return 'Topic...';
            case 3: return 'Phone number...';
            case 4: return 'Email address...';
            case 5: return 'Anything else...';
            default: return 'iMessage';
        }
    };

    return (
        <div
            id="w-node-e4cacf2e-5d38-4548-b099-9b308486aed2-d4229b69"
            className="tile sm imessage"
        >
            <div id="imessage-div" className="imessage-div">
                {/* Clickable overlay for starting conversation */}
                {!isStarted && (
                    <div
                        id="imessage-hover-temporary"
                        className="imessage-hover-temporary"
                        style={{ display: 'block', cursor: 'pointer' }}
                        onClick={handleStart}
                    />
                )}

                {/* Messages area */}
                <div className="imessage-top" ref={messagesContainerRef}>
                    <div
                        className="multiple-imessages"
                        style={{
                            transform: 'translate3d(0px, 0px, 0px)',
                            top: '0',
                        }}
                    >
                        {/* Initial greeting from Arpit */}
                        <div className="imessage-flex-intro">
                            <div className="imessage-flex-vertical">
                                <div className="imessage-label">Arpit</div>
                                <div className="imessage-flex-horizontal">
                                    <div className="imessage-image">
                                        <Image
                                            src="/images/profilepic.png"
                                            alt="Arpit Ahluwalia"
                                            width={48}
                                            height={48}
                                            className="imessage-avi"
                                        />
                                    </div>
                                    <div className="imessage-my-messages">
                                        <a href="#" className="imessage-bubble w-inline-block" onClick={(e) => e.preventDefault()}>
                                            <div className="imessage-text">
                                                Want to work together? just want to chat? send me a text here (no, for real)
                                            </div>
                                            <img
                                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                                loading="lazy"
                                                alt=""
                                                className="imessage-tail"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic messages */}
                        {messages.map((msg) => (
                            <div key={msg.id}>
                                {msg.isUser ? (
                                    <div className="imessage-flex sender-1" style={{ opacity: 1 }}>
                                        <a href="#" className="imessage-bubble sender-1 w-inline-block" onClick={(e) => e.preventDefault()}>
                                            <div className="imessage-text sender">{msg.text}</div>
                                            <img
                                                src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e42f3ef1495b87c63b88_imessage-sender-tail.svg"
                                                loading="lazy"
                                                alt=""
                                                className="imessage-sender-tail intro"
                                            />
                                        </a>
                                        <div className="imessage-delivered-label intro-1" style={{ opacity: 1 }}>
                                            Delivered
                                        </div>
                                    </div>
                                ) : (
                                    <div className="imessage-flex-2" style={{ opacity: 1 }}>
                                        <div className="imessage-flex-vertical">
                                            <div className="imessage-label">Arpit</div>
                                            <div className="imessage-flex-horizontal">
                                                <div className="imessage-image">
                                                    <Image
                                                        src="/images/profilepic.png"
                                                        alt="Arpit Ahluwalia"
                                                        width={48}
                                                        height={48}
                                                        className="imessage-avi"
                                                    />
                                                </div>
                                                <div className="imessage-my-messages">
                                                    <a href="#" className="imessage-bubble auto-dynamic w-inline-block" onClick={(e) => e.preventDefault()}>
                                                        <div className="imessage-text">{msg.text}</div>
                                                        <img
                                                            src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                                            loading="lazy"
                                                            alt=""
                                                            className="imessage-tail"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="imessage-flex-2" style={{ opacity: 1 }}>
                                <div className="imessage-flex-vertical">
                                    <div className="imessage-label">Arpit</div>
                                    <div className="imessage-flex-horizontal">
                                        <div className="imessage-image">
                                            <Image
                                                src="/images/profilepic.png"
                                                alt="Arpit Ahluwalia"
                                                width={48}
                                                height={48}
                                                className="imessage-avi"
                                            />
                                        </div>
                                        <div className="imessage-my-messages">
                                            <div className="imessage-typing-bubble" style={{
                                                background: '#e9e9eb',
                                                borderRadius: 30,
                                                padding: '10px 16px',
                                                width: 80,
                                                height: 45,
                                                display: 'flex',
                                                alignItems: 'center',
                                                position: 'relative',
                                            }}>
                                                <img
                                                    src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5e31287ee5b38783fa890_imessage-tail.svg"
                                                    loading="lazy"
                                                    alt=""
                                                    className="imessage-tail"
                                                />
                                                <div className="imessage-dots-div">
                                                    <div className="typing-dot-1" style={{ animation: 'typingDot 1.4s ease-in-out infinite' }} />
                                                    <div className="typing-dot-2" style={{ animation: 'typingDot 1.4s ease-in-out 0.2s infinite' }} />
                                                    <div className="typing-dot-3" style={{ animation: 'typingDot 1.4s ease-in-out 0.4s infinite' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom input area */}
                <div className="imessage-bottom">
                    <a
                        href="mailto:arpit.ahluwalia1@gmail.com"
                        className="contact-icon w-inline-block"
                    >
                        <img
                            src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dbe13ef14900c4c5e5f5_email-contact-icon.svg"
                            loading="lazy"
                            alt="Email"
                            className="contact-icon"
                        />
                    </a>

                    <a
                        href="https://twitter.com/spartacau5"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-icon twitter w-inline-block"
                    >
                        <img
                            src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f5dbe10a419234e527d174_twitter-contact-icon.svg"
                            loading="lazy"
                            alt="Twitter"
                        />
                    </a>

                    <div style={{ flex: 1, marginLeft: 16, position: 'relative' }}>
                        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={getPlaceholder()}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onClick={() => !isStarted && handleStart()}
                                disabled={step >= 6}
                                style={{
                                    width: '100%',
                                    height: 44,
                                    border: '1px solid #e9e9eb',
                                    borderRadius: 22,
                                    paddingLeft: 16,
                                    paddingRight: 48,
                                    fontSize: 17,
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                                    outline: 'none',
                                    backgroundColor: '#fff',
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: inputValue.trim() ? 'pointer' : 'default',
                                    position: 'absolute',
                                    right: 6,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                disabled={!inputValue.trim() || isTyping}
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    style={{ display: 'block' }}
                                >
                                    <circle
                                        cx="16"
                                        cy="16"
                                        r="16"
                                        fill={inputValue.trim() ? "#0078ff" : "#e5e5ea"}
                                    />
                                    <path
                                        d="M16 10L16 22M16 10L11 15M16 10L21 15"
                                        stroke={inputValue.trim() ? "white" : "#8e8d94"}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

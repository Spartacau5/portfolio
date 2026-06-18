'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Contact() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const titleLineVariants = {
    hidden: { width: 40 },
    visible: {
      width: '100%',
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          {/* Section Header */}
          <div className="mb-16">
            <motion.div
              className="flex items-center gap-8 group cursor-pointer"
              whileHover="hover"
            >
              <h2 className="text-5xl md:text-6xl font-display font-bold tracking-wide">
                CONTACT
              </h2>
              <div className="flex-1 relative h-1 overflow-hidden">
                <div className="absolute inset-0 bg-light/10" />
                <motion.div
                  variants={titleLineVariants}
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-primary via-primary to-transparent"
                />
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-10 bg-primary"
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: 1, width: 100 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Contact Content */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left Column - Contact Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <div>
                <h3 className="text-sm font-mono tracking-widest text-light/50 mb-4 uppercase">
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  <motion.a
                    href="mailto:arpit.ahluwalia1@gmail.com"
                    className="block group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-2xl md:text-3xl font-body text-light group-hover:text-primary transition-colors break-all">
                      arpit.ahluwalia1@gmail.com
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/arpitahluwalia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-xl md:text-2xl font-body text-light/70 group-hover:text-primary transition-colors break-all">
                      linkedin.com/in/arpitahluwalia
                    </span>
                  </motion.a>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-sm font-mono tracking-widest text-light/50 mb-4 uppercase">
                  Social Links
                </h3>
                <div className="flex gap-4">
                  {[
                    {
                      name: 'LinkedIn',
                      href: 'https://www.linkedin.com/in/arpitahluwalia',
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'Behance',
                      href: 'https://www.behance.net/spartacau5?locale=en_US',
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'Spotify',
                      href: 'https://open.spotify.com/artist/3b9yCm5iWBKNIDqq1utESQ',
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      ),
                    },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-light/10 flex items-center justify-center text-light hover:bg-primary hover:text-secondary transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Resume Download */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center"
            >
              <div className="glass rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  Interested in working together?
                </h3>
                <p className="text-light/70 mb-8">
                  Download my resume to learn more about my experience and skills.
                </p>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-lg inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

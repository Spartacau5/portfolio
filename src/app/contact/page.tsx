'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ModernNav } from '../components/ModernNav';
import { ModernFooter } from '../components/ModernFooter';
import { BubbleBackground } from '../components/BubbleBackground';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/arpitahluwalia',
    username: '@arpitahluwalia',
  },
  {
    name: 'Behance',
    href: 'https://www.behance.net/spartacau5?locale=en_US',
    username: '@spartacau5',
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/3b9yCm5iWBKNIDqq1utESQ?si=CVFljP-9Sb2tAA63Chf0tw',
    username: 'Arpit Ahluwalia',
  },
];

export default function ContactPage() {
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

  return (
    <main className="min-h-screen bg-secondary">
      <BubbleBackground />
      <ModernNav />
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-4xl"
          >
            <motion.h1
              variants={itemVariants}
              className="text-7xl md:text-9xl font-display font-black mb-6 gradient-text"
            >
              CONTACT
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-light/80 leading-relaxed"
            >
              Let's connect and create something amazing together. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 border-t border-light/10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={sectionVariants}
            className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto"
          >
            {/* Left Column - Contact Methods */}
            <div className="space-y-12">
              <motion.div variants={itemVariants}>
                <h2 className="text-sm font-mono tracking-widest text-light/50 mb-4 uppercase">
                  Email
                </h2>
                <motion.a
                  href="mailto:arpit.ahluwalia1@gmail.com"
                  className="block group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-3xl md:text-4xl font-body text-light group-hover:text-primary transition-colors break-all">
                    arpit.ahluwalia1@gmail.com
                  </span>
                </motion.a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-sm font-mono tracking-widest text-light/50 mb-4 uppercase">
                  Location
                </h2>
                <p className="text-3xl md:text-4xl font-display font-bold">
                  Brooklyn, NY
                </p>
                <p className="text-light/60 mt-2">
                  Available for remote work and on-site projects in NYC
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-sm font-mono tracking-widest text-light/50 mb-4 uppercase">
                  Currently
                </h2>
                <p className="text-xl text-light mb-2">
                  MS Student at Parsons School of Design
                </p>
                <p className="text-xl text-light">
                  Seeking part-time UX opportunities
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-8">
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="btn btn-primary text-lg w-full md:w-auto px-8 py-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download Resume
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Social Links */}
            <div className="space-y-8">
              <motion.h2
                variants={itemVariants}
                className="text-sm font-mono tracking-widest text-light/50 mb-8 uppercase"
              >
                Connect With Me
              </motion.h2>

              <div className="space-y-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    custom={index}
                    className="card flex items-center gap-6 p-6 group cursor-pointer"
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-light/10 flex items-center justify-center text-light group-hover:bg-primary group-hover:text-secondary transition-all">
                      <span className="text-2xl font-display font-bold">{social.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold text-light group-hover:text-primary transition-colors">
                        {social.name}
                      </h3>
                      <p className="text-light/60">{social.username}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-light/10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={sectionVariants}
            className="text-center max-w-3xl mx-auto glass rounded-3xl p-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Ready to start a project?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-light/70 mb-8"
            >
              Whether you have a fully formed idea or just a concept, I'd love to hear about it.
            </motion.p>
            <motion.div variants={itemVariants}>
              <motion.a
                href="mailto:arpit.ahluwalia1@gmail.com"
                className="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Email
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <ModernFooter />
    </main>
  );
}

/**
 * What Arpit's hover buddy says on each work card. Written the way I'd say it
 * out loud to someone looking over my shoulder: the bit of context the title
 * and subtitle don't give you. Keep client-confidential details out — this is
 * public (stick to what's on the resume).
 *
 * **Bold** sparingly: one (at most two) impactful number or claim per line.
 * Never inside recommendations — those are other people's words.
 */

export const CARD_LINES = {
  kalshi:
    'I’m building this one right now. Kalshi’s finance team was paying invoices by hand, so I made them an agent that does the busywork and shows its math. Proof of concept in **two weeks**, and it won us the contract.',
  meriton:
    'Meriton’s invoice problems kept bouncing between finance and sales over email. I designed an agentic workspace right inside Teams, so review, PO matching and the back-and-forth all live in one place.',
  standardChartered:
    'An AI co-advisor for the bank’s relationship managers: six agents behind one conversation that preps them for client meetings and coaches them live. It just got approved for a **15-person pilot**, which I’m pretty proud of.',
  zoominfo:
    'This was right when ChatGPT landed. We asked, what if you could just type what you want instead of learning all our filters? **87% of testers preferred it**, and searches got **27% faster**.',
  arrive:
    'Arrive’s US and EU teams each had their own plan. I ran 25+ customer interviews and three workshops with product, sales and leadership, and turned it all into **one two-year roadmap**. So many sticky notes.',
  tashvi:
    'My own side project. Jewelers sketch on paper, so I built a tool that turns those sketches into photoreal renders in seconds. I designed it and wrote the code.',
  jnj:
    'One of my first big projects, right out of school. I redesigned how J&J presents its ESG and DEI reports, and **90% of testers** preferred the new navigation. High stakes, a lot of data, and I learned a ton.',
  easypark:
    'Fun twist on this one: I set out to validate a parking planner for fleet managers, and the research said drivers had the bigger problem. So we paused the MVP and went wider. Sometimes the win is not building it.',
} as const;

/** Cards only speak once the cursor rests on them, so sweeping across the grid stays quiet. */
export const CARD_DELAY_MS = '380';

/** More page cards. */
export const MORE_LINES = {
  hypex:
    'My first startup gig. An NFT game for sneakerheads, so the brief was basically “make it feel like the future.” I went full space-galaxy and kept their beloved Nike AirMag.',
  mountSinai:
    'A UI project for an incident-reporting app used by hospitals in Africa. The whole goal: reporting a problem should take less time than ignoring it.',
  studyBuddy:
    'It watches (politely) through your webcam and nudges you when your phone shows up. I built it because, honestly, I needed it.',
  microsoft:
    'Six months with Microsoft’s Inclusive Design team, designing an AI assistant for specialized teachers. Seven co-design sessions, so the teachers basically designed it with us.',
  ekko:
    'My Parsons capstone: an AI copilot for nonprofits. I run one myself, so I know how much gets done with how little.',
  offprint:
    'Every AI prompt has a carbon cost. This Chrome extension tracks yours and helps you offset it. Guilt-free prompting, almost.',
  aiWaste:
    'Point your camera at something and it tells you if it’s recyclable. Computer vision, a webcam, and a lot of testing on my own fridge.',
  photography:
    'Shot around Powelton Village back in my Drexel days. Black and white makes Philly look even more dramatic.',
  ragaBeats:
    'My childhood friend and I have been making music together for ten years. Hit play, “Run” is a good place to start.',
  gaming:
    'Yes, **top 0.3% in COD**. But beating Elden Ring twice is the real flex.',
} as const;

/** Home page, header and footer. */
export const SITE_LINES = {
  name: 'Pronounced **R-pit A-ah-loo-wall-ya**.',
  available:
    'As my contract’s ending soon, **I’m actively looking** for design engineer or forward-deployed engineer roles where I get to design and build.',
  // Two rows at CONNECT_WIDTH: the email finishes the second row instead of wrapping alone.
  connect:
    'Reach out to me on LinkedIn, it’s the fastest way to reach me.\nYou can also email me at **arpit.ahluwalia1@gmail.com**.',
  khanda:
    'That’s the Khanda, a symbol of my Sikh faith. It keeps me grounded in **Chardi Kala**: staying positive and optimistic, no matter what.',
  footer:
    'Yep, all of it. Designed in Figma, built in Next.js, by me. The head following you around was the fun part.',
} as const;

/** Fits the Connect line in exactly two rows (measured in the site font). */
export const CONNECT_WIDTH = '440';

/** About page: the photo, plus a different angle on each role than the work cards give. */
export const ABOUT_LINES = {
  photo: 'Yeah, the sun was bright that day. Missing it right now, particularly.',
  // Experience
  tashvi: 'My own startup. We turn jewelry sketches into photoreal renders in seconds, and I design and build all of it.',
  arrive:
    'My first time doing strategy at this scale: research that shaped a two-year roadmap for a **$1B+ mobility company** in 90+ countries. I loved every workshop of it.',
  zoominfo:
    'Where I got serious about AI. I designed conversational search right as ChatGPT landed, for a platform **35,000 companies** use to sell.',
  jnj:
    'My first big enterprise client, right out of Drexel. A **Fortune 50** company, global ESG reporting, and a design system I grew by 30+ components.',
  hypex:
    'My first startup. A tiny team, a big web3 vision, and the place I learned to design fast and hand off clean.',
  // Leadership
  aiga: 'Selected as a mentor for AIGA NY’s 2026 Applied Mentorship Program. Paying forward what my own mentors did for me.',
  hackai:
    'I judged the Best Use of Figma track at HackAI 2026. The students came up with some seriously cool solutions.',
  figma:
    'As Figma’s Campus Leader at Parsons, I built a community of **1,000+ designers** and mentored 500+ of them, running sessions on how to get the most out of Figma.',
  tedx: 'I helped **bring TEDx back to Drexel** after eight years away. Getting it off the ground as students was a whole production.',
  // Community
  prabhkiseva:
    'I started this nonprofit in Pottstown during COVID. Six years later we still run monthly drives, with **200+ hot meals** every time.',
  artmate:
    'A meetup I co-founded for artists and design-curious people. Interactive sessions, a lot of making, zero pressure.',
  // Awards
  figbuild: '**We won FigBuild 2025**, Figma’s first national hackathon, out of 54 teams. Still one of my proudest weekends.',
  ideo: 'IDEO U’s AI × Design Thinking course: a structured way to bring AI into the design process without losing the human part.',
} as const;

/**
 * Inside case studies: one line that backs up a number, and one "favorite
 * moment" per study. Attached to figures and stats only, never body text.
 */
export const CASE_LINES = {
  zoominfoStat:
    'These were **15 real customers** in our alpha pilot, with teams at places like Microsoft and Siemens. Not a hallway test.',
  zoominfoFavorite:
    'My favorite detail: even turning the new homepage off asked you why. The people who opted out were data too.',
  arriveStat:
    'Same product leaders, same rubric, before and after seeing the vision. **D+ to A−** is their grade, not mine.',
  arriveFavorite:
    'Favorite moment: three workshops with very different priorities landing on one shared roadmap.',
  jnjStat:
    'Small test, honest number: **8 of 11** designers and J&J stakeholders picked version B for its plainer language. They also didn’t want COVID as its own section.',
  jnjFavorite:
    'Favorite part: one report, six very different readers, from investors to future employees. Designing for all of them at once taught me a lot about hierarchy.',
  hypexFavorite:
    'Favorite part: our whole dev team was college students, and they shipped this space-galaxy vibe in React. Scrappy in the best way.',
  microsoftFavorite:
    'My favorite part was the co-design sessions. Seeing teachers shape their own AI assistant beat any idea we walked in with.',
} as const;

/** Case studies wait a bit longer: commentary should feel like a treat, not a pop-up. */
export const CASE_DELAY_MS = '600';

/** About page photo strip — the story behind each picture. */
export const GALLERY_LINES = {
  aiga: 'AIGA NY picked me as a 2026 mentor. Helping early-career designers find their footing is honestly my favorite kind of work.',
  figbuild: 'FigBuild, Figma’s first national hackathon. Our team **took first out of 54**. Click through for the whole story.',
  campus: 'As Figma’s Campus Leader at Parsons, I grew this into a community of **1,000+ designers**: workshops, events, and a lot of Figma help sessions.',
  prabhkiseva:
    'That’s Prabh Ki Seva, the nonprofit I started during COVID. Every month we serve **200+ hot meals** in Pottstown, six years and counting.',
} as const;

/**
 * The rest of each LinkedIn recommendation: a passage the quote on the page
 * doesn't already show, verbatim from the recommendation (Feb 2024, Amir Nov 2023).
 * Said by the recommender's own face on hover.
 */
export const RECOMMENDATION_MORE = {
  kevin:
    'Arpit is an exceptionally talented and dynamic designer. In our collaboration on various projects, I’ve had the privilege of working alongside him, particularly in user research and design for interconnected product domains.',
  vineet:
    'As an engineer, I had a great time working with Arpit. Arpit also has excellent communication skills which makes collaborating with him very easy.',
  or: 'I had the pleasure of working with Arpit, and I can confidently say that he is a standout team member. Arpit possesses a fantastic personality paired with high motivation, making him a wonderful asset to any team.',
  jeremy:
    'He brings a customer-centric approach to his work while maintaining the overall brand’s look and feel. For example, Arpit and I worked on adding SMS functionality to ZoomInfo’s TalentOS platform and the designs he made were simply amazing.',
  emily: 'Arpit has great energy, and he was a pleasure to work with.',
  // Kieran's Slack shoutout, the part not shown on the page
  kieran:
    'He presented research plans to EasyPark leadership, has been navigating uncertainty within the client’s roadmap, and confidently conducting user interviews, all without missing a beat. Glad to have you on the team!',
  amir: 'I’ve had the privilege of working closely with Arpit for nearly two years, and I wholeheartedly recommend him as an exceptional UX/UI designer. His collaborative nature, strong communication skills, and deadline-oriented approach make him an invaluable asset to any team.',
} as const;

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaDownload, FaCode, FaDesktop, FaServer, FaDatabase, FaCloud, FaShieldAlt, FaArrowRight, FaInstagram } from 'react-icons/fa';
import { Footer, Backdrop, EMAIL } from './Site';
import { AnimatedTopDock } from './assets/AnimatedTopDock';
import { createTopDockController } from './assets/topDockController';
import './assets/threeui.css';
import './Home.css';

const LINKEDIN = 'https://www.linkedin.com/in/deepak-naga-subhash-girijala-ba517431a';
const GITHUB = 'https://github.com/subhashgirijala12';
const INSTAGRAM = 'https://www.instagram.com/_deepak_girijala_/';
const PHONE = '+91 93961 15678';

const jobs = [
  {
    role: 'Software Engineer',
    company: 'Triosys Technosol',
    when: 'April 2026 to present',
    type: 'Full-time',
    stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    points: [
      'Architect and maintain React.js, Node.js, Express.js, and MySQL applications serving production traffic with 99.5%+ uptime.',
      'Spearheaded delivery of 2+ corporate websites and 2+ hackathon platforms.',
      'Automated career, workshop, certification, and campus registration modules, reducing manual administration by 50%.',
      'Design secure REST APIs for application workflows.',
      'Optimize MySQL schemas and queries, improving average data retrieval speed by 40%.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'T-Works',
    when: 'July 2025 to March 2026',
    type: 'Full-time',
    stack: ['Node.js', 'Express.js', 'MySQL', 'DigitalOcean Spaces', 'JWT', 'CI/CD'],
    points: [
      'Engineered Node.js and Express.js backend systems for analytics dashboards.',
      'Built DigitalOcean Spaces asset pipelines and token-based authentication.',
      'Optimized MySQL schemas and queries and performed migrations, reducing query execution time by 45% under increasing load.',
      'Hardened application security with Helmet and bcrypt, reducing security-related incidents by 40%.',
      'Contributed to CI/CD pipelines for application delivery.',
    ],
  },
];

const skills = [
  { name: 'Languages', description: 'Programming languages I use for development.', Icon: FaCode, accent: 'ink', tools: ['JavaScript (ES6+)', 'Python'] },
  { name: 'Frontend', description: 'Building modern and responsive user interfaces.', Icon: FaDesktop, accent: 'rose', tools: ['React.js', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'] },
  { name: 'Backend and APIs', description: 'Developing scalable backend services and APIs.', Icon: FaServer, accent: 'teal', tools: ['Node.js', 'Express.js', 'RESTful architecture', 'JWT', 'RBAC'] },
  { name: 'Databases', description: 'Storing, querying and managing data.', Icon: FaDatabase, accent: 'orange', tools: ['MySQL', 'SQLite', 'Schema design', 'Query optimization', 'Migrations'] },
  { name: 'Cloud and DevOps', description: 'Deploying and managing applications.', Icon: FaCloud, accent: 'blue', tools: ['DigitalOcean Spaces', 'Redis', 'Bull Queue', 'CI/CD', 'Linux'] },
  { name: 'Security and utilities', description: 'Tools and practices for secure, efficient development.', Icon: FaShieldAlt, accent: 'brown', tools: ['Helmet', 'bcrypt', 'Multer', 'Nodemailer', 'Postman', 'Git / GitHub', 'VS Code', 'MySQL Workbench'] },
];

const education = [
  ['B.Tech in Computer Science and Engineering', 'DNR College of Engineering and Technology, JNTUK', 'Graduated 2025', '70%'],
];

const liftIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } },
};
const sequence = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
};
const cardHover = { y: -2 };
const springHover = { duration: 0.2, ease: 'easeOut' };
const loadingStages = ['React interface', 'Node.js services', 'MySQL data', 'Portfolio ready'];
const experienceReveal = {
  hidden: { opacity: 0, x: -56, clipPath: 'inset(0 0 0 100%)' },
  show: { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)', transition: { duration: 0.78, ease: [0.22, 0.61, 0.36, 1] } },
};
const toolReveal = {
  hidden: { opacity: 0, scale: 0.78, y: 34, filter: 'blur(6px)' },
  show: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.72, ease: [0.22, 0.61, 0.36, 1] } },
};

function ContactChannelDock() {
  const dockRef = useRef(null);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return undefined;
    return createTopDockController(dock, () => ({
      proximity: 122,
      spring: 0.19,
      damping: 0.70,
      widthGrowth: 17,
      heightGrowth: 16,
      drop: 3.5,
    }));
  }, []);

  return (
    <div className="contact-dock-frame" data-dock-frame>
    <nav ref={dockRef} className="contact-channel-dock" aria-label="Contact options" data-dock-state="idle" data-dock-max="0.00">
      <a className="contact-channel" data-dock-item href={`mailto:${EMAIL}`}>
        <span className="contact-channel-icon" aria-hidden="true"><FaEnvelope /></span>
        <span className="contact-channel-copy"><span>Email</span><small>{EMAIL}</small></span>
        <span className="contact-channel-arrow" aria-hidden="true">OPEN</span>
      </a>
      <a className="contact-channel" data-dock-item href="tel:+919396115678">
        <span className="contact-channel-icon" aria-hidden="true"><FaPhone /></span>
        <span className="contact-channel-copy"><span>Phone</span><small>{PHONE}</small></span>
        <span className="contact-channel-arrow" aria-hidden="true">OPEN</span>
      </a>
      <a className="contact-channel" data-dock-item href={LINKEDIN} target="_blank" rel="noopener noreferrer">
        <span className="contact-channel-icon" aria-hidden="true"><FaLinkedin /></span>
        <span className="contact-channel-copy"><span>LinkedIn</span><small>View my profile</small></span>
        <span className="contact-channel-arrow" aria-hidden="true">OPEN</span>
      </a>
      <a className="contact-channel" data-dock-item href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
        <span className="contact-channel-icon" aria-hidden="true"><FaInstagram /></span>
        <span className="contact-channel-copy"><span>Instagram</span><small>@_deepak_girijala_</small></span>
        <span className="contact-channel-arrow" aria-hidden="true">OPEN</span>
      </a>
    </nav>
    </div>
  );
}

function OpeningLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2000;
    const startedAt = performance.now();
    const milestones = [10, 20, 50, 70, 90, 100];
    let frameId;
    let hideTimer;
    const updateProgress = (now) => {
      const elapsedRatio = Math.min(1, (now - startedAt) / duration);
      const milestoneIndex = Math.min(milestones.length - 1, Math.floor(elapsedRatio * milestones.length));
      const nextProgress = milestones[milestoneIndex];
      setProgress(nextProgress);
      if (nextProgress < 100) frameId = requestAnimationFrame(updateProgress);
      else hideTimer = window.setTimeout(() => setVisible(false), 280);
    };
    frameId = requestAnimationFrame(updateProgress);
    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const activeStage = progress >= 90 ? 3 : progress >= 50 ? 2 : progress >= 20 ? 1 : 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="opening-loader" role="status" aria-label="Loading portfolio"
          initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>
          <div className="loader-topline"><span className="loader-monogram">DG</span><span>PORTFOLIO / 2026</span></div>
          <div className="loader-center">
            <p className="loader-kicker">Building the interface</p>
            <div className="loader-progress-line">
              <motion.span className="loader-progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: .12, ease: 'linear' }} />
            </div>
            <div className="loader-readout" aria-hidden="true"><strong>{String(progress).padStart(3, '0')}<span>%</span></strong><span className="loader-stage">{loadingStages[activeStage]}</span></div>
          </div>
          <div className="loader-pipeline" aria-hidden="true">
            <span className={activeStage >= 0 ? 'is-active' : ''}>React</span><i />
            <span className={activeStage >= 1 ? 'is-active' : ''}>Node.js</span><i />
            <span className={activeStage >= 2 ? 'is-active' : ''}>MySQL</span><i />
            <span className={activeStage >= 3 ? 'is-active' : ''}>Ready</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Section = ({ id, title, description, eyebrow, centered = false, repeat = false, children }) => (
  <motion.section
    id={id}
    className={`section${centered ? ' section-centered' : ''}`}
    variants={sequence}
    initial="hidden"
    whileInView="show"
    viewport={{ once: !repeat, amount: 0.16, margin: '0px 0px -32px 0px' }}
  >
    <motion.div className="section-heading" variants={sequence}>
      {eyebrow && <motion.p className="section-eyebrow" variants={liftIn}>{eyebrow}</motion.p>}
      <motion.h2 variants={liftIn}>{title}</motion.h2>
      {description && <motion.p variants={liftIn}>{description}</motion.p>}
    </motion.div>
    <motion.div className="section-content" variants={sequence}>{children}</motion.div>
  </motion.section>
);

export default function Home() {
  const [nameSwap, setNameSwap] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
    <div className="page portfolio-page">
      <OpeningLoader />
      <Backdrop />
      <div className="portfolio-canvas" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="shader-frame">
        <AnimatedTopDock
          variant="sable"
          proximity={122}
          spring={0.19}
          damping={0.70}
          widthGrowth={17}
          heightGrowth={16}
          drop={3.5}
        />
      </div>
      <main id="main-content" className="portfolio-main">
        <section className="hero">
          <motion.h1 className="hero-name" variants={sequence} initial="hidden" animate="show" aria-label="Deepak Girijala" onMouseLeave={() => setNameSwap(false)}>
            <motion.span className={`name-outline${nameSwap ? ' name-swap-filled' : ''}`} variants={liftIn} onMouseEnter={() => setNameSwap(true)}>DEEPAK</motion.span>
            <motion.span className={`name-solid${nameSwap ? ' name-swap-outline' : ''}`} variants={liftIn} onMouseEnter={() => setNameSwap(true)}>GIRIJALA</motion.span>
          </motion.h1>
          <motion.figure
            className="photo"
            tabIndex={0}
            aria-label="Portrait in black and white. Hover or focus to see the original color."
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.18 }}
          >
            <picture className="photo-frame">
              <img src="/profile-color.png" alt="Portrait of Girijala Deepak Naga Subhash" />
            </picture>
          </motion.figure>
          <motion.div className="hero-copy" variants={sequence} initial="hidden" animate="show">
            <motion.p className="eyebrow" variants={liftIn}>Software Engineer / Hyderabad, India</motion.p>
            <motion.h2 variants={liftIn}>I build web platforms that work reliably.</motion.h2>
            <motion.p className="lead" variants={liftIn}>
              At Triosys Technosol, I build production React.js and Node.js platforms,
              secure REST APIs, and optimized MySQL systems.
            </motion.p>
            <motion.div className="actions" variants={liftIn}>
              <motion.a className="btn solid" href="#contact" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={springHover}>Let's Connect <span aria-hidden="true">&#8599;</span></motion.a>
              <motion.a className="resume-link" href="/DeepakCV.pdf" download="Deepak_naga_subhash_girijala_resume.pdf"><FaDownload /> Resume</motion.a>
            </motion.div>
          </motion.div>
          <motion.aside className="hero-socials" aria-label="Social links" variants={sequence} initial="hidden" animate="show">
            <motion.a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="Let's go to my GitHub" variants={liftIn}><span className="social-icon"><FaGithub /></span><span className="social-label">Let's go to my GitHub</span></motion.a>
            <motion.a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="Let's connect on LinkedIn" variants={liftIn}><span className="social-icon"><FaLinkedin /></span><span className="social-label">Let's connect on LinkedIn</span></motion.a>
            <motion.a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Let's follow on Instagram" variants={liftIn}><span className="social-icon"><FaInstagram /></span><span className="social-label">Let's follow on Instagram</span></motion.a>
            <motion.a href={`mailto:${EMAIL}`} aria-label="Email me" variants={liftIn}><span className="social-icon"><FaEnvelope /></span><span className="social-label"> Email me</span></motion.a>
          </motion.aside>
        </section>

        <Section id="about" title="A practical, full-stack approach" description="I build across the stack, connecting thoughtful interfaces with dependable services and data.">
          <motion.div className="card prose" variants={liftIn} style={{ transformPerspective: 1000 }} whileHover={cardHover} transition={springHover}>
            <p>I'm Deepak Girijala, a Software Engineer at Triosys Technosol in Hyderabad. I build web products across the full stack, from React interfaces to Node.js and Express services, REST APIs, and MySQL data models. I enjoy taking a feature through its whole journey: understanding the workflow, shaping the data and API, building the interface, and helping it run reliably in production.</p>
            <p>In my work, I focus on clear user flows, secure access, and systems that are straightforward to maintain. I use tools such as JWT, role-based access control, Redis, Bull Queue, DigitalOcean Spaces, and CI/CD. Recent work includes query improvements that increased data retrieval speed by 40% and production systems with 99.5%+ uptime.</p>
          </motion.div>
        </Section>

        <Section id="experience" title="Experience" description="Building and supporting software with teams in Hyderabad." eyebrow="Experience" centered>
          <motion.div className="stack" variants={sequence}>
            {jobs.map((j) => (
              <motion.article key={j.company} className="experience-card" variants={experienceReveal}>
                <div className="experience-meta">
                  <span className="experience-tag">{j.type}</span>
                  <p className="job-date">{j.when}</p>
                  <p className="job-company">{j.company}</p>
                  <p className="experience-location">Hyderabad, India</p>
                </div>
                <div className="experience-details">
                  <h3>{j.role}</h3>
                  <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  <div className="experience-tech">{j.stack.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Section>

        <Section id="skills" title="Tools I work with" description="Technologies and practices used across my development work." eyebrow="Tools" centered repeat>
          <motion.div className="grid three tools-grid" variants={sequence}>
            {skills.map(({ name, description: toolDescription, Icon, accent, tools }) => (
              <motion.article key={name} className="tool-card" variants={toolReveal} whileHover={{ y: -4 }} transition={springHover}>
                <div className="tool-card-top">
                  <span className={`tool-icon ${accent}`}><Icon aria-hidden="true" /></span>
                  <div className="tool-title"><h3>{name}</h3><p>{toolDescription}</p></div>
                  <FaArrowRight className="tool-arrow" aria-hidden="true" />
                </div>
                <div className="tool-tags">{tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
              </motion.article>
            ))}
          </motion.div>
        </Section>

        <Section id="education" title="Education" description="B.Tech in Computer Science and Engineering, graduated 2025.">
          <motion.div className="stack" variants={sequence}>
            {education.map(([deg, school, years, grade]) => (
              <motion.article key={deg} className="card education-card" variants={liftIn} style={{ transformPerspective: 1000 }} whileHover={cardHover} transition={springHover}>
                <div><h3>{deg}</h3>
                <p>{school}</p>
                <p className="job-date">{years}</p></div>
                <span className="education-grade">{grade}</span>
              </motion.article>
            ))}
          </motion.div>
        </Section>

        <Section id="contact" title="Let's Connect" description="Have a project or engineering problem in mind? Choose a channel and reach out.">
          <motion.div className="contact-console" variants={liftIn}>
            <div className="contact-console-heading">
              <span className="contact-console-kicker">CONTACT / HYDERABAD, INDIA</span>
              <h3>Good work starts with a conversation.</h3>
              <p>I'm happy to talk about software engineering, full-stack development, and building dependable web platforms.</p>
            </div>
            <ContactChannelDock />
          </motion.div>
        </Section>
      </main>
      <Footer />
      </div>
    </div>
    </MotionConfig>
  );
}


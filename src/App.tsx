import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  MoveRight,
  NotebookTabs,
  Send,
  Sparkles,
  Quote,
  X,
} from 'lucide-react';

const portrait = 'https://images.pexels.com/photos/19222080/pexels-photo-19222080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const navItems = [
  ['Home', 'home'], ['About', 'about'], ['Services', 'services'], ['Experience', 'experience'],
  ['Testimonials', 'testimonials'], ['Skills', 'skills'], ['Why Tine', 'why-tine'], ['Contact', 'contact'],
] as const;

type DetailItem = { title: string; intro: string; points: string[]; tools?: string };

const services: DetailItem[] = [
  { title: 'Business Operations & Administrative Support', intro: 'I help organize daily responsibilities, documentation, and workflows so businesses can operate with more structure and consistency.', points: ['Administrative management', 'Executive assistance', 'Task and project coordination', 'Documentation and reporting', 'Email and calendar support', 'SOP and workflow organization', 'Research and data management'] },
  { title: 'Social Media Marketing & Content Management', intro: 'I support brands in building a consistent online presence through content planning, creative execution, and social media coordination.', points: ['Social media account management', 'Content calendar development', 'Carousel creation', 'Social media copywriting', 'Brand messaging', 'Marketing research', 'Content scheduling and publishing', 'Creative coordination'] },
  { title: 'CRM & Workflow Management', intro: 'I help businesses organize customer information, manage pipelines, and improve repetitive processes.', points: ['GoHighLevel management', 'Salesforce CRM', 'Pipeline organization', 'Contact and lead management', 'Tags and opportunities', 'Workflow automation', 'Follow-up workflows', 'Google Sheets automation'] },
  { title: 'Customer & Client Management', intro: 'I help maintain professional communication and consistent customer experiences.', points: ['Email and chat support', 'Customer inquiries', 'Lead messaging', 'Follow-up coordination', 'Issue resolution', 'Order and billing support', 'Client onboarding support'] },
  { title: 'Lead Generation & Business Development Support', intro: 'I support business growth through research, prospect identification, outreach, and lead organization.', points: ['B2B lead generation', 'Prospect research', 'Contact verification', 'LinkedIn prospecting', 'Email outreach', 'Direct messaging', 'Lead qualification', 'Meeting coordination'] },
  { title: 'Real Estate & Housing Coordination', intro: 'I have hands-on experience supporting property research and temporary housing arrangements.', points: ['Rental property research', 'Furnished rental coordination', 'Property owner communication', 'Booking and tour scheduling', 'Lease requirement tracking', 'Move-in coordination', 'Maintenance request coordination'] },
];

const skills: DetailItem[] = [
  { title: 'Business Operations & Administration', intro: 'Structure, priorities, and dependable follow-through.', points: ['Daily operations coordination', 'Executive assistance', 'Workflow organization', 'SOP documentation', 'Data and records management', 'Email and calendar coordination', 'Research and reporting', 'Process improvement'] },
  { title: 'Social Media Marketing & Content', intro: 'Thoughtful planning with hands-on creative execution.', points: ['Social media planning', 'Content calendar development', 'Carousel content creation', 'Copywriting and CTAs', 'Brand voice and messaging', 'Competitor and marketing research', 'Content scheduling', 'Engagement support'] },
  { title: 'Customer Experience & Client Management', intro: 'Clear communication that keeps people supported and informed.', points: ['Email and chat support', 'Client communication', 'Lead messaging', 'Prospect follow-ups', 'Issue resolution', 'Order and billing support', 'Lead nurturing', 'Client onboarding'] },
  { title: 'CRM & Workflow Automation', intro: 'Cleaner information, visible pipelines, and smoother follow-ups.', points: ['GoHighLevel management', 'Salesforce CRM', 'Pipeline management', 'Contact and lead management', 'Workflow coordination', 'Email and DM automation', 'Google Sheets automation', 'Spreadsheet reporting'] },
  { title: 'Lead Generation & Business Development', intro: 'Organized research that helps the right conversations happen.', points: ['B2B lead generation', 'Prospect research', 'Contact verification', 'Decision-maker research', 'LinkedIn prospecting', 'Cold email outreach', 'Lead qualification', 'Meeting coordination'] },
  { title: 'Real Estate & Housing Coordination', intro: 'Practical support for property research and placements.', points: ['Rental property research', 'Availability tracking', 'Housing option coordination', 'Owner communication', 'Booking coordination', 'Property tour scheduling', 'Move-in coordination', 'Lease requirement tracking'] },
  { title: 'Executive Support & Communication', intro: 'Calm, clear support for busy people and moving parts.', points: ['Professional correspondence', 'Meeting coordination', 'Follow-up reminders', 'Information summarization', 'Research and preparation', 'Internal coordination', 'Task prioritization', 'Progress tracking'] },
  { title: 'Creative & Digital Productivity', intro: 'Flexible digital support across content and productivity tools.', points: ['Canva graphic design', 'Social media graphics', 'Presentation design', 'Short-form video editing', 'Content formatting', 'Google Workspace', 'Notion organization', 'AI-assisted research'] },
];

const tools: ReadonlyArray<readonly [string, string]> = [
  ['Google Workspace', 'Organizing communication, files, calendars, and everyday business work.'], ['Google Sheets', 'Tracking information, building simple reports, and keeping work visible.'], ['GoHighLevel', 'Managing leads, conversations, pipelines, and follow-up workflows.'], ['Salesforce', 'Maintaining customer information and account interactions.'], ['Notion', 'Structuring notes, processes, and project information.'], ['Monday.com', 'Coordinating tasks and keeping project progress organized.'], ['Canva', 'Creating social content, carousels, and marketing materials.'], ['CapCut', 'Editing short-form video content for social platforms.'], ['ChatGPT', 'Supporting research, drafting, and productivity.'], ['DocuSign', 'Coordinating digital documents and signatures.'], ['Zillow', 'Researching property options and availability.'], ['Furnished Finder', 'Researching furnished housing options.'], ['Airbnb', 'Exploring short-term stays and housing availability.'], ['Xero', 'Working around business support and financial admin tasks.'], ['Meta Business Suite', 'Supporting content planning and publishing workflows.'],
];

const experience = [
  { company: 'STANZA SOLUTIONS', role: 'Social Media Marketer', dates: 'October 2026 — Present', promoted: true, description: 'I took ownership of Stanza Solutions’ social media relaunch and expanded my responsibilities into marketing execution, brand positioning, and operational coordination.', points: ['Lead the social media relaunch and content direction', 'Develop content calendars and publishing plans', 'Create educational carousels and promotional materials', 'Establish consistent brand messaging', 'Recommend marketing priorities and practical next steps'], tools: 'Canva · Instagram · Meta Business Suite · Notion · Google Workspace · ChatGPT' },
  { company: 'STANZA SOLUTIONS', role: 'Housing Coordinator', dates: '[Insert Start Date] — September 2026', description: 'Supported temporary housing coordination for households displaced by insurance-covered property damage.', points: ['Research furnished and unfurnished rental properties', 'Coordinate options around household requirements', 'Communicate with owners, specialists, adjusters, and clients', 'Coordinate tours, bookings, and move-ins', 'Track availability, pricing, lease terms, and requirements'], tools: 'Furnished Finder · Airbnb · Zillow · Google Sheets · Gmail · DocuSign · Monday.com' },
  { company: 'SPACED MAGAZINE', role: 'Customer Lead Assistant (Part-Time)', dates: 'June 2026 — September 2026', description: 'Supported lead management and customer acquisition through direct messaging, outreach, and follow-up communication.', points: ['Managed prospect and lead messaging', 'Handled follow-ups and lead nurturing', 'Organized lead information and outreach activity', 'Managed records and pipelines through GoHighLevel'], tools: 'GoHighLevel · Instagram · LinkedIn · Google Sheets' },
  { company: 'COGNIZANT TECHNOLOGY SOLUTIONS', role: 'Process Executive', dates: 'June 2025 — February 2026', description: 'Supported retail, water, and beverage account operations while managing high-volume customer interactions.', points: ['Managed 80+ customer interactions daily', 'Processed orders, invoices, payments, and billing inquiries', 'Handled disputes, refunds, and credit adjustments', 'Maintained accurate customer records in Salesforce'], tools: 'Salesforce · Customer operations' },
  { company: 'SUTHERLAND GLOBAL SERVICES', role: 'Customer Service Associate', dates: '2024 — 2025', description: 'Provided customer support for a telecommunications account.', points: ['Handled billing, service, and technical support inquiries', 'Resolved customer concerns and service-related issues', 'Maintained customer satisfaction and service quality'], tools: 'Salesforce · Customer support' },
];

const testimonials = [
  { quote: 'Oh no you did great!! We have an appointment booked for Wednesday!!', name: 'Lena Perez', role: 'Spaced Magazine' },
  { quote: 'The Instagram portion has been reviewed — that’s exactly it! I really like that you put a note in there to personalize the DM.', name: 'Business owner feedback', role: 'Instagram outreach review' },
  { quote: 'Those look so good!!! I approve!', name: 'Lena Perez', role: 'Spaced Magazine' },
];

const values = [
  ['01', 'I take ownership', 'I learn the process, understand the objective, and take initiative to keep responsibilities moving.'],
  ['02', 'I think in systems', 'I look for ways to organize tasks, simplify workflows, and make repetitive processes more efficient.'],
  ['03', 'I understand the customer', 'My experience in customer service and lead management has taught me how to build trust professionally.'],
  ['04', 'I see beyond the task', 'I pay attention to how responsibilities connect to broader business goals and practical next steps.'],
];

const approach = [
  ['01', 'Understand', 'I learn your business, goals, current processes, and expectations.'],
  ['02', 'Organize', 'I identify priorities, responsibilities, and opportunities to improve how things are managed.'],
  ['03', 'Execute', 'I handle responsibilities with accuracy, consistency, and ownership.'],
  ['04', 'Improve', 'I look for opportunities to simplify workflows and make everyday operations more efficient.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selected, setSelected] = useState<DetailItem | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(0);
  const [tool, setTool] = useState<readonly [string, string] | null>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'fallback'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    }), { rootMargin: '-30% 0px -55% 0px' });
    navItems.forEach(([, id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const toolRows = useMemo(() => [tools.slice(0, 8), tools.slice(8)], []);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setFormState('sending'); const data = new FormData(event.currentTarget); window.setTimeout(() => { const subject = encodeURIComponent(String(data.get('subject') ?? 'Website inquiry')); const body = encodeURIComponent(`Name: ${String(data.get('name') ?? '')}\nEmail: ${String(data.get('email') ?? '')}\nCompany: ${String(data.get('company') ?? '')}\nSupport: ${String(data.get('support') ?? '')}\n\n${String(data.get('message') ?? '')}`); window.location.href = `mailto:assistbymstine@gmail.com?subject=${subject}&body=${body}`; setFormState('fallback'); }, 650); };

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Primary navigation">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home"><span className="brand-mark">VT</span><span>VA TINE</span></button>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {navItems.map(([label, id]) => <button key={id} className={activeSection === id ? 'active' : ''} onClick={() => scrollTo(id)}>{label}</button>)}
            <button className="nav-cta" onClick={() => scrollTo('contact')}>Let’s work together <ArrowUpRight size={15} /></button>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="eyebrow-line" /> Hello, I’m Tine.</div>
              <h1>I help businesses <em>stay organized,</em> move smarter, and get things done.</h1>
              <p className="hero-lede">I bring together organization, initiative, and hands-on execution to help businesses operate more efficiently and focus on what matters most.</p>
              <div className="hero-actions"><button className="button button-dark" onClick={() => scrollTo('contact')}>Let’s work together <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => scrollTo('services')}>Explore my work <MoveRight size={17} /></button></div>
              <p className="hero-note"><Sparkles size={15} /> More than task support. A partner in getting things done.</p>
            </div>
            <div className="hero-art reveal reveal-delay">
              <div className="hero-image-frame"><img src={portrait} alt="Professional portrait placeholder" /><div className="image-stamp">OPERATIONS<br /><span>+</span> EA</div></div>
              <div className="hero-float hero-float-top"><span className="status-dot" /> Open to remote opportunities</div>
              <div className="hero-float hero-float-bottom">Operations + EA <strong>= VA Tine</strong></div>
              <div className="hero-vertical">CHRISTINE C. DIONES · 2026</div>
            </div>
          </div>
          <button className="scroll-cue" onClick={() => scrollTo('about')}><span>Scroll to explore</span><ArrowDown size={16} /></button>
        </section>

        <section id="about" className="section-pad section-cream">
          <div className="container about-grid">
            <div className="section-intro reveal"><div className="eyebrow">Get to know me</div><h2>The person behind the <em>processes.</em></h2><div className="about-quote">“Good support goes beyond completing a task. It means understanding the objective, anticipating what needs attention, and taking responsibility for the work.”</div></div>
            <div className="about-copy reveal reveal-delay"><p>I’m Christine C. Diones, professionally known as Tine.</p><p>My professional journey has taken me through customer service, business operations, housing coordination, lead management, and social media marketing.</p><p>Through these experiences, I’ve developed a practical understanding of how businesses operate and what it takes to keep things moving.</p><p>Today, I bring that mindset into every project and business I support.</p><div className="education"><span>A little about my background</span><strong>BA English Communication</strong><small>Pangasinan State University · 2021–2025</small><strong>Education units</strong><small>Perpetual Help College of Pangasinan · 2025</small></div></div>
          </div>
          <div className="container highlight-row reveal"><div><b>01</b><span>Operations-minded</span></div><div><b>02</b><span>Communication-driven</span></div><div><b>03</b><span>Ownership-focused</span></div></div>
        </section>

        <section id="services" className="section-pad">
          <div className="container"><div className="section-heading reveal"><div><div className="eyebrow">How I can help</div><h2>Different responsibilities.<br /><em>One goal: better operations.</em></h2></div><p>Whether you need someone to organize operations, manage client communication, support marketing, or improve everyday workflows, I bring the skills and initiative to help.</p></div>
            <div className="card-grid services-grid">{services.map((service, index) => <button className="service-card reveal" style={{ animationDelay: `${index * 70}ms` }} key={service.title} onClick={() => setSelected(service)}><span className="card-number">0{index + 1}</span><span className="service-icon"><BriefcaseBusiness size={19} /></span><h3>{service.title}</h3><span className="card-link">View responsibilities <ArrowUpRight size={16} /></span></button>)}</div>
            <div className="section-cta reveal"><span>Need a steady hand behind the scenes?</span><button className="text-button" onClick={() => scrollTo('contact')}>Let’s talk <MoveRight size={17} /></button></div>
          </div>
        </section>

        <section id="experience" className="section-pad section-ink">
          <div className="container"><div className="section-heading light reveal"><div><div className="eyebrow">My professional journey</div><h2>Experience shaped by <em>real responsibility.</em></h2></div><p>My experience spans multiple industries and business functions, giving me the ability to adapt, manage different responsibilities, and understand the importance of reliable execution.</p></div>
            <div className="timeline">{experience.map((item, index) => <div className={`timeline-item reveal ${expandedExperience === index ? 'expanded' : ''}`} key={`${item.company}-${item.role}`}><div className="timeline-marker"><span /></div><div className="timeline-date">{item.dates}</div><button className="timeline-main" onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}><div><span className="company">{item.company} {item.promoted && <b>PROMOTED</b>}</span><h3>{item.role}</h3></div><ChevronDown className="timeline-chevron" size={20} /></button><div className="timeline-details"><p>{item.description}</p><ul>{item.points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul><span className="tool-line">Tools: {item.tools}</span></div></div>)}</div>
          </div>
        </section>

        <section id="testimonials" className="section-pad testimonials-section"><div className="container"><div className="section-heading light reveal"><div><div className="eyebrow">Words from the work</div><h2>Good work should make <em>things move.</em></h2></div><p>Real feedback shared by people Tine has supported across lead management, outreach, and content execution.</p></div><div className="testimonial-grid">{testimonials.map((testimonial, index) => <article className="testimonial-card reveal" style={{ animationDelay: `${index * 90}ms` }} key={`${testimonial.name}-${index}`}><Quote size={25} /><blockquote>“{testimonial.quote}”</blockquote><div className="testimonial-author"><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div></article>)}</div><div className="testimonial-note"><span>Feedback shown from supplied client conversations</span><button className="text-button light-text" onClick={() => scrollTo('contact')}>Start a conversation <MoveRight size={17} /></button></div></div></section>

        <section id="skills" className="section-pad section-cream">
          <div className="container"><div className="section-heading reveal"><div><div className="eyebrow">What I bring to the table</div><h2>A versatile skill set.<br /><em>A practical approach.</em></h2></div><p>I combine operational knowledge, creative execution, customer experience, and technical skills to support businesses across different functions.</p></div><div className="skills-list">{skills.map((skill, index) => <div className={`skill-row reveal ${expandedSkill === index ? 'open' : ''}`} key={skill.title}><button onClick={() => setExpandedSkill(expandedSkill === index ? null : index)}><span className="skill-index">0{index + 1}</span><strong>{skill.title}</strong><span className="skill-intro">{skill.intro}</span><ChevronRight size={19} /></button><div className="skill-details">{skill.points.map((point) => <span key={point}>{point}</span>)}</div></div>)}</div></div>
        </section>

        <section id="tools" className="tools-section section-pad">
          <div className="container"><div className="tools-head reveal"><div className="eyebrow">The tools behind the work</div><h2>The tools I use to turn <em>ideas into execution.</em></h2><p>I’m comfortable working across different platforms and digital environments to manage operations, communication, marketing, and business processes.</p></div></div>
          <div className="marquee-wrap" onMouseEnter={() => setMarqueePaused(true)} onMouseLeave={() => setMarqueePaused(false)}><div className={`marquee-row ${marqueePaused ? 'paused' : ''}`}>{[...toolRows[0], ...toolRows[0]].map(([name, description], index) => <button key={`${name}-${index}`} className="tool-pill" onClick={() => setTool([name, description])}><span className="tool-dot" />{name}</button>)}</div><div className={`marquee-row reverse ${marqueePaused ? 'paused' : ''}`}>{[...toolRows[1], ...toolRows[1]].map(([name, description], index) => <button key={`${name}-${index}`} className="tool-pill" onClick={() => setTool([name, description])}><span className="tool-dot" />{name}</button>)}</div></div>
          <div className="container tool-categories"><span>CRM & client management</span><span>Operations & project management</span><span>Marketing & creative</span><span>Communication & documentation</span><span>Real estate & housing</span></div>
        </section>

        <section id="why-tine" className="section-pad section-sage"><div className="container"><div className="section-heading reveal"><div><div className="eyebrow">The difference</div><h2>You need someone who <em>takes ownership.</em></h2></div><p>I believe good support comes from understanding the bigger picture, paying attention to the details, and taking responsibility for moving things forward.</p></div><div className="value-grid">{values.map(([number, title, description]) => <article className="value-card reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

        <section className="value-section section-pad"><div className="container value-split"><div className="value-statement reveal"><div className="eyebrow">The value I bring</div><h2>What working<br />with me <em>looks like.</em></h2><p>My goal is simple: make your work easier, your processes smoother, and your time more valuable.</p></div><div className="value-list reveal reveal-delay">{['More organized day-to-day operations', 'Consistent communication and follow-through', 'Better visibility over tasks and priorities', 'Accurate documentation and tracking', 'Less repetitive administrative work', 'Organized lead and customer management', 'Consistent marketing execution', 'Proactive support and practical recommendations', 'A dependable team member who values accountability'].map((item, index) => <div key={item}><span>0{index + 1}</span>{item}<Check size={16} /></div>)}</div></div></section>

        <section className="section-pad approach-section"><div className="container"><div className="section-heading reveal"><div><div className="eyebrow">My approach</div><h2>Understand. Organize.<br /><em>Execute. Improve.</em></h2></div><p>A simple, practical way of working that keeps the bigger picture in view while the details get done.</p></div><div className="approach-grid">{approach.map(([number, title, description]) => <div className="approach-step reveal" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div>{number !== '04' && <ArrowUpRight size={19} />}</div>)}</div></div></section>

        <section className="resume-section section-pad"><div className="container resume-box reveal"><div><div className="eyebrow">My background</div><h2>Want to see the <em>complete picture?</em></h2><p>Explore my professional background, qualifications, experience, and skills in more detail.</p></div><div className="resume-actions"><a className="button button-dark" href="./assets/christine-diones-resume.pdf" download>Download my resume <FileText size={17} /></a><a className="button button-light" href="./assets/christine-diones-resume.pdf" target="_blank" rel="noreferrer">View my resume <ExternalLink size={17} /></a><small>Resume PDF placeholder — replace when ready.</small></div></div></section>

        <section id="contact" className="contact-section section-pad"><div className="container contact-grid"><div className="contact-copy reveal"><div className="eyebrow">Let’s start a conversation</div><h2>Have something in mind? <em>Let’s talk.</em></h2><p>Whether you’re looking for reliable support, need help organizing your operations, or want someone who can take ownership of important responsibilities, I’d love to hear from you.</p><div className="contact-closing"><strong>Good work starts with the right people.</strong><span>Let’s connect and see how I can contribute to your business.</span></div></div><div className="contact-form-wrap reveal reveal-delay"><form onSubmit={handleSubmit}><div className="form-row"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Email address<input type="email" name="email" required placeholder="you@company.com" /></label></div><label>Company / business name <span>(optional)</span><input name="company" placeholder="Your company" /></label><label>What kind of support are you looking for?<select name="support" required defaultValue=""><option value="" disabled>Select an option</option>{['Virtual Assistance', 'Business Operations', 'Executive Assistance', 'Social Media Marketing', 'CRM & Workflow Management', 'Customer Support', 'Lead Generation', 'Other'].map((option) => <option key={option}>{option}</option>)}</select></label><label>Subject<input name="subject" required placeholder="How can I help?" /></label><label>Message<textarea name="message" required rows={4} placeholder="Tell me a little about what you need support with..." /></label><button className="button button-dark form-submit" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Preparing your message…' : 'Send me a message'} <Send size={16} /></button>{formState === 'fallback' && <div className="form-notice"><Check size={16} /> Your email app will open so you can send this message directly.</div>}</form></div></div><div className="container direct-contact"><span className="direct-label">Prefer a direct hello?</span><a href="mailto:assistbymstine@gmail.com"><Mail size={17} /> assistbymstine@gmail.com <ArrowUpRight size={15} /></a><a href="https://wa.me/639354736113" target="_blank" rel="noreferrer"><MessageCircle size={17} /> +63 935 473 6113 <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/vachristinediones" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn profile <ArrowUpRight size={15} /></a></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div><button className="brand footer-brand" onClick={() => scrollTo('home')}><span className="brand-mark">VT</span><span>VA TINE</span></button><p>Operations + EA = VA Tine</p></div><div className="footer-nav">{['home', 'about', 'services', 'experience', 'contact'].map((id) => <button key={id} onClick={() => scrollTo(id)}>{id}</button>)}</div><div className="footer-social"><a href="https://www.linkedin.com/in/vachristinediones" target="_blank" rel="noreferrer"><Linkedin size={16} /></a><a href="mailto:assistbymstine@gmail.com"><Mail size={16} /></a><a href="https://wa.me/639354736113" target="_blank" rel="noreferrer"><MessageCircle size={16} /></a></div></div><div className="container footer-bottom"><span>© 2026 Christine C. Diones. All rights reserved.</span><span>Built with intention. Powered by ownership.</span></div></footer>

      <div className="floating-actions"><div className={`quick-menu ${contactOpen ? 'open' : ''}`}><button onClick={() => scrollTo('contact')}><Send size={15} /> Send me a message</button><a href="mailto:assistbymstine@gmail.com"><Mail size={15} /> Email me</a><a href="https://wa.me/639354736113" target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a><a href="https://www.linkedin.com/in/vachristinediones" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a></div><button className="floating-button" onClick={() => setContactOpen(!contactOpen)} aria-label="Open contact shortcuts">{contactOpen ? <X size={19} /> : <MessageCircle size={19} />}</button>{showTop && <button className="top-button" onClick={() => scrollTo('home')} aria-label="Back to top"><ArrowUp size={17} /></button>}</div>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X size={19} /></button><div className="eyebrow">How I can help</div><h2>{selected.title}</h2><p>{selected.intro}</p><div className="modal-points">{selected.points.map((point) => <span key={point}><Check size={15} />{point}</span>)}</div><button className="button button-dark" onClick={() => { setSelected(null); scrollTo('contact'); }}>Talk about this support <ArrowUpRight size={16} /></button></div></div>}
      {tool && <div className="modal-backdrop" onClick={() => setTool(null)}><div className="modal tool-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setTool(null)} aria-label="Close"><X size={19} /></button><div className="tool-modal-icon"><NotebookTabs size={22} /></div><div className="eyebrow">Digital toolkit</div><h2>{tool[0]}</h2><p>{tool[1]}</p><button className="text-button" onClick={() => setTool(null)}>Close <X size={16} /></button></div></div>}
    </div>
  );
}

export default App;

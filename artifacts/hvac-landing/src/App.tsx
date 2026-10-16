import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight,
  Check,
  CircleHelp,
  Flame,
  House,
  Menu,
  Phone,
  Plus,
  Snowflake,
  Thermometer,
  Wind,
  Wrench,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const phonePlaceholder = '(000) 000-0000';

const services = [
  {
    icon: Wrench,
    title: 'A repair that makes sense',
    text: 'We’ll listen to what’s happening, find the cause, and walk through the options before work begins.',
  },
  {
    icon: Snowflake,
    title: 'Cooling, back in rhythm',
    text: 'From a warm-air surprise to a system that needs a closer look, get thoughtful AC service.',
  },
  {
    icon: Flame,
    title: 'Heat when you need it',
    text: 'Furnace troubleshooting and heating service to help make cold rooms feel like home again.',
  },
  {
    icon: Wind,
    title: 'A smarter system upgrade',
    text: 'Explore equipment that fits your home, comfort priorities, and the way you want to live.',
  },
];

const faqs = [
  {
    question: 'What should I do if my heating or cooling suddenly stops?',
    answer:
      'Start with the thermostat setting and your electrical panel, if it is safe to do so. If the system still will not run, or you notice an unusual smell or sound, stop using it and contact a qualified HVAC professional. We can help you describe what you are seeing and decide on a next step.',
  },
  {
    question: 'Will I know the cost before repair work starts?',
    answer:
      'That is the goal. A technician should explain what they found, outline the available options, and review the expected cost before you approve work. Ask us to clarify anything that feels unclear.',
  },
  {
    question: 'How do I know whether to repair or replace a system?',
    answer:
      'There is no one-size-fits-all answer. The condition of the equipment, the nature of the issue, comfort concerns, and your plans for the home all matter. We will lay out the trade-offs so you can make the call that feels right for you.',
  },
  {
    question: 'What information is helpful when I get in touch?',
    answer:
      'Tell us whether the issue is heating, cooling, airflow, or something else; what the system is doing; and when it began. If you know the equipment type or model, that can help too—but it is not a requirement.',
  },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Northline Heating and Air, home">
      <span className="brand-mark"><Thermometer size={22} strokeWidth={1.8} /></span>
      <span>
        <span className="brand-name">Northline Heating &amp; Air</span>
        <span className="brand-sub">Comfort, considered</span>
      </span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="topline">
        <div className="container-wide topline-inner">
          <span><strong>Northline Heating &amp; Air</strong> <span aria-hidden="true">·</span> A local crew for home comfort</span>
          <span>Serving <strong>[replace with service area]</strong></span>
        </div>
      </div>
      <div className="nav-wrap">
        <nav className="container-wide nav" aria-label="Main navigation">
          <Brand />
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#services" onClick={closeMenu}>What we do</a>
            <a href="#approach" onClick={closeMenu}>Our approach</a>
            <a href="#faq" onClick={closeMenu}>Good to know</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
          <div className="nav-actions">
            <a className="phone-link" href="#contact" aria-label="View contact details">
              <Phone size={16} /> {phonePlaceholder}
            </a>
            <a className="button" href="#contact">Request service <ArrowRight size={15} /></a>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

function HouseDrawing() {
  return (
    <div className="house-illustration" aria-hidden="true">
      <svg viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M45 157L300 28L555 157" stroke="#214F58" strokeWidth="3" />
        <path d="M83 145V287H517V145" stroke="#214F58" strokeWidth="3" />
        <path d="M255 287V193H345V287" stroke="#214F58" strokeWidth="3" />
        <path d="M126 181H216V244H126V181Z" fill="#E8F0E8" stroke="#214F58" strokeWidth="3" />
        <path d="M384 181H474V244H384V181Z" fill="#E8F0E8" stroke="#214F58" strokeWidth="3" />
        <path d="M171 181V244M126 212H216M429 181V244M384 212H474" stroke="#214F58" strokeWidth="2" />
        <path d="M231 107H369V147H231V107Z" fill="#DCE8E1" stroke="#214F58" strokeWidth="2" />
        <path d="M294 107V146" stroke="#214F58" strokeWidth="2" />
        <path d="M37 287H563" stroke="#214F58" strokeWidth="3" />
        <path d="M105 288C128 269 142 270 160 288M424 288C447 267 467 270 486 288" stroke="#819B91" strokeWidth="3" />
      </svg>
    </div>
  );
}

function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -35px 0px' },
    );
    nodes.forEach((node) => observer.observe(node));
    setVisible(true);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell" id="top" data-ready={visible}>
      <Header />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-copy">
              <div className="eyebrow reveal">When home doesn’t feel like home</div>
              <h1 className="display reveal reveal-delay-1" id="hero-title">Comfort,<br /><em>back on track.</em></h1>
              <p className="hero-lede reveal reveal-delay-2">A dependable local heating and cooling crew, here to make the next step feel simple—and your home feel right again.</p>
              <div className="hero-ctas reveal reveal-delay-3">
                <a className="button" href="#contact">Talk through a service call <ArrowRight size={16} /></a>
                <a className="button button-outline" href="#services">Explore what we do</a>
              </div>
              <div className="hero-note reveal reveal-delay-3"><Check size={15} /><span>Clear explanations. Options before the work. A real person to talk to.</span></div>
            </div>
          </div>
          <div className="hero-stamp" aria-label="Heating and cooling for home">
            <strong>Good air.<br />Good home.</strong><span>Heating · Cooling</span>
          </div>
        </section>

        <section className="quickline" aria-label="What matters to us">
          <div className="container-wide quickline-grid">
            <div className="quickline-lead">Help without the runaround.</div>
            <div className="quickline-item"><House size={20} /><span><strong>Home-first service</strong>Respect for your space</span></div>
            <div className="quickline-item"><CircleHelp size={20} /><span><strong>Understand your options</strong>No pressure, plain language</span></div>
            <div className="quickline-item"><Thermometer size={20} /><span><strong>Comfort that fits</strong>Repair or upgrade, your call</span></div>
          </div>
        </section>

        <section className="section" id="approach">
          <div className="container-wide intro-grid">
            <div className="reveal">
              <div className="eyebrow">A calmer kind of service</div>
              <h2 className="display intro-title">The house is uncomfortable.<br />Let’s start there.</h2>
            </div>
            <div className="intro-copy reveal reveal-delay-1">
              <p>When the heat quits on a chilly morning or the air conditioner can’t keep up, you do not need a sales pitch. You need someone who listens, checks the right things, and explains what comes next.</p>
              <p>That’s the Northline way: thoughtful troubleshooting, useful choices, and care for the home we’ve been invited into. We’ll work to make a stressful moment feel a little more manageable.</p>
              <a className="text-link" href="#contact">Tell us what’s going on <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="service-section" id="services">
          <div className="container-wide">
            <div className="section-heading reveal">
              <div>
                <div className="eyebrow">A hand with the whole system</div>
                <h2 className="display">The right help for<br />the moment you’re in.</h2>
              </div>
              <p>From the first strange noise to planning a more comfortable home, start with a conversation—not a guess.</p>
            </div>
            <div className="service-grid">
              {services.map(({ icon: Icon, title, text }, index) => (
                <a href="#contact" className={`service-card reveal reveal-delay-${index % 3 + 1}`} key={title} data-testid={`card-service-${index}`}>
                  <span className="service-icon"><Icon size={20} strokeWidth={1.7} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ArrowRight className="service-arrow" size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="diagnostic section">
          <div className="container-wide diagnostic-grid">
            <div className="reveal">
              <div className="eyebrow">First, understand the why</div>
              <h2 className="display">No mystery tour<br />of your mechanical room.</h2>
              <p className="diagnostic-copy">We look at the system as a whole, then tell you what we found in everyday language. You’ll know what needs attention now, what can wait, and what each choice means.</p>
              <a className="button button-outline" href="#contact">Ask about your system <ArrowRight size={15} /></a>
            </div>
            <ul className="check-list reveal reveal-delay-2">
              <li><span>01</span>We hear your concerns and the little details</li>
              <li><span>02</span>We inspect the equipment and likely causes</li>
              <li><span>03</span>We explain practical next steps and costs</li>
              <li><span>04</span>You choose how you’d like to move forward</li>
            </ul>
          </div>
        </section>

        <section className="section promise-section">
          <div className="container-wide promise-grid">
            <div className="promise-art reveal" aria-label="Illustration of a comfortable home">
              <span className="art-label">Home comfort, in the details</span>
              <HouseDrawing />
              <div className="quote-card"><small>Our north star</small><strong>Good work.<br />Good neighbors.</strong></div>
            </div>
            <div className="promise-copy reveal reveal-delay-1">
              <div className="eyebrow">People first, always</div>
              <h2 className="display">A crew that treats your home like yours.</h2>
              <p>We know a service visit happens in the middle of real life. So we show up ready to listen, explain what we’re doing, and leave you feeling informed—not cornered.</p>
              <div className="promise-points">
                <div className="promise-point"><span><Check size={16} /></span><div><strong>Respect for your space</strong><p>Careful, considerate service from the door to the thermostat.</p></div></div>
                <div className="promise-point"><span><Check size={16} /></span><div><strong>Advice you can understand</strong><p>Clear choices based on your home and what matters to you.</p></div></div>
                <div className="promise-point"><span><Check size={16} /></span><div><strong>Decisions stay with you</strong><p>We explain the work. You decide what happens next.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="steps-section" aria-labelledby="steps-title">
          <div className="container-wide">
            <div className="steps-header reveal">
              <div><div className="eyebrow">A good next step</div><h2 className="display" id="steps-title">Simple from the<br />first hello.</h2></div>
              <p>Not sure what the system needs? That’s okay. You do not need to diagnose it before you reach out.</p>
            </div>
            <div className="steps-grid">
              <article className="step reveal"><div className="step-number">01</div><div className="step-line" /><h3>Tell us what changed</h3><p>Share what you’re noticing, what you’ve tried, and what kind of help you’re looking for.</p></article>
              <article className="step reveal reveal-delay-1"><div className="step-number">02</div><div className="step-line" /><h3>We make a plan together</h3><p>We’ll talk through a service visit and what details may help us arrive prepared.</p></article>
              <article className="step reveal reveal-delay-2"><div className="step-number">03</div><h3>Choose your way forward</h3><p>After we understand the issue, you’ll have clear options before deciding what to do.</p></article>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container-wide faq-layout">
            <div className="faq-intro reveal">
              <div className="eyebrow">A few useful answers</div>
              <h2 className="display">Before you pick up the phone.</h2>
              <p>Comfort issues can feel urgent. Here are a few things to know before we talk.</p>
              <a className="text-link" href="#contact">Still have a question? <ArrowRight size={15} /></a>
            </div>
            <div className="faq-list reveal reveal-delay-1">
              {faqs.map(({ question, answer }) => (
                <details className="faq-item" key={question}>
                  <summary>{question}<Plus size={17} aria-hidden="true" /></summary>
                  <div className="faq-answer">{answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container-wide contact-grid">
            <div className="reveal">
              <div className="eyebrow">Let’s get comfortable again</div>
              <h2 className="display">Tell us what’s happening at home.</h2>
              <p>Call to talk through a service need or ask about an upgrade. We’ll help you figure out a sensible next step.</p>
              <p className="placeholder-note">“Northline Heating &amp; Air” is a temporary business name. Replace it, the placeholder phone and email, and “[replace with service area]” before publishing.</p>
            </div>
            <div className="contact-actions reveal reveal-delay-1">
              <a className="button" href="tel:+10000000000" aria-label={`Call Northline at placeholder number ${phonePlaceholder}`}><Phone size={16} /> Call {phonePlaceholder}</a>
              <a className="button button-outline" href="mailto:hello@example.com">Email hello@example.com <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container-wide">
          <div className="footer-main">
            <Brand />
            <div className="footer-links">
              <a href="#services">Services</a><a href="#approach">Our approach</a><a href="#faq">FAQs</a><a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Northline Heating &amp; Air. Built around home comfort.</p>
            <p className="footer-placeholder">Temporary business identity · Replace phone, email &amp; service area</p>
          </div>
        </div>
      </footer>
      <a className="mobile-call" href="#contact" aria-label="View contact details"><Phone size={20} /></a>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

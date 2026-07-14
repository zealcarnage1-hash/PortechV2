import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import ScrollExpansionHero from "./components/ui/scroll-expansion-hero";
import "./styles.css";
import "./overrides.css";
import { supabase } from "./lib/supabase";
import AdminPortal from "./components/AdminPortal";

const A = "https://portech.in/assets/img/";
type Service = {
    title: string;
    slug: string;
    image: string;
    intro: string;
    overview: string;
    features: [string, string, string];
};
const services: Service[] = [
    {
        title: "Erection & Commissioning",
        slug: "erection-and-commissioning.php",
        image: "services/3.jpg",
        intro:
            "Our group specializes in the erection and commissioning of container handling equipment, bulk handling equipment, industrial EOT cranes, and specially designed industrial cranes.",
        overview:
            "The process involves careful planning, equipment selection, and installation of structural, mechanical, and electrical components. We ensure secure cable laying and termination, followed by power testing and cold testing to verify performance. Once installation is complete, we charge electrical drives, program PLCs, and set up field equipment. Comprehensive load and performance guarantee tests are conducted to ensure compliance with safety standards. The process culminates in a thorough handover, ensuring that all systems are fully operational and ready for use.",
        features: [
            "Planning & Installation",
            "Testing & Calibration",
            "Performance Validation & Handover",
        ],
    },
    {
        title: "Offloading, Shifting & Dismantling",
        slug: "offloading-shifting-and-dismantling.php",
        image: "services/5.jpg",
        intro:
            "Our expertise in offloading, shifting, and dismantling ensures safe and efficient handling of heavy equipment and machinery. From unloading materials to repositioning and relocating components, we employ advanced techniques and equipment to maintain the integrity of all assets.",
        overview:
            "During dismantling, we focus on preserving the usability of components by adhering to precise procedures and safety standards. With thorough documentation and skilled execution, we ensure that all operations are conducted efficiently, leaving the site prepared for subsequent tasks or projects.",
        features: [
            "Safe Offloading & Shifting",
            "Efficient Dismantling",
            "Seamless Execution",
        ],
    },
    {
        title: "Crane Modernization",
        slug: "crane-modernization.php",
        image: "services/2.jpg",
        intro:
            "With extensive experience and OEM partnerships, we specialize in crane modernization. Our retrofitting solutions demand expert knowledge to replace damaged components, conduct inspections, and ensure compliance with evolving safety standards.",
        overview:
            "We upgrade mechanical machinery parts, electrical drives, PLCs, and field equipment, ensuring your crane systems operate efficiently and reliably for years to come.",
        features: [
            "Expert Retrofitting",
            "Comprehensive Upgrades",
            "Long-Term Reliability",
        ],
    },
    {
        title: "Inspection Reporting",
        slug: "inspection-reporting.php",
        image: "services/4.jpg",
        intro:
            "Inspection Reporting ensures every project phase aligns with safety, quality, and operational standards. Our process includes detailed assessments of structural, mechanical, and electrical components to identify defects or deviations.",
        overview:
            "These reports serve as a roadmap for corrective actions and compliance assurance. By providing transparent documentation and actionable recommendations, we ensure adherence to industry guidelines, fostering trust and delivering projects that meet the highest standards of quality and performance.",
        features: [
            "Thorough Evaluations",
            "Transparent Documentation",
            "Compliance Assurance",
        ],
    },
    {
        title: "Crane Maintenance",
        slug: "crane-maintenance.php",
        image: "services/1.jpg",
        intro:
            "We offer Crane Repair and Maintenance Services to all ports, terminals and industries. Our reliable Maintenance administrations ensure smooth, hassle-free crane operations, backed by a team of highly skilled engineers and technicians.",
        overview:
            "Our Services are acclaimed for accuracy and speediness. Our Service Engineers and Technicians are committed to work in all environments and complete the tasks timely to satisfy clients at top priority.",
        features: [
            "Breakdown Up keep",
            "Periodic Preventive Maintenance",
            "Predictive Maintenance",
        ],
    },
    {
        title: "Electrical Panel Manufacturing",
        slug: "electrical-panel-manufacturing.php",
        image: "services/8.jpg",
        intro:
            "We are also engaged in the supply of Electrical Control Panels and Power Panels, offering tailored designs based on client specifications.",
        overview:
            "Our services extend to the design and manufacture of all types of panels, including electrical panels, automation panels, instrumentation panels, and distribution boards. With our extensive industry knowledge and strong grasp of manufacturing processes, we ensure the production of high-quality panels that meet the unique needs of each client.",
        features: [
            "Custom Panel Design",
            "High-Quality Manufacturing",
            "Comprehensive Solutions",
        ],
    },
    {
        title: "Fabrication and Machining",
        slug: "fabrication-and-machining.php",
        image: "services/7.jpg",
        intro:
            "We specialize in the fabrication of steel structures both in our workshop and at client sites, catering to modernization or crane renovation projects requiring structural changes or repairs.",
        overview:
            "Our team of skilled engineers, technicians, welders, and fitters ensures high-quality workmanship. We adhere to client specifications or international standards for materials and provide precise cost estimates. Additionally, we offer support structures to reinforce existing steel frameworks.",
        features: [
            "Steel Structure Fabrication",
            "Customized Steel Solutions",
            "Precision Machining",
        ],
    },
    {
        title: "Supply of Spares",
        slug: "supply-of-spares.php",
        image: "services/6.jpg",
        intro:
            "We can supply: Twist lock for Spreader and Head Block for QC, RTG, RMG, RS and so forth; pins, pulleys, wheel, guideroller or some other machining parts; wire ropes; electrical cables, electrical switch gear and electrical components; steel plates, pipes, steel structure and steel fabrication and Machining equipments according to Customer prerequisites.",
        overview:
            "During dismantling, we focus on preserving the usability of components by adhering to precise procedures and safety standards. With thorough documentation and skilled execution, we ensure that all operations are conducted efficiently.",
        features: [
            "Mechanical Components",
            "Electrical Components",
            "Steel Fabrication",
        ],
    },
];
const completed = [
    [
        "QC’s Drive replacement work Mundra DPW",
        "project/6/QCs-Drive-replacement-Mundra-DPW.jpg",
    ],
    [
        "MHC Winch Drum Retrofit Work at Mundra Adani Port",
        "project/5/MHC-Winch-Drum-Retrofit-Work-at-Mundra-AdaniPort.jpg",
    ],
    [
        "Retrofit & Revamp of ELL Crane at NSRY Cochin",
        "project/4/Retrofit-Revamp-of-ELL-Crane-at-NSRY-Cochins.jpg",
    ],
    [
        "Movement and Erection of 3 RMG Cranes at DPW Mumbai (NSICT)",
        "project/1/Movement-and-Erection-of-3-RMG-Cranes-at-DPW-Mumbai-NSICT.jpg",
        "movement-and-erection-of-3-RMG-cranes-at-DPW-mumbai-NSICT.php",
    ],
    [
        "Dismantling, Shifting & Hybridization of 2 RTG Cranes at GTI & HTPL",
        "project/2/Dismantling, Shifting & Hybridization of 2 RTG Cranes at GTI & HTPL1.jpg",
        "dismantling-shifting-hybridization-of-2-RTG-cranes-at-GTI-and-HTPL.php",
    ],
    [
        "Erection & Commissioning of 1 No. Neuero M400 Ship Unloader Crane, Kakinada Port, Andhra Pradesh, India",
        "project/3/Erection & Commissioning of Neuero M400 Ship Unloader at Kakinada Port1.jpg",
        "erection-and-commissioning-of-neuero-M400-ship-unloader-at-kakinada-port.php",
    ],
];
const ongoing = [
    [
        "BHEL 660 MW power plant Conveyor Erection and installation work",
        "project/Ongoing/3/BHEL-660MW-power-plant-Conveyor-Erection-and-installation.jpg",
    ],
    [
        "2 QC Retrofit - Boom & Girder Internal Painting, Flange Bolt Replacement & Cabin Refurbishment, Structural NDT Inspection and Rectification, Trolley Wheel Replacement",
        "project/Ongoing/2/2 QC Retrofit – Trolley Wheel & Rail Replacement, Boom & Girder Internal Painting, Flange Bolt & Cabin Refurbishment, Structural NDT @ Haldia International Container Terminal, West Bengal.jpg",
    ],
    [
        "1 No of 300 T Goliath Crane Erection work for Larsen and Toubro (L&T)",
        "project/Ongoing/1/1-No-of-300-T-Goliath-Crane-Erection-work-for-Larsen-and-Toubro.jpg",
    ],
];
const blogTitles = [
    "Electrical Control Panel for EOT Crane",
    "The Impact of Automation on the Efficiency of Port Container Terminals",
    "Why Bulk Port Handling Equipment Support Is Essential for Modern Indian Ports",
    "How PORTECH Supports the Future of the Indian Port Industry",
    "Port Crane repair and maintenance services",
    "Port Crane Modernization & Automation",
    "Port Crane Repair & Emergency Breakdown Support",
    "Crane Inspections and Preventive Maintenance",
    "EOT Crane Service Provider in India",
    "Why Electrical Panels Are Critical for Port Crane Performance",
];
const articleSlugs = [
    "annual-maintenance-contract-AMC-for-port-cranes.php",
    "best-port-container-handling-equipment-service-in-india.php",
    "best-port-crane-electrical-panels-supplier-in-india.php",
    "comprehensive-port-crane-solutions-and-services.php",
    "crane-inspections-and-preventive-maintenance.php",
    "electrical-and-power-panels-used-in-port-cranes-types-functions-and-applications.php",
    "electrical-control-panel-for-EOT-crane.php",
    "electronics-and-control-system-maintenance-for-port-cranes.php",
    "EOT-crane-service-provider-in-india.php",
    "EOT-port-crane-repair-&-maintenance-services-in-india.php",
    "expert-port-crane-maintenance-services-in-the-UAE.php",
    "how-portech-supports-the-future-of-the-indian-port-industry.php",
    "how-to-choose-the-right-port-crane-maintenance-partner-in-india.php",
    "how-to-increase-the-efficiency-of-your-port-operation.php",
    "how-to-reduce-port-crane-downtime-in-high-traffic-terminals.php",
    "innovations-in-port-crane-technology-enhancing-performance-and-reducing-failures.php",
    "port-crane-diagnostics-and-maintenance-in-india.php",
    "port-crane-equipment-AMC-services-india.php",
    "port-crane-installation-and-commissioning.php",
    "port-crane-maintenance-and-inspection-in-dubai.php",
    "port-crane-maintenance-and-repair-services-provider.php",
    "port-crane-modernization-and-automation.php",
    "port-crane-NDT-inspection.php",
    "port-crane-repair-and-emergency-breakdown-support.php",
    "port-crane-spare-parts-supplier-in-india.php",
    "preventive-maintenance-for-STS-RTG-RMG-and-stacker-reclaimer-cranes.php",
    "sts-crane-services-specialists.php",
    "the-impact-of-automation-on-the-efficiency-of-port-container-terminals.php",
    "the-importance-of-inspection-reporting-ensuring-safety-and-quality-in-every-project-phase.php",
    "what-are-the-safety-precautions-during-port-crane-operation.php",
    "why-bulk-port-handling-equipment-support-is-essential-for-modern-indian-ports.php",
    "why-electrical-panel-quality-dictates-port-success.php",
    "why-every-port-needs-a-reliable-crane-maintenance-partner.php",
    "why-port-crane-erection-and-commissioning-must-be-done-by-experts.php",
    "why-port-cranes-fail-under-continuous-operations-and-how-to-prevent-it.php",
];
const go = (p: string) => {
    history.pushState({}, "", `/${p}`);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo(0, 0);
};
function Header({ current }: { current: string }) {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = React.useRef(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY.current) {
                setHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={hidden ? "hidden" : ""}>
                <a className="brand" onClick={() => go("index.php")}>
                    <img src={A + "Portech 10 Year LogoA.jpg"} />
                    <b>PORTECH</b>
                </a>
                <nav
                    className={open ? "open" : ""}
                    onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.tagName === 'A' || target.tagName === 'BUTTON') {
                            setOpen(false);
                        }
                    }}
                >
                    <a className={current === "index.php" || current === "" ? "active" : ""} onClick={() => go("index.php")}>Home</a>
                    <a className={current === "aboutus.php" ? "active" : ""} onClick={() => go("aboutus.php")}>About</a>
                    <span className={`drop ${services.find((s) => s.slug === current) ? "active" : ""}`}>
                        Services{" "}
                        <i>
                            {services.map((s) => (
                                <a key={s.slug} className={current === s.slug ? "active" : ""} onClick={() => go(s.slug)}>
                                    {s.title}
                                </a>
                            ))}
                        </i>
                    </span>
                    <span className={`drop ${current.includes("projects.php") ? "active" : ""}`}>
                        Projects{" "}
                        <i>
                            <a className={current === "completed-projects.php" ? "active" : ""} onClick={() => go("completed-projects.php")}>
                                Completed Projects
                            </a>
                            <a className={current === "ongoing-projects.php" ? "active" : ""} onClick={() => go("ongoing-projects.php")}>Ongoing Projects</a>
                        </i>
                    </span>
                    <a className={current === "blog.php" || current.length > 20 && !current.includes("projects") && !services.find(s=>s.slug===current) ? "active" : ""} onClick={() => go("blog.php")}>Insights</a>
                    <a className={current === "career.php" ? "active" : ""} onClick={() => go("career.php")}>Careers</a>
                    <a className={current === "safety.php" ? "active" : ""} onClick={() => go("safety.php")}>Safety</a>
                    <button onClick={() => go("contact.php")}>
                        Contact us <span>↗</span>
                    </button>
                </nav>
                <button className="menu" onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </header>
        </>
    );
}
function Footer() {
    const routes: Record<string, string> = {
        "About Us": "aboutus.php",
        "Completed Projects": "completed-projects.php",
        "Ongoing Projects": "ongoing-projects.php",
        Blog: "blog.php",
        Career: "career.php",
        Safety: "safety.php",
        Contact: "contact.php",
    };
    return (
        <footer>
            <div>
                <div className="brand">
                    <img src={A + "Portech 10 Year LogoA.jpg"} />
                    <b>PORTECH</b>
                </div>
                <p>Reliable Crane Solutions, Every Time</p>
                <div className="social">f&nbsp; in&nbsp; ◎&nbsp; ▶</div>
            </div>
            <div>
                <b>Office & Work</b>
                <p>
                    908, Plan S Business Park, Plot No: D 108/1, MIDC, Shirwane, Nerul,
                    Navi Mumbai, Maharashtra - 400706
                </p>
                <a href="tel:+918452067672">+91 8452067672</a>
                <a href="mailto:contact@portech.in">contact@portech.in</a>
            </div>
            <div>
                <b>Registered Office</b>
                <p>
                    B-602, Shelter Arcade, Plot No.26, Sec-42, Seawoods, Nerul (W), Navi
                    Mumbai-400 706
                </p>
                <a href="tel:+918452067672">+91 8452067672</a>
                <a href="mailto:contact@portech.in">contact@portech.in</a>
            </div>
            <div>
                <b>Explore</b>
                {Object.keys(routes).map((x) => (
                    <a key={x} onClick={() => go(routes[x])}>
                        {x}
                    </a>
                ))}
            </div>
            <small>© 2026 PORTECH. All Rights Reserved.</small>
        </footer>
    );
}
function Intro({
    kicker,
    title,
    children,
}: {
    kicker: string;
    title: string;
    children?: React.ReactNode;
}) {
    return (
        <section className="page-intro">
            <p className="eyebrow">{kicker}</p>
            <h1>{title}</h1>
            {children}
        </section>
    );
}
function CountUp({
    end,
    suffix = "",
    duration = 2000,
}: {
    end: number;
    suffix?: string;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = React.useRef<HTMLSpanElement>(null);
    React.useEffect(() => {
        let observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = performance.now();
                const step = (timestamp: number) => {
                    let progress = Math.min((timestamp - start) / duration, 1);
                    let easeOut = 1 - Math.pow(1 - progress, 3);
                    setCount(Math.floor(easeOut * end));
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                observer.disconnect();
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);
    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}
function Home() {
    return (
        <>
            <ScrollExpansionHero
                mediaSrc={A + "network-portech.mp4"}
                bgImageSrc="/images/port-crane-landing-background.png"
                title="Sustaining the future of Indian port industry"
                date="PORTECH Engineering"
                scrollToExpand="Scroll to explore"
                textBlend
            >
                <div className="crane-doctors">
                    <p>MEET THE CRANE DOCTORS</p>
                    <h2>
                        Expert diagnosing and Repairing Cranes with Precision and Care
                    </h2>
                </div>
            </ScrollExpansionHero>
            <section
                className="trust"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "35px 25px",
                }}
            >
                <div
                    className="stats"
                    style={{
                        marginTop: 0,
                        gap: "clamp(25px, 6vw, 80px)",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <span>
                        <b>
                            <CountUp end={10} suffix="+" />
                        </b>
                        Years Experience
                    </span>
                    <span>
                        <b>
                            <CountUp end={100} suffix="+" />
                        </b>
                        Projects Done
                    </span>
                    <span>
                        <b>
                            <CountUp end={358} suffix="+" />
                        </b>
                        Client Satisfaction
                    </span>
                    <span>
                        <b>
                            <CountUp end={1500} suffix="+" />
                        </b>
                        Hours of Work
                    </span>
                </div>
            </section>
            <section className="about-split">
                <img src={A + "ocean-cargo/ocean-cargo-services-bg.png"} />
                <div>
                    <p className="eyebrow">WELCOME TO PORTECH</p>
                    <h2>Engineering built around your operation.</h2>
                    <p>
                        PORTECH is a multidisciplinary company providing comprehensive
                        engineering services to the port crane industry. We're committed to
                        enhancing customer loyalty by delivering high-quality, convenient
                        solutions through a customer-centric approach. This involves
                        fostering strong relationships with clients to understand their
                        needs and develop tailored solutions to meet those requirements.
                    </p>
                    <button onClick={() => go("aboutus.php")}>Our story ↗</button>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                            gap: "15px",
                            marginTop: "35px",
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "var(--navy)",
                        }}
                    >
                        <span>✦ Quality Control System</span>
                        <span>✦ Highly Professional Staff</span>
                        <span>✦ Environmental Sensitivity</span>
                        <span>✦ 100% Satisfaction Guarantee</span>
                    </div>
                </div>
            </section>
            <section className="section-head">
                <p className="eyebrow">WHAT WE OFFER</p>
                <h2>Specialised solutions, every stage.</h2>
                <p className="mobile-swipe-indicator dark-text">Swipe to explore &rarr;</p>
            </section>
            <section className="service-grid">
                {services.map((s) => (
                    <article key={s.slug} onClick={() => go(s.slug)}>
                        <img src={A + s.image} />
                        <div>
                            <span>0{services.indexOf(s) + 1}</span>
                            <h3>{s.title}</h3>
                            <p>{s.intro}</p>
                            <a>Explore service →</a>
                        </div>
                    </article>
                ))}
            </section>
            <ProjectStrip />
            <section className="clients">
                <p >OUR CLIENTS</p>
                <h2>Trusted to deliver where it matters.</h2>
                <div className="marquee-wrapper">
                    <div className="marquee-content">
                        {Array.from({ length: 27 }, (_, i) => (
                            <img
                                key={i}
                                src={`${A}Website/Logo/Logos-${String(i + 1).padStart(2, "0")}.jpg`}
                                alt="PORTECH client"
                            />
                        ))}
                        {Array.from({ length: 27 }, (_, i) => (
                            <img
                                key={`dup-${i}`}
                                src={`${A}Website/Logo/Logos-${String(i + 1).padStart(2, "0")}.jpg`}
                                alt="PORTECH client"
                            />
                        ))}
                    </div>
                </div>
            </section>
            <section className="cta">
                <p className="eyebrow">LET'S MOVE FORWARD</p>
                <h2>Reliable Crane Solutions, Every Time</h2>
                <button onClick={() => go("contact.php")}>Connect now ↗</button>
            </section>
        </>
    );
}
function ProjectStrip() {
    return (
        <section className="projects-mini">
            <div>
                <p className="eyebrow">SELECTED WORK</p>
                <h2>Work that performs under pressure.</h2>
                <button onClick={() => go("completed-projects.php")}>
                    View all projects ↗
                </button>
                <p className="mobile-swipe-indicator">Swipe to explore &rarr;</p>
            </div>
            {completed.slice(3).map((p) => (
                <article
                    key={p[0]}
                    onClick={() => go(p[2] || "completed-projects.php")}
                    style={{
                        backgroundImage: `linear-gradient(180deg,transparent,rgba(3,20,53,.9)),url("${A + p[1]}")`,
                    }}
                >
                    <span>COMPLETED PROJECT</span>
                    <h3>{p[0]}</h3>
                </article>
            ))}
        </section>
    );
}
function About() {
    return (
        <>
            <Intro
                kicker="ABOUT PORTECH"
                title="Precision in every move. Integrity in every promise."
            />
            <section className="about-split">
                <img src={A + "portech Service image/owner image.jpg"} />
                <div>
                    <p>
                        PORTECH is a multidisciplinary company providing comprehensive
                        engineering services to the port crane industry. We're committed to
                        enhancing customer loyalty by delivering high-quality, convenient
                        solutions through a customer-centric approach.
                    </p>
                    <ul>
                        <li>
                            Itemized understanding and top to bottom information on upkeep,
                            fixing and renovation exercises.
                        </li>
                        <li>
                            Experience and comprehension of crane guidelines and particulars
                            appropriate in port industry.
                        </li>
                        <li>
                            Educated and highly experienced assets for crane support, fixing
                            and repair.
                        </li>
                    </ul>
                </div>
            </section>
            <section className="letter">
                <p className="eyebrow">FROM THE DESK OF THE FOUNDER AND CEO</p>
                <h2>Shyamal Bandyopadhyay</h2>
                <p>
                    Welcome to PORTECH Engineering Pvt. Ltd. For over a decade, PORTECH
                    Engineering has been synonymous with trust, innovation, and
                    engineering excellence. We have proudly built a reputation in the
                    field of crane erection, retrofit, dismantling, modernization,
                    inspection, and maintenance, driven by a relentless pursuit of
                    quality, safety, and integrity.
                </p>
                <p>
                    Our journey is defined by a single vision — to deliver engineering
                    solutions that inspire confidence and create lasting value. At
                    PORTECH, quality is not just an objective; it’s a commitment. Every
                    project we undertake reflects our adherence to the highest industry
                    standards, ensuring precision, reliability, and performance at every
                    stage.
                </p>
                <p>
                    As we move forward, we remain steadfast in our mission — to build with
                    integrity, innovate with purpose, and deliver with excellence.
                </p>
            </section>
            <section className="clients-grid-section">
                <h2>OUR CLIENTS</h2>
                <p className="subtitle">Trusted to deliver where it matters.</p>
                <div className="clients-grid">
                    {Array.from({ length: 27 }, (_, i) => (
                        <img
                            key={i}
                            src={`${A}Website/Logo/Logos-${String(i + 1).padStart(2, "0")}.jpg`}
                            alt="PORTECH client"
                        />
                    ))}
                </div>
            </section>
            <section className="values">
                <div>
                    <p className="eyebrow">OUR MISSION</p>
                    <h2>
                        High-quality, value-added engineering services, delivered on time.
                    </h2>
                </div>
                <div>
                    <p className="eyebrow">OUR VISION</p>
                    <p>
                        To form a WIN-WIN-WIN company to satisfy customers, employees, and
                        stakeholders by focussing and delivering exceptional client service
                        with an unrelenting focus on value creation.
                    </p>
                </div>
            </section>
        </>
    );
}
function ServicePage({ service }: { service: Service }) {
    return (
        <>
            <Intro kicker="OUR SERVICES" title={service.title}>
                <p>{service.intro}</p>
            </Intro>
            <section className="detail">
                <img src={A + service.image} />
                <div>
                    <p className="eyebrow">OVERVIEW OF SERVICES</p>
                    <p>{service.overview}</p>
                </div>
            </section>
            <section className="features">
                <p className="eyebrow">OUR APPROACH</p>
                <h2>{service.title} services</h2>
                <div>
                    {service.features.map((f, i) => (
                        <article key={f}>
                            <span>0{i + 1}</span>
                            <h3>{f}</h3>
                            <p>
                                {
                                    [
                                        "Detailed planning and skilled execution for dependable outcomes.",
                                        "High standards for quality, safety, and operational performance.",
                                        "Delivered with clarity, precision, and client requirements at the centre.",
                                    ][i]
                                }
                            </p>
                        </article>
                    ))}
                </div>
            </section>
            <section className="next">
                <p>Need a tailored solution?</p>
                <button onClick={() => go("contact.php")}>Get in touch ↗</button>
            </section>
        </>
    );
}
function Projects({ kind }: { kind: "completed" | "ongoing" }) {
    const list = kind === "completed" ? completed : ongoing;
    return (
        <>
            <Intro
                kicker="PROJECTS"
                title={kind === "completed" ? "Completed Projects" : "Ongoing Projects"}
            >
                <p>
                    A focused record of crane engineering, modernization, erection and
                    port equipment work.
                </p>
            </Intro>
            <section className="project-grid">
                {list.map((p) => (
                    <article key={p[0]} onClick={() => go(p[2] || "contact.php")}>
                        <img src={A + p[1]} />
                        <div>
                            <span>{kind === "completed" ? "COMPLETED" : "ONGOING"}</span>
                            <h3>{p[0]}</h3>
                            <a>View project →</a>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
}
function ProjectDetail({ slug }: { slug: string }) {
    const map: any = {
        "movement-and-erection-of-3-RMG-cranes-at-DPW-mumbai-NSICT.php": {
            title: "Movement and Erection of 3 RMG Cranes at DPW Mumbai (NSICT)",
            client: "Konecranes Finland",
            project:
                "Unloading, Shifting, Erection and Re-shifting of 3 Nos. RMG Cranes",
            image:
                "project/1/Movement-and-Erection-of-3-RMG-Cranes-at-DPW-Mumbai-NSICT-1.jpg",
            challenge:
                "PORTECH was entrusted with executing the complete unloading, erection, and re-shifting of three 350-ton Rail Mounted Gantry (RMG) Cranes within the confined spaces of DPW Mumbai (NSICT).",
            solution:
                "Each 350T RMG Crane was safely moved from the erection yard to the operational site using a Self-Propelled Modular Transporter (SPMT), ensuring controlled movement and structural integrity across a 200-meter path.",
        },
        "dismantling-shifting-hybridization-of-2-RTG-cranes-at-GTI-and-HTPL.php": {
            title:
                "Dismantling, Shifting & Hybridization of 2 RTG Cranes at GTI & HTPL",
            client: "Fuji Electric India",
            project:
                "Dismantling, Shifting, Retrofit, Re-erection & Hybridization of 2 Nos. RTG Cranes",
            image:
                "project/2/Dismantling, Shifting & Hybridization of 2 RTG Cranes at GTI & HTPL.jpg",
            challenge:
                "The project demanded precise dismantling and movement of two 250-ton Rubber Tyred Gantry (RTG) Cranes while facing logistical and regulatory hurdles.",
            solution:
                "Dismantled RTG structures were moved from JNPT port to HTPL CFS, Panvel, using multi-axle heavy lift trailers. Post-transport, the cranes were retrofitted and re-erected at the new location with full technical compliance and functional upgrades.",
        },
        "erection-and-commissioning-of-neuero-M400-ship-unloader-at-kakinada-port.php":
        {
            title:
                "Erection & Commissioning of 1 No. Neuero M400 Ship Unloader Crane, Kakinada Port, Andhra Pradesh, India",
            client: "Water Services Infrastructure Pvt. Ltd. (WSIL)",
            project:
                "Erection & Commissioning of 1 No. Neuero M400 Ship Unloader Crane",
            image:
                "project/3/Erection & Commissioning of Neuero M400 Ship Unloader at Kakinada Port.jpg",
            challenge:
                "The project involved the high-stakes erection of a 40-ton electrical room at a height of 20 meters, using a hinged locking mechanism for structural integration.",
            solution:
                "A heavy-duty 300-ton mobile crane was mobilized to lift and position the 40T electrical room accurately at the 20-meter elevation. Specialized rigging arrangements and custom locking mechanisms ensured exact alignment and secure placement.",
        },
    };
    const p = map[slug];
    return (
        <>
            <Intro kicker="PROJECT DETAILS" title={p.title} />
            <section className="detail project-detail">
                <img src={A + p.image} />
                <div>
                    <p>
                        <b>Client Name:</b> {p.client}
                    </p>
                    <p>
                        <b>Project:</b> {p.project}
                    </p>
                    <p>
                        <b>Timeline:</b> Delivered within the scheduled timeframe
                    </p>
                    <h3>Project Challenge</h3>
                    <p>{p.challenge}</p>
                    <h3>Solution Delivered</h3>
                    <p>{p.solution}</p>
                    <p>
                        <b>
                            Project delivered on schedule · High safety and quality standards
                            · Precision workmanship
                        </b>
                    </p>
                </div>
            </section>
        </>
    );
}
function Blog() {
    return (
        <>
            <Intro kicker="INSIGHTS" title="Ideas from the engineering frontline." />
            <section className="blog-grid">
                {blogTitles.map((b, i) => (
                    <article key={b} onClick={() => go(articleSlugs[i] || "blog.php")}>
                        <span>JULY {String(8 - i).padStart(2, "0")}, 2026</span>
                        <h3>{b}</h3>
                        <p>
                            {
                                [
                                    "If you have ever stood next to an EOT crane mid-lift and watched it stall, jerk, or throw a fault code out of nowhere, chances are the problem was the control panel.",
                                    "At PORTECH, we have spent years inside the machinery of ports. We commission and maintain the cranes that move the world’s cargo.",
                                    "Walk through any major bulk terminal in India, and you’ll notice something throughput numbers don’t always capture: equipment reliability.",
                                ][i % 3]
                            }
                        </p>
                        <a>Read article →</a>
                    </article>
                ))}
            </section>
            <section className="all-links">
                <p className="eyebrow">MORE FROM PORTECH</p>
                <h2>Complete insight library</h2>
                <div>
                    {articleSlugs.slice(10).map((s) => (
                        <a key={s} onClick={() => go(s)}>
                            {s.replace(".php", "").replaceAll("-", " ")} <span>↗</span>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}
function Article({ slug }: { slug: string }) {
    const title = slug
        .replace(".php", "")
        .replaceAll("-", " ")
        .replace(/\b\w/g, (m: string) => m.toUpperCase());
    return (
        <>
            <Intro kicker="PORTECH INSIGHTS" title={title} />
            <article className="article">
                <p>
                    PORTECH shares expertise from the field to help ports, terminals and
                    industrial operators make informed decisions around crane reliability,
                    safety, modernization and lifecycle performance.
                </p>
                <p>
                    Our engineers understand that every operation has unique requirements.
                    The practical experience behind our engineering services informs the
                    way we approach planning, inspection, maintenance and delivery.
                </p>
                <button onClick={() => go("contact.php")}>
                    Discuss your requirements ↗
                </button>
            </article>
        </>
    );
}
function Contact() {
    const [sent, setSent] = useState(false);
    return (
        <>
            <Intro kicker="CONTACT" title="Connect with us">
                <p>
                    We’re here to help you bring your vision to life. Reach out to us to
                    discuss your design needs, and let PORTECH provide tailored solutions
                    that meet your requirements. Together, we’ll turn your ideas into
                    reality.
                </p>
            </Intro>
            <section className="contact">
                <div>
                    <p className="eyebrow">OFFICE & WORK</p>
                    <h3>Let’s solve the next move.</h3>
                    <p>
                        908, Plan S Business Park, Plot No: D 108/1, MIDC, Shirwane, Nerul,
                        Navi Mumbai, Maharashtra - 400706
                    </p>
                    <a href="tel:+918452067672">+91 8452067672</a>
                    <a href="mailto:contact@portech.in">contact@portech.in</a>
                    <p className="eyebrow top">REGISTERED OFFICE</p>
                    <p>
                        B-602, Shelter Arcade, Plot No.26, Sec-42, Seawoods, Nerul (W), Navi
                        Mumbai-400 706
                    </p>
                </div>
                {sent ? (
                    <div className="success-message" style={{ padding: '40px', background: 'var(--pale, #eef6ff)', borderRadius: '12px', textAlign: 'center', margin: 'auto 0' }}>
                        <h3 style={{ color: 'var(--navy, #061e45)', marginBottom: '8px', fontSize: '24px' }}>Thank you!</h3>
                        <p style={{ color: 'var(--grey, #667085)', margin: '0' }}>Your message has been successfully recorded. We will be in touch shortly.</p>
                    </div>
                ) : (
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const data = {
                                name: formData.get('name'),
                                phone: formData.get('phone'),
                                email: formData.get('email'),
                                message: formData.get('message')
                            };
                            const { error } = await supabase.from('contact_submissions').insert([data]);
                            if (error) {
                                alert("There was an error submitting your message. Please try again.");
                                console.error(error);
                            } else {
                                setSent(true);
                            }
                        }}
                    >
                        <label>
                            Name
                            <input name="name" required placeholder="Your name" />
                        </label>
                        <label>
                            Phone
                            <input name="phone" required placeholder="Your phone number" />
                        </label>
                        <label>
                            E-mail
                            <input name="email" required type="email" placeholder="you@company.com" />
                        </label>
                        <label>
                            Message
                            <textarea name="message" required placeholder="Tell us about your requirement" />
                        </label>
                        <button type="submit">Submit enquiry ↗</button>
                    </form>
                )}
            </section>
        </>
    );
}
function Career() {
    const [sent, setSent] = useState(false);
    const OPEN_POSITIONS = [
        "Service Engineer — Crane & Port Equipment",
        "Site Supervisor — Erection & Commissioning",
        "Electrical Technician — Control Panels",
    ];

    return (
        <>
            <Intro kicker="CAREERS" title="Build what keeps industry moving.">
                <p>
                    Join a team that works with precision, ownership and care across
                    India’s port crane industry.
                </p>
            </Intro>
            <section className="positions">
                <p className="eyebrow">OPEN POSITIONS</p>
                <h2>Come build with us.</h2>
                {OPEN_POSITIONS.map((x, i) => (
                    <article key={x}>
                        <span>0{i + 1}</span>
                        <div>
                            <h3>{x}</h3>
                            <p>Navi Mumbai · Full time</p>
                        </div>
                        <a href="#apply">Apply now ↗</a>
                    </article>
                ))}
            </section>
            <section className="apply" id="apply">
                <p className="eyebrow">APPLY TO PORTECH</p>
                <h2>Bring your experience to the table.</h2>
                {sent ? (
                    <p className="success">
                        Thank you — we’ll review your application and be in touch.
                    </p>
                ) : (
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const data: any = {
                                name: String(formData.get('name') || ''),
                                email: String(formData.get('email') || ''),
                                phone: String(formData.get('phone') || ''),
                                role: String(formData.get('role') || ''),
                                experience: String(formData.get('experience') || '')
                            };
                            
                            try {
                                const fileInput = (e.currentTarget as any).querySelector('input[type="file"]');
                                if (fileInput && fileInput.files.length > 0) {
                                    const file = fileInput.files[0];
                                    const fileExt = file.name.split('.').pop();
                                    const fileName = `${Date.now()}-${Math.round(Math.random()*1000)}.${fileExt}`;
                                    const { data: uploadData, error: uploadError } = await supabase.storage.from('resumes').upload(fileName, file);
                                    
                                    if (uploadError) {
                                        alert(`Resume Upload Error: ${uploadError.message}\n\nPlease make sure you created a storage bucket named "resumes" and set it to Public.`);
                                        return;
                                    }

                                    if (uploadData) {
                                        const { data: publicUrlData } = supabase.storage.from('resumes').getPublicUrl(fileName);
                                        data.resume_url = publicUrlData.publicUrl;
                                    }
                                }

                                const { error } = await supabase.from('career_applications').insert([data]);
                                if (error) {
                                    alert(`Database Error: ${error.message}\n\nPlease make sure you ran the SQL script to create the career_applications table and its RLS policies!`);
                                    console.error('Supabase Error:', error);
                                } else {
                                    setSent(true);
                                }
                            } catch (err: any) {
                                alert(`Unexpected Error: ${err.message || err}`);
                                console.error('Unexpected Error:', err);
                            }
                        }}
                    >
                        <input name="name" required placeholder="Full name" />
                        <input name="email" required type="email" placeholder="Email address" />
                        <input name="phone" placeholder="Phone number" />
                        <select name="role" required defaultValue="" aria-label="Position of interest">
                            <option value="" disabled>Position of interest</option>
                            {OPEN_POSITIONS.map(x => (
                                <option key={x} value={x}>{x}</option>
                            ))}
                        </select>
                        <textarea
                            name="experience"
                            required
                            placeholder="Tell us briefly about your experience"
                        />
                        <label className="file">
                            Attach résumé <input name="resume" type="file" accept=".pdf,.doc,.docx" />
                        </label>
                        <button type="submit">Send application ↗</button>
                    </form>
                )}
            </section>
        </>
    );
}
function Safety() {
    return (
        <>
            <Intro kicker="SAFETY" title="Operational & Professional Safety">
                <p>
                    At PORTECH Engineering Pvt. Ltd., we understand the critical
                    importance of safety, both in port crane operations and within our
                    professional workplace environment.
                </p>
            </Intro>
            <section className="technical-safety">
                <div className="side-header">
                    <h2>What are the safety precautions during port crane operation?</h2>
                    <p className="intro-text">
                        Ports are high-activity zones where massive machinery, heavy cargo,
                        and skilled manpower work together around the clock. Among all port
                        equipment, cranes play a critical role in loading and unloading
                        containers, bulk cargo, and heavy materials. However, improper crane
                        operation can lead to severe accidents, equipment damage, operational
                        delays, and even loss of life. Implementing strict safety precautions
                        during port crane operations is essential for ensuring smooth,
                        efficient, and accident-free port activities.
                    </p>
                    <p className="mobile-swipe-indicator dark-text">Swipe to explore &rarr;</p>
                </div>
                <div className="tech-points">
                    <div>
                        <h3>1. Proper Operator Training and Certification</h3>
                        <p>
                            One of the most important safety measures is ensuring that crane
                            operators are properly trained and certified. Port cranes require
                            advanced handling skills due to factors such as wind loads, heavy
                            weights, and limited maneuvering space.
                            <br />
                            <br />
                            <b>Operators should:</b>
                            <br />• Undergo regular training programs
                            <br />• Be familiar with crane controls and emergency procedures
                            <br />• Understand load charts and operational limits
                            <br />
                            <br />
                            Untrained operators significantly increase the risk of accidents,
                            making certification a non-negotiable requirement.
                        </p>
                    </div>
                    <div>
                        <h3>2. Regular Inspection and Preventive Maintenance</h3>
                        <p>
                            Routine inspection and maintenance of port cranes are critical for
                            safety. Cranes operate under continuous stress and exposure to
                            harsh marine environments, which can cause corrosion, fatigue, and
                            mechanical failure.
                            <br />
                            <br />
                            <b>Key inspection areas include:</b>
                            <br />• Wire ropes and lifting hooks
                            <br />• Brakes and hydraulic systems
                            <br />• Structural components and welds
                            <br />• Electrical systems and sensors
                            <br />
                            <br />
                            Preventive maintenance helps detect issues early, reduces
                            downtime, and ensures compliance with international safety
                            standards.
                        </p>
                    </div>
                    <div>
                        <h3>3. Load Management and Weight Limits</h3>
                        <p>
                            Overloading is one of the leading causes of crane failures at
                            ports. Each crane is designed with specific load-handling
                            capacities that must never be exceeded.
                            <br />
                            <br />
                            <b>Safety practices include:</b>
                            <br />• Verifying cargo weight before lifting
                            <br />• Using calibrated load indicators
                            <br />• Ensuring even load distribution
                            <br />
                            <br />
                            Strict adherence to load limits prevents structural stress, crane
                            collapse, and cargo damage.
                        </p>
                    </div>
                    <div>
                        <h3>4. Clear Communication and Signaling</h3>
                        <p>
                            Effective communication between crane operators, signalmen, and
                            ground staff is essential. Miscommunication can lead to unexpected
                            movements, collisions, or dropped loads.
                            <br />
                            <br />
                            <b>Best practices include:</b>
                            <br />• Using standardized hand signals
                            <br />• Employing radio communication systems
                            <br />• Assigning a dedicated signal person
                            <br />
                            <br />
                            Clear communication ensures coordinated operations and minimizes
                            human error.
                        </p>
                    </div>
                    <div>
                        <h3>5. Safe Working Environment and Restricted Zones</h3>
                        <p>
                            Port crane operations should be conducted within clearly defined
                            safety zones. Unauthorized personnel should never be allowed near
                            active crane areas.
                            <br />
                            <br />
                            <b>Safety measures include:</b>
                            <br />• Barricading crane operating zones
                            <br />• Displaying warning signs and indicators
                            <br />• Enforcing the use of PPE (helmets, gloves, reflective
                            vests, safety shoes)
                            <br />
                            <br />
                            Maintaining a controlled work environment significantly reduces
                            the risk of injuries.
                        </p>
                    </div>
                    <div>
                        <h3>6. Weather and Environmental Monitoring</h3>
                        <p>
                            Weather conditions play a crucial role in port crane safety. High
                            winds, heavy rain, fog, or storms can make crane operations
                            extremely dangerous.
                            <br />
                            <br />
                            <b>Ports should:</b>
                            <br />• Monitor wind speed using anemometers
                            <br />• Suspend crane operations during extreme weather
                            <br />• Follow defined wind speed operational limits
                            <br />
                            <br />
                            Weather-related precautions help prevent crane instability and
                            load swinging.
                        </p>
                    </div>
                    <div>
                        <h3>7. Emergency Preparedness and Safety Protocols</h3>
                        <p>
                            Despite all precautions, emergencies can still occur. Ports must
                            have well-defined emergency response plans.
                            <br />
                            <br />
                            <b>Key elements include:</b>
                            <br />• Emergency stop systems
                            <br />• Fire safety equipment
                            <br />• Evacuation procedures
                            <br />• Regular safety drills
                            <br />
                            <br />
                            Prepared teams can respond quickly, minimizing damage and
                            protecting lives.
                        </p>
                    </div>
                    <div>
                        <h3>8. Use of Advanced Safety Technologies</h3>
                        <p>
                            Modern ports increasingly rely on technology to enhance crane
                            safety. Advanced systems improve visibility, control, and
                            predictive maintenance.
                            <br />
                            <br />
                            <b>Examples include:</b>
                            <br />• Anti-collision systems
                            <br />• Load monitoring sensors
                            <br />• CCTV and remote monitoring
                            <br />• Automation and condition-based maintenance tools
                            <br />
                            <br />
                            Technology-driven safety solutions significantly reduce human
                            error and operational risks.
                        </p>
                    </div>
                </div>
                <div className="conclusion">
                    <h3>Conclusion</h3>
                    <p>
                        Safety during port crane operations is not optional—it is essential
                        for operational efficiency, workforce protection, and long-term
                        equipment reliability. By investing in trained operators, regular
                        maintenance, strict load management, effective communication, and
                        modern safety technologies, ports can prevent accidents and maintain
                        uninterrupted operations.
                    </p>
                </div>
            </section>
            <section className="posh-section">
                <div className="posh-header">
                    <p className="eyebrow">PROFESSIONAL SAFETY</p>
                    <h2>Prevention of Sexual Harassment (POSH)</h2>
                    <p>
                        At PORTECH, we are committed to fostering a safe, respectful, and
                        inclusive workplace for all women employees. Professional safety is
                        just as critical as technical safety.
                    </p>
                </div>
                <blockquote className="posh-quote">"ZERO tolerance for Violation of POSH"</blockquote>
                <div className="posh-content">
                    <div>
                        <span>✦</span>
                        <h3>Internal Complaints Committee (ICC)</h3>
                        <p>
                            A dedicated, senior-led committee ensures every concern is heard
                            confidentially and impartially, adhering strictly to the POSH Act
                            guidelines.
                        </p>
                    </div>
                    <div>
                        <span>✦</span>
                        <h3>Safe & Inclusive Environment</h3>
                        <p>
                            We actively design policies and workflows that prioritize the
                            physical, emotional, and professional safety of women across all
                            our operational sites and offices.
                        </p>
                    </div>
                    <div>
                        <span>✦</span>
                        <h3>Confidential Redressal</h3>
                        <p>
                            We guarantee a transparent, time-bound, and completely
                            confidential grievance mechanism, protecting identities and
                            ensuring zero retaliation.
                        </p>
                    </div>
                    <div>
                        <span>✦</span>
                        <h3>Continuous Awareness</h3>
                        <p>
                            Regular workshops, training sessions, and open forums keep our
                            workforce educated, accountable, and aligned with our strict
                            anti-harassment standards.
                        </p>
                    </div>
                </div>
                <div className="posh-guidelines">
                    <h3>Recognizing Harassment</h3>
                    <ul>
                        <li>
                            <b>Physical:</b> Unwelcome touching, cornering, or physical/sexual
                            assault.
                        </li>
                        <li>
                            <b>Verbal:</b> Sexual innuendos, unwelcome flirtation, offensive
                            jokes, or invasive personal questions.
                        </li>
                        <li>
                            <b>Visual:</b> Suggestive gestures, leering, or circulating
                            explicit materials.
                        </li>
                        <li>
                            <b>Digital:</b> Sending explicit messages or sharing inappropriate
                            media across digital channels.
                        </li>
                        <li>
                            <b>Power Abuse:</b> Demanding sexual favors for employment
                            benefits, creating a hostile environment, or retaliation.
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}
function Gallery() {
    return (
        <>
            <Intro kicker="GALLERY" title="The work, up close." />
            <section className="project-grid">
                {completed.map((p) => (
                    <article key={p[0]}>
                        <img src={A + p[1]} />
                        <div>
                            <span>PORTECH PROJECT</span>
                            <h3>{p[0]}</h3>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
}
function App() {
    const [, setTick] = useState(0);
    React.useEffect(() => {
        const f = () => setTick((x) => x + 1);
        addEventListener("popstate", f);
        return () => removeEventListener("popstate", f);
    }, []);
    const p = decodeURIComponent(
        location.pathname.split("/").pop() || "index.php",
    );
    let body: React.ReactNode;
    if (p === "index.php" || p === "") body = <Home />;
    else if (p === "aboutus.php") body = <About />;
    else if (p === "contact.php") body = <Contact />;
    else if (p === "career.php") body = <Career />;
    else if (p === "safety.php") body = <Safety />;
    else if (p === "gallery.php") body = <Gallery />;
    else if (p === "completed-projects.php" || p === "ongoing-projects.php")
        body = (
            <Projects kind={p.startsWith("completed") ? "completed" : "ongoing"} />
        );
    else if (p === "blog.php") body = <Blog />;
    else if (p === "admin") return <AdminPortal />;
    else if (services.find((s) => s.slug === p))
        body = <ServicePage service={services.find((s) => s.slug === p)!} />;
    else if (
        [
            "movement-and-erection-of-3-RMG-cranes-at-DPW-mumbai-NSICT.php",
            "dismantling-shifting-hybridization-of-2-RTG-cranes-at-GTI-and-HTPL.php",
            "erection-and-commissioning-of-neuero-M400-ship-unloader-at-kakinada-port.php",
        ].includes(p)
    )
        body = <ProjectDetail slug={p} />;
    else body = <Article slug={p} />;
    return (
        <>
            <Header current={p} />
            <main>{body}</main>
            <Footer />
        </>
    );
}
createRoot(document.getElementById("root")!).render(<App />);

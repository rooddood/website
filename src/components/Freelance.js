import React from 'react';
import './Freelance.css';

const Freelance = () => {
    return (
        <div className="freelance-container">
            <header className="freelance-header">
                <h1>Kyle Rood: Freelance Development Services</h1>
                <p>Your go-to developer for scalable websites, portfolios, and data-driven tools.</p>
            </header>

            <section className="freelance-about">
                <h2>About Me</h2>
                <p>With a Master’s in Computer Science and years of experience as a lead developer and engineering manager, I specialize in creating scalable websites, portfolios, and data-driven tools for businesses and individuals. My technical expertise includes Python, React, AWS, and advanced AI/ML applications, allowing me to deliver tailored solutions that meet both technical and business goals.</p>
            </section>

            <section className="freelance-services">
                <h2>Services Offered</h2>
                <ul>
                    <li><strong>Custom Website Design & Development</strong>
                        <ul>
                            <li>Personal portfolios</li>
                            <li>Small business websites</li>
                            <li>Site updates or redesigns</li>
                            <li>E-commerce platforms</li>
                        </ul>
                    </li>
                    <li><strong>Data-Driven Tools</strong>
                        <ul>
                            <li>Interactive dashboards</li>
                            <li>AI/ML-powered tools (e.g., NLP or computer vision applications)</li>
                            <li>Integration with APIs and large-scale data solutions</li>
                        </ul>
                    </li>
                    <li><strong>Consultation & Optimization</strong>
                        <ul>
                            <li>Website performance improvements</li>
                            <li>Codebase audits</li>
                            <li>Recommendations for modernizing existing systems</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section className="freelance-pricing">
                <h2>Pricing Models</h2>
                <ul>
                    <li><strong>Hourly Rate:</strong> $100/hour - Ideal for ongoing consultation, debugging, or smaller, incremental improvements.</li>
                    <li><strong>Project-Based Pricing:</strong>
                        <ul>
                            <li><strong>Starter Portfolio/Website:</strong> $1000 plus $100/hr worked</li>
                            <li><strong>Business Website:</strong> $2000 plus $100/hr worked</li>
                            <li><strong>Advanced Tools or Applications:</strong> Custom pricing based on scope and complexity</li>
                        </ul>
                    </li>
                </ul>
                <p>Pricing includes development, testing, and delivery of clean, maintainable code. Post-launch support is available for an additional fee.</p>
            </section>

            <section className="freelance-why">
                <h2>Why Choose Me?</h2>
                <ul>
                    <li><strong>Experienced Leader:</strong> Proven track record of delivering end-to-end projects, from idea to scalable product.</li>
                    <li><strong>Client-Centric:</strong> I collaborate closely to ensure your vision is achieved.</li>
                    <li><strong>Cutting-Edge Expertise:</strong> Skilled in modern technologies, with a focus on innovation and performance.</li>
                </ul>
            </section>

            <footer className="freelance-footer">
                <p>Ready to get started? Contact me today to bring your ideas to life!</p>
            </footer>
        </div>
    );
};

export default Freelance;

/*
 *   Crafted On Sat Jan 31 2026
 *   From his finger tips, through his IDE to your deployment environment at full throttle with no bugs, loss of data,
 *   fluctuations, signal interference, or doubt—it can only be
 *   the legendary coding wizard, Martin Mbithi (martin@devlan.co.ke, www.martmbithi.github.io)
 *   
 *   www.devlan.co.ke
 *   hello@devlan.co.ke
 *
 *
 *   The Devlan Solutions LTD Super Duper User License Agreement
 *   Copyright (c) 2022 Devlan Solutions LTD
 *
 *
 *   1. LICENSE TO BE AWESOME
 *   Congrats, you lucky human! Devlan Solutions LTD hereby bestows upon you the magical,
 *   revocable, personal, non-exclusive, and totally non-transferable right to install this epic system
 *   on not one, but TWO separate computers for your personal, non-commercial shenanigans.
 *   Unless, of course, you've leveled up with a commercial license from Devlan Solutions LTD.
 *   Sharing this software with others or letting them even peek at it? Nope, that's a big no-no.
 *   And don't even think about putting this on a network or letting a crowd join the fun unless you
 *   first scored a multi-user license from us. Sharing is caring, but rules are rules!
 *
 *   2. COPYRIGHT POWER-UP
 *   This Software is the prized possession of Devlan Solutions LTD and is shielded by copyright law
 *   and the forces of international copyright treaties. You better not try to hide or mess with
 *   any of our awesome proprietary notices, labels, or marks. Respect the swag!
 *
 *
 *   3. RESTRICTIONS, NO CHEAT CODES ALLOWED
 *   You may not, and you shall not let anyone else:
 *   (a) reverse engineer, decompile, decode, decrypt, disassemble, or do any sneaky stuff to
 *   figure out the source code of this software;
 *   (b) modify, remix, distribute, or create your own funky version of this masterpiece;
 *   (c) copy (except for that one precious backup), distribute, show off in public, transmit, sell, rent,
 *   lease, or otherwise exploit the Software like it's your own.
 *
 *
 *   4. THE ENDGAME
 *   This License lasts until one of us says 'Game Over'. You can call it quits anytime by
 *   destroying the Software and all the copies you made (no hiding them under your bed).
 *   If you break any of these sacred rules, this License self-destructs, and you must obliterate
 *   every copy of the Software, no questions asked.
 *
 *
 *   5. NO GUARANTEES, JUST PIXELS
 *   DEVLAN SOLUTIONS LTD doesn’t guarantee this Software is flawless—it might have a few
 *   quirks, but who doesn’t? DEVLAN SOLUTIONS LTD washes its hands of any other warranties,
 *   implied or otherwise. That means no promises of perfect performance, marketability, or
 *   non-infringement. Some places have different rules, so you might have extra rights, but don’t
 *   count on us for backup if things go sideways. Use at your own risk, brave adventurer!
 *
 *
 *   6. SEVERABILITY—KEEP THE GOOD STUFF
 *   If any part of this License gets tossed out by a judge, don’t worry—the rest of the agreement
 *   still stands like a boss. Just because one piece fails doesn’t mean the whole thing crumbles.
 *
 *
 *   7. NO DAMAGE, NO DRAMA
 *   Under no circumstances will Devlan Solutions LTD or its squad be held responsible for any wild,
 *   indirect, or accidental chaos that might come from using this software—even if we warned you!
 *   And if you ever think you’ve got a claim, the most you’re getting out of us is the license fee you
 *   paid—if any. No drama, no big payouts, just pixels and code.
 *
 */

'use client';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      {/* ================== NAVIGATION ================== */}
      <Nav />

      {/* ================== BEGIN #home ================== */}
      <div
        id="home"
        className="py-5 position-relative bg-body bg-opacity-50"
        data-bs-theme="dark"
      >
        <div className="container-xxl p-3 p-lg-5">
          <div className="row align-items-center">

            {/* LEFT: CORE STATEMENT */}
            <div className="col-lg-6">
              <h1 className="display-6 fw-600 mb-3 mt-4">
                Digital Forensics &<br />
                Incident Response<br />
                <span className="text-theme">Powered by AI</span>
              </h1>

              <p className="fs-18px text-body text-opacity-75 mb-4">
                DFIR-AI is a self-hosted, open-source Digital Forensics and Incident
                Response platform built to support security analysts, incident
                responders, and investigators conducting evidence-driven
                investigations in enterprise and regulated environments.
              </p>

              <p className="text-body text-opacity-75">
                The platform augments established DFIR methodologies with
                AI-assisted correlation, timeline reconstruction, and report
                generation while preserving forensic integrity, analyst control,
                and evidentiary admissibility. DFIR-AI does not transmit data
                externally and operates entirely within the user’s infrastructure,
                requiring only user-supplied OpenAI API keys.
              </p>

              <div className="mt-4 mb-4">
                <a href="/docs" className="btn btn-lg btn-outline-theme me-2">
                  Documentation <i className="fa fa-arrow-right ms-2 opacity-5"></i>
                </a>

                <a href="/self-hosted" className="btn btn-lg btn-outline-white">
                  Self-Hosted Deployment
                </a>
              </div>

             
            </div>

            {/* RIGHT: VISUAL CONTEXT */}
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="/assets/img/landing/mockup-1.jpg"
                alt="DFIR-AI Investigation Console"
                className="w-100 shadow-lg"
              />
            </div>

          </div>
        </div>
      </div>
      {/* ================== END #home ================== */}

      {/* ================== BEGIN #about ================== */}
      <div id="about" className="py-5 bg-component">
        <div className="container-xxl p-3 p-lg-5">

          <div className="text-center mb-5">
            <h1 className="mb-3">Purpose & Design Philosophy</h1>
            <p className="fs-16px text-body text-opacity-50">
              DFIR-AI was designed to address limitations in modern incident
              response tooling: fragmented workflows, excessive manual effort,
              and opaque vendor-controlled platforms.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <h4>Forensic Soundness</h4>
              <p>
                Every artifact processed by DFIR-AI is cryptographically hashed,
                time-aligned, and traceable throughout its lifecycle. The system
                enforces handling practices consistent with court-admissible and
                regulator-ready investigations.
              </p>
            </div>

            <div className="col-lg-4">
              <h4>Analyst-Centric AI</h4>
              <p>
                AI within DFIR-AI operates strictly as an analytical assistant.
                It accelerates correlation, summarization, and hypothesis
                generation while leaving interpretation and final judgement
                entirely to the investigator.
              </p>
            </div>

            <div className="col-lg-4">
              <h4>Open & Self-Hosted</h4>
              <p>
                DFIR-AI is fully self-hosted and open-source. There is no telemetry,
                no data exfiltration, and no vendor lock-in. Organizations retain
                full visibility and control over their investigative workflows.
              </p>
            </div>
          </div>

        </div>
      </div>
      {/* ================== END #about ================== */}

      {/* ================== BEGIN #features ================== */}
      <div id="features" className="py-5">
        <div className="container-xxl p-3 p-lg-5">

          <div className="text-center mb-5">
            <h1 className="mb-3">Core Capabilities</h1>
            <p className="fs-16px text-body text-opacity-50">
              DFIR-AI provides an integrated environment supporting the full
              digital investigation lifecycle.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-lg-3">
              <div className="card p-4 h-100">
                <h5>Case Management</h5>
                <p>
                  Structured case workflows with analyst notes, task tracking,
                  evidence references, and immutable audit logs.
                </p>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card p-4 h-100">
                <h5>Timeline Reconstruction</h5>
                <p>
                  Multi-source forensic timelines across endpoints, logs,
                  memory artifacts, and network activity.
                </p>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card p-4 h-100">
                <h5>Evidence Vault</h5>
                <p>
                  Centralized evidence storage with cryptographic integrity
                  verification and chain-of-custody tracking.
                </p>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card p-4 h-100">
                <h5>Automated Reporting</h5>
                <p>
                  Generation of technical, executive, and legal-ready reports
                  directly from validated investigation data.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* ================== END #features ================== */}

      {/* ================== FOOTER ================== */}
      <Footer />
    </>
  );
}

'use client';

import Link from 'next/link';

export default function Nav() {
  return (
    <div id="header" className="app-header navbar navbar-expand-lg p-0">
      <div className="container-xxl px-3 px-lg-5">

        {/* BEGIN hamburger (HUD native) */}
        <button
          className="navbar-toggler border-0 p-0 me-3 fs-24px shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="h-2px w-25px bg-gray-500 d-block mb-1"></span>
          <span className="h-2px w-25px bg-gray-500 d-block"></span>
        </button>
        {/* END hamburger */}

        {/* BEGIN brand */}
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center position-relative me-auto brand px-0 w-auto"
        >
          <span className="brand-logo d-flex">
            <span className="brand-img">
              <span className="brand-img-text text-theme">D</span>
            </span>
            <span className="brand-text">DFIR-AI</span>
          </span>
        </Link>
        {/* END brand */}

        {/* BEGIN collapsible menu */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase small fw-semibold">

            <div className="nav-item me-2">
              <Link href="/" className="nav-link link-body-emphasis">
                Home
              </Link>
            </div>

            <div className="nav-item me-2">
              <Link href="/platform" className="nav-link link-body-emphasis">
                Platform
              </Link>
            </div>

            <div className="nav-item me-2">
              <Link href="/use-cases" className="nav-link link-body-emphasis">
                Use Cases
              </Link>
            </div>

            <div className="nav-item me-2">
              <Link href="/research" className="nav-link link-body-emphasis">
                Research
              </Link>
            </div>

            <div className="nav-item me-2">
              <Link href="/compliance" className="nav-link link-body-emphasis">
                Compliance
              </Link>
            </div>

            <div className="nav-item me-2">
              <Link href="/self-hosted" className="nav-link link-body-emphasis">
                Self-Hosted
              </Link>
            </div>

            <div className="nav-item me-2">
              <Link href="/docs" className="nav-link link-body-emphasis">
                Docs
              </Link>
            </div>

            <div className="nav-item me-2">
              <Link href="/login" className="nav-link link-body-emphasis">
                Analyst Login
              </Link>
            </div>

          </div>
        </div>
        {/* END collapsible menu */}

        {/* BEGIN right action (open-source friendly) */}
        <div className="ms-3">
          <Link
            href="/get-started"
            className="btn btn-outline-theme btn-sm fw-semibold text-uppercase px-2 py-1 fs-10px text-nowrap"
          >
            Get Started
            <i className="fa fa-arrow-right ms-1"></i>
          </Link>
        </div>
        {/* END right action */}

      </div>
    </div>
  );
}

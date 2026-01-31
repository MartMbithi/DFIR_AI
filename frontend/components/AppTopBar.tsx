/*
 *   Crafted On Fri Jan 30 2026
 *   Devlan Solutions LTD — DFIR-AI
 */

'use client';

export default function AppTopBar() {
    return (
        <>
            {/* BEGIN #header */}
            <div id="header" className="app-header">

                {/* Desktop toggler */}
                <div className="desktop-toggler">
                    <button
                        type="button"
                        className="menu-toggler"
                        data-toggle-class="app-sidebar-collapsed"
                        data-dismiss-class="app-sidebar-toggled"
                        data-toggle-target=".app"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>

                {/* Mobile toggler */}
                <div className="mobile-toggler">
                    <button
                        type="button"
                        className="menu-toggler"
                        data-toggle-class="app-sidebar-mobile-toggled"
                        data-toggle-target=".app"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>

                {/* Brand */}
                <div className="brand">
                    <a href="/app" className="brand-logo">
                        <span className="brand-img">
                            <span className="brand-img-text text-theme">D</span>
                        </span>
                        <span className="brand-text">DFIR-AI</span>
                    </a>
                </div>

                {/* Menu */}
                <div className="menu">

                    {/* Search */}
                    <div className="menu-item">
                        <a
                            href="#"
                            className="menu-link"
                            data-toggle-class="app-header-menu-search-toggled"
                            data-toggle-target=".app"
                        >
                            <div className="menu-icon">
                                <i className="bi bi-search nav-icon"></i>
                            </div>
                        </a>
                    </div>

                    {/* Notifications */}
                    <div className="menu-item dropdown dropdown-mobile-full">
                        <a
                            href="#"
                            data-bs-toggle="dropdown"
                            data-bs-display="static"
                            className="menu-link"
                        >
                            <div className="menu-icon">
                                <i className="bi bi-bell nav-icon"></i>
                            </div>
                            <div className="menu-badge bg-theme"></div>
                        </a>

                        <div className="dropdown-menu dropdown-menu-end mt-1 w-300px fs-11px">
                            <h6 className="dropdown-header fs-10px">SYSTEM EVENTS</h6>
                            <div className="dropdown-divider"></div>

                            <div className="px-3 py-2 text-body text-opacity-75 small">
                                Real-time DFIR activity will appear here
                            </div>
                        </div>
                    </div>

                    {/* User */}
                    <div className="menu-item dropdown dropdown-mobile-full">
                        <a
                            href="#"
                            data-bs-toggle="dropdown"
                            data-bs-display="static"
                            className="menu-link"
                        >
                            <div className="menu-img online">
                                <img
                                    src="/assets/img/user/profile.jpg"
                                    alt="Profile"
                                    height="60"
                                />
                            </div>
                            <div className="menu-text d-sm-block d-none w-170px">
                                Analyst
                            </div>
                        </a>

                        <div className="dropdown-menu dropdown-menu-end me-lg-3 fs-11px">
                            <a className="dropdown-item d-flex align-items-center" href="/profile">
                                Profile
                                <i className="bi bi-person-circle ms-auto text-theme fs-16px"></i>
                            </a>

                            <a className="dropdown-item d-flex align-items-center" href="/settings">
                                Settings
                                <i className="bi bi-gear ms-auto text-theme fs-16px"></i>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Search Overlay */}
                <form className="menu-search">
                    <div className="menu-search-container">
                        <div className="menu-search-icon">
                            <i className="bi bi-search"></i>
                        </div>
                        <div className="menu-search-input">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Search DFIR-AI…"
                            />
                        </div>
                        <div className="menu-search-icon">
                            <a
                                href="#"
                                data-toggle-class="app-header-menu-search-toggled"
                                data-toggle-target=".app"
                            >
                                <i className="bi bi-x-lg"></i>
                            </a>
                        </div>
                    </div>
                </form>

            </div>
            {/* END #header */}
        </>
    );
}

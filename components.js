/* ===== SHARED NAV + FOOTER INJECTOR ===== */
(function(){
  var currentPage = (function(){
    var p = window.location.pathname.split('/').pop() || 'index.html';
    return p;
  })();

  var basePath = (function(){
    // pages/ subdir gets '../' prefix
    return window.location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
  })();

  var logoSVG = '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#29b6f6;stop-opacity:1"/><stop offset="100%" style="stop-color:#6366f1;stop-opacity:1"/></linearGradient><linearGradient id="dg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#00e5ff;stop-opacity:0.6"/><stop offset="100%" style="stop-color:#6366f1;stop-opacity:0.1"/></linearGradient></defs><path d="M20 2L38 20L20 38L2 20Z" fill="url(#dg)" stroke="rgba(99,102,241,0.4)" stroke-width="0.5"/><path d="M20 7L34 20L20 33L6 20Z" fill="url(#dg2)" opacity="0.5"/><path d="M20 12L29 20L20 28L11 20Z" fill="#080c14" opacity="0.7"/><path d="M20 14L27 20L20 26L13 20Z" fill="url(#dg)" opacity="0.8"/></svg>';

  var navLinks = [
    { href: basePath + 'pages/services.html', label: 'Services', page: 'services.html' },
    { href: basePath + 'pages/case-studies.html', label: 'Case Studies', page: 'case-studies.html' },
    { href: basePath + 'pages/industries.html', label: 'Industries', page: 'industries.html' },
    { href: basePath + 'pages/about.html', label: 'About Us', page: 'about.html' },
    { href: basePath + 'pages/insights.html', label: 'Insights', page: 'insights.html' },
    { href: basePath + 'pages/contact.html', label: 'Contact', page: 'contact.html' },
  ];

  function buildNav(){
    var linksHtml = navLinks.map(function(l){
      var active = currentPage === l.page ? ' active' : '';
      return '<li><a href="' + l.href + '" class="' + active + '">' + l.label + '</a></li>';
    }).join('');

    var mobLinksHtml = navLinks.map(function(l){
      var active = currentPage === l.page ? ' active' : '';
      return '<a href="' + l.href + '" class="' + active + '" onclick="closeMenu()">' + l.label + '</a>';
    }).join('');

    var navHtml = '<nav id="mainNav">' +
      '<a class="logo" href="' + basePath + 'index.html">' +
        '<div class="logo-diamond">' + logoSVG + '</div>' +
        '<span class="logo-text">Coratech <span>AI</span></span>' +
      '</a>' +
      '<ul class="nav-links">' + linksHtml + '</ul>' +
      '<a class="nav-cta" href="javascript:void(0)" onclick="openBooking()">Book a Call</a>' +
      '<button class="hamburger" id="hamburgerBtn" onclick="toggleMenu()" aria-label="Menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>' +
    '<div class="mobile-menu" id="mobileMenu">' +
      mobLinksHtml +
      '<button class="mob-cta" onclick="openBooking();closeMenu()">📅 Book a Discovery Call</button>' +
    '</div>';

    var placeholder = document.getElementById('nav-placeholder');
    if(placeholder){ placeholder.outerHTML = navHtml; }
    else { document.body.insertAdjacentHTML('afterbegin', navHtml); }
  }

  function buildFooter(){
    var footerHtml = '<footer>' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a class="logo" href="' + basePath + 'index.html" style="text-decoration:none">' +
            '<div class="logo-diamond">' + logoSVG + '</div>' +
            '<span class="logo-text">Coratech <span>AI</span></span>' +
          '</a>' +
          '<p class="footer-desc">Practical, affordable AI solutions for growing businesses. We build AI that actually delivers.</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Services</h4>' +
          '<ul>' +
            '<li><a href="' + basePath + 'pages/services.html">AI Strategy & Readiness</a></li>' +
            '<li><a href="' + basePath + 'pages/services.html">Automation & Workflows</a></li>' +
            '<li><a href="' + basePath + 'pages/services.html">Knowledge Hubs</a></li>' +
            '<li><a href="' + basePath + 'pages/services.html">Chatbots & AI Agents</a></li>' +
            '<li><a href="' + basePath + 'pages/services.html">AI Dashboards</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Company</h4>' +
          '<ul>' +
            '<li><a href="' + basePath + 'pages/about.html">About Us</a></li>' +
            '<li><a href="' + basePath + 'pages/case-studies.html">Case Studies</a></li>' +
            '<li><a href="' + basePath + 'pages/industries.html">Industries</a></li>' +
            '<li><a href="' + basePath + 'pages/insights.html">Insights</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Contact</h4>' +
          '<ul>' +
            '<li><a href="mailto:hello@coratechai.com">hello@coratechai.com</a></li>' +
            '<li><a href="' + basePath + 'pages/contact.html">Send a Message</a></li>' +
            '<li><a href="javascript:void(0)" onclick="openBooking()">Book a Call</a></li>' +
            '<li><a href="' + basePath + 'pages/faq.html">FAQ</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<p>&copy; 2025 Coratech AI (Trading as Canmore Digital). All rights reserved.</p>' +
        '<div class="footer-bottom-links">' +
          '<a href="' + basePath + 'pages/privacy.html">Privacy Policy</a>' +
          '<a href="' + basePath + 'pages/contact.html">Contact</a>' +
        '</div>' +
      '</div>' +
    '</footer>';

    var placeholder = document.getElementById('footer-placeholder');
    if(placeholder){ placeholder.outerHTML = footerHtml; }
    else { document.body.insertAdjacentHTML('beforeend', footerHtml); }
  }

  function buildChatbot(){
    var html =
      '<button id="chatbot-btn" onclick="toggleChatbot()" aria-label="Open chat">' +
        '<span class="chatbot-badge">1</span>' +
        '<span class="material-symbols-outlined" style="font-size:1.5rem;color:#fff">chat</span>' +
      '</button>' +
      '<div id="chatbot-window">' +
        '<div class="cb-header">' +
          '<div class="cb-header-left">' +
            '<div class="cb-avatar">🤖</div>' +
            '<div><div class="cb-name">Coratech AI Assistant</div><div class="cb-status">● Online — typically replies instantly</div></div>' +
          '</div>' +
          '<button class="cb-close" onclick="toggleChatbot()">✕</button>' +
        '</div>' +
        '<div class="cb-messages" id="cbMessages"></div>' +
        '<div class="cb-quick-btns" id="cbQuickBtns" style="display:none">' +
          '<button class="cb-quick" onclick="cbQuickAction(\'book\')">📅 Book a Call</button>' +
          '<button class="cb-quick" onclick="cbQuickAction(\'solutions\')">🛠 Our Solutions</button>' +
          '<button class="cb-quick" onclick="cbQuickAction(\'usecases\')">💡 Use Cases</button>' +
          '<button class="cb-quick" onclick="cbQuickAction(\'faq\')">❓ FAQs</button>' +
          '<button class="cb-quick" onclick="cbQuickAction(\'human\')">👤 Talk to a Person</button>' +
        '</div>' +
        '<div class="cb-lead-form" id="cbLeadForm" style="display:none">' +
          '<input type="text" id="cbLeadName" placeholder="Your name *"/>' +
          '<input type="email" id="cbLeadEmail" placeholder="Your email *"/>' +
          '<input type="tel" id="cbLeadPhone" placeholder="Phone number (optional)"/>' +
          '<div id="cbWhatsappRow" style="display:none;font-size:.8rem;color:var(--muted);padding:.25rem 0">Or WhatsApp us: <strong style="color:var(--white)">+233 536 026 175</strong></div>' +
          '<button class="cb-lead-submit" onclick="cbSubmitLead()">Send Details →</button>' +
        '</div>' +
        '<div class="cb-input-row">' +
          '<input class="cb-input" id="cbInput" placeholder="Type a message..." onkeydown="if(event.key===\'Enter\')cbSend()"/>' +
          '<button class="cb-send" onclick="cbSend()" aria-label="Send">➤</button>' +
        '</div>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', html);
  }

  function buildBookingModal(){
    var html =
      '<div class="modal-overlay" id="bookingModal" onclick="if(event.target===this)closeBooking()">' +
        '<div class="modal">' +
          '<button class="modal-close" onclick="closeBooking()">✕</button>' +
          '<div id="bookingForm">' +
            '<h2>Book a Discovery Call</h2>' +
            '<p>A free 30-minute session — no hard sell, just an honest conversation about what\'s possible for your business.</p>' +
            '<div class="booking-types">' +
              '<div class="booking-type selected" onclick="selectBookingType(this,\'discovery\')">' +
                '<h4>Discovery Call</h4><span>30 min</span>' +
              '</div>' +
              '<div class="booking-type" onclick="selectBookingType(this,\'demo\')">' +
                '<h4>Live Demo</h4><span>45 min</span>' +
              '</div>' +
              '<div class="booking-type" onclick="selectBookingType(this,\'strategy\')">' +
                '<h4>Strategy Session</h4><span>60 min</span>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">' +
              '<button onclick="prevMonth()" style="background:var(--glass);border:1px solid var(--border);color:var(--white);border-radius:8px;padding:.4rem .8rem;cursor:pointer;font-size:.85rem">&#8592;</button>' +
              '<span id="calMonthLabel" style="font-family:\'Syne\',sans-serif;font-weight:700;font-size:.9rem"></span>' +
              '<button onclick="nextMonth()" style="background:var(--glass);border:1px solid var(--border);color:var(--white);border-radius:8px;padding:.4rem .8rem;cursor:pointer;font-size:.85rem">&#8594;</button>' +
            '</div>' +
            '<div class="cal-grid" id="calGrid"></div>' +
            '<div class="time-slots" id="timeSlots" style="display:none">' +
              ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM'].map(function(t){
                return '<div class="time-slot" onclick="selectTime(\''+t+'\',this)">'+t+'</div>';
              }).join('') +
            '</div>' +
            '<div class="form-group" style="margin-bottom:.75rem"><label>Your Name *</label><input type="text" id="bookName" placeholder="Full name"/></div>' +
            '<div class="form-group" style="margin-bottom:.75rem"><label>Email Address *</label><input type="email" id="bookEmail" placeholder="your@email.com"/></div>' +
            '<div class="form-group" style="margin-bottom:1.5rem"><label>Company (optional)</label><input type="text" id="bookCompany" placeholder="Your company name"/></div>' +
            '<button class="btn-primary" style="width:100%;justify-content:center" onclick="confirmBooking()">Confirm Booking →</button>' +
          '</div>' +
          '<div class="booking-confirm" id="bookingConfirm">' +
            '<div class="check">✅</div>' +
            '<h3>You\'re booked in!</h3>' +
            '<p>We\'ll send a confirmation to your email shortly. Looking forward to speaking with you.</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function buildScrollTop(){
    document.body.insertAdjacentHTML('beforeend', '<button id="scrollTop" onclick="scrollToTop()" aria-label="Back to top" title="Back to top">↑</button>');
  }

  document.addEventListener('DOMContentLoaded', function(){
    buildNav();
    buildFooter();
    buildChatbot();
    buildBookingModal();
    buildScrollTop();
    // re-init fade-in after DOM update
    setTimeout(initFadeIn, 50);
  });
})();

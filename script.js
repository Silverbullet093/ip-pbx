/**
 * CALL PICKUP IP-PBX INTERACTIVE PRESENTATION
 * Morph Transition Engine with GSAP & Full Navigation Controls
 * Featuring Multi-Style & Contextual Slide Morph Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DATA SLIDE RESMI (14 SLIDE)
  // ==========================================
  const SLIDES_DATA = [
    {
      id: 1,
      title: "Cover – CALL PICKUP PADA SISTEM TELEPON IP (IP-PBX)",
      file: "assets/slides/slide-01.png"
    },
    {
      id: 2,
      title: "Latar Belakang Masalah",
      file: "assets/slides/slide-02.png"
    },
    {
      id: 3,
      title: "Pengertian & Tiga Pilar Konsep Dasar",
      file: "assets/slides/slide-03.png"
    },
    {
      id: 4,
      title: "Cara Kerja: Alur Eksekusi Call Pickup",
      file: "assets/slides/slide-04.png"
    },
    {
      id: 5,
      title: "Variasi & Jenis Call Pickup Lintas Platform",
      file: "assets/slides/slide-05.png"
    },
    {
      id: 6,
      title: "Komponen Pendukung Sistem",
      file: "assets/slides/slide-06.png"
    },
    {
      id: 7,
      title: "SIP and RTP Interaction",
      file: "assets/slides/slide-07.png"
    },
    {
      id: 8,
      title: "Persiapan Implementasi Asterisk",
      file: "assets/slides/slide-08.png"
    },
    {
      id: 9,
      title: "Konfigurasi PJSIP: Otorisasi Grup (pjsip.conf)",
      file: "assets/slides/slide-09.png"
    },
    {
      id: 10,
      title: "Eksekusi Dialplan & Pengujian Sistem",
      file: "assets/slides/slide-10.png"
    },
    {
      id: 11,
      title: "Penerapan Call Pickup di Lingkungan Nyata",
      file: "assets/slides/slide-11.png"
    },
    {
      id: 12,
      title: "Analisis: Efisiensi, Keterbatasan & Keamanan",
      file: "assets/slides/slide-12.png"
    },
    {
      id: 13,
      title: "Kesimpulan",
      file: "assets/slides/slide-13.png"
    },
    {
      id: 14,
      title: "Daftar Pustaka",
      file: "assets/slides/slide-14.png"
    }
  ];

  const totalSlides = SLIDES_DATA.length;
  let currentIndex = 0;
  let isTransitioning = false;
  let idleTimer = null;
  const IDLE_TIMEOUT_MS = 3500;

  // ==========================================
  // MORPH VARIATION CONFIGURATIONS
  // ==========================================
  const MORPH_MODES = [
    { id: 'smart', label: 'Smart Kontekstual (Bervariasi Otomatis)' },
    { id: 'depth', label: 'Depth 3D Zoom' },
    { id: 'flow', label: 'Lateral Flow' },
    { id: 'cascade', label: 'Vertical Cascade' },
    { id: 'focal', label: 'Focal Aperture' }
  ];

  let currentMorphModeIndex = 0; // default to 'smart'

  // Contextual transitions tailored for each slide relationship in 'smart' mode
  const CONTEXTUAL_MORPH_MAP = {
    '0-1': { name: "Depth Drift & Focus", fromScale: 1.04, toScale: 0.96, x: 28, y: -6, blur: 3, overlay: 'pulse' },
    '1-2': { name: "3-Pillars Unfold", fromScale: 0.98, toScale: 1.02, x: 0, y: 32, blur: 3, overlay: 'cascade' },
    '2-3': { name: "PBX Circuit Flow", fromScale: 1.0, toScale: 1.0, x: 42, y: 0, blur: 2, overlay: 'beam-horiz' },
    '3-4': { name: "Platform Matrix Shift", fromScale: 0.98, toScale: 1.0, x: -25, y: -12, blur: 3, overlay: 'beam-horiz' },
    '4-5': { name: "Network Hub Radial Expand", fromScale: 1.03, toScale: 0.96, x: 0, y: 0, blur: 4, overlay: 'pulse' },
    '5-6': { name: "SIP Protocol Ladder Wave", fromScale: 1.0, toScale: 1.0, x: 0, y: -36, blur: 3, overlay: 'cascade' },
    '6-7': { name: "Server Hardware Isometric Dock", fromScale: 0.97, toScale: 1.02, x: 32, y: 18, blur: 3, overlay: 'pulse' },
    '7-8': { name: "Terminal Inset Focus", fromScale: 1.04, toScale: 0.96, x: 0, y: 0, blur: 4, overlay: 'vignette' },
    '8-9': { name: "Dual-Console Spread", fromScale: 0.97, toScale: 1.0, x: -38, y: 0, blur: 2, overlay: 'beam-horiz' },
    '9-10': { name: "Field Scenario Trio Glide", fromScale: 0.98, toScale: 1.0, x: 0, y: 26, blur: 3, overlay: 'cascade' },
    '10-11': { name: "Security Shield Tilt", fromScale: 1.02, toScale: 0.97, x: 32, y: -10, blur: 3, overlay: 'vignette' },
    '11-12': { name: "Convergence Core Summary", fromScale: 0.96, toScale: 1.03, x: 0, y: 0, blur: 3, overlay: 'pulse' },
    '12-13': { name: "Scholarly Outro Drift", fromScale: 1.02, toScale: 0.98, x: 18, y: 12, blur: 3, overlay: 'beam-horiz' }
  };

  // ==========================================
  // 2. DOM ELEMENTS
  // ==========================================
  const slidesContainer = document.getElementById('slidesContainer');
  const morphOverlay = document.getElementById('morphOverlay');
  const morphBeam = document.getElementById('morphBeam');
  const morphBeamVertical = document.getElementById('morphBeamVertical');
  const morphGlowPulse = document.getElementById('morphGlowPulse');
  const morphVignette = document.getElementById('morphVignette');

  const currentNumEl = document.getElementById('currentNum');
  const totalNumEl = document.getElementById('totalNum');
  const progressBar = document.getElementById('progressBar');
  const progressContainer = document.getElementById('progressContainer');
  const progressTooltip = document.getElementById('progressTooltip');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const edgePrevBtn = document.getElementById('edgePrevBtn');
  const edgeNextBtn = document.getElementById('edgeNextBtn');
  const morphModeBtn = document.getElementById('morphModeBtn');

  const overviewBtn = document.getElementById('overviewBtn');
  const overviewModal = document.getElementById('overviewModal');
  const overviewCloseBtn = document.getElementById('overviewCloseBtn');
  const overviewGrid = document.getElementById('overviewGrid');

  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const iconExpand = fullscreenBtn ? fullscreenBtn.querySelector('.icon-expand') : null;
  const iconCompress = fullscreenBtn ? fullscreenBtn.querySelector('.icon-compress') : null;

  const shortcutsBtn = document.getElementById('shortcutsBtn');
  const shortcutsModal = document.getElementById('shortcutsModal');
  const shortcutsCloseBtn = document.getElementById('shortcutsCloseBtn');
  const hudCounter = document.getElementById('hudCounter');
  const toastIndicator = document.getElementById('toastIndicator');

  // ==========================================
  // 3. SLIDE INITIALIZATION & PRELOADING
  // ==========================================
  const slideElements = [];

  function initSlides() {
    slidesContainer.innerHTML = '';
    totalNumEl.textContent = String(totalSlides).padStart(2, '0');

    SLIDES_DATA.forEach((slide, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = `slide-item ${idx === 0 ? 'active' : ''}`;
      slideDiv.setAttribute('data-index', idx);
      slideDiv.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');

      const img = document.createElement('img');
      img.src = slide.file;
      img.alt = `Slide ${idx + 1}: ${slide.title}`;
      img.loading = idx < 2 ? 'eager' : 'lazy';
      img.decoding = 'async';

      slideDiv.appendChild(img);
      slidesContainer.appendChild(slideDiv);
      slideElements.push(slideDiv);
    });

    // Populate Overview Grid
    buildOverviewGrid();

    // Preload remaining slide images in background
    preloadImages();

    // Initial state setup
    updateControlsState();
  }

  function preloadImages() {
    SLIDES_DATA.forEach((slide, idx) => {
      if (idx >= 2) {
        const preImg = new Image();
        preImg.src = slide.file;
      }
    });
  }

  function buildOverviewGrid() {
    overviewGrid.innerHTML = '';
    SLIDES_DATA.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = `overview-card ${idx === currentIndex ? 'current' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Pilih Slide ${idx + 1}: ${slide.title}`);

      card.innerHTML = `
        <div class="overview-card-thumb">
          <img src="${slide.file}" alt="Thumbnail ${slide.title}" loading="lazy">
          <span class="overview-card-badge">${String(idx + 1).padStart(2, '0')}</span>
        </div>
        <div class="overview-card-info">
          <div class="overview-card-title">${slide.title}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        closeOverview();
        if (idx !== currentIndex) {
          goToSlide(idx);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          closeOverview();
          if (idx !== currentIndex) {
            goToSlide(idx);
          }
        }
      });

      overviewGrid.appendChild(card);
    });
  }

  function updateOverviewActiveState() {
    const cards = overviewGrid.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.classList.add('current');
      } else {
        card.classList.remove('current');
      }
    });
  }

  // ==========================================
  // 4. POWERPOINT MORPH ENGINE (VARIASI DINAMIS)
  // ==========================================
  /**
   * Menghitung parameter animasi morph berdasarkan mode aktif dan relasi slide
   */
  function computeMorphParams(fromIndex, toIndex, direction) {
    const isForward = direction === 'next';
    const activeMode = MORPH_MODES[currentMorphModeIndex].id;

    if (activeMode === 'smart') {
      // Periksa apakah ada konfigurasi kontekstual untuk pasangan slide ini
      const key = isForward ? `${fromIndex}-${toIndex}` : `${toIndex}-${fromIndex}`;
      if (CONTEXTUAL_MORPH_MAP[key]) {
        const conf = CONTEXTUAL_MORPH_MAP[key];
        return {
          duration: 0.75,
          fromScale: isForward ? conf.fromScale : conf.toScale,
          toScale: isForward ? conf.toScale : conf.fromScale,
          shiftX: isForward ? conf.x : -conf.x,
          shiftY: isForward ? conf.y : -conf.y,
          blur: conf.blur,
          overlayType: conf.overlay,
          name: conf.name
        };
      }
      // Fallback untuk lompatan non-adjacent dalam mode smart
      return {
        duration: 0.72,
        fromScale: isForward ? 1.03 : 0.97,
        toScale: isForward ? 0.97 : 1.03,
        shiftX: isForward ? 35 : -35,
        shiftY: 0,
        blur: 3,
        overlayType: 'beam-horiz',
        name: isForward ? 'Forward Stream' : 'Reverse Stream'
      };
    }

    if (activeMode === 'depth') {
      return {
        duration: 0.8,
        fromScale: isForward ? 1.05 : 0.94,
        toScale: isForward ? 0.94 : 1.05,
        shiftX: 0,
        shiftY: 0,
        blur: 4,
        overlayType: 'pulse',
        name: 'Depth 3D Zoom'
      };
    }

    if (activeMode === 'flow') {
      return {
        duration: 0.75,
        fromScale: 1.0,
        toScale: 1.0,
        shiftX: isForward ? 45 : -45,
        shiftY: 0,
        blur: 2.5,
        overlayType: 'beam-horiz',
        name: 'Lateral Flow'
      };
    }

    if (activeMode === 'cascade') {
      return {
        duration: 0.75,
        fromScale: isForward ? 0.99 : 1.01,
        toScale: isForward ? 1.01 : 0.99,
        shiftX: 0,
        shiftY: isForward ? 40 : -40,
        blur: 3,
        overlayType: 'cascade',
        name: 'Vertical Cascade'
      };
    }

    if (activeMode === 'focal') {
      return {
        duration: 0.8,
        fromScale: 1.02,
        toScale: 0.97,
        shiftX: isForward ? 15 : -15,
        shiftY: 0,
        blur: 4.5,
        overlayType: 'vignette',
        name: 'Focal Aperture'
      };
    }

    // Default safe fallback
    return {
      duration: 0.75,
      fromScale: 1.03,
      toScale: 0.97,
      shiftX: isForward ? 30 : -30,
      shiftY: 0,
      blur: 3,
      overlayType: 'beam-horiz',
      name: 'Standard Morph'
    };
  }

  /**
   * Eksekusi Animasi Morph GSAP
   */
  function morphTransition(fromIndex, toIndex, direction = 'next') {
    if (fromIndex === toIndex) return;
    isTransitioning = true;

    const fromSlide = slideElements[fromIndex];
    const toSlide = slideElements[toIndex];
    const isForward = direction === 'next';

    const params = computeMorphParams(fromIndex, toIndex, direction);
    const morphEase = "power2.out";

    // Prepare classes
    fromSlide.classList.remove('active');
    fromSlide.classList.add('animating-out');
    fromSlide.setAttribute('aria-hidden', 'true');

    toSlide.classList.add('animating-in');
    toSlide.setAttribute('aria-hidden', 'false');

    // Reset initial states for incoming slide
    gsap.set(toSlide, {
      opacity: 0,
      scale: params.toScale,
      x: params.shiftX,
      y: params.shiftY,
      filter: `blur(${params.blur}px)`,
      visibility: 'visible',
      zIndex: 3
    });

    gsap.set(fromSlide, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      visibility: 'visible',
      zIndex: 2
    });

    // Create coordinated timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Cleanup states
        fromSlide.classList.remove('animating-out');
        fromSlide.style.visibility = 'hidden';
        gsap.set(fromSlide, { clearProps: 'all' });

        toSlide.classList.remove('animating-in');
        toSlide.classList.add('active');
        gsap.set(toSlide, { clearProps: 'transform,filter,opacity,zIndex' });

        isTransitioning = false;
        updateControlsState();
      }
    });

    // 1. Animate Outgoing Slide
    tl.to(fromSlide, {
      duration: params.duration * 0.85,
      opacity: 0,
      scale: params.fromScale,
      x: -params.shiftX * 0.7,
      y: -params.shiftY * 0.7,
      filter: `blur(${params.blur + 1}px)`,
      ease: "power2.inOut"
    }, 0);

    // 2. Animate Incoming Slide
    tl.to(toSlide, {
      duration: params.duration,
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      ease: morphEase
    }, 0.06);

    // 3. Coordinated Morph Overlay Effects
    triggerMorphOverlay(params.overlayType, isForward, params.duration);
  }

  function triggerMorphOverlay(type, isForward, duration) {
    if (!morphOverlay) return;
    gsap.set(morphOverlay, { opacity: 1 });

    if (type === 'beam-horiz' && morphBeam) {
      const beamStart = isForward ? -100 : 350;
      const beamEnd = isForward ? 350 : -100;
      gsap.fromTo(morphBeam, 
        { xPercent: beamStart, opacity: 1 },
        { 
          xPercent: beamEnd, 
          duration: duration * 0.85, 
          ease: "power1.inOut",
          onComplete: () => gsap.set(morphOverlay, { opacity: 0 })
        }
      );
    } else if (type === 'cascade' && morphBeamVertical) {
      const beamStart = isForward ? -100 : 350;
      const beamEnd = isForward ? 350 : -100;
      gsap.fromTo(morphBeamVertical,
        { yPercent: beamStart, opacity: 1 },
        { 
          yPercent: beamEnd, 
          duration: duration * 0.85, 
          ease: "power1.inOut",
          onComplete: () => gsap.set(morphOverlay, { opacity: 0 })
        }
      );
    } else if (type === 'vignette' && morphVignette) {
      gsap.fromTo(morphVignette,
        { opacity: 0 },
        { 
          opacity: 0.8, 
          duration: duration * 0.45, 
          yoyo: true, 
          repeat: 1, 
          ease: "sine.inOut",
          onComplete: () => gsap.set(morphOverlay, { opacity: 0 })
        }
      );
    } else if (morphGlowPulse) {
      // Default radial pulse
      gsap.fromTo(morphGlowPulse,
        { opacity: 0 },
        { 
          opacity: 0.65, 
          duration: duration * 0.45, 
          yoyo: true, 
          repeat: 1, 
          ease: "sine.inOut",
          onComplete: () => gsap.set(morphOverlay, { opacity: 0 })
        }
      );
    }
  }

  // ==========================================
  // 5. NAVIGATION CONTROLLER
  // ==========================================
  function goToSlide(targetIndex, customDirection = null) {
    if (isTransitioning) return;
    if (targetIndex < 0 || targetIndex >= totalSlides) return;
    if (targetIndex === currentIndex) return;

    const direction = customDirection || (targetIndex > currentIndex ? 'next' : 'prev');
    const prevIndex = currentIndex;
    currentIndex = targetIndex;

    morphTransition(prevIndex, currentIndex, direction);
    updateOverviewActiveState();
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1, 'next');
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, 'prev');
    }
  }

  function updateControlsState() {
    // Update Counter
    currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');

    // Update Progress Bar
    const progressPercent = ((currentIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Disable / Enable Buttons
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === totalSlides - 1;

    prevBtn.disabled = isFirst;
    edgePrevBtn.disabled = isFirst;
    nextBtn.disabled = isLast;
    edgeNextBtn.disabled = isLast;
  }

  // Cycle Morph Mode
  function cycleMorphMode() {
    currentMorphModeIndex = (currentMorphModeIndex + 1) % MORPH_MODES.length;
    const currentMode = MORPH_MODES[currentMorphModeIndex];
    showToast(`Mode Morph: ${currentMode.label}`);
    if (morphModeBtn) {
      morphModeBtn.setAttribute('title', `Variasi Morph: ${currentMode.label} (Klik untuk ganti)`);
    }
  }

  // Toast Helper
  let toastTimeout = null;
  function showToast(message) {
    if (!toastIndicator) return;
    toastIndicator.textContent = message;
    toastIndicator.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastIndicator.classList.remove('show');
    }, 2000);
  }

  // ==========================================
  // 6. EVENT LISTENERS & USER INPUT
  // ==========================================
  // Button Clicks
  prevBtn.addEventListener('click', () => { resetIdleTimer(); prevSlide(); });
  nextBtn.addEventListener('click', () => { resetIdleTimer(); nextSlide(); });
  edgePrevBtn.addEventListener('click', () => { resetIdleTimer(); prevSlide(); });
  edgeNextBtn.addEventListener('click', () => { resetIdleTimer(); nextSlide(); });
  if (morphModeBtn) {
    morphModeBtn.addEventListener('click', () => { resetIdleTimer(); cycleMorphMode(); });
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // If overview or shortcuts modal is active, handle Esc or modal-specific keys
    if (overviewModal.classList.contains('active')) {
      if (e.key === 'Escape' || e.key.toLowerCase() === 'o' || e.key.toLowerCase() === 'g') {
        e.preventDefault();
        closeOverview();
      }
      return;
    }

    if (shortcutsModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeShortcuts();
      }
      return;
    }

    resetIdleTimer();

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ': // Spacebar
        e.preventDefault();
        nextSlide();
        break;

      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;

      case 'Home':
        e.preventDefault();
        goToSlide(0);
        showToast('Slide Pertama');
        break;

      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        showToast('Slide Terakhir');
        break;

      case 'm':
      case 'M':
        e.preventDefault();
        cycleMorphMode();
        break;

      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;

      case 'o':
      case 'O':
      case 'g':
      case 'G':
        e.preventDefault();
        toggleOverview();
        break;

      case '?':
      case '/':
        e.preventDefault();
        toggleShortcuts();
        break;

      default:
        break;
    }
  });

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      const deltaTime = Date.now() - touchStartTime;

      // Minimum swipe distance of 45px and predominantly horizontal
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && deltaTime < 600) {
        resetIdleTimer();
        if (deltaX < 0) {
          nextSlide(); // Swipe left -> next
        } else {
          prevSlide(); // Swipe right -> prev
        }
      }
    }
  }, { passive: true });

  // Progress Bar Hover & Click Scrubbing
  progressContainer.addEventListener('mousemove', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.min(totalSlides - 1, Math.floor(ratio * totalSlides));
    const targetSlide = SLIDES_DATA[targetIdx];

    progressTooltip.querySelector('.tooltip-num').textContent = String(targetIdx + 1).padStart(2, '0');
    progressTooltip.querySelector('.tooltip-title').textContent = targetSlide.title;
    
    // Position tooltip safely within bounds
    const tooltipWidth = progressTooltip.offsetWidth || 180;
    const clampedX = Math.max(tooltipWidth / 2 + 10, Math.min(rect.width - tooltipWidth / 2 - 10, clickX));
    progressTooltip.style.left = `${clampedX}px`;
    progressTooltip.classList.add('visible');
  });

  progressContainer.addEventListener('mouseleave', () => {
    progressTooltip.classList.remove('visible');
  });

  progressContainer.addEventListener('click', (e) => {
    resetIdleTimer();
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.min(totalSlides - 1, Math.floor(ratio * totalSlides));
    goToSlide(targetIdx);
  });

  // Overview Modal Controls
  function openOverview() {
    updateOverviewActiveState();
    overviewModal.classList.add('active');
    overviewModal.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('is-idle');
  }

  function closeOverview() {
    overviewModal.classList.remove('active');
    overviewModal.setAttribute('aria-hidden', 'true');
  }

  function toggleOverview() {
    if (overviewModal.classList.contains('active')) {
      closeOverview();
    } else {
      openOverview();
    }
  }

  overviewBtn.addEventListener('click', toggleOverview);
  hudCounter.addEventListener('click', toggleOverview);
  overviewCloseBtn.addEventListener('click', closeOverview);

  // Shortcuts Modal Controls
  function openShortcuts() {
    shortcutsModal.classList.add('active');
    shortcutsModal.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('is-idle');
  }

  function closeShortcuts() {
    shortcutsModal.classList.remove('active');
    shortcutsModal.setAttribute('aria-hidden', 'true');
  }

  function toggleShortcuts() {
    if (shortcutsModal.classList.contains('active')) {
      closeShortcuts();
    } else {
      openShortcuts();
    }
  }

  shortcutsBtn.addEventListener('click', toggleShortcuts);
  shortcutsCloseBtn.addEventListener('click', closeShortcuts);

  // Close modals when clicking backdrop
  shortcutsModal.addEventListener('click', (e) => {
    if (e.target === shortcutsModal) {
      closeShortcuts();
    }
  });

  // Fullscreen Mode Handler
  function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  function updateFullscreenUI() {
    const isFull = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    if (isFull) {
      document.body.classList.add('is-fullscreen');
      if (iconExpand) iconExpand.style.display = 'none';
      if (iconCompress) iconCompress.style.display = 'block';
      fullscreenBtn.setAttribute('title', 'Keluar Layar Penuh (F / Esc)');
    } else {
      document.body.classList.remove('is-fullscreen');
      if (iconExpand) iconExpand.style.display = 'block';
      if (iconCompress) iconCompress.style.display = 'none';
      fullscreenBtn.setAttribute('title', 'Mode Layar Penuh (F)');
    }
  }

  fullscreenBtn.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', updateFullscreenUI);
  document.addEventListener('webkitfullscreenchange', updateFullscreenUI);

  // Auto-hide Controls on Inactivity (Presenter HUD Auto-fade)
  function resetIdleTimer() {
    document.body.classList.remove('is-idle');
    clearTimeout(idleTimer);

    // Don't auto-hide if a modal dialog is open
    if (overviewModal.classList.contains('active') || shortcutsModal.classList.contains('active')) {
      return;
    }

    idleTimer = setTimeout(() => {
      document.body.classList.add('is-idle');
    }, IDLE_TIMEOUT_MS);
  }

  window.addEventListener('mousemove', resetIdleTimer);
  window.addEventListener('click', resetIdleTimer);
  window.addEventListener('keydown', resetIdleTimer);
  window.addEventListener('touchstart', resetIdleTimer, { passive: true });

  // Start initial idle timer
  resetIdleTimer();

  // Initialize Slides!
  initSlides();
});

document.addEventListener('DOMContentLoaded', function(){
  // set footer year
  document.getElementById('siteYear').textContent = new Date().getFullYear();

  // Dark mode toggle (persist in localStorage)
  const darkToggle = document.getElementById('darkModeToggle');
  const applyDark = (on) => {
    document.body.classList.toggle('dark', on);
    darkToggle.checked = on;
  };

  // load preference
  const saved = localStorage.getItem('vcet_dark');
  applyDark(saved === '1');

  darkToggle.addEventListener('change', () => {
    const on = darkToggle.checked;
    applyDark(on);
    localStorage.setItem('vcet_dark', on ? '1' : '0');
  });

  // Gallery modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'), {});
  const galleryImg = document.getElementById('galleryModalImg');
  const galleryCaption = document.getElementById('galleryCaption');

  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      galleryImg.src = img.src.replace('400x300', '1200x900'); // try larger placeholder
      galleryCaption.textContent = img.dataset.caption || img.alt || '';
      galleryModal.show();
    });
  });

  // Contact form basic client-side validation and simulated send
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }
    // Simulate send
    contactAlert.style.display = 'block';
    contactAlert.className = 'alert alert-success';
    contactAlert.textContent = 'Thank you — your message has been received (simulated).';
    contactForm.reset();
    setTimeout(()=> {
      contactAlert.style.display = 'none';
    }, 4000);
  });

  // Placements Chart (simple demo data)
  const ctx = document.getElementById('placementsChart');
  if (ctx) {
    const data = {
      labels: ['2019','2020','2021','2022','2023'],
      datasets: [{
        label: 'Offers',
        data: [120,150,210,260,310],
        tension: 0.3,
        borderWidth: 2,
        borderColor: '#1a2a3a',
        backgroundColor: 'rgba(26,42,58,0.06)',
        fill: true,
        pointRadius: 4
      }]
    };

    new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {display:false},
          tooltip: {mode:'index'}
        },
        scales: {
          x: {grid: {display:false}},
          y: {beginAtZero:true}
        }
      }
    });
  }

  // Smooth scrolling for navbar anchors
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      // collapse navbar on mobile
      const bsCollapse = document.querySelector('.navbar-collapse.show');
      if (bsCollapse) new bootstrap.Collapse(bsCollapse, {toggle:true});
    });
  });

});
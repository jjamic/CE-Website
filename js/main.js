'use strict';

const NAV=`<nav id="main-nav">
  <a href="index.html" class="nav-logo"><img src="images/logo-dark.svg" alt="Carchrie Engineering" style="height:34px;width:auto;display:block;"></a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="design-review.html">Design review</a></li>
    <li><a href="product-development.html">Product development</a></li>
    <li><a href="engineering-partner.html">Fractional engineer</a></li>
    <li><a href="projects.html">Projects</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="insights.html">Insights</a></li>
    <li><a href="contact.html" class="nav-cta">Contact us</a></li>
  </ul>
  <button class="nav-ham" id="ham" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>`;

const FOOTER=`<footer>
  <div class="footer-inner">
    <div>
      <img src="images/logo-white.svg" alt="Carchrie Engineering" style="height:30px;width:auto;display:block;margin-bottom:12px;">
      <p class="footer-tagline">Hardware engineering across the full product cycle. Sydney, Australia — clients globally.</p>
    </div>
    <div>
      <div class="footer-col-title">Services</div>
      <ul class="footer-links">
        <li><a href="design-review.html">Design review</a></li>
        <li><a href="product-development.html">Product development</a></li>
        <li><a href="engineering-partner.html">Fractional engineer</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-col-title">Company</div>
      <ul class="footer-links">
        <li><a href="projects.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="insights.html">Insights</a></li>
        <li><a href="contact.html">Contact us</a></li>
        <li><a href="https://www.linkedin.com/company/carchrie-engineering/" target="_blank" rel="noopener">LinkedIn</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 Carchrie Engineering · Sydney, Australia</span>
    <span>carchrie-engineering.com</span>
  </div>
</footer>`;

function ph(label,h){
  const ht=h||'100%';
  return `<div style="position:relative;width:100%;height:${ht};overflow:hidden;border-radius:inherit;">
    <img src="images/fea-placeholder.png" alt="${label}" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.78);">
    <div style="position:absolute;inset:0;background:rgba(31,31,31,.46);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:12px;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="1" y="3" width="22" height="18" rx="2" stroke="rgba(255,255,255,.55)" stroke-width="1.3"/><circle cx="7" cy="8" r="1.8" stroke="rgba(255,255,255,.55)" stroke-width="1.3"/><path d="M1 17L6 12L11 15L16 9L23 17" stroke="rgba(255,255,255,.55)" stroke-width="1.3" stroke-linecap="round"/></svg>
      <div style="font-size:10px;font-weight:500;color:rgba(255,255,255,.7);text-align:center;line-height:1.4;">${label}</div>
    </div>
  </div>`;
}
window.ph=ph;

function initCarousels(){
  document.querySelectorAll('.carousel-wrap').forEach(wrap=>{
    const track=wrap.querySelector('.carousel-track');
    const slides=wrap.querySelectorAll('.carousel-slide');
    if(!track||slides.length<2)return;
    const dotsEl=wrap.querySelector('.carousel-dots');
    const prev=wrap.querySelector('.carousel-btn-prev');
    const next=wrap.querySelector('.carousel-btn-next');
    let cur=0;
    // Build dots if not already built
    if(dotsEl&&!dotsEl.children.length){
      slides.forEach((_,i)=>{
        const d=document.createElement('button');
        d.className='carousel-dot'+(i===0?' active':'');
        d.setAttribute('aria-label','Slide '+(i+1));
        dotsEl.appendChild(d);
      });
      dotsEl.addEventListener('click',e=>{
        const d=e.target.closest('.carousel-dot');
        if(d)go(Array.from(dotsEl.children).indexOf(d));
      });
    }
    function go(n){
      cur=(n+slides.length)%slides.length;
      track.style.transform=`translateX(-${cur*100}%)`;
      // Always re-query so newly built dots are included
      if(dotsEl)Array.from(dotsEl.children).forEach((d,i)=>d.classList.toggle('active',i===cur));
    }
    prev&&prev.addEventListener('click',()=>go(cur-1));
    next&&next.addEventListener('click',()=>go(cur+1));
    go(0);
  });
}


function initPathway(){
  const stages=document.querySelectorAll('.pathway-stage');
  if(!stages.length)return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('active');});
  },{threshold:.25});
  stages.forEach(s=>obs.observe(s));
}

document.addEventListener('DOMContentLoaded',()=>{
  const nph=document.getElementById('nav-ph');
  const fph=document.getElementById('footer-ph');
  if(nph)nph.outerHTML=NAV;
  if(fph)fph.outerHTML=FOOTER;
  setTimeout(()=>{
    const page=location.pathname.split('/').pop()||'index.html';
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===page));
    const ham=document.getElementById('ham');
    const links=document.querySelector('.nav-links');
    if(ham&&links)ham.addEventListener('click',()=>links.classList.toggle('open'));
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
    },{threshold:.07});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    initCarousels();
    initPathway();
    initTestiCarousel();
    initTestiCarousel();
    document.querySelectorAll('.carousel-wrap').forEach(wrap=>{
      const slides=wrap.querySelectorAll('.carousel-slide');
      const dotsEl=wrap.querySelector('.carousel-dots');
      if(!dotsEl||slides.length<2||dotsEl.children.length)return;
      slides.forEach((_,i)=>{
        const d=document.createElement('button');
        d.className='carousel-dot'+(i===0?' active':'');
        dotsEl.appendChild(d);
      });
    });
  },50);
});

// Testimonial 2-up carousel
function initTestiCarousel() {
  var track = document.getElementById('tr-track');
  var nav = document.getElementById('tr-nav');
  if (!track || !nav) return;
  var slides = track.querySelectorAll('.tr-slide');
  var n = slides.length;
  var cur = 0;
  // Build dots
  for (var i = 0; i < n; i++) {
    var d = document.createElement('button');
    d.className = 'tr-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('data-i', i);
    nav.appendChild(d);
  }
  function go(idx) {
    cur = (idx + n) % n;
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    nav.querySelectorAll('.tr-dot').forEach(function(d,i){ d.classList.toggle('active', i===cur); });
  }
  nav.addEventListener('click', function(e){ if(e.target.classList.contains('tr-dot')) go(+e.target.getAttribute('data-i')); });
  var timer = setInterval(function(){ go(cur+1); }, 6000);
  track.addEventListener('mouseenter', function(){ clearInterval(timer); });
  track.addEventListener('mouseleave', function(){ timer = setInterval(function(){ go(cur+1); }, 6000); });
}

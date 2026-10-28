(function(){
  var btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  btn.addEventListener('click',function(){
    var open=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded',String(!open));
    btn.setAttribute('aria-label',open?'Open menu':'Close menu');
    menu.classList.toggle('open',!open);
  });
  menu.addEventListener('click',function(e){
    if(e.target.tagName==='A'){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open menu');}
  });
  var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

  // Contact form: same fields and same Zapier Catch Hook endpoint as the original site.
  // Form-encoded body = CORS "simple request" (no preflight). No analytics calls.
  var WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/27827224/4bfa8co/";
  var form=document.getElementById('contact-form');
  var submitBtn=document.getElementById('submit-btn');
  var ok=document.getElementById('form-success'), err=document.getElementById('form-error');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return;}
    submitBtn.disabled=true; submitBtn.textContent='Sending…'; ok.hidden=true; err.hidden=true;
    fetch(WEBHOOK_URL,{method:'POST',body:new URLSearchParams(new FormData(form))})
      .then(function(res){ if(!res.ok) throw new Error('HTTP '+res.status); form.reset(); ok.hidden=false; })
      .catch(function(){ err.hidden=false; })
      .then(function(){ submitBtn.disabled=false; submitBtn.textContent='Send Message'; });
  });

  // Subtle fade-in on scroll. Skipped when the visitor prefers reduced motion.
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var els=document.querySelectorAll('.hero-head, .hero-media, .stats-grid > div, .section h2, .intro, .card, .pillar, .why-media, .supply li, .mfg-groups, .badges, .news, .request-in, .form, .directory');
    document.documentElement.classList.add('js-reveal');
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    },{rootMargin:'0px 0px -8% 0px',threshold:0.08});
    els.forEach(function(el,i){ el.classList.add('reveal'); el.style.transitionDelay=((i%3)*80)+'ms'; io.observe(el); });
  }
})();

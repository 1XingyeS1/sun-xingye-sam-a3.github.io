// -------- Navigation scroll & highglight (index.html only) --------
document.querySelectorAll('.nav-link, .footer-link').forEach(function(link){
  link.addEventListener('click', function(e){
    const hash = link.getAttribute('href');
    if(hash && hash[0] === '#') {
      e.preventDefault();
      document.querySelector(hash).scrollIntoView({behavior: "smooth"});
      document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
      if(link.classList.contains('nav-link')) link.classList.add('active');
    }
  });
});

// -------- Action-btn hover color burst effect (all pages) --------
document.querySelectorAll('.action-btn').forEach(function(btn){
  btn.addEventListener('mouseenter', function(){
    btn.style.boxShadow = "0 0 24px #48f0e3, 0 0 10px #fa64a3";
  });
  btn.addEventListener('mouseleave', function(){
    btn.style.boxShadow = "";
  });
});

// -------- Card title hover color (all pages) --------
document.querySelectorAll('.hover-text, h3.hover-text').forEach(function(h){
  h.addEventListener('mouseenter', function(){
    h.style.color = "#fa64a3";
    h.style.textShadow = "0 0 16px #48f0e3";
  });
  h.addEventListener('mouseleave', function(){
    h.style.color = "";
    h.style.textShadow = "";
  });
});

// -------- Subpage: Back button smooth effect (popup1-5.html) --------
document.querySelectorAll('.back-link').forEach(btn=>{
  btn.addEventListener('click', function(e){
    e.preventDefault();
    window.location.href = "index.html";
  });
});

// -------- Subpage: Fade-in animation on load --------
window.addEventListener('DOMContentLoaded', function(){
  document.body.classList.add('page-loaded');
  let detail = document.querySelector('.detail-container');
  if(detail) detail.style.opacity = "1";
});

// -------- Subpage: Carousel for images/videos (popup1-5.html) --------
document.querySelectorAll('.detail-carousel').forEach(function(carousel){
  let slides = carousel.querySelectorAll('.carousel-item');
  let idx = 0;
  function showSlide(i){
    slides.forEach((s, n) => {
      if(n === i) {
        s.classList.add('active');
        s.style.opacity = "1";
        s.style.transition = "opacity 0.5s";
      } else {
        s.classList.remove('active');
        s.style.opacity = "0";
      }
    });
    carousel.setAttribute('data-idx', i);
  }
  let prevBtn = carousel.querySelector('.carousel-prev');
  let nextBtn = carousel.querySelector('.carousel-next');
  if(prevBtn && nextBtn){
    prevBtn.addEventListener('click', ()=>{
      idx = (idx - 1 + slides.length) % slides.length;
      showSlide(idx);
    });
    nextBtn.addEventListener('click', ()=>{
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    });
    showSlide(idx);
  }
});

// -------- Subpage: Popup keyword tooltip (popup1-5.html) --------
document.querySelectorAll('.popup-key').forEach(function(el){
  el.addEventListener('mouseenter', function(e){
    let pop = document.createElement('div');
    pop.className = 'popup-tooltip';
    pop.innerHTML = el.getAttribute('data-tip');
    document.body.appendChild(pop);
    let rect = el.getBoundingClientRect();
    // smart position (center above)
    let left = rect.left + window.scrollX + rect.width/2 - pop.offsetWidth/2;
    if(left < 6) left = 6;
    let top = rect.top + window.scrollY - pop.offsetHeight - 10;
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    el._tip = pop;
  });
  el.addEventListener('mouseleave', function(){
    if(el._tip) document.body.removeChild(el._tip);
    el._tip = null;
  });
});

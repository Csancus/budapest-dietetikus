(function(){
  var b=document.getElementById('burger'),m=document.getElementById('menu');
  if(b&&m){
    b.addEventListener('click',function(){
      var o=m.classList.toggle('open');
      b.setAttribute('aria-expanded',o?'true':'false');
    });
    m.addEventListener('click',function(e){if(e.target.tagName==='A'&&!e.target.classList.contains('nav__sub-toggle'))m.classList.remove('open');});
  }
  // Szakterületek legördülő – mobilon kattintásra nyílik
  var subT=document.querySelector('.nav__sub-toggle');
  if(subT){
    subT.addEventListener('click',function(e){
      if(window.innerWidth<=640){
        e.preventDefault();
        var li=subT.parentNode;
        var o=li.classList.toggle('open');
        subT.setAttribute('aria-expanded',o?'true':'false');
      }
    });
  }
  // nav árnyék görgetéskor
  var nav=document.querySelector('.nav');
  if(nav){addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>10);},{passive:true});}
  // scroll-reveal
  var rev=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window&&rev.length){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{threshold:.12});
    rev.forEach(function(el){io.observe(el);});
  }else{rev.forEach(function(el){el.classList.add('is-in');});}
  // aktív menüpont kiemelése
  var links={};
  document.querySelectorAll('.nav__links a[href^="#"]').forEach(function(a){links[a.getAttribute('href').slice(1)]=a;});
  var secs=document.querySelectorAll('main section[id]');
  if('IntersectionObserver'in window&&secs.length){
    var so=new IntersectionObserver(function(es){es.forEach(function(e){var l=links[e.target.id];if(l&&e.isIntersecting){for(var k in links)links[k].classList.remove('active');l.classList.add('active');}});},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){so.observe(s);});
  }
  // kapcsolati űrlap – FormSubmit AJAX
  var cf=document.getElementById('contactForm');
  if(cf){
    var st=document.getElementById('cformStatus');
    cf.addEventListener('submit',function(e){
      e.preventDefault();
      if(!cf.checkValidity()){cf.reportValidity();return;}
      var btn=cf.querySelector('.cform__submit');
      var orig=btn.textContent;
      btn.disabled=true;btn.textContent='Küldés…';
      if(st){st.className='cform__status';st.textContent='';}
      fetch(cf.action,{method:'POST',body:new FormData(cf),headers:{'Accept':'application/json'}})
        .then(function(r){return r.json();})
        .then(function(){
          cf.classList.add('sent');
          if(st){st.className='cform__status ok';st.textContent='✓ Köszönjük! Üzenetét megkaptuk, hamarosan válaszolunk.';}
        })
        .catch(function(){
          btn.disabled=false;btn.textContent=orig;
          if(st){st.className='cform__status err';st.textContent='Hiba történt a küldés során. Kérjük, próbálja újra, vagy hívjon minket telefonon.';}
        });
    });
  }
})();

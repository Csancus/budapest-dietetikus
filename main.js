(function(){
  var b=document.getElementById('burger'),m=document.getElementById('menu');
  if(b&&m){
    b.addEventListener('click',function(){
      var o=m.classList.toggle('open');
      b.setAttribute('aria-expanded',o?'true':'false');
    });
    m.addEventListener('click',function(e){if(e.target.tagName==='A')m.classList.remove('open');});
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
})();

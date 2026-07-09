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
      if(window.innerWidth<=980){
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
  // aktuális évszám behelyettesítése (pl. Árak oldal – "árak 2026")
  var yr=new Date().getFullYear();
  document.querySelectorAll('.js-year').forEach(function(e){e.textContent=yr;});

  // .form-card űrlapok – AJAX beküldés, oldalon belüli köszönő + szép validáció
  document.querySelectorAll('.form-card form').forEach(function(form){
    form.setAttribute('novalidate','novalidate');
    var card=form.closest('.form-card');
    function clearField(el){
      if(el.classList) el.classList.remove('is-invalid');
      var lab=el.closest('label');
      if(lab){ lab.classList.remove('is-invalid-check'); var fe=lab.querySelector('.f-err'); if(fe&&el.type==='checkbox') fe.remove(); }
      var sib=el.nextElementSibling;
      if(sib&&sib.classList&&sib.classList.contains('f-err')) sib.remove();
    }
    function msgFor(el){
      var v=el.validity;
      if(el.type==='checkbox') return 'Kérjük, fogadja el az adatkezelési tájékoztatót a folytatáshoz.';
      if(v.valueMissing) return 'Kérjük, töltse ki ezt a mezőt.';
      if(v.typeMismatch&&el.type==='email') return 'Adjon meg egy érvényes e-mail címet (pl. nev@example.hu) – ne maradjon ki a @ jel.';
      return 'Kérjük, ellenőrizze ezt a mezőt.';
    }
    function mark(el,msg){
      var span=document.createElement('span');span.className='f-err';span.textContent=msg;
      if(el.type==='checkbox'){var l=el.closest('label');l.classList.add('is-invalid-check');l.appendChild(span);}
      else{el.classList.add('is-invalid');el.insertAdjacentElement('afterend',span);}
    }
    form.addEventListener('input',function(e){clearField(e.target);});
    form.addEventListener('change',function(e){clearField(e.target);});
    form.addEventListener('submit',function(e){
      e.preventDefault();
      form.querySelectorAll('.f-err').forEach(function(n){n.remove();});
      form.querySelectorAll('.is-invalid').forEach(function(n){n.classList.remove('is-invalid');});
      form.querySelectorAll('.is-invalid-check').forEach(function(n){n.classList.remove('is-invalid-check');});
      var b=form.querySelector('.f-banner'); if(b) b.remove();
      var bad=[];
      form.querySelectorAll('input,select,textarea').forEach(function(el){
        if(el.type==='hidden'||el.name==='_honey') return;
        if(!el.checkValidity()) bad.push(el);
      });
      if(bad.length){ bad.forEach(function(el){mark(el,msgFor(el));}); bad[0].focus(); return; }
      var btn=form.querySelector('button[type=submit]');
      var orig=btn.innerHTML; btn.disabled=true; btn.textContent='Küldés…';
      var url=form.action.replace('formsubmit.co/','formsubmit.co/ajax/');
      fetch(url,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d&&(d.success===true||d.success==='true')){
            card.innerHTML='<div class="form-sent"><div class="form-sent__ic">✓</div><h3>Köszönjük az üzenetét!</h3><p>Megkaptuk a megkeresését, és általában 1–2 munkanapon belül válaszolunk.<br>Sürgős esetben hívjon minket: <a href="tel:+36209368458">+36 20 936 8458</a>.</p></div>';
            card.scrollIntoView({behavior:'smooth',block:'center'});
          } else { throw new Error('nem sikerült'); }
        })
        .catch(function(){
          btn.disabled=false; btn.innerHTML=orig;
          var ban=document.createElement('p'); ban.className='f-banner';
          ban.innerHTML='A küldés most nem sikerült. Kérjük, próbálja újra, vagy írjon közvetlenül: <a href="mailto:naturmed@ronaybarbara.hu">naturmed@ronaybarbara.hu</a>.';
          form.insertBefore(ban, btn);
        });
    });
  });
})();

(function(){
  // Csomag CTA (Időpontot foglalok / Jelentkezem): #idopont-hoz görget + a kiválasztott csomagot beírja az űrlapba
  var btns=document.querySelectorAll('.pkg a[href="#idopont"]');
  if(!btns.length) return;
  var ta=document.querySelector('textarea[name="Üzenet"]');
  var sel=document.querySelector('select[name="Érdeklődés"]');
  btns.forEach(function(a){
    a.addEventListener('click',function(){
      var card=a.closest('.pkg'); if(!card) return;
      var h=card.querySelector('h3'); var name=h?h.textContent.trim():''; if(!name) return;
      if(ta){
        var line='A(z) „'+name+'” csomag érdekel.';
        var prev=ta.getAttribute('data-pkg-auto');
        var cur=ta.value;
        if(prev){ cur=cur.split(prev).join('').replace(/^\s+|\s+$/g,''); }
        ta.value=(cur?cur+'\n\n':'')+line;
        ta.setAttribute('data-pkg-auto',line);
      }
      if(sel){
        var want=null;
        if(/START/i.test(name)) want=/START/i;
        else if(/Holisztikus/i.test(name)) want=/Holisztikus/i;
        else if(/Hozd magad/i.test(name)) want=/online/i;
        if(want){ for(var i=0;i<sel.options.length;i++){ if(want.test(sel.options[i].text)){ sel.selectedIndex=i; break; } } }
      }
    });
  });
})();

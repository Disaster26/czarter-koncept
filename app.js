(function(){
  var b=document.querySelector('.burger'),m=document.getElementById('menu');
  if(b&&m){
    b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');document.body.style.overflow=o?'hidden':''});
    m.addEventListener('click',function(e){if(e.target.closest('a')){m.classList.remove('open');b.setAttribute('aria-expanded','false');document.body.style.overflow=''}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('open')){b.click();b.focus()}});
  }

  /* karuzele: palec (natywnie), mysz (przeciąganie), strzałki, licznik */
  [].forEach.call(document.querySelectorAll('.karuzela'),function(g){
    var t=g.querySelector('.tor'),p=g.querySelector('.wstecz'),n=g.querySelector('.dalej'),l=g.querySelector('.licznik'),nv=g.querySelector('.nawig');
    var items=[].slice.call(t.children);
    function krok(){return Math.max(160,Math.min(t.clientWidth*0.85,(items[0]?items[0].getBoundingClientRect().width:300)+16))}
    function idx(){var x=t.scrollLeft,best=0;items.forEach(function(it,i){if(it.offsetLeft-t.offsetLeft<=x+8)best=i});return best}
    function stan(){
      var max=t.scrollWidth-t.clientWidth-2;
      if(nv)nv.classList.toggle('zbedna',max<=0);
      if(p)p.disabled=t.scrollLeft<=2; if(n)n.disabled=t.scrollLeft>=max;
      if(l)l.textContent=(t.scrollLeft>=max?items.length:idx()+1)+' / '+items.length;
    }
    if(p)p.addEventListener('click',function(){t.scrollBy({left:-krok(),behavior:'smooth'})});
    if(n)n.addEventListener('click',function(){t.scrollBy({left:krok(),behavior:'smooth'})});
    t.addEventListener('scroll',stan,{passive:true});window.addEventListener('resize',stan);
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();t.scrollBy({left:krok(),behavior:'smooth'})}if(e.key==='ArrowLeft'){e.preventDefault();t.scrollBy({left:-krok(),behavior:'smooth'})}});
    [].forEach.call(t.querySelectorAll('img'),function(i){if(!i.complete)i.addEventListener('load',stan)});
    stan();
    var x0=0,s0=0,dn=false,mv=false;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;if(t.scrollWidth<=t.clientWidth+2)return;dn=true;mv=false;x0=e.clientX;s0=t.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!dn)return;var d=e.clientX-x0;if(Math.abs(d)>5){mv=true;t.classList.add('ciag')}if(mv)t.scrollLeft=s0-d});
    window.addEventListener('pointerup',function(){if(!dn)return;dn=false;t.classList.remove('ciag');if(mv){var i=idx(),it=items[i],nx=items[i+1];var tgt=it?it.offsetLeft-t.offsetLeft:0;if(nx&&t.scrollLeft-tgt>(nx.offsetLeft-it.offsetLeft)/2)tgt=nx.offsetLeft-t.offsetLeft;t.scrollTo({left:tgt,behavior:'smooth'})}});
    t.addEventListener('click',function(e){if(mv){e.preventDefault();e.stopPropagation();mv=false}},true);
    t.addEventListener('dragstart',function(e){e.preventDefault()});
  });

  /* formularze pokazowe */
  [].forEach.call(document.querySelectorAll('form[data-pokaz]'),function(f){
    f.addEventListener('submit',function(e){e.preventDefault();var i=f.querySelector('.info-form');if(i)i.textContent='To wersja pokazowa: w gotowej stronie wiadomość trafi na adres czarter@o2.pl.'});
  });

  /* pasek mobilny po przewinięciu za pierwszy ekran */
  var mob=document.querySelector('.mob'),cel=document.querySelector('.hero,.podhero');
  if(mob&&cel&&'IntersectionObserver' in window){
    new IntersectionObserver(function(en){var w=!en[0].isIntersecting;mob.classList.toggle('widac',w);mob.setAttribute('aria-hidden',w?'false':'true')},{threshold:0}).observe(cel);
  }

  /* zgody na cookies */
  var z=document.querySelector('.zgody');
  if(z){
    var v=null;try{v=localStorage.getItem('cz-zgody')}catch(e){}
    if(!v)z.classList.add('pokaz');
    [].forEach.call(z.querySelectorAll('[data-zgoda]'),function(btn){btn.addEventListener('click',function(){try{localStorage.setItem('cz-zgody',btn.getAttribute('data-zgoda'))}catch(e){}z.classList.remove('pokaz')})});
  }
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
(function(){
  /* cennik: wybór jachtu na telefonie */
  var t=document.querySelector('.tab-cen'),bs=document.querySelectorAll('.przelacz button');
  [].forEach.call(bs,function(b){b.addEventListener('click',function(){t.setAttribute('data-pokaz',b.getAttribute('data-k'));[].forEach.call(bs,function(x){x.setAttribute('aria-pressed',x===b?'true':'false')})})});
})();

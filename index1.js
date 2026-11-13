/* Al-Mahir Pro - app.js
   Berisi: state pengguna, navigasi, tampilan halaman, game engine, dan UI pelajaran.
   Membutuhkan data.js */

/* ================= STATE ================= */
let S=null,user=null,tab='dashboard',lastSpeech='';
const KEY=n=>'almahirpro_'+n.toLowerCase();
const freshState=()=>({xp:100,streak:1,lastDay:today(),played:0,correct:0,custom:[],customQs:[],cards:{},daily:{date:today(),played:0,correct:0,xp:0,bonus:false},spins:{date:today(),n:0},best:{},dark:true,sound:true});
function save(){if(user&&S)localStorage.setItem(KEY(user.name),JSON.stringify(S))}
function loadUser(u){
 user=u;localStorage.setItem('almahirpro_user',JSON.stringify(u));
 S=Object.assign(freshState(),JSON.parse(localStorage.getItem(KEY(u.name))||'{}'));
 const t=today();
 if(S.lastDay!==t){const y=new Date(Date.now()-864e5).toLocaleDateString('en-CA');S.streak=S.lastDay===y?S.streak+1:1;S.lastDay=t}
 if(S.daily.date!==t)S.daily={date:t,played:0,correct:0,xp:0,bonus:false};
 if(S.spins.date!==t)S.spins={date:t,n:0};
 document.documentElement.dataset.theme=S.dark?'dark':'light';
 $('#btn-theme').textContent=S.dark?'🌙':'☀️';$('#btn-sound').textContent=S.sound?'🔊':'🔇';
 $('#auth-modal').classList.remove('show');
 $('#u-name').textContent=u.name;$('#u-av').textContent=u.name.charAt(0).toUpperCase();$('#u-role').textContent=u.role==='teacher'?'GURU':'MURID';
 save();updateHeader();buildNav();go('dashboard');
}
const WORDS=()=>DEFAULT_WORDS.concat(S&&S.custom?S.custom:[]);
function updateHeader(){
 const lv=Math.floor(S.xp/500)+1;
 $('#u-lv').textContent=lv;$('#u-xp').textContent=S.xp%500;$('#u-bar').style.width=(S.xp%500)/5+'%';
 $('#h-xp').textContent=S.xp;$('#h-streak').textContent=S.streak;
}
function addXP(n){
 const before=Math.floor(S.xp/500);
 S.xp=Math.max(0,S.xp+n);
 if(n>0){S.daily.xp+=n;checkBonus()}
 if(Math.floor(S.xp/500)>before){toast('🎉 Naik ke Level '+(Math.floor(S.xp/500)+1)+'!','gold');confetti(160);sfx('win')}
 updateHeader();save();
}
function bump(k,n=1){S.daily[k]=(S.daily[k]||0)+n;checkBonus()}
const MISSIONS=[{k:'played',l:'Mainkan 3 game',g:3,i:'🎮'},{k:'correct',l:'Jawab benar 15 soal',g:15,i:'✅'},{k:'xp',l:'Kumpulkan 150 XP hari ini',g:150,i:'💎'}];
function checkBonus(){
 if(S.daily.bonus)return;
 if(MISSIONS.every(m=>(S.daily[m.k]||0)>=m.g)){S.daily.bonus=true;S.xp+=100;toast('🏅 Semua misi harian selesai! Bonus +100 XP','gold');confetti(200);sfx('win')}
}

/* ================= SOUND / SPEECH / FX ================= */
let ac;
function sfx(t){
 if(!S||!S.sound)return;
 try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();
  const seq={ok:[[660,.08],[880,.12]],bad:[[220,.15],[150,.2]],click:[[520,.04]],win:[[523,.1],[659,.1],[784,.1],[1046,.3]]}[t]||[];
  let tt=ac.currentTime;
  seq.forEach(([f,d])=>{const o=ac.createOscillator(),g=ac.createGain();o.type=t==='bad'?'sawtooth':'sine';o.frequency.value=f;g.gain.setValueAtTime(.07,tt);g.gain.exponentialRampToValueAtTime(.001,tt+d);o.connect(g);g.connect(ac.destination);o.start(tt);o.stop(tt+d);tt+=d*.9});
 }catch(e){}
}
function confetti(n=120){
 const c=$('#confetti'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;
 const ps=Array.from({length:n},()=>({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*15,vy:Math.random()*-13-3,s:Math.random()*8+4,c:`hsl(${Math.random()*360},90%,60%)`,r:Math.random()*6}));
 let f=0;(function t(){x.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore()});if(++f<150)requestAnimationFrame(t);else x.clearRect(0,0,c.width,c.height)})();
}
let arVoice=null;
function pickVoice(){const v=speechSynthesis.getVoices();arVoice=v.find(x=>x.lang&&x.lang.toLowerCase().startsWith('ar'))||null}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function speak(text,rate=.9){
 lastSpeech=text;$('#float-t').textContent=text;
 if(!('speechSynthesis' in window)){toast('Browser belum mendukung suara','bad');return}
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text);u.lang='ar-SA';u.rate=rate;if(arVoice)u.voice=arVoice;
 u.onstart=()=>$('#waves').classList.remove('off');u.onend=u.onerror=()=>$('#waves').classList.add('off');
 speechSynthesis.speak(u);
 if(!arVoice&&!speak.warned){speak.warned=true;toast('Suara Arab belum terpasang di perangkat; pakai suara bawaan.','info')}
}
function toggleSound(){S.sound=!S.sound;$('#btn-sound').textContent=S.sound?'🔊':'🔇';save()}
function toggleTheme(){S.dark=!S.dark;document.documentElement.dataset.theme=S.dark?'dark':'light';$('#btn-theme').textContent=S.dark?'🌙':'☀️';save()}

/* ================= AUTH ================= */
let role='student';
function pickRole(r){role=r;$('#role-student').className='btn'+(r==='student'?' pri':'');$('#role-teacher').className='btn'+(r==='teacher'?' gold':'');$('#role-student').style.background=r==='student'?'':'none';$('#role-teacher').style.background=r==='teacher'?'':'none'}
function doLogin(e){e.preventDefault();const n=$('#auth-name').value.trim();if(n){loadUser({name:n,role});toast('Ahlan wa sahlan, '+n+'! 👋','ok')}}
function doGuest(){loadUser({name:'Tamu',role:'student'})}
function logout(){stopGame();save();localStorage.removeItem('almahirpro_user');user=null;$('#auth-modal').classList.add('show')}

/* ================= NAV ================= */
const NAV=[['dashboard','Beranda','fa-house'],['istima',"Istima'",'fa-headphones'],['qiraah',"Qira'ah",'fa-book-open'],['kitabah','Kitabah','fa-pen-nib'],['nahwu','Nahwu','fa-diagram-project'],['shorof','Shorof','fa-table-cells'],['mufrodat','Mufrodat','fa-layer-group'],['games','Arena Games','fa-gamepad'],['share','Bagikan','fa-share-nodes'],['manage','Kelola Guru','fa-sliders']];
const TITLES={dashboard:'Beranda',istima:"Maharah Istima' · Mendengar",qiraah:"Maharah Qira'ah · Membaca",kitabah:'Maharah Kitabah · Menulis',nahwu:'Ilmu Nahwu · Tata Bahasa',shorof:'Ilmu Shorof · Perubahan Kata',mufrodat:'Bank Mufrodat',games:'Arena Games',share:'Bagikan & Impor Materi',manage:'Kelola Materi Guru'};
function buildNav(){
 const h=NAV.map(([id,l,i])=>`<button data-t="${id}" onclick="go('${id}')"><i class="fas ${i}"></i>${l}</button>`).join('');
 $('#nav-side').innerHTML=h;$('#nav-bottom').innerHTML=h;$('#btn-logout-m').style.display='';
}
function go(t){
 if(t==='manage'&&user.role!=='teacher'){toast('Menu ini khusus Guru. Masuk sebagai Guru untuk membuka.','bad');return}
 stopGame();speechSynthesis&&speechSynthesis.cancel&&speechSynthesis.cancel();
 tab=t;$$('[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t===t));
 $('#title').textContent=TITLES[t];
 const v=$('#view');v.className='page-in';v.innerHTML=VIEWS[t]();
 (BIND[t]||(()=>{}))();scrollTo({top:0});
 setTimeout(()=>v.classList.remove('page-in'),500);
}

/* ================= DASHBOARD ================= */
const LB_MOCK=[['Ahmad Raihan',2450],['Fatimah Az-Zahra',2180],['Budi Santoso',1320],['Siti Nurhaliza',980],['Yusuf Maulana',640]];
function leaderboard(){
 const rows=LB_MOCK.concat([[user.name+' (kamu)',S.xp]]).sort((a,b)=>b[1]-a[1]);
 return rows.map((r,i)=>`<div class="lb ${r[0].includes('(kamu)')?'me':''}"><span class="rk">${['🥇','🥈','🥉'][i]||i+1}</span><div class="avatar" style="width:30px;height:30px;font-size:12px">${esc(r[0].charAt(0))}</div><b style="flex:1;font-size:13px">${esc(r[0])}</b><span style="font-weight:800;color:var(--c-gold)">${r[1]} XP</span></div>`).join('');
}
function vDashboard(){
 const ws=WORDS(),w=ws[dayHash()%ws.length],lv=Math.floor(S.xp/500)+1,pct=(S.xp%500)/5;
 const picks=[0,1,2].map(i=>GAMES[(dayHash()+i*5)%GAMES.length]);
 const ring=`<svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="9"/><circle cx="48" cy="48" r="40" fill="none" stroke="url(#g)" stroke-width="9" stroke-linecap="round" stroke-dasharray="${2.513*pct} 251.3" transform="rotate(-90 48 48)"/><defs><linearGradient id="g"><stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#2dd4bf"/></linearGradient></defs><text x="48" y="54" text-anchor="middle" fill="currentColor" font-size="24" font-weight="800">${lv}</text></svg>`;
 return `
 <div class="hero"><div class="row between" style="position:relative;z-index:1"><div><span class="pill">👋 Ahlan, ${esc(user.name)}</span><h3 style="margin:12px 0 8px">Mari taklukkan Bahasa Arab, satu kata setiap hari!</h3><p class="muted" style="max-width:480px">Belajar mendengar, membaca, menulis, lalu uji dirimu lewat pelajaran Nahwu & Shorof serta ${GAMES.length} permainan seru berhadiah XP dan kartu langka.</p><div class="row" style="margin-top:16px"><button class="btn pri" onclick="go('games')">🎮 Main Sekarang</button><button class="btn" onclick="go('mufrodat')">📚 Belajar Kata</button></div></div><div class="center" style="color:var(--c-text)">${ring}<div class="muted" style="margin-top:4px">Level ${lv}</div></div></div></div>
 <div class="grid g4" style="margin-top:18px">
  <div class="card stat"><div class="ic" style="background:rgba(251,191,36,.18)">💎</div><div><b>${S.xp}</b><span class="muted">Total XP</span></div></div>
  <div class="card stat"><div class="ic" style="background:rgba(251,113,133,.18)">🔥</div><div><b>${S.streak}</b><span class="muted">Hari beruntun</span></div></div>
  <div class="card stat"><div class="ic" style="background:rgba(96,165,250,.18)">✅</div><div><b>${S.correct}</b><span class="muted">Jawaban benar</span></div></div>
  <div class="card stat"><div class="ic" style="background:rgba(139,92,246,.18)">🃏</div><div><b>${Object.keys(S.cards).length}/${WORDS().length}</b><span class="muted">Kartu koleksi</span></div></div>
 </div>
 <div class="grid g2" style="margin-top:18px">
  <div class="card"><h4 style="font-weight:800;margin-bottom:6px">🎯 Misi Harian</h4>${MISSIONS.map(m=>{const v=Math.min(S.daily[m.k]||0,m.g);return `<div class="mission"><div class="row between"><span style="font-size:13px;font-weight:700">${m.i} ${m.l}</span><span class="muted">${v}/${m.g}</span></div><div class="bar"><i style="width:${v/m.g*100}%"></i></div></div>`}).join('')}<p class="muted" style="margin-top:8px">${S.daily.bonus?'🏅 Bonus +100 XP sudah diklaim hari ini!':'Selesaikan ketiganya untuk bonus +100 XP.'}</p></div>
  <div class="card center" style="display:flex;flex-direction:column;justify-content:center;gap:6px"><span class="pill" style="align-self:center">✨ Kata Hari Ini</span><div style="font-size:54px">${w.e}</div><div class="ar" style="font-size:54px;font-weight:700;color:var(--c-gold)">${w.a}</div><div style="font-size:20px;font-weight:800">${esc(w.m)}</div><div class="muted">Kategori: ${esc(w.c)}</div><div><button class="btn vio sm" data-say="${esc(w.a)}" style="margin-top:6px">🔊 Dengar</button></div></div>
 </div>
 <h4 style="font-weight:800;margin:26px 0 12px">Mulai Belajar</h4>
 <div class="grid g3">
  <button class="tile" onclick="go('istima')"><span class="e">🎧</span><b>Istima'</b><span class="muted">Dengar & tirukan</span></button>
  <button class="tile" onclick="go('qiraah')"><span class="e">📖</span><b>Qira'ah</b><span class="muted">Baca & pahami</span></button>
  <button class="tile" onclick="go('kitabah')"><span class="e">✍️</span><b>Kitabah</b><span class="muted">Ketik huruf Arab</span></button>
  <button class="tile" onclick="go('mufrodat')"><span class="e">🗂️</span><b>Mufrodat</b><span class="muted">${WORDS().length} kata</span></button>
  <button class="tile" onclick="go('nahwu')"><span class="e">🏛️</span><b>Nahwu</b><span class="muted">${NAHWU.length} pelajaran</span></button>
  <button class="tile" onclick="go('shorof')"><span class="e">🧬</span><b>Shorof</b><span class="muted">${SHOROF.length} pelajaran</span></button>
 </div>
 <h4 style="font-weight:800;margin:26px 0 12px">Game Pilihan Hari Ini</h4>
 <div class="grid g3">${picks.map(g=>gameCard(g)).join('')}</div>
 <div class="card" style="margin-top:22px"><h4 style="font-weight:800;margin-bottom:8px">🏆 Papan Peringkat</h4>${leaderboard()}</div>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b)speak(b.dataset.say)});

/* ================= ISTIMA ================= */
function _vIstimaBase(){
 return `<div class="card"><div class="row between"><div><h3 style="font-weight:800">🎧 Latihan Mendengar</h3><p class="muted">Ketuk kata untuk mendengar. Tombol 🐢 memutar lebih lambat.</p></div><button class="btn vio" onclick="openGame('listen')">🎮 Uji Telingamu</button></div></div>
 <h4 style="font-weight:800;margin:22px 0 12px">Kalimat</h4>
 <div class="grid g2">${SENTENCES.map(s=>`<div class="card row between" style="flex-wrap:nowrap;padding:16px"><div><div class="ar" style="font-size:26px;font-weight:700;color:var(--c-gold)">${s.ar}</div><div class="muted">${esc(s.id)}</div></div><div class="row" style="flex-wrap:nowrap;gap:6px"><button class="ic-btn" data-say="${esc(s.ar)}">🔊</button><button class="ic-btn" data-slow="${esc(s.ar)}">🐢</button></div></div>`).join('')}</div>
 <h4 style="font-weight:800;margin:22px 0 12px">Kosakata</h4>
 <div class="grid auto">${WORDS().map(w=>`<div class="wcard"><div><span class="em">${w.e}</span><div class="ar">${w.a}</div><div class="muted">${esc(w.m)}</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="ic-btn" data-say="${esc(w.a)}">🔊</button><button class="ic-btn" data-slow="${esc(w.a)}">🐢</button></div></div>`).join('')}</div>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-slow]');if(b)speak(b.dataset.slow,.45)});

/* ================= QIRA'AH ================= */
function lookup(tok){
 const t=nrm(tok).replace(/[.،؟!,:]/g,'');
 const map={};
 WORDS().forEach(w=>{const k=nrm(w.a),m=w.m;[k,k.replace(/^ال/,''),k.replace(/ة$/,'ه'),k.replace(/ة$/,''),k.replace(/^ال/,'').replace(/ة$/,'')].forEach(x=>{if(x&&!map[x])map[x]=m})});
 const cands=new Set([t]);
 ['و','ف','ب','ل','ك'].forEach(p=>{if(t.startsWith(p)&&t.length>3)cands.add(t.slice(1))});
 [...cands].forEach(c=>{cands.add(c.replace(/^ال/,''));cands.add(c.replace(/^لل/,''));cands.add(c.replace(/ه$/,'ة'));cands.add(c.replace(/[ةه]$/,''));cands.add(c.replace(/ي$/,''));cands.add(c.replace(/(ات|ون|ين)$/,''))});
 for(const k of cands){if(map[k])return map[k];if(EXTRA_DICT[k])return EXTRA_DICT[k]}
 return null;
}
function tapWords(text){return text.split(' ').map(w=>`<span class="word-tap" data-w="${esc(w)}">${w}</span>`).join(' ')}
function vQiraah(){
 return `<div class="card"><h3 style="font-weight:800">📖 Membaca Teks Arab</h3><p class="muted">Ketuk kata mana pun untuk melihat artinya. Lalu jawab pertanyaan pemahaman.</p>
 <div id="dict" class="note" style="margin-top:14px">👆 Ketuk sebuah kata Arab di bawah…</div></div>
 <h4 style="font-weight:800;margin:22px 0 12px">Kalimat Latihan</h4>
 <div class="grid g2">${SENTENCES.map(s=>`<div class="card" style="padding:18px"><div class="ar" style="font-size:28px;font-weight:700;color:var(--c-gold);text-align:right">${tapWords(s.ar)}</div><details style="margin-top:8px"><summary class="muted" style="cursor:pointer">Lihat terjemahan</summary><div style="margin-top:6px;font-weight:600">${esc(s.id)}</div></details></div>`).join('')}</div>
 <h4 style="font-weight:800;margin:22px 0 12px">Bacaan & Pertanyaan</h4>
 ${PASSAGES.map((p,pi)=>`<div class="card" style="margin-bottom:16px"><div class="row between"><b>${esc(p.t)}</b><button class="btn sm vio" data-say="${esc(p.ar)}">🔊 Bacakan</button></div><div class="ar" style="font-size:28px;font-weight:700;color:var(--c-gold);margin:12px 0;text-align:right">${tapWords(p.ar)}</div><details><summary class="muted" style="cursor:pointer">Terjemahan</summary><p style="margin-top:6px">${esc(p.id)}</p></details>
 ${p.qs.map((q,qi)=>`<div style="margin-top:16px"><div style="font-weight:700;font-size:14px;margin-bottom:8px">${qi+1}. ${esc(q.q)}</div><div class="grid g2" style="gap:8px">${q.o.map((o,oi)=>`<button class="opt" style="min-height:0;padding:11px;font-size:13px" data-p="${pi}" data-q="${qi}" data-o="${oi}">${esc(o)}</button>`).join('')}</div></div>`).join('')}</div>`).join('')}`;
}
function bQiraah(){
 $('#view').onclick=e=>{
  const w=e.target.closest('.word-tap');
  if(w){const m=lookup(w.dataset.w);const d=$('#dict');d.className='note '+(m?'ok':'');d.innerHTML=`<span class="ar" style="font-size:24px">${w.dataset.w}</span> → ${m?esc(m):'<i>belum ada di kamus mini</i>'}`;speak(w.dataset.w);return}
  const o=e.target.closest('[data-o]');
  if(o&&!o.disabled){const q=PASSAGES[+o.dataset.p].qs[+o.dataset.q],ok=+o.dataset.o===q.a;sfx(ok?'ok':'bad');
   $$(`[data-p="${o.dataset.p}"][data-q="${o.dataset.q}"]`).forEach(b=>{b.disabled=true;if(+b.dataset.o===q.a)b.classList.add('ok')});
   if(ok){addXP(15);S.correct++;bump('correct');toast('Benar! +15 XP','ok')}else{o.classList.add('no');toast('Kurang tepat, perhatikan jawaban hijau.','bad')}}
 };
}

/* ================= KITABAH ================= */
let kw=null,kStreak=0;
function kbHTML(){return AR_KEYS.map(k=>`<button class="key" data-k="${k}">${k}</button>`).join('')+HARAKAT.map(h=>`<button class="key" data-k="${h}">◌${h}</button>`).join('')+`<button class="key fn" data-k="SP">spasi</button><button class="key fn" data-k="BS">⌫</button>`}
function bindKb(root,input){root.onclick=e=>{const b=e.target.closest('[data-k]');if(!b)return;sfx('click');const k=b.dataset.k;if(k==='BS')input.value=input.value.slice(0,-1);else if(k==='SP')input.value+=' ';else input.value+=k;input.dispatchEvent(new Event('input'))}}
function vKitabah(){
 return `<div class="card center" style="max-width:680px;margin:0 auto"><span class="pill">Streak benar: <b id="k-st">0</b></span>
 <p class="muted" style="margin-top:14px">Ketik kata Arab berikut (harakat tidak wajib):</p>
 <div class="big-emoji" id="k-e"></div><div class="big-txt" id="k-m"></div>
 <input class="f ar" id="k-in" dir="rtl" autocomplete="off" style="font-size:34px;text-align:center;margin:8px 0 16px" ${'ontouchstart' in window?'inputmode="none"':''}>
 <div class="keys" id="k-kb">${kbHTML()}</div>
 <div class="row" style="justify-content:center;margin-top:18px"><button class="btn" onclick="kNext()">⏭ Kata Lain</button><button class="btn vio" onclick="speak(kw.a)">🔊 Dengar</button><button class="btn" onclick="$('#k-in').value=''">Hapus</button><button class="btn gold" onclick="$('#k-in').value=kw.a">💡 Contekan</button></div>
 <div class="note" id="k-note" style="margin-top:16px">Mulailah mengetik…</div></div>`;
}
function kNext(){kw=rand(WORDS());$('#k-e').textContent=kw.e;$('#k-m').textContent=kw.m;$('#k-in').value='';$('#k-note').className='note';$('#k-note').textContent='Mulailah mengetik…'}
function bKitabah(){
 const inp=$('#k-in');bindKb($('#k-kb'),inp);kNext();
 inp.oninput=()=>{if(nrm(inp.value)===nrm(kw.a)&&inp.value.length){sfx('ok');kStreak++;addXP(20);S.correct++;bump('correct');$('#k-st').textContent=kStreak;$('#k-note').className='note ok';$('#k-note').innerHTML=`✅ Benar! <span class="ar" style="font-size:22px">${kw.a}</span> +20 XP`;confetti(40);setTimeout(kNext,1300)}};
}

/* ================= MUFRODAT ================= */
let mCat='Semua',mQ='';
function vMufrodat(){
 const cats=['Semua',...new Set(WORDS().map(w=>w.c))];
 return `<div class="row between"><div class="row"><input class="f" id="m-q" placeholder="🔍 Cari kata / arti…" style="width:260px" value="${esc(mQ)}"></div><div class="row"><button class="btn vio" onclick="fcOpen()">🃏 Kartu Kilat</button><button class="btn pri" onclick="openM('add-modal')">+ Tambah Kata</button></div></div>
 <div class="row" style="margin:14px 0" id="m-cats">${cats.map(c=>`<button class="chip ${c===mCat?'on':''}" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div>
 <div class="grid auto" id="m-grid"></div>`;
}
function mRender(){
 const q=mQ.trim().toLowerCase();
 const list=WORDS().filter(w=>(mCat==='Semua'||w.c===mCat)&&(!q||strip(w.a).includes(q)||w.m.toLowerCase().includes(q)));
 $('#m-grid').innerHTML=list.length?list.map(w=>`<div class="wcard"><div><span class="em">${w.e}</span><div class="ar">${w.a}</div><div class="muted">${esc(w.m)} · ${esc(w.c)}</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="ic-btn" data-say="${esc(w.a)}">🔊</button>${w.custom?`<button class="ic-btn" style="background:rgba(251,113,133,.18);color:var(--c-rose)" data-del="${esc(w.a)}">🗑</button>`:''}</div></div>`).join(''):'<p class="muted">Tidak ada kata yang cocok.</p>';
}
function bMufrodat(){
 mRender();$('#m-q').oninput=e=>{mQ=e.target.value;mRender()};
 $('#m-cats').onclick=e=>{const b=e.target.closest('[data-c]');if(b){mCat=b.dataset.c;$$('#m-cats .chip').forEach(c=>c.classList.toggle('on',c===b));mRender()}};
 $('#m-grid').onclick=e=>{const b=e.target.closest('[data-del]');if(b){S.custom=S.custom.filter(w=>w.a!==b.dataset.del);save();mRender();toast('Kata dihapus','info')}};
}
function saveWord(){
 const a=$('#aw-a').value.trim(),m=$('#aw-m').value.trim();
 if(!a||!m)return toast('Isi kata Arab dan artinya','bad');
 S.custom.push({a,m,c:$('#aw-c').value.trim()||'Umum',e:$('#aw-e').value.trim()||'🔤',custom:true});save();
 ['aw-a','aw-m'].forEach(i=>$('#'+i).value='');closeM('add-modal');toast('Mufrodat ditambahkan ✅','ok');if(tab==='mufrodat'||tab==='manage')go(tab);
}
let fcDeck=[],fcI=0;
function fcOpen(){fcDeck=shuffle(WORDS());fcI=0;fcShow();openM('fc-modal')}
function fcShow(){const w=fcDeck[fcI];$('#fc').classList.remove('flip');$('#fc-e').textContent=w.e;$('#fc-a').textContent=w.a;$('#fc-m').textContent=w.m;$('#fc-n').textContent=(fcI+1)+' / '+fcDeck.length}
function fcMove(d){fcI=(fcI+d+fcDeck.length)%fcDeck.length;fcShow();sfx('click')}

/* ================= GACHA ================= */
const RAR=[['common',60],['rare',25],['epic',11],['legendary',4]];
function renderColl(){
 const ws=WORDS();$('#coll-count').textContent=Object.keys(S.cards).length+'/'+ws.length;
 $('#coll').innerHTML=ws.map(w=>{const c=S.cards[w.a];return `<div class="${c?'r-'+c:'lock'}" title="${esc(w.m)}">${c?w.a:'?'}</div>`}).join('');
}
function openGacha(){renderColl();openM('gacha-modal')}
function rollGacha(){
 if(S.xp<50)return toast('XP belum cukup (butuh 50)','bad');
 addXP(-50);
 let r=Math.random()*100,rar='common';for(const [k,w] of RAR){if(r<w){rar=k;break}r-=w}
 const w=rand(WORDS()),order=['common','rare','epic','legendary'];
 const old=S.cards[w.a];if(!old||order.indexOf(rar)>order.indexOf(old))S.cards[w.a]=rar;
 const c=$('#gc');c.className='gacha-card '+rar;$('#gc-r').textContent=rar.toUpperCase()+(old?' · DUPLIKAT':' · BARU!');$('#gc-a').textContent=w.a;$('#gc-m').textContent=w.e+' '+w.m;
 sfx(rar==='common'?'ok':'win');if(rar==='epic'||rar==='legendary')confetti(120);save();renderColl();
}

/* ================= SHARE ================= */
function pkg(){return {version:'pro',exportedAt:new Date().toISOString(),author:user.name,words:S.custom,questions:S.customQs}}
function b64(o){return 'ALMP-'+btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
function unb64(s){return JSON.parse(decodeURIComponent(escape(atob(s.trim().replace(/^ALMP-/,'')))))}
function mergePkg(d){
 let n=0;const have=new Set(WORDS().map(w=>nrm(w.a)));
 const list=(d.words||[]).concat((d.mufrodat||[]).map(x=>({a:x.a||x.arabic,m:x.m||x.meaning,c:x.c||x.category||'Impor',e:x.e||'🔤'})));
 list.forEach(w=>{if(w&&w.a&&w.m&&!have.has(nrm(w.a))){S.custom.push({a:w.a,m:w.m,c:w.c||'Impor',e:w.e||'🔤',custom:true});have.add(nrm(w.a));n++}});
 let q=0;(d.questions||[]).forEach(x=>{if(x&&x.q&&Array.isArray(x.opts)&&x.opts.length===4&&typeof x.correct==='number'){S.customQs.push({q:x.q,opts:x.opts,correct:x.correct});q++}});
 save();addXP(25);toast(`Impor berhasil: ${n} kata, ${q} soal baru (+25 XP)`,'ok');
}
function vShare(){
 const teacher=user.role==='teacher';
 return `<div class="grid g2">
  ${teacher?`<div class="card"><h4 style="font-weight:800;color:var(--c-gold)">👩‍🏫 Panel Guru</h4><p class="muted" style="margin:6px 0 14px">Bagikan kata & soal buatanmu ke murid.</p><div class="row"><button class="btn pri" onclick="exportJSON()">⬇ Unduh Paket JSON</button><button class="btn vio" onclick="copyCode()">📋 Salin Kode Kelas</button></div><p class="muted" style="margin-top:12px">Berisi ${S.custom.length} kata & ${S.customQs.length} soal kustom.</p></div>`:''}
  <div class="card"><h4 style="font-weight:800;color:var(--c-teal)">📥 Impor Materi</h4>
   <label class="l">File JSON</label><input class="f" type="file" accept=".json" id="imp-file">
   <label class="l">Atau tempel Kode Kelas</label><div class="row" style="flex-wrap:nowrap"><input class="f" id="imp-code" placeholder="ALMP-…"><button class="btn pri" onclick="importCode()">Gabung</button></div></div>
 </div>
 <div class="card" style="margin-top:18px"><h4 style="font-weight:800;margin-bottom:8px">🏆 Papan Peringkat Kelas</h4>${leaderboard()}</div>`;
}
function bShare(){const f=$('#imp-file');if(f)f.onchange=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{mergePkg(JSON.parse(r.result))}catch(err){toast('File JSON tidak valid','bad')}};r.readAsText(file)}}
function exportJSON(){const a=document.createElement('a');a.href='data:application/json;charset=utf-8,'+encodeURIComponent(JSON.stringify(pkg(),null,2));a.download='materi_almahir_'+Date.now()+'.json';document.body.appendChild(a);a.click();a.remove();toast('Paket JSON diunduh','ok')}
function copyCode(){navigator.clipboard.writeText(b64(pkg())).then(()=>toast('Kode kelas disalin! Kirim ke murid.','ok')).catch(()=>toast('Gagal menyalin','bad'))}
function importCode(){const v=$('#imp-code').value.trim();if(!v)return toast('Tempel kode kelas dulu','bad');try{mergePkg(unb64(v));$('#imp-code').value=''}catch(e){toast('Kode kelas tidak valid','bad')}}

/* ================= MANAGE (GURU) ================= */
function vManage(){
 return `<div class="grid g2">
 <div class="card"><h4 style="font-weight:800">➕ Tambah Mufrodat</h4>
  <label class="l">Kata Arab</label><input class="f ar" id="cm-a" dir="rtl" style="font-size:24px"><label class="l">Arti</label><input class="f" id="cm-m">
  <div class="grid g2"><div><label class="l">Kategori</label><input class="f" id="cm-c" value="Umum"></div><div><label class="l">Emoji</label><input class="f" id="cm-e" value="🔤"></div></div>
  <button class="btn pri" style="margin-top:14px" onclick="cmAdd()">Simpan</button>
  <label class="l" style="margin-top:18px">Impor massal (satu baris: arab|arti|kategori|emoji)</label><textarea class="f" id="cm-bulk" rows="4" placeholder="سَيَّارَةٌ|Mobil|Transportasi|🚗"></textarea>
  <button class="btn" style="margin-top:10px" onclick="cmBulk()">Impor Baris</button></div>
 <div class="card"><h4 style="font-weight:800">❓ Tambah Soal Kuis (Kahoot)</h4>
  <label class="l">Pertanyaan</label><input class="f" id="cq-q"><label class="l">4 Pilihan (jawaban benar pilihan A)</label>
  ${[0,1,2,3].map(i=>`<input class="f" style="margin-bottom:6px" id="cq-${i}" placeholder="Pilihan ${'ABCD'[i]}${i?'':' (BENAR)'}">`).join('')}
  <button class="btn vio" onclick="cqAdd()">Simpan Soal</button><p class="muted" style="margin-top:8px">${S.customQs.length} soal kustom tersimpan. Pilihan akan diacak otomatis saat bermain.</p></div></div>
 <div class="card" style="margin-top:18px"><h4 style="font-weight:800;margin-bottom:10px">Kata Buatan Kamu (${S.custom.length})</h4><div class="grid auto">${S.custom.length?S.custom.map(w=>`<div class="wcard"><div><span class="em">${w.e}</span><div class="ar">${w.a}</div><div class="muted">${esc(w.m)}</div></div><button class="ic-btn" style="background:rgba(251,113,133,.18);color:var(--c-rose)" data-del2="${esc(w.a)}">🗑</button></div>`).join(''):'<p class="muted">Belum ada.</p>'}</div></div>
 <div class="card" style="margin-top:18px"><h4 style="font-weight:800;margin-bottom:6px">⚠️ Zona Reset</h4><button class="btn red sm" onclick="if(confirm('Reset XP & progres akun ini?')){const c=S.custom,q=S.customQs;S=Object.assign(freshState(),{custom:c,customQs:q});save();updateHeader();go('dashboard')}">Reset Progres Akun</button></div>`;
}
function bManage(){$('#view').onclick=e=>{const b=e.target.closest('[data-del2]');if(b){S.custom=S.custom.filter(w=>w.a!==b.dataset.del2);save();go('manage')}}}
function cmAdd(){const a=$('#cm-a').value.trim(),m=$('#cm-m').value.trim();if(!a||!m)return toast('Isi kata dan arti','bad');S.custom.push({a,m,c:$('#cm-c').value.trim()||'Umum',e:$('#cm-e').value.trim()||'🔤',custom:true});save();toast('Tersimpan ✅','ok');go('manage')}
function cmBulk(){let n=0;$('#cm-bulk').value.split('\n').forEach(l=>{const p=l.split('|').map(x=>x.trim());if(p[0]&&p[1]){S.custom.push({a:p[0],m:p[1],c:p[2]||'Umum',e:p[3]||'🔤',custom:true});n++}});save();toast(n+' kata diimpor','ok');go('manage')}
function cqAdd(){const q=$('#cq-q').value.trim(),o=[0,1,2,3].map(i=>$('#cq-'+i).value.trim());if(!q||o.some(x=>!x))return toast('Lengkapi pertanyaan & 4 pilihan','bad');S.customQs.push({q,opts:o,correct:0});save();toast('Soal tersimpan ✅','ok');go('manage')}

/* ================= GAME ENGINE ================= */
const G={id:null,score:0,cleanups:[],ended:false,correct:0,total:0};
function later(fn,ms){const t=setTimeout(fn,ms);G.cleanups.push(()=>clearTimeout(t));return t}
function every(fn,ms){const t=setInterval(fn,ms);G.cleanups.push(()=>clearInterval(t));return t}
function stopGame(){G.cleanups.forEach(f=>f());G.cleanups=[]}
function countdown(sec,tick,end){let s=sec;const t=setInterval(()=>{s--;tick(s);if(s<=0){clearInterval(t);end()}},1000);G.cleanups.push(()=>clearInterval(t));return t}
function stage(h){$('#stage-body').innerHTML=h}
function setHud(o){
 for(const k of['score','lives','time','round']){const el=$('#h-'+k);if(!el)continue;if(k in o){el.hidden=false;el.innerHTML=k==='lives'?'❤️'.repeat(Math.max(0,o[k]))+'🖤'.repeat(Math.max(0,(G.maxLives||o[k])-o[k])):({score:'⭐ ',time:'⏱ ',round:'🎯 '}[k]+o[k])}}
}
function note(ok,w){const n=$('#stage-note');n.className='note '+(ok?'ok':'bad');n.innerHTML=(ok?'✅ Benar! ':'❌ Kurang tepat. ')+`<span class="ar" style="font-size:22px">${w.a}</span> = ${esc(w.m)}`}
function judge(ok,w){sfx(ok?'ok':'bad');G.total++;if(ok){G.correct++;S.correct++;bump('correct')}if(w)note(ok,w)}
function choices(t,n=4){return shuffle([t,...shuffle(WORDS().filter(w=>w.a!==t.a&&w.m!==t.m)).slice(0,n-1)])}
function endGame(o){
 if(G.ended)return;G.ended=true;stopGame();
 const xp=Math.max(0,Math.round(o.xp||0)),prev=S.best[G.id]||0,rec=G.score>prev;
 if(rec)S.best[G.id]=G.score;S.played++;bump('played');addXP(xp);
 $('#res-emoji').textContent=o.emoji||(o.win===false?'💪':'🏆');$('#res-title').textContent=o.title||(o.win===false?'Coba lagi!':'Selesai!');
 $('#res-line').textContent=o.line||'';$('#res-score').textContent=G.score;$('#res-xp').textContent=xp;
 $('#res-best').textContent=rec&&G.score>0?'🎖 Rekor baru!':'Rekor terbaik: '+Math.max(prev,G.score);
 if(o.win!==false&&xp>0){sfx('win');confetti(140)}else sfx('bad');
 later(()=>openM('res-modal'),400);
}
function closeRes(){closeM('res-modal')}
function replay(){closeRes();openGame(G.id)}
function backHub(){stopGame();$('#arena').hidden=true;$('#hub').hidden=false;speechSynthesis&&speechSynthesis.cancel()}

/* ---------- GAME REGISTRY ---------- */
const GAMES=[
{id:'fishing',n:'Mancing Kata',e:'🎣',d:'Tangkap ikan berisi kata Arab yang artinya cocok.',g:'linear-gradient(135deg,#06b6d4,#2563eb)',t:'Kosakata',run:gFishing},
{id:'space',n:'Perang Antariksa',e:'🚀',d:'Hancurkan roket kata sebelum mendarat!',g:'linear-gradient(135deg,#4f46e5,#1e1b4b)',t:'Refleks',run:gSpace},
{id:'puzzle',n:'Puzzle Kalimat',e:'🧩',d:'Susun potongan kata menjadi kalimat Arab.',g:'linear-gradient(135deg,#f43f5e,#be185d)',t:'Logika',run:gPuzzle},
{id:'doodle',n:'Tebak Gambar',e:'🖼️',d:'Lihat emoji, pilih kata Arabnya.',g:'linear-gradient(135deg,#10b981,#0f766e)',t:'Kosakata',run:gDoodle},
{id:'tug',n:'Tarik Tambang',e:'🪢',d:'Jawab cepat, lawan terus menarik talinya!',g:'linear-gradient(135deg,#f59e0b,#c2410c)',t:'Refleks',run:gTug},
{id:'wheel',n:'Roda Keberuntungan',e:'🎡',d:'Putar roda dan menangkan XP (3x per hari).',g:'linear-gradient(135deg,#a855f7,#6d28d9)',t:'Santai',run:gWheel},
{id:'kahoot',n:'Kuis Kilat 4 Warna',e:'⚡',d:'10 soal, 15 detik, combo multiplier.',g:'linear-gradient(135deg,#ef4444,#9f1239)',t:'Refleks',run:gKahoot},
{id:'memory',n:'Kartu Memori',e:'🧠',d:'Cocokkan kata Arab dengan artinya.',g:'linear-gradient(135deg,#8b5cf6,#4338ca)',t:'Logika',run:gMemory,nw:1},
{id:'hangman',n:'Tebak Huruf',e:'🔤',d:'Tebak huruf kata Arab sebelum nyawa habis.',g:'linear-gradient(135deg,#0ea5e9,#4f46e5)',t:'Logika',run:gHangman,nw:1},
{id:'scramble',n:'Susun Huruf',e:'🔀',d:'Urutkan huruf acak jadi kata yang benar.',g:'linear-gradient(135deg,#ec4899,#9d174d)',t:'Logika',run:gScramble,nw:1},
{id:'tf',n:'Benar atau Salah',e:'⚖️',d:'30 detik menilai pasangan kata & arti.',g:'linear-gradient(135deg,#3b82f6,#0369a1)',t:'Refleks',run:gTF,nw:1},
{id:'whack',n:'Tangkap Kata',e:'🔨',d:'Pukul kata yang tepat saat muncul dari lubang!',g:'linear-gradient(135deg,#84cc16,#15803d)',t:'Refleks',run:gWhack,nw:1},
{id:'listen',n:'Dengar & Tebak',e:'👂',d:'Dengarkan kata Arab, pilih artinya.',g:'linear-gradient(135deg,#06b6d4,#7c3aed)',t:'Dengar',run:gListen,nw:1},
{id:'type',n:'Balap Ketik',e:'🏎️',d:'Ketik kata Arab secepat mungkin sampai garis finis.',g:'linear-gradient(135deg,#f97316,#be123c)',t:'Refleks',run:gType,nw:1}
];
function gameCard(g){return `<div class="gcard" style="background:${g.g}" onclick="openGame('${g.id}')"><div><span class="tag">${g.t}</span>${g.nw?'<span class="tag new">BARU</span>':''}</div><span class="big">${g.e}</span><div><h4>${g.e} ${g.n}</h4><p>${g.d}</p>${S.best[g.id]?`<p style="margin-top:6px;font-weight:800">🏅 Rekor: ${S.best[g.id]}</p>`:''}</div></div>`}
let gFilter='Semua';
function vGames(){
 const tags=['Semua','Kosakata','Nahwu','Refleks','Logika','Dengar','Santai'];
 return `<div id="hub">
  <div class="hero" style="padding:24px"><div class="row between" style="position:relative;z-index:1"><div><span class="pill">🎮 ${GAMES.length} permainan</span><h3 style="margin-top:10px">Arena Games Al-Mahir</h3><p class="muted">Main, kumpulkan XP, buka kartu langka di mesin gacha!</p></div><button class="btn gold" onclick="openGacha()">🎁 Mesin Gacha & Koleksi</button></div></div>
  <div class="row" style="margin:18px 0" id="g-tags">${tags.map(t=>`<button class="chip ${t===gFilter?'on':''}" data-tag="${t}">${t}</button>`).join('')}</div>
  <div class="grid auto" id="g-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))"></div></div>
 <div id="arena" hidden>
  <div class="row between" style="margin-bottom:14px"><button class="btn sm" onclick="backHub()">← Hub</button><b id="arena-title" style="font-size:17px"></b><div class="hud"><span class="pill" id="h-score" hidden></span><span class="pill" id="h-lives" hidden></span><span class="pill" id="h-time" hidden></span><span class="pill" id="h-round" hidden></span></div></div>
  <div class="card" id="stage-body"></div><div class="note" id="stage-note">Siap bermain!</div></div>`;
}
function gGrid(){$('#g-grid').innerHTML=GAMES.filter(g=>gFilter==='Semua'||g.t===gFilter).map(gameCard).join('')}
function bGames(){gGrid();$('#g-tags').onclick=e=>{const b=e.target.closest('[data-tag]');if(b){gFilter=b.dataset.tag;$$('#g-tags .chip').forEach(c=>c.classList.toggle('on',c===b));gGrid()}}}
function openGame(id){
 if(tab!=='games'){go('games')}
 const g=GAMES.find(x=>x.id===id);stopGame();
 Object.assign(G,{id,score:0,cleanups:[],ended:false,correct:0,total:0,maxLives:0});
 $('#hub').hidden=true;$('#arena').hidden=false;$('#arena-title').textContent=g.e+' '+g.n;
 ['score','lives','time','round'].forEach(k=>$('#h-'+k).hidden=true);
 $('#stage-note').className='note';$('#stage-note').textContent='Siap bermain!';
 g.run();scrollTo({top:0,behavior:'smooth'});
}

/* ---------- 1. FISHING ---------- */
function gFishing(){
 let lives=3,round=0;const total=10;G.maxLives=3;
 const next=()=>{
  if(round>=total||lives<=0)return endGame({xp:G.score,win:lives>0,line:`Kamu menangkap ${G.correct} ikan benar.`});
  round++;const t=rand(WORDS()),ch=choices(t,6);setHud({score:G.score,lives,round:round+'/'+total});
  stage(`<div class="center"><div class="chipT">Tangkap ikan dengan arti: <b>${t.e} ${esc(t.m)}</b></div></div><div class="pond">${ch.map(w=>`<button class="fish" style="--d:${(2+Math.random()*2).toFixed(1)}s;--y:${Math.round(Math.random()*30-15)}px">🐟 <span class="ar">${w.a}</span></button>`).join('')}</div>`);
  $$('.fish').forEach((b,i)=>b.onclick=()=>{const ok=ch[i].a===t.a;judge(ok,t);if(ok){G.score+=10;b.classList.add('hit')}else{lives--;b.classList.add('miss')}$$('.fish').forEach(x=>x.disabled=true);later(next,1000)});
 };next();
}
/* ---------- 2. SPACE ---------- */
function gSpace(){
 let lives=3,wave=0;const total=10;G.maxLives=3;
 const next=()=>{
  if(wave>=total||lives<=0)return endGame({xp:G.score,win:lives>0,line:`${G.correct} roket berhasil dihancurkan.`});
  wave++;const t=rand(WORDS()),ch=choices(t,4);setHud({score:G.score,lives,round:wave+'/'+total});
  stage(`<div class="space-field"><div class="rocket" id="rk"><span class="ar">${t.a}</span><span id="rk-e">🚀</span></div></div><p class="muted center" style="margin-bottom:10px">Pilih arti yang benar sebelum roket mendarat!</p><div class="grid g2">${ch.map((w,i)=>`<button class="opt" data-i="${i}">${esc(w.m)}</button>`).join('')}</div>`);
  const dur=Math.max(3500,8000-wave*450),st=performance.now();let done=false;
  const fin=(ok,btn)=>{if(done)return;done=true;clearInterval(iv);judge(ok,t);$$('.opt').forEach(b=>b.disabled=true);
   if(ok){G.score+=10;$('#rk-e').textContent='💥';btn&&btn.classList.add('ok')}else{lives--;$('#rk-e').textContent='🔥';btn&&btn.classList.add('no')}
   setHud({score:G.score,lives});later(next,1000)};
  const iv=setInterval(()=>{const p=(performance.now()-st)/dur;const r=$('#rk');if(r)r.style.top=Math.min(p,1)*70+'%';if(p>=1)fin(false)},40);G.cleanups.push(()=>clearInterval(iv));
  $$('.opt').forEach((b,i)=>b.onclick=()=>fin(ch[i].a===t.a,b));
 };next();
}
/* ---------- 3. PUZZLE ---------- */
function gPuzzle(){
 const set=shuffle(SENTENCES).slice(0,5);let i=0,lives=3;G.maxLives=3;
 const next=()=>{
  if(i>=set.length||lives<=0)return endGame({xp:G.score,win:lives>0,line:`${G.correct} kalimat tersusun benar.`});
  const s=set[i++];let pool=shuffle(s.ar.split(' ').map((p,k)=>({p,k}))),placed=[];setHud({score:G.score,lives,round:i+'/'+set.length});
  const draw=()=>{
   stage(`<div class="center"><div class="chipT">Arti: <b>${esc(s.id)}</b></div></div><div class="slot" id="slot">${placed.length?placed.map((x,j)=>`<button class="piece placed" data-r="${j}">${x.p}</button>`).join(''):'<span class="muted" style="direction:ltr">Ketuk potongan di bawah…</span>'}</div><div class="slot" style="border:0;min-height:0">${pool.map((x,j)=>`<button class="piece" data-a="${j}">${x.p}</button>`).join('')}</div><div class="center"><button class="btn red" id="pz-ok" ${pool.length?'disabled':''}>Periksa ✔</button></div>`);
   $$('[data-a]').forEach(b=>b.onclick=()=>{sfx('click');placed.push(pool.splice(+b.dataset.a,1)[0]);draw()});
   $$('[data-r]').forEach(b=>b.onclick=()=>{sfx('click');pool.push(placed.splice(+b.dataset.r,1)[0]);draw()});
   $('#pz-ok').onclick=()=>{const ok=placed.map(x=>x.p).join(' ')===s.ar;sfx(ok?'ok':'bad');G.total++;
    const n=$('#stage-note');n.className='note '+(ok?'ok':'bad');n.innerHTML=(ok?'✅ Benar! ':'❌ Susunan benar: ')+`<span class="ar" style="font-size:22px">${s.ar}</span>`;
    if(ok){G.score+=20;G.correct++;S.correct++;bump('correct')}else lives--;setHud({score:G.score,lives});$('#pz-ok').disabled=true;later(next,1800)};
  };draw();
 };next();
}
/* ---------- 4. DOODLE ---------- */
function gDoodle(){
 let round=0,combo=0;const total=10;
 const next=()=>{
  if(round>=total)return endGame({xp:G.score*.8,line:`${G.correct}/${total} tebakan benar.`});
  round++;const t=rand(WORDS()),ch=choices(t,4);setHud({score:G.score,round:round+'/'+total});
  stage(`<div class="center"><p class="muted">Apa kata Arab untuk gambar ini?</p><div class="big-emoji" style="margin:10px 0 22px">${t.e}</div><p class="muted" style="margin-bottom:14px">Kategori: ${esc(t.c)}</p></div><div class="grid g2">${ch.map(w=>`<button class="opt"><span class="ar">${w.a}</span></button>`).join('')}</div>`);
  $$('.opt').forEach((b,i)=>b.onclick=()=>{const ok=ch[i].a===t.a;judge(ok,t);$$('.opt').forEach((x,j)=>{x.disabled=true;if(ch[j].a===t.a)x.classList.add('ok')});if(ok){combo++;G.score+=10+Math.min(combo,5)*2}else{combo=0;b.classList.add('no')}setHud({score:G.score});later(next,1100)});
 };next();
}
/* ---------- 5. TUG OF WAR ---------- */
function gTug(){
 let pos=50;
 const draw=()=>{const k=$('#knot');if(k)k.style.left=(8+pos*.84)+'%'};
 stage(`<div class="center"><h4 style="font-weight:800">Tarik ke kiri sampai garis! 🪢</h4></div><div class="rope"><span class="you">🧑</span><span class="line"></span><span class="knot" id="knot">🪢</span><span class="bot">🤖</span></div><div class="card center" style="background:rgba(0,0,0,.2)"><div class="ar huge" id="tq"></div><div class="grid g2" id="to" style="margin-top:14px"></div></div>`);
 const q=()=>{const t=rand(WORDS()),ch=choices(t,4);$('#tq').textContent=t.a;$('#to').innerHTML=ch.map(w=>`<button class="opt">${esc(w.m)}</button>`).join('');
  $$('#to .opt').forEach((b,i)=>b.onclick=()=>{if(G.ended)return;const ok=ch[i].a===t.a;judge(ok,t);if(ok){pos-=14;G.score+=10}else pos+=9;check();q()})};
 const check=()=>{pos=Math.max(0,Math.min(100,pos));draw();setHud({score:G.score});
  if(pos<=0)endGame({xp:60+G.score/2,line:'Kamu menang tarik tambang! 💪',emoji:'🏆'});
  else if(pos>=100)endGame({xp:15,win:false,title:'Kalah tipis!',line:'Robot terlalu kuat, coba lagi!',emoji:'🤖'})};
 every(()=>{pos+=3.5;check()},900);q();check();
}
/* ---------- 6. WHEEL ---------- */
function gWheel(){
 const seg=[['+50',50],['+100',100],['+25',25],['+200',200],['Zonk',0],['+150',150],['+75',75],['+300',300]],cols=['#ef4444','#3b82f6','#eab308','#22c55e','#64748b','#a855f7','#ec4899','#f97316'];
 const w=[18,14,18,6,16,8,16,4];
 stage(`<div class="center"><div class="wheelwrap"><canvas id="wc" width="600" height="600"></canvas></div><p class="muted" id="wl" style="margin-bottom:12px"></p><button class="btn gold" id="wspin" style="padding:14px 30px;font-size:15px">🎡 PUTAR!</button></div>`);
 const c=$('#wc'),x=c.getContext('2d'),arc=Math.PI*2/seg.length;
 seg.forEach((s,i)=>{x.beginPath();x.fillStyle=cols[i];x.moveTo(300,300);x.arc(300,300,300,i*arc-Math.PI/2,(i+1)*arc-Math.PI/2);x.fill();x.save();x.translate(300,300);x.rotate(i*arc+arc/2-Math.PI/2);x.fillStyle='#fff';x.font='bold 34px sans-serif';x.textAlign='right';x.fillText(s[0],270,12);x.restore()});
 const left=()=>3-S.spins.n;const upd=()=>$('#wl').textContent=`Sisa putaran hari ini: ${left()}`;upd();
 let rot=0;
 $('#wspin').onclick=()=>{
  if(left()<=0)return toast('Putaran hari ini habis. Kembali besok!','bad');
  const btn=$('#wspin');btn.disabled=true;S.spins.n++;upd();
  let r=Math.random()*w.reduce((a,b)=>a+b),idx=0;for(;idx<w.length;idx++){if(r<w[idx])break;r-=w[idx]}
  const deg=360/seg.length;rot=rot-(rot%360)+360*6+(360-(idx+.5)*deg);c.style.transform=`rotate(${rot}deg)`;
  later(()=>{const p=seg[idx][1];G.score=p;endGame({xp:p,win:p>0,title:p?`Dapat ${seg[idx][0]} XP!`:'Zonk! 😅',line:p?'Keberuntungan berpihak padamu!':'Coba lagi besok.',emoji:p?'🎉':'😅'});btn.disabled=left()<=0},4400);
 };
}
/* ---------- 7. KAHOOT ---------- */
function buildKahoot(){
 const qs=[];shuffle(WORDS()).slice(0,8).forEach((w,i)=>{const ch=choices(w,4);
  if(i%2===0)qs.push({q:w.a,ar:1,h:'Apa artinya?',opts:ch.map(c=>c.m),correct:ch.indexOf(w)});
  else qs.push({q:w.e+' '+w.m,h:'Pilih kata Arabnya',aro:1,opts:ch.map(c=>c.a),correct:ch.indexOf(w)})});
 shuffle(S.customQs).slice(0,2).forEach(c=>{const o=c.opts.map((t,i)=>({t,i}));const sh=shuffle(o);qs.push({q:c.q,h:'Soal guru',opts:sh.map(x=>x.t),correct:sh.findIndex(x=>x.i===c.correct)})});
 return shuffle(qs);
}
function gKahoot(){
 const qs=buildKahoot();let qi=0,combo=0;const shapes=['▲','◆','●','■'];
 const next=()=>{
  if(qi>=qs.length)return endGame({xp:G.score/25,line:`${G.correct}/${qs.length} benar. Combo terbaik memperbesar skor!`});
  const q=qs[qi++];let t=15;setHud({score:G.score,round:qi+'/'+qs.length,time:t});
  stage(`<div class="timebar"><i id="tb" style="width:100%"></i></div><div class="card center" style="margin-bottom:16px;background:rgba(0,0,0,.2)"><p class="muted">${q.h}${combo>1?` · 🔥 Combo x${combo}`:''}</p><h4 class="${q.ar?'ar huge':''}" style="font-size:${q.ar?'':'26px'};font-weight:800">${esc(q.q)}</h4></div><div class="grid g2">${q.opts.map((o,i)=>`<button class="kbtn k${i}"><span style="font-size:20px">${shapes[i]}</span><span class="${q.aro?'ar':''}">${esc(o)}</span></button>`).join('')}</div>`);
  setTimeout(()=>{const b=$('#tb');if(b)b.style.width='0%';if(b)b.style.transition='width 15s linear'},30);
  let done=false,tm;
  const fin=i=>{if(done)return;done=true;clearInterval(tm);const ok=i===q.correct;sfx(ok?'ok':'bad');G.total++;
   $$('.kbtn').forEach((b,j)=>{b.disabled=true;if(j!==q.correct)b.style.opacity=.35});
   const n=$('#stage-note');
   if(ok){combo++;G.correct++;S.correct++;bump('correct');const pts=Math.round((600+400*t/15)*(1+Math.min(combo-1,4)*.25));G.score+=pts;n.className='note ok';n.textContent=`✅ Benar! +${pts} poin${combo>1?` (combo x${combo})`:''}`}
   else{combo=0;n.className='note bad';n.textContent=i<0?'⏰ Waktu habis!':'❌ Kurang tepat'}
   setHud({score:G.score});later(next,1600)};
  tm=setInterval(()=>{t--;setHud({time:t});if(t<=0)fin(-1)},1000);G.cleanups.push(()=>clearInterval(tm));
  $$('.kbtn').forEach((b,i)=>b.onclick=()=>fin(i));
 };next();
}
/* ---------- 8. MEMORY ---------- */
function gMemory(){
 const ws=shuffle(WORDS()).slice(0,8);let cards=[];ws.forEach((w,i)=>{cards.push({p:i,h:`<span class="ar">${w.a}</span>`});cards.push({p:i,h:`<span>${w.e}<br>${esc(w.m)}</span>`})});cards=shuffle(cards);
 let open=[],moves=0,matched=0,lock=false,sec=0;setHud({score:0,time:'0s',round:'Langkah 0'});
 stage(`<div class="mem">${cards.map((c,i)=>`<div class="mc" data-i="${i}"><div><span class="f">❔</span><span class="b">${c.h}</span></div></div>`).join('')}</div>`);
 every(()=>{sec++;setHud({time:sec+'s'})},1000);
 $$('.mc').forEach(el=>el.onclick=()=>{
  if(lock||el.classList.contains('flip')||el.classList.contains('done'))return;sfx('click');el.classList.add('flip');open.push(el);
  if(open.length===2){moves++;setHud({round:'Langkah '+moves});lock=true;const[a,b]=open;
   if(cards[+a.dataset.i].p===cards[+b.dataset.i].p){later(()=>{a.className=b.className='mc done';matched++;sfx('ok');S.correct++;bump('correct');open=[];lock=false;
     const w=ws[cards[+a.dataset.i].p];note(true,w);
     if(matched===8){G.score=Math.max(40,260-moves*8-sec);endGame({xp:G.score/2,line:`Selesai dalam ${moves} langkah & ${sec} detik!`})}},450)}
   else later(()=>{a.classList.remove('flip');b.classList.remove('flip');sfx('bad');open=[];lock=false},900)}
 });
}
/* ---------- 9. HANGMAN ---------- */
function gHangman(){
 const pool=shuffle(WORDS().filter(w=>{const l=[...strip(w.a)].length;return l>=3&&l<=6&&!/\s/.test(w.a)})).slice(0,5);let i=0;
 const faces=['😵','😰','😟','😕','🙂','😀','😎'];G.maxLives=6;
 const next=()=>{
  if(i>=pool.length)return endGame({xp:G.score,line:`${G.correct} dari ${pool.length} kata terselamatkan.`});
  const w=pool[i++],shown=[...strip(w.a)],letters=shown.map(nl);const got=new Set(),used=new Set();let lives=6;setHud({score:G.score,lives,round:i+'/'+pool.length});
  const draw=()=>{
   stage(`<div class="center"><div class="big-emoji">${w.e}</div><p class="muted">Kategori: ${esc(w.c)} · Arti: <b>${esc(w.m)}</b></p><div class="letters">${shown.map((c,k)=>`<span class="lt ${got.has(letters[k])?'on':''}">${got.has(letters[k])?c:''}</span>`).join('')}</div><div style="font-size:48px;margin:6px 0">${faces[lives]}</div><div class="keys">${HK.map(k=>`<button class="key" data-k="${k}" ${used.has(k)?'disabled':''}>${k}</button>`).join('')}</div></div>`);
   $$('.key').forEach(b=>b.onclick=()=>{const k=b.dataset.k;used.add(k);
    if(letters.includes(k)){got.add(k);sfx('ok')}else{lives--;sfx('bad')}setHud({lives});
    if(letters.every(l=>got.has(l))){draw();G.correct++;S.correct++;bump('correct');G.score+=20+lives*3;setHud({score:G.score});note(true,w);$$('.key').forEach(x=>x.disabled=true);later(next,1300)}
    else if(lives<=0){draw();note(false,w);$$('.key').forEach(x=>x.disabled=true);later(next,1600)}else draw()});
  };draw();
 };next();
}
/* ---------- 10. SCRAMBLE ---------- */
function gScramble(){
 const pool=shuffle(WORDS().filter(w=>{const l=[...strip(w.a)].length;return l>=3&&l<=7&&!/\s/.test(w.a)})).slice(0,8);let i=0;
 setHud({score:0,time:'120s'});
 countdown(120,s=>setHud({time:s+'s'}),()=>endGame({xp:G.score,line:`Waktu habis! ${G.correct} kata tersusun.`}));
 const next=()=>{
  if(i>=pool.length)return endGame({xp:G.score+20,line:'Semua kata berhasil disusun!'});
  const w=pool[i++],tg=[...strip(w.a)];let tiles=tg.map((c,k)=>({c,k}));
  for(let t=0;t<6;t++){tiles=shuffle(tiles);if(tiles.map(x=>x.c).join('')!==tg.join(''))break}
  let ans=[];setHud({round:i+'/'+pool.length});
  const draw=()=>{
   stage(`<div class="center"><div class="big-emoji" style="font-size:64px">${w.e}</div><p class="muted">Arti: <b>${esc(w.m)}</b> · ${tg.length} huruf</p><div class="tiles" style="min-height:72px;border-bottom:3px dashed var(--c-line);padding-bottom:8px;margin-top:16px">${ans.map((x,j)=>`<button class="tile2" data-r="${j}" style="background:linear-gradient(135deg,#10b981,#0f766e)">${x.c}</button>`).join('')}</div><div class="tiles">${tiles.map((x,j)=>`<button class="tile2" data-a="${j}">${x.c}</button>`).join('')}</div><div class="row" style="justify-content:center"><button class="btn sm" id="sc-skip">⏭ Lewati</button></div></div>`);
   $$('[data-a]').forEach(b=>b.onclick=()=>{sfx('click');ans.push(tiles.splice(+b.dataset.a,1)[0]);if(!tiles.length){const ok=ans.map(x=>nl(x.c)).join('')===tg.map(nl).join('');judge(ok,w);if(ok){G.score+=15;setHud({score:G.score});draw();later(next,1000)}else{const st=$('#stage-body');st.classList.add('shake');setTimeout(()=>st.classList.remove('shake'),400);tiles=ans;ans=[];draw()}}else draw()});
   $$('[data-r]').forEach(b=>b.onclick=()=>{sfx('click');tiles.push(ans.splice(+b.dataset.r,1)[0]);draw()});
   $('#sc-skip').onclick=()=>{note(false,w);next()};
  };draw();
 };next();
}
/* ---------- 11. TRUE / FALSE ---------- */
function gTF(){
 let combo=0,cur;setHud({score:0,time:'30s'});
 countdown(30,s=>setHud({time:s+'s'}),()=>endGame({xp:G.score/3,line:`${G.correct}/${G.total} penilaian benar.`}));
 const kd=e=>{if(e.key==='ArrowRight')ans(true);if(e.key==='ArrowLeft')ans(false)};document.addEventListener('keydown',kd);G.cleanups.push(()=>document.removeEventListener('keydown',kd));
 const ans=v=>{if(G.ended||!cur)return;const ok=cur.truth===v;judge(ok,cur.w);if(ok){combo++;G.score+=10+Math.min(combo,5)*2}else{combo=0;G.score=Math.max(0,G.score-5)}setHud({score:G.score});q()};
 const q=()=>{const w=rand(WORDS()),truth=Math.random()<.5,m=truth?w.m:rand(WORDS().filter(x=>x.m!==w.m)).m;cur={w,truth};
  stage(`<div class="center"><p class="muted">${combo>1?'🔥 Combo x'+combo:'Apakah pasangan ini benar?'}</p><div class="ar huge" style="margin-top:10px">${w.a}</div><div style="font-size:24px;opacity:.6">=</div><div class="big-txt">${esc(m)}</div><div class="row" style="justify-content:center;gap:16px"><button class="btn red" style="padding:18px 32px;font-size:18px" id="tf-n">✗ Salah</button><button class="btn pri" style="padding:18px 32px;font-size:18px" id="tf-y">✓ Benar</button></div><p class="muted" style="margin-top:14px">Pintasan: ← salah · → benar</p></div>`);
  $('#tf-n').onclick=()=>ans(false);$('#tf-y').onclick=()=>ans(true)};q();
}
/* ---------- 12. WHACK ---------- */
function gWhack(){
 let target=rand(WORDS());const holes=Array(9).fill(null);setHud({score:0,time:'45s'});
 stage(`<div class="center"><div class="chipT" id="wt"></div></div><div class="whack">${[...Array(9)].map((_,i)=>`<button class="hole" data-i="${i}"></button>`).join('')}</div>`);
 const setT=()=>$('#wt').innerHTML=`Pukul kata untuk: <b>${target.e} ${esc(target.m)}</b>`;setT();
 const hide=i=>{holes[i]=null;const h=$$('.hole')[i];if(h)h.innerHTML=''};
 every(()=>{const free=holes.map((v,i)=>v?null:i).filter(v=>v!==null);if(!free.length)return;const i=rand(free),w=Math.random()<.4?target:rand(WORDS().filter(x=>x.a!==target.a));holes[i]=w;$$('.hole')[i].innerHTML=`<span class="ar">${w.a}</span>`;later(()=>{if(holes[i]===w)hide(i)},1700)},750);
 $$('.hole').forEach((h,i)=>h.onclick=()=>{const w=holes[i];if(!w)return;const ok=w.a===target.a;judge(ok,w);if(ok){G.score+=10;target=rand(WORDS());setT()}else G.score=Math.max(0,G.score-5);hide(i);setHud({score:G.score})});
 countdown(45,s=>setHud({time:s+'s'}),()=>endGame({xp:G.score/2.5,line:`${G.correct} kata berhasil dipukul.`}));
}
/* ---------- 13. LISTEN ---------- */
function gListen(){
 let round=0;const total=8;
 const next=()=>{
  if(round>=total)return endGame({xp:G.score,line:`${G.correct}/${total} kata terdengar dengan benar.`});
  round++;const t=rand(WORDS()),ch=choices(t,4);setHud({score:G.score,round:round+'/'+total});
  stage(`<div class="center"><p class="muted">Dengarkan, lalu pilih artinya</p><button class="speak-btn" id="lp"><i class="fas fa-volume-high"></i></button>${'speechSynthesis' in window?'':`<div class="ar huge">${t.a}</div>`}<div class="row" style="justify-content:center;margin-bottom:14px"><button class="btn sm" id="ls">🐢 Pelan</button></div><div class="grid g2">${ch.map(w=>`<button class="opt">${w.e} ${esc(w.m)}</button>`).join('')}</div></div>`);
  $('#lp').onclick=()=>speak(t.a);$('#ls').onclick=()=>speak(t.a,.45);later(()=>speak(t.a),300);
  $$('.opt').forEach((b,i)=>b.onclick=()=>{const ok=ch[i].a===t.a;judge(ok,t);$$('.opt').forEach((x,j)=>{x.disabled=true;if(ch[j].a===t.a)x.classList.add('ok')});if(ok)G.score+=15;else b.classList.add('no');setHud({score:G.score});later(next,1500)});
 };next();
}
/* ---------- 14. TYPING RACE ---------- */
function gType(){
 const goal=10;let n=0,cur;setHud({score:0,time:'60s',round:'0/'+goal});
 stage(`<div class="track"><span id="car" style="left:2%">🏎️</span></div><div class="center"><div class="big-emoji" id="tr-e" style="font-size:56px"></div><div class="big-txt" id="tr-m" style="margin-bottom:4px"></div><div class="ar huge" id="tr-a" style="font-size:44px"></div><input class="f ar" id="tr-in" dir="rtl" autocomplete="off" style="font-size:30px;text-align:center;margin:12px 0" ${'ontouchstart' in window?'inputmode="none"':''}><div class="keys" id="tr-kb">${kbHTML()}</div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn sm" id="tr-skip">⏭ Lewati</button></div></div>`);
 const inp=$('#tr-in');bindKb($('#tr-kb'),inp);
 const q=()=>{cur=rand(WORDS());$('#tr-e').textContent=cur.e;$('#tr-m').textContent=cur.m;$('#tr-a').textContent=cur.a;inp.value='';if(!('ontouchstart' in window))inp.focus()};
 let tl=60;
 inp.oninput=()=>{if(!inp.value)return;if(nrm(inp.value)===nrm(cur.a)){judge(true,cur);n++;G.score+=10;$('#car').style.left=(2+n/goal*82)+'%';setHud({score:G.score,round:n+'/'+goal});if(n>=goal){G.score+=tl*2;return endGame({xp:G.score/3,line:`Finis dengan sisa ${tl} detik! 🏁`})}q()}};
 $('#tr-skip').onclick=()=>{note(false,cur);q()};
 countdown(60,s=>{tl=s;setHud({time:s+'s'})},()=>endGame({xp:G.score/3,win:n>0,line:`Kamu mengetik ${n} kata dalam 60 detik.`}));q();
}

/* ================= UI NAHWU, SHOROF, PERCAKAPAN & GAME BARU ================= */
const AR_RUN=/[؀-ۿݐ-ݿ]+(?:[ ،][؀-ۿݐ-ݿ]+)*/g;
const mix=(s,say=true)=>String(s).replace(AR_RUN,m=>`<span class="ar mx${say?' sayable':''}"${say?` data-say="${m}"`:''}>${m}</span>`);
const LS={nahwu:null,shorof:null};
let LQ=null,iCat='Semua';
const lessonsOf=t=>t==='nahwu'?NAHWU:SHOROF;

function vLesson(type){
 S.lessons=S.lessons||{};
 const L=lessonsOf(type);
 if(LS[type]!=null&&L[LS[type]])return lessonDetail(type,LS[type]);
 const done=L.filter((_,i)=>S.lessons[type+i]).length,perfect=L.filter((l,i)=>S.lessons[type+i]&&S.lessons[type+i].best===l.q.length).length;
 const name=type==='nahwu'?'Ilmu Nahwu':'Ilmu Shorof';
 const desc=type==='nahwu'?"Tata bahasa Arab: kedudukan kata dalam kalimat dan i'rabnya. Baca pelajaran, lihat contoh, lalu kerjakan kuis.":"Morfologi Arab: tashrif, wazan, jamak, dan perubahan bentuk kata. Baca tabel, dengarkan contoh, lalu kerjakan kuis.";
 const gid=type==='nahwu'?'irab':'tashrif';
 return `<div class="hero"><div style="position:relative;z-index:1"><span class="pill">${type==='nahwu'?'🏛️':'🧬'} ${L.length} pelajaran</span><h3 style="margin:12px 0 8px">${name}</h3><p class="muted" style="max-width:560px">${desc}</p>
 <div class="row" style="margin-top:14px"><span class="pill">✅ ${done}/${L.length} selesai</span><span class="pill">⭐ ${perfect} nilai sempurna</span><button class="btn gold sm" data-lgame="${gid}">🎮 Latihan lewat game</button><button class="btn vio sm" data-lgame="nsquiz">🧠 Kuis campuran</button></div>
 <div class="bar" style="margin-top:14px;max-width:420px"><i style="width:${done/L.length*100}%"></i></div></div></div>
 <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(270px,1fr));margin-top:18px">${L.map((l,i)=>{const st=S.lessons[type+i];return `<button class="lcard" data-ls="${i}"><span class="ln">${l.e}</span><div style="flex:1;min-width:0"><div class="muted">Pelajaran ${i+1}</div><b style="font-size:14.5px">${l.t}</b><div class="ar" style="font-size:18px;color:var(--c-gold)">${l.ar}</div></div><span style="font-size:20px">${st?(st.best===l.q.length?'⭐':'✅'):'▫️'}</span></button>`}).join('')}</div>`;
}

function lessonDetail(type,i){
 const L=lessonsOf(type),l=L[i],st=S.lessons[type+i];
 LQ={type:type,i:i,ans:0,cor:0,total:l.q.length};
 const tbl=l.tbl?`<div class="tbl-wrap"><table class="ltable"><thead><tr>${l.tbl.h.map(h=>`<th>${mix(h,false)}</th>`).join('')}</tr></thead><tbody>${l.tbl.r.map(r=>`<tr>${r.map(c=>`<td>${mix(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
 const quiz=l.q.map((q,qi)=>{const opts=shuffle(q.o.map((t,k)=>({t:t,k:k})));return `<div class="lq"><div class="qt">${qi+1}. ${mix(q.q,false)}</div><div class="grid g2" style="gap:8px">${opts.map(o=>`<button class="opt" style="min-height:0;padding:12px;font-size:14px" data-lq="${qi}" data-k="${o.k}">${mix(o.t,false)}</button>`).join('')}</div></div>`}).join('');
 return `<div class="row between" style="margin-bottom:14px"><button class="btn sm" data-back="1">← Daftar pelajaran</button><span class="pill">${st?(st.best===l.q.length?'⭐ Nilai sempurna':'✅ Pernah dikerjakan ('+st.best+'/'+l.q.length+')'):'Belum dikerjakan'}</span></div>
 <div class="card"><div class="row" style="gap:14px;flex-wrap:nowrap"><div class="ln" style="font-size:38px">${l.e}</div><div><div class="muted">Pelajaran ${i+1} dari ${L.length}</div><h3 style="font-weight:800;font-size:22px">${l.t}</h3><div class="ar" style="font-size:26px;color:var(--c-gold)">${l.ar}</div></div></div>
 <p style="margin-top:16px;font-size:15px">${mix(l.intro)}</p></div>
 <div class="card" style="margin-top:16px"><h4 style="font-weight:800;margin-bottom:8px">📌 Poin Penting</h4><ul class="pts">${l.pts.map(p=>`<li>${mix(p)}</li>`).join('')}</ul></div>
 ${tbl?`<div class="card" style="margin-top:16px"><h4 style="font-weight:800;margin-bottom:10px">📊 Tabel Ringkas <span class="muted">(ketuk tulisan Arab untuk mendengar)</span></h4>${tbl}</div>`:''}
 <div class="card" style="margin-top:16px"><h4 style="font-weight:800;margin-bottom:10px">💡 Contoh Kalimat</h4>${l.ex.map(x=>`<div class="exrow"><div class="ar" style="font-size:25px;font-weight:700;color:var(--c-gold);text-align:right;flex:1">${x.ar}</div><div style="flex:1;min-width:140px"><div style="font-weight:600;font-size:14px">${mix(x.id)}</div></div><button class="ic-btn" data-say="${x.ar}">🔊</button></div>`).join('')}</div>
 <div class="card" style="margin-top:16px;border-color:rgba(96,165,250,.4)"><h4 style="font-weight:800;margin-bottom:12px">📝 Kuis Mini <span class="muted">(+10 XP per jawaban benar, hanya poin baru yang dihitung)</span></h4>${quiz}<div id="lq-res" class="note" style="margin-top:14px">Jawab semua soal untuk melihat hasil.</div></div>
 <div class="row between" style="margin-top:16px"><button class="btn" data-lnav="${i-1}" ${i===0?'disabled':''}>← Sebelumnya</button><button class="btn" data-lretry="1">🔁 Ulangi kuis</button><button class="btn pri" data-lnav="${i+1}" ${i===L.length-1?'disabled':''}>Berikutnya →</button></div>`;
}

function finishQuiz(){
 S.lessons=S.lessons||{};
 const key=LQ.type+LQ.i,prev=(S.lessons[key]&&S.lessons[key].best)||0,gain=Math.max(0,LQ.cor-prev)*10;
 S.lessons[key]={best:Math.max(prev,LQ.cor),total:LQ.total};
 if(gain)addXP(gain);else save();
 const perfect=LQ.cor===LQ.total,n=$('#lq-res');
 n.className='note '+(perfect?'ok':LQ.cor>0?'':'bad');
 n.innerHTML=`${perfect?'🎉 Sempurna!':LQ.cor>0?'👍 Lumayan!':'💪 Baca lagi, lalu coba ulang.'} Skor ${LQ.cor}/${LQ.total}${gain?` · +${gain} XP`:''}`;
 if(perfect){confetti(100);sfx('win')}
}

function bLesson(type){
 $('#view').onclick=e=>{
  const g=e.target.closest('[data-lgame]');if(g){openGame(g.dataset.lgame);return}
  const s=e.target.closest('[data-ls]');if(s){LS[type]=+s.dataset.ls;go(type);return}
  if(e.target.closest('[data-back]')){LS[type]=null;go(type);return}
  const nv=e.target.closest('[data-lnav]');if(nv&&!nv.disabled){LS[type]=+nv.dataset.lnav;go(type);return}
  if(e.target.closest('[data-lretry]')){go(type);return}
  const b=e.target.closest('[data-lq]');
  if(b&&!b.disabled&&LQ){
   const qi=+b.dataset.lq,q=lessonsOf(LQ.type)[LQ.i].q[qi],ok=+b.dataset.k===q.a;sfx(ok?'ok':'bad');
   $$(`[data-lq="${qi}"]`).forEach(x=>{x.disabled=true;if(+x.dataset.k===q.a)x.classList.add('ok')});
   if(!ok)b.classList.add('no');
   LQ.ans++;if(ok){LQ.cor++;S.correct++;bump('correct')}
   if(LQ.ans===LQ.total)finishQuiz();
  }
 };
}

/* ---- ISTIMA: percakapan, ungkapan, kosakata per kategori ---- */
function dialogHTML(){
 return DIALOGS.map((d,i)=>`<div class="card dlg"><div class="row between" style="margin-bottom:10px"><b>${d.e} ${d.t}</b><button class="btn sm vio" data-dlg="${i}">▶ Putar semua</button></div>${d.l.map(l=>`<div class="bub ${l[0]==='B'?'r':''}"><div style="flex:1"><div class="ar" style="font-size:22px;font-weight:700;color:var(--c-gold)">${l[1]}</div><div class="muted">${l[2]}</div></div><button class="ic-btn" style="width:32px;height:32px" data-say="${l[1]}">🔊</button></div>`).join('')}</div>`).join('');
}
function vIstima(){
 const base=_vIstimaBase().split('<h4 style="font-weight:800;margin:22px 0 12px">Kosakata</h4>')[0];
 const cats=['Semua',...new Set(WORDS().map(w=>w.c))];
 return base+`<h4 style="font-weight:800;margin:26px 0 12px">💬 Percakapan (Muhadatsah)</h4><div class="grid g2">${dialogHTML()}</div>
 <h4 style="font-weight:800;margin:26px 0 12px">🌟 Ungkapan Sehari-hari</h4><div class="grid g2">${EXPRESSIONS.map(x=>`<div class="card row between" style="flex-wrap:nowrap;padding:14px"><div><div class="ar" style="font-size:22px;font-weight:700;color:var(--c-gold)">${x[0]}</div><div class="muted">${x[1]}</div></div><button class="ic-btn" data-say="${x[0]}">🔊</button></div>`).join('')}</div>
 <h4 style="font-weight:800;margin:26px 0 12px">Kosakata (${WORDS().length} kata)</h4><div class="row" style="margin-bottom:14px" id="i-cats">${cats.map(c=>`<button class="chip ${c===iCat?'on':''}" data-ic="${c}">${c}</button>`).join('')}</div><div class="grid auto" id="i-grid"></div>`;
}
function iRender(){
 $('#i-grid').innerHTML=WORDS().filter(w=>iCat==='Semua'||w.c===iCat).map(w=>`<div class="wcard"><div><span class="em">${w.e}</span><div class="ar">${w.a}</div><div class="muted">${esc(w.m)}</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="ic-btn" data-say="${esc(w.a)}">🔊</button><button class="ic-btn" data-slow="${esc(w.a)}">🐢</button></div></div>`).join('');
}
function bIstima(){
 iRender();
 $('#i-cats').onclick=e=>{const b=e.target.closest('[data-ic]');if(b){iCat=b.dataset.ic;$$('#i-cats .chip').forEach(c=>c.classList.toggle('on',c===b));iRender()}};
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-dlg]');if(b){const d=DIALOGS[+b.dataset.dlg];speak(d.l.map(x=>x[1]).join('. '),.8)}});

/* ---- GAME 15: KUIS NAHWU & SHOROF ---- */
function gNSQuiz(){
 const bank=[];NAHWU.concat(SHOROF).forEach(l=>l.q.forEach(q=>bank.push(q)));
 const qs=shuffle(bank).slice(0,12);let i=0,lives=3,combo=0;G.maxLives=3;
 const next=()=>{
  if(i>=qs.length||lives<=0)return endGame({xp:G.score/2,win:lives>0,line:`${G.correct}/${qs.length} soal benar.`});
  const q=qs[i++],opts=shuffle(q.o.map((t,k)=>({t:t,k:k})));setHud({score:G.score,lives:lives,round:i+'/'+qs.length});
  stage(`<div class="card center" style="background:rgba(0,0,0,.2);margin-bottom:16px"><p class="muted">${combo>1?'🔥 Combo x'+combo:'Pilih jawaban yang tepat'}</p><h4 style="font-size:20px;font-weight:800;margin-top:6px">${mix(q.q,false)}</h4></div><div class="grid g2">${opts.map(o=>`<button class="opt">${mix(o.t,false)}</button>`).join('')}</div>`);
  $$('.opt').forEach((b,j)=>b.onclick=()=>{
   const ok=opts[j].k===q.a;sfx(ok?'ok':'bad');G.total++;
   $$('.opt').forEach((x,m)=>{x.disabled=true;if(opts[m].k===q.a)x.classList.add('ok')});
   if(ok){combo++;G.correct++;S.correct++;bump('correct');G.score+=10+Math.min(combo,5)*2}else{combo=0;lives--;b.classList.add('no')}
   const n=$('#stage-note');n.className='note '+(ok?'ok':'bad');n.textContent=ok?'✅ Benar!':'❌ Jawaban benar: '+q.o[q.a];
   setHud({score:G.score,lives:lives});later(next,1300);
  });
 };next();
}

/* ---- GAME 16: TASHRIF MASTER ---- */
function gTashrif(){
 const TY=[['x',"Fi'il mudhari'"],['s','Mashdar'],['f',"Isim fa'il"],['o',"Isim maf'ul"],['r',"Fi'il amr (untuk satu laki-laki)"]];
 let round=0,lives=3,combo=0;const total=12;G.maxLives=3;
 const next=()=>{
  if(round>=total||lives<=0)return endGame({xp:G.score/2,win:lives>0,line:`${G.correct}/${total} tashrif benar.`});
  round++;setHud({score:G.score,lives:lives,round:round+'/'+total});
  let v,ty;do{v=rand(TASHRIF);ty=rand(TY)}while(v[ty[0]]==null);
  const right=v[ty[0]],pool=[...new Set(TASHRIF.map(t=>t[ty[0]]).filter(x=>x&&x!==right))],opts=shuffle([right,...shuffle(pool).slice(0,3)]);
  stage(`<div class="center"><div class="chipT">${ty[1]} dari:</div><div class="ar huge">${v.m}</div><div class="muted" style="margin-bottom:18px">(${v.t})</div></div><div class="grid g2">${opts.map(o=>`<button class="opt"><span class="ar">${o}</span></button>`).join('')}</div>`);
  $$('.opt').forEach((b,j)=>b.onclick=()=>{
   const ok=opts[j]===right;sfx(ok?'ok':'bad');G.total++;
   $$('.opt').forEach((x,m)=>{x.disabled=true;if(opts[m]===right)x.classList.add('ok')});
   if(ok){combo++;G.correct++;S.correct++;bump('correct');G.score+=10+Math.min(combo,5)*2}else{combo=0;lives--;b.classList.add('no')}
   const n=$('#stage-note');n.className='note '+(ok?'ok':'bad');n.innerHTML=`${ok?'✅ Benar!':'❌ Kurang tepat.'} ${ty[1]} dari <span class="ar" style="font-size:22px">${v.m}</span> = <span class="ar" style="font-size:22px">${right}</span>`;
   setHud({score:G.score,lives:lives});speak(right,.8);later(next,1600);
  });
 };next();
}

/* ---- GAME 17: I'RAB DETEKTIF ---- */
function gIrab(){
 const items=shuffle(IRAB).slice(0,10),LB=["Marfu'",'Manshub','Majrur','Majzum'];let i=0,lives=3,combo=0;G.maxLives=3;
 const next=()=>{
  if(i>=items.length||lives<=0)return endGame({xp:G.score/2,win:lives>0,line:`${G.correct}/${items.length} i'rab tepat.`});
  const it=items[i++];setHud({score:G.score,lives:lives,round:i+'/'+items.length});
  stage(`<div class="center"><div class="chipT">🕵️ Apa i'rab kata yang disorot?</div><div class="ar" style="font-size:38px;font-weight:700;line-height:2;margin:6px 0 20px">${it.s.replace(/\[(.+?)\]/,'<mark class="hl">$1</mark>')}</div></div><div class="grid g2">${LB.map(l=>`<button class="opt">${l}</button>`).join('')}</div>`);
  $$('.opt').forEach((b,j)=>b.onclick=()=>{
   const ok=j===it.a;sfx(ok?'ok':'bad');G.total++;
   $$('.opt').forEach((x,m)=>{x.disabled=true;if(m===it.a)x.classList.add('ok')});
   if(ok){combo++;G.correct++;S.correct++;bump('correct');G.score+=10+Math.min(combo,5)*2}else{combo=0;lives--;b.classList.add('no')}
   const n=$('#stage-note');n.className='note '+(ok?'ok':'bad');n.textContent=(ok?'✅ Benar! ':'❌ Kurang tepat. ')+it.w;
   setHud({score:G.score,lives:lives});later(next,1700);
  });
 };next();
}

GAMES.push(
{id:'nsquiz',n:'Kuis Nahwu & Shorof',e:'🧠',d:'Soal dari semua pelajaran. Kamu punya 3 nyawa!',g:'linear-gradient(135deg,#7c3aed,#db2777)',t:'Nahwu',run:gNSQuiz,nw:1},
{id:'tashrif',n:'Tashrif Master',e:'🔄',d:'Tentukan mudhari\', mashdar, isim fa\'il, dan lainnya.',g:'linear-gradient(135deg,#0891b2,#4338ca)',t:'Nahwu',run:gTashrif,nw:1},
{id:'irab',n:"I'rab Detektif",e:'🕵️',d:'Tebak i\'rab kata yang disorot dalam kalimat.',g:'linear-gradient(135deg,#059669,#0e7490)',t:'Nahwu',run:gIrab,nw:1}
);

/* ================= VIEWS / BIND ================= */
const VIEWS={dashboard:vDashboard,istima:vIstima,qiraah:vQiraah,kitabah:vKitabah,nahwu:()=>vLesson('nahwu'),shorof:()=>vLesson('shorof'),mufrodat:vMufrodat,games:vGames,share:vShare,manage:vManage};
const BIND={istima:bIstima,nahwu:()=>bLesson('nahwu'),shorof:()=>bLesson('shorof'),qiraah:bQiraah,kitabah:bKitabah,mufrodat:bMufrodat,games:bGames,share:bShare,manage:bManage};

/* ================= BOOT ================= */
window.addEventListener('load',()=>{
 pickRole('student');
 try{const u=JSON.parse(localStorage.getItem('almahirpro_user')||'null');if(u&&u.name)loadUser(u)}catch(e){}
});
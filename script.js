/* ================================================================
   CONFIG — personalize everything here!
================================================================ */
const CONFIG = {
  name: "Baby",
  // ▶ BACKGROUND SONG — "My Love Mine All Mine" by Mitski (the "Moon, tell me if I could" song)
  //   To play the REAL song: put an MP3 file next to index.html and set its name here,
  //   or paste a full URL. Example:  songURL: "mitski.mp3",
  //   Leave it as "" to use the built-in music-box arrangement of the song instead.
  songURL: "mitski.mp3",
  letter: `Dear you,

Happy birthday! 🎂

I know I could just say this in person,
but I wanted you to have something you can keep.

You're my favorite hello, my hardest goodbye,
and the best part of every single day.

I hope this little journey made you smile —
because making you smile is my favorite thing to do.

Love you endlessly. ❤️`,
  giftMessage: `This is the most personal part…

No gift I could wrap would ever be enough,
because the real gift is getting to love you
and being loved by you.

So here's my promise:
more adventures, more laughter,
more late-night talks, more us.

Forever sounds good with you. ❤️`,
  balloonMessages: [
    "You make me laugh. 😂",
    "I love your smile. 😊",
    "You make ordinary days special. ✨",
    "You're my favorite person. ❤️",
    "I'm really lucky to have you. 🍀"
  ],
  photos: [ // replace <div> with <img src="..."> for real photos
    {img:'<div style="background:linear-gradient(135deg,#ff9a9e,#fecfef)"></div>', date:"Our first date 📅", place:"That little café 📍", cap:"Where it all began ☕"},
    {img:'<div style="background:linear-gradient(135deg,#a18cd1,#fbc2eb)"></div>', date:"Summer day 📅", place:"The beach 📍", cap:"You, the sea, perfection 🌊"},
    {img:'<div style="background:linear-gradient(135deg,#f6d365,#fda085)"></div>', date:"Movie night 📅", place:"Your couch 📍", cap:"You fell asleep in 10 min 😴😂"},
    {img:'<div style="background:linear-gradient(135deg,#84fab0,#8fd3f4)"></div>', date:"Road trip 📅", place:"Everywhere & nowhere 📍", cap:"Wrong turns, right person 🚗"},
    {img:'<div style="background:linear-gradient(135deg,#fccb90,#d57eeb)"></div>', date:"Last birthday 📅", place:"Home 📍", cap:"One of my favorite days with you 🥰"},
    {img:'<div style="background:linear-gradient(135deg,#e0c3fc,#8ec5fc)"></div>', date:"Random Tuesday 📅", place:"Kitchen 📍", cap:"We burnt the pasta. Worth it. 🍝😂"}
  ],
  reasons: [
    "Because you always make me smile. 😊",
    "Because I feel safe being myself with you. 🫂",
    "Because even doing nothing with you is fun. 🛋️",
    "Because your laugh is my favorite sound. 🎶",
    "Because you believe in me even when I don't. 💪",
    "Because you remember the little things. 📝",
    "Because your hugs fix everything. 🤗",
    "Because you make me want to be better. 🌱",
    "Because home is wherever you are. 🏡",
    "Because you still give me butterflies. 🦋",
    "Because you laugh at my terrible jokes. 😅",
    "Because you always know when something's wrong. 🔮",
    "Because you're my best friend. 👫",
    "Because you dance badly and don't care. 💃",
    "Because your eyes light up talking about what you love. ✨",
    "Because you're kind to everyone. 💛",
    "Because you turn bad days into good stories. 📖",
    "Because you choose me, every day. ❤️",
    "Because life with you is an adventure. 🗺️",
    "Because simply put… you're you. ♾️"
  ],
  quiz: [
    {q:"What food would I pick for our perfect date? 🍽️", opts:["Fancy dinner","Street food tour","Homemade cooking together","Just dessert 😂"], correct:2},
    {q:"What was one of our funniest moments? 😂", opts:["The burnt pasta night","You fell asleep at the movies","The wrong-turn road trip","ALL of the above, obviously"], correct:3},
    {q:"What's my favorite way to spend a Sunday? ☀️", opts:["Sleeping till noon","Adventures with you","Shopping spree","Cleaning (lol)"], correct:1},
    {q:"What do I call you when I'm being extra affectionate? 🥰", opts:["Babe","Baby","My person","All of the above"], correct:3},
    {q:"What's the one thing I always steal from you? 😌", opts:["Your fries","Your hoodies","Your phone charger","ALL of the above"], correct:3}
  ],
  wrongResponses: ["Hmmmm… suspicious. 🤨 Try again.","Are you sure about that? 😏","The audacity! 😂 Try again.","Babe. BABE. 😭 Try again!"],
  bucketList: ["Watch a sunrise together 🌅","Travel somewhere new ✈️","Take more stupid pictures 📸","Try new food 🍜","Make more memories ❤️","Celebrate more birthdays 🎂","Grow together 🌱","Keep choosing each other ♾️"]
};

/* ================================================================
   CORE — screens, safe storage, progress
================================================================ */
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const ORDER=['intro','envelope','balloons','gallery','reasons','quiz','hug','garden','cake','gift','night','future'];
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},
             set(k,v){try{localStorage.setItem(k,v)}catch(e){}},
             del(k){try{localStorage.removeItem(k)}catch(e){}}};
let progress=parseInt(store.get('bday-progress')||'0',10);

function show(i){
  $$('.screen').forEach((s,k)=>s.classList.toggle('active',k===i));
  $('#progressBar').style.width=((i+1)/ORDER.length*100)+'%';
  store.set('bday-progress',i);
  progress=i;
  const enter=window['enter_'+ORDER[i]];
  if(typeof enter==='function')enter();
}
const next=id=>show(ORDER.indexOf(id));

/* ================================================================
   NIGHT SKY (stars) & FX (confetti + fireworks)
================================================================ */
const sky=$('#sky'),sctx=sky.getContext('2d');let stars=[];
function initSky(){sky.width=innerWidth;sky.height=innerHeight;
  stars=Array.from({length:120},()=>({x:Math.random()*sky.width,y:Math.random()*sky.height,
    r:Math.random()*1.6+.3,p:Math.random()*Math.PI*2,s:.5+Math.random()*1.5}));}
initSky();addEventListener('resize',initSky);
(function starLoop(){sctx.clearRect(0,0,sky.width,sky.height);
  for(const s of stars){s.p+=.02*s.s;sctx.globalAlpha=.3+Math.abs(Math.sin(s.p))*.7;
    sctx.fillStyle='#fff';sctx.beginPath();sctx.arc(s.x,s.y,s.r,0,7);sctx.fill();}
  sctx.globalAlpha=1;requestAnimationFrame(starLoop);})();

const fx=$('#fx'),fctx=fx.getContext('2d');let parts=[];
function fxResize(){fx.width=innerWidth;fx.height=innerHeight}fxResize();addEventListener('resize',fxResize);
const COLORS=['#ff6b9d','#ffd166','#a855f7','#6366f1','#22c55e','#ffffff'];
function confetti(n,x,y){for(let i=0;i<n;i++)parts.push({t:'c',
  x:x??Math.random()*fx.width,y:y??-10,
  vx:(Math.random()-.5)*9,vy:Math.random()*7+2,r:Math.random()*6+3,
  c:COLORS[Math.random()*COLORS.length|0],rot:Math.random()*7,vr:(Math.random()-.5)*.3,life:1});}
function launchFirework(){const x=Math.random()*fx.width*.8+fx.width*.1,
  y=Math.random()*fx.height*.4+40,c=COLORS[Math.random()*COLORS.length|0];
  for(let i=0;i<60;i++){const a=Math.PI*2*i/60,sp=Math.random()*4+2;
    parts.push({t:'f',x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,c,r:2,life:1});}
}
(function fxLoop(){fctx.clearRect(0,0,fx.width,fx.height);
  parts=parts.filter(p=>p.life>0);
  for(const p of parts){p.life-=.008;
    if(p.t==='c'){p.vy+=.12;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;
      fctx.save();fctx.translate(p.x,p.y);fctx.rotate(p.rot);
      fctx.globalAlpha=Math.max(p.life,0);fctx.fillStyle=p.c;
      fctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*.6);fctx.restore();}
    else{p.vy+=.03;p.vx*=.985;p.vy*=.985;p.x+=p.vx;p.y+=p.vy;
      fctx.globalAlpha=Math.max(p.life,0);fctx.fillStyle=p.c;
      fctx.beginPath();fctx.arc(p.x,p.y,p.r,0,7);fctx.fill();}}
  fctx.globalAlpha=1;requestAnimationFrame(fxLoop);})();

let fwTimer=null;
function fireworksStart(gap){fireworksStop();
  fwTimer=setInterval(()=>launchFirework(),gap);
  launchFirework();
}
function fireworksStop(){if(fwTimer){clearInterval(fwTimer);fwTimer=null;}}

/* ================================================================
   MOUSE SPARKLES & CLICK HEARTS
================================================================ */
let lastSpark=0;
addEventListener('pointermove',e=>{const now=performance.now();
  if(now-lastSpark<50)return;lastSpark=now;
  const sp=document.createElement('div');sp.textContent='✨';
  sp.style.cssText='position:fixed;left:'+e.clientX+'px;top:'+e.clientY+
    'px;z-index:58;pointer-events:none;font-size:.7rem;animation:riseFade 1s ease forwards';
  document.body.appendChild(sp);setTimeout(()=>sp.remove(),1000);});
addEventListener('pointerdown',e=>{
  if(e.target.closest('button,#giftBox,#hugHeart,#envelope,.polaroid,#reasonBtn,.pop-balloon'))return;
  const h=document.createElement('div');
  h.textContent=['❤️','💕','💖'][Math.random()*3|0];
  h.style.cssText='position:fixed;left:'+(e.clientX-12)+'px;top:'+(e.clientY-12)+
    'px;z-index:58;pointer-events:none;font-size:1.3rem;animation:riseFade 1.2s ease forwards';
  document.body.appendChild(h);setTimeout(()=>h.remove(),1200);});

/* ================================================================
   AUDIO (Web Audio — no files needed)
================================================================ */
let AC=null,sfxOn=false,musicOn=false,musicEnabled=true,birthdayPlaying=false,musicTimer=null,birthdayTimer=null,musicResumeTimer=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return null}}
  if(AC&&AC.state==='suspended')AC.resume().catch(()=>{});
  return AC;}
function tone(f,dur,type,vol,when){if(!sfxOn||!AC)return;playTone(f,dur,type,vol,when);}
function playTone(f,dur,type='sine',vol=.15,when=0){if(!AC)return;try{
  const o=AC.createOscillator(),g=AC.createGain(),start=AC.currentTime+when;
  o.type=type;o.frequency.value=f;
  g.gain.setValueAtTime(.001,start);g.gain.linearRampToValueAtTime(vol,start+.04);
  g.gain.exponentialRampToValueAtTime(.001,start+dur);
  o.connect(g).connect(AC.destination);o.start(start);o.stop(start+dur+.02);
  }catch(e){}}
function sfx(){
  // Sound effects are intentionally disabled.
}

/* Background music — Mitski, "My Love Mine All Mine"
   (the song with the lyric "Moon, tell me if I could…").
   OPTION A: set CONFIG.songURL to an MP3 (real song, loops in background).
   OPTION B: built-in music-box arrangement of the song's chord loop:
   Amaj7 → C#7 → D → Dm (the progression the whole song is built on). */
const SONG_CHORDS=[
  {bass:110.00,notes:[220.00,277.18,329.63,415.30]}, // Amaj7  "Moon, a hole of light…"
  {bass:138.59,notes:[277.18,349.23,415.30,493.88]}, // C#7    "…through the big top tent up high"
  {bass:146.83,notes:[293.66,369.99,440.00,554.37]}, // D      "…shinin' down on me"
  {bass:146.83,notes:[293.66,349.23,440.00,554.37]}  // Dm     "Moon, tell me if I could…"
];
let songAudio=null;
function getSongAudio(){
  if(!songAudio){songAudio=new Audio(CONFIG.songURL);songAudio.loop=true;songAudio.volume=.75;songAudio.preload='auto';}
  return songAudio;
}
function startMusic(){
  if(!musicEnabled||birthdayPlaying||musicOn)return;
  if(CONFIG.songURL){ // real song file
    const audio=getSongAudio();
    audio.play().then(()=>{musicOn=true;}).catch(()=>{musicOn=false;});
    return;
  }
  musicOn=true;
  if(!ac())return;
  let chord=0,step=0;
  const playStep=()=>{
    if(!musicOn||!musicEnabled||birthdayPlaying)return;
    const c=SONG_CHORDS[chord%SONG_CHORDS.length];
    if(step%8===0)playTone(c.bass,2.9,'sine',.07);
    const n=c.notes[step%c.notes.length];
    playTone(n,.5,'triangle',.042);
    playTone(n*2,.32,'sine',.011); // faint sparkle octave
    step++;
    if(step%8===0)chord++;
    musicTimer=setTimeout(playStep,340);
  };
  playStep();
}
function stopMusic(){
  musicOn=false;clearTimeout(musicTimer);musicTimer=null;
  if(songAudio)songAudio.pause();
}
function restartMusic(){
  musicEnabled=true;
  birthdayPlaying=false;
  stopMusic();
  if(songAudio)songAudio.currentTime=0;
  startMusic();
}
function pauseForBirthday(){
  birthdayPlaying=true;
  stopMusic();
}
function resumeAfterBirthday(){
  birthdayPlaying=false;
  clearTimeout(musicResumeTimer);
  musicResumeTimer=setTimeout(startMusic,300);
}

// Happy Birthday starts from the cake click, which is already a user gesture.
const HAPPY_BIRTHDAY=[
  [392,.32],[392,.18],[440,.55],[392,.55],[523,.55],[494,1.0],
  [392,.32],[392,.18],[440,.55],[392,.55],[587,.55],[523,1.0],
  [392,.32],[392,.18],[784,.55],[659,.55],[523,.55],[494,.55],[440,1.0],
  [698,.32],[698,.18],[659,.55],[523,.55],[587,.55],[523,1.1]
];
function playHappyBirthday(){
  clearTimeout(birthdayTimer);pauseForBirthday();ac();if(!AC)return;
  let when=.15;
  HAPPY_BIRTHDAY.forEach(([f,d])=>{playTone(f,d*.82,'triangle',.12,when);when+=d;});
  birthdayTimer=setTimeout(()=>{
    birthdayTimer=null;
    resumeAfterBirthday();
  },(when+1)*1000);
}
$('#resetBtn').addEventListener('click',()=>{
  store.del('bday-progress');
  fireworksStop();
  restartMusic();
  clearTimeout(introRevealTimer);
  introRevealRun++;
  introRevealStarted=false;
  $('#introMessage').textContent='';
  $('#introMessage').classList.remove('intro-fade');
  $('#introName').classList.remove('intro-ready');
  $('#startBtn').classList.add('hidden');
  $('#startBtn').classList.remove('intro-ready');
  $('#fwLabel').classList.remove('show');
  document.body.classList.remove('night-mode');
  show(0);
  startIntroReveal();
});

function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600);}

function typewrite(el,text,speed){return new Promise(res=>{
  const paper=el.closest('.typewriter');
  el.textContent='';
  if(paper)paper.classList.add('typing');
  let i=0;
  (function step(){
    if(i<text.length){
      el.textContent=text.slice(0,++i);
      if(paper)paper.scrollTop=paper.scrollHeight;
      setTimeout(step,speed);
    }else{
      if(paper)paper.classList.remove('typing');
      res();
    }
  })();
});}

/* ================================================================
   1. INTRO
================================================================ */
$('#introName').textContent=CONFIG.name;

// Show one slow sentence at a time, then fade it out before the next one.
const introSentences=[
  'Hey birthday boy… 👀',
  'I made something special just for you.',
  'You mean more to me than words can say.',
  'So take your time and enjoy every surprise.'
];
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let introRevealStarted=false;
let introRevealTimer=null;
let introRevealRun=0;

function startIntroReveal(){
  clearTimeout(introRevealTimer);
  if(introRevealStarted)return;
  introRevealStarted=true;
  const run=++introRevealRun;

  const message=$('#introMessage');
  const button=$('#startBtn');
  if(!message||!button)return;

  button.classList.add('hidden');
  button.classList.remove('intro-ready');
  message.classList.remove('intro-fade');

  // Use scheduled callbacks instead of an async loop so the preview stays responsive.
  function showSentence(index){
    if(index>=introSentences.length){
      button.classList.remove('hidden');
      requestAnimationFrame(()=>{
        $('#introName').classList.add('intro-ready');
        button.classList.add('intro-ready');
      });
      return;
    }

    message.textContent='';
    message.classList.remove('intro-fade');
    let charIndex=0;
    const sentence=introSentences[index];
    const typeNextChar=()=>{
      if(run!==introRevealRun)return;
      if(charIndex<sentence.length){
        message.textContent=sentence.slice(0,++charIndex);
        introRevealTimer=setTimeout(typeNextChar,35);
        return;
      }

      introRevealTimer=setTimeout(()=>{
        if(run!==introRevealRun)return;
        if(index<introSentences.length-1){
          message.classList.add('intro-fade');
          introRevealTimer=setTimeout(()=>showSentence(index+1),750);
        }else{
          showSentence(index+1);
        }
      },850);
    };
    typeNextChar();
  }

  showSentence(0);
}

(function decor(){const d=$('#introDecor');
  [['🎈','balloon'],['🎈','balloon'],['💖','float-heart'],['✨','spark'],['💗','float-heart'],
   ['🎈','balloon'],['💜','float-heart'],['✨','spark']]
  .forEach(([e,cls])=>{const el=document.createElement('div');
    el.className='floater '+cls;el.textContent=e;
    el.style.left=(Math.random()*90)+'%';
    el.style.animationDuration=(9+Math.random()*10)+'s';
    el.style.animationDelay=(-Math.random()*14)+'s';
    d.appendChild(el);});})();
$('#startBtn').addEventListener('click',()=>next('envelope'));
/* Easter egg: tap his name 5 times */
let nameTaps=0;
$('#introName').addEventListener('click',()=>{if(++nameTaps===5){
  confetti(200);toast('🥚 Secret egg found… just like you found my heart. ❤️');sfx('magic');}});

/* ================================================================
   2. ENVELOPE
================================================================ */
function enter_envelope(){
  const env=$('#envelope');env.classList.remove('open');
  $('#s-envelope').classList.remove('letter-mode');
  $('#letterText').textContent='';
  $('#letterBox').classList.add('hidden');
  $('#envNext').classList.add('hidden');
  env.onclick=async()=>{if(env.classList.contains('open'))return;
    env.classList.add('open');
    await new Promise(r=>setTimeout(r,900));
    $('#s-envelope').classList.add('letter-mode');
    $('#letterBox').classList.remove('hidden');
    await typewrite($('#letterText'),CONFIG.letter,65);
    $('#envNext').classList.remove('hidden');};
}
$('#envNext').addEventListener('click',()=>next('balloons'));

/* ================================================================
   3. BALLOONS
================================================================ */
const BALLOON_COLORS=['linear-gradient(160deg,#ff6b9d,#c2185b)','linear-gradient(160deg,#a855f7,#6d28d9)',
  'linear-gradient(160deg,#6366f1,#3730a3)','linear-gradient(160deg,#f59e0b,#d97706)',
  'linear-gradient(160deg,#22c55e,#15803d)','linear-gradient(160deg,#ec4899,#be185d)',
  'linear-gradient(160deg,#06b6d4,#0369a1)','linear-gradient(160deg,#f43f5e,#be123c)'];
let popped=0;
function enter_balloons(){popped=0;
  $('#balloonNext').classList.add('hidden');
  $('#balloonHint').textContent='Pop 5 balloons. 🎈';
  const f=$('#balloonField');f.innerHTML='';
  for(let i=0;i<8;i++){const b=document.createElement('div');b.className='pop-balloon';
    b.style.background=BALLOON_COLORS[i];
    b.style.left=(4+Math.random()*82)+'%';
    b.style.top=(12+Math.random()*58)+'%';
    b.style.animationDelay=(-Math.random()*3)+'s';
    b.addEventListener('click',e=>{if(b.dataset.done)return;b.dataset.done='1';
      b.style.transform='scale(1.7)';b.style.opacity='0';
      sfx('pop');
      const pm=document.createElement('div');pm.className='pop-msg';
      pm.textContent=CONFIG.balloonMessages[popped]||'❤️';
      pm.style.left=(e.clientX-60)+'px';pm.style.top=(e.clientY-20)+'px';
      document.body.appendChild(pm);setTimeout(()=>pm.remove(),2200);
      popped++;
      $('#balloonHint').textContent='Pop 5 balloons. 🎈 ('+Math.min(popped,5)+'/5)';
      if(popped>=5){confetti(220);sfx('magic');
        $('#balloonHint').textContent='🎉 You did it! Okay… you’re ready for the next surprise.';
        $('#balloonNext').classList.remove('hidden');}});
    f.appendChild(b);}}
$('#balloonNext').addEventListener('click',()=>next('gallery'));

/* ================================================================
   4. GALLERY
================================================================ */
function enter_gallery(){const g=$('#gallery');g.innerHTML='';
  CONFIG.photos.forEach(p=>{const d=document.createElement('div');d.className='polaroid';
    d.innerHTML='<div class="photo">'+p.img+'</div><div class="cap">'+p.cap+'</div>';
    d.addEventListener('click',()=>{$('#lbPhoto').innerHTML=p.img;
      $('#lbMeta').innerHTML='<b>'+p.cap+'</b><br><span style="opacity:.8">'+p.date+' · '+p.place+'</span>';
      $('#lightbox').classList.add('show');sfx('tick');});
    g.appendChild(d);});}
$('#lightbox').addEventListener('click',()=>$('#lightbox').classList.remove('show'));
$('#galleryNext').addEventListener('click',()=>next('reasons'));

/* ================================================================
   5. REASONS
================================================================ */
let reasonIdx=0;
function enter_reasons(){reasonIdx=0;$('#reasonList').innerHTML='';
  $('#reasonEnd').classList.add('hidden');$('#reasonsNext').classList.add('hidden');
  $('#reasonBtn').style.display='block';}
$('#reasonBtn').addEventListener('click',()=>{
  if(reasonIdx>=CONFIG.reasons.length)return;
  const d=document.createElement('div');d.className='reason-item';
  d.textContent='❤️ '+CONFIG.reasons[reasonIdx++];
  $('#reasonList').replaceChildren(d);
  sfx('good');
  if(reasonIdx>=CONFIG.reasons.length){
    $('#reasonBtn').style.display='none';
    setTimeout(()=>{$('#reasonEnd').classList.remove('hidden');
      $('#reasonsNext').classList.remove('hidden');},700);}});
$('#reasonsNext').addEventListener('click',()=>next('quiz'));

/* ================================================================
   6. QUIZ
================================================================ */
let qi=0,qScore=0,qLock=false;
function enter_quiz(){qi=0;qScore=0;qLock=false;
  $('#quizNext').classList.add('hidden');
  $('#quizDots').innerHTML=CONFIG.quiz.map(()=>'<span></span>').join('');
  renderQ();}
function renderQ(){
  $$('#quizDots span').forEach((d,i)=>d.classList.toggle('on',i<qi));
  const q=CONFIG.quiz[qi];$('#quizQ').textContent='Q'+(qi+1)+': '+q.q;
  $('#quizFeedback').textContent='';qLock=false;
  const box=$('#quizOpts');box.innerHTML='';
  q.opts.forEach((o,i)=>{const b=document.createElement('button');b.className='q-opt';
    b.textContent=o;
    b.addEventListener('click',()=>{
      if(qLock)return;
      if(i===q.correct){qLock=true;b.classList.add('correct');qScore++;sfx('good');
        $('#quizFeedback').textContent='❤️ Correct! My smart boy.';
        confetti(30,b.getBoundingClientRect().left+40,b.getBoundingClientRect().top);
        setTimeout(()=>{qi++;
          if(qi<CONFIG.quiz.length)renderQ();
          else finishQuiz();},1400);}
      else{b.classList.add('wrong');sfx('bad');
        $('#quizFeedback').textContent=CONFIG.wrongResponses[Math.random()*CONFIG.wrongResponses.length|0];
        setTimeout(()=>b.classList.remove('wrong'),500);}});
    box.appendChild(b);});}
function finishQuiz(){
  $('#quizQ').textContent='🏆 BOYFRIEND SCORE';
  const pct=qScore/CONFIG.quiz.length,total=CONFIG.quiz.length;
  const verdict=pct===1?'PERFECT BOYFRIEND ❤️':pct>=.6?'Pretty good… but I know you can do better 😌'
    :'I will allow it… because you are cute. 😂❤️';
  $('#quizOpts').innerHTML='<div style="font-size:3.2rem;font-weight:800;color:var(--gold);text-shadow:0 0 30px rgba(255,209,102,.5)">'
    +qScore+'/'+total+'</div><p style="margin-top:12px;font-size:1.15rem">'+verdict+'</p>';
  $('#quizFeedback').textContent='';
  $('#quizNext').classList.remove('hidden');
  confetti(200);sfx('magic');}
$('#quizNext').addEventListener('click',()=>next('hug'));

/* ================================================================
   7. HUG
================================================================ */
function enter_hug(){$('#hugMsg').classList.add('hidden');$('#hugNext').classList.add('hidden');
  const h=$('#hugHeart');h.classList.remove('expand');h.style.display='block';delete h.dataset.done;}
$('#hugHeart').addEventListener('click',function(e){
  e.preventDefault();
  if(this.dataset.done)return;this.dataset.done='1';
  this.classList.add('expand');sfx('magic');
  document.body.classList.add('hugging');
  for(let i=0;i<24;i++)setTimeout(()=>{const r=document.createElement('div');
    r.className='rising-heart';r.textContent=['❤️','💖','💕','🧡'][Math.random()*4|0];
    r.style.left=Math.random()*100+'vw';r.style.animationDuration=(2+Math.random()*2)+'s';
    document.body.appendChild(r);setTimeout(()=>r.remove(),4000);},i*90);
  setTimeout(()=>{$('#hugMsg').classList.remove('hidden');
    $('#hugNext').classList.remove('hidden');document.body.classList.remove('hugging');},1700);});
$('#hugNext').addEventListener('click',()=>next('garden'));

/* ================================================================
   8. GARDEN
================================================================ */
const FLOWERS=['🌹','🌻','🌷','🌸','🌺'];
let planted=0;
function enter_garden(){planted=0;$('#gardenPlot').innerHTML='';
  $('#gardenLegend').classList.add('hidden');$('#gardenMsg').classList.add('hidden');
  $('#gardenNext').classList.add('hidden');
  const btn=$('#plantBtn');btn.style.display='inline-block';btn.disabled=false;}
$('#plantBtn').addEventListener('click',()=>{if(planted>=20)return;
  const f=document.createElement('div');f.className='flower';
  f.textContent=FLOWERS[planted%FLOWERS.length];f.style.animationDelay=(planted*.05)+'s';
  $('#gardenPlot').appendChild(f);planted++;sfx('tick');
  $('#plantBtn').textContent=planted<20?'🌱 Plant a flower ('+planted+'/20)':'🌸';
  if(planted>=20){$('#plantBtn').style.display='none';
    $('#gardenLegend').classList.remove('hidden');
    setTimeout(()=>{$('#gardenMsg').classList.remove('hidden');
      $('#gardenNext').classList.remove('hidden');confetti(100);sfx('magic');},800);}});
$('#gardenNext').addEventListener('click',()=>next('cake'));

/* ================================================================
   9. CAKE
================================================================ */
let cakeBlown=false;
function enter_cake(){cakeBlown=false;
  document.body.classList.remove('night-mode');
  $('#fwLabel').classList.remove('show');fireworksStop();
  $('#cake').classList.remove('lit-off');
  $('#blowBtn').classList.remove('hidden');
  $('#cakeNext').classList.add('hidden');}
$('#blowBtn').addEventListener('click',()=>{if(cakeBlown)return;cakeBlown=true;
  $('#cake').classList.add('lit-off');
  $('#blowBtn').classList.add('hidden');
  setTimeout(()=>{document.body.classList.add('night-mode');
    $('#fwLabel').classList.add('show');confetti(300);
    fireworksStart(650);},1200);
  setTimeout(()=>{$('#cakeNext').classList.remove('hidden');},4500);});
$('#cakeNext').addEventListener('click',()=>{fireworksStop();
  $('#fwLabel').classList.remove('show');next('gift');});

/* ================================================================
   10. GIFT
================================================================ */
function enter_gift(){const screen=$('#s-gift'),g=$('#giftBox');
  screen.classList.remove('letter-mode');
  g.classList.remove('open');g.dataset.clicks='0';
  g.style.opacity='1';$('#giftText').textContent='';
  $('#giftMsg').classList.add('hidden');$('#giftNext').classList.add('hidden');}
$('#giftBox').addEventListener('click',async function(){
  if(this.classList.contains('open'))return;
  this.dataset.clicks=String(+this.dataset.clicks+1);
  this.classList.add('shake');sfx('pop');
  setTimeout(()=>this.classList.remove('shake'),500);
  if(+this.dataset.clicks===1)toast('Its shy… tap it again! 😉');
  if(+this.dataset.clicks>=2){this.classList.add('open');confetti(250);sfx('magic');
    await new Promise(r=>setTimeout(r,700));
    $('#s-gift').classList.add('letter-mode');
    $('#giftMsg').classList.remove('hidden');
    await typewrite($('#giftText'),CONFIG.giftMessage,70);
    $('#giftNext').classList.remove('hidden');}});
$('#giftNext').addEventListener('click',()=>next('night'));

/* ================================================================
   11. NIGHT SKY
================================================================ */
function enter_night(){document.body.classList.add('night-mode');
  $$('.night-line').forEach(l=>l.style.opacity='0');
  $('#nightNext').classList.add('hidden');
  fireworksStart(900);
  $$('.night-line').forEach((l,i)=>setTimeout(()=>{l.style.opacity='1';sfx('tick');},1200+i*2000));
  setTimeout(()=>$('#nightNext').classList.remove('hidden'),1200+$$('.night-line').length*2000);}
$('#nightNext').addEventListener('click',()=>{fireworksStop();next('future');});

/* ================================================================
   12. FUTURE
================================================================ */
function enter_future(){const fe=$('#futureEnd');fe.style.opacity='0';
  const b=$('#bucket');b.innerHTML='';
  CONFIG.bucketList.forEach((item,i)=>{const d=document.createElement('div');
    d.className='bucket-item';
    d.innerHTML='<span class="box"></span><span>'+item+'</span>';
    b.appendChild(d);
    setTimeout(()=>{d.classList.add('show');sfx('tick');
      setTimeout(()=>d.querySelector('.box').textContent='✓',350);},600+i*550);});
  setTimeout(()=>{fe.style.opacity='1';confetti(180);sfx('magic');},
    600+CONFIG.bucketList.length*550+800);}

/* ================================================================
   BOOT
================================================================ */
show(Math.min(progress,ORDER.length-1));

// Try autoplay on the opening screen; browsers may wait for the first tap.
window.addEventListener('load',()=>{startMusic();startIntroReveal();});
document.addEventListener('pointerdown',()=>startMusic(),{once:true});

/* ============ INTRO MOON SCENE — starfield ============ */
(function(){const c=document.getElementById('msStars');if(!c)return;
for(let i=0;i<110;i++){const s=document.createElement('span');
s.className='ms-star'+(Math.random()<.12?' big':'');
s.style.left=(Math.random()*100).toFixed(2)+'%';
s.style.top=(Math.random()*86).toFixed(2)+'%';
s.style.animationDuration=(2+Math.random()*3.5).toFixed(2)+'s';
s.style.animationDelay=(-Math.random()*5).toFixed(2)+'s';
c.appendChild(s);}})();

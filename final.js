const flame = document.getElementById("flame");
const candle = document.getElementById("candle");
const hint = document.getElementById("hint");
const song = document.getElementById("song");

let lit = false;

// Candle click
candle.addEventListener("click", () => {

    // 🔥 LIGHT CANDLE
    if (!lit) {
        flame.style.opacity = "1";
        hint.innerText = "Blow the candle (tap again) 💨";

        if (song) {
            song.currentTime = 0;
            song.volume = 0.4;
            song.play().catch(() => {});
        }

        lit = true;
    } 
    
    // 💨 BLOW CANDLE
    else {
        flame.style.opacity = "0";


        hint.innerText = `Happy 22nd Birthday Anita ❤️
        Today is your day,
        May your day be as beautiful as your smile
        and your year be filled with happiness ✨`;

        startFireworks();
    }
});

// Fireworks
function startFireworks(){
    for(let i=0;i<40;i++){
        let f = document.createElement("div");
        f.className = "firework";
        f.style.setProperty("--hue", Math.floor(Math.random() * 360));
        document.body.appendChild(f);

        let x = window.innerWidth/2;
        let y = window.innerHeight/2;

        f.style.left = x+"px";
        f.style.top = y+"px";

        let angle = Math.random()*2*Math.PI;
        let dist = 200 + Math.random()*100;

        f.animate([
            {transform:"translate(0,0)",opacity:1},
            {transform:`translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px)`,opacity:0}
        ],{
            duration:1200
        });

        setTimeout(()=>f.remove(),1200);
    }
}

/* Floating emojis */
const emojis=["💖","💗","💕","✨","💝"];
setInterval(()=>{
    let e=document.createElement("div");
    e.className="emoji";
    e.innerText=emojis[Math.floor(Math.random()*emojis.length)];
    e.style.left=Math.random()*100+"vw";
    e.style.animationDuration=(6+Math.random()*6)+"s";
    document.querySelector(".emoji-bg").appendChild(e);
    setTimeout(()=>e.remove(),12000);
},300);


// -------- REAL CANVAS FIREWORKS --------
const canvas = document.getElementById("realFireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class RealFirework{
    constructor(x,y){
        this.particles = [];
        this.color = `hsl(${Math.random()*360},100%,60%)`; // ONE color
        for(let i=0;i<80;i++){
            this.particles.push({
                x:x,
                y:y,
                vx:(Math.random()-0.5)*6,
                vy:(Math.random()-0.5)*6,
                alpha:1,
                size: Math.random()*2 + 1
            });
        }
    }

    update(){
        this.particles.forEach(p=>{
            p.vy += 0.05;        // gravity ✨
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.012;
        });
    }

    draw(){
        this.particles.forEach(p=>{
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
            ctx.fillStyle = this.color;
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }
}


let realFireworks=[];

function launchRealFireworks(){
    setInterval(()=>{
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height*0.4;
    realFireworks.push(new RealFirework(x,y));
},900);

    animateFireworks();
}

function animateFireworks(){
    // semi-transparent background for trails
    ctx.fillStyle = "rgba(243, 234, 234, 0.3)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    realFireworks.forEach((fw,i)=>{
        fw.update();
        fw.draw();
        if(fw.particles[0].alpha <= 0){
            realFireworks.splice(i,1);
        }
    });

    requestAnimationFrame(animateFireworks);
}




// Hook into YOUR existing fireworks trigger
const originalStart = startFireworks;
startFireworks = function(){
    originalStart();      // your div fireworks
    launchRealFireworks();
     // real background fireworks
};


// -------- Emoji fallback (safe) --------
function startFloatingEmojis(){
    setInterval(()=>{
        const bg = document.querySelector(".emoji-bg");
        if(!bg) return;

        let e = document.createElement("div");
        e.className = "emoji";
        e.innerText = emojis[Math.floor(Math.random()*emojis.length)];
        e.style.left = Math.random()*100+"vw";
        e.style.animationDuration = (6+Math.random()*6)+"s";
        bg.appendChild(e);

        setTimeout(()=>e.remove(),12000);
    },600);
}



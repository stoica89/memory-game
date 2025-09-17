const joc = document.querySelector(".container");
const scor = document.getElementById("scor");
const btn = document.getElementById("btnReset");
let okCount = 0;
let poza1, poza2;
let busy = false;
let mutari = 0;


document.addEventListener("DOMContentLoaded",onload);
joc.addEventListener("click", onImageClik);

function onload() {
    btn.addEventListener("click", onReset);
    genereazaCartonase(4,4);
};

function onReset() {
    okCount = 0;
    btn.disabled = true;
    mutari = 0;
    joc.innerHTML = "";
    scor.textContent = "0";
    genereazaCartonase(4,4);
}

function onImageClik(e) {
    let poza = e.target;
    if(!poza.hasOwnProperty("k")) return;
    if(poza.hasOwnProperty("done") || poza == poza1 || busy) return;
    let key = poza.k;

    if(!poza1) {
        poza1 = poza;
        poza1.setAttribute("src", `./img/${key}.png`);
    } else {
        poza2 = poza;
        poza2.setAttribute("src", `./img/${key}.png`);
        mutari++;
        scor.textContent = mutari.toString();
        if(poza1.k == poza2.k) {
            okCount++;
            poza1.done = true;
            poza2.done = true;
            poza1 = poza2 = null;
            if(okCount == 8) {
                alert("Felicitari ai castigat!");
                btn.disabled = false;
            }
        } else {
            busy = true;
            setTimeout(() => {
                poza1.setAttribute("src", " ");
                poza2.setAttribute("src", " ");
                poza1 = poza2 = null;
                busy = false;
            }, 700)
        }
    } 
}

function genereazaCartonase(l,c) {
    let keys = Array(16).fill(0);
    let key = 0;
    for(let i = 0; i < keys.length; i++) {
        keys[i] = i%8 + 1;
    }
    for(let i = 0; i < l; i++) {
        for(let j = 0; j < c; j++) {
            let ndx = genereazaNumar(0,keys.length - 1);
            key = keys[ndx];
            let c = document.createElement('img');
            c.k = key;
            keys.splice(ndx,1);
            joc.appendChild(c);
        }
    }
}
function genereazaNumar(min,max) {
    return Math.ceil(min + Math.random() * (max - min));
}


function openInvitation(){

    const cover = document.getElementById('cover');
    const nav = document.getElementById('bottomNav');
    const music = document.getElementById('bgMusic');
    

    music.play();

    nav.classList.add('show');
    
    cover.style.opacity = '0';

    document.body.classList.remove('lock-scroll');

    setTimeout(() => {
        cover.style.display = 'none';
    }, 500);

}

const weddingDate = new Date("2026-07-07T09:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();
    const gap = weddingDate - now;

    if(gap < 0){
        return;
    }

    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((gap % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(
        '.fade-up,.fade-left,.fade-right,.zoom'
    );

    items.forEach(item => {
        item.classList.add('animate');
    });

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }else{
                entry.target.classList.remove('show');
            }

        });

    }, {
        threshold:0.2
    });

    items.forEach(item=>{
        observer.observe(item);
    });

});

const form = document.getElementById('rsvpForm');

const WEB_APP_URL =
'https://script.google.com/macros/s/AKfycby0kX22Spq0BRxmDIVqkky4tRJll4FIFnelKYAuEg3y1zHUMSE2sN4ypg5KvClRpz4u/exec';

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    try {

     const data = {
    nama: document.getElementById('nama').value,
    hadir: document.getElementById('kehadiran').value,
    ucapan: document.getElementById('pesan').value
};

        const response = await fetch(WEB_APP_URL,{
            method:'POST',
            body:JSON.stringify(data)
        });

        console.log(await response.text());

        alert('Ucapan berhasil dikirim');

        form.reset();

        loadUcapan();

    } catch(err){

        console.error(err);

        alert('Gagal mengirim RSVP');

    }

});
async function loadUcapan(){

    const response =
    await fetch(WEB_APP_URL);

    const data =
    await response.json();

    const list =
    document.getElementById('listUcapan');

    list.innerHTML='';

    data.reverse().forEach(item=>{

        list.innerHTML += `
        <div class="ucapan-item">

            <h4>${item.nama}</h4>

            <div class="status">
                ${item.hadir}
            </div>

            <p>${item.ucapan}</p>

        </div>
        `;

    });

}

loadUcapan();

const sections = document.querySelectorAll(
    '#hero, #pengantin, #countdown, #acara, #lokasi, #gift, #rsvp, #ucapan, #terimakasih'
);
let isScrolling = false;

window.addEventListener('wheel', (e) => {

    if(isScrolling) return;

    const current = [...sections].find(section => {

        const rect = section.getBoundingClientRect();

        return rect.top >= -50 && rect.top <= 50;

    });

    if(!current) return;

    const index = [...sections].indexOf(current);

    let nextIndex = index;

    if(e.deltaY > 0){
        nextIndex = Math.min(index + 1, sections.length - 1);
    }else{
        nextIndex = Math.max(index - 1, 0);
    }

    isScrolling = true;

    sections[nextIndex].scrollIntoView({
        behavior:'smooth'
    });

    setTimeout(()=>{
        isScrolling = false;
    },700);

});

const navItems =
document.querySelectorAll('.nav-item').forEach(item => {

    item.addEventListener('click', function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute('href')
        );

        if(target){

            target.scrollIntoView({
                behavior:'smooth'
            });

        }

    });

});

function openInvitation(){

    if(document.documentElement.requestFullscreen){
        document.documentElement.requestFullscreen();
    }

    const cover = document.getElementById('cover');
    const nav = document.getElementById('bottomNav');
    const music = document.getElementById('bgMusic');

    music.play();
    nav.classList.add('show');

    cover.style.opacity = '0';

    document.body.classList.remove('lock-scroll');

    setTimeout(() => {
        cover.style.display = 'none';
    }, 500);
}
function copyRekening(noRek){

    navigator.clipboard.writeText(noRek);

    alert('Nomor rekening berhasil disalin');
}
var audio = new Audio('./images/Y2meta.app - Trivia Quiz Background _ Game show music for content creator (128 kbps).mp3');
window.addEventListener("mouseover", () => {
    audio.play();
})
audio.loop = true;

var button = document.querySelector("#button-click")

button.onclick = (e) => {
    window.location.href = "/about.html";
}
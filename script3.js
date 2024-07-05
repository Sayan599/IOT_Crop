const path = +window.location.search.split("?")[1];
console.log(path)
var percent = (path * 100 / 10);

const button_click = document.querySelector("#button-click");

const box_correct = document.querySelector(".box-correct");
box_correct.style.width = `${percent}%`;
const box_wrong = document.querySelector(".box-wrong");
box_wrong.style.width = `${100 - percent}%`;

const correct_percent = document.querySelector(".correct-percent");
correct_percent.innerHTML = `${percent}%`;
const question_correct = document.querySelector(".question-correct");
question_correct.innerHTML = `${path}/10`;
const wrong_percent = document.querySelector(".wrong-percent");
wrong_percent.innerHTML = `${100 - percent}%`;



button_click.addEventListener("click", () => {
    window.location.href = "/";
})


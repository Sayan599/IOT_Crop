// Audio Player
var audio = new Audio('./images/Y2meta.app - Trivia Quiz Background _ Game show music for content creator (128 kbps).mp3');
window.onload = () => {
    audio.play();
}
audio.loop = true;

var question_box2;
var questCount = 0;
var correctAns = 0;
var timerId;
var timerId2;
var sec = 0;
var muted = false;

var timer = document.querySelector(".timer2");
var toggle = document.querySelector(".toggle");
var question = document.querySelector(".question");
var option_box = document.querySelector(".option");
var question_no = document.querySelector(".timer");

var questionArr = null;

toggle.addEventListener("click", () => {
    if (muted == false) {
        toggle.classList.toggle("muted");
        audio.pause();
        audio.currentTime = 0;
        muted = !muted;
    }
    else {
        toggle.classList.toggle("muted");
        audio.play();
        audio.loop = true;
        muted = !muted;
    }
})

const fetchData = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
    const res = await data.json();
    questionArr = res.results;
    fullquestion();
    time();
}
fetchData();

var next = document.querySelector("#next");
next.addEventListener("click", (e) => {
    if (questCount < 9) {
        questCount++;
        question_box2 = document.querySelector(".question-box2");
        clear();
        fullquestion();
        sec = 0;
        clearInterval(timerId);
        clearInterval(timerId2);
        document.body.style.backgroundColor = "#cbe2c1";
        time();
        console.log(correctAns);
    }
    else {
        window.location.replace("/overview.html?" + correctAns);
    }
})

function clear() {
    [...option_box.children].forEach((each) => {
        each.remove();
    })
    question_box2.remove();
}

function fullquestion() {
    const options = [];
    question_no.innerHTML = `${questCount + 1}/10`;
    const each = questionArr[questCount];
    console.log(each);
    const option_box_div = document.createElement("div");
    option_box_div.classList.add("option-box");
    for (let key in each) {
        if (key == "question") {
            const div = document.createElement("div");
            div.innerHTML = each[key];
            div.classList.add("question-box2");
            question.append(div);
        }
        if (key == "correct_answer") {
            const div = document.createElement("div");
            div.innerHTML = each[key];
            div.classList.add("select");
            div.id = Math.floor(Math.random() * (4 - 1) + 1);
            // option_box_div.append(div);
            options.push(div);
        }
        if (key == "incorrect_answers") {
            each[key].forEach((val, index) => {
                const div = document.createElement("div");
                div.innerHTML = val;
                div.classList.add("select");
                div.id = Math.floor(Math.random() * (4 - 1) + 1);
                options.push(div);

            })

        }
    }

    for (let index = 1; index <= 4; index++) {
        var arr = options.filter((val) => +val.id == index)
        option_box_div.append(...arr);
    }

    option_box.append(option_box_div);
    parse()
}
fullquestion()

function parse() {
    var select = document.querySelectorAll(".select");
    select.forEach((each) => {
        each.addEventListener("click", (e) => {
            if (questionArr[questCount].correct_answer === e.target.innerText) {
                e.target.classList.add("correct");
                var img = document.createElement("img");
                img.src = "./images/correct.svg";
                e.target.append(img);
                correctAns++;
            }
            else {
                var para = document.createElement('p');
                para.classList.add("error-message");
                para.innerText = "You chose";
                var img = document.createElement("img")
                img.src = "./images/wrong.svg"
                para.append(img);
                e.target.append(para)
                e.target.classList.add("error");

                select.forEach((each) => {
                    if (each.innerText === questionArr[questCount].correct_answer) {
                        each.classList.add("correct");
                        var img = document.createElement("img");
                        img.src = "./images/correct.svg";
                        each.append(img);
                    }
                })

            }
            select.forEach((each) => {
                each.style.pointerEvents = "none";
            })
            clearInterval(timerId);
            clearInterval(timerId2);

        })

    })
}

function time() {
    timerId = setInterval(() => {
        sec++;
        if (sec == 59) {
            timer.innerHTML = `01:00`;
            var select = document.querySelectorAll(".select");
            select.forEach((each) => {
                each.style.pointerEvents = "none";
            })
            select.forEach((each) => {
                if (each.innerText === questionArr[questCount].correct_answer) {
                    each.classList.add("correct");
                    var img = document.createElement("img");
                    img.src = "./images/correct.svg";
                    each.append(img);
                }
            })
            clearInterval(timerId);
            clearInterval(timerId2);
        }
        else if (sec == 30) {
            timer.innerHTML = `00:${sec}`
            timerId2 = setInterval(() => {
                if (sec % 2 == 0) {
                    document.body.style.backgroundColor = "rgba(255, 150, 173, 1)";
                }
                else {
                    document.body.style.backgroundColor = "rgba(230, 173, 173, 1)";
                }

            },)

        }
        else {
            timer.innerHTML = `00:${sec}`;
        }
    }, 1000)
}
time()
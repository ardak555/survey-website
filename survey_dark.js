import { circleQuestion } from "./question_type/score.js";
import { scaleQuestion } from "./question_type/scale.js";
import { singleOptQuestion } from "./question_type/single_opt.js";
import { multiOptQuestion } from "./question_type/multi_opt.js";
import { textQuestion } from "./question_type/text_que.js";

let questions = [
    {
        type: "score",
        question: "Hizmetimize Kaç Puan Veriyorsunuz?"
    },
    {
        type: "score",
        question: "Müşteri Temsilcimize Kaç Puan Veriyorsunuz?"
    },
    {
        type: "score",
        question: "Ürünlerimizden memnun musunuz?"
    },
    {
        type: "scale",
        question: "Maaş Beklentiniz Nedir?",
        options: ["Seçiniz", "20000-30000", "30000-40000", "40000-50000", "50000+"]
    },
    {
        type: "scale",
        question: "Hangi Konumda Çalışmak istersiniz?",
        options: ["Seçiniz", "İstanbul", "Ankara", "İzmir", "Remote"]
    },
    {
        type: "single_opt",
        question: "Hangi şehirde tatile gitmek istersiniz",
        options: ["Muğla", "Hawai", "Floransa", "Berlin", "Diğer"],
        notes: "Yanlızca bir seçenek işaretleme yapınız!"
    },
    {
        type: "multiple_opt",
        question: "En çok yararlandığınız kampanya/kampanyalar nelerdir",
        options: ["Kupon", "Kargo bedava", "Prime video", "Müşteri temsilcisi önceliği", "Ücretsiz randevulu Teslimat"],
        notes: "Birden çok işaretleme yapabilirsiniz!"
    },
    {
        type: "text",
        question: "Satın almış olduğunuz ürün hakkındaki görüşleriniz nedir?"
    },
];

let lastPage = {
    text: "Ankete Katıldığınız İçin Teşekkürler :)",
    link: "https://www.relateddigital.com/tr/"
}
let currentQuestionIndex = 0;
let answers = {};

let survey_style = document.createElement('style');
survey_style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
    --content-color: #FFFFFF;
    --background-color: #667588;
    --button-color: #28314E;
    --coice-color:#484F65;
    --chosen-color:#667588;
    --shadow-color:#28314E;
    --text-input-color: #28314E4d;
    --chosen-color-shadow: #2A314D4d;
}

body {
    margin: 0;
    font-family: 'Poppins', sans-serif; 
}

.main_content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--background-color);
}

.survey_content {
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--content-color);
    height: 80vh;
    width: 40vw;
    border-radius: 6px;
    background-color: var(--content-color);
    box-shadow: 2px 3px 110px var(--shadow-color);
}

.survey_question_box{
    font-weight: bold;
}

.survey_question_box, .survey_answers_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-bottom: 20px;
}

.survey_answers_box_radio {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-direction: column;
    width: 60%;
    gap: .5em;
}

.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--coice-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 5px;
    cursor: pointer;
    color: var(--coice-color);
}

.navi_button {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
}

.prev_button {
    width: 7.5em;
    border: 2px solid var(--button-color);
    background: var(--button-color);
    border-radius: 6px;
    padding: 1em;
}

.prev_button:disabled {
    opacity: 0.2;
}

.next_button {
    width: 7.5em;
    border: 2px solid var(--button-color);
    background: var(--button-color);
    border-radius: 6px;
    padding: 1em;
}

.next_button:disabled {
    opacity: 0.2;
}

.button--animated_back {
    background-color: var(--button-color);
    color: white;
    overflow: hidden;
    position: relative;
}

.button--animated_back .button__text_back {
    display: inline-block;
    transition: transform 0.3s ease;
}

.button--animated_back .button__icon_back {
    position: absolute;
    left: -20px;
    transition: left 0.3s ease;
}

.button--animated_back:hover .button__text_back {
    transform: translateX(10px);
}

.button--animated_back:hover .button__icon_back {
    left: 10px;
}

.button--animated {
    background-color: var(--button-color);
    color: white;
    overflow: hidden;
    position: relative;
}

.button--animated .button__text {
    display: inline-block;
    transition: transform 0.3s ease;
}

.button--animated .button__icon {
    position: absolute;
    right: -20px;
    transition: right 0.3s ease;
}

.button--animated:hover .button__text {
    transform: translateX(-10px);
}

.button--animated:hover .button__icon {
    right: 10px;
}

.prev_button:hover,
.next_button:hover {
    box-shadow: 2px 2px 3px var(--chosen-color-shadow);
}

.sellect_opt {
    border: 1px solid var(--shadow-color);
    border-radius: 10px;
    padding: .6em;
    background-color: var(--content-color);
    width: 70%;
    color: var(--coice-color);
}

.input_text {
    width: 70%;
    min-height: 6em;
    padding:.5em;
    border: 1px solid var(--text-input-color);
    border-radius: 15px;
    background: var(--text-input-color);
}

.radio_single {
    border-radius: 6px;
    width: 100%;
    padding: .5em .8em;
    background: linear-gradient(to left, var(--chosen-color) 50%, var(--coice-color) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background-position 0.1s ease, background-color 0.1s ease;

    
}

.radio_single:hover {
    color: white;
    background-position: left bottom;
}

.single_options_answer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 59%;
    margin-bottom: 20px;
    flex-direction: column;
    gap: 10px;
    }

.check_label {
    border-radius: 6px;
    width: 100%;
    padding: .2em;
    background: var(--chosen-color);
    background: linear-gradient(to left, var(--chosen-color) 50%, var(--coice-color) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background-position 0.7s ease;
}

.input_text_single {
    width: 104%; 
}

.moldals{
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
}

.modals_content{
    background-color: white;
    padding: 2em;
    border-radius: 8px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
    font-weight: bold;
    font-size: 1.5em;
    min-width: 40vw;
    min-height: 80vh;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 768px) {
    .survey_content {
        width: 90vw;
        height: auto;
    }
    .circle {
        width: 25px;
        height: 25px;
        font-size: 0.8em; 
        margin: 2px;
    }
    .input_text, .sellect_opt {
        width: 109%;
        min-height: 4em;
        padding:.8em;
    }
    
    .input_text_single {
        width: 104%; 
        padding:0.7em
    }

    .navi_button {
        flex-direction: column; 
    }
    .prev_button, .next_button {
        width: 100%;
        margin-bottom: 1em; 
        border-radius: 4px;
    }

    .modals_content{
        background-color: white;
        padding: 2em;
        border-radius: 8px;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
        font-weight: bold;
        font-size: 1.5em;
        width: 90vw;
        min-height: 25vh;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin:1em;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .survey_content {
        width: 70vw; 
        height: 45em;
    }
    .circle {
        width: 35px; 
        height: 35px;
        font-size: 0.9em; 
    }
    .input_text {
        width: 100%;
        padding:0.7em
    }
    .sellect_opt{
        width:80%;
    } 
    .input_text_single {
    width: 104%; 
}
}

@media (min-width: 1025px) and (max-width: 1600px) {
    .survey_content {
        width: 40vw; 
        height: 80vh;
    }
    .circle {
        width: 34px; 
        height: 34px;
        font-size: 1em; 
    }
    .input_text{
        width: 100%;
        padding:0.7em;
    }

    .sellect_opt{
        width:80%;
    } 
    
    .modals_content{
    background-color: white;
    padding: 2em;
    border-radius: 8px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px;
    font-weight: bold;
    font-size: 1.5em;
    width: 40vw; 
    height: 60vh; 
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

}

.option_attention{
    color: gray;
    font-size: small;
}



`;
document.head.append(survey_style);

const main_content = document.createElement("div");
main_content.classList.add('main_content');
document.body.append(main_content);

const survey_content = document.createElement("div");
survey_content.classList.add('survey_content');
main_content.append(survey_content);

const survey_questions = document.createElement("div");
survey_questions.classList.add('survey_question_box');

const survey_answers = document.createElement("div");
survey_answers.classList.add("survey_answers_box");

const navi_button = document.createElement("div");
navi_button.classList.add('navi_button');

const prev_button = document.createElement("button");
prev_button.classList.add('button', 'button--animated_back', 'prev_button');

const buttonTexts = document.createElement("span");
buttonTexts.classList.add('button__text_back');
buttonTexts.textContent = 'Önceki';

const buttonIcons = document.createElement("span");
buttonIcons.classList.add('button__icon_back');
buttonIcons.textContent = '←';

prev_button.append(buttonIcons, buttonTexts);

const next_button = document.createElement("button");
next_button.classList.add('button', 'button--animated', 'next_button');

const buttonText = document.createElement("span");
buttonText.classList.add('button__text');
buttonText.textContent = 'Sonraki';

const buttonIcon = document.createElement("span");
buttonIcon.classList.add('button__icon');
buttonIcon.textContent = '→';

const question_number = document.createElement("div");
question_number.classList.add("question_number");

next_button.append(buttonText, buttonIcon);
navi_button.append(prev_button, next_button);

survey_content.append(survey_questions, survey_answers, navi_button, question_number);

renderQuestion();



function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.question];

    switch (currentQuestion.type) {
        case 'score':
            next_button.disabled = currentAnswer === undefined;
            break;
        case 'scale':
            next_button.disabled = !currentAnswer || currentAnswer === 'Seçiniz';
            break;
        case 'single_opt':
            next_button.disabled = currentAnswer === undefined;
            break;
        case 'multiple_opt':
            next_button.disabled = !answers[currentQuestion.question] || answers[currentQuestion.question].length === 0;
            break;
        case 'text':
            next_button.disabled = !currentAnswer || currentAnswer.trim() === '';
            break;
        default:
            next_button.disabled = false;
    }

}



function beforeQue() {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.question];

    if (currentQuestion.type === 'score' && currentAnswer !== undefined) {
        const circles = survey_answers.querySelectorAll(".circle");
        circles.forEach((c, index) => {
            if (index < currentAnswer) {
                c.style.backgroundColor = "var(--coice-color)";
                c.style.color = "white";
                c.style.border = "1px solid var(--coice-color)";
            } else {
                c.style.backgroundColor = "";
                c.style.color = "var(--coice-color)";
                c.style.border = "1px solid var(--coice-color)";
            }
        });
    }

    if (currentQuestion.type === 'scale' && currentAnswer !== undefined) {
        const select = survey_answers.querySelector("select");
        if (select) {
            select.value = currentAnswer;
        }
    }

    if (currentQuestion.type === 'single_opt' && currentAnswer !== undefined) {
        const radios = survey_answers.querySelectorAll(".radio_single");
        radios.forEach(r => {
            if (r.textContent === currentAnswer) {
                r.style.background = "var(--coice-color)";
                r.style.color = "white";
            } else {
                r.style.background = "var(--chosen-color)";
                r.style.color = "black";
            }
        });
    }

    if (currentQuestion.type === 'multiple_opt' && currentAnswer !== undefined) {
        const radios = survey_answers.querySelectorAll(".radio_single");
        radios.forEach(r => {
            if (currentAnswer.includes(r.textContent)) {
                r.style.background = "var(--coice-color)";
                r.style.color = "white";
            } else {
                r.style.background = "var(--chosen-color)";
                r.style.color = "black";
            }
        });
    }

    if (currentQuestion.type === 'text' && currentAnswer !== undefined) {
        const input_answer = survey_answers.querySelector(".input_text");
        if (input_answer) {
            input_answer.value = currentAnswer;
        }
    }
}


function renderQuestion() {
    question_number.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
    survey_questions.textContent = questions[currentQuestionIndex].question;
    survey_answers.innerHTML = '';

    const questionType = questions[currentQuestionIndex].type;

    if (questionType === 'score') {
        circleQuestion(questions, currentQuestionIndex, survey_answers, answers, checkAnswer, beforeQue, logAnswer);
    } else if (questionType === 'scale') {
        scaleQuestion(questions, currentQuestionIndex, answers, survey_answers, checkAnswer, beforeQue, logAnswer);
    } else if (questionType === 'single_opt') {
        singleOptQuestion(questions, currentQuestionIndex, answers, survey_answers, checkAnswer, beforeQue, logAnswer);
    } else if (questionType === 'multiple_opt') {
        multiOptQuestion(questions, currentQuestionIndex, answers, survey_answers, checkAnswer, beforeQue, logAnswer);
    } else if (questionType === 'text') {
        textQuestion(questions, currentQuestionIndex, answers, survey_answers, checkAnswer, beforeQue, logAnswer);
    }


    prev_button.disabled = currentQuestionIndex === 0;
    next_button.disabled = !isAnswerValid();

    if (currentQuestionIndex === questions.length - 1) {
        buttonText.textContent = "Gönder";
        buttonIcon.textContent = "✓";
    } else {
        buttonText.textContent = "Sonraki";
        buttonIcon.textContent = "→";
    }
}

function isAnswerValid() {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.question];

    switch (currentQuestion.type) {
        case 'score':
            return currentAnswer !== undefined;
        case 'scale':
            return currentAnswer && currentAnswer !== 'Seçiniz';
        case 'single_opt':
            return currentAnswer !== undefined;
        case 'multiple_opt':
            return answers[currentQuestion.question] && answers[currentQuestion.question].length > 0;
        case 'text':
            return currentAnswer && currentAnswer.trim() !== '';
        default:
            return false;
    }
}


next_button.addEventListener("click", () => {
    if (isAnswerValid()) {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        }else {
            survey_content.style.display = "none";
        
            
            const modal = document.createElement("div");
            modal.classList.add("moldals");
            survey_content.appendChild(modal);
        
            const modalContent = document.createElement("div");
            modalContent.classList.add("modals_content");
            modalContent.textContent = lastPage.text;
        
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        
            next_button.disabled = true;
            logAnswer();
            
            setTimeout(function() {
                window.location.href = lastPage.link;
            }, 3000);
        }
    }


});

prev_button.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
});

function logAnswer() {
    console.log("Current Answers:", answers);
}



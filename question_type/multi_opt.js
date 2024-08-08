export function multiOptQuestion(questions, currentQuestionIndex, answers, survey_answers, checkAnswer, beforeQue, logAnswer) {

    const attention = document.createElement("div");
    attention.classList.add("option_attention");
    attention.textContent = questions[currentQuestionIndex].notes || "";

    survey_answers.classList.add("survey_answers_box_radio");
    questions[currentQuestionIndex].options.forEach(option => {
        const radio_multi = document.createElement("div");
        radio_multi.classList.add('radio_single');
        radio_multi.textContent = option;

        radio_multi.addEventListener("click", () => {
            if (!answers[questions[currentQuestionIndex].question]) {
                answers[questions[currentQuestionIndex].question] = [];
            }
            const index = answers[questions[currentQuestionIndex].question].indexOf(option);
            if (index === -1) {
                answers[questions[currentQuestionIndex].question].push(option);
                radio_multi.style.background = "var(--coice-color)";
                radio_multi.style.color = "white";
            } else {
                answers[questions[currentQuestionIndex].question].splice(index, 1);
                radio_multi.style.background = "var(--chosen-color)";
                radio_multi.style.color = "black";
            }
            checkAnswer();
        });

        survey_answers.append(radio_multi);
    });

    if (questions[currentQuestionIndex].notes) {
        survey_answers.append(attention);
    }
    beforeQue();
    logAnswer()
}
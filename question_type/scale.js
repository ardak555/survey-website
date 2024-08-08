export function scaleQuestion(questions, currentQuestionIndex, answers, survey_answers, checkAnswer, beforeQue, logAnswer) {
    const select = document.createElement("select");
    select.classList.add("sellect_opt");
    select.addEventListener("change", () => {
        answers[questions[currentQuestionIndex].question] = select.value;
        checkAnswer();
    });
    questions[currentQuestionIndex].options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        select.append(optionElement);
    });
    survey_answers.append(select);
    beforeQue();
    logAnswer();
}
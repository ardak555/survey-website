export function textQuestion(questions, currentQuestionIndex, answers, survey_answers, checkAnswer, beforeQue, logAnswer) {
    const input_answer = document.createElement("input");
    input_answer.classList.add("input_text");
    input_answer.addEventListener("input", () => {
        answers[questions[currentQuestionIndex].question] = input_answer.value;
        checkAnswer();
    });

    survey_answers.classList.remove("survey_answers_box_radio");
    survey_answers.append(input_answer);
    beforeQue();
    logAnswer()
}
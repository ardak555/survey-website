// circleQuestion.js
export function circleQuestion(questions, currentQuestionIndex, survey_answers, answers, checkAnswer, beforeQue, logAnswer) {
    const currentQuestion = questions[currentQuestionIndex];

    survey_answers.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.textContent = i;

        circle.addEventListener("click", () => {
            answers[currentQuestion.question] = i;

            const circles = survey_answers.querySelectorAll(".circle");
            circles.forEach((c, index) => {
                if (index < i) {
                    c.style.backgroundColor = "var(--coice-color)";
                    c.style.color = "white";
                    c.style.border = "1px solid var(--coice-color)";
                } else {
                    c.style.backgroundColor = "";
                    c.style.color = "var(--coice-color)";
                    c.style.border = "1px solid var(--coice-color)";
                }
            });

            checkAnswer();
        });

        survey_answers.append(circle);
    }
    survey_answers.classList.remove("survey_answers_box_radio");
    survey_answers.classList.remove("single_options_answer");
    beforeQue();
    checkAnswer();
    logAnswer();
}

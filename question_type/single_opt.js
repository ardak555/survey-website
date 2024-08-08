export function singleOptQuestion(questions, currentQuestionIndex, answers, survey_answers, checkAnswer, beforeQue, logAnswer) {
    let input_other = null;
    const attention = document.createElement("div");
    attention.classList.add("option_attention");
    attention.textContent = questions[currentQuestionIndex].notes || "";

    survey_answers.innerHTML = ''; 
    survey_answers.classList.add("single_options_answer");

    questions[currentQuestionIndex].options.forEach(option => {
        const radio = document.createElement("div");
        radio.classList.add('radio_single');
        radio.textContent = option;

        radio.addEventListener("click", () => {
            answers[questions[currentQuestionIndex].question] = option;

            const radios = survey_answers.querySelectorAll(".radio_single");
            radios.forEach(r => {
                r.style.background = (r.textContent === option) ? "var(--coice-color)" : "var(--chosen-color)";
                r.style.color = (r.textContent === option) ? "white" : "black";
            });

            if (option === "Diğer" && input_other) {
                input_other.style.display = "flex";
            } else if (input_other) {
                input_other.style.display = "none";
            }

            checkAnswer();
        });

        survey_answers.append(radio);

        if (option === "Diğer") {
            input_other = document.createElement("input");
            input_other.classList.add("input_text_single", "input_text");
            input_other.style.display = "none";
            input_other.addEventListener("input", () => {
                answers[questions[currentQuestionIndex].question] = input_other.value;
                checkAnswer();
            });

            survey_answers.append(input_other);
        }
    });

    if (questions[currentQuestionIndex].notes) {
        survey_answers.append(attention);
    }

    beforeQue();
    logAnswer()
}

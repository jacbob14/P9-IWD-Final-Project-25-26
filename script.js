const lChoice1 = document.querySelector("#labelChoice1")
const lChoice2 = document.querySelector("#labelChoice2")
const lChoice3 = document.querySelector("#labelChoice3")
const lChoice4 = document.querySelector("#labelChoice4")
const radio1 = document.querySelector("#choice1")
const radio2 = document.querySelector("#choice2")
const radio3 = document.querySelector("#choice3")
const radio4 = document.querySelector("#choice4")
const question = document.querySelector("#question")
const submitBtn = document.querySelector("#submitBtn")
const nextBtn = document.querySelector("#nextBtn")
const prevBtn = document.querySelector("#prevBtn")
const correctH3 = document.querySelector("#correctH3")
const incorrectH3 = document.querySelector("#incorrectH3")
const scoreEl = document.querySelector("#score")
const qCountEl = document.querySelector("#qCount")
const qSelectBtn = document.querySelector("#qSelectBtn")
const qs = document.querySelector("#qs")
const mc = document.querySelector("#mainContent")
const qSelect = document.querySelector("#qSelect")
const qSelectLoadingText = document.querySelector("#qSelectLoadingText")
const qSelectBackBtn = document.querySelector("#qSelectBackBtn")
const scoreDisplay = document.querySelector("#scoreDisplay")
const finalScoreTxt = document.querySelector("#finalScoreH2")
const returnBtn = document.querySelector("#returnBtn")
const labels = [lChoice1, lChoice2, lChoice3, lChoice4]
const radios = [radio1, radio2, radio3, radio4]

let correctIndex;

lChoice1.addEventListener("click", () => curSelect(1))
lChoice2.addEventListener("click", () => curSelect(2))
lChoice3.addEventListener("click", () => curSelect(3))
lChoice4.addEventListener("click", () => curSelect(4))

radio1.addEventListener("click", () => curSelect(1))
radio2.addEventListener("click", () => curSelect(2))
radio3.addEventListener("click", () => curSelect(3))
radio4.addEventListener("click", () => curSelect(4))

submitBtn.addEventListener("click", () => checkAnswer())
nextBtn.addEventListener("click", () => displayQuestion("next"))
prevBtn.addEventListener("click", () => displayQuestion("previous"))

qSelectBtn.addEventListener("click", () => displayContent(qSelect.value))
qSelectBackBtn.addEventListener("click", () => qSelectBack())
returnBtn.addEventListener("click", () => rreturn())

let questions = []
let index = 0
let currentSelect
let correctAns = []
let qCount = 10
let currentScore = 0;
let questionGuide = {}
let answeredQuestions = []
let questionAnswers = {}

async function fetchData(amount) {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=easy&type=multiple`)
    if (!response.ok) {
        question.textContent = "Loading..."
        qSelectLoadingText.classList.remove("d-none")
        fetchData()
        return
    }
    qSelectLoadingText.classList.add("d-none")
    const data = await response.json()

    questions = data.results
    questions.forEach(item => correctAns.push(item.correct_answer))
    for (let i = 0; i < qSelect.value; i++) {
        questionGuide[i] = "unanswered"
        questionGuide["choice" + i] = "none"
    }
    console.log(questionGuide)

    displayQuestion()
    scoreEl.textContent = `Current Score: ${currentScore}`
    qCountEl.textContent = `Questions answered: 0/${questions.length}`
    qs.classList.add("d-none")
    mc.classList.remove("d-none")
}

function displayContent(amount) {
    console.log(amount)
    fetchData(amount)
}

function displayQuestion(nextPrev) {
    if (nextPrev === "next") {
        index++

        correctH3.classList.add("d-none")
        incorrectH3.classList.add("d-none")

        if (index > 0) {
            prevBtn.classList.remove("disabled")
        }
        if (index === questions.length - 1) {
            nextBtn.classList.add("disabled")
        }

        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        if (!questionAnswers[index]) {
            correctIndex = Math.floor(Math.random() * 4)
            let incorrectAnswers = [...item.incorrect_answers]
            let correctAnswer = item.correct_answer
            let order = []
            let incorrectIndex = 0
            for (let i = 0; i < 4; i++) {
                if (i === correctIndex) {
                    order.push(correctAnswer)
                } else {
                    order.push(incorrectAnswers[incorrectIndex])
                    incorrectIndex++
                }
                questionAnswers[index] = order
            }
        }

            questionAnswers[index].forEach((answer, i) => {
                labels[i].innerHTML = answer
            })
        



        if (questionGuide[index] === "correct") {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            submitBtn.disabled = true

            correctH3.classList.remove("d-none")
            incorrectH3.classList.add("d-none")

        }
        else {
            radio1.disabled = false
            radio2.disabled = false
            radio3.disabled = false
            radio4.disabled = false
            submitBtn.disabled = false

        }

        if (questionGuide[index] === "incorrect") {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            submitBtn.disabled = true

            correctH3.classList.add("d-none")
            incorrectH3.classList.remove("d-none")
        }

        radio1.checked = false
        radio2.checked = false
        radio3.checked = false
        radio4.checked = false

        if (questionGuide["choice" + index] !== "none") {
            curSelect(questionGuide["choice" + index], "override")
        }
    }
    else if (nextPrev === "previous") {
        index--

        correctH3.classList.add("d-none")
        incorrectH3.classList.add("d-none")

        if (index === 0) {
            prevBtn.classList.add("disabled")
        }
        if (index < questions.length - 1) {
            nextBtn.classList.remove("disabled")
        }

        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        if (!questionAnswers[index]) {
            correctIndex = Math.floor(Math.random() * 4)
            let incorrectAnswers = [...item.incorrect_answers]
            let correctAnswer = item.correct_answer
            let order = []
            let incorrectIndex = 0
            for (let i = 0; i < 4; i++) {
                if (i === correctIndex) {
                    order.push(correctAnswer)
                } else {
                    order.push(incorrectAnswers[incorrectIndex])
                    incorrectIndex++
                }
                questionAnswers[index] = order
            }
        }

            questionAnswers[index].forEach((answer, i) => {
                labels[i].innerHTML = answer
            })

        if (questionGuide[index] === "correct") {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            submitBtn.disabled = true

            correctH3.classList.remove("d-none")
            incorrectH3.classList.add("d-none")
        }
        else {
            radio1.disabled = false
            radio2.disabled = false
            radio3.disabled = false
            radio4.disabled = false
            submitBtn.disabled = false

        }

        if (questionGuide[index] === "incorrect") {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            submitBtn.disabled = true

            correctH3.classList.add("d-none")
            incorrectH3.classList.remove("d-none")

        }

        radio1.checked = false
        radio2.checked = false
        radio3.checked = false
        radio4.checked = false

        if (questionGuide["choice" + index] !== "none") {
            curSelect(questionGuide["choice" + index], "override")
        }
    }
    else {
        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        if (!questionAnswers[index]) {
            correctIndex = Math.floor(Math.random() * 4)
            let incorrectAnswers = [...item.incorrect_answers]
            let correctAnswer = item.correct_answer
            let order = []
            let incorrectIndex = 0
            for (let i = 0; i < 4; i++) {
                if (i === correctIndex) {
                    order.push(correctAnswer)
                } else {
                    order.push(incorrectAnswers[incorrectIndex])
                    incorrectIndex++
                }
                questionAnswers[index] = order
            }
        }

            questionAnswers[index].forEach((answer, i) => {
                labels[i].innerHTML = answer
            })
        

        if (questionGuide[index] === "correct") {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            submitBtn.disabled = true

            correctH3.classList.remove("d-none")
            incorrectH3.classList.add("d-none")
        }

        if (questionGuide[index] === "incorrect") {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            submitBtn.disabled = true

            correctH3.classList.add("d-none")
            incorrectH3.classList.remove("d-none")
        }

        radio1.checked = false
        radio2.checked = false
        radio3.checked = false
        radio4.checked = false
        return
    }
}

function curSelect(item, action) {
    if (questionGuide[index] === "unanswered" && questionGuide[index] !== "incorrect") {
        currentSelect = item;
        radios[item - 1].checked = true
    }
    if (action === "override") {
        currentSelect = item;
        radios[item - 1].checked = true
    }
    return
}

function checkAnswer() {
    if (questionGuide[index] === "unanswered") {
        questionGuide["choice" + index] = currentSelect
        if (labels[currentSelect - 1].textContent === correctAns[index]) {
            currentScore++
            scoreEl.textContent = `Current Score: ${currentScore}`

            correctH3.classList.remove("d-none")
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            submitBtn.disabled = true
            questionGuide[index] = "correct"
            answeredQuestions.push(index)
            qCountEl.textContent = `Questions answered: ${answeredQuestions.length}/${qSelect.value}`
            if (answeredQuestions.length === Number(qSelect.value)) {
                mc.classList.add("d-none")
                finalScoreTxt.textContent = `${currentScore} out of ${qSelect.value}`
                scoreDisplay.classList.remove("d-none")
                console.log(questionGuide)
            }

        }
        else {
            incorrectH3.classList.remove("d-none")
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            submitBtn.disabled = true
            questionGuide[index] = "incorrect"
            answeredQuestions.push(index)
            qCountEl.textContent = `Questions answered: ${answeredQuestions.length}/${qSelect.value}`
            if (answeredQuestions.length === Number(qSelect.value)) {
                console.log("All questions submitted")
                mc.classList.add("d-none")
                finalScoreTxt.textContent = `${currentScore} out of ${qSelect.value}`
                scoreDisplay.classList.remove("d-none")
                console.log(questionGuide)
            }
        }
    }
    return
}

function rreturn() {
    index = 0
    currentScore = 0
    answeredQuestions = []
    questionGuide = {}
    correctAns = []
    questions = []
    questionAnswers = {}

    prevBtn.classList.add("disabled")
    nextBtn.classList.remove("disabled")
    radio1.disabled = false
    radio2.disabled = false
    radio3.disabled = false
    radio4.disabled = false
    correctH3.classList.add("d-none")
    incorrectH3.classList.add("d-none")
    submitBtn.disabled = false

    scoreDisplay.classList.add("d-none")
    qs.classList.remove("d-none")
}
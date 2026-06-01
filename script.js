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

let questions = []
let index = 0
let currentSelect
let correctAns = []
let qCount = 10
let currentScore = 0;
let answeredQuestions = []


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
    console.log(answeredQuestions)
    if (nextPrev === "next") {
        correctH3.classList.add("d-none")
        incorrectH3.classList.add("d-none")

        index++
        if (index > 0) {
            prevBtn.classList.remove("disabled")
        }
        if (index === questions.length - 1) {
            nextBtn.classList.add("disabled")
        }

        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        correctIndex = Math.floor(Math.random() * 4)
        let incorrectAnswers = [...item.incorrect_answers]
        let correctAnswer = item.correct_answer

        let incorrectIndex = 0
        for (let i = 0; i < 4; i++) {
            if (i === correctIndex) {
                labels[i].innerHTML = correctAnswer
            } else {
                labels[i].innerHTML = incorrectAnswers[incorrectIndex]
                incorrectIndex++
            }
        }

        if (answeredQuestions.includes(index)) {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            correctH3.classList.remove("d-none")
            incorrectH3.classList.add("d-none")

        }
        else {
            radio1.disabled = false
            radio2.disabled = false
            radio3.disabled = false
            radio4.disabled = false
        }
    }
    else if (nextPrev === "previous") {
        console.log(answeredQuestions)
        correctH3.classList.add("d-none")
        incorrectH3.classList.add("d-none")

        index--
        if (index === 0) {
            prevBtn.classList.add("disabled")
        }
        if (index < questions.length - 1) {
            nextBtn.classList.remove("disabled")
        }

        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        correctIndex = Math.floor(Math.random() * 4)
        incorrectAnswers = [...item.incorrect_answers]
        correctAnswer = item.correct_answer

        let incorrectIndex = 0
        for (let i = 0; i < 4; i++) {
            if (i === correctIndex) {
                labels[i].innerHTML = correctAnswer
            } else {
                labels[i].innerHTML = incorrectAnswers[incorrectIndex]
                incorrectIndex++
            }
        }

        if (answeredQuestions.includes(index)) {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            correctH3.classList.remove("d-none")
            incorrectH3.classList.add("d-none")
        }
        else {
            radio1.disabled = false
            radio2.disabled = false
            radio3.disabled = false
            radio4.disabled = false
        }
    }
    else {
        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        correctIndex = Math.floor(Math.random() * 4)
        incorrectAnswers = [...item.incorrect_answers]
        correctAnswer = item.correct_answer

        let incorrectIndex = 0
        for (let i = 0; i < 4; i++) {
            if (i === correctIndex) {
                labels[i].innerHTML = correctAnswer
            } else {
                labels[i].innerHTML = incorrectAnswers[incorrectIndex]
                incorrectIndex++
            }
        }
        
        if (answeredQuestions.includes(index)) {
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            correctH3.classList.remove("d-none")
            incorrectH3.classList.add("d-none")
        }
    }
    return
}

function curSelect(item) {
    if (!answeredQuestions.includes(index)) {
        currentSelect = item;
        radios[item - 1].checked = true
    }
    return
}

function checkAnswer() {
    if (!answeredQuestions.includes(index)) {
        if (labels[currentSelect - 1].textContent === correctAns[index]) {
            console.log(index + 1)
            currentScore++
            answeredQuestions.push(index)
            radio1.disabled = true
            radio2.disabled = true
            radio3.disabled = true
            radio4.disabled = true
            scoreEl.textContent = `Current Score: ${currentScore}`
            correctH3.classList.remove("d-none")
            incorrectH3.classList.add("d-none")
            if (answeredQuestions.length === Number(qSelect.value)) {
                console.log("All questions submitted")
                mc.classList.add("d-none")
                finalScoreTxt.textContent = `${answeredQuestions.length} out of ${qSelect.value}`
                scoreDisplay.classList.remove("d-none")

            }

        }
        else {
            incorrectH3.classList.remove("d-none")

        }
    }
    return
}







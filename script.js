const lChoiceOne = document.querySelector("#labelChoice1")
const lChoiceTwo = document.querySelector("#labelChoice2")
const lChoiceThree = document.querySelector("#labelChoice3")
const lChoiceFour = document.querySelector("#labelChoice4")
const radioOne = document.querySelector("#choice1")
const radioTwo = document.querySelector("#choice2")
const radioThree = document.querySelector("#choice3")
const radioFour = document.querySelector("#choice4")
const question = document.querySelector("#question")
const submitBtn = document.querySelector("#submitBtn")
const nextBtn = document.querySelector("#nextBtn")
const prevBtn = document.querySelector("#prevBtn")
const correctH3 = document.querySelector("#correctH3")
const incorrectH3 = document.querySelector("#incorrectH3")
const scoreEl = document.querySelector("#score")
const qCountEl = document.querySelector("#qCount")
const labels = [lChoiceOne, lChoiceTwo, lChoiceThree, lChoiceFour]
const radios = [radioOne, radioTwo, radioThree, radioFour]

lChoiceOne.addEventListener("click", () => curSelect(1))
lChoiceTwo.addEventListener("click", () => curSelect(2))
lChoiceThree.addEventListener("click", () => curSelect(3))
lChoiceFour.addEventListener("click", () => curSelect(4))

radioOne.addEventListener("click", () => curSelect(1))
radioTwo.addEventListener("click", () => curSelect(2))
radioThree.addEventListener("click", () => curSelect(3))
radioFour.addEventListener("click", () => curSelect(4))

submitBtn.addEventListener("click", () => checkAnswer())
nextBtn.addEventListener("click", () => displayQuestion("next"))
prevBtn.addEventListener("click", () => displayQuestion("previous"))

let questions = []
let index = 0
let currentSelect
let correctAns = []
let qCount = 10

async function fetchData() {
    const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    if (!response.ok) {
        question.textContent = "Loading..."
        fetchData()
        return
    }
    const data = await response.json()

    questions = data.results
    questions.forEach(item => correctAns.push(item.correct_answer))
    displayQuestion()
    scoreEl.textContent = `0`
    qCountEl.textContent = `0/10`
}

function displayQuestion(nextPrev) {
    if (nextPrev === "next") {
        correctH3.classList.add("d-none")
        incorrectH3.classList.add("d-none")

        index++
        if (index > 0) {
            prevBtn.classList.remove("disabled")
        }
        if (index === 9) {
            nextBtn.classList.add("disabled")
        }
        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        const allAnswers = [item.correct_answer, ...item.incorrect_answers]
        lChoiceOne.innerHTML = allAnswers[0]
        lChoiceTwo.innerHTML = allAnswers[1]
        lChoiceThree.innerHTML = allAnswers[2]
        lChoiceFour.innerHTML = allAnswers[3]
    }
    else if (nextPrev === "previous") {
        index--
        if (index === 0) {
            prevBtn.classList.add("disabled")
        }
        if (index < 9) {
            nextBtn.classList.remove("disabled")
        }

        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        const allAnswers = [item.correct_answer, ...item.incorrect_answers]
        lChoiceOne.innerHTML = allAnswers[0]
        lChoiceTwo.innerHTML = allAnswers[1]
        lChoiceThree.innerHTML = allAnswers[2]
        lChoiceFour.innerHTML = allAnswers[3]
    }
    else {
        const item = questions[index]
        question.innerHTML = `${index + 1}. ${item.question}`

        const allAnswers = [item.correct_answer, ...item.incorrect_answers]
        lChoiceOne.innerHTML = allAnswers[0]
        lChoiceTwo.innerHTML = allAnswers[1]
        lChoiceThree.innerHTML = allAnswers[2]
        lChoiceFour.innerHTML = allAnswers[3]
    }
    return
}

function curSelect(item) {
    currentSelect = item;
    labels.forEach(l => l.classList.remove("bg-primary", "px-3", "py-2", "bg-opacity-25", "rounded"))
    labels[item - 1].classList.add("bg-primary", "px-3", "py-2", "bg-opacity-25", "rounded")
    labels[item - 1].classList.add("bg-primary", "px-3", "py-2", "bg-opacity-25", "rounded")
    radios[item - 1].checked = true
}

function checkAnswer() {
    if (labels[currentSelect - 1].textContent === correctAns[index]) {
        correctH3.classList.remove("d-none")
        incorrectH3.classList.add("d-none")

    }
    else {
        incorrectH3.classList.remove("d-none")
    }
}

fetchData()





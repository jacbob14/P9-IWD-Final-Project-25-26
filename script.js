const lChoiceOne = document.querySelector("#labelChoice1")
const lChoiceTwo = document.querySelector("#labelChoice2")
const lChoiceThree = document.querySelector("#labelChoice3")
const lChoiceFour = document.querySelector("#labelChoice4")
const question = document.querySelector("#question")

let questions = []
let currentIndex = 0

async function fetchData() {
    const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    const data = await response.json()

   questions = data.results
   displayQuestion(currentIndex)
}

function displayQuestion(index) {
    const item = questions[index]
    question.innerHTML = `${index + 1}. ${item.question}`

    const allAnswers = [item.correct_answer, ...item.incorrect_answers]
    lChoiceOne.innerHTML = allAnswers[0]
    lChoiceTwo.innerHTML = allAnswers[1]
    lChoiceThree.innerHTML = allAnswers[2]
    lChoiceFour.innerHTML = allAnswers[3]

}

fetchData()
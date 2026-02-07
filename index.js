import quizData from "./quizData.js";
let render = document.getElementById('render')
let formElm = document.getElementById('form-el')
let currentQuestionIndex = 0

document.addEventListener('click', function(e){
    if(e.target.id === 'submit'){
        checkAnswer()
    }else if(e.target.id === 'restart'){
        currentQuestionIndex = 0
        renderQuestion() 
        document.getElementById('display-score').innerHTML = '' 
 }
})

function renderQuestion(){
    let optionList = ''
 let currentQuestion = quizData[currentQuestionIndex]

   currentQuestion.options.forEach(function(option){
    optionList += `<input type="radio" name="choice" id="${option}">
    <label for="${option}">${option}</label>`
   }) 
  render.innerHTML = currentQuestion.question
  formElm.innerHTML = `${optionList}
                        <button type="submit" id="submit">Submit answer</button>
   `
}

renderQuestion()

    let trackScore = 0
function checkAnswer(){
    let currentQuestion = quizData[currentQuestionIndex]
    const radioArr = document.querySelectorAll('input[name = "choice"]')

    const checkedRadio = Array.from(radioArr).find(function(radio){
          return radio.checked
    })
    if(currentQuestion.options.indexOf(checkedRadio.id) === currentQuestion.correct){
        trackScore++
        }           currentQuestionIndex++ 
    if(currentQuestionIndex >= quizData.length){
        showResult()
    }else{
        renderQuestion()
    }
}

function showResult(){
    render.innerHTML = ''
    formElm.innerHTML = ''
    document.getElementById('display-score').innerHTML = `<p>Your score: ${trackScore} out of ${quizData.length}</p>
                                                          <button id="restart">Restart Quiz</button>`
}
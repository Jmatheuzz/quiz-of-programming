
import {data} from './data.js'

const quiz = document.querySelector('#quiz')
const answerEls = document.querySelectorAll('.answer')
const statement = document.querySelector('#statement')
const scoreEl = document.querySelector('#score')
const aText = document.querySelector('#a_text')
const numberQuestionEl = document.querySelector('#number-question')
const bText = document.querySelector('#b_text')
const cText = document.querySelector('#c_text')
const dText = document.querySelector('#d_text')
const submitBtn = document.querySelector('#submit')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    clearQuiz()
    numberQuestionEl.innerHTML = `Pergunta ${currentQuiz + 1}`
    const currentQuizData = data[currentQuiz]
    statement.innerText = currentQuizData.question
    aText.innerText = currentQuizData.a
    bText.innerText = currentQuizData.b
    cText.innerText = currentQuizData.c
    dText.innerText = currentQuizData.d
}

function clearQuiz() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    
    if(answer) {
        if(answer === data[currentQuiz].correct) {
            score++
            scoreEl.innerHTML = `
                <span style="color: green">Certa resposta, seu placar atual é ${score}/${data.length}</span>
            `
            
        }else {
            scoreEl.innerHTML = `
                <span style="color: red">Que pena, você errou, seu placar atual é ${score}/${data.length}</span>
            `
        }

        currentQuiz++
        if(currentQuiz < data.length) {
            console.log(currentQuiz)
            console.log(data.length)
            setTimeout(()=>{
                loadQuiz()
                scoreEl.innerHTML = ''
            }, 2000)
        } else {
            setTimeout(() => {
                quiz.innerHTML = ''
                console.log(scoreEl)
                scoreEl.innerHTML = `<h1 style="color: blue; text-align: center">Você respondeu ${score}/${data.length} questões corretas</h1>

                <button onclick="location.reload()">Responder novamente</button>`
                
            }, 2000)
        }
    }
})

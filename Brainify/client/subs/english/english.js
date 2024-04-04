const questions=[
    {
        question:"They ________ her and trusted her for years.",
        answers:[
            { text:"know",correct: false},
            { text:"had known",correct: false},
            { text:"knew",correct: true},
            { text:"known",correct: false},
        ]
    },

    // #2
    {
        question:"Every morning she _______ up early and gets ready for work..",
        answers:[
            { text:"is waking",correct: false},
            { text:"has woken",correct: false},
            { text:"had woken",correct: false},
            { text:"wakes",correct: true},
        ]
    },

    // #3
    {
        question:"People ________ walk on grass.",
        answers:[
            { text:"couldn't",correct: false},
            { text:"needn't",correct: false},
            { text:" mustn't",correct: true},
            { text:"may not",correct: false},
        ]
    },


    // #4
    {
        question:"________ you speak any foreign languages?",
        answers:[
            { text:"can't",correct: false},
            { text:"should",correct: false},
            { text:"couldn't",correct: false},
            { text:"can",correct: true},
        ]
    },

    // #5
    {
        question:"World war I and World war II took place _______ the 20th century.",
        answers:[
            { text:"on",correct: false},
            { text:"in",correct: true},
            { text:"at",correct: false},
            { text:"into",correct: false},
        ]
    },

    // #6
    {
        question:"The standard unit of measurement for energy is ____.",
        answers:[
            { text:"Newton",correct: false},
            { text:"Ampere",correct: false},
            { text:"Watt",correct: false},
            { text:" Joule",correct: true},
        ]
    },

    // #7
    {
        question:"They built this temple 3,000 years ago. This must ______ a great civilization.",
        answers:[
            { text:"but",correct: true},
            { text:"or",correct: false},
            { text:"so",correct: false},
            { text:"and",correct: false},
        ]
    },

    // #8
    {
        question:"This must not happen again, ______ you will be dismissed.",
        answers:[
            { text:"or",correct: true},
            { text:"but",correct: false},
            { text:"and",correct: false},
            { text:"so",correct: false},
        ]
    },


    // #9
    {
        question:"If A is equal to B and B is equal to C, ________ A is equal to C.",
        answers:[
            { text:"than",correct: false},
            { text:"then",correct: true},
            { text:"so",correct: false},
            { text:"none of the above",correct: false},
        ]
    },

    // #10
    {
        question:"French people love cooking, ________ the English don't seem very interested.",
        answers:[
            { text:"When",correct: false},
            { text:"Whenever",correct: false},
            { text:"where",correct: false},
            { text:"Whereas",correct: true},
        ]
    }
    
]

const questionElement = document.getElementById("q1");
const answerButtons = document.getElementById("ans");
const nextButton = document.getElementById("next");
let quizBox = document.querySelector('.quiz');
let resultBox = document.querySelector('.resultBox');
let tryAgainBtn = document.querySelector('.tryAgain-btn');

let currentQuestionIndex = 0;
let score = parseInt(document.querySelector('#points').innerText);

function startQuix(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerText="next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex +1;
    document.querySelector('#no_q').innerText=questionNo;
    questionElement.innerHTML = questionNo + "." + currentQuestion. 
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("ans1");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display='none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e){
    const selectedans1 = e.target;
    const isCorrect = selectedans1.dataset.correct === "true"
    if(isCorrect){
        selectedans1.classList.add("correct");
        score++;
        document.querySelector('#points').innerText=score;     
    }else{
        selectedans1.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display="block";
}

function ShowResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent=`You have scored ${score} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (score / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++
        
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#F806CC ${progressStartValue * 3.6}deg, #f806cc5f 0deg)`;

        if (progressStartValue == progressEndValue) {
            clearInterval(progress);            
        }
    }, speed);
};

nextButton.addEventListener("click", ()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length-1){
        showQuestion();
    }else if(currentQuestionIndex == questions.length-1){
        showQuestion();
        nextButton.innerText = "Show Result";
    }
    else{
        ShowResultBox();
    }
});

tryAgainBtn.addEventListener("click",() => {
    resultBox.classList.remove('active');
    quizBox.classList.add('active');
    startQuix();
    document.querySelector('#points').innerText=score;     
})

startQuix();
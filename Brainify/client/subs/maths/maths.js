const questions=[
    {
        question:"How Many Months Make a Century?",
        answers:[
            { text:"12",correct: false},
            { text:"120",correct: false},
            { text:"1200",correct: true},
            { text:"12000",correct: false},
        ]
    },

    // #2
    {
        question:"How Many Sides are there in a Decagon?",
        answers:[
            { text:"7",correct: false},
            { text:"8",correct: false},
            { text:"9",correct: false},
            { text:"10",correct: true},
        ]
    },

    // #3
    {
        question:"60 Times of 8 Equals to",
        answers:[
            { text:" 480",correct: true},
            { text:"300",correct: false},
            { text:"250",correct: false},
            { text:"400",correct: false},
        ]
    },


    // #4
    {
        question:"What is the highest common factor of the numbers 30 and 132?",
        answers:[
            { text:" 3",correct: false},
            { text:"6",correct: true},
            { text:"7",correct: false},
            { text:"9",correct: false},
        ]
    },

    // #5
    {
        question:"What is the sum of 130+125+191?",
        answers:[
            { text:"335",correct: false},
            { text:"456",correct: false},
            { text:"446",correct: true},
            { text:"426",correct: false},
        ]
    },

    // #6
    {
        question:"The product of 82 and 5 is?",
        answers:[
            { text:"400",correct: false},
            { text:" 410",correct: true},
            { text:"420",correct: false},
            { text:"None of these",correct: false},
        ]
    },

    // #7
    {
        question:"Find the missing terms in multiple of 3: 3, 6, 9, __, 15",
        answers:[
            { text:"10",correct: false},
            { text:"11",correct: false},
            { text:"12",correct: true},
            { text:"13",correct: false},
        ]
    },

    // #8
    {
        question:"What is the next prime number after 5?",
        answers:[
            { text:"6",correct: false},
            { text:"7",correct: true},
            { text:"9",correct: false},
            { text:"11",correct: false},
        ]
    },


    // #9
    {
        question:"The product of 121 * 0 * 200 * 25 is",
        answers:[
            { text:"1500",correct: false},
            { text:"0",correct: true},
            { text:"4000",correct: false},
            { text:"None of these",correct: false},
        ]
    },

    // #10
    {
        question:"What is 1/4 written as a decimal?",
        answers:[
            { text:"0.25",correct: true},
            { text:"0.5",correct: false},
            { text:"0.75",correct: false},
            { text:"0.15",correct: false},
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
        circularProgress.style.background = `conic-gradient(cyan ${progressStartValue * 3.6}deg,rgba(0, 255, 255, 0.1) 0deg)`;

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
const questions=[
    {
        question:"Who was the leader of the movement for the unification of Italy?",
        answers:[
            { text:"Giuseppe Mazzini",correct: false},
            { text:"Otto von Bismarck",correct: false},
            { text:"Count Cavour",correct: false},
            { text:"Garibaldi",correct: true},
        ]
    },

    // #2
    {
        question:"Which among the following countries did not have a colonial presence in Indo-China??",
        answers:[
            { text:"France",correct: false},
            { text:"Spain",correct: true},
            { text:"Britain",correct: false},
            { text:"None of the above",correct: false},
        ]
    },

    // #3
    {
        question:"Who was the founder of the Indian National Congress?",
        answers:[
            { text:"Mahatma Gandhi",correct: false},
            { text:"Jawaharlal Nehru",correct: false},
            { text:" A.O. Hume",correct: true},
            { text:"Bal Gangadhar Tilak",correct: false},
        ]
    },


    // #4
    {
        question:"The term Globalisation refers to:",
        answers:[
            { text:"The process of creating a global government",correct: false },
            { text:" The process of increasing interconnectedness of the world's economies",correct: true},
            { text:"The process of spreading a particular culture around the world",correct: false},
            { text:"The process of establishing world peace",correct: false},
        ]
    },

    // #5
    {
        question:"Which industry was the first to be established in India during the British rule?",
        answers:[
            { text:" Textile",correct: true},
            { text:"Iron and steel",correct: false},
            { text:"Jute",correct: false},
            { text:"Sugar",correct: false},
        ]
    },

    // #6
    {
        question:"The painting Les Demoiselles d'Avignon was created by:",
        answers:[
            { text:"Vincent Van Gogh",correct: false},
            { text:"Claude Monet",correct: false},
            { text:"Paul Cézanne",correct: false},
            { text:" Pablo Picasso",correct: true},
        ]
    },

    // #7
    {
        question:"The first printed book in Europe was:",
        answers:[
            { text:"The Canterbury Tales",correct: false},
            { text:"Endoplasmic reticulum",correct: false},
            { text:"The Divine Comedy",correct: false},
            { text:"The Bible",correct: true},
        ]
    },

    // #8
    {
        question:"The novel Robinson Crusoe was written by:",
        answers:[
            { text:"Charles Dickens",correct: false},
            { text:"Daniel Defoe",correct: true},
            { text:"Jane Austen",correct: false},
            { text:"George Eliot",correct: false},
        ]
    },


    // #9
    {
        question:"Which of the following is a non-renewable resource?",
        answers:[
            { text:"Solar energy",correct: false},
            { text:"Wind energy",correct: false},
            { text:"Coal",correct: true},
            { text:"Tidal energy",correct: false},
        ]
    },

    // #10
    {
        question:"Which of the following is a biodegradable waste?",
        answers:[
            { text:"Plastic",correct: false},
            { text:"paper",correct: false},
            { text:"Oxygen",correct: false},
            { text:"Paper",correct: true},
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
        circularProgress.style.background = `(#F7FD04 ${progressStartValue * 3.6}deg,#f9fd045a 0deg)`;

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
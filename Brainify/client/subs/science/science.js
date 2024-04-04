const questions=[
    {
        question:"What part of the body helps you move?",
        answers:[
            { text:"Eyes",correct: false},
            { text:"Lungs",correct: false},
            { text:"Pancreas",correct: false},
            { text:"Muscles",correct: true},
        ]
    },

    // #2
    {
        question:"The two holes of the nose are called?",
        answers:[
            { text:"Eyelids",correct: false},
            { text:"Nostrils",correct: true},
            { text:"Nails",correct: false},
            { text:"Hair",correct: false},
        ]
    },

    // #3
    {
        question:"Which group of animals have scales?",
        answers:[
            { text:"Mammals",correct: false},
            { text:"Amphibians",correct: false},
            { text:" Reptiles",correct: true},
            { text:"Both a and b",correct: false},
        ]
    },


    // #4
    {
        question:"When you push something, you apply _______.",
        answers:[
            { text:"Force",correct: true},
            { text:" Acceleration",correct: false},
            { text:"Mass",correct: false},
            { text:"Compression",correct: false},
        ]
    },

    // #5
    {
        question:"Which scientist proposed the three laws of motion?",
        answers:[
            { text:" Isaac Newton",correct: true},
            { text:"Thomas Alva Edison",correct: false},
            { text:"Albert Einstein",correct: false},
            { text:"Stephen Hawking",correct: false},
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
        question:"Which cell organelle is also called the powerhouse of the cell?",
        answers:[
            { text:"Ribosome",correct: false},
            { text:"Endoplasmic reticulum",correct: false},
            { text:"Cytoplasm",correct: false},
            { text:"Mitochondria",correct: true},
        ]
    },

    // #8
    {
        question:"What is the atomic number of Oxygen?",
        answers:[
            { text:"5",correct: false},
            { text:"8",correct: true},
            { text:"12",correct: false},
            { text:"22",correct: false},
        ]
    },


    // #9
    {
        question:"Total number of elements in the periodic table?",
        answers:[
            { text:"112",correct: false},
            { text:"115",correct: false},
            { text:"118",correct: true},
            { text:"127",correct: false},
        ]
    },

    // #10
    {
        question:"Which one is the lightest elelmet in the periodic table?",
        answers:[
            { text:"Hydrogen",correct: false},
            { text:"Helium",correct: false},
            { text:"Oxygen",correct: false},
            { text:"Carbon",correct: true},
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
        circularProgress.style.background = `conic-gradient(#BC6FF1 ${progressStartValue * 3.6}deg,#bd6ff121 0deg)`;

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
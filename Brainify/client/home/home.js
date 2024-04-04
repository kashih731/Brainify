let subs = document.querySelectorAll('.sub');
let popup = document.querySelector('.popup');
let main = document.querySelector('.main');
let endBtn = document.querySelector('.ext-btn');
let contBtn = document.querySelector('.cont-btn');

subs.forEach( (sub) => {
    sub.addEventListener('click', () =>{
        popup.classList.add('active');
        main.classList.add('active');
    });
});

endBtn.addEventListener('click', () =>{
    popup.classList.remove('active');
    main.classList.remove('active');
});

subs.forEach( (sub) => {
    sub.addEventListener('click', (s) =>{
        subject = s.target.innerText;
        if(subject == "Maths"){
            document.querySelector('#quizLink').href = "/Brainify/client/subs/maths/maths.html";
        }
        else if(subject == "SST"){
            document.querySelector('#quizLink').href = "/Brainify/client/subs/sst/sst.html";
        }
        else if(subject == "Science"){
            document.querySelector('#quizLink').href = "/Brainify/client/subs/science/science.html";
        }
        else{
            document.querySelector('#quizLink').href = "/Brainify/client/subs/english/english.html";
        }
    });
});
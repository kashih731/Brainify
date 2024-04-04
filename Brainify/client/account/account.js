let loginCont = document.querySelector('.Lcontainer');
let regisCont = document.querySelector('.Rcontainer');

let login = document.querySelector('#L-R');
let register = document.querySelector('#R-L');

login.addEventListener('click', () =>{
    loginCont.classList.remove('active');
    regisCont.classList.add('active');
});

register.addEventListener('click', () =>{
    regisCont.classList.remove('active');
    loginCont.classList.add('active');
});
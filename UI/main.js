const modal = document.getElementById('simpleModal');
const modalBtn = document.getElementById('modalBtn');
const closedBtn = document.getElementsByClassName('closedBtn')[0];

modalBtn.addEventListener('click', openModal);
closedBtn.addEventListener('click', closedModal);


function openModal() {
    modal.style.display = 'block';
}

function closedModal() {
    modal.style.display = 'none';
}

const modal1 = document.getElementById('simpleModal1');
const modalBtn1 = document.getElementById('modalBtn1');
const closedBtn1 = document.getElementsByClassName('closedBtn1')[0];

modalBtn1.addEventListener('click', openModal1);
closedBtn1.addEventListener('click', closedModal1);


function openModal1() {
    modal1.style.display = 'block';
}

function closedModal1() {
    modal1.style.display = 'none';
}

const modal2 = document.getElementById('simpleModal2');
const modalBtn2 = document.getElementById('modalBtn2');
const closedBtn2 = document.getElementsByClassName('closedBtn2')[0];

modalBtn2.addEventListener('click', openModal2);
closedBtn2.addEventListener('click', closedModal2);


function openModal2() {
    modal2.style.display = 'block';
}

function closedModal2() {
    modal2.style.display = 'none';
}
const modal3 = document.getElementById('simpleModal3');
const modalBtn3 = document.getElementById('modalBtn3');
const closedBtn3 = document.getElementsByClassName('closedBtn3')[0];

modalBtn3.addEventListener('click', openModal3);
closedBtn3.addEventListener('click', closedModal3);


function openModal3() {
    modal3.style.display = 'block';
}

function closedModal3() {
    modal3.style.display = 'none';
}
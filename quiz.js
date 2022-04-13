//pilih seluruh elemen ke dalam website 
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//membuat pertanyaan atau soal kuis
let questions = [
    {
        /*pertanyaan 1*/
        question : "Benda apa ini?", //pertanyaan
        imgSrc : "question1.jpg", //gambar pertanyaan
        choiceA : "Motorboat",//opsi a
        choiceB : "Ship",//opsi b
        choiceC : "Boat",//opsi c
        correct : "A"//mendefinisikan jawaban yang benar
    },{
        /*pertanyaan 2*/
        question : "Apa Verb2 dari aktivitas di gambar?",
        imgSrc : "question2.jpg",//gambar pertanyaan
        choiceA : "eaten",//opsi a
        choiceB : "ate",//opsi b
        choiceC : "eat",//opsi c
        correct : "B"
    },{
        /*pertanyaan 3*/
        question : "Dimanakah tempat di samping?", //pertanyaan
        imgSrc : "question3.jpg", //gambar pertanyaan
        choiceA : "Market", //opsi a
        choiceB : "Garden", //opsi b
        choiceC : "Yard", //opsi c
        correct : "A" //mendefinisikan jawaban yang benar
    },{
        /*pertanyaan 4*/
        question : "Benda apakah ini?",//pertanyaan
        imgSrc : "question4.jpg",//gambar pertanyaan
        choiceA : "Socks",//opsi a
        choiceB : "Scraf",//opsi b
        choiceC : "Shoes",//opsi c
        correct : "C"//mendefinisikan jawaban yang benar
    },{
        /*pertanyaan 5*/
        question : "Apa Verb3 dari aktivitas berikut?",//pertanyaan
        imgSrc : "question5.jpg",//gambar pertanyaan
        choiceA : "drive",//opsi a
        choiceB : "drove",//opsi b
        choiceC : "driven",//opsi c
        correct : "c"//mendefinisikan jawaban yang benar
    },{
        /*pertanyaan 6*/
        question : "Yang manakah yang merupakan verb 1 dari gambar di samping?",//pertanyaan
        imgSrc : "question6.jpg",//gambar pertanyaan
        choiceA : "write",//opsi a
        choiceB : "wrote",//opsi b
        choiceC : "written",//opsi c
        correct : "A"//mendefinisikan jawaban yang benar
    },{
        /*pertanyaan 7*/
        question : "Apa kata yang paling tepat untuk melengkapi kalimat tersebut?",//pertanyaan
        imgSrc : "question7.png",//gambar pertanyaan
        choiceA : "gone",//opsi a
        choiceB : "go",//opsi b
        choiceC : "went",//opsi c
        correct : "C"//mendefinisikan jawaban yang benar
    },{
        /*pertanyaan 8*/
        question : "Manakah pemilihan kata yang paling tepat?",//pertanyaan
        imgSrc : "question8.png",//gambar pertanyaan
        choiceA : "In",//opsi a
        choiceB : "On",//opsi b
        choiceC : "At",//opsi c
        correct : "B"//mendefinisikan jawaban yang benar
    },{
        /*pertanyaan 9*/
        question : "Siapa kah George bagi Addison?",//pertanyaan
        imgSrc : "question9.jpg",//gambar pertanyaan
        choiceA : "Nephew",//opsi a
        choiceB : "Cousin",//opsi b
        choiceC : "Brother",//opsi c
        correct : "B"//mendefinisikan jawaban yang benar
    },{
        /*pertanyaan 10*/
        question : "Jam berapakah ini?",//pertanyaan
        imgSrc : "question10.png",//gambar pertanyaan
        choiceA : "3.15",//opsi a
        choiceB : "3.45",//opsi b
        choiceC : "2.45",//opsi c
        correct : "A"//mendefinisikan jawaban yang benar
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //mendeklarasikan waktu timer (Second)
const gaugeWidth = 200; // 200px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render pertanyaan 
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA; //mendeklarasikan opsi a
    choiceB.innerHTML = q.choiceB; //mendeklarasikan opsi b
    choiceC.innerHTML = q.choiceC; //mendeklarasikan opsi c
}

start.addEventListener("click",startQuiz);

//fungsi kuis
function startQuiz(){
    start.style.display = "none";
    renderQuestion();//menampilkan pertanyaan
    quiz.style.display = "block";
    renderProgress();//menampilkan progress jawaban
    renderCounter();//menampilkan timer countdown
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

//membuat render countdown waktu 

function renderCounter(){
    //apabila waktu masih di bawah waktu timer yang ditentukan maka digit waktu akan terus bertambah
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{ //apabila waktu telah sampai 0 (habis) maka---
        count = 0;
        //jawaban otomatis salah dan indikator soal berubah berwana merah
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            //kuis diakhiri dan menampilkan pop up score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

//memeriksa jawaban

function checkAnswer(answer){
    //apabila jawaban benar
    if( answer == questions[runningQuestion].correct){
        //maka score bertambah
        score++;
        //indikator soal berubah menjadi warna hijau
        answerIsCorrect();
    }else{ //apabila jawaban salah
        //indikator soal berubah menjadi warna merah
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        //kuis diakhiri dan menampilakn pop up score
        clearInterval(TIMER);
        scoreRender();
    }
}

//fungsi mengubah warna indikator soal apabila jawaban benar
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#597d35";
}

//fungsi mengubah warna indikator soal apabila jawaban salah
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#7e2811";
}

//render pop up score
function scoreRender(){
    scoreDiv.style.display = "block";
    
    //kalkulasi persentase score
    const scorePerCent = Math.round(100 * score/questions.length);
    
    //pemilihan gambar emoji sesuai dengan persentase dan score yang didapat
    let img = (scorePerCent >= 80) ? "emoji1.png" :
              (scorePerCent >= 60) ? "emoji2.png" :
              (scorePerCent >= 40) ? "emoji3.png" :
              (scorePerCent >= 20) ? "emoji4.png" :
              "emoji5.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
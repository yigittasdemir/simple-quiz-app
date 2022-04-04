let sunucudanDonen;

var baglanti = new XMLHttpRequest();
baglanti.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200 ){
        sunucudanDonen=JSON.parse(baglanti.responseText);
        soruGetir();
    }
    return sunucudanDonen;
};
baglanti.open("GET", "questions.json", true);
baglanti.send();

const sonucAlani=document.getElementsByClassName("quiz-container")[0];
const soru=document.getElementById("question");
const secenekler=document.getElementsByName("secenek");

const aciklamaA=document.getElementById("aciklamaA");
const aciklamaB=document.getElementById("aciklamaB");
const aciklamaC=document.getElementById("aciklamaC");
const aciklamaD=document.getElementById("aciklamaD");

const sendButton=document.getElementById("send");

let puan=0;
let sira=0;

function soruGetir(){
    secimiTemizle();
    console.log(sunucudanDonen);
    let nextQuestion=sunucudanDonen.questions[sira];
    soru.innerHTML=nextQuestion.question;
    aciklamaA.innerText=nextQuestion.secenekA;
    aciklamaB.innerText=nextQuestion.secenekB;
    aciklamaC.innerText=nextQuestion.secenekC;
    aciklamaD.innerText=nextQuestion.secenekD;
}
function secimiTemizle(){
    secenekler.forEach(secenek => secenek.checked=false);
}

function secimiAl(){
    let secim;

    secenekler.forEach(secenek => {
        if(secenek.checked==true)
        {
            secim=secenek.id;
        }
    })
    return secim;
}

sendButton.addEventListener("click", ()=>{
    const secilen=secimiAl();

    if(secilen){
        if(secilen === sunucudanDonen.questions[sira].cevap);
        puan++;
    }
    sira++;

    if(sira < sunucudanDonen.questions.length)
    {
        soruGetir();
    }
    else{
        sonucAlani.innerHTML=`
           <h2>Testi tamamladınız!</h2>
        `
        sendButton.setAttribute("onclick","location.reload()");
        sendButton.innerHTML=("Yeniden Başla");
    }
 
});
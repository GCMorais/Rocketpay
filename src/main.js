import "./css/index.css"
import IMask from "imask";

const ccBackground01 = document.querySelector(".path01");
const ccBackground02 = document.querySelector(".path02");
const ccLogo = document.querySelector(".cardlogo");

function setCard(type){
    const cores = {
        visa:["#436D99","#2D57F2"],
        mastercard:["#DF6F29","#C69347"],
        default: ["black","gray"],
    }

    ccBackground01.setAttribute("fill",cores[type][0]);
    ccBackground02.setAttribute("fill",cores[type][1]);
    ccLogo.setAttribute("src",`cc-${type}.svg`);
}

const securityCode = document.querySelector('#security-code');
const securityCodePattern = {
    mask:"000"
};
const securityCodeMasked = IMask(securityCode,securityCodePattern);

const expirationDate = document.querySelector('#expiration-date');
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM:{
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY:{
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear()+10).slice(2)
        }
    }
}
const expirationDateMasked = IMask(expirationDate,expirationDatePattern);


const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex:/^4\d{0,15}/,
            cardtype: "visa"
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard"
        }, 
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default"
        },
    ],
    dispatch: function (appended,dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g," ");
        const foundMask = dynamicMasked.compiledMasks.find( function(item){
            return number.match(item.regex);
        });

        console.log(foundMask);
        return foundMask;
    }
}

const cardNumberMasked = IMask(cardNumber,cardNumberPattern);

const addButton = document.querySelector('#add-card');
addButton.addEventListener("click",()  =>{
    
});

document.querySelector('form').addEventListener("submit", (event) =>{
    event.preventDefault();
});


const cardHolder = document.querySelector("#card-holder");

cardHolder.addEventListener("input",() => {
    const ccHolder = document.querySelector(".cc-holder .value");

    ccHolder.innerText = cardHolder.value.length === 0 ? "Digite novamente" : cardHolder.value;

});

//
securityCodeMasked.on("accept", () => {
    updateSecurityCode(securityCodeMasked.value);
});

function updateSecurityCode(code){
    const ccSecurity = document.querySelector(".cc-security .value");

    ccSecurity.innerText = code.length === 0 ? "123" : code;
};

//
cardNumberMasked.on("accept",() =>{
    const cardType = cardNumberMasked.masked.currentMask.cardtype;
    setCard(cardType);
    updateNumberCode(cardNumberMasked.value);
});

function updateNumberCode(code){
    const ccCode = document.querySelector(".cc-info .cc-number");

    ccCode.innerText = code.length === 0 ? "1234 5678 9012 3456" : code;
};

//
expirationDateMasked.on ("accept", () =>{
    updateExpirationData(expirationDateMasked.value);
})

function updateExpirationData(data){
    const ccExpiration = document.querySelector(".cc-expiration .value");

    ccExpiration.innerText = data.length === 0 ? "02/32" : data;
}
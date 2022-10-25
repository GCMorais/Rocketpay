import "./css/index.css"


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


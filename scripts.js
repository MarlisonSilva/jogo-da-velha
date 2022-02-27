// criando variáveis globalmente
var comps = []; 
var componentesVazios = 0;
var valComps = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
var vez = document.querySelector('#vez');
const playerO = document.querySelector('#player-o');
const playerX = document.querySelector('#player-x');

function carregarComponentes() {
    var a1 = document.getElementById('a1');
    var a2 = document.getElementById('a2');
    var a3 = document.getElementById('a3');
    var b1 = document.getElementById('b1');
    var b2 = document.getElementById('b2');
    var b3 = document.getElementById('b3');
    var c1 = document.getElementById('c1');
    var c2 = document.getElementById('c2');
    var c3 = document.getElementById('c3');
    comps = [
        [a1, a2, a3],
        [b1, b2, b3],
        [c1, c2, c3]
    ];

}

var vezJogador1 = true;
function jogada(codigoCasa, linComp, colComp){
    var casa = document.getElementById(codigoCasa);
    
    if(valComps[linComp][colComp] == ""){
        if(vezJogador1 == true){            
            vezJogador1 = false;
            trocarClasse(casa, 'vazio', 'preenchido');
            drawX(codigoCasa);
            valComps[linComp][colComp] = "X";
            verificar();
            vez.innerHTML = "O";

        }else{            
            vezJogador1 = true;
            trocarClasse(casa, 'vazio', 'preenchido');
            drawO(codigoCasa);
            valComps[linComp][colComp] = "O";
            verificar();
            vez.innerHTML = "X";

        }
    }else{
        return alert("Elemento "+codigoCasa+" preenchido");
    }

}

function verificar() {
    verificarLinhas();
    verificarColunas();
    verificarDiagonais();

    testarVazios();
    
}

function verificarLinhas() {
    for (let i = 0; i < 3; i++) {
        if (valComps[i][0] != "") {
            // Diagonal principal
            if (valComps[i][0] == valComps[i][1] & valComps[i][1] == valComps[i][2]) {            
                alert('O jogador '+valComps[i][0]+' ganhou'); 
                if (valComps[0][i] == "X") {
                    playerX.innerHTML++;

                } else {
                    playerO.innerHTML++;

                }
                fimDeJogo();       

            }
        }
    }
}

function verificarColunas() {    
    for (let i = 0; i < 3; i++) {
        if (valComps[0][i] != "") {
            // Diagonal principal
            if (valComps[0][i] == valComps[1][i] & valComps[1][i] == valComps[2][i]) {            
                alert('O jogador '+valComps[0][i]+' ganhou'); 
                if (valComps[0][i] == "X") {
                    playerX.innerHTML++;

                } else {
                    playerO.innerHTML++;

                }
                fimDeJogo();       

            }
        }        
    }
}
function verificarDiagonais() {    
    if (valComps[0][0] != "") {
        // Diagonal principal
        if (valComps[0][0] == valComps[1][1] & valComps[1][1] == valComps[2][2]) {            
            alert('O jogador '+valComps[0][0]+' ganhou'); 
            if (valComps[0][0] == "X") {
                playerX.innerHTML++;

            } else {
                playerO.innerHTML++;
            }

            fimDeJogo();     

        }
    }

    if (valComps[0][2] != "") {
        // Diagonal secundária
        if (valComps[0][2] == valComps[1][1] & valComps[1][1] == valComps[2][0]) {            
            alert('O jogador '+valComps[0][2]+' ganhou');      
            if (valComps[0][2] == "X") {
                playerX.innerHTML++;

            } else {
                playerO.innerHTML++;

            }
            fimDeJogo();       

        }
    }
}

function testarVazios() {
    // testar se tem algum componente vazio
    for (let i = 0; i < valComps.length; i++) {
        for (let j = 0; j < valComps[i].length; j++) {
            if (valComps[i][j] == "") {
                componentesVazios++;                
            }
            
        }        
    }

    
    if (componentesVazios > 0) { // se tiver componente vazio, o jogo continua
        componentesVazios = 0;
    } else if (componentesVazios == 0) { // senao, mostra "acabou o jogo"
        fimDeJogo();
    }
}

function trocarClasse(elemento, antiga, nova) {
    elemento.classList.remove(antiga);
    elemento.classList.add(nova);
    
}

// desenhar simbolos
function drawX(casa) {
    var canvas = document.getElementById(casa);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // tamanho máximo do canvas 300 x 150
        var maxL = 300;
        var maxA = 150;
        var descLar = 50;
        var descAlt = 25;

        ctx.fillStyle = "darksalmon";
        ctx.beginPath();
        ctx.moveTo(0, descAlt);         
        ctx.quadraticCurveTo(0, 0, descLar, 0);        
        ctx.lineTo(maxL / 2, (maxA - descAlt) / 2);
        ctx.lineTo(maxL - descLar, 0);
        
        ctx.quadraticCurveTo(maxL, 0, maxL, descAlt);
        ctx.lineTo((maxL + descLar) / 2, maxA / 2);
        ctx.lineTo(maxL, (maxA - descAlt));
        
        ctx.quadraticCurveTo(maxL, maxA, (maxL - descLar), maxA);
        ctx.lineTo(maxL / 2, (maxA + descAlt) / 2);
        ctx.lineTo(0 + descLar, maxA);
        
        ctx.quadraticCurveTo(0, maxA, 0, maxA - descAlt);
        ctx.lineTo((maxL - descLar) / 2, maxA / 2);
        ctx.lineTo(0, descAlt);
        

        ctx.lineTo(0, descAlt);
        ctx.fill();
    }
}

function drawO(casa) {
    var canvas = document.getElementById(casa);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var maxL = 300;
        var maxA = 150;
        var gross = 50;
        var minL = 0;
        var minA = 0;
        ctx.fillStyle = "blueviolet";
        ctx.beginPath();
        ctx.moveTo(minL, maxA / 2);
        ctx.quadraticCurveTo(minL, minA, maxL/2, minA);
        ctx.quadraticCurveTo(maxL, minA, maxL, maxA / 2);
        ctx.quadraticCurveTo(maxL, maxA, maxL/2, maxA);
        ctx.quadraticCurveTo(minL, maxA, minL, maxA/2);
        ctx.fill();

        maxA -= gross / 2;
        maxL -= gross;
        minA = gross / 2;
        minL = gross;

        // furo do círculo
        clearArc(ctx, maxA, maxL, minA, minL);
        
    }
}

function clearArc(context, maxAlt, maxLar, minAlt, minLar) {
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.moveTo(minLar, maxAlt / 2);
    context.quadraticCurveTo(minLar, minAlt, maxLar/2, minAlt);
    context.quadraticCurveTo(maxLar, minAlt, maxLar, maxAlt / 2);
    context.quadraticCurveTo(maxLar, maxAlt, maxLar/2, maxAlt);
    context.quadraticCurveTo(minLar, maxAlt, minLar, maxAlt/2);
    context.fill();
    context.restore();
}

function zerarIndices() {
    for (let i = 0; i < comps.length; i++) {
        for (let j = 0; j < comps[i].length; j++) {
            const canvas = comps[i][j];
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
                var maxL = 300;
                var maxA = 150;
        
                ctx.clearRect(0, 0, maxL, maxA);

            }
            
            
        }        
    }

    for (let i = 0; i < valComps.length; i++) {
        for (let j = 0; j < valComps[i].length; j++) {
            valComps[i][j] = "";
            
        }        
    }
    
}

function fimDeJogo() {
    alert('acabou o jogo!');
    zerarIndices(); 
}

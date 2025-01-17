let listaNumeros = [];
let limite = 99;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;
function verificarChute(){
    let chute = document.querySelector('input').value;

    if (chute == numeroAleatorio){
        exibirTextoNaTela('h1', 'Acertou!');
        let formatarTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${formatarTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        let botao = document.getElementById('reiniciar');
        botao.removeAttribute('disabled')
    }else{
        if(chute > numeroAleatorio){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }

}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Número Secreto!')
    exibirTextoNaTela('p','Escolha um número entre 1 e 100: ')
}

function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * limite + 1);
    let qntdElementosLista = listaNumeros.length;
    if(qntdElementosLista == limite){
        listaNumeros = [];
    }
    if(listaNumeros.includes(numeroEscolhido)){
        return gerarNumeroAleatorio;
    }else{
        listaNumeros.push(numeroEscolhido)
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    let botao = document.getElementById('reiniciar');
    botao.setAttribute('disabled', true)
}
exibirMensagemInicial();
const botao = document.getElementById("technoai-button");
const janela = document.getElementById("technoai-window");
const fechar = document.getElementById("fechar-ai");

const chat = document.getElementById("technoai-chat");
const input = document.getElementById("pergunta-ai");
const enviar = document.getElementById("enviar-ai");

botao.onclick = () => {
    janela.classList.toggle("aberto");
    input.focus();
};

fechar.onclick = () => {
    janela.classList.remove("aberto");
};

function adicionarMensagem(texto, tipo) {

    const mensagem = document.createElement("div");
    mensagem.className = tipo;

    mensagem.innerHTML = texto;

    chat.appendChild(mensagem);

    chat.scrollTop = chat.scrollHeight;
}

function responderFake(pergunta){

    adicionarMensagem("Pensando...", "ai-message");

    setTimeout(() => {

        chat.lastChild.remove();

        adicionarMensagem(
            `Você perguntou:<br><br><b>${pergunta}</b><br><br>Em instantes esta resposta virá da TechnoAI.`,
            "ai-message"
        );

    },1000);

}

function enviarPergunta(){

    const texto = input.value.trim();

    if(texto == "") return;

    adicionarMensagem(texto,"user-message");

    input.value="";

    responderFake(texto);

}

enviar.onclick = enviarPergunta;

input.addEventListener("keypress",function(e){

    if(e.key=="Enter"){

        enviarPergunta();

    }

});
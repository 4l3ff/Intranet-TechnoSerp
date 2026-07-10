// ===========================
// ELEMENTOS PRINCIPAIS DA PÁGINA
// ===========================

// Guarda todos os menus escondidos
// para evitar ficar procurando no HTML toda hora
const menus = document.querySelectorAll(".menu-escondido");

// Guarda todos os cards/seções
const cards = document.querySelectorAll("section");

// Guarda todos os links da página
const links = document.querySelectorAll("a");

// ===========================
// FUNÇÃO PARA ABRIR MENU
// ===========================

// Centraliza toda a lógica de abrir um menu
// Assim não precisamos repetir esse código
// em vários lugares

function abrirMenu(menu) {

    // Mostra o menu escondido
    menu.classList.add("ativo");


    // Pega o botão que fica antes do menu
    const botao = menu.previousElementSibling;


    // Altera o texto do botão
    if (botao) {
        botao.textContent = "Ver Menos";
    }

    // Encontra o card onde esse menu pertence
    const card = menu.closest("section");

    // Adiciona o efeito visual do card aberto
    if (card) {
        card.classList.add("card-aberto");
    }

}
// ===========================
// FUNÇÃO PARA FECHAR MENU
// ===========================

// Centraliza toda a lógica de fechar menu

function fecharMenu(menu) {
    // Esconde o menu
    menu.classList.remove("ativo");

    // Recupera o botão relacionado ao menu
    const botao = menu.previousElementSibling;

    // Volta o texto original
    if (botao) {
        botao.textContent = "Ver Tudo";
    }

    // Recupera o card relacionado
    const card = menu.closest("section");


    // Remove o efeito de card aberto
    if (card) {
        card.classList.remove("card-aberto");
    }

}
// ===========================
// ABRIR / FECHAR MENUS
// ===========================

function toggleLinks(botao) {

    // O menu que pertence ao botão clicado
    const menu = botao.nextElementSibling;

    // O card desse menu
    const card = botao.closest("section");

    // Fecha todos os outros menus
    // para deixar somente um aberto

    menus.forEach(item => {

        if (item !== menu) {

            fecharMenu(item);

        }

    });

    // Fecha outros cards que possam estar abertos

    cards.forEach(item => {

        if (item !== card) {

            item.classList.remove("card-aberto");
        }
    });
    // Verifica se o menu já está aberto

    if(menu.classList.contains("ativo")){

        // Se estiver aberto, fecha
        fecharMenu(menu);

    }else{

        // Se estiver fechado, abre
        abrirMenu(menu);
    }

}
// ===========================
// FECHAR AO CLICAR FORA
// ===========================

document.addEventListener(
    "click",
    function(event){

        // Verifica se clicou em algum botão
        const clicouBotao =
            event.target.closest(".btn-ver");

        // Verifica se clicou dentro do menu
        const clicouMenu =
            event.target.closest(".menu-escondido");

        // Se clicou fora dos dois
        // fecha todos os menus

        if(
            !clicouBotao &&
            !clicouMenu
        ){

            menus.forEach(menu => {

                fecharMenu(menu);
            });

        }

    }
);

// ===========================
// BUSCA DE LINKS
// ===========================

function buscarLinks(){

    const input =
        document.getElementById("busca");

    const filtro =
        input.value.toLowerCase();

    let primeiroResultado = null;

    menus.forEach(menu=>{
        fecharMenu(menu);
    });

    cards.forEach(card=>{
        card.classList.remove("card-aberto");
    });

    links.forEach(link=>{

        const texto =
            link.textContent.toLowerCase();

        link.classList.remove(
            "resultado-busca"
        );

        if(
            filtro.length > 0 &&
            texto.includes(filtro)
        ){

            link.classList.add(
                "resultado-busca"
            );

            const menu =
                link.closest(".menu-escondido");

            if(menu){
                abrirMenu(menu);
            }

            if(!primeiroResultado){
                primeiroResultado = link;
            }

        }

    });

    if(primeiroResultado){

        setTimeout(()=>{

            primeiroResultado.scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

        },150);

    }

}

// ===========================
// ANIMAÇÃO DOS CARDS
// ===========================

window.addEventListener(
    "load",
    () => {
        // Usa os cards que já foram carregados

        cards.forEach(
            (card,index) => {

                // Estado inicial
                card.style.opacity = 0;

                card.style.transform =
                    "translateY(20px)";

                // Anima cada card com atraso

                setTimeout(() => {

                    card.style.transition =
                        "all .5s ease";

                    card.style.opacity = 1;

                    card.style.transform =
                        "translateY(0)";

                }, index * 120);

            }

        );

    }

);
// ===========================
// CARREGAMENTO DOS ÍCONES
// ===========================

// Renderiza os ícones uma única vez

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
        .querySelectorAll("[data-icon]")
        .forEach(el => {

            const iconName =
                el.dataset.icon;

            if(Icons[iconName]){

                el.innerHTML =
                    Icons[iconName]();
            }

        });

    }

);
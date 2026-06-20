// ===========================
// ABRIR / FECHAR MENUS
// ===========================

function toggleLinks(botao) {

    const menu = botao.nextElementSibling;
    const card = botao.closest("section");

    document
        .querySelectorAll(".menu-escondido")
        .forEach(item => {

            if(item !== menu){
                item.classList.remove("ativo");
            }

        });

    document
        .querySelectorAll("section")
        .forEach(item => {

            if(item !== card){
                item.classList.remove("card-aberto");
            }

        });

    menu.classList.toggle("ativo");

    if(menu.classList.contains("ativo")){
        card.classList.add("card-aberto");
    }else{
        card.classList.remove("card-aberto");
    }
}

// ===========================
// FECHAR AO CLICAR FORA
// ===========================

document.addEventListener(
    "click",
    function(event){

        const clicouBotao =
            event.target.closest(".btn-ver");

        const clicouMenu =
            event.target.closest(".menu-escondido");

        if(
            !clicouBotao &&
            !clicouMenu
        ){

            document
            .querySelectorAll(
                ".menu-escondido"
            )
            .forEach(menu => {

                menu.classList.remove(
                    "ativo"
                );

            });

        }

    }
);

// ===========================
// BUSCA
// ===========================

function buscarLinks() {

    const input =
        document.getElementById("busca");

    const filtro =
        input.value.toLowerCase();

    const links =
        document.querySelectorAll("a");

    // Fecha todos os menus primeiro
    document
        .querySelectorAll(".menu-escondido")
        .forEach(menu => {
            menu.classList.remove("ativo");
        });

    links.forEach(link => {

        const texto =
            link.textContent.toLowerCase();

        link.classList.remove(
            "resultado-busca"
        );

        if (
            filtro.length > 0 &&
            texto.includes(filtro)
        ) {

            link.classList.add(
                "resultado-busca"
            );

            // Se estiver dentro de um menu oculto, abre o menu
            const menu =
                link.closest(".menu-escondido");

            if (menu) {
                menu.classList.add("ativo");
            }
        }

    });

}

// ===========================
// ENTER NA BUSCA
// ===========================

document
.getElementById("busca")
.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Enter"){

            const encontrados =
                document.querySelectorAll(
                    ".resultado-busca"
                );

            if(encontrados.length > 0){

                encontrados[0].scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                });

            }

        }

    }
);

// ===========================
// ANIMAÇÃO DOS CARDS
// ===========================

window.addEventListener(
    "load",
    () => {

        const cards =
            document.querySelectorAll(
                "section"
            );

        cards.forEach(
            (card,index) => {

                card.style.opacity = 0;
                card.style.transform =
                    "translateY(20px)";

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
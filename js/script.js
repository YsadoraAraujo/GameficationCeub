function loadPage(page, target, tabId) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById(target).innerHTML = xhr.responseText;

            // Remover a classe 'active' de todas as abas
            let tabs = document.querySelectorAll(".nav-link");
            tabs.forEach(tab => tab.classList.remove("active"));

            // Adicionar a classe 'active' à aba clicada, se o tabId for fornecido
            if (tabId) {
                document.getElementById(tabId).classList.add("active");
            }

            // Verifica se estamos carregando a página de rankings
            if (page === 'ranking.html') {
                // Define a primeira aba como ativa (Por Turma)
                let firstTabButton = document.getElementById("turma-tab");
                let firstTabContent = document.getElementById("turma");

                if (firstTabButton && firstTabContent) {
                    firstTabButton.classList.add("active");
                    firstTabButton.setAttribute("aria-selected", "true");
                    firstTabContent.classList.add("show", "active");

                    // Inicializa o ranking na aba Por Turma
                    if (typeof renderTable === "function") {
                        renderTable("turma"); // Chama renderTable se ela estiver definida
                    }
                }
            }

            // Inicialize o flip após carregar o conteúdo dinâmico, se houver elementos
            initializeFlip();
        } else if (xhr.readyState === 4) {
            console.error(`Erro ao carregar a página: ${page}`);
        }
    };
    xhr.send();
}

// Função para inicializar o efeito de flip, somente se houver elementos com a classe '.card-flip'
function initializeFlip() {
    const cards = document.querySelectorAll('.card-flip');
    if (cards.length === 0) {
        console.log("Nenhum elemento com a classe '.card-flip' encontrado na página");
        return; // Sai da função se não encontrar elementos
    }
    console.log("Elementos de flip encontrados:", cards);
    cards.forEach(card => {
        card.addEventListener('click', function () {
            card.classList.toggle('flip');
        });
    });
}

// Carrega inicio.html automaticamente e inicializa o flip quando index.html é carregado
document.addEventListener('DOMContentLoaded', function () {
    loadPage('inicio.html', 'tab-content', 'inicio-tab');
});

// Função renderTable simulada para o ranking (defina-a corretamente no arquivo ranking.js)
function renderTable(tab) {
    console.log(`Renderizando tabela para: ${tab}`);
    const tableBody = document.getElementById(`table-body-${tab}`);
    if (!tableBody) {
        console.error(`Elemento table-body-${tab} não encontrado`);
        return;
    }

    // Dados de exemplo para renderização
    const data = [
        { pos: "1º", turma: "Turma A", aluno: "João Silva", campus: "Asa Norte", turno: "Manhã", semestre: "2023.1", pontos: "1500" },
        { pos: "2º", turma: "Turma A", aluno: "Maria Oliveira", campus: "Taguatinga", turno: "Noite", semestre: "2023.1", pontos: "1450" },
        { pos: "3º", turma: "Turma A", aluno: "Pedro Costa", campus: "Asa Norte", turno: "Manhã", semestre: "2023.2", pontos: "1400" },
        { pos: "4º", turma: "Turma A", aluno: "Lucas Santos", campus: "Taguatinga", turno: "Noite", semestre: "2023.1", pontos: "1350" },
        { pos: "5º", turma: "Turma A", aluno: "Ana Paula", campus: "Asa Norte", turno: "Manhã", semestre: "2023.2", pontos: "1300" },
        { pos: "6º", turma: "Turma A", aluno: "Felipe Nunes", campus: "Taguatinga", turno: "Noite", semestre: "2023.1", pontos: "1250" },
        { pos: "7º", turma: "Turma A", aluno: "Camila Rocha", campus: "Asa Norte", turno: "Manhã", semestre: "2023.2", pontos: "1200" },
        { pos: "8º", turma: "Turma A", aluno: "Bruno Mendes", campus: "Taguatinga", turno: "Noite", semestre: "2023.1", pontos: "1150" },
        { pos: "9º", turma: "Turma A", aluno: "Juliana Alves", campus: "Asa Norte", turno: "Manhã", semestre: "2023.2", pontos: "1100" },
        { pos: "10º", turma: "Turma A", aluno: "Rafael Ferreira", campus: "Taguatinga", turno: "Noite", semestre: "2023.1", pontos: "1050" },
        { pos: "11º", turma: "Turma A", aluno: "Bianca Dias", campus: "Asa Norte", turno: "Manhã", semestre: "2023.2", pontos: "1000" },
        { pos: "12º", turma: "Turma A", aluno: "Diego Martins", campus: "Taguatinga", turno: "Noite", semestre: "2023.1", pontos: "950" },
        { pos: "13º", turma: "Turma A", aluno: "Mariana Gomes", campus: "Asa Norte", turno: "Manhã", semestre: "2023.2", pontos: "900" },
        { pos: "14º", turma: "Turma A", aluno: "Gustavo Ribeiro", campus: "Taguatinga", turno: "Noite", semestre: "2023.1", pontos: "850" },
        { pos: "15º", turma: "Turma A", aluno: "Letícia Carvalho", campus: "Asa Norte", turno: "Manhã", semestre: "2023.2", pontos: "800" }
    ];

    // Exemplo de estrutura de dados e renderização
    tableBody.innerHTML = "";
    data.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${tab === 'turma' && index < 3 ? `<i class="fa-solid fa-crown ${index === 0 ? 'primeiro-lugar' : index === 1 ? 'segundo-lugar' : 'terceiro-lugar'}"></i>` : ''}</td>
            <td>${row.pos}</td>
            <td>${row.turma}</td>
            <td>${row.aluno}</td>
            <td>${row.campus}</td>
            <td>${row.turno}</td>
            <td>${row.semestre}</td>
            <td>${row.pontos}</td>
        `;
        tableBody.appendChild(tr);
    });
}

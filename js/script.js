// Defina a quantidade de linhas por página
const rowsPerPage = 5;
let currentPage = 1;

// Função para carregar o conteúdo da página dinamicamente
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
                let firstTabButton = document.getElementById("turma-tab");
                let firstTabContent = document.getElementById("turma");

                if (firstTabButton && firstTabContent) {
                    firstTabButton.classList.add("active");
                    firstTabButton.setAttribute("aria-selected", "true");
                    firstTabContent.classList.add("show", "active");

                    if (typeof renderTable === "function") {
                        renderTable("turma"); // Chama renderTable se ela estiver definida
                    }
                }
            }

            // Inicialize o flip após carregar o conteúdo dinâmico, se houver elementos
            if (document.querySelectorAll('.card-flip').length > 0) {
                initializeFlip();
            }
        } else if (xhr.readyState === 4) {
            console.error(`Erro ao carregar a página: ${page}`);
        }
    };
    xhr.send();
}

// Função para inicializar o efeito de flip, somente se houver elementos com a classe '.card-flip'
function initializeFlip() {
    const cards = document.querySelectorAll('.card-flip');
    if (cards.length === 0) return;
    cards.forEach(card => {
        card.addEventListener('click', function () {
            card.classList.toggle('flip');
        });
    });
}

// Função para renderizar a tabela com paginação para diferentes abas
function renderTable(tab) {
    const tableBody = document.getElementById(`table-body-${tab}`);
    const paginationContainer = document.getElementById(`pagination-${tab}`);
    if (!tableBody || !paginationContainer) {
        console.error(`Elemento table-body-${tab} ou pagination-${tab} não encontrado`);
        return;
    }

    // Filtragem de dados com base na aba
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
    ];

    let filteredData = data;
    if (tab === "campus") {
        filteredData = data.filter(row => row.campus === "Asa Norte");
    } else if (tab === "semestre") {
        filteredData = data.filter(row => row.semestre === "2023.1");
    }

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // Renderizar linhas de dados da tabela
    tableBody.innerHTML = "";
    filteredData.slice(start, end).forEach((row, index) => {
        const tr = document.createElement("tr");
        // Adicione classes para os três primeiros lugares
        if (index + 1 === 1) tr.classList.add("primeiro-lugar");
        if (index + 1 === 2) tr.classList.add("segundo-lugar");
        if (index + 1 === 3) tr.classList.add("terceiro-lugar");

        tr.innerHTML = `
            <td data-label="Posição">${index + 1 + start}</td>
            <td data-label="Turma">${row.turma}</td>
            <td data-label="Aluno">${row.aluno}</td>
            <td data-label="Campus">${row.campus}</td>
            <td data-label="Turno">${row.turno}</td>
            <td data-label="Semestre">${row.semestre}</td>
            <td data-label="Pontos Totais">${row.pontos}</td>
        `;
        tableBody.appendChild(tr);
    });

    // Atualizar a paginação
    renderPagination(totalPages, paginationContainer, tab);
}

// Função para renderizar a paginação para diferentes abas
function renderPagination(totalPages, paginationContainer, tab) {
    paginationContainer.innerHTML = "";

    // Botão Previous
    const prevItem = document.createElement("li");
    prevItem.classList.add("page-item");
    if (currentPage === 1) prevItem.classList.add("disabled");

    const prevLink = document.createElement("a");
    prevLink.classList.add("page-link");
    prevLink.href = "#";
    prevLink.textContent = "Anterior";
    prevLink.onclick = function (event) {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderTable(tab);
        }
    };
    prevItem.appendChild(prevLink);
    paginationContainer.appendChild(prevItem);

    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        if (i === currentPage) pageItem.classList.add("active");

        const pageLink = document.createElement("a");
        pageLink.classList.add("page-link");
        pageLink.textContent = i;
        pageLink.href = "#";
        pageLink.onclick = function (event) {
            event.preventDefault();
            currentPage = i;
            renderTable(tab);
        };

        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);
    }

    // Botão Next
    const nextItem = document.createElement("li");
    nextItem.classList.add("page-item");
    if (currentPage === totalPages) nextItem.classList.add("disabled");

    const nextLink = document.createElement("a");
    nextLink.classList.add("page-link");
    nextLink.href = "#";
    nextLink.textContent = "Próximo";
    nextLink.onclick = function (event) {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderTable(tab);
        }
    };
    nextItem.appendChild(nextLink);
    paginationContainer.appendChild(nextItem);
}

// Carrega inicio.html automaticamente e inicializa o flip quando index.html é carregado
document.addEventListener('DOMContentLoaded', function () {
    loadPage('inicio.html', 'tab-content', 'inicio-tab');
});

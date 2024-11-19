// Dados de exemplo para simular a tabela
console.log("O JavaScript está funcionando");
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

const rowsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(data.length / rowsPerPage);

function renderTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const tableBody = document.getElementById("table-body-turma");

    tableBody.innerHTML = "";
    data.slice(start, end).forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1 + start}</td>
            <td>${row.turma}</td>
            <td>${row.aluno}</td>
            <td>${row.campus}</td>
            <td>${row.turno}</td>
            <td>${row.semestre}</td>
            <td>${row.pontos}</td>
        `;
        tableBody.appendChild(tr);
    });
    renderPagination();
}

function renderPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        if (i === currentPage) pageItem.classList.add("active");

        const pageLink = document.createElement("a");
        pageLink.classList.add("page-link");
        pageLink.textContent = i;
        pageLink.href = "#";
        pageLink.onclick = function () {
            currentPage = i;
            renderTable(currentPage);
        };

        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);
    }
}

// Carrega a primeira página da tabela e a paginação
document.addEventListener("DOMContentLoaded", function () {
    renderTable(currentPage);
});
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
let currentPage = { turma: 1, campus: 1, semestre: 1 };

// Renderizar dados para a tabela de uma aba específica
function renderTable(tab) {
    console.log(`Renderizando tabela para: ${tab}`);
    const tableBody = document.getElementById(`table-body-${tab}`);
    tableBody.innerHTML = ""; // Limpar conteúdo da tabela
    const start = (currentPage[tab] - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // Filtrar e renderizar dados com base na aba ativa
    data.slice(start, end).forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${tab === 'turma' && index < 3 ? `<i class="fa-solid fa-crown ${index === 0 ? 'primeiro-lugar' : index === 1 ? 'segundo-lugar' : 'terceiro-lugar'}"></i>` : ''}</td>
            <td>${row.pos}</td>
            <td>${row.turma || ''}</td>
            <td>${row.aluno}</td>
            <td>${row.campus}</td>
            <td>${row.turno}</td>
            <td>${row.semestre}</td>
            <td>${row.pontos}</td>
        `;
        tableBody.appendChild(tr);
    });

    document.getElementById(`page-info-${tab}`).textContent = `Página ${currentPage[tab]} de ${Math.ceil(data.length / rowsPerPage)}`;
    document.getElementById(`prev-${tab}`).disabled = currentPage[tab] === 1;
    document.getElementById(`next-${tab}`).disabled = currentPage[tab] === Math.ceil(data.length / rowsPerPage);
}

// Funções para mudar a página
function prevPage(tab) {
    if (currentPage[tab] > 1) currentPage[tab]--;
    renderTable(tab);
}

function nextPage(tab) {
    if (currentPage[tab] < Math.ceil(data.length / rowsPerPage)) currentPage[tab]++;
    renderTable(tab);
}

// Renderizar a primeira página em cada aba ao carregar
document.addEventListener("DOMContentLoaded", function() {
    renderTable("turma");
    renderTable("campus");
    renderTable("semestre");
});

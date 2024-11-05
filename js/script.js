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

          // Inicialize o flip após carregar o conteúdo dinâmico
          initializeFlip();
      } else if (xhr.readyState === 4) {
          console.error(`Erro ao carregar a página: ${page}`);
      }
  };
  xhr.send();
}

// Função para inicializar o efeito de flip
function initializeFlip() {
  const cards = document.querySelectorAll('.card-flip');
  if (cards.length === 0) {
      console.error("Nenhum elemento com a classe '.card-flip' encontrado na página");
  } else {
      console.log("Elementos de flip encontrados:", cards);
  }
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

// Função para carregar conteúdo de outra página HTML e ajustar a aba ativa
function loadPage(page, target, tabId) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", page, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Carregar o conteúdo na div de destino
      document.getElementById(target).innerHTML = xhr.responseText;

      // Remover a classe 'active' de todas as abas
      let tabs = document.querySelectorAll(".nav-link");
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });

      // Adicionar a classe 'active' à aba atual
      document.getElementById(tabId).classList.add("active");
    }
  };
  xhr.send();
}

// Carregar o conteúdo da primeira aba quando a página for carregada
window.onload = function () {
  loadPage("inicio.html", "tab-content", "inicio-tab");
};

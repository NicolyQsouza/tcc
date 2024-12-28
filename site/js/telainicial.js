document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function() {
      const target = item.getAttribute('href').substring(1); // Pega o ID do destino
      document.getElementById('main-title').innerText = `Você clicou em: ${target.charAt(0).toUpperCase() + target.slice(1)}`;
  });
});
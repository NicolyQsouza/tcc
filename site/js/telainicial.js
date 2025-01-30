// Função para carregar os produtos
    async function loadProducts() {
        try {
            const response = await fetch('/produtos');
            if (!response.ok) {
                throw new Error('Falha ao carregar produtos');
            }
            const produtos = await response.json();

            const listaProdutos = document.getElementById('produtos-list');
            listaProdutos.innerHTML = '';

            produtos.forEach(produto => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h3>${produto.nome}</h3>
                    <p><strong>Marca:</strong> ${produto.marca}</p>
                    <p><strong>Valor:</strong> R$ ${produto.valor}</p>
                    <p>${produto.descricao}</p>
                    <img src="${produto.foto}" alt="${produto.nome}" class="produto-imagem">
                `;
                listaProdutos.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', loadProducts);

// Função para carregar os feedbacks
async function loadFeedbacks() {
  try {
      const response = await fetch('/feedbacks');
      if (!response.ok) {
          throw new Error('Falha ao carregar feedbacks');
      }
      const feedbacks = await response.json();

      const listaFeedbacks = document.getElementById('lista-feedbacks');
      listaFeedbacks.innerHTML = ''; // Limpar conteúdo existente

      feedbacks.forEach(feedback => {
          const div = document.createElement('div');
          div.classList.add('feedback-item');
          div.innerHTML = `
              <h4>${feedback.nome}</h4>
              <p>${feedback.mensagem}</p>
              <p><strong>Data:</strong> ${feedback.data}</p>
          `;
          listaFeedbacks.appendChild(div);
      });
  } catch (error) {
      console.error('Erro ao carregar feedbacks:', error);
  }
}

// Carregar produtos e feedbacks na inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadFeedbacks();
});

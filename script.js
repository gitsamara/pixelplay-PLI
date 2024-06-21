// Função para formatar números em reais (R$)
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Função para exibir o carrinho
function displayCart() {
    const cartElement = document.querySelector('.cart-itens');

    // Verifica se o elemento foi encontrado
    if (cartElement !== null) {
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        console.log('Cart contents:', cart); // Adiciona log para verificação
        
        if (cart.length === 0) {
            cartElement.innerHTML = 'Seu carrinho está vazio'; // Define o conteúdo do carrinho vazio
            updateCartTotal(cart); // Atualiza o total para zero
        } else {
            cartElement.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.name}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>Preço: ${formatCurrency(item.price)}</p>
                    <button onclick="removeFromCart(${item.id})">Remover</button>
                </div>
            `).join('');
            updateCartTotal(cart);
        }
    } else {
        console.error("Elemento 'cart-itens' não encontrado no DOM.");
    }
}

// Função para atualizar o total do carrinho
function updateCartTotal(cart) {
    const totalPriceElement = document.getElementById('totalPrice');
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: ${formatCurrency(total)}`;
}

// Função para adicionar um item ao carrinho
function addToCart(item) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log('Item adicionado ao carrinho', item); // Adiciona log para verificação
    alert('Item adicionado ao carrinho');
}

// Função para remover um item do carrinho
function removeFromCart(itemId) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let updatedCart = cart.filter(item => item.id !== itemId);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart(); // Atualiza o carrinho na interface após remover o item
    alert('Item removido do carrinho');
}

// Função para limpar o carrinho
function clearCart() {
    sessionStorage.removeItem('cart');
    displayCart(); // Atualiza o carrinho na interface após limpar o carrinho
    alert('Você não possui mais itens no carrinho');
}

// Função para finalizar a compra (simulação)
function checkout() {
    alert('a funcionalidade de checkout ainda não foi implementada :)');
}

// Carrega o carrinho ao carregar a página
window.onload = function() {
    if (window.location.pathname.endsWith('cart.html')) {
        displayCart();
    }
};

// Chamada inicial para exibir o carrinho na carga da página
displayCart();

//Carossel
const swiper = new Swiper(".swiper", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    keyboard: true,
  });

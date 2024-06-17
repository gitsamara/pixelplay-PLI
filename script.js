// script.js

// Função para formatar números em reais (R$)
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Função que exibe o carrinho
function displayCart() {
    var cartElement = document.querySelector('.cart-itens'); // Acessa o elemento com a classe 'cart-itens'
    
    // Verifica se o elemento foi encontrado
    if (cartElement !== null) {
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        console.log('Cart contents:', cart); // Adiciona log para verificação
        
        if (cart.length === 0) {
            cartElement.innerHTML = 'Seu carrinho está vazio'; // Define o conteúdo do carrinho vazio
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
function updateCartTotal(cartItems) {
    let total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let cartTotalElement = document.getElementById('totalPrice');
    if (cartTotalElement !== null) {
        cartTotalElement.textContent = `Total: ${formatCurrency(total)}`;
    }
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
    console.log('Item added to cart:', item); // Adiciona log para verificação
}

// Função para remover um item do carrinho
function removeFromCart(itemId) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let updatedCart = cart.filter(item => item.id !== itemId);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart(); // Atualiza o carrinho na interface após remover o item
}

// Função para limpar o carrinho
function clearCart() {
    sessionStorage.removeItem('cart');
    displayCart(); // Atualiza o carrinho na interface após limpar o carrinho
}

// Função para finalizar a compra (simulação)
function checkout() {
    // Aqui você pode implementar a lógica real de checkout, por exemplo, redirecionar para uma página de pagamento.
    alert('Checkout functionality would be implemented here.');
}

// Carrega o carrinho ao carregar a página
window.onload = function() {
    if (window.location.pathname.endsWith('cart.html')) {
        displayCart();
    }
};

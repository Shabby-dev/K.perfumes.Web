const listProducts = document.querySelector('#listProducts');
const contentProducts = document.querySelector('#contentProducts');
const emptyCart = document.querySelector('#emptyCart');

let productsArray = [];

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa los eventos y carga productos del localStorage
  eventListeners();
  loadProduct();
});

function eventListeners() {
  // Escucha el clic en los productos para añadirlos al carrito
  listProducts.addEventListener('click', getDataElements);

  // Vacía el carrito
  emptyCart.addEventListener('click', () => {
    productsArray = [];
    productsHtml();
    updateCartCount();
    updateTotal();
    saveLocalStorage();
  });
}

function loadProduct() {
  const loadProducts = localStorage.getItem('products');
  if (loadProducts) {
    productsArray = JSON.parse(loadProducts);
    productsHtml();
    updateCartCount();
  } else {
    productsArray = [];
  }
}

function updateCartCount() {
  const cartCount = document.querySelector('#cartCount');
  cartCount.textContent = productsArray.length;
}

function updateTotal() {
  const total = document.querySelector('#total');
  const totalProduct = productsArray.reduce(
    (total, prod) => total + prod.price * prod.quantity,
    0
  );
  total.textContent = `$${totalProduct.toFixed(2)}`;
}

function getDataElements(e) {
  if (e.target.classList.contains('btn-add')) {
    // Se busca el contenedor producto usando la clase ".product"
    const elementHtml = e.target.closest('.product');
    console.log("elementHtml:", elementHtml);
    selecData(elementHtml);
  }
}

function selecData(prod) {
    const productObj = {
        img: prod.querySelector('img').src,
        title: prod.querySelector('h4').textContent,
        price: parseFloat(prod.querySelector('#currentPrice').textContent.replace('$', '')),
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10),
        quantity: 1
    }

    const exists = productsArray.some(prod => prod.id === productObj.id);
    if (exists) {
        showAlert('El producto ya está existe en el carrito', 'error');
        return;
    }
    productsArray = [...productsArray, productObj];
    showAlert('El producto ya está en el carrito', 'success');

    productsHtml();
    updateCartCount();
    updateTotal();
    saveLocalStorage();
}
function productsHtml() {
  cleanHtml();

  productsArray.forEach(prod => {
    const { img, title, price, quantity, id } = prod;

    const tr = document.createElement('tr');

    // Celda de imagen
    const tdImg = document.createElement('td');
    const prodImg = document.createElement('img');
    prodImg.alt = 'Imagen del producto';
    prodImg.src = img;
    tdImg.appendChild(prodImg);

    // Celda del título
    const tdTitle = document.createElement('td');
    const prodTitle = document.createElement('p');
    prodTitle.textContent = title;
    tdTitle.appendChild(prodTitle);

    // Celda del precio
    const tdPrice = document.createElement('td');
    const prodPrice = document.createElement('p');
    const newPrice = price * quantity;
    prodPrice.textContent = `$${newPrice.toFixed(2)}`;
    tdPrice.appendChild(prodPrice);

    // Celda de cantidad
    const tdQuantity = document.createElement('td');
    const prodQuantity = document.createElement('input');
    prodQuantity.type = 'number';
    prodQuantity.min = '1';
    prodQuantity.value = quantity;
    prodQuantity.dataset.id = id;
    prodQuantity.addEventListener('change', updateQuantity);
    tdQuantity.appendChild(prodQuantity);

    // Celda de eliminación
    const tdDelete = document.createElement('td');
    const prodDelete = document.createElement('button');
    prodDelete.type = 'button';
    prodDelete.textContent = 'X';
    prodDelete.addEventListener('click', () => destroyProduct(id));
    tdDelete.appendChild(prodDelete);

    tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);
    contentProducts.appendChild(tr);
  });
}

function saveLocalStorage() {
  localStorage.setItem('products', JSON.stringify(productsArray));
}

function updateQuantity(e) {
  const newQuantity = parseInt(e.target.value, 10);
  const idProd = parseInt(e.target.dataset.id, 10);

  const product = productsArray.find(prod => prod.id === idProd);
  if (product && newQuantity > 0) {
    product.quantity = newQuantity;
  }

  productsHtml();
  updateTotal();
  saveLocalStorage();
}

function destroyProduct(idProd) {
  productsArray = productsArray.filter(prod => prod.id !== idProd);
  showAlert('Producto eliminado del carrito', 'success');
  productsHtml();
  updateCartCount();
  updateTotal();
  saveLocalStorage();
}

function cleanHtml() {
  if (!contentProducts) {
    console.error("El elemento con id 'contentProducts' no se encontró en el DOM.");
    return;
  }
  while (contentProducts.firstChild) {
    contentProducts.removeChild(contentProducts.firstChild);
  }
}

function showAlert(message, type) {
  const existingAlert = document.querySelector('#alerta');
  if (existingAlert) existingAlert.remove();

  const div = document.createElement('div');
  div.id = 'alerta';
  div.classList.add('alerta', type);
  div.textContent = message;

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 5000);
}
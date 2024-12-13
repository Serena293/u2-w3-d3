const container = document.getElementById("container");
const rowContainer = document.getElementById("row-container");
const cartContainer  = document.getElementById('cart-container')
let cart = [];

const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};


const removeFromLocalStorage = (asin) => {
  cart = cart.filter((item)=> item.id !== asin)
  saveCartToLocalStorage()
  loadCartFromLocalStorage()
// JSON.parse(localStorage.removeItem('cart'))
}


const loadCartFromLocalStorage = () => {
  cartContainer.innerHTML =''
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart)

    cart.forEach((item)=>{
      const itemSaved = document.createElement('div')
      itemSaved.innerHTML = `${item.title} <button class='remove-btn-cart' id="${item.asin}">Remove</button>`
      cartContainer.appendChild(itemSaved)
      
      const removeBtnCart = itemSaved.querySelector('.remove-btn-cart')
      removeBtnCart.addEventListener('click', ()=>{
        removeFromLocalStorage(item.id)
      })

    })
  }
};

loadCartFromLocalStorage();
const getBooks = () => {
  const booksURL = "https://striveschool-api.herokuapp.com/books";
  fetch(booksURL)
    .then((response) => {
      //   console.log("Oggetto", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore");
      }
    })
    .then((books) => {
      //   console.log("secondo then");
      books.forEach((book) => {
        const newSlot = document.createElement("div");
        newSlot.classList.add("col", "col-12", "col-md-6", "col-lg-3");
        newSlot.innerHTML = `<div class="card m-2">
  <img src="${book.img}" class="card-img-top" alt="book cover">
  <div class="card-body">
    <h5 class="card-title">${book.title}e</h5>
    <p class="card-text">Category: ${book.category}</p>
      <p class="card-text"> Price: ${book.price}€</p>
      <p class="card-text">ID: ${book.asin}</p>
      <div class="d-flex justify-content-around">
    <a href="#" class="btn btn-primary delete-btn">Scarta</a>
     <a href="#" class="btn btn-primary add-btn" data-id=${book.asin}>Aggiungi al carrello</a>
     </div>
  </div>
</div>`;
        rowContainer.appendChild(newSlot);

        const deleteBtn = newSlot.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", (e) => {
          e.preventDefault();
          newSlot.remove();
        });

        // const addToCart = () => {}

        const addBtn = newSlot.querySelector(".add-btn");
        addBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const product = {
            title: book.title,
            id: addBtn.dataset.id,
            quantity: 1,
          };

          const existingProduct = cart.find((item) => item.id === product.id);

          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            cart.push(product);
          }
          saveCartToLocalStorage(); //salva 
          console.log(cart);
        });
      });
    })

    .catch((errore) => {
      console.log("errore");
    });
};

getBooks();

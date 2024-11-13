const container = document.getElementById("container");
const rowContainer = document.getElementById("row-container");
const cart = [];
const getBooks = () => {
  const booksURL = "https://striveschool-api.herokuapp.com/books";
  fetch(booksURL)
    .then((response) => {
      console.log("Oggetto", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore");
      }
    })
    .then((books) => {
      console.log("secondo then");
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

        const addBtn = newSlot.querySelector(".add-btn");
   addBtn.addEventListener('click',(e)=>{
        e.preventDefault()
       console.log(addBtn.dataset)
        cart.push(newSlot.title)
        console.log(cart)
    })
      });
    })
 

    .catch((errore) => {
      console.log("errore");
    });
};

getBooks();

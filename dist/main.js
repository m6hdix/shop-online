const toggle = document.querySelector(".toggle")
const popUp = document.querySelector(".mobile-menu")
const profilePopUp = document.querySelector("#profile-popup")
const imgProfile = document.querySelector("#img-profile")
const dow = document.querySelector(".downer")


const productsPrinters = document.querySelector(".product-center")
const counterCart = document.querySelector(".counter-cart ")
const totalPrice = document.querySelector(".total-price")
const cartViweTarget = document.querySelector(".cart-viwe")

let cartChek = []



toggle.addEventListener("click", () => {
    if (!popUp.classList.contains("sm:block")) {
        popUp.classList = "sm:block";
    } else if (popUp.classList.contains("sm:block")) {
        popUp.classList = "hidden";
    }
    if (dow.addEventListener("click", () => { popUp.classList = "hidden"; })) {

    }

})



imgProfile.addEventListener("click", () => {
    if (profilePopUp.classList.contains("hidden")) {
        profilePopUp.classList = "block";
    } else if (!profilePopUp.classList.contains("hidden")) {
        profilePopUp.classList = "hidden";
    }
    if (dow.addEventListener("click", () => { profilePopUp.classList = "hidden";; })) {

    }
})


// set the modal menu element
const btnMdalCancel = document.querySelector(".modal-cancel")
const targetHidden = document.querySelector(".target-hidden")
const showModal = document.querySelector(".show-modal")
const modalElement = document.querySelector(".modal-pirint")
showModal.addEventListener("click", () => {
    if (modalElement.classList.contains("hidden")) {
        modalElement.classList.remove("hidden")
        modalElement.classList.add("block")
    }

})

btnMdalCancel.addEventListener("click", (e) => {
    modalElement.classList.add("hidden")
})


const btns = document.querySelectorAll(".btn-counter");
const counters = document.querySelector(".counter")

let count = 0

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const clases = btn.classList;
        if (clases.contains("incerment")) count++;
        else if (clases.contains("decrement")) count--;
        else count = 0;
        counters.textContent = count;
    })
})


/// clases 
const productsList = [{
    idProduct: 1,
    title: "Earthen Bottle",
    price: 48,
    imageUrl: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
}, {
    idProduct: 2,
    title: "Nomad Tumbler",
    price: 20,
    imageUrl: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg ",
}, {
    idProduct: 3,
    title: "Focus Paper Refill",
    price: 89,
    imageUrl: " https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg ",
}, {
    idProduct: 4,
    title: "Machined Mechanical Pencil",
    price: 29,
    imageUrl: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
}, {
    idProduct: 5,
    title: "Gray Mag TK",
    price: 53,
    imageUrl: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg",
}, {
    idProduct: 6,
    title: "planning office",
    price: 50,
    imageUrl: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-06.jpg",
}, {
    idProduct: 7,
    title: "Bronze scissors instead",
    price: 110,
    imageUrl: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-07.jpg",
}, {
    idProduct: 8,
    title: "leather case and booklet",
    price: 45,
    imageUrl: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-08.jpg",
}, ];




//1.get products
class Products {
    listProducts() {
        return productsList;
    }
};


//2.pirinter products

class UiPirinter {
    productsItem(products) {
        let resulte = ""
        products.forEach((item) => {
            resulte += `<a href=" # " class=" group ">
          <div class=" w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 ">
              <img src=${item.imageUrl} class=" w-full h-full object-center object-cover group-hover:opacity-75 ">
          </div>
          <h3 class=" mt-4 text-sm text-gray-700 ">${item.title}</h3>
          <p class=" mt-1 text-lg font-medium text-gray-900 ">$${item.price}</p>
          <button type='submit'  class="btn-shop mt-4 ml-6 h-12 w-60 bg-violet-800 rounded-2xl text-white " data-id=${item.idProduct} >add to Shopping
              cart
          </button>
      </a>`
            productsPrinters.innerHTML = resulte
        })


    }


    addToCart() {
        const btnShop = document.querySelectorAll(".btn-shop");
        const btns = [...btnShop];
        btns.forEach((btn) => {
            const id = btn.dataset.id;
            const isInCart = cartChek.find((p) => p.idProduct === id);
            if (isInCart) {
                btn.innerText = "in card";
                btn.disabled = true;
            }
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const storegsProduct = new Storages;
                const addedProduct = {...storegsProduct.getPruduct(id), quantity: 1 };
                e.target.innerText = "in cart";
                e.target.disabled = true;
                cartChek = [...cartChek, addedProduct];
                storegsProduct.saveCart(cartChek);
                this.setCartValue(cartChek);
                this.addCartItems(addedProduct);


            })
        })
    }
    setCartValue(cart) {
        //1.total price :
        let tempCartItems = 0;
        const cartTotal = cart.reduce((acc, curr) => {
            tempCartItems += curr.quantity
            return acc + curr.quantity * curr.price

        }, 0)
        totalPrice.innerHTML = `Total Price : ${cartTotal} $ `
        counterCart.innerHTML = tempCartItems

    }
    addCartItems(cartitems) {
        const div = document.createElement("div")
        div.classList = "flex justify-between "
        div.innerHTML = `  <div class=" w-12 h-12 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden flex justify-between ">
        <img src=${cartitems.imageUrl} class=" w-12 h-12 object-center object-cover group-hover:opacity-75 ">
    </div>
    <h3 class=" mt-4 text-sm text-gray-700 ">${cartitems.title}</h3>
    
    <div class="cart-counter flex flex-row-reverse  ">
    <div><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
  </svg></div>
  <div >
  <p class=" mt-1 text-lg font-medium text-gray-900 ">$${cartitems.price}</p>
  <button class="btn-counter incerment ">+</button>
  <span class="counter ">0</span>
  <button class="btn-counter decrement ">-</button>
  </div>
                </div>
          `
        cartViweTarget.appendChild(div)

    }
}
class Storages {
    saveProducts(products) {
        localStorage.setItem("Products", JSON.stringify(products))
    }
    getPruduct(id) {
        const _product = JSON.parse(localStorage.getItem("Products"))
        return _product.find((p) => p.idProduct === parseInt(id))
    }
    saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart))
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const products = new Products
    const productsDate = products.listProducts()
    const UI = new UiPirinter
    UI.productsItem(productsDate)
    const storage = new Storages
    storage.saveProducts(productsDate)
    UI.addToCart()


})
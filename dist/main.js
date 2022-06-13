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
            const carts = new Storages
            const cheker = carts.cartchker() || []
            const isInCart = cheker.find((p) => p.idProduct === parseInt(id))
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
        let tempcartItems = 0;
        const cartTotal = cart.reduce((acc, curr) => {
            tempcartItems += curr.quantity
            return acc + curr.quantity * curr.price

        }, 0)
        totalPrice.innerHTML = `Total Price : ${cartTotal} $ `
        counterCart.innerHTML = tempcartItems
        const btnRemover = document.querySelector(".btn-remover")
        btnRemover.addEventListener("click", () => {
            tempcartItems = 0
            totalPrice.innerHTML = `Total Price : 0 $ `
            counterCart.innerHTML = tempcartItems

            this.cartRemover();
        })
    }
    addCartItems(cartItems) {
        const div = document.createElement("div")
        div.classList = "flex justify-between cart-content"
        div.innerHTML = `  <div class=" w-12 h-12 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden flex justify-between ">
        <img src=${cartItems.imageUrl} class=" w-12 h-12 object-center object-cover group-hover:opacity-75 ">
    </div>
    <h3 class=" mt-4 text-sm text-gray-700 ">${cartItems.title}</h3>
    
    <div class=" flex flex-row-reverse  ">
    <div data-id=${cartItems.idProduct} class="trash" ><svg xmlns="http://www.w3.org/2000/svg" data-id=${cartItems.idProduct}  class=" trash h-5 w-5 text-red-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
    <path data-id=${cartItems.idProduct}  class="trash"  fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
  </svg></div>
  <div class="cart-counter" >
  <p class=" mt-1 text-lg font-medium text-gray-900 ">$${cartItems.price}</p>
  <button class="btn-counter incerment cursor-pointer "  data-id=${cartItems.idProduct}>+</button>
  <span class="counter " >${cartItems.quantity}</span>
  <button class="btn-counter decrement cursor-pointer "  data-id=${cartItems.idProduct} >-</button>
  </div>
                </div>
          `
        cartViweTarget.appendChild(div)


    }
    setupApp() {
        const storegsProduct = new Storages;
        const items = storegsProduct.getStupApp() || [];
        cartChek = items
        cartChek.forEach((cartItems) => this.addCartItems(cartItems))
        this.setCartValue(cartChek)
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
        const btns = document.querySelectorAll(".btn-counter");
        const counters = document.querySelector(".counter")
        btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const clases = btn.classList;
                if (clases.contains("incerment")) count++;
                else if (clases.contains("decrement")) count--;
                else count = 0;
                counters.textContent = count;
            })
        })
        const btnMdalCancel = document.querySelector(".modal-cancel")
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
    }
    cartRemover() {
        while (cartViweTarget.children.length) {
            cartViweTarget.removeChild(cartViweTarget.children[0])
        }
        modalElement.classList.add("hidden")
        const btnShop = document.querySelectorAll(".btn-shop");
        const btns = [...btnShop];
        btns.forEach((btn) => {
            btn.innerText = "add to Shopping cart";
            btn.disabled = false;
        })
        const storage = new Storages
        this.setCartValue(cartChek, 0);
        storage.saveCart(cartChek);
        localStorage.removeItem("cart")
        location.reload();
    }
    cartItemRemover() {
        const btnRemover = document.querySelector(".cart-viwe")
        btnRemover.addEventListener("click", (el) => {
            if (el.target.classList.contains("incerment")) {
                const addQuantity = el.target
                const targets = cartChek.find((e) => e.idProduct == addQuantity.dataset.id)
                targets.quantity++
                    addQuantity.nextElementSibling.innerText = targets.quantity
                this.setCartValue(cartChek)
                const storage = new Storages
                storage.saveCart(cartChek)
            } else if (el.target.classList.contains("decrement")) {
                const addQuantity = el.target
                const targets = cartChek.find((e) => e.idProduct == addQuantity.dataset.id)
                targets.quantity--
                    addQuantity.previousElementSibling.innerText = targets.quantity
                this.setCartValue(cartChek)
                const storage = new Storages
                storage.saveCart(cartChek)
                if (targets.quantity == 0) {
                    const targets = el.target
                    const targetItem = cartChek.find((e) => e.idProduct == targets.dataset.id)
                    btnRemover.removeChild(targets.parentElement.parentElement.parentElement)
                    this.remover(targetItem);
                    const storage = new Storages
                    storage.saveCart(cartChek)
                }
            }
            if (el.target.classList.contains("trash")) {
                const targets = el.target
                const targetItem = cartChek.find((e) => e.idProduct == targets.dataset.id)
                btnRemover.removeChild(targets.parentElement.parentElement.parentElement)
                this.remover(targetItem);
                const storage = new Storages
                storage.saveCart(cartChek)
            }

        })
    }
    remover(cartID) {
        const btnShop = document.querySelectorAll(".btn-shop");
        const btns = [...btnShop];
        const btnTargets = btns.find((e) => e.dataset.id == cartID.idProduct)
        btnTargets.innerText = "add to Shopping cart";
        btnTargets.disabled = false;
        const trget = cartChek.find((e) => e == cartID)
        cartChek.splice(cartChek.indexOf(trget), 1)
        const storage = new Storages
        storage.saveCart(cartChek)
        this.setCartValue(cartChek)


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
    getStupApp() {
        return JSON.parse(localStorage.getItem("cart"))
    }
    cartchker() {
        return JSON.parse(localStorage.getItem("cart"))

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
    UI.setupApp()
    UI.cartItemRemover()



})
import axios from 'axios'
let addToCart = document.querySelectorAll('.add-to-cart')

function updateCart(pizza) {
    //we will use the library axios
    axios.post('/update-cart', pizza).then(res => {
        console.log(res)
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // let pizza = btn.dataset.pizza
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        // console.log(pizza)
    })
})
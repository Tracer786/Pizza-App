import axios from 'axios'
import Noty from 'noty'
import initAdmin from './admin'
// import {initAdmin} from './admin'
let addToCart = document.querySelectorAll('.add-to-cart')

let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    //we will use the library axios
    axios.post('/update-cart', pizza).then(res => {
        // console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            progressBar: false,
            // layout: 'topRight', //by default top right
            text: 'Item Added To Cart'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            progressBar: false,
            text: 'Something Went Wrong!!'
        }).show();  
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

//Remove alert mesage after X seconds
const alertMsg = document.querySelector('#success-alert')
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    },2000)
}

initAdmin()
let modalQt = 1;
let modalkey = 0;
let cart = [];

const e = (el) => document.querySelector(el);  
const all = (el) => document.querySelectorAll(el);

// listagem das pizzas
pizzaJson.map((pizza, index) => {
    let pizzaItem = e('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;


    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault()

        pizzaId = event.target.closest('.pizza-item').getAttribute('data-key');

        modalQt = 1;
        modalkey = pizzaId;

        e('.pizzaBig img').src = pizzaJson[pizzaId].img;
        e('.pizzaInfo h1').innerHTML = pizzaJson[pizzaId].name;
        e('.pizzaInfo--desc').innerHTML = pizzaJson[pizzaId].description;
        e('.pizzaInfo--pricearea .pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[pizzaId].price.toFixed(2)}`;
        e('.pizzaInfo--size.selected').classList.remove('selected');

        e('.pizzaInfo--qt').innerHTML = modalQt;


        all('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[pizzaId].sizes[sizeIndex]
        })
        
        e('.pizzaWindowArea').style.opacity = 0;
        e('.pizzaWindowArea').style.display = 'flex'

        setTimeout(() => {
            e('.pizzaWindowArea').style.opacity = 1;
        }, 0)
    })

    e('.pizza-area').append(pizzaItem);
});

// eventos do modal
function closeModal() {
    e('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        e('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

all('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})

e('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    e('.pizzaInfo--qt').innerHTML = modalQt;
})
e('.pizzaInfo--qtmenos').addEventListener('click', () => {
    modalQt--;
    e('.pizzaInfo--qt').innerHTML = modalQt;

    if (modalQt <= 1) {
    e('.pizzaInfo--qt').innerHTML = 1;
    }
})

all('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        e('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

e('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(e('.pizzaInfo--size.selected').getAttribute('data-key'));

    cart.push({
        id: pizzaJson[modalkey].id,
        size,
        qt:modalQt
    })

    closeModal()
})
const e = (el)=>document.querySelector(el);
const all = (el) => document.querySelectorAll(el);

pizzaJson.map((pizza, index) => {
    let pizzaItem = e('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault()


        
        e('.pizzaWindowArea').style.opacity = 0;
        e('.pizzaWindowArea').style.display = 'flex'

        setTimeout(() => {
            e('.pizzaWindowArea').style.opacity = 1;
        }, 0)

        e('.pizzaBig img').src = pizza.img;
        e('.pizzaInfo h1').innerHTML = pizza.name;
        e('.pizzaInfo .pizzaInfo--desc').innerHTML = pizza.description;
    })

    e('.pizza-area').append(pizzaItem);
})
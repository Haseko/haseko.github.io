base = {
    "menu": [
        {
            "id": 1,
            "image": "http://46.17.104.99:4237/media/images/%D0%BA%D0%B0%D0%BB%D1%8C%D1%8F%D0%BD-%D0%BD%D0%B0-%D0%B3%D1%80%D0%B0%D0%BD%D0%B0%D1%82%D0%B5.jpg",
            "name": "Кальян на гранате",
            "price": 400,
            "description": "Картофельные оладушки с семгойКартофельные оладушки с семгойКартофельные оладушки с семгойКартофельные оладушки с семгой",
            "category": 1
        },
        {
            "id": 2,
            "image": "http://46.17.104.99:4237/media/images/%D0%BA%D0%B0%D0%BB%D1%8C%D1%8F%D0%BD-%D0%BD%D0%B0-%D0%BF%D0%BE%D0%BC%D0%B5%D0%BB%D0%BE.jpg",
            "name": "Кальян на помело",
            "price": 500,
            "description": "Картофельные оладушки с семгойКартофельные оладушки с семгойКартофельные оладушки с семгойКартофельные оладушки с семгой",
            "category": 1
        },
        {
            "id": 3,
            "image": "http://46.17.104.99:4237/media/images/0e85415eb48285db2eb08f2a87.jpg.webp",
            "name": "Картофельные оладушки с семгой",
            "price": 230,
            "description": "Картофельные оладушки с семгойКартофельные оладушки с семгойКартофельные оладушки с семгойКартофельные оладушки с семгой",
            "category": 2
        },
        {
            "id": 4,
            "image": "http://46.17.104.99:4237/media/images/2d225d5a8abd4616dc7a77e30b.jpg.webp",
            "name": "Фаршированные перепелиные яйца",
            "price": 200,
            "description": "Картофельные оладушки с семгойКартофельные оладушки с семгойКартофельные оладушки с семгойКартофельные оладушки с семгой",
            "category": 2
        }
    ]
}

function gen_item(item) {

    source='<div class="menu-item" attr-id="' + item["id"] + '">'+
            '<img '+
              'alt="Black Placeholder Image"'+
              'class="menu-item-img"'+
            '/>'+
            '<div class="menu-item-text">'+
              '<h3 class="menu-item-heading">'+
                '<p class="menu-item-name">' + item["name"] + '</p>'+
                '<p class="menu-item-price">' + item["price"] + ' рублей</p>'+
              '</h3>'+
              '<p class="menu-item-desc">'+
                item["description"]+
              '</p>'+
            '</div>'+
            '<div class="input" attr-id="' + item["id"] + '">'+
              '<button class="minus" aria-label="Decrease by one" disabled>'+
                '<svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                  '<line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />'+
                '</svg>'+
              '</button>'+
              '<div class="number dim">0</div>'+
              '<button class="plus" aria-label="Increase by one">'+
                '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="plus">'+
                  '<line x1="8" y1="4.37114e-08" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />'+
                  '<line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />'+
                '</svg>'+
              '</button>'+
            '</div>'+
          '</div>'

    return source
}

order = {};

var div = $('#main-menu')

for (item of base["menu"]) {
    div.append(gen_item(item))

    img = $('[attr-id="' + item['id'] + '"]').find("img")
    img.attr("src",item["image"])
}

const buttons = document.querySelectorAll("button");
const minValue = 0;
const maxValue = 10;

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const element = event.currentTarget;
    const parent = element.parentNode;

    const elementId = parent.getAttribute("attr-id");

    const numberContainer = parent.querySelector(".number");
    const number = parseFloat(numberContainer.textContent);

    const increment = parent.querySelector(".plus");
    const decrement = parent.querySelector(".minus");

    const newNumber = element.classList.contains("plus")
      ? number + 1
      : number - 1;

    numberContainer.textContent = newNumber;

    order[elementId] = newNumber;

    if (newNumber === minValue) {
      decrement.disabled = true;
      numberContainer.classList.add("dim");
      element.blur();
    } else if (newNumber > minValue && newNumber < maxValue) {
      decrement.disabled = false;
      increment.disabled = false;
      numberContainer.classList.remove("dim");
    } else if (newNumber === maxValue) {
      increment.disabled = true;
      numberContainer.textContent = `${newNumber}+`;
      element.blur();
    }
  });
});

Telegram.WebApp.ready();
Telegram.WebApp.MainButton.setText('Открыть игру').show().onClick(function () {
    const data = JSON.stringify(order);
    Telegram.WebApp.sendData(data);
    Telegram.WebApp.close();
});
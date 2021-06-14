// --------------------------------- slider 1 -------------------------------------

let right = document.querySelector("#right");
let left = document.querySelector("#left");
let parent = document.querySelector(".parent-slider");

let i = 0;
let move = 0;

left.onclick = (e) => {
  if (i < 1) {
    move = move + 100;
    parent.style.left = -move + "%";
    i++;
  }

  right.onclick = (e) => {
    if (i > 0) {
      move -= 100;
      parent.style.left = -move + "%";
      i--;
    }
  };
};

// --------------------------------- scrolling nav-bar -------------------------------------

window.addEventListener("scroll", () => {
  if (scrollY > 30) {
    document.querySelector(".nav-bar").style.top = "0";
    document.querySelector(".nav-bar").style.position = "fixed";
    document.querySelector(".nav-bar").style.background =
      "rgba(255,255,255,0.9)";
    document.querySelector(".nav-bar").style.borderBottom =
      "1px solid lightgray";
  } else {
    document.querySelector(".nav-bar").style.background = "transparent";
    document.querySelector(".nav-bar").style.borderBottom = "none";
  }
});

// --------------------------------- shopping cart start -------------------------------------

let add_cart_btn = document.querySelectorAll("#quick-btn");
let span = document.querySelector("#span");
let top1 = document.querySelector(".top");

top1.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

add_cart_btn.forEach((btn) => {
  // console.log(btn);

  btn.addEventListener("click", getdata);
});

function getdata(e) {
  let parent = e.target.parentElement;
  let img = parent.querySelector("img").src;
  let h2 = parent.querySelector("h2").innerText;
  let p = parent.querySelector("p").innerText;
  let div = document.createElement("div");
  div.className = "showdiv";
  div.innerHTML = `
    <button id="cross">X</button>
    <div class="add-image">
    <div class="main">
        <div class="child">
            <div class="one"><img src="${img}"></div>
            <div class="one"><img src="the-vintage-tote-7_300x.jpeg"></div>
            <div class="one"><img src="vintage-messenger_3000x.jpeg"></div>
            <div class="one"><img src="the-vintage-tote_3000x.jpeg"></div>
            <div class="one"><img src="wp-arizona-arena-case1_300x.jpeg"></div>
        </div>
    </div>

    <div class="main2">
        <div class="child2">
            <div class="one2"><img src="${img}"></div>
            <div class="one2"><img src="the-vintage-tote-7_300x.jpeg"></div>
            <div class="one2"><img src="vintage-messenger_3000x.jpeg"></div>
            <div class="one2"><img src="the-vintage-tote_3000x.jpeg"></div>
            <div class="one2"><img src="wp-arizona-arena-case1_300x.jpeg"></div>
        </div>
    </div>
</div>
    <div class="add-text">
        <h1>${h2}</h1>
        <h2>${p}</h2>
        <ul id="detail">
            <li>Detail</li>
            <li>100% Vegetable Tanned Leather</li>
            <li>Padded Laptop Storage Lined in Suede</li>
            <li>Back Newspaper Pouch</li>
            <li>Key Lanyard</li>
            <li>Adjustable Padded Strap</li>
            <li>As pictured with a 13" laptop</li>
        </ul>
        <p>Demo shop only. To purchase these products please visit<br> Whipping Post. To purchase the Retina theme please visit the<br> Shopify Theme Store.</p>
        <a href="" id="learn">View full products detail <i class="fas fa-long-arrow-alt-right"></i></a>
        <button id="add-btn">add to cart</button>
    </div>`;

  document.body.appendChild(div);
  let showdiv = document.querySelector(".showdiv");

  // --------------------------------- remove div from body -------------------------------------

  let cross = document.getElementById("cross");
  cross.addEventListener("click", () => {
    document.body.removeChild(div);
  });

  // --------------------------------- get img price name and send data to local storage -------------------------------------

  let addItemBtn = document.querySelectorAll("#add-btn");

  addItemBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", adddata);
  });

  function adddata(x) {
    let parentdata = x.target.parentElement.parentElement;
    let addimg = parentdata.querySelector("img").src;
    let addPrice = parentdata.querySelector("h1").innerText;
    let addName = parentdata.querySelector("h2").innerText;
    let obj = { addimg, addPrice, addName };
    // console.log(obj);
    let arr = JSON.parse(localStorage.getItem("data"));
    if (arr) {
      arr.push(obj);
      localStorage.setItem("data", JSON.stringify(arr));
      getjsondata();
    } else {
      localStorage.setItem("data", JSON.stringify([obj]));
      getjsondata();
    }

    document.body.removeChild(showdiv);
  }
}

// --------------------------------- get data from local storage and show in the shopping cart  -------------------------------------

let add_ul = document.querySelector("#add-data");
let heading = document.querySelector(".shop-cart-div>h1");

getjsondata();

function getjsondata() {
  let newarr = JSON.parse(localStorage.getItem("data"));
  // console.log(newarr);
  let list = "";
  if (newarr) {
    newarr.forEach((data, index) => {
      // console.log(data,index);
      list += `<ul data-index='${index}'><li><img src='${data.addimg}'></li><li>${data.addName}<br><br><span>${data.addPrice}</span></li>
        <li><button class="plus">+</button>
        <input type="text" value="0" id="input"><button class="minus">-</button><span data-price="${data.addPrice}" id="price">50</span></li>
        <li id="lower"><button id="del-btn" onclick='delbtn(${index})'>delete</button></li></ul>`;
      add_ul.innerHTML = list;
      heading.style.display = "none";
      span.innerHTML = newarr.length;
    });
  }

  applyevent();
}

// --------------------------------- clear all the item in the shopping cart -------------------------------------

let clear = document.querySelector("#clr-btn");

function clearCart() {
  localStorage.clear();
  add_ul.innerHTML = "";
  heading.style.display = "block";
  span.innerHTML = "0";
}

clear.onclick = () => {
  clearCart();
};

function applyevent() {
  let plus = document.querySelectorAll(".plus");
  let minus = document.querySelectorAll(".minus");

  plus.forEach((plsBtn) => {
    plsBtn.addEventListener("click", plsFun);
  });

  minus.forEach((minBtn) => {
    minBtn.addEventListener("click", minFun);
  });
}

function plsFun(a) {
  let qtnDiv = a.target.parentElement;
  // console.log(qtnDiv);
  let input = qtnDiv.querySelector("#input");
  let priceItem = qtnDiv.querySelector("#price");
  // console.log(priceItem);
  let exactprice = qtnDiv.querySelector("span").getAttribute("data-price");
  // console.log(exactprice);

  exactprice = exactprice.replace("$", "");
  exactprice = exactprice.replace(" USD", "");

  let count = input.value;
  count++;
  input.value = count;
  // console.log(count*exactprice);
  priceItem.innerText = count * exactprice;

  // console.log(qtnDiv);
}

function minFun(a) {
  let qtnDiv = a.target.parentElement;
  let input = qtnDiv.querySelector("#input");
  let priceItem = qtnDiv.querySelector("#price");
  // console.log(priceItem);
  let exactprice = qtnDiv.querySelector("span").getAttribute("data-price");

  exactprice = exactprice.replace("$", "");
  exactprice = exactprice.replace(" USD", "");

  let count = input.value;
  count--;
  if (count >= 1) {
    input.value = count;
    priceItem.innerText = count * exactprice;
  }
}

// --------------------------------- mainDiv and add-cart-div move left -------------------------------------

let container = document.querySelector(".bg-container");
let slider = document.querySelector(".shop-cart-div");
let contBtn = document.getElementById("continue");
// console.log(contBtn);

let move1 = true;
function clickIcon() {
  if (move1) {
    slider.style.right = "0";
    container.style.marginLeft = "-35%";
    document.body.style.overflowY = "hidden";
    document.documentElement.scrollTop = 0;
    move1 = false;
  } else if (move1 == false) {
    slider.style.right = "-35%";
    container.style.marginLeft = "0%";
    document.body.style.overflowY = "visible";
    move1 = true;
  }
}

contBtn.addEventListener("click", () => {
  slider.style.right = "-35%";
  container.style.marginLeft = "0%";
  document.body.style.overflowY = "visible";
});

// --------------------------------- delete item from the cart -------------------------------------

function delbtn(index) {
  let newarr = JSON.parse(localStorage.getItem("data"));
  if (newarr.length == 1) {
    clearCart();
  } else {
    newarr.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(newarr));
    let removeli = document.querySelector(`ul[data-index='${index}']`);
    add_ul.removeChild(removeli);
    span.innerHTML = newarr.length;
  }
}

// ----------------------------------- fade div --------------------------------------------

let fadeDiv = document.querySelector(".fade-div");
let fadeBtn = document.querySelector("#cross-fade");

fadeBtn.addEventListener("click", () => {
  document.body.removeChild(fadeDiv);
});

setTimeout(() => {
  fadeDiv.style.transform = "scale(1)";
  fadeDiv.style.visibility = "visible";
}, 5000);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState == "hidden") {
    document.title = "Please Come Back";
  } else {
    document.title = "On Website";
  }
});

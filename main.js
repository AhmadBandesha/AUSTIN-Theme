// --------------------------------- slider 1 -------------------------------------

let right = document.querySelector('#right')
let left = document.querySelector('#left')
let parent = document.querySelector('.parent-slider')

let i=0
let move=0

left.onclick = (e) => {

    if (i < 1) {
        move = move + 100
        parent.style.left = -move + "%"
        i++
    }

    right.onclick = (e) => {
        if (i > 0) {
            move -= 100
            parent.style.left = -move + "%"
            i--
        }
    }
}

// --------------------------------- scrolling nav-bar -------------------------------------

window.addEventListener('scroll',()=>{
    if(scrollY>30){
        document.querySelector('.nav-bar').style.top='0'
        document.querySelector('.nav-bar').style.position='fixed'
        document.querySelector('.nav-bar').style.background='rgba(255,255,255,0.9)'
        document.querySelector('.nav-bar').style.borderBottom='1px solid lightgray'
    }else{
        document.querySelector('.nav-bar').style.background='transparent'
        document.querySelector('.nav-bar').style.borderBottom='none'
        
    }
})

// --------------------------------- shopping cart start -------------------------------------

let add_cart_btn = document.querySelectorAll('#quick-btn')
// let quick_img = document.querySelectorAll('.quick-img')

add_cart_btn.forEach((btn)=>{
    // console.log(btn);

    btn.addEventListener('click',getdata)
})

function getdata(e){
    let parent = e.target.parentElement
    let img = parent.querySelector('img').src
    let h2 = parent.querySelector('h2').innerText
    let p = parent.querySelector('p').innerText
    let div = document.createElement('div')
    div.className='showdiv'
    div.innerHTML=`
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
    </div>`

    document.body.appendChild(div)

// --------------------------------- remove div from body -------------------------------------

    let cross = document.getElementById('cross')
    cross.addEventListener('click',()=>{
    document.body.removeChild(div)
})

// --------------------------------- get img prcie name and send data to local storage -------------------------------------

let addItemBtn = document.querySelectorAll('#add-btn')

addItemBtn.forEach((addBtn)=>{
    addBtn.addEventListener('click',adddata)
})

function adddata(x){
    let parentdata = x.target.parentElement.parentElement
    // console.log(parentdata);
    let addimg = parentdata.querySelector('img').src
    let addPrice = parentdata.querySelector('h1').innerText
    let addName = parentdata.querySelector('h2').innerText
    let obj = {addimg,addPrice,addName}
    // console.log(obj);
    let arr = JSON.parse(localStorage.getItem('data'))
    if(arr){
        arr.push(obj)
        localStorage.setItem('data',JSON.stringify(arr))
        getjsondata()
    }else{
        localStorage.setItem('data',JSON.stringify([obj]))
        getjsondata()
    }
}

}

// --------------------------------- get data from local storage and show in the shopping cart  -------------------------------------

let add_ul = document.querySelector('#add-data')
let heading = document.querySelector('.shop-cart-div>h1')

// getjsondata()

function getjsondata(){
    let newarr = JSON.parse(localStorage.getItem('data'))
    // console.log(newarr);
    let list=''
    newarr.forEach((data,index)=>{
        // console.log(data,index);
        list+=`<li><img src='${data.addimg}'></li><li>${data.addName}<br><br>${data.addPrice}</li><li><button class="plus">+</button>
        <input type="text" value="0" id="input"><button class="minus disabled">-</button><span id="price">50</span></li>
        <li id="lower"><button id="del-btn" onclick='delbtn(${index})'>delete</button></li>`
        add_ul.innerHTML=list
        heading.style.display='none'
    })

// --------------------------------- clear all the item in the shopping cart -------------------------------------

    let clear = document.querySelector('#clr-btn')
        clear.addEventListener('click',()=>{
            localStorage.clear()
            add_ul.innerHTML=''
            heading.style.display='block'
    })
}

// let input = document.querySelectorAll('#input')
// let plus = document.querySelectorAll('.plus')
// let minus = document.querySelectorAll('.minus')



// plus.forEach((pls)=>{
//     pls.addEventListener('click',plsFun)
// })

// let value;
// function plsFun(){
//     value=input.value
//     console.log(value);
// }

// function plsFun(v){
//     let li = v.target.parentElement
//     let inp = li.querySelector('#input').innerText
//     console.log(inp);
// }
// --------------------------------- mainDiv and add-cart-div -------------------------------------

let container = document.querySelector('.bg-container')
let slider = document.querySelector('.shop-cart-div')
let contBtn = document.getElementById('continue')
// console.log(contBtn);

let move2 = true;
function clickIcon(){
    if(move2){
    slider.style.right='0'
    container.style.marginLeft='-35%'
    document.body.style.overflowY='hidden'
    document.documentElement.scrollTop = 0;
    move2 = false;
}
    else if(move2==false){
        slider.style.right='-35%'
        container.style.marginLeft='0%'
        document.body.style.overflowY='visible'
        move2 = true;
    }
}

contBtn.addEventListener('click',()=>{
    slider.style.right='-35%'
    container.style.marginLeft='0%'
})

// --------------------------------- delete item from the cart -------------------------------------

function delbtn(index){
    // console.log(index);
    let deldata = JSON.parse(localStorage.getItem('data'))
    // console.log(deldata);
    deldata.splice(index,1)
}
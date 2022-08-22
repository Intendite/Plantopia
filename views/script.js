import {db} from './index.js';

const btnHam = document.querySelector('.ham-btn');
const btnTimes = document.querySelector('.times-btn');
const navBar = document.getElementById('Nav-Bar');
const carousel = new Carousel({
    root: document.querySelector('.carousel'),
  });

btnHam.addEventListener('click', function()
{
    if(btnHam.className !== "")
    {
        btnHam.style.display = "none";
        btnTimes.style.display = "block";
        navBar.classList.add("show-nav");
    }
})

btnTimes.addEventListener('click', function()
{
    if(btnHam.className !== "")
    {
        this.style.display = "none";
        btnHam.style.display = "block";
        navBar.classList.remove("show-nav");
    }
})

const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

var acc = document.getElementsByClassName('accordion');
var i;
var len = acc.length;
for(i = 0; i < len; i++){
    acc[i].addEventListener('click',function(){
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight = null;
        }else{
            panel.style.maxHeight = panel.scrollHeight + 'px'
        }
    })
}

function getPlants(){
    // const plantsRef = db.collection('Plants');
    // const snapshot = plantsRef.get();
    // snapshot.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    // });
    alert("helo");
}
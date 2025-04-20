import { getDaysInYear, getDaysPassInYear } from "./helper"
const daysData = {
    total: getDaysInYear(),
    pass: getDaysPassInYear()
}
const remainContentEl = document.getElementById('remain')!
remainContentEl.textContent = `${(daysData.total - daysData.pass)} days left`

function setUpStuff() {
const container = document.getElementById('container')!
// clean container.
container.innerHTML = '';

// do calculations
const dim = {
    width: container.getBoundingClientRect().width,
    height: container.getBoundingClientRect().height,
}

// computing stuff.
const a = Math.ceil(Math.sqrt((dim.width * dim.height)/daysData.total))

// setting new width to container before filling balls
// const newWidth = dim.width - (dim.width % a);
// container.style.width = `${newWidth}px`
// console.log(a, newWidth, dim.width, newWidth%a)

// preparing container
// container.style.display = 'grid';
container.style.gridTemplateColumns = `repeat(${Math.trunc(dim.width / a)}, 1fr)`

// filling balls
for (let i=1; i<=daysData.total; i++) {
    const el = document.createElement('div');
    el.classList.add('ball')
    // el.style.width = `${a}px`

    container.appendChild(el);
    i > daysData.pass && el.classList.add('active')
}

console.log(dim, daysData)


}

setUpStuff();
addEventListener('resize', setUpStuff)
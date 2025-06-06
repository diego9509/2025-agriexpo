// Handler that uses various data-* attributes to trigger
// specific actions, mimicing bootstraps attributes
const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

window.addEventListener('click', (ev) => {
    const elm = ev.target;
    if (triggers.includes(elm)) {
        console.log(elm);
        toggleText(elm);
        elm.classList.toggle('open');
        const selector = elm.getAttribute('data-target');
        collapse(selector, 'toggle');
    }
}, false);


const fnmap = {
    'toggle': 'toggle',
    'show': 'add',
    'hide': 'remove'
};
const collapse = (selector, cmd) => {
    const targets = Array.from(document.querySelectorAll(selector));
    targets.forEach(target => {
        target.classList[fnmap[cmd]]('show');
    });
}

function toggleText(e) {
    let txt = e.innerText;
    e.innerText = txt == '접기' ? '펼치기' : '접기';
}
//main container
const mainEl = document.querySelector("#container");

//should all these elements be in functions?? instead of being created right away? probably
//document fragments??
const elWithClass = (el, ...className)=>{
    const elem = document.createElement(el);
    elem.classList.add(...className);
    return elem;
}

//start 
const start = ()=>(elWithClass("button","start"));


//instructions
const instructions= ()=>(elWithClass("div","instructions"));


const input = (...classNames)=>(elWithClass("input", "input", ...classNames));

//next button
const next = ()=>(elWithClass("button", "next"));

//back button
const back = ()=>(elWithClass("button", "back"));

//link

const link = (url, text)=>{
    let el = elWithClass("button", "dateLink");
    el.innerHTML= `<a href ="${url}">${text}</a>`;
    return el;  
};

//small input layout
const inputLayout = (inputSize)=>{
    mainEl.appendChild(instructions());
    mainEl.appendChild(input(inputSize));
    mainEl.appendChild(next());
    mainEl.appendChild(back());
}

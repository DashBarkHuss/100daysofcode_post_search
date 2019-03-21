//main container
const mainEl = document.querySelector("#container");

//view functions

const elWithClass = (el, ...className)=>{
    const elem = document.createElement(el);
    elem.classList.add(...className);
    return elem;
}

const clearLayout=(...except)=>{
    let i =0;
    while (mainEl.childElementCount > except.length){ //has child nodes besides the ones in excpetion
        let firstChild = mainEl.childNodes[i];
        !except.includes(firstChild)? firstChild.remove(): i++;
    }
}


//components

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
    el.innerHTML= `<a href ="${url}" target="_blank">${text}</a>`;
    return el;  
};

//layouts
//small input layout
const inputLayout = (...classNames)=>{
    mainEl.appendChild(instructions());
    mainEl.appendChild(input(...classNames));
    mainEl.appendChild(next());
    mainEl.appendChild(back());
}

const linkLayout = (url)=>{
    mainEl.appendChild(instructions());
    mainEl.appendChild(link(url, "search"));
    mainEl.appendChild(next());
    mainEl.appendChild(back());
}

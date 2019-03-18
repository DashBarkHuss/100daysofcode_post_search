
let startButton = start();
mainEl.appendChild(startButton);
const startHandler = ()=>{
    //get rid of button
    console.log(start);
    mainEl.removeChild(startButton);
    runSequence();
}

const runSequence = ()=>{
    getDate()
}

const getDate = ()=>{
    inputLayout();
    
}

const inputLayout = ()=>{
    mainEl.appendChild(instructions());
    mainEl.appendChild(input("small"));
    mainEl.appendChild(next());
    mainEl.appendChild(back());
}


startButton.addEventListener("click", startHandler);
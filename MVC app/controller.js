//
const code1 = "tweets = document.querySelectorAll(\".tweet.js-stream-tweet\");\r\n    const names = [];\r\n    for (i=0; i<\r\ntweets.length; i++){\r\n        names.push(tweets[i].dataset.screenName);\r\n JSON.stringify(names);   } ";
let codeToCopy = code1;
let nextFunction;

let startButton = start();
mainEl.appendChild(startButton);
const handler = (e)=>{
    if(e.target.id=="container") return;
    console.log(e.target);

    if(e.target.className=="start") startHandler();
    if(e.target.className=="next") nextHandler();
    if(e.target.className=="back") backHandler();
    
    
}

const startHandler=()=>{
    //get rid of button
    mainEl.removeChild(startButton);
    getDate();
}


const getDate = ()=>{
    inputLayout("small");
    nextFunction = view1;
}

const nextHandler=()=>{
    console.log("hi");
    nextFunction();
}

const view1 = ()=>{
    console.log("2i");
    let date = document.querySelector(".input").value;
    date = datefromString(date);
    let oneHundred = new OneHundredCodeDays(date);
    let search = new Search({since: oneHundred.startDate, range:0});
    let url = search.url(search.since, search.until, search.number);
    mainEl.replaceChild(link(url, "search"), document.querySelector(".input"));
    copyToClipboard(codeToCopy);
}
const backHandler=()=>{
    console.log();
}

const findInCommon = function(e){
    e.preventDefault();
    const names = this.querySelector("#names").value;

    const code2 =  `
        const firstGroup = ${names};
        ${code1};
        const peopleLeft = names.filter((x)=> firstGroup.includes(x));
        peopleLeft;
    `;
    codeToCopy = code2;
    console.log(this);
}


//change this to event propogations since elements will be moving around?
mainEl.addEventListener("click", handler);

///helpers
const datefromString=(str)=>{
    return (new Date(str+"T12:00:00"));  
}

//found this copy to clipboard snippet online
const copyToClipboard = str => {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = str;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
    }
};

//------------------ test
startHandler();
document.querySelector(".input").value = "2019-01-01";
nextHandler();

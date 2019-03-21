//
const code1 = "tweets = document.querySelectorAll(\".tweet.js-stream-tweet:not(.promoted-tweet)\");\r\n    const names = [];\r\n    for (i=0; i<\r\ntweets.length; i++){\r\n        names.push(tweets[i].dataset.screenName);\r\n copyToClipboard(names);   } ";
const copyFunctionMin = 'copyToClipboard=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const o=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);t.select(),document.execCommand("copy"),document.body.removeChild(t),o&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(o))};'

let codeToCopy = copyFunctionMin + code1;
let nextFunction;
let backFunction;
let oneHundred; //better place to have this?
let view0= function(){clearLayout(); mainEl.appendChild(startButton);};
let currentView=0;
const nextView = ()=>{currentView++; view[currentView]()};
const backView = ()=>{currentView--; view[currentView]()};


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
    clearLayout();
    nextView();
}


const view1 = ()=>{
    inputLayout("small");
}

const nextHandler=()=>{
    console.log("next");
    console.log("currentview", currentView);
    nextView();
}

const view2 = ()=>{
    let date = document.querySelector(".input").value;
    date = datefromString(date);
    oneHundred = new OneHundredCodeDays(date);
    let search = new Search({since: oneHundred.startDate, range:0});
    let url = search.url(search.since, search.until, search.number);
    clearLayout();
    linkLayout(url);
    copyToClipboard(codeToCopy);
}

const view3 = ()=>{
    clearLayout();
    inputLayout('large','screennames');

}
const view4 = ()=>{
    let screennames = document.querySelector(".screennames").value;
    setFindInCommonCode(screennames);
    copyToClipboard(codeToCopy);
    clearLayout();
    let rightNow = new Date();
    let yesterday = new Date();
    yesterday.setDate(rightNow.getDate()-1);
    let weekAgo = new Date();
    weekAgo.setDate(rightNow.getDate()-7);
    let search = new Search({since:weekAgo, until: rightNow, num: oneHundred.numberOf(yesterday)});
    let url = search.url(search.since, search.until, search.num);
    linkLayout(url)
}
const backHandler=()=>{
    console.log();
}

const setFindInCommonCode = (screennames)=>{
    //screennames = "xojan0120,MrJasoneTaylor,chazmcbride,cj87holler,_shams_ad,jrl_iv,DashBarkHuss,lepinekong,joakimacarr,iC0dE_,GabbiLopezB,caslabs2,Melissa_A_Kemp,yashaslokesh_,DevLC1,andraStrc,deepstackedtek,jpasholk,rgilbert__,js_tut";
    screennames = uniqueInArray(screennames.split(","));
    const code2 =  `
    const firstGroup = ${screennames};
    ${copyFunctionMin + code1};
    const peopleLeft = names.filter((x)=> firstGroup.includes(x));
    peopleLeft;
    `;
    codeToCopy = code2;
    console.log("new code" + codeToCopy);
}


//change this to event propogations since elements will be moving around?
mainEl.addEventListener("click", handler);
let view = [view0, view1, view2, view3, view4]

//-------------------------------helpers----------------------------------------------------
const datefromString=(str)=>{
    return (new Date(str+"T12:00:00"));  
}

//found this copy to clipboard snippet online
const copyToClipboard = str => {
    console.log(str);
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

const uniqueInArray = (arr)=>(arr.filter((x,i)=> arr.indexOf(x)>=i));

//------------------ test
// startHandler();
// document.querySelector(".input").value = "2019-01-01";
// nextHandler();
// nextHandler();
// document.querySelector(".input").value = "p,l,l";

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

const nextHandler=()=>{
    console.log("next");
    console.log("currentview", currentView);
    nextView();
}

const view1 = ()=>{
    inputLayout("small");
}


const view2 = ()=>{
    let date = document.querySelector(".input").value;
    date = datefromString(date);
    oneHundred = new OneHundredCodeDays(date);
    let search = new Search({since: oneHundred.startDate, range:0, num:[1]});
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
    codeToCopy = setFindInCommonCode(screennames);
    copyToClipboard(codeToCopy);
    clearLayout();

    //days
    let rightNow = new Date();
    let yesterday = new Date();
    yesterday.setDate(rightNow.getDate()-1);
    let weekAgo = new Date();
    weekAgo.setDate(rightNow.getDate()-7);

    let search = new Search({since:yesterday, until: rightNow, num: range(oneHundred.numberOf(weekAgo), oneHundred.numberOf(yesterday))});
    let url = search.url(search.since, search.until, search.number);
    linkLayout(url)
}
const backHandler=()=>{
    console.log();
}

const setFindInCommonCode = (screennames)=>{
    //screennames = "xojan0120,MrJasoneTaylor,chazmcbride,cj87holler,_shams_ad,jrl_iv,DashBarkHuss,lepinekong,joakimacarr,iC0dE_,GabbiLopezB,caslabs2,Melissa_A_Kemp,yashaslokesh_,DevLC1,andraStrc,deepstackedtek,jpasholk,rgilbert__,js_tut";
    screennames = uniqueInArray(screennames.split(","));
    const code2 =  `
    const firstGroup = [${screennames.map(x=> `"${x}"`)}];
    ${copyFunctionMin + code1};
    const peopleLeft = names.filter((x)=> firstGroup.includes(x));
    copyToClipboard(peopleLeft);
    peopleLeft;

    `;
    return code2;
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

const range = (start, end)=>[...Array(end-start+1).keys()].map(x=>x+start);

//------------------ test
startHandler();
document.querySelector(".input").value = "2019-01-01";
nextHandler();
nextHandler();
document.querySelector(".input").value = "DashBarkHuss,Dominus_Kelvin,mahakothuri,furryronin,BillRobitskeJr,agatakozinska,wirtzdan,iameduardolopez,Kabuk1,EriPDev,antonioluisgil,IdrisDiba,simoncordova123,Bollybkampo,lksngy,wblancha,asucarlos1,Nanahawau__,M_sameer007,mowinik,its_kyle_yoo,RitaLeverett,mahamat_legrand,khip1994,FilipeEstacio,bio_kath,the_moisrex,sharifa_alabry,ev_burrell,0033Ricca,JenEColbert,AryanDadheech3,ibadi_1,mijoe,science_biatch,Cphoto21,naveddeshmukh,Robert_Elliott_,r4casper,sophiecantype,iameddieyayaya,walpolesj,RaahulIm,danijmoss,lomyenSEA,Piyush_0108,erol_aliyev,JKarena7,KharyaSahil,maheimaa,aid_jww,TheRohitDas,omprakash___,AlwinRivera,dan0mah,shuv1824,ekcenier,vivianychen,Dinesh48185069,IbrahimH_ss_n,camcodes,CJ71585025,sarabome,y_behailu,KristenTruempy,KaustubhMishal,CiccioAmato7,Usheninte,arpancodes,VarshitAgarwal2,Frunkul,moko__co,nikhiljain61019,techieEliot,notakshayb,thatCoding_Yogi,DedVampire,Koji_JUNIA,AdhithyanVijay,leeto,17000973,geekytechiechic,hobo_take,RichishJain,tommy6073,ryo0111hk,isagi,iSuvm,RabbaniMuzakky,PremanshuPareek,NaveenEdala,MclDrew,furryronin,sac_180822,imasyou718,kiing_edy,tea_koshi,mikeattara,serial_chiller5,iHrishi_mane,MsMaverickk,hanacaraka,LagisquetB,kmelow1,LachlanEagling,ChetanT50970795,merci_good,vegaaSA,abba_xee,Anko1418,iliyasshahapure,SonOfAziza,moko__co,Yinkxz,frozencerebrum,root_ansh,Usheninte,arnay07";


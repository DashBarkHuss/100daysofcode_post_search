//
const code1 = "tweets = document.querySelectorAll(\".tweet.js-stream-tweet:not(.promoted-tweet)\");\r\n    const names = [];\r\n    for (i=0; i<\r\ntweets.length; i++){\r\n        names.push(tweets[i].dataset.screenName);\r\n copyToClipboard(JSON.stringify(names));   } ";
const copyFunctionMin = 'copyToClipboard=e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const o=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);t.select(),document.execCommand("copy"),document.body.removeChild(t),o&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(o))};'

let codeToCopy = copyFunctionMin + code1;
let oneHundred; //better place to have this?
let currentView=0;
const nextView = ()=>{currentView++; view[currentView]()}; //edit for if first and last
const backView = ()=>{currentView--; view[currentView]()};



const handler = (e)=>{
    if(e.target.id=="container") return;
    
    if(e.target.className=="start") startHandler();
    if(e.target.className=="next") nextHandler();
    if(e.target.className=="back") backHandler();
    
    
}

const view0 = ()=>{clearLayout(); mainEl.appendChild(start())};//hoisted

const startHandler=()=>{
    //get rid of button
    clearLayout();
    nextView();
}

const nextHandler=()=>{
    //check if 
    if (!validateForm()) return;
    nextView();
}

const validateForm = ()=>{
    let input = document.querySelector("input");
    if (input==null) return true;
    input = input.value;
    let valid=true;
    switch (currentView) {
        case 1:
            if(input.match(/[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/) == null){
            alert("The date you entered does not match the format YYYY-MM-DD.");
            valid = false;
            }
            break;
        case (3 || 5):
            if(input==""){
                alert("Please plaste in the array that was auto-copied to your clipboard.");
                valid = false;
            }
            break;
        default:
        valid = "true";
            break;
    }    
    return valid;
}

const backHandler=()=>{
    backView();
}

const view1 = ()=>{
    inputLayout("small");
    getInstructions();
}

const view2 = ()=>{
    let date = document.querySelector(".input").value;
    date = datefromString(date);
    oneHundred = new OneHundredCodeDays(date);
    let search = new Search({since: oneHundred.startDate, range:0, num:[1]});
    let url = search.url(search.since, search.until, search.number);
    clearLayout();
    linkLayout(url, "Copy Code & Search Twitter");
    getInstructions();
    copyToClipboard(codeToCopy);
}

const view3 = ()=>{
    clearLayout();
    inputLayout('small','screennames');
    getInstructions();

}
const view4 = ()=>{
    let screennames = JSON.parse(document.querySelector(".screennames").value);
    codeToCopy = setFindInCommonCode(screennames);
    copyToClipboard(codeToCopy);
    clearLayout();

    //days
    let rightNow = new Date();
    let yesterday = new Date();
    yesterday.setDate(rightNow.getDate()-1);
    let weekAgo = new Date();
    weekAgo.setDate(rightNow.getDate()-7);
//test
    let yesterday2 = new Date();
    yesterday2.setDate(yesterday.getDate() - 1)
    let search = new Search({since:yesterday2, until: yesterday, num: range(oneHundred.numberOf(weekAgo), oneHundred.numberOf(yesterday))});


    //let search = new Search({since:yesterday, until: rightNow, num: range(oneHundred.numberOf(weekAgo), oneHundred.numberOf(yesterday))});
    let url = search.url(search.since, search.until, search.number);
    linkLayout(url, "Search")
    getInstructions();
}

const view5= ()=>{
    clearLayout();
    inputLayout('small', "screennames");
    getInstructions();
}

const view6= ()=>{
    let peopleLeft = JSON.parse(document.querySelector(".input").value);
    peopleLeft = uniqueInArray(peopleLeft);
    const mentions = mention(peopleLeft).join("<br>");
    const date = (oneHundred.startDate.getMonth()+1)+"/"+oneHundred.startDate.getDate()+"/"+oneHundred.startDate.getFullYear();
    const url = tweetURL(date, mentions);
    clearLayout();
    linkLayout(url, "Tweet");
    getInstructions();
}

const getInstructions=()=>{
    const instrEl = document.querySelector(".instructions");
    const items = instructionsText!=undefined? instructionsText["view"+currentView].map(x=> `<li>${x}</li>`).join("") : "Instructions didn't load: "+"view" +currentView;
    instrEl.innerHTML = `<ol>${items}</ol>`;
};
const setFindInCommonCode = (screennames)=>{
    //screennames = "xojan0120,MrJasoneTaylor,chazmcbride,cj87holler,_shams_ad,jrl_iv,DashBarkHuss,lepinekong,joakimacarr,iC0dE_,GabbiLopezB,caslabs2,Melissa_A_Kemp,yashaslokesh_,DevLC1,andraStrc,deepstackedtek,jpasholk,rgilbert__,js_tut";
    screennames = uniqueInArray(screennames);
    const code2 =  `
    const firstGroup = ${JSON.stringify(screennames)};
    ${copyFunctionMin + code1};
    const peopleLeft = names.filter((x)=> firstGroup.includes(x));
    copyToClipboard(JSON.stringify(peopleLeft));
    peopleLeft;

    `;
    return code2;
}

const mention = (screennames)=>(screennames.map(x=>`@${x}`));

//class????
const tweetURL = (date, mentions)=>{
    let tweet;
    // const brToSpace() = 
    // if(mentions.replace(/(<br>)/g, '%0A').length>280){}
    // tweet = `Great job<br>${mentions}Going strong since ${date}`
    tweet = `Great job to those who started #100DaysOfCode on ${date} and are still going strong:<br>${mentions}`
    let url = `https://twitter.com/home?status=${tweet}`;
    // const length = tw.replace(/(<br>)/g, '%0A').length;
    // if (length>280){
    //     return "Tweet too Long"
    // }

    url = url.replace(/[#]/g, '%23').replace(/(<br>)/g, '%0A');

    return url;
}

let instructionsText  = null;
fetch('instructions.json')
   .then(resp => resp.json())
   .then(obj => instructionsText = obj)

//-----------------------------AJAX
// let instructionsText = null;
   
// let xhr = new XMLHttpRequest;
// //Call the open function, GET-type of request, url, true-asynchronous
// xhr.open('GET', 'https://api.github.com/users', true)
// //call the onload 
// xhr.onload = function() 
//     {
//         //check if the status is 200(means everything is okay)
//         if (this.status === 200) 
//             {
//                 //return server response as an object with JSON.parse
//                 instructionsText = JSON.parse(this.responseText);
//     }
//             }
// //call send
// xhr.send();


//change this to event propogations since elements will be moving around?
mainEl.addEventListener("click", handler);
let view = [view0, view1, view2, view3, view4, view5, view6]
view0();

//-------------------------------helpers----------------------------------------------------
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

const uniqueInArray = (arr)=>(arr.filter((x,i)=> arr.indexOf(x)>=i));

const range = (start, end)=>[...Array(end-start+1).keys()].map(x=>x+start);

//------------------ test
const peopleStartArray = '["DashBarkHuss","Dominus_Kelvin","mahakothuri","furryronin","BillRobitskeJr","agatakozinska","wirtzdan","iameduardolopez","Kabuk1","EriPDev","antonioluisgil","IdrisDiba","simoncordova123","Bollybkampo","lksngy","wblancha","asucarlos1","Nanahawau__","M_sameer007","mowinik","its_kyle_yoo","RitaLeverett","mahamat_legrand","khip1994","FilipeEstacio","bio_kath","the_moisrex","sharifa_alabry","ev_burrell","0033Ricca","JenEColbert","AryanDadheech3","ibadi_1","mijoe","science_biatch","Cphoto21","naveddeshmukh","Robert_Elliott_","r4casper","sophiecantype","iameddieyayaya","walpolesj","RaahulIm","danijmoss","lomyenSEA","Piyush_0108","erol_aliyev","JKarena7","KharyaSahil","maheimaa","aid_jww","TheRohitDas","omprakash___","AlwinRivera","dan0mah","shuv1824","ekcenier","vivianychen","Dinesh48185069","IbrahimH_ss_n","camcodes","CJ71585025","sarabome","y_behailu","KristenTruempy","KaustubhMishal","CiccioAmato7","Usheninte","arpancodes","VarshitAgarwal2","Frunkul","moko__co","nikhiljain61019","techieEliot","notakshayb","thatCoding_Yogi","DedVampire","Koji_JUNIA","AdhithyanVijay","leeto","17000973","geekytechiechic","hobo_take","RichishJain","tommy6073","ryo0111hk","isagi","iSuvm","RabbaniMuzakky","PremanshuPareek","NaveenEdala","MclDrew","furryronin","sac_180822","imasyou718","kiing_edy","tea_koshi","mikeattara","serial_chiller5","iHrishi_mane","MsMaverickk","hanacaraka","LagisquetB","kmelow1","LachlanEagling","ChetanT50970795","merci_good","vegaaSA","abba_xee","Anko1418","iliyasshahapure","SonOfAziza","moko__co","Yinkxz","frozencerebrum","root_ansh","Usheninte","arnay07"]';
// const peopleLeftArray = '["DashBarkHuss", "boobieboy"]';
//const peopleLeftArray = '["devgupta2607","BeaufortAustin","kiing_edy","wirtzdan","mahakothuri","ev_burrell","CiccioAmato7","DashBarkHuss","megane_ayn","ugly_code","AureliaSpecker","Violet_Figueroa","LeeGainer","LagisquetB","writeens","sirocco_kukri","yuj_3","T_W_H_R_C","hiro_16_18","ct_sci","Chusotuengineer","erickcookie","btmccollum","Nadina_codes","SouthSideCoder","CodeRunGeek","scmCodes","meg_gutshall","ananoterminal"]';
const peopleLeftArray = '["wirtzdan","mahakothuri","ev_burrell","kiing_edy","CiccioAmato7","DashBarkHuss","hanacaraka","hanacaraka","ryo0111hk","mahamat_legrand","hanacaraka","mahakothuri"]';
startHandler();
document.querySelector(".input").value = "2019-01-01";
nextHandler();
nextHandler();
document.querySelector(".input").value = peopleStartArray;
nextHandler();
nextHandler();
document.querySelector(".input").value = peopleLeftArray;


// // ["DashBarkHuss","Dominus_Kelvin","mahakothuri","furryronin","BillRobitskeJr","agatakozinska","wirtzdan","iameduardolopez","Kabuk1","EriPDev","antonioluisgil","IdrisDiba","simoncordova123","Bollybkampo","lksngy","wblancha","asucarlos1","Nanahawau__","M_sameer007","mowinik","its_kyle_yoo","RitaLeverett","mahamat_legrand","khip1994","FilipeEstacio","bio_kath","the_moisrex","sharifa_alabry","ev_burrell","0033Ricca","JenEColbert","AryanDadheech3","ibadi_1","mijoe","science_biatch","Cphoto21","naveddeshmukh","Robert_Elliott_","r4casper","sophiecantype","iameddieyayaya","walpolesj","RaahulIm","danijmoss","lomyenSEA","Piyush_0108","erol_aliyev","JKarena7","KharyaSahil","maheimaa","aid_jww","TheRohitDas","omprakash___","AlwinRivera","dan0mah","shuv1824","ekcenier","vivianychen","Dinesh48185069","IbrahimH_ss_n","camcodes","CJ71585025","sarabome","y_behailu","KristenTruempy","KaustubhMishal","CiccioAmato7","Usheninte","arpancodes","VarshitAgarwal2","Frunkul","moko__co","nikhiljain61019","techieEliot","notakshayb","thatCoding_Yogi","DedVampire","Koji_JUNIA","AdhithyanVijay","leeto","17000973","geekytechiechic","hobo_take","RichishJain","tommy6073","ryo0111hk","isagi","iSuvm","RabbaniMuzakky","PremanshuPareek","NaveenEdala","MclDrew","furryronin","sac_180822","imasyou718","kiing_edy","tea_koshi","mikeattara","serial_chiller5","iHrishi_mane","MsMaverickk","hanacaraka","LagisquetB","kmelow1","LachlanEagling","ChetanT50970795","merci_good","vegaaSA","abba_xee","Anko1418","iliyasshahapure","SonOfAziza","moko__co","Yinkxz","frozencerebrum","root_ansh","Usheninte","arnay07"]
// // // "DashBarkHuss,Dominus_Kelvin,mahakothuri,furryronin,BillRobitskeJr,agatakozinska,wirtzdan,iameduardolopez,Kabuk1,EriPDev,antonioluisgil,IdrisDiba,simoncordova123,Bollybkampo,lksngy,wblancha,asucarlos1,Nanahawau__,M_sameer007,mowinik,its_kyle_yoo,RitaLeverett,mahamat_legrand,khip1994,FilipeEstacio,bio_kath,the_moisrex,sharifa_alabry,ev_burrell,0033Ricca,JenEColbert,AryanDadheech3,ibadi_1,mijoe,science_biatch,Cphoto21,naveddeshmukh,Robert_Elliott_,r4casper,sophiecantype,iameddieyayaya,walpolesj,RaahulIm,danijmoss,lomyenSEA,Piyush_0108,erol_aliyev,JKarena7,KharyaSahil,maheimaa,aid_jww,TheRohitDas,omprakash___,AlwinRivera,dan0mah,shuv1824,ekcenier,vivianychen,Dinesh48185069,IbrahimH_ss_n,camcodes,CJ71585025,sarabome,y_behailu,KristenTruempy,KaustubhMishal,CiccioAmato7,Usheninte,arpancodes,VarshitAgarwal2,Frunkul,moko__co,nikhiljain61019,techieEliot,notakshayb,thatCoding_Yogi,DedVampire,Koji_JUNIA,AdhithyanVijay,leeto,17000973,geekytechiechic,hobo_take,RichishJain,tommy6073,ryo0111hk,isagi,iSuvm,RabbaniMuzakky,PremanshuPareek,NaveenEdala,MclDrew,furryronin,sac_180822,imasyou718,kiing_edy,tea_koshi,mikeattara,serial_chiller5,iHrishi_mane,MsMaverickk,hanacaraka,LagisquetB,kmelow1,LachlanEagling,ChetanT50970795,merci_good,vegaaSA,abba_xee,Anko1418,iliyasshahapure,SonOfAziza,moko__co,Yinkxz,frozencerebrum,root_ansh,Usheninte,arnay07";
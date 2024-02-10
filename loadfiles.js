
import {describe} from './describe.js'
import {getDiff} from './json-difference/dist/index.mjs'

const oursinput = document.querySelector("#oursinput");
const oursloadstatus = document.querySelector(".oursloadstatus");
const oursselect = document.querySelector(".oursselect");
const oursdescribestatus = document.querySelector(".oursdescribestatus")
const oursdescload = document.querySelector(".oursdescload");

const theirsinput = document.querySelector("#theirsinput");
const theirsloadstatus = document.querySelector(".theirsloadstatus");
const theirsselect = document.querySelector(".theirsselect");
const theirsdescribestatus = document.querySelector(".theirsdescribestatus")
const theirsdescload = document.querySelector(".theirsdescload");

const compare = document.querySelector('.compare')
const resultcompare = document.querySelector('.resultcompare');

const diffArea = document.querySelector('.diff');


let oursdoc;
let theirsdoc;

let oursdesc;
let theirsdesc;

let oursied;
let theirsied;

function activateCompare() {
    if(oursdesc) oursdescload.removeAttribute('disabled')
    if(theirsdesc) theirsdescload.removeAttribute('disabled')
    if (oursdesc && theirsdesc) compare.removeAttribute('disabled');
}

function addOptions(doc, select) {
    Array.from(doc.querySelectorAll('IED')).map(ied => ied.getAttribute('name')).forEach(iedName => {
        const option = document.createElement('option');
        option.setAttribute('value',iedName);
        option.textContent = iedName;
        select.appendChild(option);
    });
}

function download(describe, name) {
    const blob = new Blob([JSON.stringify(describe)],{type:"application/json"});
    
    const a = document.createElement('a');
    a.download = name;
    a.href = URL.createObjectURL(blob);
    // a.dataset.downloadurl = ['application/xml', a.download, a.href].join(':');
    // a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
        URL.revokeObjectURL(a.href);
    }, 5000); // TODO(ca-d): discuss revoke timeout length
    
}
    

oursinput.addEventListener("change", async (event) => {
    const file = event.target.files.item(0);
    if (!file) return;
    
    const text = await file.text();
    const docName = file.name;
    oursdoc = new DOMParser().parseFromString(text, 'application/xml');
    
    oursloadstatus.textContent = `SCL ${docName} loaded`;

    // clearSelect();
    addOptions(oursdoc, oursselect);        
});

oursselect.addEventListener('input',(event)=>{
    const iedName = event.target.value;
    const ied = oursdoc.querySelector(`IED[name="${iedName}"]`);
    if(!ied) return;

    oursied = iedName;

    oursdesc = describe(ied);
    if(oursdesc) { activateCompare();oursdescribestatus.textContent = 'IED described';}
    else oursdescribestatus.textContent = 'IED could not be described';
})

oursdescload.addEventListener('click',() => {
    download(oursdesc, `ours_${oursied}`)
})

theirsinput.addEventListener("change", async (event) => {
    const file = event.target.files.item(0);
    if (!file) return;

    const text = await file.text();
    const docName = file.name;
    theirsdoc = new DOMParser().parseFromString(text, 'application/xml');

    theirsloadstatus.textContent = `SCL ${docName} loaded`;

    // clearSelect();
    addOptions(theirsdoc, theirsselect);
});

theirsselect.addEventListener('input',(event)=>{
    const iedName = event.target.value;
    const ied = theirsdoc.querySelector(`IED[name="${iedName}"]`);
    if(!ied) return;

    theirsied = iedName;

    theirsdesc = describe(ied);
    if(theirsdesc) { activateCompare(); theirsdescribestatus.textContent = 'IED described';}
    else theirsdescribestatus.textContent = 'IED could not be described';
})

theirsdescload.addEventListener('click',() => {
    download(theirsdesc, `theirs_${theirsied}`)
})

compare.addEventListener('click',()=>{
    const result = JSON.stringify(oursdesc) === JSON.stringify(theirsdesc);
    resultcompare.textContent = `${oursied} and ${theirsied} are structurally ${result ? 'EQUAL' : "DIFFERENT"}`

    const diff = getDiff(oursdesc,theirsdesc,{ isLodashLike: true })
    console.log(diff);

    diffArea.value = JSON.stringify(diff,undefined,4)
})
        



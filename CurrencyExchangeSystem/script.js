let baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let list = document.querySelectorAll(".choosing select");
const button = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const msg = document.querySelector(".result")
for(select of list){
    // console.log(s);
    for ( let code in countryList) {
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.innerText = code;
        if(select.name === 'from' && code === 'USD'){
            newOption.selected = 'selected';
        }
        else if(select.name === 'to' && code === 'INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change",(ele)=>{
        updateFlag(ele.target);
    }) 
}  
function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImgLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let imgg = element.parentElement.querySelector("img");
    imgg.src = newImgLink;
}
const updateCurrency = async () =>{
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal<1 ){
        amtVal = 1
        amt.value="1";
    }

    const url = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data  = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = rate*amtVal; 
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};
button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateCurrency();
});
window.addEventListener("load",()=>{
    updateCurrency();
});
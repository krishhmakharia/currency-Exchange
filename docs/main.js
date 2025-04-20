const Base_url = "https://api.frankfurter.app/latest?";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromVal = document.querySelector("#from-currency");
const toVal = document.querySelector("#to-currency");
for (const select of dropDowns){
    for(const countryCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.value = countryCode;
        newOpt.innerText = countryCode;
        select.appendChild(newOpt);
        if(select.name === "from-currency" && countryCode === "USD"){
            newOpt.selected = true;
        }
        if(select.name === "to-currency" && countryCode === "INR"){
            newOpt.selected = true;
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

//function to update the flag image
function updateFlag(element){
    let currencyCode=element.value;
    let countryCode=countryList[currencyCode];
    let newsrc=element.parentElement.querySelector("img");
    newsrc.src=`https://flagsapi.com/${countryCode}/flat/64.png`
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue= amount.value;
    
    if(amtValue === "" || amtValue <= 0){
        amtValue = 1;
        amount.value =1;
    }
    let URL =`https://api.frankfurter.app/latest?from=${fromVal.value}&to=${toVal.value}`;
    // console.log(amtValue);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toVal.value];
    let total = (amtValue * rate).toFixed(2);
    
    // let totalVal=total.toString();
    // totalVal = totalVal.slice(0, totalVal.indexOf(".")+3);
    let msg = document.querySelector("#msg");
    msg.innerText =`${amtValue} ${fromVal.value} = ${total} ${toVal.value}`;
    console.log(total);
    
})
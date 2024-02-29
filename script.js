const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")

const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const message_first=document.querySelector("#first")
const message_second=document.querySelector("#second")



window.addEventListener("load", ()=>{
    updateExchangeRate();
    message_first.classList.add("hide")
    message_second.classList.add("hide")
    
})


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=currCode
        newOption.value=currCode
        select.append(newOption)
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })

}

const updateFlag=(element)=>{
    let currCode=element.value
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let image=element.parentElement.querySelector("img");
    image.src=newSrc
}


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    message_first.classList.remove("hide")
    message_second.classList.remove("hide")

})

const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input")
    let amountValue=amount.value;

    if (amountValue==="" || amountValue<1){
        amountValue=1;
        amount.value="1"
    }

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`

    let response=await fetch(URL);
    let data=await response.json()
    let rate=data[toCurr.value.toLowerCase()];

    console.log("d",data);
    console.log("r",rate);

    let finalAmount= amountValue*rate;

    message_second.innerText=`${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    message_first.innerText=`1 ${fromCurr.value} = ${rate} ${toCurr.value}`;

}


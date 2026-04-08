let choosenRadio=null;
const main=document.querySelector("main");
const form=document.querySelector("form");
const firstRadio=document.querySelector("#first");
const lastRadio=document.querySelector("#last");
const customNumber=document.querySelector("#customNumber");
const bill=document.querySelector("#bill");
const number=document.querySelector("#number");
const reset=document.querySelector("button[type='reset']");
const firstResult=document.querySelector("#firstResult");
const secondResult=document.querySelector("#secondResult");
let error=0;
form.reset();
function calculate(){
    if(Number.isInteger(Number(number.value))){
        if(Number(number.value) <= 0){
            defaulted();
            return
        }
        let amount=bill.value/number.value;
        let tip=null;
        if(choosenRadio){
            tip=amount*choosenRadio.value;
            firstResult.textContent="$"+tip.toFixed(2);
            secondResult.textContent="$"+(amount+tip).toFixed(2);
        }
        else if(!Number.isNaN(Number(customNumber.value))){
            tip=amount*customNumber.value*0.01;
            firstResult.textContent="$"+tip.toFixed(2);
            secondResult.textContent="$"+(amount+tip).toFixed(2);
        }
    }
    else{
        defaulted();
    }
}
function defaulted(){
    firstResult.textContent="$0.00";
    secondResult.textContent="$0.00";
}
function displayError(){
    if(bill.value.trim()==="" && !bill.classList.contains("error")){
        bill.previousElementSibling.classList.add("display");
        bill.classList.add("error");
        error+=1;
    }
    
    if(number.value.trim()==="" && !number.classList.contains("error")){
        number.previousElementSibling.classList.add("display");
        number.classList.add("error");
        error+=1;
    }
}
function removeError(ele){
    if(ele.classList.contains("error")){
        ele.previousElementSibling.classList.remove("display");
        ele.classList.remove("error");
        error-=1;
    }
}
function updateRadio(ele){
    if(choosenRadio===ele){
        ele.checked=false;
        choosenRadio=null;
        customNumber.value="";
        defaulted();
        if(bill.value.trim()==="" && number.value.trim()==="" && !choosenRadio){
            reset.classList.remove("active");
            reset.setAttribute("disabled",'');
        }
    }
}
main.addEventListener("change",(e)=>{
    if(e.target.closest(".radioButton")){

        choosenRadio=e.target;

        displayError();
        if(error>0){
            choosenRadio.checked=false;
            choosenRadio=null;
        }
        else{
            calculate();
        }
    }
});
main.addEventListener("click",(e)=>{
    if(e.target.matches("input[type='radio']")){

        let ele=e.target;
        updateRadio(ele);

    }
    if(e.target.matches("#customNumber")){
        if(choosenRadio){
            choosenRadio.checked=false;
            choosenRadio=null;
        }
        displayError();
    }
    if(e.target===reset){
        setTimeout(()=>{
            reset.classList.remove("active");
            reset.setAttribute("disabled",'');
            defaulted();
        },0);
    }
});
main.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft" || e.key==="ArrowUp"){
        if(e.target.matches("#first")){

            e.target.checked=false;
            choosenRadio=null;
            customNumber.focus();

        }
        if(e.target.matches("#customNumber")){

            if(customNumber.value.trim()===""){
                firstRadio.checked=true;
                firstRadio.focus();
            }

        }
    }
    if(e.key==="ArrowRight" || e.key==="ArrowDown"){
        if(e.target.matches("#last")){

            e.target.checked=false;
            choosenRadio=null;
            customNumber.focus();

        }
        if(e.target.matches("#customNumber")){

            if(customNumber.value.trim()===""){
                lastRadio.checked=true;
                lastRadio.focus();
            }

        }
    }
});
main.addEventListener("focusin",(e)=>{
    if(e.target.id==="bill" || e.target.id==="number"){
        removeError(e.target);
    }
    if(e.target.id==="customNumber"){
        if(choosenRadio){
            choosenRadio.checked=false;
            choosenRadio=null;
            defaulted();
        }
    }
});
main.addEventListener("focusout",(e)=>{
    if(e.target.id==="bill" || e.target.id==="number"){
        if(e.target.value.trim()!==""){
            reset.classList.add("active");
            reset.removeAttribute("disabled");
        }
        if(bill.value.trim()==="" && number.value.trim()==="" && !choosenRadio){
            reset.classList.remove("active");
            reset.setAttribute("disabled",'');
            defaulted();
        }
    }
});
main.addEventListener("input",(e)=>{
    if(e.target===customNumber){
        if(error===0 && Number(customNumber.value) > 0){
            calculate();
        }
        else if(error===0 && customNumber.value.trim()===""){
            defaulted();
        }
    }
    if(e.target.id==="bill"){
        calculate();
    }
    if(e.target.id==="number"){
        calculate();
    }
});
const form=document.querySelector("form");
const main=document.querySelector("main");
const inputs=document.querySelectorAll("input");
const yearResult=document.querySelector(".years");
const monthResult=document.querySelector(".months");
const dayResult=document.querySelector(".days");
const year=document.querySelector("#year");
const month=document.querySelector("#month");
const day=document.querySelector("#day");
let yearError=false;
let monthError=false;
let dayError=false;
let errorMessage=null;
const date=new Date();
form.reset();

function displayError(ele,value){
    ele.previousElementSibling.classList.toggle("error",value);
    ele.classList.toggle("error",value);
}
function displayError2(ele,value){
    ele.nextElementSibling.classList.toggle("display",value);
    ele.nextElementSibling.textContent=errorMessage;
}
function errorType(ele){
    if(ele.value.length === 0){
        errorMessage="This field is required";
    }
    else if(ele.id === "day"){
        errorMessage="Must be a valid day";
    }
    else if(ele.id === "month"){
        errorMessage="Must be a valid month";
    }
    else if(ele.id === "year"){
        errorMessage="Must be a valid year";
    }
}
function displayAll(value){
    displayError(year,value);
    displayError(month,value);
    displayError(day,value);
}
function isInPast(){
    let yearPast=false;
    let monthPast=false;
    let dayPast=false;
    let hasError=false;

    if(Number(year.value) > date.getFullYear()){
        if(!yearError){
            hasError=true;
            yearPast=true;
            errorMessage="Must be in the past";
            displayError2(year,true);
        }
        if(hasError){
            displayAll(true);
        }
    }
    else if(Number(year.value) === date.getFullYear()){
        if(Number(month.value) - 1 > date.getMonth()){
            if(!monthError){
                hasError=true;
                monthPast=true;
                errorMessage="Must be in the past";
                displayError2(month,true);
            }
            if(hasError){
                displayAll(true);
            }
        }
        else if(Number(month.value) - 1 === date.getMonth()){
            if(Number(day.value) > date.getDate()){
                if(!dayError){
                    hasError=true;
                    dayPast=true;
                    errorMessage="Must be in the past";
                    displayError2(day,true);
                }
                if(hasError){
                    displayAll(true);
                }
            }
        }
    }

    if(!yearPast && !yearError){
        displayError2(year,false);
    }
    if(!monthPast && !monthError){
        displayError2(month,false);
    }
    if(!dayPast && !dayError){
        displayError2(day,false);
    }

    return hasError;
}
function validDate(){
    const newYear=Number(year.value);
    const newMonth=Number(month.value);
    const newDay=Number(day.value);
    const d = new Date(newYear,newMonth - 1,newDay);

    return d.getDate() === newDay;
}
function padding(ele){
    if(ele.id==="day" || ele.id==="month"){
        if(Number(ele.value) < 10 && ele.value.length < 2){
            ele.value=ele.value.padStart(2,"0");
        }
    }
    if(ele.id==="year"){
        if(ele.value.length < 4){
            ele.value=ele.value.padStart(4,"0");
        }
    }
}
function calculate(){
    let y = date.getFullYear() - Number(year.value);
    let m = (date.getMonth()+1) - Number(month.value);
    let d = date.getDate() - Number(day.value);

    if (d < 0) {
        m--;
        const prevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
        d += prevMonth.getDate();
    }

    if (m < 0) {
        y--;
        m += 12;
    }

    yearResult.parentElement.classList.add("opacity");
    monthResult.parentElement.classList.add("opacity");
    dayResult.parentElement.classList.add("opacity");

    yearResult.textContent=y;
    yearResult.nextElementSibling.textContent =  y === 1 ? " year" : " years";
    monthResult.textContent=m;
    monthResult.nextElementSibling.textContent = m===1 ? " month" : " months";
    dayResult.textContent=d;
    dayResult.nextElementSibling.textContent = d===1? " day" : " days";

    yearResult.parentElement.classList.add("animate");
    monthResult.parentElement.classList.add("animate");
    dayResult.parentElement.classList.add("animate");

}
main.addEventListener("focusin",(e)=>{
    if(e.target.matches("input")){
        displayError(e.target,false);
        displayError2(e.target,false);
    }
});
main.addEventListener("focusout",(e)=>{
    if(e.target.matches("input")){
        if(e.target.value.length > 0){
            padding(e.target);
        }    
    }
});
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    inputs.forEach(ele=>{
        if(!ele.checkValidity()){
            if(ele.id==="year"){
                yearError=true;
            }
            if(ele.id==="month"){
                monthError=true;
            }
            if(ele.id==="day"){
                dayError=true;
            }
            errorType(ele);
            displayError(ele,true);
            displayError2(ele,true);
        }
    });

    const hasErrorPast=isInPast();
    
    let validDateError=false;

    if(!hasErrorPast && !yearError && !monthError && !dayError){
        if(!validDate()){
            validDateError=true;
            errorMessage="Must be a valid date";
            displayError2(day,true);
            displayAll(true);
        }
    }

    if(!hasErrorPast && !validDateError){
        if(!yearError && !monthError && !dayError){
            calculate();
            
            setTimeout(()=>{
                yearResult.parentElement.classList.remove("opacity");
                monthResult.parentElement.classList.remove("opacity");
                dayResult.parentElement.classList.remove("opacity");

                yearResult.parentElement.classList.remove("animate");
                monthResult.parentElement.classList.remove("animate");
                dayResult.parentElement.classList.remove("animate");
            },1000);
        }
    }

    yearError=false;
    monthError=false;
    dayError=false;
});
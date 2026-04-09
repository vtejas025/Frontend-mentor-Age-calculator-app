const form=document.querySelector("form");
const main=document.querySelector("main");
const inputs=document.querySelectorAll("input");
const birthYearAge=document.querySelector("#years");
const birthMonthAge=document.querySelector("#months");
const birthDayAge=document.querySelector("#days");
const year=document.querySelector("#year");
const month=document.querySelector("#month");
const day=document.querySelector("#day");
let yearValid=true;
let monthValid=true;
let dayValid=true;
let errorMessage=null;
form.reset();

function animateStatus(value){
    birthYearAge.parentElement.classList.toggle("opacity",value);
    birthMonthAge.parentElement.classList.toggle("opacity",value);
    birthDayAge.parentElement.classList.toggle("opacity",value);

    birthYearAge.parentElement.classList.toggle("animate",value);
    birthMonthAge.parentElement.classList.toggle("animate",value);
    birthDayAge.parentElement.classList.toggle("animate",value);
}
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
    const date=new Date();
    let yearPast=false;
    let monthPast=false;
    let dayPast=false;
    let hasError=false;

    if(Number(year.value) > date.getFullYear()){
        if(yearValid){
            hasError=true;
            yearPast=true;
            errorMessage="Must be in the past";
            displayError2(year,true);
            displayError(year,true);
        }
    }
    else if(Number(year.value) === date.getFullYear()){
        if(Number(month.value) - 1 > date.getMonth()){
            if(monthValid){
                hasError=true;
                monthPast=true;
                errorMessage="Must be in the past";
                displayError2(month,true);
                displayError(month,true);
            }
        }
        else if(Number(month.value) - 1 === date.getMonth()){
            if(Number(day.value) > date.getDate()){
                if(dayValid){
                    hasError=true;
                    dayPast=true;
                    errorMessage="Must be in the past";
                    displayError2(day,true);
                    displayError(day,true);
                }
            }
        }
    }

    if(!yearPast && yearValid){
        displayError2(year,false);
    }
    if(!monthPast && monthValid){
        displayError2(month,false);
    }
    if(!dayPast && dayValid){
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
    const date=new Date();
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

    birthYearAge.textContent=y;
    birthYearAge.nextElementSibling.textContent =  y === 1 ? " year" : " years";
    birthMonthAge.textContent=m;
    birthMonthAge.nextElementSibling.textContent = m===1 ? " month" : " months";
    birthDayAge.textContent=d;
    birthDayAge.nextElementSibling.textContent = d===1? " day" : " days";

    animateStatus(true);
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
                yearValid=false;
            }
            if(ele.id==="month"){
                monthValid=false;
            }
            if(ele.id==="day"){
                dayValid=false;
            }
            errorType(ele);
            displayError(ele,true);
            displayError2(ele,true);
        }
    });

    const hasErrorPast=isInPast();
    
    let validDateError=false;

    if(!hasErrorPast && yearValid && monthValid && dayValid){
        if(!validDate()){
            validDateError=true;
            errorMessage="Must be a valid date";
            displayError2(day,true);
            displayAll(true);
        }
    }

    if(!hasErrorPast && !validDateError){
        if(yearValid && monthValid && dayValid){
            calculate();
            
            setTimeout(()=>{
                animateStatus(false);
            },1000);
        }
    }

    yearValid=true;
    monthValid=true;
    dayValid=true;
});
function createp(message){
    let p=document.createElement("p");
    p.style.color="hsl(0, 100%, 67%)";
    p.textContent=message;
    return p;
};
function adderror(ele,message){
    ele.previousElementSibling.classList.add("error");
    ele.classList.add("error");
    ele.insertAdjacentElement("afterend",createp(message));
}
function isValidDate(s) {
    const m=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    
    const y=+m[1];
    const mo=+m[2];
    const d=+m[3];

    const date=new Date(y,mo-1,d);

    return (date.getFullYear()===y && date.getMonth()+1===mo && date.getDate()===d);
}
function padding(string){
    while(string.value.length<=4){
        if(string.value.length===4){
            return string;
        }
        string.value="0"+string.value;
    }
}
let form=document.querySelector("form");
form.addEventListener("submit",ele=>{
    ele.preventDefault();
    let date=new Date();
    let currentyear=date.getFullYear();
    let day=document.querySelector("#day");
    let month=document.querySelector("#month");
    let year=document.querySelector("#year");
    input.forEach(ele=>{
        if(ele.value.trim()==="" && !haserror.has(ele.id)){
            haserror.add(ele.id);
            adderror(ele,"This field is requried");
        }
    }); 
    if(Number(day.value)<=0 || (Number(day.value)>=32)){
        if(!haserror.has(day.id)){
            adderror(day,"Must be a valid day");
            haserror.add(day.id);
        }
    }
    if(Number(month.value)<=0 || Number(month.value)>12){
        if(!haserror.has(month.id)){
            adderror(month,"Must be a valid month");
            haserror.add(month.id);
        }
    }
    if(year.value.length>=5){
        if(!haserror.has(year.id)){
            adderror(year,"Must be a valid year");
            haserror.add(year.id);
        }
    }
    else if((Number(year.value) > currentyear)){
        if(!haserror.has(year.id)){
            adderror(year,"Must be in the past");
            haserror.add(year.id);
        }
    }
    if(!haserror.has(year.id) && Number(year.value)===date.getFullYear() && Number(month.value)>date.getMonth()+1){
        if(!haserror.has(month.id)){
            adderror(month,"Must be in the past");
            haserror.add(month.id);
        }
    }
    if(!haserror.has(year.id) && Number(year.value)===date.getFullYear() && Number(month.value)<=date.getMonth()+1 && Number(day.value)>date.getDate()){
        if(!haserror.has(day.id)){
            adderror(day,"Must be in the past");
            haserror.add(day.id);
        }
    }
    if(haserror.size===0){
        if(Number(month.value)<10 && month.value.length===1){
            month.value="0"+month.value;
        }
        if(year.value.length<4){
            year=padding(year);
        }
        if(Number(day.value)<10 && day.value.length===1){
            day.value="0"+day.value;
        }
        let datestring=year.value+"-"+month.value+"-"+day.value;
        if(!isValidDate(datestring)){
            if(!haserror.has(day.id)){
                adderror(day,"Must be a valid date");
                haserror.add(day.id);
            }
        }
    }
    input.forEach(ele=>{
        if(haserror.size>0 && !haserror.has(ele.id)){
            ele.previousElementSibling.classList.add("error");
            ele.classList.add("error");
        }
        else if(haserror.size===0){
            if(ele.previousElementSibling.classList.contains("error") && ele.classList.contains("error")){
                ele.classList.remove("error");
                ele.previousElementSibling.classList.remove("error");
                if(ele.nextElementSibling?.tagName==="P"){
                    ele.nextElementSibling.remove();
                }
            }
        }
    });
    if(haserror.size===0){
        let y = currentyear - Number(year.value);
        let m = (date.getMonth()+1) - Number(month.value);
        let d = date.getDate() - Number(day.value);

        if (d < 0) {
            m--;
            const prevMonth = new Date(currentyear, date.getMonth(), 0);
            d += prevMonth.getDate();
        }

        if (m < 0) {
            y--;
            m += 12;
        }
        let oyear=document.querySelector(".oyear");
        let omonth=document.querySelector(".omonth");
        let oday=document.querySelector(".oday");
        oyear.textContent=y;
        oyear.nextElementSibling.textContent= y === 1 ? " year" : " years";
        omonth.textContent=m;
        omonth.nextElementSibling.textContent= m===1 ? " month" : " months";
        oday.textContent=d;
        oday.nextElementSibling.textContent=d===1? " day" : " days";
    }
});
let input=document.querySelectorAll("input");
let haserror=new Set();
input.forEach(ele=>{
    ele.addEventListener("focus",()=>{
        if(haserror.has(ele.id)){
            ele.classList.remove("error");
            ele.previousElementSibling.classList.remove("error");
            ele.nextElementSibling.remove();
            haserror.delete(ele.id);
        }
        else if(!haserror.has(ele.id)){
            if(ele.previousElementSibling.classList.contains("error") && ele.classList.contains("error")){
                ele.previousElementSibling.classList.remove("error");
                ele.classList.remove("error");
            }
        }
    });
});

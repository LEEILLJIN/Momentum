const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings")


const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function editNameFun(){
    input.value = null;
    localStorage.removeItem(USER_LS);
    form.classList.add(SHOWING_CN);
    greeting.classList.remove(SHOWING_CN);

    form.addEventListener("submit", handleSubmit);
}
function saveName(text){
    localStorage.setItem(USER_LS, text);
}
function handleSubmit(event){
    event.preventDefault();//event를 막음 정보를 내가 원하는 곳(local storage)에 저장하기 위해
    const currentValue = input.value;
    form.classList.remove(SHOWING_CN);

    paintGreeting(currentValue);//여기까지만 하면 위에서 막았던 이벤트가 실행되는데 내 이름을 기억을 못함
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    //form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;

    greeting.addEventListener("click",editNameFun);
}
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //he is not
        askForName();
    }else{
        //he is
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init();
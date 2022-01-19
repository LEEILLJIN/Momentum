const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];


function deleteToDo(event){
    const btn = event.target;//event가 일어난 곳을 반환
    const li = btn.parentNode;//event가 일어난 곳의 부모를 반환
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDO){//filter() 메소드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
        return toDO.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();
}
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))//JSON.stringify : js의 object를 string으로 변환
}
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("span");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.innerText = " x";
    delBtn.classList.add("delbtn");
    delBtn.addEventListener("click",deleteToDo);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj ={
        text : text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";//textbox를 비우기 위해서
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
var showmenu = document.getElementById("showmenu");
var menu = document.getElementById("menu");

document.getElementById("mypayments").style.display = "none";



menu.onclick = function () {
    document.getElementById("showmenu").style.width = "250px";
}

function closeNav() {
    document.getElementById("showmenu").style.width = "0px";
}



const arr = [];
const List = document.getElementById("listResult")
const Result = document.getElementById("comments")
let newComment = document.createElement("p")

function tomoValores(){
    let names = document.getElementById("nombre").value
    let value = document.getElementById("gasto").value
    let descripcion_gasto = document.getElementById("desc").value

    arr.push([names, parseFloat(value),descripcion_gasto])
}
function printList() {
    let newList = document.createElement("li")
    for (i of arr) {
        newList.innerHTML = `<li class="list-group-item bg-primary bg-gradient fw-bold text-white" style="background-color: blue">${i[0]}: \$${i[1]} \ ${i[2]}</li>` 
        List.appendChild(newList)
    }
}
function printComment() {
    newComment.innerHTML = '<p style="background-color: #D3DEDC; padding-left:16px;">Total: $' + suma + '<br> A cada uno le toca: $' + Valores +'</p>'
    List.appendChild(newComment)
}
function splitBills(Montos) {
    suma = 0;
        for (let Valor of Montos){
            suma = suma + Valor[1]  ;
        }
        Valores = suma / (arr.length);
        return Valores, suma
}

function sumbit() {
    tomoValores()
    splitBills(arr)
    printList()
    console.log(suma)
    printComment()
}



let newComment = document.createElement("p")

function printComment() {
    newComment.innerHTML = '<p style="background-color: #D3DEDC; padding-left:16px;">Total: $' + suma + '<br> A cada uno le toca: $' + Valores +'</p>'
    List.appendChild(newComment)
}
function splitBills(Montos) {
    suma = 0;
        for (let Valor of Montos){
            suma = suma + Valor[1]  ;
        }
        Valores = suma / (gastos.length);
        return Valores, suma
}

const idForm=document.getElementById("IdForm")
const List = document.getElementById("listResult")
const botonMostrar=document.getElementById("botonGastos")
let gastos = []

idForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    let names = document.getElementById("nombre").value
    let value = document.getElementById("gasto").value
    let descripcion_gasto = document.getElementById("desc").value
    gastos.push([names,parseFloat(value),descripcion_gasto])
    idForm.reset()
    console.log(gastos)
    let newList = document.createElement("li")

    for (i of gastos){
        newList.innerHTML = `
        <li class="list-group-item bg-primary bg-gradient fw-bold text-white" style="background-color: blue">${i[0]}: \$${i[1]} \ ${i[2]}</li>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${i[0]}</h5>
                <p class="card-text">Gasto: ${i[1]}</p>
                <p class="card-text">Detalle: ${i[2]}</p>
            </div>
        </div>
        ` 
        List.appendChild(newList)
        splitBills(gastos)
        console.log(suma)
        printComment()
    }


})



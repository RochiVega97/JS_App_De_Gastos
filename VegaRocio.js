class claseGastos{
    constructor(nombre, costo, descripcion){
        this.nombre=nombre
        this.costo=costo
        this.descripcion=descripcion
    }
    imprimirEnConsola() {
        console.log(`${this.nombre} ${this.gasto} ${this.descripcion}`)
      }
}
let gastos_array=[]

if(localStorage.getItem('gastos_array')){
    gastos_array= JSON.parse(localStorage.getItem('gastos_array'))
}else{
    localStorage.setItem('gastos_array',JSON.stringify(gastos_array))
}
const idForm=document.getElementById("IdForm")
const List = document.getElementById("listResult")
const botonMostrar=document.getElementById("botonGastos")

let newComment = document.createElement("p")
const botonLightMode=document.getElementById("botonLightMode")
const botonDarkMode=document.getElementById("botonDarkMode")

idForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const datForm= new FormData(event.target)

    const spend= new claseGastos(datForm.get("nombre"),datForm.get("gasto"),datForm.get("desc"))
    gastos_array.push(spend)
    localStorage.setItem('gastos_array',JSON.stringify(gastos_array))
    idForm.reset()

    console.log(gastos_array)
})

botonMostrarGastos.addEventListener('click',()=>{
    const gastosStorage=JSON.parse(localStorage.getItem('gastos_array'))

    List.innerHTML =""
    gastosStorage.forEach((gastosStorage,indice) => {
        List.innerHTML = `
        <li class="list-group-item bg-primary bg-gradient fw-bold text-white" style="background-color: blue">${gastosStorage.name}: \$${gastosStorage.gasto} \ ${gastosStorage.desc}</li>
        <div class="card" id="gasto${indice}" style="width: 18rem;margin:5px">
            <div class="card-body">
                <h5 class="card-title">${gastosStorage.name}</h5>
                <p class="card-text">Gasto: ${gastosStorage.gasto}</p>
                <p class="card-text">Detalle: ${gastosStorage.desc}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        ` 
        splitBills(gastosStorage)
        console.log(suma)
        printComment()

        
    });
})

let darkMode
if(localStorage.getItem('darkMode')){
    darkMode=localStorage.getItem("darkMode")
}else{
    localStorage.setItem('darkMode','light')
}

if(darkMode=='dark'){
    document.body.classList.add('darkMode')
}

botonDarkMode.addEventListener('click',()=>{
    document.body.classList.add('darkMode')
    localStorage.setItem("darkMode","dark")

})


botonLightMode.addEventListener('click',()=>{
    document.body.classList.remove('darkMode')
    localStorage.setItem("darkMode","light")

    
})

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


let gastos = []





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

if(localStorage.getItem('gastos_array')) {
    gastos_array=JSON.parse(localStorage.getItem('gastos_array'))
} else{
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
    Swal.fire(
        'Genial!',
        'Tu gasto fue agregado!'
        
        
      )
})

botonMostrarGastos.addEventListener('click',()=>{
    const gastosStor=JSON.parse(localStorage.getItem('gastos_array'))
    List.innerHTML =""
    gastosStor.forEach((gastos,indice) => {
        gastos.costo=gastos?.costo ?? 0
        List.innerHTML += `
        
        <div class="card" id="gasto${indice}" style="width: 18rem;margin:5px">
            <div class="card-body">
                <h5 class="card-title">${gastos.nombre}</h5>
                <p class="card-text">Gasto: ${gastos.costo}</p>
                <p class="card-text">Detalle: ${gastos.descripcion}</p>
                <button class="btn btn-danger BotonesEliminar">Eliminar</button>
            </div>
        </div>
        ` 
        splitBills(parseInt(gastos.costo))
        
    
    });
    
    printComment()
    gastosStor.forEach((gastos,indice) => {
        const tarjetaGasto= document.getElementById(`gasto${indice}`)
        tarjetaGasto.children[0].children[3].addEventListener('click',()=>{
            restaGasto(parseInt(gastos.costo))
            printComment()
            tarjetaGasto.remove()
            gastos_array.splice(indice,1)
            localStorage.setItem('gastos_array',JSON.stringify(gastos_array))

            setTimeout(()=>{
                Toastify({
                    text: "Se ha eliminado el gasto",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();

            },90)
        
        })
    })
    
})

let darkMode
(localStorage.getItem('darkMode'))? darkMode=localStorage.getItem("darkMode"): localStorage.setItem('darkMode','light')


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


let suma = 0
let cont=0
let Valores=0
function splitBills(Montos) {
    (isNaN(Montos)) ? Montos = 0: Montos
    suma += Montos
    cont++
    Valores = suma / cont
    return Valores, suma
}
function restaGasto(Montos) {
    (isNaN(Montos)) ? Montos = 0: Montos
    suma = suma - Montos
    cont=cont-1
    Valores = suma / cont
    return Valores, suma
}
function printComment() {
    newComment.innerHTML = '<p style="background-color: #D3DEDC; padding-left:16px;">Total: $' + suma + '<br> A cada uno le toca: $' + Valores +'</p>'
    List.appendChild(newComment)
}

const divDolar=document.getElementById('divDolar')
fetch('https://criptoya.com/api/dolar')
.then(response => response.json())
.then(({solidario, ccl, ccb, blue}) =>{
    divDolar.innerHTML=`
        <p>Solidario: $${solidario}</p>
        <p>CCL: $${ccl}</p>
        <p>CCB: $${ccb}</p>
        <p>Blue: $${blue}</p>
    `
})






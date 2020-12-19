const formulario = document.querySelector('#formulario')
const listaTareas = document.querySelector('#lista-tareas')
const template = document.querySelector('#template').content
const fragment = document.createDocumentFragment()

let tareas = {
    
}

document.addEventListener('DOMContentLoaded', () => {
    imprimitTareas()
})

listaTareas.addEventListener('click',e => {
    btnAccion(e)
})

formulario.addEventListener('submit' , e => {
    e.preventDefault()
    let tarea = e.target[0].value
    
    agregarTarea(tarea)
    
})


const agregarTarea = tarea =>{
    if(tarea.trim() === ""){
        console.log('Esta Vacio')
        return
    }

    const tareaAObjeto = {
        id:Date.now(),
        texto:tarea,
        estado:false
    }

    tareas[tareaAObjeto.id] = tareaAObjeto
    console.log(tareas)
    formulario.reset()
    formulario[0].focus()

    imprimitTareas()
}

const imprimitTareas = () => {

    if(Object.values(tareas).length === 0){
        listaTareas.innerHTML = `
        <div class="alert alert-dark text-center">
            No hay tareas pendientes 🎈
        </div>
        `
        return
    }


    listaTareas.innerHTML = ""

    Object.values(tareas).forEach(t => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = t.texto

        if(t.estado){
            clone.querySelector('.alert').classList.replace('alert-warning','alert-primary')
            clone.querySelector('.fas').classList.replace('fa-check-circle','fa-undo-alt')
            clone.querySelector('p').style.textDecoration = "line-through"
        }

        clone.querySelectorAll('.fas')[0].dataset.id = t.id
        clone.querySelectorAll('.fas')[1].dataset.id = t.id
        fragment.appendChild(clone)
    })
    
    listaTareas.appendChild(fragment)
}
 

const btnAccion = e => {
    if(e.target.classList.contains('fa-check-circle')){
        tareas[e.target.dataset.id].estado = true
        imprimitTareas()
        // console.log(tareas)

    }

    if(e.target.classList.contains('fa-minus-circle')){
        delete tareas[e.target.dataset.id]
        imprimitTareas()
        console.log(tareas)
    }

    if(e.target.classList.contains('fa-undo-alt')){
        tareas[e.target.dataset.id].estado = false
        imprimitTareas()
        // console.log(tareas)

    }

    e.stopPropagation()
}
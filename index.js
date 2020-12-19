const formulario = document.querySelector('#formulario')
const listaTares = document.querySelector('#lista-tareas')
const template = document.querySelector('#template').content
const fragment = document.createDocumentFragment()

let tareas = {

}

// console.log(Date.now())

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
    Object.values(tareas).forEach(t => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = t.texto
        fragment.appendChild(clone)
    })
    listaTares.appendChild(fragment)
}
 

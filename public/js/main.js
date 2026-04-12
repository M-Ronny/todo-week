const todoComplete = document.querySelectorAll('.not')
const deleteBtn = document.querySelectorAll('.delete')
const todoIncomplete = document.querySelectorAll('.complete')

Array.from(todoComplete).forEach(element => {
    element.addEventListener('click', complete)
})

Array.from(deleteBtn).forEach(element => {
    element.addEventListener('click', deleteTodo)
}) 

Array.from(todoIncomplete).forEach(element => {
    element.addEventListener('click', incomplete)
})

async function complete() {
    const id = this.dataset.id

    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'idFromJS': id
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function deleteTodo() {
    const id = this.dataset.id

    try {
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'idFromJS': id
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function incomplete() {
    const id = this.dataset.id

    try {
        const response = await fetch('incompleteTodo', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'idFromJS': id
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}
const todoComplete = document.querySelectorAll('.todo')
const deleteBtn = document.querySelectorAll('.delete')

Array.from(todoComplete).forEach(element => {
    element.addEventListener('click', complete)
})

Array.from(deleteBtn).forEach(element => {
    element.addEventListener('click', deleteTodo)
}) 

async function complete() {
    const item = this.textContent
    const day = this.classList[1]
    // const id = this.dataset.id

    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': item,
                'dayFromJS': day
                // 'idFromJS': id
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
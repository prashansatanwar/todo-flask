import axios from 'axios' 


// const  URL = process.env.REACT_APP_API_URL
const  URL = "http://127.0.0.1:5000/api"

export function getAllTodos() {
    return axios
            .get(URL+"/todos")
            .then((res) => res.data)
            .catch((err) => console.log(err));
}

export function getTodoById(todoId) {
    return axios
            .get(URL+"/todos"+todoId)
            .then((res) => res.data)
            .catch((err) => console.log(err));
}

export function addNewTodo(data){
    var config = {
        method: 'POST',
        url: URL+'/addTodo',
        headers: {
            'Content-Type': 'application/json'
        },
        data:data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error)
        }) 
}

export function updateTodo(todoId, updates) {
    var config = {
        method: 'patch',
        url:URL+'/todos/'+todoId,
        headers: {
            'Content-Type': 'application/json'
        },
        data: updates
    };

    return axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
            })
}

export function deleteTodo(todoId) {
    var config = {
        method: 'delete',
        url: URL + '/todos',
        headers: {
            'Content-Type':'application/json'
        }
    };

    return axios(config) 
            .then(function (response) {
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
            })
}
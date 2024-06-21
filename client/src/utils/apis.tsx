import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

//auth apis
const signInApi = async (username:string, email:string, password:string) => {
  const res = await api.post("/signin",  {
    username,
    email,
    password,
  })
  if (res.status === 200) {
    console.log("signin success")
    return true
  }
  console.log("signin error")
  return false
}

const getUserApi = async () => {
  const res = await api.get("/user")
  const data = res.data
  return data
}
    
const SignUpApi = async (username:string, email:string, password:string) => {
  const res = await api.post("/signup",  {
    username,
    email,
    password,
  })
  const data = res.data
  return data
}

const LogoutApi = async () => {
  const res = await api.post("/logout")
  const data = res.data
  return data
}   

//todos apis

const getTodosApi = async () => {
  const res = await api.get("/todos")
  const data = res.data
  return data
}

const addTodoApi = async (id:string, title:string, status:string) => {
  const res = await api.post(`/todos/${id}`,  {
    title,
    status,
  })
  const data = res.data
  return data
}

const updateTodoApi = async (id:string, title:string, status:string) => {
  const res = await api.patch(`/todos/${id}`,  {
    id,
    title,
    status,
  })
  const data = res.data
  return data
}

const deleteTodoApi = async (id:string) => {
  const res = await api.delete(`/todos/${id}`)
  const data = res.data
  return data
}

export {
    signInApi,
    SignUpApi,
    LogoutApi,
    getTodosApi,
    addTodoApi,
    updateTodoApi,
    deleteTodoApi,
}
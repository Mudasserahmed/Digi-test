/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import { Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { get, post, put, remove } from "../../utils/crudApis";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, setTodos, updateTodo } from "@/redux/features/todoSlice";

const Main = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const allTodos = useSelector((state:any) => state?.todo?.todos)
  
  const userDataCookie = Cookies?.get("userData"); 
  if (userDataCookie) {
    const decodedString = decodeURIComponent(userDataCookie);
    var userData = JSON.parse(decodedString);
  }

  const [loading, setLoading] = useState(true);
  const [todoValue, setTodoValue] = useState("")
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editedTodo, setEditedTodo] = useState('');
  useEffect(() => {
    getAllTodos()
    // Redirect to login page if user is not authenticated
    if (!userDataCookie) {
      router.push('/auth/login');
    } else {
      setLoading(false); // Set loading to false when authentication check is complete
    }
  }, [])
  const getAllTodos = async () => {
    try {
      let res = await get("https://dummyjson.com/todos")
      if (res) {
        dispatch(setTodos(res?.todos));
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Render nothing if loading is true
  if (loading) {
    return null;
  }
  const handleLogout = () => {
    Cookies.remove("userData")
    router.reload()
  }
  const handleTodoChange = (e: any) => {
    setTodoValue(e.target.value)
  }
  //handle delete todo 
  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await remove(`https://dummyjson.com/todos/${id}`)
      if (response) {
        console.log(response)
        dispatch(deleteTodo(response))
      }
    } catch (error) {
      console.log(error)
    }
  }
  //handle add Todo
  const handleAddTodo = async () => {
    const payload = {
      todo: todoValue,
      completed: false,
      userId: userData?.id,
    }
    try {
      const response = await post("https://dummyjson.com/todos/add", payload)
      if (response) {
        console.log(response)
        dispatch(addTodo(response))
        setTodoValue("")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
 
  const handleEditTodo = (todoId: number, todo: string) => {
    setEditTodoId(todoId);
    setEditedTodo(todo);
  };
  //handle edit todo
  const handleFinishEdit = async (todoId: number) => {
    const payload = {
      completed:false,
      todo:editedTodo
    }
    try {
      const response = await put(`https://dummyjson.com/todos/${todoId}`,payload)
      if(response){
        console.log(response)
        dispatch(updateTodo(response))
      }
    } catch (error) {
      console.log(error)
    }
    setEditTodoId(null);
    setEditedTodo('');
  };
  return (
    <>
      <Typography variant="h5">Signed in With: {userData?.username}</Typography>
      <Button onClick={() => handleLogout()} variant="contained">Logout</Button>
      <Box
        display="flex"
        justifyContent="center"
        // alignItems="center"
        minHeight="100vh"
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h2">To-Do-App</Typography>
          <Box sx={{ display: "flex", gap: "3px", alignItems: "center" }}>
            <TextField
              name="todo"
              value={todoValue}
              onChange={(e) => handleTodoChange(e)}
              label="todo"
              variant="outlined"
              fullWidth
              margin="normal"
              type="todo"
            />
            <Button onClick={handleAddTodo} sx={{ width: "130px", height: "50px" }} variant="outlined">Add Todo</Button>
          </Box>
          <ul style={{ listStyle: "none", height: "500px", overflowY: "scroll" }}>
          {allTodos.slice().reverse().map((value, index) => (
        <li key={index}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Adjusted to evenly distribute items
            width: '100%', // Ensures the box takes full width
            maxWidth: '400px', // Adjust as needed for your design
            margin: '0 auto', // Centers the box horizontally
            padding: '8px', // Add padding for spacing
          }}
        >
          {editTodoId === value.id ? (
            <TextField
              value={editedTodo}
              onChange={(e) => setEditedTodo(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              type="todo"
              onBlur={() => handleFinishEdit(value.id)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleFinishEdit(value.id);
                }
              }}
              autoFocus
            />
          ) : (
            <Typography>{value.todo}</Typography>
          )}
          <div>
            <IconButton onClick={() => handleDeleteTodo(value.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEditTodo(value.id, value.todo)}>
              <EditIcon />
            </IconButton>
          </div>
        </Box>
      </li>
      
      ))}

          </ul>

        </Container>
      </Box>
    </>
  );
};

export default Main;

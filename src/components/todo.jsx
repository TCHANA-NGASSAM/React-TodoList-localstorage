import { useState, useEffect } from 'react';
import '../style/todo.css'
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [inputDate, setInputDate]= useState("")
  const [currentIndex, setCurrentindex] = useState(0)
 // const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log(JSON.parse(storedTasks))
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setFilteredTasks(JSON.parse(storedTasks))
    }
    console.log(filteredTasks)
  }, []);


  const addTask = () => {
    if (inputTodo.newTask !== '' && inputTodo.description !== '' && inputTodo.dueDate !== '') {

      setTasks([...tasks, inputTodo]);
      setFilteredTasks([...tasks, inputTodo])
      setinputTodo({description: '', dueDate: '', taskName:''});

      // Sauvegarde des tâches dans le localStorage
      localStorage.setItem('tasks', JSON.stringify([...tasks, inputTodo]));
    }
  };

  const deleteTask = index => {
    tasks.splice(index, 1)
    setTasks(tasks);
    setFilteredTasks(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };


  const handleInputChange = (e) => {
    let array = tasks.filter(todo => todo.description.includes(e.target.value))
    setFilteredTasks(array)
  }
  const handleDateChange = () => {
    let datefilter = tasks.filter(todo => todo.dueDate.includes(inputDate))
    setFilteredTasks(datefilter)
  }
  //const [inputTodo, setinputTodo] = useState("")
  const [inputTodo, setinputTodo] = useState ({
    taskName:"",
    description: "",
    dueDate: ""
}) 

const fillFormUpdate = (index) => {
  setinputTodo(filteredTasks[index])
  setCurrentindex(index)
  setnewUpdate(true)
}

 const [newUpdate,setnewUpdate] = useState(false)

 const updateTodo = (todo) => {
    let array = tasks
    array[currentIndex] = todo

    setTasks(array)
    setFilteredTasks(array)

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    setinputTodo({description: '', dueDate: '', taskName:''});
    setnewUpdate(false)
 }
  // const datefilter   = tasks.filter((tasks) => {
  //   if (filterDate === "") {
  //     return true; // Afficher toutes les tâches si aucun filtre n'est appliqué
  //   } else {
  //     return tasks.date === filterDate; // Afficher uniquement les tâches avec la même date que le filtre
  //   }
  // })
  
  return (
    <div className='container'>
      <h1 className='title'>React To-Do List</h1>

      <div>
      <input className='input'
          type="text"
          value={inputTodo.description}
          placeholder="Tâche"
          onChange={e => setinputTodo({...inputTodo, description:e.target.value} )}
        /> <br />
        <input className='input'
          type="text"
          value={inputTodo.taskName}
          placeholder=" Description"
          onChange={e => setinputTodo({...inputTodo, taskName:e.target.value} )}
        /> <br />
       
        <input className='input'
          type="date"
          value={inputTodo.dueDate}
          onChange={e => setinputTodo({...inputTodo, dueDate:e.target.value} )}
        /> <br />
        {
          newUpdate ? (
            <button  className='btn-ad' onClick={()=>{updateTodo(inputTodo)}}>MODIFIER VOTRE TACHE</button>
          ) : (
            <button  className='btn-add' onClick={addTask}>AJOUTER VOTRE TACHE</button>
          )
        }
        
      
        <input type="date" 
        className='inputDateFilter'
        value={inputDate}
        onChange={(e)=>setInputDate(e.target.value)}
        />
        <button className='btn-date' onClick={handleDateChange}>filtre par date</button>
      </div>

      <div>
        <input className='input'
          type="text"
          placeholder="Recherche"
          onChange={handleInputChange}
        />
      </div>

      <ul className='list'>
        {filteredTasks.map((task, index) => (
          <li className='li' key={task.id}> 
            <div className='flex'>
              <strong> {task.description}</strong>/{task.taskName}/{task.dueDate}
              <button className='btn-sup' onClick={() => deleteTask(index)}>Supprimer</button>
              <button className='btn-modif' onClick={()=>{fillFormUpdate(index)}} > modifier</button>
            </div>
          <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter(task =>
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [tasks, searchTerm]);

  const addTask = () => {
    if (newTask !== '' && description !== '' && dueDate !== '') {
      const task = {
        id: Date.now(),
        taskName: newTask,
        description: description,
        dueDate: dueDate
      };

      setTasks([...tasks, task]);
      setNewTask('');
      setDescription('');
      setDueDate('');

      // Sauvegarde des tâches dans le localStorage
      localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
    }
  };

  const deleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);

    // Sauvegarde des tâches dans le localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <h1>To-Do List</h1>

      <div>
      <input
          type="text"
          value={description}
          placeholder="Tâche"
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="text"
          value={newTask}
          placeholder=" Description"
          onChange={e => setNewTask(e.target.value)}
        />
       
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Recherche"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <div>
              <strong> {task.description}</strong> - {task.taskName} - {task.dueDate}
            </div>
            <div>
              <button onClick={() => deleteTask(task.id)}>Supprimer</button>
              {/* Ajoutez le code ici pour la modification de la tâche */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

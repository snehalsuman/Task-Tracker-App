import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaRegCheckSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Tasks = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [newTask, setTask] = useState('');
    const [newDesc, setDesc] = useState('');
    const [alltasks, setAlltasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const handleAdd = () => {
        let newlist = {
            id: Date.now(),
            Taskitem: newTask,
            Desc: newDesc,
            Date: startDate,
            Time: startTime,
            Completed: false
        };
        setAlltasks([...alltasks, newlist]);
        setTask('');
        setDesc('');
    };

    const handleEdit = (index) => {
        const taskToEdit = alltasks[index];
        setTask(taskToEdit.Taskitem);
        setDesc(taskToEdit.Desc);
        setStartDate(taskToEdit.Date);
        setStartTime(taskToEdit.Time);
        setEditIndex(index);
    };

    const handleUpdate = () => {
        let updatedTask = {
            Taskitem: newTask,
            Desc: newDesc,
            Date: startDate,
            Time: startTime,
            Completed: alltasks[editIndex].Completed
        };
        const updatedTasks = alltasks.map((task, index) => index === editIndex ? updatedTask : task);
        setAlltasks(updatedTasks);
        setTask('');
        setDesc('');
        setEditIndex(null);
    };

    const handleDelete = (idToDelete) => {
        setAlltasks(alltasks.filter(task => task.id !== idToDelete));
    };

    const handleToggleComplete = (id) => {
        setAlltasks(alltasks.map(task => task.id === id ? { ...task, Completed: !task.Completed } : task));
    };

    return (
        <div className="p-6 h-screen bg-slate-900 flex flex-col overflow-hidden">
            <div className="mx-auto w-full max-w-4xl text-white bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className='flex flex-col md:flex-row gap-4 items-center'>
                    <input
                        type="text"
                        className='border border-gray-300 px-4 py-2 w-full rounded-lg bg-transparent'
                        placeholder='Write Task'
                        value={newTask}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <input
                        type='text'
                        className='border border-gray-300 px-4 py-2 w-full rounded-lg bg-transparent'
                        placeholder='Description'
                        value={newDesc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className='flex flex-col md:flex-row gap-4 mt-4 items-center'>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className='bg-transparent text-white cursor-pointer border border-white rounded-lg p-2 w-full'
                        dateFormat="yyyy/MM/dd"
                    />
                    <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className='bg-transparent text-white cursor-pointer border border-white rounded-lg p-2 w-full'
                    />
                </div>
                {editIndex !== null ? (
                    <button className='mt-4 w-full bg-gray-300 text-black font-bold py-2 rounded-lg hover:bg-black hover:text-white transition duration-300' onClick={handleUpdate}>Update Task</button>
                ) : (
                    <button className='mt-4 w-full bg-gray-300 text-black font-bold py-2 rounded-lg hover:bg-black hover:text-white transition duration-300' onClick={handleAdd}>Add Task</button>
                )}
            </div>
            <div className='flex gap-4 justify-center mt-6'>
                <button className='bg-gray-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-white transition duration-300' onClick={() => setIsCompleteScreen(false)}>Tasks Remaining</button>
                <button className='bg-gray-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-black hover:text-white transition duration-300' onClick={() => setIsCompleteScreen(true)}>Completed</button>
            </div>
            <div className="mx-auto w-full max-w-4xl bg-gray-800 p-6 mt-4 rounded-lg shadow-lg h-96 overflow-y-auto">
                {alltasks.filter(task => task.Completed === isCompleteScreen).map((task, index) => (
                    <div key={task.id} className={`bg-gray-300 p-4 rounded-lg mb-4 flex flex-col md:flex-row justify-between items-center shadow-md ${task.Completed ? 'opacity-50 line-through' : ''}`}>
                        <div className='w-full text-center md:text-left md:w-1/3'><h3 className='text-xl font-bold'>{task.Taskitem}</h3></div>
                        <div className='w-full text-center md:text-left md:w-1/3'><p>{task.Desc}</p></div>
                        <div className='w-full text-center md:text-left md:w-1/6'><p>{task.Date.toLocaleDateString()}</p></div>
                        <div className='w-full text-center md:text-left md:w-1/6'><p>{task.Time.toLocaleTimeString()}</p></div>
                        <div className='flex gap-2 mt-2 md:mt-0'>
                            <button className='p-2 bg-gray-700 text-white rounded-lg hover:bg-black' onClick={() => handleEdit(index)}><FaEdit /></button>
                            <button className='p-2 bg-green-500 text-white rounded-lg hover:bg-green-700' onClick={() => handleToggleComplete(task.id)}><FaRegCheckSquare /></button>
                            <button className='p-2 bg-red-500 text-white rounded-lg hover:bg-red-700' onClick={() => handleDelete(task.id)}><MdDelete /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;

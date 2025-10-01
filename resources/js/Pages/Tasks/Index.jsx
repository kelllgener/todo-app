import React from "react";
import { useForm, router } from "@inertiajs/react";

export default function Index({ tasks }) {
    const form = useForm({ title: "" });

    const addTask = (e) => {
        e.preventDefault();
        form.post("/tasks", {
            onSuccess: () => form.reset(),
        });
    };

    const toggleDone = (task) => {
        router.put(`/tasks/${task.id}`, { is_done: !task.is_done });
    };

    const deleteTask = (task) => {
        router.delete(`/tasks/${task.id}`);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

            {/* Add Task */}
            <form onSubmit={addTask} className="flex mb-4">
                <input
                    type="text"
                    placeholder="New task..."
                    className="border p-2 flex-1"
                    value={form.data.title}
                    onChange={(e) => form.setData("title", e.target.value)}
                />
                <button
                    type="submit"
                    className="ml-2 bg-teal-800 text-white px-4 py-2"
                >
                    Add
                </button>
            </form>

            {/* Task List */}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={task.is_done}
                            onChange={() => toggleDone(task)}
                            className="mr-2 h-4 w-4"
                        />
                        <span className={task.is_done ? "line-through" : ""}>
                            {task.title}
                        </span>
                        <button
                            onClick={() => deleteTask(task)}
                            className="ml-auto text-red-500 cursor-pointer"
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

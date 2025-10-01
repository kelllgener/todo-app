import React, { use } from 'react'
import { useForm, router } from '@inertiajs/react';

const Index = ( {tasks} ) => {
    const form = useForm({'title': ''});

    const addTasks = (e) => {
        e.preventDefault();
        form.post('/tasks', {
            onSuccess: () => form.reset('title')
        });
    }

    const toggleDone = (task) => {
        router.put(`/tasks/${task.id}`, {is_done: !task.is_done})
    }

    const deleteTask = (task) => {
        router.delete(`/tasks/${task.id}`)
    }

  return (
    <div>Index</div>
  )
}

export default Index
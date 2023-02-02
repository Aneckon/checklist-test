import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addTasks } from '../../redux/slice/tasks';
import { useAppDispatch } from '../../redux/hooks';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';

type Inputs = {
  yourTaskName: string;
};

export const Header = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [addTask, setAddTask] = useState<string>('');

  const dispatch = useAppDispatch();

  const submitAddTask: SubmitHandler<Inputs> = (data) => {
    const name = data.yourTaskName;
    if (addTask.length >= 2) {
      dispatch(addTasks({ name: name, checked: false, id: uuid() }));
      setAddTask('');
      toast.success('Task name successfully added', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className="header">
      <form onSubmit={handleSubmit(submitAddTask)}>
        <TextField
          fullWidth
          variant="standard"
          label="Your task name"
          {...register('yourTaskName', { required: true })}
          value={addTask}
          error={errors.yourTaskName || (addTask && addTask.length < 2) ? true : false}
          helperText={
            errors.yourTaskName || (addTask && addTask.length < 2) ? 'At least 2 characters' : ''
          }
          onChange={(e) => setAddTask(e.target.value)}
        />
        <Button type="submit" variant="outlined">
          Add task
        </Button>
      </form>
    </div>
  );
};

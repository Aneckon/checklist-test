import React, { FC, useState } from 'react';
import { Button, ButtonGroup, Checkbox, Modal } from '@mui/material';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addCheckedTasks,
  addDoneTasks,
  deleteDoneTasks,
  deleteTasks,
} from '../../redux/slice/tasks';
import { toast } from 'react-toastify';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface ItemProps {
  name: string;
  checked: boolean;
  id: number;
}

export const Item: FC<ItemProps> = ({ name, checked, id }) => {
  const [open, setOpen] = useState(false);
  const tasksDoneList = useAppSelector((state) => state.tasksSlice.tasksDoneList);
  const tasksDoneListChecked = tasksDoneList.some((item) => item.id === id);

  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    handleOpen();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeCheck = () => {
    if (tasksDoneListChecked) {
      dispatch(deleteDoneTasks(id));
      dispatch(addCheckedTasks({ id, checked: !checked }));
    } else {
      dispatch(addDoneTasks({ id, checked: !checked, name }));
      dispatch(addCheckedTasks({ id, checked: !checked }));
    }
  };

  return (
    <div className="tasks__item">
      <div>
        <Checkbox
          {...label}
          sx={{
            color: red[800],
            '&.Mui-checked': {
              color: red[600],
            },
          }}
          onChange={() => handleChangeCheck()}
        />
        <span>{name}</span>
      </div>
      <DeleteIcon onClick={handleDeleteTask} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="modal__body">
          <h4>Are you sure you want to delete it?</h4>
          <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
            <Button
              onClick={() => {
                dispatch(deleteTasks(id));
                toast.success('Delete tasks', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                });
              }}>
              Yes
            </Button>
            <Button onClick={() => handleClose()}>No</Button>
          </ButtonGroup>
        </div>
      </Modal>
    </div>
  );
};

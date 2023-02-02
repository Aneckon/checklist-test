import React, { useState } from 'react';
import { Button, ButtonGroup, TextField } from '@mui/material';
import { Item } from './item';
import { useAppSelector } from '../../redux/hooks';

export const Tasks = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const tasksList = useAppSelector((state) => state.tasksSlice.tasksList);
  const tasksDoneList = useAppSelector((state) => state.tasksSlice.tasksDoneList);

  return (
    <div className="tasks">
      <TextField
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        fullWidth
        id="filled-basic"
        label="Search"
        variant="filled"
      />
      <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
        <Button onClick={() => setFilter('All')}>All</Button>
        <Button onClick={() => setFilter('Done')}>Done</Button>
      </ButtonGroup>
      <div className="tasks__content">
        {filter === 'All' ? (
          tasksList.length ? (
            tasksList
              .reduce((prev: any, acc: any) => (acc.checked ? [...prev, acc] : [acc, ...prev]), [])
              .filter((item: { name: string }) => {
                const name = item.name.toLocaleLowerCase();
                return (
                  name.includes(search.toLocaleUpperCase()) ||
                  name.includes(search.toLocaleLowerCase())
                );
              })
              .map((item: { name: string; checked: boolean; id: number }) => (
                <Item key={item.id} id={item.id} name={item.name} checked={item.checked} />
              ))
          ) : (
            <div className="empty">Пусто</div>
          )
        ) : tasksDoneList.length ? (
          tasksDoneList
            .filter((item) => {
              const name = item.name.toLocaleLowerCase();
              return (
                name.includes(search.toLocaleUpperCase()) ||
                name.includes(search.toLocaleLowerCase())
              );
            })
            .map((item: { name: string; checked: boolean; id: number }) => (
              <Item key={item.id} id={item.id} name={item.name} checked={item.checked} />
            ))
        ) : (
          <div className="empty">Пусто</div>
        )}
      </div>
    </div>
  );
};

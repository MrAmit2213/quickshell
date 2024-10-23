import React, { useEffect, useState } from 'react'
import Row from "../row/Row";
import backlog from '../../icons/Backlog.svg'
import todo from '../../icons/To-do.svg'
import prog from '../../icons/in-progress.svg'
import done from '../../icons/Done.svg'
import cancel from '../../icons/Cancelled.svg'
import styles from './body.module.css'

const Body = () => {
  const [data, setData] = useState([]);
  const [todoData, setTodoData] = useState([]);
  const [backlogData, setBacklogData] = useState([]);
  const [progData, setProgData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [cancelData, setCancelData] = useState([]);
  const [grp, setGrp] = useState('');
  const [odr, setOdr] = useState('');

  const fetchFil = ()=>{
    const data = localStorage.getItem('UserChoise');
    if (data) {
      const parsedData = JSON.parse(data);
      setGrp(parsedData.grp || 'status'); 
      setOdr(parsedData.odr || 'priority'); 
    }
  }
  
  useEffect(() => {
    fetchFil();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();

        const sortBy = (a, b) => a.title.localeCompare(b.title);
        const sortByPriority = (a, b) => a.priority - b.priority;

        setTodoData(result?.tickets?.filter(item => item.status === "Todo").sort(sortBy));
        setBacklogData(result?.tickets?.filter(item => item.status === "Backlog").sort(sortBy));
        setProgData(result?.tickets?.filter(item => item.status === "In progress").sort(sortBy));
        setDoneData(result?.tickets?.filter(item => item.status === "Done").sort(sortBy));
        setCancelData(result?.tickets?.filter(item => item.status === "Canceled").sort(sortBy));
        setData(result);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.body}>
      <Row title='Backlog' icon={backlog} count={backlogData.length} data={backlogData} users={data.users} />
      <Row title='To-do' icon={todo} count={todoData.length} data={todoData} users={data.users} />
      <Row title='In Progress' icon={prog} count={progData.length} data={progData} users={data.users} />
      <Row title='Done' icon={done} count={doneData.length} data={doneData} users={data.users} />
      <Row title='Canceled' icon={cancel} count={cancelData.length} data={cancelData} users={data.users} />
    </div>
  )
}

export default Body

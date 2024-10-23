import React, { useEffect, useState } from 'react'
import Navbar from "../navbar/Navbar";
import Row from "../row/Row";
import backlog from '../../icons/Backlog.svg'
import todo from '../../icons/To-do.svg'
import prog from '../../icons/in-progress.svg'
import done from '../../icons/Done.svg'
import cancel from '../../icons/Cancelled.svg'
import styles from './body.module.css'
import prof from '../../icons/defaultUser.png'
import nopri from '../../icons/No-priority.svg'
import lowpri from '../../icons/Img - Low Priority.svg'
import highpri from '../../icons/Img - High Priority.svg'
import midpri from '../../icons/Img - Medium Priority.svg'
import urg from '../../icons/SVG - Urgent Priority colour.svg'

const Body = () => {
  const [data, setData] = useState([]);
  const [todoData, setTodoData] = useState([]);
  const [backlogData, setBacklogData] = useState([]);
  const [progData, setProgData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [cancelData, setCancelData] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [grp, setGrp] = useState('');
  const [odr, setOdr] = useState('');

  const fetchFil = () => {
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

        const sortBy = (a, b) => {
          if (odr === 'title') {
            return a.title.localeCompare(b.title);
          }
          else {
            return a.priority - b.priority;
          }
        }
        
        setTicket(result?.tickets?.sort(sortBy))
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
  }, [odr]);

  return (
    <div>
      <Navbar onGrp={setGrp} onOdr={setOdr} />
      <div className={styles.body}>
      {grp === 'status' && (
        <>
          <Row title='Backlog' icon={backlog} count={backlogData.length} data={backlogData} users={data.users} type='status' />
          <Row title='To-do' icon={todo} count={todoData.length} data={todoData} users={data.users} type='status' />
          <Row title='In Progress' icon={prog} count={progData.length} data={progData} users={data.users} type='status' />
          <Row title='Done' icon={done} count={doneData.length} data={doneData} users={data.users} type='status' />
          <Row title='Canceled' icon={cancel} count={cancelData.length} data={cancelData} users={data.users} type='status' />
        </>
      )}
      {grp === 'user' && (
        <>
          {data.users?.map((item, index) => (
            <div key={index}>
              <Row title={item.name} icon={prof} count={ticket?.filter(d => d.userId === item.id).length} data={ticket?.filter(d => d.userId === item.id)} users={data.users} type='user' avl={item.available} />
            </div>
          ))}
        </>
      )}
      {grp === 'priority' && (
        <>
          <Row title='No priority' icon={nopri} count={ticket?.filter(d => d.priority === 0).length} data={ticket?.filter(d => d.priority === 0)} users={data.users} type='pri' />
          <Row title='Low' icon={lowpri} count={ticket?.filter(d => d.priority === 1).length} data={ticket?.filter(d => d.priority === 1)} users={data.users} type='pri' />
          <Row title='Medium' icon={midpri} count={ticket?.filter(d => d.priority === 2).length} data={ticket?.filter(d => d.priority === 2)} users={data.users} type='pri' />
          <Row title='High' icon={highpri} count={ticket?.filter(d => d.priority === 3).length} data={ticket?.filter(d => d.priority === 3)} users={data.users} type='pri' />
          <Row title='Urgent' icon={urg} count={ticket?.filter(d => d.priority === 4).length} data={ticket?.filter(d => d.priority === 4)} users={data.users} type='pri' />
        </>
      )}
    </div>
    </div>
    
  )
}

export default Body

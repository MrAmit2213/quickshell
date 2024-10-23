import React from 'react'
import styles from './card.module.css'
import user from '../../icons/defaultUser.png'
import noPri from '../../icons/No-priority.svg'
import urgent from '../../icons/SVG - Urgent Priority grey.svg'
import high from '../../icons/Img - High Priority.svg'
import medium from '../../icons/Img - Medium Priority.svg'
import low from '../../icons/Img - Low Priority.svg'
import bklg from '../../icons/Backlog.svg'
import todo from '../../icons/To-do.svg'
import prog from '../../icons/in-progress.svg'
import done from '../../icons/Done.svg'
import can from '../../icons/Cancelled.svg'

const Card = (props) => {
  const pri = props.data.priority;
  const stat = props.data.status;
  var priImg;
  var stImg;
  switch (pri) {
    case 0:
      priImg = noPri
      break;
    case 1:
      priImg = low
      break;
    case 2:
      priImg = medium
      break;
    case 3:
      priImg = high
      break;
    case 4:
      priImg = urgent
      break;
    default:
      console.log('error');
  }
  switch (stat) {
    case 'Todo':
      stImg=todo
      break;
    case 'In progress':
      stImg=prog
      break;
    case 'Backlog':
      stImg=bklg
      break;
    case 'Done':
      stImg=done
      break;
    case 'Canceled':
      stImg=can
      break;
    default:
      console.log('error');
  }

  const foundUser = props.users ? props.users.find(user => user.id === props.data.userId) : null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>{props.data.id}</p>
        {props.type !== 'user' && <div>
          <img src={user} alt="user" />
          <div className={`${styles.available} ${foundUser.available ? styles.active : ''}`}></div>
        </div>}
      </div>
      <div className={styles.titl}>
        {props.type !== 'status' && <img src={stImg} alt="usr" />}
        <p className={styles.title}>{props.data.title.length > 40 ? props.data.title.substring(0, 40) + "..." : props.data.title}</p>
      </div>
      <div className={styles.footer}>
        <div>
          <img src={priImg} alt='Priority' />
        </div>
        <div className={styles.subFoot}>
          <div className={styles.dot}></div>
          <p>Featured Request</p>
        </div>
      </div>
    </div>
  )
}

export default Card

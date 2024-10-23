import React from 'react'
import styles from './card.module.css'
import user from '../../icons/defaultUser.png'
import noPri from '../../icons/No-priority.svg'
import urgent from '../../icons/SVG - Urgent Priority grey.svg'
import high from '../../icons/Img - High Priority.svg'
import medium from '../../icons/Img - Medium Priority.svg'
import low from '../../icons/Img - Low Priority.svg'

const Card = (props) => {
  const pri = props.data.priority;
  var priImg;
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

  const foundUser = props.users ? props.users.find(user => user.id === props.data.userId) : null;
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>{props.data.id}</p>
        <div>
          <img src={user} alt="user" />
          <div className={`${styles.available} ${foundUser.available?styles.active:''}`}></div>
        </div>
      </div>
      <p className={styles.title}>{props.data.title.length > 40 ? props.data.title.substring(0, 40) + "..." : props.data.title}</p>
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

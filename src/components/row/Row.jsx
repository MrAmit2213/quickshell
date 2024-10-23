import React from 'react'
import plus from '../../icons/add.svg'
import dot from '../../icons/3 dot menu.svg'
import Card from '../card/Card'
import styles from './row.module.css'

const Row = (props) => {
    return (
        <div className={styles.row}>
            <div className={styles.head}>
                <div className={styles.subHead}>
                    <img src={props.icon} alt="backlog" />
                    <p>{props.title}</p>
                    <div>{props.count}</div>
                </div>
                <div>
                    <img src={plus} alt="add" />
                    <img src={dot} alt="menu" />
                </div>
            </div>
            {props.data.map((item, index) => (
                <div key={index}>
                    <Card data={item} users={props.users} />
                </div>
                ))}
        </div>
    )
}

export default Row

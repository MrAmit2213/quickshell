import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import filterSvg from '../../icons/Display.svg'
import downSvg from '../../icons/down.svg'

const Navbar = () => {
  const [display, setDisplay] = useState(false);
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

  const show = () => {
    display ? setDisplay(false) : setDisplay(true);
  }

  const storeData = () => {
    const dataToStore = { grp, odr };
    localStorage.setItem('UserChoise', JSON.stringify(dataToStore));
  };

  const changeGrp = (e)=>{
    setGrp(e.target.value)
    storeData();
  }
  
  const changeOdr = (e)=>{
    setOdr(e.target.value)
    storeData();
  }
  
  return (
    <div className={styles.navbar}>
      <div onClick={show} className={styles.filter}>
        <img src={filterSvg} alt="display.svg" />
        <p>Display</p>
        <img src={downSvg} alt="display.svg" />
      </div>
      <div className={`${styles.hoverBox} ${display ? styles.blk : ''} `}>
        <div className={styles.disp}>
          <div className={styles.align}>
            <p>Grouping</p>
            <select className={styles.select} value={grp} onChange={changeGrp} name="grouping" id="grouping" >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className={styles.align}>
            <p>Ordering</p>
            <select className={styles.select} value={odr} onChange={changeOdr} name="order" id="order" >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

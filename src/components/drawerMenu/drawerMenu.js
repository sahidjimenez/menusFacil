import React, { useState } from 'react'
import { Drawer, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classes from './drawerMenu.module.css'
const DrawerMenu = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };
  const activeStyle = {
    fontWeight: 'bold',
    color: 'red',
  };
  const list = () => (
    <div>
      <nav className='p-4 grid relative pr-0'>
        <NavLink to="/" className={({ isActive }) => (!isActive ? classes.normal : classes.active)}>
          <p className={classes.text}>Inicio</p></NavLink>
        {/* <NavLink to="/order" className={({ isActive }) => (!isActive ? classes.normal : classes.active)} >
          <p className={classes.text}>Ordenar</p> </NavLink>
        <NavLink to="/nosotros" className={({ isActive }) => (!isActive ? classes.normal : classes.active)} >
          <p className={classes.text}>Nosotros</p></NavLink>
        <NavLink to="/sucursales" className={({ isActive }) => (!isActive ? classes.normal : classes.active)}>
          <p className={classes.text}>Sucursales</p></NavLink>
        <NavLink to="/contactanos" className={({ isActive }) => (!isActive ? classes.normal : classes.active)}>
          <p className={classes.text}>Contactanos</p></NavLink> */}
        <NavLink to="/thepizzaspot" className={({ isActive }) => (!isActive ? classes.normal : classes.active)}>
          <p className={classes.text}>The Pizza Spot</p></NavLink>
      </nav>
      {/* <hr></hr> */}
    </div>
  );

  return (
    <>
      <Link className="navbar-burger self-center p-5 " onClick={toggleDrawer(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Link>
      <div className={classes.drawer}>
        <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)} PaperProps={{
          style: {
            height: '340px',
            width: '160px',
            overflow: 'auto',
            borderRadius: '0 0px 10px 0px',
            background: 'linear-gradient(90deg, hsla(86, 43%, 51%, 1) 0%, hsla(86, 82%, 33%, 1) 100%)',
            WebkitBackground: 'linear-gradient(90deg, hsla(86, 43%, 51%, 1) 0%, hsla(86, 82%, 33%, 1) 100%)'
          }

        }} >
          {list()}
        </Drawer>
      </div>

    </>
  );
}

export default DrawerMenu
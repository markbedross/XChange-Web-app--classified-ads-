import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';

function Layout(props) {
    return (
        <div style={{padding: 4, display: 'flex', flexDirection: 'column', minHeight: 500}}>
            <Header user={props.user} setUser={props.setUser}/>
            <Outlet />
        </div>
    );
}

export default Layout;
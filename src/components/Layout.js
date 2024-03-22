import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';

function Layout(props) {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

export default Layout;
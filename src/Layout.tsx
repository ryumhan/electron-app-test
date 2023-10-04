import { HashRouter, Routes, Route } from 'react-router-dom';
import ReadyPannel from './components/readyPannel';
import FailPannel from './components/resultPannel/failPannel';
import SuccessPannel from './components/resultPannel/successPannel';
import Inspection from './pages/inspection';
import Login from './pages/login';
import React from 'react';

function Layout() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" Component={Login} />
                <Route path="/ready" Component={ReadyPannel} />
                <Route path="/inspection" Component={Inspection} />
                <Route path="/success" Component={SuccessPannel} />
                <Route path="/fail" Component={FailPannel} />
            </Routes>
        </HashRouter>
    );
}

export default Layout;

import Inspection from './pages/inspection';
import utils from './utils';
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import Login from './pages/login';

function App() {
    const [login, setLogin] = useState(false);
    // Only Test mode, skip Login page for development
    useEffect(() => {
        ipcRenderer.send('create-module', {});
    }, []);

    if (login || utils.isTestMode()) {
        return <Inspection />;
    }

    return <Login loginCallback={() => setLogin(true)} />;
}

export default App;

import Login from '@/pages/login';
import Inspection from './pages/inspection';
import utils from './utils';
import { useEffect } from 'react';
import { ipcRenderer } from 'electron';

function App() {
    // Only Test mode, skip Login page for development
    useEffect(() => {
        ipcRenderer.send('create-module', {});
    }, []);

    if (utils.isTestMode()) {
        return <Inspection />;
    }

    return <Login />;
}

export default App;

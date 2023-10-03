import utils from './utils';
import { useState } from 'react';

import Login from './pages/login';
import ReadyPannel from './components/readyPannel';

function App() {
    const [login, setLogin] = useState(false);

    if (login || utils.isTestMode()) {
        return <ReadyPannel />;
    }

    return <Login loginCallback={() => setLogin(true)} />;
}

export default App;

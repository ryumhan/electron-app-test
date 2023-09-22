import Login from '@/pages/login';
import Inspection from './pages/inspection';
import utils from './utils';

function App() {
    // Only Test mode, skip Login page for development
    if (utils.isTestMode()) {
        return <Inspection />;
    }

    return <Login />;
}

export default App;

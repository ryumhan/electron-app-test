import { Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './styled/global';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
        <Global styles={GlobalStyle} />
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>,
);

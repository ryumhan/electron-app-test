import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import SpoqaHanSansNeoBoldTTF from '@/assets/fonts/SpoqaHanSansNeo-Bold.ttf';
import SpoqaHanSansNeoBoldWOFF from '@/assets/fonts/SpoqaHanSansNeo-Bold.woff';
import SpoqaHanSansNeoMediumTTF from '@/assets/fonts/SpoqaHanSansNeo-Medium.ttf';
import SpoqaHanSansNeoMediumWOFF from '@/assets/fonts/SpoqaHanSansNeo-Medium.woff';
import SpoqaHanSansNeoRegularTTF from '@/assets/fonts/SpoqaHanSansNeo-Regular.ttf';
import SpoqaHanSansNeoRegularWOFF from '@/assets/fonts/SpoqaHanSansNeo-Regular.woff';

// Font
const GlobalStyle = css`
    ${emotionReset}
    @font-face {
        font-family: SpoqaHanSansNeo;
        font-weight: normal;
        src:
            url(${SpoqaHanSansNeoRegularTTF}) format('truetype'),
            url(${SpoqaHanSansNeoRegularWOFF}) format('woff');
    }
    @font-face {
        font-family: SpoqaHanSansNeo;
        font-weight: 500;
        src:
            url(${SpoqaHanSansNeoMediumTTF}) format('truetype'),
            url(${SpoqaHanSansNeoMediumWOFF}) format('woff');
    }

    @font-face {
        font-family: SpoqaHanSansNeo;
        font-weight: bold;
        src:
            url(${SpoqaHanSansNeoBoldTTF}) format('truetype'),
            url(${SpoqaHanSansNeoBoldWOFF}) format('woff');
    }

    * {
        font-family: SpoqaHanSansNeo !important;
        box-sizing: border-box;
        /* background-color: #f0f0f0; */
    }

    html,
    body,
    #root {
        width: 100%;
        height: 100%;
    }

    iframe {
        display: inline-flex;
        width: 100%;
        height: 100%;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;

export default GlobalStyle;

declare module '*.svg' {
    import React = require('react');

    const src: string;

    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    export default src;
}

declare module '*.png';

declare module '*.ttf';
declare module '*.woff';

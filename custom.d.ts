declare module '*.svg' {
    import React = require('react');

    const src: string;

    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    export default src;
}

declare module '*.png';

declare module '*.ttf';
declare module '*.woff';

declare module '*.json' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any;
    export default value;
}

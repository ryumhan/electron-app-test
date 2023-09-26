const TEST_MODE = true;
const BASE_URI = '/api';
const API_PORT = 8000;
const PAGE_PORT = 9005;

const PASSWORD = 'NeuBoat23#DOCK!';

const SVM_STATE_INSPECTION_LIST = [
    {
        event: 'all-cameras-view',
        message: {
            type: 'multiple',
            data: {
                topdown: {
                    left: 0.004,
                    bottom: 0.004,
                    width: 0.492,
                    height: 0.992,
                    fullscreen: false,
                },
                front: {
                    left: 0.625,
                    bottom: 0.75,
                    width: 0.246,
                    height: 0.246,
                    fullscreen: false,
                },
                left: {
                    left: 0.5,
                    bottom: 0.254,
                    width: 0.246,
                    height: 0.246,
                    fullscreen: false,
                },
                right: {
                    left: 0.75,
                    bottom: 0.254,
                    width: 0.246,
                    height: 0.246,
                    fullscreen: false,
                },
                rear: {
                    left: 0.625,
                    bottom: 0.004,
                    width: 0.246,
                    height: 0.246,
                    fullscreen: false,
                },
                blindright: {
                    left: 0.75,
                    bottom: 0.504,
                    width: 0.246,
                    height: 0.246,
                    fullscreen: false,
                },
                blindleft: {
                    left: 0.5,
                    bottom: 0.504,
                    width: 0.246,
                    height: 0.246,
                    fullscreen: false,
                },
            },
        },
    },
    {
        event: 'starboard-docking-view',
        message: {
            type: 'multiple',
            data: {
                topdown: {
                    left: 0.004,
                    bottom: 0.004,
                    width: 0.492,
                    height: 0.992,
                    fullscreen: false,
                },
                front: {
                    left: 0.56,
                    bottom: 0.796,
                    width: 0.2,
                    height: 0.2,
                    fullscreen: false,
                },
                left: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
                    fullscreen: false,
                },
                right: {
                    left: 0.66,
                    bottom: 0.208,
                    width: 0.29,
                    height: 0.29,
                    fullscreen: false,
                },
                rear: {
                    left: 0.56,
                    bottom: 0.004,
                    width: 0.2,
                    height: 0.2,
                    fullscreen: false,
                },
                blindright: {
                    left: 0.66,
                    bottom: 0.502,
                    width: 0.29,
                    height: 0.29,
                    fullscreen: false,
                },
                blindleft: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
                    fullscreen: false,
                },
            },
        },
    },
    {
        event: 'starboard-docking-view',
        message: {
            type: 'multiple',
            data: {
                topdown: {
                    left: 0.004,
                    bottom: 0.004,
                    width: 0.492,
                    height: 0.992,
                    fullscreen: false,
                },
                front: {
                    left: 0.56,
                    bottom: 0.796,
                    width: 0.2,
                    height: 0.2,
                    fullscreen: false,
                },
                left: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
                    fullscreen: false,
                },
                right: {
                    left: 0.66,
                    bottom: 0.208,
                    width: 0.29,
                    height: 0.29,
                    fullscreen: false,
                },
                rear: {
                    left: 0.56,
                    bottom: 0.004,
                    width: 0.2,
                    height: 0.2,
                    fullscreen: false,
                },
                blindright: {
                    left: 0.66,
                    bottom: 0.502,
                    width: 0.29,
                    height: 0.29,
                    fullscreen: false,
                },
                blindleft: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
                    fullscreen: false,
                },
            },
        },
    },
    {
        event: 'bow-camera-view',
        message: {
            type: 'multiple',
            data: {
                topdown: {
                    left: 0.004,
                    bottom: 0.004,
                    width: 0.492,
                    height: 0.992,
                    fullscreen: false,
                },
                front: {
                    left: 0.5,
                    bottom: 0.252,
                    width: 0.496,
                    height: 0.496,
                    fullscreen: false,
                },
                left: {
                    left: 0,
                    bottom: 0,
                    width: 0,
                    height: 0,
                    fullscreen: false,
                },
                right: {
                    left: 0,
                    bottom: 0,
                    width: 0,
                    height: 0,
                    fullscreen: false,
                },
                rear: {
                    left: 0,
                    bottom: 0,
                    width: 0,
                    height: 0,
                    fullscreen: false,
                },
                blindright: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
                    fullscreen: false,
                },
                blindleft: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
                    fullscreen: false,
                },
            },
        },
    },
    {
        event: 'bow-distance-guide',
        message: {
            data: true,
        },
    },
    {
        event: 'night-mode',
        message: {
            data: true,
        },
    },
    {
        event: 'dark-mode',
        message: {
            data: true,
        },
    },
    {
        event: 'light-mode',
        message: {
            data: true,
        },
    },
];

const INSPECTION_STEP = [
    {
        name: 'SVMReady',
        step: 1,
        checkList: [
            'Camera Stream Check',
            'Zoom IN/OUT Available using Mouse/Touch',
            'Move Check using Mouse/Touch',
        ],
    },
    {
        name: 'CallSVM',
        step: SVM_STATE_INSPECTION_LIST.length,
        checkList: [
            'SVM View Check',
            'Camera Full Screen Available on Mutiple Camera Section',
            'SVM State change when Click Success ',
        ],
    },
    {
        name: 'Calibration',
        step: 1,
        checkList: [
            'Check Each Mode available in Stage Menu(Not Saved)',
            'Click and Check Boat ON/OFF',
            'Each tab Function check(Not Saved)',
            'Click Initialize button in Result Mode',
        ],
    },
];

export default {
    TEST_MODE,
    BASE_URI,
    API_PORT,
    PAGE_PORT,
    PASSWORD,
    SVM_STATE_INSPECTION_LIST,
    INSPECTION_STEP,
};

const TEST_MODE = false;
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
        array: [
            {
                event: 'bow-distance-guide',
                message: {
                    data: true,
                },
            },
            {
                event: 'stern-distance-guide',
                message: {
                    data: true,
                },
            },
            {
                event: 'port-distance-guide',
                message: {
                    data: true,
                },
            },
            {
                event: 'starboard-distance-guide',
                message: {
                    data: true,
                },
            },
        ],
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
        event: 'light-mode',
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
        event: 'night-mode',
        message: {
            data: true,
        },
    },
];

const BACKWARD_SVM_STATE_INSPECTION_LIST = [
    {
        event: 'top-down-view',
        message: {
            type: 'single',
            data: {
                topdown: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 1.0,
                    height: 1.0,
                    fullscreen: true,
                },
                front: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
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
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
                    fullscreen: false,
                },
                rear: {
                    left: 0.0,
                    bottom: 0.0,
                    width: 0.0,
                    height: 0.0,
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
        array: [
            {
                event: 'bow-distance-guide',
                message: {
                    data: false,
                },
            },
            {
                event: 'stern-distance-guide',
                message: {
                    data: false,
                },
            },
            {
                event: 'port-distance-guide',
                message: {
                    data: false,
                },
            },
            {
                event: 'starboard-distance-guide',
                message: {
                    data: false,
                },
            },
        ],
    },
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
    {
        event: 'dark-mode',
        message: {
            data: true,
        },
    },
];

const RESET_SVM_STATE_INSPECTION_LIST = [
    {
        event: 'bow-distance-guide',
        message: {
            data: true,
        },
    },
    {
        event: 'stern-distance-guide',
        message: {
            data: true,
        },
    },
    {
        event: 'port-distance-guide',
        message: {
            data: true,
        },
    },
    {
        event: 'starboard-distance-guide',
        message: {
            data: true,
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
        event: 'night-mode',
        message: {
            data: true,
        },
    },
];

const SVM_INSPECTION_STEP = [
    {
        name: '탑뷰 스트리밍 검사',
        key: 'SVMReady',

        checkList: [
            '카메라 스트리밍 확인',
            '줌인/줌아웃 기능 확인',
            '카메라이동 기능 확인',
        ],
    },
    {
        name: '탑뷰/개별뷰 스트리밍',
        key: 'CallSVM',

        checkList: [
            '카메라 스트리밍 확인',
            '개별 카메라뷰 전체화면 전환 기능확인',
        ],
    },
    {
        name: 'Distance Guide 모드',
        key: 'CallSVM',

        checkList: ['가이드 라인 표시 확인'],
    },
    {
        name: '도킹뷰 스트리밍',
        key: 'CallSVM',
        checkList: [
            '카메라 스트리밍 확인',
            '개별 카메라뷰 전체화면 전환 기능확인',
        ],
    },
    {
        name: '선수뷰 스트리밍',
        key: 'CallSVM',
        checkList: [
            '카메라 스트리밍 확인',
            '개별 카메라뷰 전체화면 전환 기능확인',
        ],
    },
    {
        name: 'Light theme 모드',
        key: 'CallSVM',

        checkList: ['배경테마 변경 확인'],
    },
    {
        name: 'Dark theme 모드',
        key: 'CallSVM',

        checkList: ['배경테마 변경 확인'],
    },
    {
        name: 'Night theme 모드',
        key: 'CallSVM',

        checkList: ['배경테마 변경 확인'],
    },
    {
        name: 'Calibration 모드',
        key: 'Calibration',

        checkList: [
            'Boat Configuration : 개별 동작 확인',
            'Single Camera : 개별 동작 확인',
            'Multi Camera : 개별 슬라이더 동작 확인',
            'Result Mode에서 Initialize 클릭',
        ],
    },
];

const COM_INSPECTION_STEP = [
    {
        name: '웹소켓 통신 체크',

        checkList: [
            '초당 데이터 정상 수신 확인',
            'HeartBeat 데이터 확인',
            '카메라 상태 데이터 확인',
        ],
    },
    {
        name: 'Http통신 체크',

        checkList: ['시리얼 넘버 확인'],
    },
];

const DEFAULT_HEARTBEAT_DATA = [
    {
        key: 'NotifyHeartBeat(CCU)',
        value: undefined,
    },
    {
        key: 'NotifyHeartBeat(ORU)',
        value: undefined,
    },
];

const DEFAULT_CAMERA_DATA = [
    {
        key: 'NotifyCameraStatus(CAM1)',
        value: undefined,
    },
    {
        key: 'NotifyCameraStatus(CAM2)',
        value: undefined,
    },

    {
        key: 'NotifyCameraStatus(CAM3)',
        value: undefined,
    },
    {
        key: 'NotifyCameraStatus(CAM4)',
        value: undefined,
    },
    {
        key: 'NotifyCameraStatus(CAM5)',
        value: undefined,
    },
    {
        key: 'NotifyCameraStatus(CAM6)',
        value: undefined,
    },
];

export default {
    TEST_MODE,
    DEFAULT_HEARTBEAT_DATA,
    DEFAULT_CAMERA_DATA,
    BASE_URI,
    BACKWARD_SVM_STATE_INSPECTION_LIST,
    API_PORT,
    PAGE_PORT,
    PASSWORD,
    SVM_STATE_INSPECTION_LIST,
    RESET_SVM_STATE_INSPECTION_LIST,
    SVM_INSPECTION_STEP,
    COM_INSPECTION_STEP,
};

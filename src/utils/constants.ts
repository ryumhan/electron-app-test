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

const SVM_INSPECTION_STEP = [
    {
        name: '탑다운 화면 스트리밍 검사',
        key: 'SVMReady',

        checkList: [
            '카메라 스트리밍 확인',
            '마우스/터치를 이용한 줌 인/아웃 정상동작 여부',
            '마우스/터치를 이용한 이동 정상동작 여부',
        ],
    },
    {
        name: '6 개별 카메라 스트리밍 검사',
        key: 'CallSVM',

        checkList: [
            '카메라 스트리밍 확인',
            '개별 화면 터치 후 전체화면 변경 정상동작 여부',
        ],
    },
    {
        name: '도킹 카메라 뷰 검사',
        key: 'CallSVM',

        checkList: [
            '카메라 스트리밍 확인',
            '개별 화면 터치 후 전체화면 변경 정상동작 여부',
        ],
    },
    {
        name: '보우 카메라 뷰 검사',
        key: 'CallSVM',

        checkList: [
            '카메라 스트리밍 확인',
            '개별 화면 터치 후 전체화면 변경 정상동작 여부',
        ],
    },
    {
        name: 'Distance Guide 모드',
        key: 'CallSVM',

        checkList: ['가이드 정상 표시 확인'],
    },
    {
        name: 'Night theme 모드',
        key: 'CallSVM',

        checkList: ['보트 / 테마 변경 확인'],
    },
    {
        name: 'Dark theme 모드',
        key: 'CallSVM',

        checkList: ['카메라 배경화면 테마 변경 확인'],
    },
    {
        name: 'Light theme 모드',
        key: 'CallSVM',

        checkList: ['카메라 배경화면 테마 변경 확인'],
    },
    {
        name: '캘리브레이션',
        key: 'Calibration',

        checkList: [
            '각 Stage 메뉴 선택 가능 여부 확인(저장X)',
            '보트 ON/OFF 클릭 확인',
            '개별 기능 체크(저장X)',
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
        key: 'NotifyHeartBeat (ccu)',
        value: undefined,
    },
    {
        key: 'NotifyHeartBeat (oru)',
        value: undefined,
    },
];

const DEFAULT_CAMERA_DATA = [
    {
        key: 'NotifyCameraStatus (cam1)',
        value: undefined,
    },
    {
        key: 'NotifyCameraStatus (cam2)',
        value: undefined,
    },

    {
        key: 'NotifyCameraStatus (cam3)',
        value: undefined,
    },
    {
        key: 'NotifyCameraStatus (cam4)',
        value: undefined,
    },
    {
        key: 'NotifyCameraStatus (cam5)',
        value: undefined,
    },
    {
        key: 'NotifyCameraStatus (cam6)',
        value: undefined,
    },
];

export default {
    TEST_MODE,
    DEFAULT_HEARTBEAT_DATA,
    DEFAULT_CAMERA_DATA,
    BASE_URI,
    API_PORT,
    PAGE_PORT,
    PASSWORD,
    SVM_STATE_INSPECTION_LIST,
    SVM_INSPECTION_STEP,
    COM_INSPECTION_STEP,
};

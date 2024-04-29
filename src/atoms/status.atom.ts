import { atom, selector } from 'recoil';

const oruIpAtom = atom<string>({
    key: 'oruIp',
    default: '',
});

const snAtom = atom<string>({
    key: 'sn',
    default: localStorage.getItem('sn') || '',
});

const swVersion = atom<string>({
    key: 'swVersion',
    default: '',
});

const passwordAtom = atom<string>({
    key: 'password',
    default: '',
});

const dateAtom = atom<string>({
    key: 'date',
    default: '',
});

interface FilePath {
    path: string;
    startDate: string;
}

const filePathAtom = atom<FilePath>({
    key: 'filePath',
    default: {
        path: localStorage.getItem('filePath') || '',
        startDate: '',
    },
});

const serialAtom = atom<{ ccu: string; customer: string }>({
    key: 'serialAtom',
    default: {
        ccu: '',
        customer: '',
    },
});

const filePathSelector = selector<string>({
    key: 'filePathSelector',
    get: ({ get }) => {
        const fileAtom = get(filePathAtom);
        return fileAtom.path;
    },
    set: ({ set, get }, newValue) => {
        const file = get(filePathAtom);
        const path = newValue as string;

        localStorage.setItem('filePath', path);

        set(filePathAtom, {
            path,
            startDate: file.startDate,
        });
    },
});

const startDateSelector = selector<string>({
    key: 'startDateSelector',
    get: ({ get }) => {
        const fileAtom = get(filePathAtom);
        return fileAtom.startDate;
    },
    set: ({ set, get }, newValue) => {
        const { path } = get(filePathAtom);
        set(filePathAtom, {
            path,
            startDate: newValue as string,
        });
    },
});

export default {
    dateAtom,
    filePathSelector,
    filePathAtom,
    oruIpAtom,
    passwordAtom,
    swVersion,
    snAtom,
    serialAtom,
    startDateSelector,
};

import { atom, selector } from 'recoil';

const oruIpAtom = atom<string>({
    key: 'oruIp',
    default: '',
});

const snAtom = atom<string>({
    key: 'sn',
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
        path: '',
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

        set(filePathAtom, {
            path: newValue as string,
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
    serialAtom,
    filePathSelector,
    oruIpAtom,
    snAtom,
    dateAtom,
    filePathAtom,
    startDateSelector,
};

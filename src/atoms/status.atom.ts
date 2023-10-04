import { atom } from 'recoil';

type Status = 'progressing' | 'complete' | 'failed';

const oruIpAtom = atom<string>({
    key: 'oruIp',
    default: '',
});

const statusAtom = atom<Status>({
    key: 'inspectionStatus',
    default: 'progressing',
});

export default { oruIpAtom, statusAtom };

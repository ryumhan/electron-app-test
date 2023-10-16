import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';
import * as fs from 'fs';
import * as Papa from 'papaparse';

const DEFULAT_HEDAER = [
    '검사결과',
    '모트렉스 SN',
    'ORU IP',
    '고객 SN',
    'avikus SN',
    '검사 시작',
    '검사 완료',
    '웹소켓 검사',
    'http 검사',
    '탑뷰 스트리밍 검사',
    '탑뷰/개별뷰 스트리밍',
    'Distance Guide 모드',
    '도킹뷰 스트리밍',
    '선수뷰 스트리밍',
    'Light theme 모드',
    'Dark theme 모드',
    'Night theme 모드',
    'Calibration 모드',
];

const useFileLogger = () => {
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);
    const filePath = useRecoilValue(statusAtom.filePathAtom);
    const statusSelector = useRecoilValue(inspectionAtom.statusSelector);
    const comReport = useRecoilValue(inspectionAtom.comReportAtom);
    const svmReport = useRecoilValue(inspectionAtom.svmReportAtom);

    const sn = useRecoilValue(statusAtom.snAtom);
    const { avikus, customer } = useRecoilValue(statusAtom.serialAtom);

    const createFileLogging = () => {
        const list = [
            comReport
                .filter(elem => elem.result === 'Failed')
                .map(elem => elem.name),
            svmReport
                .filter(elem => elem.result === 'Failed')
                .map(elem => elem.name),
        ];

        const result = statusSelector !== 'Pass' ? 'FAILED' : 'PASS';
        const date = dayjs().format('YYYY_MM_DD');
        const dateTime = dayjs().format('YYYY_MM_DD_HH:mm');
        // Write the data to the CSV file
        try {
            const newData = [
                `${result}(${list.join('/')})`,
                sn,
                oruIp,
                customer,
                avikus,
                filePath.startDate,
                dateTime,
                ...comReport.map(elem =>
                    elem.result === 'Progressing' ? 'N/A' : elem.result,
                ),
                ...svmReport.map(elem =>
                    elem.result === 'Progressing' ? 'N/A' : elem.result,
                ),
            ];

            const file = `${filePath.path}/${date}_${result}.csv`;

            let csv: string = '';
            if (fs.existsSync(file)) {
                const csvData = fs.readFileSync(file, 'utf8');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const parsed: any = Papa.parse(csvData, { header: false });
                csv = Papa.unparse([...parsed.data, newData], { header: true });
            } else {
                csv = Papa.unparse([DEFULAT_HEDAER, newData], {
                    header: true,
                });
            }

            fs.writeFileSync(file, csv, 'utf8');
        } catch (error) {
            console.error(error);
        }
    };

    return { createFileLogging };
};

export default useFileLogger;

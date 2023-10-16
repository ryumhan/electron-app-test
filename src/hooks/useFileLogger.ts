// import inspectionAtom from '@/atoms/inspection.atom';
import { useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
import { createObjectCsvWriter } from 'csv-writer';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';

const CSV_HEADER = [
    { id: 'result', title: '검사결과' },
    { id: 'sn', title: '모트렉스 SN' },
    { id: 'oruIp', title: 'ORU IP' },
    { id: 'customer', title: '고객 SN' },
    { id: 'avikus', title: 'avikus SN' },
    { id: 'startDate', title: '검사 시작' },
    { id: 'doneDate', title: '검사 완료' },
    { id: 'comhttp', title: '검사 완료' },
    { id: 'comwebsocket', title: '검사 완료' },
    { id: 'svm1', title: '탑뷰 스트리밍 검사' },
    { id: 'svm2', title: '탑뷰/개별뷰 스트리밍' },
    { id: 'svm3', title: 'Distance Guide 모드' },
    { id: 'svm4', title: '도킹뷰 스트리밍' },
    { id: 'svm5', title: '선수뷰 스트리밍' },
    { id: 'svm6', title: 'Light theme 모드' },
    { id: 'svm7', title: 'Dark theme 모드' },
    { id: 'svm8', title: 'Night theme 모드' },
    { id: 'svm9', title: 'Calibration 모드' },
];

const useFileLogger = () => {
    const oruIp = useRecoilValue(statusAtom.oruIpAtom);
    const filePath = useRecoilValue(statusAtom.filePathAtom);
    const statusSelector = useRecoilValue(inspectionAtom.statusSelector);
    const comReport = useRecoilValue(inspectionAtom.comReportAtom);
    const svmReport = useRecoilValue(inspectionAtom.svmReportAtom);

    const sn = useRecoilValue(statusAtom.snAtom);
    const { avikus, customer } = useRecoilValue(statusAtom.serialAtom);

    const createFileLogging = async () => {
        if (!filePath.path) {
            alert('저장 경로를 설정하여 주세요.');
            return;
        }

        const list = [
            comReport
                .filter(elem => elem.result === 'Failed')
                .map(elem => elem.name),
            svmReport.find(elem => elem.result === 'Failed')?.name,
        ];

        const result = statusSelector !== 'Pass' ? 'FAILED' : 'PASS';
        const date = dayjs().format('YYYY_MM_DD');
        const dateTime = dayjs().format('YYYY_MM_DD_HH:mm');
        // Write the data to the CSV file
        try {
            const csvWriter = createObjectCsvWriter({
                path: `${
                    filePath.path || __dirname
                }/${date}_${oruIp}_${result}.csv`,
                header: CSV_HEADER,
            });

            await csvWriter.writeRecords([
                {
                    result: `${result}(${list.join('/')})`,
                    sn,
                    oruIp,
                    customer,
                    avikus,
                    startDate: filePath.startDate,
                    doneDate: dateTime,
                    comhttp:
                        comReport[1].result === 'Progressing'
                            ? 'N/A'
                            : comReport[1].result,
                    comwebsocket:
                        comReport[0].result === 'Progressing'
                            ? 'N/A'
                            : comReport[0].result,
                    svm1:
                        svmReport[0].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[0].result,
                    svm2:
                        svmReport[1].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[1].result,
                    svm3:
                        svmReport[2].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[2].result,
                    svm4:
                        svmReport[3].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[3].result,
                    svm5:
                        svmReport[4].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[4].result,
                    svm6:
                        svmReport[5].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[5].result,
                    svm7:
                        svmReport[6].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[6].result,
                    svm8:
                        svmReport[7].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[7].result,
                    svm9:
                        svmReport[8].result === 'Progressing'
                            ? 'N/A'
                            : svmReport[8].result,
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        createFileLogging();
    }, []);
};

export default useFileLogger;

// import inspectionAtom from '@/atoms/inspection.atom';
import { useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
import { createObjectCsvWriter } from 'csv-writer';
import dayjs from 'dayjs';

const CSV_HEADER = [
    { id: 'date', title: 'Date' },
    { id: 'name', title: 'Name' },
    { id: 'result', title: 'Result' },
];

const useFileLogger = () => {
    // const comReport = useRecoilValue(inspectionAtom.comReportAtom);
    // const svmReport = useRecoilValue(inspectionAtom.svmReportAtom);

    const createFileLogging = async () => {
        const date = dayjs().toString();
        // Write the data to the CSV file
        try {
            const csvWriter = createObjectCsvWriter({
                path: `${__dirname}/result/${date}_output.csv`,
                header: CSV_HEADER,
            });

            await csvWriter.writeRecords([
                { name: 'test', result: true, date },
            ]);
            // await csvWriter.writeRecords(svmReport);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        createFileLogging();
    }, []);
};

export default useFileLogger;

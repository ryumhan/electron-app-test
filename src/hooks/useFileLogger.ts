import inspectionAtom from '@/atoms/inspection.atom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
// import { createObjectCsvWriter } from 'csv-writer';

// const CSV_HEADER = [
//     { id: 'name', title: 'Name' },
//     { id: 'result', title: 'Result' },
//     { id: 'error', title: 'Error' },
// ];

const useFileLogger = () => {
    const failReport = useRecoilValue(inspectionAtom.rootReporter);
    // const comReport = useRecoilValue(inspectionAtom.comReportAtom);
    // const svmReport = useRecoilValue(inspectionAtom.svmReportAtom);

    // const csvWriter = createObjectCsvWriter({
    //     path: 'output.csv',
    //     header: CSV_HEADER,
    // });

    const createFileLogging = async () => {
        // Write the data to the CSV file
        try {
            console.log(failReport);
            // csvWriter.writeRecords(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        createFileLogging();
    }, []);

    return failReport;
};

export default useFileLogger;

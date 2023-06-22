import * as React from 'react';
import {Button, useRecordContext} from 'react-admin';
import {generateTestReport} from "../../utils/api/generate-test-report-async.tsx";

interface GenerateTestReportButtonProps {
    label: string;
}

const GenerateTestReportButton: React.FC<GenerateTestReportButtonProps> = ({label}) => {
    const record = useRecordContext();

    const handleClick = async () => {
        if (record) {
            // @ts-ignore
            await generateTestReport(record.id);
        }
    };

    return (
        <Button label="Generate test report" onClick={handleClick}/>
    );
};

export default GenerateTestReportButton;

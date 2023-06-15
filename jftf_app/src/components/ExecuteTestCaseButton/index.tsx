import * as React from 'react';
import {Button, useRecordContext} from 'react-admin';
import {executeTestCase} from "../../utils/api/execute-test-case-async.tsx";

interface ExecuteTestCaseButtonProps {
    label: string;
}

const ExecuteTestCaseButton: React.FC<ExecuteTestCaseButtonProps> = ({label}) => {
    const record = useRecordContext();

    const handleClick = async () => {
        if (record) {
            // @ts-ignore
            await executeTestCase(record.id, 'JftfDetachedRunner');
        }
    };

    return (
        <Button label="Execute" onClick={handleClick}/>
    );
};

export default ExecuteTestCaseButton;

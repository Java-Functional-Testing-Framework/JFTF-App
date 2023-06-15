import * as React from 'react';
import {Button, useRecordContext} from 'react-admin';
import {executeTestCase} from "../../utils/api/execute-test-case-async.tsx";

const ExecuteTestCaseButton: React.FC = () => {
    const record = useRecordContext();

    const handleClick = async () => {
        if (record) {
            await executeTestCase(record.id, 'JftfDetachedRunner');
        }
    };

    return (
        <Button label="Execute" onClick={handleClick}/>
    );
};

export default ExecuteTestCaseButton;

import * as React from 'react';
import Button from '@mui/material/Button';
import {executeMultipleTestCases} from "../../utils/api/execute-test-case-group-async.tsx";

const ExecuteBulkTestCasesButton = ({selectedIds}) => {

    const handleExecute = async () => {
        await executeMultipleTestCases(selectedIds, 'JftfDetachedRunner');
    };

    return (
        <Button color="primary" onClick={handleExecute}>
            Execute selected
        </Button>
    );
};

export default ExecuteBulkTestCasesButton;

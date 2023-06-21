import {getCSRFToken} from "../auth/get-csrf-token.tsx";
import axios from "axios";
import {getTokenFromLocalStorage} from "../auth/get-token-local-storage.tsx";
import {toast} from "react-toastify";
import {enqueueTask} from "../../components/TestExecutionQueueOverlay";

interface TestCaseInfo {
    id: number;
    firstExecution: string;
    lastExecution: string;
    executed: boolean;
    metaData: {
        metadataId: number;
        testName: string;
        featureGroup: string;
        testGroup: string;
        testPath: string;
        testVersion: string;
    };
}

export async function executeMultipleTestCases(testCaseIds: number[], runner: string): Promise<string> {
    const csrfToken: string = getCSRFToken();
    const authToken: string = getTokenFromLocalStorage();

    const config = {
        headers: {
            'X-CSRFToken': csrfToken,
            'Authorization': `Token ${authToken}`
        }
    };

    const urlPrefix: string = 'http://localhost:8000/api/test-case-admin/';
    const testNameList: string[] = [];

    for (const testCaseId of testCaseIds) {
        const url: string = `${urlPrefix}${testCaseId}`;
        try {
            const response = await axios.get<TestCaseInfo>(url, config);
            const {metaData} = response.data;
            const {testName} = metaData;
            testNameList.push(testName);
        } catch (error) {
            toast.error(`Error retrieving information for test case with ID '${testCaseId}': ${error.response?.data.error || error.message}`);
        }
    }

    const url: string = 'http://localhost:8000/api/test-case/execute_multiple/';
    const requestBody = {
        runner: runner,
        test_case_ids: testCaseIds
    };

    try {
        const response = await axios.post(url, requestBody, config);

        // Extract the task ID from the response
        const taskID: string = response.data.task_id;
        const testNames = testNameList.join(", "); // Concatenate test case names with a comma separator
        toast.success(`Multiple test application execution started: Task ID is '${taskID}'`);
        enqueueTask(taskID, testNames);

        return taskID;
    } catch (error) {
        toast.error(`Error executing multiple test applications: ${error.response?.data.error || error.message}`);
    }
}

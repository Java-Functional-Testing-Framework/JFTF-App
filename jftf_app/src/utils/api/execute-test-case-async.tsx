import {getCSRFToken} from "../auth/get-csrf-token.tsx";
import axios from "axios";
import {getTokenFromLocalStorage} from "../auth/get-token-local-storage.tsx";
import {toast} from "react-toastify";
import {enqueueTask} from "../../components/TestExecutionQueueOverlay";


export async function executeTestCase(id: number, test_case_name: string, runner: string): Promise<string> {
    const csrfToken: string = getCSRFToken();
    const authToken: string = getTokenFromLocalStorage();

    const config = {
        headers: {
            'X-CSRFToken': csrfToken,
            'Authorization': `Token ${authToken}`
        }
    };

    const url: string = `http://localhost:8000/api/test-case/${id}/execute/`;
    const requestBody = {
        runner: runner
    };

    try {
        const response = await axios.post(url, requestBody, config);

        // Extract the task ID from the response
        const taskID: string = response.data.task_id;
        toast.success(`Test application with name '${test_case_name}' execution successful: 'task_id' is '${taskID}'`);
        enqueueTask(taskID, test_case_name);

        return taskID;
    } catch (error) {
        toast.error(`Error executing test application with id '${id}': ${error.response?.data.error || error.message}`);
    }
}

import axios from 'axios';
import {toast} from 'react-toastify';
import {getTokenFromLocalStorage} from "../auth/get-token-local-storage.tsx";

interface TestApplicationTaskExecutionResult {
    id: number;
    task_id: string;
    periodic_task_name: null;
    task_name: string;
    task_args: string;
    task_kwargs: string;
    status: string;
    worker: string;
    content_type: string;
    content_encoding: string;
    result: string;
    date_created: string;
    date_done: string;
    traceback: null;
    meta: string;
}

export async function getTestApplicationExecutionTaskStatus(taskId: string): Promise<{ id: number, status: string }> {
    const authToken: string = getTokenFromLocalStorage();
    const url = `http://localhost:8000/api/test-case-result/?task_id=${taskId}`;

    const config = {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    };

    try {
        const response = await axios.get<TestApplicationTaskExecutionResult[]>(url,
            config);
        if (response.data.length > 0) {
            const {id, status} = response.data[0];
            return {id, status};
        } else {
            console.error(`Test application execution task with ID '${taskId}' not found!`);
        }
    } catch (error) {
        toast.error(`Failed to fetch task status for test application execution task with ID '${taskId}'`);
    }
}

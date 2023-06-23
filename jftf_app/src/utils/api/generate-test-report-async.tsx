import {getCSRFToken} from "../auth/get-csrf-token.tsx";
import axios from "axios";
import {getTokenFromLocalStorage} from "../auth/get-token-local-storage.tsx";
import {toast} from "react-toastify";

export async function generateTestReport(reportId: number): Promise<void> {
    const csrfToken: string = getCSRFToken();
    const authToken: string = getTokenFromLocalStorage();

    const url: string = `http://localhost:8000/api/test-report/${reportId}/generate_report/`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Token ${authToken}`
            },
            responseType: 'blob' // Set the response type to 'blob' to handle binary data
        });

        const contentDisposition = response.headers['content-disposition'];
        const matches = contentDisposition.match(/filename=([^;]+)/);

        let filename = `test_report_${reportId}.html`;

        if (matches && matches.length > 1) {
            filename = matches[1];
        }

        // Create a Blob object from the response data
        const blob = new Blob([response.data], {type: 'text/html'});

        // Create a temporary URL for the Blob object
        const reportUrl = URL.createObjectURL(blob);

        // Trigger a download by creating a temporary link element
        const link = document.createElement('a');
        link.href = reportUrl;
        link.download = filename;
        link.click();

        // Clean up the temporary URL
        URL.revokeObjectURL(reportUrl);

        toast.success(`Test report generation started for test report with Id: '${reportId}' '(${filename})'`);
    } catch (error) {
        toast.error(`Error generating test report with Id '${reportId}': ${error.response?.data.error || error.message}`);
    }
}

import {Admin, Resource} from "react-admin";
import {HashRouter} from 'react-router-dom';
import JFTFRestProvider from './data-providers/jftf-rest-server.ts';
import {authProvider} from "./auth-providers/jftf-auth-provider.ts";
import {fetchJsonWithAuthToken} from 'ra-data-django-rest-framework';
import {JftfAppDefaultLayout} from './layout/jftf-app-default-layout.tsx'
import {TestCaseAdminList} from "./resource-lists/test-case-list.tsx";
import {TestCaseMetadataShow} from "./show-components/test-case-metadata-show.tsx";
import {darkTheme} from "./layout/jftf-app-default-app-bar.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import TaskQueueOverlay from "./components/TestExecutionQueueOverlay";
import {ThemeProvider} from "@mui/material";
import {TaskQueueAdminList} from "./resource-lists/task-queue-list.tsx";
import {TaskResultInformationShow} from "./show-components/task-queue-information-show.tsx";
import {TestReportAdminList} from "./resource-lists/test-report-list.tsx";


const dataProvider = JFTFRestProvider('http://localhost:8000/api', fetchJsonWithAuthToken,);

const App = () => (
    <>
        <HashRouter>
            <ToastContainer/>
            <ThemeProvider theme={darkTheme}>
                <TaskQueueOverlay theme={darkTheme}/>
            </ThemeProvider>
            <Admin theme={darkTheme} layout={JftfAppDefaultLayout} dataProvider={dataProvider}
                   authProvider={authProvider}>
                <Resource name="test-case-admin" list={TestCaseAdminList} show={TestCaseMetadataShow}
                          options={{label: 'Test Applications'}}/>
                <Resource name="test-case-result-admin" list={TaskQueueAdminList} show={TaskResultInformationShow}
                          options={{label: 'Task Queue'}}/>
                <Resource name="test-report-admin" list={TestReportAdminList}
                          options={{label: 'Test Reports'}}/>
            </Admin>
        </HashRouter>
    </>
);

export default App;

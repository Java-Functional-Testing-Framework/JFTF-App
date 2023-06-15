import {Admin, Resource} from "react-admin";
import JFTFRestProvider from './data-providers/jftf-rest-server.ts';
import {authProvider} from "./auth-providers/jftf-auth-provider.ts";
import {fetchJsonWithAuthToken} from 'ra-data-django-rest-framework';
import {JftfAppDefaultLayout} from './layout/jftf-app-default-layout.tsx'
import {TestCaseAdminList} from "./resource-lists/test-case-list.tsx";
import {TestCaseMetadataShow} from "./show-components/test-case-metadata-show.tsx";
import {darkTheme} from "./layout/jftf-app-default-app-bar.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";


const dataProvider = JFTFRestProvider('http://localhost:8000/api', fetchJsonWithAuthToken,);

const App = () => (
    <>
        <ToastContainer/>
        <Admin theme={darkTheme} layout={JftfAppDefaultLayout} dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="test-case-admin" list={TestCaseAdminList} show={TestCaseMetadataShow}/>
        </Admin>
    </>
);

export default App;

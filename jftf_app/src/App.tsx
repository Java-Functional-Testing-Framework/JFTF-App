import { fetchUtils, Admin, Resource, ListGuesser } from "react-admin";
import JFTFRestProvider from './data-providers/jftf-rest-server.ts';
import {authProvider} from "./auth-providers/jftf-auth-provider.ts";
import {fetchJsonWithAuthToken} from 'ra-data-django-rest-framework';
import {TestCaseAdminList} from "./resource-lists/test-case-list.tsx";
import {TestCaseMetadataShow} from "./show-components/test-case-metadata-show.tsx";


const dataProvider = JFTFRestProvider('http://localhost:8000/api', fetchJsonWithAuthToken, );

const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="test-case-admin" list={TestCaseAdminList} show={TestCaseMetadataShow}/>
    </Admin>
);

export default App;

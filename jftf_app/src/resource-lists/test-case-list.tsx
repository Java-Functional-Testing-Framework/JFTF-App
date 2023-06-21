import {BooleanField, Datagrid, DateField, List, TextField, ShowButton} from 'react-admin';
import ExecuteTestCaseButton from "../components/ExecuteTestCaseButton";

const TestCaseMetadataShowButton = (props) => <ShowButton label="Show test case metadata"/>;


export const TestCaseAdminList = () => (
    <List>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="metaData.testName" label={"Test case name"} sortable={false}/>
            <DateField source="firstExecution" showTime={true}/>
            <DateField source="lastExecution" showTime={true}/>
            <BooleanField source="executed"/>
            <TestCaseMetadataShowButton label={"Test case metadata"}/>
            <ExecuteTestCaseButton label={"Execute test application"}/>
        </Datagrid>
    </List>
);

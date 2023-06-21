import {BooleanField, Datagrid, DateField, List, TextField, ShowButton, TextInput, ChipField} from 'react-admin';
import ExecuteTestCaseButton from "../components/ExecuteTestCaseButton";

const TestCaseMetadataShowButton = (props) => <ShowButton label="Show test case metadata"/>;

const postFilters = [
    <TextInput label="Test case name" source="testName"/>,
    <TextInput label="Test group" source="testGroup"/>,
    <TextInput label="Feature group" source="featureGroup"/>,
];

export const TestCaseAdminList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="metaData.testName" label={"Test case name"} sortable={false}/>
            <ChipField source="metaData.testGroup" label={"Test group"} sortable={false} sx={{fontWeight: "bold"}}/>
            <ChipField source="metaData.featureGroup" label={"Feature group"} sortable={false}
                       sx={{fontWeight: "bold"}}/>
            <DateField source="firstExecution" showTime={true}/>
            <DateField source="lastExecution" showTime={true}/>
            <BooleanField source="executed"/>
            <TestCaseMetadataShowButton label={"Test case metadata"}/>
            <ExecuteTestCaseButton label={"Execute test application"}/>
        </Datagrid>
    </List>
);

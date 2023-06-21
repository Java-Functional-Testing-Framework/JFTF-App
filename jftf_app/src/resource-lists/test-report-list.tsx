import {ReferenceField, Datagrid, DateField, List, TextField, ShowButton, SelectField, TextInput} from 'react-admin';

const TestReportInformationShowButton = (props) => <ShowButton label="Show test report information"/>;


const postFilters = [
    <TextInput label="Test case name" source="testName"/>,
    <TextInput label="Execution result" source="executionResult"/>,
];

export const TestReportAdminList = (props) => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="testId" label={"Test case Id"} sortable={false}/>
            <ReferenceField label="Test case name" source="testId" reference="test-case-admin" sortable={false}>
                <TextField source="metaData.testName"/>
            </ReferenceField>
            <SelectField source="testReportInformation.executionResult" label={"Execution result"}
                         choices={[
                             {id: 'errorState', name: 'FAILED'},
                             {id: 'successfulState', name: 'SUCCESSFUL'},
                         ]} sx={{fontWeight: "bold"}}/>
            <DateField source="testReportInformation.startupTimestamp" showTime={true}
                       label={"Execution startup timestamp"}/>
            <DateField source="testReportInformation.endTimestamp" showTime={true} label={"Execution end timestamp"}/>
            <TextField source="testReportInformation.testDuration" label={"Execution duration"}/>
            <TestReportInformationShowButton label={"Test report information"}/>
        </Datagrid>
    </List>
);

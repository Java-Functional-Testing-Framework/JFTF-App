import {ReferenceField, Datagrid, DateField, List, TextField, ShowButton} from 'react-admin';

const TestReportInformationShowButton = (props) => <ShowButton label="Show test report information"/>;


export const TestReportAdminList = () => (
    <List>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="testId" label={"Test case Id"} sortable={false}/>
            <ReferenceField label="Test case name" source="testId" reference="test-case-admin" sortable={false}>
                <TextField source="metaData.testName"/>
            </ReferenceField>
            <TextField source="testReportInformation.executionResult" label={"Execution result"} sortable={false}/>
            <DateField source="testReportInformation.startupTimestamp" showTime={true}
                       label={"Execution startup timestamp"} sortable={false}/>
            <DateField source="testReportInformation.endTimestamp" showTime={true} label={"Execution end timestamp"}
                       sortable={false}/>
            <TextField source="testReportInformation.testDuration" label={"Execution duration"} sortable={false}/>
            <TestReportInformationShowButton label={"Test report information"}/>
        </Datagrid>
    </List>
);

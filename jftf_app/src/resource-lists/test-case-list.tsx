import {BooleanField, Datagrid, DateField, List, TextField, ShowButton} from 'react-admin';

const TestCaseMetadataShowButton = (props) => <ShowButton label="Show test case metadata"/>;


export const TestCaseAdminList = () => (
    <List>
        <Datagrid>
            <TextField source="id"/>
            <DateField source="firstExecution"/>
            <DateField source="lastExecution"/>
            <BooleanField source="executed"/>
            <TestCaseMetadataShowButton label={"Test case metadata"}/>
        </Datagrid>
    </List>
);

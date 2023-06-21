import {Datagrid, RichTextField, List, TextField, ShowButton, DateField} from 'react-admin';

const TaskResultInformationShowButton = (props) => <ShowButton label="Show further task result information"/>;


export const TaskQueueAdminList = () => (
    <List>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="task_id" label={"Task Id"} sortable={false}/>
            <TextField source="status" label={"Task status"}/>
            <DateField source="date_created" showTime={true}/>
            <DateField source="date_done" showTime={true}/>
            <RichTextField source="task_args" label={"Task arguments"} sortable={false}/>
            <TaskResultInformationShowButton label={"Task result information"}/>
        </Datagrid>
    </List>
);

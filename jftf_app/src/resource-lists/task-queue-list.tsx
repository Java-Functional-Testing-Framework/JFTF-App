import {Datagrid, RichTextField, List, TextField, ShowButton, DateField, TextInput} from 'react-admin';

const TaskResultInformationShowButton = (props) => <ShowButton label="Show further task result information"/>;

const postFilters = [
    <TextInput label="Task status" source="status"/>,
    <TextInput label="Task Id" source="task_id"/>,
];

export const TaskQueueAdminList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="task_id" label={"Task Id"} sortable={false}/>
            <TextField source="task_name" label={"Task name"} sortable={false}/>
            <TextField source="status" label={"Task status"} sx={{fontWeight: "bold"}}/>
            <DateField source="date_created" showTime={true}/>
            <DateField source="date_done" showTime={true}/>
            <RichTextField source="task_args" label={"Task arguments"} sortable={false}/>
            <TaskResultInformationShowButton label={"Task result information"}/>
        </Datagrid>
    </List>
);

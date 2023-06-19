import {Show, TabbedShowLayout, Tab, TextField, RichTextField, useRecordContext} from 'react-admin';

const TaskResultInformationShowTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Task result information "{record.id}"</span>;
};

export const TaskResultInformationShow = (props) => (
    <Show title={<TaskResultInformationShowTitle/>} {...props}>
        <TabbedShowLayout>
            <Tab label="Result">
                <RichTextField source="result" label="Task Result"
                               style={{wordBreak: 'break-word', whiteSpace: 'pre-line'}}/>
            </Tab>
            <Tab label="Other Task Information">
                <TextField source="task_name" label="Task Name"/>
                <TextField source="worker" label="Worker"/>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

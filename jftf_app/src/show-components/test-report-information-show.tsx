import {Show, TabbedShowLayout, Tab, TextField, useRecordContext} from 'react-admin';

const TestReportInformationShowTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Test report information "{record.id}"</span>;
};

export const TestReportInformationShow = (props) => (
    <Show title={<TestReportInformationShowTitle/>} {...props}>
        <TabbedShowLayout>
            <Tab label="Test Logs">
                <TextField source="testReportInformation.loggerOutput" label="Test logger output"
                           style={{wordBreak: 'break-word', whiteSpace: 'pre-line'}}/>
            </Tab>
            <Tab label="Test Error Logs">
                <TextField source="testReportInformation.errorMessages" label="Test error messages"
                           style={{wordBreak: 'break-word', whiteSpace: 'pre-line'}}/>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

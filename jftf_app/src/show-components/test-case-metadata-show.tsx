import {Show, SimpleShowLayout, TextField, useRecordContext} from 'react-admin';

const TestCaseMetadataShowTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Test case metadata "{record.id}"</span>;
};

export const TestCaseMetadataShow = (props) => (
    <Show title={<TestCaseMetadataShowTitle/>} {...props}>
        <SimpleShowLayout>
            <TextField source="metaData.metadataId" label={"TestCaseMetadata ID"}/>
            <TextField source="metaData.testName" label={"Test case name"}/>
            <TextField source="metaData.featureGroup" label={"Feature group"}/>
            <TextField source="metaData.testGroup" label={"Test group"}/>
            <TextField source="metaData.testPath" label={"Test case path"}/>
            <TextField source="metaData.testVersion" label={"Test case version"}/>
        </SimpleShowLayout>
    </Show>
);

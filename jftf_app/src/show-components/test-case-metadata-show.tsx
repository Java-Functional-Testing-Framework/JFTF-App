import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

const TestCaseMetadataShowTitle = ({ record }) => {
    return <span>Test case metadata {record ? `"${record.title}"` : ''}</span>;
};

export const TestCaseMetadataShow = (props) => (
    <Show title={<TestCaseMetadataShowTitle />} {...props}>
        <SimpleShowLayout>
            <TextField source="metaData.id" label={"TestCaseMetada ID"}/>
            <TextField source="metaData.testName" reference="test-case-metadata" label={"Test case name"}/>
            <TextField source="metaData.featureGroup" reference="test-case-metadata" label={"Feature group"}/>
            <TextField source="metaData.testGroup" reference="test-case-metadata" label={"Test group"}/>
            <TextField source="metaData.testPath" reference="test-case-metadata" label={"Test case path"}/>
            <TextField source="metaData.testVersion" reference="test-case-metadata" label={"Test case version"}/>
        </SimpleShowLayout>
    </Show>
);
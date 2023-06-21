import {
    BooleanField,
    Datagrid,
    DateField,
    List,
    TextField,
    ShowButton,
    TextInput,
    ChipField,
    BulkDeleteButton,
    useListContext
} from 'react-admin';
import ExecuteBulkTestCasesButton from "../components/ExecuteBulkTestCaseButton";
import ExecuteTestCaseButton from "../components/ExecuteTestCaseButton";

const TestCaseMetadataShowButton = (props) => <ShowButton label="Show test case metadata"/>;

const postFilters = [
    <TextInput label="Test case name" source="testName"/>,
    <TextInput label="Test group" source="testGroup"/>,
    <TextInput label="Feature group" source="featureGroup"/>,
];

export const TestCaseAdminList = () => {
    const {selectedIds} = useListContext();

    const BulkActions = ({selectedIds}) => (
        <>
            <ExecuteBulkTestCasesButton selectedIds={selectedIds}/>
            <BulkDeleteButton label="Delete"/>
        </>
    );

    return (
        <List filters={postFilters} bulkActionButtons={<BulkActions selectedIds={selectedIds}/>}>
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
}

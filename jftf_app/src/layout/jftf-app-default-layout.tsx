import { Layout } from 'react-admin';
import { JftfAppDefaultAppBar } from './jftf-app-default-app-bar.tsx';

export const JftfAppDefaultLayout = (props) => (
    <Layout {...props} appBar={JftfAppDefaultAppBar} />
);

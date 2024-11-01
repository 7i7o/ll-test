import { UploadFile } from '../components/UploadFile';
import { SendAR } from '../components/SendAR';
import { EncryptDecrypt } from '../components/EncryptDecrypt';
import { SendAOToken } from '../components/SendAOToken';
import { SendAOMessage } from '../components/SendAOMessage';
import { DryRunAOMessage } from '../components/DryRunAOMessage';
import { BatchTest } from '../components/BatchTest';
import { BoltTest } from '../components/BoltTest';
import { ArIOTest } from '../components/ArIOTest';
import { LlamaTest } from '../components/LlamaTest';
import { LlamaTestSimple } from '../components/LlamaTestSimple';

export interface SidebarItemConfig {
    id: string;
    title: string;
    component: React.ReactNode;
}

export const sidebarItems: SidebarItemConfig[] = [
    {
        id: 'llama',
        title: 'Phi3 Test',
        component: <LlamaTest />,
    },
    {
        id: 'llama-simple',
        title: 'Phi3 Simple Test',
        component: <LlamaTestSimple />,
    },
];

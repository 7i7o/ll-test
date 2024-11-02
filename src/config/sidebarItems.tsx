// import { LlamaTest } from '../components/LlamaTest';
import { LlamaTestSimple } from '../components/LlamaTestSimple';
import { LLAMA_AO_PROCESS_SIMPLE } from '../utils/constants';

export interface SidebarItemConfig {
    id: string;
    title: string;
    component: React.ReactNode;
}

export const sidebarItems: SidebarItemConfig[] = [
    // {
    //     id: 'llama',
    //     title: 'Phi3 Test',
    //     component: <LlamaTest />,
    // },
    {
        id: 'llama-simple',
        title: 'Phi3',
        component: <LlamaTestSimple processId={LLAMA_AO_PROCESS_SIMPLE} />,
    },
];

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

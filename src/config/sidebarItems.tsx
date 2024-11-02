// import { LlamaTest } from '../components/LlamaTest';
import { LlamaTestSimple } from '../components/LlamaTestSimple';
import { LLM_MODELS } from '../utils/constants';

export interface SidebarItemConfig {
    id: string;
    title: string;
    component: React.ReactNode;
}

export const sidebarItems: SidebarItemConfig[] = [
    {
        id: 'GPT2XL',
        title: 'GPT2 XL',
        component: <LlamaTestSimple processId={LLM_MODELS.GPT2XL} />,
    },
    {
        id: 'phi2',
        title: 'Phi2',
        component: <LlamaTestSimple processId={LLM_MODELS.Phi2} />,
    },
    {
        id: 'llama-simple',
        title: 'Phi3',
        component: <LlamaTestSimple processId={LLM_MODELS.Phi3} />,
    },
    // {
    //     id: 'codeqwen',
    //     title: 'CodeQwen',
    //     component: <LlamaTestSimple processId={LLM_MODELS.CodeQwen} />,
    // },
];

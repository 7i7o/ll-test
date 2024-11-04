export const LLM_MODELS = {
    Phi2: import.meta.env.VITE_PHI2_PROCESS_ID,
    Phi3: import.meta.env.VITE_PHI3_PROCESS_ID,
    GPT2XL: import.meta.env.VITE_GPT2XL_PROCESS_ID,
} as const;

export const CU_URLS = {
    Localhost: import.meta.env.VITE_CU_URL_LOCALHOST,
    Llama: import.meta.env.VITE_CU_URL_LLAMA,
    ['Default [NON-Llama]']: import.meta.env.VITE_CU_URL_DEFAULT,
    Custom: '',
} as const;

export type CuUrlKey = keyof typeof CU_URLS;

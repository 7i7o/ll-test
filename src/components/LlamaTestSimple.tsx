import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { LLM_MODELS } from '../utils/constants';
import { createMessage, Tag, tag } from '../utils/arweaveUtils';
import { createDataItemSigner } from '@permaweb/aoconnect';
import { useArweave } from '../hooks/useArweave';
import { CU_URLS, type CuUrlKey } from '../utils/constants';

export interface LlamaTestSimpleProps {
    processId?: string;
}

export function LlamaTestSimple(props: LlamaTestSimpleProps) {
    const { processId = LLM_MODELS.Phi3 } = props;
    const [prompt, setPrompt] = useState('');
    const [numTokens, setNumTokens] = useState('60');
    const [response, setResponse] = useState<string>('');
    const [prompting, setPrompting] = useState(false);
    const [prompted, setPrompted] = useState(false);
    const [running, setRunning] = useState(false);
    const [selectedCuUrl, setSelectedCuUrl] = useState<CuUrlKey>('Localhost');
    const [customUrl, setCustomUrl] = useState<string>(
        CU_URLS[selectedCuUrl as keyof typeof CU_URLS]
    );
    const [promptTime, setPromptTime] = useState<number>(0);
    const [promptedWords, setPromptedWords] = useState<number>(0);
    const [runTime, setRunTime] = useState<number>(0);
    const [ranTokens, setRanTokens] = useState<number>(0);
    const { ao } = useArweave({
        cuUrl:
            selectedCuUrl === 'Custom'
                ? customUrl
                : CU_URLS[selectedCuUrl as keyof typeof CU_URLS],
    });

    const handleCuUrlChange = (urlKey: CuUrlKey) => {
        setSelectedCuUrl(urlKey);
        if (urlKey !== 'Custom') {
            setCustomUrl(CU_URLS[urlKey]);
        }
    };

    const handlePrompt = async () => {
        let start, end;
        if (!prompt || prompting) return;
        setPrompting(true);
        setResponse('');
        setPromptTime(0);
        setRunTime(0);

        try {
            console.log('handlePrompt Started', processId);
            start = Date.now();
            const response = await ao?.message({
                ...createMessage(processId, [
                    tag('Action', 'Prompt'),
                    tag('Prompt', prompt),
                ]),
                signer: createDataItemSigner(window.arweaveWallet),
            });
            const { Messages } = await ao?.result({
                message: response,
                process: processId,
            });
            end = Date.now();
            const timeInSeconds = (end - start) / 1000;
            setPromptTime(timeInSeconds);
            setPromptedWords(prompt.trim().split(/\s+/).length);
            setPrompted(true);
            console.log(Messages[0].Tags);
            console.log('handlePrompt Ended: ', timeInSeconds);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setPrompting(false);
        }
    };

    const handleRun = async () => {
        let start, end;
        if (!prompt || prompting) return;
        setRunning(true);
        setRunTime(0);

        try {
            console.log('handleRun Started');
            const tokens = parseInt(numTokens);
            start = Date.now();
            const response = await ao?.message({
                ...createMessage(processId, [
                    tag('Action', 'Run'),
                    tag('Max-Tokens', tokens.toString()),
                ]),
                signer: createDataItemSigner(window.arweaveWallet),
            });
            console.log('response', response);
            const { Messages } = await ao?.result({
                message: response,
                process: processId,
            });
            const tags = Messages?.[0]?.Tags;
            console.log('response tags: ', tags);
            const res = tags?.find(
                (tag: Tag) => tag.name === 'Llama-Response'
            )?.value;
            if (res) {
                setResponse(res);
            }
            end = Date.now();
            const timeInSeconds = (end - start) / 1000;
            setRunTime(timeInSeconds);
            setRanTokens(tokens);
            console.log(
                `handleRun Ended: ${timeInSeconds} -> ${timeInSeconds / tokens}s/token`
            );
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setRunning(false);
        }
    };

    const TimingInfo = () => {
        const promptTimePerWord = promptTime / promptedWords;
        const runTimePerToken = runTime / ranTokens;

        return (
            <div className="-my-3 flex h-5 items-center justify-between px-3 text-xs italic text-slate-700 dark:text-slate-300">
                {promptTime > 0 && (
                    <div>
                        <span className="font-semibold">Prompt Time:</span>{' '}
                        {promptTime.toFixed(2)} s -{' '}
                        {promptTimePerWord.toFixed(3)} s/word
                    </div>
                )}
                {runTime > 0 && (
                    <div>
                        <span className="font-semibold">Run Time:</span>{' '}
                        {runTime.toFixed(2)} s - {runTimePerToken.toFixed(3)}{' '}
                        s/token
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-end gap-4">
                <div className="flex-1">
                    <Input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        maxLength={100}
                        placeholder="Enter your prompt here"
                        className="w-full"
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handlePrompt}
                        disabled={
                            !prompt ||
                            prompting ||
                            prompt.length > 100 ||
                            running
                        }
                    >
                        {prompting ? 'Setting...' : 'Prompt'}
                    </Button>
                    <Input
                        type="number"
                        value={numTokens}
                        onChange={(e) => setNumTokens(e.target.value)}
                        min="1"
                        max="100"
                        className="w-full"
                    />
                    <Button
                        onClick={handleRun}
                        disabled={!prompt || prompting || running || !prompted}
                    >
                        {running ? 'Running...' : 'Run'}
                    </Button>
                </div>
            </div>

            {/* Response area */}
            <div className="min-h-[100px] rounded-lg border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
                {response.length > 0 ? (
                    <div className="whitespace-pre-wrap break-words">
                        {response}
                    </div>
                ) : (
                    <div className="text-slate-500">
                        {prompting
                            ? 'Processing...'
                            : running
                              ? 'Checking generation status...'
                              : 'Response will appear here'}
                    </div>
                )}
            </div>

            {/* Timing Information */}
            <TimingInfo />

            {/* CU_URL Selection */}
            <details>
                <summary>
                    <label className="text-sm font-medium">
                        AO Compute Unit ({selectedCuUrl})
                    </label>
                </summary>

                <div className="flex h-11 items-center gap-4">
                    <div className="flex gap-4">
                        {(Object.keys(CU_URLS) as CuUrlKey[]).map((urlKey) => (
                            <label
                                key={urlKey}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name="cuUrl"
                                    checked={selectedCuUrl === urlKey}
                                    onChange={() => handleCuUrlChange(urlKey)}
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm">{urlKey}</span>
                            </label>
                        ))}
                    </div>
                    {selectedCuUrl === 'Custom' && (
                        <Input
                            type="text"
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                            placeholder="Enter custom URL"
                            className="flex-1"
                        />
                    )}
                </div>
            </details>
        </div>
    );
}

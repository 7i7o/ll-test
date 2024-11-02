import { useTheme } from '../../hooks/useTheme';

export function SidebarHeader() {
    const { theme } = useTheme();
    return (
        <div className="p-4 text-center dark:border-slate-800">
            <h1 className="flex items-center justify-center text-3xl font-bold">
                <img
                    src={theme === 'dark' ? '/ll.dark.svg' : '/ll.light.svg'}
                    alt="AWK"
                    className="mr-1 h-10"
                />
                Test
            </h1>
        </div>
    );
}

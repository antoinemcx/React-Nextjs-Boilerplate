import { Loader2 } from 'lucide-react';

const Loading = async () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin h-10 w-10" />
        </div>
    );
};

export default Loading;

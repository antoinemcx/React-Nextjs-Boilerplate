import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';

export default function Home() {
    return (
        <div className="container pt-20">
            <Heading>React Next.js boilerplate</Heading>

            <div className="pt-10">
                <Paragraph size="lg" className="pt-4">
                    Hello world !
                </Paragraph>
            </div>
        </div>
    );
}

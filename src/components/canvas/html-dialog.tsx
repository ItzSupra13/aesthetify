'use client'

import { getHTMLWrapper } from './frame-wrapper';
import { Dialog, DialogHeader, DialogContent, DialogTitle } from '../ui/dialog';
import { CodeBlock, CodeBlockCopyButton } from '../ai-elements/code-block';

type PropsType = {
	html: string;
	themeStyle: string;
    open: boolean;
    title?: string;
	onOpenChange: (v: boolean) => void;
};
const HtmlDialog = ({ html, title, themeStyle, open, onOpenChange }: PropsType) => {
    const fullHtml = getHTMLWrapper(html, title, themeStyle )
    return (
        <Dialog open={open}
            onOpenChange={onOpenChange}>
            <DialogContent className='w-full sm:max-w-7xl h-[90vh]'>
                <DialogHeader>
                    <DialogTitle>
                        {title || "Untitled"}
                    </DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-full overflow-y-auto">
                    <CodeBlock
                        className='w-full h-auto'
                        code={fullHtml}
                        language='html'
                        showLineNumbers />
                    <CodeBlockCopyButton className='fixed top-16 right-12 z-50 bg-muted!'/>
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default HtmlDialog;

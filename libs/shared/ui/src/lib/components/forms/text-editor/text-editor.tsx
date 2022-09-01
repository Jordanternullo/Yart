import Avatar from '../../avatar/avatar';

/* eslint-disable-next-line */
export interface TextEditorProps {}

export function TextEditor(props: TextEditorProps) {
    return (
        <div>
            <div className="flex gap-4">
                <Avatar image="https://is4-ssl.mzstatic.com/image/thumb/aIvtSHOcgUL4ym2l6eQHPQ/1200x675mf.jpg" />
                <div className="flex flex-col justify-center">
                    <span className={`font-title text-base`}>Skypell</span>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default TextEditor;

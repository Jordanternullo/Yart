import { Button, ButtonColor, Dialog, File, Input, InputTags, Select } from "@yart/shared/ui";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import { createPosts, getCategories, supabase } from "@yart/shared/api";
import {v4 as uuidv4} from 'uuid';


const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
);
export interface ModalCreatePostProps {
    trigger: string;
}

const ModalCreatePost = (props: ModalCreatePostProps) => {
    const {trigger} = props;
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState(EditorState.createEmpty());
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then((categorie) => {
                setCategories(categorie.map(option => ({value: option.id, label: option.title})));
                console.log(categories)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [] )
    const handleSubmitForm = () => {
        const post = {
            id: uuidv4(),
            title: title,
            tags: tags,
            content: `'${draftToHtml(convertToRaw(content.getCurrentContent()))}'`,
            file:  files,
            authorId: supabase.auth.user().id,
            categoryId: 1

        }
        createPosts(post).then((res) => {
            console.log(res)
        }

        )
        console.log(title)
        console.log(tags)
        console.log(`"${draftToHtml(convertToRaw(content.getCurrentContent()))}"`)
        console.log(files)
    }

    return (
        <Dialog
            trigger={<Button>{trigger}</Button>}
            title="Créer une publication"
            classNameChildren="flex flex-col gap-4">
                <Input 
                    type="text"
                    placeholder="Titre de l'article"
                    labelClassName={`text-dark-400`}
                    className={`bg-transparent !h-10`}
                    containerClassName={`w-full`}
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    }
                />
                <InputTags 
                    tags={tags}
                    onChange={(tag) =>
                        setTags([...tags, tag])
                }/>
                <div>
                <Select 
                    options={categories}
                />
                </div>
                <Editor 
                    toolbar={{
                        options: ['textAlign', 'list', 'fontSize', 'inline'],
                        inline: {inDropdown: true},
                        list: {inDropdown: true},
                        textAlign: {inDropdown: true}
                    }}
                    wrapperClassName={`w-full !box-border border-2 border-dark-300 text-sm text-white bg-dark-400 rounded-md outline-none focus:border-primary-300 transition bg-transparent`}
                    toolbarClassName={`!border-transparent !border-b !border-b-primary-500 text-dark-500 !bg-transparent `}
                    editorClassName={`px-4 min-h-[200px]`} 
                    onEditorStateChange={(editorState: EditorState) => setContent(editorState)}
                    editorState={content}
                />
                <File 
                    data={files}
                    onChange={(e) =>
                            setFiles(e)
                }/>
                <div className='flex gap-4 justify-end'>
                    <Button color={ButtonColor.Dark}>Annuler</Button>
                    <Button onClick={handleSubmitForm}>Publier</Button>
                </div>
        </Dialog>
    )
}

export default ModalCreatePost;
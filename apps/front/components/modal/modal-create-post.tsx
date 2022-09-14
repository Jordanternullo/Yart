import { Button, ButtonColor, Dialog, File, Input, InputTags, Select } from "@yart/shared/ui";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import { createPosts, getCategories, supabase, uploadImage } from "@yart/shared/api";
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
    const [categorieSelected, setCategorieSelected] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalConfirmShow, setModalConfirmShow] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then((categorie) => {
                setCategories(categorie.map(option => ({value: option.id, label: option.title})));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [] )

    const handleSubmitForm = () => {
        setLoading(true);
        uploadImage(files).then((data) => {
            const post = {
                id: uuidv4(),
                title: title,
                tags: tags,
                content: `${draftToHtml(convertToRaw(content.getCurrentContent()))}`,
                file:  data.key,
                authorId: supabase.auth.user().id,
                categoryId: categorieSelected
    
            }
            createPosts(post).then((res) => {
                console.log(res)
            }).catch((error) => {
                throw new Error('Error during created post')
            })
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleCancel = () => {
        setModalShow(true);
        setTitle('')
        setTags([])
        setContent(EditorState.createEmpty())
        setFiles([])
    }

    return (
        <Dialog
            trigger={<Button onClick={() => setModalShow(true)}>{trigger}</Button>}
            title="Créer une publication"
            classNameChildren="flex flex-col gap-4"
            open={modalShow}>
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
                    onChange={(categorie) =>
                        setCategorieSelected(categorie.value)
                    }
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
                    <Dialog
                        trigger={<Button color={ButtonColor.Dark} onClick={() => setModalConfirmShow(true)}>Annuler</Button>}
                        title="Voulez-vous abandonner ?"
                        open={modalConfirmShow}
                    >
                        <Button color={ButtonColor.Dark} onClick={() => setModalConfirmShow(true)}>Non</Button>
                        <Button onClick={handleCancel}>Oui</Button>
                    </Dialog>
                    <Button onClick={handleSubmitForm}>Publier</Button>
                </div>
        </Dialog>
    )
}

export default ModalCreatePost;
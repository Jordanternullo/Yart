import { useState } from 'react';
import Dropzone from 'react-dropzone';
import Button, { ButtonSize } from '../../button/button';

export interface FileProps {
    onChange?: (files: File[]) => void;
    maxFiles?: number;
    maxSize?: number;
    accept?: { [key: string]: string[] };
    disabled?: boolean;
    className?: string;
    data: File[];
}

export function File(props: FileProps) {
    const {
        onChange,
        data = [],
        maxFiles = 10,
        maxSize = 1000000,
        accept,
        disabled = false,
        className = '',
    } = props;
    const [dragOver, setDragOver] = useState(false);

    const handleDrop = (acceptedFiles: File[]) => {
        onChange && onChange(acceptedFiles);
    };

    return (
        <Dropzone
            onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
            onDragEnter={() => setDragOver(true)}
            onDragLeave={() => setDragOver(false)}
            maxFiles={maxFiles}
            maxSize={maxSize}
            accept={accept}
            disabled={disabled}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div
                        {...getRootProps()}
                        className={`w-full h-40 border-2 border-dashed border-dark-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary-300 transition-colors duration-300 ${
                            dragOver ? 'border-primary-300' : ''
                        } ${
                            disabled
                                ? 'bg-dark-400 hover:border-dark-300 cursor-not-allowed'
                                : ''
                        } ${className}`}>
                        <input {...getInputProps()} />
                        {data.length < 1 && (
                            <>
                                <Button
                                    size={ButtonSize.Very_small}
                                    disabled={disabled}
                                    className="mb-3">
                                    Choisir un fichier
                                </Button>
                                <p className="text-xs">
                                    Faites glisser et déposez des fichiers ici,
                                    ou cliquez pour sélectionnez les fichiers
                                </p>
                            </>
                        )}
                        {data.length > 0 && (
                            <>
                                <Button
                                    size={ButtonSize.Very_small}
                                    className="mb-3">
                                    Changer le fichier
                                </Button>
                                <p className="text-xs">{data.map((file) => file.name).join(', ')}</p>
                            </>
                        )}
                    </div>
                </section>
            )}
        </Dropzone>
    );
}

export default File;

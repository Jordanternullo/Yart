import dynamic from 'next/dynamic';
import React, { Component, useState } from 'react';
import slugify from 'react-slugify';
const ReactTags = dynamic(() => import('react-tag-input').then((module) => module.WithContext), { ssr: false });

/* eslint-disable-next-line */
export enum InputTagsState {
    Normal = 'normal',
    Error = 'error',
    Success = 'success',
}

export interface InputTagsProps extends React.ComponentPropsWithoutRef<'input'> {
    label?: string;
    className?: string;
    labelClassName?: string;
    containerClassName?: string;
    state?: InputTagsState;
    errorMessage?: string;
    tags: [];
    onChange?: (event: React.ChangeEvent) => void;
}

export function InputTags(props: InputTagsProps) {
    const {
        label,
        labelClassName = '',
        className = '',
        containerClassName = '',
        state = InputTagsState.Normal,
        errorMessage,
        onChange,
        tags = [],
        ...inputProps
    } = props;

    
    const stateClassName = {
        [InputTagsState.Normal]: '',
        [InputTagsState.Error]: '!border-error-500',
        [InputTagsState.Success]: '!border-success-500',
    };
    const haveValueClassName =
        tags.length > 0 && state === InputTagsState.Normal
            ? `!border-primary-300`
            : '';

    const disabledClassName = inputProps.disabled ? '!bg-dark-200' : '';
    const handleAddition = (tag) => {;
        onChange && onChange({id: slugify(tag.id), text: tag.text});
      };
    const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    onChange && onChange(newTags);
    };

    const handleDelete = (i: number)=> {
        onChange && onChange(tags.filter((tag, index) => index !== i));
      };

    return (
        <label className={containerClassName}>
            {label && (
                <span
                    data-testid="label"
                    className={`block nb-0 ml-1 text-sm ${labelClassName}`}>
                    {label}
                </span>
            )}
            <div className={`h-10 w-full flex items-center border-2 border-dark-300 text-sm text-white rounded-md px-4 py-2 outline-none focus:border-primary-300 transition h-auto ${stateClassName[state]} ${haveValueClassName} ${disabledClassName} ${className}`}>
                <ReactTags
                    tags={tags}
                    placeholder={'Ajouter un tag'}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleDelete={handleDelete}
                    classNames={{
                        tag: 'gap-2 focus:outline-2 focus:outline focus:outline-offset-[3px] inline-flex items-center text-white font-bold transition-color bg-primary-500 border-2 border-primary-500 hover:bg-primary-400 hover:border-primary-400 focus:bg-primary-300 outline-primary-300 rounded-md p-1',
                        tagInput: 'flex w-full',
                        tagInputField: 'bg-transparent b-none outline-none w-full',
                        selected: 'flex gap-2 flex-wrap'
                    }}
                    autocomplete
                    />
            </div>
            {errorMessage && (
                <span
                    className="text-xs text-error-500 mt-1.5"
                    data-testid="input-errormessage">
                    {errorMessage}
                </span>
            )}
        </label>
    );
}
export default InputTags;

'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    var cloudinary: any;
}

interface imageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<imageUploadProps> = ({ onChange, value }) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange])

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="fviworg2"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className='
                            relative 
                            cursor-pointer 
                            hover:opacity-70 
                            transition 
                            border-dashed 
                            border-2
                            p-20
                            border-zinc-300 
                            flex 
                            flex-col 
                            justify-center 
                            items-center 
                            gap-4 
                            text-zinc-600
                        '
                    >
                        <TbPhotoPlus size={50} />
                        <div className='font-semibold text-lg'>
                            Charger l&apos;image
                        </div>
                        {
                            value && (
                                <div className='absolute inset-0 w-full h-full'>
                                    <Image
                                        alt='image'
                                        fill
                                        style={{ objectFit : 'cover' }}
                                        src={value}
                                    />
                                </div>
                            )
                        }
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;
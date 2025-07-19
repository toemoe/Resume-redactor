import React, { useState, useRef, ChangeEvent } from 'react';


interface UploadImageProps {
    onImageUpload: (file: File) => void;
    showPreview?: boolean;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload, showPreview = true }) => {
    const [ preview, setPreview ] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (showPreview) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
            onImageUpload(file);
        } else {
            setPreview(null);
        }
    };

    const handleButtonClick = function () {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input type='file' accept='image/*' onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none'}}/>
            <button onClick={handleButtonClick} title="upload image" className='upload-image'>
                Upload Image
            </button>
            {preview && (
                <div>
                    <img src={preview} alt="Preview" />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
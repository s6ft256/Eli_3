
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from '../../utils';

const ImageEditing: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("Add a retro, vintage filter to the image.");
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError('');
            setResult('');
        }
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setImage(file);
                setPreview(URL.createObjectURL(file));
                setError('');
                setResult('');
            }
        }
    }, []);
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const editImage = async () => {
        if (!image) {
            setError("Please upload an image first.");
            return;
        }
        if (!prompt) {
            setError("Please enter an editing instruction.");
            return;
        }
        setLoading(true);
        setError('');
        setResult('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const base64Image = await fileToBase64(image);

            const imagePart = {
                inlineData: {
                    data: base64Image,
                    mimeType: image.type,
                },
            };
            const textPart = { text: prompt };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });
            
            const firstPart = response.candidates?.[0]?.content?.parts?.[0];
            if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
                 const base64ImageBytes = firstPart.inlineData.data;
                 const imageUrl = `data:${firstPart.inlineData.mimeType};base64,${base64ImageBytes}`;
                 setResult(imageUrl);
            } else {
                setError("Image editing failed. The model did not return an image.");
            }

        } catch (e: any) {
            setError(e.message || "An error occurred while editing the image.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Image Editing</h2>
            <p className="mb-6 text-gray-600">Upload an image and tell the AI how you'd like to change it.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="image-upload-edit" className="block text-lg font-medium text-gray-700 mb-2">Original Image</label>
                    <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition"
                    >
                        <input id="image-upload-edit" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                         {preview ? (
                            <img src={preview} alt="Preview" className="mx-auto h-48 rounded-md" />
                        ) : (
                            <p className="text-gray-500">Drag & drop an image here, or click to select a file</p>
                        )}
                    </div>

                    <label htmlFor="prompt-edit" className="block text-lg font-medium text-gray-700 mt-6 mb-2">Editing Instructions</label>
                    <textarea
                        id="prompt-edit"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Make the sky look like a sunset"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        rows={3}
                    />

                    <button
                        onClick={editImage}
                        disabled={loading || !image}
                        className="w-full mt-4 bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition-colors"
                    >
                        {loading ? 'Editing...' : 'Edit Image'}
                    </button>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Edited Image</h3>
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[300px] border flex items-center justify-center">
                        {loading && <div className="text-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div><p className="mt-2">Applying edits...</p></div>}
                        {error && <p className="text-red-500">{error}</p>}
                        {result && <img src={result} alt="Edited" className="max-w-full max-h-[400px] rounded-lg shadow-md" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageEditing;

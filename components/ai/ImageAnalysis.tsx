
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { fileToBase64 } from '../../utils';

const ImageAnalysis: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("Describe this image in detail.");
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

    const analyzeImage = async () => {
        if (!image) {
            setError("Please upload an image first.");
            return;
        }
        if (!prompt) {
            setError("Please enter a prompt.");
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
                    mimeType: image.type,
                    data: base64Image,
                },
            };
            const textPart = { text: prompt };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
            });

            setResult(response.text);
        } catch (e: any) {
            setError(e.message || "An error occurred while analyzing the image.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Image Analysis</h2>
            <p className="mb-6 text-gray-600">Upload an image and ask a question to understand its content.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="image-upload" className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>
                    <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition"
                    >
                        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        {preview ? (
                            <img src={preview} alt="Preview" className="mx-auto h-48 rounded-md" />
                        ) : (
                            <p className="text-gray-500">Drag & drop an image here, or click to select a file</p>
                        )}
                    </div>

                    <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mt-6 mb-2">Your Question</label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., What's happening in this image?"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        rows={3}
                    />
                    <button
                        onClick={analyzeImage}
                        disabled={loading || !image}
                        className="w-full mt-4 bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition-colors"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Analysis Result</h3>
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] border">
                        {loading && <div className="text-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div><p className="mt-2">Thinking...</p></div>}
                        {error && <p className="text-red-500">{error}</p>}
                        {result && <p className="text-gray-800 whitespace-pre-wrap">{result}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageAnalysis;

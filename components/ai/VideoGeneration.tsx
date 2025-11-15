
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { fileToBase64 } from '../../utils';

const VideoGeneration: React.FC = () => {
    const [apiKeySelected, setApiKeySelected] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('Make this image come to life, cinematic camera pan.');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        window.aistudio.hasSelectedApiKey().then(setApiKeySelected);
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError('');
            setVideoUrl('');
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
                setVideoUrl('');
            }
        }
    }, []);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const generateVideo = async () => {
        if (!image) {
            setError("Please upload an image first.");
            return;
        }
        setLoading(true);
        setError('');
        setVideoUrl('');
        setLoadingMessage('Initializing video generation...');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const base64Image = await fileToBase64(image);

            let operation = await ai.models.generateVideos({
                model: 'veo-3.1-fast-generate-preview',
                prompt,
                image: {
                    imageBytes: base64Image,
                    mimeType: image.type,
                },
                config: {
                    numberOfVideos: 1,
                    resolution: '720p',
                    aspectRatio: aspectRatio,
                }
            });

            setLoadingMessage('Video generation in progress... This can take a few minutes. Checking status...');

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation: operation });
            }

            if (operation.error) {
                throw new Error(operation.error.message || 'Video generation failed in operation.');
            }

            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
                setLoadingMessage('Fetching generated video...');
                const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch video: ${response.statusText}`);
                }
                const videoBlob = await response.blob();
                setVideoUrl(URL.createObjectURL(videoBlob));
            } else {
                throw new Error("Video generation completed, but no download link was found.");
            }
        } catch (e: any) {
             if (e.message?.includes("Requested entity was not found.")) {
                setError("API key is invalid. Please select a valid key.");
                setApiKeySelected(false);
            } else {
                setError(e.message || "An error occurred while generating the video.");
            }
            console.error(e);
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
    };

    if (!apiKeySelected) {
        return (
            <div className="text-center">
                 <h2 className="text-2xl font-bold mb-4">API Key Required for Video Generation</h2>
                 <p className="mb-4 text-gray-600">This feature requires a personal API key to proceed. Please select one.</p>
                 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline mb-6 block">Learn about billing</a>
                <button
                    onClick={async () => {
                        await window.aistudio.openSelectKey();
                        setApiKeySelected(true);
                    }}
                    className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    Select API Key
                </button>
            </div>
        );
    }


    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Animate Image</h2>
            <p className="mb-6 text-gray-600">Upload a starting image to generate a short video.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="image-upload-vid" className="block text-lg font-medium text-gray-700 mb-2">Starting Image</label>
                    <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition"
                    >
                        <input id="image-upload-vid" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        {preview ? <img src={preview} alt="Preview" className="mx-auto h-48 rounded-md" /> : <p>Drop an image here or click to upload</p>}
                    </div>

                    <label htmlFor="prompt-vid" className="block text-lg font-medium text-gray-700 mt-6 mb-2">Prompt (Optional)</label>
                    <textarea id="prompt-vid" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full p-3 border rounded-lg" />
                    
                    <label className="block text-lg font-medium text-gray-700 mt-6 mb-2">Aspect Ratio</label>
                    <div className="flex gap-2">
                        {(['16:9', '9:16'] as const).map(ratio => (
                            <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`px-4 py-2 rounded-full font-semibold border-2 ${aspectRatio === ratio ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-white'}`}>
                                {ratio === '16:9' ? 'Landscape' : 'Portrait'}
                            </button>
                        ))}
                    </div>

                    <button onClick={generateVideo} disabled={loading || !image} className="w-full mt-6 bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400">
                        {loading ? 'Generating...' : 'Generate Video'}
                    </button>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Generated Video</h3>
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[300px] border flex items-center justify-center">
                        {loading && <div className="text-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div><p className="mt-2">{loadingMessage}</p></div>}
                        {error && <p className="text-red-500">{error}</p>}
                        {videoUrl && <video src={videoUrl} controls autoPlay loop className="max-w-full rounded-lg" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGeneration;

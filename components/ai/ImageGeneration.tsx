import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const AspectRatioIcon = ({ ratio }: { ratio: string }) => {
    const classes: { [key: string]: string } = {
        "1:1": "w-7 h-7",
        "16:9": "w-10 h-5",
        "9:16": "w-5 h-10",
        "4:3": "w-8 h-6",
        "3:4": "w-6 h-8",
    };
    return <div className={`border-2 border-current rounded-sm ${classes[ratio] || 'w-7 h-7'}`}></div>
};

const ImageGeneration: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A golden retriever wearing sunglasses, sitting on a beach chair, cinematic style');
    const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16" | "4:3" | "3:4">("1:1");
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

    const aspectRatioClasses: { [key: string]: string } = {
        "1:1": "aspect-square",
        "16:9": "aspect-video",
        "9:16": "aspect-[9/16]",
        "4:3": "aspect-[4/3]",
        "3:4": "aspect-[3/4]",
    };

    const generateImage = async () => {
        if (!prompt) {
            setError("Please enter a prompt.");
            return;
        }
        setLoading(true);
        setError('');
        setResult('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: aspectRatio,
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].imageBytes) {
                const base64ImageBytes = response.generatedImages[0].imageBytes;
                const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
                setResult(imageUrl);
            } else {
                 setError("Image generation failed. No image was returned. This could be due to safety filters or other issues.");
            }
        } catch (e: any) {
            if (e.message && e.message.includes("violated Google's Responsible AI practices")) {
                setError("Your prompt may have violated safety policies. Please try rephrasing your prompt to be more specific, while avoiding sensitive topics.");
            } else {
                setError(e.message || "An error occurred while generating the image.");
            }
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Image Generation</h2>
            <p className="mb-6 text-gray-600">Describe the image you want to create. Be as specific as you can!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="prompt-gen" className="block text-lg font-medium text-gray-700 mb-2">Your Prompt</label>
                    <textarea
                        id="prompt-gen"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A futuristic city with flying cars at sunset"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        rows={4}
                    />

                    <label className="block text-lg font-medium text-gray-700 mt-6 mb-2">Aspect Ratio</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {aspectRatios.map(ratio => (
                            <button
                                key={ratio}
                                onClick={() => setAspectRatio(ratio as any)}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg font-medium border-2 transition-all duration-200 h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                                    aspectRatio === ratio 
                                    ? 'bg-yellow-500 border-yellow-600 text-white shadow-md' 
                                    : 'bg-white border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
                                }`}
                                title={`Aspect ratio ${ratio}`}
                            >
                                <AspectRatioIcon ratio={ratio} />
                                <span className="mt-2 text-sm font-semibold">{ratio}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={generateImage}
                        disabled={loading}
                        className="w-full mt-6 bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition-colors"
                    >
                        {loading ? 'Generating...' : 'Generate Image'}
                    </button>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Generated Image</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-center">
                        <div className="w-full max-w-md">
                            {loading ? (
                                <div className={`${aspectRatioClasses[aspectRatio]} w-full`}>
                                    <div className="w-full h-full shimmer-bg rounded-lg flex items-center justify-center">
                                        <div className="text-center text-gray-600">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
                                            <p className="mt-4 font-semibold">Creating magic...</p>
                                        </div>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">{error}</div>
                            ) : result ? (
                                <img src={result} alt="Generated" className="w-full rounded-lg shadow-md" />
                            ) : (
                                <div className="text-center text-gray-500 p-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="mt-4">Your generated image will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGeneration;
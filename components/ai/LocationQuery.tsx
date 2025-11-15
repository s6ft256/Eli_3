
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const LocationQuery: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("What are some good Italian restaurants near me?");
    const [location, setLocation] = useState<{ latitude: number; longitude: number; } | null>(null);
    const [result, setResult] = useState<string>('');
    const [sources, setSources] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => {
                setError("Could not get location. Please enable location services in your browser.");
            }
        );
    }, []);

    const askQuestion = async () => {
        if (!prompt) {
            setError("Please enter a question.");
            return;
        }
        if (!location) {
            setError("Location not available. Please enable location services.");
            return;
        }

        setLoading(true);
        setError('');
        setResult('');
        setSources([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    tools: [{ googleMaps: {} }],
                    toolConfig: {
                        retrievalConfig: {
                            latLng: {
                                latitude: location.latitude,
                                longitude: location.longitude
                            }
                        }
                    }
                },
            });
            
            setResult(response.text);

            const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (groundingChunks) {
                setSources(groundingChunks);
            }

        } catch (e: any) {
            setError(e.message || "An error occurred while fetching the answer.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Location-based Q&A</h2>
            <p className="mb-6 text-gray-600">Ask a question about places, and get answers grounded in Google Maps data. Your current location will be used for context.</p>

            <div>
                <label htmlFor="prompt-loc" className="block text-lg font-medium text-gray-700 mb-2">Your Question</label>
                <textarea
                    id="prompt-loc"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Are there any parks nearby with playgrounds?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                    rows={3}
                />
                <button
                    onClick={askQuestion}
                    disabled={loading || !location}
                    className="w-full mt-4 bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition-colors"
                >
                    {loading ? 'Searching...' : 'Ask'}
                </button>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Answer</h3>
                <div className="bg-gray-50 p-4 rounded-lg min-h-[150px] border">
                    {loading && <div className="text-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div><p className="mt-2">Finding answers...</p></div>}
                    {error && <p className="text-red-500">{error}</p>}
                    {result && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }} />}
                    {sources.length > 0 && (
                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-700">Sources:</h4>
                            <ul className="list-disc list-inside mt-2">
                                {sources.map((chunk, index) => chunk.maps && (
                                     <li key={index}><a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">{chunk.maps.title}</a></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationQuery;

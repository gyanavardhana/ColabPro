import React, { useState } from 'react';
import { Send, Download, Loader2, AlertCircle } from 'lucide-react';

const AIProjectsPage = () => {
  const [textInput, setTextInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const analyzeText = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textInput })
      });
      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error(error);
      setError('An error occurred while analyzing the text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (analysisResult && analysisResult.generations && analysisResult.generations.length > 0) {
      const text = analysisResult.generations[0].text;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_response.txt';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12  min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">AI Text Analysis</h1>
      <p className="text-xl text-center text-gray-600 mb-12">Harness the power of AI to analyze and generate text</p>
      
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Input Text</h2>
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Enter text to analyze..."
        />
        <button
          className={`mt-4 flex items-center justify-center w-full py-3 px-4 rounded-lg text-white font-bold transition-colors duration-300 ${
            isLoading || !textInput
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={analyzeText}
          disabled={isLoading || !textInput}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="mr-2" />
              Analyze Text
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
          <div className="flex items-center">
            <AlertCircle className="mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Generated Text:</h2>
          <div className="overflow-auto max-h-96 border border-gray-300 rounded-lg p-4 bg-gray-50">
            <pre className="whitespace-pre-wrap">{analysisResult.generations[0].text}</pre>
          </div>
          <button
            className="mt-4 flex items-center justify-center w-full py-3 px-4 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-colors duration-300"
            onClick={handleDownload}
          >
            <Download className="mr-2" />
            Download Response
          </button>
        </div>
      )}
    </div>
  );
};

export default AIProjectsPage;
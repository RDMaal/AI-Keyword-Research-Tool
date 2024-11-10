import React, { useState } from 'react';
import { KeywordForm } from './components/KeywordForm';
import { ErrorMessage } from './components/ErrorMessage';
import { KeywordTable } from './components/KeywordTable';
import { fetchKeywords } from './services/api';
import type { Keyword } from './types';

function App() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!niche.trim()) {
      setError('Please enter a niche to search');
      return;
    }
    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchKeywords(niche, apiKey);
      setKeywords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Keyword Research Tool
          </h1>
          <p className="text-lg text-gray-600">
            Discover and analyze keywords for your niche with AI assistance
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <KeywordForm
            niche={niche}
            apiKey={apiKey}
            loading={loading}
            onNicheChange={setNiche}
            onApiKeyChange={setApiKey}
            onSubmit={handleSearch}
          />

          <ErrorMessage message={error} />

          {keywords.length > 0 && <KeywordTable keywords={keywords} />}
        </div>
      </div>
    </div>
  );
}

export default App;
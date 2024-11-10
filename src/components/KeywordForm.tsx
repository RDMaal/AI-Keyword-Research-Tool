import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface KeywordFormProps {
  niche: string;
  apiKey: string;
  loading: boolean;
  onNicheChange: (value: string) => void;
  onApiKeyChange: (value: string) => void;
  onSubmit: () => void;
}

export function KeywordForm({
  niche,
  apiKey,
  loading,
  onNicheChange,
  onApiKeyChange,
  onSubmit
}: KeywordFormProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
            OpenAI API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="sk-..."
          />
        </div>

        <div>
          <label htmlFor="niche" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Your Niche
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              id="niche"
              value={niche}
              onChange={(e) => onNicheChange(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., organic gardening"
            />
            <button
              onClick={onSubmit}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Search className="w-5 h-5 mr-2" />
              )}
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
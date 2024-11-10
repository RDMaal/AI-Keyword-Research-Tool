import React from 'react';
import { Settings, Server, Cloud } from 'lucide-react';
import type { AIConfig } from '../services/aiService';

interface Props {
  config: AIConfig;
  onConfigChange: (config: AIConfig) => void;
}

export default function AISettings({ config, onConfigChange }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showApiKey, setShowApiKey] = React.useState(false);

  const localModels = [
    'llama2',
    'mistral',
    'mixtral',
    'neural-chat',
    'codellama',
    'phi'
  ];

  const openaiModels = [
    'gpt-4-turbo-preview',
    'gpt-4',
    'gpt-3.5-turbo'
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Settings className="w-5 h-5" />
        <span>AI Settings</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-10 border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Provider
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="local"
                    checked={config.model === 'local'}
                    onChange={() =>
                      onConfigChange({ ...config, model: 'local' })
                    }
                    className="mr-2"
                  />
                  <Server className="w-4 h-4 mr-1" />
                  Local AI
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="openai"
                    checked={config.model === 'openai'}
                    onChange={() =>
                      onConfigChange({ ...config, model: 'openai' })
                    }
                    className="mr-2"
                  />
                  <Cloud className="w-4 h-4 mr-1" />
                  OpenAI
                </label>
              </div>
            </div>

            {config.model === 'local' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Local AI URL
                  </label>
                  <input
                    type="text"
                    value={config.localUrl}
                    onChange={(e) =>
                      onConfigChange({ ...config, localUrl: e.target.value })
                    }
                    placeholder="http://localhost:11434"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <select
                    value={config.localModel}
                    onChange={(e) =>
                      onConfigChange({ ...config, localModel: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {localModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {config.model === 'openai' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OpenAI API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={config.openaiKey}
                      onChange={(e) =>
                        onConfigChange({ ...config, openaiKey: e.target.value })
                      }
                      placeholder="sk-..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Your API key is stored locally and never sent to our servers
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <select
                    value={config.openaiModel}
                    onChange={(e) =>
                      onConfigChange({ ...config, openaiModel: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {openaiModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
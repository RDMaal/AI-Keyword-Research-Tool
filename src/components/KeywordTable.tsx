import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Download, Trademark, Filter } from 'lucide-react';
import type { Keyword } from '../types';

interface Props {
  keywords: Keyword[];
}

export default function KeywordTable({ keywords }: Props) {
  const [showBrandedOnly, setShowBrandedOnly] = useState(false);
  
  const filteredKeywords = showBrandedOnly 
    ? keywords.filter(k => k.isBranded)
    : keywords;

  const headers = [
    { label: 'Keyword', key: 'keyword' },
    { label: 'Search Volume', key: 'searchVolume' },
    { label: 'Difficulty', key: 'difficulty' },
    { label: 'Relevance', key: 'relevance' },
    { label: 'Branded', key: 'isBranded' },
    { label: 'Trademark Owner', key: 'trademark' },
  ];

  return (
    <div className="w-full">
      {keywords.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setShowBrandedOnly(!showBrandedOnly)}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
              showBrandedOnly 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            {showBrandedOnly ? 'Show All' : 'Show Branded Only'}
          </button>
          
          <CSVLink
            data={keywords}
            headers={headers}
            filename={'keyword-research.csv'}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to CSV
          </CSVLink>
        </div>
      )}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keyword
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Search Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Relevance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand Info
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredKeywords.map((keyword, idx) => (
              <tr key={idx} className={`hover:bg-gray-50 ${keyword.isBranded ? 'bg-blue-50' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    {keyword.keyword}
                    {keyword.isBranded && (
                      <Trademark className="w-4 h-4 ml-2 text-blue-600" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {keyword.searchVolume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${keyword.difficulty}%` }}
                      ></div>
                    </div>
                    <span className="ml-2">{keyword.difficulty}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {keyword.relevance}/10
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {keyword.isBranded && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {keyword.trademark || 'Branded Term'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
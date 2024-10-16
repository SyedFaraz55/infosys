import Image from 'next/image';
import React from 'react';

interface ProviderDetailsProps {
  apiData: {
    swaggerUrl: string;
    swaggerYamlUrl: string;
    openapiVer: string;
  };
  info: {
    'x-logo'?: {
      url: string;
    };
    title: string;
    description: string;
    version: string;
    'x-providerName': string;
    'x-serviceName': string;
    'x-apisguru-categories'?: string[];
    contact?: {
      name?: string;
      email?: string;
      url?: string;
      'x-twitter'?: string;
    };
  };
}


const ProviderDetails: React.FC<ProviderDetailsProps> = ({apiData, info}) => {
  return (
    <div className="bg-slate-800 min-h-screen text-white p-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        {info['x-logo'] && (
          <Image
            src={info['x-logo'].url}
            alt={`${info.title} logo`}
            width={64}
            height={64}
            className="mr-4 rounded"
          />
        )}
        <h1 className="text-3xl font-bold">{info.title}</h1>
      </div>

      <div className="bg-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p>{info.description}</p>
      </div>

      <div className="bg-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Details</h2>
        <ul className="space-y-2">
          <li><strong>Version:</strong> {info.version}</li>
          <li><strong>Provider:</strong> {info['x-providerName']}</li>
          <li><strong>Service:</strong> {info['x-serviceName']}</li>
          <li><strong>Categories:</strong> {info['x-apisguru-categories']?.join(', ')}</li>
        </ul>
      </div>

      <div className="bg-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <ul className="space-y-2">
          <li><strong>Name:</strong> {info.contact?.name}</li>
          <li><strong>Email:</strong> <a href={`mailto:${info.contact?.email}`} className="text-blue-400 hover:underline">{info.contact?.email}</a></li>
          <li><strong>URL:</strong> <a href={info.contact?.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{info.contact?.url}</a></li>
          {info.contact?.['x-twitter'] && (
            <li><strong>Twitter:</strong> <a href={`https://twitter.com/${info.contact['x-twitter']}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@{info.contact['x-twitter']}</a></li>
          )}
        </ul>
      </div>

      <div className="bg-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">API Specification</h2>
        <ul className="space-y-2">
          <li><strong>Swagger URL:</strong> <a href={apiData.swaggerUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAPI JSON</a></li>
          <li><strong>Swagger YAML URL:</strong> <a href={apiData.swaggerYamlUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAPI YAML</a></li>
          <li><strong>OpenAPI Version:</strong> {apiData.openapiVer}</li>
        </ul>
      </div>
    </div>
  </div> 
  );
};

export default ProviderDetails;

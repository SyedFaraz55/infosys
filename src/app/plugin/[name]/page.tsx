import React from 'react';
import { notFound } from 'next/navigation';
import axios from 'axios';
import ProviderDetails from '@/app/Components/ProviderDetails';

async function getPluginData(name: string) {
    const res = await axios.get(`https://api.apis.guru/v2/${name}.json`);
    return res.data.apis
}

export default async function PluginDetailPage({ params }: { params: { name: string } }) {
    let providerData;
    try {
        providerData = await getPluginData(params.name);
    } catch (error) {
        console.error('Error fetching plugin data:', error);
        notFound();
    }

    // The structure has changed, so we need to extract the correct data
    const apis = Object.values(providerData);
    if (apis.length === 0) {
        notFound();
    }

    // We'll use the first API in the list (you might want to handle multiple APIs differently)
    const apiData = apis[0];
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const { info  } = apiData as any;

    
    return (
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        <ProviderDetails apiData={apiData as any} info={info} />
    );
}
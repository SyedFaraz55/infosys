'use client';

import { useEffect, useState } from 'react';
import Drawer from './Components/Drawer';
import Button from './Components/Button';


export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // To get the list of providers
        const apiResponse = await fetch('/api/proxy');
        const { data } = await apiResponse.json();
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      {loading ? <div>loading plugins...</div> :  <Button onClick={toggleDrawer} />}
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} data={data} error={error} loading={loading} />
    </main> 
  );
}

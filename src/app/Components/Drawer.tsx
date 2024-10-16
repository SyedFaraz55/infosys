import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: string[];
  error: string;
  loading: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  data,
  error,
  loading,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const router = useRouter();

  useEffect(() => {
    setFilteredData(
      data.filter((item: string) =>
        item.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, data]);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handlePluginClick = (pluginName: string) => {
    router.push(`/plugin/${encodeURIComponent(pluginName)}`);
    if (onClose) onClose(); // Close the drawer after navigation
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`fixed top-0 right-0 w-64 bg-gray-900 text-white h-full transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}
    >
      <h1 className="text-white text-2xl text-center mt-5">Select Provider</h1>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search providers..."
            className="w-full bg-gray-800 text-white p-2 pl-8 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-2 top-3 text-gray-400" />
        </div>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="flex-grow overflow-y-auto">
          {filteredData?.map((name, index) => (
            <div key={index} className="p-4 border-b border-gray-700">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleAccordionClick(index)}
              >
                <span className="truncate">{name}</span>
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {activeIndex === index && (
                <div className="mt-2">
                  <p className="text-gray-400 text-sm">
                    Description about {name}
                  </p>
                  <button
                    onClick={() => handlePluginClick(name)}
                    className="text-blue-500 hover:underline"
                  >
                    Learn more
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Drawer;

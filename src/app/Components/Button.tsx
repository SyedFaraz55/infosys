import { FiMenu } from 'react-icons/fi';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      <FiMenu className="mr-2" /> Explore Web APIs
    </button>
  );
};

export default Button;

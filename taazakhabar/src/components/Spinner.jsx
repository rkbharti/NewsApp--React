import loading from './loading.gif';

const Spinner = ({ className = "my-3" }) => {
  return (
    <div className={`text-center ${className}`}>
      <img 
        src={loading} 
        alt="Loading..." 
        style={{ width: '50px', height: '50px' }}
      />
    </div>
  );
};

export default Spinner;
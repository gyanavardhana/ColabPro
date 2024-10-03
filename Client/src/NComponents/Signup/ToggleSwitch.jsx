import React from 'react';

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div className={`w-14 h-7 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ease-in-out ${checked ? 'bg-blue-500' : ''}`}></div>
        <div className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ease-in-out ${checked ? 'transform translate-x-8' : 'transform translate-x-1'}`} style={{ top: '4px' }}></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
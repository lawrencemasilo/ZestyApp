import React, { useState, useRef, useEffect } from 'react';

const Popover = ({ 
  children, 
  content, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>
      
      {isOpen && (
        <div className={`absolute right-0 mt-2 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${className}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
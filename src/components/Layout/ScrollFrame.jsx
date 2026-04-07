import React from 'react';

const ScrollFrame = ({ children }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Top Roller */}
      <div className="relative z-30 w-[105%] h-8 bg-[#4e342e] rounded-full shadow-xl border-b border-[#3e2723] flex justify-between items-center px-4">
        <div className="w-6 h-10 bg-[#2d1b18] -ml-5 rounded shadow-inner"></div>
        <div className="w-6 h-10 bg-[#2d1b18] -mr-5 rounded shadow-inner"></div>
      </div>

      {/* Parchment Body */}
      <div className="relative z-20 w-full h-full bg-[#f4e4bc] shadow-2xl flex flex-col overflow-hidden border-x-[12px] border-[#8b0000] border-double">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </div>

      {/* Bottom Roller */}
      <div className="relative z-30 w-[105%] h-8 bg-[#4e342e] rounded-full shadow-xl border-t border-[#3e2723] flex justify-between items-center px-4 -mt-1">
        <div className="w-6 h-10 bg-[#2d1b18] -ml-5 rounded shadow-inner"></div>
        <div className="w-6 h-10 bg-[#2d1b18] -mr-5 rounded shadow-inner"></div>
      </div>
    </div>
  );
};

export default ScrollFrame;
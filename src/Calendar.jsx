import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  {
    name: 'Forest', 
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    primary: 'bg-[#3e936b]', 
    primaryHover: 'hover:bg-[#2d7051]',
    text: 'text-[#3e936b]',
    lightBg: 'bg-[#eef8f3]',
    lightBorder: 'border-[#c6e8d6]',
  },
  {
    name: 'Glacier',
    img: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80',
    primary: 'bg-[#1a90d9]', 
    primaryHover: 'hover:bg-[#1578b8]',
    text: 'text-[#1a90d9]',
    lightBg: 'bg-[#e8f4fa]',
    lightBorder: 'border-[#bfe0f2]',
  },
  {
    name: 'Canyon',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    primary: 'bg-orange-500',
    primaryHover: 'hover:bg-orange-600',
    text: 'text-orange-500',
    lightBg: 'bg-orange-50',
    lightBorder: 'border-orange-100',
  }
];

const INDIAN_HOLIDAYS = {
  '01-26': 'Republic Day',
  '05-01': 'Labour Day',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanti',
  '12-25': 'Christmas Day'
};

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 30 : -30, opacity: 0 })
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 12, 1)); 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [direction, setDirection] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const [notes, setNotes] = useState({}); 

  const currentTheme = THEMES[themeIndex];

  const formatMonth = (date) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const formatFullDate = (date) => date ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date) : '';
  const isSameDay = (d1, d2) => d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  const isWithinRange = (date, start, end) => start && end && date > start && date < end;
  const toISODate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const toHolidayKey = (date) => `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-notes-final');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar-notes-final', JSON.stringify(notes));
  }, [notes]);

  const activeKey = startDate ? (endDate ? `${toISODate(startDate)}|${toISODate(endDate)}` : toISODate(startDate)) : 'general';
  const activeTitle = startDate ? `${formatFullDate(startDate)}${endDate ? ' - ' + formatFullDate(endDate) : ''}` : 'General Memos';

  const getDaysInGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    let startOffset = firstDayOfMonth.getDay(); 
    startOffset = startOffset === 0 ? 6 : startOffset - 1; 
    const days = [];
    const firstGridDate = new Date(year, month, 1 - startOffset);
    for (let i = 0; i < 42; i++) {
      const d = new Date(firstGridDate);
      d.setDate(firstGridDate.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day < startDate) {
      setStartDate(day);
    } else {
      setEndDate(day);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-2 sm:p-4 md:p-8 font-sans selection:bg-gray-200">
      <div className="bg-white rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-visible w-full max-w-[360px] md:max-w-[750px] flex flex-col relative mt-6 border-none mx-auto">
        
        <div className="absolute -top-4 left-0 w-full flex justify-evenly z-30 px-6 md:px-10 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div key={i} className={`relative flex-col items-center ${i >= 10 ? 'hidden md:flex' : 'flex'}`}>
              <div className="w-1.5 h-8 bg-linear-to-b from-gray-400 via-gray-500 to-gray-700 rounded-full shadow z-20"></div>
              <div className="w-3.5 h-3.5 bg-[#f8f9fa] rounded-full absolute top-[18px] shadow-inner z-10"></div>
            </div>
          ))}
        </div>

        <div className="relative h-[220px] md:h-[280px] w-full overflow-hidden rounded-t-lg group z-10 bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentTheme.img}
              src={currentTheme.img} 
              alt="Theme" 
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <button onClick={() => setThemeIndex((themeIndex + 1) % THEMES.length)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 z-30 shrink-0"><ImageIcon size={20} /></button>

          <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
             <svg viewBox="0 0 1000 150" preserveAspectRatio="none" className="w-full h-[100px] md:h-[140px] block">
                <path d="M0,60 L400,150 L1000,20 L1000,150 L0,150 Z" className={`${currentTheme.text} fill-current`} opacity="0.95" />
                <path d="M0,150 L400,150 L1000,100 L1000,150 Z" fill="white" />
             </svg>
          </div>

          <div className="absolute bottom-6 md:bottom-10 right-4 md:right-8 text-right z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-white">
            <h2 className="text-lg md:text-2xl font-light tracking-wider leading-none opacity-90">{currentDate.getFullYear()}</h2>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-widest uppercase mt-1 md:mt-0.5">{formatMonth(currentDate)}</h1>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row p-6 md:p-10 gap-8 bg-white rounded-b-lg">
          <div className="w-full md:w-[40%] flex flex-col h-[280px] md:h-[350px]">
            <div className="h-10 md:h-12 border-b border-gray-200 flex justify-between items-end pb-2 mb-2 shrink-0">
               <span className="text-[10px] md:text-[11px] font-bold text-gray-800 uppercase tracking-widest leading-none">{activeTitle}</span>
               {startDate && <button onClick={() => { setStartDate(null); setEndDate(null); }} className={`text-[10px] ${currentTheme.text} font-bold`}>Clear</button>}
            </div>
            <textarea
              style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)', lineHeight: '32px' }}
              className="w-full grow p-0 resize-none bg-transparent italic text-gray-600 outline-none text-[13px] md:text-[14px] pt-[6px]"
              placeholder={activeKey === 'general' ? "Write general memos..." : "Write specific notes..."}
              value={notes[activeKey] || ''}
              onChange={(e) => setNotes({ ...notes, [activeKey]: e.target.value })}
            />
          </div>

          <div className="w-full md:w-[60%] flex flex-col h-[300px] md:h-[350px]">
            <div className="flex justify-between items-center mb-4 md:mb-6 h-8 shrink-0 text-gray-800">
              <button onClick={handlePrevMonth} className="shrink-0"><ChevronLeft size={20} /></button>
              <span className="font-bold text-base md:text-lg">{formatMonth(currentDate)} {currentDate.getFullYear()}</span>
              <button onClick={handleNextMonth} className="shrink-0"><ChevronRight size={20} /></button>
            </div>

            <div className="grid grid-cols-7 mb-2 shrink-0">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className={`text-center text-[9px] md:text-[10px] font-extrabold tracking-widest ${day === 'SAT' || day === 'SUN' ? currentTheme.text : 'text-gray-400'}`}>{day}</div>
              ))}
            </div>

            <div className="relative grow h-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={currentDate.getMonth()} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: "easeInOut" }} className="grid grid-cols-7 gap-y-1 content-start">
                  {getDaysInGrid().map((day, idx) => {
                    const isCurrent = day.getMonth() === currentDate.getMonth();
                    const isStart = isSameDay(day, startDate);
                    const isEnd = isSameDay(day, endDate);
                    const inRange = isWithinRange(day, startDate, endDate);
                    const holiday = INDIAN_HOLIDAYS[toHolidayKey(day)];

                    return (
                      <div key={idx} className={`flex justify-center items-center h-8 md:h-10 relative group ${isCurrent ? 'cursor-pointer' : 'cursor-default'}`} onClick={() => isCurrent && handleDateClick(day)}>
                        {inRange && <div className={`absolute inset-0 ${currentTheme.lightBg} transition-colors duration-300`}></div>}
                        {isStart && endDate && <div className={`absolute right-0 w-1/2 h-full ${currentTheme.lightBg} transition-colors duration-300`}></div>}
                        {isEnd && startDate && <div className={`absolute left-0 w-1/2 h-full ${currentTheme.lightBg} transition-colors duration-300`}></div>}
                        
                        <button disabled={!isCurrent} className={`z-10 w-7 h-7 md:w-8 md:h-8 flex flex-col items-center justify-center rounded-full text-[12px] md:text-[13px] font-semibold transition-all relative
                          ${!isCurrent ? 'text-gray-300 bg-transparent' : 'text-gray-700 hover:bg-gray-100'}
                          ${(isStart || isEnd) ? `${currentTheme.primary} text-white shadow-md` : ''}`}>
                          <span className="leading-none">{day.getDate()}</span>
                          {holiday && isCurrent && !isStart && !isEnd && <span className={`w-1 h-1 rounded-full mt-[2px] ${currentTheme.primary}`}></span>}
                        </button>

                        {holiday && isCurrent && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                            {holiday}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
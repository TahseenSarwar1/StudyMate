import { useMemo, useState } from 'react';

export default function Heatmap({ data = [], title = 'Study Activity' }) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Group data by week columns
  const weeks = useMemo(() => {
    const cols = [];
    let currentWeek = [];
    
    // Sort data chronologically to be sure
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedData.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === sortedData.length - 1) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    });

    return cols;
  }, [data]);

  // Color mapping based on activity count
  const getColorClass = (count) => {
    if (count === 0) return 'bg-surface-100';
    if (count === 1) return 'bg-primary-100';
    if (count === 2) return 'bg-primary-200';
    if (count === 3) return 'bg-primary-400';
    return 'bg-primary-600';
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Position tooltip slightly above the cursor relative to the card container
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 40,
    });
  };

  // Find month change locations for labels
  const monthLabels = useMemo(() => {
    const labels = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    weeks.forEach((week, weekIndex) => {
      if (week[0]) {
        const dateObj = new Date(week[0].date);
        const monthName = months[dateObj.getMonth()];
        const dayOfMonth = dateObj.getDate();
        
        // Show month label if week starts near the beginning of the month (1st to 7th day)
        if (dayOfMonth <= 7 && !labels.some(l => l.text === monthName)) {
          labels.push({ text: monthName, index: weekIndex });
        }
      }
    });
    
    return labels;
  }, [weeks]);

  // Total active days count
  const totalActiveDays = useMemo(() => {
    return data.filter(day => day.count > 0).length;
  }, [data]);

  return (
    <div className="glass-card p-5 relative select-none">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-sm font-bold text-surface-800 uppercase tracking-wider">{title}</h4>
          <p className="text-xs text-surface-400 mt-0.5">{totalActiveDays} active study days in the past year</p>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-surface-400">
          <span>Less</span>
          <span className="w-3 h-3 rounded-sm bg-surface-100" />
          <span className="w-3 h-3 rounded-sm bg-primary-100" />
          <span className="w-3 h-3 rounded-sm bg-primary-200" />
          <span className="w-3 h-3 rounded-sm bg-primary-400" />
          <span className="w-3 h-3 rounded-sm bg-primary-600" />
          <span>More</span>
        </div>
      </div>

      <div 
        className="relative overflow-x-auto scrollbar-thin pb-2"
        onMouseMove={handleMouseMove}
      >
        {/* Render tooltip if hovered */}
        {hoveredCell && (
          <div
            style={{
              position: 'absolute',
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              transform: 'translateX(-50%)',
            }}
            className="z-10 bg-surface-900 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black pointer-events-none shadow-lg whitespace-nowrap border border-surface-700 leading-none"
          >
            {hoveredCell.count === 0 ? 'No study sessions' : `${hoveredCell.count} sessions`} on {new Date(hoveredCell.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )}

        <div className="flex min-w-[700px]">
          {/* Day Names Column */}
          <div className="flex flex-col justify-between pr-3 text-[9px] font-bold text-surface-400 uppercase h-[100px] mt-4 select-none">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid Layout Container */}
          <div className="flex-1 flex flex-col">
            {/* Months labels row */}
            <div className="relative h-4 text-[9px] font-bold text-surface-400 uppercase mb-1">
              {monthLabels.map((lbl, idx) => (
                <span
                  key={idx}
                  style={{ left: `${lbl.index * 14}px` }}
                  className="absolute"
                >
                  {lbl.text}
                </span>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-[2px]">
              {weeks.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-[2px]">
                  {week.map((day, dIndex) => (
                    <div
                      key={dIndex}
                      onMouseEnter={() => setHoveredCell(day)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-[12px] h-[12px] rounded-[2px] transition-colors duration-150 cursor-pointer ${getColorClass(day.count)} hover:ring-2 hover:ring-primary-500 hover:scale-115 hover:z-10`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

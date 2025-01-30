import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePick() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [menuItems, setMenuItems] = useState([]);

  const defaultMeals = {
    'Monday': 'Rice',
    'Tuesday': 'Tuna Steak',
    'Wednesday': 'Pasta',
    'Thursday': 'Seafood',
    'Friday': 'Kebab', 
  };

  const generateMenu = () => {
    const menu = [];
    const currentDate = new Date(startDate);
    const endDateTime = new Date(endDate);

    while (currentDate <= endDateTime) {
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayName)) {
        menu.push({
          day: dayName,
          date: new Date(currentDate),
          meal: defaultMeals[dayName]
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setMenuItems(menu);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 mt-[50px]">Schedule A Menu</h1>
      
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-12">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 text-lg">From</label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="dd-MM-yyyy"
              className="bg-darkpink text-white rounded-lg px-6 py-3 text-center w-48"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 text-lg">To</label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              dateFormat="dd-MM-yyyy"
              className="bg-darkpink text-white rounded-lg px-6 py-3 text-center w-48"
            />
          </div>
        </div>

        <button
          onClick={generateMenu}
          className="bg-buttons text-white px-8 py-3 rounded-lg text-lg mb-12"
        >
          Generate Menu
        </button>

        <div className="grid grid-cols-3 gap-1 w-full">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-lightpink p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{item.day}</h3>
              </div>
              <p className="text-xl text-center">{item.meal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
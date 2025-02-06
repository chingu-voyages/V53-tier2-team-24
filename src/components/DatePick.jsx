import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePick() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [menuItems, setMenuItems] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [daysOff, setDaysOff] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch('https://menus-api.vercel.app/dishes');
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const getRandomDish = (usedDishes) => {
    const availableDishes = dishes.filter(dish => !usedDishes.includes(dish.name));
    return availableDishes[Math.floor(Math.random() * availableDishes.length)];
  };

  // const defaultMeals = {
  //   'Monday': 'Rice',
  //   'Tuesday': 'Tuna Steak',
  //   'Wednesday': 'Pasta',
  //   'Thursday': 'Seafood',
  //   'Friday': 'Kebab', 
  // };

  const generateMenu = () => {
    const menu = [];
    const currentDate = new Date(startDate);
    const endDateTime = new Date(endDate);
    const usedDishes = [];

    while (currentDate <= endDateTime) {
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayName)&& !daysOff.includes(dayName)) {
        const dish = getRandomDish(usedDishes);
        if (dish) {
        menu.push({
          day: dayName,
          date: new Date(currentDate),
          meal: dish.name,
          ingredients: dish.ingredients,
          calories: dish.calories
        });
        usedDishes.push(dish.name);
      }
    }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setMenuItems(menu);
  };

  const toggleDayOff = (day) => {
    setDaysOff(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  useEffect(() => {
    const today = new Date();
  
    const daysUntilMonday = (7 - today.getDay() + 1) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() + daysUntilMonday);
  
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4); 
  
    setStartDate(monday);
    setEndDate(friday);
    fetchDishes();
  }, []);
  

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
            className="bg-darkPink text-white rounded-lg px-6 py-3 text-center w-48"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 text-lg">To</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="dd-MM-yyyy"
            className="bg-darkPink text-white rounded-lg px-6 py-3 text-center w-48"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
          <button
            key={day}
            onClick={() => toggleDayOff(day)}
            className={`px-4 py-2 rounded ${daysOff.includes(day) ? 'bg-red-500' : 'bg-green-500'} text-white`}
          >
            {day}
          </button>
        ))}
      </div>

      <button
        onClick={generateMenu}
        className="bg-buttons text-white px-8 py-3 rounded-lg text-lg mb-12 hover:bg-buttonsHover"
      >
        Generate Menu
      </button>

      <div className="grid grid-cols-3 gap-4 w-full">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-lightpink p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{item.day}</h3>
              <p>{item.date.toLocaleDateString()}</p>
            </div>
            <p className="text-xl text-center mb-2">{item.meal}</p>
            <p className="text-sm">Ingredients: {item.ingredients.join(', ')}</p>
            <p className="text-sm">Calories: {item.calories}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
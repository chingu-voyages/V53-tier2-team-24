import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function DatePick() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [menuItems, setMenuItems] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [daysOff, setDaysOff] = useState([]);
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    fetchDishes();
    fetchAllergens();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch('https://menus-api.vercel.app/dishes');
      const data = await response.json();

      // const first10Dishes = data.slice(0, 5); //testing the API(ingredients against allergens)
      setDishes(data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const fetchAllergens = () => {
    const savedData = localStorage.getItem("allergenForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData)) {
        setAllergens(parsedData.map(item => item.allergen.toLowerCase())); // Store allergens in lowercase for comparison
      } else {
        setAllergens([parsedData.allergen.toLowerCase()]);
      }
    }
  };

  const getRandomDish = (usedDishes) => {
    const availableDishes = dishes.filter(dish => {
      //!usedDishes.includes(dish.name));
      const dishContainsAllergen = dish.ingredients.some(ingredient =>
        allergens.includes(ingredient.toLowerCase()) 
      );
      return !usedDishes.includes(dish.name) && !dishContainsAllergen;
    })
    return availableDishes[Math.floor(Math.random() * availableDishes.length)];
  };

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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Week Menu", 20, 10);
    const tableColumn = ["Day", "Meal", "Ingredients", "Calories"];
    const tableRows = [];

    menuItems.forEach(item => {
      const rowData = [item.day, item.meal, item.ingredients, item.calories];
      tableRows.push(rowData);
    });

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20, headStyles: { fillColor: [255, 128, 128] } });
    doc.save("menu.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(menuItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Menu");
    XLSX.writeFile(workbook, "GeneratedMenu.xlsx");
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
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center my-8">Schedule A Menu</h1>
    
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-12">
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 text-lg">From</label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="dd-MM-yyyy"
            className="bg-darkPink text-white rounded-lg px-6 py-2 md:px-8 md:py-3 text-center w-48"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-800 mb-2 text-lg">To</label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="dd-MM-yyyy"
            className="bg-darkPink text-white rounded-lg px-6 py-2 md:px-8 md:py-3 text-center w-48"
          />
        </div>
      </div>

      <h1 className="text-gray-800">Day off?</h1>
<div className="flex flex-wrap gap-2 mb-4">
  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
    <button
      key={day}
      onClick={() => toggleDayOff(day)}
      className={`px-3 py-2 rounded text-sm sm:text-base sm:px-4 sm:py-2 ${
        daysOff.includes(day) ? 'bg-red-500 text-white' : 'bg-white text-black border border-gray-300 hover:bg-red-100'
      } transition-colors`}
    >
      {day}
    </button>
  ))}
</div>

      <button
        onClick={generateMenu}
        className="bg-buttons text-white px-6 py-2 md:px-8 md:py-3 rounded-lg text-md md:text-lg mb-12 hover:bg-buttonsHover"
      >
        Generate Menu
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-lightPink p-4 sm:p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold">{item.day}</h3>
              <p className="text-sm sm:text-base">{item.date.toLocaleDateString()}</p>
            </div>
            <p className="text-lg sm:text-xl text-center mb-2">{item.meal}</p>
            <p className="text-xs sm:text-sm">Ingredients: {item.ingredients.join(', ')}</p>
            <p className="text-xs sm:text-sm">Calories: {item.calories}</p>
          </div>
        ))}
      </div>

      {menuItems.length > 0 && (
        <div className="flex item-center gap-4 md:gap-12">
          <button
            onClick={exportToPDF}
            className="bg-buttons text-white px-6 py-2 md:px-8 md:py-3 rounded-lg text-md md:text-lg mb-12 hover:bg-buttonsHover"
          >
            Export as PDF
          </button>
          <button
          onClick={exportToExcel}
          className="bg-buttons text-white px-6 py-2 md:px-8 md:py-3 rounded-lg text-md md:text-lg mb-12 hover:bg-buttonsHover"
        >
          Export as Excel
        </button>
        </div>
        )}
    </div>
  </div>
);
}
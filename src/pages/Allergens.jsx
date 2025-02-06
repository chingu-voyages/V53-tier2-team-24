import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const Allergens = () =>
  {
    const tableHeaders = ["id", "Employee Name", "Allergy Type", "Allergen", "Note/Comment", " "];

    const [formData, setFormData] = useState({
      id: Date.now().toString(),
      employeeName: "",
      allergyType: "",
      allergen: "",
      note: "",
    });
    const [savedData, setSavedData] = useState([]);
    console.log(savedData);


    useEffect(() => {
      const data = localStorage.getItem("allergenForm");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setSavedData(parsedData);
        } else {
          setSavedData([parsedData]); 
        }
      } else {
        setSavedData([]);
      }
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        return updatedData;
      });
    };

    function handleSubmit() {
      const updatedData = savedData ? [...savedData, formData] : [formData];
      localStorage.setItem("allergenForm", JSON.stringify(updatedData));
      console.log(updatedData);
    }

    const deleteAllergen = (id) => {
      const updatedData = savedData.filter((item) => item.id !== id);
      setSavedData(updatedData);
      localStorage.setItem("allergenForm", JSON.stringify(updatedData));
    };

  
    return (
      <div className="flex flex-col  justify-center items-center px-4 md:px-28 pt-16">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-800 text-center my-8">Allergens List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-background">
              <thead>
                <tr className="bg-darkPink text-white">
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="py-2 px-4 font-semibold border border-background">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {savedData && savedData.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-lightPink text-gray-800" : "bg-darkPink text-white"}>
                  <td className="text-center py-2 px-4 border border-background">{row.id}</td>
                  <td className="text-center py-2 px-4 border border-background">{row.employeeName}</td>
                  <td className="text-center py-2 px-4 border border-background">{row.allergyType}</td>
                  <td className="text-center py-2 px-4 border border-background">{row.allergen}</td>
                  <td className="text-center py-2 px-4 border border-background">{row.note}</td>
                  <td className="text-center py-2 px-4 border border-background">
                    <button onClick={() => deleteAllergen(row.id)} className={rowIndex % 2 === 0 ? "text-gray-800 hover:text-red-800" : "text-white hover:text-red-800"}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-20 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Allergen</h2>
        <form className="flex flex-col text-gray-800">

          <div className="mb-4">
            <label className="block font-semibold mb-1">Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-lightPink focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1">Allergy Type</label>
              <input
                type="text"
                name="allergyType"
                value={formData.allergyType}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-lightPink focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Allergen</label>
              <input
                type="text"
                name="allergen"
                value={formData.allergen}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-lightPink focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">Note/comment</label>
            <textarea
              rows="3"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-lightPink focus:outline-none"
            ></textarea>
          </div>
          <button 
          onClick={handleSubmit}
          className="bg-buttons text-white px-8 py-3 rounded-lg text-lg mb-12 self-center hover:bg-buttonsHover">
            Add Allergen
          </button>
        </form>
        
      </div>
      </div>
    );
};

export default Allergens;

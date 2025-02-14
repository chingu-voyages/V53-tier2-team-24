import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const Allergens = () => {
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
    const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const data = localStorage.getItem("allergenForm");
    if (data) {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        setSavedData(parsedData);
      } else {
        setSavedData([parsedData]);
      }
    }}, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        return updatedData;
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.employeeName || !formData.allergen) {
        setShowModal(true);
        return;
      }

    const updatedData = [formData, ...savedData ];
    setSavedData(updatedData);
    localStorage.setItem("allergenForm", JSON.stringify(updatedData));

    setFormData({
      id: Date.now().toString(),
      employeeName: "",
      allergyType: "",
      allergen: "",
      note: "",
    });
    };

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
          <div className="min-w-[600px]">
            <table className="w-full border-collapse border border-background">
              <thead>
                <tr className="bg-darkPink text-white">
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="py-2 px-4 font-semibold border border-background whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {savedData && savedData.length > 0 ? (
                  savedData.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-lightPink text-gray-800" : "bg-darkPink text-white"}>
                      <td className="text-center py-2 px-4 border border-background whitespace-nowrap">{row.id}</td>
                      <td className="text-center py-2 px-4 border border-background whitespace-nowrap">{row.employeeName}</td>
                      <td className="text-center py-2 px-4 border border-background whitespace-nowrap">{row.allergyType}</td>
                      <td className="text-center py-2 px-4 border border-background whitespace-nowrap">{row.allergen}</td>
                      <td className="text-center py-2 px-4 border border-background whitespace-nowrap">{row.note}</td>
                      <td className="text-center py-2 px-4 border border-background whitespace-nowrap">
                        <button
                          onClick={() => deleteAllergen(row.id)}
                          className={rowIndex % 2 === 0 ? "text-gray-800 hover:text-red-800" : "text-white hover:text-red-800"}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={tableHeaders.length} className="text-center py-4 text-gray-600 italic bg-lightPink">
                      No allergens added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-20 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Allergen</h2>
        <form className="flex flex-col text-gray-800">

          <div className="mb-4">
            <label className="block font-semibold mb-1">Employee Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-lightPink focus:outline-none"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 md:grid-rows-1 sm:grid-rows-2 sm:grid-cols-1 gap-4 mb-4">
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
              <label className="block font-semibold mb-1">Allergen <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="allergen"
                value={formData.allergen}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-lightPink focus:outline-none"
                required
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

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center">Error</h3>
            <p className="text-center my-4">Fill out all of the required fields in order to submit the form</p>
            <button
              onClick={closeModal}
              className="bg-buttons text-white px-6 py-2 rounded-md mt-4 hover:bg-buttonsHover"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    );
};

export default Allergens;

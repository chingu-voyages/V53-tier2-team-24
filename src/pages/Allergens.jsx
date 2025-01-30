const Allergens = () =>
  {
    const tableHeaders = ["id", "Employee Name", "Allergy Type", "Allergen", "Note/Comment"];
    const tableData = Array(5).fill(["1", "some name", "type1", "something", "some text"]);
  
    return (
      <div className="flex justify-center items-center px-4 md:px-28 pt-16">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-4">Allergens List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-background">
              <thead>
                <tr className="bg-red-300 text-white">
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="py-2 px-4 border border-background">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-red-100 text-black" : "bg-red-300 text-white"}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 px-4 border border-background">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default Allergens;

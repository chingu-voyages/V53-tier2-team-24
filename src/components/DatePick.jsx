import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePick({ startDate, endDate, setStartDate, setEndDate }) {

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
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
  );
}
import  { useState } from 'react';

export default function CheckPrinter() {
  const [checkData, setCheckData] = useState({
    date: new Date().toLocaleDateString('en-US'),
    payee: '',
    amountNumber: '',
    amountWords: '',
    memo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      {/* Control Panel / Input Form (Hidden during print) */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8 print:hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Bank Check Printing System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              name="date"
              value={checkData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="MM/DD/YYYY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              name="amountNumber"
              value={checkData.amountNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., 1250.50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pay to the Order Of</label>
            <input
              type="text"
              name="payee"
              value={checkData.payee}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Payee Name"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount in Words</label>
            <input
              type="text"
              name="amountWords"
              value={checkData.amountWords}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="One Thousand Two Hundred Fifty and 50/100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Memo</label>
            <input
              type="text"
              name="memo"
              value={checkData.memo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Invoice #1234"
            />
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
        >
          Print Check
        </button>
      </div>

      {/* Check Preview & Printable Area */}
      <div className="max-w-4xl mx-auto flex justify-center">
        {/* Standard US Check size is roughly 6" x 2.75". 
          Using Tailwind's arbitrary values to approximate dimensions (w-[6in] h-[2.75in]).
          'print:absolute print:top-0 print:left-0' ensures precise placement when printing.
        */}
        <div className="w-[6.0in] h-[2.75in] bg-cyan-50 border border-cyan-200 rounded-lg shadow-sm p-4 relative font-serif text-gray-800 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:16px_16px] print:shadow-none print:border-0 print:bg-white print:m-0">
          
          {/* Top Row: Fake Bank Info & Date */}
          <div className="flex justify-between items-start text-xs">
            <div>
              <p className="font-bold uppercase tracking-wide text-[10px]">Apex Global Bank</p>
              <p className="text-[9px] text-gray-500 print:hidden">123 Financial Way, NYC</p>
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-[10px] uppercase font-sans">Date:</span>
              <span className="border-b border-gray-600 px-2 min-w-[80px] text-center font-sans text-sm">
                {checkData.date}
              </span>
            </div>
          </div>

          {/* Middle Row: Payee and Numeric Amount */}
          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-end flex-grow mr-4">
              <span className="text-[10px] uppercase font-sans whitespace-nowrap mr-2">Pay To The Order Of:</span>
              <span className="border-b border-gray-600 flex-grow px-2 font-bold text-sm italic tracking-wide h-6">
                {checkData.payee}
              </span>
            </div>
            <div className="flex items-center border border-gray-400 bg-white px-2 py-1 min-w-[110px] h-7 font-sans font-bold">
              <span>$</span>
              <span className="text-right w-full">{checkData.amountNumber}</span>
            </div>
          </div>

          {/* Amount in Words Row */}
          <div className="mt-3 flex items-end">
            <span className="border-b border-gray-600 flex-grow px-2 font-medium text-xs italic h-5">
              {checkData.amountWords}
            </span>
            <span className="text-[10px] uppercase font-sans ml-2 whitespace-nowrap">Dollars</span>
          </div>

          {/* Bottom Row: Memo, Signature Line & MICR Encoding */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex items-end w-5/12">
              <span className="text-[9px] uppercase font-sans mr-1">Memo:</span>
              <span className="border-b border-gray-600 flex-grow px-1 text-xs h-4">
                {checkData.memo}
              </span>
            </div>
            
            {/* Fake MICR Routing/Account Numbers at the bottom */}
            <div className="text-center font-mono text-[11px] tracking-[3px] text-gray-700 mx-2">
              ⑆123456789⑈  000123456789⑈ 0101
            </div>

            <div className="w-4/12 flex flex-col items-center">
              <div className="w-full border-b border-gray-600 h-6"></div>
              <span className="text-[8px] uppercase font-sans mt-0.5">Authorized Signature</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
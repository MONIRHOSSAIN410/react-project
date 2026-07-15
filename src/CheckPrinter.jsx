import React, { useState } from 'react';

// List of supported banks with distinct themes and details
const BANKS = [
  {
    id: 'chase',
    name: 'Chase Bank',
    address: '270 Park Ave, New York, NY 10017',
    colorTheme: 'bg-blue-50 border-blue-200 text-blue-900',
    logoColor: 'text-blue-700',
    micrPrefix: '⑆021000021⑈',
  },
  {
    id: 'wells-fargo',
    name: 'Wells Fargo',
    address: '420 Montgomery St, San Francisco, CA 94104',
    colorTheme: 'bg-amber-50 border-amber-200 text-amber-900',
    logoColor: 'text-amber-700',
    micrPrefix: '⑆121000248⑈',
  },
  {
    id: 'bofa',
    name: 'Bank of America',
    address: '100 N Tryon St, Charlotte, NC 28255',
    colorTheme: 'bg-red-50 border-red-200 text-red-900',
    logoColor: 'text-red-700',
    micrPrefix: '⑆026009593⑈',
  },
  {
    id: 'citibank',
    name: 'Citibank',
    address: '388 Greenwich St, New York, NY 10013',
    colorTheme: 'bg-sky-50 border-sky-200 text-sky-900',
    logoColor: 'text-sky-600',
    micrPrefix: '⑆021000089⑈',
  },
  {
    id: 'custom',
    name: 'Custom Bank',
    address: '123 Financial Way, Local City',
    colorTheme: 'bg-slate-50 border-slate-200 text-slate-900',
    logoColor: 'text-slate-700',
    micrPrefix: '⑆999999999⑈',
  }
];

export default function CheckPrinter() {
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);
  const [customBankName, setCustomBankName] = useState('');
  const [checkData, setCheckData] = useState({
    date: new Date().toLocaleDateString('en-US'),
    payee: '',
    amountNumber: '',
    amountWords: '',
    memo: '',
    checkNumber: '1004',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (e) => {
    const bankId = e.target.value;
    const bank = BANKS.find(b => b.id === bankId);
    setSelectedBank(bank);
    if (bankId !== 'custom') {
      setCustomBankName('');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Determine active bank name for render
  const activeBankName = selectedBank.id === 'custom' && customBankName 
    ? customBankName 
    : selectedBank.name;

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10 print:bg-white print:p-0">
      
      {/* Control Panel / Input Form (Hidden during print) */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8 print:hidden">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Bank Check Printing System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Bank Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
            <select
              value={selectedBank.id}
              onChange={handleBankChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {BANKS.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional Custom Bank Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {selectedBank.id === 'custom' ? 'Custom Bank Name' : 'Check Number'}
            </label>
            {selectedBank.id === 'custom' ? (
              <input
                type="text"
                value={customBankName}
                onChange={(e) => setCustomBankName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter bank name..."
              />
            ) : (
              <input
                type="text"
                name="checkNumber"
                value={checkData.checkNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. 1004"
              />
            )}
          </div>

          {/* Date & Amount */}
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

          {/* Payee */}
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

          {/* Legal Words Amount */}
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

          {/* Memo & Extra Custom Check# if custom bank chosen */}
          <div className={selectedBank.id === 'custom' ? 'md:col-span-1' : 'md:col-span-2'}>
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

          {selectedBank.id === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check Number</label>
              <input
                type="text"
                name="checkNumber"
                value={checkData.checkNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="1004"
              />
            </div>
          )}
        </div>

        <button
          onClick={handlePrint}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
        >
          Print Check
        </button>
      </div>

      {/* Check Preview & Printable Area Container */}
      <div className="max-w-4xl mx-auto flex justify-center print-container">
        {/* Check Element */}
        <div className={`w-[6.0in] h-[2.75in] border rounded-lg shadow-sm p-4 relative font-serif text-gray-800 transition-colors duration-300 ${selectedBank.colorTheme} printable-check`}>
          
          {/* Top Row: Selected Bank Info, Check #, & Date */}
          <div className="flex justify-between items-start text-xs">
            <div>
              <p className={`font-bold uppercase tracking-wide text-xs ${selectedBank.logoColor}`}>
                {activeBankName}
              </p>
              <p className="text-[9px] text-gray-500 print:hidden">
                {selectedBank.address}
              </p>
            </div>
            
            <div className="flex flex-col items-end space-y-1">
              <span className="text-[11px] font-sans font-bold text-gray-600 mr-2">
                {checkData.checkNumber}
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-[9px] uppercase font-sans">Date:</span>
                <span className="border-b border-gray-600 px-2 min-w-[90px] text-center font-sans text-xs font-semibold">
                  {checkData.date}
                </span>
              </div>
            </div>
          </div>

          {/* Middle Row: Payee and Numeric Amount */}
          <div className="mt-2 flex items-end justify-between">
            <div className="flex items-end flex-grow mr-4">
              <span className="text-[9px] uppercase font-sans whitespace-nowrap mr-2">Pay To The Order Of:</span>
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
            <span className="text-[9px] uppercase font-sans ml-2 whitespace-nowrap">Dollars</span>
          </div>

          {/* Bottom Row: Memo, Signature Line & MICR Encoding */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex items-end w-4/12">
              <span className="text-[9px] uppercase font-sans mr-1">Memo:</span>
              <span className="border-b border-gray-600 flex-grow px-1 text-xs h-4">
                {checkData.memo}
              </span>
            </div>
            
            {/* Dynamic Bank Routing Symbol numbers at the bottom */}
            <div className="text-center font-mono text-[10px] tracking-[2px] text-gray-700 mx-1">
              {selectedBank.micrPrefix} 000123456789⑈ {checkData.checkNumber}
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
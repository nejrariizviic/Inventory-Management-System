import React from 'react';

const AddSupplierModal = ({
  toggle,
  setSupplierData,
  handleAddSupplier,
  supplierData,
  clearInputField,
  isUpdate,
  setIsUpdate,
  updateSupplier,
}) => {
  const handleChange = (e) => {
    setSupplierData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className='absolute top-0 bg-black w-full h-full z-10 bg-opacity-50 flex items-center justify-center'>
        <div className=' w-full h-full max-w-2xl md:h-auto'>
          <div className='relative rounded-lg shadow bg-blue-800'>
            <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-white'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Add Supplier
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='staticModal'
                onClick={() => {
                  toggle();
                  clearInputField();
                  setIsUpdate(false);
                }}
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='w-full p-6 space-y-4 flex flex-col'>
              <div className='w-full flex space-x-6'>
                <div className='w-full'>
                  <label htmlFor='name' className='text-white'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    placeholder='Name'
                    value={supplierData?.name}
                    onChange={handleChange}
                    className='w-full mt-1 py-2 pl-2 rounded outline-none'
                  />
                </div>
                <div className='w-full'>
                  <label htmlFor='jib' className='text-white'>
                    JIB
                  </label>
                  <input
                    type='text'
                    id='jib'
                    name='jib'
                    required
                    placeholder='JIB'
                    value={supplierData?.jib}
                    onChange={handleChange}
                    className='w-full mt-1 py-2 pl-2 rounded outline-none'
                  />
                </div>
              </div>
              <div className='w-full flex space-x-6'>
                <div className='w-full'>
                  <label htmlFor='pdv' className='text-white'>
                    PDV
                  </label>
                  <input
                    type='text'
                    id='pdv'
                    name='pdv'
                    required
                    placeholder='PDV'
                    value={supplierData?.pdv}
                    onChange={handleChange}
                    className='w-full mt-1 p-2 rounded outline-none'
                  />
                </div>
                <div className='w-full'>
                  <label htmlFor='telephone' className='text-white'>
                    Telephone
                  </label>
                  <input
                    type='text'
                    id='telephone'
                    name='telephone'
                    required
                    placeholder='Telephone'
                    value={supplierData?.telephone}
                    onChange={handleChange}
                    className='w-full mt-1 p-2 rounded outline-none'
                  />
                </div>
              </div>
              <div className='w-full flex space-x-6'>
                <div className='w-full'>
                  <label htmlFor='contactPerson' className='text-white'>
                    Contact Person
                  </label>
                  <input
                    type='text'
                    id='contactPerson'
                    name='contactPerson'
                    required
                    placeholder='Contact Person'
                    value={supplierData?.contactPerson}
                    onChange={handleChange}
                    className='w-full mt-1 p-2 rounded outline-none'
                  />
                </div>
                <div className='w-full'>
                  <label htmlFor='email' className='text-white'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    placeholder='Email'
                    value={supplierData?.email}
                    onChange={handleChange}
                    className='w-full mt-1 p-2 rounded outline-none'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='startDate' className='text-white'>
                  Start Date
                </label>
                <input
                  type='date'
                  id='startDate'
                  name='startDate'
                  required
                  value={supplierData?.startDate}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 rounded outline-none'
                />
              </div>
              <div>
                <label htmlFor='completionDate' className='text-white'>
                  Completion Date
                </label>
                <input
                  type='date'
                  id='completionDate'
                  name='completionDate'
                  required
                  value={supplierData?.completionDate}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 rounded outline-none'
                />
              </div>
            </div>
            <div className='flex items-center p-6 space-x-4 border-t border-gray-200 rounded-b dark:border-white'>
              <button
                data-modal-hide='staticModal'
                type='button'
                onClick={() => {
                  toggle();
                  isUpdate ? updateSupplier() : handleAddSupplier();
                  setIsUpdate(false);
                }}
                className='text-black bg-white font-bold focus:outline-none rounded-lg text-sm px-6 py-2.5 text-center'
              >
                {isUpdate ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => {
                  toggle();
                  clearInputField();
                  setIsUpdate(false);
                }}
                data-modal-hide='staticModal'
                type='button'
                className='text-white bg-none border-2 border-gray-400 font-medium rounded-lg text-sm px-5 py-2 text-center'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSupplierModal;

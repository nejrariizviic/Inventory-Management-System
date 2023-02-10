import React from 'react';

const AddEmployeeModal = ({
  toggle,
  setEmployeeData,
  handleAddEmployee,
  employeeData,
  clearInputField,
  isUpdate,
  setIsUpdate,
  updateEmployee,
}) => {
  const handleChange = (e) => {
    setEmployeeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className='absolute top-0 left-0 bg-black w-full h-full z-10 bg-opacity-50 flex items-center justify-center'>
        <div className=' w-full h-full max-w-2xl md:h-auto'>
          <div className='relative rounded-lg shadow bg-blue-800'>
            <div className='flex items-start justify-between p-4 border-b rounded-t'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Add Employee
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
                  <label htmlFor='firstName' className='text-white'>
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    required
                    placeholder='First Name'
                    value={employeeData.firstName}
                    onChange={handleChange}
                    className='w-full mt-1 py-2 pl-2 rounded outline-none'
                  />
                </div>
                <div className='w-full'>
                  <label htmlFor='lastName' className='text-white'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    required
                    placeholder='Last Name'
                    value={employeeData.lastName}
                    onChange={handleChange}
                    className='w-full mt-1 py-2 pl-2 rounded outline-none'
                  />
                </div>
              </div>
              <div className='w-full flex space-x-6'>
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
                    value={employeeData.telephone}
                    onChange={handleChange}
                    className='w-full mt-1 p-2 rounded outline-none'
                  />
                </div>
                <div className='w-full'>
                  <label htmlFor='address' className='text-white'>
                    Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    required
                    placeholder='Address'
                    value={employeeData.address}
                    onChange={handleChange}
                    className='w-full mt-1 p-2 rounded outline-none'
                  />
                </div>
              </div>
              {!isUpdate && (
                <div className='w-full flex space-x-6'>
                  <div className='w-full'>
                    <label htmlFor='username' className='text-white'>
                      Username
                    </label>
                    <input
                      type='text'
                      id='username'
                      name='username'
                      placeholder='Username'
                      required
                      value={employeeData.username}
                      onChange={handleChange}
                      className='w-full mt-1 p-2 rounded outline-none'
                    />
                  </div>
                  <div className='w-full'>
                    <label htmlFor='password' className='text-white'>
                      Password
                    </label>
                    <input
                      type='Password'
                      id='password'
                      name='password'
                      placeholder='Password'
                      required
                      value={employeeData.password}
                      onChange={handleChange}
                      className='w-full mt-1 p-2 rounded outline-none'
                    />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor='email' className='text-white'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  required
                  placeholder='Email'
                  value={employeeData.email}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 rounded outline-none'
                />
              </div>
              <div>
                <label htmlFor='doe' className='text-white'>
                  Date od Employment
                </label>
                <input
                  type='date'
                  id='doe'
                  name='dateOfEmployment'
                  required
                  value={employeeData.dateOfEmployment}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 rounded outline-none'
                />
              </div>
              {isUpdate && (
                <div>
                  <label htmlFor='doc' className='text-white'>
                    Date od Cancellation
                  </label>
                  <input
                    type='date'
                    id='doc'
                    name='dateOfCancellation'
                    required
                    value={employeeData.dateOfCancellation}
                    onChange={handleChange}
                    className='w-full mt-1 p-2 rounded outline-none'
                  />
                </div>
              )}
            </div>
            <div className='flex items-center p-6 space-x-4 border-t border-gray-200 rounded-b dark:border-white'>
              <button
                data-modal-hide='staticModal'
                type='button'
                onClick={() => {
                  toggle();
                  isUpdate ? updateEmployee() : handleAddEmployee();
                  setIsUpdate(false);
                }}
                className='text-black bg-white focus:outline-none font-bold rounded-lg text-sm px-6 py-2.5 text-center'
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

export default AddEmployeeModal;

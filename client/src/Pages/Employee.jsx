import axios from 'axios';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { AddEmployeeModal } from '../components';
import { Context } from '../Helper/Context';
import useToggle from '../Hooks/useToggle';

const Employee = () => {
  const { token } = useContext(Context);
  const [isOpen, toggle] = useToggle(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    telephone: '',
    address: '',
    email: '',
    dateOfEmployment: '',
    username: '',
    password: '',
    dateOfCancellation: '',
  });

  const clearInputField = () => {
    setEmployeeData({
      id: '',
      firstName: '',
      lastName: '',
      telephone: '',
      address: '',
      email: '',
      dateOfEmployment: '',
      username: '',
      password: '',
      dateOfCancellation: '',
    });
  };

  const handleAddEmployee = () => {
    axios.post(`http://localhost:5000/add-employee`, employeeData).then(() => {
      setEmployees([...employees, employeeData]);
      clearInputField();
    });
  };

  const getEmployees = async () => {
    await axios
      .get(`http://localhost:5000/get-employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setEmployees(response.data))
      .catch((err) => err);
  };

  const updateEmployeeData = (id) => {
    let employee = employees.find((employee) => employee._id === id);
    setEmployeeData({
      ...employee,
      dateOfEmployment: employee?.dateOfEmployment?.slice(0, 10),
      dateOfCancellation: employee?.dateOfCancellation?.slice(0, 10),
    });
  };

  const updateEmployee = () => {
    axios
      .patch(`http://localhost:5000/update-employee`, employeeData)
      .then((response) => response.data)
      .catch((err) => err);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className='pl-48'>
      {isOpen && (
        <AddEmployeeModal
          toggle={toggle}
          setEmployeeData={setEmployeeData}
          handleAddEmployee={handleAddEmployee}
          employeeData={employeeData}
          clearInputField={clearInputField}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          updateEmployee={updateEmployee}
        />
      )}

      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-row items-row justify-between mt-10'>
          <div className='flex justify-start items-center my-8'>
            <p className='text-3xl font-bold'>Employees</p>
          </div>
          <div className='flex items-center'>
            <button
              onClick={toggle}
              className='px-4 py-2 bg-blue-700 text-white text-xl rounded'
            >
              Add Employee
            </button>
          </div>
        </div>
        <div className='relative overflow-x-auto mt-10'>
          <table className='w-full text-sm text-left text-gray-500 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700'>
              <tr className='bg-blue-700 text-white'>
                <th scope='col' className='pl-6 pr-4 py-3'>
                  First Name
                </th>
                <th scope='col' className='px-4 py-3'>
                  Last Name
                </th>
                <th scope='col' className='px-4 py-3'>
                  Telephone
                </th>
                <th scope='col' className='px-4 py-3'>
                  Address
                </th>
                <th scope='col' className='px-4 py-3'>
                  Email
                </th>
                <th scope='col' className='px-4 py-3'>
                  Date of employment
                </th>
                <th scope='col' className='px-4 py-3'>
                  Date of cancellation
                </th>
                <th scope='col' className='px-4 py-3'>
                  Update
                </th>
              </tr>
            </thead>
            {employees.length > 0 && (
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee?._id}
                    className='border-b text-black text-base'
                  >
                    <td className='pl-6 pr-4 py-4'>{employee?.firstName}</td>
                    <td className='p-4'>{employee?.lastName}</td>
                    <td className='p-4'>{employee?.telephone}</td>
                    <td className='p-4'>{employee?.address}</td>
                    <td className='p-4'>{employee?.email}</td>
                    <td className='p-4'>
                      {employee?.dateOfEmployment?.slice(0, 10)}
                    </td>
                    <td className='p-4'>
                      {employee?.dateOfCancellation?.slice(0, 10) || ''}
                    </td>
                    <td className='p-4'>
                      <button
                        onClick={() => {
                          toggle();
                          setIsUpdate(true);
                          updateEmployeeData(employee?._id);
                        }}
                        className='bg-blue-700 rounded px-4 py-1.5 text-white text-base'
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;

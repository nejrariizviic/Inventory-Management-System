import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AddSupplierModal } from '../components';
import { Context } from '../Helper/Context';
import useToggle from '../Hooks/useToggle';

const Supplier = () => {
  const { token } = useContext(Context);
  const [isOpen, toggle] = useToggle();
  const [suppliers, setSuppliers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [supplierData, setSupplierData] = useState({
    id: '',
    name: '',
    jib: '',
    pdv: '',
    telephone: '',
    contactPerson: '',
    email: '',
    startDate: '',
    completionDate: '',
  });

  const clearInputField = () => {
    setSupplierData({
      id: '',
      name: '',
      jib: '',
      pdv: '',
      telephone: '',
      contactPerson: '',
      email: '',
      startDate: '',
      completionDate: '',
    });
  };

  const getSuppliers = async () => {
    await axios
      .get(`http://localhost:5000/get-suppliers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setSuppliers(response.data))
      .catch((err) => console.log(err));
  };

  const handleAddSupplier = () => {
    axios.post(`http://localhost:5000/add-supplier`, supplierData).then(() => {
      setSuppliers([...suppliers, supplierData]);
      clearInputField();
    });
  };

  const updateSupplierData = (id) => {
    let supplier = suppliers.find((supplier) => supplier._id === id);
    setSupplierData({
      ...supplier,
      startDate: supplier?.startDate?.slice(0, 10),
      completionDate: supplier?.completionDate?.slice(0, 10),
    });
  };

  const updateSupplier = async () => {
    await axios
      .patch('http://localhost:5000/update-supplier', supplierData)
      .then((response) => response.data)
      .catch((err) => err);
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <>
      {isOpen && (
        <AddSupplierModal
          toggle={toggle}
          setSupplierData={setSupplierData}
          handleAddSupplier={handleAddSupplier}
          supplierData={supplierData}
          clearInputField={clearInputField}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          updateSupplier={updateSupplier}
        />
      )}

      <div className='mt-10 max-w-7xl mx-auto pl-48'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center my-8'>
            <p className='text-3xl font-bold'>Suppliers</p>
          </div>
          <div>
            <button
              onClick={toggle}
              className='px-4 py-2 bg-blue-700 text-white text-xl rounded'
            >
              Add Supplier
            </button>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='overflow-x-auto'>
            <div className='py-2'>
              <div className='overflow-hidden'>
                <table className='w-full'>
                  <thead className='border-b'>
                    <tr className='bg-blue-700 text-white'>
                      <th scope='col' className='pl-6 py-3'>
                        #
                      </th>
                      <th scope='col' className='pl-4 py-3'>
                        Name
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        JIB
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        PDV
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Telephone
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Contact Person
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Email
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Start Date
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Completion Date
                      </th>
                      <th scope='col' className='px-4 py-3'>
                        Update
                      </th>
                    </tr>
                  </thead>
                  {suppliers.length > 0 && (
                    <tbody>
                      {suppliers.map((supplier, i) => (
                        <tr key={supplier?._id} className='border-b'>
                          <td className='pl-6 pr-4 py-4'>{i + 1}</td>
                          <td className='pl-6 pr-4 py-4'>{supplier?.name}</td>
                          <td className='p-4'>{supplier?.jib}</td>
                          <td className='p-4'>{supplier?.pdv}</td>
                          <td className='p-4'>{supplier?.telephone}</td>
                          <td className='p-4'>{supplier?.contactPerson}</td>
                          <td className='p-4'>{supplier?.email}</td>
                          <td className='p-4'>
                            {supplier?.startDate?.slice(0, 10)}
                          </td>
                          <td className='p-4'>
                            {supplier?.completionDate?.slice(0, 10) || ''}
                          </td>
                          <td className='p-4'>
                            <button
                              onClick={() => {
                                toggle();
                                setIsUpdate(true);
                                updateSupplierData(supplier?._id);
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
        </div>
      </div>
    </>
  );
};

export default Supplier;

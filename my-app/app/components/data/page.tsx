'use client';
import { DataItem } from '../../interfaces/interfaces';
import { useViewData } from '../../hooks/useViewData';
import { useState, useEffect } from 'react';

export default function dataTable() {
  // const [tableNamee] = 
  const { data, tableName, loading } = useViewData();

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{tableName}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                  {item.id}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                  {item.date}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// This function requests the view_series route in the backend which is currently hardcoded to accept 'gdp' as input
// export default function ViewData() {
  // const [data, setData] = useState<DataItem[]>([]);
  // const [tableName, setTableName] = useState<string>('');
  // const [loading, setLoading] = useState(true);

  
// }
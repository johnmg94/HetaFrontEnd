'use client';
import { DataItem } from '../../interfaces/interfaces';
// import { useViewData } from '../../hooks/useViewData';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

interface DataTable2Props {
  data: DataItem[];
}

const DataTable2: React.FC<DataTable2Props> = ({ data }) => {
  console.log('Data received in DataTable2', data);

  if (data.length === 0) {
    return <p className="text-center text-gray-500"> No data to display</p>;
  }
  // const router = useRouter();
  // const [dataitem, setDataItem] = useState<DataItem[]>([]);
  // const [tableName, setTableName] = useState<string>('');
  // const [loading, setLoading] = useState(true);
  // const [query, setQuery] = useState<string>('');

  // useEffect(() => {
  //   if (data.length >0) {
  //     setDataItem(data);
  //     setLoading(false);
  //   }
  // }, [data]);

  return (
  
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Data Table</h1>
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

  export default DataTable2;

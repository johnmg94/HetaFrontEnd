'use client';
import { useViewData } from '../../hooks/useViewData';
import DataTable2 from '../data/DataTable2';
import { useState, useEffect } from 'react';
import { DataItem } from '../../interfaces/interfaces';
// import { useRouter } from 'next/router';

interface DataInfo {
  frequency: string;
  frequency_short: string;
  group_popularity: number;
  id: string;
  last_updated: string;
  notes: string;
  observation_end: string;
  observation_start: string;
  popularity: number;
  realtime_end: string;
  realtime_start: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  title: string;
  units: string;
  units_short: string;
}

export default function Search() {
  //new addition of router
  // const router = useRouter();
  const [data, setData] = useState<DataInfo[]>([]);
  const [dataitem, setDataItem] = useState<DataItem[]>([]);
  const [selectItems, setSelectedItems] = useState<string[]>([]);
  const [dataItemLoading, setDataItemLoading] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tableName, setTableName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
 

  const handleSearch = (query: string) => {
    setLoading(true);
    const paramString = encodeURIComponent(query);
    console.log('paramString: ', paramString);
    console.log('Search query:', query);

    const url = `http://127.0.0.1:5000/search_data?query=${paramString}`;
    fetch(url, {
      method: 'GET', // Change to 'POST' if needed
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ query }), // Uncomment if using POST and sending data in the body
    })
      .then((response) => response.json())
      .then((fetchedData) => {
        // This function is bringing in table names that I don't want/need
        const tableNames = Object.keys(fetchedData);
        console.log(tableNames)
        if (tableNames.length > 0) {
          const tableName = tableNames[0];
          setTableName(tableName);
          const tableData = fetchedData["seriess"];
          console.log(tableData)
          setData(tableData);
        } else {
          console.error('No table data found in the response.');
          setData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        setLoading(false);
        setData([]);
      });
  };
  //end handleSearch

  const handleClick = (id: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      const url = `http://127.0.0.1:5000/view_series?series=${id}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((fetchedData) => {
        const dataItem = fetchedData
        setDataItem(dataItem)
        console.log(dataItem)
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        setLoading(false);
        setData([]);
      });
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false);
    }
}
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  if (dataItemLoading) {
    return <p className="text-center text-gray-500">Data Is Loading...</p>;
  }

  const handleSelect = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems((prevSelected) => [...prevSelected, itemId]);
    } else {
      setSelectedItems((prevSelected) => 
      prevSelected.filter((id) => id !== itemId)
    );
  }
};

  const handleSelectSubmit = async () => {
    try {
      const response = await fetch('/api/my-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'applicaation/json',
          body: JSON.stringify({ itemIDs: selectItems })
        }});
        if (response.ok) {
          console.log('Items submitted successfully');
        } else {
          console.error("Submission failed");
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

  return (
    <div>
      {/* Search Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchQuery);
        }}
      >
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Search</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Search something..."
          />
        </label>
      </form>
      {/*  */ }
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSelectSubmit();
          }}
        className="w-full container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">{tableName}</h1>
          <div className="overflow-y-auto max-h-96">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 mb-4 border rounded-md ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }` }
              > <input 
                type="checkbox"
                id={item.id}
                onChange={(event) => handleSelect(item.id, event)}
                checked={selectItems.includes(item.id)}
                className="mr-2" 
                />
                {/* When clicking search result */}
                {/* handleSearch should populate the data table */}
                <a 
                  href= '#'
                  onClick = {(event) => {event.preventDefault() 
                    handleClick(item.id, event) 
                  ;}}
                  className="p-4 text-lg font-bold text-blue-600 hover:underline"
                >
                  {item.title}
                </a>
                <p className="p-4 text-sm text-gray-700">{item.notes}</p>
                <p className="p-4 text-sm text-gray-500">Frequency: {item.frequency}</p>
                {/* {loading ? (
                  <p>Loading...</p>
                ) : (
                  data.length > 0 && <DataTable2 data={dataitem}/>
                )} */}
              </div>
            ))}
          <button>
            Create Model
          </button>
          </div>
        </form>

      )}

    {dataItemLoading ? (  <p className="text-center text-gray-500">Data Is Loading...</p>
    ) : (
        <div className="container px-4 py-8">
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
              {dataitem.length > 0 ? (
                dataitem.map((item, index) => (
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
                ))
              ) : (
                <tr>
                  <td className="text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    )}
    <div className="container "> 
        
    </div>
  </div>
  );
}

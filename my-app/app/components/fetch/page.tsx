'use client';
import { useViewData } from '../../hooks/useViewData';
import DataTable2 from '../data/DataTable2';
import { useState, useEffect } from 'react';
import { DataItem } from '../../interfaces/interfaces';
import { useRouter } from 'next/router';

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
        const tableNames = Object.keys(fetchedData);
        console.log(tableNames)
        if (tableNames.length > 0) {
          const tableName = tableNames[0];
          setTableName(tableName);
          const tableData = fetchedData["seriess"];
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

  const handleClick = async (id: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    // const { data, tableName, loading, query } = useViewData();
    <DataTable2 />
    const fetchedData = await fetch(`api/series_info/${id}`).then((res) => res.json());
    router.push({
      pathname: `/series_info/${id}`,
      query: { data: JSON.stringify(fetchedData) }
  });
    // Will this result in two tables??
   
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  // }

  // Optionally remove this if you don't want automatic searches on input change
  // useEffect(() => {
  //   if (searchQuery) {
  //     handleSearch(searchQuery);
  //   }
  // }, [searchQuery]);

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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">{tableName}</h1>

          <div className="overflow-y-auto max-h-96">
            {data.map((item, index) => (
              <div 
                key={item.id}
                className={`p-4 mb-4 border rounded-md ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }` }
              >
                {/* When clicking search result */}
                {/* handleSearch should populate the data table */}
                <a onClick = {(event) => {handleClick(item.id, event)
                  event.preventDefault();}}
                  href={`/series_info/${item.id}`}
                  className="text-lg font-bold text-blue-600 hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-sm text-gray-700">{item.notes}</p>
                <p className="text-sm text-gray-500">Frequency: {item.frequency}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



// This function requests the view_series route in the backend which is currently hardcoded to accept 'gdp' as input


  //   const url = `http://127.0.0.1:5000/fetch_data?query=${paramString}`;
  //     fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(response => {
  //       // Error handling if response is malformed
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
      
  //     .then((data) => {
  //       const tableNames = data.map((obj: DataInfo) => Object.keys(obj)).flat();
  //       console.log("Table Names:", tableNames)

  //       if (tableNames.length > 0) {
  //         const tableName = tableNames[0];
  //         console.log("table name: ", tableName)
  //         setTableName(tableName);

  //       //Might want to handle cases where data[tableName] is undefined or malformed to avoid any potential runtime errors.
  //       const tableData = data.map((obj: DataInfo) => Object.entries(obj).flat());
  //       if (Array.isArray(tableData) && tableData.length > 0) {
  //         setData(tableData);
  //       } else {
  //         console.error('Table  data is empty or not an array');
  //         setData([]);
  //       }
  //      } else {
  //         console.error('No table data found in the response');
  //         setData([]);
  //       }
  //     })

  //     .catch((error) => {
  //       console.error('Error fetching data', error);
  //       setLoading(false);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  //     console.log("DATA: ", data)
  // };
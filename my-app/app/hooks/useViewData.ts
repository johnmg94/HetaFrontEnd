// import { useEffect } from 'react';
import { useState, useEffect } from 'react';
import { DataItem } from '../interfaces/interfaces';

export const useViewData = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [tableName, setTableName] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState<string>('');
        useEffect(() => {

            const fetchData = async () => {
              if (!query) return;
                setLoading(true);
                const paramString = encodeURIComponent(query);

                // console.log('paramString: ', paramString);
                // console.log('Search query:', query);

                fetch(`http://127.0.0.1:5000/view_series?query=${paramString}`)

                // I want error handling when network isn't active
                // .catch (error) => {
                  // console.error('Error fetching data,' error);

                // };

                .then((response) => response.json())
  
                /* Gets table names */
                .then((fetchedData) => {
                  const tableNames = Object.keys(fetchedData);
                  if (tableNames.length > 0) {
                    const tableName = tableNames[0];
                    setTableName(tableName); 
  
                  /* Gets table data */
                  const tableData = fetchedData[tableName];
                  setData(tableData);
                  } else {
                    console.error('No table data found in the response.');
                  }
                  setLoading(false);
                })
                
                /* Error Handling */
                .catch((error) => {
                  console.error('Error fetching data', error);
                  setLoading(false);
              });
          }
          fetchData();
        }, [tableName]);
        
        return {
            data,
            setData,
            tableName,
            setTableName,
            loading,
            setLoading,
            query,
            setQuery
        }
};

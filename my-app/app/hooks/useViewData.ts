// import { useEffect } from 'react';
import { useState, useEffect } from 'react';
import { DataItem } from '../interfaces/interfaces';

export const useViewData = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [tableName, setTableName] = useState<string>('');
    const [loading, setLoading] = useState(true);
        useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                fetch('http://127.0.0.1:5000/view_series')
                .then((response) => response.json())
  
                .then((fetchedData) => {
                  const tableNames = Object.keys(fetchedData);
                  if (tableNames.length > 0) {
                    const tableName = tableNames[0];
                    setTableName(tableName); 
  
                  const tableData = fetchedData[tableName];
                  setData(tableData);
                  } else {
                    console.error('No table data found in the response.');
                  }
                  setLoading(false);
                })
  
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
            setLoading
        }
};

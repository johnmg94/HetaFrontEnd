import { useState, useEffect } from 'react';

interface DataItem {
    id: number;
    realtime_start: string;
    realtime_end: string;
    date: string;
    value: number;
}

const ViewData: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/data')
        .then((response) => response.json()
        .then((data: DataItem[]) => {
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data', error);
        }));
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Data</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        {item.date}: {item.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};
function Navigation()  {

    return (
        <html>
        <head>
            <title>Economic Data Analysis Platform</title>
        </head>
        <body>
            <h1>Economic Data Analysis Platform</h1>
            <ul>
                <li><a href="{{ url_for('fetch') }}">Fetch Data</a></li>
                <li><a href="{{ url_for('graph') }}">View Graphs</a></li>
                <li><a href="{{ url_for('sql') }}">Run SQL Queries</a></li>
                <li><a href="{{ url_for('model') }}">Specify Model</a></li>
            </ul>
        </body>
        </html>

    );
} export default Navigation
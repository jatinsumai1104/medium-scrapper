const setHistory = (url) => {
    fetch("http://127.0.0.1:8000/api/history/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'search': url,
        }),
    })
}

export default setHistory;

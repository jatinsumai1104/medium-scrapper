const setHistory = (url) => {
    fetch("/api/history/", {
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

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
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result);
        },
        (error) => {
            console.log(error);
        }
    )
}

export default setHistory;

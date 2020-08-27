const fetchHistory = (setHistory) => {
    // console.log("Get History");
    fetch("api/history", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(
            (result) => {
                setHistory(result);
            },
            (error) => {
                console.log(error);
            }
        )
}
export default fetchHistory;

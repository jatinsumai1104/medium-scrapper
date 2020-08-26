const getHistory = (setHistory) => {
    // console.log("Get History");
    fetch("http://127.0.0.1:8000/api/history", {
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
export default getHistory;

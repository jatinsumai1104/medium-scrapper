const FetchPopularArticles = (callback) => {
    // console.log("Get History");
    fetch("http://127.0.0.1:8000/api/popular-articles", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        dataType: "json"
    })
        .then(res => res.json())
        .then(
            (result) => {
                callback(result);
            },
            (error) => {
                console.log(error);
            }
        )
}
export default FetchPopularArticles;

const FetchPopularArticles = (callback) => {
    // console.log("Get History");
    fetch("api/popular-articles", {
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

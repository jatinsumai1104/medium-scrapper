
import setHistory from './set-history';

const fetchArticle = (title, setData) => {

    setHistory('/article/'+title);

    fetch("http://127.0.0.1:8000/api/article/" + title, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setData(result);
            },
            (error) => {
                console.log(error);
            }
        )

}
export default fetchArticle;

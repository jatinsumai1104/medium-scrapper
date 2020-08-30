
import setHistory from './set-history';

const fetchArticle = (title, setData) => {

    setHistory('/article/'+title);

    fetch("/api/article/" + title, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(
            (result) => {
                setData(result);
            },
            (error) => {
                console.log(error);
            }
        )

}
export default fetchArticle;

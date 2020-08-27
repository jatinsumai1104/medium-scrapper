
import setHistory from './set-history';

const fetchArticles = (value, article_count, save_history, callback) => {

    if (value != "") {

        if(save_history)
            setHistory('/tag/'+value);

        for (var i = article_count; i < (article_count + 10); i++) {

            fetch('api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'tag': value,
                    'index': i
                }),
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        callback(result, i, value);
                    },
                    (error) => {
                        callback([], i, value);
                    }
                )
        }
    }
}
export default fetchArticles;

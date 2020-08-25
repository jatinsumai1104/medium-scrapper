// import React, {useState, useEffect} from 'react';

const useHttp = (url, value, article_count, callback) => {
    console.log('Value: ' + value);
    if (value != "") {
        for (var i = article_count; i < (article_count + 2); i++) {
            console.log("Fetching: " + i);

            fetch(url, {
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
                        console.log(result);
                        callback(result, i, value);
                    },
                    (error) => {
                        console.log('Error');
                        console.log(error);
                    }
                )
        }
    }
}
export default useHttp;
// http://127.0.0.1:8000/api/articles

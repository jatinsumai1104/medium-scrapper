import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const RelatedTags = (props) => {

    const [related_tags, set_related_tags] = useState([]);

    useEffect(() => {
        set_related_tags(props.related_tags);
    }, [props.related_tags]);


    var tags = [];
    if (related_tags.length != 0)
        related_tags.forEach((tag) => {
            tags.push(<a href={"/tag/" + tag.split(' ').join('-').toLowerCase()} className="btn m-1 "
                         style={{backgroundColor: '#e3f2fd'}}
                         key={tag}>{tag}</a>);
        });

    return (
        <>
            <h2 className="mt-4">No Articles Available</h2>
            <div className="shadow-sm p-3 mb-5 bg-white rounded mt-2" id="article-search-component">
                <h3>Some Related Tags</h3>
                {tags}
            </div>
        </>
    );

}

export default RelatedTags;

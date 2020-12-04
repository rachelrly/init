// Want to understand this better? try this video https://www.youtube.com/watch?v=NZKUirTtxcg

//useEffect takes in two arguments, one being a function and the other being variables
//Whenever the second argument, the variables, are altered the first argument will then be activated
import { useEffect, useState } from 'react';
//people really do be loving this this Axios
import axios from 'axios';

export default function useBookSerach(query, pageNumber) {
    //We want to default to loading until our call is complete
    const [loading, setLoading] = useState(true);
    //What do we do about errors?
    const [error, setError] = useState(false);
    //Until a query is made the books is just an empty array
    const [books, setBooks] = useState([]);
    //Supposed we have seen all the books there are to see (numFound)
    //How do we know to stop loading more? This guy right here will do just that
    const [hasMore, setHasMore] = useState(false);

    //This is here to handle a bug
    //Basically everytime the query changes the old return simply appends the new query to it
    //So the old search never goes away
    //With this we are defaulting to a blank array everytime the query changes
    useEffect(() => {
        setBooks([])
    }, [query]);

    useEffect(() => {
        setLoading(true);

        setError(false);

        let cancel
        console.log('what are we working with', pageNumber)
        axios({
            method: 'GET',
            url: 'http://openlibrary.org/search.json',
            params: { q: query, page: pageNumber },
            cancelToken: axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log('what response', res)

            setBooks(prevBooks => {
                return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
            })

            setHasMore(res.data.docs.length > 0)
            setLoading(false)

        }).catch(e => {
            if (axios.isCancel(e)) return

            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber]);
    return { loading, error, books, hasMore };
};
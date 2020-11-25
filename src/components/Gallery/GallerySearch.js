// Want to understand this better? try this video https://www.youtube.com/watch?v=NZKUirTtxcg

//useEffect takes in two arguments, one being a function and the other being variables
//Whenever the second argument, the variables, are altered the first argument will then be activated
import { useEffect, useState } from 'react';
//people really do be loving this this Axios
import axios from 'axios';
import TokenService from '../../services/token-service'

export default function useGallerySearch(observed, pageNumber, limit) {
    //We want to default to loading until our call is complete
    const [loading, setLoading] = useState(true);
    //What do we do about errors?
    const [error, setError] = useState(false);
    //Until a query is made the results is just an empty array
    const [results, setResults] = useState([]);
    //Supposed we have seen all the results there are to see (numFound)
    //How do we know to stop loading more? This guy right here will do just that
    const [hasMore, setHasMore] = useState(false);

    //This is neat... whenever the param (observer) changes then the axios call is made
    useEffect(() => {
        //Everytime we make a request we have to trigger our loading thingy
        setLoading(true);
        //We shouldn't have any issues at the start of our Fetch, let's make sure our state understands that
        setError(false);

        //This function was getting called everytime something got added to the Query
        //With cancel we prevent that
        //The cancelToken below uses a built in axios function
        //Basically, I don't really understand the specifics, but it prevents the promise from being fufilled
        //That results in an error, however
        //So the catch way down below will bypass the error instead of ruining your call
        //Then, when you have set your query properly, the call will finally go through
        let cancel
        console.log('what are we working with', observed, pageNumber, limit)
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/post/download',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            params: { page: pageNumber, limit: limit },
            cancelToken: axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log('what response', res)
            //Here we set our State by combining our Old Books with our New Books
            //As the Sample API is finnicky and clone to duplicates we use the JS built in function Set
            //That create a brand new array of only unique Books
            //*for init this can be used to prevent rendering of duplicate Posts, methinks*
            setResults(prevResults => {
                return [...new Set([...prevResults, ...res.data.results.map(p => p)])]
            })
            //We need to determine if there are more books are not
            //As long as we have more than 0 books we know there are more to load
            //When it is 0 we have reached the end of it all
            setHasMore(res.data.results.length > 0)
            //No reason to Load anything else, right?
            setLoading(false)
            console.log('our axios get', res.data)
            //PROTIP
            //The console log will give you something that look-a like-a this
            //{docs:100, num_found: 67689, numFound:67689, start:0}
            //What does it mean?
            //docs is how many items(books here) are being currently displayed
            //num_found/numFound is how many there are in total
            //start is what page we are on
            //start: 0 means books 1 to 100 out of 67689
            //start: 7 means books 601 to 700 out of 67689
        }).catch(e => {
            if (axios.isCancel(e)) return
            //We actually do get Errors, like a lot of them. That's the whole point of the CancelToken
            setError(true)
        })
        return () => cancel()
    }, [limit, observed, pageNumber]);
    return { loading, error, results, hasMore};
};
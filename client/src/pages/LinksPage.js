import React, {useState, useContext, useEffect, useCallback} from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import {LinksList} from '../components/LinksList';

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    
    const fetchLinks = useCallback(async () => {
        console.log('Bearer', token)
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched);
        } catch (e) {
            console.error(e);
        }
    }, [token, request]);
    
    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);
    
    if (loading) {
        return <Loader />
    }
    console.log('links', links)
    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
};

import React, {useState, useContext, useEffect, useCallback} from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import {LinksList} from '../components/LinksList';
import { useMessage } from '../hooks/message.hook';

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request, error, clearError} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();
    
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);
    
    const fetchLinks = useCallback(async () => {
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
    
    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
};

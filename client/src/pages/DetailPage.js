import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';
import { useMessage } from '../hooks/message.hook'

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading, error, clearError} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const message = useMessage();
    
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);
    
    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {
            console.error(e);
        }
    }, [token, linkId, request]);
    
    useEffect(() => {
        getLink();
    }, [getLink]);
    
    if (loading) {
        return <Loader />
    }
    
    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    );
};

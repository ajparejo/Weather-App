import { useState, useEffect } from "react";
import { getCoords } from "../helpers/getCoords";

export const useFetch = (categorias) => {

    const [state, setState] =  useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getCoords(categorias).then( imgs => {
            setTimeout(()=>{
                setState({
                    data: imgs,
                    loading: false
                });

            }, 4000);
        })
    }, [categorias]);

    return state;

}
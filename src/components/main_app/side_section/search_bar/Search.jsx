import React from 'react'
import { useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../../../../assets/icons/search.svg";

export default function Search({ HandelSearchSubmit, HandelInputFocus, HandelInputBlur, HandelInputValueChange,SearchState }) {
    
    useEffect(() => {
        return () => {
            // cleanup
        }
    }, [SearchState])

    return (
        <div className="Search">
                <form onSubmit={HandelSearchSubmit} className="SearchContainer">
                    <SearchIcon className="SearchIcon"></SearchIcon>
                    <input
                        onFocus={HandelInputFocus}
                        onBlur={HandelInputBlur} 
                        onChange={HandelInputValueChange}
                        required="required"
                        type="text"
                        className="SearchInput"
                        placeholder="Search friends"
                    />
                    <button type='submit'></button>
                </form>
            </div>
    )
}

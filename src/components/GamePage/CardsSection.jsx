import React from 'react'
import { useSelector } from 'react-redux'

const CardsSection = () => {

    const user = useSelector(store => store.user)

    console.log(user)
    
    return (
        <div>CardsSection</div>
    )
}

export default CardsSection
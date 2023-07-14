import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector((state)=> {
        return state.user.value
    } )
    
    return (
        <div className='text-left mt-4 '>
            {user.username ? (
                <h6>Welcome <u>{user.username}</u></h6>
            ): null} 
        </div>
    )
}

export default Profile
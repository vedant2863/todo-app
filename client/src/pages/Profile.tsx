import React from 'react'
import { useParams } from 'react-router-dom';

const Profile = ({id}: {id: string}) => {
    let params = useParams();

    console.log(params)
    console.log(params.id)

  return (
    <div>
      Profile {params.id}
    </div>
  )
}

export default Profile

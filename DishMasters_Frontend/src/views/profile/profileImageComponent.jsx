import React from 'react'
import { useStateContext } from "../../contexts/contextProvider";
import { Link } from 'react-router-dom';

export const profileImageComponent = () => {
    const { user } = useStateContext();

    const profileImageUrl = user?.profile_image
    ? `http://localhost:8000/storage/${user.profile_image}`
    : "https://via.placeholder.com/150"; // Default placeholder image

  return (
<div className="w-[3rem] mr-3">
  <Link to={`/profile/${user?.id}`}>
    <div className="relative">
      {/* Gradient Border */}
      <div className="w-12 h-12 rounded-full p-[3px] bg-gradient-to-r from-[#222222] to-DishColor">
        {/* Profile Image */}
        <img
          src={profileImageUrl}
          alt={`${user.name}'s profile`}
          className="w-full h-full rounded-full object-cover bg-white shadow-lg"
        />
      </div>
    </div>
  </Link>
</div>

  )
}

export default profileImageComponent
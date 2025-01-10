import React from 'react'

export const profileSidebar = () => {
  // ProfileSidebar.jsx
  return (
    <div className="bg-[#FFBD59] text-black p-4 rounded-lg shadow-lg max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Profile Highlights</h2>
      <p className="mb-2">🎯 View your activity and manage settings easily.</p>
      <ul className="space-y-2">
        <li>• Edit account settings</li>
        <li>• Change your profile picture</li>
        <li>• Check your activity log</li>
      </ul>
      <div className="mt-4">
        <button className="bg-black text-[#FFBD59] px-4 py-2 rounded-md hover:bg-[#ff9f3d]">
          Go to Settings
        </button>
      </div>
    </div>
  );
}

export default profileSidebar
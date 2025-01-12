// resources/js/views/ProfileImageUpload.jsx
import { useState } from "react";
import axiosClient from "../../axiosClient";

export default function ProfileImageUpload({ userId }) {
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setPreview(URL.createObjectURL(file)); // Show preview
    };

    const handleImageUpload = (e) => {
        e.preventDefault();

        if (!profileImage) return;

        const formData = new FormData();
        formData.append("profile_image", profileImage);

        axiosClient
            .post(`/profile/${userId}/profile-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                alert(data.message);
                setPreview(null);
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to upload image.");
            });
    };

    /*
    const handleResetImage = async () => {
        try {
            const response = await axiosClient.patch(`/profile/${userId}/reset-profile-image`);
            setProfileImage(null); // Reset the profile image state
            setPreview(null); // Clear the preview
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Failed to reset profile image.");
        }
    };
    */
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                    <label htmlFor="profile_image" className="block mb-2 font-semibold">
                        Upload Profile Image:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                {preview && (
                    <div>
                        <p className="font-semibold">Image Preview:</p>
                        <p>(Before saving the changes, upload your new image)</p>
                        <img src={preview} alt="Preview" className="w-32 h-32 rounded-full" />
                    </div>
                )}
                
                <div className="p-2">
                    {/* 
                    <button
                        type="button" // Make sure the button type is 'button'
                        onClick={handleResetImage}
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Reset Image
                    </button>
                    */}
                    <button
                        type="button" // Make sure the button type is 'button'
                        onClick={handleImageUpload} // Manually handle image upload
                        className="bg-[#222222] hover:bg-DishColor shadow-xs transition-all text-white px-4 py-2 rounded"
                    >
                        Upload New Image
                    </button>
                </div>
            </form>
        </div>
    );
}

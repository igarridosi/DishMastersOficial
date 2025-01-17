import React from 'react';
import { useState } from 'react';


const DishComments = ({ id, idPost, content, user, datetime, likes }) => {
    var [likes, setLikes] = useState(likes);

    const updateLikes = async () => {
        setLikes(likes + 1)
        try {
            await fetch('http://localhost:8000/api/dishcuss/updateDishComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, likes: likes + 1 }),
            });
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    return (
        <div className="from-DishColor via-orange-300 to-yellow-700 w-auto h-auto m-2 rounded p-3 flex flex-col justify-between h-full">
            <div className="bg-white size-full rounded flex flex-col h-full justify-center w-auto p-2 border-solid border-2 border-black">
                <div className="flex justify-between ml-1 mr-1">
                    <h4 className="text-base font-bold">{user}</h4>
                    <p>{datetime}</p>
                </div>
                <p className='break-words'>{content}</p>
                <div className="mt-auto  flex text-2xl font-bold">
                    <p className='pl-3' onClick={() => updateLikes()}>♥ {likes}</p>
                </div>
            </div>
        </div>

    );

}

export default DishComments;
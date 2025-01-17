import React from 'react';
import { useState, useEffect } from 'react';
import DishComment from './DishComments'
import CommentPopup from './CommentPopup'

const Dishcussing = ({ id, title, content, user, datetime, tag, likes, comments }) => {
  var [likes, setLikes] = useState(likes);
  var [comments, setComments] = useState(comments);
  const [showPopup, setShowPopup] = useState(false);
  const [dishcommenting, setDishComments] = useState([]);
  const [dateComment, setDateComment] = useState('');


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = (username, theText) => {
    updateComments(username, theText)
    setShowPopup(false);
  };
  useEffect(() => {
    const fetchDishComments = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dishcuss/getDishComments');
        if (response.ok) {
          const data = await response.json();
          setDishComments(data);
        } else {
          console.error('Error fetching dishcussings:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dishcussings:', error);
      }
    };

    fetchDishComments();
  }, []);




  const updateLikes = async () => {
    setLikes(likes + 1)
    try {
      await fetch('http://localhost:8000/api/dishcuss/updateDishcussing', {
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
  const updateComments = async (username, theText) => {
    setComments(comments + 1)
    if (username && theText) {
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var a = new Date();
      setDateComment(month[a.getMonth()] + " " + a.getDate() + " " + (a.getUTCHours() + 1) + ":" + a.getUTCMinutes());

      const idsToFind = dishcommenting.map(look => look.id);
      const maxId = idsToFind.length > 0 ? Math.max(...idsToFind) : 0;
      const idPost = id
      const newDishComment = { id: maxId + 1, idPost, theText, username, dateComment, likes: 0 };
      try {
        const response = await fetch('http://localhost:8000/api/dishcuss/saveDishComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDishComment),
        });

        if (response.ok) {
          setDishComments((prevState) => [...prevState, newDishComment]);
        } else {
          alert('Error saving dishcussing');
        }
      } catch (error) {
        console.error('Error saving dishcussing:', error);
        alert('Error saving dishcussing');
      }
      try {
        await fetch('http://localhost:8000/api/dishcuss/updateDishcussing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: idPost, comments: comments + 1 }),
        });
      } catch (error) {
        console.error('Error updating Comments:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="hover:animate-background rounded-xl bg-gradient-to-r from-DishColor via-orange-300 to-yellow-700 p-0.5 shadow-xl transition  p-1 flex flex-col justify-between max-w-[20rem] h-25 mt-3 mb-5">
      <div className=" size-full rounded flex flex-col h-full p-3">
        <div className="flex justify-between ml-1 mr-1">
          <h4 className="text-base mb-2 font-bold">{user}</h4>
          <p>{datetime}</p>
        </div>
        <div className='flex'>
          <p className="flex justify-start text-lg font-bold mr-3">Tag:</p>
          <p className="no-underline text-white font-bold bg-black pl-1 pr-1">{tag}</p>
        </div>
        <h2 className="text-2xl mb-10 mt-1 font-bold">{title}</h2>
        <p className='break-words'>{content}</p>
        <div className="mt-auto pt-6 flex text-2xl font-bold">
          <img src="/img/comment.svg" className="size-8 mr-4" onClick={() => togglePopup()} />
          <p>{comments}</p>
          <CommentPopup show={showPopup} onClose={togglePopup} onSubmit={handleSubmit} />
          <p className='pl-3' onClick={() => updateLikes()}>♥ {likes}</p>
        </div>
      </div>
      <div className='overflow-y-auto max-h-64'>
        {dishcommenting.map((dishcussion, index) => {
          if (dishcussion.idPost == id) {
            return (
              <DishComment
                key={index}
                id={dishcussion.id}
                datetime={dishcussion.dateComment}
                user={dishcussion.username}
                likes={dishcussion.likes}
                content={dishcussion.theText}
              />
            );

          }
        })}
      </div>
    </div>


  );

}

export default Dishcussing; 
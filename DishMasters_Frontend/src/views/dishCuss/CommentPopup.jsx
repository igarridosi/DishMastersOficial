import React, { useState } from 'react';

const CommentPopup = ({ show, onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');


  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, text);
    setUsername('');
    setText('');
  };

  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup-content flex flex-col bg-black p-5">
        <h2 className='text-DishColor'>Enter something</h2>
        <form onSubmit={handleSubmit} className='flex flex-col '>
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Username"
            className='mb-2 w-full rounded'
          />
          <textarea
            value={text}
            onChange={handleInputChange2}
            placeholder="Text"
            className='mb-2 w-full rounded min-h-[10rem] text-lg p-2'
          />
          <button type="submit" className='mb-2 bg-DishColor font-bold rounded'>Submit</button>
        </form>
        <button onClick={onClose} className='bg-DishColor font-bold rounded'>Close</button>
      </div>

      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        input {
          padding: 10px;
          margin-right: 10px;
          font-size: 16px;
        }
        button {
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CommentPopup;

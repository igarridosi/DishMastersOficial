import { useState, useEffect } from 'react';
import Dishcussing from './Dishcuss';

function App() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [user, setUser] = useState('');
  const [datetime, setDatetime] = useState('');
  const [tag, setTag] = useState('Question');
  const [dishcussings, setDishcussings] = useState([]);

  useEffect(() => {
    const fetchDishcussings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dishcuss/getDishcussings');
        if (response.ok) {
          const data = await response.json();
          setDishcussings(data);
        } else {
          console.error('Error fetching dishcussings:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dishcussings:', error);
      }
    };

    fetchDishcussings();
  }, []);

  const clicked = async () => {
    if (title && text && user && tag) {
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var a = new Date();
      setDatetime(month[a.getMonth()] + " " + a.getDate() + " " + (a.getUTCHours() + 1) + ":" + a.getUTCMinutes());

      const idsToFind = dishcussings.map(look => look.id);
      const maxId = idsToFind.length > 0 ? Math.max(...idsToFind) : 0;
      const newDishcussing = { id: maxId + 1, title, text, user, datetime, tag, likes: 0, comments: 0 };
      try {
        const response = await fetch('http://localhost:8000/api/dishcuss/saveDishcussing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDishcussing),
        });

        if (response.ok) {
          setDishcussings((prevState) => [...prevState, newDishcussing]);
          setTitle('');
          setText('');
          setUser('');
        } else {
          alert('Error saving dishcussing');
        }
      } catch (error) {
        console.error('Error saving dishcussing:', error);
        alert('Error saving dishcussing');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="flex-1 space-y-4 flex justify-center items-center flex-col">
          <img src="/img/dishcuss_logo_black2.png" alt="" className="mb-4 size-64" />
          <h1 className="text-2xl font-bold">Welcome to Dishcuss</h1>

          <div id="dishy" className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <label className='font-bold'>
              Tag:
            </label>
            <select name="tag" className='block w-full p-2 border border-gray-300 rounded font-sans' onChange={(e) => setTag(e.target.value)}>
              <option value="Question" className='font-sans'>Question</option>
              <option value="Information" className='font-sans'>Information</option>
              <option value="Community" className='font-sans'>Community</option>
              <option value="Review" className='font-sans'>Review</option>
            </select>

            <textarea
              placeholder="Enter text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded min-w-[30rem] min-h-[10rem]"
            />
            <button
              onClick={clicked}
              className="w-full p-2 bg-DishColor text-white rounded hover:bg-yellow-700"
            >
              Create post
            </button>
          </div>
        </div>
      </div>

      <div id="dishCussions" className="flex flex-wrap justify-center space-x-8 mt-8">
        {dishcussings.map((dishcussing, index) => (
          <Dishcussing
            id={dishcussing.id}
            key={index}
            title={dishcussing.title}
            content={dishcussing.text}
            user={dishcussing.user}
            datetime={dishcussing.datetime}
            tag={dishcussing.tag}
            likes={dishcussing.likes}
            comments={dishcussing.comments}
          />
        ))}
      </div>
    </>
  );
}

export default App;

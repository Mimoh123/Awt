import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

type toDo = {
  id: string;
  todo: string;
};
function App() {
  const [list, setList] = useState<toDo[]>([]);
  const [text, setText] = useState<string>('');
  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`${url}/allList`);
        if (response.ok) {
          const data = await response.json();
          console.log('this is the data', data);
          setList(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchList();
  }, []);
  const addList = async (text: string) => {
    try {
      const response = await fetch(`${url}/create_todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        const data: toDo = await response.json();
        console.log('this is the data', data);
        if (data) {
          setText('');
          setList((prev) => [...prev, data]);
        }
      }
    } catch (err) {}
  };

  return (
    <>
      <div>Welcome to my todo app</div>
      <div>
        <table>
          <tr>
            <th>SN</th>
            <th>Activity</th>
          </tr>
          {list?.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.todo}</td>
              </tr>
            );
          })}
        </table>
        <input
          type='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addList(text);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default App;

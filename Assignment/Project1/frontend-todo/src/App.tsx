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
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
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
          setLoading(false);
        }
      }
    } catch (err) {}
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>Welcome to my Todo App</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '80%',
          maxWidth: '600px',
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 10px',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '2px solid #000',
              }}
            >
              <th style={{ textAlign: 'left', padding: '12px 16px' }}>SN</th>
              <th style={{ textAlign: 'left', padding: '12px 16px' }}>
                Activity
              </th>
            </tr>
          </thead>

          <tbody>
            {list?.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  backgroundColor: '#f2fae5',
                  borderRadius: '10px',
                  height: '40px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
                }}
              >
                <td
                  style={{
                    padding: '10px 15px',
                    borderRadius: '10px 0 0 10px',
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    padding: '10px 15px',
                    borderRadius: '0 10px 10px 0',
                  }}
                >
                  {item.todo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter a new task'
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              flex: 1,
            }}
          />
          <button
            onClick={() => addList(text)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <span>{loading ? 'Loading..' : 'Submit'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

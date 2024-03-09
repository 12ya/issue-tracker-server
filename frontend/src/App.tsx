import { useEffect, useState } from 'react';

import axios from 'axios';

import './App.css';

import { Issue } from './components/issue';

function App() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const { data: response } = await axios.get('http://localhost:3000/issues/');
        console.log(`🚀 -------------------------🚀`);
        console.log(`🚀 ~ getData ~ data:`, response.issues);

        setData(response.issues);
    };

    const [isInputVisible, setInputVisible] = useState(false);

    const toggleInputVisibility = () => {
        setInputVisible((prev) => !prev);
    };

    useEffect(() => {
        getData();
    }, []);

    const createIssue = async ({ title, description }) => {
        try {
            await axios.post('http://localhost:3000/issues/', { title, description });
            toggleInputVisibility();
        } catch (error) {
            console.log(`🚀 -------------------------------🚀`);
            console.log(`🚀 ~ createIssue ~ error:`, error);
        } finally {
            setTimeout(() => void getData(), 500);
        }
    };

    return (
        <div>
            <h2>Issues:</h2>

            <button style={{ marginBottom: 40 }} onClick={toggleInputVisibility}>
                Create issue
            </button>

            {isInputVisible ? <Input onCreate={createIssue} /> : null}

            <div style={{ marginTop: 40 }}>
                {data.map((issue) => (
                    <Issue key={issue.id} {...issue} />
                ))}
            </div>
        </div>
    );
}

const Input = ({ onCreate }) => {
    const [state, setState] = useState({ title: '', description: '' });

    return (
        <div>
            <input
                key={'title'}
                name='js'
                title='title'
                value={state.title}
                onChange={({ target: { value } }) => {
                    setState((prev) => ({ ...prev, title: value }));
                }}
            />
            <input
                key={'description'}
                name='adsf'
                title='description'
                value={state.description}
                onChange={({ target: { value } }) => {
                    setState((prev) => ({ ...prev, description: value }));
                }}
            />
            <button
                onClick={() =>
                    void onCreate({ title: state.title, description: state.description })
                }
            >
                Add
            </button>
        </div>
    );
};

export default App;

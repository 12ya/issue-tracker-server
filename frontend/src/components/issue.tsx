import axios from 'axios';
import { useState } from 'react';

export const Issue = ({ title, id, description }) => {
    const [areDetailsVisible, setDetailsVisible] = useState(false);
    const [state, setState] = useState({ id, description, title });
    const [isEditMode, setEditMode] = useState(false);

    const toggleDetails = () => {
        setDetailsVisible((prev) => !prev);
    };

    const handleUpdate = async () => {
        setEditMode(false);
        try {
            await axios.put('http://localhost:3000/issues', {
                id: state.id,
                title: state.title,
                description: state.description,
            });

            setTimeout(() => {
                window.location.reload();
            }, 400);
        } catch (error) {
            console.log(`🚀 --------------------------------🚀`);
            console.log(`🚀 ~ handleUpdate ~ error:`, error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/issues/${id}`);

            setTimeout(() => {
                window.location.reload();
            }, 400);
        } catch (error) {
            console.log(`🚀 --------------------------------🚀`);
            console.log(`🚀 ~ handleDelete ~ error:`, error);
            console.log(`🚀 --------------------------------🚀`);
        }
    };

    return (
        <div
            onClick={() => {
                toggleDetails();
            }}
            style={{
                backgroundColor: 'orange',
                borderRadius: 20,
                padding: 20,
                marginBottom: 50,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <span>{title}</span>
            {areDetailsVisible ? (
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        marginTop: 20,
                    }}
                >
                    <span onClick={(e) => void e.stopPropagation()}>id: {state.id}</span>
                    <span onClick={(e) => void e.stopPropagation()}>
                        title:{' '}
                        {isEditMode ? (
                            <input
                                key={'title'}
                                name='adsf'
                                title='title'
                                value={state.title}
                                onChange={({ target: { value } }) => {
                                    setState((prev) => ({ ...prev, title: value }));
                                }}
                            />
                        ) : (
                            state.title
                        )}
                    </span>
                    <span onClick={(e) => void e.stopPropagation()}>
                        description:{' '}
                        {isEditMode ? (
                            <input
                                key={'description'}
                                name='adsf'
                                title='description'
                                value={state.description}
                                onChange={({ target: { value } }) => {
                                    setState((prev) => ({ ...prev, description: value }));
                                }}
                            />
                        ) : (
                            state.description
                        )}
                    </span>
                </div>
            ) : null}
            {areDetailsVisible ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        style={{ padding: 20, borderRadius: 20 }}
                    >
                        Delete
                    </button>
                    {!isEditMode ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditMode(true);
                            }}
                            style={{ padding: 20, borderRadius: 20 }}
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();

                                handleUpdate();
                            }}
                            style={{ padding: 20, borderRadius: 20, backgroundColor: 'purple' }}
                        >
                            Update
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    );
};

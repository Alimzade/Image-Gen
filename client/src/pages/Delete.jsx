import React, { useState } from 'react';

const Delete = () => {
    const [postId, setPostId] = useState('');
    const [resultMessage, setResultMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const base_url = "https://localhost:8080/api/v1/post/"
            console.log("Deleting post with ID:", postId); // Add this line
            const response = await fetch(`${base_url}${postId}`, {
                method: 'DELETE',
            });

            console.log("Response status:", response.status); // Add this line

            if (response.status === 200) {
                setResultMessage('Post deleted successfully.');
            } else {
                setResultMessage('Failed to delete post.');
            }
        } catch (error) {
            console.error(error);
            setResultMessage('An error occurred.');
        }
    };

    return (
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Delete Post by ID</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="postId" className="text-sm font-medium text-gray-600 mb-1">Post ID</label>
                    <input
                        type="text"
                        id="postId"
                        name="postId"
                        required
                        value={postId}
                        onChange={(e) => setPostId(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="bg-[#fc5549] text-white font-semibold py-2 rounded-lg hover:bg-[#d92d21] transition duration-300">
                    Delete Post
                </button>
            </form>

            {resultMessage && (
                <div className={`mt-4 text-sm ${resultMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                    {resultMessage}
                </div>
            )}
        </div>
    );
}

export default Delete;

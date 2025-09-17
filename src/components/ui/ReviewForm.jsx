import React, { useState } from "react";

export default function ReviewForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      onSubmit({ text, image });
      setText("");
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        rows={3}
        required
      />
      <input type="file" accept="image/*" onChange={handleImage} className="block" />
      {image && <img src={image} alt="Review" className="w-24 h-24 object-cover rounded mt-2" />}
      <button type="submit" className="px-4 py-2 bg-primary text-white rounded font-semibold">Submit Review</button>
    </form>
  );
}

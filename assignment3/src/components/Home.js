import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const user = localStorage.getItem("user");
let userId = null;
if (user) {
  userId = JSON.parse(user).userId;
}

const Home = ({ isauthenticated }) => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  console.log("notes: ", notes);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/note", {
      userId: userId,
      note,
      checked,
    });
    setNotes((prev) => [res.data, ...prev]);
    setChecked(false);
    setNote("");
  };

  useEffect(() => {
    console.log("isauthenticated: ", isauthenticated);
    if (!isauthenticated) {
      navigate("/login");
      return;
    } else {
      const fetchNotes = async () => {
        const res = await axios.get(`/notes/${userId}`);
        setNotes(res.data.result);
      };

      fetchNotes();
    }
  }, [isauthenticated, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="secret">secret</label>
        <input
          type="checkbox"
          id="secret"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input type="submit" />
      </form>

      {notes?.length
        ? notes.map((note) => <p key={note._id}>{note.note}</p>)
        : ""}
    </div>
  );
};

export default Home;

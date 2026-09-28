import { useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const API_URL = "http://localhost:5000/skills";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET skills
  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }

      const data = await response.json();
      setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page loads
  useEffect(() => {
    fetchSkills();
  }, []);

  // POST new skill
  const addSkill = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a skill name");
      return;
    }

    try {
      setError(null);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          completed: false
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add skill");
      }

      const newSkill = await response.json();

      setSkills([...skills, newSkill]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  };

  // PUT update status
  const handleToggle = async (skill) => {
    try {
      setError(null);

      const response = await fetch(`${API_URL}/${skill.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: skill.title,
          completed: !skill.completed
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update skill");
      }

      const updatedSkill = await response.json();

      setSkills(
        skills.map((item) =>
          item.id === updatedSkill.id ? updatedSkill : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE skill
  const handleDelete = async (id) => {
    try {
      setError(null);

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete skill");
      }

      setSkills(skills.filter((skill) => skill.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>My Skills</h1>

      <form onSubmit={addSkill} className="skill-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter skill name"
        />

        <button type="submit">
          Add Skill
        </button>
      </form>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading />
      ) : (
        <div className="skill-list">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;
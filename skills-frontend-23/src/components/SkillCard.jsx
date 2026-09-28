function SkillCard({ skill, onToggle, onDelete }) {
  return (
    <div className="skill-card">
      <div>
        <h3>{skill.title}</h3>

        <p>
          Status:{" "}
          <strong>
            {skill.completed ? "Completed" : "Pending"}
          </strong>
        </p>
      </div>

      <div className="card-buttons">
        <button onClick={() => onToggle(skill)}>
          {skill.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button onClick={() => onDelete(skill.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default SkillCard;
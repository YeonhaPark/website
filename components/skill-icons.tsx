interface SkillIconsProps {
  usedSkills: { name: string; path: string }[];
}

export const SkillIcons = ({ usedSkills }: SkillIconsProps) => {
  return (
    <div className="flex items-center gap-3">
      {usedSkills.map((skill) => (
        <div key={skill.name} className="tech-logo relative">
          <img
            src={skill.path}
            alt={skill.name}
            loading="eager"
            decoding="sync"
            className="w-5 h-5"
          />
        </div>
      ))}
    </div>
  );
};

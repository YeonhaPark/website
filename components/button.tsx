interface ButtonProps {
  name: string;
  isBeam?: boolean;
  containerClass?: string;
}

export const Button = ({
  name,
  isBeam = true,
  containerClass,
}: ButtonProps) => {
  return (
    <button className={`btn ${containerClass}`}>
      {isBeam && (
        <span className="relative flex h-2 w-2">
          <span className="btn-ping" />
          <span className="btn-ping-dot" />
        </span>
      )}
      {name}
    </button>
  );
};

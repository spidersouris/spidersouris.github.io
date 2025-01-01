type DotProps = {
  color?: string;
  size?: number;
};

export const Dot: React.FC<DotProps> = ({ color = "#3498db", size = 10 }) => {
  return (
    <div
      className="dot relative inline-block rounded-full"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
    ></div>
  );
};

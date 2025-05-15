type StatCardProps = {
  status: "completed" | "delivering" | "paused" | "idle";
  id: string;
  children?: React.ReactNode;
  clickHandler: (id: string) => void;
};

export const Button: React.FC<StatCardProps> = ({
  status,
  id,
  clickHandler,
  children,
}) => {
  if (status == "completed") return null;

  if (status == "delivering")
    return <button onClick={() => clickHandler(id)}>complete</button>;

  var statusString = "paused";
  if (status == "paused") return (statusString = "resume");

  return <button onClick={() => clickHandler(id)}>{children}</button>;
};

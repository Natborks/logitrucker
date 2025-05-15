import styles from "./statusBadge.module.css";

type StatusBadgeProps = {
  status: "delivering" | "paused" | "idle" | "completed";
  className?: string;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const getStatusClass = (status: string): string => {
    switch (status) {
      case "delivering":
        return styles.statusActive;
      case "idle":
        return styles.statusIdle;
      case "paused":
        return styles.statusInactive;
      case "completed":
        return styles.statusActive;
      default:
        throw new Error("Illegal state for status");
    }
  };

  const statusClass = getStatusClass(status);

  return (
    <span className={`${styles.statusBadge} ${statusClass} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

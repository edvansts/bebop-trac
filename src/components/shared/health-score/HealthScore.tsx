import React from "react";
import { colors } from "../../../static/Styles";

interface HealthScoreProps {
  healthScore: number;
}

function HealthScore({ healthScore }: HealthScoreProps) {
  const color =
    healthScore > 80
      ? colors.green
      : healthScore > 50
      ? colors.warn
      : colors.red;

  return <span style={{ color: color }}>{healthScore}%</span>;
}

export default HealthScore;

"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueChart = ({ open, in_progress, closed }: Props) => {
  const statuses = [
    { label: "Open", value: open },
    { label: "In Progress", value: in_progress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statuses}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-11)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;

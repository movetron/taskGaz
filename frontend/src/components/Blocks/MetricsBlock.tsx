// src/components/Blocks/MetricsBlock.tsx
import React, { useEffect, useState } from "react";
import api from "../../api";
import MetricsChart from "../../features/metrics/MetricsChart";
import "../../styles/metrics.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";


type Metric = {
  metric_id: number;
  metric_timestamp: string;
  cpu_utilization: number;
  memory_utilization: number;
  disk_utilization: number;
  node_id: number;
};

const MetricsBlock: React.FC = () => {
    const [allMetrics, setAllMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  const nodes = useSelector((s: RootState) => s.nodes.list);

  useEffect(() => {
    api.get<Metric[]>("/metrics")
      .then(res => setAllMetrics(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="block">Загрузка метрик...</div>;
  if (!nodes.length) return <div className="block">Нет метрик</div>;

  // Получаем уникальные node_id
  const metrics = allMetrics.filter(m => nodes.some(n => n.id === m.node_id));
  const nodeIds = Array.from(new Set(metrics.map(m => m.node_id)));

  return (
    <div className="metrics-block">
      <h3>Метрики по нодам</h3>
      <div className="metric-body">
            {nodeIds.map((nodeId, idx) => {
                const data = metrics.filter(m => m.node_id === nodeId);
                const labels = data.map(m => m.metric_timestamp);
                const cpuData = data.map(m => m.cpu_utilization);
                const memoryData = data.map(m => m.memory_utilization);
                const diskData = data.map(m => m.disk_utilization);

                return (
                <div key={nodeId} style={{ marginBottom: "2rem" }}>
                    <h4>Node #{idx + 1} (ID: {nodeId})</h4>
                    <div className="metrics-line">
                        <MetricsChart
                        labels={labels}
                        cpuData={cpuData}
                        memoryData={memoryData}
                        diskData={diskData}
                        />
                    </div>
                </div>
                );
            })}
      </div>
    </div>
  );
};

export default MetricsBlock;

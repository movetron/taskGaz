-- backend/sql/metrics.sql
SELECT
  m.id               AS metric_id,
  m.datetime         AS metric_timestamp,
  m.cpu_utilization,
  m.memory_utilization,
  m.disk_utilization,

  n.id               AS node_id,
  n.caption          AS node_name,
  n.status           AS node_status

FROM metrics m
LEFT JOIN nodes n ON m.node_id = n.id
ORDER BY m.datetime;

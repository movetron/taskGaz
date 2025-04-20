SELECT 
  n.id,
  n.caption,
  n.status,
  m.cpu_utilization,
  m.memory_utilization,
  m.disk_utilization
FROM nodes n
LEFT JOIN metrics m ON m.node_id = n.id
WHERE m.datetime = (
  SELECT MAX(datetime)
  FROM metrics
  WHERE node_id = n.id
);

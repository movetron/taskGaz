const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const db = require("../db");

router.get("/groups", (req, res) => {
  let sql = fs
    .readFileSync(path.resolve(process.env.BASEDIR, "sql/groups.sql"))
    .toString();

  db(sql)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

router.get("/metrics", (req, res) => {
  let sql = fs
    .readFileSync(path.resolve(process.env.BASEDIR, "sql/metrics.sql"))
    .toString();
  db(sql)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});
router.get("/status", async (req, res) => {
    try {
      const sql = fs.readFileSync(path.resolve(process.env.BASEDIR, "sql/status.sql")).toString();
      const result = await db(sql);
  
      if (result.length === 0) {
        return res.status(404).json({ error: "Нет данных" });
      }
  
      res.json({ status: result[0].worst_status });
    } catch (err) {
      console.error("Ошибка при получении статуса:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get("/nodes", (req, res) => {
    let sql = fs
      .readFileSync(path.resolve(process.env.BASEDIR, "sql/nodes.sql"))
      .toString();
    db(sql)
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  });
  
  router.get("/status-block", (req, res) => {
    let groupId = req.query.groupId;
  
    let sqlPath = path.resolve(process.env.BASEDIR, "sql/status-block.sql");
    let sql = fs.readFileSync(sqlPath).toString();
  
    if (groupId) {
      db(sql, [groupId])
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
    } else {
      // если группы нет, то просто без WHERE
      let sqlNoFilter = `
        SELECT s.*
        FROM nodes n
        JOIN statuses s ON n.status = s.id;
      `;
      db(sqlNoFilter)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
    }
  });
  router.get("/statuses", (req, res) => {
    const groupId = Number(req.query.groupId);
    if (!groupId) {
      return res.status(400).json({ error: "groupId is required" });
    }
  
    // SQL: вытягиваем статус каждой ноды из этой группы
    const sql = `
      SELECT s.id, s.color, s.description
      FROM group_nodes gn
      JOIN nodes n    ON gn.node_id   = n.id
      JOIN statuses s ON n.status     = s.id
      WHERE gn.group_id = ?
    `;
  
    db(sql, [groupId])
      .then(rows => {
        if (rows.length === 0) {
          return res.status(404).json({ error: "No nodes in this group" });
        }
        res.json(rows);
      })
      .catch(err => {
        console.error("Error in /nodes/status:", err);
        res.status(500).json({ error: err.message });
      });
  });
  
module.exports = router;

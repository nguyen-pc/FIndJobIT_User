// src/pages/admin/SkillManagement.jsx
import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { mockSkills } from "../../data/mockData";
import Header from "../../components/admin/Header";

const SkillManagement = () => {
  const [skills, setSkills] = useState(mockSkills);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;
    const newId =
      skills.length > 0 ? Math.max(...skills.map((s) => s.id)) + 1 : 1;
    setSkills([...skills, { id: newId, name: newSkill }]);
    setNewSkill("");
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên kỹ năng", flex: 1 },
    {
      field: "actions",
      headerName: "Hành động",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteSkill(params.row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="QUẢN LÝ KỸ NĂNG" subtitle="Danh sách kỹ năng hệ thống" />

      <Box mb={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Tên kỹ năng mới"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddSkill}
          >
            Thêm
          </Button>
        </Stack>
      </Box>

      <Box height="400px">
        <DataGrid
          rows={skills}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
};

export default SkillManagement;

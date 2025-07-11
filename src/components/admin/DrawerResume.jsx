import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { message } from "antd";
import { callUpdateResumeStatus } from "../../config/api";

const statusList = ["PENDING", "REVIEWING", "APPROVED", "REJECTED"];

export default function DrawerResume({
  resumeData,
  onStatusChange,
  open,
  onClose,
}) {
  const [resume, setResume] = useState(resumeData || {});
  const [selectedStatus, setSelectedStatus] = useState(
    resumeData?.status || ""
  );

  useEffect(() => {
    setResume(resumeData || {});
    setSelectedStatus(resumeData?.status || "");
  }, [resumeData]);

  // Khi chọn trạng thái mới, chỉ cập nhật state cục bộ
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Khi click nút cập nhật, gọi callback onStatusChange
  const handleUpdateStatus = async () => {
    const updatedResume = { ...resume, status: selectedStatus };
    console.log(
      "Updating Resume status:",
      updatedResume.id,
      updatedResume.status
    );
    const res = await callUpdateResumeStatus(
      updatedResume?.id,
      updatedResume.status
    );
    if (res.data) {
      message.success("Update Resume status thành công!");
      if (onStatusChange) {
        onStatusChange(updatedResume);
      }
      // Đóng modal sau khi cập nhật thành công
      onClose();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const DrawerList = (
    <Box sx={{ width: 450 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                variant: "h4",
                sx: { fontWeight: "bold" },
              }}
              primary={"Thông tin Resume"}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={`Người cập nhật: ${resume.email || "-"}`} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary={`Tên công ty: ${resume.companyName || "-"}`}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary={`Tên công việc: ${resume.job?.name || "-"}`}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={"Trạng thái:"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectedStatus || ""}
                label="Status"
                onChange={handleStatusChange}
              >
                {statusList.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateStatus}
              fullWidth
            >
              Cập nhật trạng thái
            </Button>
          </ListItemButton>
        </ListItem>
        {/* Bạn có thể hiển thị thêm thông tin khác nếu cần */}
      </List>
      <Divider />
      {/* Nếu cần thêm danh sách hoặc thông tin bổ sung */}
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
}

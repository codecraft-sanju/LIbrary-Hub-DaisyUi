import express from "express";
import { 
    markAttendance, 
    getStudentAttendance, 
    getAttendanceByDate, 
    deleteAttendance, 
    getAllAttendance
} from "../controllers/attendanceController.js";
import { isAuth } from "../middlewares/isAuth.js";


const router = express.Router();

router.post("/mark", isAuth, markAttendance); 
router.get("/student/:studentId", isAuth, getStudentAttendance); 
router.get("/getall",isAuth, getAllAttendance);
router.get("/date/:date",isAuth, getAttendanceByDate); 
router.delete("/:id",isAuth, deleteAttendance);

export default router;

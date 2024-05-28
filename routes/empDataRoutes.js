const express = require("express")
const router = express.Router()

const {fetchEmployeesData, fetchEmployeeData, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/empData")

router.route("/").get(fetchEmployeesData).post(createEmployee)

router.route("/:id").get(fetchEmployeeData).patch(updateEmployee).delete(deleteEmployee)

module.exports = router
import { Request, Response } from "express";

import { StudentApplication } from "../application/student.application";
import { IStudentUpdate, Student, StudentProperties } from "../domain/student";
import { StudentInMemory } from "../infrastructure/in-memory/student.inmemory";

class StudentController {
  constructor(private readonly application: StudentApplication) {}

  async getAll(req: Request, res: Response) {
    const students = await this.application.getAll();
    res.json(students);
  }

  async getOne(req: Request, res: Response) {
    if (isNaN(Number(req.params.id)))
      return res.status(400).json({ message: "Invalid ID" });

    if (Number(req.params.id) < 1)
      return res.status(400).json({ message: "Invalid ID" });

    const student = await this.application.getById(Number(req.params.id));
    res.json(student);
  }

  async getByPage(req: Request, res: Response) {
    const { page, limit } = req.query;

    if (isNaN(Number(page)) || isNaN(Number(limit))) {
      return res.status(400).json({ message: "Invalid page or limit" });
    }

    if (Number(page) < 1 || Number(limit) < 1)
      return res.status(400).json({ message: "Invalid page or limit" });

    const students = await this.application.getByPage(
      Number(page),
      Number(limit)
    );
    res.json(students);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      lastname,
      age,
      email,
      phone,
      address,
      city,
      country,
      gender,
      career,
      semester,
    } = req.body;

    const regExp = new RegExp(
      /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|googlemail|yahoo|gmx|ymail|outlook|bluewin|protonmail|t\-online|web\.|online\.|aol\.|live\.)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,63}|\d{1,3})(\]?)$/
    );

    if (!regExp.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (address.length < 5)
      return res.status(400).json({ message: "Invalid address" });

    if (city.length < 3)
      return res.status(400).json({ message: "Invalid city" });

    if (country.length < 3)
      return res.status(400).json({ message: "Invalid country" });

    if (
      !career.trim().toLowerCase().includes("ingenieria") &&
      !career.trim().toLowerCase().includes("ing")
    )
      return res.status(400).json({ message: "Invalid career" });

    const student: StudentProperties = {
      name,
      lastname,
      age,
      email,
      phone,
      address,
      city,
      country,
      gender,
      career,
      semester,
    };

    const response = await this.application.create(new Student(student));
    res.json(response);
  }

  async update(req: Request, res: Response) {
    const student: Partial<IStudentUpdate> = req.body;

    const response = await this.application.update(
      Number(req.params.id),
      student
    );
    res.json(response);
  }

  async delete(req: Request, res: Response) {
    const response = await this.application.remove(Number(req.params.id));
    res.json(response);
  }
}

export default new StudentController(
  new StudentApplication(StudentInMemory.getInstance())
);

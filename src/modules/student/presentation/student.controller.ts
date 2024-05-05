import { Request, Response } from 'express';

import { StudentPort } from '../domain/repositories/student.port';
import { IStudent, IStudentUpdate } from '../infrastructure/in-memory/student.inmemory';

export class StudentController {
  private readonly repository: StudentPort;

  constructor(repository: StudentPort) {
    this.repository = repository;
  }

  //constructor(private readonly repository: StudentInMemory) {}

  async getAll(req: Request, res: Response) {
    const students = await this.repository.findAll();

    //res.status(200).type("application/json").send(JSON.stringify(students));
    //res.type("application/json").send(JSON.stringify(students));
    res.json(students);
  }

  async getOne(req: Request, res: Response) {
    if (isNaN(Number(req.params.id)))
      return res.status(400).json({ message: "Invalid ID" });

    if (Number(req.params.id) < 1)
      return res.status(400).json({ message: "Invalid ID" });

    const student = await this.repository.findOne(Number(req.params.id));
    //res.send("Student's details");
    res.json(student);
  }

  async getByPage(req: Request, res: Response) {
    const { page, limit } = req.query;

    if (isNaN(Number(page)) || isNaN(Number(limit))) {
      return res.status(400).json({ message: "Invalid page or limit" });
    }

    if (Number(page) < 1 || Number(limit) < 1)
      return res.status(400).json({ message: "Invalid page or limit" });

    const students = await this.repository.getByPage(
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

    const student: IStudent = {
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

    const response = await this.repository.create(student);
    res.json(response);
  }

  async update(req: Request, res: Response) {
    const student: Partial<IStudentUpdate> = req.body;

    const response = await this.repository.update(
      Number(req.params.id),
      student
    );
    res.json(response);
  }

  async delete(req: Request, res: Response) {
    const response = await this.repository.delete(Number(req.params.id));
    res.json(response);
  }
}

import { Request, Response } from 'express';

import { RedisBootstrap } from '../../../../src/bootstrap/redis.bootstrap';
import { UserApplication } from '../../../../src/modules/user/application/user.application';
import { UserInfrastructure } from '../../../../src/modules/user/infrastructure/user.infrastructure';
import { UserController } from '../../../../src/modules/user/presentation/user.controller';

jest.mock("../../../../src/modules/user/infrastructure/user.infrastructure"); // Ajustar la ruta según sea necesario
jest.mock("../../../../src/bootstrap/redis.bootstrap");

describe("UserController.getById", () => {
  let userController: UserController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let mockUserRepository: jest.Mocked<UserInfrastructure>;

  beforeEach(() => {
    mockUserRepository =
      new UserInfrastructure() as jest.Mocked<UserInfrastructure>;
    userController = new UserController(
      new UserApplication(mockUserRepository)
    );
    req = {
      params: { id: "1" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      locals: {},
    };
    next = jest.fn();
  });

  it("should return a user successfully", async () => {
    const mockUser = { id: "1", name: "Test User" };
    (UserApplication.prototype.getById as jest.Mock) = jest
      .fn()
      .mockResolvedValue({
        isErr: () => false,
        value: mockUser,
      });

    await userController.getById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should handle errors correctly", async () => {
    const mockError: any = {
      status: 404,
      statusCodeId: "NOT_FOUND",
      message: "User not found",
      stack: "",
      errorsDetails: [],
    };
    (UserApplication.prototype.getById as jest.Mock) = jest
      .fn()
      .mockResolvedValue({
        isErr: () => true,
        error: mockError,
      });

    await userController.getById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCodeId: "NOT_FOUND",
        message: "User not found",
      })
    );
  });

  it("should cache the user if cacheKey is present", async () => {
    const mockUser = { id: "1", name: "Test User" };
    res.locals.cacheKey = "user_1";
    (UserApplication.prototype.getById as jest.Mock) = jest
      .fn()
      .mockResolvedValue({
        isErr: () => false,
        value: mockUser,
      });

    await userController.getById(req as Request, res as Response);

    expect(RedisBootstrap.set).toHaveBeenCalledWith(
      "user_1",
      JSON.stringify(mockUser)
    );
  });
});

import * as httpMock from 'node-mocks-http';

import { RedisBootstrap } from '../../../../src/bootstrap/redis.bootstrap';
import { UserApplication } from '../../../../src/modules/user/application/user.application';
import { UserRepository } from '../../../../src/modules/user/domain/repositories/user.repository';
import { UserInfrastructure } from '../../../../src/modules/user/infrastructure/user.infrastructure';
import { UserController } from '../../../../src/modules/user/presentation/user.controller';

let userRepository: UserRepository;

describe("user/controller", () => {
  describe("getAll", () => {
    beforeAll(() => {
      //RedisBootstrap.set = jest.fn();
    });

    beforeEach(() => {
      jest.clearAllMocks();
      RedisBootstrap.set = jest.fn();
      (UserInfrastructure as jest.Mock) = jest.fn();

      userRepository = new UserInfrastructure();
    });

    it("should get all users", async () => {
      // Arrange
      const users = [
        { id: "1", name: "User 1" },
        { id: "2", name: "User 2" },
      ];

      const mockGetAll = jest.fn().mockResolvedValue({
        isErr: jest.fn().mockReturnValue(false),
        value: users,
      });

      (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
        getAll: mockGetAll,
      });
      const userApplication = new UserApplication(userRepository);
      const userController = new UserController(userApplication);
      const request = httpMock.createRequest();
      const response = httpMock.createResponse();
      const next = jest.fn();

      // Act
      await userController.getAll(request, response);

      // Assert
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toEqual(users);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(RedisBootstrap.set).not.toHaveBeenCalled();
    });

    it("should get error", async () => {
      // Arrange
      const mockGetAll = jest.fn().mockResolvedValue({
        isErr: jest.fn().mockReturnValue(true),
        error: {
          status: 500,
          statusCodeId: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
          stack: "Error: Internal server error",
          errorsDetails: ["Database error"],
        },
      });

      (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
        getAll: mockGetAll,
      });
      const userApplication = new UserApplication(userRepository);
      const userController = new UserController(userApplication);
      const request = httpMock.createRequest();
      const response = httpMock.createResponse();
      const next = jest.fn();

      // Act
      await userController.getAll(request, response);

      // Assert
      expect(response.statusCode).toBe(500);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(RedisBootstrap.set).not.toHaveBeenCalled();
    });
  });
});

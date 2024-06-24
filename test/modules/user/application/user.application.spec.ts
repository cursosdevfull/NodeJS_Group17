import { err, ok } from 'neverthrow';

import { UserResponse } from '../../../../src/modules/user/application/dtos/user-response.dto';
import { UserApplication } from '../../../../src/modules/user/application/user.application';
import { User } from '../../../../src/modules/user/domain/roots/user';
import { UserInfrastructure } from '../../../../src/modules/user/infrastructure/user.infrastructure';

jest.mock("../../../../src/modules/user/infrastructure/user.infrastructure"); // Ajustar la ruta según sea necesario

describe("UserApplication", () => {
  let userApplication: UserApplication;
  let userRepositoryMock: jest.Mocked<UserInfrastructure>;

  beforeEach(() => {
    userRepositoryMock =
      new UserInfrastructure() as jest.Mocked<UserInfrastructure>;
    userApplication = new UserApplication(userRepositoryMock);
  });

  describe("getById", () => {
    it("should return a user when found", async () => {
      const mockUser: User = {
        id: "1",
        name: "Test User",
        email: "test@example.com",
      };
      userRepositoryMock.getById.mockResolvedValue(ok(mockUser));

      const result = await userApplication.getById("1");

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toEqual(mockUser);
      }
    });

    it("should return an error when user not found", async () => {
      userRepositoryMock.getById.mockResolvedValue(
        err(new NotFoundException("User not found"))
      );

      const result = await userApplication.getById("non-existing-id");

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toEqual("User not found");
      }
    });
  });

  describe("getAll", () => {
    it("should return an array of users when found", async () => {
      const mockUsers: User[] = [
        { id: "1", name: "Test User 1", email: "test1@example.com" },
        { id: "2", name: "Test User 2", email: "test2@example.com" },
      ];
      userRepositoryMock.getAll.mockResolvedValue(ok(mockUsers));

      const result = await userApplication.getAll();

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.length).toBe(2);
        expect(result.value).toEqual(expect.arrayContaining(mockUsers));
      }
    });

    it("should return an empty array when no users are found", async () => {
      userRepositoryMock.getAll.mockResolvedValue(ok([]));

      const result = await userApplication.getAll();

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toEqual([]);
      }
    });
  });

  describe("getByEmail", () => {
    it("should return a user when found by email", async () => {
      const mockUser: UserResponse = {
        id: "1",
        name: "Test User",
        email: "test@example.com",
      };
      userRepositoryMock.getByEmail.mockResolvedValue(ok(mockUser));

      const result = await userApplication.getByEmail("test@example.com");

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toEqual(mockUser);
      }
    });

    it("should return null when no user is found by email", async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(ok(null));

      const result = await userApplication.getByEmail(
        "non-existing-email@example.com"
      );

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toBeNull();
      }
    });

    it("should return an error when there is a problem fetching the user by email", async () => {
      userRepositoryMock.getByEmail.mockResolvedValue(
        err(new NotFoundException("User not found"))
      );

      const result = await userApplication.getByEmail("error@example.com");

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toEqual("User not found");
      }
    });
  });
});

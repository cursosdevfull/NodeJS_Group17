export class Role {
  private readonly roleId: string;
  private readonly roleName: string;

  constructor(roleId: string, roleName: string) {
    this.roleId = roleId;
    this.roleName = roleName;
  }

  get properties() {
    return {
      roleId: this.roleId,
      roleName: this.roleName,
    };
  }
}

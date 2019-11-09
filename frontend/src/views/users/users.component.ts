import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {User} from '@/classes/user';
import {RoleEnum} from '@/enums/role.enum';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class UsersComponent extends Vue {

  public selectedUser: User = new User();
  public users: User[] = [];

  created() {
    const user1: User = new User();
    user1.id = 1;
    user1.name = 'User1';
    user1.role = RoleEnum.User;
    user1.email = 'user1@iti.es';
    user1.username = 'user1';
    this.users.push(user1);
    const user2: User = new User();
    user2.id = 2;
    user2.name = 'User2';
    user2.role = RoleEnum.User;
    user2.email = 'user2@iti.es';
    user2.username = 'user2';
    this.users.push(user2);
  }

  public sendMessage(user: User): void {
    this.$router.push(`/chat/${user.id}`);
  }

  public showEditUserModal(user: User): void {
    this.selectedUser = Object.assign({}, user);
    (this.$refs['editModalUser'] as any).show();
  }

  public hideEditUserModal(): void {
    (this.$refs['editModalUser'] as any).hide();
  }

  public editUser(): void {
    const index: number = this.users.findIndex((tmpUser: User) => {
      return tmpUser.id === this.selectedUser.id;
    });
    if (index > -1) {
      Vue.set(this.users, index, this.selectedUser);
    }
    this.selectedUser = new User();
    this.hideEditUserModal();
  }

  public showDeleteUserModal(user: User): void {
    this.selectedUser = Object.assign({}, user);
    (this.$refs['deleteModalUser'] as any).show();
  }

  public hideDeleteUserModal(): void {
    (this.$refs['deleteModalUser'] as any).hide();
  }

  public deleteUser(): void {
    const index: number = this.users.findIndex((tmpUser: User) => {
      return tmpUser.id === this.selectedUser.id;
    });
    if (index > -1) {
      this.users.splice(index, 1);
    }
    this.selectedUser = new User();
    this.hideDeleteUserModal();
  }

}

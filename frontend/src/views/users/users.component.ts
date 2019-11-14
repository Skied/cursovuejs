import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {User} from '@/classes/user';
import {RoleEnum} from '@/enums/role.enum';
import { userMessagesService } from '../../services/user-messages.service';
import { usersService } from '../../services/users.service';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class UsersComponent extends Vue {

  public selectedUser: User = new User();
  public users: User[] = [];

  created() {
    usersService.getUsers().then(res => this.users = res);

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
      usersService.updateUser(this.selectedUser).then(
        res => Vue.set(this.users, index, res));
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
      usersService.deleteUser(this.selectedUser).then(() =>this.users.splice(index, 1));
    }
    this.selectedUser = new User();
    this.hideDeleteUserModal();
  }

}

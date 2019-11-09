import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {User} from '@/classes/user';
import {usersService} from '@/services/users.service';
import {AxiosResponse} from 'axios';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class UsersComponent extends Vue {

  public selectedUser: User = new User();
  public users: User[] = [];

  created() {
    usersService.getUsers().then((axiosResponse: AxiosResponse<User[]>) => {
      if (axiosResponse.status == 200) {
        this.users = axiosResponse.data;
      } else {
        this.users = [];
      }
    });
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
    usersService.updateUser(this.selectedUser).then((response: AxiosResponse<User>) => {
      if (response.status == 200) {
        const userResponse: User = response.data;
        const index: number = this.users.findIndex((tmpUser: User) => {
          return tmpUser.id === userResponse.id;
        });
        if (index > -1) {
          Vue.set(this.users, index, this.selectedUser);
        }
      }
      this.selectedUser = new User();
      this.hideEditUserModal();
    });
  }

  public showDeleteUserModal(user: User): void {
    this.selectedUser = Object.assign({}, user);
    (this.$refs['deleteModalUser'] as any).show();
  }

  public hideDeleteUserModal(): void {
    (this.$refs['deleteModalUser'] as any).hide();
  }

  public deleteUser(): void {
    usersService.deleteUser(this.selectedUser).then((response: AxiosResponse<User>) => {
      if (response.status == 200) {
        const userResponse: User = response.data;
        const index: number = this.users.findIndex((tmpUser: User) => {
          return tmpUser.id === userResponse.id;
        });
        if (index > -1) {
          this.users.splice(index, 1);
        }
      }
      this.selectedUser = new User();
      this.hideDeleteUserModal();
    });
  }

}

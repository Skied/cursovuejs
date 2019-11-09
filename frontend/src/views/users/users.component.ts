import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {User} from '@/classes/user';
import {Getter, namespace, State} from 'vuex-class';

const usersModule = namespace('usersModule');

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class UsersComponent extends Vue {

  public selectedUser: User = new User();
  @usersModule.Getter('getUsers') private users!: () => User[];
  @State('user') public currentUser!: User;
  @Getter('userIsAdmin') public userIsAdmin!: () => boolean;
  @usersModule.Action('updateUser') private updateUserStore!: (user: User) => Promise<User>;
  @usersModule.Action('deleteUser') private deleteUserStore!: (user: User) => Promise<User>;

  public itsMe(user: User) {
    return this.currentUser.id === user.id;
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
    this.updateUserStore(this.selectedUser).then((user: User) => {
      this.hideEditUserModal();
      this.selectedUser = new User();
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
    this.deleteUserStore(this.selectedUser).then((user: User) => {
      this.hideDeleteUserModal();
      this.selectedUser = new User();
    });
  }

}

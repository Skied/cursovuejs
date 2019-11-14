import {Component, Vue, Ref} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import { User } from '../../classes/user';
import { RoleEnum } from '@/enums/role.enum';
import router from '@/router';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class UsersComponent extends Vue {
  users: User[] = [
    { id: 1, name: 'Test 1', email: 'test1@mail.com', username: 'test1', password: '', role: RoleEnum.User },
    { id: 2, name: 'Test 2', email: 'test2@mail.com', username: 'test2', password: '', role: RoleEnum.User },
    { id: 3, name: 'Test 3', email: 'test3@mail.com', username: 'test3', password: '', role: RoleEnum.User },
  ];

  userSelected = new User();

  @Ref('editModalUser') readonly modalEditar: any;
  @Ref('deleteModalUser') readonly modalEliminar: any;

  showEditModal(user: User) {
    this.userSelected = JSON.parse(JSON.stringify(user));
    this.modalEditar.show();
  }

  public async updateUser() {
    const index = this.users.findIndex(item => item.id === this.userSelected.id);
    Vue.set(this.users, index, this.userSelected);
    this.cerrarEditUser();
  }

  cerrarEditUser() {
    this.userSelected = new User();
    this.modalEditar.hide();
  }

  showDeleteModal(user: User) {
    this.userSelected = JSON.parse(JSON.stringify(user));
    this.modalEliminar.show();
  }

  deleteUser() {
    const index = this.users.findIndex(item => item.id === this.userSelected.id);
    Vue.delete(this.users, index);
    this.cerrarEliminarUser();
  }

  cerrarEliminarUser() {
    this.userSelected = new User();
    this.modalEliminar.hide();
  }

  iniciarChat(user: User) {
    router.push({ path: `/chat/${user.id}`});
  }
}

import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {User} from '@/classes/user';
import {authService} from '@/services/auth.service';
import {AxiosResponse} from 'axios';
import {ErrorResponseDto} from '@/dtos/error-response.dto';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class RegisterComponent extends Vue {

  public name: string = '';
  public email: string = '';
  public username: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public acceptTerms: boolean = false;

  public async submit() {
    const user: User = new User();
    user.name = this.name;
    user.email = this.email;
    user.username = this.username;
    user.password = this.password;
    authService.register(user).then((response: AxiosResponse<User | ErrorResponseDto>) => {
      if (response.status === 201) {
        this.$router.push('/login');
      } else {
        this.password = '';
        this.repeatPassword = '';
        this.acceptTerms = false;
        requestAnimationFrame(() => {
          (this.$refs.registerForm as any).reset();
        });
      }
    });
  }

}
